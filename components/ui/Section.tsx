import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/Reveal";

/** Standard section header: eyebrow → heading → optional lead. */
export function SectionHeader({
  eyebrow,
  heading,
  sub,
  align = "left",
  className,
}: {
  eyebrow?: string;
  heading: React.ReactNode;
  sub?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {eyebrow && (
        <Reveal>
          <span className="eyebrow">
            <span className="h-px w-6 bg-accent/60" aria-hidden />
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2 className={cn("text-h2 font-semibold text-ink", align === "center" && "mx-auto max-w-3xl")}>
          {heading}
        </h2>
      </Reveal>
      {sub && (
        <Reveal delay={0.1}>
          <p className={cn("text-lead text-ink-muted", align === "center" ? "mx-auto max-w-2xl" : "max-w-2xl")}>
            {sub}
          </p>
        </Reveal>
      )}
    </div>
  );
}

/** Section wrapper with consistent vertical rhythm and id anchor. */
export function Section({
  id,
  children,
  className,
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("section scroll-mt-24", className)}>
      <div className="container">{children}</div>
    </section>
  );
}
