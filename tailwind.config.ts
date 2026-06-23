import type { Config } from "tailwindcss";

/**
 * Entrofi design system — token contract.
 * Spacing: Tailwind's default 4px base scale (kept intentionally).
 * Color: dark-first, three surface elevations, one accent ramp (cyan→blue→violet).
 * Type: a fixed editorial scale, not arbitrary values.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.5rem", lg: "2rem" },
      screens: { "2xl": "1280px" },
    },
    extend: {
      colors: {
        // Themeable palette — values come from CSS vars (see globals.css).
        // Light is the default theme; `html.dark` opts into dark.
        base: "rgb(var(--base) / <alpha-value>)",
        surface: {
          1: "rgb(var(--surface-1) / <alpha-value>)",
          2: "rgb(var(--surface-2) / <alpha-value>)",
          3: "rgb(var(--surface-3) / <alpha-value>)",
        },
        line: "var(--line)",
        "line-strong": "var(--line-strong)",
        ink: {
          DEFAULT: "rgb(var(--ink) / <alpha-value>)",
          muted: "rgb(var(--ink-muted) / <alpha-value>)",
          faint: "rgb(var(--ink-faint) / <alpha-value>)",
        },
        // Accent ramp — Claude orange (warm clay). Constant across themes.
        accent: {
          amber: "#F0A56A",
          DEFAULT: "#D97757",
          coral: "#E08A63",
          rust: "#BE5A3A",
          // Themeable accent for TEXT/icons: legible on each background
          // (rust on cream, amber on dark). Driven by --accent-ink.
          ink: "var(--accent-ink)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      fontSize: {
        // editorial scale: [size, { lineHeight, letterSpacing }]
        "display": ["clamp(2.75rem, 6vw, 4.75rem)", { lineHeight: "1.02", letterSpacing: "-0.03em" }],
        "h1": ["clamp(2.25rem, 4.5vw, 3.5rem)", { lineHeight: "1.05", letterSpacing: "-0.025em" }],
        "h2": ["clamp(1.75rem, 3vw, 2.5rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "h3": ["1.375rem", { lineHeight: "1.25", letterSpacing: "-0.01em" }],
        "lead": ["clamp(1.0625rem, 1.6vw, 1.25rem)", { lineHeight: "1.6", letterSpacing: "-0.005em" }],
        "body": ["1rem", { lineHeight: "1.65" }],
        "sm": ["0.875rem", { lineHeight: "1.55" }],
        "xs": ["0.75rem", { lineHeight: "1.5", letterSpacing: "0.02em" }],
        "eyebrow": ["0.75rem", { lineHeight: "1", letterSpacing: "0.14em" }],
      },
      maxWidth: {
        prose: "44rem",
      },
      borderRadius: {
        xl: "0.875rem",
        "2xl": "1.25rem",
        "3xl": "1.75rem",
      },
      boxShadow: {
        glow: "var(--shadow-glow)",
        card: "var(--shadow-card)",
      },
      backgroundImage: {
        "accent-grad": "linear-gradient(110deg, #F0A56A 0%, #D97757 48%, #BE5A3A 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
