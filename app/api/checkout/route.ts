import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getStripe } from "@/lib/stripe/server";
import { TIER_BILLING, getPriceId } from "@/lib/stripe/config";

/** Creates a Stripe Checkout Session for a purchasable tier, tied to the user. */
export async function POST(request: Request) {
  const { tier, seats } = await request.json().catch(() => ({}));
  const cfg = TIER_BILLING[tier];
  if (!cfg || cfg.mode === "contact") {
    return NextResponse.json({ error: "Not a purchasable plan" }, { status: 400 });
  }

  // Require a signed-in user so the subscription ties to their account.
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json(
      { error: "auth", loginUrl: "/login?next=/pricing" },
      { status: 401 }
    );
  }

  try {
    const stripe = getStripe();
    const admin = createAdminClient();
    const origin = process.env.NEXT_PUBLIC_SITE_URL || new URL(request.url).origin;

    const readCustomer = async () =>
      (
        await admin
          .from("stripe_customers")
          .select("stripe_customer_id")
          .eq("user_id", user.id)
          .maybeSingle()
      ).data?.stripe_customer_id as string | undefined;

    // Find or create this user's Stripe customer — idempotent and race-safe.
    let customerId = await readCustomer();
    if (!customerId) {
      // Idempotency key collapses concurrent creates to one Stripe customer.
      const customer = await stripe.customers.create(
        { email: user.email ?? undefined, metadata: { supabase_user_id: user.id } },
        { idempotencyKey: `entrofi_customer_${user.id}` }
      );
      await admin
        .from("stripe_customers")
        .upsert(
          { user_id: user.id, stripe_customer_id: customer.id },
          { onConflict: "user_id", ignoreDuplicates: true }
        );
      // Re-read the canonical row: a concurrent request may have won the insert.
      customerId = (await readCustomer()) ?? customer.id;
    }

    const quantity = cfg.perSeat
      ? Math.max(1, Math.min(Math.floor(Number(seats) || 1), 500))
      : 1;

    const session = await stripe.checkout.sessions.create({
      mode: cfg.mode,
      customer: customerId,
      client_reference_id: user.id,
      line_items: [
        {
          price: getPriceId(tier),
          quantity,
          ...(cfg.perSeat
            ? { adjustable_quantity: { enabled: true, minimum: 1, maximum: 500 } }
            : {}),
        },
      ],
      metadata: { supabase_user_id: user.id, tier },
      ...(cfg.mode === "subscription"
        ? { subscription_data: { metadata: { supabase_user_id: user.id, tier } } }
        : {}),
      allow_promotion_codes: true,
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pricing`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("[checkout]", err);
    return NextResponse.json(
      { error: "Billing is temporarily unavailable. Please try again." },
      { status: 500 }
    );
  }
}
