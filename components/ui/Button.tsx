import Link from "next/link";
import { forwardRef } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-all duration-200 focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary:
    "text-white shadow-glow bg-accent-grad bg-[length:160%_100%] hover:bg-[position:100%_0] hover:-translate-y-0.5",
  secondary:
    "text-ink border border-line-strong bg-surface-2/60 backdrop-blur hover:border-accent/50 hover:bg-surface-3/70 hover:-translate-y-0.5",
  ghost: "text-ink-muted hover:text-ink",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-7 text-base",
};

export interface ButtonProps {
  href?: string;
  variant?: Variant;
  size?: Size;
  withArrow?: boolean;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export const Button = forwardRef<HTMLAnchorElement, ButtonProps>(function Button(
  { href, variant = "primary", size = "md", withArrow = false, className, children, onClick },
  ref
) {
  const content = (
    <>
      <span>{children}</span>
      {withArrow && (
        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
      )}
    </>
  );

  const classes = cn(base, variants[variant], sizes[size], className);

  if (href) {
    const external = href.startsWith("http") || href.startsWith("mailto:");
    return (
      <Link
        ref={ref}
        href={href}
        onClick={onClick}
        className={classes}
        {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      >
        {content}
      </Link>
    );
  }

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <button onClick={onClick} className={classes as any}>
      {content}
    </button>
  );
});
