# Homepage Credibility Pass Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reposition `/` to an Applied AI Systems Builder portfolio: tighter hero, honest stats, evidence-linked capabilities, real screenshots, no inflated claims — all inside the existing `.home2` visual register.

**Architecture:** Single focused PR against `main`. All changes live under `frontend/src/app/page.tsx`, `frontend/src/components/home/*`, and one keyframe in `frontend/src/app/globals.css`. Three new components, one refactor lift, seven modifications, four deletions. No new dependencies; no route changes; the `.home2` cream/plum/Plus-Jakarta visual language is preserved exactly.

**Tech Stack:** Next.js 14 App Router · TypeScript · Tailwind CSS (with `.home2` scoped utilities in `globals.css`) · Lucide React icons · `next/image` (with `unoptimized` for the static export) · Vitest + React Testing Library (jsdom).

**Spec:** `docs/superpowers/specs/2026-05-13-homepage-credibility-pass-design.md`

**Conventions:**
- Use the `@/` alias for imports (`@/components/home/...`) where existing code does.
- All work happens inside the `.home2` wrapper applied in `page.tsx` (line 16 today). Styling primitives available: `ghair` (1px border), `ghair-2` (stronger border), `ghair-t` (top border only), `soft-shadow{,-sm,-lg}`, `lift` (hover transform), `grad-plum-text`, `anim-rise`, `anim-float`, `anim-drift`, `anim-pulse`, `flow-line` (dashed marching). CSS vars: `--plum`, `--plum-deep`, `--plum-soft`, `--amber`, `--green`, `--blue`, `--pink`, `--coral`, `--ink`, `--ink-soft`, `--ink-muted`, `--line`, `--cream-2`.
- Tests: vitest + RTL structural smoke tests (assert that headings/labels/landmarks render). Do not snapshot. Follow the pattern in `frontend/src/components/home/AIWorkflowAlgorithm.test.tsx`.
- Commit after each task. Use conventional-commit prefixes (`feat:`, `refactor:`, `fix:`, `chore:`).
- All commands run from `frontend/`. Verify with `npm run type-check`, `npm run lint`, `npm run test` at the end of each task.

**Working directory note:** all `npm` commands assume you are inside `frontend/`. From the repo root, run `cd frontend && npm run <command>`.

---

## File Structure

**New files (3):**

| Path | Responsibility |
|---|---|
| `frontend/src/components/home/Window.tsx` | Shared 3-dot window-chrome wrapper (lifted from `FeaturedWork.tsx`) |
| `frontend/src/components/home/SystemArchitectureSketch.tsx` | Hero right-side system flow diagram (5 nodes: scan → events → state → decision → ops) |
| `frontend/src/components/home/BuiltWithRow.tsx` | Two labeled groups (AI tools, Stack) — real SVG logos + text labels |
| `frontend/src/components/home/ProductionIndicators.tsx` | 4 honest stats + availability sub-block |

(Window count = 1 — listed first because it unblocks AnchorCase & FeaturedWork screenshots.)

**Modified files (8):**

| Path | What changes |
|---|---|
| `frontend/src/app/globals.css` | Add `home2-dot-travel` keyframe + reduced-motion override |
| `frontend/src/app/page.tsx` | Swap imports + composition (drop TrustedRow/MetricsStrip/CredibilityStrip, add BuiltWithRow + ProductionIndicators) |
| `frontend/src/components/home/HomeHero.tsx` | Copy rewrite + replace `<DiagramScene/>` with `<SystemArchitectureSketch/>` |
| `frontend/src/components/home/AnchorCase.tsx` | `3 sites` → `4 sites`; replace deployment-flow with screenshot; import shared `Window` |
| `frontend/src/components/home/FeaturedWork.tsx` | Remove local `Window`; import shared one. Extend `Project` type with optional `screenshot`. Reorder `PROJECTS`. Render `<Window><Image/></Window>` when `screenshot` present. |
| `frontend/src/components/home/Capabilities.tsx` | New heading + new card data (5 evidence-linked cards) + per-card "See the system →" link |
| `frontend/src/components/home/AIWorkflowAlgorithm.tsx` | Add `id="ai-workflow"` to the `<section>` |
| `frontend/src/components/home/FooterCTA.tsx` | Copy-only rewrite |

**Deleted files (4):**

| Path | Reason |
|---|---|
| `frontend/src/components/home/DiagramScene.tsx` | Replaced by `SystemArchitectureSketch` |
| `frontend/src/components/home/TrustedRow.tsx` | Replaced by `BuiltWithRow` |
| `frontend/src/components/home/MetricsStrip.tsx` | Merged into `ProductionIndicators` |
| `frontend/src/components/home/CredibilityStrip.tsx` | Merged into `ProductionIndicators` |

**Test files (4 new + 1 modified):**

| Path | Responsibility |
|---|---|
| `frontend/src/components/home/SystemArchitectureSketch.test.tsx` | Renders 5 nodes + caption + `aria-label` |
| `frontend/src/components/home/BuiltWithRow.test.tsx` | Renders both group labels + all expected tool names |
| `frontend/src/components/home/ProductionIndicators.test.tsx` | Renders 4 stat values + availability copy |
| `frontend/src/components/home/HomeHero.test.tsx` | New file — asserts new headline, status line, CTAs |
| `frontend/src/components/home/AIWorkflowAlgorithm.test.tsx` | Add one test asserting `id="ai-workflow"` is on the section |

---

## Task 1 — Lift `Window` to a shared module

Refactor only. No behavior change. Unblocks Tasks 7 and 8.

**Files:**
- Create: `frontend/src/components/home/Window.tsx`
- Modify: `frontend/src/components/home/FeaturedWork.tsx:115-126` (remove local definition)

- [ ] **Step 1: Create `Window.tsx`**

Write `frontend/src/components/home/Window.tsx`:

```tsx
// frontend/src/components/home/Window.tsx
import type { ReactNode } from 'react'

/**
 * Three-dot browser-chrome window used by FeaturedWork previews,
 * AnchorCase screenshot, and any future homepage screenshot tile.
 */
export function Window({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-1 flex-col gap-2 rounded-md bg-white/85 p-2.5">
      <div className="flex items-center gap-1">
        <span className="h-1.5 w-1.5 rounded-full bg-black/15" />
        <span className="h-1.5 w-1.5 rounded-full bg-black/15" />
        <span className="h-1.5 w-1.5 rounded-full bg-black/15" />
      </div>
      {children}
    </div>
  )
}
```

- [ ] **Step 2: Remove local definition from `FeaturedWork.tsx`**

In `frontend/src/components/home/FeaturedWork.tsx`, delete lines 115–126 (the local `function Window(...)`) and add this import near the existing top imports:

```tsx
import { Window } from './Window'
```

(Place it after `import { AnchorCase } from './AnchorCase'` to match the alphabetical-by-source pattern.)

- [ ] **Step 3: Verify**

```bash
cd frontend
npm run type-check
npm run lint
npm run test
```

Expected: all pass. No visual change.

- [ ] **Step 4: Commit**

```bash
git add frontend/src/components/home/Window.tsx frontend/src/components/home/FeaturedWork.tsx
git commit -m "refactor(home): lift Window to shared module for reuse"
```

---

## Task 2 — Add `home2-dot-travel` keyframe to globals.css

CSS only. Defines the animation for the architecture sketch's quiet pulse dot. Goes in the existing `.home2` block at the bottom of `globals.css`.

**Files:**
- Modify: `frontend/src/app/globals.css:505` (add new keyframe after the existing `home2-pulse`); also update the reduced-motion media query at line 514

- [ ] **Step 1: Add the keyframe and its utility class**

Find the existing `home2-pulse` keyframe in `globals.css` (around line 505). Insert after it, before the line `.home2 .anim-float ...`:

```css
@keyframes home2-dot-travel {
  0%   { offset-distance: 0%;  opacity: 0; }
  10%  { opacity: 1; }
  90%  { opacity: 1; }
  100% { offset-distance: 100%; opacity: 0; }
}
```

Then in the block of `.home2 .anim-*` utility rules (the lines that map class → animation), add this new rule alongside them:

```css
.home2 .anim-travel { animation: home2-dot-travel 6s linear infinite; }
```

- [ ] **Step 2: Extend the reduced-motion override**

In the existing `@media (prefers-reduced-motion: reduce)` block (around line 514), add `.home2 .anim-travel` to the comma-separated list so the dot stops moving:

```css
@media (prefers-reduced-motion: reduce) {
  .home2 .anim-float,
  .home2 .anim-drift,
  .home2 .anim-rise,
  .home2 .anim-pulse,
  .home2 .anim-travel,
  .home2 .flow-line { animation: none !important; }
  .home2 .anim-rise { opacity: 1; transform: none; }
}
```

- [ ] **Step 3: Verify**

```bash
cd frontend
npm run lint
```

Expected: pass (no JS/TS changes). No visual change yet — the class has no consumer until Task 3.

- [ ] **Step 4: Commit**

```bash
git add frontend/src/app/globals.css
git commit -m "feat(home): add home2-dot-travel keyframe for architecture sketch"
```

---

## Task 3 — Create `SystemArchitectureSketch` with TDD

**Files:**
- Create: `frontend/src/components/home/SystemArchitectureSketch.tsx`
- Test: `frontend/src/components/home/SystemArchitectureSketch.test.tsx`

- [ ] **Step 1: Write the failing test**

Write `frontend/src/components/home/SystemArchitectureSketch.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SystemArchitectureSketch } from './SystemArchitectureSketch'

describe('SystemArchitectureSketch', () => {
  it('renders all five node titles', () => {
    render(<SystemArchitectureSketch />)
    for (const title of [
      'QR scan / Mobile',
      'Event stream',
      'State engine',
      'Decision layer',
      'Operations surface',
    ]) {
      expect(screen.getByText(title)).toBeInTheDocument()
    }
  })

  it('renders each node secondary caption', () => {
    render(<SystemArchitectureSketch />)
    for (const caption of [
      'Clinical end',
      'Audit log',
      'Asset lifecycle',
      'Routing rules',
      'Dashboard · alerts',
    ]) {
      expect(screen.getByText(caption)).toBeInTheDocument()
    }
  })

  it('renders the live-deployment caption beneath the diagram', () => {
    render(<SystemArchitectureSketch />)
    expect(
      screen.getByText(/wheelchair tracking — live across 4 sites · 800\+ assets/i),
    ).toBeInTheDocument()
  })

  it('exposes a descriptive aria-label on the role=img wrapper', () => {
    render(<SystemArchitectureSketch />)
    const img = screen.getByRole('img', { name: /system architecture/i })
    expect(img).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

```bash
cd frontend
npm run test -- SystemArchitectureSketch
```

Expected: FAIL with "Cannot find module './SystemArchitectureSketch'".

- [ ] **Step 3: Implement `SystemArchitectureSketch.tsx`**

Write `frontend/src/components/home/SystemArchitectureSketch.tsx`:

```tsx
// frontend/src/components/home/SystemArchitectureSketch.tsx
import {
  ScanLine,
  Radio,
  Database,
  GitFork,
  Gauge,
  type LucideIcon,
} from 'lucide-react'

type Node = {
  key: string
  Icon: LucideIcon
  color: string
  title: string
  caption: string
}

const NODES: Node[] = [
  { key: 'scan',     Icon: ScanLine, color: 'var(--plum)',  title: 'QR scan / Mobile',  caption: 'Clinical end'        },
  { key: 'events',   Icon: Radio,    color: 'var(--amber)', title: 'Event stream',      caption: 'Audit log'           },
  { key: 'state',    Icon: Database, color: 'var(--blue)',  title: 'State engine',      caption: 'Asset lifecycle'     },
  { key: 'decision', Icon: GitFork,  color: 'var(--green)', title: 'Decision layer',    caption: 'Routing rules'       },
  { key: 'ops',      Icon: Gauge,    color: 'var(--pink)',  title: 'Operations surface', caption: 'Dashboard · alerts' },
]

const CONNECTOR_LABELS = ['event', 'state transition', 'rule decision', 'signal']

// Design space — 5 evenly spaced columns over 560 wide; row centered at y=170.
const W = 560
const H = 360
const ROW_Y = 170
const CARD_W = 96
const CARD_H = 88
const X = (i: number) => Math.round((W / 5) * (i + 0.5))
const HALF = CARD_W / 2

export function SystemArchitectureSketch() {
  return (
    <div
      className="relative mx-auto w-full max-w-[560px]"
      role="img"
      aria-label="System architecture — QR scan to event stream to state engine to decision layer to operations surface, live across 4 hospital sites"
    >
      <div className="relative w-full" style={{ paddingBottom: `${(H / W) * 100}%` }}>
        <div className="absolute inset-0">
          {/* Connectors */}
          <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" fill="none" aria-hidden>
            <defs>
              <path
                id="arch-path"
                d={`M ${X(0) + HALF} ${ROW_Y} L ${X(4) - HALF} ${ROW_Y}`}
              />
            </defs>

            {NODES.slice(0, -1).map((n, i) => {
              const next = NODES[i + 1]
              const x1 = X(i) + HALF
              const x2 = X(i + 1) - HALF
              return (
                <g key={`seg-${n.key}`}>
                  <line
                    x1={x1}
                    y1={ROW_Y}
                    x2={x2}
                    y2={ROW_Y}
                    stroke="var(--plum)"
                    strokeWidth={1.5}
                    strokeOpacity={0.45}
                    strokeLinecap="round"
                  />
                  <circle cx={x1} cy={ROW_Y} r={2.4} fill="var(--plum)" opacity={0.7} />
                  <circle cx={x2} cy={ROW_Y} r={2.4} fill="var(--plum)" opacity={0.7} />
                  <text
                    x={(x1 + x2) / 2}
                    y={ROW_Y - 10}
                    textAnchor="middle"
                    fontSize="9"
                    fontWeight="600"
                    fill="var(--ink-muted)"
                    style={{ letterSpacing: '0.14em', textTransform: 'uppercase' }}
                  >
                    {CONNECTOR_LABELS[i]}
                  </text>
                </g>
              )
            })}

            {/* Quiet pulse dot travelling the full forward path */}
            <circle r={3} fill="var(--plum)" opacity={0.85} className="anim-travel" style={{ offsetPath: `path('M ${X(0) + HALF} ${ROW_Y} L ${X(4) - HALF} ${ROW_Y}')` }} />
          </svg>

          {/* Node cards */}
          {NODES.map((n, i) => (
            <div
              key={n.key}
              className="absolute"
              style={{
                width: CARD_W,
                height: CARD_H,
                left: `${(X(i) / W) * 100}%`,
                top: `${(ROW_Y / H) * 100}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <div className="flex h-full w-full flex-col items-center justify-center gap-1 rounded-2xl bg-white ghair soft-shadow-sm">
                <n.Icon size={22} style={{ color: n.color }} strokeWidth={1.9} />
                <span className="px-1 text-center font-display text-[12px] font-semibold leading-tight text-ink">
                  {n.title}
                </span>
              </div>
              <span
                className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] font-semibold uppercase tracking-[0.14em] text-ink-muted"
                style={{ top: `${CARD_H + 6}px` }}
              >
                {n.caption}
              </span>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-4 text-center text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-muted">
        Wheelchair Tracking — live across 4 sites · 800+ assets
      </p>
    </div>
  )
}
```

- [ ] **Step 4: Run the test to verify it passes**

```bash
cd frontend
npm run test -- SystemArchitectureSketch
```

Expected: 4 tests pass.

- [ ] **Step 5: Type-check + lint**

```bash
cd frontend
npm run type-check
npm run lint
```

Expected: pass.

- [ ] **Step 6: Commit**

```bash
git add frontend/src/components/home/SystemArchitectureSketch.tsx frontend/src/components/home/SystemArchitectureSketch.test.tsx
git commit -m "feat(home): add SystemArchitectureSketch hero diagram"
```

---

## Task 4 — Update `HomeHero` (copy + swap component)

**Files:**
- Modify: `frontend/src/components/home/HomeHero.tsx`
- Test: `frontend/src/components/home/HomeHero.test.tsx` (new)

- [ ] **Step 1: Write the failing test**

Create `frontend/src/components/home/HomeHero.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { HomeHero } from './HomeHero'

describe('HomeHero', () => {
  it('renders the Applied AI Systems Builder eyebrow', () => {
    render(<HomeHero />)
    expect(
      screen.getByText(/applied ai systems builder · healthcare operations/i),
    ).toBeInTheDocument()
  })

  it('renders the new headline and sub-headline', () => {
    render(<HomeHero />)
    expect(
      screen.getByText(/i build ai systems that support healthcare operations\./i),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/multi-site workflows, event streams, and decision layers/i),
    ).toBeInTheDocument()
  })

  it('renders the recruiter-readable status line', () => {
    render(<HomeHero />)
    expect(
      screen.getByText(/open to applied ai, ai systems, and operational intelligence roles/i),
    ).toBeInTheDocument()
  })

  it('primary CTA links to the production system case study', () => {
    render(<HomeHero />)
    const cta = screen.getByRole('link', { name: /see the production system/i })
    expect(cta).toHaveAttribute('href', '/work/wheelchair-tracking')
  })

  it('secondary CTA anchors to the ai-workflow section', () => {
    render(<HomeHero />)
    const cta = screen.getByRole('link', { name: /ai workflow methodology/i })
    expect(cta).toHaveAttribute('href', '#ai-workflow')
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

```bash
cd frontend
npm run test -- HomeHero
```

Expected: FAIL with assertion errors (current `HomeHero` has different copy).

- [ ] **Step 3: Rewrite `HomeHero.tsx`**

Replace the entire contents of `frontend/src/components/home/HomeHero.tsx` with:

```tsx
// frontend/src/components/home/HomeHero.tsx
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SystemArchitectureSketch } from './SystemArchitectureSketch'

export function HomeHero() {
  return (
    <section className="relative overflow-hidden">
      <div className="hero-wash pointer-events-none absolute inset-0" aria-hidden />
      <div className="relative mx-auto grid max-w-[1180px] grid-cols-1 items-center gap-14 px-6 pb-16 pt-14 lg:grid-cols-[1.05fr_1fr] lg:pt-20">
        {/* left */}
        <div>
          <span className="anim-rise inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-soft ghair">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'var(--plum)' }} />
            Applied AI Systems Builder · Healthcare Operations
          </span>

          <h1
            className="anim-rise mt-6 font-display text-[2.85rem] font-extrabold leading-[1.04] text-ink sm:text-[3.4rem] lg:text-[4rem]"
            style={{ animationDelay: '60ms' }}
          >
            I build AI systems that{' '}
            <br className="hidden sm:block" />
            <span className="grad-plum-text">support healthcare operations.</span>
          </h1>

          <p
            className="anim-rise mt-6 max-w-[46ch] text-[1.05rem] leading-relaxed text-ink-soft"
            style={{ animationDelay: '120ms' }}
          >
            Multi-site workflows, event streams, and decision layers —
            designed to ship, observed in production.
          </p>

          <div
            className="anim-rise mt-9 flex flex-wrap items-center gap-3"
            style={{ animationDelay: '180ms' }}
          >
            <Link
              href="/work/wheelchair-tracking"
              className="group inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white soft-shadow transition-transform hover:-translate-y-0.5"
              style={{ background: 'var(--plum)' }}
            >
              See the production system
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="#ai-workflow"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-ink ghair-2 transition-colors hover:bg-[var(--cream-2)]"
            >
              AI workflow methodology
            </Link>
          </div>

          <p
            className="anim-rise mt-6 max-w-[60ch] text-[12px] leading-relaxed text-ink-muted"
            style={{ animationDelay: '240ms' }}
          >
            Vancouver, Canada · Open to applied AI, AI systems, and operational intelligence roles ·
            Currently shipping multi-site healthcare deployment
          </p>
        </div>

        {/* right */}
        <div className="anim-rise" style={{ animationDelay: '220ms' }}>
          <SystemArchitectureSketch />
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Run the test to verify it passes**

```bash
cd frontend
npm run test -- HomeHero
```

Expected: 5 tests pass.

- [ ] **Step 5: Type-check + lint**

```bash
cd frontend
npm run type-check
npm run lint
```

Expected: pass.

- [ ] **Step 6: Commit**

```bash
git add frontend/src/components/home/HomeHero.tsx frontend/src/components/home/HomeHero.test.tsx
git commit -m "feat(home): rewrite hero copy + swap to SystemArchitectureSketch"
```

---

## Task 5 — Create `BuiltWithRow` with TDD

**Files:**
- Create: `frontend/src/components/home/BuiltWithRow.tsx`
- Test: `frontend/src/components/home/BuiltWithRow.test.tsx`

- [ ] **Step 1: Write the failing test**

Write `frontend/src/components/home/BuiltWithRow.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BuiltWithRow } from './BuiltWithRow'

describe('BuiltWithRow', () => {
  it('renders both group labels', () => {
    render(<BuiltWithRow />)
    expect(screen.getByText(/^ai tools$/i)).toBeInTheDocument()
    expect(screen.getByText(/^stack$/i)).toBeInTheDocument()
  })

  it('renders all six AI tool names', () => {
    render(<BuiltWithRow />)
    for (const tool of ['Claude', 'OpenAI', 'Gemini', 'Cursor', 'GitHub Copilot', 'Antigravity']) {
      expect(screen.getByText(tool)).toBeInTheDocument()
    }
  })

  it('renders all stack item names', () => {
    render(<BuiltWithRow />)
    for (const item of ['Next.js', 'TypeScript', 'PostgreSQL', 'Microsoft Lists', 'QR workflows']) {
      expect(screen.getByText(item)).toBeInTheDocument()
    }
  })

  it('does not render LangChain or AWS (dropped on purpose)', () => {
    render(<BuiltWithRow />)
    expect(screen.queryByText(/langchain/i)).toBeNull()
    expect(screen.queryByText(/^aws$/i)).toBeNull()
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

```bash
cd frontend
npm run test -- BuiltWithRow
```

Expected: FAIL with "Cannot find module './BuiltWithRow'".

- [ ] **Step 3: Implement `BuiltWithRow.tsx`**

Write `frontend/src/components/home/BuiltWithRow.tsx`:

```tsx
// frontend/src/components/home/BuiltWithRow.tsx
import Image from 'next/image'

type AiTool = { label: string; logo: string }

const AI_TOOLS: AiTool[] = [
  { label: 'Claude',         logo: '/logos/claude.svg' },
  { label: 'OpenAI',         logo: '/logos/openai.svg' },
  { label: 'Gemini',         logo: '/logos/gemini.svg' },
  { label: 'Cursor',         logo: '/logos/cursor.svg' },
  { label: 'GitHub Copilot', logo: '/logos/github-copilot.svg' },
  { label: 'Antigravity',    logo: '/logos/antigravity.svg' },
]

const STACK = ['Next.js', 'TypeScript', 'PostgreSQL', 'Microsoft Lists', 'QR workflows']

export function BuiltWithRow() {
  return (
    <section className="mx-auto max-w-[1180px] px-6 pb-14 pt-2">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[auto_1fr_auto_1fr] lg:items-center lg:gap-8">
        {/* AI tools group */}
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-muted">
          AI tools
        </p>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          {AI_TOOLS.map(({ label, logo }) => (
            <span key={label} className="inline-flex items-center gap-2 text-[14px] font-medium text-ink-soft">
              <Image
                src={logo}
                alt=""
                width={18}
                height={18}
                aria-hidden
                style={{ filter: 'grayscale(1)', opacity: 0.75 }}
                unoptimized
              />
              {label}
            </span>
          ))}
        </div>

        {/* divider on lg+, hidden on smaller */}
        <div className="hidden h-8 w-px bg-[var(--line)] lg:block" aria-hidden />

        {/* Stack group */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-muted">
            Stack
          </p>
          {STACK.map((item) => (
            <span key={item} className="text-[14px] font-medium text-ink-soft">
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
```

Note: the layout deliberately puts the `Stack` label *inside* its flex group (rather than as a sibling) so the wrap behaviour on narrow viewports keeps the label next to the items. The grid above only positions the AI-tools label as the leading column on `lg+`.

- [ ] **Step 4: Run the test to verify it passes**

```bash
cd frontend
npm run test -- BuiltWithRow
```

Expected: 4 tests pass.

- [ ] **Step 5: Type-check + lint**

```bash
cd frontend
npm run type-check
npm run lint
```

Expected: pass.

- [ ] **Step 6: Commit**

```bash
git add frontend/src/components/home/BuiltWithRow.tsx frontend/src/components/home/BuiltWithRow.test.tsx
git commit -m "feat(home): add BuiltWithRow with real tool logos + stack split"
```

---

## Task 6 — Create `ProductionIndicators` with TDD

**Files:**
- Create: `frontend/src/components/home/ProductionIndicators.tsx`
- Test: `frontend/src/components/home/ProductionIndicators.test.tsx`

- [ ] **Step 1: Write the failing test**

Write `frontend/src/components/home/ProductionIndicators.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ProductionIndicators } from './ProductionIndicators'

describe('ProductionIndicators', () => {
  it('renders all four metric values', () => {
    render(<ProductionIndicators />)
    expect(screen.getByText('4')).toBeInTheDocument()
    expect(screen.getByText('800+')).toBeInTheDocument()
    expect(screen.getByText('10+')).toBeInTheDocument()
    expect(screen.getByText(/aug 2025/i)).toBeInTheDocument()
  })

  it('labels the live-deployment metric', () => {
    render(<ProductionIndicators />)
    expect(screen.getByText(/hospital sites · live deployment/i)).toBeInTheDocument()
  })

  it('renders availability + roles line + contact link', () => {
    render(<ProductionIndicators />)
    expect(screen.getByText(/currently available/i)).toBeInTheDocument()
    expect(
      screen.getByText(/open to applied ai, ai systems, and operational intelligence roles/i),
    ).toBeInTheDocument()
    const link = screen.getByRole('link', { name: /start a conversation/i })
    expect(link).toHaveAttribute('href', '/contact')
  })

  it('does NOT render dropped/inflated claims', () => {
    render(<ProductionIndicators />)
    expect(screen.queryByText(/50\+/)).toBeNull()
    expect(screen.queryByText(/8\+/)).toBeNull()
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

```bash
cd frontend
npm run test -- ProductionIndicators
```

Expected: FAIL with "Cannot find module".

- [ ] **Step 3: Implement `ProductionIndicators.tsx`**

Write `frontend/src/components/home/ProductionIndicators.tsx`:

```tsx
// frontend/src/components/home/ProductionIndicators.tsx
import Link from 'next/link'
import { Building2, Boxes, HeartPulse, Rocket, ArrowRight } from 'lucide-react'

const METRICS = [
  { value: '4',        label: 'Hospital sites · live deployment',     Icon: Building2,  tint: 'var(--plum)',  bg: 'var(--plum-soft)' },
  { value: '800+',     label: 'Assets under one shared state model',  Icon: Boxes,      tint: 'var(--amber)', bg: '#fef3c7' },
  { value: '10+',      label: 'Years in healthcare operations',       Icon: HeartPulse, tint: 'var(--green)', bg: '#d1fae5' },
  { value: 'Aug 2025', label: 'Wheelchair tracking — in production since', Icon: Rocket, tint: 'var(--blue)', bg: '#dbeafe' },
]

export function ProductionIndicators() {
  return (
    <section className="mx-auto max-w-[1180px] px-6 py-6">
      <div className="flex flex-col gap-8 rounded-3xl bg-white px-7 py-7 ghair soft-shadow lg:flex-row lg:items-center lg:gap-6">
        <div className="grid flex-1 grid-cols-2 gap-7 sm:grid-cols-4">
          {METRICS.map(({ value, label, Icon, tint, bg }) => (
            <div key={label}>
              <div className="grid h-9 w-9 place-items-center rounded-lg" style={{ background: bg }}>
                <Icon size={18} style={{ color: tint }} strokeWidth={1.9} />
              </div>
              <p className="mt-3 font-display text-2xl font-extrabold text-ink">{value}</p>
              <p className="text-sm text-ink-muted">{label}</p>
            </div>
          ))}
        </div>

        <div className="hidden w-px self-stretch bg-[var(--line)] lg:block" />

        <div className="lg:w-60">
          <p className="flex items-center gap-2 text-sm font-medium text-ink">
            <span className="h-2 w-2 rounded-full" style={{ background: 'var(--green)' }} />
            Currently available
          </p>
          <p className="mt-1 text-xs leading-relaxed text-ink-muted">
            Vancouver, Canada · Open to applied AI, AI systems, and operational intelligence roles
          </p>
          <Link
            href="/contact"
            className="group mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-plum"
          >
            Start a conversation
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Run the test to verify it passes**

```bash
cd frontend
npm run test -- ProductionIndicators
```

Expected: 4 tests pass.

- [ ] **Step 5: Type-check + lint**

```bash
cd frontend
npm run type-check
npm run lint
```

Expected: pass.

- [ ] **Step 6: Commit**

```bash
git add frontend/src/components/home/ProductionIndicators.tsx frontend/src/components/home/ProductionIndicators.test.tsx
git commit -m "feat(home): add ProductionIndicators (4 honest stats + availability)"
```

---

## Task 7 — Update `AnchorCase` (site count + screenshot)

**Files:**
- Modify: `frontend/src/components/home/AnchorCase.tsx`

- [ ] **Step 1: Apply the edits to `AnchorCase.tsx`**

Open `frontend/src/components/home/AnchorCase.tsx`.

**Edit A — imports.** Replace the import block at the top:

```tsx
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Check } from 'lucide-react'
import { ANCHOR_CASE_HREF, StatusPill, CapabilityPill } from './FeaturedWork'
import { Window } from './Window'
```

(Note: `Building2`, `QrCode`, `Workflow`, `Database`, `Gauge`, `LucideIcon` are dropped — the deployment-flow uses none of them anymore.)

**Edit B — remove the `FlowNode` type and `FLOW` array.** Delete the lines that currently define:

```tsx
type FlowNode = { Icon: LucideIcon; label: string }

const FLOW: FlowNode[] = [
  { Icon: Building2, label: 'Sites' },
  { Icon: QrCode,    label: 'QR Scan' },
  { Icon: Workflow,  label: 'Workflow' },
  { Icon: Database,  label: 'Lifecycle DB' },
  { Icon: Gauge,     label: 'Ops Dashboard' },
]
```

**Edit C — fix the first STATS entry.** Change:

```tsx
const STATS = [
  { value: '3 sites',    label: 'deployed' },
```

to:

```tsx
const STATS = [
  { value: '4 sites',    label: 'deployed' },
```

**Edit D — replace the right column's "deployment flow" block.** Find the JSX between `{/* deployment flow */}` and the next `{/* micro-stats */}` comment (the `<div className="rounded-2xl bg-white p-5 ghair soft-shadow-sm">...</div>` block) and replace it with:

```tsx
{/* live operations screenshot */}
<div className="rounded-2xl bg-white p-3 ghair soft-shadow-sm">
  <p className="px-1 pb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-muted">
    Operations dashboard — live across 4 sites
  </p>
  <Window>
    <div className="relative overflow-hidden rounded-md" style={{ aspectRatio: '16 / 9' }}>
      <Image
        src="/images/Wheelchair_tracking.png"
        alt="Wheelchair tracking operations dashboard — site overview"
        fill
        sizes="(min-width: 1024px) 480px, 90vw"
        className="object-cover object-top"
        unoptimized
      />
    </div>
  </Window>
</div>
```

- [ ] **Step 2: Type-check + lint + test**

```bash
cd frontend
npm run type-check
npm run lint
npm run test
```

Expected: pass. (No new dedicated test for AnchorCase yet — its behaviour is exercised through FeaturedWork. If any existing test asserts the dropped `FLOW` strings it must be deleted; grep shows no such test today.)

- [ ] **Step 3: Visual verification**

```bash
cd frontend
npm run dev
```

Open http://localhost:3001/, scroll to the anchor case, confirm the right column shows the `Wheelchair_tracking.png` screenshot inside window chrome and the first micro-stat now reads "4 sites · deployed". Stop the dev server (Ctrl-C).

- [ ] **Step 4: Commit**

```bash
git add frontend/src/components/home/AnchorCase.tsx
git commit -m "feat(home): anchor case screenshot + 3->4 sites consistency fix"
```

---

## Task 8 — Update `FeaturedWork` (reorder + screenshot support)

**Files:**
- Modify: `frontend/src/components/home/FeaturedWork.tsx`

- [ ] **Step 1: Extend the `Project` type**

In `frontend/src/components/home/FeaturedWork.tsx`, find the `export type Project = { ... }` block (currently lines 24–38). Add a new optional `screenshot` field at the end of the field list, before the closing brace:

```tsx
export type Project = {
  badge: string
  TagIcon: typeof QrCode
  variant: Variant
  accent: string
  wash: string
  title: string
  body: string
  stack: string
  href: string
  status: ProjectStatus
  capabilities: ProjectCapability[]
  /** Short, concrete proof point shown on flagship/featured cards. */
  metric?: { value: string; label: string }
  /** Real product screenshot shown in window chrome in place of the abstract PreviewMock. */
  screenshot?: { src: string; alt: string }
}
```

- [ ] **Step 2: Reorder `PROJECTS` and add screenshot entries**

Replace the entire `export const PROJECTS: Project[] = [ ... ]` array (currently lines 40–107) with:

```tsx
export const PROJECTS: Project[] = [
  {
    badge: 'HEALTHCARE OPERATIONS',
    TagIcon: QrCode,
    variant: 'states',
    accent: 'var(--plum)',
    wash: 'linear-gradient(135deg,#f3effe,#fbf5fe)',
    title: 'Multi-Site Wheelchair Tracking System',
    body: 'Operational tracking platform supporting 800+ wheelchairs and clinical assets across four hospital sites — QR workflows, utilization tracking, lifecycle coordination, and chain-of-custody visibility.',
    stack: 'Microsoft Lists, QR Systems, Power Platform, React, TypeScript',
    href: ANCHOR_CASE_HREF,
    status: 'production',
    capabilities: ['case-study'],
    metric: { value: '4 sites · 800+', label: 'assets in production' },
  },
  {
    badge: 'APPLIED AI / POPULATION HEALTH',
    TagIcon: LineChart,
    variant: 'forecast',
    accent: 'var(--plum)',
    wash: 'linear-gradient(135deg,#f3f0fb,#fbf7fe)',
    title: 'Population-Health Intelligence Platform',
    body: 'An AI-native forecasting layer over WHO, World Bank, and IMF indicators. Calibrated life-expectancy projections with explainable feature attribution for ministry-of-health planners.',
    stack: 'TypeScript, ensemble forecasting, quantile regression, SHAP, isotonic calibration',
    href: '/work/population-health-intelligence',
    status: 'prototype',
    capabilities: ['ai-assisted', 'case-study', 'demo'],
    screenshot: { src: '/images/Life_Expectancy.png', alt: 'Life-expectancy forecasting dashboard' },
  },
  {
    badge: 'APPLIED AI / CLINICAL DECISION SUPPORT',
    TagIcon: Stethoscope,
    variant: 'triage',
    accent: 'var(--plum)',
    wash: 'linear-gradient(135deg,#f3f0fb,#fbf7fe)',
    title: 'Clinical Risk Engine',
    body: 'A calibrated inference system over biopsy feature vectors. Returns malignancy probability, CI band, and morphology-level attribution for clinician-in-the-loop triage.',
    stack: 'TypeScript, ensemble classifier, isotonic calibration, SHAP, ambiguity-flag triage policy',
    href: '/work/clinical-risk-engine',
    status: 'prototype',
    capabilities: ['ai-assisted', 'case-study', 'demo'],
    screenshot: { src: '/images/Heart_Prediction.png', alt: 'Clinical risk prediction interface' },
  },
  {
    badge: 'HEALTHCARE SYSTEMS',
    TagIcon: Network,
    variant: 'topology',
    accent: 'var(--blue)',
    wash: 'linear-gradient(135deg,#eef4fe,#f5f8fe)',
    title: 'EquiTrackr',
    body: 'Modern healthcare equipment workflow platform for tracking equipment states, operational workflows, maintenance coordination, and hospital logistics systems.',
    stack: 'Next.js, TypeScript, Tailwind, PostgreSQL, Prisma',
    href: '/work/equitrackr',
    status: 'prototype',
    capabilities: ['case-study', 'demo'],
  },
  {
    badge: 'FINTECH & PLANNING',
    TagIcon: Wallet,
    variant: 'finance',
    accent: 'var(--green)',
    wash: 'linear-gradient(135deg,#ecfdf4,#f4fbf7)',
    title: 'SpendWise',
    body: 'AI-native budgeting and financial planning platform focused on operational budgeting, transaction tracking, onboarding flows, and intelligent financial planning.',
    stack: 'React Native, Expo, Node.js, PostgreSQL, Prisma',
    href: '/work/spendwise',
    status: 'prototype',
    capabilities: ['case-study', 'demo'],
  },
]
```

- [ ] **Step 3: Add `next/image` import**

Near the top of `FeaturedWork.tsx`, add to the imports:

```tsx
import Image from 'next/image'
```

- [ ] **Step 4: Update `WorkCard` to render the screenshot when present**

Find the `<div className="relative h-40 overflow-hidden" style={{ background: p.wash }}>` block inside `WorkCard` (currently around line 350) and replace the `<PreviewMock ... />` call with a conditional:

```tsx
<div className="relative h-40 overflow-hidden" style={{ background: p.wash }}>
  {p.screenshot ? (
    <div className="absolute inset-0 flex gap-2 p-3">
      <Window>
        <div className="relative flex-1 overflow-hidden rounded">
          <Image
            src={p.screenshot.src}
            alt={p.screenshot.alt}
            fill
            sizes="(min-width: 1024px) 360px, 90vw"
            className="object-cover object-top"
            unoptimized
          />
        </div>
      </Window>
    </div>
  ) : (
    <PreviewMock variant={p.variant} accent={p.accent} />
  )}
  <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/85 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-ink-soft backdrop-blur">
    <p.TagIcon size={11} style={{ color: p.accent }} />
    {p.badge}
  </span>
</div>
```

- [ ] **Step 5: Type-check + lint + test**

```bash
cd frontend
npm run type-check
npm run lint
npm run test
```

Expected: pass.

- [ ] **Step 6: Visual verification**

```bash
cd frontend
npm run dev
```

At http://localhost:3001/ confirm:
- Anchor case at top with screenshot (from Task 7).
- Grid order: Population-Health → Clinical Risk → EquiTrackr → SpendWise.
- Population-Health and Clinical Risk cards show real screenshots in window chrome.
- EquiTrackr and SpendWise still show their abstract PreviewMock sketches.

Stop dev server.

- [ ] **Step 7: Commit**

```bash
git add frontend/src/components/home/FeaturedWork.tsx
git commit -m "feat(home): real screenshots on applied-AI cards + reorder grid"
```

---

## Task 9 — Update `Capabilities` (heading + evidence links)

**Files:**
- Modify: `frontend/src/components/home/Capabilities.tsx`

- [ ] **Step 1: Replace the entire file**

Replace the contents of `frontend/src/components/home/Capabilities.tsx` with:

```tsx
// frontend/src/components/home/Capabilities.tsx
import Link from 'next/link'
import { Brain, Boxes, Workflow, Database, Activity, ArrowRight, type LucideIcon } from 'lucide-react'

type Card = {
  title: string
  body: string
  Icon: LucideIcon
  tint: string
  bg: string
  href: string
}

const CARDS: Card[] = [
  {
    title: 'Multi-site operational systems',
    body: 'QR workflows, event streams, and shared state across distributed sites — designed to keep four hospitals on one operational truth.',
    Icon: Boxes,
    tint: 'var(--plum)',
    bg: 'var(--plum-soft)',
    href: '/work/wheelchair-tracking',
  },
  {
    title: 'AI workflow engineering',
    body: 'Calibrated inference, ensemble forecasting, and decision-gated pipelines — agents do the heavy work inside specified, observable gates.',
    Icon: Brain,
    tint: 'var(--plum-deep)',
    bg: '#ede9fe',
    href: '/work/clinical-risk-engine',
  },
  {
    title: 'Operational intelligence layers',
    body: 'Forecasting and explainable feature attribution on top of operational data — built for planners, not notebooks.',
    Icon: Activity,
    tint: 'var(--amber)',
    bg: '#fef3c7',
    href: '/work/population-health-intelligence',
  },
  {
    title: 'Equipment & asset workflows',
    body: 'Lifecycle state models, scan-driven transitions, and chain-of-custody — operational software clinicians actually use.',
    Icon: Workflow,
    tint: 'var(--green)',
    bg: '#d1fae5',
    href: '/work/equitrackr',
  },
  {
    title: 'Production engineering discipline',
    body: 'Specs before code, tests before commits, every diff reviewed — the algorithm, not the vibe.',
    Icon: Database,
    tint: 'var(--pink)',
    bg: '#fce7f3',
    href: '#ai-workflow',
  },
]

export function Capabilities() {
  return (
    <section className="mx-auto max-w-[1180px] px-6 py-16">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-plum">What I do</p>

      <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1fr_auto] lg:items-end">
        <h2 className="font-display text-3xl font-extrabold leading-[1.12] text-ink sm:text-[2.4rem]">
          What I <span className="text-plum">actually</span> build.
        </h2>
        <p className="max-w-md text-[1.02rem] leading-relaxed text-ink-soft">
          Five capability areas — each one linked to a real system you can read end-to-end.
        </p>
        <Link href="/work" className="group inline-flex items-center gap-1.5 text-sm font-semibold text-plum lg:pb-1">
          View all projects
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {CARDS.map(({ title, body, Icon, tint, bg, href }) => (
          <Link
            key={title}
            href={href}
            className="lift group flex flex-col rounded-2xl bg-white p-5 ghair"
          >
            <div className="grid h-11 w-11 place-items-center rounded-xl" style={{ background: bg }}>
              <Icon size={20} style={{ color: tint }} strokeWidth={1.9} />
            </div>
            <h3 className="mt-4 font-display text-[15px] font-bold text-ink">{title}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{body}</p>
            <span
              className="mt-4 inline-flex items-center gap-1 text-[12px] font-semibold"
              style={{ color: tint }}
            >
              See the system
              <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}
```

Note: the card root went from a `<div>` to a `<Link>` so the whole tile is clickable, matching `WorkCard` UX.

- [ ] **Step 2: Type-check + lint + test**

```bash
cd frontend
npm run type-check
npm run lint
npm run test
```

Expected: pass.

- [ ] **Step 3: Commit**

```bash
git add frontend/src/components/home/Capabilities.tsx
git commit -m "feat(home): rewrite Capabilities as evidence-linked claims"
```

---

## Task 10 — Add `id="ai-workflow"` to `AIWorkflowAlgorithm`

Tiny change — but it's the anchor target for the hero's secondary CTA and the "Production engineering discipline" capability card.

**Files:**
- Modify: `frontend/src/components/home/AIWorkflowAlgorithm.tsx:53`
- Modify: `frontend/src/components/home/AIWorkflowAlgorithm.test.tsx`

- [ ] **Step 1: Extend the test**

Open `frontend/src/components/home/AIWorkflowAlgorithm.test.tsx` and add this test inside the existing `describe('AIWorkflowAlgorithm', () => { ... })` block:

```tsx
it('exposes id="ai-workflow" on its section for anchor links', () => {
  const { container } = render(<AIWorkflowAlgorithm />)
  const section = container.querySelector('section#ai-workflow')
  expect(section).not.toBeNull()
})
```

- [ ] **Step 2: Run the test to verify it fails**

```bash
cd frontend
npm run test -- AIWorkflowAlgorithm
```

Expected: the new test FAILs (no `id` on the section yet), pre-existing tests pass.

- [ ] **Step 3: Add the `id` attribute**

In `frontend/src/components/home/AIWorkflowAlgorithm.tsx`, find the line:

```tsx
<section className="relative mx-auto max-w-[1180px] px-6 py-20" aria-labelledby="ai-workflow-heading">
```

Change it to:

```tsx
<section id="ai-workflow" className="relative mx-auto max-w-[1180px] px-6 py-20" aria-labelledby="ai-workflow-heading">
```

- [ ] **Step 4: Run the test to verify it passes**

```bash
cd frontend
npm run test -- AIWorkflowAlgorithm
```

Expected: all 4 tests pass.

- [ ] **Step 5: Commit**

```bash
git add frontend/src/components/home/AIWorkflowAlgorithm.tsx frontend/src/components/home/AIWorkflowAlgorithm.test.tsx
git commit -m "feat(home): anchor AIWorkflowAlgorithm via id=ai-workflow"
```

---

## Task 11 — Update `FooterCTA` copy

Copy-only rewrite. Visuals untouched.

**Files:**
- Modify: `frontend/src/components/home/FooterCTA.tsx:23-31`

- [ ] **Step 1: Replace the headline + body copy**

Open `frontend/src/components/home/FooterCTA.tsx`.

Find this block (currently lines ~23–27):

```tsx
<h2 className="font-display text-2xl font-extrabold leading-tight text-ink sm:text-3xl">
  Let&apos;s architect{' '}
  <span className="grad-plum-text">your next system.</span>
</h2>
```

Leave it as-is (headline stays).

Find this block (currently lines ~30–32):

```tsx
<p className="text-sm leading-relaxed text-ink-soft">
  I&apos;m open to exciting opportunities and collaborations. Let&apos;s connect!
</p>
```

Replace with:

```tsx
<p className="text-sm leading-relaxed text-ink-soft">
  I&apos;m currently shipping a multi-site healthcare deployment and have capacity for one more
  applied-AI engagement. The best way in is a 20-minute conversation about the system you&apos;re
  trying to build.
</p>
```

Leave the `Start a conversation →` button label unchanged.

- [ ] **Step 2: Type-check + lint + test**

```bash
cd frontend
npm run type-check
npm run lint
npm run test
```

Expected: pass.

- [ ] **Step 3: Commit**

```bash
git add frontend/src/components/home/FooterCTA.tsx
git commit -m "feat(home): rewrite footer CTA copy to honest, recruiter-readable"
```

---

## Task 12 — Wire it all up in `app/page.tsx`

Swap the deleted components for the new ones. This is the task that makes the new homepage actually render.

**Files:**
- Modify: `frontend/src/app/page.tsx`

- [ ] **Step 1: Replace the file**

Replace the entire contents of `frontend/src/app/page.tsx` with:

```tsx
// frontend/src/app/page.tsx
import { HomeNav } from '@/components/home/HomeNav'
import { HomeHero } from '@/components/home/HomeHero'
import { BuiltWithRow } from '@/components/home/BuiltWithRow'
import { ProductionIndicators } from '@/components/home/ProductionIndicators'
import { Capabilities } from '@/components/home/Capabilities'
import { AIWorkflowAlgorithm } from '@/components/home/AIWorkflowAlgorithm'
import { FeaturedWork } from '@/components/home/FeaturedWork'
import { FooterCTA } from '@/components/home/FooterCTA'
import { SiteFooter } from '@/components/home/SiteFooter'
import { Reveal } from '@/components/home/Reveal'

export default function Home() {
  return (
    <div className="home2 min-h-screen">
      <HomeNav />
      <main>
        <HomeHero />
        <BuiltWithRow />
        <Reveal><ProductionIndicators /></Reveal>
        <Reveal><Capabilities /></Reveal>
        <Reveal><AIWorkflowAlgorithm /></Reveal>
        <Reveal><FeaturedWork /></Reveal>
        <FooterCTA />
      </main>
      <SiteFooter />
    </div>
  )
}
```

- [ ] **Step 2: Type-check + lint + test**

```bash
cd frontend
npm run type-check
npm run lint
npm run test
```

Expected: pass.

- [ ] **Step 3: Run dev server and verify visually**

```bash
cd frontend
npm run dev
```

Open http://localhost:3001/ and verify the full top-to-bottom flow:

1. Hero: "Applied AI Systems Builder · Healthcare Operations" eyebrow, "I build AI systems that support healthcare operations." headline, sub-headline, status line, two CTAs, architecture sketch on the right with 5 labeled nodes.
2. BuiltWithRow: AI tools (6 logos + labels) + Stack (5 text labels), no LangChain, no AWS.
3. ProductionIndicators: 4 stats (4 / 800+ / 10+ / Aug 2025) + availability sub-block.
4. Capabilities: "What I actually build." heading + 5 evidence-linked cards (whole tile clickable).
5. AIWorkflowAlgorithm: unchanged, but the secondary CTA in the hero should scroll-jump to it.
6. FeaturedWork: anchor case with screenshot, then 4-card grid with Population-Health and Clinical Risk showing real screenshots.
7. FooterCTA: new "capacity for one more applied-AI engagement" copy.

Click the hero's secondary CTA ("AI workflow methodology") — it should anchor-scroll to the algorithm section. Click the "Production engineering discipline" capability card — same. Stop the dev server.

- [ ] **Step 4: Commit**

```bash
git add frontend/src/app/page.tsx
git commit -m "feat(home): swap homepage composition to new credibility-pass sections"
```

---

## Task 13 — Delete the legacy components

These files are now orphans (verified earlier — no remaining references). Cleanup commit.

**Files:**
- Delete: `frontend/src/components/home/DiagramScene.tsx`
- Delete: `frontend/src/components/home/TrustedRow.tsx`
- Delete: `frontend/src/components/home/MetricsStrip.tsx`
- Delete: `frontend/src/components/home/CredibilityStrip.tsx`

- [ ] **Step 1: Re-verify no consumers remain**

```bash
cd frontend
grep -rn "DiagramScene\|TrustedRow\|MetricsStrip\|CredibilityStrip" src 2>/dev/null
```

Expected: only matches inside the four files about to be deleted (i.e. their own `// frontend/src/...` header comment and the `export function ...` line). If anything else matches, stop and resolve first.

- [ ] **Step 2: Delete the files**

```bash
cd frontend
rm src/components/home/DiagramScene.tsx
rm src/components/home/TrustedRow.tsx
rm src/components/home/MetricsStrip.tsx
rm src/components/home/CredibilityStrip.tsx
```

- [ ] **Step 3: Type-check + lint + test + build**

```bash
cd frontend
npm run type-check
npm run lint
npm run test
npm run build
```

Expected: all pass. (Build is the strongest signal that no stale import survived.)

- [ ] **Step 4: Commit**

```bash
git add -A frontend/src/components/home/
git commit -m "chore(home): delete legacy DiagramScene/TrustedRow/MetricsStrip/CredibilityStrip"
```

---

## Task 14 — Final verification pass

End-to-end sanity check before opening the PR. No new commits expected; if you find a problem, fix it in a new commit.

- [ ] **Step 1: Full quality gate**

```bash
cd frontend
npm run type-check
npm run lint
npm run test
npm run build
```

All must pass.

- [ ] **Step 2: Honest-claims audit (text search)**

Confirm none of the dropped claims survive on the homepage:

```bash
cd frontend
grep -rn "50+\|8+ industries\|LangChain\|\bAWS\b\|3 sites" src/app/page.tsx src/components/home/ 2>/dev/null
```

Expected: zero hits. If any match, fix and re-commit before proceeding.

- [ ] **Step 3: Reduced-motion check**

```bash
cd frontend
npm run dev
```

Open Chrome DevTools → Rendering → Emulate CSS media feature `prefers-reduced-motion: reduce` → reload `/`. Confirm:
- Architecture sketch's pulse dot is stationary.
- `.flow-line` dashes are static.
- `.anim-rise` content is visible (no entry animation, but no stuck-invisible content either).

Stop the dev server.

- [ ] **Step 4: A11y smoke check**

In the dev server, run Lighthouse → Accessibility on `/`. Expect score in the same range as before (no regression). Specifically confirm:
- `role="img"` + `aria-label` on the architecture sketch is read by the inspector.
- All real screenshots have non-empty `alt` text.
- Anchor links from hero CTA → `#ai-workflow` work.

- [ ] **Step 5: Verify the commit history**

```bash
git log --oneline main..HEAD
```

You should see approximately 13 commits, each one a single focused step. If anything is amended-onto or merged-together that shouldn't be, that's fine — small flexibility is OK; the point is no single commit should mix unrelated work.

---

## Self-Review

**Spec coverage:** Every spec section maps to one or more tasks above:

- Spec §1 Hero → Tasks 3 (sketch), 4 (HomeHero rewrite)
- Spec §2 BuiltWithRow → Task 5
- Spec §3 ProductionIndicators → Task 6
- Spec §4 Capabilities → Task 9
- Spec §5 AIWorkflowAlgorithm → Task 10
- Spec §6 FeaturedWork (AnchorCase + grid) → Tasks 7, 8
- Spec §7 FooterCTA → Task 11
- Spec Cross-cutting: site-count consistency → Tasks 6, 7
- Spec Cross-cutting: motion + a11y → Tasks 2, 3 (animation), 14 (verification)
- Spec File-change manifest (new/modified/deleted) → Tasks 1 (Window), 12 (page.tsx wiring), 13 (deletions)

**Placeholder scan:** No `TBD`, `TODO`, "implement later", "similar to Task N", or unspecified error handling. Every code step ships the full code.

**Type consistency:** `Project.screenshot?: { src: string; alt: string }` is defined in Task 8 and consumed in Task 8 only. `Window` exported in Task 1, imported in Tasks 7 (`AnchorCase`) and 8 (`FeaturedWork`). `home2-dot-travel` keyframe defined in Task 2, consumed via `.anim-travel` class in Task 3. CTA href `#ai-workflow` defined in Task 4 (`HomeHero`) and Task 9 (Capabilities card), matches the `id` added in Task 10. No drift.

**Scope:** Single PR. ~13 commits. All under `frontend/src/components/home/`, `frontend/src/app/page.tsx`, one keyframe in `globals.css`. No route changes, no new dependencies, no `/work/*` page edits.
