import { Workflow, Cable, Cog, Bot, type LucideIcon } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { system } from "@/lib/content";

const ICONS: Record<string, LucideIcon> = {
  workflow: Workflow,
  plug: Cable,
  cog: Cog,
  bot: Bot,
};

export function System() {
  return (
    <Section id="system">
      <SectionHeader eyebrow={system.eyebrow} heading={system.heading} sub={system.sub} />

      <RevealGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {system.pillars.map((pillar) => {
          const Icon = ICONS[pillar.icon] ?? Workflow;
          return (
            <RevealItem key={pillar.no}>
              <Card className="h-full p-6">
                <div className="flex items-center justify-between">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-surface-2 text-accent">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="font-mono text-sm text-ink-faint">{pillar.no}</span>
                </div>
                <h3 className="mt-5 text-h3 font-semibold text-ink">{pillar.title}</h3>
                <p className="mt-2 text-body text-ink-muted">{pillar.body}</p>
              </Card>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </Section>
  );
}
