# Homepage — AI Systems Architect Evolution

**Status:** Approved
**Date:** 2026-05-13
**Scope:** Evolve the existing `.home2` homepage from a "modern AI product portfolio" into an "AI Systems Architect / enterprise orchestration engineer" portfolio. Preserve the existing design system (Slack-style cream/plum, Plus Jakarta, lift/ghair primitives, animation language, layout, type scale, and section rhythm).

## Goal

Communicate, on the homepage, that the author can architect and deploy real-world AI-powered operational systems at enterprise scale. The page must feel technically mature, architecture-focused, operationally intelligent, enterprise-grade, calm, and premium. It must not feel flashy, cyberpunk, gimmicky, or startup-shouty.

## Non-goals

- No redesign of layout, grid, typography, colour, animations, or primitives.
- No restructuring of navigation or page order.
- No new "live" theatre (synthetic uptime, fake event counters, fake live status feeds).
- No unrelated refactoring outside the files touched.

## Page structure

Skeleton stays the same. Two material changes inside the structure: the `MetricsStrip` semantics shift from synthetic-live-ops to verifiable-deployment-signals, and `FeaturedWork` gains an anchor case band above the project grid.

```
HomeHero            ← refreshed copy + refreshed diagram
TrustedRow          ← reframed label + Power Platform added
MetricsStrip        ← replaced with verifiable deployment signals
Capabilities        ← copy retuned for orchestration / systems language
FeaturedWork
  ├─ AnchorCase     ← NEW: full-width Wheelchair Tracking band
  └─ ProjectGrid    ← remaining 3 in 3-up
CredibilityStrip    ← quote sharpened
FooterCTA           ← copy retuned
```

`app/page.tsx` does not change. All edits live inside existing `components/home/*` files plus one new `AnchorCase.tsx`.

---

## 1 · HomeHero + DiagramScene

**Files:** `frontend/src/components/home/HomeHero.tsx`, `frontend/src/components/home/DiagramScene.tsx`

### HomeHero copy changes

- Eyebrow: `Systems Engineer` → **`AI Systems Architect`**. Green live dot retained — it now reads as "deployed systems".
- Headline (preserves the `grad-plum-text` accent, line breaks, and animation timing):
  ```
  I architect AI-native systems
  that <span class="grad-plum-text">run in production.</span>
  ```
- Sub-headline:
  > I design and deploy enterprise AI orchestration — agents, workflows, event streams, and decision layers that coordinate real operational work across multi-site environments.
- Primary CTA: unchanged — `Explore my work` → `/work`.
- Secondary CTA: `View case studies` → **`Read the wheelchair tracking case`** linking to `/work/wheelchair-tracking`.

No structural/layout changes in `HomeHero.tsx` (grid, animations, gradient wash, button shapes all stay).

### DiagramScene node refresh

Preserve every geometric and animation property:
- 560×437 design space.
- `COL_X = 64`, `ROW_GAP = 165`, all derived row constants.
- Mirror symmetry across `x = W/2`.
- Six connector paths (`LINES`) with their current curve control points.
- Centre card position, label ("AI Orchestration Engine"), drift animation.
- Soft plum glow.
- `anim-float` per-node animation, delays, and duration jitter.

Change only:
1. The six node identities, icons, and colours (table below). Colours remain drawn from existing CSS variables so the connector palette stays in the same family.
2. Add a tiny mono caption per node.

| Position | Node | Lucide icon | Caption (`text-[9px] uppercase tracking-[0.16em] text-ink-muted font-semibold`) | Colour var |
|---|---|---|---|---|
| L-top (`COL_X`, `ROW_TOP`) | AI Agents | `Bot` | `AI AGENTS` | `var(--plum)` |
| L-mid (`COL_X`, `ROW_MID`) | Event Stream | `Radio` | `EVENT STREAM` | `var(--amber)` |
| L-bot (`COL_X`, `ROW_BOT`) | Decision Layer | `GitFork` | `DECISION LAYER` | `var(--green)` |
| R-top (`W - COL_X`, `ROW_TOP`) | Workflow Engine | `Workflow` | `WORKFLOW` | `var(--pink)` |
| R-mid (`W - COL_X`, `ROW_MID`) | Knowledge Base | `Library` | `KNOWLEDGE` | `var(--blue)` |
| R-bot (`W - COL_X`, `ROW_BOT`) | Ops Monitoring | `Activity` | `MONITORING` | `var(--plum)` |

Connector colours follow the originating node (so the lines retain their existing six-colour palette in the same positions).

#### Caption placement

Captions sit outboard of each icon so they never overlap the connector lines or the centre card:
- Left-column captions: positioned to the left of the icon, right-aligned, vertically centred on the icon.
- Right-column captions: positioned to the right of the icon, left-aligned, vertically centred.
- Implementation: each node wrapper currently centres a `SIZE × SIZE` floating card at `(cx, cy)`. Extend that wrapper to also render a caption `<span>` absolutely positioned at `top: 50%; transform: translateY(-50%)` with `left: SIZE + 8` (right column) or `right: SIZE + 8` (left column). The caption must not participate in the `anim-float` transform — the floating card and caption are separate children of the static wrapper so the caption stays still while the icon drifts.
- Width: captions are short (`AI AGENTS` is 9 chars) so no wrap handling needed; set `whiteSpace: 'nowrap'`.

#### Accessibility

- Icons keep `aria-hidden` semantics via their parent SVG/wrapper as today.
- Captions are real text — they should be readable by assistive tech and contribute to the diagram's meaning. No `aria-hidden` on captions.

---

## 2 · TrustedRow

**File:** `frontend/src/components/home/TrustedRow.tsx`

- Label: `Trusted to build with` → **`Built with`**.
- Stack list updated and reordered to lead with AI/orchestration, then app stack, then infra. Power Platform added — it is the strongest enterprise authenticity signal and is currently absent.

| Label | Lucide icon |
|---|---|
| Claude / OpenAI | `Sparkles` |
| LangChain | `Workflow` |
| Power Platform | `LayoutGrid` |
| Next.js | `Braces` |
| TypeScript | `Braces` |
| PostgreSQL | `Database` |
| AWS | `Cloud` |

No layout change. Same flex-wrap, same `opacity-70`, same typography.

> Note: `Next.js` and `TypeScript` both render `Braces` — that's intentional (treat both as language/runtime layer). If this looks repetitive in practice, the implementer may swap `Next.js` to `Code2` during implementation review — not a blocker.

---

## 3 · MetricsStrip

**File:** `frontend/src/components/home/MetricsStrip.tsx`

Visual shell (rounded white card, dividers, icon-on-bg-tile pattern, type scale, grid) stays exactly as today. Replace data and the right-side panel.

### Four metrics (replace METRICS array)

| Value | Label | Lucide icon | Tint var | Bg |
|---|---|---|---|---|
| `3` | Hospital sites deployed | `Building2` | `var(--plum)` | `var(--plum-soft)` |
| `800+` | Assets under management | `Boxes` | `var(--amber)` | `#fef3c7` |
| `10+` | Years healthcare operations | `HeartPulse` | `var(--green)` | `#d1fae5` |
| `50+` | Projects shipped | `Rocket` | `var(--blue)` | `#dbeafe` |

### Right-side panel (replace "All systems operational")

Replace the green-dot/operational-status/last-updated/view-live-status block with an availability statement that uses the same visual pattern (green dot + short heading + caption + CTA link):

```
● Currently available
Open to senior architecture and AI systems roles
→ Start a conversation       (links to /contact)
```

The green dot, font sizes, and link styling are kept. The lie of fact ("Last updated 2 min ago", "View live status") is removed.

---

## 4 · Capabilities

**File:** `frontend/src/components/home/Capabilities.tsx`

Section heading (`Systems that scale. Solutions that last.`), subhead, eyebrow, layout, grid, icon palette, lift/ghair styling, and card order are unchanged.

Replace the five `CARDS` entries with retuned copy. Icon assignments shift slightly so the iconography matches the architect framing:

| # | Title | Body | Icon | Tint | Bg |
|---|---|---|---|---|---|
| 1 | AI Orchestration | Design agent workflows, decision layers, and tool integrations that coordinate real work across enterprise systems. | `Brain` | `var(--plum)` | `var(--plum-soft)` |
| 2 | Systems Architecture | Architect resilient, observable systems — from event streams to data layers to integration boundaries. | `Boxes` | `var(--plum-deep)` | `#ede9fe` |
| 3 | Workflow Automation | Replace manual coordination with scalable workflow engines that span people, systems, and AI agents. | `Workflow` | `var(--amber)` | `#fef3c7` |
| 4 | Enterprise Integration | Connect operational data, legacy systems, and AI services into coherent, deployable platforms. | `Database` | `var(--green)` | `#d1fae5` |
| 5 | Operational Intelligence | Build monitoring, automation, and feedback loops that turn raw events into operational clarity. | `Activity` | `var(--pink)` | `#fce7f3` |

Net icon changes: card 3 `Code2` → `Workflow`; all other icons unchanged. Same tints, same backgrounds, same order.

---

## 5 · FeaturedWork + AnchorCase

**Files:** `frontend/src/components/home/FeaturedWork.tsx` (modified), `frontend/src/components/home/AnchorCase.tsx` (new)

### AnchorCase — new component

Full-width within the `max-w-[1180px]` container. Renders directly under the `FeaturedWork` section header and above the project grid.

Layout (two columns on `lg`, stacked on mobile, `60/40` split):

```
┌──────────────────────────────────────────────────┐
│ ANCHOR CASE · ENTERPRISE DEPLOYMENT              │
│ Multi-Site Wheelchair Tracking System            │
│ ─────────────────────────────────────────────────│
│ [ left: copy + bullets ]    │ [ right: arch      │
│                             │   preview + stats ]│
└──────────────────────────────────────────────────┘
```

#### Left column

- Eyebrow chip: `ANCHOR CASE · ENTERPRISE DEPLOYMENT` (same chip pattern as the hero eyebrow but in `text-plum`, no live dot).
- Title (h2): `Multi-Site Wheelchair Tracking System` — `font-display text-2xl sm:text-[1.9rem] font-extrabold`.
- One-liner:
  > Production asset-tracking platform deployed across multiple hospital sites — coordinating 800+ wheelchairs and clinical assets with QR-driven workflows, lifecycle visibility, and chain-of-custody tracking.
- Capability bullets (four `li`s with a small `Check` glyph in plum, `size={14}`):
  1. Multi-site deployment with role-based coordination
  2. QR-driven workflows for intake, dispatch, and return
  3. Lifecycle visibility from acquisition to retirement
  4. Real-time chain-of-custody across hospital units
- Stack tag (mono caption row): `Power Platform · Microsoft Lists · React · TypeScript · QR systems`.
- CTA button: `Read the case study →` linking to `/work/wheelchair-tracking`, styled identically to the hero primary plum button.

#### Right column

- Mini architecture preview: a small diagram component that mirrors the visual language of the hero `DiagramScene` (white rounded card with `ghair`, soft shadow, lucide icons) but renders a *linear* deployment topology specific to this system:

  ```
  [Sites] → [QR Scan] → [Workflow Engine] → [Lifecycle DB] → [Ops Dashboard]
  ```

  Five small icon tiles (`Building2`, `QrCode`, `Workflow`, `Database`, `Gauge`) connected by light arrow strokes. Re-uses the SVG-arrow approach already in `FeaturedWork.PreviewMock.states`.
- Beneath the diagram, a 2×2 grid of micro-stats (smaller than `MetricsStrip` cards, same visual register):

  | `3 sites` | `800+ assets` |
  | `Multi-site` | `Chain of custody` |

#### Component shape

```ts
// AnchorCase.tsx
export function AnchorCase() {
  return (
    <article className="lift overflow-hidden rounded-2xl bg-white ghair">
      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr]">
        {/* left column copy + bullets + CTA */}
        {/* right column mini-diagram + 2x2 micro-stats */}
      </div>
    </article>
  )
}
```

No new design tokens are introduced. All colours, shadows, and radii come from existing CSS vars and Tailwind classes.

### FeaturedWork modifications

- Inside the existing section, render `<AnchorCase />` directly under the eyebrow + "View all projects" row.
- Filter Wheelchair Tracking out of the `PROJECTS` array before mapping the grid (do this with a single `PROJECTS.filter(p => p.href !== '/work/wheelchair-tracking')` to avoid splitting the canonical list).
- Change the grid from `lg:grid-cols-4` to `lg:grid-cols-3` for the remaining three projects.
- Existing `WorkCard` component is unchanged.

> Decision: keep the canonical `PROJECTS` array exported as-is so `/work` and other consumers continue to see all four projects. Only the homepage filters one out for the grid.

---

## 6 · CredibilityStrip + FooterCTA

### CredibilityStrip (`frontend/src/components/home/CredibilityStrip.tsx`)

Quote replacement only. Stats array, layout, divider, and Quote glyph stay.

- Was: *"I thrive at the intersection of AI, systems, and product — building solutions that make a measurable difference."*
- Becomes: **"I design AI-native systems that run in the real world — across multi-site enterprise environments where operational intelligence is non-negotiable."**

### FooterCTA (`frontend/src/components/home/FooterCTA.tsx`)

Headline + CTA label only.

- Headline: `Let's build something extraordinary together.` → **`Let's architect your next system.`**
- Keep the `grad-plum-text` span; apply it to **`your next system`**.
- Body paragraph and CTA button label/styling unchanged.

---

## Implementation isolation

Each component remains self-contained. The new `AnchorCase` is a single file with no shared state and no new tokens. `DiagramScene` retains its current pure-presentational shape; the only API change is internal (the `NODES` array gains a `caption` field).

## Testing & verification

This is a presentational portfolio site with no automated test harness for home components. Verification is therefore:

1. `npm run type-check` passes.
2. `npm run lint` passes.
3. `npm run build` passes (static export must succeed).
4. Visual review at `npm run dev`:
   - Hero diagram: six labelled nodes, captions readable, no overlap with connectors or centre card, animations identical.
   - MetricsStrip: four new numbers, side panel reads as availability.
   - AnchorCase: lays out side-by-side on `lg`, stacks cleanly on mobile, mini-diagram renders correctly.
   - FeaturedWork grid: shows exactly three cards (EquiTrackr, SpendWise, Apex Protocol).
   - Capabilities: five cards with new copy, card 3 icon is `Workflow`.
   - TrustedRow: shows seven items including Power Platform.
5. Existing pages (`/about`, `/work`, `/work/wheelchair-tracking`, etc.) render unchanged — confirmed by spot-loading each route.

## Out of scope (deferred)

- Adding a real live-status indicator for any deployed system.
- New case-study page content for any project (Wheelchair Tracking case study page is referenced but not edited here).
- Changes to navigation, footer columns, or other pages.
- Any backend, content management, or data work.
