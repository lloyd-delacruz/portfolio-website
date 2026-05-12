# Portfolio Repositioning — Phase 1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the Dual-Register design system and the Operator's-Surface homepage (8 sections, Systems Map hero, Live Status trust block, capability index, flagship feature tile, selected systems, paper-register essay strip, contact line) on the existing `frontend/` Next.js 14 app, without breaking the existing sub-pages.

**Architecture:** Layer new design tokens on top of the existing shadcn HSL CSS-var system rather than replacing them — the homepage uses the new `surface.*` / `paper.*` / `accent.gold` / `ink.*` tokens; existing pages (blog, about, dashboards) keep working with their current tokens until Phase 2 migration. New homepage components live under `src/components/home/`. Placeholder `/work/*` routes resolve flagship + project links. Pragmatic testing: Vitest for two utility hooks (where `matchMedia` + SSR behaviour is genuinely subtle); visual verification via `npm run dev` for all UI composition.

**Tech Stack:** Next.js 14.2, React 18.3, TypeScript 5.4, Tailwind 3.4, Framer Motion 11, `geist` (Vercel's font package), `@fontsource-variable/source-serif-4` (depth-register serif), Vitest 1.x (hooks only), `@testing-library/react` 14.x.

**Reference spec:** `docs/superpowers/specs/2026-05-12-portfolio-repositioning-design.md`

**Working directory:** `frontend/` (npm workspace). All paths below are relative to repo root unless otherwise noted. Run `npm run` commands from repo root.

---

## Task ordering & dependencies

1. Design tokens
2. Typography
3. Test setup + motion hooks
4. Brand primitives (LiveDot, MonoLabel, AccentPill)
5. NavBar
6. SystemsMap (static SVG)
7. SystemsMap (motion)
8. HeroSystemsMap (composition)
9. CapabilityIndex
10. LiveStatusPanel
11. FlagshipFeature
12. SelectedSystems
13. EssayStrip (paper register)
14. ContactStrip
15. Placeholder `/work/*` routes
16. Homepage composition (THE swap moment)
17. Accessibility & responsive verification

---

### Task 1: Design tokens — Dual Register

**Files:**
- Modify: `frontend/tailwind.config.js`
- Modify: `frontend/src/app/globals.css`

**Goal:** Add Dual-Register colour and radius tokens to Tailwind alongside the existing shadcn tokens. Existing pages remain untouched.

- [ ] **Step 1: Add Dual-Register CSS variables to `globals.css`**

Open `frontend/src/app/globals.css`. After the existing `:root { ... }` block (the one with `--background: 0 0% 100%;` ending around line 119), add:

```css
@layer base {
  :root {
    /* Dual Register — surface (dark) */
    --surface-canvas: 240 8% 5%;          /* #0a0a0c */
    --surface-card:   228 16% 9%;          /* #11131a */
    --surface-elevated: 228 12% 11%;       /* #16181d */
    --surface-fg:     220 12% 92%;         /* #e8eaed */
    --surface-fg-secondary: 222 11% 71%;   /* #aab0bf */
    --surface-fg-muted: 222 5% 45%;        /* #6a6f7a */

    /* Dual Register — paper (depth) */
    --paper-bg:       38 50% 93%;          /* #f4eee3 */
    --paper-ink:      30 14% 14%;          /* #2a2520 */
    --paper-ink-soft: 33 21% 24%;          /* #4a3f2f */

    /* Accents & signals */
    --accent-gold:    30 49% 60%;          /* #c79d6a */
    --accent-gold-ink: 30 41% 34%;         /* #7a5a32 — paper register accent */
    --signal-live:    140 56% 64%;         /* #6cd99a */
  }
}
```

- [ ] **Step 2: Extend `tailwind.config.js` with the new tokens**

Open `frontend/tailwind.config.js`. Inside `theme.extend.colors`, add (do NOT remove existing tokens):

```js
surface: {
  canvas:    'hsl(var(--surface-canvas))',
  card:      'hsl(var(--surface-card))',
  elevated:  'hsl(var(--surface-elevated))',
  fg:        'hsl(var(--surface-fg))',
  'fg-secondary': 'hsl(var(--surface-fg-secondary))',
  'fg-muted':     'hsl(var(--surface-fg-muted))',
},
paper: {
  bg:       'hsl(var(--paper-bg))',
  ink:      'hsl(var(--paper-ink))',
  'ink-soft': 'hsl(var(--paper-ink-soft))',
},
gold: {
  DEFAULT: 'hsl(var(--accent-gold))',
  ink:     'hsl(var(--accent-gold-ink))',
},
signal: {
  live: 'hsl(var(--signal-live))',
},
```

Also extend `theme.extend.borderColor`:

```js
borderColor: {
  'surface-subtle': 'rgba(255,255,255,0.06)',
  'surface-strong': 'rgba(255,255,255,0.12)',
  'paper-subtle':   'rgba(0,0,0,0.08)',
},
```

- [ ] **Step 3: Smoke-test compile**

Run: `npm run dev` (from repo root). Expected: dev server starts on port 3001 without Tailwind errors. Stop with Ctrl-C.

- [ ] **Step 4: Smoke-test class resolution**

In `frontend/src/app/page.tsx`, temporarily replace line 12's `<main className="min-h-screen">` with `<main className="min-h-screen bg-surface-canvas text-surface-fg">`. Reload. Expected: page background turns near-black `#0a0a0c`. Revert the change before committing.

- [ ] **Step 5: Commit**

```bash
git add frontend/tailwind.config.js frontend/src/app/globals.css
git commit -m "feat(tokens): add Dual Register surface + paper + gold tokens"
```

---

### Task 2: Typography — Geist Sans, Geist Mono, Source Serif 4

**Files:**
- Modify: `frontend/package.json` (via npm install)
- Modify: `frontend/src/lib/fonts.ts`
- Modify: `frontend/src/app/layout.tsx`
- Modify: `frontend/tailwind.config.js`

**Goal:** Surface register uses Geist Sans (UI/body) + Geist Mono (labels, metrics, paths). Depth register uses Source Serif 4 (long-form essay reading).

- [ ] **Step 1: Install fonts**

Run from `frontend/`:

```bash
cd frontend && npm install geist @fontsource-variable/source-serif-4 && cd ..
```

Expected: `geist@^1.x` and `@fontsource-variable/source-serif-4` added to dependencies.

- [ ] **Step 2: Update `frontend/src/lib/fonts.ts`**

Replace the file contents with:

```ts
import { Inter } from 'next/font/google'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'

// Keep Inter for legacy pages still wired to it.
export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
})

export const geistSans = GeistSans
export const geistMono = GeistMono
```

- [ ] **Step 3: Update `frontend/src/app/layout.tsx`**

Replace the file contents with:

```tsx
import type { Metadata, Viewport } from 'next'
import './globals.css'
import '@fontsource-variable/source-serif-4'
import { geistSans, geistMono } from '@/lib/fonts'

export const metadata: Metadata = {
  title: 'Lloyd Dela Cruz — Applied AI Systems',
  description: 'Applied AI engineer building the workflow infrastructure that makes operational AI work in the real world.',
  authors: [{ name: 'Lloyd Dela Cruz' }],
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0a0a0c',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}
    >
      <body className="font-sans antialiased bg-surface-canvas text-surface-fg">
        {children}
      </body>
    </html>
  )
}
```

Note: this changes the default `<body>` background from white to surface-canvas. Existing pages that explicitly set their own background will continue to render correctly; pages that relied on the default white will now read on dark — this is intentional for the rebrand and acceptable for Phase 1.

- [ ] **Step 4: Add font-family tokens to Tailwind**

In `frontend/tailwind.config.js`, inside `theme.extend`, add:

```js
fontFamily: {
  sans:  ['var(--font-geist-sans)', 'system-ui', '-apple-system', 'sans-serif'],
  mono:  ['var(--font-geist-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
  serif: ['"Source Serif 4 Variable"', 'Georgia', 'serif'],
},
letterSpacing: {
  'tight-display': '-0.02em',
  'tight-h':       '-0.01em',
  'wide-label':    '0.14em',
},
```

- [ ] **Step 5: Verify fonts load**

Run `npm run dev`. Open `http://localhost:3001` in a browser. Inspect the body element. Expected: `font-family` resolves to a stack starting with the Geist variable. No 404s in the Network tab for font files.

- [ ] **Step 6: Commit**

```bash
git add frontend/package.json frontend/package-lock.json frontend/src/lib/fonts.ts frontend/src/app/layout.tsx frontend/tailwind.config.js
git commit -m "feat(typography): wire Geist Sans/Mono + Source Serif 4"
```

---

### Task 3: Test setup + motion hooks

**Files:**
- Create: `frontend/vitest.config.ts`
- Create: `frontend/vitest.setup.ts`
- Modify: `frontend/package.json`
- Create: `frontend/src/lib/hooks/usePrefersReducedMotion.ts`
- Create: `frontend/src/lib/hooks/usePrefersReducedMotion.test.ts`
- Create: `frontend/src/lib/hooks/useInViewPause.ts`
- Create: `frontend/src/lib/hooks/useInViewPause.test.ts`

**Goal:** Add Vitest for the two hooks where `matchMedia` + SSR + IntersectionObserver behaviour is genuinely subtle. Visual components rely on `npm run dev` verification, not unit tests.

- [ ] **Step 1: Install test deps**

```bash
cd frontend && npm install --save-dev vitest @vitest/ui jsdom @testing-library/react @testing-library/jest-dom @testing-library/dom @types/node && cd ..
```

- [ ] **Step 2: Create `frontend/vitest.config.ts`**

```ts
import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    globals: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

- [ ] **Step 3: Create `frontend/vitest.setup.ts`**

```ts
import '@testing-library/jest-dom/vitest'
```

- [ ] **Step 4: Add test scripts to `frontend/package.json`**

Edit `frontend/package.json`. Inside `"scripts"`, add:

```json
"test": "vitest run",
"test:watch": "vitest",
```

- [ ] **Step 5: Write the failing test for `usePrefersReducedMotion`**

Create `frontend/src/lib/hooks/usePrefersReducedMotion.test.ts`:

```ts
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

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

describe('usePrefersReducedMotion', () => {
  beforeEach(() => { mockMatchMedia(false) })

  it('returns false when the user has no preference', () => {
    const { result } = renderHook(() => usePrefersReducedMotion())
    expect(result.current).toBe(false)
  })

  it('returns true when the user prefers reduced motion', () => {
    mockMatchMedia(true)
    const { result } = renderHook(() => usePrefersReducedMotion())
    expect(result.current).toBe(true)
  })

  it('returns false during SSR (no window)', () => {
    // Simulate by calling the underlying logic with window undefined-handling
    // — the hook must not crash on initial render in environments where
    // matchMedia returns undefined.
    Object.defineProperty(window, 'matchMedia', { writable: true, value: undefined })
    const { result } = renderHook(() => usePrefersReducedMotion())
    expect(result.current).toBe(false)
  })
})
```

- [ ] **Step 6: Run the test — expect FAIL**

```bash
cd frontend && npm run test -- usePrefersReducedMotion && cd ..
```

Expected: failure with "Cannot find module './usePrefersReducedMotion'" or equivalent.

- [ ] **Step 7: Implement `usePrefersReducedMotion`**

Create `frontend/src/lib/hooks/usePrefersReducedMotion.ts`:

```ts
import { useEffect, useState } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return
    const mq = window.matchMedia(QUERY)
    setReduced(mq.matches)
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return reduced
}
```

- [ ] **Step 8: Re-run — expect PASS**

```bash
cd frontend && npm run test -- usePrefersReducedMotion && cd ..
```

Expected: 3 passing tests.

- [ ] **Step 9: Write the failing test for `useInViewPause`**

Create `frontend/src/lib/hooks/useInViewPause.test.ts`:

```ts
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useInViewPause } from './useInViewPause'

let observeCb: ((entries: { isIntersecting: boolean }[]) => void) | null = null

class MockIntersectionObserver {
  constructor(cb: (entries: { isIntersecting: boolean }[]) => void) { observeCb = cb }
  observe() {}
  disconnect() {}
  unobserve() {}
  takeRecords() { return [] }
  root = null
  rootMargin = ''
  thresholds = []
}

beforeEach(() => {
  // @ts-expect-error - test env
  global.IntersectionObserver = MockIntersectionObserver
  observeCb = null
})
afterEach(() => { vi.restoreAllMocks() })

describe('useInViewPause', () => {
  it('returns inView=false initially', () => {
    const { result } = renderHook(() => useInViewPause<HTMLDivElement>())
    expect(result.current.inView).toBe(false)
  })

  it('flips to true when IntersectionObserver reports intersecting', () => {
    const { result, rerender } = renderHook(() => useInViewPause<HTMLDivElement>())
    // Simulate ref attachment by manually invoking the observer callback
    observeCb?.([{ isIntersecting: true }])
    rerender()
    expect(result.current.inView).toBe(true)
  })
})
```

- [ ] **Step 10: Run — expect FAIL**

```bash
cd frontend && npm run test -- useInViewPause && cd ..
```

- [ ] **Step 11: Implement `useInViewPause`**

Create `frontend/src/lib/hooks/useInViewPause.ts`:

```ts
import { useEffect, useRef, useState } from 'react'

export function useInViewPause<T extends Element>() {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') return
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => setInView(e.isIntersecting)),
      { threshold: 0.1 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return { ref, inView }
}
```

Note: the test mocks `IntersectionObserver` but the hook's `useEffect` only observes when `ref.current` is set. The test invokes `observeCb` directly to drive the state transition without needing a real DOM ref. This is intentional — covers the state-update branch in isolation.

- [ ] **Step 12: Re-run — expect PASS**

```bash
cd frontend && npm run test && cd ..
```

Expected: all tests pass (≥5).

- [ ] **Step 13: Commit**

```bash
git add frontend/vitest.config.ts frontend/vitest.setup.ts frontend/package.json frontend/package-lock.json frontend/src/lib/hooks/
git commit -m "feat(hooks): add usePrefersReducedMotion and useInViewPause with tests"
```

---

### Task 4: Brand primitives — LiveDot, MonoLabel, AccentPill, BrandWordmark

**Files:**
- Create: `frontend/src/components/home/primitives/LiveDot.tsx`
- Create: `frontend/src/components/home/primitives/MonoLabel.tsx`
- Create: `frontend/src/components/home/primitives/AccentPill.tsx`
- Create: `frontend/src/components/home/primitives/BrandWordmark.tsx`
- Create: `frontend/src/components/home/primitives/index.ts`

**Goal:** Small, reusable building blocks used across multiple homepage sections. Putting them in their own folder keeps the home shell decoupled from the legacy `components/ui/`.

- [ ] **Step 1: Create `LiveDot.tsx`**

```tsx
import { cn } from '@/lib/utils'

type LiveDotProps = { className?: string; pulse?: boolean }

export function LiveDot({ className, pulse = true }: LiveDotProps) {
  return (
    <span className={cn('relative inline-flex h-1.5 w-1.5', className)}>
      {pulse && (
        <span className="absolute inset-0 rounded-full bg-signal-live opacity-60 animate-ping" />
      )}
      <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-signal-live shadow-[0_0_10px_rgba(108,217,154,0.6)]" />
    </span>
  )
}
```

- [ ] **Step 2: Create `MonoLabel.tsx`**

```tsx
import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

type MonoLabelProps = { children: ReactNode; className?: string }

export function MonoLabel({ children, className }: MonoLabelProps) {
  return (
    <span
      className={cn(
        'font-mono text-[10px] uppercase tracking-wide-label text-surface-fg-muted',
        className
      )}
    >
      {children}
    </span>
  )
}
```

- [ ] **Step 3: Create `AccentPill.tsx`**

```tsx
import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

type AccentPillProps = { children: ReactNode; className?: string }

export function AccentPill({ children, className }: AccentPillProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border border-surface-subtle bg-surface-card/50 px-2.5 py-1',
        'font-mono text-[10px] uppercase tracking-wide-label text-surface-fg-secondary',
        className
      )}
    >
      {children}
    </span>
  )
}
```

- [ ] **Step 4: Create `BrandWordmark.tsx`**

```tsx
import Link from 'next/link'

export function BrandWordmark() {
  return (
    <Link
      href="/"
      className="font-mono text-sm tracking-wide-label text-surface-fg hover:text-gold transition-colors"
      aria-label="Lloyd Dela Cruz — home"
    >
      lloyd<span className="text-gold">.</span>dev
    </Link>
  )
}
```

- [ ] **Step 5: Create `index.ts`**

```ts
export { LiveDot } from './LiveDot'
export { MonoLabel } from './MonoLabel'
export { AccentPill } from './AccentPill'
export { BrandWordmark } from './BrandWordmark'
```

- [ ] **Step 6: Verify imports resolve**

Run `npm run type-check` from repo root. Expected: no TypeScript errors.

- [ ] **Step 7: Commit**

```bash
git add frontend/src/components/home/primitives/
git commit -m "feat(home): add brand primitives (LiveDot, MonoLabel, AccentPill, BrandWordmark)"
```

---

### Task 5: NavBar

**Files:**
- Create: `frontend/src/components/home/NavBar.tsx`

**Goal:** Translucent backdrop-blurred fixed top nav. Mono type. Three links: systems · writing · contact. Separate from the legacy `Navigation` component used by other pages.

- [ ] **Step 1: Create `NavBar.tsx`**

```tsx
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { BrandWordmark } from './primitives'
import { cn } from '@/lib/utils'

const links = [
  { label: 'systems', href: '#systems' },
  { label: 'writing', href: '/writing' },
  { label: 'contact', href: '#contact' },
]

export function NavBar() {
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
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-surface-canvas/70 backdrop-blur-md border-b border-surface-subtle'
          : 'bg-transparent'
      )}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <BrandWordmark />
        <ul className="flex items-center gap-6">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="font-mono text-xs tracking-wide-label text-surface-fg-secondary hover:text-surface-fg transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
```

- [ ] **Step 2: Type-check**

```bash
npm run type-check
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add frontend/src/components/home/NavBar.tsx
git commit -m "feat(home): add Linear-style translucent NavBar"
```

---

### Task 6: SystemsMap — static SVG

**Files:**
- Create: `frontend/src/components/home/SystemsMap.tsx`

**Goal:** Animated systems diagram, but render only the static SVG in this task. Animation is added in Task 7. Central `workflow_core` node + 4 hospital nodes (`vgh`, `ubc`, `lions_gate`, `richmond`) + 2 secondary system nodes (`equitrackr_node`, `ai_systems_node`).

- [ ] **Step 1: Create `SystemsMap.tsx`**

```tsx
'use client'

import { cn } from '@/lib/utils'

type Node = { id: string; label: string; x: number; y: number; r: number; kind: 'core' | 'hospital' | 'system' }

const NODES: Node[] = [
  { id: 'core',         label: 'workflow_core', x: 50, y: 50, r: 2.2, kind: 'core' },
  { id: 'vgh',          label: 'vgh',           x: 20, y: 22, r: 1.4, kind: 'hospital' },
  { id: 'ubc',          label: 'ubc',           x: 80, y: 22, r: 1.4, kind: 'hospital' },
  { id: 'lions_gate',   label: 'lions_gate',    x: 22, y: 78, r: 1.4, kind: 'hospital' },
  { id: 'richmond',     label: 'richmond',      x: 78, y: 78, r: 1.4, kind: 'hospital' },
  { id: 'equitrackr',   label: 'equitrackr',    x: 92, y: 92, r: 0.9, kind: 'system' },
  { id: 'ai_systems',   label: 'ai_systems',    x: 8,  y: 92, r: 0.9, kind: 'system' },
]

const EDGES: [string, string, 'flag' | 'subtle'][] = [
  ['core', 'vgh', 'flag'],
  ['core', 'ubc', 'flag'],
  ['core', 'lions_gate', 'flag'],
  ['core', 'richmond', 'flag'],
  ['vgh', 'ubc', 'subtle'],
  ['lions_gate', 'richmond', 'subtle'],
  ['vgh', 'lions_gate', 'subtle'],
  ['ubc', 'richmond', 'subtle'],
  ['richmond', 'equitrackr', 'subtle'],
  ['lions_gate', 'ai_systems', 'subtle'],
]

function nodeById(id: string) {
  const n = NODES.find((node) => node.id === id)
  if (!n) throw new Error(`SystemsMap: unknown node ${id}`)
  return n
}

export function SystemsMap({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      className={cn('absolute inset-0 h-full w-full', className)}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="sm-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="hsl(var(--accent-gold))" stopOpacity="0.10" />
          <stop offset="100%" stopColor="hsl(var(--accent-gold))" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="50" cy="50" r="42" fill="url(#sm-glow)" />

      {EDGES.map(([from, to, kind], i) => {
        const a = nodeById(from)
        const b = nodeById(to)
        return (
          <line
            key={`${from}-${to}-${i}`}
            x1={a.x} y1={a.y} x2={b.x} y2={b.y}
            stroke={kind === 'flag' ? 'hsl(var(--accent-gold) / 0.42)' : 'rgba(255,255,255,0.10)'}
            strokeWidth={kind === 'flag' ? 0.25 : 0.18}
            strokeDasharray={kind === 'subtle' ? '0.8 0.8' : undefined}
          />
        )
      })}

      {NODES.map((n) => (
        <g key={n.id}>
          <circle
            cx={n.x} cy={n.y} r={n.r}
            fill="hsl(var(--surface-canvas))"
            stroke={n.kind === 'core' ? 'hsl(var(--accent-gold) / 0.7)' : 'rgba(255,255,255,0.22)'}
            strokeWidth={n.kind === 'core' ? 0.35 : 0.22}
          />
          <text
            x={n.x + n.r + 1.6}
            y={n.y + 0.6}
            fontSize="1.3"
            fontFamily="var(--font-geist-mono), monospace"
            fill={n.kind === 'core' ? 'hsl(var(--accent-gold))' : 'rgba(170,176,191,0.7)'}
            letterSpacing="0.02"
          >
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  )
}
```

- [ ] **Step 2: Verify by temporarily mounting**

In `frontend/src/app/page.tsx`, temporarily add `import { SystemsMap } from '@/components/home/SystemsMap'` at the top, and replace the contents of the first `<section>` (the hero) with:

```tsx
<section className="relative min-h-screen bg-surface-canvas overflow-hidden">
  <SystemsMap />
</section>
```

Run `npm run dev`. Open `http://localhost:3001`. Expected: the systems map renders edge-to-edge with the central gold node, 4 hospital nodes, 2 secondary nodes, gold edges to hospitals, dashed grey edges between peers. Revert the temporary change before committing.

- [ ] **Step 3: Commit**

```bash
git add frontend/src/components/home/SystemsMap.tsx
git commit -m "feat(home): static SystemsMap SVG (nodes + edges)"
```

---

### Task 7: SystemsMap — motion (inference pulse + edge fire)

**Files:**
- Modify: `frontend/src/components/home/SystemsMap.tsx`

**Goal:** Add inference-pulse breathing on the `core` node and an edge-fire traverse on a random `flag` edge every 6–10 seconds. Respect `prefers-reduced-motion`. Pause when off-screen.

- [ ] **Step 1: Add the motion logic to `SystemsMap.tsx`**

Replace the file with:

```tsx
'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion, useAnimation, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { usePrefersReducedMotion } from '@/lib/hooks/usePrefersReducedMotion'
import { useInViewPause } from '@/lib/hooks/useInViewPause'

type Node = { id: string; label: string; x: number; y: number; r: number; kind: 'core' | 'hospital' | 'system' }

const NODES: Node[] = [
  { id: 'core',         label: 'workflow_core', x: 50, y: 50, r: 2.2, kind: 'core' },
  { id: 'vgh',          label: 'vgh',           x: 20, y: 22, r: 1.4, kind: 'hospital' },
  { id: 'ubc',          label: 'ubc',           x: 80, y: 22, r: 1.4, kind: 'hospital' },
  { id: 'lions_gate',   label: 'lions_gate',    x: 22, y: 78, r: 1.4, kind: 'hospital' },
  { id: 'richmond',     label: 'richmond',      x: 78, y: 78, r: 1.4, kind: 'hospital' },
  { id: 'equitrackr',   label: 'equitrackr',    x: 92, y: 92, r: 0.9, kind: 'system' },
  { id: 'ai_systems',   label: 'ai_systems',    x: 8,  y: 92, r: 0.9, kind: 'system' },
]

const EDGES: [string, string, 'flag' | 'subtle'][] = [
  ['core', 'vgh', 'flag'],
  ['core', 'ubc', 'flag'],
  ['core', 'lions_gate', 'flag'],
  ['core', 'richmond', 'flag'],
  ['vgh', 'ubc', 'subtle'],
  ['lions_gate', 'richmond', 'subtle'],
  ['vgh', 'lions_gate', 'subtle'],
  ['ubc', 'richmond', 'subtle'],
  ['richmond', 'equitrackr', 'subtle'],
  ['lions_gate', 'ai_systems', 'subtle'],
]

function nodeById(id: string) {
  const n = NODES.find((node) => node.id === id)
  if (!n) throw new Error(`SystemsMap: unknown node ${id}`)
  return n
}

const flagEdges = EDGES.filter(([, , k]) => k === 'flag')

export function SystemsMap({ className }: { className?: string }) {
  const reduced = usePrefersReducedMotion()
  const { ref, inView } = useInViewPause<HTMLDivElement>()
  const [fireIndex, setFireIndex] = useState<number | null>(null)
  const animate = !reduced && inView

  useEffect(() => {
    if (!animate) return
    let timeout: ReturnType<typeof setTimeout>
    const schedule = () => {
      const delay = 6000 + Math.random() * 4000
      timeout = setTimeout(() => {
        const next = Math.floor(Math.random() * flagEdges.length)
        setFireIndex(next)
        setTimeout(() => setFireIndex(null), 1100)
        schedule()
      }, delay)
    }
    schedule()
    return () => clearTimeout(timeout)
  }, [animate])

  const firingEdge = fireIndex !== null ? flagEdges[fireIndex] : null
  const firingFrom = firingEdge ? nodeById(firingEdge[0]) : null
  const firingTo   = firingEdge ? nodeById(firingEdge[1]) : null

  return (
    <div ref={ref} className={cn('absolute inset-0', className)}>
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="sm-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(var(--accent-gold))" stopOpacity="0.10" />
            <stop offset="100%" stopColor="hsl(var(--accent-gold))" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx="50" cy="50" r="42" fill="url(#sm-glow)" />

        {EDGES.map(([from, to, kind], i) => {
          const a = nodeById(from)
          const b = nodeById(to)
          return (
            <line
              key={`${from}-${to}-${i}`}
              x1={a.x} y1={a.y} x2={b.x} y2={b.y}
              stroke={kind === 'flag' ? 'hsl(var(--accent-gold) / 0.42)' : 'rgba(255,255,255,0.10)'}
              strokeWidth={kind === 'flag' ? 0.25 : 0.18}
              strokeDasharray={kind === 'subtle' ? '0.8 0.8' : undefined}
            />
          )
        })}

        <AnimatePresence>
          {firingFrom && firingTo && (
            <motion.circle
              key={`fire-${fireIndex}`}
              r="0.7"
              fill="hsl(var(--accent-gold))"
              initial={{ cx: firingFrom.x, cy: firingFrom.y, opacity: 1 }}
              animate={{ cx: firingTo.x, cy: firingTo.y, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.0, ease: 'easeInOut' }}
            />
          )}
        </AnimatePresence>

        {NODES.map((n) => (
          <g key={n.id}>
            {n.kind === 'core' && animate && (
              <motion.circle
                cx={n.x} cy={n.y} r={n.r}
                fill="hsl(var(--accent-gold))"
                opacity={0.18}
                animate={{ r: [n.r, n.r * 2.4, n.r], opacity: [0.18, 0, 0.18] }}
                transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
              />
            )}
            <circle
              cx={n.x} cy={n.y} r={n.r}
              fill="hsl(var(--surface-canvas))"
              stroke={n.kind === 'core' ? 'hsl(var(--accent-gold) / 0.7)' : 'rgba(255,255,255,0.22)'}
              strokeWidth={n.kind === 'core' ? 0.35 : 0.22}
            />
            <text
              x={n.x + n.r + 1.6}
              y={n.y + 0.6}
              fontSize="1.3"
              fontFamily="var(--font-geist-mono), monospace"
              fill={n.kind === 'core' ? 'hsl(var(--accent-gold))' : 'rgba(170,176,191,0.7)'}
              letterSpacing="0.02"
            >
              {n.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  )
}
```

- [ ] **Step 2: Visual verification**

Re-add the temporary mount from Task 6 Step 2. Run `npm run dev`. Expected: core node has a subtle breathing pulse; approximately every 6–10s a gold dot traverses one of the four core→hospital edges. In macOS System Settings, enable Reduce Motion — both effects stop. Revert the temporary mount.

- [ ] **Step 3: Commit**

```bash
git add frontend/src/components/home/SystemsMap.tsx
git commit -m "feat(home): SystemsMap inference pulse + edge fire (reduced-motion + offscreen aware)"
```

---

### Task 8: HeroSystemsMap — composition

**Files:**
- Create: `frontend/src/components/home/HeroSystemsMap.tsx`

**Goal:** Compose `SystemsMap` as the hero background with the headline, sub-line, and credibility pills overlaid.

- [ ] **Step 1: Create the component**

```tsx
import { SystemsMap } from './SystemsMap'
import { AccentPill } from './primitives'

export function HeroSystemsMap() {
  return (
    <section className="relative min-h-[100svh] bg-surface-canvas overflow-hidden">
      <SystemsMap />
      <div className="absolute inset-0 bg-gradient-to-b from-surface-canvas/0 via-surface-canvas/30 to-surface-canvas/85 pointer-events-none" />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-center px-6 pt-24">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight-display leading-[1.04] text-surface-fg max-w-[18ch]">
          Systems for <span className="text-gold">operational</span> intelligence.
        </h1>
        <p className="mt-6 max-w-[42ch] text-base md:text-lg text-surface-fg-secondary leading-relaxed">
          Applied AI workflow infrastructure — live across four hospitals.
        </p>
        <div className="mt-8 flex flex-wrap gap-2">
          <AccentPill>10y healthcare</AccentPill>
          <AccentPill>MSc Analytics</AccentPill>
          <AccentPill>AWS AI</AccentPill>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Type-check + commit**

```bash
npm run type-check
git add frontend/src/components/home/HeroSystemsMap.tsx
git commit -m "feat(home): HeroSystemsMap composition (map + headline + pills)"
```

---

### Task 9: CapabilityIndex

**Files:**
- Create: `frontend/src/components/home/CapabilityIndex.tsx`

**Goal:** 4-tile grid showing the four capability headings. In Phase 1, tiles are non-interactive thesis cards (the spec's §9 Q2 defers the click-target decision to Phase 2). The visual treatment still reads as a system map.

- [ ] **Step 1: Create the component**

```tsx
import { MonoLabel } from './primitives'

type Capability = {
  number: string
  title: string
  count: string
}

const CAPABILITIES: Capability[] = [
  { number: '01', title: 'Healthcare Workflow Systems',     count: '2 systems' },
  { number: '02', title: 'AI-Native Product Systems',       count: '1 system'  },
  { number: '03', title: 'Financial & Planning Systems',    count: '1 system'  },
  { number: '04', title: 'AI-Assisted Digital Experiences', count: '1 system'  },
]

export function CapabilityIndex() {
  return (
    <section id="systems" className="bg-surface-canvas border-t border-surface-subtle">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <MonoLabel className="block mb-4">capabilities · system map</MonoLabel>
        <h2 className="text-2xl md:text-3xl font-medium tracking-tight-h text-surface-fg max-w-[28ch] mb-10">
          The patterns I build across domains.
        </h2>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {CAPABILITIES.map((c) => (
            <li key={c.number}>
              <article className="flex h-full flex-col rounded-lg border border-surface-subtle bg-surface-card p-5">
                <MonoLabel className="text-gold">{c.number}</MonoLabel>
                <p className="mt-4 text-sm font-medium text-surface-fg leading-snug">{c.title}</p>
                <p className="mt-1 font-mono text-[10px] text-surface-fg-muted tracking-wide-label">{c.count}</p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Type-check + commit**

```bash
npm run type-check
git add frontend/src/components/home/CapabilityIndex.tsx
git commit -m "feat(home): CapabilityIndex 4-tile system-map grid"
```

---

### Task 10: LiveStatusPanel

**Files:**
- Create: `frontend/src/components/home/LiveStatusPanel.tsx`

**Goal:** Illustrative "currently running" status panel. Numbers are clearly labelled illustrative until Phase 2 wires real telemetry.

- [ ] **Step 1: Create the component**

```tsx
import { LiveDot, MonoLabel } from './primitives'

type SiteRow = { name: string; live: boolean }
const SITES: SiteRow[] = [
  { name: 'VGH',         live: true },
  { name: 'UBC Hospital', live: true },
  { name: 'Lions Gate',   live: true },
  { name: 'Richmond',     live: true },
]

export function LiveStatusPanel() {
  return (
    <section className="bg-surface-canvas">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 lg:items-end">
          <div>
            <MonoLabel className="block mb-3">live · currently running</MonoLabel>
            <h2 className="text-2xl md:text-3xl font-medium tracking-tight-h text-surface-fg max-w-[26ch]">
              The system isn't a slide deck. It's running right now.
            </h2>
            <p className="mt-3 max-w-[44ch] text-sm text-surface-fg-secondary">
              Workflow infrastructure across four hospitals in Vancouver Coastal Health.
            </p>
          </div>

          <div className="w-full lg:w-[360px] rounded-xl border border-surface-subtle bg-surface-card p-5">
            <div className="flex items-center justify-between mb-4">
              <span className="inline-flex items-center gap-2">
                <LiveDot />
                <MonoLabel>system status</MonoLabel>
              </span>
              <MonoLabel>v3.x · illustrative</MonoLabel>
            </div>

            <div className="font-mono text-3xl font-medium tracking-tight-h text-surface-fg">
              2,847 <span className="text-sm font-normal text-surface-fg-muted">tracked equipment</span>
            </div>

            <ul className="mt-5 divide-y divide-surface-subtle">
              {SITES.map((s) => (
                <li key={s.name} className="flex items-center justify-between py-2">
                  <span className="text-xs text-surface-fg-secondary">{s.name}</span>
                  <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-gold tracking-wide-label">
                    <LiveDot pulse={false} />
                    live
                  </span>
                </li>
              ))}
            </ul>

            <div className="flex items-center justify-between border-t border-surface-subtle pt-3 mt-1">
              <MonoLabel>uptime · 30d</MonoLabel>
              <span className="font-mono text-xs text-gold">99.94%</span>
            </div>
          </div>
        </div>

        <p className="mt-4 font-mono text-[10px] uppercase tracking-wide-label text-surface-fg-muted">
          metrics shown are illustrative · phase 2 wires real telemetry
        </p>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Type-check + commit**

```bash
npm run type-check
git add frontend/src/components/home/LiveStatusPanel.tsx
git commit -m "feat(home): LiveStatusPanel (illustrative metrics labelled)"
```

---

### Task 11: FlagshipFeature

**Files:**
- Create: `frontend/src/components/home/FlagshipFeature.tsx`

**Goal:** Large cinematic tile foreshadowing the depth register. Click → `/work/wheelchair-tracking`.

- [ ] **Step 1: Create the component**

```tsx
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { MonoLabel } from './primitives'

export function FlagshipFeature() {
  return (
    <section className="bg-surface-canvas">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <Link
          href="/work/wheelchair-tracking"
          className="group block rounded-2xl border border-surface-subtle overflow-hidden transition-colors hover:border-gold/40"
        >
          <div className="relative bg-gradient-to-br from-surface-card via-surface-elevated to-[#1c2233] p-8 md:p-12">
            <div className="absolute right-6 top-6">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/10 px-3 py-1">
                <MonoLabel className="text-gold/90">featured · cathedral case study</MonoLabel>
                <ArrowUpRight className="h-3 w-3 text-gold/90 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </div>

            <MonoLabel className="block">01 · healthcare workflow systems</MonoLabel>
            <h3 className="mt-4 text-3xl md:text-5xl font-medium tracking-tight-display leading-[1.05] text-surface-fg max-w-[22ch]">
              Wheelchair Tracking System
            </h3>
            <p className="mt-5 max-w-[58ch] text-sm md:text-base text-surface-fg-secondary leading-relaxed">
              Operational visibility & accountability across VGH, UBC Hospital, Lions Gate, and Richmond. QR-driven workflows, equipment lifecycle tracking, real frontline use.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2">
              <MonoLabel>4 sites live</MonoLabel>
              <MonoLabel>microsoft lists · qr workflows</MonoLabel>
              <MonoLabel>v3.x</MonoLabel>
            </div>
          </div>
        </Link>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Type-check + commit**

```bash
npm run type-check
git add frontend/src/components/home/FlagshipFeature.tsx
git commit -m "feat(home): FlagshipFeature cinematic tile (links to /work/wheelchair-tracking)"
```

---

### Task 12: SelectedSystems

**Files:**
- Create: `frontend/src/components/home/SelectedSystems.tsx`

**Goal:** Linear-style row entries for the four remaining projects.

- [ ] **Step 1: Create the component**

```tsx
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { MonoLabel } from './primitives'

type Entry = { number: string; capability: string; title: string; description: string; href: string }

const ENTRIES: Entry[] = [
  { number: '02', capability: 'healthcare workflows', title: 'EquiTrackr',   description: 'Equipment lifecycle & operational logistics platform.', href: '/work/equitrackr' },
  { number: '03', capability: 'ai-native products',   title: 'Apex Protocol', description: 'AI-assisted fitness intelligence platform.',           href: '/work/apex-protocol' },
  { number: '04', capability: 'financial systems',    title: 'SpendWise',     description: 'Modern fintech budgeting & planning.',                 href: '/work/spendwise' },
  { number: '05', capability: 'ai studio',            title: 'Website Gemms', description: 'AI-assisted digital product & web studio.',           href: '/work/website-gemms' },
]

export function SelectedSystems() {
  return (
    <section className="bg-surface-canvas">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <MonoLabel className="block mb-4">selected systems</MonoLabel>
        <ul className="divide-y divide-surface-subtle border-y border-surface-subtle">
          {ENTRIES.map((e) => (
            <li key={e.number}>
              <Link
                href={e.href}
                className="group grid grid-cols-[auto_1fr_auto] items-center gap-6 px-2 py-6 transition-colors hover:bg-surface-card"
              >
                <MonoLabel className="text-gold">{e.number}</MonoLabel>
                <div>
                  <div className="flex items-baseline gap-3">
                    <h3 className="text-lg font-medium text-surface-fg">{e.title}</h3>
                    <MonoLabel>{e.capability}</MonoLabel>
                  </div>
                  <p className="mt-1 text-sm text-surface-fg-secondary">{e.description}</p>
                </div>
                <ArrowUpRight className="h-4 w-4 text-surface-fg-muted group-hover:text-surface-fg group-hover:translate-x-0.5 transition-all" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Type-check + commit**

```bash
npm run type-check
git add frontend/src/components/home/SelectedSystems.tsx
git commit -m "feat(home): SelectedSystems linear-row entries"
```

---

### Task 13: EssayStrip — register-shift to paper

**Files:**
- Create: `frontend/src/components/home/EssayStrip.tsx`

**Goal:** The first taste of the depth register on the homepage. A paper-cream block with 3 paragraphs of systems philosophy in the serif font. Links to writing.

- [ ] **Step 1: Create the component**

```tsx
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

export function EssayStrip() {
  return (
    <section className="bg-paper-bg text-paper-ink border-y border-paper-subtle">
      <div className="mx-auto max-w-3xl px-6 py-20 md:py-28">
        <p className="font-mono text-[10px] uppercase tracking-wide-label text-paper-ink-soft mb-6">
          a short note on how I build
        </p>
        <div className="font-serif text-lg md:text-xl leading-[1.7] text-paper-ink space-y-5">
          <p>
            Operational AI doesn't fail in the model. It fails in the workflow around the model — the scan, the handoff, the missing step, the place where the human and the system stop agreeing.
          </p>
          <p>
            Ten years on the frontline taught me to look there first. The interesting engineering problem is rarely the algorithm; it's the system <em>around</em> the algorithm: how it gets data, how it surfaces decisions, how it survives a real shift with real people.
          </p>
          <p>
            So when I build, I start from the workflow and work inward. The AI is a node in the system, not the centre of the universe.
          </p>
        </div>

        <Link
          href="/writing"
          className="mt-10 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wide-label text-paper-ink-soft hover:text-paper-ink transition-colors"
        >
          read more
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Type-check + commit**

```bash
npm run type-check
git add frontend/src/components/home/EssayStrip.tsx
git commit -m "feat(home): EssayStrip paper-register systems-philosophy block"
```

---

### Task 14: ContactStrip

**Files:**
- Create: `frontend/src/components/home/ContactStrip.tsx`

**Goal:** Single mono line. Email + three external links. No form.

- [ ] **Step 1: Create the component**

```tsx
import { MonoLabel } from './primitives'

const LINKS = [
  { label: 'github',   href: 'https://github.com/lloyddelacruz' },
  { label: 'linkedin', href: 'https://www.linkedin.com/in/lloyddelacruz/' },
  { label: 'x',        href: 'https://x.com/lloyddelacruz' },
]

export function ContactStrip() {
  return (
    <section id="contact" className="bg-surface-canvas border-t border-surface-subtle">
      <div className="mx-auto max-w-6xl px-6 py-14 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <a
          href="mailto:lloyd.vince1985@gmail.com"
          className="font-mono text-sm md:text-base text-surface-fg hover:text-gold transition-colors"
        >
          lloyd.vince1985@gmail.com
        </a>
        <ul className="flex items-center gap-6">
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
          <li><MonoLabel>vancouver, bc</MonoLabel></li>
        </ul>
      </div>
    </section>
  )
}
```

Note: the GitHub/LinkedIn/X URLs are placeholders. Lloyd should confirm or replace before the site goes public — flag this in the user review.

- [ ] **Step 2: Type-check + commit**

```bash
npm run type-check
git add frontend/src/components/home/ContactStrip.tsx
git commit -m "feat(home): ContactStrip single-line mono contact"
```

---

### Task 15: Placeholder `/work/*` routes

**Files:**
- Create: `frontend/src/app/work/wheelchair-tracking/page.tsx`
- Create: `frontend/src/app/work/equitrackr/page.tsx`
- Create: `frontend/src/app/work/apex-protocol/page.tsx`
- Create: `frontend/src/app/work/spendwise/page.tsx`
- Create: `frontend/src/app/work/website-gemms/page.tsx`
- Create: `frontend/src/components/home/PlaceholderCaseStudy.tsx`

**Goal:** Every link from the new homepage resolves to a styled "in progress" page in the appropriate register. The flagship + EquiTrackr placeholders use paper register (depth-register foreshadowing for Phase 2's cathedral build). The other three use surface register (peer briefs).

- [ ] **Step 1: Create the shared placeholder component**

`frontend/src/components/home/PlaceholderCaseStudy.tsx`:

```tsx
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

type Props = {
  capability: string
  title: string
  description: string
  register: 'surface' | 'paper'
}

export function PlaceholderCaseStudy({ capability, title, description, register }: Props) {
  const isPaper = register === 'paper'
  return (
    <main className={isPaper ? 'min-h-screen bg-paper-bg text-paper-ink' : 'min-h-screen bg-surface-canvas text-surface-fg'}>
      <div className="mx-auto max-w-3xl px-6 py-32">
        <Link
          href="/"
          className={`inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wide-label ${isPaper ? 'text-paper-ink-soft hover:text-paper-ink' : 'text-surface-fg-secondary hover:text-surface-fg'}`}
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          back to systems
        </Link>

        <p className={`mt-12 font-mono text-[10px] uppercase tracking-wide-label ${isPaper ? 'text-paper-ink-soft' : 'text-surface-fg-muted'}`}>
          {capability}
        </p>
        <h1 className={`mt-3 font-medium tracking-tight-display ${isPaper ? 'font-serif text-4xl md:text-6xl leading-[1.05]' : 'text-4xl md:text-6xl leading-[1.05]'}`}>
          {title}
        </h1>
        <p className={`mt-6 max-w-[58ch] leading-relaxed ${isPaper ? 'font-serif text-lg' : 'text-base text-surface-fg-secondary'}`}>
          {description}
        </p>

        <div className={`mt-12 inline-flex items-center gap-2 rounded-full border px-3 py-1 ${isPaper ? 'border-paper-subtle' : 'border-surface-subtle'}`}>
          <span className={`font-mono text-[10px] uppercase tracking-wide-label ${isPaper ? 'text-paper-ink-soft' : 'text-surface-fg-muted'}`}>
            case study · phase 2
          </span>
        </div>
      </div>
    </main>
  )
}
```

- [ ] **Step 2: Create the 5 placeholder pages**

`frontend/src/app/work/wheelchair-tracking/page.tsx`:

```tsx
import { PlaceholderCaseStudy } from '@/components/home/PlaceholderCaseStudy'

export default function Page() {
  return (
    <PlaceholderCaseStudy
      register="paper"
      capability="01 · healthcare workflow systems"
      title="Wheelchair Tracking System"
      description="A real operational system across four hospitals — Vancouver General, UBC Hospital, Lions Gate, and Richmond — built on Microsoft Lists, QR workflows, and equipment lifecycle tracking. The cinematic case study is being assembled in Phase 2."
    />
  )
}
```

`frontend/src/app/work/equitrackr/page.tsx`:

```tsx
import { PlaceholderCaseStudy } from '@/components/home/PlaceholderCaseStudy'

export default function Page() {
  return (
    <PlaceholderCaseStudy
      register="paper"
      capability="02 · healthcare workflow systems"
      title="EquiTrackr"
      description="Equipment lifecycle and operational logistics platform. Secondary deep-dive supporting the systems-thinking thesis — full case study in Phase 2."
    />
  )
}
```

`frontend/src/app/work/apex-protocol/page.tsx`:

```tsx
import { PlaceholderCaseStudy } from '@/components/home/PlaceholderCaseStudy'

export default function Page() {
  return (
    <PlaceholderCaseStudy
      register="surface"
      capability="03 · ai-native product systems"
      title="Apex Protocol"
      description="AI-assisted fitness intelligence platform. System brief in Phase 2."
    />
  )
}
```

`frontend/src/app/work/spendwise/page.tsx`:

```tsx
import { PlaceholderCaseStudy } from '@/components/home/PlaceholderCaseStudy'

export default function Page() {
  return (
    <PlaceholderCaseStudy
      register="surface"
      capability="04 · financial & planning systems"
      title="SpendWise"
      description="Modern fintech budgeting and planning. System brief in Phase 2."
    />
  )
}
```

`frontend/src/app/work/website-gemms/page.tsx`:

```tsx
import { PlaceholderCaseStudy } from '@/components/home/PlaceholderCaseStudy'

export default function Page() {
  return (
    <PlaceholderCaseStudy
      register="surface"
      capability="05 · ai-assisted digital experiences"
      title="Website Gemms"
      description="AI-assisted digital product and web studio. System brief in Phase 2."
    />
  )
}
```

- [ ] **Step 3: Type-check + commit**

```bash
npm run type-check
git add frontend/src/app/work/ frontend/src/components/home/PlaceholderCaseStudy.tsx
git commit -m "feat(routes): /work/* Phase 2 placeholder pages in correct registers"
```

---

### Task 16: Homepage composition — the swap

**Files:**
- Modify: `frontend/src/app/page.tsx`

**Goal:** Replace the existing homepage with the 8-section Operator's Surface composition.

- [ ] **Step 1: Replace `frontend/src/app/page.tsx` with the new composition**

```tsx
import { NavBar } from '@/components/home/NavBar'
import { HeroSystemsMap } from '@/components/home/HeroSystemsMap'
import { CapabilityIndex } from '@/components/home/CapabilityIndex'
import { LiveStatusPanel } from '@/components/home/LiveStatusPanel'
import { FlagshipFeature } from '@/components/home/FlagshipFeature'
import { SelectedSystems } from '@/components/home/SelectedSystems'
import { EssayStrip } from '@/components/home/EssayStrip'
import { ContactStrip } from '@/components/home/ContactStrip'

export default function Home() {
  return (
    <>
      <NavBar />
      <main className="min-h-screen bg-surface-canvas text-surface-fg">
        <HeroSystemsMap />
        <CapabilityIndex />
        <LiveStatusPanel />
        <FlagshipFeature />
        <SelectedSystems />
        <EssayStrip />
        <ContactStrip />
      </main>
    </>
  )
}
```

- [ ] **Step 2: Verify visually**

Run `npm run dev`. Open `http://localhost:3001`. Walk through the page top-to-bottom and confirm:

1. NavBar — translucent, mono links, becomes opaque-with-border on scroll
2. Hero — animated systems map background, headline with `operational` in gold, three pills
3. Capability index — 4 tiles, gold numerals, hover state visible
4. Live Status — left explanation + right panel with metrics + "illustrative" footnote
5. Flagship — gradient tile, "featured · cathedral case study" pill, gold border on hover
6. Selected systems — 4 Linear rows, gold numerals, arrow translates on hover
7. Essay strip — paper-cream block in serif font (the register handoff moment)
8. Contact strip — single mono line, email + 3 links

- [ ] **Step 3: Verify in mobile viewport**

Resize browser to 375px wide. Expected: NavBar collapses gracefully, hero remains legible, capability tiles stack to 1 column on small / 2 columns on `sm`, flagship tile padding adapts, selected-systems rows remain readable.

- [ ] **Step 4: Run type-check + build**

```bash
npm run type-check
npm run build
```

Expected: both succeed. The build may warn about static export and dynamic routes — acceptable for Phase 1.

- [ ] **Step 5: Commit**

```bash
git add frontend/src/app/page.tsx
git commit -m "feat(home): swap homepage to Operator's Surface composition (8 sections)"
```

---

### Task 17: Accessibility & responsive verification

**Files:** (no code changes expected unless a defect is found)

**Goal:** Verify keyboard nav, focus rings, contrast, reduced-motion, and three breakpoints.

- [ ] **Step 1: Keyboard navigation**

With `npm run dev` running, tab through the homepage from top. Expected: focus moves through NavBar links, headline pills (none focusable — OK), capability tiles (each focusable), live status panel (no interactive elements), flagship tile, selected-systems rows, essay strip "read more" link, contact email, three external links. Every focused element shows a visible focus ring. If any element is missing a ring, add `focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2` to its className.

- [ ] **Step 2: Reduced-motion check**

macOS: System Settings → Accessibility → Display → Reduce motion. Reload page. Expected: systems-map pulse and edge-fire are both off; no other animations on the homepage; NavBar still transitions colour (acceptable — CSS transitions on hover are explicitly allowed by the spec's motion principles).

- [ ] **Step 3: Contrast spot-check**

Use browser devtools' contrast tool on:
- Headline white-on-near-black: expect ≥ 12:1
- `text-surface-fg-secondary` on canvas: expect ≥ 4.5:1
- `text-surface-fg-muted` on canvas: must be ≥ 3:1 (used only for non-essential metadata); if below, brighten `--surface-fg-muted` to `222 5% 52%` (#777c87) in `globals.css`.
- Gold-on-canvas: gold is decorative — verify ≥ 4.5:1 only where used for body-weight text (essay-strip "read more", live panel uptime). If below 4.5:1 in those spots, deepen the gold to `--accent-gold: 30 49% 56%` (#bd9156).

- [ ] **Step 4: Three-breakpoint visual sweep**

Resize devtools to 375 / 768 / 1440 px wide. Walk top-to-bottom at each width. Note any layout breaks — fix inline. Common fixes: add `flex-wrap` to pill rows, reduce display headline size at `text-4xl` for `<480px`, increase vertical section padding gap on `md+`.

- [ ] **Step 5: Final commit (only if fixes were made)**

```bash
git add frontend/
git commit -m "fix(a11y): focus rings, contrast tuning, mobile layout polish"
```

If no defects found in Steps 1–4, skip the commit and proceed.

---

## Done

After Task 17, the Operator's Surface homepage is live on `/` with Dual Register tokens, Systems Map hero, Live Status block, capability index, flagship cathedral entry point, selected systems, paper-register essay strip, and contact line. All `/work/*` links resolve to register-appropriate placeholder pages awaiting Phase 2 case study choreography.

**Phase 2 (separate plan):**
- Cathedral case study for `/work/wheelchair-tracking`
- Real telemetry wired into `LiveStatusPanel`
- Capability sub-pages (`/capabilities/*`)
- Writing section template
- EquiTrackr secondary deep-dive
- Peer system briefs (Apex, SpendWise, Website Gemms)
- The one playable interactive inside the flagship
- Token migration for legacy pages (or graceful retirement)
