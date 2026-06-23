"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ShieldCheck, Zap, Boxes } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { HeroBackground } from "./HeroBackground";
import { hero, site } from "@/lib/content";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();

  const rise = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: EASE, delay },
  });

  return (
    <section id="top" className="relative isolate overflow-hidden">
      <HeroBackground />

      <div className="container relative flex min-h-[88vh] flex-col items-center justify-center pt-28 pb-20 text-center">
        <motion.div {...rise(0)}>
          <Badge>{hero.badge}</Badge>
        </motion.div>

        <motion.h1
          {...rise(0.08)}
          className="mt-7 max-w-4xl text-display font-semibold text-ink"
        >
          {hero.headlineLead}{" "}
          <span className="text-grad">{hero.headlineAccent}</span>{" "}
          {hero.headlineTail}
        </motion.h1>

        <motion.p
          {...rise(0.16)}
          className="mt-6 max-w-2xl text-lead text-ink-muted"
        >
          {hero.sub}
        </motion.p>

        <motion.div
          {...rise(0.24)}
          className="mt-9 flex flex-col items-center gap-3 sm:flex-row"
        >
          <Button href={site.cta.primary.href} size="lg" withArrow>
            {site.cta.primary.label}
          </Button>
          <Button href={site.cta.secondary.href} size="lg" variant="secondary">
            {site.cta.secondary.label}
          </Button>
        </motion.div>

        <motion.div
          {...rise(0.34)}
          className="mt-12 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-sm text-ink-faint"
        >
          <span className="inline-flex items-center gap-2">
            <Zap className="h-4 w-4 text-accent-ink" /> Production systems in weeks
          </span>
          <span className="inline-flex items-center gap-2">
            <Boxes className="h-4 w-4 text-accent-ink" /> Built into your real stack
          </span>
          <span className="inline-flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-accent-ink" /> Guardrailed, with a human in the loop
          </span>
        </motion.div>
      </div>
    </section>
  );
}
