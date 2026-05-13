# SpendWise Case-Study Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the `/work/spendwise` placeholder with a full 8-section premium case-study page presenting SpendWise as a modern, AI-native financial planning & operational budgeting platform, in the existing `.home2` warm-paper register.

**Architecture:** Follows the established case-study component pattern (`frontend/src/components/casestudy/equitrackr/`): one section component per file under `frontend/src/components/casestudy/spendwise/`, composed by `work/spendwise/page.tsx` with `HomeNav` + `SiteFooter` + `Reveal`. All "screenshots" are hand-built from divs/SVG (no raster images). Two interactive sections (`SwExperience` tab explorer, `SwWorkflow` scrubber) are client components; everything else is server components. Shared helpers `CsSection`/`Eyebrow`/`Module`/`Chip` come from the existing `casestudy/bits.tsx`; SpendWise-specific `SwMark` (logo) and `SwPhone` (phone frame) are new.

**Tech Stack:** Next.js 14 App Router, TypeScript (strict), Tailwind CSS, `lucide-react` icons, Framer-free hand-built SVG/CSS. No new dependencies. Static-export safe.

**Note on TDD:** This repo has no unit-test framework; the verification gate for each task is `npm run type-check` + `npm run lint` clean (run from `frontend/`), plus a quick visual check in `npm run dev`. There are no `*.test.*` files to write.

---

### Task 1: Add SpendWise design tokens to globals.css

**Files:**
- Modify: `frontend/src/app/globals.css` — the `.home2 { ... }` block (~line 416) and the utilities just below it

- [ ] **Step 1: Add teal tokens to the `.home2` variable block**

In `frontend/src/app/globals.css`, inside `.home2 {`, after the `--amber: #f59e0b;` line, add:

```css
  --teal:         #0d9488;
  --teal-deep:    #0f766e;
  --teal-soft:    #ccfbf1;
```

- [ ] **Step 2: Add the brand-swirl utilities**

After the `.home2 .grad-plum-text { ... }` rule, add:

```css
.home2 .grad-swirl-text {
  background: linear-gradient(100deg, #6d28d9 0%, #ec4899 32%, #0d9488 64%, #f59e0b 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.home2 .bg-swirl {
  background: conic-gradient(from 210deg, #6d28d9, #ec4899, #f59e0b, #0d9488, #6d28d9);
}
```

- [ ] **Step 3: Verify build is clean**

Run (from `frontend/`): `npm run type-check && npm run lint`
Expected: both pass with no errors.

- [ ] **Step 4: Commit**

```bash
git add frontend/src/app/globals.css
git commit -m "feat(spendwise): add teal + brand-swirl tokens to .home2"
```

---

### Task 2: `SwMark` — SpendWise logo + wordmark

**Files:**
- Create: `frontend/src/components/casestudy/spendwise/SwMark.tsx`

- [ ] **Step 1: Create the component**

```tsx
// frontend/src/components/casestudy/spendwise/SwMark.tsx
// Hand-built SpendWise logo: overlapping translucent "S" ribbons in plum/pink/teal/amber.

export function SwMark({ size = 28, withWordmark = true }: { size?: number; withWordmark?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden role="img">
        <defs>
          <linearGradient id="sw-a" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#6d28d9" /><stop offset="1" stopColor="#ec4899" />
          </linearGradient>
          <linearGradient id="sw-b" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#0d9488" /><stop offset="1" stopColor="#f59e0b" />
          </linearGradient>
        </defs>
        <path d="M34 12c-4-5-13-6-19-2S7 22 12 26s17 3 21 8-3 13-12 12-13-6-13-6" fill="none" stroke="url(#sw-a)" strokeWidth="7" strokeLinecap="round" opacity="0.92" />
        <path d="M14 36c4 5 13 6 19 2s8-12 3-16-17-3-21-8 3-13 12-12 13 6 13 6" fill="none" stroke="url(#sw-b)" strokeWidth="7" strokeLinecap="round" opacity="0.78" />
      </svg>
      {withWordmark && (
        <span className="font-display text-[1.05rem] font-extrabold tracking-tight text-ink">SpendWise</span>
      )}
    </span>
  )
}
```

- [ ] **Step 2: Verify build is clean**

Run (from `frontend/`): `npm run type-check && npm run lint`
Expected: both pass.

- [ ] **Step 3: Commit**

```bash
git add frontend/src/components/casestudy/spendwise/SwMark.tsx
git commit -m "feat(spendwise): SwMark logo component"
```

---

### Task 3: `SwPhone` — reusable phone frame

**Files:**
- Create: `frontend/src/components/casestudy/spendwise/SwPhone.tsx`

- [ ] **Step 1: Create the component**

```tsx
// frontend/src/components/casestudy/spendwise/SwPhone.tsx
import type { ReactNode } from 'react'

// A small iPhone-style frame: black bezel, notch, "9:41" status bar, home indicator.
// `children` is the screen content; the screen area is a white column with px-3 py-3.
export function SwPhone({
  children,
  className = '',
  width = 220,
}: {
  children: ReactNode
  className?: string
  width?: number
}) {
  return (
    <div
      className={`relative shrink-0 rounded-[2rem] bg-[#15131c] p-[6px] soft-shadow-lg ${className}`}
      style={{ width }}
    >
      {/* notch */}
      <div className="absolute left-1/2 top-[6px] z-10 h-[16px] w-[34%] -translate-x-1/2 rounded-b-[10px] bg-[#15131c]" aria-hidden />
      <div className="overflow-hidden rounded-[1.6rem] bg-white">
        {/* status bar */}
        <div className="flex items-center justify-between px-4 pb-1 pt-2 text-[9px] font-semibold text-ink">
          <span>9:41</span>
          <span className="flex items-center gap-1">
            <span className="inline-block h-1.5 w-3 rounded-[1px] bg-ink/70" />
            <span className="inline-block h-1.5 w-2 rounded-[1px] bg-ink/40" />
          </span>
        </div>
        {/* screen */}
        <div className="px-3 pb-7 pt-1">{children}</div>
        {/* home indicator */}
        <div className="mx-auto mb-2 h-1 w-1/4 rounded-full bg-ink/20" aria-hidden />
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify build is clean**

Run (from `frontend/`): `npm run type-check && npm run lint`
Expected: both pass.

- [ ] **Step 3: Commit**

```bash
git add frontend/src/components/casestudy/spendwise/SwPhone.tsx
git commit -m "feat(spendwise): SwPhone reusable phone frame"
```

---

### Task 4: `SwScreens` — shared screen-content mocks

These small screen bodies are reused by Hero, Workflow, and Mobile. Putting them in one file keeps them DRY.

**Files:**
- Create: `frontend/src/components/casestudy/spendwise/SwScreens.tsx`

- [ ] **Step 1: Create the file with screen + chart primitives**

```tsx
// frontend/src/components/casestudy/spendwise/SwScreens.tsx
import { Home, ShoppingCart, UtensilsCrossed, Zap, Plus } from 'lucide-react'
import { SwMark } from './SwMark'

const TEAL = 'var(--teal)'
const SOFT = 'rgba(28,22,46,0.08)'

export function ProgressDots({ n = 5, active = 2 }: { n?: number; active?: number }) {
  return (
    <div className="mt-3 flex items-center justify-center gap-1.5">
      {Array.from({ length: n }).map((_, i) => (
        <span
          key={i}
          className="h-1.5 rounded-full transition-all"
          style={{ width: i === active ? 14 : 6, background: i === active ? TEAL : SOFT }}
        />
      ))}
    </div>
  )
}

export function PrimaryBtn({ label }: { label: string }) {
  return (
    <div className="mt-3 rounded-xl py-2 text-center text-[11px] font-semibold text-white" style={{ background: TEAL }}>
      {label}
    </div>
  )
}

export function PhoneHeader() {
  return <div className="flex items-center justify-center pb-2 pt-1"><SwMark size={20} /></div>
}

export function ScreenTitle({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="px-1 pb-2 text-center">
      <p className="font-display text-[13px] font-extrabold text-ink">{title}</p>
      {sub && <p className="mt-1 text-[9.5px] leading-snug text-ink-muted">{sub}</p>}
    </div>
  )
}

export const CATEGORIES = [
  { Icon: Home, name: 'Housing', amt: '$1,200', pct: 100, color: 'var(--teal)' },
  { Icon: ShoppingCart, name: 'Groceries', amt: '$300', pct: 84, color: 'var(--green)' },
  { Icon: UtensilsCrossed, name: 'Dining Out', amt: '$100', pct: 142, color: 'var(--coral)' },
  { Icon: Zap, name: 'Monthly Bills', amt: '$150', pct: 60, color: 'var(--amber)' },
] as const

export function CategoryRow({ Icon, name, amt, pct, color }: (typeof CATEGORIES)[number]) {
  return (
    <div className="py-1.5">
      <div className="flex items-center gap-2">
        <span className="grid h-5 w-5 place-items-center rounded-md" style={{ background: `${color}1f` }}>
          <Icon size={11} style={{ color }} />
        </span>
        <span className="flex-1 text-[10px] font-medium text-ink">{name}</span>
        <span className="text-[9.5px] font-semibold text-ink-soft">{amt}<span className="text-ink-muted">/mo</span></span>
      </div>
      <div className="mt-1 h-1 w-full rounded-full" style={{ background: SOFT }}>
        <div className="h-1 rounded-full" style={{ width: `${Math.min(pct, 100)}%`, background: color }} />
      </div>
    </div>
  )
}

// "Give every dollar a job" / Ready-to-Assign screen body
export function ReadyToAssignScreen() {
  return (
    <>
      <PhoneHeader />
      <ScreenTitle title="Give every dollar a job" sub="Assign your money to your budget categories." />
      <div className="rounded-xl p-2.5 ghair">
        <p className="text-[9px] font-semibold uppercase tracking-wide text-ink-muted">Ready to Assign</p>
        <div className="mt-1 rounded-lg py-1.5 text-center text-[15px] font-extrabold text-white" style={{ background: TEAL }}>$5,000</div>
        <div className="mt-2 space-y-1">
          {CATEGORIES.map((c) => (
            <div key={c.name} className="flex items-center gap-2 text-[9.5px]">
              <span className="grid h-4 w-4 place-items-center rounded" style={{ background: `${c.color}1f` }}>
                <c.Icon size={9} style={{ color: c.color }} />
              </span>
              <span className="flex-1 text-ink">{c.name}</span>
              <span className="font-semibold text-ink-soft">{c.amt}</span>
            </div>
          ))}
        </div>
      </div>
      <PrimaryBtn label="Next" />
    </>
  )
}

// "What do you spend on?" / budget categories screen body
export function BudgetSetupScreen() {
  return (
    <>
      <PhoneHeader />
      <ScreenTitle title="What do you spend on?" sub="Add your budget categories so you're ready to assign your money." />
      <div className="rounded-xl p-2 ghair">
        {CATEGORIES.map((c) => <CategoryRow key={c.name} {...c} />)}
        <div className="mt-1 flex items-center gap-2 rounded-lg py-1.5" style={{ background: 'var(--teal-soft)' }}>
          <Plus size={11} className="ml-1.5" style={{ color: TEAL }} />
          <span className="text-[10px] font-semibold" style={{ color: 'var(--teal-deep)' }}>Add Category</span>
        </div>
      </div>
      <ProgressDots active={3} />
    </>
  )
}

// "Where is your money?" / add accounts screen body
export function AddAccountsScreen() {
  const rows = [
    { name: 'Fictional Bank', sub: 'Checking', amt: '$2,000' },
    { name: 'Fictional Bank', sub: 'Savings', amt: '$3,500' },
  ]
  return (
    <>
      <PhoneHeader />
      <ScreenTitle title="Where is your money?" sub="Add your bank, investment, and cash accounts." />
      <div className="rounded-xl p-2 ghair">
        <p className="px-1 pb-1 text-[9px] font-semibold uppercase tracking-wide text-ink-muted">Linked accounts</p>
        {rows.map((r, i) => (
          <div key={i} className="flex items-center gap-2 py-1.5">
            <span className="grid h-5 w-5 place-items-center rounded-md" style={{ background: 'var(--teal-soft)' }}>
              <Home size={11} style={{ color: TEAL }} />
            </span>
            <span className="flex-1 text-[10px] font-medium text-ink">{r.name}<span className="block text-[8.5px] text-ink-muted">{r.sub}</span></span>
            <span className="text-[9.5px] font-semibold text-ink-soft">{r.amt}</span>
          </div>
        ))}
        <div className="mt-1 flex items-center gap-2 rounded-lg py-1.5" style={{ background: 'var(--teal-soft)' }}>
          <Plus size={11} className="ml-1.5" style={{ color: TEAL }} />
          <span className="text-[10px] font-semibold" style={{ color: 'var(--teal-deep)' }}>Add Account</span>
        </div>
      </div>
      <ProgressDots active={2} />
    </>
  )
}

// Insights screen body — donut + sparkline + AI nudge
export function InsightsScreen() {
  return (
    <>
      <PhoneHeader />
      <ScreenTitle title="This month" sub="Spending by category" />
      <div className="flex items-center gap-3 rounded-xl p-2.5 ghair">
        <Donut segments={[['var(--teal)', 38], ['var(--green)', 24], ['var(--coral)', 22], ['var(--amber)', 16]]} size={52} />
        <div className="flex-1 space-y-1">
          {CATEGORIES.map((c) => (
            <div key={c.name} className="flex items-center gap-1.5 text-[9px]">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: c.color }} />
              <span className="flex-1 text-ink-soft">{c.name}</span>
              <span className="font-semibold text-ink">{c.amt}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-2 rounded-xl p-2.5 text-[9px] leading-snug" style={{ background: 'var(--teal-soft)', color: 'var(--teal-deep)' }}>
        <span className="font-semibold">SpendWise:</span> You&apos;re on pace to overspend Dining Out by ~$60 — move $40 from Groceries?
      </div>
    </>
  )
}

export function Donut({ segments, size = 56 }: { segments: [string, number][]; size?: number }) {
  let acc = 0
  const stops = segments
    .map(([c, v]) => { const seg = `${c} ${acc}% ${acc + v}%`; acc += v; return seg })
    .join(', ')
  return (
    <div className="shrink-0 rounded-full" style={{ width: size, height: size, background: `conic-gradient(${stops})` }}>
      <div className="rounded-full bg-white" style={{ margin: size * 0.16, width: size * 0.68, height: size * 0.68 }} />
    </div>
  )
}

export function Sparkbars({ values, color = 'var(--teal)', h = 26 }: { values: number[]; color?: string; h?: number }) {
  const max = Math.max(...values)
  return (
    <div className="flex items-end gap-1" style={{ height: h }}>
      {values.map((v, i) => (
        <div key={i} className="flex-1 rounded-sm" style={{ height: `${(v / max) * 100}%`, background: color, opacity: 0.35 + 0.5 * (i / values.length) }} />
      ))}
    </div>
  )
}
```

- [ ] **Step 2: Verify build is clean**

Run (from `frontend/`): `npm run type-check && npm run lint`
Expected: both pass. (If lint flags unescaped apostrophes, ensure `&apos;` is used as above.)

- [ ] **Step 3: Commit**

```bash
git add frontend/src/components/casestudy/spendwise/SwScreens.tsx
git commit -m "feat(spendwise): shared screen + chart mock primitives"
```

---

### Task 5: `SwHero`

**Files:**
- Create: `frontend/src/components/casestudy/spendwise/SwHero.tsx`

- [ ] **Step 1: Create the component**

```tsx
// frontend/src/components/casestudy/spendwise/SwHero.tsx
import Link from 'next/link'
import { ArrowRight, ArrowLeft, Sparkles } from 'lucide-react'
import { SwPhone } from './SwPhone'
import { ReadyToAssignScreen, Sparkbars, CategoryRow, CATEGORIES } from './SwScreens'

const META = [
  { k: 'Role', v: 'Product & systems design' },
  { k: 'Surface', v: 'iOS · Android · Web' },
  { k: 'Method', v: 'Zero-based budgeting' },
  { k: 'Stack', v: 'React Native · Expo · Node · Postgres' },
]

export function SwHero() {
  return (
    <section className="relative overflow-hidden">
      <div className="hero-wash pointer-events-none absolute inset-0" aria-hidden />
      <div className="relative mx-auto max-w-[1180px] px-6 pb-14 pt-12 lg:pt-16">
        <Link href="/work" className="group inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted transition-colors hover:text-ink">
          <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" />
          All work
        </Link>

        <div className="mt-6 grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <span className="anim-rise inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-soft ghair">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'var(--teal)' }} />
              Fintech · AI-native planning platform
            </span>

            <h1 className="anim-rise mt-5 font-display text-[2.5rem] font-extrabold leading-[1.06] text-ink sm:text-[3rem] lg:text-[3.4rem]" style={{ animationDelay: '60ms' }}>
              SpendWise — give every
              <br />
              <span className="grad-swirl-text">dollar a job.</span>
            </h1>

            <p className="anim-rise mt-5 max-w-[44ch] text-[1.08rem] leading-relaxed text-ink-soft" style={{ animationDelay: '120ms' }}>
              A modern financial operating system: onboard, connect accounts, build a
              zero-based budget, track every transaction, and let AI-assisted planning keep
              the plan honest — calm, mobile-first, and operationally thoughtful.
            </p>

            <div className="anim-rise mt-7 flex flex-wrap items-center gap-3" style={{ animationDelay: '180ms' }}>
              <Link href="#product" className="group inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white soft-shadow transition-transform hover:-translate-y-0.5" style={{ background: 'var(--teal)' }}>
                See the product
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link href="#problem" className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-ink ghair-2 transition-colors hover:bg-[var(--cream-2)]">
                Start from the friction
              </Link>
            </div>

            <dl className="anim-rise mt-9 grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-4" style={{ animationDelay: '220ms' }}>
              {META.map((m) => (
                <div key={m.k}>
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">{m.k}</dt>
                  <dd className="mt-1 text-sm font-medium text-ink">{m.v}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* layered preview composition */}
          <div className="anim-rise relative mx-auto w-full max-w-[460px]" style={{ animationDelay: '260ms' }}>
            <div className="absolute left-1/2 top-1/2 h-52 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl" style={{ background: 'radial-gradient(closest-side, rgba(13,148,136,0.16), transparent)' }} aria-hidden />
            {/* dashboard card behind */}
            <div className="absolute -left-2 top-6 w-[78%] rounded-2xl bg-white p-4 ghair soft-shadow">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-ink-muted">This month</p>
              <div className="mt-2"><Sparkbars values={[40, 62, 48, 70, 55, 80, 64]} /></div>
              <div className="mt-3 space-y-1.5">{CATEGORIES.slice(0, 3).map((c) => <CategoryRow key={c.name} {...c} />)}</div>
            </div>
            {/* phone in front */}
            <div className="relative ml-auto"><SwPhone width={210}><ReadyToAssignScreen /></SwPhone></div>
            {/* floating AI chip */}
            <div className="absolute -bottom-3 left-0 flex items-center gap-2 rounded-xl bg-white px-3 py-2 ghair soft-shadow-sm">
              <span className="grid h-6 w-6 place-items-center rounded-lg" style={{ background: 'var(--teal-soft)' }}><Sparkles size={12} style={{ color: 'var(--teal-deep)' }} /></span>
              <span className="text-[10px] font-medium leading-tight text-ink-soft">Insight: $40 left to assign<br /><span className="text-ink-muted">tap to finish your plan</span></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify build is clean**

Run (from `frontend/`): `npm run type-check && npm run lint`
Expected: both pass.

- [ ] **Step 3: Commit**

```bash
git add frontend/src/components/casestudy/spendwise/SwHero.tsx
git commit -m "feat(spendwise): SwHero"
```

---

### Task 6: `SwProblem`

**Files:**
- Create: `frontend/src/components/casestudy/spendwise/SwProblem.tsx`

- [ ] **Step 1: Create the component**

```tsx
// frontend/src/components/casestudy/spendwise/SwProblem.tsx
import { Layers, Grid3x3, Unlink, SlidersHorizontal, Boxes } from 'lucide-react'
import { CsSection, Module } from '../bits'
import { SwMark } from './SwMark'

const PAINS = [
  { Icon: Layers, title: 'Fragmented visibility', note: 'Balances scattered across banks and apps.' },
  { Icon: Grid3x3, title: 'Budgeting friction', note: 'Spreadsheets that rot after week one.' },
  { Icon: Unlink, title: 'Disconnected tracking', note: 'Transactions that never reach a plan.' },
  { Icon: SlidersHorizontal, title: 'Overwhelming planning', note: 'Too many knobs, no clear next step.' },
  { Icon: Boxes, title: 'Poor organization', note: 'Spending piles up uncategorized.' },
]

export function SwProblem() {
  return (
    <CsSection
      id="problem"
      eyebrow="The friction"
      title="Money is everywhere. Clarity isn't."
      intro="Most people don't lack discipline — they lack one place where the plan, the accounts, and the spending actually meet. SpendWise starts there."
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {PAINS.map((p) => (
          <Module key={p.title} className="flex items-start gap-3">
            <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl" style={{ background: 'var(--cream-2)' }}>
              <p.Icon size={16} className="text-ink-soft" />
            </span>
            <div>
              <p className="font-display text-[15px] font-bold text-ink">{p.title}</p>
              <p className="mt-1 text-[13px] leading-relaxed text-ink-soft">{p.note}</p>
            </div>
          </Module>
        ))}
        <Module className="flex flex-col items-center justify-center gap-2 text-center" style={{ background: 'linear-gradient(135deg,var(--teal-soft),#f4fbf7)' }}>
          <SwMark size={26} withWordmark={false} />
          <p className="font-display text-[15px] font-bold text-ink">One plan underneath</p>
          <p className="text-[13px] leading-relaxed text-ink-soft">Accounts, budget, and transactions on a single operational model.</p>
        </Module>
      </div>
    </CsSection>
  )
}
```

- [ ] **Step 2: Verify build is clean**

Run (from `frontend/`): `npm run type-check && npm run lint`
Expected: both pass.

- [ ] **Step 3: Commit**

```bash
git add frontend/src/components/casestudy/spendwise/SwProblem.tsx
git commit -m "feat(spendwise): SwProblem pain map"
```

---

### Task 7: `SwExperience` (client — tab explorer)

**Files:**
- Create: `frontend/src/components/casestudy/spendwise/SwExperience.tsx`

- [ ] **Step 1: Create the component**

```tsx
// frontend/src/components/casestudy/spendwise/SwExperience.tsx
'use client'

import { useState } from 'react'
import {
  Rocket, Landmark, Wallet, ArrowLeftRight, Repeat, LineChart, LayoutDashboard, Sparkles,
} from 'lucide-react'
import { CsSection } from '../bits'
import {
  AddAccountsScreen, BudgetSetupScreen, ReadyToAssignScreen, InsightsScreen,
  CATEGORIES, CategoryRow, Donut, Sparkbars,
} from './SwScreens'

type TabKey = 'onboarding' | 'accounts' | 'budget' | 'transactions' | 'recurring' | 'insights' | 'planning'

const TABS: { key: TabKey; Icon: typeof Rocket; label: string; note: string }[] = [
  { key: 'onboarding', Icon: Rocket, label: 'Onboarding', note: 'A guided start — name, accounts, categories, assign.' },
  { key: 'accounts', Icon: Landmark, label: 'Add accounts', note: 'Checking, savings, cash — all balances in one view.' },
  { key: 'budget', Icon: Wallet, label: 'Budget setup', note: 'Create categories with monthly targets and utilization bars.' },
  { key: 'transactions', Icon: ArrowLeftRight, label: 'Transactions', note: 'Auto-categorized activity that flows straight into the plan.' },
  { key: 'recurring', Icon: Repeat, label: 'Recurring', note: 'Subscriptions and bills with cadence and next-date awareness.' },
  { key: 'insights', Icon: LineChart, label: 'Insights', note: 'Spend by category, trends, and one grounded AI nudge.' },
  { key: 'planning', Icon: LayoutDashboard, label: 'Planning dashboard', note: 'Ready-to-assign, assignments, age of money, forecast.' },
]

function Mock({ tab }: { tab: TabKey }) {
  if (tab === 'onboarding')
    return <div className="flex justify-center"><Phone><Onboarding /></Phone></div>
  if (tab === 'accounts')
    return <div className="flex justify-center"><Phone><AddAccountsScreen /></Phone></div>
  if (tab === 'budget')
    return <div className="flex justify-center"><Phone><BudgetSetupScreen /></Phone></div>
  if (tab === 'transactions') return <Transactions />
  if (tab === 'recurring') return <Recurring />
  if (tab === 'insights')
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_220px]">
        <InsightsPanel />
        <div className="flex justify-center"><Phone><InsightsScreen /></Phone></div>
      </div>
    )
  return <PlanningDashboard />
}

// local lightweight phone (no notch) so the explorer reads as an in-app preview
function Phone({ children }: { children: React.ReactNode }) {
  return <div className="w-[220px] rounded-2xl bg-white p-3 ghair soft-shadow">{children}</div>
}

function Onboarding() {
  return (
    <div className="text-center">
      <p className="font-display text-[13px] font-extrabold text-ink">Let&apos;s get started</p>
      <p className="mt-1 text-[9.5px] leading-snug text-ink-muted">Tell us a bit about yourself to set up your budget.</p>
      <div className="my-3 h-16 rounded-xl" style={{ background: 'var(--cream-2)' }} />
      <div className="space-y-1.5">
        {['Your name', 'Currency', 'Pay schedule'].map((l) => (
          <div key={l} className="rounded-lg px-2 py-1.5 text-left text-[10px] text-ink-soft ghair">{l}</div>
        ))}
      </div>
      <div className="mt-3 rounded-xl py-2 text-[11px] font-semibold text-white" style={{ background: 'var(--teal)' }}>Continue</div>
    </div>
  )
}

function Transactions() {
  const rows = [
    { m: 'Whole Foods', a: '-$84.20', c: 'Groceries', color: 'var(--green)' },
    { m: 'Shell', a: '-$48.00', c: 'Transport', color: 'var(--blue)' },
    { m: 'Olive & Vine', a: '-$32.50', c: 'Dining Out', color: 'var(--coral)' },
    { m: 'Acme Payroll', a: '+$2,500.00', c: 'Income', color: 'var(--teal)' },
    { m: 'City Power', a: '-$96.40', c: 'Monthly Bills', color: 'var(--amber)' },
  ]
  return (
    <div className="rounded-2xl bg-white p-5 ghair soft-shadow">
      <div className="flex items-center justify-between">
        <p className="font-display text-sm font-bold text-ink">Recent activity</p>
        <span className="text-[11px] text-ink-muted">Auto-categorized</span>
      </div>
      <div className="mt-3 divide-y" style={{ borderColor: 'var(--line)' }}>
        {rows.map((r) => (
          <div key={r.m} className="flex items-center gap-3 py-2.5">
            <span className="h-2 w-2 rounded-full" style={{ background: r.color }} />
            <span className="flex-1 text-[13px] font-medium text-ink">{r.m}</span>
            <span className="rounded-full px-2 py-0.5 text-[10px] font-medium text-ink-soft" style={{ background: 'var(--cream-2)' }}>{r.c}</span>
            <span className={`w-20 text-right text-[13px] font-semibold ${r.a.startsWith('+') ? '' : 'text-ink'}`} style={r.a.startsWith('+') ? { color: 'var(--teal-deep)' } : undefined}>{r.a}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function Recurring() {
  const rows = [
    { m: 'Rent', cadence: 'Monthly · 1st', next: 'in 6 days', amt: '$1,200', color: 'var(--teal)' },
    { m: 'Streaming bundle', cadence: 'Monthly · 14th', next: 'in 12 days', amt: '$24', color: 'var(--coral)' },
    { m: 'Car insurance', cadence: 'Every 6 months', next: 'in 41 days', amt: '$360', color: 'var(--blue)' },
    { m: 'Gym', cadence: 'Monthly · 3rd', next: 'in 8 days', amt: '$39', color: 'var(--amber)' },
  ]
  return (
    <div className="rounded-2xl bg-white p-5 ghair soft-shadow">
      <p className="font-display text-sm font-bold text-ink">Recurring & true expenses</p>
      <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        {rows.map((r) => (
          <div key={r.m} className="rounded-xl p-3 ghair">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full" style={{ background: r.color }} />
              <span className="flex-1 text-[13px] font-semibold text-ink">{r.m}</span>
              <span className="text-[13px] font-semibold text-ink">{r.amt}</span>
            </div>
            <p className="mt-1 text-[11px] text-ink-muted">{r.cadence} · next {r.next}</p>
            <div className="mt-2 flex gap-1">
              {Array.from({ length: 12 }).map((_, i) => (
                <span key={i} className="h-1.5 flex-1 rounded-full" style={{ background: i === 2 ? r.color : 'var(--line)' }} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function InsightsPanel() {
  return (
    <div className="rounded-2xl bg-white p-5 ghair soft-shadow">
      <p className="font-display text-sm font-bold text-ink">Spending analytics</p>
      <div className="mt-3 flex items-end gap-2" style={{ height: 90 }}>
        {[58, 72, 49, 80, 66, 90, 74, 61].map((v, i) => (
          <div key={i} className="flex-1 rounded-md" style={{ height: `${v}%`, background: 'var(--teal)', opacity: 0.3 + 0.5 * (i / 8) }} />
        ))}
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[['Spent', '$1,860'], ['Ready to assign', '$240'], ['Age of money', '23 days'], ['Forecast', '$2,090']].map(([k, v]) => (
          <div key={k} className="rounded-xl p-2.5" style={{ background: 'var(--cream-2)' }}>
            <p className="text-[10px] uppercase tracking-wide text-ink-muted">{k}</p>
            <p className="mt-0.5 text-sm font-bold text-ink">{v}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function PlanningDashboard() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.4fr_1fr]">
      <div className="rounded-2xl bg-white p-5 ghair soft-shadow">
        <div className="flex items-center justify-between rounded-xl p-3" style={{ background: 'var(--teal-soft)' }}>
          <span className="text-[12px] font-semibold" style={{ color: 'var(--teal-deep)' }}>Ready to Assign</span>
          <span className="font-display text-xl font-extrabold" style={{ color: 'var(--teal-deep)' }}>$5,000</span>
        </div>
        <div className="mt-3 space-y-1">{CATEGORIES.map((c) => <CategoryRow key={c.name} {...c} />)}</div>
      </div>
      <div className="space-y-4">
        <div className="rounded-2xl bg-white p-5 ghair soft-shadow">
          <p className="font-display text-sm font-bold text-ink">Category mix</p>
          <div className="mt-3 flex items-center gap-4">
            <Donut segments={[['var(--teal)', 38], ['var(--green)', 24], ['var(--coral)', 22], ['var(--amber)', 16]]} size={72} />
            <div className="flex-1 space-y-1.5">
              {CATEGORIES.map((c) => (
                <div key={c.name} className="flex items-center gap-2 text-[11px]">
                  <span className="h-2 w-2 rounded-full" style={{ background: c.color }} />
                  <span className="flex-1 text-ink-soft">{c.name}</span>
                  <span className="font-semibold text-ink">{c.amt}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="rounded-2xl p-5 ghair" style={{ background: 'linear-gradient(135deg,var(--teal-soft),#f4fbf7)' }}>
          <div className="flex items-center gap-2"><Sparkles size={14} style={{ color: 'var(--teal-deep)' }} /><span className="text-[12px] font-semibold" style={{ color: 'var(--teal-deep)' }}>AI assist</span></div>
          <p className="mt-1.5 text-[13px] leading-relaxed text-ink-soft">Dining Out is trending 42% over. Move $40 from Groceries to stay on plan?</p>
          <div className="mt-3 flex gap-2">
            <span className="rounded-lg px-3 py-1.5 text-[11px] font-semibold text-white" style={{ background: 'var(--teal)' }}>Accept</span>
            <span className="rounded-lg bg-white px-3 py-1.5 text-[11px] font-semibold text-ink ghair-2">Adjust</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export function SwExperience() {
  const [active, setActive] = useState<TabKey>('budget')
  const note = TABS.find((t) => t.key === active)!.note
  return (
    <CsSection
      id="product"
      eyebrow="The product"
      title="One operating system for your money."
      intro="Onboarding to optimization, on a single model — here's what each surface looks like."
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[260px_1fr]">
        <div className="flex flex-col gap-1.5">
          {TABS.map((t) => {
            const on = t.key === active
            return (
              <button
                key={t.key}
                onClick={() => setActive(t.key)}
                className={`flex items-center gap-3 rounded-xl px-3.5 py-3 text-left text-sm transition-colors ${on ? 'bg-white ghair-2 soft-shadow-sm' : 'hover:bg-white/60'}`}
              >
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg" style={{ background: on ? 'var(--teal-soft)' : 'var(--cream-2)' }}>
                  <t.Icon size={15} style={{ color: on ? 'var(--teal-deep)' : 'var(--ink-soft)' }} />
                </span>
                <span className={`font-medium ${on ? 'text-ink' : 'text-ink-soft'}`}>{t.label}</span>
              </button>
            )
          })}
        </div>
        <div className="rounded-2xl p-6 ghair" style={{ background: 'var(--cream-2)' }}>
          <p className="mb-4 text-[13px] leading-relaxed text-ink-soft">{note}</p>
          <Mock tab={active} />
        </div>
      </div>
    </CsSection>
  )
}
```

- [ ] **Step 2: Verify build is clean**

Run (from `frontend/`): `npm run type-check && npm run lint`
Expected: both pass.

- [ ] **Step 3: Commit**

```bash
git add frontend/src/components/casestudy/spendwise/SwExperience.tsx
git commit -m "feat(spendwise): SwExperience tab explorer"
```

---

### Task 8: `SwWorkflow` (client — scrubber)

**Files:**
- Create: `frontend/src/components/casestudy/spendwise/SwWorkflow.tsx`

- [ ] **Step 1: Create the component**

```tsx
// frontend/src/components/casestudy/spendwise/SwWorkflow.tsx
'use client'

import { useState } from 'react'
import { UserPlus, Landmark, Wallet, ArrowLeftRight, LineChart, Wand2 } from 'lucide-react'
import { CsSection } from '../bits'
import { SwPhone } from './SwPhone'
import { BudgetSetupScreen, AddAccountsScreen, InsightsScreen } from './SwScreens'

const STOPS = [
  { Icon: UserPlus, label: 'Onboard', note: 'Name, currency, pay schedule.' },
  { Icon: Landmark, label: 'Connect accounts', note: 'Checking, savings, cash.' },
  { Icon: Wallet, label: 'Build the budget', note: 'Categories with monthly targets.' },
  { Icon: ArrowLeftRight, label: 'Track spending', note: 'Auto-categorized transactions.' },
  { Icon: LineChart, label: 'See insights', note: 'Trends and AI nudges.' },
  { Icon: Wand2, label: 'Optimize the plan', note: 'Reassign, roll over, automate.' },
]

const SCRUB = [
  { label: 'Accounts', screen: <AddAccountsScreen /> },
  { label: 'Budget', screen: <BudgetSetupScreen /> },
  { label: 'Insights', screen: <InsightsScreen /> },
]

export function SwWorkflow() {
  const [i, setI] = useState(1)
  return (
    <CsSection
      eyebrow="The flow"
      title="From signup to a plan that runs itself."
      intro="Six steps, one continuous motion — no dead ends, no spreadsheet exports, no context switching."
    >
      {/* flow rail */}
      <div className="relative">
        <svg className="absolute left-0 right-0 top-7 hidden h-2 w-full md:block" viewBox="0 0 1000 8" preserveAspectRatio="none" aria-hidden>
          <path d="M0 4 H1000" stroke="var(--teal)" strokeOpacity="0.35" strokeWidth="2" className="flow-line" />
        </svg>
        <div className="grid grid-cols-2 gap-y-8 md:grid-cols-6 md:gap-y-0">
          {STOPS.map((s, idx) => (
            <div key={s.label} className="relative flex flex-col items-center px-2 text-center">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white ghair-2 soft-shadow-sm">
                <s.Icon size={20} style={{ color: 'var(--teal-deep)' }} />
              </span>
              <p className="mt-2.5 font-display text-[13px] font-bold text-ink">{s.label}</p>
              <p className="mt-1 text-[11px] leading-snug text-ink-muted">{s.note}</p>
              <span className="absolute -top-2 right-1 text-[10px] font-semibold text-ink-muted md:hidden">{idx + 1}</span>
            </div>
          ))}
        </div>
      </div>

      {/* scrubber */}
      <div className="mt-12 flex flex-col items-center gap-5">
        <div className="flex gap-2">
          {SCRUB.map((s, idx) => (
            <button
              key={s.label}
              onClick={() => setI(idx)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${i === idx ? 'text-white' : 'bg-white text-ink-soft ghair-2 hover:text-ink'}`}
              style={i === idx ? { background: 'var(--teal)' } : undefined}
            >
              {s.label}
            </button>
          ))}
        </div>
        <SwPhone width={232}>{SCRUB[i].screen}</SwPhone>
      </div>
    </CsSection>
  )
}
```

- [ ] **Step 2: Verify build is clean**

Run (from `frontend/`): `npm run type-check && npm run lint`
Expected: both pass.

- [ ] **Step 3: Commit**

```bash
git add frontend/src/components/casestudy/spendwise/SwWorkflow.tsx
git commit -m "feat(spendwise): SwWorkflow flow rail + scrubber"
```

---

### Task 9: `SwInsights`

**Files:**
- Create: `frontend/src/components/casestudy/spendwise/SwInsights.tsx`

- [ ] **Step 1: Create the component**

```tsx
// frontend/src/components/casestudy/spendwise/SwInsights.tsx
import { Sparkles } from 'lucide-react'
import { CsSection, Module } from '../bits'
import { CATEGORIES, Donut, Sparkbars } from './SwScreens'

const UTIL = [
  { name: 'Housing', spent: '$1,200', of: '$1,200', pct: 100, color: 'var(--teal)' },
  { name: 'Groceries', spent: '$252', of: '$300', pct: 84, color: 'var(--green)' },
  { name: 'Dining Out', spent: '$142', of: '$100', pct: 142, color: 'var(--coral)' },
  { name: 'Monthly Bills', spent: '$90', of: '$150', pct: 60, color: 'var(--amber)' },
]

export function SwInsights() {
  return (
    <CsSection
      eyebrow="Insights & planning"
      title="See where it goes. Know what's next."
      intro="Analytics that feed planning, not just charts that sit there — every view points at a decision."
    >
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <Module>
          <p className="font-display text-sm font-bold text-ink">Spending analytics</p>
          <p className="mt-1 text-[12px] text-ink-muted">Last 8 weeks · all categories</p>
          <div className="mt-4"><Sparkbars values={[58, 72, 49, 80, 66, 90, 74, 61]} h={80} /></div>
        </Module>

        <Module>
          <p className="font-display text-sm font-bold text-ink">Category tracking</p>
          <div className="mt-3 space-y-2.5">
            {UTIL.map((u) => (
              <div key={u.name}>
                <div className="flex items-center justify-between text-[12px]">
                  <span className="text-ink-soft">{u.name}</span>
                  <span className="font-semibold text-ink">{u.spent} <span className="text-ink-muted">/ {u.of}</span></span>
                </div>
                <div className="mt-1 h-1.5 w-full rounded-full" style={{ background: 'var(--cream-2)' }}>
                  <div className="h-1.5 rounded-full" style={{ width: `${Math.min(u.pct, 100)}%`, background: u.color }} />
                </div>
              </div>
            ))}
          </div>
        </Module>

        <Module>
          <p className="font-display text-sm font-bold text-ink">Budget utilization</p>
          <div className="mt-4 grid grid-cols-2 gap-4">
            {UTIL.map((u) => (
              <div key={u.name} className="flex flex-col items-center gap-1.5">
                <Donut segments={[[u.color, Math.min(u.pct, 100)], ['var(--cream-2)', Math.max(100 - u.pct, 0)]]} size={56} />
                <p className="text-[11px] font-semibold text-ink">{u.pct}%</p>
                <p className="text-[10px] text-ink-muted">{u.name}</p>
              </div>
            ))}
          </div>
        </Module>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[['Age of money', '23 days'], ['Ready to assign', '$240'], ['Spent this month', '$1,684'], ['Forecast end-of-month', '$2,090']].map(([k, v]) => (
          <Module key={k} className="!p-4">
            <p className="text-[11px] uppercase tracking-wide text-ink-muted">{k}</p>
            <p className="mt-1 font-display text-lg font-extrabold text-ink">{v}</p>
          </Module>
        ))}
      </div>

      <div className="mt-5 flex flex-col items-start gap-4 rounded-2xl p-6 ghair sm:flex-row sm:items-center sm:justify-between" style={{ background: 'linear-gradient(120deg,var(--teal-soft),#f4fbf7)' }}>
        <div className="flex items-start gap-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white"><Sparkles size={16} style={{ color: 'var(--teal-deep)' }} /></span>
          <div>
            <p className="font-display text-[15px] font-bold text-ink">AI-assisted planning</p>
            <p className="mt-1 max-w-xl text-[13px] leading-relaxed text-ink-soft">You&apos;re on pace to overspend Dining Out by ~$60. Move $40 from Groceries and $20 from Monthly Bills to stay on plan?</p>
          </div>
        </div>
        <div className="flex gap-2">
          <span className="rounded-lg px-4 py-2 text-[12px] font-semibold text-white" style={{ background: 'var(--teal)' }}>Accept</span>
          <span className="rounded-lg bg-white px-4 py-2 text-[12px] font-semibold text-ink ghair-2">Adjust</span>
        </div>
      </div>
    </CsSection>
  )
}
```

Note: `CATEGORIES` is imported for parity with other sections but if lint flags it as unused, drop it from the import — only `Donut` and `Sparkbars` are used here.

- [ ] **Step 2: Verify build is clean**

Run (from `frontend/`): `npm run type-check && npm run lint`
Expected: both pass. If `CATEGORIES` is reported unused, remove it from the import line and re-run.

- [ ] **Step 3: Commit**

```bash
git add frontend/src/components/casestudy/spendwise/SwInsights.tsx
git commit -m "feat(spendwise): SwInsights analytics + planning"
```

---

### Task 10: `SwMobile`

**Files:**
- Create: `frontend/src/components/casestudy/spendwise/SwMobile.tsx`

- [ ] **Step 1: Create the component**

```tsx
// frontend/src/components/casestudy/spendwise/SwMobile.tsx
import { Hand, PanelBottom, Zap, WifiOff } from 'lucide-react'
import { CsSection } from '../bits'
import { SwPhone } from './SwPhone'
import {
  AddAccountsScreen, BudgetSetupScreen, ReadyToAssignScreen, InsightsScreen,
} from './SwScreens'

const PRINCIPLES = [
  { Icon: Hand, title: 'Thumb-reachable actions', note: 'Primary controls live in the bottom third.' },
  { Icon: PanelBottom, title: 'Bottom-sheet flows', note: 'Add a transaction or assign money without leaving the screen.' },
  { Icon: Zap, title: 'Optimistic updates', note: 'The plan reflects your tap immediately; sync follows.' },
  { Icon: WifiOff, title: 'Offline-tolerant', note: 'Capture spending now; reconcile when you reconnect.' },
]

export function SwMobile() {
  return (
    <CsSection
      eyebrow="Mobile experience"
      title="Built mobile-first, not mobile-shrunk."
      intro="The phone is where money decisions actually happen — so the planning model, not a cut-down version of it, lives there."
    >
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px]">
        <div className="flex flex-wrap items-end justify-center gap-4 sm:gap-6">
          <SwPhone width={190} className="rotate-[-3deg]"><AddAccountsScreen /></SwPhone>
          <SwPhone width={210}><BudgetSetupScreen /></SwPhone>
          <SwPhone width={210}><ReadyToAssignScreen /></SwPhone>
          <SwPhone width={190} className="rotate-[3deg]"><InsightsScreen /></SwPhone>
        </div>
        <div className="flex flex-col gap-3">
          {PRINCIPLES.map((p) => (
            <div key={p.title} className="flex items-start gap-3 rounded-2xl bg-white p-4 ghair soft-shadow-sm">
              <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl" style={{ background: 'var(--teal-soft)' }}>
                <p.Icon size={15} style={{ color: 'var(--teal-deep)' }} />
              </span>
              <div>
                <p className="font-display text-[14px] font-bold text-ink">{p.title}</p>
                <p className="mt-0.5 text-[12.5px] leading-relaxed text-ink-soft">{p.note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </CsSection>
  )
}
```

- [ ] **Step 2: Verify build is clean**

Run (from `frontend/`): `npm run type-check && npm run lint`
Expected: both pass.

- [ ] **Step 3: Commit**

```bash
git add frontend/src/components/casestudy/spendwise/SwMobile.tsx
git commit -m "feat(spendwise): SwMobile showcase"
```

---

### Task 11: `SwFutureAI`

**Files:**
- Create: `frontend/src/components/casestudy/spendwise/SwFutureAI.tsx`

- [ ] **Step 1: Create the component**

```tsx
// frontend/src/components/casestudy/spendwise/SwFutureAI.tsx
import { Target, TrendingUp, MessageSquareText, ShieldAlert, Workflow, BellRing } from 'lucide-react'
import { CsSection, Module, Chip } from '../bits'

const ITEMS = [
  { Icon: Target, title: 'Intelligent budgeting assistance', note: 'Suggest category targets from spending history and upcoming bills.', tag: 'Direction' },
  { Icon: TrendingUp, title: 'Predictive spending insights', note: 'Forecast month-end by category before it happens.', tag: 'Exploring' },
  { Icon: MessageSquareText, title: 'Financial workflow copilot', note: '"Move $50 from Groceries to Dining Out" in plain language.', tag: 'Direction' },
  { Icon: ShieldAlert, title: 'Anomaly detection', note: 'Flag duplicate charges and unusual merchants for review.', tag: 'Exploring' },
  { Icon: Workflow, title: 'Planning automation', note: 'Auto-roll leftover funds and auto-fund true expenses each cycle.', tag: 'Direction' },
  { Icon: BellRing, title: 'Contextual recommendations', note: 'Nudges tied to recurring bills, low buffers, and goal pace.', tag: 'Exploring' },
]

export function SwFutureAI() {
  return (
    <CsSection
      eyebrow="Future · AI opportunities"
      title="Where the assistant goes next."
      intro="Grounded extensions of the same model — assistive, explainable, and always reversible."
      footnote="Directions under consideration, not shipped features. Each would surface its reasoning and stay user-confirmable."
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {ITEMS.map((it) => (
          <Module key={it.title} className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="grid h-9 w-9 place-items-center rounded-xl" style={{ background: 'var(--teal-soft)' }}>
                <it.Icon size={16} style={{ color: 'var(--teal-deep)' }} />
              </span>
              <Chip tone="neutral">{it.tag}</Chip>
            </div>
            <div>
              <p className="font-display text-[15px] font-bold text-ink">{it.title}</p>
              <p className="mt-1 text-[13px] leading-relaxed text-ink-soft">{it.note}</p>
            </div>
          </Module>
        ))}
      </div>
    </CsSection>
  )
}
```

- [ ] **Step 2: Verify build is clean**

Run (from `frontend/`): `npm run type-check && npm run lint`
Expected: both pass.

- [ ] **Step 3: Commit**

```bash
git add frontend/src/components/casestudy/spendwise/SwFutureAI.tsx
git commit -m "feat(spendwise): SwFutureAI"
```

---

### Task 12: `SwClose`

**Files:**
- Create: `frontend/src/components/casestudy/spendwise/SwClose.tsx`

- [ ] **Step 1: Create the component** (mirrors `EtClose`, teal palette, SpendWise links)

```tsx
// frontend/src/components/casestudy/spendwise/SwClose.tsx
import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { SwMark } from './SwMark'

export function SwClose() {
  return (
    <section className="mx-auto max-w-[1180px] px-6 py-12">
      <div className="flex flex-col items-start gap-6 rounded-3xl px-9 py-9 ghair sm:flex-row sm:items-center sm:justify-between" style={{ background: 'linear-gradient(105deg,var(--teal-soft) 0%,#f4fbf7 45%,#fef3e2 100%)' }}>
        <div>
          <div className="mb-3"><SwMark size={24} /></div>
          <h2 className="font-display text-2xl font-extrabold leading-tight text-ink sm:text-[1.75rem]">Want a walkthrough of the platform?</h2>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-soft">Happy to talk through the zero-based budgeting model, the onboarding flow, and how AI-assisted planning stays grounded and reversible.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Link href="/work/apex-protocol" className="group inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-ink ghair-2 transition-colors hover:bg-white/70">
            <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-0.5" />
            Next project
          </Link>
          <Link href="/contact" className="group inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white soft-shadow-sm transition-transform hover:-translate-y-0.5" style={{ background: 'var(--teal)' }}>
            Get in touch
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify build is clean**

Run (from `frontend/`): `npm run type-check && npm run lint`
Expected: both pass.

- [ ] **Step 3: Commit**

```bash
git add frontend/src/components/casestudy/spendwise/SwClose.tsx
git commit -m "feat(spendwise): SwClose"
```

---

### Task 13: Compose the page

**Files:**
- Modify (replace whole file): `frontend/src/app/work/spendwise/page.tsx`

- [ ] **Step 1: Replace the file contents**

```tsx
import type { Metadata } from 'next'
import { HomeNav } from '@/components/home/HomeNav'
import { SiteFooter } from '@/components/home/SiteFooter'
import { Reveal } from '@/components/home/Reveal'
import { SwHero } from '@/components/casestudy/spendwise/SwHero'
import { SwProblem } from '@/components/casestudy/spendwise/SwProblem'
import { SwExperience } from '@/components/casestudy/spendwise/SwExperience'
import { SwWorkflow } from '@/components/casestudy/spendwise/SwWorkflow'
import { SwInsights } from '@/components/casestudy/spendwise/SwInsights'
import { SwMobile } from '@/components/casestudy/spendwise/SwMobile'
import { SwFutureAI } from '@/components/casestudy/spendwise/SwFutureAI'
import { SwClose } from '@/components/casestudy/spendwise/SwClose'

export const metadata: Metadata = {
  title: 'SpendWise — AI-native financial planning platform — Lloyd Dela Cruz',
  description:
    'SpendWise: a modern, AI-native financial planning and operational budgeting platform — onboarding, account aggregation, zero-based budgeting, transaction tracking, recurring expenses, analytics, and AI-assisted planning, mobile-first.',
}

export default function Page() {
  return (
    <div className="home2 min-h-screen">
      <HomeNav active="Work" />
      <main>
        <SwHero />
        <Reveal><SwProblem /></Reveal>
        <Reveal><SwExperience /></Reveal>
        <Reveal><SwWorkflow /></Reveal>
        <Reveal><SwInsights /></Reveal>
        <Reveal><SwMobile /></Reveal>
        <Reveal><SwFutureAI /></Reveal>
        <SwClose />
      </main>
      <SiteFooter />
    </div>
  )
}
```

- [ ] **Step 2: Verify build is clean**

Run (from `frontend/`): `npm run type-check && npm run lint && npm run build`
Expected: all pass; `/work/spendwise` appears in the build output.

- [ ] **Step 3: Commit**

```bash
git add frontend/src/app/work/spendwise/page.tsx
git commit -m "feat(spendwise): compose case-study page"
```

---

### Task 14: Visual verification & polish pass

**Files:** any of the above, as needed.

- [ ] **Step 1: Run the dev server and inspect**

Run (from `frontend/`): `npm run dev` and open `http://localhost:3001/work/spendwise`.

Check:
- All 8 sections render top to bottom; nav highlights "Work".
- `SwExperience` tabs switch the mock; `SwWorkflow` scrubber buttons switch the phone screen.
- Hero layered composition doesn't overlap/clip badly at ≥1180px, ~768px, and 375px widths.
- Phone frames, donuts, bars, and category rows look intentional (no zero-height bars, no overflow).
- The SpendWise card on `/` and the `/work` listing still link here and render.
- Toggle "Reduce motion" in OS settings → entrance animations and the `flow-line` dash stop.

- [ ] **Step 2: Fix any layout/visual issues found**

Make targeted edits. Re-run `npm run type-check && npm run lint` after edits.

- [ ] **Step 3: Commit any fixes**

```bash
git add -A
git commit -m "fix(spendwise): visual polish pass"
```

(Skip the commit if Step 2 made no changes.)

---

## Self-Review Notes

- **Spec coverage:** Hero (T5), Financial Problems (T6), Product Experience / 7 surfaces (T7), Workflow Demo (T8), Insights & Planning (T9), Mobile Experience (T10), Future AI (T11), Close (T12), page composition + metadata + token additions (T1, T13). All spec sections covered.
- **Placeholders:** none — every code step shows full file content.
- **Type consistency:** `CATEGORIES`/`CategoryRow`/`Donut`/`Sparkbars`/`ReadyToAssignScreen`/`BudgetSetupScreen`/`AddAccountsScreen`/`InsightsScreen` are all defined in Task 4 (`SwScreens.tsx`) and consumed with matching names/signatures in Tasks 5, 7, 8, 9, 10. `SwPhone` (Task 3) and `SwMark` (Task 2) used with the prop names they declare. `CsSection`/`Module`/`Chip` come from the existing `casestudy/bits.tsx` with the signatures shown there.
- **Lint watch-points:** unescaped apostrophes must be `&apos;` (flagged inline in Tasks 4, 7, 9); a possibly-unused `CATEGORIES` import in Task 9 (instruction to remove if flagged).
