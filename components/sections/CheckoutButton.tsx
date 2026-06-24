"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Purchase button for a checkout-able tier. Per-seat plans get a seat stepper.
 * Posts to /api/checkout, then redirects to Stripe (or to /login if signed out).
 */
export function CheckoutButton({
  tier,
  perSeat,
  label,
  highlight,
}: {
  tier: string;
  perSeat?: boolean;
  label: string;
  highlight?: boolean;
}) {
  const router = useRouter();
  const [seats, setSeats] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function go() {
    if (loading) return; // guard double-submit
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ tier, seats }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.status === 401) {
        router.push(data.loginUrl || "/login?next=/pricing");
        return;
      }
      if (!res.ok || !data.url) {
        setError(data.error || "Something went wrong");
        setLoading(false);
        return;
      }
      window.location.href = data.url;
    } catch {
      setError("Network error — please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="mt-6">
      {perSeat && (
        <div className="mb-3 flex items-center justify-between rounded-xl border border-line bg-surface-2 px-3.5 py-2">
          <span className="text-sm text-ink-muted">Seats</span>
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              aria-label="Remove a seat"
              onClick={() => setSeats((s) => Math.max(1, s - 1))}
              className="flex h-7 w-7 items-center justify-center rounded-lg border border-line text-ink-muted transition-colors hover:border-line-strong hover:text-ink"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="w-6 text-center text-sm font-semibold text-ink">
              {seats}
            </span>
            <button
              type="button"
              aria-label="Add a seat"
              onClick={() => setSeats((s) => Math.min(500, s + 1))}
              className="flex h-7 w-7 items-center justify-center rounded-lg border border-line text-ink-muted transition-colors hover:border-line-strong hover:text-ink"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={go}
        disabled={loading}
        className={cn(
          "flex h-11 w-full items-center justify-center gap-2 rounded-full text-sm font-medium transition-all disabled:opacity-60",
          highlight
            ? "bg-accent-grad text-white shadow-glow hover:-translate-y-0.5"
            : "border border-line-strong bg-surface-2 text-ink hover:bg-surface-3"
        )}
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        {label}
      </button>

      {error && <p className="mt-2 text-center text-xs text-red-600">{error}</p>}
    </div>
  );
}
