import { ArrowRight } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { useCases } from "@/lib/content";

export function UseCases() {
  return (
    <Section id="use-cases" className="bg-surface-1/30">
      <SectionHeader eyebrow={useCases.eyebrow} heading={useCases.heading} />

      <RevealGroup className="mt-14 grid gap-5 md:grid-cols-2">
        {useCases.items.map((uc) => (
          <RevealItem key={uc.segment}>
            <div className="group relative h-full overflow-hidden rounded-2xl border border-line bg-surface-1 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-line-strong sm:p-9">
              <span className="text-eyebrow font-medium uppercase text-accent-ink">
                {uc.segment}
              </span>

              <div className="mt-5 space-y-4">
                <div className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-faint" />
                  <p className="text-body text-ink-muted">
                    <span className="font-medium text-ink-faint">Today: </span>
                    {uc.pain}
                  </p>
                </div>
                <div className="flex gap-3">
                  <ArrowRight className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <p className="text-body text-ink">
                    <span className="font-medium text-accent-ink">With Entrofi: </span>
                    {uc.win}
                  </p>
                </div>
              </div>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
