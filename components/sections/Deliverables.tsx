import { Check } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { deliverables } from "@/lib/content";

export function Deliverables() {
  return (
    <Section id="deliverables">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeader
            eyebrow={deliverables.eyebrow}
            heading={deliverables.heading}
            sub={deliverables.sub}
          />
        </div>

        <RevealGroup className="grid gap-4 sm:grid-cols-2" stagger={0.06}>
          {deliverables.items.map((item) => (
            <RevealItem key={item.title}>
              <div className="group h-full rounded-2xl border border-line bg-surface-1 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-line-strong hover:bg-surface-2">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-accent/15 text-accent ring-1 ring-accent/25">
                  <Check className="h-4 w-4" strokeWidth={2.5} />
                </span>
                <h3 className="mt-4 text-base font-semibold text-ink">{item.title}</h3>
                <p className="mt-1.5 text-sm text-ink-muted">{item.body}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}
