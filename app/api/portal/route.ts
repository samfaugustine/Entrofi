import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getStripe } from "@/lib/stripe/server";

/** Opens the Stripe Customer Portal so members can manage/cancel/change seats. */
export async function POST(request: Request) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "auth" }, { status: 401 });

  try {
    const admin = createAdminClient();
    const { data } = await admin
      .from("stripe_customers")
      .select("stripe_customer_id")
      .eq("user_id", user.id)
      .maybeSingle();

    const customerId = data?.stripe_customer_id as string | undefined;
    if (!customerId) {
      return NextResponse.json({ error: "No billing account yet" }, { status: 404 });
    }

    const stripe = getStripe();
    const origin = process.env.NEXT_PUBLIC_SITE_URL || new URL(request.url).origin;
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${origin}/resources`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("[portal]", err);
    return NextResponse.json(
      { error: "Could not open billing. Please try again." },
      { status: 500 }
    );
  }
}
