# Homepage redesign — warm light, bold sans ("Direction B")

Date: 2026-05-12
Branch: `phase-1-repositioning`
Status: approved (design); pending implementation plan

## Context

The homepage was just rebuilt as a dark "cathedral" layout (near-black `surface-canvas`,
mono micro-labels, bronze gold, serif display, an animated "Operational Systems Map"
node-diagram in the hero — see `2026-05-12-homepage-diagram-first-hero-design.md`).
The user finds it intimidating and wants the homepage to feel **welcoming, bold, and
confident**, and to share the About page's typography.

This spec **supersedes the visual direction** of the diagram-first redesign. It keeps
the same section *content* (hero copy, the five capability statements, the featured
case study, capability taxonomy, live-systems summary, selected systems, the "how I
build" essay, contact) but re-themes the whole homepage — and the About page's hero
and CTA — into the site's existing **"paper" register**: a warm cream background, dark
ink text, bold sans typography, and the darker gold accent.

## Goal

Re-theme the homepage (and the `/about` hero + "Let's Connect" CTA) to a warm-light,
bold-sans look. Remove the dark node-diagram from the hero in favor of a clean,
centered, confident hero with a credibility-stats row. Keep all existing section
content; restyle each section into the paper register.

## Non-goals

- Brightening the dark-register `--accent-gold` token.
- Reworking the deeper About sub-sections (`AboutMeHeroFixed`, `JourneyTimeline`,
  `CoreValues`, `SkillsExpertise`, `AboutCTA`) — out of scope this pass; they will look
  inconsistent until a later pass (accepted).
- A mobile nav drawer (current inline links kept).
- Real telemetry — the "metrics shown are illustrative" disclaimer stays.
- Blog and case-study pages.

## Foundations — tokens & typography

### Colors (`frontend/src/app/globals.css`, `frontend/tailwind.config.js`)
Existing paper tokens are reused:
- `--paper-bg: 39 44% 92%` (#f4eee3) — page background
- `--paper-ink: 30 14% 15%` (#2a2520) — primary text
- `--paper-ink-soft: 36 22% 24%` (#4a3f2f) — secondary text
- `--accent-gold-ink: 33 42% 34%` (#7a5a32) — the single accent (reads on light)
- `--signal-live: 145 59% 64%` (#6cd99a) — the "live" dot, used sparingly

Add two new tokens (define under `:root` next to the paper tokens, expose in Tailwind):
- `--paper-card: 39 44% 96%` (~#fbf7ef) — raised card surface, a touch lighter than bg
- `--paper-border: 30 14% 15%` at low alpha — use as `border-paper-border`
  (implement as a `borderColor` entry `'paper-border': 'rgba(42,37,32,0.12)'`, mirroring
  the existing `'paper-subtle': 'rgba(0,0,0,0.08)'` — actually **reuse `paper-subtle`**
  for hairlines and add `'paper-border': 'rgba(42,37,32,0.16)'` only if a stronger line
  is needed). Tailwind color additions: `paper.card`.

The dark-register tokens (`surface-*`) remain in the file — other pages still use them.

### Typography
- The homepage uses **`font-sans` (Geist Sans)** throughout. Headlines are
  `font-bold` with tight tracking (`tracking-tight-display` ≈ -0.02em), large
  (hero h1 ≈ `text-5xl md:text-6xl`, section h2 ≈ `text-3xl md:text-4xl`).
- Exactly one emphasized word per headline, in gold (`text-gold-ink`) — not italic,
  not serif.
- Body copy: `font-sans`, `text-paper-ink-soft`, relaxed leading.
- Section eyebrows: small **bold uppercase sans** in gold (`text-gold-ink`,
  `tracking-wide-label`), e.g. `text-[11px] font-bold uppercase tracking-wide-label`.
  This replaces the mono micro-label as the dominant device. Mono (`font-mono`) is
  used only for tiny meta strings (a location line, social labels, the illustrative-
  metrics disclaimer) — sparingly.
- No serif on the homepage.

Note for Tailwind: `text-gold-ink` requires a `gold.ink` color entry — it already
exists (`gold: { DEFAULT: var(--accent-gold), ink: var(--accent-gold-ink) }`).

## Layout — section lineup (`frontend/src/app/page.tsx`)

```
NavBar  (active="work")
HomeHero            ← full rewrite: single-column centered hero + stats row
ValuesRow           ← restyled to paper
QuoteBar            ← restyled to paper
FlagshipFeature     ← restyled to paper (warm card, not dark gradient)
CapabilityIndex     ← restyled to paper
LiveStatusPanel     ← restyled to paper (clean light status card)
SelectedSystems     ← restyled to paper
EssayStrip          ← kept (already paper register); type aligned to new scale
ContactStrip        ← restyled to paper
```

`<main>` changes from `bg-surface-canvas text-surface-fg` to `bg-paper-bg text-paper-ink`.

The hero component is renamed `HomeHero` (file `frontend/src/components/home/HomeHero.tsx`),
replacing `HeroSystemsMap.tsx`. `OperationalSystemsMap.tsx` and `SystemsMap.tsx` are
**deleted** (no other consumers). The `useInViewPause` / `usePrefersReducedMotion` hooks
stay in the repo (used elsewhere / still useful for section reveals).

## Components

### 1. NavBar (`NavBar.tsx`, `primitives/BrandWordmark.tsx`)
- Wordmark `LD` in **bold sans** (`font-sans text-2xl font-bold`), dark ink, gold on hover.
- Links WORK / ABOUT / THOUGHTS / CONTACT in **bold sans** (`font-sans text-sm font-bold`
  or `font-semibold`, `uppercase tracking-wide-label` optional — keep them readable),
  `text-paper-ink-soft`, hover → `text-paper-ink`. Active item → `text-gold-ink` with the
  small gold dot centered beneath. Routes unchanged: WORK→`#systems`, ABOUT→`/about`,
  THOUGHTS→`/blog`, CONTACT→`#contact`.
- Transparent at top; on scroll (>24px) → `bg-paper-bg/80 backdrop-blur-md border-b border-paper-subtle`.
- Keep `active` prop typed `'work' | 'about' | 'thoughts' | 'contact' | undefined`.
- Focus rings on links: `focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-ink focus-visible:outline-offset-2`.

### 2. CtaButton (`primitives/CtaButton.tsx`)
Rework for the light register. Two variants:
- `filled`: `bg-paper-ink text-paper-bg hover:bg-paper-ink/90`
- `outline`: `border border-paper-ink/25 text-paper-ink hover:border-gold-ink/60 hover:text-gold-ink`
Rounded-`md` or `lg`, sentence-case label (not uppercase mono), trailing `ArrowRight`
that nudges on hover. Renders a Next `Link`. Same focus-ring convention (gold-ink outline).

### 3. StatItem (`primitives/StatItem.tsx`, new)
A small presentational unit for the hero credibility row: a large gold value
(`text-2xl md:text-3xl font-bold text-gold-ink`) over a small ink-soft label
(`text-xs text-paper-ink-soft uppercase tracking-wide-label`). Props: `value`, `label`.

### 4. SectionEyebrow (`primitives/SectionEyebrow.tsx`, new) — optional convenience
Renders `<p class="text-[11px] font-bold uppercase tracking-wide-label text-gold-ink">`.
Only add if it earns its keep (≥3 uses — it does: hero + ValuesRow + several sections).

### 5. HomeHero (`HomeHero.tsx`, new — replaces `HeroSystemsMap.tsx`)
Single column, centered, `max-w-3xl` content within `max-w-6xl px-6`, generous vertical
padding (`pt-32 pb-20` or similar; not forced to viewport height):
- Eyebrow (gold, bold uppercase): "Applied AI Engineer · Healthcare Systems Builder"
- H1, bold sans, `text-5xl md:text-6xl`, tight tracking: "I build healthcare systems
  that **work**." — "work" in `text-gold-ink`.
- Intro `<p>`, `text-lg text-paper-ink-soft`, ~`max-w-[52ch]`, centered: "I design and
  ship AI-native workflows that connect people, systems, and data — turning frontline
  complexity into operational clarity."
- CTA row (centered): `CtaButton filled` "View case study" → `/work/wheelchair-tracking`;
  `CtaButton outline` "Explore the work" → `#systems`.
- Stats row: three `StatItem`s, centered, with thin `divide-x divide-paper-subtle` on
  `sm+`: `10+` / `Years in healthcare`; `MSc` / `Data Analytics`; `AWS` / `AI Practitioner`.
- Optional: a faint warm radial/gradient flourish behind the headline (very subtle,
  paper-toned) — keep restrained.

### 6. ValuesRow (`ValuesRow.tsx`)
Keep the five verbatim statements and icons (Network / Workflow / Database / Cpu / Users).
Restyle: section on `bg-paper-bg border-t border-paper-subtle`; five responsive columns
(`grid-cols-1 sm:2 lg:3 xl:5`, `xl:divide-x xl:divide-paper-subtle`); each column: gold
icon in a light `IconBadge` (see §10), bold-sans title (`font-bold uppercase tracking-wide-label text-paper-ink`
or sentence-case bold — pick one), statement in `text-paper-ink-soft`.

### 7. QuoteBar (`QuoteBar.tsx`)
Keep the verbatim quote and the "View featured case study" link → `/work/wheelchair-tracking`.
Restyle: a `bg-paper-card border border-paper-subtle rounded-2xl` strip on `bg-paper-bg`;
oversized gold quote glyph; quote text in `text-paper-ink`; link in `text-gold-ink`,
bold sans (not mono), trailing arrow. Stacks on mobile.

### 8. FlagshipFeature (`FlagshipFeature.tsx`)
Keep content (wheelchair-tracking, the copy, the meta chips, the link to
`/work/wheelchair-tracking`). Restyle: remove the dark gradient; the card becomes
`bg-paper-card border border-paper-subtle rounded-2xl` (hover → `border-gold-ink/40`);
"featured" pill → light bordered pill with gold text; eyebrow → gold bold uppercase;
H3 → bold sans `text-3xl md:text-5xl text-paper-ink`; body → `text-paper-ink-soft`;
meta chips → small ink-soft text (mono ok, small).

### 9. CapabilityIndex (`CapabilityIndex.tsx`)
Keep the "patterns I build across domains" content and the four capability cards.
Restyle to paper: section eyebrow gold bold uppercase; H2 bold sans `text-paper-ink`;
cards `bg-paper-card border border-paper-subtle`; the `01`–`04` index labels in gold-ink
(can stay mono, small); titles bold sans `text-paper-ink`; counts `text-paper-ink-soft`.

### 10. LiveStatusPanel (`LiveStatusPanel.tsx`)
Keep content (the headline about it being live, the four hospitals, the equipment count,
30-day uptime, **and the "metrics shown are illustrative · phase 2 wires real telemetry"
disclaimer**). Restyle: H2 bold sans `text-paper-ink`; supporting `<p>` `text-paper-ink-soft`;
the status card → `bg-paper-card border border-paper-subtle rounded-xl`, hairlines
`divide-paper-subtle`; the big number in bold sans `text-paper-ink` (not mono); keep the
`LiveDot` green; "v3.x · illustrative" and "uptime · 30d" labels small ink-soft (mono ok);
uptime value `text-gold-ink`.

### 11. SelectedSystems (`SelectedSystems.tsx`)
Keep the four entries and their routes. Restyle: section eyebrow gold bold uppercase;
list rows on `bg-paper-bg` with `divide-y divide-paper-subtle border-y border-paper-subtle`,
hover → `bg-paper-card`; the `02`–`05` index in gold-ink; titles bold sans `text-paper-ink`;
the capability tag small ink-soft (mono ok); descriptions `text-paper-ink-soft`; the arrow
`text-paper-ink-soft` → `text-paper-ink` on hover.

### 12. EssayStrip (`EssayStrip.tsx`)
Already the paper register — keep. Adjust only: the lead-in label currently `font-mono ...
text-paper-ink-soft` → can become bold uppercase sans gold (`text-gold-ink`) to match the
new eyebrow style; the serif body **stays** (this strip is intentionally editorial — it's
the one place serif is allowed; it predates this spec and reads well). The "read more"
link → `text-gold-ink` bold sans + arrow (currently mono — light restyle, optional).
If you'd rather keep EssayStrip 100% untouched, that's acceptable too — it already fits.

### 13. ContactStrip (`ContactStrip.tsx`)
Restyle to paper: section on `bg-paper-bg border-t border-paper-subtle`; the email link
`text-paper-ink` → `text-gold-ink` on hover, bold sans; social labels small `text-paper-ink-soft`
(mono ok), hover → `text-paper-ink`; "vancouver, bc" small ink-soft.

### 14. Primitives cleanup
- `IconBadge.tsx` — recolor for light: `border-gold-ink/30 bg-gold-ink/5 text-gold-ink`.
- `AccentPill.tsx` — recolor for light if still used: `border-paper-subtle bg-paper-card/60
  text-paper-ink-soft`. (If unused after the rewrite, delete it.)
- `MonoLabel.tsx` — keep, but on light it should default to `text-paper-ink-soft` (or
  callers pass the color). Decide: change its default to a neutral that works on light,
  since it's now only used on paper pages from the homepage. (Other dark pages that import
  it pass their own classes or live in dark sections — verify; if any rely on the dark
  default, leave the default and have homepage callers pass `text-paper-ink-soft`.)
- `LiveDot.tsx` — unchanged (green works on both).
- Delete `OperationalSystemsMap.tsx` and `SystemsMap.tsx`.
- Update `primitives/index.ts` exports (add `CtaButton` already present; add `StatItem`,
  `SectionEyebrow` if created; remove `AccentPill` if deleted).

## About page alignment (`frontend/src/app/about/page.tsx`)

- `<main>`: `bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900` → `bg-paper-bg text-paper-ink`.
- "Back to Home" button: `bg-white/10 backdrop-blur ... text-white border-white/20` →
  light treatment (`border border-paper-ink/20 text-paper-ink hover:border-gold-ink/50` or
  reuse `CtaButton outline` with an `ArrowLeft`). Keep it fixed top-left.
- Hero `<section>`: drop the gradient; same `bg-paper-bg`.
- Badge "About Lloyd Dela Cruz": glass pill → simple `border border-paper-subtle bg-paper-card
  text-paper-ink-soft text-xs uppercase tracking-wide-label` pill (or gold bold uppercase eyebrow,
  no pill — pick one consistent with the homepage eyebrow style).
- H1: keep the copy ("Bridging Healthcare Excellence with Data-Driven Innovation"); style
  bold sans `text-paper-ink`; the highlighted phrase "Data-Driven Innovation" → `text-gold-ink`
  (replacing the `from-cyan-300 to-blue-300` gradient-text).
- Location line: `text-blue-200` → `text-paper-ink-soft`; keep the `MapPin` icon (gold-ink).
- Lede paragraphs: `text-blue-100` / `text-blue-200` → `text-paper-ink-soft`.
- Stats: numbers `text-cyan-300` → `text-gold-ink`; labels `text-blue-300` → `text-paper-ink-soft`.
- "Let's Connect" `<section>`: `bg-gradient-to-r from-blue-900 to-purple-900` → `bg-paper-bg`
  (with a `border-t border-paper-subtle` to separate it); H2 bold sans `text-paper-ink`;
  the `text-white/80` paragraph → `text-paper-ink-soft`; the "Get In Touch" button
  (`bg-white text-gray-900`) → `CtaButton filled` ("Get in touch" → `/contact`).
- `AboutSection` and its children (`AboutMeHeroFixed`, `JourneyTimeline`, `CoreValues`,
  `SkillsExpertise`, `AboutCTA`) — **not touched** in this pass.
- Keep the existing Framer Motion entrance animations; just swap the color classes.

## Motion

- Section reveals: gentle `whileInView` fade + small upward slide (≤16px), `once: true`,
  matching the codebase's existing pattern. Guard with `usePrefersReducedMotion` (or rely
  on the existing motion components which already respect it) — reduced-motion → no transform/opacity animation.
- No node-graph / ticking-clock / pulse animations on the homepage anymore.

## Accessibility / quality bar

- All interactive elements (nav links, CTAs, quote link, selected-systems rows, contact
  links, About back-button) keep visible `focus-visible` outlines in `gold-ink`.
- Color contrast on cream: `paper-ink` on `paper-bg` and `gold-ink` on `paper-bg` are both
  well above AA for text; verify `gold-ink` (#7a5a32) on `paper-bg` (#f4eee3) for the
  smaller eyebrow text (it's ~5.3:1 — fine). `paper-ink-soft` on `paper-bg` also passes.
- No layout overflow at mobile / tablet / desktop.
- `npm run lint` and `npm run type-check` pass; `npm run build` (static export) succeeds.

## Files

**New**
- `frontend/src/components/home/HomeHero.tsx`
- `frontend/src/components/home/primitives/StatItem.tsx`
- `frontend/src/components/home/primitives/SectionEyebrow.tsx` (optional)

**Modified**
- `frontend/src/app/globals.css` — add `--paper-card` (and a `paper-border` borderColor if needed)
- `frontend/tailwind.config.js` — expose `paper.card`; add `borderColor['paper-border']` if used
- `frontend/src/app/page.tsx` — new lineup, `<main>` paper bg, import `HomeHero`
- `frontend/src/components/home/NavBar.tsx` — bold sans, paper colors
- `frontend/src/components/home/primitives/BrandWordmark.tsx` — `LD` bold sans
- `frontend/src/components/home/primitives/CtaButton.tsx` — light-register variants
- `frontend/src/components/home/primitives/IconBadge.tsx` — light recolor
- `frontend/src/components/home/primitives/AccentPill.tsx` — light recolor or delete
- `frontend/src/components/home/primitives/MonoLabel.tsx` — light-safe default (see §14)
- `frontend/src/components/home/primitives/index.ts` — export updates
- `frontend/src/components/home/ValuesRow.tsx` — paper restyle
- `frontend/src/components/home/QuoteBar.tsx` — paper restyle
- `frontend/src/components/home/FlagshipFeature.tsx` — paper restyle (warm card)
- `frontend/src/components/home/CapabilityIndex.tsx` — paper restyle
- `frontend/src/components/home/LiveStatusPanel.tsx` — paper restyle (light status card)
- `frontend/src/components/home/SelectedSystems.tsx` — paper restyle
- `frontend/src/components/home/EssayStrip.tsx` — light label/link touch-up (serif body kept)
- `frontend/src/components/home/ContactStrip.tsx` — paper restyle
- `frontend/src/app/about/page.tsx` — hero + CTA paper restyle

**Deleted**
- `frontend/src/components/home/HeroSystemsMap.tsx`
- `frontend/src/components/home/OperationalSystemsMap.tsx`
- `frontend/src/components/home/SystemsMap.tsx`

## Verification

- `cd frontend && npm run lint && npm run type-check`
- `npm run build` succeeds (do not run `npm run dev` concurrently — it corrupts `.next`).
- Manual: `/` is warm cream top to bottom, single-column hero with stats row, no
  node-diagram, bold-sans headlines with a single gold word, all sections restyled and
  legible; `/about` hero + "Let's Connect" are the same cream/ink/gold (deeper About
  sections intentionally unchanged); nav dot under WORK; focus rings visible; no console
  errors; mobile/tablet/desktop have no overflow.
