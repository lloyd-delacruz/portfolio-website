# AI Workflow Algorithm — Design Spec

**Date:** 2026-05-13
**Status:** Approved for implementation
**Scope:** New visual section shared between `/` (home) and `/systems` showing Lloyd's AI working algorithm as a decision-tree pipeline diagram.

---

## 1. Purpose

The portfolio currently shows *what* Lloyd builds (`Capabilities`, `FeaturedWork`) and *that* he is AI-native (`SystemsToolchain`), but it does not show *how* he actually works. A visitor — recruiter, healthcare-tech lead, or peer engineer — who lands on the home page should be able to see, in one glance, the disciplined loop that separates a production AI practitioner from a typical data-science graduate.

This section answers the unspoken question "how do you actually use AI to ship?" with a literal algorithm: seven stages, one decision gate, one feedback loop, no hand-waving.

## 2. Differentiation story (the message)

A typical data-science workflow ends at a notebook. Lloyd's workflow:

1. starts from an operator's problem, not a dataset;
2. requires a written spec before any code;
3. decomposes the spec into a reviewable plan;
4. dispatches agentic coding tools (Claude Code, Codex, Cursor) to do the heavy work — tests first;
5. gates progress on a pass/fail check that loops back to the plan if it fails;
6. requires a human-in-the-loop review of every diff before merge;
7. ends in a shipped, observable production system, not a model artifact.

The diagram must read as an *algorithm* — explicit steps, an explicit decision, an explicit loop — so that the discipline is obvious before any caption is read.

## 3. Placement

### 3.1 Home page (`/`)
Insert between `Capabilities` and `FeaturedWork`:

```
HomeHero
TrustedRow
MetricsStrip
Capabilities
AIWorkflowAlgorithm   ← new
FeaturedWork
CredibilityStrip
FooterCTA
```

Rationale: Capabilities tells the audience what Lloyd can do; the algorithm answers the natural follow-up "how"; FeaturedWork then shows the proof.

### 3.2 Systems page (`/systems`)
Insert between the heading section and `SystemsToolchain`:

```
HomeNav
(heading section)
AIWorkflowAlgorithm   ← new
SystemsToolchain
FooterCTA
```

Rationale: the heading promises "the system behind the systems"; the algorithm is the literal answer; `SystemsToolchain` then names the tools that execute the algorithm. Reading order: claim → algorithm → tools.

### 3.3 Component sharing
A single shared component is rendered on both pages with identical content. No page-specific props.

## 4. Section content (copy)

- **Eyebrow** (mono, plum, uppercase, tracking 0.18em): `HOW I WORK WITH AI`
- **Headline** (display, extrabold, two lines):
  - Line 1: `An algorithm, not a vibe.`
  - Line 2 (wrapped in `grad-plum-text`): `This is the loop I run.`
- **Subhead** (≤45ch, `text-ink-soft`): *Most data-science workflows stop at a notebook. Mine ships into production because every step has a gate — a spec, a test, a review, an observable system — and AI agents do the heavy work inside those gates.*

## 5. Diagram structure

### 5.1 Stages

Seven stages total: six action cards and one decision diamond at position 5. Stage colors map to existing palette tokens.

| # | Stage label (caption, mono uppercase) | Sub-caption (above card, `text-ink-muted`, mono uppercase) | Icon (lucide-react) | Color token |
|---|---|---|---|---|
| 1 | `FRAME`           | `WITH THE OPERATOR`     | `Target`      | `--plum`  |
| 2 | `SPEC`            | `DESIGN BEFORE CODE`    | `FileText`    | `--blue`  |
| 3 | `PLAN`            | `REVIEWABLE UNITS`      | `ListChecks`  | `--plum`  |
| 4 | `DISPATCH AGENTS` | `TESTS FIRST`           | `Bot`         | `--pink`  |
| 5 | `PASS?` (diamond) | — (label inside diamond) | `GitFork`    | `--amber` |
| 6 | `REVIEW`          | `HUMAN IN THE LOOP`     | `ShieldCheck` | `--green` |
| 7 | `SHIP`            | `OBSERVABLE IN PROD`    | `Rocket`      | `--plum`  |

Stages 1–4, 6, 7 render as white 96×96 rounded cards with `ghair` border and `soft-shadow-sm`, icon centered, label below the card and sub-caption above the card. Stage 5 renders as a rotated square (diamond) of equivalent visual weight with `ghair-2` border and the word `PASS?` centered upright (the text is not rotated). The `GitFork` icon sits inside the diamond above the text.

### 5.2 Layout (desktop, ≥lg)

Horizontal pipeline laid out in an SVG with `viewBox="0 0 1080 360"`. Cards positioned at evenly spaced x-centers across the viewBox; vertical center at `y = 220` for the main row so there is headroom above for the loop-back arc.

Forward path: thin plum connector with the standard `flow-line` blinking dash, running through stages 1 → 2 → 3 → 4 → 5 → 6 → 7. Two small filled circles (radius 3.2) anchor each segment's endpoints, matching `DiagramScene` exactly.

Loop-back arc: from the *top* of the diamond, an amber curved path arcs up and back to the *top* of stage 3 (Plan), ending in a small chevron arrowhead. The arc passes above stage 4's card. The arc also uses `flow-line` so it blinks in sync with the forward path.

A "no" label in amber mono sits at the apex of the arc; a "yes" label in green mono sits along the short segment between the diamond and stage 6.

### 5.3 Layout (md)
Same pipeline; SVG scales to the `max-w-[1180px]` container. No structural change.

### 5.4 Layout (<md)
Pipeline stacks vertically. Cards centered horizontally, connectors become short vertical `flow-line` segments. The loop-back becomes a small curved arrow on the left side of the stack going from the diamond up to stage 3. No horizontal scroll; no content removed.

### 5.5 Animation

- Each of the seven nodes (six cards plus the diamond) uses `anim-float` with a staggered `animation-delay` of `0, 0.2s, 0.4s, 0.6s, 0.8s, 1.0s, 1.2s` applied in stage order 1→7. Same duration as hero (`6 + (delay % 2)` seconds) so motion matches the established rhythm.
- All SVG connectors (forward + loop-back) use the existing `flow-line` class — no new keyframes required.
- The section's outer container is wrapped in `<Reveal>` on the home page (matching neighboring sections); on the systems page it sits directly under the heading without `<Reveal>` (matching `SystemsToolchain`'s pattern there).

## 6. Accessibility

- The decorative SVG carries `aria-hidden="true"`.
- A visually-hidden ordered list (`<ol class="sr-only">`) mirrors the seven stages in order with the same labels and sub-captions, plus an explicit sentence describing the decision and loop-back ("If the pass check fails, return to Plan and repeat."). Screen-reader users get the full algorithm in linear form.
- Reduced motion is already handled globally by the existing `@media (prefers-reduced-motion: reduce)` block in `globals.css`, which disables `.flow-line`, `.anim-float`, `.anim-rise`. No additional CSS needed.

## 7. File plan

**New file**

- `frontend/src/components/home/AIWorkflowAlgorithm.tsx` — the section component (heading + SVG diagram + sr-only list). Self-contained; no props.

**Edits**

- `frontend/src/app/page.tsx` — import `AIWorkflowAlgorithm`, render it inside a `<Reveal>` between `Capabilities` and `FeaturedWork`.
- `frontend/src/app/systems/page.tsx` — import `AIWorkflowAlgorithm`, render it between the heading section and `<SystemsToolchain />`.

**No changes**

- `globals.css` — all tokens (`--plum`, `--pink`, `--green`, `--blue`, `--amber`, `ghair`, `ghair-2`, `soft-shadow-sm`, `flow-line`, `anim-float`, `grad-plum-text`) already exist.
- No new dependencies (`lucide-react` is already used by `DiagramScene`).

## 8. Out of scope (deliberate)

- No hover/click interactions on stages. Visual register stays consistent with the hero ("look and read").
- No per-stage modals, tooltips, or deep links — possible future iteration.
- No analytics events on the diagram.
- No theme variant (light/dark) — `.home2` is single-register today.
- No A/B variant of stage ordering — content is fixed by this spec.

## 9. Acceptance criteria

1. `AIWorkflowAlgorithm` renders on both `/` and `/systems` at the placements described in §3.
2. On desktop, the diagram displays seven stages in a horizontal pipeline — six action cards and one decision diamond at position 5 — with a visible amber loop-back arc from the diamond back to Plan.
3. All forward and loop-back connectors animate with the `flow-line` blinking dash, matching the hero's behavior.
4. Each card floats with `anim-float` and a staggered delay so the row breathes in sequence.
5. On viewports below `md`, the diagram stacks vertically with no horizontal scroll, retaining all seven stages and the loop-back.
6. A visually-hidden ordered list mirrors the seven stages for screen readers and explicitly describes the loop-back.
7. With `prefers-reduced-motion: reduce`, all animations are disabled and the section remains fully legible.
8. `npm run lint` and `npm run type-check` pass; no new dependencies in `package.json`.
