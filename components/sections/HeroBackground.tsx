/**
 * Hero backdrop — intentionally minimal. A single soft, static pool of light
 * "shining through" at the top (themeable via --wash: bright on cream, a glow
 * bleeding through the black on dark). No canvas, no grid, no motion.
 */
export function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute left-1/2 top-0 h-[36rem] w-[64rem] max-w-[130%] -translate-x-1/2 -translate-y-1/3 rounded-[100%] bg-[radial-gradient(closest-side,var(--wash),transparent)]" />
    </div>
  );
}
