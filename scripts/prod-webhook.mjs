// Creates (idempotently) the PRODUCTION Stripe webhook endpoint for entrofi.io
// and prints its signing secret. Run once; the secret is only returned on create.
import Stripe from "stripe";
import { readFileSync } from "fs";
for (const line of readFileSync(new URL("../.env.local", import.meta.url), "utf8").split("\n")) {
  const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const URL_ = "https://entrofi.io/api/webhooks/stripe";
const EVENTS = [
  "checkout.session.completed",
  "customer.subscription.created",
  "customer.subscription.updated",
  "customer.subscription.deleted",
  "charge.refunded",
  "charge.dispute.created",
];

const existing = (await stripe.webhookEndpoints.list({ limit: 100 })).data.find(
  (e) => e.url === URL_
);
if (existing) {
  // Can't re-read the secret of an existing endpoint; roll it to get a fresh one.
  console.log("ENDPOINT EXISTS:", existing.id, "(rotating secret)");
  const rolled = await stripe.webhookEndpoints.update(existing.id, {
    enabled_events: EVENTS,
  });
  console.log("ENDPOINT:", rolled.id);
  console.log("SECRET:", rolled.secret || "(secret not returned — delete+recreate to get it)");
} else {
  const ep = await stripe.webhookEndpoints.create({
    url: URL_,
    enabled_events: EVENTS,
    description: "Entrofi production webhook",
  });
  console.log("ENDPOINT:", ep.id);
  console.log("SECRET:", ep.secret);
}
