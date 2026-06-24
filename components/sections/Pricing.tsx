import { Check } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { CheckoutButton } from "@/components/sections/CheckoutButton";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { pricing } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Pricing() {
  return (
    <Section id="pricing" className="pt-32 sm:pt-40">
      <SectionHeader
        eyebrow={pricing.eyebrow}
        heading={pricing.heading}
        sub={pricing.sub}
        align="center"
      />

      <RevealGroup
        className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        stagger={0.07}
      >
        {pricing.tiers.map((tier) => (
          <RevealItem key={tier.id}>
            <div
              className={cn(
                "relative flex h-full flex-col rounded-2xl border bg-surface-1 p-6 transition-all duration-300",
                tier.highlight
                  ? "border-accent/40 shadow-glow"
                  : "border-line shadow-card hover:-translate-y-1 hover:border-line-strong"
              )}
            >
              {tier.badge && (
                <span
                  className={cn(
                    "absolute -top-3 left-6 rounded-full px-3 py-1 text-xs font-medium",
                    tier.highlight
                      ? "bg-accent-grad text-white"
                      : "border border-line bg-surface-2 text-ink-muted"
                  )}
                >
                  {tier.badge}
                </span>
              )}

              <h3 className="text-h3 font-semibold text-ink">{tier.name}</h3>
              <p className="mt-1.5 text-sm text-ink-muted">{tier.tagline}</p>

              <div className="mt-6 flex items-baseline gap-1.5">
                <span className="text-4xl font-semibold tracking-tight text-ink">
                  {tier.price}
                </span>
                <span className="text-sm text-ink-faint">{tier.unit}</span>
              </div>

              {tier.purchasable ? (
                <CheckoutButton
                  tier={tier.id}
                  perSeat={tier.perSeat}
                  label={tier.cta.label}
                  highlight={tier.highlight}
                />
              ) : (
                <Button
                  href={tier.cta.href}
                  variant={tier.highlight ? "primary" : "secondary"}
                  className="mt-6 w-full"
                >
                  {tier.cta.label}
                </Button>
              )}

              <ul className="mt-7 space-y-3 border-t border-line pt-6">
                {tier.features.map((f) => (
                  <li key={f} className="flex gap-3 text-sm text-ink-muted">
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-accent-ink"
                      strokeWidth={2.5}
                    />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>

      <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-ink-faint">
        {pricing.note}
      </p>
    </Section>
  );
}
