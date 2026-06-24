/**
 * Maps each pricing tier to how it's billed. Checkout-able tiers reference an
 * env var holding the Stripe Price ID; contact-only tiers route to "Book a call".
 * Price IDs live in env so the same code works across test/live without edits.
 */
export type BillingMode = "payment" | "subscription" | "contact";

export type TierBilling = {
  mode: BillingMode;
  /** Env var name holding the Stripe Price ID (for payment/subscription tiers). */
  priceEnv?: string;
  /** Subscription seat-based: buyer chooses quantity at checkout. */
  perSeat?: boolean;
};

export const TIER_BILLING: Record<string, TierBilling> = {
  launch: { mode: "payment", priceEnv: "STRIPE_PRICE_LAUNCH" },
  operate: { mode: "subscription", priceEnv: "STRIPE_PRICE_OPERATE", perSeat: true },
  revamp: { mode: "contact" },
  enterprise: { mode: "contact" },
};

export function getPriceId(tierId: string): string {
  const cfg = TIER_BILLING[tierId];
  const id = cfg?.priceEnv ? process.env[cfg.priceEnv] : undefined;
  if (!id) throw new Error(`No Stripe price configured for tier "${tierId}"`);
  return id;
}
