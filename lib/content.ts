/**
 * Single source of truth for all page copy.
 * Sections render from this — no strings hardcoded in components.
 * Swapping positioning or rewording the funnel happens here, once.
 */

export const site = {
  name: "Entrofi",
  domain: "entrofi.com",
  tagline: "AI systems, installed into your business.",
  description:
    "Entrofi installs production-grade AI workflows, automations, and agents into your operations — so a lean team ships like a large one.",
  email: "hello@entrofi.com",
  cta: {
    primary: { label: "Book an AI strategy call", href: "#book" },
    secondary: { label: "See how it works", href: "#how" },
  },
} as const;

export const nav = {
  // Section links are absolute (/#…) so they work from any page, not just home.
  links: [
    { label: "System", href: "/#system" },
    { label: "Process", href: "/#how" },
    { label: "Use cases", href: "/#use-cases" },
    { label: "Pricing", href: "/pricing" },
    { label: "Resources", href: "/resources" },
  ],
} as const;

export const hero = {
  badge: "AI implementation — not advice",
  // Headline is split so the accent lands on a single, deliberate phrase.
  headlineLead: "Run your business on",
  headlineAccent: "AI systems,",
  headlineTail: "not manual labor.",
  sub: "Entrofi designs and deploys AI into the core of how your company operates — the workflows, automations, and agents that let a lean team move like a large one.",
  proofline: "Implementation-first. We don't sell decks — we ship systems that run in production.",
} as const;

export const trust = {
  heading: "Built for the operators running lean",
  segments: ["Agencies", "Founders", "SMBs", "Operators", "Service businesses"],
} as const;

export const problem = {
  eyebrow: "The real cost",
  heading: "Your business runs on manual effort it can't afford.",
  sub: "Most teams don't have a tooling problem. They have an integration-and-automation gap — and they pay for it in headcount, lag, and dropped revenue.",
  items: [
    {
      title: "Work that scales with revenue",
      body: "Every new client adds the same manual steps. Growth means hiring, not leverage.",
    },
    {
      title: "Tools that don't talk",
      body: "Your CRM, inbox, docs, and billing live in silos. The glue between them is a human copy-pasting.",
    },
    {
      title: "No automation layer",
      body: "The repetitive 60% of operations still runs by hand because nobody owns building the system.",
    },
    {
      title: "Knowledge trapped in people",
      body: "Process lives in someone's head. When they're out — or quit — the work stalls.",
    },
  ],
} as const;

export const system = {
  eyebrow: "The Entrofi system",
  heading: "One operating system, installed end to end.",
  sub: "We don't drop in a chatbot and leave. We design the system, build it into your real stack, and hand you something your team actually runs on.",
  pillars: [
    {
      no: "01",
      icon: "workflow",
      title: "AI Workflow Design",
      body: "We map how work actually moves, then redesign each flow around what AI now does better than a person.",
    },
    {
      no: "02",
      icon: "plug",
      title: "Systems Integration",
      body: "Your stack becomes one operational fabric — CRM, comms, data, and billing wired to move together.",
    },
    {
      no: "03",
      icon: "cog",
      title: "Automation Architecture",
      body: "Reliable, observable automations replace the repetitive cycles eating your team's hours.",
    },
    {
      no: "04",
      icon: "bot",
      title: "Agent Deployment",
      body: "Autonomous AI agents take real jobs end to end — with guardrails, approvals, and a human in the loop where it matters.",
    },
  ],
} as const;

export const process = {
  eyebrow: "How it works",
  heading: "A consulting mind. An engineering build.",
  sub: "Four stages. You see working systems early — not a six-month report.",
  steps: [
    {
      no: "01",
      title: "Business Mapping",
      body: "We audit your operations end to end and find where AI creates the most leverage — fastest.",
      meta: "Week 1–2",
    },
    {
      no: "02",
      title: "System Design",
      body: "We architect the AI workflows, agents, and integrations — and the plan to deploy them into your stack.",
      meta: "Week 2–3",
    },
    {
      no: "03",
      title: "Implementation",
      body: "We build, connect, and ship into your real tools. No sandbox demos — production from day one.",
      meta: "Week 3–6",
    },
    {
      no: "04",
      title: "Optimization",
      body: "We measure against the metrics that matter, tune the system, and hand you the controls and the docs.",
      meta: "Ongoing",
    },
  ],
} as const;

export const deliverables = {
  eyebrow: "What you get",
  heading: "Systems you own — not a dependency on us.",
  sub: "Every engagement ends with infrastructure your team controls, documented and handed over.",
  items: [
    { title: "AI workflows, deployed", body: "Live in your stack, monitored, and documented — not a prototype." },
    { title: "Automation systems", body: "The repetitive work, running on its own across your tools." },
    { title: "CRM + marketing ops", body: "Lead capture, routing, follow-up, and reporting, wired together." },
    { title: "Internal AI agents", body: "Configured for real jobs, with guardrails and approval gates." },
    { title: "Documentation + SOPs", body: "Every system written up so your team can run and extend it." },
    { title: "A control layer you own", body: "Dashboards and controls so you're never locked to a black box." },
  ],
} as const;

export const useCases = {
  eyebrow: "Where it lands",
  heading: "Built around how your business actually makes money.",
  items: [
    {
      segment: "Agencies",
      pain: "You're paying skilled people to copy-paste between tools.",
      win: "Client delivery that scales without a proportional jump in headcount.",
    },
    {
      segment: "Freelancers",
      pain: "You are the bottleneck — and the back office.",
      win: "An AI back-office that intakes, drafts, and follows up while you do the work only you can.",
    },
    {
      segment: "Local SMBs",
      pain: "Leads slip through the cracks the moment things get busy.",
      win: "Every lead captured, qualified, and followed up — automatically, every time.",
    },
    {
      segment: "Startups",
      pain: "Your process is held together by Slack messages and good intentions.",
      win: "An operational system that scales cleanly as the team grows.",
    },
  ],
} as const;

/** Drives the interactive "AI system preview" simulation. */
export const preview = {
  eyebrow: "Live system preview",
  heading: "This is what an installed system looks like.",
  sub: "A real workflow, running stage to stage. Pick a system to watch it execute.",
  workflows: [
    {
      id: "sales",
      label: "Inbound Sales",
      stages: [
        { name: "New lead", detail: "Form / ad / DM lands", kind: "trigger" },
        { name: "Enrich", detail: "AI appends firmographics + intent", kind: "ai" },
        { name: "Qualify", detail: "Scored against your ICP rules", kind: "logic" },
        { name: "Draft outreach", detail: "Agent writes a tailored first touch", kind: "agent" },
        { name: "Human approve", detail: "Rep one-click sends or edits", kind: "human" },
        { name: "Sync CRM", detail: "Logged, tagged, sequence started", kind: "system" },
      ],
    },
    {
      id: "support",
      label: "Customer Support",
      stages: [
        { name: "Ticket in", detail: "Email / chat / form", kind: "trigger" },
        { name: "Classify", detail: "AI tags topic + urgency", kind: "ai" },
        { name: "Retrieve", detail: "Pulls answer from your docs", kind: "logic" },
        { name: "Draft reply", detail: "Agent composes the response", kind: "agent" },
        { name: "Escalate?", detail: "Routes edge cases to a human", kind: "human" },
        { name: "Resolve + log", detail: "Closes loop, updates CRM", kind: "system" },
      ],
    },
    {
      id: "ops",
      label: "Back-Office Ops",
      stages: [
        { name: "Doc arrives", detail: "Invoice / contract / PO", kind: "trigger" },
        { name: "Extract", detail: "AI reads the fields", kind: "ai" },
        { name: "Validate", detail: "Checked against your rules", kind: "logic" },
        { name: "Reconcile", detail: "Agent matches to records", kind: "agent" },
        { name: "Flag review", detail: "Exceptions to a human", kind: "human" },
        { name: "Post to system", detail: "Books, billing, archive", kind: "system" },
      ],
    },
  ],
} as const;

export const finalCta = {
  eyebrow: "The window",
  heading: "Your competitors are still doing it by hand.",
  sub: "Every quarter you wait, the gap compounds. We can map your highest-leverage AI system in a single call — and tell you exactly what it takes to install it.",
  cta: { label: "Book an AI strategy call", href: "#book" },
  secondary: "30 minutes. No pitch deck. You leave with a concrete implementation plan.",
} as const;

export const footer = {
  blurb: "We install AI systems into real businesses — so you operate faster, leaner, and more intelligently.",
  columns: [
    {
      title: "Company",
      links: [
        { label: "System", href: "#system" },
        { label: "Process", href: "#how" },
        { label: "Use cases", href: "#use-cases" },
      ],
    },
    {
      title: "Get started",
      links: [
        { label: "Book a call", href: "#book" },
        { label: "Deliverables", href: "#deliverables" },
        { label: "Contact", href: "mailto:hello@entrofi.com" },
      ],
    },
  ],
  legal: ["Privacy", "Terms"],
} as const;

/** Members-only Resources hub — free tools/guides, built to scale. */
export const resources = {
  eyebrow: "Members area",
  heading: "Your Entrofi resources",
  sub: "Free, members-only guides and tools from the team that installs AI systems for a living. More dropping soon.",
  items: [
    {
      slug: "claude-code",
      tag: "Guide",
      title: "Claude Code — setup & mastery",
      blurb:
        "The complete, no-fluff guide to installing Claude Code and running it like an operator: context budget, CLAUDE.md, MCP, skills, subagents, and the daily loop.",
      href: "/resources/claude-code",
      meta: "Self-contained · ~20 min read",
    },
  ],
} as const;

/**
 * Pricing — low → high → custom. Implementation is one-time; ongoing AI
 * systems bill per seat (SMB + Enterprise). Website revamp is the high-ticket
 * offer. Prices/features are starting points — refine here once scoped.
 */
export const pricing = {
  eyebrow: "Pricing",
  heading: "Priced for the leverage it installs.",
  sub: "Start with a single workflow or rebuild your whole operation. Implementation is one-time; ongoing AI systems are billed per seat.",
  note: "Starting points, not quotes — final scope and price are set on your strategy call. Annual and multi-seat discounts available.",
  tiers: [
    {
      id: "launch",
      purchasable: true,
      perSeat: false,
      name: "Launch",
      tagline: "Your first AI system, installed.",
      price: "$1,950",
      unit: "one-time",
      highlight: false,
      badge: "",
      cta: { label: "Get started", href: "#book" },
      features: [
        "Operations & workflow audit",
        "AI opportunity map, ranked by ROI",
        "1 core workflow automated & deployed",
        "Documentation + team handoff",
      ],
    },
    {
      id: "operate",
      purchasable: true,
      perSeat: true,
      name: "Operate",
      tagline: "Always-on AI systems for your team.",
      price: "$99",
      unit: "per seat / mo",
      highlight: true,
      badge: "Most popular",
      cta: { label: "Subscribe", href: "#book" },
      features: [
        "Everything in Launch",
        "Up to 5 workflows automated",
        "AI agents configured with guardrails",
        "CRM + marketing ops, integrated",
        "Monthly optimization & support",
      ],
    },
    {
      id: "revamp",
      purchasable: false,
      perSeat: false,
      name: "Website Revamp",
      tagline: "A new site, with AI built in.",
      price: "from $12k",
      unit: "one-time",
      highlight: false,
      badge: "High-ticket",
      cta: { label: "Book a call", href: "#book" },
      features: [
        "Full redesign & rebuild",
        "AI lead capture, qualifying & follow-up",
        "Conversion-optimized funnels",
        "Analytics + automation wired in",
        "Operate plan, ready to run",
      ],
    },
    {
      id: "enterprise",
      purchasable: false,
      perSeat: false,
      name: "Enterprise",
      tagline: "AI systems at company scale.",
      price: "Custom",
      unit: "volume per seat",
      highlight: false,
      badge: "",
      cta: { label: "Talk to us", href: "#book" },
      features: [
        "Custom systems across departments",
        "Dedicated implementation team",
        "Volume per-seat pricing",
        "SLA + priority support",
        "Security & compliance review",
      ],
    },
  ],
} as const;

export type WorkflowStageKind =
  | "trigger"
  | "ai"
  | "logic"
  | "agent"
  | "human"
  | "system";
