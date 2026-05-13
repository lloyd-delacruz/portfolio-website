# Blog Interactive Index Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild `/blog` as an interactive "Topic Playground + Live Cards" experience — category-driven card grid with mini-preview SVGs that animate on hover, live search/filter/sort with Framer Motion `layout` reflow.

**Architecture:** Two component changes inside the existing Next.js App Router page. A new presentational primitive (`PreviewCanvas`) renders one of five SVG variants chosen from `BlogPost.category`. The page client (`BlogIndexClient`) is rewritten to manage `selectedCategory` / `searchTerm` / `sortMode` state, render a controls band, and lay out cards with `motion.article` + `layout` so filter/sort transitions animate. All styling uses existing theme tokens; no Tailwind config or frontmatter changes.

**Tech Stack:** Next.js 15 App Router, TypeScript, Tailwind CSS (existing tokens only), Framer Motion (already installed), Lucide React (already installed).

**Spec:** `docs/superpowers/specs/2026-05-12-blog-interactive-index-design.md`

---

## File Structure

| Path                                                       | Responsibility                                                                                             | Action  |
|------------------------------------------------------------|------------------------------------------------------------------------------------------------------------|---------|
| `frontend/src/components/blog/PreviewCanvas.tsx`           | New. One default export. Dispatches on `variant`; renders one of 5 inline SVG scenes. Animates via `active` prop. | Create  |
| `frontend/src/app/blog/BlogIndexClient.tsx`                | Rewrite. Holds filter/search/sort state, renders NavBar + header band + control band + animated card grid. | Rewrite |
| `frontend/src/app/blog/page.tsx`                           | Server loader. Unchanged.                                                                                  | None    |
| `frontend/src/lib/blog.ts`, `lib/blog-server.ts`           | Data layer. Unchanged.                                                                                     | None    |

Inside `BlogIndexClient.tsx`, an internal `EssayCard` component (not exported) composes the card markup with `PreviewCanvas`. Keeping it co-located avoids prop-drilling and keeps the page self-contained.

---

## Task 1: Create `PreviewCanvas` with five variants

**Files:**
- Create: `frontend/src/components/blog/PreviewCanvas.tsx`

- [ ] **Step 1: Create the directory and file**

Run from project root:
```bash
mkdir -p frontend/src/components/blog
```

- [ ] **Step 2: Write the full `PreviewCanvas` component**

Write to `frontend/src/components/blog/PreviewCanvas.tsx`:

```tsx
'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export type PreviewVariant =
  | 'healthcare'
  | 'ai'
  | 'data-science'
  | 'development'
  | 'default'

export function variantFromCategory(category: string): PreviewVariant {
  switch (category) {
    case 'healthcare':
    case 'ai':
    case 'data-science':
    case 'development':
      return category
    default:
      return 'default'
  }
}

type Props = {
  variant: PreviewVariant
  active: boolean
  className?: string
}

export function PreviewCanvas({ variant, active, className }: Props) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'relative h-[140px] w-full overflow-hidden rounded-md',
        'border border-surface-subtle bg-surface-card',
        className
      )}
    >
      {variant === 'healthcare' && <HealthcareScene active={active} />}
      {variant === 'ai' && <AIScene active={active} />}
      {variant === 'data-science' && <DataScienceScene active={active} />}
      {variant === 'development' && <DevelopmentScene active={active} />}
      {variant === 'default' && <DefaultScene active={active} />}
    </div>
  )
}

function HealthcareScene({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 200 100" className="h-full w-full">
      <line
        x1="20" y1="50" x2="180" y2="50"
        stroke="currentColor" strokeWidth="1"
        className="text-surface-fg-muted"
      />
      {[20, 100, 180].map((cx) => (
        <circle
          key={cx} cx={cx} cy="50" r="4"
          fill="currentColor"
          className="text-surface-fg-muted"
        />
      ))}
      <motion.circle
        cx="20" cy="50" r="3.5"
        fill="currentColor"
        className="text-gold"
        animate={active ? { cx: [20, 100, 180], opacity: [0, 1, 1, 0] } : { cx: 20, opacity: 0 }}
        transition={{ duration: 1.6, ease: 'easeInOut', times: [0, 0.5, 0.9, 1] }}
      />
    </svg>
  )
}

function AIScene({ active }: { active: boolean }) {
  const arrowDelays = [0, 0.15, 0.3, 0.45]
  return (
    <svg viewBox="0 0 200 100" className="h-full w-full">
      <rect
        x="85" y="35" width="30" height="30" rx="3"
        fill="none" stroke="currentColor" strokeWidth="1"
        className="text-surface-fg-muted"
      />
      {/* left input arrows */}
      {[35, 65].map((y, i) => (
        <motion.line
          key={`in-${y}`}
          x1="20" y1={y} x2="83" y2={y === 35 ? 42 : 58}
          stroke="currentColor" strokeWidth="1"
          className={active ? 'text-gold' : 'text-surface-fg-muted'}
          animate={active ? { opacity: [0.3, 1, 0.3] } : { opacity: 0.4 }}
          transition={{ duration: 1.2, repeat: Infinity, delay: arrowDelays[i] }}
        />
      ))}
      {/* right output arrows */}
      {[42, 58].map((y, i) => (
        <motion.line
          key={`out-${y}`}
          x1="117" y1={y} x2="180" y2={y === 42 ? 35 : 65}
          stroke="currentColor" strokeWidth="1"
          className={active ? 'text-gold' : 'text-surface-fg-muted'}
          animate={active ? { opacity: [0.3, 1, 0.3] } : { opacity: 0.4 }}
          transition={{ duration: 1.2, repeat: Infinity, delay: arrowDelays[i + 2] }}
        />
      ))}
    </svg>
  )
}

function DataScienceScene({ active }: { active: boolean }) {
  // a hand-drawn sparkline path
  const d = 'M 10 70 L 35 55 L 60 62 L 85 40 L 110 48 L 135 28 L 160 35 L 190 15'
  return (
    <svg viewBox="0 0 200 100" className="h-full w-full">
      {/* baseline */}
      <line
        x1="10" y1="85" x2="190" y2="85"
        stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 3"
        className="text-surface-fg-muted opacity-50"
      />
      <motion.path
        d={d}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-gold"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: active ? 1 : 0.15 }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
      />
    </svg>
  )
}

function DevelopmentScene({ active }: { active: boolean }) {
  const dots = [20, 40, 60, 80, 100]
  return (
    <svg viewBox="0 0 200 120" className="h-full w-full">
      <line
        x1="100" y1="20" x2="100" y2="100"
        stroke="currentColor" strokeWidth="1"
        className="text-surface-fg-muted"
      />
      {dots.map((cy, i) => (
        <motion.circle
          key={cy}
          cx="100" cy={cy} r={i === 0 ? 4 : 3}
          fill="currentColor"
          className={i === 0 ? 'text-gold' : 'text-surface-fg-muted'}
          animate={
            i === 0 && active
              ? { r: [4, 6, 4], opacity: [1, 0.6, 1] }
              : { r: i === 0 ? 4 : 3 }
          }
          transition={{ duration: 1.1, repeat: i === 0 && active ? Infinity : 0 }}
        />
      ))}
    </svg>
  )
}

function DefaultScene({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 200 100" className="h-full w-full">
      {Array.from({ length: 25 }).map((_, i) => {
        const row = Math.floor(i / 5)
        const col = i % 5
        return (
          <motion.circle
            key={i}
            cx={40 + col * 30}
            cy={15 + row * 18}
            r={1.5}
            fill="currentColor"
            className="text-surface-fg-muted"
            animate={{ opacity: active ? [0.3, 1, 0.3] : 0.35 }}
            transition={{
              duration: 1.6,
              repeat: active ? Infinity : 0,
              delay: (row + col) * 0.08,
            }}
          />
        )
      })}
    </svg>
  )
}
```

- [ ] **Step 3: Type-check**

Run from project root:
```bash
npm run type-check
```
Expected: command exits 0 with no errors.

- [ ] **Step 4: Lint the new file**

Run from `frontend/`:
```bash
cd frontend && npx next lint --file src/components/blog/PreviewCanvas.tsx
```
Expected: `✔ No ESLint warnings or errors`

- [ ] **Step 5: Commit**

Run from project root:
```bash
git add frontend/src/components/blog/PreviewCanvas.tsx
git commit -m "$(cat <<'EOF'
feat(blog): PreviewCanvas with 5 category variants

Adds the inline SVG mini-previews used by the new blog index cards.
Variants: healthcare (workflow flow), ai (node + IO arrows),
data-science (sparkline draw), development (commit graph),
default (dot grid). Animations are gated on an active prop so the
parent card can drive hover state.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 2: Rewrite `BlogIndexClient` shell — NavBar + header band + stats

**Files:**
- Rewrite: `frontend/src/app/blog/BlogIndexClient.tsx`

Goal of this task: get the new page shell rendering (header band + stats line + empty placeholder for grid) so we can verify type-check / lint pass before adding interactivity in Task 3.

- [ ] **Step 1: Replace `BlogIndexClient.tsx` with the shell**

Write to `frontend/src/app/blog/BlogIndexClient.tsx`:

```tsx
'use client'

import { useMemo } from 'react'
import { NavBar } from '@/components/home/NavBar'
import { MonoLabel } from '@/components/home/primitives'
import type { BlogPost } from '@/lib/blog'

interface BlogIndexClientProps {
  initialPosts: BlogPost[]
  initialCategories: Array<{ id: string; label: string; count: number }>
}

const BlogIndexClient = ({ initialPosts }: BlogIndexClientProps) => {
  const stats = useMemo(() => {
    const essays = initialPosts.length
    const topics = new Set(initialPosts.map((p) => p.category)).size
    const latest = initialPosts.reduce<number>(
      (max, p) => Math.max(max, new Date(p.date).getTime()),
      0
    )
    const updated = latest
      ? new Date(latest).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }).toUpperCase()
      : '—'
    return { essays, topics, updated }
  }, [initialPosts])

  return (
    <>
      <NavBar />
      <main className="min-h-screen bg-surface-canvas text-surface-fg">
        {/* Header band */}
        <section className="border-b border-surface-subtle">
          <div className="mx-auto max-w-6xl px-6 pt-32 pb-12 md:pt-40 md:pb-16">
            <MonoLabel className="block mb-4">field notes · writing index</MonoLabel>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight-display leading-[1.06] text-surface-fg max-w-[22ch]">
              Notes from the <span className="text-gold">workflow</span>.
            </h1>
            <p className="mt-6 max-w-[58ch] font-serif text-lg md:text-xl leading-[1.7] text-surface-fg-secondary">
              Short essays on operational AI, healthcare workflows, and the systems
              around the model — written from inside the shift, not above it.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1">
              <MonoLabel>{stats.essays.toString().padStart(2, '0')} essays</MonoLabel>
              <MonoLabel>·</MonoLabel>
              <MonoLabel>{stats.topics.toString().padStart(2, '0')} topics</MonoLabel>
              <MonoLabel>·</MonoLabel>
              <MonoLabel>updated {stats.updated}</MonoLabel>
            </div>
          </div>
        </section>

        {/* Control band — filled in Task 3 */}
        <section className="border-b border-surface-subtle">
          <div className="mx-auto max-w-6xl px-6 py-6">
            <MonoLabel>controls — coming in task 3</MonoLabel>
          </div>
        </section>

        {/* Grid — filled in Task 4 */}
        <section>
          <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
            <MonoLabel>grid — coming in task 4</MonoLabel>
          </div>
        </section>
      </main>
    </>
  )
}

export default BlogIndexClient
```

- [ ] **Step 2: Type-check**

Run from project root:
```bash
npm run type-check
```
Expected: exit 0, no errors.

- [ ] **Step 3: Lint**

Run from `frontend/`:
```bash
cd frontend && npx next lint --file src/app/blog/BlogIndexClient.tsx
```
Expected: `✔ No ESLint warnings or errors`

- [ ] **Step 4: Commit**

```bash
git add frontend/src/app/blog/BlogIndexClient.tsx
git commit -m "$(cat <<'EOF'
refactor(blog): rewrite index shell with NavBar + header band

Strips the previous newspaper-style divider list and replaces it with
the on-brand shell: NavBar, header band with gold-accented headline
and serif sublead, and a computed mono stat line (essays · topics ·
last-updated). Control band and grid are stubbed and will land in
follow-up commits.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 3: Control band — search, category chips, sort toggle

**Files:**
- Modify: `frontend/src/app/blog/BlogIndexClient.tsx`

- [ ] **Step 1: Update imports and add state hooks**

In `frontend/src/app/blog/BlogIndexClient.tsx`, replace the existing imports block at the top with:

```tsx
'use client'

import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { NavBar } from '@/components/home/NavBar'
import { MonoLabel } from '@/components/home/primitives'
import { cn } from '@/lib/utils'
import type { BlogPost } from '@/lib/blog'

type SortMode = 'latest' | 'topic'
```

- [ ] **Step 2: Add state declarations inside the component**

Add these lines at the top of the `BlogIndexClient` function body, before the existing `stats` `useMemo`:

```tsx
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortMode, setSortMode] = useState<SortMode>('latest')
```

- [ ] **Step 3: Replace the control-band placeholder with the real band**

In `BlogIndexClient.tsx`, replace this section:

```tsx
        {/* Control band — filled in Task 3 */}
        <section className="border-b border-surface-subtle">
          <div className="mx-auto max-w-6xl px-6 py-6">
            <MonoLabel>controls — coming in task 3</MonoLabel>
          </div>
        </section>
```

with:

```tsx
        {/* Control band */}
        <section className="border-b border-surface-subtle">
          <div className="mx-auto max-w-6xl px-6 py-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Search */}
            <label className="relative flex items-center w-full md:w-72">
              <Search className="pointer-events-none absolute left-3 h-3.5 w-3.5 text-surface-fg-muted" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="search the index"
                aria-label="Search the writing index"
                className={cn(
                  'w-full rounded-md border border-surface-subtle bg-surface-card/50 py-2 pl-9 pr-3',
                  'font-mono text-xs tracking-wide-label text-surface-fg placeholder:text-surface-fg-muted',
                  'transition-colors focus:outline-none focus:border-surface-strong',
                  'focus-visible:ring-1 focus-visible:ring-gold/40'
                )}
              />
            </label>

            {/* Category chips */}
            <ul className="flex flex-wrap items-center gap-2">
              {initialCategories.map((category) => {
                const active = selectedCategory === category.id
                return (
                  <li key={category.id}>
                    <button
                      type="button"
                      onClick={() => setSelectedCategory(category.id)}
                      aria-pressed={active}
                      className={cn(
                        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 transition-colors',
                        'font-mono text-[10px] uppercase tracking-wide-label',
                        active
                          ? 'border-gold/50 bg-surface-elevated text-surface-fg'
                          : 'border-surface-subtle bg-surface-card/50 text-surface-fg-secondary hover:text-surface-fg hover:border-surface-strong'
                      )}
                    >
                      <span>{category.label.toLowerCase()}</span>
                      <span className={cn('text-[10px]', active ? 'text-gold' : 'text-surface-fg-muted')}>
                        {category.count.toString().padStart(2, '0')}
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>

            {/* Sort toggle */}
            <div className="flex items-center gap-1 rounded-full border border-surface-subtle bg-surface-card/50 p-1">
              {(['latest', 'topic'] as SortMode[]).map((mode) => {
                const active = sortMode === mode
                return (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setSortMode(mode)}
                    aria-pressed={active}
                    className={cn(
                      'rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-wide-label transition-colors',
                      active
                        ? 'bg-surface-elevated text-surface-fg'
                        : 'text-surface-fg-secondary hover:text-surface-fg'
                    )}
                  >
                    {mode === 'latest' ? 'latest' : 'by topic'}
                  </button>
                )
              })}
            </div>
          </div>
        </section>
```

- [ ] **Step 4: Add the prop destructuring**

Make sure the component signature destructures `initialCategories`. Update the function signature line in `BlogIndexClient.tsx`:

```tsx
const BlogIndexClient = ({ initialPosts, initialCategories }: BlogIndexClientProps) => {
```

(If it already destructures both, leave it.)

- [ ] **Step 5: Type-check + lint**

```bash
npm run type-check
cd frontend && npx next lint --file src/app/blog/BlogIndexClient.tsx
```
Expected: both clean.

- [ ] **Step 6: Commit**

```bash
git add frontend/src/app/blog/BlogIndexClient.tsx
git commit -m "$(cat <<'EOF'
feat(blog): control band — search, category chips, sort toggle

Adds the three-control row below the header: mono search input,
category chips with gold-bordered active state, and a two-state
sort toggle (latest / by topic). All controls share the
AccentPill-style mono small-caps vocabulary used elsewhere.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 4: Card grid with `EssayCard` + `PreviewCanvas` + Framer Motion layout

**Files:**
- Modify: `frontend/src/app/blog/BlogIndexClient.tsx`

- [ ] **Step 1: Extend imports**

Replace the top imports block in `BlogIndexClient.tsx` with:

```tsx
'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Search } from 'lucide-react'
import { NavBar } from '@/components/home/NavBar'
import { MonoLabel } from '@/components/home/primitives'
import { PreviewCanvas, variantFromCategory } from '@/components/blog/PreviewCanvas'
import { cn } from '@/lib/utils'
import type { BlogPost } from '@/lib/blog'

type SortMode = 'latest' | 'topic'
```

- [ ] **Step 2: Add the derived list (filter + sort) right below the existing state hooks**

Add this `useMemo` immediately after the `useState` calls inside `BlogIndexClient`:

```tsx
  const visiblePosts = useMemo(() => {
    const term = searchTerm.trim().toLowerCase()
    const filtered = initialPosts.filter((post) => {
      const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory
      if (!term) return matchesCategory
      const matchesSearch =
        post.title.toLowerCase().includes(term) ||
        post.excerpt.toLowerCase().includes(term) ||
        post.tags.some((tag) => tag.toLowerCase().includes(term))
      return matchesCategory && matchesSearch
    })

    const byDateDesc = (a: BlogPost, b: BlogPost) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()

    if (sortMode === 'latest') {
      return [...filtered].sort(byDateDesc)
    }
    // 'topic' sort: group by category alphabetical, then date desc within group
    return [...filtered].sort((a, b) => {
      if (a.category !== b.category) return a.category.localeCompare(b.category)
      return byDateDesc(a, b)
    })
  }, [initialPosts, selectedCategory, searchTerm, sortMode])
```

- [ ] **Step 3: Replace the grid placeholder with the full animated grid**

Replace this section:

```tsx
        {/* Grid — filled in Task 4 */}
        <section>
          <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
            <MonoLabel>grid — coming in task 4</MonoLabel>
          </div>
        </section>
```

with:

```tsx
        {/* Card grid */}
        <section>
          <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
            <div className="mb-6 flex items-baseline justify-between">
              <MonoLabel>selected writing</MonoLabel>
              <MonoLabel>
                {visiblePosts.length.toString().padStart(2, '0')} /{' '}
                {initialPosts.length.toString().padStart(2, '0')}
              </MonoLabel>
            </div>

            <motion.ul
              layout
              className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3"
            >
              <AnimatePresence mode="popLayout">
                {visiblePosts.map((post, idx) => (
                  <EssayCard key={post.slug} post={post} index={idx} />
                ))}
              </AnimatePresence>
            </motion.ul>
          </div>
        </section>
```

- [ ] **Step 4: Add the `EssayCard` component below `BlogIndexClient`**

Place this `function EssayCard()` declaration after the closing `}` of `BlogIndexClient` and before `export default BlogIndexClient` — keeping the helper co-located in the same file:

```tsx
type EssayCardProps = { post: BlogPost; index: number }

function EssayCard({ post, index }: EssayCardProps) {
  const [hovered, setHovered] = useState(false)
  const variant = variantFromCategory(post.category)
  const dateLabel = new Date(post.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="list-none"
    >
      <Link
        href={`/blog/${post.slug}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        aria-label={`${post.title} — ${post.readTime}`}
        className={cn(
          'group block h-full rounded-lg border bg-surface-card p-5 transition-all',
          'border-surface-subtle hover:border-surface-strong hover:-translate-y-0.5',
          'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/40'
        )}
      >
        {/* Header strip */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MonoLabel className="text-gold">
              {(index + 1).toString().padStart(2, '0')}
            </MonoLabel>
            <MonoLabel>·</MonoLabel>
            <MonoLabel>{post.category.replace(/-/g, ' ')}</MonoLabel>
            <MonoLabel>·</MonoLabel>
            <MonoLabel>{post.readTime}</MonoLabel>
          </div>
          <ArrowUpRight
            className={cn(
              'h-4 w-4 transition-all',
              hovered
                ? 'text-gold translate-x-0.5 -translate-y-0.5'
                : 'text-surface-fg-muted'
            )}
          />
        </div>

        {/* Preview */}
        <PreviewCanvas variant={variant} active={hovered} className="mb-5" />

        {/* Title */}
        <h2
          className={cn(
            'text-lg md:text-xl font-medium tracking-tight-h leading-snug line-clamp-2 transition-colors',
            hovered ? 'text-gold' : 'text-surface-fg'
          )}
        >
          {post.title}
        </h2>

        {/* Excerpt */}
        <p className="mt-2 font-serif text-base leading-[1.7] text-surface-fg-secondary line-clamp-2">
          {post.excerpt}
        </p>

        {/* Footer strip */}
        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1">
          <MonoLabel>{dateLabel}</MonoLabel>
          {post.tags.slice(0, 2).map((tag) => (
            <MonoLabel key={tag}>· {tag}</MonoLabel>
          ))}
        </div>
      </Link>
    </motion.li>
  )
}
```

- [ ] **Step 5: Type-check + lint**

```bash
npm run type-check
cd frontend && npx next lint --file src/app/blog/BlogIndexClient.tsx
```
Expected: both clean.

- [ ] **Step 6: Smoke-test in the browser**

Run from project root:
```bash
npm run dev
```
Open `http://localhost:3001/blog`.

Verify:
- All 6 posts render as cards in a responsive grid (1 col mobile, 2 col tablet, 3 col desktop).
- Hovering a card: border darkens, title turns gold, preview canvas animates (variant-specific).
- Clicking category chips reflows cards smoothly.
- Typing in search shrinks the list live.
- Sort toggle reorders correctly between `latest` and `by topic`.

Stop the dev server (Ctrl-C) once verified.

- [ ] **Step 7: Commit**

```bash
git add frontend/src/app/blog/BlogIndexClient.tsx
git commit -m "$(cat <<'EOF'
feat(blog): EssayCard grid with PreviewCanvas + FM layout reflow

Replaces the placeholder grid with an animated card grid. Each
EssayCard composes a header strip (gold mono number, category,
read-time, arrow), a PreviewCanvas mini-visual, sans title, serif
excerpt, and a mono date+tags footer. Filter/search/sort changes
animate via Framer Motion layout + AnimatePresence popLayout.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 5: Empty state + clear-filters affordance

**Files:**
- Modify: `frontend/src/app/blog/BlogIndexClient.tsx`

- [ ] **Step 1: Add a clear-filters helper inside the component**

Inside `BlogIndexClient`, add this function above the `return`:

```tsx
  const clearFilters = () => {
    setSelectedCategory('all')
    setSearchTerm('')
  }
```

- [ ] **Step 2: Render the empty state when `visiblePosts.length === 0`**

In the card-grid section, replace this block:

```tsx
            <motion.ul
              layout
              className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3"
            >
              <AnimatePresence mode="popLayout">
                {visiblePosts.map((post, idx) => (
                  <EssayCard key={post.slug} post={post} index={idx} />
                ))}
              </AnimatePresence>
            </motion.ul>
```

with:

```tsx
            {visiblePosts.length === 0 ? (
              <div className="border-y border-surface-subtle px-2 py-16 text-center">
                <MonoLabel className="block">no entries match</MonoLabel>
                <p className="mt-3 font-serif text-base text-surface-fg-secondary">
                  Try a different search term or clear the active filters.
                </p>
                <button
                  type="button"
                  onClick={clearFilters}
                  className={cn(
                    'mt-5 inline-flex items-center gap-1.5 rounded-full border border-surface-subtle bg-surface-card/50 px-3 py-1',
                    'font-mono text-[10px] uppercase tracking-wide-label text-surface-fg-secondary',
                    'transition-colors hover:text-surface-fg hover:border-surface-strong',
                    'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/40'
                  )}
                >
                  clear filters
                </button>
              </div>
            ) : (
              <motion.ul
                layout
                className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3"
              >
                <AnimatePresence mode="popLayout">
                  {visiblePosts.map((post, idx) => (
                    <EssayCard key={post.slug} post={post} index={idx} />
                  ))}
                </AnimatePresence>
              </motion.ul>
            )}
```

- [ ] **Step 3: Type-check + lint**

```bash
npm run type-check
cd frontend && npx next lint --file src/app/blog/BlogIndexClient.tsx
```
Expected: both clean.

- [ ] **Step 4: Browser-verify the empty state**

```bash
npm run dev
```
Open `http://localhost:3001/blog`. In the search box type something nonsense like `qqqqq`. Verify:
- The grid disappears.
- The empty state appears: mono `no entries match`, serif sentence, `clear filters` button.
- Clicking `clear filters` resets the search and category, and the grid reappears.

Stop the dev server.

- [ ] **Step 5: Commit**

```bash
git add frontend/src/app/blog/BlogIndexClient.tsx
git commit -m "$(cat <<'EOF'
feat(blog): empty state + clear filters affordance

Renders a quiet mono+serif empty state when no posts match the
current filter+search combo, with a clear-filters pill that resets
selectedCategory and searchTerm in one click.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 6: Final verification pass

This task does not produce a commit unless it surfaces a defect. It is a manual QA gate before declaring the work done.

- [ ] **Step 1: Clean type-check across the project**

From project root:
```bash
npm run type-check
```
Expected: exit 0.

- [ ] **Step 2: Clean lint across the project**

```bash
npm run lint
```
Expected: exit 0.

- [ ] **Step 3: Manual browser walkthrough**

```bash
npm run dev
```
Open `http://localhost:3001/blog`. Walk through this checklist:

- [ ] **Layout**
  - Page header renders with `field notes · writing index` kicker, gold-accented headline, serif sublead, and a mono stat line showing the right counts (`06 essays · 04 topics · updated <month> <year>`).
  - Control band shows search + chips + sort toggle in one row on desktop, stacked on mobile.
  - Grid is 1 col at <768px, 2 col at ≥768px, 3 col at ≥1024px.
- [ ] **Card details**
  - Each card has gold mono number, category, read-time, arrow on header strip.
  - Preview canvas renders the variant matching the post's category.
  - Title is sans medium; excerpt is serif; footer is mono.
- [ ] **Hover state**
  - Hovering a card lifts it 2px, darkens the border, turns the title and arrow gold, and runs the preview animation (healthcare flow / ai pulses / data sparkline draws / dev dot pulses / default grid pulses).
  - Mouse-leaving stops the animation and reverts colors.
- [ ] **Filtering**
  - Click each category chip — cards reflow with motion, count in the header strip updates (`03 / 06`).
  - Active chip has gold border + elevated background.
- [ ] **Search**
  - Type into search — list filters live.
  - Search term clears when `clear filters` is pressed from the empty state.
- [ ] **Sort**
  - Toggle between `latest` and `by topic`. Cards reorder with motion.
- [ ] **Empty state**
  - Type `qqqqq` — empty state appears with `clear filters` button.
  - Click `clear filters` — grid restores, search clears, category resets to `all`.
- [ ] **Keyboard / a11y**
  - Tab through the page — focus rings (`ring-gold/40`) appear on search input, each chip, each sort button, each card link, and the clear-filters button.
  - All controls are operable with keyboard alone.
- [ ] **No console errors**
  - Browser devtools shows zero red errors and no Framer Motion warnings.

Stop the dev server.

- [ ] **Step 4: If any check above failed**

Fix the specific issue in `BlogIndexClient.tsx` or `PreviewCanvas.tsx`, then re-run the relevant browser check and type-check/lint. Commit each fix as its own `fix(blog): ...` commit.

- [ ] **Step 5: If all checks passed**

No commit needed for this task. The work is done.
