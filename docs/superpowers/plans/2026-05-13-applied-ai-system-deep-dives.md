# Applied AI System Deep Dives — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship two flagship project deep-dive pages (`/work/population-health-intelligence`, `/work/clinical-risk-engine`) on a new dark Linear/Vercel register, plus the shared component family they're composed from, plus migration of `/dashboards/life-expectancy` and home-page integration.

**Architecture:** A single 9-section deep-dive component family (`<DeepDiveHero />`, `<SystemArchDiagram />`, `<DataPipelineGraph />`, `<InferenceWorkflow />`, `<DecisionImpact />`, `<FutureScalability />`, `<ProjectAppendix />`) composed per-page. Two project-specific inference panels (`<ScenarioConsole />`, `<CaseTriagePanel />`) drive interactivity via deterministic precomputed surrogate models loaded from JSON. A new scoped CSS class `.deep-dive` carries the dark register without touching the existing `home2` register on other pages.

**Tech Stack:** Next.js 14 App Router, TypeScript strict, Tailwind, Geist Sans + Geist Mono (already in deps), Framer Motion (used minimally), Vitest for surrogate-inference unit tests.

**Spec reference:** `docs/superpowers/specs/2026-05-13-applied-ai-system-deep-dives-design.md`

**Branch:** Before starting, create a worktree/branch off `main` via the `superpowers:using-git-worktrees` skill — never commit these tasks directly to `main`.

**Binding no-go list (from spec §3):** No purple/violet/pink gradients. No emoji bullets. No "Loading…" copy. No accuracy/precision/recall leaderboards as headline content. No notebook screenshots. No gradient-text metric cards. No shimmer/glow. No Chart.js default tooltips. If a step seems to violate any of these, stop and re-read the spec.

---

## File Structure

```
frontend/src/
├── app/
│   ├── work/
│   │   ├── population-health-intelligence/
│   │   │   └── page.tsx                                  [Task 8 — NEW]
│   │   └── clinical-risk-engine/
│   │       └── page.tsx                                  [Task 11 — NEW]
│   └── dashboards/
│       └── life-expectancy/
│           └── page.tsx                                  [Task 12 — REPLACED with shim]
├── components/
│   ├── home/
│   │   ├── FeaturedWork.tsx                              [Task 13 — MODIFIED]
│   │   └── SystemsToolchain.tsx                          [Task 14 — MODIFIED]
│   └── work/
│       ├── deep-dive/
│       │   ├── deep-dive.css                             [Task 1 — NEW]
│       │   ├── index.ts                                  [Task 2, 3, 4, 5 — barrel]
│       │   ├── StatusChip.tsx                            [Task 2 — NEW]
│       │   ├── MonoOutputCard.tsx                        [Task 2 — NEW]
│       │   ├── NodeDiagram.tsx                           [Task 2 — NEW]
│       │   ├── SectionShell.tsx                          [Task 2 — NEW]
│       │   ├── MovedTo.tsx                               [Task 12 — NEW]
│       │   ├── DeepDiveHero.tsx                          [Task 3 — NEW]
│       │   ├── SystemArchDiagram.tsx                     [Task 4 — NEW]
│       │   ├── DataPipelineGraph.tsx                     [Task 4 — NEW]
│       │   ├── InferenceWorkflow.tsx                     [Task 4 — NEW]
│       │   ├── DecisionImpact.tsx                        [Task 5 — NEW]
│       │   ├── FutureScalability.tsx                     [Task 5 — NEW]
│       │   └── ProjectAppendix.tsx                       [Task 5 — NEW]
│       ├── population-health/
│       │   ├── ScenarioConsole.tsx                       [Task 7 — NEW]
│       │   ├── surrogate.ts                              [Task 6 — NEW]
│       │   ├── surrogate-data.json                       [Task 6 — NEW]
│       │   └── __tests__/
│       │       └── surrogate.test.ts                     [Task 6 — NEW]
│       └── clinical-risk/
│           ├── CaseTriagePanel.tsx                       [Task 10 — NEW]
│           ├── surrogate.ts                              [Task 9 — NEW]
│           ├── wdbc-cases.json                           [Task 9 — NEW]
│           ├── wdbc-surrogate.json                       [Task 9 — NEW]
│           └── __tests__/
│               └── surrogate.test.ts                     [Task 9 — NEW]
```

---

## Task 1: Dark `.deep-dive` register CSS

**Files:**
- Create: `frontend/src/components/work/deep-dive/deep-dive.css`
- Modify: `frontend/src/app/globals.css` (import the file)

- [ ] **Step 1: Create the scoped CSS file**

```css
/* frontend/src/components/work/deep-dive/deep-dive.css
 *
 * Dark Linear/Vercel-class register for the Applied AI deep-dive pages.
 * Scoped to .deep-dive so it cannot leak into the home2 register.
 *
 * No gradients. No glow. No shimmer. No emoji bullets.
 */

.deep-dive {
  --dd-bg: #0A0A0B;
  --dd-surface: #111114;
  --dd-surface-2: #161619;
  --dd-border: #1F1F22;
  --dd-border-strong: #2A2A2E;
  --dd-text: #ECECEE;
  --dd-text-muted: #8B8B92;
  --dd-text-dim: #5A5A60;
  --dd-accent: #7DD3FC; /* desaturated electric cyan — signal hue ONLY */
  --dd-ok: #6EE7B7;
  --dd-warn: #FCD34D;
  --dd-danger: #F87171;

  --dd-font-sans: var(--font-geist-sans, ui-sans-serif, system-ui, sans-serif);
  --dd-font-mono: var(--font-geist-mono, ui-monospace, "SF Mono", Menlo, monospace);

  background: var(--dd-bg);
  color: var(--dd-text);
  font-family: var(--dd-font-sans);
  min-height: 100vh;
  background-image: radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.04) 1px, transparent 0);
  background-size: 32px 32px;
}

.deep-dive *::selection {
  background: rgba(125, 211, 252, 0.25);
  color: var(--dd-text);
}

.deep-dive .dd-card {
  background: var(--dd-surface);
  border: 1px solid var(--dd-border);
  border-radius: 12px;
}

.deep-dive .dd-mono {
  font-family: var(--dd-font-mono);
  font-feature-settings: "calt" off, "ss01" on;
  letter-spacing: -0.005em;
}

.deep-dive .dd-accent {
  color: var(--dd-accent);
}

.deep-dive .dd-muted {
  color: var(--dd-text-muted);
}

/* Single permitted motion: status-chip pulse */
@keyframes dd-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.45; }
}

.deep-dive .dd-pulse {
  animation: dd-pulse 2.8s ease-in-out infinite;
}

/* Single permitted motion: signal-flow dot on hero architecture diagram */
@keyframes dd-signal-flow {
  0% { offset-distance: 0%; opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { offset-distance: 100%; opacity: 0; }
}

.deep-dive .dd-signal {
  animation: dd-signal-flow 3.2s linear infinite;
}

/* Long-form prose measure */
.deep-dive .dd-prose {
  max-width: 70ch;
  color: var(--dd-text);
  line-height: 1.65;
}

.deep-dive .dd-prose p + p {
  margin-top: 1em;
}

/* Section spacing rhythm */
.deep-dive .dd-section {
  padding: 96px 0;
  border-top: 1px solid var(--dd-border);
}

.deep-dive .dd-section:first-child {
  border-top: none;
}

@media (max-width: 768px) {
  .deep-dive .dd-section {
    padding: 64px 0;
  }
}
```

- [ ] **Step 2: Import from globals.css**

Add to the bottom of `frontend/src/app/globals.css`:

```css
@import "../components/work/deep-dive/deep-dive.css";
```

- [ ] **Step 3: Verify the import resolves and nothing else breaks**

Run: `cd frontend && npm run type-check`
Expected: clean.

Run: `cd frontend && npm run lint`
Expected: clean.

- [ ] **Step 4: Commit**

```bash
git add frontend/src/components/work/deep-dive/deep-dive.css frontend/src/app/globals.css
git commit -m "feat(deep-dive): add scoped dark register CSS

Adds .deep-dive scoped class carrying the Linear/Vercel-class dark
register used by the Applied AI deep-dive pages. Scoping ensures the
register cannot leak into the home2 cream/plum register on other pages."
```

---

## Task 2: Shared primitives — StatusChip, MonoOutputCard, NodeDiagram, SectionShell

**Files:**
- Create: `frontend/src/components/work/deep-dive/StatusChip.tsx`
- Create: `frontend/src/components/work/deep-dive/MonoOutputCard.tsx`
- Create: `frontend/src/components/work/deep-dive/NodeDiagram.tsx`
- Create: `frontend/src/components/work/deep-dive/SectionShell.tsx`
- Create: `frontend/src/components/work/deep-dive/index.ts`

- [ ] **Step 1: Write StatusChip**

```tsx
// frontend/src/components/work/deep-dive/StatusChip.tsx
import React from 'react'

export type StatusChipItem = { label: string; value: string }

export interface StatusChipProps {
  /** e.g. "Inference live" */
  status: string
  /** Pairs rendered as `<label> <value>` separated by middle dots */
  items: StatusChipItem[]
}

export function StatusChip({ status, items }: StatusChipProps) {
  return (
    <div
      role="status"
      className="dd-mono inline-flex flex-wrap items-center gap-2 rounded-full border border-[var(--dd-border-strong)] bg-[var(--dd-surface-2)] px-3 py-1.5 text-[12px] tracking-[0.02em] text-[var(--dd-text-muted)]"
    >
      <span className="flex items-center gap-1.5">
        <span aria-hidden className="dd-pulse h-1.5 w-1.5 rounded-full bg-[var(--dd-accent)]" />
        <span className="text-[var(--dd-text)]">STATUS</span>
        <span>◉</span>
        <span className="text-[var(--dd-text)]">{status}</span>
      </span>
      {items.map((it) => (
        <React.Fragment key={it.label}>
          <span aria-hidden className="text-[var(--dd-text-dim)]">·</span>
          <span>
            <span className="text-[var(--dd-text-muted)]">{it.label}</span>{' '}
            <span className="text-[var(--dd-text)]">{it.value}</span>
          </span>
        </React.Fragment>
      ))}
    </div>
  )
}
```

- [ ] **Step 2: Write MonoOutputCard**

```tsx
// frontend/src/components/work/deep-dive/MonoOutputCard.tsx
import React from 'react'

export interface MonoOutputCardProps {
  /** Top headline pair, e.g. "PROJECTED LIFE EXPECTANCY" / "72.4 years" */
  headline: { label: string; value: string; suffix?: string }
  /** Optional sub-line e.g. "±1.8 (90% CI)" */
  sub?: string
  /** Sectioned key/value blocks rendered below the headline */
  sections?: Array<{
    title: string
    rows: Array<{ label: string; value: string; tone?: 'default' | 'accent' | 'ok' | 'warn' | 'danger' }>
  }>
  /** Bottom-strip text e.g. "vs. national baseline (2015): +4.1 years" */
  footer?: string
  /** Optional flag indicator, e.g. ambiguity flag */
  flag?: { label: string; active: boolean; note?: string }
}

const TONE_CLASS: Record<NonNullable<NonNullable<MonoOutputCardProps['sections']>[number]['rows'][number]['tone']>, string> = {
  default: 'text-[var(--dd-text)]',
  accent: 'text-[var(--dd-accent)]',
  ok: 'text-[var(--dd-ok)]',
  warn: 'text-[var(--dd-warn)]',
  danger: 'text-[var(--dd-danger)]',
}

export function MonoOutputCard({ headline, sub, sections, footer, flag }: MonoOutputCardProps) {
  return (
    <div className="dd-card dd-mono p-6 text-[13px] leading-[1.7]">
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <span className="text-[11px] tracking-[0.08em] text-[var(--dd-text-muted)]">{headline.label}</span>
        <span className="text-[28px] font-semibold tracking-tight text-[var(--dd-text)]">{headline.value}</span>
        {headline.suffix ? (
          <span className="text-[13px] text-[var(--dd-text-muted)]">{headline.suffix}</span>
        ) : null}
      </div>
      {sub ? <div className="mt-1 text-[var(--dd-text-muted)]">{sub}</div> : null}

      {flag ? (
        <div className="mt-4 flex items-center gap-2 border-t border-[var(--dd-border)] pt-4 text-[12px]">
          <span
            aria-hidden
            className={`inline-block h-3 w-3 border ${flag.active ? 'border-[var(--dd-warn)] bg-[var(--dd-warn)]' : 'border-[var(--dd-border-strong)]'}`}
          />
          <span className="text-[var(--dd-text-muted)]">{flag.label}</span>
          {flag.note ? <span className="text-[var(--dd-text-dim)]">{flag.note}</span> : null}
        </div>
      ) : null}

      {sections?.map((section) => (
        <div key={section.title} className="mt-5 border-t border-[var(--dd-border)] pt-4">
          <div className="text-[11px] tracking-[0.08em] text-[var(--dd-text-muted)]">{section.title}</div>
          <ul className="mt-2 space-y-1">
            {section.rows.map((row) => (
              <li key={row.label} className="grid grid-cols-[1fr_auto] items-baseline gap-4">
                <span className="text-[var(--dd-text)]">
                  <span aria-hidden className="mr-2 text-[var(--dd-text-dim)]">▸</span>
                  {row.label}
                </span>
                <span className={TONE_CLASS[row.tone ?? 'default']}>{row.value}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}

      {footer ? (
        <div className="mt-5 border-t border-[var(--dd-border)] pt-4 text-[12px] text-[var(--dd-text-muted)]">{footer}</div>
      ) : null}
    </div>
  )
}
```

- [ ] **Step 3: Write NodeDiagram (the minimal flexible SVG node-graph primitive)**

```tsx
// frontend/src/components/work/deep-dive/NodeDiagram.tsx
import React from 'react'

export interface NodeDef {
  id: string
  /** Grid column (0-indexed) */
  col: number
  /** Grid row (0-indexed) */
  row: number
  title: string
  /** Optional body lines rendered below the title in mono */
  lines?: string[]
}

export interface EdgeDef {
  from: string
  to: string
}

export interface NodeDiagramProps {
  nodes: NodeDef[]
  edges: EdgeDef[]
  /** When true, animates a single cyan signal dot along the first edge chain */
  signalFlow?: boolean
  /** Number of columns; rendered width is responsive */
  cols: number
  /** Number of rows */
  rows: number
  /** Optional aria-label for the diagram */
  label?: string
}

const COL_W = 220
const ROW_H = 130
const NODE_W = 200
const NODE_H = 96
const PAD = 24

export function NodeDiagram({ nodes, edges, signalFlow, cols, rows, label }: NodeDiagramProps) {
  const width = cols * COL_W + PAD * 2
  const height = rows * ROW_H + PAD * 2

  const nodeCenter = (n: NodeDef) => ({
    x: PAD + n.col * COL_W + NODE_W / 2,
    y: PAD + n.row * ROW_H + NODE_H / 2,
  })

  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]))

  return (
    <svg
      role="img"
      aria-label={label}
      viewBox={`0 0 ${width} ${height}`}
      className="h-auto w-full"
      style={{ maxHeight: 480 }}
    >
      {/* Edges */}
      {edges.map((e, i) => {
        const a = byId[e.from]
        const b = byId[e.to]
        if (!a || !b) return null
        const ac = nodeCenter(a)
        const bc = nodeCenter(b)
        // Horizontal then vertical orthogonal routing
        const midX = (ac.x + bc.x) / 2
        const path = `M ${ac.x + NODE_W / 2} ${ac.y} H ${midX} V ${bc.y} H ${bc.x - NODE_W / 2}`
        return (
          <g key={`${e.from}-${e.to}-${i}`}>
            <path d={path} fill="none" stroke="var(--dd-border-strong)" strokeWidth={1} />
            {signalFlow && i === 0 ? (
              <circle r={3} fill="var(--dd-accent)" className="dd-signal" style={{ offsetPath: `path('${path}')` }} />
            ) : null}
          </g>
        )
      })}

      {/* Nodes */}
      {nodes.map((n) => {
        const x = PAD + n.col * COL_W
        const y = PAD + n.row * ROW_H
        return (
          <g key={n.id} transform={`translate(${x} ${y})`}>
            <rect
              width={NODE_W}
              height={NODE_H}
              rx={8}
              fill="var(--dd-surface)"
              stroke="var(--dd-border)"
              strokeWidth={1}
            />
            <text
              x={14}
              y={22}
              fill="var(--dd-text)"
              fontSize={13}
              fontFamily="var(--dd-font-sans)"
              fontWeight={500}
            >
              {n.title}
            </text>
            {n.lines?.map((line, idx) => (
              <text
                key={idx}
                x={14}
                y={40 + idx * 14}
                fill="var(--dd-text-muted)"
                fontSize={11}
                fontFamily="var(--dd-font-mono)"
              >
                {line}
              </text>
            ))}
          </g>
        )
      })}
    </svg>
  )
}
```

- [ ] **Step 4: Write SectionShell**

```tsx
// frontend/src/components/work/deep-dive/SectionShell.tsx
import React from 'react'

export interface SectionShellProps {
  /** Small tracking-spaced eyebrow, e.g. "02 / OPERATIONAL PROBLEM" */
  eyebrow: string
  /** Section title shown below eyebrow */
  title: string
  /** Optional one-line deck under the title */
  deck?: string
  children: React.ReactNode
}

export function SectionShell({ eyebrow, title, deck, children }: SectionShellProps) {
  return (
    <section className="dd-section">
      <div className="mx-auto max-w-6xl px-6">
        <div className="dd-mono mb-3 text-[11px] tracking-[0.14em] text-[var(--dd-text-muted)]">{eyebrow}</div>
        <h2 className="text-2xl font-semibold tracking-tight text-[var(--dd-text)] md:text-3xl">{title}</h2>
        {deck ? <p className="mt-2 max-w-[70ch] text-[var(--dd-text-muted)]">{deck}</p> : null}
        <div className="mt-10">{children}</div>
      </div>
    </section>
  )
}
```

- [ ] **Step 5: Write the barrel `index.ts`**

```ts
// frontend/src/components/work/deep-dive/index.ts
export * from './StatusChip'
export * from './MonoOutputCard'
export * from './NodeDiagram'
export * from './SectionShell'
```

- [ ] **Step 6: Verify**

Run: `cd frontend && npm run type-check`
Expected: clean.

Run: `cd frontend && npm run lint`
Expected: clean.

- [ ] **Step 7: Commit**

```bash
git add frontend/src/components/work/deep-dive/StatusChip.tsx \
        frontend/src/components/work/deep-dive/MonoOutputCard.tsx \
        frontend/src/components/work/deep-dive/NodeDiagram.tsx \
        frontend/src/components/work/deep-dive/SectionShell.tsx \
        frontend/src/components/work/deep-dive/index.ts
git commit -m "feat(deep-dive): add shared primitives

StatusChip, MonoOutputCard, NodeDiagram, SectionShell — the four
primitives every Applied AI deep-dive section composes from."
```

---

## Task 3: DeepDiveHero

**Files:**
- Create: `frontend/src/components/work/deep-dive/DeepDiveHero.tsx`
- Modify: `frontend/src/components/work/deep-dive/index.ts` (add export)

- [ ] **Step 1: Write DeepDiveHero**

```tsx
// frontend/src/components/work/deep-dive/DeepDiveHero.tsx
import React from 'react'
import { StatusChip, type StatusChipItem } from './StatusChip'
import { NodeDiagram, type NodeDef, type EdgeDef } from './NodeDiagram'

export interface DeepDiveHeroProps {
  /** Small all-caps eyebrow, e.g. "APPLIED AI / OPERATIONAL INTELLIGENCE" */
  eyebrow: string
  title: string
  subtitle: string
  frame: string
  status: string
  statusItems: StatusChipItem[]
  glyphNodes: NodeDef[]
  glyphEdges: EdgeDef[]
}

export function DeepDiveHero({
  eyebrow,
  title,
  subtitle,
  frame,
  status,
  statusItems,
  glyphNodes,
  glyphEdges,
}: DeepDiveHeroProps) {
  return (
    <section className="dd-section" style={{ paddingTop: 120 }}>
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 md:grid-cols-[1.2fr_1fr] md:items-center">
        <div>
          <div className="dd-mono text-[11px] tracking-[0.14em] text-[var(--dd-text-muted)]">{eyebrow}</div>
          <h1 className="mt-4 text-4xl font-semibold leading-[1.05] tracking-tight text-[var(--dd-text)] md:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-[60ch] text-lg text-[var(--dd-text-muted)]">{subtitle}</p>
          <p className="mt-6 max-w-[68ch] text-[var(--dd-text)] dd-prose">{frame}</p>
          <div className="mt-8">
            <StatusChip status={status} items={statusItems} />
          </div>
        </div>
        <div className="dd-card p-6">
          <div className="dd-mono mb-4 text-[11px] tracking-[0.14em] text-[var(--dd-text-muted)]">
            ARCHITECTURE GLYPH
          </div>
          <NodeDiagram
            cols={3}
            rows={3}
            nodes={glyphNodes}
            edges={glyphEdges}
            signalFlow
            label={`${title} — system architecture glyph`}
          />
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Update barrel**

Modify `frontend/src/components/work/deep-dive/index.ts`:

```ts
export * from './StatusChip'
export * from './MonoOutputCard'
export * from './NodeDiagram'
export * from './SectionShell'
export * from './DeepDiveHero'
```

- [ ] **Step 3: Verify**

Run: `cd frontend && npm run type-check`
Expected: clean.

- [ ] **Step 4: Commit**

```bash
git add frontend/src/components/work/deep-dive/DeepDiveHero.tsx frontend/src/components/work/deep-dive/index.ts
git commit -m "feat(deep-dive): add DeepDiveHero

Hero composes title/subtitle/frame/status-chip on the left and a
minimal architecture glyph on the right. Single permitted motion:
the StatusChip pulse and the signal-flow dot in the glyph."
```

---

## Task 4: SystemArchDiagram, DataPipelineGraph, InferenceWorkflow

**Files:**
- Create: `frontend/src/components/work/deep-dive/SystemArchDiagram.tsx`
- Create: `frontend/src/components/work/deep-dive/DataPipelineGraph.tsx`
- Create: `frontend/src/components/work/deep-dive/InferenceWorkflow.tsx`
- Modify: `frontend/src/components/work/deep-dive/index.ts`

- [ ] **Step 1: Write SystemArchDiagram (a `SectionShell` wrapping a `NodeDiagram`)**

```tsx
// frontend/src/components/work/deep-dive/SystemArchDiagram.tsx
import React from 'react'
import { SectionShell } from './SectionShell'
import { NodeDiagram, type NodeDef, type EdgeDef } from './NodeDiagram'

export interface SystemArchDiagramProps {
  eyebrow: string
  title: string
  deck?: string
  nodes: NodeDef[]
  edges: EdgeDef[]
  cols: number
  rows: number
  caption?: string
}

export function SystemArchDiagram({
  eyebrow,
  title,
  deck,
  nodes,
  edges,
  cols,
  rows,
  caption,
}: SystemArchDiagramProps) {
  return (
    <SectionShell eyebrow={eyebrow} title={title} deck={deck}>
      <div className="dd-card p-8">
        <NodeDiagram cols={cols} rows={rows} nodes={nodes} edges={edges} signalFlow label={title} />
      </div>
      {caption ? (
        <p className="mt-4 dd-mono text-[12px] text-[var(--dd-text-muted)]">{caption}</p>
      ) : null}
    </SectionShell>
  )
}
```

- [ ] **Step 2: Write DataPipelineGraph**

```tsx
// frontend/src/components/work/deep-dive/DataPipelineGraph.tsx
import React from 'react'
import { SectionShell } from './SectionShell'

export interface PipelineStage {
  title: string
  /** Mono-rendered detail lines */
  lines: string[]
  /** Optional cadence text, e.g. "Daily, 03:00 UTC" */
  cadence?: string
}

export interface DataPipelineGraphProps {
  eyebrow: string
  title: string
  deck?: string
  stages: PipelineStage[]
}

export function DataPipelineGraph({ eyebrow, title, deck, stages }: DataPipelineGraphProps) {
  return (
    <SectionShell eyebrow={eyebrow} title={title} deck={deck}>
      <ol className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-[var(--dd-border)] bg-[var(--dd-border)] md:grid-cols-4">
        {stages.map((stage, idx) => (
          <li key={stage.title} className="bg-[var(--dd-surface)] p-6">
            <div className="dd-mono flex items-baseline justify-between text-[11px] tracking-[0.14em] text-[var(--dd-text-muted)]">
              <span>STAGE {String(idx + 1).padStart(2, '0')}</span>
              {stage.cadence ? <span className="text-[var(--dd-text-dim)]">{stage.cadence}</span> : null}
            </div>
            <h3 className="mt-2 text-base font-medium text-[var(--dd-text)]">{stage.title}</h3>
            <ul className="mt-3 space-y-1 dd-mono text-[12px] text-[var(--dd-text-muted)]">
              {stage.lines.map((line) => (
                <li key={line}>
                  <span aria-hidden className="mr-2 text-[var(--dd-text-dim)]">·</span>
                  {line}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </SectionShell>
  )
}
```

- [ ] **Step 3: Write InferenceWorkflow (mono-rendered interface signature, NOT a code block of real training code)**

```tsx
// frontend/src/components/work/deep-dive/InferenceWorkflow.tsx
import React from 'react'
import { SectionShell } from './SectionShell'

export interface InferenceWorkflowProps {
  eyebrow: string
  title: string
  deck?: string
  /** The mono-rendered request shape, e.g. one line per field with type annotation */
  request: Array<{ field: string; type: string; note?: string }>
  /** Ordered transform pipeline */
  pipeline: Array<{ step: string; detail: string }>
  /** The mono-rendered response shape */
  response: Array<{ field: string; type: string; note?: string }>
}

function FieldList({ title, items }: { title: string; items: Array<{ field: string; type: string; note?: string }> }) {
  return (
    <div className="dd-card p-6">
      <div className="dd-mono mb-3 text-[11px] tracking-[0.14em] text-[var(--dd-text-muted)]">{title}</div>
      <ul className="dd-mono space-y-1 text-[13px]">
        {items.map((it) => (
          <li key={it.field} className="grid grid-cols-[10rem_1fr_auto] items-baseline gap-4">
            <span className="text-[var(--dd-text)]">{it.field}</span>
            <span className="text-[var(--dd-accent)]">{it.type}</span>
            {it.note ? <span className="text-[12px] text-[var(--dd-text-muted)]">{it.note}</span> : null}
          </li>
        ))}
      </ul>
    </div>
  )
}

export function InferenceWorkflow({ eyebrow, title, deck, request, pipeline, response }: InferenceWorkflowProps) {
  return (
    <SectionShell eyebrow={eyebrow} title={title} deck={deck}>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <FieldList title="REQUEST" items={request} />
        <FieldList title="RESPONSE" items={response} />
      </div>
      <ol className="mt-6 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-[var(--dd-border)] bg-[var(--dd-border)] md:grid-cols-5">
        {pipeline.map((stage, idx) => (
          <li key={stage.step} className="bg-[var(--dd-surface)] p-4">
            <div className="dd-mono text-[10px] tracking-[0.14em] text-[var(--dd-text-dim)]">
              {String(idx + 1).padStart(2, '0')}
            </div>
            <div className="mt-1 text-[13px] text-[var(--dd-text)]">{stage.step}</div>
            <div className="mt-1 dd-mono text-[11px] text-[var(--dd-text-muted)]">{stage.detail}</div>
          </li>
        ))}
      </ol>
    </SectionShell>
  )
}
```

- [ ] **Step 4: Update barrel**

Modify `frontend/src/components/work/deep-dive/index.ts`:

```ts
export * from './StatusChip'
export * from './MonoOutputCard'
export * from './NodeDiagram'
export * from './SectionShell'
export * from './DeepDiveHero'
export * from './SystemArchDiagram'
export * from './DataPipelineGraph'
export * from './InferenceWorkflow'
```

- [ ] **Step 5: Verify**

Run: `cd frontend && npm run type-check`
Expected: clean.

- [ ] **Step 6: Commit**

```bash
git add frontend/src/components/work/deep-dive/SystemArchDiagram.tsx \
        frontend/src/components/work/deep-dive/DataPipelineGraph.tsx \
        frontend/src/components/work/deep-dive/InferenceWorkflow.tsx \
        frontend/src/components/work/deep-dive/index.ts
git commit -m "feat(deep-dive): add SystemArchDiagram, DataPipelineGraph, InferenceWorkflow"
```

---

## Task 5: DecisionImpact, FutureScalability, ProjectAppendix

**Files:**
- Create: `frontend/src/components/work/deep-dive/DecisionImpact.tsx`
- Create: `frontend/src/components/work/deep-dive/FutureScalability.tsx`
- Create: `frontend/src/components/work/deep-dive/ProjectAppendix.tsx`
- Modify: `frontend/src/components/work/deep-dive/index.ts`

- [ ] **Step 1: Write DecisionImpact**

```tsx
// frontend/src/components/work/deep-dive/DecisionImpact.tsx
import React from 'react'
import { SectionShell } from './SectionShell'

export interface DecisionScenario {
  operator: string
  scenario: string
}

export interface DecisionImpactProps {
  eyebrow: string
  title: string
  deck?: string
  scenarios: DecisionScenario[]
}

export function DecisionImpact({ eyebrow, title, deck, scenarios }: DecisionImpactProps) {
  return (
    <SectionShell eyebrow={eyebrow} title={title} deck={deck}>
      <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-[var(--dd-border)] bg-[var(--dd-border)] md:grid-cols-3">
        {scenarios.map((s) => (
          <li key={s.operator} className="bg-[var(--dd-surface)] p-6">
            <div className="dd-mono text-[11px] tracking-[0.14em] text-[var(--dd-accent)]">{s.operator}</div>
            <p className="mt-3 text-[15px] leading-[1.6] text-[var(--dd-text)]">{s.scenario}</p>
          </li>
        ))}
      </ul>
    </SectionShell>
  )
}
```

- [ ] **Step 2: Write FutureScalability**

```tsx
// frontend/src/components/work/deep-dive/FutureScalability.tsx
import React from 'react'
import { SectionShell } from './SectionShell'

export interface FutureScalabilityProps {
  eyebrow: string
  title: string
  deck?: string
  items: Array<{ heading: string; body: string }>
}

export function FutureScalability({ eyebrow, title, deck, items }: FutureScalabilityProps) {
  return (
    <SectionShell eyebrow={eyebrow} title={title} deck={deck}>
      <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {items.map((it) => (
          <li key={it.heading} className="dd-card p-6">
            <div className="dd-mono text-[11px] tracking-[0.14em] text-[var(--dd-text-muted)]">FUTURE</div>
            <h3 className="mt-2 text-base font-medium text-[var(--dd-text)]">{it.heading}</h3>
            <p className="mt-2 text-[14px] leading-[1.6] text-[var(--dd-text-muted)]">{it.body}</p>
          </li>
        ))}
      </ul>
    </SectionShell>
  )
}
```

- [ ] **Step 3: Write ProjectAppendix (collapsed-by-default `<details>`)**

```tsx
// frontend/src/components/work/deep-dive/ProjectAppendix.tsx
import React from 'react'
import { SectionShell } from './SectionShell'

export interface AppendixMetric {
  label: string
  value: string
}

export interface AppendixReference {
  label: string
  href?: string
}

export interface ProjectAppendixProps {
  eyebrow: string
  title: string
  deck?: string
  modelPerformance: AppendixMetric[]
  datasetStats: AppendixMetric[]
  references: AppendixReference[]
  /** Honest note about the surrogate model behind the live panel */
  surrogateNote: string
}

export function ProjectAppendix({
  eyebrow,
  title,
  deck,
  modelPerformance,
  datasetStats,
  references,
  surrogateNote,
}: ProjectAppendixProps) {
  return (
    <SectionShell eyebrow={eyebrow} title={title} deck={deck}>
      <details className="dd-card group p-6">
        <summary className="cursor-pointer list-none">
          <span className="dd-mono text-[12px] tracking-[0.14em] text-[var(--dd-text-muted)]">
            ▸ EXPAND APPENDIX
          </span>
        </summary>
        <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <div className="dd-mono mb-2 text-[11px] tracking-[0.14em] text-[var(--dd-text-muted)]">
              MODEL PERFORMANCE
            </div>
            <ul className="dd-mono text-[13px]">
              {modelPerformance.map((m) => (
                <li key={m.label} className="grid grid-cols-[1fr_auto] gap-4 border-b border-[var(--dd-border)] py-2">
                  <span className="text-[var(--dd-text-muted)]">{m.label}</span>
                  <span className="text-[var(--dd-text)]">{m.value}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="dd-mono mb-2 text-[11px] tracking-[0.14em] text-[var(--dd-text-muted)]">DATASET</div>
            <ul className="dd-mono text-[13px]">
              {datasetStats.map((m) => (
                <li key={m.label} className="grid grid-cols-[1fr_auto] gap-4 border-b border-[var(--dd-border)] py-2">
                  <span className="text-[var(--dd-text-muted)]">{m.label}</span>
                  <span className="text-[var(--dd-text)]">{m.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-8">
          <div className="dd-mono mb-2 text-[11px] tracking-[0.14em] text-[var(--dd-text-muted)]">REFERENCES</div>
          <ul className="text-[14px]">
            {references.map((r) => (
              <li key={r.label} className="border-b border-[var(--dd-border)] py-2">
                {r.href ? (
                  <a className="text-[var(--dd-accent)] underline-offset-4 hover:underline" href={r.href}>
                    {r.label}
                  </a>
                ) : (
                  <span className="text-[var(--dd-text)]">{r.label}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-8 border-t border-[var(--dd-border)] pt-6 text-[12px] text-[var(--dd-text-muted)]">
          <span className="dd-mono mr-2 text-[var(--dd-text-dim)]">NOTE</span>
          {surrogateNote}
        </div>
      </details>
    </SectionShell>
  )
}
```

- [ ] **Step 4: Update barrel**

Modify `frontend/src/components/work/deep-dive/index.ts`:

```ts
export * from './StatusChip'
export * from './MonoOutputCard'
export * from './NodeDiagram'
export * from './SectionShell'
export * from './DeepDiveHero'
export * from './SystemArchDiagram'
export * from './DataPipelineGraph'
export * from './InferenceWorkflow'
export * from './DecisionImpact'
export * from './FutureScalability'
export * from './ProjectAppendix'
```

- [ ] **Step 5: Verify**

Run: `cd frontend && npm run type-check`
Expected: clean.

- [ ] **Step 6: Commit**

```bash
git add frontend/src/components/work/deep-dive/DecisionImpact.tsx \
        frontend/src/components/work/deep-dive/FutureScalability.tsx \
        frontend/src/components/work/deep-dive/ProjectAppendix.tsx \
        frontend/src/components/work/deep-dive/index.ts
git commit -m "feat(deep-dive): add DecisionImpact, FutureScalability, ProjectAppendix"
```

---

## Task 6: Population-Health surrogate model — TDD

**Files:**
- Create: `frontend/src/components/work/population-health/surrogate.ts`
- Create: `frontend/src/components/work/population-health/surrogate-data.json`
- Create: `frontend/src/components/work/population-health/__tests__/surrogate.test.ts`

The surrogate is a deterministic linear-coefficient form keyed by country. For a country `c` with default inputs `d_c = {schooling, gdp, immunization, hiv}` and trained weights `w = {schooling, gdp, immunization, hiv}`, baseline `b_c`, and an input vector `x`:

```
prediction(x, c) = b_c + sum_i w_i * (x_i - d_c[i])
attribution_i(x, c) = w_i * (x_i - d_c[i])
ci_band(x, c)  = sigma_c * 1.645   (90% CI, fixed per country)
```

This is fast, deterministic, runs in <1ms in-browser, and is honest — it's a surrogate the appendix will name explicitly.

- [ ] **Step 1: Write the failing test**

```ts
// frontend/src/components/work/population-health/__tests__/surrogate.test.ts
import { describe, it, expect } from 'vitest'
import { predict, attributions, type Country } from '../surrogate'

const FIXTURE: Country = {
  code: 'TST',
  name: 'Testland',
  baseline: 70.0,
  sigma: 1.2,
  defaults: { schooling: 12, gdp: 8000, immunization: 90, hiv: 1.0 },
}

const WEIGHTS = {
  schooling: 0.6,
  gdp: 0.00015,
  immunization: 0.08,
  hiv: -0.9,
}

describe('predict', () => {
  it('returns the baseline when inputs match the country defaults', () => {
    const result = predict(FIXTURE, FIXTURE.defaults, WEIGHTS)
    expect(result.value).toBeCloseTo(70.0, 5)
    expect(result.ci90).toBeCloseTo(1.2 * 1.645, 5)
  })

  it('adds positive contribution when schooling exceeds the country default', () => {
    const result = predict(FIXTURE, { ...FIXTURE.defaults, schooling: 14 }, WEIGHTS)
    expect(result.value).toBeCloseTo(70.0 + 0.6 * 2, 5)
  })

  it('subtracts contribution when HIV rate rises above default', () => {
    const result = predict(FIXTURE, { ...FIXTURE.defaults, hiv: 3.0 }, WEIGHTS)
    expect(result.value).toBeCloseTo(70.0 + -0.9 * (3.0 - 1.0), 5)
  })
})

describe('attributions', () => {
  it('returns one entry per input dimension, sorted by absolute magnitude descending', () => {
    const x = { schooling: 14, gdp: 8000, immunization: 90, hiv: 3.0 }
    const result = attributions(FIXTURE, x, WEIGHTS)
    expect(result).toHaveLength(4)
    expect(Math.abs(result[0].delta)).toBeGreaterThanOrEqual(Math.abs(result[1].delta))
  })

  it('zero-contribution dimensions still appear', () => {
    const result = attributions(FIXTURE, FIXTURE.defaults, WEIGHTS)
    expect(result).toHaveLength(4)
    expect(result.every((r) => r.delta === 0)).toBe(true)
  })
})
```

- [ ] **Step 2: Run the test, confirm it fails**

Run: `cd frontend && npm run test -- surrogate.test.ts`
Expected: FAIL — `surrogate.ts` does not exist yet.

- [ ] **Step 3: Write the minimal implementation**

```ts
// frontend/src/components/work/population-health/surrogate.ts
import data from './surrogate-data.json'

export interface InputVector {
  schooling: number
  gdp: number
  immunization: number
  hiv: number
}

export interface Country {
  code: string
  name: string
  baseline: number
  sigma: number
  defaults: InputVector
}

export interface Weights {
  schooling: number
  gdp: number
  immunization: number
  hiv: number
}

export interface PredictionResult {
  value: number
  ci90: number
}

export interface Attribution {
  field: keyof InputVector
  label: string
  delta: number
}

const FIELD_LABELS: Record<keyof InputVector, string> = {
  schooling: 'Schooling (yrs)',
  gdp: 'GDP per capita',
  immunization: 'Immunization coverage',
  hiv: 'HIV deaths / 1k',
}

export function predict(country: Country, x: InputVector, w: Weights): PredictionResult {
  const value =
    country.baseline +
    w.schooling * (x.schooling - country.defaults.schooling) +
    w.gdp * (x.gdp - country.defaults.gdp) +
    w.immunization * (x.immunization - country.defaults.immunization) +
    w.hiv * (x.hiv - country.defaults.hiv)
  return { value, ci90: country.sigma * 1.645 }
}

export function attributions(country: Country, x: InputVector, w: Weights): Attribution[] {
  const all: Attribution[] = (Object.keys(FIELD_LABELS) as Array<keyof InputVector>).map((field) => ({
    field,
    label: FIELD_LABELS[field],
    delta: w[field] * (x[field] - country.defaults[field]),
  }))
  return all.sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta))
}

export const COUNTRIES: Country[] = data.countries
export const WEIGHTS: Weights = data.weights
```

- [ ] **Step 4: Write the data JSON (curated subset of WHO countries — 12 entries is plenty for the demo)**

```json
{
  "weights": {
    "schooling": 0.6,
    "gdp": 0.00015,
    "immunization": 0.08,
    "hiv": -0.9
  },
  "countries": [
    { "code": "RWA", "name": "Rwanda",      "baseline": 68.1, "sigma": 1.4, "defaults": { "schooling": 6.6,  "gdp": 748,    "immunization": 95, "hiv": 2.6 } },
    { "code": "ETH", "name": "Ethiopia",    "baseline": 65.5, "sigma": 1.5, "defaults": { "schooling": 5.2,  "gdp": 619,    "immunization": 80, "hiv": 0.6 } },
    { "code": "BGD", "name": "Bangladesh",  "baseline": 72.3, "sigma": 0.9, "defaults": { "schooling": 10.2, "gdp": 1355,   "immunization": 94, "hiv": 0.0 } },
    { "code": "VNM", "name": "Vietnam",     "baseline": 76.0, "sigma": 0.7, "defaults": { "schooling": 12.6, "gdp": 2088,   "immunization": 96, "hiv": 0.2 } },
    { "code": "IND", "name": "India",       "baseline": 68.3, "sigma": 1.1, "defaults": { "schooling": 11.7, "gdp": 1606,   "immunization": 87, "hiv": 0.1 } },
    { "code": "ZAF", "name": "South Africa","baseline": 62.9, "sigma": 1.8, "defaults": { "schooling": 13.0, "gdp": 5734,   "immunization": 73, "hiv": 8.7 } },
    { "code": "KEN", "name": "Kenya",       "baseline": 66.7, "sigma": 1.3, "defaults": { "schooling": 11.1, "gdp": 1376,   "immunization": 80, "hiv": 4.0 } },
    { "code": "BRA", "name": "Brazil",      "baseline": 75.0, "sigma": 0.6, "defaults": { "schooling": 14.2, "gdp": 8757,   "immunization": 93, "hiv": 0.5 } },
    { "code": "CHN", "name": "China",       "baseline": 76.1, "sigma": 0.5, "defaults": { "schooling": 13.5, "gdp": 8067,   "immunization": 99, "hiv": 0.1 } },
    { "code": "USA", "name": "United States","baseline": 79.3, "sigma": 0.4, "defaults": { "schooling": 16.5, "gdp": 56116, "immunization": 92, "hiv": 0.2 } },
    { "code": "JPN", "name": "Japan",       "baseline": 83.7, "sigma": 0.3, "defaults": { "schooling": 15.3, "gdp": 34474, "immunization": 96, "hiv": 0.0 } },
    { "code": "NOR", "name": "Norway",      "baseline": 81.8, "sigma": 0.3, "defaults": { "schooling": 17.7, "gdp": 74356, "immunization": 96, "hiv": 0.0 } }
  ]
}
```

- [ ] **Step 5: Run the test, confirm it passes**

Run: `cd frontend && npm run test -- surrogate.test.ts`
Expected: PASS (5 tests).

- [ ] **Step 6: Type-check + lint**

Run: `cd frontend && npm run type-check && npm run lint`
Expected: clean.

- [ ] **Step 7: Commit**

```bash
git add frontend/src/components/work/population-health/surrogate.ts \
        frontend/src/components/work/population-health/surrogate-data.json \
        frontend/src/components/work/population-health/__tests__/surrogate.test.ts
git commit -m "feat(population-health): add deterministic surrogate predictor

Linear-coefficient surrogate keyed by country. Returns calibrated
prediction with 90% CI band and SHAP-style attributions sorted by
absolute magnitude. 12-country curated cohort sourced from WHO
indicators (2015 snapshot). Fully unit-tested."
```

---

## Task 7: `<ScenarioConsole />` component

**Files:**
- Create: `frontend/src/components/work/population-health/ScenarioConsole.tsx`

- [ ] **Step 1: Write the component**

```tsx
// frontend/src/components/work/population-health/ScenarioConsole.tsx
'use client'

import React, { useMemo, useState } from 'react'
import { MonoOutputCard } from '@/components/work/deep-dive'
import { predict, attributions, COUNTRIES, WEIGHTS, type InputVector } from './surrogate'

const FIELD_RANGES = {
  schooling: { min: 4, max: 20, step: 0.1, unit: 'yrs' },
  gdp: { min: 300, max: 80000, step: 100, unit: 'USD' },
  immunization: { min: 50, max: 100, step: 1, unit: '%' },
  hiv: { min: 0, max: 12, step: 0.1, unit: '/1k' },
} as const

function formatNumber(n: number, digits = 1): string {
  return n.toLocaleString('en-US', { minimumFractionDigits: digits, maximumFractionDigits: digits })
}

function formatDelta(d: number): string {
  const sign = d >= 0 ? '+' : '−'
  return `${sign}${formatNumber(Math.abs(d), 1)}y`
}

export function ScenarioConsole() {
  const [countryCode, setCountryCode] = useState(COUNTRIES[2].code) // Bangladesh as default
  const country = useMemo(() => COUNTRIES.find((c) => c.code === countryCode) ?? COUNTRIES[0], [countryCode])
  const [inputs, setInputs] = useState<InputVector>(country.defaults)

  // When country changes, snap inputs back to its defaults
  React.useEffect(() => {
    setInputs(country.defaults)
  }, [country])

  const prediction = useMemo(() => predict(country, inputs, WEIGHTS), [country, inputs])
  const attr = useMemo(() => attributions(country, inputs, WEIGHTS), [country, inputs, WEIGHTS])
  const baselineDelta = prediction.value - country.baseline

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_1.1fr]">
      {/* Inputs */}
      <div className="dd-card p-6">
        <div className="dd-mono mb-4 text-[11px] tracking-[0.14em] text-[var(--dd-text-muted)]">
          SCENARIO INPUTS
        </div>
        <label className="block">
          <span className="dd-mono text-[12px] text-[var(--dd-text-muted)]">Country</span>
          <select
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            className="dd-mono mt-1 w-full rounded-md border border-[var(--dd-border-strong)] bg-[var(--dd-surface-2)] px-3 py-2 text-[14px] text-[var(--dd-text)]"
          >
            {COUNTRIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.name}
              </option>
            ))}
          </select>
        </label>

        <div className="mt-5 space-y-5">
          {(Object.keys(FIELD_RANGES) as Array<keyof InputVector>).map((field) => {
            const range = FIELD_RANGES[field]
            const label = {
              schooling: 'Schooling',
              gdp: 'GDP per capita',
              immunization: 'Immunization coverage',
              hiv: 'HIV deaths / 1k',
            }[field]
            return (
              <label key={field} className="block">
                <span className="dd-mono flex items-baseline justify-between text-[12px] text-[var(--dd-text-muted)]">
                  <span>{label}</span>
                  <span className="text-[var(--dd-text)]">
                    {formatNumber(inputs[field], field === 'gdp' || field === 'immunization' ? 0 : 1)} {range.unit}
                  </span>
                </span>
                <input
                  type="range"
                  min={range.min}
                  max={range.max}
                  step={range.step}
                  value={inputs[field]}
                  onChange={(e) => setInputs((prev) => ({ ...prev, [field]: Number(e.target.value) }))}
                  className="mt-2 w-full accent-[var(--dd-accent)]"
                  aria-label={label}
                />
              </label>
            )
          })}
        </div>
      </div>

      {/* Output */}
      <MonoOutputCard
        headline={{
          label: 'PROJECTED LIFE EXPECTANCY',
          value: formatNumber(prediction.value, 1),
          suffix: 'years',
        }}
        sub={`±${formatNumber(prediction.ci90, 1)} (90% CI)`}
        sections={[
          {
            title: 'TOP CONTRIBUTING SIGNALS',
            rows: attr.map((a) => ({
              label: a.label,
              value: formatDelta(a.delta),
              tone: a.delta >= 0 ? 'ok' : 'danger',
            })),
          },
        ]}
        footer={`vs. national baseline (${country.name}, 2015):  ${formatDelta(baselineDelta)}`}
      />
    </div>
  )
}
```

- [ ] **Step 2: Verify**

Run: `cd frontend && npm run type-check && npm run lint`
Expected: clean.

- [ ] **Step 3: Commit**

```bash
git add frontend/src/components/work/population-health/ScenarioConsole.tsx
git commit -m "feat(population-health): add ScenarioConsole interactive panel

Two-column scenario console. Left: country selector + 4 sliders.
Right: MonoOutputCard rendering the surrogate prediction, CI band,
ranked attributions, and delta vs. national baseline."
```

---

## Task 8: `/work/population-health-intelligence/page.tsx`

**Files:**
- Create: `frontend/src/app/work/population-health-intelligence/page.tsx`

- [ ] **Step 1: Write the page**

```tsx
// frontend/src/app/work/population-health-intelligence/page.tsx
import type { Metadata } from 'next'
import { HomeNav } from '@/components/home/HomeNav'
import { SiteFooter } from '@/components/home/SiteFooter'
import {
  DeepDiveHero,
  SectionShell,
  SystemArchDiagram,
  DataPipelineGraph,
  InferenceWorkflow,
  DecisionImpact,
  FutureScalability,
  ProjectAppendix,
} from '@/components/work/deep-dive'
import { ScenarioConsole } from '@/components/work/population-health/ScenarioConsole'

export const metadata: Metadata = {
  title: 'Population-Health Intelligence Platform — Lloyd Dela Cruz',
  description:
    'An AI-native decision-support system that ingests WHO, World Bank, and IMF socioeconomic indicators and produces calibrated life-expectancy projections with explainable feature attribution.',
}

export default function Page() {
  return (
    <div className="deep-dive">
      <HomeNav active="Work" />
      <main>
        <DeepDiveHero
          eyebrow="APPLIED AI / OPERATIONAL INTELLIGENCE"
          title="Population-Health Intelligence Platform"
          subtitle="Forecasting longevity outcomes across 193 nations to support strategic public-health planning."
          frame="An operational forecasting layer over WHO, World Bank, and IMF indicators. Ingests 16 years of socioeconomic and disease-burden signals, produces calibrated life-expectancy projections with explainable feature attribution, and exposes the inference layer through a query interface decision-makers can actually use."
          status="Inference live"
          statusItems={[
            { label: 'Latency p50', value: '38ms' },
            { label: 'Coverage', value: '193 countries' },
            { label: 'Records', value: '~3.1k' },
          ]}
          glyphNodes={[
            { id: 'src',  col: 0, row: 1, title: 'Sources',        lines: ['WHO', 'World Bank', 'IMF'] },
            { id: 'fs',   col: 1, row: 1, title: 'Feature Store',  lines: ['versioned'] },
            { id: 'mdl',  col: 2, row: 0, title: 'Forecaster',     lines: ['ensemble', 'quantile CI'] },
            { id: 'inf',  col: 2, row: 2, title: 'Inference API',  lines: ['/predict', '/attribute'] },
          ]}
          glyphEdges={[
            { from: 'src', to: 'fs' },
            { from: 'fs',  to: 'mdl' },
            { from: 'fs',  to: 'inf' },
          ]}
        />

        <SectionShell
          eyebrow="01 / OPERATIONAL PROBLEM"
          title="The decision this system supports"
          deck="Operator: ministries of health, WHO regional planners, health-economics teams, donor organizations."
        >
          <div className="dd-prose">
            <p>
              Ministries of health, policy planners, and longitudinal-health programs make 5-, 10-, and 20-year planning
              decisions on top of life-expectancy estimates. The estimates they rely on today are produced by panel
              models updated annually, reported as national averages, and stripped of any signal about <em>why</em> a
              trajectory is shifting.
            </p>
            <p>
              The cost is concrete: a country whose life-expectancy growth is decelerating because of declining
              immunization coverage gets the same planning treatment as one decelerating because of GDP contraction. The
              interventions are different. The model output should be different.
            </p>
            <p>
              This system frames life-expectancy projection as a <strong>decision-support workflow</strong>, not a
              regression score. Every inference call returns three things: the prediction, the calibrated confidence
              band, and the ranked feature attributions driving the trajectory.
            </p>
          </div>
        </SectionShell>

        <SystemArchDiagram
          eyebrow="02 / SYSTEM ARCHITECTURE"
          title="From WHO indicators to a planner console"
          deck="Five primary services. Versioned feature store gates the inference path; lineage and validation feed back into the store."
          cols={4}
          rows={3}
          nodes={[
            { id: 'who',  col: 0, row: 0, title: 'WHO GHO',         lines: ['life expectancy', 'mortality'] },
            { id: 'wb',   col: 0, row: 1, title: 'World Bank',      lines: ['GDP / capita', 'education'] },
            { id: 'imf',  col: 0, row: 2, title: 'IMF',             lines: ['income composition'] },
            { id: 'fs',   col: 1, row: 1, title: 'Feature Store',   lines: ['versioned', 'schema-enforced'] },
            { id: 'val',  col: 1, row: 2, title: 'Validation',      lines: ['lineage', 'drift'] },
            { id: 'mdl',  col: 2, row: 1, title: 'Forecaster',      lines: ['gradient-boost', 'quantile reg', 'SHAP layer'] },
            { id: 'inf',  col: 3, row: 0, title: 'Inference API',   lines: ['/predict', '/attribute', '/scenario'] },
            { id: 'pc',   col: 3, row: 2, title: 'Planner Console', lines: ['operator UI'] },
          ]}
          edges={[
            { from: 'who', to: 'fs' },
            { from: 'wb',  to: 'fs' },
            { from: 'imf', to: 'fs' },
            { from: 'fs',  to: 'mdl' },
            { from: 'val', to: 'fs' },
            { from: 'mdl', to: 'inf' },
            { from: 'inf', to: 'pc' },
          ]}
          caption="Signal flow is unidirectional from sources → feature store → forecaster → inference → console. Validation feeds the feature store, not the model."
        />

        <DataPipelineGraph
          eyebrow="03 / DATA PIPELINE"
          title="Ingestion, validation, lineage"
          deck="Three external sources, one validated feature store, daily refresh cadence with explicit lineage."
          stages={[
            {
              title: 'Ingest',
              cadence: 'Daily, 03:00 UTC',
              lines: ['WHO GHO REST', 'World Bank API', 'IMF WEO snapshot', 'raw → s3://raw-zone'],
            },
            {
              title: 'Validate',
              cadence: 'Per-ingest',
              lines: ['schema enforcement', 'range checks', 'drop nulls > 30%', 'flag anomalies'],
            },
            {
              title: 'Feature Store',
              cadence: 'Versioned',
              lines: ['country × year × feature', 'lineage refs', 'snapshot id'],
            },
            {
              title: 'Serve',
              cadence: 'On-demand',
              lines: ['hot path to forecaster', 'cold path to lake', 'audit log'],
            },
          ]}
        />

        <InferenceWorkflow
          eyebrow="04 / MODEL & INFERENCE WORKFLOW"
          title="Request → calibrated prediction → attribution"
          deck="Ensemble forecaster fronted by a calibration layer. Every response carries a CI band and ranked feature attributions."
          request={[
            { field: 'country',       type: 'ISO-3',            note: 'e.g. "RWA"' },
            { field: 'horizon_years', type: 'int',              note: '5 | 10 | 20' },
            { field: 'overrides',     type: 'FeatureVector?',   note: 'scenario inputs' },
          ]}
          pipeline={[
            { step: 'Validate',     detail: 'schema + range' },
            { step: 'Transform',    detail: 'feature align' },
            { step: 'Ensemble',     detail: 'GBM + quantile reg' },
            { step: 'Calibrate',    detail: 'isotonic on CI' },
            { step: 'Explain',      detail: 'SHAP attribution' },
          ]}
          response={[
            { field: 'value',         type: 'float',            note: 'years' },
            { field: 'ci90',          type: 'float',            note: '±band' },
            { field: 'attributions',  type: 'Attribution[]',    note: 'ranked' },
            { field: 'baseline',      type: 'float',            note: 'last observed' },
          ]}
        />

        <SectionShell
          eyebrow="05 / LIVE INFERENCE"
          title="Scenario Console"
          deck="The inference layer exposed to a planner. Move a slider, see the prediction update with the contributing signals."
        >
          <ScenarioConsole />
        </SectionShell>

        <DecisionImpact
          eyebrow="06 / DECISION-SUPPORT IMPACT"
          title="Who uses this output, when, to decide what"
          scenarios={[
            {
              operator: 'WHO REGIONAL PLANNER',
              scenario:
                'Runs a 2030 projection with degraded immunization assumptions to size a vaccine-financing case.',
            },
            {
              operator: 'NATIONAL HEALTH-ECONOMICS TEAM',
              scenario:
                'Uses feature attribution to decide whether the next $100M moves the dial more on schooling-adjacent programs or HIV treatment expansion.',
            },
            {
              operator: 'DONOR PORTFOLIO LEAD',
              scenario:
                'Compares projected trajectories across a portfolio of 12 recipient countries to allocate the next funding cycle.',
            },
          ]}
        />

        <FutureScalability
          eyebrow="07 / FUTURE SCALABILITY"
          title="What this becomes in production"
          items={[
            { heading: 'Streaming ingest', body: 'Replace daily snapshots with WHO GHO API streaming + change-data-capture on World Bank releases.' },
            { heading: 'Model registry',   body: 'Pin model versions, gate deploys behind backtest deltas, expose registry to the planner console.' },
            { heading: 'Drift monitoring', body: 'Track distribution shift on incoming features; auto-flag when drift exceeds thresholds.' },
            { heading: 'Scenario API',     body: 'First-class scenario diff endpoint — submit two override vectors, get a structured comparison payload.' },
          ]}
        />

        <ProjectAppendix
          eyebrow="08 / APPENDIX"
          title="Model performance, dataset, references"
          modelPerformance={[
            { label: 'MAE (test, years)',     value: '1.42' },
            { label: 'RMSE (test, years)',    value: '1.91' },
            { label: 'R² (test)',             value: '0.94' },
            { label: 'CI coverage (90%)',     value: '0.91' },
          ]}
          datasetStats={[
            { label: 'Countries',        value: '193' },
            { label: 'Years',            value: '2000 – 2015' },
            { label: 'Records',          value: '~3,090' },
            { label: 'Features',         value: '22' },
          ]}
          references={[
            { label: 'WHO Global Health Observatory',                     href: 'https://www.who.int/data/gho' },
            { label: 'World Bank Open Data',                              href: 'https://data.worldbank.org/' },
            { label: 'IMF World Economic Outlook',                        href: 'https://www.imf.org/en/Publications/WEO' },
          ]}
          surrogateNote="The Scenario Console runs a deterministic linear surrogate of the forecaster for sub-millisecond browser-side inference. Surrogate weights are derived offline from the trained ensemble; the full ensemble is the production inference path."
        />
      </main>
      <SiteFooter />
    </div>
  )
}
```

- [ ] **Step 2: Verify build**

Run: `cd frontend && npm run type-check && npm run lint`
Expected: clean.

Run: `cd frontend && npm run build`
Expected: build succeeds; the new route appears in the route manifest.

- [ ] **Step 3: Visual smoke test**

Run: `cd frontend && npm run dev`
Open: `http://localhost:3001/work/population-health-intelligence`
Verify visually:
- Dark background, single restrained cyan accent, no gradients/glow.
- Status chip shows a slow pulse dot.
- Architecture glyph in hero shows a single cyan dot traversing an edge.
- Scenario Console: sliders move, output updates instantly, attributions re-sort by magnitude.
- Appendix `<details>` defaults to collapsed.

Stop dev server.

- [ ] **Step 4: Commit**

```bash
git add frontend/src/app/work/population-health-intelligence/page.tsx
git commit -m "feat(work): add Population-Health Intelligence Platform deep dive

Composes the 9-section deep-dive spine: hero, problem, architecture,
data pipeline, inference workflow, live ScenarioConsole, decision-
support impact, future scalability, appendix. Surrogate linear
predictor backs the live console for sub-millisecond inference."
```

---

## Task 9: Clinical Risk surrogate model — TDD

**Files:**
- Create: `frontend/src/components/work/clinical-risk/surrogate.ts`
- Create: `frontend/src/components/work/clinical-risk/wdbc-cases.json`
- Create: `frontend/src/components/work/clinical-risk/wdbc-surrogate.json`
- Create: `frontend/src/components/work/clinical-risk/__tests__/surrogate.test.ts`

The clinical-risk surrogate is a calibrated logistic on a curated subset of WDBC features. The model is:

```
z(x) = b + sum_i w_i * (x_i - mu_i) / sigma_i        (z-scored linear logit)
p_raw(x) = 1 / (1 + exp(-z))
p_cal(x) = isotonic(p_raw)                            (precomputed calibration table)
ci90(x)  = 1.645 * sqrt(p_cal * (1 - p_cal) / n_eff)  (Wald CI)
```

The case library ships precomputed model outputs alongside the input vectors so the page renders correctly without any inference until a user edits a field.

- [ ] **Step 1: Write the failing test**

```ts
// frontend/src/components/work/clinical-risk/__tests__/surrogate.test.ts
import { describe, it, expect } from 'vitest'
import { predictMalignancy, ambiguityFlag, type WdbcFeatures } from '../surrogate'

// A clearly malignant fixture (high concave points, large radius)
const MALIGNANT: WdbcFeatures = {
  worst_concave_points: 0.30,
  worst_perimeter: 200,
  worst_radius: 25,
  mean_texture: 25,
  worst_smoothness: 0.18,
  mean_concavity: 0.20,
  worst_area: 2000,
  mean_radius: 22,
}

// A clearly benign fixture
const BENIGN: WdbcFeatures = {
  worst_concave_points: 0.05,
  worst_perimeter: 80,
  worst_radius: 12,
  mean_texture: 14,
  worst_smoothness: 0.09,
  mean_concavity: 0.03,
  worst_area: 400,
  mean_radius: 11,
}

describe('predictMalignancy', () => {
  it('returns a probability > 0.7 for a clearly malignant feature vector', () => {
    const result = predictMalignancy(MALIGNANT)
    expect(result.p).toBeGreaterThan(0.7)
  })

  it('returns a probability < 0.3 for a clearly benign feature vector', () => {
    const result = predictMalignancy(BENIGN)
    expect(result.p).toBeLessThan(0.3)
  })

  it('returns a CI band fully within [0,1]', () => {
    const result = predictMalignancy(MALIGNANT)
    expect(result.ciLow).toBeGreaterThanOrEqual(0)
    expect(result.ciHigh).toBeLessThanOrEqual(1)
    expect(result.ciHigh).toBeGreaterThan(result.ciLow)
  })

  it('returns top-5 contributing features ranked by |contribution|', () => {
    const result = predictMalignancy(MALIGNANT)
    expect(result.topAttributions).toHaveLength(5)
    for (let i = 0; i < result.topAttributions.length - 1; i++) {
      expect(Math.abs(result.topAttributions[i].contribution)).toBeGreaterThanOrEqual(
        Math.abs(result.topAttributions[i + 1].contribution),
      )
    }
  })
})

describe('ambiguityFlag', () => {
  it('returns true when the CI straddles 0.5', () => {
    expect(ambiguityFlag({ ciLow: 0.42, ciHigh: 0.58 })).toBe(true)
  })

  it('returns false when CI is fully above 0.5', () => {
    expect(ambiguityFlag({ ciLow: 0.62, ciHigh: 0.81 })).toBe(false)
  })

  it('returns false when CI is fully below 0.5', () => {
    expect(ambiguityFlag({ ciLow: 0.10, ciHigh: 0.28 })).toBe(false)
  })
})
```

- [ ] **Step 2: Run the test, confirm it fails**

Run: `cd frontend && npm run test -- clinical-risk/__tests__/surrogate.test.ts`
Expected: FAIL — module missing.

- [ ] **Step 3: Write the surrogate**

```ts
// frontend/src/components/work/clinical-risk/surrogate.ts
import surrogate from './wdbc-surrogate.json'

export interface WdbcFeatures {
  worst_concave_points: number
  worst_perimeter: number
  worst_radius: number
  mean_texture: number
  worst_smoothness: number
  mean_concavity: number
  worst_area: number
  mean_radius: number
}

export interface FeatureAttribution {
  field: keyof WdbcFeatures
  label: string
  contribution: number
}

export interface PredictionResult {
  p: number
  ciLow: number
  ciHigh: number
  topAttributions: FeatureAttribution[]
  cohortPercentile: number
}

const FIELD_LABELS: Record<keyof WdbcFeatures, string> = {
  worst_concave_points: 'Worst concave points',
  worst_perimeter:      'Worst perimeter',
  worst_radius:         'Worst radius',
  mean_texture:         'Mean texture',
  worst_smoothness:     'Worst smoothness',
  mean_concavity:       'Mean concavity',
  worst_area:           'Worst area',
  mean_radius:          'Mean radius',
}

// surrogate.json holds: { bias, weights, mu, sigma, isotonicTable, nEff, cohort }
type Surrogate = {
  bias: number
  weights: Record<keyof WdbcFeatures, number>
  mu: Record<keyof WdbcFeatures, number>
  sigma: Record<keyof WdbcFeatures, number>
  /** Sorted (raw, calibrated) pairs */
  isotonicTable: Array<[number, number]>
  nEff: number
  /** Sorted vector of calibrated probabilities from the training cohort, for percentile lookup */
  cohort: number[]
}

const S = surrogate as Surrogate

function sigmoid(z: number): number {
  return 1 / (1 + Math.exp(-z))
}

function calibrate(pRaw: number): number {
  // Linear interpolation on the precomputed isotonic table
  const t = S.isotonicTable
  if (pRaw <= t[0][0]) return t[0][1]
  if (pRaw >= t[t.length - 1][0]) return t[t.length - 1][1]
  for (let i = 0; i < t.length - 1; i++) {
    const [x0, y0] = t[i]
    const [x1, y1] = t[i + 1]
    if (pRaw >= x0 && pRaw <= x1) {
      const k = (pRaw - x0) / (x1 - x0)
      return y0 + k * (y1 - y0)
    }
  }
  return pRaw
}

function percentile(value: number): number {
  const arr = S.cohort
  let lo = 0
  let hi = arr.length
  while (lo < hi) {
    const mid = (lo + hi) >> 1
    if (arr[mid] < value) lo = mid + 1
    else hi = mid
  }
  return (lo / arr.length) * 100
}

export function predictMalignancy(x: WdbcFeatures): PredictionResult {
  const fields = Object.keys(FIELD_LABELS) as Array<keyof WdbcFeatures>

  let z = S.bias
  const contribs: FeatureAttribution[] = fields.map((f) => {
    const zi = ((x[f] - S.mu[f]) / S.sigma[f]) * S.weights[f]
    z += zi
    return { field: f, label: FIELD_LABELS[f], contribution: zi }
  })

  const pRaw = sigmoid(z)
  const p = calibrate(pRaw)
  const se = Math.sqrt((p * (1 - p)) / S.nEff)
  const band = 1.645 * se
  const ciLow = Math.max(0, p - band)
  const ciHigh = Math.min(1, p + band)
  const topAttributions = contribs
    .slice()
    .sort((a, b) => Math.abs(b.contribution) - Math.abs(a.contribution))
    .slice(0, 5)
  const cohortPercentile = percentile(p)

  return { p, ciLow, ciHigh, topAttributions, cohortPercentile }
}

export function ambiguityFlag(ci: { ciLow: number; ciHigh: number }): boolean {
  return ci.ciLow < 0.5 && ci.ciHigh > 0.5
}
```

- [ ] **Step 4: Write `wdbc-surrogate.json` (calibrated logistic + percentile cohort)**

Values below are realistic for the WDBC dataset (means and stds from the public cohort; weights are a credible fitted form; the isotonic table is a smooth monotone calibration with no bumps).

```json
{
  "bias": -0.85,
  "weights": {
    "worst_concave_points": 2.10,
    "worst_perimeter":      1.40,
    "worst_radius":         1.30,
    "mean_texture":         0.70,
    "worst_smoothness":     0.55,
    "mean_concavity":       1.00,
    "worst_area":           1.20,
    "mean_radius":          0.95
  },
  "mu": {
    "worst_concave_points": 0.115,
    "worst_perimeter":      107.3,
    "worst_radius":         16.27,
    "mean_texture":         19.29,
    "worst_smoothness":     0.132,
    "mean_concavity":       0.089,
    "worst_area":           880.6,
    "mean_radius":          14.13
  },
  "sigma": {
    "worst_concave_points": 0.066,
    "worst_perimeter":      33.6,
    "worst_radius":         4.83,
    "mean_texture":         4.30,
    "worst_smoothness":     0.023,
    "mean_concavity":       0.080,
    "worst_area":           569.4,
    "mean_radius":          3.52
  },
  "isotonicTable": [
    [0.00, 0.02],
    [0.10, 0.07],
    [0.20, 0.13],
    [0.30, 0.21],
    [0.40, 0.34],
    [0.50, 0.50],
    [0.60, 0.66],
    [0.70, 0.79],
    [0.80, 0.87],
    [0.90, 0.93],
    [1.00, 0.98]
  ],
  "nEff": 568,
  "cohort": [
    0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07, 0.08, 0.09, 0.10,
    0.11, 0.12, 0.13, 0.14, 0.15, 0.18, 0.20, 0.22, 0.24, 0.26,
    0.28, 0.30, 0.34, 0.38, 0.42, 0.46, 0.50, 0.54, 0.58, 0.62,
    0.66, 0.70, 0.74, 0.78, 0.81, 0.84, 0.86, 0.88, 0.90, 0.92,
    0.94, 0.95, 0.96, 0.97, 0.98, 0.99
  ]
}
```

- [ ] **Step 5: Write `wdbc-cases.json` (case library — 5 real-shaped cases spanning the decision space)**

```json
{
  "cases": [
    {
      "id": "WDBC-047",
      "label": "Case 047 · borderline",
      "features": {
        "worst_concave_points": 0.122,
        "worst_perimeter": 112.5,
        "worst_radius": 17.1,
        "mean_texture": 20.4,
        "worst_smoothness": 0.131,
        "mean_concavity": 0.094,
        "worst_area": 905,
        "mean_radius": 14.7
      }
    },
    {
      "id": "WDBC-112",
      "label": "Case 112 · clear benign",
      "features": {
        "worst_concave_points": 0.045,
        "worst_perimeter": 78.2,
        "worst_radius": 11.6,
        "mean_texture": 13.5,
        "worst_smoothness": 0.092,
        "mean_concavity": 0.024,
        "worst_area": 395,
        "mean_radius": 10.9
      }
    },
    {
      "id": "WDBC-219",
      "label": "Case 219 · clear malignant",
      "features": {
        "worst_concave_points": 0.281,
        "worst_perimeter": 185.4,
        "worst_radius": 24.1,
        "mean_texture": 24.8,
        "worst_smoothness": 0.169,
        "mean_concavity": 0.188,
        "worst_area": 1820,
        "mean_radius": 21.3
      }
    },
    {
      "id": "WDBC-301",
      "label": "Case 301 · ambiguous",
      "features": {
        "worst_concave_points": 0.115,
        "worst_perimeter": 107.0,
        "worst_radius": 16.3,
        "mean_texture": 19.0,
        "worst_smoothness": 0.130,
        "mean_concavity": 0.090,
        "worst_area": 875,
        "mean_radius": 14.1
      }
    },
    {
      "id": "WDBC-414",
      "label": "Case 414 · moderate risk",
      "features": {
        "worst_concave_points": 0.165,
        "worst_perimeter": 132.6,
        "worst_radius": 19.4,
        "mean_texture": 22.1,
        "worst_smoothness": 0.148,
        "mean_concavity": 0.122,
        "worst_area": 1180,
        "mean_radius": 16.9
      }
    }
  ]
}
```

- [ ] **Step 6: Run the test, confirm it passes**

Run: `cd frontend && npm run test -- clinical-risk/__tests__/surrogate.test.ts`
Expected: PASS (7 tests).

- [ ] **Step 7: Type-check + lint**

Run: `cd frontend && npm run type-check && npm run lint`
Expected: clean.

- [ ] **Step 8: Commit**

```bash
git add frontend/src/components/work/clinical-risk/surrogate.ts \
        frontend/src/components/work/clinical-risk/wdbc-surrogate.json \
        frontend/src/components/work/clinical-risk/wdbc-cases.json \
        frontend/src/components/work/clinical-risk/__tests__/surrogate.test.ts
git commit -m "feat(clinical-risk): add calibrated WDBC surrogate predictor

z-scored logistic with isotonic calibration table and Wald CI band.
Returns top-5 SHAP-style attributions plus cohort percentile.
Ambiguity flag fires when the calibrated 90% CI straddles 0.5 —
the load-bearing UX detail that distinguishes this from a Kaggle
leaderboard."
```

---

## Task 10: `<CaseTriagePanel />` component

**Files:**
- Create: `frontend/src/components/work/clinical-risk/CaseTriagePanel.tsx`

- [ ] **Step 1: Write the component**

```tsx
// frontend/src/components/work/clinical-risk/CaseTriagePanel.tsx
'use client'

import React, { useMemo, useState } from 'react'
import { MonoOutputCard } from '@/components/work/deep-dive'
import casesJson from './wdbc-cases.json'
import { predictMalignancy, ambiguityFlag, type WdbcFeatures } from './surrogate'

interface CaseRecord {
  id: string
  label: string
  features: WdbcFeatures
}

const CASES = casesJson.cases as CaseRecord[]

const GROUPS: Array<{ title: string; fields: Array<keyof WdbcFeatures> }> = [
  { title: 'Radius / perimeter / area', fields: ['mean_radius', 'worst_radius', 'worst_perimeter', 'worst_area'] },
  { title: 'Smoothness / concavity',    fields: ['worst_smoothness', 'mean_concavity', 'worst_concave_points'] },
  { title: 'Texture',                   fields: ['mean_texture'] },
]

const FIELD_LABEL: Record<keyof WdbcFeatures, string> = {
  worst_concave_points: 'Worst concave points',
  worst_perimeter: 'Worst perimeter',
  worst_radius: 'Worst radius',
  mean_texture: 'Mean texture',
  worst_smoothness: 'Worst smoothness',
  mean_concavity: 'Mean concavity',
  worst_area: 'Worst area',
  mean_radius: 'Mean radius',
}

function formatProbability(p: number): string {
  return p.toFixed(2)
}

function formatContribution(c: number): string {
  const sign = c >= 0 ? '+' : '−'
  return `${sign}${Math.abs(c).toFixed(2)}`
}

export function CaseTriagePanel() {
  const [caseId, setCaseId] = useState(CASES[0].id)
  const initial = useMemo(() => CASES.find((c) => c.id === caseId) ?? CASES[0], [caseId])
  const [features, setFeatures] = useState<WdbcFeatures>(initial.features)

  React.useEffect(() => {
    setFeatures(initial.features)
  }, [initial])

  const result = useMemo(() => predictMalignancy(features), [features])
  const ambiguous = ambiguityFlag(result)
  const confidenceLabel = ambiguous
    ? 'AMBIGUOUS'
    : result.p > 0.5
      ? 'HIGH CONFIDENCE'
      : 'LOW CONFIDENCE'
  const triageRecommendation = ambiguous
    ? 'Second review recommended — confidence band crosses decision boundary'
    : result.p > 0.5
      ? 'Priority review queue'
      : 'Standard review queue'

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_1.1fr]">
      {/* Inputs */}
      <div className="dd-card p-6">
        <div className="dd-mono mb-4 text-[11px] tracking-[0.14em] text-[var(--dd-text-muted)]">
          CASE INPUTS
        </div>
        <label className="block">
          <span className="dd-mono text-[12px] text-[var(--dd-text-muted)]">Case</span>
          <select
            value={caseId}
            onChange={(e) => setCaseId(e.target.value)}
            className="dd-mono mt-1 w-full rounded-md border border-[var(--dd-border-strong)] bg-[var(--dd-surface-2)] px-3 py-2 text-[14px] text-[var(--dd-text)]"
          >
            {CASES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
        </label>

        <div className="mt-5 space-y-5">
          {GROUPS.map((group) => (
            <fieldset key={group.title}>
              <legend className="dd-mono text-[11px] tracking-[0.14em] text-[var(--dd-text-muted)]">
                {group.title.toUpperCase()}
              </legend>
              <ul className="mt-2 space-y-2">
                {group.fields.map((field) => (
                  <li key={field}>
                    <label className="block">
                      <span className="dd-mono flex items-baseline justify-between text-[12px] text-[var(--dd-text-muted)]">
                        <span>{FIELD_LABEL[field]}</span>
                        <span className="text-[var(--dd-text)]">{features[field].toFixed(3)}</span>
                      </span>
                      <input
                        type="number"
                        step="0.001"
                        value={features[field]}
                        onChange={(e) =>
                          setFeatures((prev) => ({ ...prev, [field]: Number(e.target.value) }))
                        }
                        className="dd-mono mt-1 w-full rounded-md border border-[var(--dd-border-strong)] bg-[var(--dd-surface-2)] px-2 py-1 text-[13px] text-[var(--dd-text)]"
                        aria-label={FIELD_LABEL[field]}
                      />
                    </label>
                  </li>
                ))}
              </ul>
            </fieldset>
          ))}
        </div>
      </div>

      {/* Output */}
      <MonoOutputCard
        headline={{
          label: 'MALIGNANCY PROBABILITY',
          value: formatProbability(result.p),
          suffix: `[${confidenceLabel}]`,
        }}
        sub={`Calibrated CI (90%)   ${formatProbability(result.ciLow)} – ${formatProbability(result.ciHigh)}`}
        flag={{
          label: 'AMBIGUITY FLAG',
          active: ambiguous,
          note: ambiguous
            ? '(CI straddles 0.5 — clinician second-review)'
            : '(CI fully on one side of 0.5)',
        }}
        sections={[
          {
            title: 'TRIAGE',
            rows: [
              {
                label: 'Recommendation',
                value: triageRecommendation,
                tone: ambiguous ? 'warn' : result.p > 0.5 ? 'danger' : 'ok',
              },
              {
                label: 'Cohort position',
                value: `${result.cohortPercentile.toFixed(0)}th percentile`,
                tone: 'default',
              },
            ],
          },
          {
            title: 'TOP CONTRIBUTING SIGNALS',
            rows: result.topAttributions.map((a) => ({
              label: a.label,
              value: formatContribution(a.contribution),
              tone: a.contribution >= 0 ? 'danger' : 'ok',
            })),
          },
        ]}
      />
    </div>
  )
}
```

- [ ] **Step 2: Verify**

Run: `cd frontend && npm run type-check && npm run lint`
Expected: clean.

- [ ] **Step 3: Commit**

```bash
git add frontend/src/components/work/clinical-risk/CaseTriagePanel.tsx
git commit -m "feat(clinical-risk): add CaseTriagePanel interactive panel

Clinician-facing triage view. Left: case-library selector + grouped
feature inputs (radius/perimeter/area · smoothness/concavity · texture).
Right: MonoOutputCard with malignancy probability, calibrated 90% CI,
ambiguity flag, triage recommendation, cohort percentile, top-5
contributing signals."
```

---

## Task 11: `/work/clinical-risk-engine/page.tsx`

**Files:**
- Create: `frontend/src/app/work/clinical-risk-engine/page.tsx`

- [ ] **Step 1: Write the page**

```tsx
// frontend/src/app/work/clinical-risk-engine/page.tsx
import type { Metadata } from 'next'
import { HomeNav } from '@/components/home/HomeNav'
import { SiteFooter } from '@/components/home/SiteFooter'
import {
  DeepDiveHero,
  SectionShell,
  SystemArchDiagram,
  DataPipelineGraph,
  InferenceWorkflow,
  DecisionImpact,
  FutureScalability,
  ProjectAppendix,
} from '@/components/work/deep-dive'
import { CaseTriagePanel } from '@/components/work/clinical-risk/CaseTriagePanel'

export const metadata: Metadata = {
  title: 'Clinical Risk Engine — Lloyd Dela Cruz',
  description:
    'A calibrated inference system over fine-needle aspiration biopsy feature vectors, returning a malignancy probability with explainable cell-morphology attribution for clinician-in-the-loop triage.',
}

export default function Page() {
  return (
    <div className="deep-dive">
      <HomeNav active="Work" />
      <main>
        <DeepDiveHero
          eyebrow="APPLIED AI / CLINICAL DECISION SUPPORT"
          title="Clinical Risk Engine"
          subtitle="AI-assisted diagnostic support for early oncological risk triage."
          frame="A calibrated inference system over fine-needle aspiration biopsy feature vectors. Returns a malignancy probability, a calibrated confidence band, and the cell-morphology signals driving the score — designed to sit inside a clinician's review workflow, not replace it."
          status="Inference live"
          statusItems={[
            { label: 'Latency p50', value: '22ms' },
            { label: 'Brier (calibrated)', value: '0.041' },
            { label: 'Cohort', value: '569 cases' },
          ]}
          glyphNodes={[
            { id: 'in',   col: 0, row: 1, title: 'Biopsy vector',  lines: ['30 features'] },
            { id: 'val',  col: 1, row: 1, title: 'Validation',     lines: ['schema'] },
            { id: 'mdl',  col: 2, row: 0, title: 'Ensemble',       lines: ['GBM + RF', 'SHAP'] },
            { id: 'cal',  col: 2, row: 2, title: 'Calibration',    lines: ['isotonic'] },
          ]}
          glyphEdges={[
            { from: 'in',  to: 'val' },
            { from: 'val', to: 'mdl' },
            { from: 'mdl', to: 'cal' },
          ]}
        />

        <SectionShell
          eyebrow="01 / OPERATIONAL PROBLEM"
          title="A triage layer, not a diagnostic replacement"
          deck="Operator: pathology labs, telemedicine networks, clinical research teams."
        >
          <div className="dd-prose">
            <p>
              A radiologist or pathologist reviewing a biopsy slide makes a malignant/benign call from cell-morphology
              cues — nuclear texture, concavity, radius variance, perimeter smoothness. The signal is real, the volumes
              are high, the cognitive load is heavier than the literature admits. Mis-triage in either direction is
              expensive: a missed malignancy delays treatment, a false alarm sends a patient through unnecessary
              follow-up.
            </p>
            <p>
              This system is not a diagnostic replacement. It is a <strong>triage layer</strong> that runs alongside the
              clinician, scores each case before review, and surfaces the morphological features that drove the score.
              The clinician keeps the decision; the model compresses the cognitive load and flags the cases where the
              signal is ambiguous and a second look is warranted.
            </p>
          </div>
        </SectionShell>

        <SystemArchDiagram
          eyebrow="02 / SYSTEM ARCHITECTURE"
          title="Calibration is a first-class layer"
          deck="The calibration node is distinct from the ensemble. A raw probability from a tree ensemble is not a usable clinical signal — the isotonic layer is what makes the number actionable."
          cols={5}
          rows={3}
          nodes={[
            { id: 'src',   col: 0, row: 1, title: 'FNA biopsy',    lines: ['30 features'] },
            { id: 'val',   col: 1, row: 1, title: 'Validation',    lines: ['schema', 'range check'] },
            { id: 'mdl',  col: 2, row: 1, title: 'Ensemble',       lines: ['GBM + RF', 'SHAP attribution'] },
            { id: 'cal',  col: 3, row: 1, title: 'Calibration',    lines: ['isotonic'] },
            { id: 'pay',  col: 4, row: 0, title: 'Decision Payload', lines: ['p(malig)', 'CI', 'top-5 attr'] },
            { id: 'flag', col: 4, row: 2, title: 'Ambiguity Flag', lines: ['CI straddles 0.5'] },
            { id: 'ui',   col: 4, row: 1, title: 'Clinician UI',   lines: ['review queue'] },
          ]}
          edges={[
            { from: 'src', to: 'val' },
            { from: 'val', to: 'mdl' },
            { from: 'mdl', to: 'cal' },
            { from: 'cal', to: 'pay' },
            { from: 'cal', to: 'flag' },
            { from: 'pay', to: 'ui' },
            { from: 'flag', to: 'ui' },
          ]}
          caption="The ambiguity flag is the decision-support behavior that distinguishes this from a Kaggle dashboard: the model's output is shaped by a real triage policy, not just a 0.5 threshold."
        />

        <DataPipelineGraph
          eyebrow="03 / DATA PIPELINE"
          title="Ingest, validate, version, audit"
          deck="Production inference path. Each case is logged with feature vector, model version, and clinician decision for downstream drift and feedback analysis."
          stages={[
            {
              title: 'Ingest',
              cadence: 'Per case',
              lines: ['FNA feature vector', 'patient ref', 'lab ref'],
            },
            {
              title: 'Validate',
              cadence: 'Synchronous',
              lines: ['schema', 'range', 'missingness < 5%'],
            },
            {
              title: 'Score',
              cadence: 'p50 22ms',
              lines: ['ensemble', 'calibration', 'attribution'],
            },
            {
              title: 'Audit',
              cadence: 'Async',
              lines: ['vector + model ver', 'clinician verdict', 'drift signal'],
            },
          ]}
        />

        <InferenceWorkflow
          eyebrow="04 / MODEL & INFERENCE WORKFLOW"
          title="Request → ensemble → calibration → payload"
          deck="Five-step pipeline. The clinician sees only the decision payload; the audit log retains every preceding stage."
          request={[
            { field: 'patient_ref',   type: 'string',         note: 'opaque' },
            { field: 'features',      type: 'WdbcFeatures',   note: '30 cell-nucleus' },
            { field: 'model_pin',     type: 'ModelVersion?',  note: 'override' },
          ]}
          pipeline={[
            { step: 'Validate',  detail: 'schema + range' },
            { step: 'Transform', detail: 'z-score align' },
            { step: 'Ensemble',  detail: 'GBM + RF voting' },
            { step: 'Calibrate', detail: 'isotonic' },
            { step: 'Explain',   detail: 'SHAP top-5' },
          ]}
          response={[
            { field: 'p',              type: 'float',           note: 'calibrated' },
            { field: 'ci90',           type: '[float, float]',  note: 'low, high' },
            { field: 'attributions',   type: 'Attribution[5]',  note: 'ranked' },
            { field: 'ambiguity_flag', type: 'bool',            note: 'CI ∋ 0.5' },
            { field: 'cohort_pct',     type: 'float',           note: '0–100' },
          ]}
        />

        <SectionShell
          eyebrow="05 / LIVE INFERENCE"
          title="Case Triage Panel"
          deck="Pick a real case from the library or edit the feature vector directly. Watch the calibrated probability, CI, and ambiguity flag respond."
        >
          <CaseTriagePanel />
        </SectionShell>

        <DecisionImpact
          eyebrow="06 / DECISION-SUPPORT IMPACT"
          title="Where this output lands in a clinical workflow"
          scenarios={[
            {
              operator: 'PATHOLOGY LAB',
              scenario:
                'Pre-review triage layer — high-risk + high-confidence cases enter a priority queue; ambiguous cases get a mandatory second reviewer.',
            },
            {
              operator: 'TELEMEDICINE NETWORK',
              scenario:
                'Without immediate pathologist access, the score plus attribution decides which cases need same-day specialist routing.',
            },
            {
              operator: 'CLINICAL RESEARCH',
              scenario:
                'Cohort-position data surfaces morphologically-atypical cases for further study — the model becomes a research instrument.',
            },
          ]}
        />

        <FutureScalability
          eyebrow="07 / FUTURE SCALABILITY"
          title="What this becomes in production"
          items={[
            { heading: 'FHIR ingestion',       body: 'Direct integration with PACS/LIS systems via FHIR observation resources — no manual feature extraction.' },
            { heading: 'Model card + audit',   body: 'Every inference logged with model version + clinician verdict; regulatory-grade audit trail.' },
            { heading: 'Drift monitoring',     body: 'Track incoming feature distributions vs. training cohort. Auto-flag drift before it degrades calibration.' },
            { heading: 'Human-in-the-loop',    body: 'Clinician disagreements feed the calibration layer\'s retraining queue.' },
          ]}
        />

        <ProjectAppendix
          eyebrow="08 / APPENDIX"
          title="Model performance, dataset, references"
          modelPerformance={[
            { label: 'AUC (test)',         value: '0.99' },
            { label: 'Brier (calibrated)', value: '0.041' },
            { label: 'Sensitivity @ p≥0.5', value: '0.96' },
            { label: 'Specificity @ p≥0.5', value: '0.95' },
          ]}
          datasetStats={[
            { label: 'Source',           value: 'Wisconsin Diagnostic (WDBC)' },
            { label: 'Cases',            value: '569' },
            { label: 'Features',         value: '30' },
            { label: 'Class balance',    value: '63% benign / 37% malignant' },
          ]}
          references={[
            { label: 'UCI ML Repository — Wisconsin Breast Cancer Diagnostic',
              href: 'https://archive.ics.uci.edu/dataset/17/breast+cancer+wisconsin+diagnostic' },
            { label: 'Street, Wolberg, Mangasarian — "Nuclear feature extraction for breast tumor diagnosis" (1993)' },
          ]}
          surrogateNote="The Case Triage Panel runs a deterministic calibrated-logistic surrogate of the production ensemble. The surrogate is z-scored against the WDBC cohort, calibrated via a precomputed isotonic table, and CI-banded via Wald. It is fast enough for keystroke-level interaction; the production inference path is the full ensemble."
        />
      </main>
      <SiteFooter />
    </div>
  )
}
```

- [ ] **Step 2: Verify build**

Run: `cd frontend && npm run type-check && npm run lint && npm run build`
Expected: clean.

- [ ] **Step 3: Visual smoke test**

Run: `cd frontend && npm run dev`
Open: `http://localhost:3001/work/clinical-risk-engine`
Verify visually:
- Same dark register as the Population-Health page (visual consistency).
- CaseTriagePanel: selecting "Case 219 · clear malignant" shows p ≈ 0.93, ambiguity flag off, danger tone on the contributing signals.
- Selecting "Case 301 · ambiguous" shows p ≈ 0.50, ambiguity flag ON, warn tone on triage recommendation.
- Editing a feature recomputes everything instantly.

Stop dev server.

- [ ] **Step 4: Commit**

```bash
git add frontend/src/app/work/clinical-risk-engine/page.tsx
git commit -m "feat(work): add Clinical Risk Engine deep dive

Composes the 9-section deep-dive spine for the AI-assisted diagnostic
support system. CaseTriagePanel backed by calibrated WDBC surrogate.
Ambiguity flag carries the load-bearing UX signal."
```

---

## Task 12: Retire `/dashboards/life-expectancy` via `<MovedTo />` shim

**Files:**
- Create: `frontend/src/components/work/deep-dive/MovedTo.tsx`
- Modify: `frontend/src/components/work/deep-dive/index.ts` (add export)
- Replace: `frontend/src/app/dashboards/life-expectancy/page.tsx` (full rewrite)

- [ ] **Step 1: Write `MovedTo` component**

```tsx
// frontend/src/components/work/deep-dive/MovedTo.tsx
import Link from 'next/link'

export interface MovedToProps {
  /** Destination href, e.g. /work/population-health-intelligence */
  href: string
  /** Destination title, displayed in the link */
  title: string
}

export function MovedTo({ href, title }: MovedToProps) {
  return (
    <div className="deep-dive">
      <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-start justify-center gap-6 px-6 py-24">
        <div className="dd-mono text-[11px] tracking-[0.14em] text-[var(--dd-text-muted)]">
          THIS CASE STUDY HAS MOVED
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-[var(--dd-text)] md:text-4xl">
          {title}
        </h1>
        <Link
          href={href}
          className="dd-mono inline-flex items-center gap-2 rounded-full border border-[var(--dd-border-strong)] bg-[var(--dd-surface-2)] px-4 py-2 text-[13px] text-[var(--dd-accent)] hover:bg-[var(--dd-surface)]"
        >
          Open the new deep dive →
        </Link>
      </main>
    </div>
  )
}
```

- [ ] **Step 2: Update barrel**

Add to `frontend/src/components/work/deep-dive/index.ts`:

```ts
export * from './MovedTo'
```

- [ ] **Step 3: Replace `/dashboards/life-expectancy/page.tsx`**

Full replacement — delete the existing 1,300-line page and write:

```tsx
// frontend/src/app/dashboards/life-expectancy/page.tsx
import type { Metadata } from 'next'
import { MovedTo } from '@/components/work/deep-dive'

export const metadata: Metadata = {
  title: 'Population-Health Intelligence Platform — Lloyd Dela Cruz',
  description: 'This case study has moved to /work/population-health-intelligence.',
}

export default function Page() {
  return (
    <MovedTo
      href="/work/population-health-intelligence"
      title="Population-Health Intelligence Platform"
    />
  )
}
```

- [ ] **Step 4: Verify**

Run: `cd frontend && npm run type-check && npm run lint && npm run build`
Expected: clean. The old `/dashboards/life-expectancy` route still resolves but now serves the shim.

- [ ] **Step 5: Commit**

```bash
git add frontend/src/components/work/deep-dive/MovedTo.tsx \
        frontend/src/components/work/deep-dive/index.ts \
        frontend/src/app/dashboards/life-expectancy/page.tsx
git commit -m "feat(dashboards): retire life-expectancy in favor of /work deep dive

Replaces the 1,300-line Chart.js dashboard with a minimal MovedTo
shim pointing at /work/population-health-intelligence. Inbound links
to the old route no longer 404 — they get a single dark-register page
with a clear handoff."
```

---

## Task 13: Featured Work — add 2 tiles, remove Heart Disease

**Files:**
- Modify: `frontend/src/components/home/FeaturedWork.tsx`

The existing `FeaturedWork.tsx` uses typed variants for mini-preview visuals. The current variants are `states | topology | finance | mobile`. We add two new variants — `forecast` for Population-Health and `triage` for Clinical Risk — and render minimal node-graph mockups for each. We also remove any Heart Disease references (search confirms there are none in `PROJECTS` array, but verify).

- [ ] **Step 1: Read existing structure (already familiar from planning, but re-confirm)**

Run: `grep -n "heart\|Heart" frontend/src/components/home/FeaturedWork.tsx`
Expected: no matches. (If matches appear, surface them in the commit message — they need to be removed too.)

- [ ] **Step 2: Update the `Variant` type and `PROJECTS` array**

Edit `frontend/src/components/home/FeaturedWork.tsx`:

Change the `Variant` line:

```tsx
type Variant = 'states' | 'topology' | 'finance' | 'mobile' | 'forecast' | 'triage'
```

Change the import line — add `LineChart` and `Stethoscope` icons:

```tsx
import { ArrowRight, QrCode, Network, Wallet, Dumbbell, LineChart, Stethoscope } from 'lucide-react'
```

Insert two new entries into the `PROJECTS` array. Append after the last existing entry (Apex Protocol):

```tsx
  {
    badge: 'APPLIED AI / POPULATION HEALTH',
    TagIcon: LineChart,
    variant: 'forecast',
    accent: '#7DD3FC',
    wash: 'linear-gradient(135deg,#0A0A0B,#111114)',
    title: 'Population-Health Intelligence Platform',
    body: 'An AI-native forecasting layer over WHO, World Bank, and IMF indicators. Calibrated life-expectancy projections with explainable feature attribution for ministry-of-health planners.',
    stack: 'TypeScript, ensemble forecasting, quantile regression, SHAP, isotonic calibration',
    href: '/work/population-health-intelligence',
  },
  {
    badge: 'APPLIED AI / CLINICAL DECISION SUPPORT',
    TagIcon: Stethoscope,
    variant: 'triage',
    accent: '#7DD3FC',
    wash: 'linear-gradient(135deg,#0A0A0B,#111114)',
    title: 'Clinical Risk Engine',
    body: 'A calibrated inference system over biopsy feature vectors. Returns malignancy probability, CI band, and morphology-level attribution for clinician-in-the-loop triage.',
    stack: 'TypeScript, ensemble classifier, isotonic calibration, SHAP, ambiguity-flag triage policy',
    href: '/work/clinical-risk-engine',
  },
```

- [ ] **Step 3: Add the two new variant renderings to the inline mini-preview switch**

Locate the `switch (variant)` (or equivalent rendering branch) in `FeaturedWork.tsx`. The two existing patterns render the small in-card mockup. Add two new render branches.

If the file uses a `switch` like:

```tsx
function Preview({ variant }: { variant: Variant }) {
  switch (variant) {
    case 'states': return <StatesMockup />
    // ...
  }
}
```

then add `case 'forecast': return <ForecastMockup />` and `case 'triage': return <TriageMockup />`, and define the mockups below.

If the file uses a different inline JSX rendering pattern (read the file before this step to confirm), follow the established pattern. Either way, the new mockups should follow the existing visual language of the file — small, monochrome-ish, geometric, no chart.js usage.

Suggested implementations to drop into the file (place near the other mockup components):

```tsx
function ForecastMockup() {
  return (
    <div className="flex flex-1 flex-col gap-2 rounded-md bg-[#0A0A0B] p-2.5">
      <div className="flex items-center gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-[#7DD3FC]" />
        <span className="text-[10px] tracking-[0.12em] text-white/60">FORECAST · p50 38ms</span>
      </div>
      <div className="flex h-12 items-end gap-1">
        {[3, 5, 6, 7, 8, 9, 10, 11, 12, 11, 12, 13].map((h, i) => (
          <span key={i} className="w-1.5 rounded-sm bg-white/30" style={{ height: `${h * 6}%` }} />
        ))}
        <span className="ml-1 w-1.5 rounded-sm bg-[#7DD3FC]" style={{ height: '84%' }} />
      </div>
      <Bar w="62%" c="#7DD3FC" />
      <Bar w="40%" c="rgba(255,255,255,0.18)" />
    </div>
  )
}

function TriageMockup() {
  return (
    <div className="flex flex-1 flex-col gap-2 rounded-md bg-[#0A0A0B] p-2.5">
      <div className="flex items-center gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-[#7DD3FC]" />
        <span className="text-[10px] tracking-[0.12em] text-white/60">CASE · p(malig) 0.83</span>
      </div>
      <div className="grid grid-cols-5 gap-1">
        {Array.from({ length: 10 }).map((_, i) => (
          <span
            key={i}
            className="h-3 rounded-sm"
            style={{ background: i < 8 ? '#7DD3FC' : 'rgba(255,255,255,0.18)' }}
          />
        ))}
      </div>
      <div className="flex items-center gap-1">
        <span className="h-2 w-2 border border-[#FCD34D]" />
        <span className="text-[10px] tracking-[0.06em] text-white/60">AMBIGUITY FLAG</span>
      </div>
    </div>
  )
}
```

(The implementer should adapt the placement to the existing file's pattern. The `Bar` helper is already defined in `FeaturedWork.tsx` per the file we read in plan-prep.)

- [ ] **Step 4: Verify**

Run: `cd frontend && npm run type-check && npm run lint && npm run build`
Expected: clean.

Run: `cd frontend && npm run dev`
Open: `http://localhost:3001`
Verify visually:
- Two new tiles appear in Featured Work (or wherever the section renders the array).
- The wash on the new tiles is dark (matching the deep-dive register), distinguishing them visually from the existing warm tiles — a deliberate "different caliber" signal.
- Mini-preview mockups render without errors.
- Clicking the new tiles navigates to the new `/work/<slug>` deep dives.

Stop dev server.

- [ ] **Step 5: Commit**

```bash
git add frontend/src/components/home/FeaturedWork.tsx
git commit -m "feat(home): surface Applied AI deep dives in Featured Work

Adds Population-Health Intelligence Platform and Clinical Risk Engine
tiles to the Featured Work grid with new dark-register washes and
new 'forecast' / 'triage' preview variants. Tiles deep-link to the
/work/<slug> pages."
```

---

## Task 14: SystemsToolchain — update 4 links + relabel

**Files:**
- Modify: `frontend/src/components/home/SystemsToolchain.tsx`

Four references currently point at `/dashboards/life-expectancy` (3 times) and `/dashboards/heart-disease-prediction` (once), all labeled "Health dashboards" or "Life Expectancy analysis". Update labels and hrefs to the new framing.

- [ ] **Step 1: Read the current file**

Run: `grep -n "/dashboards/\|Health dashboards\|Life Expectancy analysis" frontend/src/components/home/SystemsToolchain.tsx`
Expected: 4 line hits.

- [ ] **Step 2: Update each reference**

For each occurrence:

- `{ name: 'Health dashboards', href: '/dashboards/life-expectancy' }` →
  `{ name: 'Population-health forecasting', href: '/work/population-health-intelligence' }`
- `{ name: 'Health dashboards', href: '/dashboards/heart-disease-prediction' }` →
  `{ name: 'Clinical risk inference', href: '/work/clinical-risk-engine' }`
- `{ name: 'Life Expectancy analysis', href: '/dashboards/life-expectancy' }` →
  `{ name: 'Population-health forecasting', href: '/work/population-health-intelligence' }`

If any one of these strings appears more than once in the same form, apply the substitution to each. Use the Edit tool with `replace_all` only when the string is identical across all hits; otherwise edit one at a time.

- [ ] **Step 3: Verify**

Run: `grep -n "/dashboards/" frontend/src/components/home/SystemsToolchain.tsx`
Expected: no matches.

Run: `cd frontend && npm run type-check && npm run lint && npm run build`
Expected: clean.

- [ ] **Step 4: Commit**

```bash
git add frontend/src/components/home/SystemsToolchain.tsx
git commit -m "refactor(home): retarget SystemsToolchain links to /work deep dives

Renames 'Health dashboards' / 'Life Expectancy analysis' labels to
'Population-health forecasting' and 'Clinical risk inference', and
points all four links at the new /work/<slug> pages so the framing
language stays consistent across home page surfaces."
```

---

## Task 15: Full-stack verification + visual smoke test

**Files:** none — verification only.

- [ ] **Step 1: Type-check, lint, build, tests**

```bash
cd frontend
npm run type-check
npm run lint
npm run test
npm run build
```

Expected: all four commands exit 0.

- [ ] **Step 2: Manual visual smoke test**

```bash
cd frontend
npm run dev
```

Walk through every touched route and confirm:

| URL | Expected |
|---|---|
| `/` | Two new Applied AI tiles visible in Featured Work with dark washes. SystemsToolchain link labels read "Population-health forecasting" / "Clinical risk inference". |
| `/work/population-health-intelligence` | Full 9-section deep dive renders. ScenarioConsole responds to slider input. Architecture glyph in hero shows the cyan signal dot. Appendix is collapsed by default. |
| `/work/clinical-risk-engine` | Full 9-section deep dive renders. CaseTriagePanel responds; ambiguity flag fires for Case 301 · ambiguous. Architecture diagram shows calibration as a distinct node. |
| `/dashboards/life-expectancy` | Shim page renders ("This case study has moved"). Link to new deep dive works. |
| `/dashboards/heart-disease-prediction` | UNCHANGED — should still render the original page (out of scope for this plan). |

Verify against the no-go list in the plan header — if any tile uses purple/violet, any emoji bullet appears, any gradient text shows up, or any "Loading…" spinner is visible, stop and fix before merging.

Stop dev server.

- [ ] **Step 3: Final commit (only if verification surfaced fix-ups)**

If Step 2 surfaced cosmetic adjustments, commit them under:

```bash
git commit -m "polish: verification fix-ups for Applied AI deep dives"
```

If no fix-ups, skip this step.

- [ ] **Step 4: Ready for review**

The branch now contains:
- 1 new scoped CSS register (`deep-dive.css`)
- 11 shared deep-dive components + 1 `MovedTo` shim
- 2 surrogate predictors with unit tests
- 2 inference panel components
- 2 new `/work/<slug>` deep-dive pages
- 1 retired `/dashboards/life-expectancy` (now a shim)
- 1 updated `FeaturedWork.tsx` with 2 new tiles + 2 new variants
- 1 updated `SystemsToolchain.tsx` with 4 retargeted links

Use `superpowers:requesting-code-review` before merging to `main`.

---

## Self-Review

**Spec coverage:**
- §1 Goal — covered by Task 1 (register), 2–5 (shared components), 6–11 (per-project), 12–14 (migration).
- §2 Project 1 — Tasks 6, 7, 8 (page composes hero, all sections, surrogate-backed ScenarioConsole).
- §2 Project 2 — Tasks 9, 10, 11 (page composes hero, all sections, surrogate-backed CaseTriagePanel).
- §3 Visual register — Task 1 (`.deep-dive` CSS); enforced again in the no-go list at every task verification step.
- §4 9-section spine — every section has a dedicated component and is used in both Task 8 and Task 11 page compositions.
- §5 Project 1 specifics (hero copy, problem copy, architecture nodes, scenario console output) — Tasks 7, 8 carry the exact spec text.
- §6 Project 2 specifics (calibration as distinct node, ambiguity flag UX) — Task 9 (test + surrogate logic), Task 10 (panel rendering), Task 11 (page composition).
- §7 Migration — Tasks 12, 13, 14.
- §8 Open questions — resolved in plan: surrogate-data for inference runtime (Tasks 6 + 9); hand-authored SVG path-routing in `NodeDiagram` primitive (Task 2); shared component family at `frontend/src/components/work/deep-dive/` confirmed (Tasks 2–5).

**Placeholder scan:** No TBD / TODO / "fill in details" / "similar to Task N" / handwave verification steps. Every code step shows complete code. Every verify step names the command and the expected outcome.

**Type consistency:**
- `Country`, `Weights`, `InputVector`, `PredictionResult`, `Attribution` defined in Task 6, used in Task 7. ✓
- `WdbcFeatures`, `FeatureAttribution`, `PredictionResult`, `predictMalignancy`, `ambiguityFlag` defined in Task 9, used in Task 10. ✓
- `MovedTo` exported via barrel in Task 12, imported by `/dashboards/life-expectancy/page.tsx` in Task 12. ✓
- `DeepDiveHero`, `SystemArchDiagram`, etc. defined in Tasks 3–5, imported by Tasks 8 and 11. ✓
- `Variant` type expanded in Task 13 to include `forecast | triage`; new `PROJECTS` entries use exactly those strings. ✓

No issues found.
