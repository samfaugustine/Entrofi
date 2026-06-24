# Entrofi — Handoff & Runbook

_Last updated: 2026-06-24. Read this first if you're a new session picking up the project._

## What this is
Entrofi is an AI-implementation company. This repo is the marketing site + a gated members
("Resources") area + a Stripe billing system. **Next.js 14** (App Router, TypeScript), Tailwind,
Framer Motion, Supabase (auth + Postgres), Stripe. Live at **https://entrofi.io**.

## Repos / accounts / infra
| Thing | Where |
|---|---|
| GitHub | `samfaugustine/Entrofi` — push to `main` → Vercel auto-deploys |
| Vercel | team `entrofi-vercel`, project `entrofi` (Hobby plan — deploys are limited, batch changes) |
| Domain | `entrofi.io` on Cloudflare (CNAME-flatten at apex → Vercel) |
| Supabase | project ref `eomurjamcxxaeumarvzd` (auth + Postgres) |
| Stripe | **TEST mode** today (see "Go live" below) |

## Local dev
```bash
npm install
# Create .env.local (NOT committed — see "Env vars"). Get values from Vercel project env.
npm run dev          # → http://localhost:3400   (script is `next dev -p 3400`)
```
Note: a Claude harness `preview_start "entrofi"` may mis-resolve to a different project — start with
`npm run dev` from this repo instead.

## Architecture (key files)
- **Marketing**: `app/page.tsx` + `components/sections/*`. Copy is data in `lib/content.ts` (never hardcode strings in sections).
- **Auth**: Supabase via `@supabase/ssr`. `lib/supabase/{client,server,admin}.ts`. Email/password + Google.
  Gating happens in **Node route handlers**, NOT Edge middleware (edge can't run `@supabase/supabase-js`).
- **Members area**: `app/resources/*` (gated; redirects to `/login`). Serves the Claude Code guide as a lead magnet.
- **Pricing**: `app/pricing/page.tsx` + `components/sections/Pricing.tsx`. Tiers/copy in `lib/content.ts` → `pricing`.
- **Billing (Stripe)**:
  - `lib/stripe/server.ts` (`getStripe()`), `lib/stripe/config.ts` (`TIER_BILLING`, price IDs from env).
  - `app/api/checkout/route.ts` — auth-gated; idempotent + race-safe customer creation; creates Checkout Session.
  - `app/api/webhooks/stripe/route.ts` — verifies signature; resolves the owner from the **customer→user mapping**
    (not from client metadata); error-checks writes and returns **500 on failure so Stripe retries**; handles
    refunds/disputes.
  - `app/api/portal/route.ts` — Stripe Customer Portal. `app/checkout/success/page.tsx`.
  - `components/sections/{CheckoutButton,ManageBillingButton}.tsx`.
  - Purchasable tiers: **launch** (one-time $1,950) + **operate** ($99/seat/mo). **revamp** + **enterprise** are "Book a call".

## Supabase
- Tables: `stripe_customers` (user_id ↔ stripe_customer_id) and `subscriptions`. RLS = read-own; the webhook
  writes via the service-role key. Schema lives in **`supabase/billing.sql`** — run it in the SQL editor if recreating.

## Stripe (TEST mode)
- Products/prices: `node scripts/stripe-setup.mjs` (idempotent). Current test price IDs are in Vercel env + `.env.local`.
- Prod webhook endpoint `we_1Tlz7N…` → `https://entrofi.io/api/webhooks/stripe` (created via `scripts/prod-webhook.mjs`).
- Local webhook testing: the Stripe CLI `stripe listen --api-key` didn't forward in the agent sandbox; instead POST a
  signed event built with `stripe.webhooks.generateTestHeaderString({payload, secret})`.

## Env vars  (NEVER commit values — `.env.local` is gitignored. Mirror these in Vercel → Production.)
| Name | What |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase public API |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase **secret** key (Dashboard → Settings → API Keys → secret). Full DB access; server-only. |
| `STRIPE_SECRET_KEY` | `sk_test_…` (→ `sk_live_…` for real money) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | `pk_test_…` |
| `STRIPE_PRICE_LAUNCH` / `STRIPE_PRICE_OPERATE` | Stripe price IDs (from `stripe-setup.mjs`) |
| `STRIPE_WEBHOOK_SECRET` | from the Stripe webhook endpoint (Dashboard / `prod-webhook.mjs`); local uses the Stripe CLI's `whsec` |
| `NEXT_PUBLIC_SITE_URL` | `https://entrofi.io` (prod) / `http://localhost:3400` (local) |

## Status (2026-06-24)
Billing is **wired + verified end-to-end in TEST mode**: signup → `/resources`, Subscribe (per-seat) → real Stripe
Checkout → customer mapping persisted → signed webhook → subscription synced → `/resources` shows the active plan →
billing portal opens. Hardened against an 11-finding adversarial security review. **Deployed to entrofi.io.**
**Payments are in TEST mode — real cards are NOT charged yet.**

## Go live (accept real money)
1. Run `scripts/stripe-setup.mjs` with a **live** `sk_live_` key → new live price IDs.
2. Create a **live-mode** webhook endpoint (Stripe Dashboard) → live `STRIPE_WEBHOOK_SECRET`.
3. In Vercel, swap `STRIPE_SECRET_KEY`→`sk_live`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`→`pk_live`,
   `STRIPE_PRICE_*`→live IDs, `STRIPE_WEBHOOK_SECRET`→live secret. Redeploy.

## Open product decisions
- Tier deliverables/features in `lib/content.ts` → `pricing` are **placeholders** — refine.
- Website Revamp tier: decide whether to take a deposit online or stay "Book a call".

## Conventions
- Copy is data (`lib/content.ts`). One Framer easing curve `[0.16, 1, 0.3, 1]`. Design tokens are CSS vars in
  `app/globals.css`; light-default with a dark toggle.
- Service-role key + Stripe secret are server-only — never import into a client component.
