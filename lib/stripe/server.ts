import Stripe from "stripe";

// Lazy singleton — never instantiated at module load, so a missing key never
// breaks the build/preview; it only throws when a billing route is actually hit.
let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) throw new Error("STRIPE_SECRET_KEY is not set");
    _stripe = new Stripe(key, { appInfo: { name: "Entrofi" } });
  }
  return _stripe;
}
