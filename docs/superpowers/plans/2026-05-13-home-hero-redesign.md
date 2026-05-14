# Home Hero Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the home hero so the right-side illustration reads as a credible system snapshot (not a decorated diagram) and the left column has clean text alignment.

**Architecture:** Two scoped files. `HomeHero.tsx` keeps its grid but tightens vertical rhythm, removes a forced `<br>`, moves the meta row above the CTAs, and swaps the secondary CTA from a filled button to an inline text link. `SystemArchitectureSketch.tsx` is rebuilt from a 5-node rainbow pentagon to a 3-node asymmetric L-shape in a single accent color, with one travel pulse and an anchored "Live · 4 sites · 800+ assets · …" row inside the same card. Tests are updated to match.

**Tech Stack:** Next.js 15 App Router, React, TypeScript, Tailwind (scoped under `.home2`), lucide-react icons, vitest + React Testing Library.

**Reference:** Spec at `docs/superpowers/specs/2026-05-13-home-hero-redesign-design.md`.

---

## File Structure

**Modify:**
- `frontend/src/components/home/HomeHero.tsx` — left column text alignment
- `frontend/src/components/home/SystemArchitectureSketch.tsx` — right side diagram
- `frontend/src/components/home/HomeHero.test.tsx` — updated assertions
- `frontend/src/components/home/SystemArchitectureSketch.test.tsx` — rewritten assertions

**Create:** none.

**No CSS changes.** All tokens (`--plum`, `--green`, `ghair`, `soft-shadow-sm`, `anim-rise`, `anim-heartbeat`, `font-display`) already exist in `frontend/src/app/globals.css` under `.home2`.

---

## Task 1: Update `HomeHero.test.tsx` for new eyebrow and no forced break

**Files:**
- Modify: `frontend/src/components/home/HomeHero.test.tsx`

- [ ] **Step 1: Rewrite the test file to match the new contract**

Replace the entire file with:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { HomeHero } from './HomeHero'

describe('HomeHero', () => {
  it('renders the shortened "Applied AI · Healthcare Ops" eyebrow', () => {
    render(<HomeHero />)
    expect(screen.getByText(/applied ai · healthcare ops/i)).toBeInTheDocument()
  })

  it('renders the headline and sub-headline', () => {
    render(<HomeHero />)
    expect(
      screen.getByRole('heading', {
        name: /i build ai systems that support healthcare operations/i,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/multi-site workflows, event streams, and decision layers/i),
    ).toBeInTheDocument()
  })

  it('does not force a hard line break inside the headline', () => {
    const { container } = render(<HomeHero />)
    expect(container.querySelector('h1 br')).toBeNull()
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

- [ ] **Step 2: Run tests to verify they fail in the expected places**

Run: `cd frontend && npx vitest run src/components/home/HomeHero.test.tsx`

Expected: The "shortened eyebrow" and "no `<br>`" tests FAIL (the current component still has the long eyebrow and the `<br className="hidden sm:block" />`). The other tests pass.

- [ ] **Step 3: Commit failing tests**

```bash
git add frontend/src/components/home/HomeHero.test.tsx
git commit -m "test(home-hero): pin shortened eyebrow and no forced br"
```

---

## Task 2: Refactor `HomeHero.tsx` left column

**Files:**
- Modify: `frontend/src/components/home/HomeHero.tsx`

- [ ] **Step 1: Replace the file contents**

Overwrite `frontend/src/components/home/HomeHero.tsx` with:

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
            Applied AI · Healthcare Ops
          </span>

          <h1
            className="anim-rise mt-6 max-w-[18ch] font-display text-[2.85rem] font-extrabold leading-[1.04] text-ink sm:text-[3.4rem] lg:text-[4rem]"
            style={{ animationDelay: '60ms' }}
          >
            I build AI systems that{' '}
            <span className="grad-plum-text">support healthcare operations.</span>
          </h1>

          <p
            className="anim-rise mt-6 max-w-[46ch] text-[1.05rem] leading-relaxed text-ink-soft"
            style={{ animationDelay: '120ms' }}
          >
            Multi-site workflows, event streams, and decision layers —
            designed to ship, observed in production.
          </p>

          <p
            className="anim-rise mt-6 text-[12px] leading-relaxed text-ink-muted"
            style={{ animationDelay: '180ms' }}
          >
            Vancouver, Canada · Open to applied AI, AI systems, and operational intelligence roles ·
            Currently shipping multi-site healthcare deployment
          </p>

          <div
            className="anim-rise mt-6 flex flex-wrap items-center gap-6"
            style={{ animationDelay: '240ms' }}
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
              className="group inline-flex items-center gap-1.5 text-sm font-semibold text-ink hover:text-[var(--plum)] transition-colors"
            >
              AI workflow methodology
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Link>
          </div>
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

Changes made in this step (for reviewer reference):
- Eyebrow text shortened to `Applied AI · Healthcare Ops`.
- `<br className="hidden sm:block" />` removed from `<h1>`; replaced with `max-w-[18ch]` to let it wrap naturally.
- Status `<p>` moved above the CTA row (it sits between subhead and CTAs now).
- All `mt-9` → `mt-6` so vertical rhythm is uniform 24px.
- Secondary CTA is now an inline text link (`text-ink → plum on hover`) with a 14px arrow icon marked `aria-hidden` so the accessible name stays `"AI workflow methodology"`.
- Primary CTA unchanged in destination, copy, and styling.

- [ ] **Step 2: Run tests to verify they pass**

Run: `cd frontend && npx vitest run src/components/home/HomeHero.test.tsx`

Expected: all 6 tests PASS.

- [ ] **Step 3: Commit**

```bash
git add frontend/src/components/home/HomeHero.tsx
git commit -m "feat(home): tighten hero left column rhythm and CTA pattern"
```

---

## Task 3: Rewrite `SystemArchitectureSketch.test.tsx` for the 3-node redesign

**Files:**
- Modify: `frontend/src/components/home/SystemArchitectureSketch.test.tsx`

- [ ] **Step 1: Replace the file contents**

Overwrite the test file with:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SystemArchitectureSketch } from './SystemArchitectureSketch'

describe('SystemArchitectureSketch', () => {
  it('renders the three node titles', () => {
    render(<SystemArchitectureSketch />)
    for (const title of [
      'QR scan',
      'State + decision engine',
      'Operations surface',
    ]) {
      expect(screen.getByText(title)).toBeInTheDocument()
    }
  })

  it('renders each node caption directly under its node', () => {
    render(<SystemArchitectureSketch />)
    for (const caption of ['Clinical end', 'Lifecycle + routing', 'Dashboard · alerts']) {
      expect(screen.getByText(caption)).toBeInTheDocument()
    }
  })

  it('does not render the removed five-node titles', () => {
    render(<SystemArchitectureSketch />)
    for (const removed of ['Event stream', 'State engine', 'Decision layer', 'QR scan / Mobile']) {
      expect(screen.queryByText(removed)).toBeNull()
    }
  })

  it('does not render decorative per-edge connector labels', () => {
    render(<SystemArchitectureSketch />)
    for (const label of ['event', 'state transition', 'rule decision', 'signal', 'feedback']) {
      expect(screen.queryByText(label)).toBeNull()
    }
  })

  it('renders the anchored live deployment row with site and asset counts', () => {
    render(<SystemArchitectureSketch />)
    expect(screen.getByText(/live/i)).toBeInTheDocument()
    expect(screen.getByText(/4 sites/i)).toBeInTheDocument()
    expect(screen.getByText(/800\+ assets/i)).toBeInTheDocument()
    expect(screen.getByText(/microsoft lists \+ qr/i)).toBeInTheDocument()
  })

  it('exposes a descriptive aria-label for the diagram', () => {
    render(<SystemArchitectureSketch />)
    const img = screen.getByRole('img', { name: /scan|engine|operations|loop|cycle/i })
    expect(img).toBeInTheDocument()
  })

  it('renders exactly one travel pulse and no sonar / ack / seg-wash overlays', () => {
    const { container } = render(<SystemArchitectureSketch />)
    expect(container.querySelectorAll('.anim-heartbeat')).toHaveLength(1)
    expect(container.querySelectorAll('.anim-sonar')).toHaveLength(0)
    expect(container.querySelectorAll('.anim-ack')).toHaveLength(0)
    expect(container.querySelectorAll('.anim-seg-wash')).toHaveLength(0)
  })
})
```

- [ ] **Step 2: Run tests to verify they fail in the expected places**

Run: `cd frontend && npx vitest run src/components/home/SystemArchitectureSketch.test.tsx`

Expected: most tests FAIL — the current component still has 5 nodes, the decorative labels, the sonar/ack/seg-wash overlays, and the orphan "Wheelchair Tracking — live across…" caption (not the new anchored row).

- [ ] **Step 3: Commit failing tests**

```bash
git add frontend/src/components/home/SystemArchitectureSketch.test.tsx
git commit -m "test(home-hero): pin three-node sketch and anchored live row"
```

---

## Task 4: Rebuild `SystemArchitectureSketch.tsx`

**Files:**
- Modify: `frontend/src/components/home/SystemArchitectureSketch.tsx`

- [ ] **Step 1: Replace the file contents**

Overwrite `frontend/src/components/home/SystemArchitectureSketch.tsx` with:

```tsx
// frontend/src/components/home/SystemArchitectureSketch.tsx
import {
  ScanLine,
  GitFork,
  Gauge,
  type LucideIcon,
} from 'lucide-react'

type Node = {
  key: string
  Icon: LucideIcon
  title: string
  caption: string
  x: number
  y: number
}

const W = 480
const H = 380
const CARD_W = 132
const CARD_H = 84
const HALF_W = CARD_W / 2
const HALF_H = CARD_H / 2

const NODES: Node[] = [
  { key: 'scan',   Icon: ScanLine, title: 'QR scan',                  caption: 'Clinical end',         x: 110, y: 90  },
  { key: 'engine', Icon: GitFork,  title: 'State + decision engine',  caption: 'Lifecycle + routing',  x: 340, y: 195 },
  { key: 'ops',    Icon: Gauge,    title: 'Operations surface',       caption: 'Dashboard · alerts',   x: 140, y: 300 },
]

function edgeEndpoints(
  a: { x: number; y: number },
  b: { x: number; y: number },
) {
  const dx = b.x - a.x
  const dy = b.y - a.y
  const len = Math.hypot(dx, dy)
  const ux = dx / len
  const uy = dy / len
  // Push endpoints to the card edge, not the centre — uses an ellipse-ish offset.
  const offA = Math.min(HALF_W / Math.max(Math.abs(ux), 0.0001), HALF_H / Math.max(Math.abs(uy), 0.0001))
  const offB = offA
  return {
    x1: a.x + ux * offA,
    y1: a.y + uy * offA,
    x2: b.x - ux * offB,
    y2: b.y - uy * offB,
  }
}

const SCAN = NODES[0]
const ENGINE = NODES[1]
const OPS = NODES[2]

const FORWARD_A = edgeEndpoints(SCAN, ENGINE)
const FORWARD_B = edgeEndpoints(ENGINE, OPS)
const FEEDBACK = edgeEndpoints(OPS, SCAN)

// Travel path: scan → engine → ops → back to scan.
const TRAVEL_PATH =
  `M ${FORWARD_A.x1} ${FORWARD_A.y1} ` +
  `L ${FORWARD_A.x2} ${FORWARD_A.y2} ` +
  `M ${FORWARD_B.x1} ${FORWARD_B.y1} ` +
  `L ${FORWARD_B.x2} ${FORWARD_B.y2} ` +
  `M ${FEEDBACK.x1} ${FEEDBACK.y1} ` +
  `L ${FEEDBACK.x2} ${FEEDBACK.y2}`

export function SystemArchitectureSketch() {
  return (
    <div
      className="relative mx-auto w-full max-w-[560px] overflow-hidden rounded-2xl bg-white ghair soft-shadow-sm"
      role="img"
      aria-label="System architecture: QR scan feeds a state and decision engine, which feeds an operations surface; a quieter feedback connector returns to scan. Live across 4 hospital sites."
    >
      <div className="relative w-full" style={{ paddingBottom: `${(H / W) * 100}%` }}>
        <div className="absolute inset-0">
          <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" fill="none" aria-hidden>
            {/* Forward connectors */}
            <line
              x1={FORWARD_A.x1} y1={FORWARD_A.y1} x2={FORWARD_A.x2} y2={FORWARD_A.y2}
              stroke="var(--plum)" strokeWidth={1.5} strokeOpacity={0.45} strokeLinecap="round"
            />
            <line
              x1={FORWARD_B.x1} y1={FORWARD_B.y1} x2={FORWARD_B.x2} y2={FORWARD_B.y2}
              stroke="var(--plum)" strokeWidth={1.5} strokeOpacity={0.45} strokeLinecap="round"
            />
            {/* Feedback connector — thinner, dashed, lower opacity */}
            <line
              x1={FEEDBACK.x1} y1={FEEDBACK.y1} x2={FEEDBACK.x2} y2={FEEDBACK.y2}
              stroke="var(--plum)" strokeWidth={1} strokeOpacity={0.3} strokeDasharray="4 5" strokeLinecap="round"
            />
            {/* Single travel pulse along forward + feedback path */}
            <circle
              r={3.5}
              fill="var(--plum)"
              className="anim-heartbeat"
              style={{ offsetPath: `path('${TRAVEL_PATH}')` }}
            />
          </svg>

          {/* Node cards */}
          {NODES.map((n) => (
            <div
              key={n.key}
              className="absolute"
              style={{
                width: CARD_W,
                height: CARD_H,
                left: `${(n.x / W) * 100}%`,
                top: `${(n.y / H) * 100}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <div className="flex h-full w-full flex-col items-center justify-center gap-1 rounded-xl bg-white ghair soft-shadow-sm">
                <n.Icon size={20} style={{ color: 'var(--plum)' }} strokeWidth={1.9} aria-hidden />
                <span className="px-2 text-center font-display text-[12.5px] font-semibold leading-tight text-ink">
                  {n.title}
                </span>
                <span className="px-2 text-center text-[9.5px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
                  {n.caption}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Anchored credibility row */}
      <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 border-t border-[var(--line)] px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
        <span className="inline-flex items-center gap-1.5 text-ink-soft">
          <span className="h-2 w-2 rounded-full" style={{ background: 'var(--green)' }} aria-hidden />
          Live
        </span>
        <span aria-hidden>·</span>
        <span>4 sites</span>
        <span aria-hidden>·</span>
        <span>800+ assets</span>
        <span aria-hidden>·</span>
        <span>Microsoft Lists + QR</span>
        <span aria-hidden>·</span>
        <span>React</span>
        <span aria-hidden>·</span>
        <span>TypeScript</span>
      </div>
    </div>
  )
}
```

Notes for reviewer:
- 3 nodes only, asymmetric positions in a `480 × 380` viewBox — not a regular polygon.
- Single accent color (plum) for icons, connectors, and pulse; `--green` only for the live dot.
- No per-edge labels.
- One `anim-heartbeat` pulse traveling `scan → engine → ops → back to scan`. No `anim-sonar`, `anim-ack`, or `anim-seg-wash`.
- Diagram and credibility row share one rounded card (the outer `<div>` has `rounded-2xl bg-white ghair soft-shadow-sm` with `overflow-hidden`), so the proof anchors visually.
- The previous component's icons (`Radio`, `Database`) and `CONNECTOR_LABELS` constant are deleted; imports are slimmed accordingly.

- [ ] **Step 2: Run sketch tests to verify they pass**

Run: `cd frontend && npx vitest run src/components/home/SystemArchitectureSketch.test.tsx`

Expected: all sketch tests PASS.

- [ ] **Step 3: Commit**

```bash
git add frontend/src/components/home/SystemArchitectureSketch.tsx
git commit -m "feat(home): rebuild system sketch as 3-node monochrome L-shape with anchored live row"
```

---

## Task 5: Verify the whole picture (lint, type-check, full test suite)

**Files:** none — verification only.

- [ ] **Step 1: Run lint**

Run: `cd frontend && npm run lint`

Expected: 0 errors.

- [ ] **Step 2: Run type-check**

Run: `cd frontend && npm run type-check`

Expected: 0 errors.

- [ ] **Step 3: Run full vitest suite**

Run: `cd frontend && npx vitest run`

Expected: all suites PASS. If any other test references the old eyebrow string, the old 5-node titles, or the deleted edge labels, fix it in the same task and re-run.

- [ ] **Step 4: Visual spot-check via dev server**

Run: `cd frontend && npm run dev` (the user runs this — do not start a long-running dev server from inside the agent).

Confirm in a browser at `http://localhost:3001/`:
- Headline wraps naturally with no hard break.
- Eyebrow reads `Applied AI · Healthcare Ops`.
- Three node cards in an L-shape, plum-only.
- One traveling pulse, no sonar rings.
- "● Live · 4 sites · 800+ assets · Microsoft Lists + QR · React · TypeScript" sits inside the same card.

- [ ] **Step 5: Final commit if anything else moved**

```bash
git status
# If there are unrelated incidental fixes from lint/type-check, commit them separately.
```

---

## Self-review (already run)

- **Spec coverage:** Eyebrow shortening (T2), no forced `<br>` (T2 + T1 assertion), uniform 24px rhythm (T2), meta row moved up (T2), CTA pattern change (T2), 3-node L-shape (T4), monochrome (T4), one animation (T4), anchored credibility row (T4), test updates (T1 + T3), acceptance criteria 1–9 (T4, T2, T5). All covered.
- **Placeholder scan:** No TBD/TODO; every code block is complete file contents.
- **Type consistency:** `Node` type, `NODES` array shape, and `edgeEndpoints` signature consistent across all references in Task 4. `screen.getByText`/`queryByText` shape consistent across tests.
- **Acceptance criterion 10 (lint + type-check):** Covered by Task 5.
