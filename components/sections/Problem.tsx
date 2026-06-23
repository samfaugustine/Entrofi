import { Section, SectionHeader } from "@/components/ui/Section";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { problem } from "@/lib/content";

export function Problem() {
  return (
    <Section id="problem">
      <SectionHeader eyebrow={problem.eyebrow} heading={problem.heading} sub={problem.sub} />

      <RevealGroup className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
        {problem.items.map((item, i) => (
          <RevealItem
            key={item.title}
            className="group relative bg-surface-1 p-7 transition-colors hover:bg-surface-2 sm:p-9"
          >
            <div className="flex items-baseline gap-4">
              <span className="font-mono text-sm text-ink-faint">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-h3 font-semibold text-ink">{item.title}</h3>
                <p className="mt-2 text-body text-ink-muted">{item.body}</p>
              </div>
            </div>
            <div className="pointer-events-none absolute bottom-0 left-0 h-px w-0 bg-accent-grad transition-all duration-500 group-hover:w-full" />
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
