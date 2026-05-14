# EngineeringLoop — Compact S-Curve Decision Tree (Delta)

**Date:** 2026-05-14
**Status:** Approved
**Scope:** `frontend/src/components/home/EngineeringLoop.tsx` + its test only.
**Out of scope:** all other sections, `globals.css`, the `.home2` register.

## Why this delta

The current EngineeringLoop is a 1080×360 linear strip with seven stages and exactly one yes/no gate (at VERIFY). It reads as "pipeline", not "intelligent decision-making". The user wants it to feel like a **decision tree** — multiple explicit gates, each with a hard yes/no — while keeping the same visual hand (white tiles, ghair, dashed flow-lines, amber NO arcs, green YES branches, mono artifact captions, anim-float). Also compact: roughly square, sized for a card-like footprint instead of a banner strip.

## Design

### Layout — S-curve, 2 rows

Design space: **700 × 460** (was 1080 × 360).

- **Row 1** (top, `y = 100`, L→R): `FRAME → SPEC → ◇ clear? → PLAN → BUILD`
- **Vertical drop** on the right edge: `BUILD ↓ VERIFY` (at `x = 640`)
- **Row 2** (bottom, `y = 360`, R→L flow but cards placed left-aligned in screen-space): `VERIFY → ◇ gate? → SHIP → OBSERVE → ◇ healthy?` (cards rendered right-to-left so the flow arrow direction is leftward)
- **Loop-back** (amber, going up the left edge): `◇ healthy? NO → FRAME`

### Stage positions

| Stage | x | y |
|---|---|---|
| FRAME   | 80  | 100 |
| SPEC    | 220 | 100 |
| PLAN    | 500 | 100 |
| BUILD   | 640 | 100 |
| VERIFY  | 640 | 360 |
| SHIP    | 360 | 360 |
| OBSERVE | 220 | 360 |

### Decision diamond positions

| Diamond | x | y | YES forward → | NO arc back → |
|---|---|---|---|---|
| ◇ clear?   | 360 | 100 | PLAN | SPEC (short up-arc) |
| ◇ gate?    | 500 | 360 | SHIP | PLAN (vertical curve) |
| ◇ healthy? | 80  | 360 | done (no further card) | FRAME (left-edge up-arc) |

### Diamond visual

- 48×48 rendered footprint (24-pixel half-diagonal), drawn as `<polygon>` with the same `bg-white ghair soft-shadow-sm` treatment in CSS by wrapping the polygon in a foreignObject — actually too complex; we'll use SVG `<polygon>` filled `white` with `stroke="var(--line)"` and a thin shadow, plus an HTML `?` glyph positioned over the polygon center.
- Question label rendered ABOVE the diamond in `text-[10px] font-mono text-ink-muted uppercase tracking-[0.14em]` style — matches the existing sub-captions on each card.
- A small `?` glyph at the center of each diamond in `text-[14px] font-display font-extrabold text-plum`.

### Connector treatment

- Forward connectors (`flow-line`): `stroke="var(--plum)" strokeWidth={2} strokeOpacity={0.45}`, dashed via existing `home2-dash` keyframe. Unchanged.
- NO arcs: `stroke="var(--amber)" strokeWidth={2} strokeOpacity={0.7}`, `class="flow-line"` so the dashes animate. Cubic Bezier paths. End each arc with `marker-end="url(#eloop-arrow)"` — same marker as today.
- YES labels: small `text` elements positioned along the forward path immediately after each diamond, `fill="var(--green)" font-size="11"`.
- NO labels: small `text` elements at the apex of each NO arc, `fill="var(--amber)" font-size="11"`.

### Idle motion

- Cards still use `anim-float` with staggered delays. Same as today.
- Diamonds also use `anim-float` with their own offsets so the whole composition feels coherent.

### Mobile fallback (below `md`)

Stack stays vertical. Between the affected stages, insert a small **decision row** with the question + NO destination as a chip:

```
[FRAME]
   │
[SPEC]
   │
◇ clear?    YES ↓   NO ↺ SPEC
   │
[PLAN]
   │
[BUILD]
   │
[VERIFY]
   │
◇ gate?     YES ↓   NO ↺ PLAN
   │
[SHIP]
   │
[OBSERVE]
   │
◇ healthy?  YES ✓   NO ↺ FRAME
```

Each decision row is its own `<li>` with `aria-hidden` (since the SR list still lists the 7 stages).

### Section header

Unchanged. Still:
- Eyebrow: `HOW I WORK WITH AI`
- Heading: `An algorithm, not a vibe. <br/> This is the loop I run.`
- Subhead: same paragraph

## Test contract changes

Keep:
- Section heading copy assertion
- 7-stage caption assertion
- 7-item `<ol>` aria list
- 7-mono-artifact assertion

Add:
- Each decision-diamond question label present (`CLEAR?`, `GATE?`, `HEALTHY?`)
- Exactly 3 amber NO arcs (queried via `path[stroke*="amber"]` or via a CSS class we add for tests — easier: add `data-testid="no-arc"` to each amber path)
- Exactly 3 YES branch labels (`data-testid="yes-branch"`)

## Acceptance criteria

1. Diagram fits in a `700 × 460` viewBox (was `1080 × 360`).
2. All 7 existing stage cards render in the new S-curve positions.
3. Three decision diamonds render with `CLEAR?`, `GATE?`, `HEALTHY?` labels.
4. Three amber NO arcs render with destinations: SPEC, PLAN, FRAME.
5. Three green YES branch labels render adjacent to each diamond's forward edge.
6. All existing `EngineeringLoop.test.tsx` assertions still pass.
7. Mobile stack includes 3 decision rows inline at the right stages.
8. `npm run lint` and `npm run type-check` pass.

## Files touched

- `frontend/src/components/home/EngineeringLoop.tsx` — rewritten.
- `frontend/src/components/home/EngineeringLoop.test.tsx` — expanded.

## Related

- [[homepage-paper-register]] — cream Slack-style register stays.
- [[positioning-pivot-architect]] — broader "AI architect" framing; multi-gate decision tree supports the claim that decisions are explicit, not vibe-driven.
