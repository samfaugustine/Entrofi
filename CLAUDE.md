# Entrofi — project guide for Claude

Marketing site + gated members area + Stripe billing for Entrofi (AI-implementation company).
**Next.js 14 App Router, TypeScript, Tailwind, Framer Motion, Supabase, Stripe.** Live at https://entrofi.io.

**Read `HANDOFF.md` first** — it has the full architecture, infra (GitHub/Vercel/Supabase/Stripe/Cloudflare),
env-var list, deploy flow, current status, and the go-live checklist.

## Fast facts
- Deploy: push to `main` on `samfaugustine/Entrofi` → Vercel (`entrofi-vercel/entrofi`) auto-builds. Hobby plan = limited deploys, so batch changes.
- Local: `npm run dev` → http://localhost:3400. Needs `.env.local` (gitignored; values mirrored in Vercel).
- Copy is data in `lib/content.ts` — never hardcode strings in section components.
- Auth/gating is in **Node route handlers**, not Edge middleware.
- Billing: Stripe is in **TEST mode**; purchasable tiers are `launch` + `operate` (per-seat). Webhook resolves
  ownership from the customer→user mapping and returns 500 on write failure so Stripe retries. See `HANDOFF.md`.

## Rules
- Never commit secrets. `.env.local` stays gitignored; mirror env in Vercel.
- Service-role key + Stripe secret key are server-only.
- Push via branch + PR + `gh pr merge` (direct push to `main` is blocked by a git guard hook).
