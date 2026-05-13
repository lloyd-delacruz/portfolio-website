# AI Workflow Algorithm Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a shared `AIWorkflowAlgorithm` section component that renders Lloyd's 7-stage AI working algorithm as a horizontal decision-tree pipeline (with one decision diamond and an amber loop-back arc), placed on `/` and `/systems` in the hero's visual register (`flow-line` blinking dashes, `anim-float` nodes).

**Architecture:** Single self-contained React Server Component in `frontend/src/components/home/`. Pure presentational — no props, no state, no client-side JS. Renders two layouts via Tailwind responsive utilities: an SVG-based horizontal pipeline at `md` and above, and a vertical stack of cards with short SVG connector strips below `md`. Both layouts iterate over a single `STAGES` constant array so content stays DRY. A visually-hidden `<ol>` mirrors the algorithm for screen readers.

**Tech Stack:** Next.js 15 App Router, React Server Components, TypeScript, Tailwind CSS (existing `.home2` scope), `lucide-react` icons, Vitest + React Testing Library for the structural smoke test. No new dependencies.

**Spec reference:** `docs/superpowers/specs/2026-05-13-ai-workflow-algorithm-design.md`

---

## File Structure

| Path | Purpose | Action |
|---|---|---|
| `frontend/src/components/home/AIWorkflowAlgorithm.tsx` | The section component (heading, desktop SVG diagram, mobile stack, sr-only list). Self-contained, no props. | Create |
| `frontend/src/components/home/AIWorkflowAlgorithm.test.tsx` | Structural smoke test (heading text, 7 stage captions, sr-only list of 7 items). | Create |
| `frontend/src/app/page.tsx` | Home page — insert section between `Capabilities` and `FeaturedWork`. | Modify |
| `frontend/src/app/systems/page.tsx` | Systems page — insert section between heading section and `SystemsToolchain`. | Modify |

The component keeps all layout math and node data inline (mirrors how `DiagramScene.tsx` is organized — one file owns the whole visual unit). No new shared primitives needed.

---

## Task 1: Scaffold component + failing smoke test

**Files:**
- Create: `frontend/src/components/home/AIWorkflowAlgorithm.test.tsx`
- Create: `frontend/src/components/home/AIWorkflowAlgorithm.tsx`

This task lands the test first, watches it fail, then drops in a minimal text-only scaffold that makes it pass. No SVG, no animation yet — just the section shell with the heading and the 7 captions in the DOM so the structural test has something to verify. Subsequent tasks layer in the diagram, the loop-back, animation, and responsive behavior.

- [ ] **Step 1: Write the failing test**

Create `frontend/src/components/home/AIWorkflowAlgorithm.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { AIWorkflowAlgorithm } from './AIWorkflowAlgorithm'

describe('AIWorkflowAlgorithm', () => {
  it('renders the section heading copy', () => {
    render(<AIWorkflowAlgorithm />)
    expect(screen.getByText(/how i work with ai/i)).toBeInTheDocument()
    expect(screen.getByText(/an algorithm, not a vibe\./i)).toBeInTheDocument()
    expect(screen.getByText(/this is the loop i run\./i)).toBeInTheDocument()
  })

  it('renders all seven stage captions', () => {
    render(<AIWorkflowAlgorithm />)
    const captions = ['FRAME', 'SPEC', 'PLAN', 'DISPATCH AGENTS', 'PASS?', 'REVIEW', 'SHIP']
    for (const caption of captions) {
      expect(screen.getAllByText(caption).length).toBeGreaterThan(0)
    }
  })

  it('exposes the algorithm to assistive tech as an ordered list of 7 items', () => {
    render(<AIWorkflowAlgorithm />)
    const list = screen.getByRole('list', { name: /how i work with ai/i })
    expect(within(list).getAllByRole('listitem')).toHaveLength(7)
  })
})
```

The test file lives alongside the component, matching the project's co-located pattern (see `frontend/src/lib/hooks/usePrefersReducedMotion.test.ts`).

- [ ] **Step 2: Run the test and verify it fails**

Run from the `frontend` directory:

```bash
cd frontend && npx vitest run src/components/home/AIWorkflowAlgorithm.test.tsx
```

Expected: FAIL — error resolving `./AIWorkflowAlgorithm` because the component does not exist yet.

- [ ] **Step 3: Create the minimal component to pass the test**

Create `frontend/src/components/home/AIWorkflowAlgorithm.tsx`:

```tsx
// frontend/src/components/home/AIWorkflowAlgorithm.tsx

type Stage = {
  key: string
  label: string      // mono uppercase caption shown below each card
  sub: string        // mono uppercase sub-caption shown above each card
  longLabel: string  // sentence used in the sr-only list
}

const STAGES: Stage[] = [
  { key: 'frame',    label: 'FRAME',           sub: 'WITH THE OPERATOR',  longLabel: 'Frame the problem with the operator, not the dataset.' },
  { key: 'spec',     label: 'SPEC',            sub: 'DESIGN BEFORE CODE', longLabel: 'Write the spec before any code.' },
  { key: 'plan',     label: 'PLAN',            sub: 'REVIEWABLE UNITS',   longLabel: 'Decompose the spec into a reviewable plan.' },
  { key: 'dispatch', label: 'DISPATCH AGENTS', sub: 'TESTS FIRST',        longLabel: 'Dispatch agentic coding tools to do the work, tests first.' },
  { key: 'gate',     label: 'PASS?',           sub: 'DECISION GATE',      longLabel: 'Decision: do the tests pass and the behaviour match the spec? If no, loop back to Plan.' },
  { key: 'review',   label: 'REVIEW',          sub: 'HUMAN IN THE LOOP',  longLabel: 'Review every diff yourself before merging.' },
  { key: 'ship',     label: 'SHIP',            sub: 'OBSERVABLE IN PROD', longLabel: 'Ship to production and monitor the running system.' },
]

export function AIWorkflowAlgorithm() {
  return (
    <section className="relative mx-auto max-w-[1180px] px-6 py-20" aria-labelledby="ai-workflow-heading">
      <header className="max-w-2xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-plum">HOW I WORK WITH AI</p>
        <h2 id="ai-workflow-heading" className="mt-3 font-display text-4xl font-extrabold leading-tight text-ink sm:text-5xl">
          An algorithm, not a vibe.
          <br />
          <span className="grad-plum-text">This is the loop I run.</span>
        </h2>
        <p className="mt-4 max-w-[45ch] text-base leading-relaxed text-ink-soft">
          Most data-science workflows stop at a notebook. Mine ships into production because every step has a gate
          — a spec, a test, a review, an observable system — and AI agents do the heavy work inside those gates.
        </p>
      </header>

      {/* Visible stage list — placeholder layout, replaced by the diagram in Task 2 */}
      <ul className="mt-12 flex flex-wrap gap-4">
        {STAGES.map((s) => (
          <li key={s.key} className="rounded-2xl bg-white px-4 py-3 ghair soft-shadow-sm">
            <span className="block text-[9px] font-semibold uppercase tracking-[0.16em] text-ink-muted">{s.sub}</span>
            <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-ink">{s.label}</span>
          </li>
        ))}
      </ul>

      {/* Screen-reader linearization */}
      <ol className="sr-only" aria-label="How I work with AI">
        {STAGES.map((s) => (
          <li key={s.key}>{s.longLabel}</li>
        ))}
      </ol>
    </section>
  )
}
```

- [ ] **Step 4: Run the test and verify it passes**

```bash
cd frontend && npx vitest run src/components/home/AIWorkflowAlgorithm.test.tsx
```

Expected: PASS — 3 tests passing.

- [ ] **Step 5: Commit**

```bash
git add frontend/src/components/home/AIWorkflowAlgorithm.tsx frontend/src/components/home/AIWorkflowAlgorithm.test.tsx
git commit -m "feat(home): scaffold AIWorkflowAlgorithm with structural smoke test"
```

---

## Task 2: Desktop SVG pipeline (6 cards + diamond + forward path)

**Files:**
- Modify: `frontend/src/components/home/AIWorkflowAlgorithm.tsx` — replace the placeholder `<ul>` with the desktop SVG layout (still keeping the sr-only list and existing header intact).

This task introduces the SVG-based pipeline used at `md` and above. It defines a fixed `viewBox` design space, positions seven nodes (six action cards and the decision diamond at position 5) at evenly spaced x-centers, and draws a plum forward path with the same `flow-line` blinking dash used by the hero. Animation, the loop-back arc, and the mobile layout come in later tasks; this task is purely the static desktop skeleton with the blinking forward path.

- [ ] **Step 1: Replace the file with the diagram-equipped version**

Overwrite `frontend/src/components/home/AIWorkflowAlgorithm.tsx`:

```tsx
// frontend/src/components/home/AIWorkflowAlgorithm.tsx
import {
  Target,
  FileText,
  ListChecks,
  Bot,
  GitFork,
  ShieldCheck,
  Rocket,
  type LucideIcon,
} from 'lucide-react'

type Stage = {
  key: string
  label: string
  sub: string
  longLabel: string
  Icon: LucideIcon
  color: string
  /** centre x in the 1080×360 design space */
  cx: number
  /** true for the decision diamond at position 5 */
  diamond?: boolean
}

// Design space for the desktop diagram. 7 nodes evenly spaced across 1080,
// vertically centred at y = 220 to leave headroom for the loop-back arc.
const W = 1080
const H = 360
const ROW_Y = 220
const CARD = 96   // card side length
const DIA = 96    // diamond bounding box side length (rotated 45°)

// Seven evenly spaced centres: 1080 / 7 ≈ 154.3 step, first at step/2.
const X = (i: number) => Math.round((W / 7) * (i + 0.5))

const STAGES: Stage[] = [
  { key: 'frame',    label: 'FRAME',           sub: 'WITH THE OPERATOR',  longLabel: 'Frame the problem with the operator, not the dataset.',                                            Icon: Target,      color: 'var(--plum)',  cx: X(0) },
  { key: 'spec',     label: 'SPEC',            sub: 'DESIGN BEFORE CODE', longLabel: 'Write the spec before any code.',                                                                  Icon: FileText,    color: 'var(--blue)',  cx: X(1) },
  { key: 'plan',     label: 'PLAN',            sub: 'REVIEWABLE UNITS',   longLabel: 'Decompose the spec into a reviewable plan.',                                                       Icon: ListChecks,  color: 'var(--plum)',  cx: X(2) },
  { key: 'dispatch', label: 'DISPATCH AGENTS', sub: 'TESTS FIRST',        longLabel: 'Dispatch agentic coding tools to do the work, tests first.',                                       Icon: Bot,         color: 'var(--pink)',  cx: X(3) },
  { key: 'gate',     label: 'PASS?',           sub: 'DECISION GATE',      longLabel: 'Decision: do the tests pass and the behaviour match the spec? If no, loop back to Plan.',          Icon: GitFork,     color: 'var(--amber)', cx: X(4), diamond: true },
  { key: 'review',   label: 'REVIEW',          sub: 'HUMAN IN THE LOOP',  longLabel: 'Review every diff yourself before merging.',                                                       Icon: ShieldCheck, color: 'var(--green)', cx: X(5) },
  { key: 'ship',     label: 'SHIP',            sub: 'OBSERVABLE IN PROD', longLabel: 'Ship to production and monitor the running system.',                                               Icon: Rocket,      color: 'var(--plum)',  cx: X(6) },
]

// Half-width of each node's visual footprint, used to compute connector
// endpoints. The diamond's bounding box is the same size as a card, so the
// same half-width applies.
const HALF = CARD / 2

export function AIWorkflowAlgorithm() {
  return (
    <section className="relative mx-auto max-w-[1180px] px-6 py-20" aria-labelledby="ai-workflow-heading">
      <header className="max-w-2xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-plum">HOW I WORK WITH AI</p>
        <h2 id="ai-workflow-heading" className="mt-3 font-display text-4xl font-extrabold leading-tight text-ink sm:text-5xl">
          An algorithm, not a vibe.
          <br />
          <span className="grad-plum-text">This is the loop I run.</span>
        </h2>
        <p className="mt-4 max-w-[45ch] text-base leading-relaxed text-ink-soft">
          Most data-science workflows stop at a notebook. Mine ships into production because every step has a gate
          — a spec, a test, a review, an observable system — and AI agents do the heavy work inside those gates.
        </p>
      </header>

      {/* Desktop pipeline (md and up) */}
      <div className="relative mt-14 hidden md:block">
        <div className="relative w-full" style={{ paddingBottom: `${(H / W) * 100}%` }}>
          <div className="absolute inset-0">
            {/* SVG connectors */}
            <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" fill="none" aria-hidden>
              {/* Forward path: six straight segments between adjacent node edges */}
              {STAGES.slice(0, -1).map((s, i) => {
                const next = STAGES[i + 1]
                const x1 = s.cx + HALF
                const x2 = next.cx - HALF
                return (
                  <g key={`fwd-${s.key}`}>
                    <line
                      x1={x1}
                      y1={ROW_Y}
                      x2={x2}
                      y2={ROW_Y}
                      stroke="var(--plum)"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeOpacity={0.45}
                      className="flow-line"
                    />
                    <circle cx={x1} cy={ROW_Y} r={3.2} fill="var(--plum)" opacity={0.8} />
                    <circle cx={x2} cy={ROW_Y} r={3.2} fill="var(--plum)" opacity={0.8} />
                  </g>
                )
              })}
            </svg>

            {/* Node cards / diamond, positioned in percentage-of-design-space coordinates */}
            {STAGES.map((s) => (
              <div
                key={s.key}
                className="absolute"
                style={{
                  width: CARD,
                  height: CARD,
                  left: `${(s.cx / W) * 100}%`,
                  top: `${(ROW_Y / H) * 100}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                {/* Sub-caption above */}
                <span
                  className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] font-semibold uppercase tracking-[0.16em] text-ink-muted"
                  style={{ bottom: `${CARD + 6}px` }}
                >
                  {s.sub}
                </span>

                {/* Card or diamond */}
                {s.diamond ? (
                  <div className="grid h-full w-full place-items-center">
                    <div
                      className="absolute inset-0 rounded-md bg-white ghair-2 soft-shadow-sm"
                      style={{ transform: 'rotate(45deg)' }}
                    />
                    <div className="relative flex flex-col items-center justify-center">
                      <s.Icon size={20} style={{ color: s.color }} strokeWidth={1.9} />
                      <span className="mt-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink">
                        {s.label}
                      </span>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="grid h-full w-full place-items-center rounded-2xl bg-white ghair soft-shadow-sm">
                      <s.Icon size={26} style={{ color: s.color }} strokeWidth={1.9} />
                    </div>
                    <span
                      className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.16em] text-ink"
                      style={{ top: `${CARD + 8}px` }}
                    >
                      {s.label}
                    </span>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile fallback (below md) — replaced with a real stack layout in Task 5 */}
      <ul className="mt-12 flex flex-col gap-3 md:hidden">
        {STAGES.map((s) => (
          <li key={s.key} className="rounded-2xl bg-white px-4 py-3 ghair soft-shadow-sm">
            <span className="block text-[9px] font-semibold uppercase tracking-[0.16em] text-ink-muted">{s.sub}</span>
            <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-ink">{s.label}</span>
          </li>
        ))}
      </ul>

      {/* Screen-reader linearization */}
      <ol className="sr-only" aria-label="How I work with AI">
        {STAGES.map((s) => (
          <li key={s.key}>{s.longLabel}</li>
        ))}
      </ol>
    </section>
  )
}
```

Notes for the implementer:
- `var(--plum)`, `var(--blue)`, `var(--pink)`, `var(--amber)`, `var(--green)` are defined in `frontend/src/app/globals.css` under the `.home2` scope. They resolve correctly because both `/` and `/systems` wrap their `<main>` content in `<div className="home2">`.
- `flow-line`, `ghair`, `ghair-2`, `soft-shadow-sm`, `grad-plum-text` are also defined in `globals.css`. Don't add new CSS.
- The diamond uses an absolutely-positioned rotated `<div>` for the diamond shape with the icon and label rendered upright on top of it — the same trick the spec calls for.

- [ ] **Step 2: Run the existing smoke test to confirm structural assertions still hold**

```bash
cd frontend && npx vitest run src/components/home/AIWorkflowAlgorithm.test.tsx
```

Expected: PASS — 3 tests still passing (heading, 7 captions, sr-only list of 7).

- [ ] **Step 3: Run lint and type-check**

```bash
cd frontend && npm run lint && npm run type-check
```

Expected: both pass with no errors.

- [ ] **Step 4: Commit**

```bash
git add frontend/src/components/home/AIWorkflowAlgorithm.tsx
git commit -m "feat(home): desktop SVG pipeline with forward flow-line connectors"
```

---

## Task 3: Loop-back arc + yes/no labels

**Files:**
- Modify: `frontend/src/components/home/AIWorkflowAlgorithm.tsx` — add the amber loop-back arc from the diamond back to Plan, plus "yes" and "no" labels.

The loop-back is the element that makes the diagram read as a decision-tree algorithm. It's an amber cubic Bézier arc from the top of the decision diamond back to the top of the Plan card, ending in a chevron arrowhead, with a "no" caption at its apex and a "yes" caption on the short segment between the diamond and Review.

- [ ] **Step 1: Insert the loop-back arc and labels into the SVG**

In `frontend/src/components/home/AIWorkflowAlgorithm.tsx`, locate the `<svg>` block from Task 2. Add the following inside the same `<svg>`, immediately after the closing `</g>` of the last forward-segment iteration (i.e. right before `</svg>`):

```tsx
{/* Decision-branch labels */}
{(() => {
  const gate = STAGES[4]  // PASS?
  const plan = STAGES[2]  // PLAN
  const review = STAGES[5]
  const arcStartX = gate.cx
  const arcStartY = ROW_Y - HALF       // top of diamond bounding box
  const arcEndX = plan.cx
  const arcEndY = ROW_Y - HALF         // top of Plan card
  const c1x = gate.cx - 40
  const c1y = 60
  const c2x = plan.cx + 40
  const c2y = 60
  const apexX = (gate.cx + plan.cx) / 2
  const apexY = 70

  // Yes-branch midpoint between the diamond and Review (along the forward path).
  const yesX = (gate.cx + review.cx) / 2
  const yesY = ROW_Y - 12

  return (
    <g>
      <defs>
        <marker
          id="aiwf-arrow"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--amber)" />
        </marker>
      </defs>

      {/* Amber loop-back arc from the top of the diamond back to the top of Plan */}
      <path
        d={`M ${arcStartX} ${arcStartY} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${arcEndX} ${arcEndY}`}
        stroke="var(--amber)"
        strokeWidth={2}
        strokeLinecap="round"
        strokeOpacity={0.7}
        className="flow-line"
        markerEnd="url(#aiwf-arrow)"
      />
      <circle cx={arcStartX} cy={arcStartY} r={3.2} fill="var(--amber)" opacity={0.85} />

      {/* "no" at the apex of the loop-back arc */}
      <text
        x={apexX}
        y={apexY - 6}
        textAnchor="middle"
        fontSize="11"
        fontWeight="700"
        fill="var(--amber)"
        style={{ letterSpacing: '0.14em' }}
      >
        NO
      </text>

      {/* "yes" along the short forward segment between the diamond and Review */}
      <text
        x={yesX}
        y={yesY}
        textAnchor="middle"
        fontSize="11"
        fontWeight="700"
        fill="var(--green)"
        style={{ letterSpacing: '0.14em' }}
      >
        YES
      </text>
    </g>
  )
})()}
```

Why an IIFE: it keeps the per-arc derived values (`arcStartX`, etc.) local to this block without cluttering module scope, matching the inline math style used elsewhere in `DiagramScene.tsx`.

- [ ] **Step 2: Run lint and type-check**

```bash
cd frontend && npm run lint && npm run type-check
```

Expected: both pass.

- [ ] **Step 3: Run the smoke test to confirm structural assertions still hold**

```bash
cd frontend && npx vitest run src/components/home/AIWorkflowAlgorithm.test.tsx
```

Expected: PASS — 3 tests still passing. (The arc is decorative and doesn't change the DOM the test inspects.)

- [ ] **Step 4: Commit**

```bash
git add frontend/src/components/home/AIWorkflowAlgorithm.tsx
git commit -m "feat(home): add loop-back arc and yes/no branches to workflow diagram"
```

---

## Task 4: Staggered float animation on all seven nodes

**Files:**
- Modify: `frontend/src/components/home/AIWorkflowAlgorithm.tsx` — apply the existing `anim-float` class with staggered `animationDelay` to each node so the row breathes like the hero.

The animation hooks into the existing `home2-float` keyframes already defined in `globals.css` (see line 490 area). No new CSS. Reduced-motion is already handled globally for `.anim-float`.

- [ ] **Step 1: Wrap each node in an animated child**

In `frontend/src/components/home/AIWorkflowAlgorithm.tsx`, locate the `STAGES.map((s) => ( ... ))` block that renders each node. Replace it with the version below, which adds an `anim-float` inner wrapper carrying a staggered `animationDelay` so the seven nodes float out of phase the same way the hero does:

```tsx
{STAGES.map((s, i) => {
  const delay = i * 0.2
  return (
    <div
      key={s.key}
      className="absolute"
      style={{
        width: CARD,
        height: CARD,
        left: `${(s.cx / W) * 100}%`,
        top: `${(ROW_Y / H) * 100}%`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      {/* Sub-caption above */}
      <span
        className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] font-semibold uppercase tracking-[0.16em] text-ink-muted"
        style={{ bottom: `${CARD + 6}px` }}
      >
        {s.sub}
      </span>

      {/* Animated inner wrapper — float keyed off the existing home2-float keyframes */}
      <div
        className="anim-float relative h-full w-full"
        style={{
          animationDelay: `${delay}s`,
          animationDuration: `${6 + (delay % 2)}s`,
        }}
      >
        {s.diamond ? (
          <div className="grid h-full w-full place-items-center">
            <div
              className="absolute inset-0 rounded-md bg-white ghair-2 soft-shadow-sm"
              style={{ transform: 'rotate(45deg)' }}
            />
            <div className="relative flex flex-col items-center justify-center">
              <s.Icon size={20} style={{ color: s.color }} strokeWidth={1.9} />
              <span className="mt-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink">
                {s.label}
              </span>
            </div>
          </div>
        ) : (
          <>
            <div className="grid h-full w-full place-items-center rounded-2xl bg-white ghair soft-shadow-sm">
              <s.Icon size={26} style={{ color: s.color }} strokeWidth={1.9} />
            </div>
            <span
              className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.16em] text-ink"
              style={{ top: `${CARD + 8}px` }}
            >
              {s.label}
            </span>
          </>
        )}
      </div>
    </div>
  )
})}
```

The `animationDuration` formula matches `DiagramScene.tsx`'s pattern (`6 + (delay % 2)`) so the float cadence stays in the same family as the hero.

- [ ] **Step 2: Run lint and type-check**

```bash
cd frontend && npm run lint && npm run type-check
```

Expected: both pass.

- [ ] **Step 3: Commit**

```bash
git add frontend/src/components/home/AIWorkflowAlgorithm.tsx
git commit -m "feat(home): stagger anim-float across the workflow nodes"
```

---

## Task 5: Mobile stack layout with vertical connectors and side loop-back

**Files:**
- Modify: `frontend/src/components/home/AIWorkflowAlgorithm.tsx` — replace the placeholder mobile `<ul>` with a real vertical stack: seven cards in a column, short vertical SVG connector strips between adjacent cards using `flow-line`, and a small curved arc on the left side from the diamond back up to Plan.

The mobile layout retains all content from the desktop version. A visitor on a phone sees the same seven stages, the same decision gate, and the same loop-back idea, just laid out vertically. No horizontal scroll.

- [ ] **Step 1: Replace the mobile `<ul>` block with the stack layout**

In `frontend/src/components/home/AIWorkflowAlgorithm.tsx`, find the block:

```tsx
{/* Mobile fallback (below md) — replaced with a real stack layout in Task 5 */}
<ul className="mt-12 flex flex-col gap-3 md:hidden">
  ...
</ul>
```

Replace it with:

```tsx
{/* Mobile stack (below md) */}
<div className="relative mt-12 md:hidden">
  <ol className="relative flex flex-col items-center gap-0" aria-hidden>
    {STAGES.map((s, i) => {
      const isLast = i === STAGES.length - 1
      return (
        <li key={s.key} className="flex w-full flex-col items-center">
          {/* Card / diamond */}
          <div className="flex flex-col items-center">
            <span className="mb-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-ink-muted">
              {s.sub}
            </span>
            {s.diamond ? (
              <div className="relative grid h-20 w-20 place-items-center">
                <div
                  className="absolute inset-0 rounded-md bg-white ghair-2 soft-shadow-sm"
                  style={{ transform: 'rotate(45deg)' }}
                />
                <div className="relative flex flex-col items-center justify-center">
                  <s.Icon size={18} style={{ color: s.color }} strokeWidth={1.9} />
                  <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink">
                    {s.label}
                  </span>
                </div>
              </div>
            ) : (
              <>
                <div className="grid h-20 w-20 place-items-center rounded-2xl bg-white ghair soft-shadow-sm">
                  <s.Icon size={22} style={{ color: s.color }} strokeWidth={1.9} />
                </div>
                <span className="mt-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink">
                  {s.label}
                </span>
              </>
            )}
          </div>

          {/* Vertical flow-line between this stage and the next, except after the last */}
          {!isLast && (
            <svg viewBox="0 0 8 32" className="my-1 h-8 w-2" fill="none" aria-hidden>
              <line
                x1="4"
                y1="0"
                x2="4"
                y2="32"
                stroke={i === 4 ? 'var(--green)' : 'var(--plum)'}
                strokeWidth={2}
                strokeLinecap="round"
                strokeOpacity={0.55}
                className="flow-line"
              />
            </svg>
          )}
        </li>
      )
    })}
  </ol>

  {/* Mobile loop-back: curved amber arrow on the left side from the diamond back up to Plan */}
  <svg
    viewBox="0 0 80 240"
    className="pointer-events-none absolute left-0 top-0 h-full w-12"
    preserveAspectRatio="none"
    fill="none"
    aria-hidden
  >
    <defs>
      <marker
        id="aiwf-arrow-mobile"
        viewBox="0 0 10 10"
        refX="8"
        refY="5"
        markerWidth="6"
        markerHeight="6"
        orient="auto-start-reverse"
      >
        <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--amber)" />
      </marker>
    </defs>
    {/* The arc spans roughly from the diamond (position 5 of 7) up to Plan (position 3 of 7).
        Coordinates are normalized into the 0–240 viewBox; preserveAspectRatio=none lets the
        parent's height stretch this to the real stack height. */}
    <path
      d="M 70 137 C 10 130, 10 70, 70 63"
      stroke="var(--amber)"
      strokeWidth={2}
      strokeLinecap="round"
      strokeOpacity={0.75}
      className="flow-line"
      markerEnd="url(#aiwf-arrow-mobile)"
    />
    <text
      x="20"
      y="100"
      fontSize="10"
      fontWeight="700"
      fill="var(--amber)"
      style={{ letterSpacing: '0.14em' }}
    >
      NO
    </text>
  </svg>
</div>
```

Notes:
- The mobile stack uses smaller node sizes (80px) to keep the column compact on narrow viewports.
- The loop-back arc uses `preserveAspectRatio="none"` so it stretches with the rendered stack height — the path's `d` is calibrated against the 0–240 viewBox proportional to the stack's seven items, with the arc anchored at the diamond's vertical position and ending at Plan's.
- The vertical connector between Dispatch and the diamond (index 3 → 4) stays plum; between the diamond and Review (index 4 → 5) switches to green because that's the "yes" branch.

- [ ] **Step 2: Run lint and type-check**

```bash
cd frontend && npm run lint && npm run type-check
```

Expected: both pass.

- [ ] **Step 3: Run the smoke test**

```bash
cd frontend && npx vitest run src/components/home/AIWorkflowAlgorithm.test.tsx
```

Expected: PASS — 3 tests still passing. (Both layouts render the same labels, so `getAllByText` keeps finding them.)

- [ ] **Step 4: Commit**

```bash
git add frontend/src/components/home/AIWorkflowAlgorithm.tsx
git commit -m "feat(home): mobile vertical stack with side loop-back for workflow diagram"
```

---

## Task 6: Wire the section into the home and systems pages

**Files:**
- Modify: `frontend/src/app/page.tsx`
- Modify: `frontend/src/app/systems/page.tsx`

The component is complete and self-contained. This task adds it to the two pages at the placements approved in the spec (§3.1, §3.2). On the home page it sits inside a `<Reveal>` wrapper matching its neighbors; on the systems page it sits directly under the heading without `<Reveal>`, matching how `SystemsToolchain` is currently placed there.

- [ ] **Step 1: Update the home page**

In `frontend/src/app/page.tsx`:

Add the import alongside the other home component imports:

```tsx
import { AIWorkflowAlgorithm } from '@/components/home/AIWorkflowAlgorithm'
```

Then inside the `<main>` block, insert the new section between `<Reveal><Capabilities /></Reveal>` and `<Reveal><FeaturedWork /></Reveal>`. The full updated `<main>` block should read:

```tsx
<main>
  <HomeHero />
  <TrustedRow />
  <Reveal><MetricsStrip /></Reveal>
  <Reveal><Capabilities /></Reveal>
  <Reveal><AIWorkflowAlgorithm /></Reveal>
  <Reveal><FeaturedWork /></Reveal>
  <Reveal><CredibilityStrip /></Reveal>
  <FooterCTA />
</main>
```

- [ ] **Step 2: Update the systems page**

In `frontend/src/app/systems/page.tsx`:

Add the import:

```tsx
import { AIWorkflowAlgorithm } from '@/components/home/AIWorkflowAlgorithm'
```

Insert `<AIWorkflowAlgorithm />` between the heading `<section>` and `<SystemsToolchain />`. The full updated `<main>` block should read:

```tsx
<main>
  <section className="mx-auto max-w-[1180px] px-6 pt-16 pb-10">
    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-plum">How I build</p>
    <h1 className="mt-3 max-w-2xl font-display text-4xl font-extrabold leading-tight text-ink sm:text-5xl">
      The system behind the systems.
    </h1>
    <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft">
      I work AI-native: agentic coding tools handle the heavy lifting while I set direction,
      review every change, and own the result. It&apos;s how a one-person practice ships
      production systems — fast, but grounded in tested code, clean data, and real workflows.
    </p>
  </section>
  <AIWorkflowAlgorithm />
  <SystemsToolchain />
  <FooterCTA />
</main>
```

- [ ] **Step 3: Run lint and type-check**

```bash
cd frontend && npm run lint && npm run type-check
```

Expected: both pass.

- [ ] **Step 4: Run the smoke test**

```bash
cd frontend && npx vitest run src/components/home/AIWorkflowAlgorithm.test.tsx
```

Expected: PASS — 3 tests passing.

- [ ] **Step 5: Commit**

```bash
git add frontend/src/app/page.tsx frontend/src/app/systems/page.tsx
git commit -m "feat(home,systems): render AIWorkflowAlgorithm section on both pages"
```

---

## Task 7: Full verification (lint, type-check, unit tests, dev server)

**Files:** none modified — verification only.

This task runs the full local quality gate end-to-end and confirms the section renders correctly in a browser before the work is considered done.

- [ ] **Step 1: Run lint across the whole frontend**

```bash
cd frontend && npm run lint
```

Expected: no errors.

- [ ] **Step 2: Run type-check across the whole frontend**

```bash
cd frontend && npm run type-check
```

Expected: no errors.

- [ ] **Step 3: Run the full vitest suite**

```bash
cd frontend && npm run test
```

Expected: all tests pass — including the new `AIWorkflowAlgorithm` suite (3 tests) and the pre-existing hook/surrogate tests.

- [ ] **Step 4: Start the dev server and visually confirm both pages**

```bash
cd frontend && npm run dev
```

Then visit `http://localhost:3001/` and `http://localhost:3001/systems` and confirm:
- The new section appears at the placements described in the spec (between `Capabilities` and `FeaturedWork` on home; between the heading and `SystemsToolchain` on systems).
- All seven nodes are visible at ≥md, with the diamond at position 5, the plum forward path blinking, and the amber loop-back arc visible above the row with "NO" at its apex and "YES" between the diamond and Review.
- At narrow viewports (<md) the stack switches to a vertical column with the loop-back drawn on the left side.
- The card-floating cadence is staggered and visually in the same family as the hero diagram.
- Both pages remain free of console errors and TypeScript runtime warnings.

Stop the dev server (Ctrl-C) once verified.

- [ ] **Step 5: No commit needed**

Verification only — nothing to commit. Implementation is complete; ready for review via `superpowers:requesting-code-review` if desired.

---

## Self-Review Notes (post-write)

Spec coverage check — every spec section is implemented:
- §3 Placement → Task 6.
- §4 Section copy → Task 1 (locked in scaffold and unchanged thereafter).
- §5.1 Stages (icons, colors, captions, sub-captions) → Task 2 (`STAGES` array).
- §5.2 Desktop layout (forward path, diamond) → Task 2.
- §5.3 md layout → same as desktop, scales naturally.
- §5.4 Mobile stack → Task 5.
- §5.5 Animation (anim-float + flow-line) → Task 2 (flow-line) + Task 4 (anim-float).
- §6 Accessibility (aria-hidden SVG + sr-only ordered list) → Task 1 (sr-only list); SVGs marked `aria-hidden` in Tasks 2, 3, 5. Reduced motion already handled in `globals.css`.
- §7 File plan → Tasks 1, 2, 6 cover all four files.
- §9 Acceptance criteria → covered by Tasks 1–6, verified in Task 7.

Method/property names are consistent across tasks (`STAGES`, `diamond`, `cx`, `Icon`, `color`, `label`, `sub`, `longLabel`, `W`, `H`, `ROW_Y`, `CARD`, `HALF`). No drift.

No placeholders. Every code-changing step shows the actual code or the actual diff context.
