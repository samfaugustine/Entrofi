import { Section, SectionHeader } from "@/components/ui/Section";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { process } from "@/lib/content";

export function Process() {
  return (
    <Section id="how" className="bg-surface-1/30">
      <SectionHeader eyebrow={process.eyebrow} heading={process.heading} sub={process.sub} />

      <RevealGroup className="mt-14 grid gap-5 lg:grid-cols-4" stagger={0.1}>
        {process.steps.map((step, i) => (
          <RevealItem key={step.no}>
            <div className="group relative flex h-full flex-col rounded-2xl border border-line bg-surface-1 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-line-strong">
              {/* stage index + rail */}
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-line-strong bg-surface-2 font-mono text-sm text-ink">
                  {step.no}
                </span>
                {i < process.steps.length - 1 && (
                  <span className="hidden h-px flex-1 bg-gradient-to-r from-line-strong to-transparent lg:block" />
                )}
              </div>

              <h3 className="mt-6 text-h3 font-semibold text-ink">{step.title}</h3>
              <p className="mt-2 flex-1 text-body text-ink-muted">{step.body}</p>
              <span className="mt-6 inline-flex w-fit rounded-full border border-line bg-surface-2 px-3 py-1 text-xs font-medium text-ink-muted">
                {step.meta}
              </span>

              <div className="pointer-events-none absolute inset-x-0 top-0 h-px scale-x-0 bg-accent-grad transition-transform duration-500 group-hover:scale-x-100" />
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
