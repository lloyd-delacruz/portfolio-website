# Blog Interactive Index — Design Spec

**Date:** 2026-05-12
**Status:** Approved (pending spec review)
**Branch:** `phase-1-repositioning`
**Scope:** Restructure `/blog` index page only. Post-level interactivity is a follow-up spec.

## Problem

The current `/blog` page (just rewritten with theme-aligned typography) reads like a newspaper: a divider-list of articles. The site overall is positioned as an instrument-panel for "operational AI systems" (see `HeroSystemsMap`, `CapabilityIndex`, `LiveStatusPanel`). The blog index should feel like another navigable system, not a static reading list.

The user wants the index to be **interactive — something users explore**, not just a list to scan.

## Goal

Rebuild the `/blog` index as a *Topic Playground + Live Cards* experience:

- Cards that **physically resort** when category chips are clicked
- Each card carries a **category-specific mini visual** that animates on hover, giving a peek of the essay's domain
- Live search and sort controls that operate on the visible grid
- All interactions feel light and instrumented, in keeping with the rest of the site

## Non-goals (explicit, to prevent scope creep)

- **Post-level interactivity** (MDX components, embedded charts, demos inside `/blog/[slug]`). Will be addressed in a separate spec.
- **Rebuilding `/blog/[slug]` visuals.** The post page stays as-is for now.
- **SEO metadata copy update.** `app/blog/page.tsx` Metadata block remains untouched.
- **Frontmatter changes.** Mini-preview variant is derived from existing `category` field; no new fields required on posts.
- **New libraries.** Use what is already in `frontend/package.json`: Framer Motion, Lucide React, Tailwind. No charting library on the index.

## Design

### Page architecture

Top to bottom on `/blog`:

1. **`NavBar`** (existing component from `components/home/NavBar.tsx`).
2. **Header band** — visually consistent with `HeroSystemsMap` reduced for a sub-page.
   - `MonoLabel` kicker: `field notes · writing index`
   - Sans headline with one gold accent word (`tracking-tight-display`)
   - Single serif sublead, max ~58ch
   - Compact mono stat line: `06 essays · 04 topics · updated MAR 2026`. All three values are computed in `BlogIndexClient` from `initialPosts`: `essays = posts.length`, `topics = new Set(posts.map(p => p.category)).size`, `updated = MMM YYYY` formatted from `Math.max(...posts.map(p => +new Date(p.date)))`.
3. **Control band** — single thin row below the header band. Not sticky (the `NavBar` is already fixed; a second sticky band would crowd the viewport).
   - **Search input** — mono, thin-bordered, leading `Search` icon, placeholder `search the index`
   - **Category chips** — center-aligned, mono small-caps, active state in gold (`border-gold/50 bg-surface-elevated`)
   - **Sort toggle** — right-aligned, two-state pill: `latest` / `by topic`
4. **Card grid** — `1 / 2 / 3` columns responsive (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`), `gap-5 md:gap-6`. Cards animate position on filter/sort change via Framer Motion `layout`.
5. **Empty state** — when no posts match, a centered mono message and a `[clear filters]` mono button. No emoji.

### The card

Single component: `<EssayCard post={...} index={n} />`.

```
┌──────────────────────────────────────────┐
│  01  ·  healthcare  ·  6 min      ↗      │   <- header strip (mono)
│                                          │
│  ╭──────────────────────────────────╮    │
│  │                                  │    │
│  │       <PreviewCanvas />          │    │   <- ~140px fixed-height
│  │       category-specific mini     │    │      animates on hover
│  ╰──────────────────────────────────╯    │
│                                          │
│  Title of the essay in two lines max,    │   <- sans, tracking-tight-h
│  truncated with ellipsis if it overflows │      hover -> text-gold
│                                          │
│  Short serif excerpt clamped to two      │   <- serif (Source Serif 4)
│  lines, text-surface-fg-secondary.       │      text-surface-fg-secondary
│                                          │
│  MAR 14 2026  ·  tag-one  ·  tag-two     │   <- mono footer strip
└──────────────────────────────────────────┘
```

Card-level hover:
- Border `surface-subtle` → `surface-strong`
- Card translates `y: -2px`
- Arrow translates `x: +2px, y: -2px`, color → `gold`
- Title color → `gold`
- `PreviewCanvas` triggers its variant-specific animation

No box-shadow glow. No glass blur. No gradient overlays.

### `<PreviewCanvas variant={...} />`

A single new file: `frontend/src/components/blog/PreviewCanvas.tsx`.

Exports one component that dispatches on `variant`. Variants:

| Variant         | Derived from `category` | Visual                                                                     |
|-----------------|-------------------------|----------------------------------------------------------------------------|
| `healthcare`    | `healthcare`            | 3 station dots in a row connected by a horizontal line; a token-dot eases left→right on hover (patient/workflow flow) |
| `ai`            | `ai`                    | Central square node with 2 input arrows on the left and 2 output arrows on the right; arrows pulse gold sequentially on hover |
| `data-science` | `data-science`          | Sparkline `path` that draws on hover via `stroke-dasharray` animation       |
| `development`   | `development`           | Vertical "commit graph" — 5 dots connected by a line, top dot pulses gold on hover |
| `default`       | anything else           | Soft 5×5 dot grid; dots stagger-fade on hover                              |

Rules:
- Pure inline SVG, no external icons.
- All strokes/fills in either `currentColor` (so we can swap via parent `text-...` class) or `text-gold` / `text-surface-fg-muted`.
- Default state is calm (no motion). Animations only run on the parent card's `:hover` / focus-within state via Tailwind `group-hover:` modifiers, or via Framer Motion `whileHover` on the card.
- Each variant renders in a `relative h-[140px] w-full rounded-md border border-surface-subtle bg-surface-card overflow-hidden` shell.

### Interactions

| Interaction                | Effect                                                                                  |
|----------------------------|-----------------------------------------------------------------------------------------|
| Click category chip        | `selectedCategory` updates; cards reflow with FM `layout` (`transition: { duration: 0.3, ease: 'easeOut' }`) |
| Type in search             | `searchTerm` updates; unmatched cards exit via FM `AnimatePresence` (opacity 0)         |
| Toggle sort                | `sortMode` flips; cards reorder; FM `layout` handles motion                             |
| Hover card                 | Card lift + arrow translate + title gold + preview canvas animates                       |
| Click card                 | Whole card is a `<Link>` to `/blog/[slug]`                                              |
| Filter yields no posts     | Empty state renders; "clear filters" button resets `selectedCategory='all'`, `searchTerm=''` |

Sort modes:
- `latest` (default): `posts.sort((a,b) => +new Date(b.date) - +new Date(a.date))`
- `by topic`: group by `category` (alphabetical), then within each group `date desc`. Implementation note: a single flat order is sufficient — no group headers in v1.

### Type & color discipline

| Role                   | Token                                              |
|------------------------|----------------------------------------------------|
| Page bg                | `bg-surface-canvas`                                |
| Card bg                | `bg-surface-card`                                  |
| Card border (default)  | `border-surface-subtle`                            |
| Card border (hover)    | `border-surface-strong`                            |
| Active chip border     | `border-gold/50`, `bg-surface-elevated`            |
| Body fg                | `text-surface-fg`                                  |
| Secondary fg           | `text-surface-fg-secondary`                        |
| Muted fg               | `text-surface-fg-muted`                            |
| Accent                 | `text-gold`                                        |
| Title font             | `font-sans` with `tracking-tight-h`                |
| Excerpt font           | `font-serif`                                       |
| Label/meta font        | `font-mono` with `tracking-wide-label`             |

No new tokens are introduced.

### Data shape

Existing `BlogPost` interface (from `lib/blog.ts`) is sufficient:
- `slug, title, excerpt, date, category, tags, readTime, author` are all already present.
- Mini-preview variant is derived from `category` inside `PreviewCanvas`.

### Files touched

- **Rewrite:** `frontend/src/app/blog/BlogIndexClient.tsx`
- **Add:** `frontend/src/components/blog/PreviewCanvas.tsx`
- **No changes:**
  - `frontend/src/app/blog/page.tsx` (server loader, metadata)
  - `frontend/src/lib/blog.ts`, `lib/blog-server.ts`
  - `frontend/src/app/blog/[slug]/*` (post page)
  - Any post frontmatter
  - Tailwind config

### Accessibility

- Search input gets an `aria-label`.
- Category chips use `aria-pressed`.
- Sort toggle uses `aria-pressed`.
- Card link wraps the full card; the inner content is decorative; the `aria-label` on the link includes title + read time.
- `PreviewCanvas` is decorative (`aria-hidden="true"`).
- Focus-visible rings reuse `focus-visible:ring-1 focus-visible:ring-gold/40` already used elsewhere on the site.

### Error / edge cases

- Zero posts loaded (data missing) → render empty state with `no entries match` message.
- Single post in a category → grid stays single-card; layout shouldn't collapse.
- A post with no tags → footer renders only date.
- Unknown `category` value → `PreviewCanvas` falls back to `default` variant.
- Long titles → `line-clamp-2`. Long excerpts → `line-clamp-2`.

### Performance

- All preview canvases are inline SVG with CSS-driven animation — no JS animation loop, no canvas, no charting lib.
- FM `layout` animation runs only on filter/sort change. Idle = no motion.
- No additional network requests vs current page.

## Testing / verification

This is a UI restructure with no backend or business-logic changes. Verification:

1. `npm run type-check` — no errors
2. `npm run lint` — no warnings on touched files
3. **Manual:** open `/blog` in dev server (port 3001) and verify:
   - All 6 existing posts render
   - Category chips filter and animate
   - Search filters live
   - Sort toggle reorders correctly
   - Each preview variant animates on hover
   - Empty state appears and resets
   - Mobile (sm), tablet (md), desktop (lg) layouts hold
   - Focus rings visible on keyboard nav

## Open questions (resolved during brainstorm)

- ~~Index-only or both layers?~~ Both layers, but index ships first; post-widget kit is a follow-up spec.
- ~~Which interaction metaphor?~~ Option 2 (Topic Playground + Live Cards).
- ~~Do we need new frontmatter?~~ No; derive from `category`.

## Follow-up specs (out of scope here)

- **Post-level interactivity widget kit** — design the MDX component primitives (`<MetricStrip />`, `<SystemDiagram />`, `<DataView />`, etc.), how authors embed them, the variant set, and how they integrate with `/blog/[slug]`.
- **`/blog/[slug]` visual rebuild** — bring the post page into theme alignment (currently still old aesthetic).
- **SEO metadata refresh** — align `app/blog/page.tsx` Metadata with new positioning.
