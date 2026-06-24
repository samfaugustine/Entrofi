/** Minimal hand-written types for the billing tables (see supabase/billing.sql). */

type StripeCustomerRow = {
  user_id: string;
  stripe_customer_id: string;
  created_at: string;
};

type SubscriptionRow = {
  id: string;
  user_id: string;
  status: string;
  tier: string | null;
  price_id: string | null;
  quantity: number;
  mode: string | null;
  payment_intent: string | null;
  cancel_at_period_end: boolean;
  current_period_end: string | null;
  created_at: string;
  updated_at: string;
};

export type Database = {
  public: {
    Tables: {
      stripe_customers: {
        Row: StripeCustomerRow;
        Insert: Partial<StripeCustomerRow> &
          Pick<StripeCustomerRow, "user_id" | "stripe_customer_id">;
        Update: Partial<StripeCustomerRow>;
        Relationships: [];
      };
      subscriptions: {
        Row: SubscriptionRow;
        Insert: Partial<SubscriptionRow> &
          Pick<SubscriptionRow, "id" | "user_id" | "status">;
        Update: Partial<SubscriptionRow>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
