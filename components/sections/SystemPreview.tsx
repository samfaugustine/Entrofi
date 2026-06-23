"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Inbox,
  Sparkles,
  Filter,
  Bot,
  UserCheck,
  Database,
  Check,
  type LucideIcon,
} from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { preview, type WorkflowStageKind } from "@/lib/content";
import { cn } from "@/lib/utils";

const KIND_META: Record<
  WorkflowStageKind,
  { icon: LucideIcon; label: string; color: string }
> = {
  trigger: { icon: Inbox, label: "Trigger", color: "#EDB489" },
  ai: { icon: Sparkles, label: "AI", color: "#D97757" },
  logic: { icon: Filter, label: "Logic", color: "#E59A5C" },
  agent: { icon: Bot, label: "Agent", color: "#C96342" },
  human: { icon: UserCheck, label: "Human", color: "#E8A87C" },
  system: { icon: Database, label: "System", color: "#B8502E" },
};

const STEP_MS = 1500;

export function SystemPreview() {
  const reduce = useReducedMotion();
  const [tab, setTab] = useState(0);
  const [active, setActive] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const workflow = preview.workflows[tab];
  const stages = workflow.stages;
  const count = stages.length;

  // Auto-advance the active stage. Reduced motion → show the completed system.
  useEffect(() => {
    if (reduce) {
      setActive(count - 1);
      return;
    }
    setActive(0);
    timer.current && clearInterval(timer.current);
    timer.current = setInterval(() => {
      setActive((a) => (a + 1) % count);
    }, STEP_MS);
    return () => {
      timer.current && clearInterval(timer.current);
    };
  }, [tab, count, reduce]);

  const progress = useMemo(
    () => (count <= 1 ? 1 : active / (count - 1)),
    [active, count]
  );

  return (
    <Section id="preview">
      <SectionHeader
        eyebrow={preview.eyebrow}
        heading={preview.heading}
        sub={preview.sub}
        align="center"
      />

      {/* Tabs */}
      <div className="mt-10 flex justify-center">
        <div
          role="tablist"
          aria-label="Workflow systems"
          className="inline-flex flex-wrap justify-center gap-1 rounded-full border border-line bg-surface-1/70 p-1 backdrop-blur"
        >
          {preview.workflows.map((w, i) => (
            <button
              key={w.id}
              role="tab"
              aria-selected={tab === i}
              onClick={() => setTab(i)}
              className={cn(
                "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                tab === i ? "text-white" : "text-ink-muted hover:text-ink"
              )}
            >
              {tab === i && (
                <motion.span
                  layoutId="preview-tab"
                  className="absolute inset-0 rounded-full bg-accent-grad"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative z-10">{w.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Canvas */}
      <div
        data-panel="dark"
        className="relative mx-auto mt-10 max-w-5xl overflow-hidden rounded-3xl border border-line bg-surface-1/60 p-6 text-ink shadow-card backdrop-blur-xl sm:p-9"
      >
        {/* window chrome */}
        <div className="relative mb-7 flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/80" />
          <span className="ml-3 font-mono text-xs text-ink-faint">
            entrofi/systems/{workflow.id}.flow
          </span>
          <span className="ml-auto inline-flex items-center gap-1.5 text-xs text-ink-muted">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            running
          </span>
        </div>

        {/* Pipeline */}
        <div className="relative grid gap-3 md:grid-cols-6 md:gap-0">
          {/* connector rail (desktop) */}
          <div className="pointer-events-none absolute left-0 right-0 top-7 hidden h-px bg-line md:block">
            <motion.div
              className="h-full bg-accent-grad"
              animate={{ width: `${progress * 100}%` }}
              transition={{ duration: reduce ? 0 : 0.6, ease: "easeInOut" }}
            />
          </div>

          {stages.map((stage, i) => {
            const meta = KIND_META[stage.kind as WorkflowStageKind];
            const Icon = meta.icon;
            const isActive = i === active;
            const isDone = i < active || reduce;

            return (
              <div
                key={stage.name}
                className="relative flex items-start gap-4 md:flex-col md:items-center md:gap-0 md:px-2 md:text-center"
              >
                {/* node */}
                <div className="relative z-10 md:mb-4">
                  <motion.div
                    animate={{
                      scale: isActive && !reduce ? 1.08 : 1,
                      borderColor: isActive || isDone ? meta.color : "rgba(255,255,255,0.1)",
                    }}
                    transition={{ duration: 0.3 }}
                    className="flex h-14 w-14 items-center justify-center rounded-2xl border bg-surface-2"
                    style={{
                      boxShadow: isActive
                        ? `0 0 0 4px ${meta.color}22, 0 0 26px -4px ${meta.color}`
                        : "none",
                    }}
                  >
                    <Icon
                      className="h-5 w-5 transition-colors"
                      style={{ color: isActive || isDone ? meta.color : "#6F6F7E" }}
                    />
                    {isDone && !isActive && (
                      <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-white">
                        <Check className="h-2.5 w-2.5" strokeWidth={3} />
                      </span>
                    )}
                  </motion.div>
                </div>

                {/* label */}
                <div className="min-w-0 md:px-1">
                  <span
                    className="block text-[0.7rem] font-medium uppercase tracking-wider"
                    style={{ color: meta.color }}
                  >
                    {meta.label}
                  </span>
                  <p
                    className={cn(
                      "text-sm font-medium transition-colors",
                      isActive || isDone ? "text-ink" : "text-ink-muted"
                    )}
                  >
                    {stage.name}
                  </p>
                  <p className="mt-0.5 text-xs text-ink-faint">{stage.detail}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* status line */}
        <div className="relative mt-8 flex items-center justify-between border-t border-line pt-5">
          <p className="font-mono text-xs text-ink-muted">
            <span className="text-accent">●</span> stage {active + 1}/{count}
            <span className="text-ink-faint"> — </span>
            {stages[active].name.toLowerCase()}
          </p>
          <p className="hidden text-xs text-ink-faint sm:block">
            Illustrative. Real systems are built to your stack and rules.
          </p>
        </div>
      </div>
    </Section>
  );
}
