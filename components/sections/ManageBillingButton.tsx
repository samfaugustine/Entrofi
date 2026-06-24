"use client";

import Link from "next/link";
import { useState } from "react";
import { CreditCard, Loader2 } from "lucide-react";

/** Opens the Stripe Customer Portal, or sends members with no plan to pricing. */
export function ManageBillingButton({ hasBilling }: { hasBilling: boolean }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!hasBilling) {
    return (
      <Link
        href="/pricing"
        className="inline-flex items-center gap-2 rounded-full bg-accent-grad px-4 py-2 text-sm font-medium text-white shadow-glow transition-transform hover:-translate-y-0.5"
      >
        View plans
      </Link>
    );
  }

  async function openPortal() {
    if (loading) return;
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/portal", { method: "POST" });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.url) {
        window.location.href = data.url;
        return;
      }
      setError(data.error || "Could not open billing — contact support.");
    } catch {
      setError("Network error — please try again.");
    }
    setLoading(false);
  }

  return (
    <div className="flex flex-col items-start gap-2 sm:items-end">
      <button
        type="button"
        onClick={openPortal}
        disabled={loading}
        className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface-2 px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-surface-3 disabled:opacity-60"
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <CreditCard className="h-4 w-4" />
        )}
        Manage billing
      </button>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
