import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { finalCta } from "@/lib/content";

export function CTA() {
  return (
    <section id="book" className="section scroll-mt-24">
      <div className="container">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-line bg-surface-1 px-6 py-16 text-center sm:px-12 sm:py-24">
            {/* soft pool of light at the top — themeable via --wash, no grid */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-[radial-gradient(60%_100%_at_50%_0%,var(--wash),transparent)]" />

            <div className="relative">
              <span className="eyebrow justify-center text-accent-ink">
                {finalCta.eyebrow}
              </span>
              <h2 className="mx-auto mt-5 max-w-3xl text-h1 font-semibold text-ink">
                {finalCta.heading}
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-lead text-ink-muted">
                {finalCta.sub}
              </p>
              <div className="mt-9 flex flex-col items-center gap-4">
                <Button href={finalCta.cta.href} size="lg" withArrow>
                  {finalCta.cta.label}
                </Button>
                <p className="text-sm text-ink-faint">{finalCta.secondary}</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
