# Systems page — redesign for mature AI engineering practice

**Date:** 2026-05-13
**Status:** Approved (brainstorming complete)
**Target route:** `/systems`

---

## Problem

The current `/systems` page reads as an AI-tool catalog. Its center of gravity is the 18-tile `SystemsToolchain` component (`AI Tools` / `Frontend` / `Backend`), and the workflow diagram (`AIWorkflowAlgorithm`) is a 7-step pipeline with a single binary `PASS?` gate. The page communicates *which tools I use* much more strongly than *how I engineer with them*.

For both audiences this page should convince — enterprise/healthcare tech buyers and senior engineers — that framing is the wrong way around. Decision-makers want to see governance, gates, and observability; engineers want to see specific techniques, named artifacts, and orchestration patterns. The toolchain belongs as supporting reference, not as the headline.

## Audience

Both, balanced: top of page reads as enterprise-credible (discipline, gates, observability); deeper sections satisfy engineers (specific techniques, real artifacts, orchestration patterns).

## Goals

1. Shift the page's center of gravity from *tool catalog* to *engineering practice*.
2. Upgrade the workflow diagram to read as architecture, not marketing flow — denser, more technical, calmer palette.
3. Surface four practice areas explicitly: evaluation, security, orchestration, observability.
4. Demote the toolchain to a compact reference at the bottom of the page.
5. Keep the page honest: do not claim CI gates, secret scanners, or eval suites that this repo does not currently enforce. Frame those as the discipline brought to projects that warrant it.

## Non-goals

- Adding interactivity beyond what already exists (no new modals, no expanding panels).
- Building a "stack picker" or filterable tool gallery — the user wants the toolchain demoted, not enriched.
- Touching pages other than `/systems`.
- Adding new design tokens — the redesign reuses existing `home2` tokens (`--plum`, `--ink-soft`, `ghair`, `soft-shadow-sm`, `lift`, etc.).

---

## Page structure (final, top to bottom)

| # | Section | Component | Status |
|---|---|---|---|
| 1 | `HomeNav` | `HomeNav` | unchanged |
| 2 | Hero | inline in `page.tsx` | **copy rewritten** |
| 3 | The loop | `EngineeringLoop` | **renamed + redesigned** (was `AIWorkflowAlgorithm`) |
| 4 | Practice panels (2×2 grid) | `EngineeringPractice` | **new** |
| 5 | Stack reference | `StackReference` | **new** (replaces `SystemsToolchain`) |
| 6 | `FooterCTA` | `FooterCTA` | unchanged |
| 7 | `SiteFooter` | `SiteFooter` | unchanged |

### Files touched

- `frontend/src/app/systems/page.tsx` — new hero copy, new section ordering, swapped imports
- `frontend/src/components/home/AIWorkflowAlgorithm.tsx` → renamed to `EngineeringLoop.tsx`, stages and visual treatment refactored
- `frontend/src/components/home/AIWorkflowAlgorithm.test.tsx` → renamed to `EngineeringLoop.test.tsx`, updated for new stages and component name
- `frontend/src/components/home/EngineeringPractice.tsx` — **new** (the four-panel grid)
- `frontend/src/components/home/StackReference.tsx` — **new** (the compact stack tiles)
- `frontend/src/components/home/SystemsToolchain.tsx` — **deleted**

---

## Section 1 — Hero copy

**Eyebrow:** `How I engineer` (replaces `How I build`)

**Heading:** `The system behind the systems.` (unchanged — already strong)

**Body:**

> Spec before code. Multi-gate verification. Named artifacts at every stage. Observable in production. The discipline is what lets a one-person practice ship production-grade systems — the toolchain just makes it fast.

Replaces the current body which leads with "I work AI-native: agentic coding tools handle the heavy lifting." Rationale: the new copy names the four practice areas the page now covers, leads with discipline rather than tools, and the final clause primes the reader for the demoted stack reference at the bottom.

---

## Section 2 — `EngineeringLoop` (the workflow diagram)

### Stage list

Seven stages, same horizontal layout as the current pipeline. Three substantive changes from the current `AIWorkflowAlgorithm`:

| Position | Old stage | New stage | Why |
|---|---|---|---|
| 0 | FRAME | FRAME | unchanged — problem + constraints |
| 1 | SPEC | SPEC | unchanged — design before code |
| 2 | PLAN | PLAN | unchanged — decompose to reviewable units |
| 3 | DISPATCH AGENTS | **BUILD** | emphasizes that code + tests are produced, not that agents are dispatched |
| 4 | PASS? (decision diamond) | **VERIFY** (rectangular node, multi-gate inside) | the single biggest change — see chip cluster below |
| 5 | REVIEW | folded into VERIFY as the `human review` gate | code review is one gate among several, not its own stage |
| 6 | SHIP | SHIP | unchanged — release |
| — | (none) | **OBSERVE** (new final stage) | logs, traces, prod feedback — closes the loop |

Net: still 7 stages, but `OBSERVE` is added and `REVIEW` is folded in, which lets the diagram cover more ground while keeping the same width.

### Inside the VERIFY node — gate chips

Where the current diagram has a single decision diamond, VERIFY contains a visible stack of small labeled chips representing actual gates that run:

```
┌─ VERIFY ───────────┐
│  ▸ tsc             │   types
│  ▸ eslint          │   lint
│  ▸ vitest          │   unit + component tests
│  ▸ eval / regression│  prompt/output regression (where applicable)
│  ▸ secrets check   │   pre-push secrets scan
│  ▸ human review    │   diff approval before merge
└────────────────────┘
```

**Phrasing locked in during brainstorming:**

- `eval / regression` (not bare `eval` — clearer to non-ML readers)
- `secrets check` (not `gitleaks / equivalent` — this repo doesn't currently install gitleaks, so the chip names the practice, not the tool)

### Loop-back logic

Two loop-back arrows, not one:

- **Short loop**: VERIFY → PLAN (when a specific gate fails because of an implementation issue — typical iteration)
- **Long loop**: OBSERVE → FRAME (when production learning, an incident, or new constraints require revisiting the spec)

Visually, the short loop is the prominent amber arc above the diagram (similar to the current arc, but originating from VERIFY rather than the old PASS? diamond). The long loop is a thinner, lower-contrast arc that runs along the bottom of the diagram from OBSERVE back to FRAME, with a small `prod feedback` annotation mid-line.

### Artifact labels (below each node)

Each stage gets a monospace label below the node naming the artifact it produces:

```
FRAME    SPEC      PLAN      BUILD       VERIFY        SHIP            OBSERVE
brief    spec.md   plan.md   diff+tests  gate report   release notes   logs/traces
```

Font: `font-mono text-[10px] text-ink-muted`, sits ~12px below each node card. This is the dominant new visual signal — every stage produces a real, named thing.

### Visual treatment changes

- **Palette pruned**: current uses 5 colors (`--plum`, `--blue`, `--pink`, `--amber`, `--green`). New uses 3: `--ink` for the primary tone, `--plum` as the single accent, `--amber` reserved for the loop-back arrows only. Calmer, more architectural.
- **No decision diamond**: VERIFY is a regular rectangular card (same dimensions as the others), distinguished only by the gate chips visible inside it.
- **Subtle canvas background**: a faint warm panel behind the diagram (`bg-cream/50` or similar) with a 1px `ghair` border, giving the diagram the read of an architecture sketch on a worksheet rather than floating elements.
- **Mid-line connector annotations**: small `font-mono text-[10px]` labels mid-segment on key connectors — `pr` between BUILD and VERIFY, `tag` between SHIP and OBSERVE.
- **Thinner connectors**: 1.5px lines instead of the current 2px+circle-cap treatment, with single small arrowheads. Reads as schematic rather than decorated.

### Mobile (`md:hidden`) treatment

Same stage list and same artifact labels, stacked vertically. The chip cluster inside VERIFY renders as a small vertical list of chips. Both loop-back arrows are present:

- Short loop: amber arc on the left from VERIFY back up to PLAN (the existing pattern)
- Long loop: thinner amber arc on the right from OBSERVE back up to FRAME

### Accessibility

The existing `<ol className="sr-only">` screen-reader linearization is updated for the new stages and longLabels. The `<p className="sr-only">` line at the bottom is updated to describe both loops: "If a verification gate fails, return to Plan. If production observation reveals a spec issue, return to Frame."

### Component rename

`AIWorkflowAlgorithm.tsx` → `EngineeringLoop.tsx`. The exported function is renamed accordingly. The test file `AIWorkflowAlgorithm.test.tsx` is also renamed and updated. The import in `app/systems/page.tsx` is updated. The marker IDs in the SVG (`aiwf-arrow`, `aiwf-arrow-mobile`) are renamed to `eloop-arrow` and `eloop-arrow-mobile` for hygiene.

---

## Section 3 — `EngineeringPractice` (the four panels)

### Layout

A new section between the loop diagram and the stack reference. Renders as a 2×2 grid on desktop (`lg:grid-cols-2`), full-width single column on mobile. Sits inside the existing `max-w-[1180px]` container with the same `mx-auto px-6` framing as the rest of the page.

Section heading:

> **PRACTICE**
>
> ## What the loop runs inside.
>
> Four areas where AI engineering either holds up or quietly breaks. The loop above is the cycle; these are the things the cycle has to be good at.

### Panel template (all four use this structure)

```
┌─────────────────────────────────────────┐
│ PRACTICE                                │   eyebrow: text-[11px] uppercase tracking-[0.18em] text-plum
│ <Heading>                               │   font-display text-xl/2xl font-extrabold
│                                         │
│ <One-line lede>                         │   text-[14px] text-ink-soft
│                                         │
│ • <Practice line>                       │   text-[13.5px] text-ink-soft
│ • <Practice line>                       │
│ • <Practice line>                       │
│ • <Practice line>                       │
│                                         │
│ artifact → <name>                       │   font-mono text-[11px] text-ink-muted
└─────────────────────────────────────────┘
```

Card chrome: `rounded-[1.6rem] bg-white/70 ghair p-7 sm:p-9` — matches the existing `ToolRow` cards in the current SystemsToolchain so the section reads as continuous with the page's visual language.

### Panel order (intentional)

1. **Evaluation & quality gates** — expands the VERIFY node from the diagram
2. **Orchestration patterns** — expands the BUILD node (how the work is divided)
3. **Security & supply chain** — cross-cutting concern
4. **Observability & production readiness** — expands OBSERVE, closes the loop

### Panel 1 — Evaluation & quality gates

**Lede:** AI-generated code looks correct more often than it is correct. The gate set catches the gap between *renders* and *behaves*.

**Practice bullets:**

- Type-check on every change (`tsc --noEmit`) — strict mode, no escape hatches
- Lint with project-scoped rules (`next lint`)
- Component + unit tests with `vitest` + React Testing Library; written before the implementation when the behaviour is non-obvious
- For prompt-driven features: a fixed input set diffed against a known-good baseline — regression, not a happy-path call
- The golden path of any UI change is exercised in a browser before "done" is claimed

**Artifact line:** `artifact → gate report`

**Honesty boundary:** `tsc`, `eslint`, and `vitest` lines are anchored by this repo's actual `package.json` scripts and test files. The eval/regression line is framed as a practice (`for prompt-driven features`), not as a claim that this site runs an eval suite.

### Panel 2 — Orchestration patterns

**Lede:** A single agent in a loop is not a system. Real AI engineering is knowing when to fan out, when to serialize, and where to put the human.

**Practice bullets:**

- **Sequential** when steps share state — spec → plan → build → verify, each output feeding the next
- **Parallel** when work is independent — Claude Code subagents and cloud Codex on isolated tasks, reconciled at the diff
- **Bounded autonomy** — every agent gets a scoped task with explicit done-conditions; never "go fix the codebase"
- **Human checkpoint** at every commit and every merge; no auto-merged AI code
- **Reset on thrash** — when an agent loops on the same failure, drop the context and restart with a sharper prompt instead of letting it grind

**Artifact line:** `artifact → plan.md`

**Honesty boundary:** All five lines describe real working practice — Claude Code subagents, cloud Codex, and spec-first planning are evidenced by both the toolchain and the `docs/superpowers/specs/` directory.

### Panel 3 — Security & supply chain

**Lede:** AI-written code inherits AI-typical risks: over-broad permissions, leaked credentials, hallucinated dependencies, and untrusted input reaching shells and databases.

**Practice bullets:**

- Secrets live in `.env.local` and platform secret stores; never in committed files; secrets check before push
- Dependency choices verified against the registry, not the model's memory; pinned versions; minimal surface
- User input is untrusted at every boundary — typed schemas in and out (TypeScript on the wire; Zod on real APIs)
- Agents never hold production credentials; deploys are a separate, human-triggered path
- Static export on public sites — no server attack surface where one isn't needed

**Artifact line:** `artifact → threat model`

**Honesty boundary:** Static export and the TypeScript boundary are real on this site. Secrets-check-before-push, Zod, and the agent/credential separation describe practice on client and production projects. Panel does not claim this repo currently runs gitleaks in CI.

### Panel 4 — Observability & production readiness

**Lede:** "It works on my machine" is not done. Production readiness is the ability to see what's happening and undo a bad change in minutes.

**Practice bullets:**

- Structured logs with request-scoped trace IDs for any service that handles real traffic
- Release tagging on every deploy so an error can be tied to a specific change
- Rollback path written before launch — the release note says exactly how to revert
- Error monitoring (Sentry-class) and a single dashboard for the metric that actually matters — not a wall of charts
- On-call playbooks cover the failure modes that are actually likely, not exhaustive runbooks no one reads

**Artifact line:** `artifact → runbook + release notes`

**Honesty boundary:** Framed as the discipline brought to projects that warrant it — this is a static portfolio site, so the panel is explicitly about how production systems are run, not about this site's own observability.

---

## Section 4 — `StackReference` (the compact stack)

### Layout

A single section between `EngineeringPractice` and `FooterCTA`. Three grouped rows:

| Group | Tools |
|---|---|
| **Agents & editors** | Claude Code · Codex · Cursor · Antigravity · GitHub Copilot · Gemini |
| **Frontend** | Next.js · React · TypeScript · Tailwind · shadcn/ui · Astro |
| **Backend** | Node.js · Express · Prisma · PostgreSQL · Django · Wasp |

Section heading:

> **THE STACK**
>
> ## What I build with.
>
> Six tools per layer, picked for the same reason: they hold up under production work and they don't fight each other.

### Tile design

Each tool tile (~180px wide on desktop):

```
┌────────────────────────────┐
│ [logo]  Next.js            │
│         React framework    │
└────────────────────────────┘
```

- 32px logo/monogram square on the left (reuse the same rendering logic as the current `ToolThumb`: `tool.Icon`, `tool.monogram`, or `tool.logo` fallback chain)
- Tool name in `font-display text-[13px] font-bold`
- One-line role in `text-[11px] text-ink-muted`
- Whole tile is `<a target="_blank" rel="noopener noreferrer">` to the tool's URL
- Hover treatment: existing `lift` class
- Tile chrome: `rounded-2xl bg-white p-4 ghair lift`

Grid: 6 tiles per row on desktop, 3 on tablet (`md:grid-cols-3`), 2 on mobile (`grid-cols-2`).

### Data type

Slim new type:

```ts
type StackTool = {
  name: string
  role: string        // short version of the current `tagline`
  url: string
  logo?: string
  Icon?: LucideIcon
  monogram?: { text: string; bg: string; fg: string }
}
```

Dropped fields (vs current `Tool` type): `vendor`, `tagline` (replaced by `role`), `what`, `trend`, `how`, `inWork`, `projects`, `site`. They belonged to the modal that no longer exists.

### Data source

The 18 entries are carried over from `SystemsToolchain.tsx` with their existing logos, icons, monograms, and URLs intact. The `role` field is a short rewrite of each tool's current `tagline` (one line, max ~30 characters where possible). Specific role strings will be finalized in implementation.

### `ToolThumb` rendering

The current `ToolThumb` helper inside `SystemsToolchain.tsx` is small (~30 lines) and only used in two places that will both be deleted. An equivalent thumb-rendering block is inlined inside `StackReference.tsx` rather than extracted to a shared file. If a future page needs it, that's the moment to extract.

### Deletion

`frontend/src/components/home/SystemsToolchain.tsx` is deleted in the same change. No aliasing, no backwards-compat re-export. The only consumer is `app/systems/page.tsx`, which switches to `StackReference`.

---

## Visual + token reuse

No new design tokens. The redesign reuses the existing `home2` scope:

| Token / class | Used by |
|---|---|
| `--plum`, `--ink`, `--ink-soft`, `--ink-muted`, `--amber`, `--cream` | All sections |
| `ghair`, `ghair-2` | Card outlines |
| `soft-shadow-sm` | Diagram node cards, tile lift state |
| `lift` | Stack tiles |
| `bg-white/70` | Practice panels, loop diagram nodes |
| `font-display` | All headings |
| `font-mono` (new use) | Artifact labels under each loop stage, mid-line connector labels, panel artifact lines |

The mono font defaults to whatever the project's existing mono stack resolves to (Tailwind's `font-mono`). No new font import.

---

## Accessibility

- Loop diagram retains its `<ol className="sr-only">` linearization, updated for the new stages.
- Each gate chip inside VERIFY is a real list item in the SR linearization, so a screen reader hears: "VERIFY — types, lint, tests, eval/regression, secrets check, human review."
- Both loops are described in the SR closing line.
- Practice panel bullets use real `<ul>`/`<li>` markup.
- Stack tiles use `<a>` with `aria-label="Visit <name>"` so the link target is obvious to assistive tech.
- All interactive elements remain keyboard-reachable (no new modals introduced).

---

## Testing

- `EngineeringLoop.test.tsx` (renamed from `AIWorkflowAlgorithm.test.tsx`) is updated to assert:
  - All 7 stages render with their new labels
  - Each stage's artifact label renders
  - VERIFY contains 6 gate chips with the exact labels (`tsc`, `eslint`, `vitest`, `eval / regression`, `secrets check`, `human review`)
  - The screen-reader linearization (`<ol className="sr-only">`) lists all 7 stages
- A new `EngineeringPractice.test.tsx` asserts:
  - All 4 panels render with their heading + artifact line
  - Each panel renders the expected number of bullet items
- A new `StackReference.test.tsx` asserts:
  - All 3 group headings render
  - All 18 tool tiles render with the correct name and link target
- No tests are added for the hero copy or section ordering — the existing page-level smoke is sufficient.

---

## Out of scope (explicitly)

- Adding interactivity to the practice panels (no modals, no "learn more" expands).
- Adding tooltips or hover detail to stack tiles.
- Changing nav, footer, or any other route.
- Adding any new CI, linting, or pre-commit configuration to this repo. The page describes practice; it does not introduce gates that don't exist.
- Adding analytics or instrumentation for the new page.

---

## Honesty boundary (summary)

The page is a description of an engineering practice, not a claim about what this static portfolio repo enforces. Specifics are anchored where the codebase supports them:

- **Real on this repo**: `tsc --noEmit`, `next lint`, `vitest` + RTL tests, TypeScript strict, static export, spec-first workflow via `docs/superpowers/specs/`, multi-agent dispatch via Claude Code subagents.
- **Practice-level (the discipline brought to projects that warrant it)**: eval/regression suites, secrets scanning in CI, Zod boundaries on real APIs, structured logging with trace IDs, Sentry-class error monitoring, threat models, runbooks.

The copy is written so neither category overclaims the other. Where a panel could be misread as a claim about this site (e.g., "secrets check before push"), the surrounding lede frames it as practice ("AI-written code inherits AI-typical risks" — then the practice list answers "here's what I do about it") rather than a system claim.

---

## Approval trail

- Audience: both, balanced (enterprise-credible top, engineer-satisfying depth)
- Diagrams: one denser main diagram + text panels (not main + sub-diagrams)
- Toolchain: demoted to compact stack reference (not removed, not partial)
- Specificity: specific where confident, principles elsewhere
- Component rename to `EngineeringLoop`: approved
- VERIFY chip phrasing: `secrets check` (not `gitleaks / equivalent`); `eval / regression` (not bare `eval`)
- Artifact label list: `brief · spec.md · plan.md · diff+tests · gate report · release notes · logs/traces`
- Both loops: short (VERIFY → PLAN), long (OBSERVE → FRAME)
- Hero copy: approved
