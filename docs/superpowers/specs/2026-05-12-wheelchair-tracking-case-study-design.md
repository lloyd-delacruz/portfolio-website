# Wheelchair Tracking — Flagship Case Study Design (Phase 2)

> Phase 2 of the portfolio repositioning. Builds the cathedral case study at `/work/wheelchair-tracking`, replacing the Phase 1 placeholder. References the Phase 1 design system without modifying it.

**Related docs:**
- Phase 1 spec: `docs/superpowers/specs/2026-05-12-portfolio-repositioning-design.md`
- Phase 1 plan: `docs/superpowers/plans/2026-05-12-portfolio-repositioning-phase-1.md`

---

## 1. Goal

Replace the paper-register placeholder at `/work/wheelchair-tracking` with a multi-section cinematic case study that presents the wheelchair tracking & operational workflow system (live across VGH, UBC Hospital, Lions Gate, Richmond) as a sophisticated operational platform — not as hospital documentation, internal IT, or a school project.

The case study must demonstrate systems thinking, operational intelligence, and AI-native product engineering through (a) cathedral-grade narrative scaffolding, (b) high-fidelity product theater modules, and (c) one playable interactive that physically demonstrates workflow → state-change.

## 2. Positioning constraints

The case study honours the existing positioning:
- Applied AI Engineer
- Healthcare Systems Builder
- Operational Systems Thinker
- AI-native product engineer

The case study must **not** read like:
- a personal blog post
- startup marketing copy
- enterprise documentation
- internal IT implementation
- a school project

The case study **must** read like:
- a systems engineer thoughtfully unpacking a real operational platform.

## 3. Architectural decisions (resolved during brainstorming)

| # | Decision | Resolution | Rationale |
|---|---|---|---|
| D1 | Visual register | **Hybrid** — paper-bg foundation with surface-dark product modules embedded as framed insets | Honours Phase 1's depth-register designation for the flagship; matches the actual idiom Stripe / Anthropic ship case studies in; produces a cinematic paper↔surface contrast |
| D2 | Asset stance | **Designed product theater only** — every product visual is a high-fidelity concept dashboard / diagram, captioned as representative; one stylized chart accent allowed | Ships without blocking on real screenshot collection; Microsoft Lists screenshots would not read as modern operational SaaS; preserves the Phase 1 honesty rule |
| D3 | Narrative voice | **Hybrid** — third-person systems voice on surface modules, first-person builder voice in 1–2 paper-register reflection passages | Avoids personal-blog (pure first-person) and enterprise-docs (pure third-person) failure modes |
| D4 | Metrics honesty | **Representative operational figures**, every number bears subtle mono caption (`representative operational model`, `30-day rolling · representative figures`, etc.) | Matches Phase 1's `LiveStatusPanel` honesty discipline |
| D5 | The interactive | **QR scan → state transition console** (Pillar III centerpiece) | The most operationally legible workflow gesture; the scan IS the architecture |
| D6 | Composition shape | **Cathedral Pillars** — 5 paper-register conceptual pillars (Visibility, Architecture, Scan, Lifecycle, Coordination) with surface-dark product modules inset between them | Each register handoff is justified by the work it does — pillars carry reasoning, modules carry proof |

## 4. Section composition

Ten sections, top to bottom. Every brief deliverable from the user's Phase 2 brief lands in a specific section.

### §0 · Cold open · "Running right now" (surface, ~100vh)

- **Eyebrow (mono):** `01 · healthcare workflow systems · v3.x`
- **Headline:** *A system you can't see, running across four hospitals.*
- **Right column:** framed mini SystemsMap (reuse of Phase 1's `SystemsMap` component, this time bordered as a card with `border-surface-subtle`, not full-bleed).
- **Live-status strip below headline:** `vgh · live` · `ubc · live` · `lions_gate · live` · `richmond · live` (reuse Phase 1's `LiveDot` primitive).
- **Floor caption (mono, muted):** `representative operational model · phase 2 case study`

Opens cold. The reader meets the system as fact in ~6 seconds — no setup, no marketing, no "hi I'm Lloyd."

### §1 · Pillar I · The Visibility Problem (paper)

**Register handoff:** 240px transitional band fading `surface-canvas → paper-bg`. A 1px gold hairline runs centred through the band. This is the only register-switch mechanic; used five times across the page.

- **Eyebrow (mono):** `pillar I · visibility · 01 / 05`
- **Serif display:** *Before the system, an empty wheelchair was a small disappearance.*

**Body — 2 paragraphs, Source Serif 4, ~64ch measure:**

> Across four hospitals, thousands of patient movements per week relied on equipment whose location no system could name. Retrieval was a radio call. Maintenance was a sticky note. The most expensive item in the building — the patient's time — was being spent looking for the second-most-expensive item.
>
> The interesting move wasn't the model. It was making the work observable. A logistics system that can't see itself can't improve, and most operational AI fails here, long before the algorithm — in the layer where the human and the system stop agreeing on what's true.

**Inset surface module — "What invisibility looks like":** a dark card framed inside the paper. Renders a deliberately broken state — sites grid with `?` glyphs in place of state pills, greyed-out timestamps, a status counter reading `unknown · 100%`. Mono caption bottom-right: `pre-system state · representative`.

### §2 · Pillar II · Architecture of the System (paper → surface inset)

- **Eyebrow (mono):** `pillar II · architecture · 02 / 05`
- **Serif display:** *The system isn't an app. It's a coordination surface.*

**Body — 2 paragraphs:**

> Microsoft Lists holds the registry of truth — every chair, every state, every site. QR codes anchor each piece of equipment to that registry physically. Mobile scans are the workflow gesture: the moment a chair changes state in the real world is the moment the system learns about it. Dashboards are the operational lens, role-shaped: a transport coordinator sees a different surface than a maintenance lead.
>
> Choose the workflow gesture first, then the state model, then the data, then the interface. The model — if there ever is one — comes last. This is the order operational AI actually has to be built in, and it's the order most teams reverse.

**Inset surface module — "System architecture":** wide horizontal architecture diagram on a dark card.
- Left edge: 4 actor pills — frontline staff · transport · maintenance · site coordinator.
- Centre: single luminous `workflow_core` node (the Lists registry).
- Right edge: 3 surface pills — operational dashboard · mobile scanner · lifecycle view.
- Edges carry mono micro-labels: `scan_event`, `state_change`, `assignment`, `audit_trail`.
- Visual idiom: thin lines, mono labels, gold accents on the workflow_core node. Same vocabulary as Phase 1's `SystemsMap`.
- This is **the canonical diagram** — later sections reference it.

### §3 · Pillar III · The Scan (paper → interactive surface — CENTERPIECE)

- **Eyebrow (mono):** `pillar III · the scan · 03 / 05`
- **Serif display:** *The scan is the architecture.*

**Body — 1 paragraph, then the interactive:**

> The QR sticker isn't the system, and neither is the camera. The system is the agreement that *when a chair is scanned, the registry becomes true.* Every other surface — the dashboard, the audit trail, the maintenance flag — reads downstream from that one event. Try it.

#### Interactive — "Operational Console · Scan to State Change"

Surface-dark module, ~720px tall on desktop, framed inside the paper page. Three panels (L / C / R).

**Left panel — Scanner viewport** (~280px wide)
- Phone-shaped frame, dark bezel.
- Camera viewport shows a QR sticker with equipment ID `EQ-VGH-0287` printed below in mono.
- Below the viewport: a row of five state chips — `in_use` · `returned` · `needs_cleaning` · `cleaning` · `available`. Only the chips whose transitions are valid from the current state are enabled; the rest render at `text-surface-fg-muted` with `aria-disabled="true"`. This keeps the demo loopable through the full lifecycle.
- Tap a chip → camera viewport fires 200ms gold scan-line sweep across the QR, then settles.

**Centre panel — Equipment record**
- Card with: `EQ-VGH-0287` (mono header), `Sunrise Quickie 2` (model), `Site: VGH · Floor 3W` (location), state pill below.
- State pill animates between states on scan: 220ms ease-out colour + label crossfade. No bounce, no overshoot.
- Below the card: event log appending one row per scan, slide-up 60ms:
  ```
  14:32:08 · scan @ vgh-3w · returned → needs_cleaning · staff 4471
  14:31:44 · scan @ vgh-3w · in_use → returned · staff 4471
  ```
- Log holds last 5 events. Oldest fades out as new ones append.

**Right panel — Distributed effect**
- Compact SVG topology: workflow_core + 4 hospital nodes (same visual vocabulary as `SystemsMap`).
- On each scan: gold dot fires from active site (VGH) → workflow_core → soft ring pulses on the three other hospital nodes (the registry update is now visible system-wide).
- Below the topology: 4 tiny tickers showing each site's current `available` count. VGH's count decrements on each `available → in_use` scan.

**Total interaction budget:** ≤600ms end-to-end. No sound. No particles. No celebratory motion. Calm, tactile, operationally intelligent.

**Caption beneath the module (mono):** `interactive prototype · representative state model · workflow_core v3.x`

**Accessibility:**
- Chips are real `<button>` elements with `aria-label`s.
- Tab order: scanner chips left-to-right.
- `aria-live="polite"` region beneath announces *"Equipment EQ-VGH-0287, state changed to needs cleaning."* on each scan.
- `prefers-reduced-motion`: state pill swap is instant, log row appears without slide, topology dot teleports rather than tweens, scan-line sweep is skipped.

### §4 · Pillar IV · Equipment as Lifecycle (paper → surface inset)

- **Eyebrow (mono):** `pillar IV · lifecycle · 04 / 05`
- **Serif display:** *Equipment isn't inventory. It's a lifecycle.*

**Body — 2 paragraphs:**

> A chair moves through phases — in use, returned, soiled, cleaned, inspected, maintained, retired. Without a state model, the operational view collapses into a binary: *here* or *missing*. With one, the system has memory: it knows what each chair has been through, what's overdue, what's likely to break.
>
> States are how you give a system memory. Without them, every shift starts cold and every coordinator is guessing.

**Inset surface module — Equipment Lifecycle State Machine:**
- Horizontal node graph: `available → in_use → returned → needs_cleaning → cleaning → inspected → available` with branches to `maintenance` and `out_of_service`.
- Count badges per node: `available · 187` · `in_use · 134` · `cleaning · 24` · `maintenance · 11` · `out_of_service · 6`.
- Dominant flow edge (`in_use → returned`) drawn in gold; a dot traverses it on an 8s ease-in-out loop.
- Below the graph: small horizontal histogram — *median dwell time per state* — six bars rendered in mono.
- Caption: `30-day distribution · representative figures`.

### §5 · Pillar V · Coordination Across Sites (paper → surface inset)

- **Eyebrow (mono):** `pillar V · coordination · 05 / 05`
- **Serif display:** *Four hospitals, one operational state.*

**Body — 2 paragraphs:**

> Equipment moves between sites — patient transfers, staff rotations, reallocation during demand spikes. Without a shared registry, four hospitals diverge within days into four incompatible truths. With one, a transport coordinator at Lions Gate knows what's available at Richmond before she picks up the phone.
>
> The hard work isn't making four sites use the same software. It's making them agree on the same state, while letting each site's surface be shaped to its own rhythm.

**Inset surface module — Sites Coordination Panel** (split layout):
- **Left ~60% — Operational dashboard:** 4 hospital tiles in 2×2 grid. Each tile shows site name, live count (`vgh · 187 available · 134 in use`), tiny inline live dot. Hover a tile → corresponding node on a thumbnail map pulses gold.
- **Right ~40% — Mobile workflow** (satisfies brief item #9): a phone mock showing a transport coordinator's view. Action stack: `Equipment EQ-VGH-0287 · Transfer to UBC` button, scan-in/scan-out flow, "tap to confirm handoff" affordance. Role-shaped UI — a small annotation calls out that a maintenance lead's view would look different.
- Caption: `multi-site operational console · representative model`

### §6 · Operational impact (surface)

**Register handoff:** paper-bg → surface-canvas (mirrored gold-hairline band).

- **Eyebrow (mono):** `operational impact · representative model`
- **Headline (sans, surface):** *What changes when the system is observable.*

**2×3 metric grid.** Each tile: large mono numeral, label, tiny `before → after` strip, faint mono caption.

| # | Numeral | Label | Before → after |
|---|---|---|---|
| 1 | `< 4 min` | Time to locate equipment | `~30 min · radio call` |
| 2 | `94%` | State-accurate at any hour | `unknowable` |
| 3 | `38 min` | Median cleaning cycle | `untracked` |
| 4 | `22 min` | Cross-site transfer lag | `phone-dependent` |
| 5 | `6 hr` | Maintenance flag → resolution | `multi-day` |
| 6 | `100%` | State-change audit coverage | `0%` |

**Floor caption (mono, muted):** `30-day rolling · representative operational figures · phase 2 wires real telemetry`

Numbers are representative; the language of the caption foregrounds that fact without hiding it.

### §7 · Reflection · builder note (paper)

**Register handoff:** surface → paper, gold-hairline band.

- **Eyebrow (mono):** `reflection · builder note`
- **Serif display:** *What operational systems teach you about AI.*

**Body — 3 paragraphs of first-person serif (~64ch measure):**

> For two years I assumed the interesting problem in healthcare AI was the model. The system taught me otherwise. The interesting problem was always the workflow — the scan, the state, the small moment where the human and the registry have to agree on what's true. Models can't fix a workflow that doesn't know what just happened.
>
> State is how you give a system memory. Every metric on the previous page, every audit, every future model — they all read downstream from a registry that knows the chair was returned at 14:32 and flagged for cleaning at 14:33. The state machine is the foundation. The model is a tenant.
>
> This is the architecture I want to extend AI into — not graft AI onto. When the registry is honest, the scan is fast, and the coordination is shared, an AI node has a real seat at the workflow. Without those, no amount of model quality matters.

**Closing line, italic mono in `text-gold-ink`, centred:**

> *Choose the workflow gesture first. Choose the model last.*

### §8 · The next nodes · AI integration concepts (paper → surface)

**Register handoff:** paper → surface, gold-hairline band.

- **Eyebrow (mono):** `next nodes · ai integration · concept`
- **Headline (sans, surface):** *AI as a node in the system. Not the centre of the universe.*

**Lead paragraph (sans, surface-fg-secondary):**

> Three nodes that would plug into the existing registry. Each reads from the state machine, writes back through audited events, and ships behind the same workflow gestures the system already uses.

**Three concept cards** (horizontal row on desktop, stacked on mobile):

**Card 1 — `predictive_maintenance_node`**
> Reads the lifecycle state machine. Flags chairs likely to fail within 14 days based on cumulative state-transit history. Surfaces in maintenance lead's dashboard.
> *Inset diagram:* compact lifecycle state graph with a `maintenance_risk` overlay arrow in gold.
> Caption: `concept · not deployed`

**Card 2 — `demand_forecast_node`**
> Reads patient-flow signals + scan cadence across sites. Predicts equipment shortfall by site by hour. Triggers proactive cross-site transfers before a shortage materialises.
> *Inset diagram:* 4 site nodes; one pulses with a forecast-shortfall indicator; a transfer arrow is drawn proactively.
> Caption: `concept · not deployed`

**Card 3 — `operational_copilot_node`**
> Reads the registry. Answers operational queries in natural language ("where are the bariatric chairs at UBC right now?") and drafts cross-site transfer requests for human approval.
> *Inset diagram:* tiny chat exchange — query → answer with a registry citation badge `EQ-UBC-0192`.
> Caption: `concept · not deployed`

**Floor caption (mono, muted):** `AI nodes read from workflow_core · the registry remains the source of truth`

### §9 · Close (surface)

- **Eyebrow (mono):** `next case study →`
- **Linear-row** pointing to `/work/equitrackr`:
  > **02 · EquiTrackr** · *equipment lifecycle & operational logistics platform* → arrow

**Separator hairline.**

**Bottom row:** `← back to systems` (links `/`) · `lloyd.vince1985@gmail.com` · `github` · `linkedin` · `x`

No floating CTA, no newsletter form, no contact form. Just the next case study and the way back home.

---

## 5. Component / file architecture

The case study lives under its own folder, mirroring how `components/home/` isolates the homepage shell:

```
frontend/src/components/work/wheelchair/
├── index.ts                          // barrel
├── primitives/
│   ├── RegisterHandoff.tsx           // surface↔paper transitional band + gold hairline
│   ├── PaperPillar.tsx               // eyebrow + serif display + body wrapper
│   ├── SurfaceModule.tsx             // dark card framing wrapper with caption slot
│   └── index.ts
├── ColdOpen.tsx                      // §0
├── PillarVisibility.tsx              // §1 paper
├── PreSystemDashboard.tsx            // §1 inset surface mock
├── PillarArchitecture.tsx            // §2 paper
├── ArchitectureDiagram.tsx           // §2 inset SVG diagram (canonical)
├── PillarScan.tsx                    // §3 paper intro
├── ScanConsole/                      // §3 interactive (centerpiece)
│   ├── index.tsx                     //   composition + a11y region
│   ├── ScannerPanel.tsx              //   left
│   ├── EquipmentRecord.tsx           //   centre
│   ├── DistributedEffect.tsx         //   right
│   └── useScanState.ts               //   state machine + log + announcer
├── PillarLifecycle.tsx               // §4 paper
├── LifecycleStateMachine.tsx         // §4 inset SVG state graph
├── PillarCoordination.tsx            // §5 paper
├── CoordinationPanel.tsx             // §5 inset (desktop dash + phone mock)
├── ImpactGrid.tsx                    // §6
├── Reflection.tsx                    // §7 paper
├── AINodes.tsx                       // §8 (3 concept cards)
└── CaseStudyClose.tsx                // §9
```

Page composition (`frontend/src/app/work/wheelchair-tracking/page.tsx`) becomes a thin composition file:

```tsx
import { NavBar } from '@/components/home/NavBar'
import {
  ColdOpen, PillarVisibility, PillarArchitecture, PillarScan,
  PillarLifecycle, PillarCoordination, ImpactGrid, Reflection,
  AINodes, CaseStudyClose,
} from '@/components/work/wheelchair'

export default function Page() {
  return (
    <>
      <NavBar />
      <main>
        <ColdOpen />
        <PillarVisibility />
        <PillarArchitecture />
        <PillarScan />
        <PillarLifecycle />
        <PillarCoordination />
        <ImpactGrid />
        <Reflection />
        <AINodes />
        <CaseStudyClose />
      </main>
    </>
  )
}
```

The Phase 1 `NavBar` is reused for consistent global navigation; no separate case-study nav.

## 6. ScanConsole — interaction spec

The single piece of meaningful state in the page. Spec:

### State shape (`useScanState`)

```ts
type EquipmentState =
  | 'in_use'
  | 'returned'
  | 'needs_cleaning'
  | 'cleaning'
  | 'available'

type LogEntry = {
  id: string            // ulid or `${ts}-${rand}`
  timestamp: string     // "14:32:08"
  site: string          // "vgh-3w"
  from: EquipmentState
  to: EquipmentState
  staffId: string       // "4471"
}

type ScanState = {
  current: EquipmentState
  log: LogEntry[]       // bounded to 5, newest first
  scanInFlight: boolean // true during the 200ms scan sweep
}
```

### Hook API

```ts
const {
  current,        // current state
  log,            // last 5 entries
  scanInFlight,
  scan,           // (next: EquipmentState) => void
  reset,          // () => void  (for test only; not wired to UI)
  reducedMotion,  // boolean — branches animations
} = useScanState({ initialState: 'in_use', siteId: 'vgh-3w', staffId: '4471' })
```

### Behaviour

- `scan(next)` sets `scanInFlight=true`, fires after 200ms (or 0ms if reduced motion), then sets `current=next` and prepends a new log entry. After 60ms (or 0ms), `scanInFlight=false`.
- Log truncates to 5 entries (oldest dropped).
- Timestamp uses local clock; staff and site come from hook config.
- `aria-live` announcer text is emitted by `ScanConsole` consuming `current`; the hook only manages state.

### Transition table

| from | allowed `to` |
|---|---|
| in_use | returned |
| returned | needs_cleaning, available |
| needs_cleaning | cleaning |
| cleaning | available |
| available | in_use |

Disallowed transitions are reflected in the UI: state chips that are not currently valid render at `text-surface-fg-muted` with `disabled` and `aria-disabled="true"`. This keeps the demo honest — every transition is a real workflow edge from the state machine in §4.

## 7. Token deltas

**None.** The case study uses Phase 1's existing token system entirely:
- `surface-canvas`, `surface-card`, `surface-elevated`, `surface-fg`, `surface-fg-secondary`, `surface-fg-muted`
- `paper-bg`, `paper-ink`, `paper-ink-soft`
- `gold`, `gold-ink`, `signal-live`
- `border-surface-subtle`, `border-surface-strong`, `border-paper-subtle`

Phase 1 promised these tokens were the full vocabulary; Phase 2 keeps that promise. If implementation reveals a specific contrast gap (e.g., warn-state colour for `maintenance_risk`), add it inline as a discovered need — but the default is reuse.

## 8. Motion principles

Builds on Phase 1's three motion verbs (inference pulse · edge traverse · register handoff). Adds:

- **Scan beat** (≤600ms total, parallel internal beats):
  - 200ms: scan-line sweep across QR viewport
  - 220ms: state-pill crossfade in EquipmentRecord
  - 60ms: log row slide-up
  - 400ms: gold dot fire from site → workflow_core on DistributedEffect topology
- **Lifecycle dominant-edge traverse**: 8s loop, ease-in-out, gold dot on `in_use → returned`.
- **Architecture core breathe**: reuses `SystemsMap` pulse vocabulary, 3.6s.
- **No scroll-jacking. No parallax. No celebratory motion.** Reduced-motion mode collapses every animation to instant state changes.

Register handoffs are **not** animations — they're CSS gradient bands the reader scrolls through. The gold hairline is a fixed visual element, not a motion event.

## 9. Accessibility plan

- **Heading hierarchy:** H1 on §0, H2 per section/pillar, H3 per inset module title. Linear and predictable.
- **Focus rings:** all interactive elements get `focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2` (matches Phase 1's a11y task).
- **ScanConsole specifically:**
  - State chips are `<button>` with `aria-label`s.
  - `aria-live="polite"` region beneath announces *"Equipment EQ-VGH-0287, state changed to needs cleaning."* on each scan.
  - Tab order: chips L→R; disabled chips skipped via `aria-disabled`.
- **Diagrams:** SVG with `role="img"` + `aria-labelledby` pointing to visible caption text. Decorative diagram motion is `aria-hidden`.
- **Reduced motion:** all animations gated by `usePrefersReducedMotion` (Phase 1 hook). State changes instant; log rows appear without slide; topology dot teleports.
- **Colour contrast:** body text tokens used (`surface-fg`, `surface-fg-secondary`, `paper-ink`, `paper-ink-soft`) were contrast-checked in Phase 1. Gold-on-canvas is reserved for ≤16px mono labels and the centred italic closing line in §7.

## 10. Responsive plan

- **≥1024px (desktop):** full layout as described above.
- **768–1023px (tablet):** pillars stack to one column (paper intro above, surface module below); ScanConsole panels stack vertically (scanner → record → topology); ImpactGrid stays 2×3; CoordinationPanel desktop-dash and phone-mock stack.
- **<768px (mobile):** ScanConsole panels stack tightly; ImpactGrid collapses to 1×6 column; AINodes cards stack vertically; CoordinationPanel **hides the desktop dashboard** and shows only the phone-mock — thematically right, since the case study is about a mobile-first workflow.

## 11. Testing scope

Phase 1 idiom: unit-test the genuinely subtle pieces; visual-verify the rest via `npm run dev`.

- **Vitest unit test for `useScanState`** — covers initial state, each allowed transition, disallowed transition rejection, log append + truncation to 5, reduced-motion branch (no scan sweep delay), idempotent re-renders.
- **Visual verification** for every other component, walked through at 375 / 768 / 1440 px breakpoints, with reduced-motion toggle (macOS Accessibility settings) and keyboard-only nav.

No Playwright / e2e in Phase 2. Phase 3 (real telemetry on `LiveStatusPanel`) is a separate scope.

## 12. Build dependencies

**No new packages.** Uses everything Phase 1 already installed:
- `framer-motion` (motion)
- `lucide-react` (icons)
- `geist/font/sans`, `geist/font/mono` (typography)
- `@fontsource-variable/source-serif-4` (serif)
- `vitest`, `@testing-library/react`, `@testing-library/jest-dom` (testing)

## 13. Open items / Phase 3 deferrals

The following are explicitly *not* in scope for this build and are deferred to Phase 3 or beyond:

1. **Real telemetry wired into LiveStatusPanel + this case study's metric grid.** Phase 2 metrics remain representative-labeled.
2. **Real photographs.** Phase 1 spec allowed one tasteful frontline image somewhere in the flagship — if Lloyd later provides a wheelchair-in-corridor or QR-sticker close-up, slot it as a small atmospheric image between §1 and §2 or beneath §3. Layout will accommodate; not blocking on it.
3. **EquiTrackr secondary deep-dive.** Linked to from §9 but its own build.
4. **Capability sub-pages** (`/capabilities/*`) — separate Phase 2 scope.
5. **External link URLs** (github / linkedin / x) — Lloyd to confirm or replace before public.
6. **Multi-language / i18n** — out of scope.

## 14. Mapping back to the brief

Every deliverable from the Phase 2 brief lands in a specific section:

| Brief item | Section |
|---|---|
| 1. Multi-scroll cinematic case study structure | §0–§9 overall composition |
| 2. Workflow diagrams | §2 ArchitectureDiagram |
| 3. Equipment lifecycle visualizations | §4 LifecycleStateMachine |
| 4. QR scan → state transition flow | §3 ScanConsole (interactive) |
| 5. Operational dashboard concepts | §1 PreSystemDashboard + §5 CoordinationPanel |
| 6. Before/after workflow storytelling | §1 (pre-system inset) + §6 ImpactGrid `before → after` strips |
| 7. Frontline operational pain points | §1 PillarVisibility |
| 8. Systems architecture storytelling | §2 PillarArchitecture |
| 9. Mobile operational workflows | §5 CoordinationPanel (phone mock) |
| 10. Future AI workflow integration concepts | §8 AINodes |

## 15. Definition of done

Phase 2 is complete when:

1. `/work/wheelchair-tracking` renders the full 10-section composition replacing the placeholder.
2. ScanConsole is fully interactive: state transitions, log append, distributed-effect topology, a11y announcer all working.
3. `usePrefersReducedMotion` correctly collapses all animations.
4. Keyboard-only navigation reaches every interactive element with visible focus rings.
5. Layout is verified at 375 / 768 / 1440 px.
6. `useScanState` Vitest suite is green.
7. `npm run type-check` and `npm run build` succeed.
8. No new packages were added.
9. The `/work/wheelchair-tracking` route renders in production build (static export).
