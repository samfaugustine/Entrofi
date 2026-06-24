-- Entrofi billing schema. Run once in the Supabase SQL editor.
-- The Stripe webhook (service role) writes these; users can only READ their own.

-- Maps a Supabase auth user to their Stripe customer.
create table if not exists public.stripe_customers (
  user_id uuid primary key references auth.users (id) on delete cascade,
  stripe_customer_id text unique not null,
  created_at timestamptz not null default now()
);

alter table public.stripe_customers enable row level security;

drop policy if exists "read own customer" on public.stripe_customers;
create policy "read own customer"
  on public.stripe_customers for select
  using (auth.uid() = user_id);

-- Subscriptions + one-time purchases, synced from Stripe by the webhook.
create table if not exists public.subscriptions (
  id text primary key,                         -- stripe subscription id (subscriptions) or checkout session id (one-time)
  user_id uuid not null references auth.users (id) on delete cascade,
  status text not null,                        -- active | trialing | past_due | canceled | paid (one-time) ...
  tier text,                                   -- launch | operate | revamp
  price_id text,
  quantity integer not null default 1,         -- seats
  mode text,                                   -- payment | subscription
  payment_intent text,                         -- for one-time refund/dispute reconciliation
  cancel_at_period_end boolean not null default false,
  current_period_end timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.subscriptions enable row level security;

drop policy if exists "read own subscriptions" on public.subscriptions;
create policy "read own subscriptions"
  on public.subscriptions for select
  using (auth.uid() = user_id);

create index if not exists subscriptions_user_id_idx on public.subscriptions (user_id);
create index if not exists subscriptions_status_idx on public.subscriptions (status);
