# Homepage Credibility Pass — Design Spec

**Date:** 2026-05-13
**Branch / scope:** single focused PR against `main`
**Predecessor:** `2026-05-12-homepage-slack-style-redesign-design.md` (this spec refines the same `home2` Slack/Linear/Stripe register; it does NOT change the visual language)

## Goal

Reposition the homepage from "AI Systems Architect" generic-marketing register to a credible **Applied AI Systems Builder** portfolio with deep healthcare-operations evidence. The single brief from the user:

> Reduce exaggerated claims and increase trust. Position the owner as an "Applied AI Systems Builder" with deep healthcare operations expertise and strong AI workflow engineering skills. Strengthen clarity, hierarchy, and enterprise credibility. Add more proof-driven content: architecture visuals, measurable impact, production indicators, real-world workflow screenshots. Make the hero tighter, more premium, recruiter-focused. Keep the aesthetic cinematic, modern, AI-native, enterprise-grade.

Confirmed during brainstorming:

- Hospital site count standardises on **4** (matches the case study; the homepage strips currently say 3 — that's a bug to fix).
- Wheelchair tracking is **live since Aug 2025**.
- Honest claims to keep: 4 hospital sites, 800+ assets, 10+ years healthcare operations, "live since Aug 2025".
- Claims to drop: "50+ projects shipped", "8+ industries served", "LangChain", "AWS".
- Logos in `/public/logos` (Claude, OpenAI, Gemini, Cursor, GitHub Copilot, Antigravity) are real and should be used.

The visual language stays the same: warm cream `#fbfaf8`, plum `#6d28d9`, Plus Jakarta display, hairline borders, soft shadows, light theme. All changes happen inside the `.home2` scope.

## Final page composition

```
1. HomeNav                       (unchanged)
2. HomeHero                      (rewritten — new copy + new right-side visual)
3. BuiltWithRow                  (NEW — replaces TrustedRow)
4. ProductionIndicators          (NEW — replaces MetricsStrip + CredibilityStrip)
5. Capabilities                  (rewritten copy + per-card evidence links)
6. AIWorkflowAlgorithm           (unchanged; gains an explicit `id="ai-workflow"`)
7. FeaturedWork                  (AnchorCase: real screenshot; grid reordered; 3 cards swap to real screenshots)
8. FooterCTA                     (rewritten copy)
9. SiteFooter                    (unchanged)
```

Deleted: `DiagramScene`, `TrustedRow`, `MetricsStrip`, `CredibilityStrip`.

## Section 1 — Hero (`HomeHero.tsx`)

### Copy

- **Eyebrow badge:** `Applied AI Systems Builder · Healthcare Operations`
- **Headline:** `I build AI systems that support healthcare operations.`
- **Sub-headline / lede:** `Multi-site workflows, event streams, and decision layers — designed to ship, observed in production.`
- **Status line** (small, beneath the CTAs, `text-ink-muted`, no pulsing dot): `Vancouver, Canada · Open to applied AI, AI systems, and operational intelligence roles · Currently shipping multi-site healthcare deployment`
- **Primary CTA:** `See the production system →` linking to `/work/wheelchair-tracking`
- **Secondary CTA:** `AI workflow methodology` anchoring to `#ai-workflow`

### Visual — new `SystemArchitectureSketch` component

Replaces the old `DiagramScene` six-spoke orchestration illustration. Lives at `src/components/home/SystemArchitectureSketch.tsx`. **Aesthetic discipline (locked):**

- Thin connector lines only — `strokeWidth={1.5}` max, `strokeOpacity` ~0.45
- No glow, no gradient fills, no cyberpunk effects
- Subtle motion only: one quiet pulse dot travelling the path (~6s, infinite, respects `prefers-reduced-motion: reduce`); cards do NOT float or bob
- Low-noise visual hierarchy: white card on cream wash, hairline borders, monochrome ink labels

A left-to-right architecture flow of **five labeled nodes**, drawn in the same 560×N coordinate-space pattern as the existing diagram (so it slots into the existing hero grid):

```
QR scan / Mobile  →  Event stream  →  State engine  →  Decision layer  →  Operations surface
   (clinical end)      (audit log)     (asset lifecycle)  (routing rules)    (dashboard, alerts)
```

Each node is a small white card (rounded-2xl, ghair, soft-shadow-sm) with:
- Lucide icon (~22px) in a single color per node (use existing CSS vars: `--plum`, `--amber`, `--blue`, `--green`, `--pink`, repeating after five if needed)
- Node title in `font-display text-[13px] font-semibold`
- Tiny secondary line in `text-[10px] uppercase tracking-[0.12em] text-ink-muted`

Each node's tiny secondary line:

| Node | Secondary line |
|---|---|
| QR scan / Mobile | `Clinical end` |
| Event stream | `Audit log` |
| State engine | `Asset lifecycle` |
| Decision layer | `Routing rules` |
| Operations surface | `Dashboard · alerts` |

Connector annotations (rendered as small ink-muted labels above each arrow): `event`, `state transition`, `rule decision`, `signal`. Same `flow-line` class as the algorithm diagram for stroke styling consistency.

Caption beneath the diagram (centered, `text-[11px] uppercase tracking-[0.16em] text-ink-muted`):

> Wheelchair Tracking — live across 4 sites · 800+ assets

A single soft animated dot (3px radius, plum) travels the forward path with `animation: home2-dot-travel 6s linear infinite`. The keyframe is **new** — define it in the `.home2` block at the bottom of `globals.css` as a simple `offset-path` traversal (or, if `offset-path` proves fiddly across browsers, fall back to keyframed `transform: translateX(...)` along the connector midline). One direction only, no bounce. Disabled under `@media (prefers-reduced-motion: reduce)` by setting `animation: none`.

### Stack chip line (replaces the long stack pill)

Renders below the architecture sketch caption:

> `Microsoft Lists + QR workflows · React · TypeScript`

Plain text, `text-[11px] uppercase tracking-[0.14em] text-ink-muted`. The "Microsoft Lists + QR workflows" phrasing replaces the previous "Power Platform / Lists" because it reads as more operationally specific.

## Section 2 — BuiltWithRow (new, replaces `TrustedRow`)

File: `src/components/home/BuiltWithRow.tsx`. Drop-in replacement for `TrustedRow`.

Two labeled groups, hairline divider between them on `lg+`, stacked on `sm`. Logos are inline `<Image>` references to existing files in `/public/logos/*.svg`, rendered at **20px**, with a `filter: grayscale(1) opacity(0.75)` treatment so colored brand logos sit on the warm-cream surface without competing.

### Group A — `AI tools`

```
Claude · OpenAI · Gemini · Cursor · GitHub Copilot · Antigravity
```

Files used: `claude.svg`, `openai.svg`, `gemini.svg`, `cursor.svg`, `github-copilot.svg`, `antigravity.svg`. Each renders as `<Image>` followed by `<span>` label, gap-2.

### Group B — `Stack`

```
Next.js · TypeScript · PostgreSQL · Microsoft Lists · QR workflows
```

These do not have SVG files in `/public/logos`. Render as **text-only** with `text-[15px] font-medium text-ink-soft` — same styling as today's TrustedRow. **Do not invent logos.**

### Drops vs current `TrustedRow`

- `LangChain` removed
- `AWS` removed
- `Power Platform` collapsed into `Microsoft Lists + QR workflows` framing
- `Claude / OpenAI` split into separate Claude and OpenAI logos

## Section 3 — ProductionIndicators (new, replaces `MetricsStrip` + `CredibilityStrip`)

File: `src/components/home/ProductionIndicators.tsx`. Same visual chassis as today's `MetricsStrip` (white rounded-3xl card, hairline border, soft shadow, ~1180px max width, p-7).

Four metric tiles in the main row + a small availability sub-block on the right (`lg+`) or below (`sm`).

| Value | Label | Icon | Tint |
|---|---|---|---|
| `4` | `Hospital sites · live deployment` | `Building2` | `var(--plum)` |
| `800+` | `Assets under one shared state model` | `Boxes` | `var(--amber)` |
| `10+` | `Years in healthcare operations` | `HeartPulse` | `var(--green)` |
| `Aug 2025` | `Wheelchair tracking — in production since` | `Rocket` | `var(--blue)` |

The fourth tile uses the **date** as the value, not a duration count — durable, doesn't decay, more specific.

Availability sub-block:

> **Currently available**
> Vancouver, Canada · Open to applied AI, AI systems, and operational intelligence roles
> `Start a conversation →` (links to `/contact`)

No green pulsing dot — calmer reads as more senior. A small static `h-2 w-2 rounded-full bg-[var(--green)]` is acceptable next to "Currently available" but no animation.

**Deletions:** `CredibilityStrip.tsx` is deleted entirely. Its function (third stat row + quote) is fully absorbed here. The "10+ Years in Tech / 50+ Projects Shipped / 8+ Industries Served" stats are dropped.

## Section 4 — Capabilities ("What I actually build")

File: `src/components/home/Capabilities.tsx` — rewritten copy, same visual structure (5-card grid, lift-on-hover, colored icon tiles).

### Heading

Replace `Systems that scale. Solutions that last.` with:

> **What I actually build.**
> Five capability areas — each one linked to a real system you can read end-to-end.

The `View all capabilities` link in the corner becomes `View all projects →` pointing to `/work`.

### Card data

```ts
const CARDS = [
  {
    title: 'Multi-site operational systems',
    body: 'QR workflows, event streams, and shared state across distributed sites — designed to keep four hospitals on one operational truth.',
    Icon: Boxes,
    tint: 'var(--plum)',
    bg: 'var(--plum-soft)',
    href: '/work/wheelchair-tracking',
  },
  {
    title: 'AI workflow engineering',
    body: 'Calibrated inference, ensemble forecasting, and decision-gated pipelines — agents do the heavy work inside specified, observable gates.',
    Icon: Brain,
    tint: 'var(--plum-deep)',
    bg: '#ede9fe',
    href: '/work/clinical-risk-engine',
  },
  {
    title: 'Operational intelligence layers',
    body: 'Forecasting and explainable feature attribution on top of operational data — built for planners, not notebooks.',
    Icon: Activity,
    tint: 'var(--amber)',
    bg: '#fef3c7',
    href: '/work/population-health-intelligence',
  },
  {
    title: 'Equipment & asset workflows',
    body: 'Lifecycle state models, scan-driven transitions, and chain-of-custody — operational software clinicians actually use.',
    Icon: Workflow,
    tint: 'var(--green)',
    bg: '#d1fae5',
    href: '/work/equitrackr',
  },
  {
    title: 'Production engineering discipline',
    body: 'Specs before code, tests before commits, every diff reviewed — the algorithm, not the vibe.',
    Icon: Database,
    tint: 'var(--pink)',
    bg: '#fce7f3',
    href: '#ai-workflow',
  },
]
```

Each card body ends with a new explicit link `See the system →` (small, plum, `text-[12px] font-semibold`) at the bottom of the card, replacing the standalone arrow icon — so the evidence-link contract from the section heading is visibly delivered per card.

## Section 5 — AIWorkflowAlgorithm

**No code changes** to `AIWorkflowAlgorithm.tsx` except adding `id="ai-workflow"` to the wrapping `<section>` so the hero secondary CTA and the Capabilities card "Production engineering discipline" can anchor to it. The existing `aria-labelledby="ai-workflow-heading"` stays.

## Section 6 — FeaturedWork

File: `src/components/home/FeaturedWork.tsx` + `src/components/home/AnchorCase.tsx`.

### AnchorCase changes

The right-column "Deployment flow" mini-diagram is **replaced** with a real screenshot in window chrome. Micro-stats grid below stays.

The existing `Window` component is **currently private to** `FeaturedWork.tsx` (not exported). Lift it to a shared module — `src/components/home/Window.tsx` — and import it in both `AnchorCase.tsx` and `FeaturedWork.tsx`. No behavioural change to `Window`, just a relocation + named export.

```tsx
// new structure inside the right column
<div className="rounded-2xl bg-white p-3 ghair soft-shadow-sm">
  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-muted">
    Operations dashboard — live across 4 sites
  </p>
  <Window>  {/* same three-dot chrome as the existing PreviewMock */}
    <Image
      src="/images/Wheelchair_tracking.png"
      alt="Wheelchair tracking operations dashboard screenshot"
      width={520}
      height={300}
      className="rounded-md object-cover object-top"
      unoptimized
    />
  </Window>
</div>
<div className="grid grid-cols-2 gap-3">{/* unchanged micro-stats */}</div>
```

The micro-stats `STATS` array is corrected: the first tile `value: '3 sites'` becomes **`'4 sites'`**.

### FeaturedWork grid changes

1. **Reorder** the grid (anchor stays separate at top):

   1. Population-Health Intelligence
   2. Clinical Risk Engine
   3. EquiTrackr
   4. SpendWise
   5. Apex Protocol

   Implemented by reordering the `PROJECTS` array in `FeaturedWork.tsx`.

2. **Real screenshots** swap into the `PreviewMock` slot for two cards. Extend the `Project` type with an optional `screenshot?: { src: string; alt: string }` and update `PreviewMock` / `WorkCard` so that when a `screenshot` is present, a `<Window>` containing a `<Image>` renders in place of the `variant` mock.

   - Population-Health Intelligence → `{ src: '/images/Life_Expectancy.png', alt: 'Life expectancy forecasting dashboard' }`
   - Clinical Risk Engine → `{ src: '/images/Heart_Prediction.png', alt: 'Clinical risk prediction interface' }`

3. **Site count fix.** The `body` string for the wheelchair-tracking project in the `PROJECTS` array still says "four hospital sites" — keep. The `metric` value `'4 sites · 800+'` stays. These are already correct; the bug was on the homepage strips, not here.

4. **Sketch cards left untouched.** EquiTrackr, SpendWise, Apex Protocol retain their existing geometric `PreviewMock` variants. No real screenshot exists for them; fabricating one would defeat the entire credibility-pass goal.

### Image handling

- `unoptimized` set on every `Image` (matches `next.config.js → images.unoptimized: true` for static export).
- Real screenshots constrained to 160px container height with `object-cover object-top` so the most useful crop reads as the thumbnail.
- The existing `wash` gradient background per-card stays — real screenshot sits on top of it inside the window chrome, same as the sketches do today.

## Section 7 — FooterCTA

File: `src/components/home/FooterCTA.tsx`. Visuals unchanged (purple gradient banner, three-column grid, social pills). Copy rewrite only.

Replace:

> Let's architect your next system.
>
> I'm open to exciting opportunities and collaborations. Let's connect!

With:

> **Let's architect your next system.**
>
> I'm currently shipping a multi-site healthcare deployment and have capacity for one more applied-AI engagement. The best way in is a 20-minute conversation about the system you're trying to build.

The button label stays `Start a conversation →`.

## Cross-cutting concerns

### Site-count consistency sweep

Single source-of-truth: **4 hospital sites**. Files to touch:

- `src/components/home/MetricsStrip.tsx` — superseded by `ProductionIndicators` (value `3` → `4` is folded into the rewrite)
- `src/components/home/AnchorCase.tsx` — `'3 sites'` → `'4 sites'`

All other "four hospital sites" / "four hospitals" references in the wheelchair case study and `/work` detail page are already correct and stay as-is.

### Accessibility

- `SystemArchitectureSketch`: `role="img"` + `aria-label="System architecture — QR scan to event stream to state engine to decision layer to operations surface, live across 4 hospital sites"`; the connector annotations and node labels are real DOM text (not SVG-only) so they remain crawlable; the animated dot has `aria-hidden`.
- Motion: every animation (the architecture dot, any reveal animation) respects `prefers-reduced-motion: reduce`.
- All real screenshots use descriptive `alt` text per the table above.
- Existing screen-reader linearization in `AIWorkflowAlgorithm` stays.

### Performance

- Static export semantics unchanged.
- Real screenshots are PNGs ranging from a few hundred KB; loaded with `unoptimized` (the static-export constraint). Acceptable given homepage already ships heavy diagrams.
- No new fonts, no new external dependencies.

### Out of scope (explicitly)

- Restructuring page IA beyond the documented section moves.
- Touching `/work/*` detail pages.
- Touching `/about`, blog, `/contact` form wiring.
- Dark-mode work.
- Replacing the algorithm diagram.

## File-change manifest

**New:**

- `src/components/home/SystemArchitectureSketch.tsx`
- `src/components/home/BuiltWithRow.tsx`
- `src/components/home/ProductionIndicators.tsx`
- `src/components/home/Window.tsx` (lifted from `FeaturedWork.tsx`, shared by `AnchorCase` + `FeaturedWork`)

**Modified:**

- `src/app/page.tsx` — swap imports + composition
- `src/app/globals.css` — define `home2-dot-travel` keyframe inside the `.home2` block
- `src/components/home/HomeHero.tsx` — copy + replace `<DiagramScene />` with `<SystemArchitectureSketch />`
- `src/components/home/AnchorCase.tsx` — `'3 sites'` → `'4 sites'`; replace deployment-flow block with screenshot; import `Window` from new shared module
- `src/components/home/FeaturedWork.tsx` — reorder `PROJECTS`, extend `Project` type with `screenshot?`, render `<Window><Image/></Window>` when screenshot present, import `Window` from new shared module (remove local definition)
- `src/components/home/Capabilities.tsx` — heading + card data rewrite, add per-card "See the system →" link
- `src/components/home/AIWorkflowAlgorithm.tsx` — add `id="ai-workflow"` to the section
- `src/components/home/FooterCTA.tsx` — copy only

**Deleted:**

- `src/components/home/DiagramScene.tsx`
- `src/components/home/TrustedRow.tsx`
- `src/components/home/MetricsStrip.tsx`
- `src/components/home/CredibilityStrip.tsx`

## Success criteria

- All eight homepage sections render as specified, with the new copy and the new architecture sketch.
- A reviewer reading the page top-to-bottom can identify at least four pieces of falsifiable evidence: 4 sites, 800+ assets, live since Aug 2025, the architecture sketch's named subsystems.
- No page-load regression beyond the cost of three additional PNG screenshots.
- `npm run type-check` and `npm run lint` pass.
- No remaining homepage reference to "50+ projects", "8+ industries", "LangChain", "AWS", or "3 sites".
- The `.home2` visual register is unchanged (same cream, plum, Plus Jakarta, hairline borders).

## Open follow-ups (post-implementation, not in this spec)

- Consider screenshots for EquiTrackr / SpendWise / Apex Protocol once those products have shippable UI to capture.
- Consider adding a Figma-style "architecture gallery" page if the architecture sketch in the hero proves to be the strongest credibility lever — defer until measured.
