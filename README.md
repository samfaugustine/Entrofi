# Entrofi — Landing Page

Production-grade marketing site for **Entrofi**, an AI implementation company that installs AI systems into real businesses.

Built as a designed product interface, not a template: a real design-system contract, copy modeled as typed data, an accessibility + reduced-motion contract, and a performance budget on every animation.

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **TailwindCSS** — token-driven design system (`tailwind.config.ts`)
- **Framer Motion** — scroll reveals + the interactive system preview
- **lucide-react** — icons
- No UI kit dependency; primitives are hand-built in the shadcn spirit.

## Run

```bash
npm install
npm run dev      # http://localhost:3400
npm run build    # production build
```

## Architecture

```
app/
  layout.tsx        Root layout — fonts, SEO metadata, JSON-LD, skip link
  page.tsx          Section composition (server component)
  globals.css       Design-system CSS layer + reduced-motion contract
components/
  ui/               Primitives: Button, Card, Badge, Section, Logo
  motion/           Reveal / RevealGroup / RevealItem (scroll choreography)
  sections/         One file per page section
lib/
  content.ts        All copy as typed data — single source of truth
  utils.ts          cn() class merger
```

## Design system

- **Color** — dark-first; base `#07070A` + three surface elevations; one accent ramp (cyan → blue → violet).
- **Type** — Inter, fixed editorial scale (`display / h1 / h2 / h3 / lead / body`), tight tracking on headings.
- **Spacing** — Tailwind's 4px base scale; 1280px max container.
- **Motion** — single easing curve `[0.16, 1, 0.3, 1]`, fade + 16px lift, staggered. Every animation collapses under `prefers-reduced-motion`.

## Notable engineering

- **Hero network canvas** (`HeroBackground.tsx`) — DPR-capped, paused offscreen (IntersectionObserver) and when the tab is hidden, fully skipped under reduced motion with a static gradient fallback.
- **Interactive system preview** (`SystemPreview.tsx`) — tabbed, auto-playing workflow simulation driven entirely from `lib/content.ts`.
- **Copy as data** — rewording the funnel never touches a component.

## Editing copy

All page text lives in `lib/content.ts`. Change positioning, sections, or the workflow simulations there — components render from it.
