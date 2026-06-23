import { cn } from "@/lib/utils";

export function Badge({
  children,
  className,
  dot = true,
}: {
  children: React.ReactNode;
  className?: string;
  dot?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-line bg-surface-1/60 px-3 py-1 text-xs font-medium text-ink-muted backdrop-blur",
        className
      )}
    >
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-accent" />}
      {children}
    </span>
  );
}
