# Wheelchair Tracking — visual redesign (diagram-first, FAANG case-study flow)

**Date:** 2026-05-12
**Branch:** phase-1-repositioning
**Scope:** Restructure `/work/wheelchair-tracking` from an essay-style "thesis" into a scannable, diagram-led product case study. Same visual language (dark surface, gold accent, mono labels); cut long serif prose; every section earns its place with an illustration or diagram. Keep the strongest existing assets (`ScanConsole`, `CoordinationPanel`).

## Problem with the current page
- Five "Pillar I…V" sections, each a 2–3 paragraph serif essay → reads as a thesis.
- The visuals that exist (architecture diagram, lifecycle, AI mini-diagrams) are thin/cramped.
- Story isn't visible at a glance; the workflow ("scan → state → registry → dashboards") is described in prose, not drawn.

## New section flow
1. **Hero (`ColdOpen`)** — keep; add a compact "flow in 5 steps" strip under the headline (scan · state · registry · dashboards · cross-site) so the whole story is visible before scroll. Trim the "phase 2 / representative" footnote.
2. **The problem (`ProblemDiagram`, NEW)** — replaces Pillar I essay. Visual: 4 hospital nodes, equipment as loose `?` tokens drifting between them, a `~30 min · radio call` stopwatch marker, "0% state-accurate". One sentence of copy max.
3. **The core loop (`CoreLoopDiagram`, NEW — centerpiece)** — replaces Pillar II + III essays. A horizontal annotated pipeline: **QR scan → state change → workflow_core registry → role dashboards**. Animated dot traversing the pipeline; small callouts ("transport sees X / maintenance sees Y") branching off the registry. This is the "easy to follow" workflow diagram. Subsumes the old `ArchitectureDiagram` content (actors/surfaces become labels on this diagram).
4. **Try it (`ScanConsole`, keep)** — reframe caption: "scan a chair → the registry becomes true." No other changes.
5. **Equipment lifecycle (`LifecycleStateMachine`, REBUILD)** — larger, legible state diagram: labeled states, transition arrows, dominant path (`in_use → returned → cleaning → available`) highlighted in gold, branch states (`maintenance`, `out_of_service`) offset. Tidier dwell-time bar chart below with axis labels. Caption frames it as "the app gives operations memory."
6. **Running 4 sites (`CoordinationPanel`, light edit)** — keep dashboard + phone mock. Add a 3-step numbered annotation on the phone column: ① see shortage ② tap transfer ③ confirm handoff. Reframe heading as "how a coordinator uses it during a demand spike."
7. **Impact (`ImpactGrid`, light edit)** — keep the 6 metric tiles; replace the text "before → after" line with a tiny two-bar mini-chart per tile (muted "before" bar vs gold "after" bar) so the deltas are visual.
8. **What's next — AI nodes (`AINodes`, rebuild mini-diagrams)** — keep the 3 concept cards; rebuild each mini-SVG into a clean, consistent illustration that visibly hangs off the same `workflow_core` node from section 3 (predictive maintenance reads lifecycle / demand forecast reads cross-site / copilot reads registry). Trim card copy to ~2 short lines.
9. **Reflection (`PaperPillar`, keep — shortened)** — the ONE remaining light/serif moment. Cut to 3 short sentences. Keep the closing aphorism line. Then existing `CaseStudyClose` footer unchanged.

Optional: thin sticky vertical section-progress indicator (5–6 dots) on the right edge, desktop only. Build last; drop if it fights the layout.

## Components
**New:** `ProblemDiagram.tsx`, `CoreLoopDiagram.tsx` (both in `components/work/wheelchair/`, both `role="img"` with descriptive `aria-label`, animated parts gated behind `usePrefersReducedMotion` + `useInViewPause` like `LifecycleStateMachine`).
**Rebuilt:** `LifecycleStateMachine.tsx`, `AINodes.tsx` mini-diagram fns.
**Light edits:** `ColdOpen.tsx`, `CoordinationPanel.tsx`, `ImpactGrid.tsx`.
**Removed from page:** `PillarVisibility/Architecture/Scan/Lifecycle/Coordination` wrapper essays — replaced by direct section components. `ArchitectureDiagram.tsx`, `PreSystemDashboard.tsx`, the `Pillar*` files and unused `primitives/PaperPillar` consumers get deleted if nothing else imports them. `RegisterHandoff` keeps being used around the one Reflection paper block.
**Untouched:** `ScanConsole/*`, `CaseStudyClose.tsx`, `SystemsMap`.

## Copy rules
- No paragraph longer than 2 sentences anywhere on the page.
- Section intros: one line. Diagram annotations: phrases, not sentences.
- Keep mono `MonoLabel` eyebrows for rhythm; drop the "pillar I · … · 01/05" academic numbering — use plain section labels ("the problem", "the core loop", "lifecycle", "operations", "impact", "what's next").
- Keep "representative model" disclaimers but as a single small footnote per data-bearing section, not repeated inline.

## Visual/illustration standards
- SVG diagrams use the existing token palette: `hsl(var(--surface-canvas))` fills, `hsl(var(--accent-gold))` for the active/dominant path, `rgba(255,255,255,0.18–0.32)` for inactive strokes/nodes, `var(--font-geist-mono)` for in-SVG text.
- Every diagram legible at mobile width (test at 360px): scale text, allow horizontal stacking.
- Motion: subtle, looping, paused off-screen and under `prefers-reduced-motion`. No motion required to understand any diagram.

## Out of scope
- No backend/data changes (figures stay representative).
- No new routes; `/work/wheelchair-tracking` only.
- No redesign of `CaseStudyClose` or global nav.

## Testing / verification
- `npm run lint` and `npm run type-check` clean.
- Manual: page renders, all diagrams visible at 360px and 1280px, reduced-motion disables animation, keyboard focus rings intact on `ScanConsole`/`CoordinationPanel` buttons.
