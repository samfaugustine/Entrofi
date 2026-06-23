import { cn } from "@/lib/utils";

/**
 * Entrofi lockup — a radial particle burst (entropy dispersing from a dense
 * core into order), rendered in the Claude-orange ramp via a radial gradient
 * (hot amber core → deep rust at the edges) with an outward opacity falloff.
 *
 * Dots are generated parametrically so density/scale are tunable in one place.
 */
const SPOKES = 12;
const RINGS = [
  { r: 4.6, dot: 1.7, op: 1 },
  { r: 9.2, dot: 1.45, op: 0.85 },
  { r: 13.6, dot: 1.15, op: 0.6 },
];

type Dot = { x: number; y: number; r: number; op: number };

const DOTS: Dot[] = (() => {
  const out: Dot[] = [{ x: 20, y: 20, r: 1.95, op: 1 }]; // core
  for (let s = 0; s < SPOKES; s++) {
    const a = (s / SPOKES) * Math.PI * 2;
    for (const ring of RINGS) {
      out.push({
        x: +(20 + Math.cos(a) * ring.r).toFixed(2),
        y: +(20 + Math.sin(a) * ring.r).toFixed(2),
        r: ring.dot,
        op: ring.op,
      });
    }
  }
  return out;
})();

export function Logo({
  className,
  showWordmark = true,
}: {
  className?: string;
  showWordmark?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg
        width="26"
        height="26"
        viewBox="0 0 40 40"
        fill="none"
        aria-hidden
        className="shrink-0"
      >
        <defs>
          <radialGradient id="entrofi-burst" cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor="#F2AE77" />
            <stop offset="55%" stopColor="#D97757" />
            <stop offset="100%" stopColor="#BE5A3A" />
          </radialGradient>
        </defs>
        {DOTS.map((d, i) => (
          <circle
            key={i}
            cx={d.x}
            cy={d.y}
            r={d.r}
            fill="url(#entrofi-burst)"
            opacity={d.op}
          />
        ))}
      </svg>
      {showWordmark && (
        <span className="text-[1.05rem] font-semibold tracking-tight text-ink">
          Entrofi
        </span>
      )}
    </span>
  );
}
