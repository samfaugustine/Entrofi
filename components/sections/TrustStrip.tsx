import { Reveal } from "@/components/motion/Reveal";
import { trust } from "@/lib/content";

export function TrustStrip() {
  return (
    <section className="relative border-y border-line bg-surface-1/40">
      <div className="container py-10">
        <Reveal>
          <p className="text-center text-eyebrow uppercase text-ink-faint">
            {trust.heading}
          </p>
        </Reveal>
        <Reveal delay={0.06}>
          <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 sm:gap-x-14">
            {trust.segments.map((seg) => (
              <li
                key={seg}
                className="text-lg font-medium tracking-tight text-ink-muted/80 transition-colors hover:text-ink"
              >
                {seg}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
