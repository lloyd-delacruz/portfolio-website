# Homepage Warm-Light Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.
>
> **Also load the `frontend-design` skill** before doing the restyle tasks — the plan gives an exact color mapping and structure notes; apply that skill's judgment for spacing, weight, and polish so the result looks intentional, not mechanically recolored.

**Goal:** Re-theme the homepage (and the `/about` hero + "Let's Connect" CTA) from the dark "cathedral" look into the site's warm "paper" register — cream background, dark-ink text, bold sans typography, a single bronze-gold accent — with a clean single-column hero (no node-diagram).

**Architecture:** All work is in `frontend/src/`. New paper-surface tokens are added to `globals.css` / `tailwind.config.js`. A new `HomeHero` replaces `HeroSystemsMap`; `OperationalSystemsMap` and `SystemsMap` are deleted. The shared `home/` components and primitives are restyled to the paper register. `/about`'s hero and CTA section get the same palette/typography (deeper About sub-sections are untouched).

**Tech Stack:** Next.js 15 (App Router, static export), TypeScript (strict), Tailwind CSS, Framer Motion, lucide-react. Helpers: `cn()` (`@/lib/utils`), `usePrefersReducedMotion`, `useInViewPause`.

**Spec:** `docs/superpowers/specs/2026-05-12-homepage-warm-light-redesign-design.md`

**Verification commands** (from `frontend/`): `npm run lint`, `npm run type-check`, `npm run build`. No unit-test harness for these presentational components; verification is lint + type-check + build + a visual check via `npm run dev` (port 3001). **Do not run `npm run dev` and `npm run build` at the same time** — a concurrent dev server corrupts `frontend/.next`; if a build hangs or fails with a "Cannot find module './NNN.js'" error, `rm -rf frontend/.next` and retry.

**Focus-ring convention (light register):** `focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-ink focus-visible:outline-offset-2`.

**Paper palette — the color map every restyle task uses:**

| Role | Tailwind class | Notes |
|---|---|---|
| Page / section background | `bg-paper-bg` | #f4eee3 cream |
| Raised card / panel surface | `bg-paper-card` | new token, ~#fbf7ef |
| Hairline borders / dividers | `border-paper-subtle` (existing `rgba(0,0,0,0.08)`), or `divide-paper-subtle` | use `border-paper-border` (new, slightly stronger) only where a hairline is too faint |
| Primary text / headlines | `text-paper-ink` | #2a2520 |
| Secondary / body text | `text-paper-ink-soft` | #4a3f2f |
| Accent (eyebrows, links, numbers, icons, hover) | `text-gold-ink` (existing `gold.ink` = #7a5a32) | the only accent color |
| "Live" dot | unchanged (`bg-signal-live` green) | use sparingly |
| Headline type | `font-sans font-bold tracking-tight-display` | one word per headline in `text-gold-ink` |
| Eyebrow type | `text-[11px] font-bold uppercase tracking-wide-label text-gold-ink` | replaces mono micro-labels |
| Filled button | `bg-paper-ink text-paper-bg hover:bg-paper-ink/90` | sentence case |
| Outline button | `border border-paper-ink/25 text-paper-ink hover:border-gold-ink/60 hover:text-gold-ink` | |

`divide-paper-subtle` works because `paper-subtle` is registered under `borderColor`; if a `divide-*` utility doesn't resolve, use `[&>*+*]:border-t [&>*+*]:border-paper-subtle` or add `paper-subtle` to `colors` too — see Task 1.

---

## File Structure

**New**
- `frontend/src/components/home/HomeHero.tsx` — single-column centered hero (replaces `HeroSystemsMap.tsx`).
- `frontend/src/components/home/primitives/StatItem.tsx` — `{value,label}` credibility stat.
- `frontend/src/components/home/primitives/SectionEyebrow.tsx` — gold bold-uppercase eyebrow.

**Modified**
- `frontend/src/app/globals.css` — add `--paper-card`.
- `frontend/tailwind.config.js` — expose `paper.card`; add `borderColor['paper-border']`; ensure `paper-subtle` usable with `divide-*`.
- `frontend/src/app/page.tsx` — `<main>` → paper bg; import `HomeHero`.
- `frontend/src/components/home/NavBar.tsx` — bold sans, paper colors.
- `frontend/src/components/home/primitives/BrandWordmark.tsx` — `LD` bold sans.
- `frontend/src/components/home/primitives/CtaButton.tsx` — light-register variants.
- `frontend/src/components/home/primitives/IconBadge.tsx` — light recolor.
- `frontend/src/components/home/primitives/AccentPill.tsx` — light recolor (or delete if unused).
- `frontend/src/components/home/primitives/MonoLabel.tsx` — light-safe default.
- `frontend/src/components/home/primitives/index.ts` — export `StatItem`, `SectionEyebrow`; drop `AccentPill` if deleted.
- `frontend/src/components/home/ValuesRow.tsx`, `QuoteBar.tsx`, `FlagshipFeature.tsx`, `CapabilityIndex.tsx`, `LiveStatusPanel.tsx`, `SelectedSystems.tsx`, `EssayStrip.tsx`, `ContactStrip.tsx` — paper restyle.
- `frontend/src/app/about/page.tsx` — hero + CTA paper restyle.

**Deleted**
- `frontend/src/components/home/HeroSystemsMap.tsx`
- `frontend/src/components/home/OperationalSystemsMap.tsx`
- `frontend/src/components/home/SystemsMap.tsx`

---

## Task 1: Paper-surface tokens

**Files:**
- Modify: `frontend/src/app/globals.css`
- Modify: `frontend/tailwind.config.js`

- [ ] **Step 1: Add the `--paper-card` CSS variable**

In `frontend/src/app/globals.css`, in the `:root` block that defines the dual-register tokens, immediately after the `--paper-ink-soft` line, add:

```css
    --paper-card: 39 44% 96%;                /* #fbf7ef — raised surface on paper */
```

- [ ] **Step 2: Expose `paper.card` and a stronger paper border in Tailwind**

In `frontend/tailwind.config.js`, in `theme.extend.colors.paper`, add a `card` entry so the block reads:

```js
        paper: {
          bg:       'hsl(var(--paper-bg))',
          card:     'hsl(var(--paper-card))',
          ink:      'hsl(var(--paper-ink))',
          'ink-soft': 'hsl(var(--paper-ink-soft))',
        },
```

And in `theme.extend.borderColor`, add `'paper-border'` next to the existing `'paper-subtle'`:

```js
        'paper-subtle':   'rgba(0,0,0,0.08)',
        'paper-border':   'rgba(42,37,32,0.16)',
```

Also add `paper-subtle` and `paper-border` to `theme.extend.colors` (top level of `extend.colors`, alongside `border`, `input`, `ring`) so `divide-paper-subtle` / `border-paper-border` resolve everywhere:

```js
        'paper-subtle': 'rgba(0,0,0,0.08)',
        'paper-border': 'rgba(42,37,32,0.16)',
```

- [ ] **Step 3: Verify**

Run (from `frontend/`): `npm run type-check` → no errors. Then `npx tailwindcss -i src/app/globals.css -o /tmp/tw-check.css 2>&1 | tail -5` is optional — simpler: trust the next tasks' builds.

- [ ] **Step 4: Commit**

```bash
git add frontend/src/app/globals.css frontend/tailwind.config.js
git commit -m "feat(home): add paper-card / paper-border surface tokens"
```

---

## Task 2: `StatItem` and `SectionEyebrow` primitives

**Files:**
- Create: `frontend/src/components/home/primitives/StatItem.tsx`
- Create: `frontend/src/components/home/primitives/SectionEyebrow.tsx`
- Modify: `frontend/src/components/home/primitives/index.ts`

- [ ] **Step 1: Create `StatItem`**

```tsx
// frontend/src/components/home/primitives/StatItem.tsx
import { cn } from '@/lib/utils'

type StatItemProps = { value: string; label: string; className?: string }

export function StatItem({ value, label, className }: StatItemProps) {
  return (
    <div className={cn('text-center', className)}>
      <div className="text-2xl md:text-3xl font-bold text-gold-ink">{value}</div>
      <div className="mt-1 text-[11px] uppercase tracking-wide-label text-paper-ink-soft">{label}</div>
    </div>
  )
}
```

- [ ] **Step 2: Create `SectionEyebrow`**

```tsx
// frontend/src/components/home/primitives/SectionEyebrow.tsx
import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

type SectionEyebrowProps = { children: ReactNode; className?: string }

export function SectionEyebrow({ children, className }: SectionEyebrowProps) {
  return (
    <p className={cn('text-[11px] font-bold uppercase tracking-wide-label text-gold-ink', className)}>
      {children}
    </p>
  )
}
```

- [ ] **Step 3: Export both**

In `frontend/src/components/home/primitives/index.ts`, add:

```ts
export { StatItem } from './StatItem'
export { SectionEyebrow } from './SectionEyebrow'
```

- [ ] **Step 4: Verify**

Run: `npm run type-check` → no errors.

- [ ] **Step 5: Commit**

```bash
git add frontend/src/components/home/primitives/StatItem.tsx frontend/src/components/home/primitives/SectionEyebrow.tsx frontend/src/components/home/primitives/index.ts
git commit -m "feat(home): StatItem + SectionEyebrow primitives"
```

---

## Task 3: Restyle shared primitives for the light register

**Files:**
- Modify: `frontend/src/components/home/primitives/BrandWordmark.tsx`
- Modify: `frontend/src/components/home/primitives/CtaButton.tsx`
- Modify: `frontend/src/components/home/primitives/IconBadge.tsx`
- Modify: `frontend/src/components/home/primitives/MonoLabel.tsx`
- Modify: `frontend/src/components/home/primitives/AccentPill.tsx`

- [ ] **Step 1: `BrandWordmark` → bold sans `LD`**

Replace `frontend/src/components/home/primitives/BrandWordmark.tsx` with:

```tsx
// frontend/src/components/home/primitives/BrandWordmark.tsx
import Link from 'next/link'

export function BrandWordmark() {
  return (
    <Link
      href="/"
      className="font-sans text-2xl font-bold tracking-tight-h text-paper-ink transition-colors hover:text-gold-ink focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-ink focus-visible:outline-offset-2"
      aria-label="Lloyd Dela Cruz — home"
    >
      LD
    </Link>
  )
}
```

- [ ] **Step 2: `CtaButton` → light variants**

Replace `frontend/src/components/home/primitives/CtaButton.tsx` with:

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
        'group inline-flex items-center gap-2.5 rounded-lg px-5 py-3 text-sm font-semibold transition-colors',
        'focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-ink focus-visible:outline-offset-2',
        isFilled
          ? 'bg-paper-ink text-paper-bg hover:bg-paper-ink/90'
          : 'border border-paper-ink/25 text-paper-ink hover:border-gold-ink/60 hover:text-gold-ink',
        className,
      )}
    >
      <span>{children}</span>
      <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
    </Link>
  )
}
```

- [ ] **Step 3: `IconBadge` → light recolor**

In `frontend/src/components/home/primitives/IconBadge.tsx`, change the wrapper `<span>` className from the dark gold (`border-gold/30 bg-gold/5 text-gold`) to:

```
'inline-flex h-9 w-9 items-center justify-center rounded-md border border-gold-ink/30 bg-gold-ink/5 text-gold-ink'
```

(keep everything else the same — the `Icon` render, `aria-hidden`, `strokeWidth={1.5}`, the `className` merge).

- [ ] **Step 4: `MonoLabel` → light-safe default**

In `frontend/src/components/home/primitives/MonoLabel.tsx`, change the default text color in the base class string from `text-surface-fg-muted` to `text-paper-ink-soft`:

```tsx
// frontend/src/components/home/primitives/MonoLabel.tsx
import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

type MonoLabelProps = { children: ReactNode; className?: string }

export function MonoLabel({ children, className }: MonoLabelProps) {
  return (
    <span className={cn('font-mono text-[10px] uppercase tracking-wide-label text-paper-ink-soft', className)}>
      {children}
    </span>
  )
}
```

(Callers on dark pages already pass their own color or sit in dark sections; `MonoLabel` is only consumed from `home/` components, which after this plan are all paper. If `npm run lint`/`type-check` later flags a dark-page consumer relying on the old default, that consumer should pass `className="text-surface-fg-muted"` — note it, don't revert this.)

- [ ] **Step 5: `AccentPill` → light recolor**

In `frontend/src/components/home/primitives/AccentPill.tsx`, change the base classes from `border-surface-subtle bg-surface-card/50 ... text-surface-fg-secondary` to:

```
'inline-flex items-center gap-1.5 rounded-full border border-paper-subtle bg-paper-card/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide-label text-paper-ink-soft'
```

(If a grep shows `AccentPill` has zero consumers after the rest of this plan, delete the file and its `index.ts` export instead — but as of this task it may still be imported; recoloring is the safe default.)

- [ ] **Step 6: Verify**

Run: `npm run type-check` → no errors. (`npm run lint` may still pass with only pre-existing warnings.)

- [ ] **Step 7: Commit**

```bash
git add frontend/src/components/home/primitives/
git commit -m "feat(home): restyle primitives for the paper register"
```

---

## Task 4: `HomeHero` (replaces `HeroSystemsMap`); delete the diagram components

**Files:**
- Create: `frontend/src/components/home/HomeHero.tsx`
- Delete: `frontend/src/components/home/HeroSystemsMap.tsx`
- Delete: `frontend/src/components/home/OperationalSystemsMap.tsx`
- Delete: `frontend/src/components/home/SystemsMap.tsx`
- Modify: `frontend/src/app/page.tsx`

- [ ] **Step 1: Create `HomeHero`**

```tsx
// frontend/src/components/home/HomeHero.tsx
import { CtaButton, SectionEyebrow, StatItem } from './primitives'

const STATS = [
  { value: '10+', label: 'Years in healthcare' },
  { value: 'MSc', label: 'Data Analytics' },
  { value: 'AWS', label: 'AI Practitioner' },
]

export function HomeHero() {
  return (
    <section className="bg-paper-bg">
      <div className="mx-auto max-w-6xl px-6 pb-20 pt-32 md:pt-36">
        <div className="mx-auto max-w-3xl text-center">
          <SectionEyebrow>Applied AI Engineer · Healthcare Systems Builder</SectionEyebrow>

          <h1 className="mt-6 font-sans text-5xl font-bold leading-[1.06] tracking-tight-display text-paper-ink md:text-6xl">
            I build healthcare systems that <span className="text-gold-ink">work</span>.
          </h1>

          <p className="mx-auto mt-6 max-w-[52ch] text-lg leading-relaxed text-paper-ink-soft">
            I design and ship AI-native workflows that connect people, systems, and data —
            turning frontline complexity into operational clarity.
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <CtaButton href="/work/wheelchair-tracking" variant="filled">View case study</CtaButton>
            <CtaButton href="#systems" variant="outline">Explore the work</CtaButton>
          </div>

          <div className="mx-auto mt-12 flex max-w-md items-stretch justify-center divide-x divide-paper-subtle">
            {STATS.map((s) => (
              <div key={s.label} className="flex-1 px-4">
                <StatItem value={s.value} label={s.label} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Delete the diagram components**

```bash
git rm frontend/src/components/home/HeroSystemsMap.tsx frontend/src/components/home/OperationalSystemsMap.tsx frontend/src/components/home/SystemsMap.tsx
```

- [ ] **Step 3: Update `page.tsx`**

Replace `frontend/src/app/page.tsx` with:

```tsx
// frontend/src/app/page.tsx
import { NavBar } from '@/components/home/NavBar'
import { HomeHero } from '@/components/home/HomeHero'
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
      <main className="min-h-screen bg-paper-bg text-paper-ink">
        <HomeHero />
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

- [ ] **Step 4: Verify**

Run: `npm run type-check` → no errors (the deleted-component imports are gone; the section components still import dark-register classes — that's fixed in Tasks 5–9, but type-check should pass now). If `npm run lint` reports an unused import in any remaining file referencing the deleted components, fix it.

- [ ] **Step 5: Commit**

```bash
git add frontend/src/components/home/HomeHero.tsx frontend/src/app/page.tsx
git commit -m "feat(home): single-column warm-light hero; remove systems-map diagram"
```

---

## Task 5: Restyle `NavBar`

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
  { key: 'work',     label: 'Work',     href: '#systems' },
  { key: 'about',    label: 'About',    href: '/about' },
  { key: 'thoughts', label: 'Thoughts', href: '/blog' },
  { key: 'contact',  label: 'Contact',  href: '#contact' },
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
          ? 'border-b border-paper-subtle bg-paper-bg/80 backdrop-blur-md'
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
                  'text-sm font-semibold transition-colors',
                  'focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-ink focus-visible:outline-offset-2',
                  active === link.key ? 'text-gold-ink' : 'text-paper-ink-soft hover:text-paper-ink',
                )}
              >
                {link.label}
              </Link>
              {active === link.key && (
                <span className="absolute -bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-gold-ink" />
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

Run: `npm run type-check` → no errors.

- [ ] **Step 3: Commit**

```bash
git add frontend/src/components/home/NavBar.tsx
git commit -m "feat(home): restyle NavBar for the paper register"
```

---

## Task 6: Restyle `ValuesRow` and `QuoteBar`

**Files:**
- Modify: `frontend/src/components/home/ValuesRow.tsx`
- Modify: `frontend/src/components/home/QuoteBar.tsx`

For each file: read it, then re-skin using the paper color map (top of this plan). Keep all copy, icons, hrefs, and overall structure (grid columns, the quote text, the link target). Apply these specific changes:

- [ ] **Step 1: `ValuesRow`**
  - Section wrapper: `bg-surface-canvas border-t border-surface-subtle` → `bg-paper-bg border-t border-paper-subtle`.
  - Grid dividers: `xl:divide-x xl:divide-surface-subtle` → `xl:divide-x xl:divide-paper-subtle`.
  - `IconBadge` is already recolored (Task 3) — no change at the call site.
  - Title `<p>`: → `mt-4 text-[11px] font-bold uppercase tracking-wide-label text-paper-ink` (was `text-surface-fg`). (Drop the `font-mono` if present.)
  - Statement `<p>`: `text-surface-fg-secondary` → `text-paper-ink-soft`.
  - If `MonoLabel` was imported but is now unused, remove the import.

- [ ] **Step 2: `QuoteBar`**
  - Section wrapper: `bg-surface-canvas` → `bg-paper-bg`.
  - Inner strip: `rounded-2xl border-surface-subtle bg-surface-card` → `rounded-2xl border border-paper-subtle bg-paper-card`.
  - Quote glyph `&ldquo;`: keep oversized; color `text-gold` → `text-gold-ink`. (It may currently be `font-serif`; that's fine for a quote mark — keep or switch to `font-sans`, your call. Keep `aria-hidden`.)
  - Quote `<p>`: `text-surface-fg` → `text-paper-ink`.
  - Link: replace the mono/uppercase styling with `text-sm font-semibold text-gold-ink hover:text-gold-ink/80` + the existing `ArrowRight`; keep `href="/work/wheelchair-tracking"`; keep the gold-ink focus ring (`focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-ink focus-visible:outline-offset-2`).

- [ ] **Step 3: Verify**

Run: `npm run type-check && npm run lint` → no errors / only pre-existing warnings.

- [ ] **Step 4: Commit**

```bash
git add frontend/src/components/home/ValuesRow.tsx frontend/src/components/home/QuoteBar.tsx
git commit -m "feat(home): restyle ValuesRow + QuoteBar for the paper register"
```

---

## Task 7: Restyle `FlagshipFeature` and `CapabilityIndex`

**Files:**
- Modify: `frontend/src/components/home/FlagshipFeature.tsx`
- Modify: `frontend/src/components/home/CapabilityIndex.tsx`

Read each file; re-skin per the color map. Keep all copy, hrefs, and structure.

- [ ] **Step 1: `FlagshipFeature`**
  - Section wrapper: `bg-surface-canvas` → `bg-paper-bg`.
  - The `Link` card: `border-surface-subtle ... hover:border-gold/40` → `border border-paper-subtle ... hover:border-gold-ink/40`.
  - The inner panel: replace `bg-gradient-to-br from-surface-card via-surface-elevated to-[#1c2233]` with a flat warm surface `bg-paper-card`.
  - "featured · cathedral case study" pill: `border-gold/30 bg-gold/10` → `border-gold-ink/30 bg-gold-ink/10`; `MonoLabel` text → `text-gold-ink`; the `ArrowUpRight` → `text-gold-ink`. (Optionally change the label text from "cathedral case study" to just "featured case study" — the "cathedral" wording belonged to the old aesthetic. Make this change.)
  - Eyebrow `01 · healthcare workflow systems`: keep as a `MonoLabel` or switch to `SectionEyebrow`-style; ensure it reads `text-gold-ink` (or `text-paper-ink-soft` for the `01 ·` part — your judgment; keep it legible on cream).
  - H3: `text-surface-fg` → `font-sans font-bold ... text-paper-ink` (it's already `font-medium tracking-tight-display`; make it `font-bold`).
  - Body `<p>`: `text-surface-fg-secondary` → `text-paper-ink-soft`.
  - The meta `MonoLabel`s ("4 sites live", "microsoft lists · qr workflows", "v3.x"): now use `MonoLabel`'s new default (`text-paper-ink-soft`) — fine; no change needed beyond removing any explicit dark color.

- [ ] **Step 2: `CapabilityIndex`**
  - Section wrapper: `bg-surface-canvas border-t border-surface-subtle` → `bg-paper-bg border-t border-paper-subtle`.
  - The `MonoLabel` "capabilities · system map" → swap for `<SectionEyebrow>capabilities · system map</SectionEyebrow>` (import `SectionEyebrow` from `./primitives`).
  - H2: `text-surface-fg` → `font-sans font-bold ... text-paper-ink` (currently `font-serif font-medium` from the prior pass — change to `font-sans font-bold`).
  - Cards `<article>`: `border-surface-subtle bg-surface-card` → `border border-paper-subtle bg-paper-card`.
  - The `01`–`04` index `MonoLabel className="text-gold"` → `text-gold-ink`.
  - Title `<p>`: `text-surface-fg` → `text-paper-ink` (keep `font-medium` or bump to `font-semibold`).
  - Count `<p>`: `text-surface-fg-muted` → `text-paper-ink-soft`.

- [ ] **Step 3: Verify**

Run: `npm run type-check && npm run lint` → clean.

- [ ] **Step 4: Commit**

```bash
git add frontend/src/components/home/FlagshipFeature.tsx frontend/src/components/home/CapabilityIndex.tsx
git commit -m "feat(home): restyle FlagshipFeature + CapabilityIndex for the paper register"
```

---

## Task 8: Restyle `LiveStatusPanel`, `SelectedSystems`, `ContactStrip`, `EssayStrip`

**Files:**
- Modify: `frontend/src/components/home/LiveStatusPanel.tsx`
- Modify: `frontend/src/components/home/SelectedSystems.tsx`
- Modify: `frontend/src/components/home/ContactStrip.tsx`
- Modify: `frontend/src/components/home/EssayStrip.tsx`

Read each file; re-skin per the color map. Keep all copy, hrefs, and structure — **including the "metrics shown are illustrative · phase 2 wires real telemetry" disclaimer in `LiveStatusPanel`.**

- [ ] **Step 1: `LiveStatusPanel`**
  - Section wrapper: `bg-surface-canvas` → `bg-paper-bg`.
  - "live · currently running" `MonoLabel` → `<SectionEyebrow>live · currently running</SectionEyebrow>`.
  - H2: `text-surface-fg` → `font-sans font-bold ... text-paper-ink` (change `font-serif font-medium` from the prior pass to `font-sans font-bold`).
  - Supporting `<p>`: `text-surface-fg-secondary` → `text-paper-ink-soft`.
  - Status card: `border-surface-subtle bg-surface-card` → `border border-paper-subtle bg-paper-card`.
  - Inside the card: `MonoLabel`s use the new default (ok); the big number `font-mono text-3xl ... text-surface-fg` → `font-sans text-3xl font-bold text-paper-ink`, and its trailing `<span>` `text-surface-fg-muted` → `text-paper-ink-soft`.
  - The site list: `divide-surface-subtle` → `divide-paper-subtle`; site name `text-surface-fg-secondary` → `text-paper-ink-soft`; the per-row "live" span `text-gold` → `text-gold-ink` (keep the `LiveDot`).
  - Footer row: `border-surface-subtle` → `border-paper-subtle`; uptime value `text-gold` → `text-gold-ink`.
  - The disclaimer `<p>`: `text-surface-fg-muted` → `text-paper-ink-soft` (keep the text verbatim).

- [ ] **Step 2: `SelectedSystems`**
  - Section wrapper: `bg-surface-canvas` → `bg-paper-bg`.
  - "selected systems" `MonoLabel` → `<SectionEyebrow>selected systems</SectionEyebrow>`.
  - The `<ul>`: `divide-surface-subtle border-surface-subtle` → `divide-paper-subtle border-paper-subtle`.
  - Row `Link` hover: `hover:bg-surface-card` → `hover:bg-paper-card`.
  - The `02`–`05` index `MonoLabel className="text-gold"` → `text-gold-ink`.
  - Title `<h3>`: `text-surface-fg` → `font-sans font-bold text-paper-ink` (change `font-serif font-medium` from the prior pass).
  - The capability tag `MonoLabel` → new default (ok).
  - Description `<p>`: `text-surface-fg-secondary` → `text-paper-ink-soft`.
  - The `ArrowUpRight`: `text-surface-fg-muted group-hover:text-surface-fg` → `text-paper-ink-soft group-hover:text-paper-ink`.

- [ ] **Step 3: `ContactStrip`**
  - Section wrapper: `bg-surface-canvas border-t border-surface-subtle` → `bg-paper-bg border-t border-paper-subtle`.
  - Email `<a>`: `text-surface-fg hover:text-gold` → `text-paper-ink font-semibold hover:text-gold-ink` (drop `font-mono` — make it a confident sans link; keep the email text).
  - Social `<a>`s: `text-surface-fg-secondary hover:text-surface-fg` → `text-paper-ink-soft hover:text-paper-ink` (mono small is fine to keep).
  - The "vancouver, bc" `MonoLabel` → new default (ok).
  - Add a gold-ink focus ring to all the links.

- [ ] **Step 4: `EssayStrip`**
  - It's already on `bg-paper-bg text-paper-ink border-y border-paper-subtle` — keep that.
  - The lead-in label currently `font-mono text-[10px] uppercase tracking-wide-label text-paper-ink-soft` → change to `text-[11px] font-bold uppercase tracking-wide-label text-gold-ink` (matches the new eyebrow style) — or wrap with `<SectionEyebrow>`.
  - **Keep the serif body** (`font-serif text-lg md:text-xl ... text-paper-ink`) — this is the intentional editorial moment; do not change it.
  - "read more" `Link`: `font-mono text-xs uppercase tracking-wide-label text-paper-ink-soft hover:text-paper-ink` → `text-sm font-semibold text-gold-ink hover:text-gold-ink/80`; keep the `ArrowUpRight`; add the gold-ink focus ring.

- [ ] **Step 5: Verify**

Run: `npm run type-check && npm run lint` → clean. Then `npm run build` → succeeds.

- [ ] **Step 6: Commit**

```bash
git add frontend/src/components/home/LiveStatusPanel.tsx frontend/src/components/home/SelectedSystems.tsx frontend/src/components/home/ContactStrip.tsx frontend/src/components/home/EssayStrip.tsx
git commit -m "feat(home): restyle status/selected/contact/essay sections for the paper register"
```

---

## Task 9: Bring the `/about` hero + CTA into the paper register

**Files:**
- Modify: `frontend/src/app/about/page.tsx`

Read the file. Keep all copy and the `AboutSection` import/usage and its Framer Motion entrance animations. Change only colors/typography on the hero `<section>`, the back button, and the "Let's Connect" `<section>`. Do **not** touch `AboutSection` or its children.

- [ ] **Step 1: Apply the restyle**
  - `<main>`: `bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900` → `bg-paper-bg text-paper-ink`.
  - "Back to Home" button: `bg-white/10 backdrop-blur-sm text-white ... border-white/20 hover:bg-white/20` → `border border-paper-ink/25 text-paper-ink bg-paper-bg/70 backdrop-blur-sm hover:border-gold-ink/50 hover:text-gold-ink` (keep the `ArrowLeft` icon, the fixed `top-6 left-6 z-50` positioning, and the motion props); add the gold-ink focus ring.
  - Hero `<section>`: `py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 text-white` → `py-20 bg-paper-bg text-paper-ink`.
  - Badge "About Lloyd Dela Cruz": replace `bg-white/10 backdrop-blur-sm border-white/20 text-sm font-medium` with `border border-paper-subtle bg-paper-card text-xs font-bold uppercase tracking-wide-label text-gold-ink` (keep the rounded-full pill, keep the centering).
  - H1: keep the copy; `text-4xl lg:text-5xl font-bold` stays; the highlighted `<span>` — change `bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent` to `text-gold-ink`.
  - Location line: `text-blue-200` → `text-paper-ink-soft`; the `MapPin` icon inherits (or set it `text-gold-ink`).
  - Lede `<p>` (the `text-xl text-blue-100`): → `text-xl text-paper-ink-soft`.
  - Second lede `<p>` (`text-lg text-blue-200`): → `text-lg text-paper-ink-soft`.
  - Stats: each number `text-3xl font-bold text-cyan-300` → `text-3xl font-bold text-gold-ink`; each label `text-sm text-blue-300` → `text-sm text-paper-ink-soft uppercase tracking-wide-label`.
  - "Let's Connect" `<section>`: `py-16 bg-gradient-to-r from-blue-900 to-purple-900` → `py-16 bg-paper-bg border-t border-paper-subtle`.
  - That section's H2 (`text-3xl font-bold text-white`) → `text-3xl font-bold text-paper-ink`.
  - That section's `<p>` (`text-lg text-white/80`) → `text-lg text-paper-ink-soft`.
  - "Get In Touch" button: replace the `motion.button` (`bg-white text-gray-900 ... hover:bg-gray-100 shadow-lg`) — simplest is to keep the `motion.button` but change classes to `bg-paper-ink text-paper-bg hover:bg-paper-ink/90 ... rounded-lg font-semibold` (drop `shadow-lg`), keeping the `whileHover`/`whileTap`/`viewport` motion props and the wrapping `Link href="/contact"`. Change the label text "Get In Touch" → "Get in touch" (sentence case, to match the homepage CTAs).

- [ ] **Step 2: Verify**

Run: `npm run type-check && npm run lint` → clean. Then `npm run build` → succeeds.

- [ ] **Step 3: Commit**

```bash
git add frontend/src/app/about/page.tsx
git commit -m "feat(about): restyle hero + CTA to the paper register"
```

---

## Task 10: Section reveal motion + final pass

**Files:**
- Modify (only if adding reveals): `frontend/src/components/home/*.tsx` as needed
- Otherwise: verification only.

The spec calls for "gentle fade + small upward slide on scroll" for sections, guarded by reduced-motion. The existing homepage sections are server components with no entrance animation. Adding motion to all of them is optional polish — **only do it if it's quick and clean**; otherwise the static page is acceptable. If you do add it:
- Create a tiny client wrapper `frontend/src/components/home/Reveal.tsx`:

```tsx
// frontend/src/components/home/Reveal.tsx
'use client'
import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '@/lib/hooks/usePrefersReducedMotion'
import type { ReactNode } from 'react'

export function Reveal({ children }: { children: ReactNode }) {
  const reduced = usePrefersReducedMotion()
  if (reduced) return <>{children}</>
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
```

  - Wrap each section in `page.tsx` (except `NavBar` and `HomeHero`) with `<Reveal>...</Reveal>`. Export `Reveal` from a barrel if you like, or import directly. Commit as `feat(home): subtle scroll-reveal on sections`.

- [ ] **Step 1: (optional) Add `Reveal` and wrap sections** — per above, only if quick/clean.

- [ ] **Step 2: Reduced-motion check** — devtools "Emulate prefers-reduced-motion: reduce", reload `/`: if `Reveal` was added, sections render fully visible with no animation; the page is otherwise static. The About page's existing Framer Motion entrances still fire (pre-existing; out of scope to gate them).

- [ ] **Step 3: Visual + responsive check** — `npm run dev` (port 3001), load `/`:
  - Warm cream background top to bottom; single-column centered hero with the 3-stat row; no node-diagram anywhere.
  - Bold-sans headlines, each with exactly one gold word; gold eyebrows; legible body text.
  - Every section restyled — no leftover dark `bg-surface-*` / `text-surface-*` blocks (grep `git grep -n "surface-canvas\|surface-card\|surface-fg\|surface-elevated\|text-surface" -- frontend/src/components/home frontend/src/app/page.tsx` should return nothing).
  - Nav: dark-ink links on cream, gold dot under "Work", on-scroll blur.
  - `/about`: hero + "Let's Connect" are cream/ink/gold and visually consistent with the homepage; the deeper About sections below are intentionally still the old style.
  - Tab through nav links, hero CTAs, quote link, selected-systems rows, contact links, About back-button → gold-ink focus outlines visible.
  - Check mobile / tablet / desktop widths — no horizontal overflow.

- [ ] **Step 4: Final verify** — `npm run lint && npm run type-check && npm run build` all pass (kill any dev server and `rm -rf frontend/.next` first if the build misbehaves).

- [ ] **Step 5: Commit (only if Steps 1–4 required code changes)**

```bash
git add -A
git commit -m "fix(home): scroll-reveal + final paper-register polish"
```

If no changes were needed beyond Step 1's optional commit, report the plan complete.

---

## Self-Review notes

- **Spec coverage:** tokens (Task 1); StatItem/SectionEyebrow (Task 2); primitive restyle incl. BrandWordmark/CtaButton/IconBadge/MonoLabel/AccentPill (Task 3); HomeHero + delete diagram + page.tsx (Task 4); NavBar (Task 5); ValuesRow/QuoteBar (Task 6); FlagshipFeature/CapabilityIndex (Task 7); LiveStatusPanel incl. disclaimer kept / SelectedSystems / ContactStrip / EssayStrip with serif body kept (Task 8); /about hero + CTA, sub-sections untouched (Task 9); motion + final pass (Task 10). Out-of-scope items (dark `--accent-gold` untouched, no mobile drawer, no telemetry, no blog/case-study pages, no About sub-section rework) — no tasks, as intended.
- **Placeholder scan:** restyle tasks intentionally use "read the file then apply this color map + these specific changes" rather than full file contents — the target classes are spelled out concretely; the implementer must load `frontend-design`. No "TBD"/"handle edge cases"/vague-error-handling left.
- **Type consistency:** new component is `HomeHero` (exported from `home/HomeHero.tsx`), referenced by that name in `page.tsx` (Task 4); `StatItem` props `{value,label,className?}` used consistently in Task 2 and Task 4; `SectionEyebrow` takes `children` — used in Tasks 4, 7, 8; `CtaButton` keeps its `{href,children,variant?,className?}` signature — used in Tasks 4 and 9; `NavBar` keeps the `active?: NavKey` prop with `'work'` in the union (Task 5), passed as `active="work"` in `page.tsx` (Task 4). Tailwind tokens added in Task 1 (`paper.card`, `paper-border`, `paper-subtle` color) are the only new classes the later tasks rely on; `gold-ink`, `paper-bg`, `paper-ink`, `paper-ink-soft`, `paper-subtle` (borderColor), `tracking-wide-label`, `tracking-tight-display`, `tracking-tight-h`, `font-sans` already exist.
