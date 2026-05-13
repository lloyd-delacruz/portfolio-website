# Systems page — add Frontend and Backend stack rows

**Date:** 2026-05-13
**Page:** `/systems`
**Component:** `frontend/src/components/home/SystemsToolchain.tsx`

## Problem

The Systems page currently shows one row of six AI agentic coding tools (Claude Code, Codex, Cursor, Antigravity, Copilot, Gemini). It frames the practice as "AI-native," but it represents only the AI layer — none of the actual frontend or backend tools that turn an agent's output into a shipped product. Visitors leave thinking the work *is* the AI tools, not that the AI tools sit on top of a real full-stack toolkit.

## Goal

Extend the Systems page from one tool row to **three**, each with the same interactive tile + popup pattern:

1. **AI agents** (existing, unchanged)
2. **Frontend stack** (new)
3. **Backend stack** (new)

Each row keeps its own eyebrow, headline, description, and 6 tool tiles. Clicking any tile opens the same modal shape: *What it is · Where the field is now · How it works · In my work + project chips*.

## Page structure (after change)

```
HomeNav
Hero (existing — "The system behind the systems")
┌──────────────────────────────────────────┐
│ Card 1 — AI agents toolchain (existing)  │
│   Eyebrow: "The toolchain"               │
│   H2: "Agents do the heavy lifting…"     │
│   6 tiles                                │
└──────────────────────────────────────────┘
┌──────────────────────────────────────────┐
│ Card 2 — Frontend stack (NEW)            │
│   Eyebrow: "The frontend"                │
│   H2: "The interface layer."             │
│   6 tiles                                │
└──────────────────────────────────────────┘
┌──────────────────────────────────────────┐
│ Card 3 — Backend stack (NEW)             │
│   Eyebrow: "The backend"                 │
│   H2: "Where the data lives."            │
│   6 tiles                                │
└──────────────────────────────────────────┘
FooterCTA
SiteFooter
```

## Tool lineup

### Row 2 — Frontend (6 tiles)

| Tool | Vendor | Iconography |
|---|---|---|
| Next.js | Vercel | Lucide `Layers` or "N" monogram |
| Astro | Astro | "A" monogram (orange/violet gradient) |
| React | Meta | Lucide `Atom` |
| TypeScript | Microsoft | "Ts" monogram (#3178c6) |
| Tailwind CSS | Tailwind Labs | Lucide `Wind` |
| shadcn/ui | shadcn | "sh" monogram (ink/cream) |

### Row 3 — Backend (6 tiles)

| Tool | Vendor | Iconography |
|---|---|---|
| Node.js | OpenJS Foundation | Lucide `Hexagon` |
| Express | OpenJS Foundation | Lucide `Route` |
| Django | Django Software Foundation | "Dj" monogram (#092e20) |
| Wasp | Wasp-lang | "W" monogram |
| Prisma | Prisma | Lucide `Database` |
| PostgreSQL | PostgreSQL Global | Lucide `Database` (filled) or elephant monogram |

**Iconography rule:** prefer Lucide icons when the tool's identity has a clean visual analog (`Layers`, `Database`, `Wind`, `Atom`). Use a colored monogram tile when no Lucide icon fits. All icons render in the same `h-11 w-11 rounded-xl bg-[#f5f3f8]` container that the AI row uses, so layout stays uniform.

## Popup content shape

Identical to existing AI tiles — `Tool` type unchanged:

```ts
type Tool = {
  name: string
  vendor: string
  logo: string            // existing field; for new tiles this is unused or contains a placeholder
  icon?: LucideIcon       // NEW optional field
  monogram?: { text: string; bg: string; fg: string }  // NEW optional field
  tagline: string
  what: string
  trend: string
  how: string
  inWork: string
  projects: Project[]
  url: string
  site: string
}
```

A tile renders `icon` if set, else `monogram` if set, else falls back to `logo` (AI row).

## Copy strategy (drafted at implementation, not in this spec)

For each of the 12 new tiles, I will draft:

- **Tagline** — one line, what kind of thing it is ("Component-driven React framework with file-system routing.")
- **What it is** — 2–3 sentences, plain English
- **Where the field is now** — 2–3 sentences, current trajectory
- **How it works** — 2–3 sentences, technical mechanism
- **In my work** — 1 sentence, how Lloyd uses it
- **Projects** — 2–3 chips. Mapping below; user confirms during implementation.

### Project mapping (draft — confirm during implementation)

| Tool | Likely projects |
|---|---|
| Next.js | This site, EquiTrackr, SpendWise |
| Astro | *(needs user confirmation — which project?)* |
| React | This site, all dashboards |
| TypeScript | This site, EquiTrackr, SpendWise |
| Tailwind | This site, EquiTrackr, SpendWise |
| shadcn/ui | This site, EquiTrackr |
| Node.js | EquiTrackr, SpendWise |
| Express | *(needs user confirmation — which project?)* |
| Django | *(needs user confirmation — which project?)* |
| Wasp | *(needs user confirmation — which project?)* |
| Prisma | SpendWise, EquiTrackr |
| PostgreSQL | SpendWise, EquiTrackr |

## Code architecture

Refactor `SystemsToolchain.tsx` to a single component that:

1. Owns one shared modal state (one `active: Tool | null`).
2. Renders three labeled `<ToolRow>` blocks back-to-back inside the page.
3. Each `<ToolRow>` takes `{ eyebrow, headline, description, tools }` and renders the rounded white card + tile grid.
4. The modal logic, escape handling, and body-overflow lock live once at the parent level.

Concrete file changes:

- **Edit** `frontend/src/components/home/SystemsToolchain.tsx`
  - Extract the row UI into an internal `ToolRow` subcomponent.
  - Add `FRONTEND_TOOLS` and `BACKEND_TOOLS` arrays alongside the renamed `AI_TOOLS`.
  - Add the optional `icon` and `monogram` fields to the `Tool` type.
  - Extend the tile/popup render to handle icon and monogram cases.
- **No changes** to `frontend/src/app/systems/page.tsx` — it already renders `<SystemsToolchain />` and that single instance now produces all three rows.
- **No new logo files** required (sidestepping the missing-SVG issue).

## Visual hierarchy

The AI row keeps its branded SVG logos and stays the visual marquee. Frontend and Backend rows use Lucide icons / monograms in the same tile container — slightly quieter, intentional. This signals: the AI layer is the distinguishing layer; the stack rows are the credible foundation under it.

## Out of scope

- New static assets (no SVG logos added)
- Data/analytics row, infrastructure row, healthcare row (deferred — possible future additions)
- Changes to the page hero, FooterCTA, or SiteFooter
- Changes to the AI row's existing copy or behavior

## Acceptance criteria

- `/systems` renders three stacked cards (AI agents, Frontend, Backend), each with 6 tiles.
- Clicking any tile in any row opens the same modal shape with all four content sections.
- Escape and backdrop-click close the modal.
- The page passes `npm run lint` and `npm run type-check`.
- New tiles use Lucide icons or monograms; no missing SVG references.
- Project chips on new tiles link to existing `/work/*` and `/dashboards/*` routes (chips with no real route render as inert text, matching the existing "Every repo" pattern).
