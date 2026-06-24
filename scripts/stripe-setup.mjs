// Creates (idempotently) the Entrofi Stripe products + prices and prints their IDs.
// Run: node scripts/stripe-setup.mjs   (self-loads .env.local for STRIPE_SECRET_KEY)
import Stripe from "stripe";
import { readFileSync } from "fs";

if (!process.env.STRIPE_SECRET_KEY) {
  try {
    const env = readFileSync(new URL("../.env.local", import.meta.url), "utf8");
    for (const line of env.split("\n")) {
      const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
    }
  } catch {}
}

const key = process.env.STRIPE_SECRET_KEY;
if (!key) {
  console.error("STRIPE_SECRET_KEY missing");
  process.exit(1);
}
const stripe = new Stripe(key);

const TIERS = [
  {
    tier: "launch",
    name: "Entrofi Launch",
    desc: "Your first AI system, installed — one-time implementation.",
    amount: 195000,
    recurring: null,
  },
  {
    tier: "operate",
    name: "Entrofi Operate",
    desc: "Always-on AI systems for your team — billed per seat, monthly.",
    amount: 9900,
    recurring: { interval: "month" },
  },
];

async function findProduct(tier) {
  try {
    const res = await stripe.products.search({
      query: `metadata['entrofi_tier']:'${tier}'`,
      limit: 1,
    });
    return res.data[0] || null;
  } catch {
    return null; // search index may lag on a fresh account
  }
}

async function ensure(t) {
  let product = await findProduct(t.tier);
  if (!product) {
    product = await stripe.products.create({
      name: t.name,
      description: t.desc,
      metadata: { entrofi_tier: t.tier },
    });
  }
  const prices = await stripe.prices.list({
    product: product.id,
    active: true,
    limit: 100,
  });
  let price = prices.data.find(
    (p) =>
      p.unit_amount === t.amount &&
      p.currency === "usd" &&
      ((t.recurring && p.recurring && p.recurring.interval === t.recurring.interval) ||
        (!t.recurring && !p.recurring))
  );
  if (!price) {
    price = await stripe.prices.create({
      product: product.id,
      unit_amount: t.amount,
      currency: "usd",
      ...(t.recurring ? { recurring: t.recurring } : {}),
      metadata: { entrofi_tier: t.tier },
    });
  }
  return { tier: t.tier, product: product.id, price: price.id };
}

const out = {};
for (const t of TIERS) {
  const r = await ensure(t);
  out[t.tier] = r.price;
  console.error(`${t.tier}: product=${r.product} price=${r.price}`);
}
console.log("STRIPE_PRICE_LAUNCH=" + out.launch);
console.log("STRIPE_PRICE_OPERATE=" + out.operate);
