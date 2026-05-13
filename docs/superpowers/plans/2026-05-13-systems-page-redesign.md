# Systems Page Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Shift the `/systems` page's center of gravity from AI-tool catalog to engineering practice — redesign the workflow diagram, add four practice panels (eval/orchestration/security/observability), demote the toolchain to a compact reference, and rewrite the hero copy.

**Architecture:** Three component-level changes inside `frontend/src/components/home/`: (1) rename + redesign `AIWorkflowAlgorithm.tsx` → `EngineeringLoop.tsx` with new stages (`BUILD`, `VERIFY`, `OBSERVE`), multi-gate chips inside `VERIFY`, two loop-backs, and monospace artifact labels under every stage; (2) create new `EngineeringPractice.tsx` (2×2 panel grid); (3) create new `StackReference.tsx` (compact tile grid) and delete `SystemsToolchain.tsx`. Wire all of this into `app/systems/page.tsx`. The homepage `app/page.tsx` also uses the loop component, so it picks up the redesigned diagram automatically.

**Tech Stack:** Next.js 14 (App Router) · TypeScript (strict) · React · Tailwind CSS · Vitest + React Testing Library · `lucide-react` icons · existing `home2` design tokens (`--plum`, `--ink`, `--ink-soft`, `--ink-muted`, `--amber`, `--cream`, `ghair`, `soft-shadow-sm`, `lift`).

**Spec:** [`docs/superpowers/specs/2026-05-13-systems-page-redesign-design.md`](../specs/2026-05-13-systems-page-redesign-design.md)

---

## Pre-flight notes

**Component is shared between two pages.** `AIWorkflowAlgorithm` is imported and rendered by both `app/systems/page.tsx:5` and `app/page.tsx:7`. After the rename, both consumers will pick up the redesigned diagram — this is intentional and approved.

**Honesty boundary.** The new `EngineeringPractice` panels describe a practice, not what this repo enforces. Do not introduce a CI workflow, husky hook, gitleaks config, or eval suite in this work — the page describes discipline, it does not retroactively claim gates that don't exist. Phrasing in the spec is precise on this point; preserve it verbatim.

**Test runner.** `npm run test` runs `vitest run`. Working directory for all test commands is `frontend/`.

---

## File structure

```
frontend/src/
├── app/
│   ├── page.tsx                                   MODIFY (import rename only)
│   └── systems/
│       └── page.tsx                               MODIFY (hero + section order + imports)
└── components/home/
    ├── AIWorkflowAlgorithm.tsx                    DELETE (after rename)
    ├── AIWorkflowAlgorithm.test.tsx               DELETE (after rename)
    ├── EngineeringLoop.tsx                        CREATE (was AIWorkflowAlgorithm)
    ├── EngineeringLoop.test.tsx                   CREATE (was AIWorkflowAlgorithm.test.tsx)
    ├── EngineeringPractice.tsx                    CREATE (new — 4-panel grid)
    ├── EngineeringPractice.test.tsx               CREATE
    ├── StackReference.tsx                         CREATE (new — compact stack tiles)
    ├── StackReference.test.tsx                    CREATE
    └── SystemsToolchain.tsx                       DELETE (replaced by StackReference)
```

**File responsibilities:**

- `EngineeringLoop.tsx` — Renders the 7-stage loop diagram (desktop SVG + mobile vertical stack). Owns the stage data, gate chip data, and both loop-back arcs.
- `EngineeringPractice.tsx` — Renders the four practice panels in a 2×2 grid. Owns the panel data (lede, bullets, artifact line) inline; no external data file.
- `StackReference.tsx` — Renders the three grouped rows of compact stack tiles. Owns the 18 tool entries inline (carried over from the old `SystemsToolchain.tsx`).

---

## Task 1: Rename AIWorkflowAlgorithm → EngineeringLoop (pure rename, no behavior change)

**Goal:** Mechanical rename. Component file, test file, exported function, both import sites. No visual or behavioral change. Establishes the new name before redesign.

**Files:**
- Rename: `frontend/src/components/home/AIWorkflowAlgorithm.tsx` → `frontend/src/components/home/EngineeringLoop.tsx`
- Rename: `frontend/src/components/home/AIWorkflowAlgorithm.test.tsx` → `frontend/src/components/home/EngineeringLoop.test.tsx`
- Modify: `frontend/src/app/page.tsx:7,23`
- Modify: `frontend/src/app/systems/page.tsx:5,30`

- [ ] **Step 1: Copy file to new name, delete old**

```bash
cd frontend
git mv src/components/home/AIWorkflowAlgorithm.tsx src/components/home/EngineeringLoop.tsx
git mv src/components/home/AIWorkflowAlgorithm.test.tsx src/components/home/EngineeringLoop.test.tsx
```

- [ ] **Step 2: Update the exported function name in `EngineeringLoop.tsx`**

Find this line:
```ts
export function AIWorkflowAlgorithm() {
```
Replace with:
```ts
export function EngineeringLoop() {
```

Also update the SVG marker IDs `aiwf-arrow` → `eloop-arrow` and `aiwf-arrow-mobile` → `eloop-arrow-mobile` (4 references — 2 marker `id`s, 2 `url(#…)` references). Update the `aria-labelledby` value `ai-workflow-heading` → `engineering-loop-heading` and the matching `id` on the `<h2>`.

- [ ] **Step 3: Update the test file**

Replace the contents of `EngineeringLoop.test.tsx` with:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { EngineeringLoop } from './EngineeringLoop'

describe('EngineeringLoop', () => {
  it('renders the section heading copy', () => {
    render(<EngineeringLoop />)
    expect(screen.getByText(/how i work with ai/i)).toBeInTheDocument()
    expect(screen.getByText(/an algorithm, not a vibe\./i)).toBeInTheDocument()
    expect(screen.getByText(/this is the loop i run\./i)).toBeInTheDocument()
  })

  it('renders all seven stage captions', () => {
    render(<EngineeringLoop />)
    const captions = ['FRAME', 'SPEC', 'PLAN', 'DISPATCH AGENTS', 'PASS?', 'REVIEW', 'SHIP']
    for (const caption of captions) {
      expect(screen.getAllByText(caption).length).toBeGreaterThan(0)
    }
  })

  it('exposes the loop to assistive tech as an ordered list of 7 items', () => {
    render(<EngineeringLoop />)
    const list = screen.getByRole('list', { name: /how i work with ai/i })
    expect(within(list).getAllByRole('listitem')).toHaveLength(7)
  })
})
```

(Captions and copy stay as-is for now — they change in Task 2. Only the component name and import are different.)

- [ ] **Step 4: Update the two import sites**

In `frontend/src/app/page.tsx`, change:
```tsx
import { AIWorkflowAlgorithm } from '@/components/home/AIWorkflowAlgorithm'
```
to:
```tsx
import { EngineeringLoop } from '@/components/home/EngineeringLoop'
```
And change the JSX usage `<AIWorkflowAlgorithm />` → `<EngineeringLoop />` (line 23).

In `frontend/src/app/systems/page.tsx`, change:
```tsx
import { AIWorkflowAlgorithm } from '@/components/home/AIWorkflowAlgorithm'
```
to:
```tsx
import { EngineeringLoop } from '@/components/home/EngineeringLoop'
```
And change the JSX usage `<AIWorkflowAlgorithm />` → `<EngineeringLoop />` (line 30).

- [ ] **Step 5: Run the test suite**

```bash
cd frontend
npm run test -- EngineeringLoop
```
Expected: all 3 tests pass.

- [ ] **Step 6: Run type-check and lint**

```bash
cd frontend
npm run type-check
npm run lint
```
Expected: both clean.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "refactor(home): rename AIWorkflowAlgorithm → EngineeringLoop"
```

---

## Task 2: Update stage list — add OBSERVE, fold REVIEW into VERIFY, rename DISPATCH→BUILD, PASS?→VERIFY

**Goal:** Replace the stage labels and order. Old: `FRAME · SPEC · PLAN · DISPATCH AGENTS · PASS? · REVIEW · SHIP` (7 stages, with PASS? as a decision diamond). New: `FRAME · SPEC · PLAN · BUILD · VERIFY · SHIP · OBSERVE` (7 stages, all rectangular). TDD — failing tests first.

**Files:**
- Modify: `frontend/src/components/home/EngineeringLoop.test.tsx`
- Modify: `frontend/src/components/home/EngineeringLoop.tsx`

- [ ] **Step 1: Write the failing test (new stage list)**

Replace the second test block in `EngineeringLoop.test.tsx`:

```tsx
  it('renders all seven stage captions', () => {
    render(<EngineeringLoop />)
    const captions = ['FRAME', 'SPEC', 'PLAN', 'BUILD', 'VERIFY', 'SHIP', 'OBSERVE']
    for (const caption of captions) {
      expect(screen.getAllByText(caption).length).toBeGreaterThan(0)
    }
  })
```

- [ ] **Step 2: Run test, watch it fail**

```bash
cd frontend
npm run test -- EngineeringLoop
```
Expected: the seven-stage test fails because `BUILD`, `VERIFY`, `OBSERVE` are not in the DOM.

- [ ] **Step 3: Update the STAGES array in `EngineeringLoop.tsx`**

Find the `STAGES` constant (lines ~36–44 in the current file) and replace its contents with:

```ts
const STAGES: Stage[] = [
  { key: 'frame',   label: 'FRAME',   sub: 'WITH THE OPERATOR',     longLabel: 'Frame the problem with the operator, not the dataset.',                                                Icon: Target,      color: 'var(--plum)',  cx: X(0) },
  { key: 'spec',    label: 'SPEC',    sub: 'DESIGN BEFORE CODE',    longLabel: 'Write the spec before any code.',                                                                      Icon: FileText,    color: 'var(--ink)',   cx: X(1) },
  { key: 'plan',    label: 'PLAN',    sub: 'REVIEWABLE UNITS',      longLabel: 'Decompose the spec into a reviewable plan.',                                                           Icon: ListChecks,  color: 'var(--plum)',  cx: X(2) },
  { key: 'build',   label: 'BUILD',   sub: 'TESTS WITH THE CODE',   longLabel: 'Build with agents — code and tests produced together, every step reviewable.',                          Icon: Bot,         color: 'var(--ink)',   cx: X(3) },
  { key: 'verify',  label: 'VERIFY',  sub: 'MULTI-GATE',            longLabel: 'Verify against a stack of gates — types, lint, tests, eval/regression, secrets check, human review.',  Icon: ShieldCheck, color: 'var(--plum)',  cx: X(4) },
  { key: 'ship',    label: 'SHIP',    sub: 'RELEASE-TAGGED',        longLabel: 'Ship with a release tag and a written rollback path.',                                                  Icon: Rocket,      color: 'var(--ink)',   cx: X(5) },
  { key: 'observe', label: 'OBSERVE', sub: 'LOGS & FEEDBACK',       longLabel: 'Observe in production — logs, traces, and incident feedback drive the next loop.',                     Icon: Activity,    color: 'var(--plum)',  cx: X(6) },
]
```

The `diamond` flag is gone (no decision diamond — VERIFY is a regular rectangular node). `REVIEW` is folded into VERIFY's gate chips (Task 4). `Activity` icon is new — add it to the `lucide-react` import:

```ts
import {
  Target,
  FileText,
  ListChecks,
  Bot,
  ShieldCheck,
  Rocket,
  Activity,
  type LucideIcon,
} from 'lucide-react'
```

Remove the now-unused `GitFork` import.

- [ ] **Step 4: Remove diamond-rendering branches**

The `Stage` type still has `diamond?: boolean` — remove that field from the type definition. Then remove every `s.diamond` / `!s.diamond` conditional branch in the desktop and mobile render paths:

Desktop (around lines 207–232 in the current file): the `s.diamond ? (...) : (...)` ternary collapses to just the rectangular card branch. The sub-caption above the card is now rendered for every stage (no conditional).

Mobile (around lines 255–278): same simplification.

Decision-branch labels block (around lines 111–171): the entire "Yes/No" annotation and the amber arc anchored to the diamond's top vertex are temporarily kept but will be reworked in Task 5. For now, change the arc anchor: `arcStartY = ROW_Y - HALF` is correct for the top edge of a rectangular VERIFY node too, so the geometry survives the diamond removal unchanged.

- [ ] **Step 5: Run tests, watch them pass**

```bash
cd frontend
npm run test -- EngineeringLoop
```
Expected: all 3 tests pass.

- [ ] **Step 6: Run type-check + lint**

```bash
cd frontend
npm run type-check
npm run lint
```
Expected: clean.

- [ ] **Step 7: Commit**

```bash
git add frontend/src/components/home/EngineeringLoop.tsx frontend/src/components/home/EngineeringLoop.test.tsx
git commit -m "feat(home): refactor loop stages — BUILD/VERIFY/OBSERVE replace DISPATCH/PASS?/REVIEW"
```

---

## Task 3: Add monospace artifact labels under each stage

**Goal:** Each of the 7 stages renders an artifact label below the stage caption — `brief · spec.md · plan.md · diff+tests · gate report · release notes · logs/traces`. Tested via assertions on the label text.

**Files:**
- Modify: `frontend/src/components/home/EngineeringLoop.test.tsx`
- Modify: `frontend/src/components/home/EngineeringLoop.tsx`

- [ ] **Step 1: Write failing tests for the artifact labels**

Append this test to `EngineeringLoop.test.tsx`:

```tsx
  it('renders monospace artifact labels under each stage', () => {
    render(<EngineeringLoop />)
    const artifacts = ['brief', 'spec.md', 'plan.md', 'diff+tests', 'gate report', 'release notes', 'logs/traces']
    for (const artifact of artifacts) {
      expect(screen.getAllByText(artifact).length).toBeGreaterThan(0)
    }
  })
```

- [ ] **Step 2: Run test, watch it fail**

```bash
cd frontend
npm run test -- EngineeringLoop
```
Expected: the new test fails.

- [ ] **Step 3: Add `artifact` to the Stage type and STAGES entries**

In `EngineeringLoop.tsx`, add `artifact: string` to the `Stage` type:

```ts
type Stage = {
  key: string
  label: string
  sub: string
  longLabel: string
  artifact: string
  Icon: LucideIcon
  color: string
  cx: number
}
```

Add the artifact strings to each entry:

```ts
{ key: 'frame',   label: 'FRAME',   sub: 'WITH THE OPERATOR',   longLabel: '...', artifact: 'brief',         Icon: Target,      color: 'var(--plum)',  cx: X(0) },
{ key: 'spec',    label: 'SPEC',    sub: 'DESIGN BEFORE CODE',  longLabel: '...', artifact: 'spec.md',       Icon: FileText,    color: 'var(--ink)',   cx: X(1) },
{ key: 'plan',    label: 'PLAN',    sub: 'REVIEWABLE UNITS',    longLabel: '...', artifact: 'plan.md',       Icon: ListChecks,  color: 'var(--plum)',  cx: X(2) },
{ key: 'build',   label: 'BUILD',   sub: 'TESTS WITH THE CODE', longLabel: '...', artifact: 'diff+tests',    Icon: Bot,         color: 'var(--ink)',   cx: X(3) },
{ key: 'verify',  label: 'VERIFY',  sub: 'MULTI-GATE',          longLabel: '...', artifact: 'gate report',   Icon: ShieldCheck, color: 'var(--plum)',  cx: X(4) },
{ key: 'ship',    label: 'SHIP',    sub: 'RELEASE-TAGGED',      longLabel: '...', artifact: 'release notes', Icon: Rocket,      color: 'var(--ink)',   cx: X(5) },
{ key: 'observe', label: 'OBSERVE', sub: 'LOGS & FEEDBACK',     longLabel: '...', artifact: 'logs/traces',   Icon: Activity,    color: 'var(--plum)',  cx: X(6) },
```

(Use the full longLabel values from Task 2.)

- [ ] **Step 4: Render the artifact label below each stage (desktop)**

In the desktop render block, immediately after the `<span>` that renders `s.label` below the card (around line 226–230 of the current file), add a second `<span>` for the artifact:

```tsx
<span
  className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] text-ink-muted"
  style={{ top: `${CARD + 28}px` }}
>
  {s.artifact}
</span>
```

(The label sits at `top: CARD + 8`; the artifact sits at `top: CARD + 28` — about 20px lower, which leaves ~12px below the uppercase caption.)

- [ ] **Step 5: Render the artifact label below each stage (mobile)**

In the mobile `<ol>` block, immediately after the `<span>` that renders the stage label (around line 273), add:

```tsx
<span className="mt-0.5 font-mono text-[10px] text-ink-muted">{s.artifact}</span>
```

- [ ] **Step 6: Run the test suite**

```bash
cd frontend
npm run test -- EngineeringLoop
```
Expected: all tests pass, including the new artifact-label test.

- [ ] **Step 7: Commit**

```bash
git add frontend/src/components/home/EngineeringLoop.tsx frontend/src/components/home/EngineeringLoop.test.tsx
git commit -m "feat(home): add artifact labels under each loop stage"
```

---

## Task 4: Add gate chips inside the VERIFY node

**Goal:** The VERIFY card visibly contains 6 small gate chips — `tsc`, `eslint`, `vitest`, `eval / regression`, `secrets check`, `human review`. Replaces the implicit single-gate behavior of the old `PASS?` diamond.

**Files:**
- Modify: `frontend/src/components/home/EngineeringLoop.test.tsx`
- Modify: `frontend/src/components/home/EngineeringLoop.tsx`

- [ ] **Step 1: Write failing tests for the 6 gate chips**

Append to `EngineeringLoop.test.tsx`:

```tsx
  it('renders the six VERIFY gate chips with exact labels', () => {
    render(<EngineeringLoop />)
    const chips = ['tsc', 'eslint', 'vitest', 'eval / regression', 'secrets check', 'human review']
    for (const chip of chips) {
      expect(screen.getAllByText(chip).length).toBeGreaterThan(0)
    }
  })
```

- [ ] **Step 2: Run test, watch it fail**

```bash
cd frontend
npm run test -- EngineeringLoop
```
Expected: the new test fails.

- [ ] **Step 3: Add a VERIFY_GATES constant and render chips inside VERIFY**

Near the top of `EngineeringLoop.tsx` (just below the STAGES array), add:

```ts
const VERIFY_GATES = [
  'tsc',
  'eslint',
  'vitest',
  'eval / regression',
  'secrets check',
  'human review',
] as const
```

The VERIFY node needs to render the chip list **outside** the 96×96 card footprint (the card is too small to hold 6 lines of text). Render the chip list as a sibling card positioned just below the VERIFY node, anchored to the same x-center.

In the desktop render block, **inside the `STAGES.map` loop** that already exists (around line 175), add a conditional after the existing per-stage `<div>` content:

```tsx
{s.key === 'verify' && (
  <div
    className="absolute left-1/2 -translate-x-1/2 w-[170px] rounded-xl bg-white ghair soft-shadow-sm p-2.5"
    style={{ top: `${CARD + 52}px` }}
  >
    <ul className="space-y-1">
      {VERIFY_GATES.map((g) => (
        <li
          key={g}
          className="flex items-center gap-2 font-mono text-[10.5px] leading-tight text-ink-soft"
        >
          <span aria-hidden className="inline-block h-1 w-1 rounded-full bg-plum" />
          {g}
        </li>
      ))}
    </ul>
  </div>
)}
```

(The chip cluster offset of `CARD + 52` sits below the artifact label, with ~24px of breathing room. Width `170px` is narrower than the ~154px stage spacing on one side, so the cluster sits cleanly under the VERIFY card without crowding the neighboring stages' artifact labels.)

- [ ] **Step 4: Add the same chip list to the mobile render**

In the mobile `<ol>`'s per-stage `<li>` block, after the artifact label `<span>`, add:

```tsx
{s.key === 'verify' && (
  <ul className="mt-2 space-y-1 rounded-xl bg-white ghair soft-shadow-sm p-2.5">
    {VERIFY_GATES.map((g) => (
      <li
        key={g}
        className="flex items-center gap-2 font-mono text-[10.5px] leading-tight text-ink-soft"
      >
        <span aria-hidden className="inline-block h-1 w-1 rounded-full bg-plum" />
        {g}
      </li>
    ))}
  </ul>
)}
```

- [ ] **Step 5: Update the screen-reader linearization**

The existing `<ol className="sr-only">` (around line 348) renders one `<li>` per stage. For the VERIFY stage, the chips should also be announced. Update the SR list rendering:

```tsx
<ol className="sr-only" aria-label="How I work with AI">
  {STAGES.map((s) => (
    <li key={s.key}>
      <strong>{s.label}</strong> — {s.sub}. {s.longLabel}
      {s.key === 'verify' && (
        <ul>
          {VERIFY_GATES.map((g) => (
            <li key={g}>{g}</li>
          ))}
        </ul>
      )}
    </li>
  ))}
</ol>
```

Note: the SR list now contains 7 top-level `<li>`s plus 6 nested `<li>`s. Update the third test in the file to use a more targeted assertion — query only the direct children:

```tsx
  it('exposes the loop to assistive tech as an ordered list of 7 items', () => {
    render(<EngineeringLoop />)
    const list = screen.getByRole('list', { name: /how i work with ai/i })
    const directItems = within(list).getAllByRole('listitem').filter(
      (li) => li.parentElement === list,
    )
    expect(directItems).toHaveLength(7)
  })
```

- [ ] **Step 6: Run all tests**

```bash
cd frontend
npm run test -- EngineeringLoop
```
Expected: all 4 tests pass.

- [ ] **Step 7: Commit**

```bash
git add frontend/src/components/home/EngineeringLoop.tsx frontend/src/components/home/EngineeringLoop.test.tsx
git commit -m "feat(home): add multi-gate chips inside VERIFY node"
```

---

## Task 5: Wire both loop-backs — short (VERIFY → PLAN) and long (OBSERVE → FRAME)

**Goal:** The existing amber loop-back arc currently runs from the PASS? diamond's top vertex back to PLAN's top edge. After Task 2 this geometry runs from VERIFY → PLAN — which is correct for the short loop. Add a second, thinner arc from OBSERVE → FRAME along the bottom of the diagram for the long loop. Remove the "YES"/"NO" annotation labels (no decision diamond → no yes/no branching).

**Files:**
- Modify: `frontend/src/components/home/EngineeringLoop.test.tsx`
- Modify: `frontend/src/components/home/EngineeringLoop.tsx`

- [ ] **Step 1: Write a failing test for the SR description of both loops**

Append to `EngineeringLoop.test.tsx`:

```tsx
  it('describes both loop-backs for assistive tech', () => {
    render(<EngineeringLoop />)
    expect(
      screen.getByText(/if a verification gate fails, return to plan/i),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/if production observation reveals a spec issue, return to frame/i),
    ).toBeInTheDocument()
  })
```

- [ ] **Step 2: Run test, watch it fail**

```bash
cd frontend
npm run test -- EngineeringLoop
```
Expected: fail.

- [ ] **Step 3: Update the SR closing sentence**

Replace the current closing `<p className="sr-only">` line with two:

```tsx
<p className="sr-only">If a verification gate fails, return to Plan and repeat.</p>
<p className="sr-only">If production observation reveals a spec issue, return to Frame and re-spec.</p>
```

- [ ] **Step 4: Remove the YES/NO labels and the diamond-anchored arc**

Inside the existing decision-branch labels block (the IIFE around the old `gate.cx`/`plan.cx` computation), remove the two `<text>` elements that render `NO` and `YES`. The amber arc itself stays — it now visually runs from VERIFY → PLAN, which is what the short loop should look like. Rename the local variables for clarity: `gate` → `verify`, and keep `plan`. The `arcStartX = verify.cx`, `arcStartY = ROW_Y - HALF` (top edge of the VERIFY card) remains correct.

The block becomes:

```tsx
{(() => {
  const verify = STAGES[4]  // VERIFY
  const plan = STAGES[2]    // PLAN
  const arcStartX = verify.cx
  const arcStartY = ROW_Y - HALF
  const arcEndX = plan.cx
  const arcEndY = ROW_Y - HALF
  const c1x = verify.cx - 40
  const c1y = 60
  const c2x = plan.cx + 40
  const c2y = 60

  return (
    <g>
      <path
        d={`M ${arcStartX} ${arcStartY} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${arcEndX} ${arcEndY}`}
        stroke="var(--amber)"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeOpacity={0.7}
        className="flow-line"
        markerEnd="url(#eloop-arrow)"
      />
      <circle cx={arcStartX} cy={arcStartY} r={3} fill="var(--amber)" opacity={0.85} />
    </g>
  )
})()}
```

- [ ] **Step 5: Add the long loop arc from OBSERVE → FRAME along the bottom**

Add this `<g>` immediately after the short-loop `<g>` inside the SVG:

```tsx
{(() => {
  const observe = STAGES[6]  // OBSERVE
  const frame = STAGES[0]    // FRAME
  const arcStartX = observe.cx
  const arcStartY = ROW_Y + HALF  // bottom edge of OBSERVE card
  const arcEndX = frame.cx
  const arcEndY = ROW_Y + HALF
  const c1x = observe.cx + 40
  const c1y = H - 30
  const c2x = frame.cx - 40
  const c2y = H - 30
  const apexX = (observe.cx + frame.cx) / 2
  const apexY = H - 38

  return (
    <g>
      <path
        d={`M ${arcStartX} ${arcStartY} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${arcEndX} ${arcEndY}`}
        stroke="var(--amber)"
        strokeWidth={1.25}
        strokeLinecap="round"
        strokeOpacity={0.45}
        className="flow-line"
        markerEnd="url(#eloop-arrow)"
      />
      <text
        x={apexX}
        y={apexY}
        textAnchor="middle"
        className="font-mono"
        fontSize="10"
        fill="var(--amber)"
        opacity={0.85}
      >
        prod feedback
      </text>
    </g>
  )
})()}
```

- [ ] **Step 6: Update the mobile loop-back to describe both loops**

The mobile layout currently has one amber arc on the left. Update its `<text>` element to say `loop` instead of `NO`. Add a `prod feedback` annotation lower on the same arc. (Mobile is space-constrained; the short loop is the only visual arc, with the long loop covered by the second SR sentence.)

In the mobile SVG, replace the `<text>` that says `NO` with:

```tsx
<text
  x="20"
  y="100"
  className="font-mono"
  fontSize="10"
  fontWeight="600"
  fill="var(--amber)"
  opacity={0.85}
>
  loop
</text>
```

- [ ] **Step 7: Run the test suite**

```bash
cd frontend
npm run test -- EngineeringLoop
```
Expected: all 5 tests pass.

- [ ] **Step 8: Visual smoke check**

```bash
cd frontend
npm run dev
```
Open `http://localhost:3001/systems` — confirm:
- Short loop arc runs from VERIFY's top edge to PLAN's top edge with an amber arrowhead
- Long loop arc runs along the bottom from OBSERVE → FRAME with `prod feedback` mid-line
- No "YES"/"NO" text appears
- The VERIFY chip cluster sits below the VERIFY node

Stop the dev server (Ctrl+C).

- [ ] **Step 9: Commit**

```bash
git add frontend/src/components/home/EngineeringLoop.tsx frontend/src/components/home/EngineeringLoop.test.tsx
git commit -m "feat(home): wire both loop-backs (verify→plan, observe→frame)"
```

---

## Task 6: Visual polish — palette, connector annotations, canvas background

**Goal:** Prune the diagram's palette to 3 colors (ink, plum, amber), add mid-line connector annotations (`pr` between BUILD/VERIFY, `tag` between SHIP/OBSERVE), and place a subtle warm-paper canvas behind the diagram.

**Files:**
- Modify: `frontend/src/components/home/EngineeringLoop.tsx`

This task is purely visual — no new tests. Existing tests must still pass.

- [ ] **Step 1: Replace per-stage `color` field values with the pruned palette**

The 7 STAGES entries currently alternate `var(--plum)`, `var(--ink)`, etc. Confirm the palette is exactly:

```
plum · ink · plum · ink · plum · ink · plum
```

(This was set in Task 2 — verify only. No code change here.)

- [ ] **Step 2: Update arrow marker color**

Find the `<marker id="eloop-arrow">` SVG definition. Change the path fill from `var(--amber)` to `var(--amber)` — confirm this is correct (the amber marker is the loop-back color). The forward-path connectors don't use a marker; they remain plain plum lines. Confirm no orange/pink/green colors remain anywhere in the SVG body.

If the forward path connectors currently use `circle` endcaps with high opacity (the current code has `r={3.2}` filled circles), reduce them: change to `r={2}` and `opacity={0.5}`.

- [ ] **Step 3: Add mid-line connector annotations**

Inside the SVG, after the existing forward-path `STAGES.slice(0, -1).map(...)` block, add a second loop that annotates two specific transitions:

```tsx
{(() => {
  const annotations: Array<{ from: number; label: string }> = [
    { from: 3, label: 'pr' },   // BUILD → VERIFY
    { from: 5, label: 'tag' },  // SHIP → OBSERVE
  ]
  return annotations.map(({ from, label }) => {
    const a = STAGES[from]
    const b = STAGES[from + 1]
    const midX = (a.cx + HALF + b.cx - HALF) / 2
    const y = ROW_Y - 8
    return (
      <text
        key={label}
        x={midX}
        y={y}
        textAnchor="middle"
        className="font-mono"
        fontSize="10"
        fill="var(--ink-muted)"
        opacity={0.85}
      >
        {label}
      </text>
    )
  })
})()}
```

- [ ] **Step 4: Add the subtle canvas background**

In the desktop diagram block, wrap the existing `<div className="absolute inset-0">` (which contains the SVG and the node cards) with a faintly tinted backdrop:

```tsx
<div className="relative w-full" style={{ paddingBottom: `${(H / W) * 100}%` }}>
  <div className="absolute inset-0 rounded-3xl bg-[var(--cream)]/40 ghair" />
  <div className="absolute inset-0">
    {/* SVG and node cards (existing content) */}
  </div>
</div>
```

The first inner div is the canvas; the second is the existing render layer.

- [ ] **Step 5: Run tests**

```bash
cd frontend
npm run test -- EngineeringLoop
```
Expected: all 5 tests still pass (none of these changes affect test assertions).

- [ ] **Step 6: Visual check + lint + type-check**

```bash
cd frontend
npm run dev
```
Open `/systems` and `/` (homepage). Confirm:
- Diagram sits on a faint warm panel with a 1px hairline border
- `pr` label sits between BUILD and VERIFY; `tag` sits between SHIP and OBSERVE
- Forward connectors are thinner and more subdued
- No bright pink/green/blue/orange anywhere in the SVG body

```bash
npm run type-check
npm run lint
```
Expected: clean.

- [ ] **Step 7: Commit**

```bash
git add frontend/src/components/home/EngineeringLoop.tsx
git commit -m "feat(home): visual polish — pruned palette, connector labels, canvas bg"
```

---

## Task 7: Update the section heading copy

**Goal:** The diagram's section heading currently reads `HOW I WORK WITH AI` / `An algorithm, not a vibe. This is the loop I run.` Update to match the new component identity.

**Files:**
- Modify: `frontend/src/components/home/EngineeringLoop.tsx`
- Modify: `frontend/src/components/home/EngineeringLoop.test.tsx`

- [ ] **Step 1: Update the test assertions**

In `EngineeringLoop.test.tsx`, replace the first test:

```tsx
  it('renders the section heading copy', () => {
    render(<EngineeringLoop />)
    expect(screen.getByText(/the engineering loop/i)).toBeInTheDocument()
    expect(screen.getByText(/spec\. plan\. build\. verify\. ship\. observe\./i)).toBeInTheDocument()
    expect(screen.getByText(/seven stages, one feedback loop/i)).toBeInTheDocument()
  })
```

Also update the SR list label assertion:

```tsx
  it('exposes the loop to assistive tech as an ordered list of 7 items', () => {
    render(<EngineeringLoop />)
    const list = screen.getByRole('list', { name: /the engineering loop/i })
    const directItems = within(list).getAllByRole('listitem').filter(
      (li) => li.parentElement === list,
    )
    expect(directItems).toHaveLength(7)
  })
```

- [ ] **Step 2: Run test, watch it fail**

```bash
cd frontend
npm run test -- EngineeringLoop
```
Expected: heading and SR-list tests fail.

- [ ] **Step 3: Update the heading copy in the component**

Find the `<header>` block in `EngineeringLoop.tsx` (around lines 53–65). Replace its contents with:

```tsx
<header className="max-w-2xl">
  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-plum">THE ENGINEERING LOOP</p>
  <h2 id="engineering-loop-heading" className="mt-3 font-display text-4xl font-extrabold leading-tight text-ink sm:text-5xl">
    Spec. Plan. Build. Verify. Ship. Observe.
    <br />
    <span className="grad-plum-text">Seven stages, one feedback loop.</span>
  </h2>
  <p className="mt-4 max-w-[50ch] text-base leading-relaxed text-ink-soft">
    Every stage produces a named artifact. Every transition is reviewable. Verification is a stack of
    gates — types, lint, tests, eval/regression, secrets, human review — not a single pass/fail call.
  </p>
</header>
```

Also update the SR list `aria-label`:

```tsx
<ol className="sr-only" aria-label="The engineering loop">
```

- [ ] **Step 4: Run the test suite**

```bash
cd frontend
npm run test -- EngineeringLoop
```
Expected: all 5 tests pass.

- [ ] **Step 5: Commit**

```bash
git add frontend/src/components/home/EngineeringLoop.tsx frontend/src/components/home/EngineeringLoop.test.tsx
git commit -m "feat(home): rewrite loop section heading and lede"
```

---

## Task 8: Create the EngineeringPractice component (4-panel grid)

**Goal:** New component that renders the four practice panels — Evaluation, Orchestration, Security, Observability — as a 2×2 grid below the loop diagram. TDD.

**Files:**
- Create: `frontend/src/components/home/EngineeringPractice.tsx`
- Create: `frontend/src/components/home/EngineeringPractice.test.tsx`

- [ ] **Step 1: Write the failing test file**

Create `frontend/src/components/home/EngineeringPractice.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { EngineeringPractice } from './EngineeringPractice'

describe('EngineeringPractice', () => {
  it('renders the section heading', () => {
    render(<EngineeringPractice />)
    expect(screen.getByText(/^practice$/i)).toBeInTheDocument()
    expect(screen.getByText(/what the loop runs inside\./i)).toBeInTheDocument()
  })

  it('renders all four panel headings in order', () => {
    render(<EngineeringPractice />)
    expect(screen.getByRole('heading', { name: /evaluation & quality gates/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /orchestration patterns/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /security & supply chain/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /observability & production readiness/i })).toBeInTheDocument()
  })

  it('renders the artifact line for each panel', () => {
    render(<EngineeringPractice />)
    expect(screen.getByText(/artifact → gate report/i)).toBeInTheDocument()
    expect(screen.getByText(/artifact → plan\.md/i)).toBeInTheDocument()
    expect(screen.getByText(/artifact → threat model/i)).toBeInTheDocument()
    expect(screen.getByText(/artifact → runbook \+ release notes/i)).toBeInTheDocument()
  })

  it('renders five practice bullets per panel', () => {
    const { container } = render(<EngineeringPractice />)
    const panelArticles = container.querySelectorAll('article[data-panel]')
    expect(panelArticles.length).toBe(4)
    for (const panel of Array.from(panelArticles)) {
      const bullets = panel.querySelectorAll('ul > li')
      expect(bullets.length).toBe(5)
    }
  })
})
```

- [ ] **Step 2: Run test, watch it fail (file does not exist)**

```bash
cd frontend
npm run test -- EngineeringPractice
```
Expected: fail with module-not-found.

- [ ] **Step 3: Create the component**

Create `frontend/src/components/home/EngineeringPractice.tsx`:

```tsx
// frontend/src/components/home/EngineeringPractice.tsx

type Panel = {
  key: string
  heading: string
  lede: string
  bullets: string[]
  artifact: string
}

const PANELS: Panel[] = [
  {
    key: 'eval',
    heading: 'Evaluation & quality gates',
    lede: 'AI-generated code looks correct more often than it is correct. The gate set catches the gap between renders and behaves.',
    bullets: [
      'Type-check on every change (tsc --noEmit) — strict mode, no escape hatches',
      'Lint with project-scoped rules (next lint)',
      'Component + unit tests with vitest + React Testing Library; written before the implementation when the behaviour is non-obvious',
      'For prompt-driven features: a fixed input set diffed against a known-good baseline — regression, not a happy-path call',
      'The golden path of any UI change is exercised in a browser before "done" is claimed',
    ],
    artifact: 'gate report',
  },
  {
    key: 'orchestration',
    heading: 'Orchestration patterns',
    lede: 'A single agent in a loop is not a system. Real AI engineering is knowing when to fan out, when to serialize, and where to put the human.',
    bullets: [
      'Sequential when steps share state — spec → plan → build → verify, each output feeding the next',
      'Parallel when work is independent — Claude Code subagents and cloud Codex on isolated tasks, reconciled at the diff',
      'Bounded autonomy — every agent gets a scoped task with explicit done-conditions; never "go fix the codebase"',
      'Human checkpoint at every commit and every merge; no auto-merged AI code',
      'Reset on thrash — when an agent loops on the same failure, drop the context and restart with a sharper prompt instead of letting it grind',
    ],
    artifact: 'plan.md',
  },
  {
    key: 'security',
    heading: 'Security & supply chain',
    lede: 'AI-written code inherits AI-typical risks: over-broad permissions, leaked credentials, hallucinated dependencies, and untrusted input reaching shells and databases.',
    bullets: [
      'Secrets live in .env.local and platform secret stores; never in committed files; secrets check before push',
      "Dependency choices verified against the registry, not the model's memory; pinned versions; minimal surface",
      'User input is untrusted at every boundary — typed schemas in and out (TypeScript on the wire; Zod on real APIs)',
      'Agents never hold production credentials; deploys are a separate, human-triggered path',
      "Static export on public sites — no server attack surface where one isn't needed",
    ],
    artifact: 'threat model',
  },
  {
    key: 'observability',
    heading: 'Observability & production readiness',
    lede: '"It works on my machine" is not done. Production readiness is the ability to see what\'s happening and undo a bad change in minutes.',
    bullets: [
      'Structured logs with request-scoped trace IDs for any service that handles real traffic',
      'Release tagging on every deploy so an error can be tied to a specific change',
      'Rollback path written before launch — the release note says exactly how to revert',
      'Error monitoring (Sentry-class) and a single dashboard for the metric that actually matters — not a wall of charts',
      'On-call playbooks cover the failure modes that are actually likely, not exhaustive runbooks no one reads',
    ],
    artifact: 'runbook + release notes',
  },
]

function PanelCard({ panel }: { panel: Panel }) {
  return (
    <article data-panel={panel.key} className="rounded-[1.6rem] bg-white/70 p-7 ghair sm:p-9">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-plum">PRACTICE</p>
      <h3 className="mt-3 font-display text-2xl font-extrabold leading-tight text-ink">
        {panel.heading}
      </h3>
      <p className="mt-3 text-[14px] leading-relaxed text-ink-soft">{panel.lede}</p>
      <ul className="mt-4 space-y-2">
        {panel.bullets.map((b, i) => (
          <li
            key={i}
            className="relative pl-4 text-[13.5px] leading-relaxed text-ink-soft before:absolute before:left-0 before:top-[0.55rem] before:h-1 before:w-1 before:rounded-full before:bg-plum"
          >
            {b}
          </li>
        ))}
      </ul>
      <p className="mt-5 font-mono text-[11px] text-ink-muted">artifact → {panel.artifact}</p>
    </article>
  )
}

export function EngineeringPractice() {
  return (
    <section className="mx-auto max-w-[1180px] px-6 py-16" aria-labelledby="engineering-practice-heading">
      <header className="max-w-2xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-plum">PRACTICE</p>
        <h2 id="engineering-practice-heading" className="mt-3 font-display text-4xl font-extrabold leading-tight text-ink sm:text-5xl">
          What the loop runs inside.
        </h2>
        <p className="mt-4 max-w-[55ch] text-base leading-relaxed text-ink-soft">
          Four areas where AI engineering either holds up or quietly breaks. The loop above is the cycle;
          these are the things the cycle has to be good at.
        </p>
      </header>

      <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-2">
        {PANELS.map((p) => (
          <PanelCard key={p.key} panel={p} />
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Run tests**

```bash
cd frontend
npm run test -- EngineeringPractice
```
Expected: all 4 tests pass.

- [ ] **Step 5: Type-check + lint**

```bash
cd frontend
npm run type-check
npm run lint
```
Expected: clean.

- [ ] **Step 6: Commit**

```bash
git add frontend/src/components/home/EngineeringPractice.tsx frontend/src/components/home/EngineeringPractice.test.tsx
git commit -m "feat(home): add EngineeringPractice four-panel section"
```

---

## Task 9: Create the StackReference component (compact stack tiles)

**Goal:** New component that renders three grouped rows of compact tool tiles — Agents & editors, Frontend, Backend. 18 tools total. No modals. TDD.

**Files:**
- Create: `frontend/src/components/home/StackReference.tsx`
- Create: `frontend/src/components/home/StackReference.test.tsx`

- [ ] **Step 1: Write the failing test file**

Create `frontend/src/components/home/StackReference.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { StackReference } from './StackReference'

describe('StackReference', () => {
  it('renders the section heading', () => {
    render(<StackReference />)
    expect(screen.getByText(/^the stack$/i)).toBeInTheDocument()
    expect(screen.getByText(/what i build with\./i)).toBeInTheDocument()
  })

  it('renders all three group headings', () => {
    render(<StackReference />)
    expect(screen.getByText(/agents & editors/i)).toBeInTheDocument()
    expect(screen.getByText(/^frontend$/i)).toBeInTheDocument()
    expect(screen.getByText(/^backend$/i)).toBeInTheDocument()
  })

  it('renders 18 tool tiles total, each linked to its url', () => {
    render(<StackReference />)
    const tiles = screen.getAllByRole('link', { name: /visit/i })
    expect(tiles.length).toBe(18)
    for (const tile of tiles) {
      expect(tile).toHaveAttribute('target', '_blank')
      expect(tile).toHaveAttribute('rel', expect.stringContaining('noopener'))
    }
  })

  it('renders a known tile (Next.js) with its role line', () => {
    render(<StackReference />)
    expect(screen.getByText('Next.js')).toBeInTheDocument()
    expect(screen.getByText(/react framework/i)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test, watch it fail**

```bash
cd frontend
npm run test -- StackReference
```
Expected: fail with module-not-found.

- [ ] **Step 3: Create the component**

Create `frontend/src/components/home/StackReference.tsx`:

```tsx
// frontend/src/components/home/StackReference.tsx
import { type LucideIcon, Atom, Wind, Hexagon, Route, Database, Layers } from 'lucide-react'

type Monogram = { text: string; bg: string; fg: string }

type StackTool = {
  name: string
  role: string
  url: string
  logo?: string
  Icon?: LucideIcon
  monogram?: Monogram
}

type Group = {
  key: string
  heading: string
  tools: StackTool[]
}

const GROUPS: Group[] = [
  {
    key: 'agents',
    heading: 'Agents & editors',
    tools: [
      { name: 'Claude Code',    role: 'Agentic CLI coding agent',    url: 'https://claude.com/claude-code',    logo: '/logos/claude.svg' },
      { name: 'Codex',          role: 'Cloud SWE agent',             url: 'https://openai.com/codex',          logo: '/logos/openai.svg' },
      { name: 'Cursor',         role: 'AI-first code editor',        url: 'https://cursor.com',                logo: '/logos/cursor.svg' },
      { name: 'Antigravity',    role: 'Agent-first IDE',             url: 'https://antigravity.google',        logo: '/logos/antigravity.svg' },
      { name: 'GitHub Copilot', role: 'Inline AI pair programmer',   url: 'https://github.com/features/copilot', logo: '/logos/github-copilot.svg' },
      { name: 'Gemini',         role: 'Multimodal model family',     url: 'https://gemini.google.com',         logo: '/logos/gemini.svg' },
    ],
  },
  {
    key: 'frontend',
    heading: 'Frontend',
    tools: [
      { name: 'Next.js',     role: 'React framework',         url: 'https://nextjs.org',           monogram: { text: 'N',  bg: '#0a0a0a', fg: '#fdf8f3' } },
      { name: 'React',       role: 'UI library',              url: 'https://react.dev',            Icon: Atom },
      { name: 'TypeScript',  role: 'Typed JavaScript',        url: 'https://www.typescriptlang.org', monogram: { text: 'Ts', bg: '#3178c6', fg: '#ffffff' } },
      { name: 'Tailwind',    role: 'Utility-first CSS',       url: 'https://tailwindcss.com',      Icon: Wind },
      { name: 'shadcn/ui',   role: 'Owned UI components',     url: 'https://ui.shadcn.com',        monogram: { text: 'sh', bg: '#1c162e', fg: '#fdf8f3' } },
      { name: 'Astro',       role: 'Content-first framework', url: 'https://astro.build',          monogram: { text: 'A',  bg: '#1c162e', fg: '#ff5d01' } },
    ],
  },
  {
    key: 'backend',
    heading: 'Backend',
    tools: [
      { name: 'Node.js',     role: 'JavaScript runtime',      url: 'https://nodejs.org',           Icon: Hexagon },
      { name: 'Express',     role: 'Minimal web framework',   url: 'https://expressjs.com',        Icon: Route },
      { name: 'Prisma',      role: 'Type-safe ORM',           url: 'https://www.prisma.io',        Icon: Layers },
      { name: 'PostgreSQL',  role: 'Relational database',     url: 'https://www.postgresql.org',   Icon: Database },
      { name: 'Django',      role: 'Python web framework',    url: 'https://www.djangoproject.com', monogram: { text: 'Dj', bg: '#092e20', fg: '#44b78b' } },
      { name: 'Wasp',        role: 'Full-stack DSL framework', url: 'https://wasp-lang.dev',       monogram: { text: 'W',  bg: '#ffcc00', fg: '#1c162e' } },
    ],
  },
]

function Thumb({ tool }: { tool: StackTool }) {
  if (tool.Icon) {
    const Icon = tool.Icon
    return (
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#f5f3f8] ghair">
        <Icon size={16} className="text-ink" strokeWidth={1.75} />
      </span>
    )
  }
  if (tool.monogram) {
    const { text, bg, fg } = tool.monogram
    return (
      <span
        className="grid h-8 w-8 shrink-0 place-items-center rounded-lg ghair font-display text-[11px] font-bold tracking-tight"
        style={{ background: bg, color: fg }}
      >
        {text}
      </span>
    )
  }
  if (tool.logo) {
    return (
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#f5f3f8] ghair">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={tool.logo} alt="" className="h-4 w-4" />
      </span>
    )
  }
  return null
}

function Tile({ tool }: { tool: StackTool }) {
  return (
    <a
      href={tool.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visit ${tool.name}`}
      className="flex items-center gap-3 rounded-2xl bg-white p-3.5 ghair lift"
    >
      <Thumb tool={tool} />
      <span>
        <span className="block font-display text-[13px] font-bold text-ink">{tool.name}</span>
        <span className="mt-0.5 block text-[11px] text-ink-muted">{tool.role}</span>
      </span>
    </a>
  )
}

export function StackReference() {
  return (
    <section className="mx-auto max-w-[1180px] px-6 py-16" aria-labelledby="stack-reference-heading">
      <header className="max-w-2xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-plum">THE STACK</p>
        <h2 id="stack-reference-heading" className="mt-3 font-display text-4xl font-extrabold leading-tight text-ink sm:text-5xl">
          What I build with.
        </h2>
        <p className="mt-4 max-w-[55ch] text-base leading-relaxed text-ink-soft">
          Six tools per layer, picked for the same reason: they hold up under production work and they
          don&apos;t fight each other.
        </p>
      </header>

      <div className="mt-10 space-y-8">
        {GROUPS.map((g) => (
          <div key={g.key}>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-muted">{g.heading}</h3>
            <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
              {g.tools.map((t) => (
                <Tile key={t.name} tool={t} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Run the test suite**

```bash
cd frontend
npm run test -- StackReference
```
Expected: all 4 tests pass.

- [ ] **Step 5: Type-check + lint**

```bash
cd frontend
npm run type-check
npm run lint
```
Expected: clean.

- [ ] **Step 6: Commit**

```bash
git add frontend/src/components/home/StackReference.tsx frontend/src/components/home/StackReference.test.tsx
git commit -m "feat(home): add StackReference compact tile section"
```

---

## Task 10: Update `/systems` page — new hero copy, new section ordering, swap imports

**Goal:** Update `app/systems/page.tsx` to use the new hero copy, render `EngineeringLoop` + `EngineeringPractice` + `StackReference` in that order, and drop the `SystemsToolchain` import.

**Files:**
- Modify: `frontend/src/app/systems/page.tsx`

- [ ] **Step 1: Replace the page contents**

Open `frontend/src/app/systems/page.tsx` and replace it with:

```tsx
import type { Metadata } from 'next'
import { HomeNav } from '@/components/home/HomeNav'
import { SiteFooter } from '@/components/home/SiteFooter'
import { FooterCTA } from '@/components/home/FooterCTA'
import { EngineeringLoop } from '@/components/home/EngineeringLoop'
import { EngineeringPractice } from '@/components/home/EngineeringPractice'
import { StackReference } from '@/components/home/StackReference'

export const metadata: Metadata = {
  title: 'Systems — Lloyd Dela Cruz',
  description:
    'The system behind the systems — an AI-native engineering practice built on spec-first work, multi-gate verification, named artifacts, and production observability.',
}

export default function SystemsPage() {
  return (
    <div className="home2 min-h-screen">
      <HomeNav active="Systems" />
      <main>
        <section className="mx-auto max-w-[1180px] px-6 pt-16 pb-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-plum">How I engineer</p>
          <h1 className="mt-3 max-w-2xl font-display text-4xl font-extrabold leading-tight text-ink sm:text-5xl">
            The system behind the systems.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft">
            Spec before code. Multi-gate verification. Named artifacts at every stage. Observable in
            production. The discipline is what lets a one-person practice ship production-grade systems —
            the toolchain just makes it fast.
          </p>
        </section>
        <EngineeringLoop />
        <EngineeringPractice />
        <StackReference />
        <FooterCTA />
      </main>
      <SiteFooter />
    </div>
  )
}
```

- [ ] **Step 2: Run all tests (regression check)**

```bash
cd frontend
npm run test
```
Expected: all tests pass — nothing should regress because the systems page tests do not exist (only component-level tests do).

- [ ] **Step 3: Type-check + lint**

```bash
cd frontend
npm run type-check
npm run lint
```
Expected: clean.

- [ ] **Step 4: Visual verification in the browser**

```bash
cd frontend
npm run dev
```
Open `http://localhost:3001/systems` and confirm, top to bottom:

1. Hero — eyebrow reads "How I engineer"; the lede has five short statements separated by periods
2. Engineering loop diagram — 7 stages with artifact labels below; VERIFY contains the 6-chip cluster; short loop arc above; long loop arc below with `prod feedback` mid-line; warm canvas backdrop
3. Practice section — 2×2 grid on desktop, single column on mobile, four panels in order: Eval → Orchestration → Security → Observability
4. Stack reference — three grouped rows (Agents & editors, Frontend, Backend), 6 tiles per row on desktop, 18 total
5. Footer CTA + footer unchanged

Then open `http://localhost:3001/` (homepage) and confirm the loop diagram renders correctly there too with the new design.

Stop the dev server (Ctrl+C).

- [ ] **Step 5: Commit**

```bash
git add frontend/src/app/systems/page.tsx
git commit -m "feat(systems): rewrite hero + wire new EngineeringLoop / Practice / StackReference"
```

---

## Task 11: Delete the obsolete SystemsToolchain component

**Goal:** With nothing importing `SystemsToolchain` anymore, remove the file from the repo.

**Files:**
- Delete: `frontend/src/components/home/SystemsToolchain.tsx`

- [ ] **Step 1: Confirm there are no remaining imports**

```bash
grep -r "SystemsToolchain" frontend/src --include="*.tsx" --include="*.ts"
```
Expected: no output. If any imports remain, fix them before deleting.

- [ ] **Step 2: Delete the file**

```bash
cd frontend
git rm src/components/home/SystemsToolchain.tsx
```

- [ ] **Step 3: Run the full test suite + type-check + lint**

```bash
cd frontend
npm run test
npm run type-check
npm run lint
```
Expected: all clean.

- [ ] **Step 4: Build verification**

```bash
cd frontend
npm run build
```
Expected: successful production build with no warnings about missing imports.

- [ ] **Step 5: Commit**

```bash
git commit -m "chore(home): delete obsolete SystemsToolchain after StackReference replaces it"
```

---

## Task 12: Final manual verification

**Goal:** End-to-end check that the redesigned `/systems` page meets the spec across screen sizes. No code changes.

- [ ] **Step 1: Start dev server**

```bash
cd frontend
npm run dev
```

- [ ] **Step 2: Desktop verification (≥1180px wide)**

Open `http://localhost:3001/systems` and confirm:

- **Hero**: eyebrow "How I engineer"; staccato lede sentence; no marketing flow language
- **Loop diagram**:
  - 7 stages in horizontal row: FRAME · SPEC · PLAN · BUILD · VERIFY · SHIP · OBSERVE
  - Monospace artifact labels below each: brief · spec.md · plan.md · diff+tests · gate report · release notes · logs/traces
  - VERIFY contains a chip cluster with: tsc · eslint · vitest · eval / regression · secrets check · human review
  - Short loop arc (amber, prominent) from VERIFY top → PLAN top
  - Long loop arc (amber, subtle) from OBSERVE bottom → FRAME bottom, labeled `prod feedback`
  - `pr` mid-line between BUILD and VERIFY; `tag` mid-line between SHIP and OBSERVE
  - Warm canvas backdrop with hairline border
  - Palette is ink + plum + amber only (no pink/green/blue/orange)
- **Practice grid**: 2×2 layout; four panels in order Eval → Orchestration → Security → Observability; each with the "artifact → …" mono line
- **Stack reference**: three grouped rows; 6 tiles per row; tiles open in a new tab when clicked

- [ ] **Step 3: Mobile verification (resize browser to ~390px)**

Confirm:

- Loop diagram stacks vertically; artifact labels still render below each stage; VERIFY chip cluster renders as a vertical chip list; the left-side amber arc renders as the short loop
- Practice grid collapses to single column
- Stack reference shows 2 tiles per row

- [ ] **Step 4: Homepage regression check**

Open `http://localhost:3001/` and confirm the engineering loop also renders correctly with the new design (since the homepage now uses `EngineeringLoop` too).

- [ ] **Step 5: Accessibility spot-check**

In DevTools, run an accessibility audit (Lighthouse or axe) on `/systems`. Confirm:

- No new contrast errors
- The `<ol>` SR linearization is still present in the DOM under `.sr-only`
- All stack tile links have meaningful `aria-label`s

- [ ] **Step 6: Stop the dev server**

Ctrl+C. The redesign is complete.

---

## Self-review notes

**Spec coverage check:**

- Hero copy rewrite → Task 10
- `EngineeringLoop` rename → Task 1
- New stage list (BUILD/VERIFY/OBSERVE, fold REVIEW) → Task 2
- Artifact labels → Task 3
- VERIFY gate chips → Task 4
- Two loop-backs (short + long) → Task 5
- Pruned palette + canvas + connector annotations → Task 6
- Section heading rewrite → Task 7
- `EngineeringPractice` component → Task 8
- `StackReference` component → Task 9
- `app/systems/page.tsx` wire-up → Task 10
- `SystemsToolchain` deletion → Task 11
- Manual verification → Task 12
- Homepage impact handled → Task 1 (rename) + Task 12 (verification)

All spec requirements are mapped to a task.

**Type-consistency check:**

- `Stage` type gains `artifact: string` in Task 3; used the same name in Tasks 3–7.
- `VERIFY_GATES` is a `const` tuple in Task 4; used by name (not re-declared) in Task 4 mobile render and SR linearization.
- New types `Panel`, `StackTool`, `Group` are scoped to their own component files; no cross-file type sharing.

**Honesty boundary preserved:** None of the tasks introduce CI workflows, husky hooks, gitleaks configs, or eval suites. The page describes practice; it does not retroactively claim gates that don't exist in the repo.
