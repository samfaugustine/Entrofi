# Claude Code — setup & mastery

A single-page guide to setting up and getting the most out of [Claude Code](https://code.claude.com/docs), Anthropic's command-line coding agent.

It's a self-contained `index.html` — no build step, no dependencies, works offline. Open it in any browser, or serve it (see below).

## What's inside

- **The amplification stack** — the mental model: context, tools, reuse, scale.
- **Install** — end-to-end, with clickable tabs for macOS, Windows, and Linux (native installer, package managers, npm, and the native-vs-WSL2 decision).
- **The daily loop** — plan mode, `@` file mentions, context management, permissions, models.
- **CLAUDE.md** — project memory, with an example file.
- **MCP servers** — connecting your tools, including Obsidian as a persistent knowledge layer.
- **Skills, slash commands, hooks** — making workflows repeatable.
- **Subagents & workflows** — scaling beyond one conversation.
- **Essentials** — first session, IDE setup, images, cost, and safety (six clickable tabs).

## View it locally

Open `index.html` directly in a browser, or run a static server:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Accuracy

Commands and steps were verified against the official docs at `code.claude.com/docs` on 23 June 2026. Claude Code ships quickly — run `/help` for the ground truth on your installed version.
