# Homepage redesign — diagram-first hero (mockup-aligned)

Date: 2026-05-12
Branch: `phase-1-repositioning`
Status: approved (design); pending implementation plan

## Goal

Rework the portfolio homepage to match the provided mockup: a two-column hero
with a contained "Operational Systems Map" panel, a five-column values row, and a
bordered pull-quote strip — then carry the new look (serif display headings,
contained panels) down through the existing sections.

Copy is taken **verbatim from the mockup**. Nav labels match the mockup
(WORK / ABOUT / THOUGHTS / CONTACT). The site's existing bronze gold accent
(`--accent-gold`, `#c79d6a`) is kept — the mockup's brighter yellow is not adopted.

## Non-goals

- Real telemetry. The "metrics shown are illustrative" disclaimer in
  `LiveStatusPanel` stays.
- Brightening `--accent-gold` site-wide.
- A mobile nav drawer — the current inline links are kept.
- Any route or page work beyond the homepage and the shared `NavBar`.

## Foundations

- **Serif on the dark canvas.** `Source Serif 4` is already loaded (used today
  only in the "paper" register). Introduce it on the dark canvas for the hero
  headline and section H2/H3 display headings: serif, medium weight,
  `tracking-tight-display`, tight leading (~1.04–1.1).
- **Gold:** keep the existing `--accent-gold` token everywhere.
- **Icons (`lucide-react`):** `Building2` (hospital nodes); `Workflow`,
  `Network`, `Database`, `Cpu` (or `Sparkles`), `Users` for the values row;
  `ArrowRight` for CTAs and the quote link.

## Section lineup (`frontend/src/app/page.tsx`)

```
NavBar
HeroSystemsMap          ← full rewrite (two-column)
ValuesRow               ← new
QuoteBar                ← new
FlagshipFeature         ← kept; headings → serif
CapabilityIndex         ← kept; headings → serif
LiveStatusPanel         ← kept; headings → serif
SelectedSystems         ← kept; headings → serif
EssayStrip              ← kept as-is (already serif / paper register)
ContactStrip            ← kept as-is
```

## 1. NavBar (restyle in place — `NavBar.tsx`, `primitives/BrandWordmark.tsx`)

- Wordmark becomes `LD` in serif (replacing the mono `lloyd.dev`), still links to `/`.
- Links, mono / uppercase / wide-tracked: **WORK** → `#systems`, **ABOUT** →
  `/about`, **THOUGHTS** → `/blog`, **CONTACT** → `#contact`.
- A small gold dot is centered beneath the active item. `NavBar` takes an
  `active` prop (`'work' | 'about' | 'thoughts' | 'contact' | undefined`); the
  homepage passes `active="work"`. Other pages can adopt it later.
- Keep the existing scroll → blur/border behavior.

## 2. Hero — `HeroSystemsMap.tsx` (full rewrite) + `SystemsMap.tsx` (refactor) + new `OperationalSystemsMap.tsx`

Two-column grid; stacks to one column on mobile (left block first, panel below).
Hero ≈ viewport height on desktop (`min-h-[100svh]`), auto height on mobile.

### Left column
- Eyebrow — mono, gold, wide-tracked: `APPLIED AI ENGINEER · HEALTHCARE SYSTEMS BUILDER`
- Headline — serif display, responsive `text-4xl → text-7xl`, tight leading:
  *"I build operational systems that make healthcare **work**."*
  — "work" set in **italic gold**; the trailing period in the default color.
- Body — sans, `text-surface-fg-secondary`, ~46ch:
  "I design and ship AI-native workflows that connect people, systems, and data
  — turning frontline complexity into operational clarity."
- CTAs — two buttons (new `primitives/CtaButton.tsx`, `variant="filled" | "outline"`):
  - Filled gold — **VIEW CASE STUDY** + `→` → `/work/wheelchair-tracking`
  - Outline (`border-surface-strong`, transparent) — **EXPLORE THE SYSTEM** + `→` → `#systems`
- Status line — gold mono label **SYSTEMS IN PRODUCTION** followed by four
  `● LIVE` chips: green `signal-live` dot (reuse `LiveDot`, `pulse={false}`) +
  mono `LIVE` label.

### Right column — Operational Systems Map panel (`OperationalSystemsMap.tsx`)
- Bordered card: `rounded-2xl`, `border-surface-subtle`, `bg-surface-card`, generous padding.
- Header: mono label **OPERATIONAL SYSTEMS MAP**; below it a sans sub-line
  "Real-time coordination across the network".
- Body: an SVG diagram (the refactored `SystemsMap`) on a faint dot-grid background:
  - Center node labelled `workflow_core` / `v3.x`, with slow concentric pulsing rings.
  - Four hospital nodes at the corners — each a circle containing a `Building2`
    glyph, with a green **LIVE** tag beside it. Labels map to the real sites
    used elsewhere in the codebase (VGH, UBC Hospital, Lions Gate, Richmond) but
    are rendered compactly; exact label rendering is an implementation detail.
  - Gold connector lines from the core to each hospital; a small gold pulse
    periodically travels outward along one randomly chosen edge.
  - Coordinates re-tuned for a contained box (the current `SystemsMap` is sized
    for a full-bleed background).
  - Motion discipline unchanged: `usePrefersReducedMotion` + `useInViewPause`;
    reduced-motion or off-screen → static diagram (no traveling pulse, no ring pulse).
- Footer row inside the card: gold dot + mono
  "Live state synchronization · Last updated 14:32:08". Timestamp is **static**
  (deterministic for static export); a ticking clock is explicitly out of scope.
- The panel is **not** a link — navigation is carried by the hero CTAs.

## 3. ValuesRow — new `ValuesRow.tsx`

- Section on `bg-surface-canvas` with `border-t border-surface-subtle`.
- Five columns, responsive `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5`,
  with thin vertical dividers between columns on `xl`.
- Each column: small gold line-icon (optionally wrapped in `primitives/IconBadge.tsx`),
  mono uppercase title, then a short statement (serif or sans — pick one and use
  it consistently; sans `text-surface-fg-secondary` is the default choice).
- Copy (verbatim):
  | icon | title | statement |
  |---|---|---|
  | `Network` | SYSTEMS THINKER | I see the whole system — people, process, data, and technology. |
  | `Workflow` | WORKFLOW ARCHITECT | I design operational workflows that scale in the real world. |
  | `Database` | DATA & INTEGRATION | I build reliable data systems that create a single source of truth. |
  | `Cpu` | AI-NATIVE BUILDER | I integrate AI where it amplifies decisions, not where it replaces them. |
  | `Users` | FRONTLINE FOCUSED | I build for the people who keep healthcare moving. |

## 4. QuoteBar — new `QuoteBar.tsx`

- Section on `bg-surface-canvas`; inside, one bordered rounded strip
  (`rounded-2xl border-surface-subtle bg-surface-card`), padded.
- Layout: oversized gold quotation glyph, then the pull-quote, then a
  right-aligned mono link.
  - Quote: "The best AI doesn't replace workflows. It makes them observable,
    reliable, and better every day."
  - Link: **VIEW FEATURED CASE STUDY** + `→` → `/work/wheelchair-tracking`.
- Stacks vertically on mobile (quote, then link).

## 5. Sections below — heading restyle only

`FlagshipFeature`, `CapabilityIndex`, `LiveStatusPanel`, `SelectedSystems`:
change their display H2/H3 classes from sans to the new serif treatment
(`font-serif`, medium, `tracking-tight-display`/`tracking-tight-h`). No
structural, copy, or behavioral changes. `EssayStrip` and `ContactStrip` are
untouched.

## New / changed files

**New**
- `frontend/src/components/home/ValuesRow.tsx`
- `frontend/src/components/home/QuoteBar.tsx`
- `frontend/src/components/home/OperationalSystemsMap.tsx`
- `frontend/src/components/home/primitives/CtaButton.tsx`
- `frontend/src/components/home/primitives/IconBadge.tsx` (optional — only if it
  earns its keep)

**Changed**
- `frontend/src/components/home/HeroSystemsMap.tsx` — full rewrite (two-column)
- `frontend/src/components/home/SystemsMap.tsx` — becomes the panel's inner SVG;
  re-tuned coordinates, hospital `Building2` glyphs, contained sizing
- `frontend/src/components/home/NavBar.tsx` — new labels + `active` prop + dot indicator
- `frontend/src/components/home/primitives/BrandWordmark.tsx` — `LD` serif wordmark
- `frontend/src/components/home/primitives/index.ts` — export new primitives
- `frontend/src/app/page.tsx` — new section order, pass `active="work"` to `NavBar`
- `frontend/src/components/home/FlagshipFeature.tsx` — heading → serif
- `frontend/src/components/home/CapabilityIndex.tsx` — heading → serif
- `frontend/src/components/home/LiveStatusPanel.tsx` — heading → serif
- `frontend/src/components/home/SelectedSystems.tsx` — heading → serif

## Accessibility / quality bar

- All interactive elements (nav links, CTAs, quote link) keep visible
  `focus-visible` rings consistent with the rest of the site.
- The SVG diagram is `aria-hidden`; the panel's text content (header, sub-line,
  LIVE tags, footer) conveys the meaning.
- Reduced-motion users get a fully static hero diagram.
- Layout verified at mobile / tablet / desktop; no horizontal overflow from the panel.
- `npm run lint` and `npm run type-check` pass.

## Verification

- `cd frontend && npm run lint && npm run type-check`
- `npm run build` succeeds (static export).
- Manual: load `/`, confirm hero two-column layout, panel diagram animates then
  is reused statically under `prefers-reduced-motion`, all five values render,
  quote strip links to the case study, nav dot under WORK, sections below render
  with serif headings, no console errors.
