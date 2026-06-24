import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe/server";
import { createAdminClient } from "@/lib/supabase/admin";

/**
 * Stripe webhook — verifies the signature and syncs billing state to Supabase.
 *
 * Trust model: the OWNER of a subscription/payment is resolved from the paying
 * Stripe customer (via the stripe_customers mapping), NOT from free-floating
 * metadata. Every DB write is error-checked; any failure returns a non-2xx so
 * Stripe redelivers (the keyed upserts are idempotent, so retries are safe).
 */
export async function POST(request: Request) {
  const stripe = getStripe();
  const sig = request.headers.get("stripe-signature");
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const body = await request.text(); // raw body required for signature check

  let event: Stripe.Event;
  try {
    if (!sig || !secret) throw new Error("missing signature/secret");
    event = stripe.webhooks.constructEvent(body, sig, secret);
  } catch {
    return NextResponse.json({ error: "invalid signature" }, { status: 400 });
  }

  const admin = createAdminClient();

  const customerIdOf = (c: string | { id: string } | null | undefined) =>
    typeof c === "string" ? c : c?.id ?? null;

  // The paying customer is the source of truth for ownership; metadata is only a
  // fallback for objects created before the mapping existed.
  async function resolveUserId(
    customerId: string | null,
    fallback?: string | null
  ): Promise<string | null> {
    if (customerId) {
      const { data } = await admin
        .from("stripe_customers")
        .select("user_id")
        .eq("stripe_customer_id", customerId)
        .maybeSingle();
      if (data?.user_id) return data.user_id as string;
    }
    return fallback ?? null;
  }

  // Reconstruct the customer→user mapping from Stripe if the checkout-time insert
  // was ever lost (prevents a paid user from being locked out of the portal).
  async function backfillCustomer(customerId: string | null, userId: string | null) {
    if (!customerId || !userId) return;
    await admin
      .from("stripe_customers")
      .upsert(
        { user_id: userId, stripe_customer_id: customerId },
        { onConflict: "user_id", ignoreDuplicates: true }
      );
  }

  async function upsertSubscription(sub: Stripe.Subscription) {
    const customerId = customerIdOf(sub.customer);
    const userId = await resolveUserId(customerId, sub.metadata?.supabase_user_id);
    if (!userId) throw new Error(`no owner for subscription ${sub.id}`);
    await backfillCustomer(customerId, userId);
    const item = sub.items.data[0];
    const { error } = await admin.from("subscriptions").upsert({
      id: sub.id,
      user_id: userId,
      status: sub.status,
      tier: sub.metadata?.tier ?? null,
      price_id: item?.price.id ?? null,
      quantity: item?.quantity ?? 1,
      mode: "subscription",
      cancel_at_period_end: sub.cancel_at_period_end,
      current_period_end: sub.current_period_end
        ? new Date(sub.current_period_end * 1000).toISOString()
        : null,
      updated_at: new Date().toISOString(),
    });
    if (error) throw error;
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const customerId = customerIdOf(session.customer);
        const fallback =
          session.metadata?.supabase_user_id || session.client_reference_id || null;
        const userId = await resolveUserId(customerId, fallback);
        await backfillCustomer(customerId, userId);

        if (session.mode === "subscription" && session.subscription) {
          const sub = await stripe.subscriptions.retrieve(
            session.subscription as string
          );
          await upsertSubscription(sub);
        } else if (session.mode === "payment") {
          if (!userId) throw new Error(`no owner for payment session ${session.id}`);
          const { error } = await admin.from("subscriptions").upsert({
            id: session.id,
            user_id: userId,
            status: "paid",
            tier: session.metadata?.tier ?? null,
            quantity: 1,
            mode: "payment",
            payment_intent:
              typeof session.payment_intent === "string"
                ? session.payment_intent
                : null,
            updated_at: new Date().toISOString(),
          });
          if (error) throw error;
        }
        break;
      }

      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        await upsertSubscription(event.data.object as Stripe.Subscription);
        break;
      }

      // Reconcile one-time purchases when money is returned.
      case "charge.refunded":
      case "charge.dispute.created": {
        const charge = event.data.object as Stripe.Charge;
        const pi = customerIdOf(charge.payment_intent);
        if (pi) {
          const status = event.type === "charge.refunded" ? "refunded" : "disputed";
          const { error } = await admin
            .from("subscriptions")
            .update({ status, updated_at: new Date().toISOString() })
            .eq("payment_intent", pi);
          if (error) throw error;
        }
        break;
      }
    }
  } catch (err) {
    // Fail loud so Stripe retries with backoff; keyed upserts make this safe.
    console.error("[stripe webhook]", event.type, err);
    return NextResponse.json({ error: "sync failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
