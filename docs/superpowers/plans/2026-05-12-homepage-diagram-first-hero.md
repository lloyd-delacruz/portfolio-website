# Homepage Diagram-First Hero — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.
>
> **Also load the `frontend-design` skill** before building the new components — this plan gives concrete code, but apply that skill's judgment for spacing, hierarchy, and polish.

**Goal:** Rework the portfolio homepage to match the supplied mockup — a two-column hero with a contained "Operational Systems Map" panel, a five-column values row, a bordered pull-quote strip — and carry the new serif-display look down through the existing sections.

**Architecture:** All work is inside `frontend/src/`. New presentational components live in `src/components/home/` (and `src/components/home/primitives/`). The existing `SystemsMap` SVG is refactored from a full-bleed background into the inner content of a bordered panel. Copy is verbatim from the mockup; nav labels match the mockup; the existing bronze `--accent-gold` token is unchanged. No backend, no routes beyond the homepage and shared `NavBar`.

**Tech Stack:** Next.js 15 (App Router, static export), TypeScript (strict), Tailwind CSS, Framer Motion, lucide-react. Existing helpers: `cn()` (`@/lib/utils`), `usePrefersReducedMotion` (`@/lib/hooks/usePrefersReducedMotion`), `useInViewPause` (`@/lib/hooks/useInViewPause`).

**Spec:** `docs/superpowers/specs/2026-05-12-homepage-diagram-first-hero-design.md`

**Verification commands** (run from `frontend/`): `npm run lint`, `npm run type-check`. A periodic `npm run build` confirms the static export still succeeds. There is no unit-test harness for these presentational components; verification is lint + type-check + build + a visual check in `npm run dev`.

**Focus-ring convention used across the site:** `focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2` (plus `focus:outline-none` where a default outline would otherwise show).

---

## File Structure

**New files**
- `frontend/src/components/home/primitives/CtaButton.tsx` — filled / outline CTA button (renders a Next `Link`).
- `frontend/src/components/home/primitives/IconBadge.tsx` — small gold line-icon wrapper for the values row.
- `frontend/src/components/home/OperationalSystemsMap.tsx` — bordered panel wrapper (header, body = `SystemsMap`, footer).
- `frontend/src/components/home/ValuesRow.tsx` — five-column values section.
- `frontend/src/components/home/QuoteBar.tsx` — bordered pull-quote strip.

**Modified files**
- `frontend/src/components/home/primitives/BrandWordmark.tsx` — `LD` serif wordmark.
- `frontend/src/components/home/primitives/index.ts` — export `CtaButton`, `IconBadge`.
- `frontend/src/components/home/NavBar.tsx` — new labels, `active` prop, active-dot indicator.
- `frontend/src/components/home/SystemsMap.tsx` — re-tuned for a contained box; hospital `Building2`-style glyphs; `LIVE` tags; accepts a `className`/sizing that works inside the panel.
- `frontend/src/components/home/HeroSystemsMap.tsx` — full rewrite (two-column).
- `frontend/src/components/home/FlagshipFeature.tsx` — H3 display heading → serif.
- `frontend/src/components/home/CapabilityIndex.tsx` — H2 display heading → serif.
- `frontend/src/components/home/LiveStatusPanel.tsx` — H2 display heading → serif.
- `frontend/src/components/home/SelectedSystems.tsx` — `MonoLabel` heading stays, but the list-item `<h3>` and section heading get the serif treatment where they read as display type (see Task 8 for the exact change).
- `frontend/src/app/page.tsx` — new section order, pass `active="work"` to `NavBar`.

---

## Task 1: `CtaButton` primitive

**Files:**
- Create: `frontend/src/components/home/primitives/CtaButton.tsx`
- Modify: `frontend/src/components/home/primitives/index.ts`

- [ ] **Step 1: Create the component**

```tsx
// frontend/src/components/home/primitives/CtaButton.tsx
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

type CtaButtonProps = {
  href: string
  children: React.ReactNode
  variant?: 'filled' | 'outline'
  className?: string
}

export function CtaButton({ href, children, variant = 'filled', className }: CtaButtonProps) {
  const isFilled = variant === 'filled'
  return (
    <Link
      href={href}
      className={cn(
        'group inline-flex items-center justify-between gap-8 rounded-md px-5 py-3',
        'font-mono text-xs uppercase tracking-wide-label transition-colors',
        'focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2',
        isFilled
          ? 'bg-gold text-surface-canvas hover:bg-gold/90'
          : 'border border-surface-strong text-surface-fg hover:border-gold/50 hover:text-gold',
        className,
      )}
    >
      <span>{children}</span>
      <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
    </Link>
  )
}
```

- [ ] **Step 2: Export it**

In `frontend/src/components/home/primitives/index.ts` add:

```ts
export { CtaButton } from './CtaButton'
```

- [ ] **Step 3: Verify**

Run (from `frontend/`): `npm run type-check`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add frontend/src/components/home/primitives/CtaButton.tsx frontend/src/components/home/primitives/index.ts
git commit -m "feat(home): CtaButton primitive (filled / outline)"
```

---

## Task 2: `IconBadge` primitive

**Files:**
- Create: `frontend/src/components/home/primitives/IconBadge.tsx`
- Modify: `frontend/src/components/home/primitives/index.ts`

- [ ] **Step 1: Create the component**

```tsx
// frontend/src/components/home/primitives/IconBadge.tsx
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

type IconBadgeProps = { icon: LucideIcon; className?: string }

export function IconBadge({ icon: Icon, className }: IconBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex h-9 w-9 items-center justify-center rounded-md border border-gold/30 bg-gold/5 text-gold',
        className,
      )}
      aria-hidden="true"
    >
      <Icon className="h-4 w-4" strokeWidth={1.5} />
    </span>
  )
}
```

- [ ] **Step 2: Export it**

In `frontend/src/components/home/primitives/index.ts` add:

```ts
export { IconBadge } from './IconBadge'
```

- [ ] **Step 3: Verify**

Run: `npm run type-check` → no errors.

- [ ] **Step 4: Commit**

```bash
git add frontend/src/components/home/primitives/IconBadge.tsx frontend/src/components/home/primitives/index.ts
git commit -m "feat(home): IconBadge primitive"
```

---

## Task 3: `BrandWordmark` → `LD` serif

**Files:**
- Modify: `frontend/src/components/home/primitives/BrandWordmark.tsx`

- [ ] **Step 1: Replace the component body**

```tsx
// frontend/src/components/home/primitives/BrandWordmark.tsx
import Link from 'next/link'

export function BrandWordmark() {
  return (
    <Link
      href="/"
      className="font-serif text-2xl font-medium tracking-tight-h text-surface-fg transition-colors hover:text-gold focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2"
      aria-label="Lloyd Dela Cruz — home"
    >
      LD
    </Link>
  )
}
```

- [ ] **Step 2: Verify**

Run: `npm run type-check` → no errors.

- [ ] **Step 3: Commit**

```bash
git add frontend/src/components/home/primitives/BrandWordmark.tsx
git commit -m "feat(home): LD serif wordmark"
```

---

## Task 4: `NavBar` — new labels, `active` prop, active-dot indicator

**Files:**
- Modify: `frontend/src/components/home/NavBar.tsx`

- [ ] **Step 1: Rewrite the component**

```tsx
// frontend/src/components/home/NavBar.tsx
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { BrandWordmark } from './primitives'
import { cn } from '@/lib/utils'

type NavKey = 'work' | 'about' | 'thoughts' | 'contact'

const LINKS: { key: NavKey; label: string; href: string }[] = [
  { key: 'work',     label: 'work',     href: '#systems' },
  { key: 'about',    label: 'about',    href: '/about' },
  { key: 'thoughts', label: 'thoughts', href: '/blog' },
  { key: 'contact',  label: 'contact',  href: '#contact' },
]

export function NavBar({ active }: { active?: NavKey }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed left-0 right-0 top-0 z-50 transition-all duration-300',
        scrolled
          ? 'border-b border-surface-subtle bg-surface-canvas/70 backdrop-blur-md'
          : 'bg-transparent',
      )}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <BrandWordmark />
        <ul className="flex items-center gap-7">
          {LINKS.map((link) => (
            <li key={link.href} className="relative">
              <Link
                href={link.href}
                className={cn(
                  'font-mono text-xs uppercase tracking-wide-label transition-colors',
                  'focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2',
                  active === link.key
                    ? 'text-gold'
                    : 'text-surface-fg-secondary hover:text-surface-fg',
                )}
              >
                {link.label}
              </Link>
              {active === link.key && (
                <span className="absolute -bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-gold" />
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
```

- [ ] **Step 2: Verify**

Run: `npm run type-check` → no errors. (`page.tsx` does not yet pass `active`, which is fine — the prop is optional.)

- [ ] **Step 3: Commit**

```bash
git add frontend/src/components/home/NavBar.tsx
git commit -m "feat(home): nav labels WORK/ABOUT/THOUGHTS/CONTACT + active-dot indicator"
```

---

## Task 5: `SystemsMap` — re-tune for the contained panel

The current `SystemsMap` is an absolutely-positioned full-bleed layer. The new version is the **inner content of a bordered card**: it fills its parent, uses a `viewBox` sized for a roughly 4:3 box, draws a faint dot-grid, a center `workflow_core / v3.x` node with concentric pulse rings, four corner hospital nodes (a small "building" glyph drawn in SVG plus a green `LIVE` label), gold connectors, and a periodic gold pulse traveling one edge. Motion stays gated by `usePrefersReducedMotion` + `useInViewPause`.

**Files:**
- Modify: `frontend/src/components/home/SystemsMap.tsx`

- [ ] **Step 1: Replace the file**

```tsx
// frontend/src/components/home/SystemsMap.tsx
'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { usePrefersReducedMotion } from '@/lib/hooks/usePrefersReducedMotion'
import { useInViewPause } from '@/lib/hooks/useInViewPause'

type Hospital = { id: string; label: string; x: number; y: number }

// viewBox is 0..120 wide, 0..96 tall (5:4-ish). Core at center.
const CORE = { x: 60, y: 48 }
const HOSPITALS: Hospital[] = [
  { id: 'vgh',        label: 'VGH',         x: 20, y: 18 },
  { id: 'ubc',        label: 'UBC',         x: 100, y: 18 },
  { id: 'lions_gate', label: 'LIONS GATE',  x: 20, y: 78 },
  { id: 'richmond',   label: 'RICHMOND',    x: 100, y: 78 },
]

// SVG "building" glyph: a few rects, drawn relative to a node center.
function HospitalGlyph({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g stroke="hsl(var(--accent-gold))" strokeWidth={0.5} fill="none">
      <rect x={cx - 2.4} y={cy - 2.6} width={4.8} height={5.6} rx={0.4} />
      <line x1={cx - 1.1} y1={cy - 1.4} x2={cx - 1.1} y2={cy - 0.6} />
      <line x1={cx + 1.1} y1={cy - 1.4} x2={cx + 1.1} y2={cy - 0.6} />
      <line x1={cx - 1.1} y1={cy + 0.4} x2={cx - 1.1} y2={cy + 1.2} />
      <line x1={cx + 1.1} y1={cy + 0.4} x2={cx + 1.1} y2={cy + 1.2} />
    </g>
  )
}

export function SystemsMap({ className }: { className?: string }) {
  const reduced = usePrefersReducedMotion()
  const { ref, inView } = useInViewPause<HTMLDivElement>()
  const animate = !reduced && inView
  const [fireIndex, setFireIndex] = useState<number | null>(null)

  useEffect(() => {
    if (!animate) return
    let timeout: ReturnType<typeof setTimeout>
    const schedule = () => {
      const delay = 5000 + Math.random() * 4000
      timeout = setTimeout(() => {
        setFireIndex(Math.floor(Math.random() * HOSPITALS.length))
        setTimeout(() => setFireIndex(null), 1100)
        schedule()
      }, delay)
    }
    schedule()
    return () => clearTimeout(timeout)
  }, [animate])

  const firingTo = fireIndex !== null ? HOSPITALS[fireIndex] : null

  return (
    <div ref={ref} className={cn('w-full', className)}>
      <svg viewBox="0 0 120 96" className="h-full w-full" aria-hidden="true">
        <defs>
          <pattern id="sm-grid" width="4" height="4" patternUnits="userSpaceOnUse">
            <circle cx="0.4" cy="0.4" r="0.25" fill="rgba(255,255,255,0.05)" />
          </pattern>
          <radialGradient id="sm-core-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(var(--accent-gold))" stopOpacity="0.12" />
            <stop offset="100%" stopColor="hsl(var(--accent-gold))" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect x="0" y="0" width="120" height="96" fill="url(#sm-grid)" />
        <circle cx={CORE.x} cy={CORE.y} r="34" fill="url(#sm-core-glow)" />

        {/* connectors */}
        {HOSPITALS.map((h) => (
          <line
            key={`edge-${h.id}`}
            x1={CORE.x} y1={CORE.y} x2={h.x} y2={h.y}
            stroke="hsl(var(--accent-gold) / 0.4)" strokeWidth={0.35}
          />
        ))}

        {/* traveling pulse */}
        <AnimatePresence>
          {firingTo && (
            <motion.circle
              key={`pulse-${fireIndex}`}
              r="0.9" fill="hsl(var(--accent-gold))"
              initial={{ cx: CORE.x, cy: CORE.y, opacity: 1 }}
              animate={{ cx: firingTo.x, cy: firingTo.y, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.0, ease: 'easeInOut' }}
            />
          )}
        </AnimatePresence>

        {/* core node */}
        {animate && (
          <motion.circle
            cx={CORE.x} cy={CORE.y} r="9"
            fill="none" stroke="hsl(var(--accent-gold))" strokeWidth={0.3}
            animate={{ r: [9, 16, 9], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}
        <circle cx={CORE.x} cy={CORE.y} r="11" fill="hsl(var(--surface-canvas))"
          stroke="hsl(var(--accent-gold) / 0.7)" strokeWidth={0.4} />
        <text x={CORE.x} y={CORE.y - 0.5} textAnchor="middle"
          fontSize="2.6" fontFamily="var(--font-geist-mono), monospace"
          fill="hsl(var(--accent-gold))">workflow_core</text>
        <text x={CORE.x} y={CORE.y + 3} textAnchor="middle"
          fontSize="2.4" fontFamily="var(--font-geist-mono), monospace"
          fill="hsl(var(--surface-fg-secondary))">v3.x</text>

        {/* hospital nodes */}
        {HOSPITALS.map((h) => {
          const labelLeft = h.x > CORE.x // node on the right side → label to its right; otherwise left
          return (
            <g key={h.id}>
              <circle cx={h.x} cy={h.y} r="5.4" fill="hsl(var(--surface-canvas))"
                stroke="hsl(var(--accent-gold) / 0.55)" strokeWidth={0.35} />
              <HospitalGlyph cx={h.x} cy={h.y} />
              <text
                x={labelLeft ? h.x + 7 : h.x - 7}
                y={h.y - 4.5}
                textAnchor={labelLeft ? 'start' : 'end'}
                fontSize="2.2" fontFamily="var(--font-geist-mono), monospace"
                fill="hsl(var(--signal-live))"
              >LIVE</text>
              <circle cx={labelLeft ? h.x + 5.6 : h.x - 5.6} cy={h.y - 5.2} r="0.7"
                fill="hsl(var(--signal-live))" />
            </g>
          )
        })}
      </svg>
    </div>
  )
}
```

- [ ] **Step 2: Verify**

Run: `npm run type-check` → no errors. (`HeroSystemsMap` still imports `SystemsMap`; it currently renders it full-bleed — that's replaced in Task 6, but the build should still pass here. If `npm run lint` flags an unused import after this change, leave it; Task 6 fixes the consumer.)

- [ ] **Step 3: Commit**

```bash
git add frontend/src/components/home/SystemsMap.tsx
git commit -m "refactor(home): SystemsMap as contained panel diagram (hospital glyphs + LIVE tags)"
```

---

## Task 6: `OperationalSystemsMap` panel + `HeroSystemsMap` rewrite

**Files:**
- Create: `frontend/src/components/home/OperationalSystemsMap.tsx`
- Modify: `frontend/src/components/home/HeroSystemsMap.tsx`

- [ ] **Step 1: Create the panel wrapper**

```tsx
// frontend/src/components/home/OperationalSystemsMap.tsx
import { SystemsMap } from './SystemsMap'
import { LiveDot, MonoLabel } from './primitives'

export function OperationalSystemsMap() {
  return (
    <div className="rounded-2xl border border-surface-subtle bg-surface-card p-5 md:p-6">
      <div className="mb-1">
        <MonoLabel className="text-gold">operational systems map</MonoLabel>
      </div>
      <p className="text-sm text-surface-fg-secondary">
        Real-time coordination across the network
      </p>

      <div className="mt-4 aspect-[5/4] w-full">
        <SystemsMap className="h-full" />
      </div>

      <div className="mt-4 flex items-center gap-2 border-t border-surface-subtle pt-3">
        <LiveDot />
        <MonoLabel>live state synchronization · last updated 14:32:08</MonoLabel>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Rewrite the hero**

```tsx
// frontend/src/components/home/HeroSystemsMap.tsx
import { CtaButton, LiveDot, MonoLabel } from './primitives'
import { OperationalSystemsMap } from './OperationalSystemsMap'

const PRODUCTION_SITES = ['live', 'live', 'live', 'live']

export function HeroSystemsMap() {
  return (
    <section className="relative bg-surface-canvas">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 pb-20 pt-32 lg:min-h-[100svh] lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:pb-0 lg:pt-24">
        {/* left column */}
        <div>
          <p className="font-mono text-[11px] uppercase tracking-wide-label text-gold">
            applied ai engineer · healthcare systems builder
          </p>

          <h1 className="mt-6 font-serif text-4xl font-medium leading-[1.04] tracking-tight-display text-surface-fg md:text-6xl lg:text-7xl">
            I build operational systems that make healthcare{' '}
            <span className="italic text-gold">work</span>.
          </h1>

          <p className="mt-6 max-w-[46ch] text-base leading-relaxed text-surface-fg-secondary md:text-lg">
            I design and ship AI-native workflows that connect people, systems, and
            data — turning frontline complexity into operational clarity.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <CtaButton href="/work/wheelchair-tracking" variant="filled">
              view case study
            </CtaButton>
            <CtaButton href="#systems" variant="outline">
              explore the system
            </CtaButton>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2">
            <MonoLabel className="text-gold">systems in production</MonoLabel>
            {PRODUCTION_SITES.map((_, i) => (
              <span key={i} className="inline-flex items-center gap-1.5">
                <LiveDot pulse={false} />
                <MonoLabel>live</MonoLabel>
              </span>
            ))}
          </div>
        </div>

        {/* right column */}
        <div className="lg:pl-4">
          <OperationalSystemsMap />
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Verify**

Run: `npm run lint && npm run type-check` → no errors.
Then `npm run dev` and load `http://localhost:3001/`: confirm the two-column hero, the panel diagram renders and (after a few seconds) a gold pulse travels to a hospital node, the four `LIVE` chips show under "systems in production", and there is no horizontal overflow on mobile widths.

- [ ] **Step 4: Commit**

```bash
git add frontend/src/components/home/OperationalSystemsMap.tsx frontend/src/components/home/HeroSystemsMap.tsx
git commit -m "feat(home): two-column hero with Operational Systems Map panel"
```

---

## Task 7: `ValuesRow` section

**Files:**
- Create: `frontend/src/components/home/ValuesRow.tsx`

- [ ] **Step 1: Create the component**

```tsx
// frontend/src/components/home/ValuesRow.tsx
import { Network, Workflow, Database, Cpu, Users } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { IconBadge, MonoLabel } from './primitives'

type Value = { icon: LucideIcon; title: string; statement: string }

const VALUES: Value[] = [
  { icon: Network,  title: 'systems thinker',     statement: 'I see the whole system — people, process, data, and technology.' },
  { icon: Workflow, title: 'workflow architect',  statement: 'I design operational workflows that scale in the real world.' },
  { icon: Database, title: 'data & integration',  statement: 'I build reliable data systems that create a single source of truth.' },
  { icon: Cpu,      title: 'ai-native builder',   statement: 'I integrate AI where it amplifies decisions, not where it replaces them.' },
  { icon: Users,    title: 'frontline focused',   statement: 'I build for the people who keep healthcare moving.' },
]

export function ValuesRow() {
  return (
    <section className="border-t border-surface-subtle bg-surface-canvas">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <ul className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 xl:divide-x xl:divide-surface-subtle">
          {VALUES.map((v) => (
            <li key={v.title} className="xl:px-6 xl:first:pl-0 xl:last:pr-0">
              <IconBadge icon={v.icon} />
              <p className="mt-4 font-mono text-[11px] uppercase tracking-wide-label text-surface-fg">
                {v.title}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-surface-fg-secondary">
                {v.statement}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify**

Run: `npm run type-check` → no errors.

- [ ] **Step 3: Commit**

```bash
git add frontend/src/components/home/ValuesRow.tsx
git commit -m "feat(home): ValuesRow — five capability statements"
```

---

## Task 8: `QuoteBar` section

**Files:**
- Create: `frontend/src/components/home/QuoteBar.tsx`

- [ ] **Step 1: Create the component**

```tsx
// frontend/src/components/home/QuoteBar.tsx
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function QuoteBar() {
  return (
    <section className="bg-surface-canvas">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col gap-6 rounded-2xl border border-surface-subtle bg-surface-card p-8 md:flex-row md:items-center md:justify-between md:p-10">
          <div className="flex items-start gap-4">
            <span aria-hidden="true" className="font-serif text-5xl leading-none text-gold">&ldquo;</span>
            <p className="max-w-[58ch] text-base leading-relaxed text-surface-fg md:text-lg">
              The best AI doesn&apos;t replace workflows. It makes them observable,
              reliable, and better every day.
            </p>
          </div>
          <Link
            href="/work/wheelchair-tracking"
            className="group inline-flex shrink-0 items-center gap-2 font-mono text-xs uppercase tracking-wide-label text-gold transition-colors hover:text-gold/80 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2"
          >
            view featured case study
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify**

Run: `npm run type-check` → no errors.

- [ ] **Step 3: Commit**

```bash
git add frontend/src/components/home/QuoteBar.tsx
git commit -m "feat(home): QuoteBar — featured pull-quote strip"
```

---

## Task 9: Wire the homepage + restyle existing section headings

**Files:**
- Modify: `frontend/src/app/page.tsx`
- Modify: `frontend/src/components/home/FlagshipFeature.tsx`
- Modify: `frontend/src/components/home/CapabilityIndex.tsx`
- Modify: `frontend/src/components/home/LiveStatusPanel.tsx`
- Modify: `frontend/src/components/home/SelectedSystems.tsx`

- [ ] **Step 1: Rewrite `page.tsx`**

```tsx
// frontend/src/app/page.tsx
import { NavBar } from '@/components/home/NavBar'
import { HeroSystemsMap } from '@/components/home/HeroSystemsMap'
import { ValuesRow } from '@/components/home/ValuesRow'
import { QuoteBar } from '@/components/home/QuoteBar'
import { FlagshipFeature } from '@/components/home/FlagshipFeature'
import { CapabilityIndex } from '@/components/home/CapabilityIndex'
import { LiveStatusPanel } from '@/components/home/LiveStatusPanel'
import { SelectedSystems } from '@/components/home/SelectedSystems'
import { EssayStrip } from '@/components/home/EssayStrip'
import { ContactStrip } from '@/components/home/ContactStrip'

export default function Home() {
  return (
    <>
      <NavBar active="work" />
      <main className="min-h-screen bg-surface-canvas text-surface-fg">
        <HeroSystemsMap />
        <ValuesRow />
        <QuoteBar />
        <FlagshipFeature />
        <CapabilityIndex />
        <LiveStatusPanel />
        <SelectedSystems />
        <EssayStrip />
        <ContactStrip />
      </main>
    </>
  )
}
```

- [ ] **Step 2: `FlagshipFeature` heading → serif**

In `frontend/src/components/home/FlagshipFeature.tsx`, change the `<h3>` className from:

```
"mt-4 text-3xl md:text-5xl font-medium tracking-tight-display leading-[1.05] text-surface-fg max-w-[22ch]"
```

to:

```
"mt-4 font-serif text-3xl md:text-5xl font-medium tracking-tight-display leading-[1.05] text-surface-fg max-w-[22ch]"
```

- [ ] **Step 3: `CapabilityIndex` heading → serif**

In `frontend/src/components/home/CapabilityIndex.tsx`, change the `<h2>` className from:

```
"text-2xl md:text-3xl font-medium tracking-tight-h text-surface-fg max-w-[28ch] mb-10"
```

to:

```
"font-serif text-2xl md:text-3xl font-medium tracking-tight-h text-surface-fg max-w-[28ch] mb-10"
```

- [ ] **Step 4: `LiveStatusPanel` heading → serif**

In `frontend/src/components/home/LiveStatusPanel.tsx`, change the `<h2>` className from:

```
"text-2xl md:text-3xl font-medium tracking-tight-h text-surface-fg max-w-[26ch]"
```

to:

```
"font-serif text-2xl md:text-3xl font-medium tracking-tight-h text-surface-fg max-w-[26ch]"
```

- [ ] **Step 5: `SelectedSystems` — heading + item titles → serif**

In `frontend/src/components/home/SelectedSystems.tsx`:
- The section currently leads with `<MonoLabel className="block mb-4">selected systems</MonoLabel>` — leave that as-is (it's a label, not display type).
- Change the per-row `<h3>` className from:

```
"text-lg font-medium text-surface-fg"
```

to:

```
"font-serif text-lg font-medium text-surface-fg"
```

- [ ] **Step 6: Verify**

Run: `npm run lint && npm run type-check` → no errors.
Then `npm run build` → static export succeeds.
Then `npm run dev`, load `/`: section order is Hero → ValuesRow → QuoteBar → FlagshipFeature → CapabilityIndex → LiveStatusPanel → SelectedSystems → EssayStrip → ContactStrip; the nav shows a gold dot under WORK; FlagshipFeature / CapabilityIndex / LiveStatusPanel / SelectedSystems headings render in serif; no console errors; check mobile, tablet, desktop widths for overflow.

- [ ] **Step 7: Commit**

```bash
git add frontend/src/app/page.tsx frontend/src/components/home/FlagshipFeature.tsx frontend/src/components/home/CapabilityIndex.tsx frontend/src/components/home/LiveStatusPanel.tsx frontend/src/components/home/SelectedSystems.tsx
git commit -m "feat(home): wire new homepage order + serif section headings"
```

---

## Task 10: `prefers-reduced-motion` + final pass

**Files:** none expected (verification only; small fixes if needed).

- [ ] **Step 1: Reduced-motion check**

In browser devtools, enable "Emulate CSS prefers-reduced-motion: reduce" and reload `/`. The hero diagram must render fully (core node, four hospitals, connectors, LIVE tags) with **no** traveling pulse and **no** core ring animation. If anything animates, confirm `SystemsMap` gates all `motion.*` elements behind `animate` and fix.

- [ ] **Step 2: Off-screen pause check**

Scroll the hero out of view, then back. The pulse scheduler should not run while off-screen (this is `useInViewPause` behavior already used elsewhere — just confirm no errors).

- [ ] **Step 3: Keyboard / focus check**

Tab through the nav links, both hero CTAs, and the QuoteBar link — each must show the gold focus outline.

- [ ] **Step 4: Final verify + commit (only if Step 1–3 required fixes)**

```bash
npm run lint && npm run type-check && npm run build
git add -A
git commit -m "fix(home): reduced-motion + focus polish on diagram-first hero"
```

If no fixes were needed, skip the commit and report the plan complete.

---

## Self-Review notes

- **Spec coverage:** NavBar (Task 3–4), two-column hero + panel + SVG diagram (Tasks 5–6), ValuesRow (Task 7), QuoteBar (Task 8), section reorder + serif headings (Task 9), reduced-motion / focus (Task 10), CtaButton/IconBadge primitives (Tasks 1–2), `LD` wordmark (Task 3). Gold token left untouched per spec — no task needed. EssayStrip/ContactStrip untouched per spec — no task needed.
- **Type consistency:** `SystemsMap` is exported as `SystemsMap` and consumed by `OperationalSystemsMap`; `CtaButton`/`IconBadge`/`LiveDot`/`MonoLabel`/`BrandWordmark` all come from `@/components/home/primitives`. `NavBar` `active` prop type `NavKey` includes `'work'`, which `page.tsx` passes.
- **No placeholders:** every code step contains full file contents or an exact before/after class string.
