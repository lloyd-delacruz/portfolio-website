# Enterprise Healthcare Workflow Automation Engine — Case Study Design

**Date:** 2026-05-14
**Status:** Draft (pending user review)
**Scope:** Replace the placeholder route at `/work/healthcare-automation-engine` with a full case study page, register the project in `ProjectMeta`, and reframe the homepage `FeaturedWork` card from `concept` → `prototype` so the home card matches the page's honest framing. Sits as a prototype-tier sibling to `clinical-genai-pipeline` in the same `home2` register.

---

## 1. Goal

A case study page that positions Lloyd for healthcare-tech roles involving cloud automation, event-driven systems, Microsoft 365 / Power Platform engineering, and integration work. The page demonstrates:

- Real Power Platform + Azure orchestration patterns Lloyd has built
- Systems thinking: triggers, orchestration, actions, reliability, governance
- Microsoft-enterprise ecosystem fluency (Power Automate, Azure Functions, Microsoft Graph, SharePoint / Lists, Teams, webhooks)
- Healthcare operational empathy — knows what handoffs actually break inside a hospital

The page must read as **a designed and built capability portfolio** — prototypes that work, not a production-at-scale platform. Status is `prototype`, language uses *"the design / the pattern / the prototype demonstrates"* and *"built and demonstrated, not yet at enterprise scale"* — never measured production metrics that don't exist.

Visually it is **indistinguishable in register** from the other `/work/*` pages (`wheelchair-tracking`, `clinical-risk-engine`, `population-health-intelligence`, `clinical-genai-pipeline`).

---

## 2. Files added / modified

### Add

```
frontend/src/components/casestudy/automationEngine/
  AeHero.tsx
  AeProblem.tsx
  AeArchitecture.tsx
  AeFlowDemo.tsx            (interactive step-through, auto-cycling)
  AePatterns.tsx
  AeReliability.tsx
  AeImpact.tsx
  AeClose.tsx
  data.ts                   (flow demo step fixtures + pattern definitions)
```

### Modify

| Path | Change |
|---|---|
| `frontend/src/app/work/healthcare-automation-engine/page.tsx` | Replace `PlaceholderCaseStudy` with full multi-section composition matching `clinical-genai-pipeline/page.tsx` shape |
| `frontend/src/lib/projects.ts` | Add `'healthcare-automation-engine'` `ProjectMetaRecord` entry (see §6) |
| `frontend/src/components/home/FeaturedWork.tsx` | Flip `PROJECTS[2].status` from `'concept'` → `'prototype'`; refine `body` copy to match the new framing (still ≤2 sentences); no `Variant` change needed (`topology` already fits) |
| `frontend/src/components/home/FeaturedWork.test.tsx` | If a test asserts `status: 'concept'` for this card, update to `'prototype'`. Verify and adjust. |

### Remove

| Path | Reason |
|---|---|
| `PlaceholderCaseStudy` import / usage in this route only | Page no longer needs the placeholder. The `PlaceholderCaseStudy` component itself stays — other routes may still use it. |

### No deletions of shared primitives.

---

## 3. Visual register (binding)

Use the existing `home2` register exactly as `clinical-genai-pipeline` uses it:

- **Background:** `var(--cream)`, `var(--cream-2)` for inactive panels, `white` for cards
- **Accent:** `var(--blue)` as the section accent (matches the homepage card's `accent: 'var(--blue)'` — this is the visual through-line from card → case study). `var(--plum)` for eyebrows / primary text accents to match site-wide pattern.
- **Status / tone colors:** `var(--green)` (success / completed step), `var(--amber)` (retry / warning), `var(--coral)` (error / dead-letter), `var(--blue)` (info / orchestration)
- **Typography:** `font-display` for headings, default body for prose
- **Primitives:** `CsSection`, `Module`, `Chip`, `Eyebrow` from `casestudy/bits.tsx`
- **Motion:** `Reveal` wrapper for section entrance (mirrors `clinical-genai-pipeline/page.tsx`); auto-cycle interval `2200ms` for the flow demo (slightly slower than the genai demo because each step shows more content)
- **Chrome:** `HomeNav active="Work"` + `ProjectMeta slug="healthcare-automation-engine"` + `SiteFooter`, same wrapper as `clinical-genai-pipeline/page.tsx`

### Explicit no-go list (binding — this is the load-bearing honesty contract for this page)

- ❌ No claims of "deployed across N sites," "production at scale," "saves X hours per week," or any quantitative impact number that isn't directly observable from a built prototype
- ❌ No "enterprise platform" / "company-wide" framing — this is a *capability portfolio of built patterns*, not a deployed platform
- ❌ No screenshot or mock of a real Power Automate canvas, Azure Portal, or Microsoft tenant. All flow diagrams are stylized SVG / divs in the warm register, same idiom as `CgArchitecture` and `WcSystemMap`.
- ❌ No real organization names, channel names, employee names, or recognizable workflows from Lloyd's employer. All demo content uses generic operational placeholders (`Biomed on-call`, `Site A`, `Asset 042`).
- ❌ No prose paragraph longer than 3 sentences in any section
- ❌ No dark backgrounds anywhere on this page

---

## 4. Page anatomy (8 sections)

The user's recommended shape, with Hero (entry) and Close (exit), is 8 sections total — same density as `clinical-genai-pipeline`. Each section is load-bearing for one positioning beat.

| # | Section | Component | Word budget |
|---|---|---|---|
| 1 | Hero | `AeHero` | Subtitle ≤22 words |
| 2 | Problem & operational context | `AeProblem` | Body ≤80 words across 2 paragraphs; 3 × short callouts |
| 3 | System architecture | `AeArchitecture` | Intro 1 sentence; layer-card body ≤22 words |
| 4 | One flow, end-to-end (interactive demo) | `AeFlowDemo` | Step captions ≤30 words each |
| 5 | Reusable patterns | `AePatterns` | Pattern card body ≤22 words each |
| 6 | Reliability & governance | `AeReliability` | Card body ≤22 words each |
| 7 | What this enables (impact) | `AeImpact` | Statement body ≤25 words each |
| 8 | Close | `AeClose` | 1-line provocation + "what production would require" stub |

---

## 5. Section specs

### 5.1 Hero (`AeHero.tsx`)

- Eyebrow chip: `Cloud automation · Event-driven systems`
- Title: `Enterprise Healthcare Workflow Automation Engine`
- Subtitle: *The connective tissue between Microsoft 365, custom apps, and clinical operations — turning manual handoffs into event-driven workflows.*
- Primary CTA: `See a flow run` → `#demo`
- Secondary CTA: `Start from the problem` → `#problem`
- META 4-up:
  - Role · System design · Power Platform & Azure engineering
  - Inputs · Forms, list changes, schedules, webhooks
  - Output · Teams alerts, Lists writes, Planner tasks, audit log
  - Status · Prototype patterns
- Right glyph: 4 small icon nodes (`Webhook` → `Workflow` → `Cloud` → `Send`) connected by a faint blue signal line. Composed inline as SVG (no separate file).

### 5.2 Problem & operational context (`AeProblem.tsx`)

- Eyebrow: `01 · Problem`
- Title: `Hospitals run on glue work.`
- Body (≤80 words):
  > Most hospital operations live in Microsoft 365 — Lists, SharePoint, Forms, Teams, Outlook — plus a fragmented set of custom apps. The handoffs *between* them are largely manual: copy-paste, email chains, "did you see my Teams message?"
  >
  > Operations leaders lose hours each week to coordination work that should be automatic. The work is small, repetitive, and exactly the work event-driven systems were built to handle.
- 3 icon callouts (`size={17}`, color `var(--blue)`):
  - `MessageSquare` · Manual coordination
  - `RefreshCw` · Repetitive handoffs
  - `AlertTriangle` · Missed escalations
- Footnote: *Lloyd has spent 9+ years inside hospital operations — the handoff patterns and ecosystem constraints are first-hand.*

### 5.3 System architecture (`AeArchitecture.tsx`)

- Eyebrow: `02 · System architecture`
- Title: `Three layers, composable across the Microsoft ecosystem.`
- Intro: *Trigger surfaces fan into an orchestration layer that calls action surfaces — the same shape for every automation.*

**Three layers (3-column grid, white modules, ghair, soft-shadow-sm; each shows a layer title + icon + 4 examples as Chip components):**

| Layer | Icon | Color | Examples (Chip neutral) |
|---|---|---|---|
| **Trigger surface** | `Webhook` | `var(--blue)` | `Forms submitted` · `List item changed` · `Schedule (CRON)` · `External webhook` |
| **Orchestration** | `Workflow` | `var(--plum)` | `Power Automate flow` · `Azure Function` · `Branching + retry` · `Secrets via Key Vault` |
| **Action surface** | `Send` | `var(--green)` | `Teams channel post` · `Lists write` · `Planner task` · `Email + Calendar` |

**Below the grid: a horizontal flow diagram (plain SVG, same idiom as `WcSystemMap`):**

```
[Trigger] ──▶ [Orchestration: Flow / Function] ──▶ [Action: Graph API call(s)]
                       │
                       └─▶ [Audit log: Lists / Application Insights]
```

The diagram has 4 nodes laid out horizontally with the audit branch dropping below the orchestration node. Use `var(--blue)` for the spine and `var(--ink-muted)` for the audit branch.

Footnote: *Built prototypes inside a Microsoft 365 enterprise tenant. Not yet deployed at platform scale.*

### 5.4 One flow, end-to-end (`AeFlowDemo.tsx`) — interactive centerpiece

- Eyebrow: `03 · One flow, end-to-end`
- Title: `Watch one handoff become a workflow.`
- Intro: *A trigger fires, the orchestrator decides, actions fan out, and everything is logged. Step through it or let it run.*
- Footnote: *Representative built prototype. Concrete example shown to illustrate the shape — the same scaffold is reused across patterns in §5.5.*

**Three zones (same shape as `CgExtractionDemo` / `WcWorkflowDemo`):**

- **Zone 1 — TRIGGER PAYLOAD**: a styled "event card" showing the incoming event. Mono-ish typography for the JSON body. Header shows `Source: Microsoft Lists · trigger: item changed`.
- **Zone 2 — ORCHESTRATION**: a vertical stack of step pills representing the Power Automate flow. Each pill shows: step number, action name, icon, and a small status chip that fills in as the demo advances (`pending` → `running` (`var(--blue)`) → `done` (`var(--green)`)). One step is an Azure Function call (labeled accordingly with a `Cloud` icon).
- **Zone 3 — ACTIONS & AUDIT**: two stacked sub-panels:
  - **Actions fan-out** card listing the Microsoft Graph calls produced by the flow (e.g. `POST /teams/{id}/channels/{id}/messages`, `POST /planner/tasks`, `PATCH /sites/{id}/lists/{id}/items/{id}`), each with a green check as they complete
  - **Audit log** card showing a single timestamped row appended to a `flow_audit` list, with correlation ID, outcome, and duration

**Concrete example used in the demo** (chosen because it cross-references Lloyd's flagship `wheelchair-tracking` system, which is real — so the integration target is real even though this specific Power Automate flow is a built prototype, not a production deployment):

- **Scenario:** A wheelchair tracked in the existing system is marked `needs_service` in Microsoft Lists. The automation classifies severity, routes a notification to the biomed on-call Teams channel, opens a Planner task for repair, updates the asset's lifecycle stage, and writes to the audit list.

**Auto-cycle steps (loop every 2200ms when playing):**

1. **Trigger fires** — payload arrives in Zone 1; Zone 2 step 1 flips `running`.
2. **Severity classified** — Azure Function call (Zone 2 step 2) returns `severity: high`; pill turns green.
3. **Channel routed** — flow branch picks `Biomed · on-call` channel (Zone 2 step 3 green); Zone 3 actions panel adds the Teams `POST` row with a green check.
4. **Task opened** — Planner task created (Zone 2 step 4 green); Zone 3 actions panel adds the Planner `POST` row.
5. **Asset updated + audit** — List item PATCH'd (Zone 2 step 5 green); Zone 3 actions panel adds the Lists `PATCH` row; Zone 3 audit log card appends one row with `outcome: ok` and a duration.

After step 5, the demo holds briefly, then resets to step 0 and loops.

**Behavior contract:**
- Default `playing === true` UNLESS `usePrefersReducedMotion()` returns true
- Clicking a step pill pauses auto-cycle (`setPlaying(false)`) and jumps to that step
- `▶ Run flow` / `↺ Reset` controls match `CgExtractionDemo`
- Active step pill uses `background: rgba(59,130,246,0.10)` + `border: rgba(59,130,246,0.35)`; completed steps use a green check; pending steps stay neutral
- Transitions via `transition-all duration-300`

**Data fixtures (`data.ts`):**

One hand-authored flow scenario object with:
- `trigger: { source: string; payload: Record<string, unknown> }`
- `steps: { id: number; label: string; icon: 'Webhook' | 'Cloud' | 'GitBranch' | 'Send' | 'Database'; kind: 'trigger' | 'function' | 'branch' | 'action' | 'persist' }[]`
- `actions: { method: 'POST' | 'PATCH'; path: string; surface: 'Teams' | 'Planner' | 'Lists' }[]`
- `audit: { correlationId: string; outcome: 'ok' | 'retry' | 'fail'; durationMs: number }`

No external call is made at runtime — all values are pre-computed fixtures. This keeps the demo deterministic and removes any API-key / tenant surface from the static export.

> **Note for implementer:** If Lloyd has a stronger built flow he'd rather showcase (a real example from his actual prototypes), swap the scenario content in `data.ts` and the section copy — the component scaffold and zone shape stay identical. The wheelchair-integration example is the spec's default because it cross-references a known-real Lloyd-built system; any other real flow tells the story equally well.

### 5.5 Reusable patterns (`AePatterns.tsx`)

- Eyebrow: `04 · Patterns`
- Title: `Four shapes that cover most of the work.`
- Intro: *Most operational automations collapse into a small set of reusable patterns. Each has been built and demonstrated.*

**4-card grid (2x2 on desktop, 1-col mobile, white modules, ghair, soft-shadow-sm):**

Each card: icon (size 22, `var(--blue)`) · pattern name · one-sentence definition · one concrete example · trigger→orchestration→action chip row.

| Pattern | Icon | Definition | Concrete example | Stack chips |
|---|---|---|---|---|
| **Alert routing** | `AlertTriangle` | Event from a system-of-record is classified and routed to the right human channel with full audit. | Equipment marked `needs_service` → severity classified → biomed on-call Teams channel + Planner task | `List changed` · `Azure Function` · `Teams + Planner` |
| **Form → system-of-record** | `ClipboardList` | A submitted form drives an approval / write-back loop into a List or SharePoint document, with the submitter notified at each state. | Service request form → approval routing → Lists write + submitter notification | `Form submitted` · `Power Automate` · `Lists + Email` |
| **Scheduled sync** | `RefreshCw` | An Azure Function runs on a CRON, pulls from one Microsoft system, transforms, and writes to another — with idempotency keys and dead-letter routing. | Nightly: pull asset roster from List A → reconcile → write changes to List B | `CRON` · `Azure Function` · `Lists (read + write)` |
| **Webhook fan-out** | `Share2` | An external system event arrives by webhook and is fanned out to multiple downstream Microsoft Graph actions with per-action retry. | External `incident.created` webhook → Teams post + calendar event + Lists row | `Webhook` · `Azure Function` · `Graph (3 calls)` |

Footnote: *Patterns shown have been built as prototypes inside a Microsoft 365 enterprise tenant.*

### 5.6 Reliability & governance (`AeReliability.tsx`)

- Eyebrow: `05 · Reliability & governance`
- Title: `Past the happy path.`
- Intro: *The difference between a clever flow and a production-worthy capability is everything that happens when something fails.*

**4-card grid (white modules, ghair, soft-shadow-sm):**

| Card | Icon | Body (≤22 words) |
|---|---|---|
| **Idempotency** | `KeyRound` | Every flow accepts a correlation ID. Duplicate triggers resolve to the same outcome without double-posting. |
| **Retry & dead-letter** | `RotateCcw` | Transient failures retry with exponential backoff. Permanent failures route to a dead-letter list with full payload + error. |
| **Secrets in Key Vault** | `KeySquare` | No credentials in flow definitions. All keys, tokens, connection strings resolve through Azure Key Vault references. |
| **Audit by design** | `ScrollText` | Every run writes a row to a `flow_audit` list with correlation ID, outcome, duration, and triggering identity. |

Footnote: *Prototype-grade implementations of each pattern, not yet hardened to production SLAs.*

### 5.7 What this enables — impact (`AeImpact.tsx`)

- Eyebrow: `06 · What this enables`
- Title: `Coordination work that doesn't get forgotten.`
- Intro: *The honest framing — what these patterns make possible, without claiming production scale.*

**3-card row (white modules, ghair, soft-shadow-sm):**

| Card | Icon | Statement (≤25 words) |
|---|---|---|
| **Removes manual handoffs** | `ArrowRightLeft` | Every pattern eliminates a category of "did you see my message?" coordination work between Microsoft 365 surfaces. |
| **Closes the audit gap** | `ShieldCheck` | Operational events that used to live only in chat now have a structured, correlation-ID'd audit trail. |
| **Composable, not bespoke** | `Blocks` | Each pattern is a scaffold — new automations slot into the same three-layer shape rather than being one-off scripts. |

Footnote: *Designed to layer on top of existing systems like the [wheelchair tracking platform](/work/wheelchair-tracking), not replace them.*

### 5.8 Close (`AeClose.tsx`)

- Single centered block, same shape as `CgClose`:
  - Provocation (display type, ≤14 words): *"Most operations don't need a new platform. They need the existing one to talk to itself."*
  - Below provocation, a short "what production deployment would require" stub list (3 items, mono, muted):
    - `ALM pipeline · solution packaging · environment promotion`
    - `Centralized monitoring · Application Insights · alerting`
    - `Naming standards · DLP policies · CoE oversight`
  - Two CTAs: `← All work` (link `/work`) and `Talk about a similar automation` (use the exact same contact-CTA `href` that `CgClose.tsx` uses for its primary CTA — keep the two close sections in lock-step)

---

## 6. ProjectMeta registry entry

Add to `frontend/src/lib/projects.ts` after the `'clinical-genai-pipeline'` entry:

```ts
'healthcare-automation-engine': {
  slug: 'healthcare-automation-engine',
  title: 'Enterprise Healthcare Workflow Automation Engine',
  status: 'prototype',
  role: 'System design · Power Platform & Azure engineering',
  period: '2025',
  deployment: 'Built prototypes · Microsoft 365 enterprise tenant',
  stack: ['Power Automate', 'Azure Functions', 'Microsoft Graph', 'SharePoint / Lists', 'Webhooks', 'TypeScript'],
  scale: '4 reusable patterns · cross-system orchestration',
},
```

---

## 7. FeaturedWork card update

In `frontend/src/components/home/FeaturedWork.tsx`, the existing `PROJECTS[2]` entry (the automation engine card) is updated in place:

- `status: 'concept'` → `status: 'prototype'`
- `body` copy refined to match the prototype framing. Proposed new body (≤2 sentences, same conversational register as siblings):

  > Power Automate flows, Azure Functions, and webhook orchestration wired into the Microsoft 365 ecosystem — built prototypes of the patterns that turn manual hospital handoffs into event-driven workflows.

- `stack`, `title`, `variant`, `accent`, `wash`, `href`, `TagIcon`, `capabilities` all unchanged

If `frontend/src/components/home/FeaturedWork.test.tsx` asserts on `status` or `body` text for this card, update assertions to match.

---

## 8. Routing for the placeholder

The current `frontend/src/app/work/healthcare-automation-engine/page.tsx` renders `PlaceholderCaseStudy`. Replace its entire body with a composition that mirrors `frontend/src/app/work/clinical-genai-pipeline/page.tsx`:

```tsx
import type { Metadata } from 'next'
import { HomeNav } from '@/components/home/HomeNav'
import { SiteFooter } from '@/components/home/SiteFooter'
import { Reveal } from '@/components/home/Reveal'
import { ProjectMeta } from '@/components/work/ProjectMeta'
import { AeHero } from '@/components/casestudy/automationEngine/AeHero'
// …(remaining Ae* imports)

export const metadata: Metadata = {
  title: 'Enterprise Healthcare Workflow Automation Engine — Lloyd Dela Cruz',
  description:
    'Built Power Automate, Azure Functions, and Microsoft Graph orchestration prototypes for healthcare operations — four reusable patterns that turn manual hospital handoffs into event-driven workflows. Prototypes; not yet at enterprise scale.',
}

export default function Page() {
  return (
    <div className="home2 min-h-screen">
      <HomeNav active="Work" />
      <main>
        <AeHero />
        <ProjectMeta slug="healthcare-automation-engine" />
        <Reveal><AeProblem /></Reveal>
        <Reveal><AeArchitecture /></Reveal>
        <Reveal><AeFlowDemo /></Reveal>
        <Reveal><AePatterns /></Reveal>
        <Reveal><AeReliability /></Reveal>
        <Reveal><AeImpact /></Reveal>
        <AeClose />
      </main>
      <SiteFooter />
    </div>
  )
}
```

The `PlaceholderCaseStudy` component itself is not deleted — other routes may use it.

---

## 9. Accessibility & motion

- All section eyebrows use `<Eyebrow>` (semantic `<p>`, mono, plum)
- Section titles are `<h2>` via `CsSection`
- Flow demo:
  - Respects `usePrefersReducedMotion()` — auto-cycle disabled, demo renders fully expanded on mount
  - Step pills are `<button>` elements with `aria-pressed` reflecting current step
  - Status changes (pending → running → done) announce via an off-screen `aria-live="polite"` region
- Architecture diagram SVG has `role="img"` and an `aria-label` describing the trigger → orchestration → action shape
- No content is conveyed by color alone — every status pill carries text + color + icon

---

## 10. Performance

- All components are server components except `AeFlowDemo` (interactive) and any pattern card with hover-driven expansion. Mark only those as `'use client'`.
- Icons are tree-shakeable Lucide imports
- No runtime API calls; all demo data is local fixtures in `data.ts`
- Static export safe — no dynamic routes, no server actions

---

## 11. Out of scope (explicit)

- A real Power Automate solution package, flow JSON export, or Azure Function source code in this repo
- Embedded Microsoft tenant screenshots or Power Apps screenshots
- A multi-flow gallery — only one flow is walked through interactively (§5.4). Additional flows are described as patterns (§5.5), not animated.
- A separate "concept-to-production roadmap" page — the Close section's 3-item stub list is sufficient signal of that thinking
- Changes to other `/work/*` pages, the `/work` index, or homepage layout beyond the FeaturedWork card status flip and body refresh

---

## 12. Acceptance criteria

- `/work/healthcare-automation-engine` renders 8 sections, no longer shows `PlaceholderCaseStudy`
- `ProjectMeta` aside appears with status `Prototype`, role, period, deployment, stack chips, scale
- Homepage `FeaturedWork` card for this project shows `Prototype` pill (not `Concept`)
- Dev console shows no `ProjectMeta: no registry entry for slug "healthcare-automation-engine"` warning
- Flow demo auto-cycles smoothly through 5 steps and resets; pausing on step click works
- `npm run type-check` and `npm run lint` pass with no new warnings
- `npm run build` succeeds (static export)
- Page renders correctly with `prefers-reduced-motion: reduce` — no animation, fully expanded demo
- All copy adheres to the no-go list in §3
