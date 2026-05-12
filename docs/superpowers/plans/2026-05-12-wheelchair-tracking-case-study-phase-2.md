# Wheelchair Tracking Cathedral Case Study — Phase 2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the paper-register placeholder at `/work/wheelchair-tracking` with a 10-section cinematic cathedral case study (cold open + 5 paper pillars with surface-dark inset modules + impact + reflection + AI nodes + close), with a playable QR-scan-to-state-transition console as the centerpiece interactive.

**Architecture:** Reuse Phase 1's Dual Register token system (surface / paper / gold / signal-live) entirely — no new tokens. Components live under `frontend/src/components/work/wheelchair/`, isolated from the home shell. The page at `frontend/src/app/work/wheelchair-tracking/page.tsx` becomes a thin composition over Phase 1's reused `NavBar`. The case study grows section-by-section so each task produces visible progress in `npm run dev`. The single piece of stateful logic — `useScanState` for the ScanConsole — is the only Vitest unit-tested piece; every other component is verified by visual sweep at 375/768/1440 px.

**Tech Stack:** Next.js 14.2, React 18.3, TypeScript 5.4, Tailwind 3.4, Framer Motion 11, Geist Sans/Mono, Source Serif 4 Variable, Lucide React, Vitest 1.x, @testing-library/react 14.x. **No new dependencies.**

**Reference spec:** `docs/superpowers/specs/2026-05-12-wheelchair-tracking-case-study-design.md`

**Working directory:** `frontend/` (npm workspace). All paths below are relative to repo root unless otherwise noted. Run `npm run` commands from repo root.

---

## File map (locked in before tasks)

```
frontend/src/components/work/wheelchair/
├── index.ts                          [Task 13]   barrel
├── primitives/
│   ├── RegisterHandoff.tsx           [Task 1]
│   ├── PaperPillar.tsx               [Task 1]
│   ├── SurfaceModule.tsx             [Task 1]
│   └── index.ts                      [Task 1]
├── ColdOpen.tsx                      [Task 3]
├── PillarVisibility.tsx              [Task 4]
├── PreSystemDashboard.tsx            [Task 4]
├── PillarArchitecture.tsx            [Task 5]
├── ArchitectureDiagram.tsx           [Task 5]
├── PillarScan.tsx                    [Task 7]
├── ScanConsole/
│   ├── index.tsx                     [Task 7]
│   ├── ScannerPanel.tsx              [Task 6]
│   ├── EquipmentRecord.tsx           [Task 6]
│   ├── DistributedEffect.tsx         [Task 6]
│   └── useScanState.ts               [Task 2]
├── PillarLifecycle.tsx               [Task 8]
├── LifecycleStateMachine.tsx         [Task 8]
├── PillarCoordination.tsx            [Task 9]
├── CoordinationPanel.tsx             [Task 9]
├── ImpactGrid.tsx                    [Task 10]
├── Reflection.tsx                    [Task 11]
├── AINodes.tsx                       [Task 12]
└── CaseStudyClose.tsx                [Task 13]
```

Modified:
- `frontend/src/app/work/wheelchair-tracking/page.tsx` — updated incrementally across Tasks 3–13 as sections are added.

Test:
- `frontend/src/components/work/wheelchair/ScanConsole/useScanState.test.ts` [Task 2]

---

## Task ordering

1. Setup — folder + primitives
2. `useScanState` hook (TDD)
3. ColdOpen (§0) — first placeholder swap
4. PillarVisibility (§1)
5. PillarArchitecture (§2)
6. ScanConsole inner panels (§3 parts)
7. ScanConsole composition + PillarScan (§3 finished)
8. PillarLifecycle (§4)
9. PillarCoordination (§5)
10. ImpactGrid (§6)
11. Reflection (§7)
12. AINodes (§8)
13. CaseStudyClose (§9) + barrel
14. Final accessibility + responsive + build verification

---

### Task 1: Setup — primitives + folder

**Files:**
- Create: `frontend/src/components/work/wheelchair/primitives/RegisterHandoff.tsx`
- Create: `frontend/src/components/work/wheelchair/primitives/PaperPillar.tsx`
- Create: `frontend/src/components/work/wheelchair/primitives/SurfaceModule.tsx`
- Create: `frontend/src/components/work/wheelchair/primitives/index.ts`

**Goal:** Three reusable primitives that every later section composes with. `RegisterHandoff` is the surface↔paper transitional band with a gold hairline. `PaperPillar` wraps eyebrow + serif display + body. `SurfaceModule` is the dark-card framing wrapper used for every inset.

- [ ] **Step 1: Create the folder**

```bash
mkdir -p frontend/src/components/work/wheelchair/primitives
mkdir -p frontend/src/components/work/wheelchair/ScanConsole
```

Verify with `ls frontend/src/components/work/wheelchair`. Expected: `ScanConsole`, `primitives`.

- [ ] **Step 2: Create `RegisterHandoff.tsx`**

`frontend/src/components/work/wheelchair/primitives/RegisterHandoff.tsx`:

```tsx
import { cn } from '@/lib/utils'

type Direction = 'surface-to-paper' | 'paper-to-surface'

type Props = {
  direction: Direction
  className?: string
}

export function RegisterHandoff({ direction, className }: Props) {
  const gradient =
    direction === 'surface-to-paper'
      ? 'bg-gradient-to-b from-surface-canvas to-paper-bg'
      : 'bg-gradient-to-b from-paper-bg to-surface-canvas'

  return (
    <div
      aria-hidden="true"
      className={cn('relative h-60 w-full', gradient, className)}
    >
      <div className="absolute left-1/2 top-1/2 h-px w-40 -translate-x-1/2 -translate-y-1/2 bg-gold/60" />
    </div>
  )
}
```

- [ ] **Step 3: Create `PaperPillar.tsx`**

`frontend/src/components/work/wheelchair/primitives/PaperPillar.tsx`:

```tsx
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type Props = {
  eyebrow: string
  display: ReactNode
  children: ReactNode
  className?: string
}

export function PaperPillar({ eyebrow, display, children, className }: Props) {
  return (
    <section className={cn('bg-paper-bg text-paper-ink', className)}>
      <div className="mx-auto max-w-3xl px-6 py-20 md:py-28">
        <p className="font-mono text-[10px] uppercase tracking-wide-label text-paper-ink-soft mb-6">
          {eyebrow}
        </p>
        <h2 className="font-serif text-3xl md:text-5xl leading-[1.1] text-paper-ink max-w-[24ch] mb-8">
          {display}
        </h2>
        <div className="font-serif text-lg md:text-xl leading-[1.7] text-paper-ink space-y-5 max-w-[64ch]">
          {children}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Create `SurfaceModule.tsx`**

`frontend/src/components/work/wheelchair/primitives/SurfaceModule.tsx`:

```tsx
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type Props = {
  children: ReactNode
  caption?: string
  className?: string
  ariaLabel?: string
}

export function SurfaceModule({ children, caption, className, ariaLabel }: Props) {
  return (
    <section
      aria-label={ariaLabel}
      className={cn('bg-paper-bg', className)}
    >
      <div className="mx-auto max-w-5xl px-6 pb-20 md:pb-28">
        <div className="rounded-2xl border border-surface-subtle bg-surface-canvas overflow-hidden">
          {children}
        </div>
        {caption && (
          <p className="mt-3 font-mono text-[10px] uppercase tracking-wide-label text-paper-ink-soft text-right">
            {caption}
          </p>
        )}
      </div>
    </section>
  )
}
```

Note: `SurfaceModule`'s outer background stays `paper-bg` because surface modules embed *inside* the paper sections. This keeps the outside-of-card colour continuous with the surrounding pillar.

- [ ] **Step 5: Create the primitives barrel**

`frontend/src/components/work/wheelchair/primitives/index.ts`:

```ts
export { RegisterHandoff } from './RegisterHandoff'
export { PaperPillar } from './PaperPillar'
export { SurfaceModule } from './SurfaceModule'
```

- [ ] **Step 6: Type-check**

Run: `npm run type-check`
Expected: no errors.

- [ ] **Step 7: Commit**

```bash
git add frontend/src/components/work/wheelchair/primitives/
git commit -m "$(cat <<'EOF'
feat(case-study): primitives for wheelchair case study

RegisterHandoff (surface↔paper band with gold hairline), PaperPillar
(eyebrow + serif display + body wrapper), SurfaceModule (dark inset
card with optional caption).

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 2: `useScanState` hook (TDD)

**Files:**
- Create: `frontend/src/components/work/wheelchair/ScanConsole/useScanState.ts`
- Create: `frontend/src/components/work/wheelchair/ScanConsole/useScanState.test.ts`

**Goal:** State machine hook for the QR scan interactive. Manages: current equipment state, bounded log, in-flight scan timing, valid-transition enforcement, reduced-motion branch.

- [ ] **Step 1: Write the failing test**

`frontend/src/components/work/wheelchair/ScanConsole/useScanState.test.ts`:

```ts
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { useScanState } from './useScanState'

// Force the reduced-motion default to false unless overridden.
function mockMatchMedia(matches: boolean) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
      onchange: null,
    }),
  })
}

const config = { initialState: 'in_use' as const, siteId: 'vgh-3w', staffId: '4471' }

describe('useScanState', () => {
  beforeEach(() => {
    mockMatchMedia(false)
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.useRealTimers()
  })

  it('returns initial state with empty log', () => {
    const { result } = renderHook(() => useScanState(config))
    expect(result.current.current).toBe('in_use')
    expect(result.current.log).toEqual([])
    expect(result.current.scanInFlight).toBe(false)
  })

  it('transitions in_use → returned and appends a log entry', () => {
    const { result } = renderHook(() => useScanState(config))
    act(() => result.current.scan('returned'))
    // Scan is in-flight during the 200ms sweep
    expect(result.current.scanInFlight).toBe(true)
    act(() => vi.advanceTimersByTime(200))
    expect(result.current.current).toBe('returned')
    expect(result.current.log).toHaveLength(1)
    expect(result.current.log[0]).toMatchObject({
      from: 'in_use',
      to: 'returned',
      site: 'vgh-3w',
      staffId: '4471',
    })
    act(() => vi.advanceTimersByTime(60))
    expect(result.current.scanInFlight).toBe(false)
  })

  it('rejects disallowed transitions (in_use → cleaning is not allowed)', () => {
    const { result } = renderHook(() => useScanState(config))
    act(() => result.current.scan('cleaning'))
    // No transition occurred
    expect(result.current.current).toBe('in_use')
    expect(result.current.log).toHaveLength(0)
    expect(result.current.scanInFlight).toBe(false)
  })

  it('truncates the log to 5 most recent entries', () => {
    const { result } = renderHook(() => useScanState(config))
    const sequence = ['returned', 'needs_cleaning', 'cleaning', 'available', 'in_use', 'returned'] as const
    for (const next of sequence) {
      act(() => result.current.scan(next))
      act(() => vi.advanceTimersByTime(260))
    }
    expect(result.current.log).toHaveLength(5)
    // Newest entry first
    expect(result.current.log[0]).toMatchObject({ from: 'in_use', to: 'returned' })
  })

  it('with reduced motion, applies state change without scan-flight delay', () => {
    mockMatchMedia(true)
    const { result } = renderHook(() => useScanState(config))
    act(() => result.current.scan('returned'))
    // Reduced-motion path is synchronous: state already changed, no flight
    expect(result.current.current).toBe('returned')
    expect(result.current.scanInFlight).toBe(false)
    expect(result.current.log).toHaveLength(1)
  })

  it('reset returns to the initial state with empty log', () => {
    const { result } = renderHook(() => useScanState(config))
    act(() => result.current.scan('returned'))
    act(() => vi.advanceTimersByTime(260))
    act(() => result.current.reset())
    expect(result.current.current).toBe('in_use')
    expect(result.current.log).toEqual([])
  })
})
```

- [ ] **Step 2: Run test — expect FAIL**

```bash
cd frontend && npm run test -- useScanState && cd ..
```

Expected: failure with "Cannot find module './useScanState'" or equivalent.

- [ ] **Step 3: Implement `useScanState`**

`frontend/src/components/work/wheelchair/ScanConsole/useScanState.ts`:

```ts
import { useCallback, useRef, useState } from 'react'
import { usePrefersReducedMotion } from '@/lib/hooks/usePrefersReducedMotion'

export type EquipmentState =
  | 'in_use'
  | 'returned'
  | 'needs_cleaning'
  | 'cleaning'
  | 'available'

export type LogEntry = {
  id: string
  timestamp: string
  site: string
  from: EquipmentState
  to: EquipmentState
  staffId: string
}

type Config = {
  initialState: EquipmentState
  siteId: string
  staffId: string
}

export const TRANSITIONS: Record<EquipmentState, EquipmentState[]> = {
  in_use:         ['returned'],
  returned:       ['needs_cleaning', 'available'],
  needs_cleaning: ['cleaning'],
  cleaning:       ['available'],
  available:      ['in_use'],
}

const SCAN_SWEEP_MS = 200
const LOG_SETTLE_MS = 60
const MAX_LOG = 5

function nowHMS(): string {
  const d = new Date()
  const pad = (n: number) => n.toString().padStart(2, '0')
  return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
}

function makeId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

export function useScanState(config: Config) {
  const reducedMotion = usePrefersReducedMotion()
  const [current, setCurrent] = useState<EquipmentState>(config.initialState)
  const [log, setLog] = useState<LogEntry[]>([])
  const [scanInFlight, setScanInFlight] = useState(false)
  const flightTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const settleTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const commit = useCallback(
    (from: EquipmentState, to: EquipmentState) => {
      const entry: LogEntry = {
        id: makeId(),
        timestamp: nowHMS(),
        site: config.siteId,
        staffId: config.staffId,
        from,
        to,
      }
      setCurrent(to)
      setLog((prev) => [entry, ...prev].slice(0, MAX_LOG))
    },
    [config.siteId, config.staffId]
  )

  const scan = useCallback(
    (next: EquipmentState) => {
      const allowed = TRANSITIONS[current].includes(next)
      if (!allowed) return

      if (reducedMotion) {
        commit(current, next)
        return
      }

      setScanInFlight(true)
      if (flightTimer.current) clearTimeout(flightTimer.current)
      if (settleTimer.current) clearTimeout(settleTimer.current)

      flightTimer.current = setTimeout(() => {
        commit(current, next)
        settleTimer.current = setTimeout(() => setScanInFlight(false), LOG_SETTLE_MS)
      }, SCAN_SWEEP_MS)
    },
    [current, reducedMotion, commit]
  )

  const reset = useCallback(() => {
    if (flightTimer.current) clearTimeout(flightTimer.current)
    if (settleTimer.current) clearTimeout(settleTimer.current)
    setCurrent(config.initialState)
    setLog([])
    setScanInFlight(false)
  }, [config.initialState])

  return { current, log, scanInFlight, scan, reset, reducedMotion }
}
```

- [ ] **Step 4: Run test — expect PASS**

```bash
cd frontend && npm run test -- useScanState && cd ..
```

Expected: 6 passing tests.

- [ ] **Step 5: Commit**

```bash
git add frontend/src/components/work/wheelchair/ScanConsole/useScanState.ts frontend/src/components/work/wheelchair/ScanConsole/useScanState.test.ts
git commit -m "$(cat <<'EOF'
feat(case-study): useScanState hook for QR scan interactive

State machine + bounded log + reduced-motion branch + valid-transition
enforcement. 6 Vitest tests covering initial state, allowed/disallowed
transitions, log truncation to 5, reduced-motion synchronous path, and
reset.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 3: ColdOpen (§0) — first placeholder swap

**Files:**
- Create: `frontend/src/components/work/wheelchair/ColdOpen.tsx`
- Modify: `frontend/src/app/work/wheelchair-tracking/page.tsx`

**Goal:** Replace the placeholder with a surface-dark cold open section: headline, framed mini SystemsMap, live-status strip, mono floor caption. This is the moment the case study first appears on the route.

- [ ] **Step 1: Create `ColdOpen.tsx`**

`frontend/src/components/work/wheelchair/ColdOpen.tsx`:

```tsx
import { SystemsMap } from '@/components/home/SystemsMap'
import { LiveDot, MonoLabel } from '@/components/home/primitives'

const SITES = ['vgh', 'ubc', 'lions_gate', 'richmond'] as const

export function ColdOpen() {
  return (
    <section className="relative min-h-[100svh] bg-surface-canvas text-surface-fg overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 pt-32 pb-16 md:pt-40">
        <MonoLabel className="block text-gold">01 · healthcare workflow systems · v3.x</MonoLabel>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-12 lg:items-center">
          <div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight-display leading-[1.04] text-surface-fg max-w-[18ch]">
              A system you can't see, running across four hospitals.
            </h1>

            <ul className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
              {SITES.map((site) => (
                <li key={site} className="inline-flex items-center gap-2">
                  <LiveDot />
                  <MonoLabel className="text-surface-fg-secondary">{site} · live</MonoLabel>
                </li>
              ))}
            </ul>

            <p className="mt-10 font-mono text-[10px] uppercase tracking-wide-label text-surface-fg-muted">
              representative operational model · phase 2 case study
            </p>
          </div>

          <div className="relative aspect-square w-full max-w-md mx-auto rounded-2xl border border-surface-subtle bg-surface-card overflow-hidden">
            <SystemsMap />
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Update the page to render ColdOpen**

`frontend/src/app/work/wheelchair-tracking/page.tsx`:

```tsx
import { NavBar } from '@/components/home/NavBar'
import { ColdOpen } from '@/components/work/wheelchair/ColdOpen'

export default function Page() {
  return (
    <>
      <NavBar />
      <main className="bg-surface-canvas text-surface-fg">
        <ColdOpen />
      </main>
    </>
  )
}
```

The `PlaceholderCaseStudy` import is fully removed.

- [ ] **Step 3: Visual verification**

Run `npm run dev`. Open `http://localhost:3001/work/wheelchair-tracking`. Expected:
1. Top: NavBar with Brand wordmark + 3 mono links.
2. Below: gold mono eyebrow `01 · healthcare workflow systems · v3.x`.
3. Two-column hero on desktop: headline left, framed SystemsMap right.
4. Four `vgh · live` style entries with pulsing dots.
5. Floor caption in muted mono.

Resize to 375px wide. Expected: layout collapses to single column, SystemsMap stays framed below the headline.

- [ ] **Step 4: Type-check + commit**

```bash
npm run type-check
git add frontend/src/components/work/wheelchair/ColdOpen.tsx frontend/src/app/work/wheelchair-tracking/page.tsx
git commit -m "$(cat <<'EOF'
feat(case-study): ColdOpen §0 — swap wheelchair-tracking placeholder

Headline, framed mini SystemsMap, 4-site live status strip, mono floor
caption. Removes the Phase 1 paper-register placeholder.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 4: PillarVisibility (§1) + PreSystemDashboard inset

**Files:**
- Create: `frontend/src/components/work/wheelchair/PreSystemDashboard.tsx`
- Create: `frontend/src/components/work/wheelchair/PillarVisibility.tsx`
- Modify: `frontend/src/app/work/wheelchair-tracking/page.tsx`

**Goal:** First paper-register pillar. Includes the surface→paper register handoff at the top, two serif paragraphs, and an inset surface module rendering a deliberately broken pre-system dashboard.

- [ ] **Step 1: Create `PreSystemDashboard.tsx`**

`frontend/src/components/work/wheelchair/PreSystemDashboard.tsx`:

```tsx
import { MonoLabel } from '@/components/home/primitives'

const SITES = ['vgh', 'ubc', 'lions_gate', 'richmond'] as const

export function PreSystemDashboard() {
  return (
    <div className="p-6 md:p-8" role="img" aria-label="Pre-system state: equipment locations unknown across four hospitals">
      <div className="flex items-center justify-between mb-6">
        <MonoLabel className="text-surface-fg-secondary">operational console · pre-system</MonoLabel>
        <MonoLabel className="text-surface-fg-muted">unknown · 100%</MonoLabel>
      </div>

      <ul className="grid grid-cols-2 gap-3">
        {SITES.map((site) => (
          <li
            key={site}
            className="rounded-lg border border-surface-subtle bg-surface-card p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <MonoLabel className="text-surface-fg-secondary">{site}</MonoLabel>
              <span className="font-mono text-[10px] text-surface-fg-muted">timestamp · —</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {Array.from({ length: 6 }).map((_, i) => (
                <span
                  key={i}
                  className="inline-flex h-6 w-10 items-center justify-center rounded-md border border-surface-subtle text-surface-fg-muted font-mono text-xs"
                >
                  ?
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
```

- [ ] **Step 2: Create `PillarVisibility.tsx`**

`frontend/src/components/work/wheelchair/PillarVisibility.tsx`:

```tsx
import { RegisterHandoff, PaperPillar, SurfaceModule } from './primitives'
import { PreSystemDashboard } from './PreSystemDashboard'

export function PillarVisibility() {
  return (
    <>
      <RegisterHandoff direction="surface-to-paper" />
      <PaperPillar
        eyebrow="pillar I · visibility · 01 / 05"
        display={<>Before the system, an empty wheelchair was a small disappearance.</>}
      >
        <p>
          Across four hospitals, thousands of patient movements per week relied on equipment whose location no system could name. Retrieval was a radio call. Maintenance was a sticky note. The most expensive item in the building — the patient&apos;s time — was being spent looking for the second-most-expensive item.
        </p>
        <p>
          The interesting move wasn&apos;t the model. It was making the work observable. A logistics system that can&apos;t see itself can&apos;t improve, and most operational AI fails here, long before the algorithm — in the layer where the human and the system stop agreeing on what&apos;s true.
        </p>
      </PaperPillar>
      <SurfaceModule
        caption="pre-system state · representative"
        ariaLabel="What invisibility looks like"
      >
        <PreSystemDashboard />
      </SurfaceModule>
    </>
  )
}
```

- [ ] **Step 3: Add to page**

`frontend/src/app/work/wheelchair-tracking/page.tsx`:

```tsx
import { NavBar } from '@/components/home/NavBar'
import { ColdOpen } from '@/components/work/wheelchair/ColdOpen'
import { PillarVisibility } from '@/components/work/wheelchair/PillarVisibility'

export default function Page() {
  return (
    <>
      <NavBar />
      <main>
        <ColdOpen />
        <PillarVisibility />
      </main>
    </>
  )
}
```

Note: the outer `<main>` background class is removed because each section now declares its own register colour.

- [ ] **Step 4: Visual verification**

Run `npm run dev`. Scroll past the cold open. Expected:
1. A 240px gradient band fades surface-dark → paper-cream with a centred gold hairline.
2. Eyebrow in mono `pillar I · visibility · 01 / 05`.
3. Serif display headline in paper-ink.
4. Two serif body paragraphs at ~64ch.
5. A dark inset card with 4 site tiles each filled with `?` glyphs, captioned `pre-system state · representative` in mono on the right.

- [ ] **Step 5: Type-check + commit**

```bash
npm run type-check
git add frontend/src/components/work/wheelchair/PreSystemDashboard.tsx frontend/src/components/work/wheelchair/PillarVisibility.tsx frontend/src/app/work/wheelchair-tracking/page.tsx
git commit -m "$(cat <<'EOF'
feat(case-study): PillarVisibility §1 + PreSystemDashboard inset

First paper-register pillar with register handoff. Inset surface module
shows a deliberately broken pre-system state — sites grid with ?
glyphs and 100% unknown counter.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 5: PillarArchitecture (§2) + ArchitectureDiagram inset

**Files:**
- Create: `frontend/src/components/work/wheelchair/ArchitectureDiagram.tsx`
- Create: `frontend/src/components/work/wheelchair/PillarArchitecture.tsx`
- Modify: `frontend/src/app/work/wheelchair-tracking/page.tsx`

**Goal:** Second paper pillar. Inset is the canonical architecture diagram — actors on the left, `workflow_core` node centre, surfaces on the right, mono-labelled edges between.

- [ ] **Step 1: Create `ArchitectureDiagram.tsx`**

`frontend/src/components/work/wheelchair/ArchitectureDiagram.tsx`:

```tsx
import { MonoLabel } from '@/components/home/primitives'

const ACTORS = ['frontline_staff', 'transport', 'maintenance', 'site_coordinator']
const SURFACES = ['operational_dashboard', 'mobile_scanner', 'lifecycle_view']

export function ArchitectureDiagram() {
  return (
    <div className="p-6 md:p-10" role="img" aria-label="System architecture: actors and surfaces connected through the workflow_core registry">
      <div className="mb-6 flex items-center justify-between">
        <MonoLabel className="text-surface-fg-secondary">system architecture</MonoLabel>
        <MonoLabel className="text-surface-fg-muted">workflow_core · v3.x</MonoLabel>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8 md:gap-10 items-center">
        {/* Left actors */}
        <ul className="space-y-3">
          {ACTORS.map((a) => (
            <li
              key={a}
              className="rounded-md border border-surface-subtle bg-surface-card px-3 py-2 font-mono text-xs text-surface-fg-secondary"
            >
              {a}
            </li>
          ))}
        </ul>

        {/* Centre core */}
        <div className="flex flex-col items-center gap-3">
          <svg
            viewBox="0 0 120 120"
            className="h-32 w-32"
            aria-hidden="true"
          >
            <defs>
              <radialGradient id="ad-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="hsl(var(--accent-gold))" stopOpacity="0.4" />
                <stop offset="100%" stopColor="hsl(var(--accent-gold))" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx="60" cy="60" r="48" fill="url(#ad-glow)" />
            <circle
              cx="60"
              cy="60"
              r="22"
              fill="hsl(var(--surface-canvas))"
              stroke="hsl(var(--accent-gold) / 0.85)"
              strokeWidth="1.2"
            />
            <text
              x="60"
              y="63"
              textAnchor="middle"
              fontSize="9"
              fontFamily="var(--font-geist-mono), monospace"
              fill="hsl(var(--accent-gold))"
              letterSpacing="0.04"
            >
              workflow_core
            </text>
          </svg>
          <ul className="flex flex-col items-center gap-1 font-mono text-[10px] uppercase tracking-wide-label text-surface-fg-muted">
            <li>scan_event</li>
            <li>state_change</li>
            <li>assignment</li>
            <li>audit_trail</li>
          </ul>
        </div>

        {/* Right surfaces */}
        <ul className="space-y-3">
          {SURFACES.map((s) => (
            <li
              key={s}
              className="rounded-md border border-surface-subtle bg-surface-card px-3 py-2 font-mono text-xs text-surface-fg-secondary"
            >
              {s}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Create `PillarArchitecture.tsx`**

`frontend/src/components/work/wheelchair/PillarArchitecture.tsx`:

```tsx
import { PaperPillar, SurfaceModule } from './primitives'
import { ArchitectureDiagram } from './ArchitectureDiagram'

export function PillarArchitecture() {
  return (
    <>
      <PaperPillar
        eyebrow="pillar II · architecture · 02 / 05"
        display={<>The system isn&apos;t an app. It&apos;s a coordination surface.</>}
      >
        <p>
          Microsoft Lists holds the registry of truth — every chair, every state, every site. QR codes anchor each piece of equipment to that registry physically. Mobile scans are the workflow gesture: the moment a chair changes state in the real world is the moment the system learns about it. Dashboards are the operational lens, role-shaped: a transport coordinator sees a different surface than a maintenance lead.
        </p>
        <p>
          Choose the workflow gesture first, then the state model, then the data, then the interface. The model — if there ever is one — comes last. This is the order operational AI actually has to be built in, and it&apos;s the order most teams reverse.
        </p>
      </PaperPillar>
      <SurfaceModule
        caption="canonical architecture · representative model"
        ariaLabel="System architecture diagram"
      >
        <ArchitectureDiagram />
      </SurfaceModule>
    </>
  )
}
```

- [ ] **Step 3: Add to page**

Modify `frontend/src/app/work/wheelchair-tracking/page.tsx`:

```tsx
import { NavBar } from '@/components/home/NavBar'
import { ColdOpen } from '@/components/work/wheelchair/ColdOpen'
import { PillarVisibility } from '@/components/work/wheelchair/PillarVisibility'
import { PillarArchitecture } from '@/components/work/wheelchair/PillarArchitecture'

export default function Page() {
  return (
    <>
      <NavBar />
      <main>
        <ColdOpen />
        <PillarVisibility />
        <PillarArchitecture />
      </main>
    </>
  )
}
```

- [ ] **Step 4: Visual verification**

Run `npm run dev`. Scroll to §2. Expected:
1. No register handoff at the top — PillarArchitecture continues the paper-bg from PillarVisibility.
2. Eyebrow + serif headline + 2 body paragraphs.
3. Inset card shows 4 actor pills (left), gold-bordered workflow_core circle (centre), 3 surface pills (right), with 4 mono edge-label tokens beneath the core node.

- [ ] **Step 5: Type-check + commit**

```bash
npm run type-check
git add frontend/src/components/work/wheelchair/ArchitectureDiagram.tsx frontend/src/components/work/wheelchair/PillarArchitecture.tsx frontend/src/app/work/wheelchair-tracking/page.tsx
git commit -m "$(cat <<'EOF'
feat(case-study): PillarArchitecture §2 + ArchitectureDiagram

Second paper pillar with canonical architecture diagram inset: actors
on left, gold-bordered workflow_core centre, surfaces on right, with
four mono edge-label tokens.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 6: ScanConsole inner panels (ScannerPanel + EquipmentRecord + DistributedEffect)

**Files:**
- Create: `frontend/src/components/work/wheelchair/ScanConsole/ScannerPanel.tsx`
- Create: `frontend/src/components/work/wheelchair/ScanConsole/EquipmentRecord.tsx`
- Create: `frontend/src/components/work/wheelchair/ScanConsole/DistributedEffect.tsx`

**Goal:** The three inner panels of the ScanConsole. Each is a presentation component that consumes props from the outer composition (built in Task 7). No state lives here — state lives in `useScanState`.

- [ ] **Step 1: Create `ScannerPanel.tsx`**

`frontend/src/components/work/wheelchair/ScanConsole/ScannerPanel.tsx`:

```tsx
'use client'

import { motion, AnimatePresence } from 'framer-motion'
import type { EquipmentState } from './useScanState'
import { MonoLabel } from '@/components/home/primitives'
import { cn } from '@/lib/utils'

const CHIPS: EquipmentState[] = ['in_use', 'returned', 'needs_cleaning', 'cleaning', 'available']

type Props = {
  current: EquipmentState
  scanInFlight: boolean
  reducedMotion: boolean
  allowed: EquipmentState[]
  onScan: (next: EquipmentState) => void
}

export function ScannerPanel({ current, scanInFlight, reducedMotion, allowed, onScan }: Props) {
  return (
    <div className="flex flex-col p-5 md:p-6 border-r border-surface-subtle">
      <MonoLabel className="block mb-4 text-surface-fg-secondary">scanner · vgh-3w</MonoLabel>

      <div className="relative mx-auto w-full max-w-[220px] aspect-[9/16] rounded-2xl bg-surface-elevated border border-surface-subtle overflow-hidden">
        <div className="absolute inset-3 rounded-xl border border-surface-strong/40 bg-surface-canvas flex flex-col items-center justify-center">
          {/* QR mock */}
          <div
            aria-hidden="true"
            className="grid grid-cols-5 grid-rows-5 gap-[2px] w-24 h-24 p-2 bg-white"
          >
            {Array.from({ length: 25 }).map((_, i) => (
              <span
                key={i}
                className={cn(
                  'block',
                  // Pseudo-random pattern — deterministic, no Math.random in render
                  [0,2,3,5,8,11,12,14,17,20,22,24].includes(i) ? 'bg-black' : 'bg-white'
                )}
              />
            ))}
          </div>
          <p className="mt-3 font-mono text-[10px] text-surface-fg-secondary">EQ-VGH-0287</p>

          {/* Scan-sweep line */}
          <AnimatePresence>
            {scanInFlight && !reducedMotion && (
              <motion.span
                key="sweep"
                aria-hidden="true"
                initial={{ top: '12%', opacity: 0 }}
                animate={{ top: '88%', opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: 'linear' }}
                className="absolute left-3 right-3 h-px bg-gold shadow-[0_0_12px_rgba(199,157,106,0.8)]"
              />
            )}
          </AnimatePresence>
        </div>
      </div>

      <p className="mt-5 mb-2 font-mono text-[10px] uppercase tracking-wide-label text-surface-fg-muted">
        scan to next state
      </p>
      <div className="grid grid-cols-2 gap-2">
        {CHIPS.map((chip) => {
          const isAllowed = allowed.includes(chip)
          const isCurrent = chip === current
          return (
            <button
              key={chip}
              type="button"
              disabled={!isAllowed || isCurrent}
              aria-disabled={!isAllowed || isCurrent}
              aria-label={`Scan to state ${chip.replace('_', ' ')}`}
              onClick={() => onScan(chip)}
              className={cn(
                'rounded-md border px-2.5 py-1.5 font-mono text-[11px] text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2',
                isCurrent
                  ? 'border-gold/40 bg-gold/10 text-gold'
                  : isAllowed
                    ? 'border-surface-subtle bg-surface-card text-surface-fg hover:border-gold/30 hover:text-gold'
                    : 'border-surface-subtle bg-surface-canvas text-surface-fg-muted cursor-not-allowed'
              )}
            >
              {chip}
            </button>
          )
        })}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Create `EquipmentRecord.tsx`**

`frontend/src/components/work/wheelchair/ScanConsole/EquipmentRecord.tsx`:

```tsx
'use client'

import { motion, AnimatePresence } from 'framer-motion'
import type { EquipmentState, LogEntry } from './useScanState'
import { MonoLabel } from '@/components/home/primitives'
import { cn } from '@/lib/utils'

const STATE_COLOR: Record<EquipmentState, string> = {
  in_use:         'border-gold/40 bg-gold/10 text-gold',
  returned:       'border-surface-strong bg-surface-elevated text-surface-fg',
  needs_cleaning: 'border-yellow-500/30 bg-yellow-500/10 text-yellow-400',
  cleaning:       'border-blue-500/30 bg-blue-500/10 text-blue-300',
  available:      'border-signal-live/40 bg-signal-live/10 text-signal-live',
}

const STATE_LABEL: Record<EquipmentState, string> = {
  in_use:         'in use',
  returned:       'returned',
  needs_cleaning: 'needs cleaning',
  cleaning:       'cleaning',
  available:      'available',
}

type Props = {
  current: EquipmentState
  log: LogEntry[]
  reducedMotion: boolean
}

export function EquipmentRecord({ current, log, reducedMotion }: Props) {
  return (
    <div className="flex flex-col p-5 md:p-6 border-r border-surface-subtle">
      <MonoLabel className="block mb-4 text-surface-fg-secondary">equipment record</MonoLabel>

      <div className="rounded-lg border border-surface-subtle bg-surface-card p-4">
        <div className="font-mono text-sm text-surface-fg">EQ-VGH-0287</div>
        <div className="mt-1 text-xs text-surface-fg-secondary">Sunrise Quickie 2</div>
        <div className="mt-1 font-mono text-[10px] text-surface-fg-muted">Site: VGH · Floor 3W</div>

        <div className="mt-4">
          <MonoLabel className="block mb-1.5 text-surface-fg-muted">current state</MonoLabel>
          <AnimatePresence mode="wait">
            <motion.span
              key={current}
              initial={reducedMotion ? false : { opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className={cn(
                'inline-flex items-center rounded-full border px-2.5 py-1 font-mono text-[11px]',
                STATE_COLOR[current]
              )}
            >
              {STATE_LABEL[current]}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      <MonoLabel className="mt-5 mb-2 block text-surface-fg-muted">event log · last 5</MonoLabel>
      <ul className="space-y-1.5 min-h-[120px]">
        <AnimatePresence initial={false}>
          {log.map((entry) => (
            <motion.li
              key={entry.id}
              initial={reducedMotion ? false : { opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.06 }}
              className="font-mono text-[10px] text-surface-fg-secondary"
            >
              {entry.timestamp} · scan @ {entry.site} · {entry.from} → {entry.to} · staff {entry.staffId}
            </motion.li>
          ))}
        </AnimatePresence>
        {log.length === 0 && (
          <li className="font-mono text-[10px] text-surface-fg-muted">
            no events · scan to begin
          </li>
        )}
      </ul>
    </div>
  )
}
```

- [ ] **Step 3: Create `DistributedEffect.tsx`**

`frontend/src/components/work/wheelchair/ScanConsole/DistributedEffect.tsx`:

```tsx
'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { MonoLabel } from '@/components/home/primitives'

type SiteNode = { id: string; label: string; x: number; y: number; available: number }

const SITES: SiteNode[] = [
  { id: 'vgh',        label: 'vgh',        x: 22, y: 26, available: 187 },
  { id: 'ubc',        label: 'ubc',        x: 78, y: 26, available: 162 },
  { id: 'lions_gate', label: 'lions_gate', x: 22, y: 74, available: 144 },
  { id: 'richmond',   label: 'richmond',   x: 78, y: 74, available: 138 },
]

type Props = {
  scanInFlight: boolean
  reducedMotion: boolean
  activeSite: string
  vghAvailable: number
}

export function DistributedEffect({ scanInFlight, reducedMotion, activeSite, vghAvailable }: Props) {
  const source = SITES.find((s) => s.id === activeSite) ?? SITES[0]

  return (
    <div className="flex flex-col p-5 md:p-6">
      <MonoLabel className="block mb-4 text-surface-fg-secondary">distributed effect</MonoLabel>

      <div className="relative aspect-square w-full max-w-[260px] mx-auto">
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
          {/* Edges from each site to centre */}
          {SITES.map((s) => (
            <line
              key={s.id}
              x1={s.x} y1={s.y} x2={50} y2={50}
              stroke="rgba(255,255,255,0.10)"
              strokeWidth={0.25}
              strokeDasharray="0.8 0.8"
            />
          ))}

          {/* Centre core */}
          <circle cx="50" cy="50" r="2.4" fill="hsl(var(--surface-canvas))" stroke="hsl(var(--accent-gold) / 0.75)" strokeWidth="0.35" />
          <text x="53" y="50.6" fontSize="1.5" fontFamily="var(--font-geist-mono), monospace" fill="hsl(var(--accent-gold))">
            workflow_core
          </text>

          {/* Site nodes */}
          {SITES.map((s) => (
            <g key={s.id}>
              <circle
                cx={s.x} cy={s.y} r="1.5"
                fill="hsl(var(--surface-canvas))"
                stroke="rgba(170,176,191,0.5)"
                strokeWidth="0.22"
              />
              <text
                x={s.x + 2.2} y={s.y + 0.6}
                fontSize="1.4"
                fontFamily="var(--font-geist-mono), monospace"
                fill="rgba(170,176,191,0.7)"
              >
                {s.label}
              </text>
            </g>
          ))}

          {/* Fire dot from source → core */}
          <AnimatePresence>
            {scanInFlight && !reducedMotion && (
              <motion.circle
                key="fire"
                r="0.9"
                fill="hsl(var(--accent-gold))"
                initial={{ cx: source.x, cy: source.y, opacity: 1 }}
                animate={{ cx: 50, cy: 50 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
              />
            )}
          </AnimatePresence>

          {/* Ripple on peer nodes after dot lands */}
          <AnimatePresence>
            {scanInFlight && !reducedMotion && SITES.filter((s) => s.id !== source.id).map((s) => (
              <motion.circle
                key={`ripple-${s.id}`}
                cx={s.x} cy={s.y}
                fill="none"
                stroke="hsl(var(--accent-gold) / 0.6)"
                strokeWidth={0.2}
                initial={{ r: 1.5, opacity: 0 }}
                animate={{ r: 3.2, opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.35, ease: 'easeOut' }}
                exit={{ opacity: 0 }}
              />
            ))}
          </AnimatePresence>
        </svg>
      </div>

      <MonoLabel className="mt-4 mb-1 block text-surface-fg-muted">site available · live</MonoLabel>
      <ul className="grid grid-cols-2 gap-x-3 gap-y-1">
        {SITES.map((s) => (
          <li key={s.id} className="flex items-center justify-between font-mono text-[11px]">
            <span className="text-surface-fg-secondary">{s.label}</span>
            <span className="text-surface-fg">
              {s.id === 'vgh' ? vghAvailable : s.available}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
```

- [ ] **Step 4: Type-check (don't render yet — Task 7 wires these together)**

```bash
npm run type-check
```

Expected: no errors. The components compile even though nothing renders them yet — `useScanState` exports `EquipmentState` and `LogEntry`, which they import.

- [ ] **Step 5: Commit**

```bash
git add frontend/src/components/work/wheelchair/ScanConsole/ScannerPanel.tsx frontend/src/components/work/wheelchair/ScanConsole/EquipmentRecord.tsx frontend/src/components/work/wheelchair/ScanConsole/DistributedEffect.tsx
git commit -m "$(cat <<'EOF'
feat(case-study): ScanConsole inner panels

ScannerPanel (QR mock + scan-sweep line + state chips with disabled
state for invalid transitions), EquipmentRecord (record card + state
pill crossfade + 5-entry event log with slide-up), DistributedEffect
(topology with gold dot fire + peer-node ripple + live site counts).
Reduced-motion branches handled per panel.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 7: ScanConsole composition + PillarScan (§3)

**Files:**
- Create: `frontend/src/components/work/wheelchair/ScanConsole/index.tsx`
- Create: `frontend/src/components/work/wheelchair/PillarScan.tsx`
- Modify: `frontend/src/app/work/wheelchair-tracking/page.tsx`

**Goal:** Wire the hook to the three panels, add the `aria-live` announcer, expose `<ScanConsole />`, and integrate as §3.

- [ ] **Step 1: Create `ScanConsole/index.tsx`**

`frontend/src/components/work/wheelchair/ScanConsole/index.tsx`:

```tsx
'use client'

import { useMemo } from 'react'
import { ScannerPanel } from './ScannerPanel'
import { EquipmentRecord } from './EquipmentRecord'
import { DistributedEffect } from './DistributedEffect'
import { useScanState, TRANSITIONS, type EquipmentState } from './useScanState'

const STATE_SENTENCE: Record<EquipmentState, string> = {
  in_use:         'in use',
  returned:       'returned',
  needs_cleaning: 'needs cleaning',
  cleaning:       'cleaning',
  available:      'available',
}

const VGH_BASE_AVAILABLE = 187

export function ScanConsole() {
  const state = useScanState({ initialState: 'in_use', siteId: 'vgh-3w', staffId: '4471' })
  const allowed = TRANSITIONS[state.current]

  // Derive a live VGH-available count from the log. Decrement on (any → in_use),
  // increment on (in_use → returned). Other transitions don't move the available pool.
  const vghAvailable = useMemo(() => {
    let n = VGH_BASE_AVAILABLE
    // log is newest-first; iterate oldest-first
    for (const e of [...state.log].reverse()) {
      if (e.to === 'in_use') n -= 1
      else if (e.from === 'in_use' && e.to === 'returned') n += 1
    }
    return n
  }, [state.log])

  return (
    <div className="grid grid-cols-1 md:grid-cols-3">
      <ScannerPanel
        current={state.current}
        scanInFlight={state.scanInFlight}
        reducedMotion={state.reducedMotion}
        allowed={allowed}
        onScan={state.scan}
      />
      <EquipmentRecord
        current={state.current}
        log={state.log}
        reducedMotion={state.reducedMotion}
      />
      <DistributedEffect
        scanInFlight={state.scanInFlight}
        reducedMotion={state.reducedMotion}
        activeSite="vgh"
        vghAvailable={vghAvailable}
      />
      <div className="sr-only" role="status" aria-live="polite">
        {`Equipment EQ-VGH-0287, state ${STATE_SENTENCE[state.current]}.`}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Create `PillarScan.tsx`**

`frontend/src/components/work/wheelchair/PillarScan.tsx`:

```tsx
import { PaperPillar, SurfaceModule } from './primitives'
import { ScanConsole } from './ScanConsole'

export function PillarScan() {
  return (
    <>
      <PaperPillar
        eyebrow="pillar III · the scan · 03 / 05"
        display={<>The scan is the architecture.</>}
      >
        <p>
          The QR sticker isn&apos;t the system, and neither is the camera. The system is the agreement that <em>when a chair is scanned, the registry becomes true.</em> Every other surface — the dashboard, the audit trail, the maintenance flag — reads downstream from that one event. Try it.
        </p>
      </PaperPillar>
      <SurfaceModule
        caption="interactive prototype · representative state model · workflow_core v3.x"
        ariaLabel="Interactive QR scan to state change console"
      >
        <ScanConsole />
      </SurfaceModule>
    </>
  )
}
```

- [ ] **Step 3: Add to page**

`frontend/src/app/work/wheelchair-tracking/page.tsx`:

```tsx
import { NavBar } from '@/components/home/NavBar'
import { ColdOpen } from '@/components/work/wheelchair/ColdOpen'
import { PillarVisibility } from '@/components/work/wheelchair/PillarVisibility'
import { PillarArchitecture } from '@/components/work/wheelchair/PillarArchitecture'
import { PillarScan } from '@/components/work/wheelchair/PillarScan'

export default function Page() {
  return (
    <>
      <NavBar />
      <main>
        <ColdOpen />
        <PillarVisibility />
        <PillarArchitecture />
        <PillarScan />
      </main>
    </>
  )
}
```

- [ ] **Step 4: Visual + interaction verification**

Run `npm run dev`. Scroll to §3. Expected:
1. Paper pillar with serif headline *"The scan is the architecture."* and 1 body paragraph.
2. Below: surface-dark 3-column inset.
3. **Left:** QR mock + 5 state chips. `in_use` chip is highlighted as current (gold). The `returned` chip is enabled; others are disabled (muted, not clickable).
4. **Centre:** record card with `in_use` pill. Event log shows "no events · scan to begin."
5. **Right:** topology with workflow_core + 4 sites. Site counts visible below.
6. **Click `returned`:** gold scan line sweeps the QR (200ms); gold dot fires from VGH → centre core (400ms); three peer-node ripples; record card pill crossfades to `returned`; log row appends. Total ≤600ms.
7. **Continue clicking** through `needs_cleaning → cleaning → available → in_use → returned`. Verify the loop works.
8. After 6 scans, the log holds only the 5 most recent.

Now enable Reduce Motion in macOS Accessibility settings. Reload. Expected: chip clicks change state instantly, no sweep, no fire dot, no slide-up — but the state still changes, the log still appends, and the announcer still fires.

Keyboard test: tab to the first enabled chip. Press Enter. Expected: same behaviour as click; focus ring visible.

- [ ] **Step 5: Type-check + commit**

```bash
npm run type-check
git add frontend/src/components/work/wheelchair/ScanConsole/index.tsx frontend/src/components/work/wheelchair/PillarScan.tsx frontend/src/app/work/wheelchair-tracking/page.tsx
git commit -m "$(cat <<'EOF'
feat(case-study): ScanConsole composition + PillarScan §3

Wires useScanState to ScannerPanel / EquipmentRecord / DistributedEffect.
Derives VGH-available count from log transitions. aria-live="polite"
announcer reports state changes. PillarScan integrates as §3.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 8: PillarLifecycle (§4) + LifecycleStateMachine

**Files:**
- Create: `frontend/src/components/work/wheelchair/LifecycleStateMachine.tsx`
- Create: `frontend/src/components/work/wheelchair/PillarLifecycle.tsx`
- Modify: `frontend/src/app/work/wheelchair-tracking/page.tsx`

**Goal:** Fourth paper pillar. Inset: horizontal state graph with count badges, dominant edge in gold with traversing dot, dwell-time histogram beneath.

- [ ] **Step 1: Create `LifecycleStateMachine.tsx`**

`frontend/src/components/work/wheelchair/LifecycleStateMachine.tsx`:

```tsx
'use client'

import { motion } from 'framer-motion'
import { useInViewPause } from '@/lib/hooks/useInViewPause'
import { usePrefersReducedMotion } from '@/lib/hooks/usePrefersReducedMotion'
import { MonoLabel } from '@/components/home/primitives'

type Node = { id: string; label: string; count: number; x: number; isBranch?: boolean }

const NODES: Node[] = [
  { id: 'available',      label: 'available',      count: 187, x: 8 },
  { id: 'in_use',         label: 'in_use',         count: 134, x: 26 },
  { id: 'returned',       label: 'returned',       count: 0,   x: 44 },
  { id: 'needs_cleaning', label: 'needs_cleaning', count: 0,   x: 62 },
  { id: 'cleaning',       label: 'cleaning',       count: 24,  x: 80 },
  { id: 'maintenance',    label: 'maintenance',    count: 11,  x: 50, isBranch: true },
  { id: 'out_of_service', label: 'out_of_service', count: 6,   x: 80, isBranch: true },
]

const DWELL = [
  { state: 'available',      min: 14 },
  { state: 'in_use',         min: 92 },
  { state: 'returned',       min: 7 },
  { state: 'needs_cleaning', min: 28 },
  { state: 'cleaning',       min: 38 },
  { state: 'maintenance',    min: 360 },
]

const MAX_DWELL = 360

export function LifecycleStateMachine() {
  const reduced = usePrefersReducedMotion()
  const { ref, inView } = useInViewPause<HTMLDivElement>()
  const animate = !reduced && inView

  return (
    <div ref={ref} className="p-6 md:p-10" role="img" aria-label="Equipment lifecycle state machine across 30 days">
      <div className="mb-6 flex items-center justify-between">
        <MonoLabel className="text-surface-fg-secondary">equipment lifecycle</MonoLabel>
        <MonoLabel className="text-surface-fg-muted">30-day distribution · representative</MonoLabel>
      </div>

      {/* State graph */}
      <svg viewBox="0 0 100 50" className="w-full h-auto" aria-hidden="true">
        {/* Main flow edges */}
        {[
          [8, 26], [26, 44], [44, 62], [62, 80], // available→in_use→returned→needs_cleaning→cleaning
        ].map(([x1, x2], i) => {
          const isDominant = x1 === 26 && x2 === 44 // in_use → returned
          return (
            <line
              key={i}
              x1={x1 + 2} y1={20} x2={x2 - 2} y2={20}
              stroke={isDominant ? 'hsl(var(--accent-gold) / 0.7)' : 'rgba(255,255,255,0.18)'}
              strokeWidth={isDominant ? 0.35 : 0.25}
            />
          )
        })}
        {/* cleaning → available loop-back arc */}
        <path
          d="M 80 17 Q 50 5 8 17"
          fill="none"
          stroke="rgba(255,255,255,0.18)"
          strokeWidth={0.22}
          strokeDasharray="0.8 0.8"
        />
        {/* Branches to maintenance and out_of_service */}
        <line x1={44} y1={22} x2={50} y2={38} stroke="rgba(255,255,255,0.14)" strokeWidth={0.22} strokeDasharray="0.6 0.6" />
        <line x1={50} y1={40} x2={80} y2={40} stroke="rgba(255,255,255,0.14)" strokeWidth={0.22} strokeDasharray="0.6 0.6" />

        {/* Dominant edge traversing dot */}
        {animate && (
          <motion.circle
            r="0.7"
            fill="hsl(var(--accent-gold))"
            initial={{ cx: 28, cy: 20 }}
            animate={{ cx: 42, cy: 20 }}
            transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
          />
        )}

        {/* Nodes */}
        {NODES.map((n) => (
          <g key={n.id}>
            <circle
              cx={n.x} cy={n.isBranch ? 40 : 20} r={1.4}
              fill="hsl(var(--surface-canvas))"
              stroke="rgba(255,255,255,0.32)"
              strokeWidth={0.22}
            />
            <text
              x={n.x} y={n.isBranch ? 45 : 25}
              fontSize="1.5"
              textAnchor="middle"
              fontFamily="var(--font-geist-mono), monospace"
              fill="rgba(170,176,191,0.8)"
            >
              {n.label} · {n.count}
            </text>
          </g>
        ))}
      </svg>

      {/* Dwell-time histogram */}
      <div className="mt-6">
        <MonoLabel className="block mb-3 text-surface-fg-muted">median dwell time per state · minutes</MonoLabel>
        <ul className="grid grid-cols-6 gap-2">
          {DWELL.map((d) => (
            <li key={d.state} className="flex flex-col items-start">
              <div className="relative w-full h-16 rounded-sm bg-surface-card overflow-hidden">
                <div
                  className="absolute bottom-0 left-0 right-0 bg-gold/60"
                  style={{ height: `${(d.min / MAX_DWELL) * 100}%` }}
                />
              </div>
              <span className="mt-1 font-mono text-[9px] text-surface-fg-muted truncate w-full">{d.state}</span>
              <span className="font-mono text-[10px] text-surface-fg">{d.min}m</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Create `PillarLifecycle.tsx`**

`frontend/src/components/work/wheelchair/PillarLifecycle.tsx`:

```tsx
import { PaperPillar, SurfaceModule } from './primitives'
import { LifecycleStateMachine } from './LifecycleStateMachine'

export function PillarLifecycle() {
  return (
    <>
      <PaperPillar
        eyebrow="pillar IV · lifecycle · 04 / 05"
        display={<>Equipment isn&apos;t inventory. It&apos;s a lifecycle.</>}
      >
        <p>
          A chair moves through phases — in use, returned, soiled, cleaned, inspected, maintained, retired. Without a state model, the operational view collapses into a binary: <em>here</em> or <em>missing</em>. With one, the system has memory: it knows what each chair has been through, what&apos;s overdue, what&apos;s likely to break.
        </p>
        <p>
          States are how you give a system memory. Without them, every shift starts cold and every coordinator is guessing.
        </p>
      </PaperPillar>
      <SurfaceModule
        caption="30-day distribution · representative figures"
        ariaLabel="Equipment lifecycle state machine"
      >
        <LifecycleStateMachine />
      </SurfaceModule>
    </>
  )
}
```

- [ ] **Step 3: Add to page**

Update `frontend/src/app/work/wheelchair-tracking/page.tsx` — insert `<PillarLifecycle />` after `<PillarScan />`. Import accordingly.

- [ ] **Step 4: Visual verification**

Run `npm run dev`. Scroll to §4. Expected:
1. Paper pillar with display *"Equipment isn't inventory. It's a lifecycle."*
2. Inset dark module: horizontal state graph with 5 main-flow nodes + 2 branch nodes. Gold edge between `in_use` and `returned`. A dot slowly traverses that edge on a 4s cycle (reverse mode = 8s round trip).
3. Beneath the graph: 6-bar histogram in muted-gold, with state labels in mono.
4. Enable Reduce Motion: dot stops moving (verify via DevTools or system pref).

- [ ] **Step 5: Type-check + commit**

```bash
npm run type-check
git add frontend/src/components/work/wheelchair/LifecycleStateMachine.tsx frontend/src/components/work/wheelchair/PillarLifecycle.tsx frontend/src/app/work/wheelchair-tracking/page.tsx
git commit -m "$(cat <<'EOF'
feat(case-study): PillarLifecycle §4 + LifecycleStateMachine

Horizontal state graph with 5 main-flow nodes + maintenance and
out-of-service branches. Gold dot traverses the in_use→returned
dominant edge (paused when offscreen or reduced motion). Dwell-time
histogram beneath in mono.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 9: PillarCoordination (§5) + CoordinationPanel

**Files:**
- Create: `frontend/src/components/work/wheelchair/CoordinationPanel.tsx`
- Create: `frontend/src/components/work/wheelchair/PillarCoordination.tsx`
- Modify: `frontend/src/app/work/wheelchair-tracking/page.tsx`

**Goal:** Fifth paper pillar. Inset is a split surface module — left ~60% an operational dashboard with 4 hospital tiles; right ~40% a phone mock showing the transport coordinator's mobile workflow.

- [ ] **Step 1: Create `CoordinationPanel.tsx`**

`frontend/src/components/work/wheelchair/CoordinationPanel.tsx`:

```tsx
import { ArrowRight, ChevronRight, Scan, Check } from 'lucide-react'
import { LiveDot, MonoLabel } from '@/components/home/primitives'

type SiteTile = { id: string; name: string; available: number; inUse: number }

const SITES: SiteTile[] = [
  { id: 'vgh',        name: 'VGH',         available: 187, inUse: 134 },
  { id: 'ubc',        name: 'UBC',         available: 162, inUse: 119 },
  { id: 'lions_gate', name: 'Lions Gate',  available: 144, inUse: 102 },
  { id: 'richmond',   name: 'Richmond',    available: 138, inUse: 96  },
]

export function CoordinationPanel() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr]">
      {/* Left: operational dashboard */}
      <div className="p-5 md:p-8 border-b md:border-b-0 md:border-r border-surface-subtle">
        <div className="mb-5 flex items-center justify-between">
          <MonoLabel className="text-surface-fg-secondary">multi-site operations</MonoLabel>
          <span className="inline-flex items-center gap-2">
            <LiveDot pulse={false} />
            <MonoLabel className="text-gold">all sites · live</MonoLabel>
          </span>
        </div>

        <ul className="grid grid-cols-2 gap-3">
          {SITES.map((s) => (
            <li key={s.id} className="rounded-lg border border-surface-subtle bg-surface-card p-4 hover:border-gold/30 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-surface-fg">{s.name}</span>
                <LiveDot pulse={false} />
              </div>
              <dl className="grid grid-cols-2 gap-y-1.5 gap-x-4">
                <dt className="font-mono text-[10px] uppercase tracking-wide-label text-surface-fg-muted">available</dt>
                <dd className="font-mono text-sm text-surface-fg text-right">{s.available}</dd>
                <dt className="font-mono text-[10px] uppercase tracking-wide-label text-surface-fg-muted">in use</dt>
                <dd className="font-mono text-sm text-surface-fg-secondary text-right">{s.inUse}</dd>
              </dl>
            </li>
          ))}
        </ul>

        <p className="mt-5 font-mono text-[10px] uppercase tracking-wide-label text-surface-fg-muted">
          shared registry · same state, different surfaces per role
        </p>
      </div>

      {/* Right: phone mock — mobile workflow */}
      <div className="p-5 md:p-8 bg-surface-elevated/40">
        <MonoLabel className="block mb-4 text-surface-fg-secondary">mobile workflow · transport coordinator</MonoLabel>

        <div className="mx-auto w-full max-w-[260px] rounded-[28px] border border-surface-strong/60 bg-surface-canvas p-3 shadow-[0_0_40px_rgba(0,0,0,0.4)]">
          <div className="rounded-[20px] bg-surface-card p-4">
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-[10px] text-surface-fg-muted">14:32</span>
              <MonoLabel className="text-gold">role · transport</MonoLabel>
            </div>

            <div className="rounded-lg border border-surface-subtle bg-surface-canvas p-3 mb-3">
              <div className="font-mono text-xs text-surface-fg">EQ-VGH-0287</div>
              <div className="text-[11px] text-surface-fg-secondary mt-0.5">Sunrise Quickie 2</div>
              <div className="font-mono text-[10px] text-surface-fg-muted mt-0.5">VGH · Floor 3W</div>
              <span className="mt-2 inline-flex items-center rounded-full border border-gold/40 bg-gold/10 px-2 py-0.5 font-mono text-[10px] text-gold">
                in use
              </span>
            </div>

            <button
              type="button"
              className="w-full mb-2 inline-flex items-center justify-between rounded-md border border-surface-strong/60 bg-surface-elevated px-3 py-2 text-xs text-surface-fg hover:border-gold/30 transition-colors"
            >
              <span className="inline-flex items-center gap-2">
                <ArrowRight className="h-3.5 w-3.5" />
                Transfer to UBC
              </span>
              <ChevronRight className="h-3.5 w-3.5 text-surface-fg-muted" />
            </button>

            <button
              type="button"
              className="w-full mb-2 inline-flex items-center justify-between rounded-md border border-surface-subtle bg-surface-card px-3 py-2 text-xs text-surface-fg-secondary hover:border-gold/30 hover:text-surface-fg transition-colors"
            >
              <span className="inline-flex items-center gap-2">
                <Scan className="h-3.5 w-3.5" />
                Scan return
              </span>
              <ChevronRight className="h-3.5 w-3.5 text-surface-fg-muted" />
            </button>

            <button
              type="button"
              className="w-full inline-flex items-center justify-between rounded-md border border-signal-live/40 bg-signal-live/10 px-3 py-2 text-xs text-signal-live"
            >
              <span className="inline-flex items-center gap-2">
                <Check className="h-3.5 w-3.5" />
                Confirm handoff
              </span>
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <p className="mt-4 font-mono text-[10px] uppercase tracking-wide-label text-surface-fg-muted text-center">
          maintenance lead's view would surface different actions
        </p>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Create `PillarCoordination.tsx`**

`frontend/src/components/work/wheelchair/PillarCoordination.tsx`:

```tsx
import { PaperPillar, SurfaceModule } from './primitives'
import { CoordinationPanel } from './CoordinationPanel'

export function PillarCoordination() {
  return (
    <>
      <PaperPillar
        eyebrow="pillar V · coordination · 05 / 05"
        display={<>Four hospitals, one operational state.</>}
      >
        <p>
          Equipment moves between sites — patient transfers, staff rotations, reallocation during demand spikes. Without a shared registry, four hospitals diverge within days into four incompatible truths. With one, a transport coordinator at Lions Gate knows what&apos;s available at Richmond before she picks up the phone.
        </p>
        <p>
          The hard work isn&apos;t making four sites use the same software. It&apos;s making them agree on the same state, while letting each site&apos;s surface be shaped to its own rhythm.
        </p>
      </PaperPillar>
      <SurfaceModule
        caption="multi-site operational console · representative model"
        ariaLabel="Sites coordination panel with desktop dashboard and mobile workflow"
      >
        <CoordinationPanel />
      </SurfaceModule>
    </>
  )
}
```

- [ ] **Step 3: Add to page**

Update page: insert `<PillarCoordination />` after `<PillarLifecycle />`.

- [ ] **Step 4: Visual verification**

Scroll to §5. Expected:
1. Paper pillar with display *"Four hospitals, one operational state."*
2. Inset: split layout. Left 60%: 4 hospital tiles in 2×2 with available/in-use counts; right 40%: phone mock with role label `role · transport`, a chair record card, 3 action buttons (Transfer / Scan return / Confirm handoff in signal-live green).
3. At <768px: panel stacks (dashboard above, phone below).

- [ ] **Step 5: Type-check + commit**

```bash
npm run type-check
git add frontend/src/components/work/wheelchair/CoordinationPanel.tsx frontend/src/components/work/wheelchair/PillarCoordination.tsx frontend/src/app/work/wheelchair-tracking/page.tsx
git commit -m "$(cat <<'EOF'
feat(case-study): PillarCoordination §5 + CoordinationPanel

Multi-site operational dashboard (4 hospital tiles, available + in-use
counts) split with a transport coordinator phone mock showing role-
shaped mobile workflow actions.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 10: ImpactGrid (§6)

**Files:**
- Create: `frontend/src/components/work/wheelchair/ImpactGrid.tsx`
- Modify: `frontend/src/app/work/wheelchair-tracking/page.tsx`

**Goal:** Operational impact section. Register flips from paper back to surface. 2×3 metric grid with representative numbers, each tile showing before → after.

- [ ] **Step 1: Create `ImpactGrid.tsx`**

`frontend/src/components/work/wheelchair/ImpactGrid.tsx`:

```tsx
import { RegisterHandoff } from './primitives'
import { MonoLabel } from '@/components/home/primitives'

type Tile = { numeral: string; label: string; before: string; after: string }

const TILES: Tile[] = [
  { numeral: '< 4 min', label: 'Time to locate equipment',     before: '~30 min · radio call', after: 'scan-driven' },
  { numeral: '94%',     label: 'State-accurate at any hour',   before: 'unknowable',           after: 'registry-backed' },
  { numeral: '38 min',  label: 'Median cleaning cycle',        before: 'untracked',            after: 'timestamped' },
  { numeral: '22 min',  label: 'Cross-site transfer lag',      before: 'phone-dependent',      after: 'in-app handoff' },
  { numeral: '6 hr',    label: 'Maintenance flag → resolution', before: 'multi-day',            after: 'flagged at scan' },
  { numeral: '100%',    label: 'State-change audit coverage',  before: '0%',                   after: 'every event logged' },
]

export function ImpactGrid() {
  return (
    <>
      <RegisterHandoff direction="paper-to-surface" />
      <section className="bg-surface-canvas text-surface-fg">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <MonoLabel className="block mb-4 text-gold">operational impact · representative model</MonoLabel>
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight-h text-surface-fg max-w-[28ch] mb-12">
            What changes when the system is observable.
          </h2>

          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TILES.map((t) => (
              <li key={t.label} className="rounded-xl border border-surface-subtle bg-surface-card p-6">
                <div className="font-mono text-3xl font-medium tracking-tight-h text-surface-fg">
                  {t.numeral}
                </div>
                <div className="mt-2 text-sm text-surface-fg-secondary">
                  {t.label}
                </div>
                <div className="mt-5 pt-4 border-t border-surface-subtle">
                  <MonoLabel className="block mb-1 text-surface-fg-muted">before → after</MonoLabel>
                  <p className="font-mono text-[11px] text-surface-fg-secondary">
                    <span className="text-surface-fg-muted">{t.before}</span>
                    <span className="mx-1.5 text-gold">→</span>
                    <span>{t.after}</span>
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <p className="mt-10 font-mono text-[10px] uppercase tracking-wide-label text-surface-fg-muted">
            30-day rolling · representative operational figures · phase 2 wires real telemetry
          </p>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Add to page**

Insert `<ImpactGrid />` after `<PillarCoordination />`.

- [ ] **Step 3: Visual verification**

Scroll to §6. Expected:
1. Register handoff: paper-cream → surface-dark with gold hairline.
2. Eyebrow + sans-serif headline.
3. 2×3 metric grid (3 columns on lg, 2 on sm, 1 on mobile) with numeral, label, before → after strip.
4. Floor caption about real telemetry deferred to phase 3.

- [ ] **Step 4: Type-check + commit**

```bash
npm run type-check
git add frontend/src/components/work/wheelchair/ImpactGrid.tsx frontend/src/app/work/wheelchair-tracking/page.tsx
git commit -m "$(cat <<'EOF'
feat(case-study): ImpactGrid §6 — representative metric grid

6 tiles each with numeral, label, and before → after strip. Register
handoff from paper to surface. Floor caption flags phase 2 figures
as representative awaiting real telemetry.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 11: Reflection (§7)

**Files:**
- Create: `frontend/src/components/work/wheelchair/Reflection.tsx`
- Modify: `frontend/src/app/work/wheelchair-tracking/page.tsx`

**Goal:** First-person builder note in paper register. Register handoff back to paper. Three serif paragraphs and a centred italic closing line in gold-ink.

- [ ] **Step 1: Create `Reflection.tsx`**

`frontend/src/components/work/wheelchair/Reflection.tsx`:

```tsx
import { RegisterHandoff } from './primitives'

export function Reflection() {
  return (
    <>
      <RegisterHandoff direction="surface-to-paper" />
      <section className="bg-paper-bg text-paper-ink">
        <div className="mx-auto max-w-3xl px-6 py-20 md:py-28">
          <p className="font-mono text-[10px] uppercase tracking-wide-label text-paper-ink-soft mb-6">
            reflection · builder note
          </p>
          <h2 className="font-serif text-3xl md:text-5xl leading-[1.1] text-paper-ink max-w-[26ch] mb-10">
            What operational systems teach you about AI.
          </h2>

          <div className="font-serif text-lg md:text-xl leading-[1.7] text-paper-ink space-y-5 max-w-[64ch]">
            <p>
              For two years I assumed the interesting problem in healthcare AI was the model. The system taught me otherwise. The interesting problem was always the workflow — the scan, the state, the small moment where the human and the registry have to agree on what&apos;s true. Models can&apos;t fix a workflow that doesn&apos;t know what just happened.
            </p>
            <p>
              State is how you give a system memory. Every metric on the previous page, every audit, every future model — they all read downstream from a registry that knows the chair was returned at 14:32 and flagged for cleaning at 14:33. The state machine is the foundation. The model is a tenant.
            </p>
            <p>
              This is the architecture I want to extend AI into — not graft AI onto. When the registry is honest, the scan is fast, and the coordination is shared, an AI node has a real seat at the workflow. Without those, no amount of model quality matters.
            </p>
          </div>

          <p className="mt-12 text-center font-mono text-sm italic text-gold-ink">
            Choose the workflow gesture first. Choose the model last.
          </p>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Add to page**

Insert `<Reflection />` after `<ImpactGrid />`.

- [ ] **Step 3: Visual verification**

Scroll to §7. Expected:
1. Register handoff back to paper-cream.
2. Three serif paragraphs at ~64ch.
3. Centred italic mono closing line in gold-ink: *"Choose the workflow gesture first. Choose the model last."*

- [ ] **Step 4: Type-check + commit**

```bash
npm run type-check
git add frontend/src/components/work/wheelchair/Reflection.tsx frontend/src/app/work/wheelchair-tracking/page.tsx
git commit -m "$(cat <<'EOF'
feat(case-study): Reflection §7 — builder note (paper register)

Three first-person serif paragraphs on operational AI; centred italic
mono closing line in gold-ink: "Choose the workflow gesture first.
Choose the model last."

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 12: AINodes (§8)

**Files:**
- Create: `frontend/src/components/work/wheelchair/AINodes.tsx`
- Modify: `frontend/src/app/work/wheelchair-tracking/page.tsx`

**Goal:** AI integration concept section. Register handoff paper → surface. Three concept cards: predictive maintenance, demand forecast, operational copilot.

- [ ] **Step 1: Create `AINodes.tsx`**

`frontend/src/components/work/wheelchair/AINodes.tsx`:

```tsx
import { RegisterHandoff } from './primitives'
import { MonoLabel } from '@/components/home/primitives'

type Card = {
  slug: string
  title: string
  description: string
  diagram: 'lifecycle' | 'sites' | 'chat'
}

const CARDS: Card[] = [
  {
    slug: 'predictive_maintenance_node',
    title: 'Predictive maintenance',
    description:
      'Reads the lifecycle state machine. Flags chairs likely to fail within 14 days based on cumulative state-transit history. Surfaces in maintenance lead\'s dashboard.',
    diagram: 'lifecycle',
  },
  {
    slug: 'demand_forecast_node',
    title: 'Site demand forecast',
    description:
      'Reads patient-flow signals and scan cadence across sites. Predicts equipment shortfall by site by hour. Triggers proactive cross-site transfers before a shortage materialises.',
    diagram: 'sites',
  },
  {
    slug: 'operational_copilot_node',
    title: 'Operational copilot',
    description:
      'Reads the registry. Answers operational queries in natural language ("where are the bariatric chairs at UBC right now?") and drafts cross-site transfer requests for human approval.',
    diagram: 'chat',
  },
]

function MiniDiagram({ kind }: { kind: Card['diagram'] }) {
  if (kind === 'lifecycle') {
    return (
      <svg viewBox="0 0 100 30" className="w-full h-auto" aria-hidden="true">
        {[10, 30, 50, 70, 90].map((x) => (
          <circle key={x} cx={x} cy={15} r={1.6} fill="hsl(var(--surface-canvas))" stroke="rgba(255,255,255,0.32)" strokeWidth={0.22} />
        ))}
        {[[10,30],[30,50],[50,70],[70,90]].map(([a,b]) => (
          <line key={a} x1={a+2} y1={15} x2={b-2} y2={15} stroke="rgba(255,255,255,0.18)" strokeWidth={0.22} />
        ))}
        {/* Risk overlay arrow */}
        <path d="M 50 10 Q 60 4 70 10" fill="none" stroke="hsl(var(--accent-gold) / 0.85)" strokeWidth={0.4} />
        <text x="60" y="6" fontSize="2.5" textAnchor="middle" fontFamily="var(--font-geist-mono), monospace" fill="hsl(var(--accent-gold))">maintenance_risk</text>
      </svg>
    )
  }
  if (kind === 'sites') {
    return (
      <svg viewBox="0 0 100 40" className="w-full h-auto" aria-hidden="true">
        {[[20,12],[80,12],[20,28],[80,28]].map(([x,y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r={2} fill="hsl(var(--surface-canvas))" stroke="rgba(255,255,255,0.32)" strokeWidth={0.22} />
            <text x={x} y={y + 0.8} fontSize="2.2" textAnchor="middle" fontFamily="var(--font-geist-mono), monospace" fill="rgba(170,176,191,0.7)">{i === 1 ? 'ubc!' : ['vgh','ubc','lg','rch'][i]}</text>
          </g>
        ))}
        {/* Shortfall pulse on ubc */}
        <circle cx={80} cy={12} r={3.5} fill="none" stroke="hsl(var(--accent-gold) / 0.6)" strokeWidth={0.3} />
        {/* Proactive transfer arrow */}
        <line x1={22} y1={12} x2={78} y2={12} stroke="hsl(var(--accent-gold) / 0.7)" strokeWidth={0.3} markerEnd="" />
        <polygon points="76,11 80,12 76,13" fill="hsl(var(--accent-gold))" />
      </svg>
    )
  }
  // chat
  return (
    <div className="font-mono text-[10px] space-y-1.5">
      <div className="text-surface-fg-secondary">
        <span className="text-surface-fg-muted">user · </span>
        where are the bariatric chairs at UBC right now?
      </div>
      <div className="text-surface-fg">
        <span className="text-gold">copilot · </span>
        3 available at UBC · 4N. Most recently scanned 14:11.
        <span className="ml-1 inline-flex items-center rounded-full border border-gold/40 bg-gold/10 px-1.5 py-0.5 text-[9px] text-gold">
          EQ-UBC-0192
        </span>
      </div>
    </div>
  )
}

export function AINodes() {
  return (
    <>
      <RegisterHandoff direction="paper-to-surface" />
      <section className="bg-surface-canvas text-surface-fg">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <MonoLabel className="block mb-4 text-gold">next nodes · ai integration · concept</MonoLabel>
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight-h text-surface-fg max-w-[28ch] mb-6">
            AI as a node in the system. Not the centre of the universe.
          </h2>
          <p className="text-base text-surface-fg-secondary max-w-[58ch] mb-12">
            Three nodes that would plug into the existing registry. Each reads from the state machine, writes back through audited events, and ships behind the same workflow gestures the system already uses.
          </p>

          <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {CARDS.map((c) => (
              <li key={c.slug} className="flex flex-col rounded-xl border border-surface-subtle bg-surface-card p-6">
                <MonoLabel className="text-gold">{c.slug}</MonoLabel>
                <h3 className="mt-3 text-lg font-medium text-surface-fg">{c.title}</h3>
                <p className="mt-3 text-sm text-surface-fg-secondary leading-relaxed">
                  {c.description}
                </p>
                <div className="mt-6 rounded-md border border-surface-subtle bg-surface-canvas p-4 min-h-[80px] flex items-center">
                  <MiniDiagram kind={c.diagram} />
                </div>
                <p className="mt-3 font-mono text-[10px] uppercase tracking-wide-label text-surface-fg-muted">
                  concept · not deployed
                </p>
              </li>
            ))}
          </ul>

          <p className="mt-10 font-mono text-[10px] uppercase tracking-wide-label text-surface-fg-muted">
            AI nodes read from workflow_core · the registry remains the source of truth
          </p>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Add to page**

Insert `<AINodes />` after `<Reflection />`.

- [ ] **Step 3: Visual verification**

Scroll to §8. Expected:
1. Register handoff back to surface-dark.
2. Headline + lead paragraph.
3. Three concept cards horizontal on lg, stacked on mobile. Each has slug, title, description, mini-diagram, and `concept · not deployed` caption.
4. Floor caption about workflow_core authority.

- [ ] **Step 4: Type-check + commit**

```bash
npm run type-check
git add frontend/src/components/work/wheelchair/AINodes.tsx frontend/src/app/work/wheelchair-tracking/page.tsx
git commit -m "$(cat <<'EOF'
feat(case-study): AINodes §8 — three AI integration concept cards

Predictive maintenance, site demand forecast, operational copilot.
Each card has a mini inline diagram (lifecycle overlay arrow, sites
shortfall + transfer arrow, chat exchange with registry citation).
All captioned 'concept · not deployed'.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 13: CaseStudyClose (§9) + barrel

**Files:**
- Create: `frontend/src/components/work/wheelchair/CaseStudyClose.tsx`
- Create: `frontend/src/components/work/wheelchair/index.ts`
- Modify: `frontend/src/app/work/wheelchair-tracking/page.tsx`

**Goal:** Final section — Linear-row to `/work/equitrackr`, separator, contact line. Then create the barrel for clean imports.

- [ ] **Step 1: Create `CaseStudyClose.tsx`**

`frontend/src/components/work/wheelchair/CaseStudyClose.tsx`:

```tsx
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { MonoLabel } from '@/components/home/primitives'

const LINKS = [
  { label: 'github',   href: 'https://github.com/lloyddelacruz' },
  { label: 'linkedin', href: 'https://www.linkedin.com/in/lloyddelacruz/' },
  { label: 'x',        href: 'https://x.com/lloyddelacruz' },
]

export function CaseStudyClose() {
  return (
    <section className="bg-surface-canvas border-t border-surface-subtle">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <MonoLabel className="block mb-4 text-surface-fg-muted">next case study →</MonoLabel>

        <Link
          href="/work/equitrackr"
          className="group flex items-center justify-between gap-6 rounded-xl border border-surface-subtle px-6 py-6 transition-colors hover:border-gold/40 hover:bg-surface-card"
        >
          <div>
            <MonoLabel className="block mb-2 text-gold">02 · healthcare workflow systems</MonoLabel>
            <h3 className="text-2xl font-medium text-surface-fg">EquiTrackr</h3>
            <p className="mt-1 text-sm text-surface-fg-secondary">Equipment lifecycle & operational logistics platform.</p>
          </div>
          <ArrowUpRight className="h-5 w-5 text-surface-fg-muted group-hover:text-gold group-hover:translate-x-0.5 transition-all" />
        </Link>

        <div className="mt-12 pt-8 border-t border-surface-subtle flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wide-label text-surface-fg-secondary hover:text-surface-fg transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            back to systems
          </Link>

          <ul className="flex items-center gap-6">
            <li>
              <a
                href="mailto:lloyd.vince1985@gmail.com"
                className="font-mono text-xs text-surface-fg hover:text-gold transition-colors"
              >
                lloyd.vince1985@gmail.com
              </a>
            </li>
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs uppercase tracking-wide-label text-surface-fg-secondary hover:text-surface-fg transition-colors"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Create the barrel**

`frontend/src/components/work/wheelchair/index.ts`:

```ts
export { ColdOpen } from './ColdOpen'
export { PillarVisibility } from './PillarVisibility'
export { PillarArchitecture } from './PillarArchitecture'
export { PillarScan } from './PillarScan'
export { PillarLifecycle } from './PillarLifecycle'
export { PillarCoordination } from './PillarCoordination'
export { ImpactGrid } from './ImpactGrid'
export { Reflection } from './Reflection'
export { AINodes } from './AINodes'
export { CaseStudyClose } from './CaseStudyClose'
```

- [ ] **Step 3: Update page to use the barrel and add the close**

`frontend/src/app/work/wheelchair-tracking/page.tsx`:

```tsx
import { NavBar } from '@/components/home/NavBar'
import {
  ColdOpen, PillarVisibility, PillarArchitecture, PillarScan,
  PillarLifecycle, PillarCoordination, ImpactGrid, Reflection,
  AINodes, CaseStudyClose,
} from '@/components/work/wheelchair'

export default function Page() {
  return (
    <>
      <NavBar />
      <main>
        <ColdOpen />
        <PillarVisibility />
        <PillarArchitecture />
        <PillarScan />
        <PillarLifecycle />
        <PillarCoordination />
        <ImpactGrid />
        <Reflection />
        <AINodes />
        <CaseStudyClose />
      </main>
    </>
  )
}
```

- [ ] **Step 4: Visual verification**

Scroll to §9. Expected:
1. Linear-row pointing to `/work/equitrackr`. Hovering it animates the arrow.
2. Separator hairline.
3. Bottom row: `← back to systems` on the left; email + 3 external links on the right.

- [ ] **Step 5: Type-check + commit**

```bash
npm run type-check
git add frontend/src/components/work/wheelchair/CaseStudyClose.tsx frontend/src/components/work/wheelchair/index.ts frontend/src/app/work/wheelchair-tracking/page.tsx
git commit -m "$(cat <<'EOF'
feat(case-study): CaseStudyClose §9 + barrel

Linear-row link to /work/equitrackr next case; separator; contact row
with back-to-systems link, email, github/linkedin/x. Adds component
barrel; page now imports all sections from one path.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 14: Final accessibility + responsive + build verification

**Files:** (no code changes expected unless a defect is found)

**Goal:** Sweep keyboard nav, focus rings, contrast, reduced-motion, three breakpoints, and a full production build.

- [ ] **Step 1: Re-run the unit test suite**

```bash
cd frontend && npm run test && cd ..
```

Expected: all Phase 1 + Phase 2 tests pass (≥6 Phase 2 cases for `useScanState`).

- [ ] **Step 2: Keyboard navigation**

With `npm run dev` running, open `http://localhost:3001/work/wheelchair-tracking`. Tab through the page top-to-bottom.

Expected focus path:
1. NavBar wordmark → 3 NavBar links.
2. (Hero has no focusable elements.)
3. (PillarVisibility has no interactive elements.)
4. (PillarArchitecture has no interactive elements.)
5. ScanConsole state chips (5 buttons, but only allowed ones are focusable — disabled chips are skipped by `aria-disabled` + `disabled`).
6. (PillarLifecycle has no interactive elements.)
7. CoordinationPanel — three phone-mock buttons (Transfer / Scan return / Confirm handoff).
8. (ImpactGrid has no interactive elements.)
9. (Reflection has no interactive elements.)
10. (AINodes cards are not interactive.)
11. CaseStudyClose — `next case study` link, `back to systems` link, email, 3 external links.

Every focused element shows a visible focus ring. If any are missing, add `focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2` to its className.

- [ ] **Step 3: ScanConsole interaction sweep**

In the ScanConsole:
1. Click `returned` → state pill crossfades to `returned`, log appends, gold dot fires.
2. Click `needs_cleaning` → crossfade to `needs_cleaning`.
3. Click `cleaning` → crossfade to `cleaning`.
4. Click `available` → crossfade to `available`; VGH count visible.
5. Click `in_use` → crossfade to `in_use`; VGH count decrements by 1.
6. Click `returned` → VGH count increments back by 1.
7. After 6 scans, the event log shows the 5 most recent. The oldest is fading.

Open browser devtools accessibility tree. Verify the `aria-live="polite"` region near ScanConsole announces *"Equipment EQ-VGH-0287, state ..."* on each transition.

- [ ] **Step 4: Reduced-motion check**

macOS: System Settings → Accessibility → Display → Reduce motion. Reload the case study. Expected:
1. ScanConsole chip clicks change state instantly (no scan sweep, no fire dot, no log slide).
2. LifecycleStateMachine dot is stationary.
3. ColdOpen SystemsMap animations stopped (Phase 1 already enforces this).
4. All `aria-live` announcements still fire.

- [ ] **Step 5: Three-breakpoint visual sweep**

Resize devtools to 375 / 768 / 1440 px wide. Walk through every section. Note common adjustments:

- 375 wide:
  - ColdOpen: single column, SystemsMap card below headline.
  - All paper pillars: single column, ample horizontal padding.
  - ScanConsole: panels stack vertically (scanner → record → topology).
  - CoordinationPanel: desktop dashboard stacks above phone mock — both visible.
  - ImpactGrid: 1×6 column.
  - AINodes: cards stack vertically.
- 768 wide:
  - Hero stays single column (lg breakpoint at 1024).
  - ImpactGrid: 2 columns.
  - ScanConsole: still stacked (md:grid-cols-3 only activates at md, but it's narrow).
- 1440 wide:
  - Full layout as designed.

If any layout breaks, fix inline (common: `flex-wrap`, smaller display headline at `<480px`, extra `py-` on mobile).

- [ ] **Step 6: Production build**

```bash
npm run type-check
npm run build
```

Expected: both succeed. The Next.js build may warn about dynamic features incompatible with static export — note any errors specifically on `/work/wheelchair-tracking`. If the route fails to statically export (e.g., due to `'use client'` boundaries), the dynamic segments still render correctly because client components are rendered on the client; only check that no *build error* prevents the route from rendering.

- [ ] **Step 7: Final commit (only if fixes were made)**

```bash
git add frontend/
git commit -m "$(cat <<'EOF'
fix(case-study): a11y rings, responsive polish, contrast tuning

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

If no defects were found in Steps 2–6, skip this commit.

---

## Done

After Task 14, `/work/wheelchair-tracking` renders the full 10-section cathedral case study:
- ColdOpen, 5 paper pillars (Visibility, Architecture, Scan, Lifecycle, Coordination) with surface-dark inset modules, ImpactGrid, Reflection, AINodes, CaseStudyClose.
- ScanConsole is fully interactive with `useScanState` + a11y announcer + reduced-motion branch.
- No new tokens, no new packages.
- One Vitest unit test suite covers the state machine.

### Mapping back to the spec

| Spec section | Implementation task |
|---|---|
| §0 ColdOpen | Task 3 |
| §1 PillarVisibility | Task 4 |
| §2 PillarArchitecture | Task 5 |
| §3 PillarScan + ScanConsole | Tasks 2, 6, 7 |
| §4 PillarLifecycle | Task 8 |
| §5 PillarCoordination | Task 9 |
| §6 ImpactGrid | Task 10 |
| §7 Reflection | Task 11 |
| §8 AINodes | Task 12 |
| §9 CaseStudyClose | Task 13 |
| §5 Component architecture (primitives) | Task 1 |
| §6 ScanConsole interaction spec | Tasks 2, 6, 7 |
| §11 Testing scope | Tasks 2 + 14 |
| §9 Accessibility plan | Task 14 |
| §10 Responsive plan | Task 14 |

### Phase 3 (separate plan)

- Real telemetry wiring for `LiveStatusPanel` and ImpactGrid metrics.
- Optional frontline photograph(s) integrated between §1/§2 or beneath §3.
- EquiTrackr secondary deep-dive (own plan).
- Capability sub-pages.
- External link URL confirmation (github / linkedin / x).
