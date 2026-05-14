# Home Hero Redesign — Strip the Decoration, Anchor the Proof

**Date:** 2026-05-13
**Status:** Approved (direction)
**Scope:** `frontend/src/components/home/HomeHero.tsx` + `frontend/src/components/home/SystemArchitectureSketch.tsx` (left text alignment + right-side diagram)
**Out of scope:** other sections, CTA destinations, page structure, Slack-style register tokens.

## Context

The homepage uses the Slack-style register (warm cream / plum / Plus Jakarta, scoped under `.home2`). The current hero pairs a left text column with a right-side pentagon node diagram. The diagram reads as AI-generated, and the left column has small text-alignment problems. This spec redoes both while keeping the node-diagram concept.

## Problems being fixed

### Right-side illustration (`SystemArchitectureSketch.tsx`)
1. Perfectly regular pentagon — geometry without meaning.
2. Five rainbow-colored icons (plum / amber / blue / green / pink) — color carries no semantic load.
3. Five decorative edge labels (`event`, `state transition`, `rule decision`, `signal`, `feedback`) — filler.
4. Four simultaneous animations (`anim-heartbeat`, `anim-ack`, `anim-sonar`, `anim-seg-wash`) — fight for attention.
5. The credibility line ("live across 4 sites · 800+ assets") is orphaned below the diagram instead of anchored to it.

### Left-side text (`HomeHero.tsx`)
1. `<br className="hidden sm:block" />` (line 23) forces a hard break mid-sentence at every desktop width.
2. Vertical rhythm is `mt-6 / mt-9 / mt-6` — inconsistent baseline.
3. Eyebrow is too long: "Applied AI Systems Builder · Healthcare Operations".
4. Status line sits below CTAs as paragraph styling but reads as metadata.
5. Two CTAs at equal weight — secondary button competes with primary.

## Design

### Right side — three-node L-shape, monochrome, one animation

**Nodes (3, not 5):**
- `QR scan` — clinical input. Icon: `ScanLine`.
- `State + decision engine` — fused middle node. Icon: `GitFork`.
- `Operations surface` — outcome. Icon: `Gauge`.

The middle node fuses what were three separate nodes (`events`, `state`, `decision`) — they all live in the same engine in the real system, so collapsing them is more honest, not less.

**Layout:**
- Asymmetric L-shape, not pentagonal. Approximate positions in a `480 × 380` viewBox:
  - QR scan: top-left (`x ≈ 100, y ≈ 110`)
  - Engine: middle-right (`x ≈ 340, y ≈ 200`)
  - Ops surface: bottom-left (`x ≈ 130, y ≈ 300`)
- Two forward connectors (scan → engine → ops) drawn as solid 1.5px plum lines at 45% opacity.
- One thinner feedback connector (ops → scan, curved) drawn as a 1px dashed plum line at 30% opacity — implies the loop without restating it.

**Color:**
- All three node cards: white background, ink text, plum icon (single accent).
- Active-state pulse: plum at full strength.
- Live status dot: `--green` (the only other semantic color in the diagram).
- No amber, no blue, no pink.

**Captions:**
- Each node has one small caption directly underneath, not floating mid-edge:
  - QR scan → "Clinical end"
  - State + decision engine → "Lifecycle + routing"
  - Operations surface → "Dashboard · alerts"
- Edge labels are removed entirely.

**Animation:**
- One pulse: a single dot traveling `scan → engine → ops → (return to scan)` on a 6s loop using `offsetPath`. Reuses the existing `anim-heartbeat` keyframe with a new path.
- `anim-sonar`, `anim-ack`, `anim-seg-wash` references removed from this component (the keyframes stay in `globals.css` until cleanup elsewhere is confirmed; no orphan classes will reference them after this change).

**Credibility row, anchored to the diagram:**
A single horizontal row below the diagram, inside the same card visual:

```
● Live · 4 sites · 800+ assets · Microsoft Lists + QR · React · TypeScript
```

- `●` is a small `--green` dot.
- The whole row sits on `ghair` border at the bottom of the diagram card, so the diagram and the proof row read as one component.
- Replaces both existing caption paragraphs.

### Left side — clean rhythm, one primary CTA

**Eyebrow** (shorten):
- Was: `Applied AI Systems Builder · Healthcare Operations`
- New: `Applied AI · Healthcare Ops`
- Same pill styling.

**Headline** (no forced break):
- Remove `<br className="hidden sm:block" />`.
- Apply `max-w-[18ch]` so the headline wraps naturally on a balanced two-line shape across `sm` and up. No hard break.
- Keep the existing `font-display`, size scale, and `grad-plum-text` on "support healthcare operations."

**Subhead:** unchanged copy. `mt-6`.

**Meta row** (moved up):
- Move the location + availability line from below the CTAs to directly under the headline group, between subhead and CTAs.
- Smaller type (`text-[12px]`, `text-ink-muted`, no max-width clamp).
- `mt-6`.

**CTAs:**
- Primary: unchanged ("See the production system", filled plum, links to `/work/wheelchair-tracking`).
- Secondary: change from filled ghost button to an inline text link with arrow ("AI workflow methodology →"). Same `href="#ai-workflow"`. Same anchor target, same accessible name semantics for the test.
- Gap between CTAs: 24px.

**Vertical rhythm:** eyebrow → 24px → headline → 24px → subhead → 24px → meta row → 24px → CTAs. One spacing token throughout.

## What stays the same

- Slack-style `.home2` register and all tokens.
- `font-display` (Plus Jakarta) headline styling.
- The two CTA destinations (`/work/wheelchair-tracking`, `#ai-workflow`).
- The accessible names that `HomeHero.test.tsx` pins:
  - "Applied AI Systems Builder · Healthcare Operations" eyebrow → **broken by the eyebrow change.** Test must be updated to match new eyebrow string.
  - Headline accessible name "I build AI systems that support healthcare operations" → still matches because we only remove the hard break, not the words.
  - Subhead "Multi-site workflows, event streams, and decision layers" → unchanged.
  - Status line "Open to applied AI, AI systems, and operational intelligence roles" → unchanged copy, just relocated.
  - Primary CTA "See the production system" with `href="/work/wheelchair-tracking"` → unchanged.
  - Secondary "AI workflow methodology" with `href="#ai-workflow"` → still a link with the same accessible name (the arrow `→` will not be part of the link text — it can be a sibling icon or pseudo-content). Test stays green.

## Test changes

- `HomeHero.test.tsx`: update the eyebrow assertion to match "Applied AI · Healthcare Ops".
- Add a regression test that the headline contains no hard line break element (`container.querySelector('h1 br')` is null).
- `SystemArchitectureSketch.test.tsx`: rewrite to assert three node titles and the credibility row text. Drop assertions tied to the five-node pentagon.

## Files touched

- `frontend/src/components/home/HomeHero.tsx` — text alignment + CTA pattern.
- `frontend/src/components/home/SystemArchitectureSketch.tsx` — three-node L-shape, monochrome, one animation, anchored credibility row.
- `frontend/src/components/home/HomeHero.test.tsx` — eyebrow + no-`<br>` assertions.
- `frontend/src/components/home/SystemArchitectureSketch.test.tsx` — new structure assertions.

No CSS changes required. All animations and tokens already exist in `.home2` in `globals.css`.

## Acceptance criteria

1. Right-side diagram has exactly three node cards, one accent color (plum) plus a single green live dot, and one moving pulse.
2. No decorative per-edge labels; node captions sit directly under each node.
3. Credibility row reads as part of the diagram card, not as orphan text below.
4. Headline wraps naturally with no forced `<br>` at any breakpoint.
5. Eyebrow says "Applied AI · Healthcare Ops".
6. Vertical rhythm between left-column blocks is uniform (24px).
7. Secondary CTA is an inline text link, not a filled button.
8. All `HomeHero` and `SystemArchitectureSketch` tests pass after the planned test updates.
9. `npm run lint` and `npm run type-check` pass.

## Related

- [[homepage-paper-register]] — Slack-style direction this lives inside.
- [[credibility-program]] — the anchored proof row supports the same "proof not hype" thread.
