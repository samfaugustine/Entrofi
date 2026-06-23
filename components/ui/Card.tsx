import { cn } from "@/lib/utils";

/**
 * Elevated surface with a hairline border and a hover lift + border-glow.
 * `interactive` adds the lift; omit it for static content panels.
 */
export function Card({
  children,
  className,
  interactive = true,
}: {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-line bg-surface-1 shadow-card transition-all duration-300",
        interactive &&
          "hover:-translate-y-1 hover:border-line-strong hover:shadow-glow",
        className
      )}
    >
      {/* top-edge sheen — a highlight lighter than the surface in both themes */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--sheen)] to-transparent" />
      {children}
    </div>
  );
}
