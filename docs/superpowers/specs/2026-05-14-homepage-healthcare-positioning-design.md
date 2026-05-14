# Homepage Healthcare-Positioning Redesign — Design Spec

**Date:** 2026-05-14
**Scope:** Reposition the homepage (only) for U.S. healthcare-tech and local Vancouver healthcare-tech recruiters. Copy + capability section structure + featured-work composition. Visual register and existing components stay intact.

---

## Why this spec exists

Earlier today the homepage hero was deliberately broadened to "AI Systems Architect — capability-first, healthcare as evidence, not identity." This spec reverses that on the **homepage only**, in service of a targeted job hunt for healthcare-operations + technical-systems roles.

The About page register stays in the broader "operational systems" framing established in `docs/superpowers/specs/2026-05-13-homepage-ai-architect-evolution-design.md` — see [[positioning-pivot-architect]] for context on the prior pivot. The two surfaces serve different audiences:

- **Homepage** = healthcare-operations recruiter funnel (this spec).
- **About** = broader operational-systems narrative (unchanged).

Project-meta, blog frontmatter, and other surfaces are out of scope for this spec.

## Audience

Recruiters and hiring managers at:
- U.S. healthcare-tech employers (Epic, Notable, Abridge, Suki, Innovaccer, Commure, Hippocratic, Tennr, etc.) and major U.S. health systems.
- Local Vancouver / Canadian healthcare-tech employers and consultancies.

The homepage should make recruiters in either market immediately understand: *9 years inside hospital operations + MSc Data Science + ships real operational systems*.

## Visual register — unchanged

Cream `#fbfaf8`, plum `#6d28d9`, Plus Jakarta Sans display, soft shadows, 1px hairline borders, light theme only, all scoped under `.home2`. See [[homepage-paper-register]]. No new components, no new global styles, no new fonts. Only the **content** and **shape of the Capabilities section** change.

---

## Section-by-section changes

### 1. `HomeHero` — copy rewrite (component shape unchanged)

Same two-column layout, same `SystemArchitectureSketch` on the right, same animation classes, same CTA buttons. Only the copy strings change.

| Slot | New copy |
|---|---|
| Eyebrow | `Healthcare Operations · Data & AI Systems` |
| Headline | `Operational healthcare systems, engineered from inside the workflow.` (gradient `grad-plum-text` scoped to `inside the workflow.`) |
| Subheadline | `9 years inside hospital operations, an MSc in Data Science, and the analytics, AI, and applications clinical teams actually use — SQL, Python, R, Tableau / Power BI, LLM workflows, and full-stack systems on Next.js, FastAPI, and PostgreSQL.` |
| Status line | `Vancouver, BC · Open to healthcare data, analytics, AI, and application engineering roles — remote, hybrid, or on-site · Currently running a multi-site hospital equipment-tracking and analytics system in production` |
| Primary CTA | `See the production system →` (unchanged target: `/work/wheelchair-tracking`) |
| Secondary CTA | `Core capabilities →` (changed target: `#core-capabilities` anchor on the new Capabilities section) |

The right-column `SystemArchitectureSketch` is unchanged.

### 2. `BuiltWithRow` — stack list expanded

The `AI_TOOLS` array is unchanged. The `STACK` array is replaced to surface the full healthcare-relevant stack mentioned in the brief:

```
SQL · Python · R · Tableau · Power BI · Next.js · TypeScript · FastAPI · PostgreSQL · Power Platform · Microsoft Lists · QR / barcode workflows
```

Layout, dividers, and styling are unchanged. The flex-wrap container will accommodate the longer list.

### 3. `ProductionIndicators` — availability line rewrite

The four metric cells stay structurally the same. Two textual changes:

- Metric 3: `10+ Years in healthcare operations` → `9+ Years in healthcare operations`. Brief states 9+ explicitly; aligning language across surfaces.
- Metric 4 label: `Wheelchair tracking — in production since` → `Equipment-tracking system live since` (matches the rebranded anchor name; keeps `Aug 2025` value).

The right-side availability block is rewritten:
- `Currently available` (unchanged green-dot label)
- `Vancouver, BC · open to healthcare data, AI, and engineering roles — remote, hybrid, or on-site` (replaces existing one-liner)
- `Start a conversation →` link unchanged.

### 4. `Capabilities` — restructured to a 4-cluster 2×2 grid

The current 5-card single-row layout is replaced by a 4-card 2×2 grid (lg+: 2 columns; md: 2 columns; sm: 1 column). Each card displays the cluster title plus its sub-skills as a bulleted list (sub-skills visible on the homepage — not hidden behind a click-through).

Section anchor id added: `id="core-capabilities"` — referenced by the hero's secondary CTA.

Section header copy:
- Eyebrow: `Core capabilities` (replaces `What I do`)
- Heading: `Built across the stack hospitals run on.` (replaces `What I actually build.`)
- Subhead: `Four capability clusters — built on real clinical operations.`
- "View all projects" right-aligned link is removed from this section (it remains on FeaturedWork below).

Cards (top-left, top-right, bottom-left, bottom-right):

**Clinical Operations Intelligence** — icon: `Stethoscope`, tint: `var(--plum)`, bg: `var(--plum-soft)`
- Hospital workflow optimization
- Rehabilitation operations
- Equipment tracking systems
- Operational analytics

**Applied AI & Data Systems** — icon: `Brain`, tint: `var(--plum-deep)`, bg: `#ede9fe`
- SQL · Python · R
- Prompt engineering · LLM workflows
- Structured data extraction
- AI-assisted automation

**Analytics & Visualization** — icon: `LineChart`, tint: `var(--amber)`, bg: `#fef3c7`
- Tableau · Power BI
- Time-series analytics
- KPI & operational reporting
- Data storytelling

**Application Development** — icon: `Boxes`, tint: `var(--green)`, bg: `#d1fae5`
- React · Next.js · TypeScript
- FastAPI · PostgreSQL
- Cloud deployment
- Production-grade UX

The cards are not click-through links (the prior layout linked each card to a specific project; the new layout shows sub-skills inside the card and does not need per-card linking). Cards render as `<div>` not `<Link>`; the `lift` hover class is dropped since cards are no longer interactive. The `ghair` hairline border styling is kept for visual consistency with the rest of the page.

### 5. `EngineeringLoop` — **untouched**

Per user direction, this section is preserved exactly as it stands today: copy, eyebrow, heading, subhead, the 5×2 desktop decision-tree diagram, the mobile stacked layout, the `anim-float` and `flow-line` animations, the screen-reader linearization. The user will edit this section separately later.

This includes the existing `id="ai-workflow"` anchor, which the homepage hero used to reference; no callers point to it from this redesign.

### 6. `FeaturedWork` — composition restructured

The `PROJECTS` array (top of `FeaturedWork.tsx`) is reduced from 5 entries to 4 entries, in this order:

1. **Multi-Site Hospital Equipment Tracking & Analytics System** (anchor — replaces "Multi-Site Wheelchair Tracking System")
2. **Clinical GenAI Agent & Analytics Pipeline** (new placeholder)
3. **Enterprise Healthcare Workflow Automation Engine** (new placeholder)
4. **SpendWise** (kept, repositioned)

The anchor still surfaces above the grid via `AnchorCase`. The grid below renders the three remaining cards (`gridProjects = PROJECTS.filter(p => p.href !== ANCHOR_CASE_HREF)`).

`ANCHOR_CASE_HREF` stays `/work/wheelchair-tracking`; the anchor card is rebranded but the underlying case study URL is unchanged.

Removed from `PROJECTS` (no longer rendered on the homepage; the underlying `/work/*` pages stay accessible via `/work`):
- `Population-Health Intelligence Platform`
- `Clinical Risk Engine`
- `EquiTrackr`

The `/work` index page is out of scope for this spec — it should still surface every project via its existing data source.

#### Anchor — `AnchorCase` rebrand

The component file stays `AnchorCase.tsx`. Copy changes:

| Slot | New copy |
|---|---|
| Eyebrow pill | `Anchor system · Production deployment` (replaces `Anchor case · Enterprise deployment`) |
| Title | `Multi-Site Hospital Equipment Tracking & Analytics System` |
| Body | `Production healthcare-operations platform deployed across 4 hospital sites — 800+ tracked assets coordinated through QR / barcode workflows, lifecycle visibility, operational analytics, and real-time chain-of-custody.` |
| Bullets | `Multi-site coordination across 4 hospitals` · `QR / barcode workflows for intake, dispatch, and return` · `Operational analytics on utilization, dwell time, and rotation` · `Lifecycle visibility from acquisition to retirement` |
| Stack | `Power Platform · Microsoft Lists · React · TypeScript · QR / barcode workflows · operational analytics` |
| CTA | `Read the case study →` (unchanged target) |

The right-column deployment-flow diagram and micro-stats are unchanged.

#### Grid card 1 — Clinical GenAI Agent & Analytics Pipeline (placeholder)

```
badge:        'APPLIED AI + DATA ENGINEERING'
TagIcon:      Brain (lucide-react)
variant:      'forecast' (reuse existing PreviewMock variant)
accent:       'var(--plum)'
wash:         'linear-gradient(135deg,#f3f0fb,#fbf7fe)'
title:        'Clinical GenAI Agent & Analytics Pipeline'
body:         'Structured LLM outputs, prompt chaining, and analytics pipelines feeding a normalized PostgreSQL schema — with token-cost optimization for production healthcare AI workflows.'
stack:        'Python · LLM workflows · structured output · PostgreSQL · prompt-chain orchestration'
href:         '/work/clinical-genai-pipeline'   (new placeholder route — see "Placeholder routes" below)
status:       'concept'
capabilities: ['ai-assisted', 'case-study']
```

#### Grid card 2 — Enterprise Healthcare Workflow Automation Engine (placeholder)

```
badge:        'CLOUD AUTOMATION + EVENT-DRIVEN SYSTEMS'
TagIcon:      Workflow (lucide-react)
variant:      'topology' (reuse existing PreviewMock variant)
accent:       'var(--blue)'
wash:         'linear-gradient(135deg,#eef4fe,#f5f8fe)'
title:        'Enterprise Healthcare Workflow Automation Engine'
body:         'Power Automate, Azure Functions, and webhook orchestration wired into the Microsoft enterprise ecosystem — real-time healthcare workflow automation and operational alert systems for clinical and operations teams.'
stack:        'Power Automate · Azure Functions · webhook orchestration · Microsoft Graph · operational alert systems'
href:         '/work/healthcare-automation-engine'   (new placeholder route — see "Placeholder routes" below)
status:       'concept'
capabilities: ['case-study']
```

#### Grid card 3 — SpendWise (repositioned)

The existing `SpendWise` entry stays in the array. Two textual changes:

- Badge: `FINTECH & PLANNING` → `FULL-STACK PRODUCT ENGINEERING`
- Body: `AI-native budgeting and financial planning platform focused on operational budgeting, transaction tracking, onboarding flows, and intelligent financial planning.` → `Full-stack product platform demonstrating scalable application architecture, data modeling, and polished UX systems — a deliberate non-healthcare proof point for product-engineering breadth.`

Variant, accent, wash, stack, href, status, capabilities are all unchanged.

#### Section header copy

Eyebrow: `Featured work` (unchanged).
Add a new sub-line directly under the eyebrow row:
> `A deliberate progression: real healthcare operations · applied AI & data engineering · enterprise automation · product-engineering breadth.`

`View all projects →` link in the top-right of the section is unchanged.

### 7. `FooterCTA` — copy rewrite

Same gradient-banner component, same socials, same CTA button. Two textual changes:

| Slot | New copy |
|---|---|
| Heading | `Let's build the next healthcare system.` (gradient `grad-plum-text` scoped to `healthcare system.`) |
| Body paragraph | `I'm running a multi-site hospital equipment-tracking and analytics system in production, and I'm open to healthcare data, AI, and application engineering roles — remote, hybrid, or on-site. The best way in is a short conversation.` |

Button label `Start a conversation →` and target `/contact` are unchanged.

### 8. `HomeNav`, `SiteFooter`, `Reveal`

No changes.

---

## Component-level summary

| Component | Change type |
|---|---|
| `HomeHero.tsx` | Copy strings only (eyebrow, headline, sub, status, secondary CTA target). Same component shape. |
| `BuiltWithRow.tsx` | `STACK` array updated. Same layout. |
| `ProductionIndicators.tsx` | One metric label + one metric value changed; availability paragraph rewritten. Same layout. |
| `Capabilities.tsx` | Restructured: 4-card 2×2 grid with sub-skill bullets. New data shape. New section anchor `id="core-capabilities"`. |
| `EngineeringLoop.tsx` | **Unchanged.** |
| `FeaturedWork.tsx` | `PROJECTS` array reduced from 5 → 4; SpendWise badge + body rewritten; two new placeholder entries. New section sub-line under the eyebrow. |
| `AnchorCase.tsx` | Eyebrow + title + body + bullets + stack copy rewritten. Same component shape. |
| `FooterCTA.tsx` | Heading + body copy rewritten. Same component shape. |
| `app/page.tsx` | Unchanged (component composition stays the same). |

### Placeholder routes for the two new featured-work cards

To avoid a 404 when a recruiter clicks a placeholder card, two new minimal route files are added that mirror the existing pattern at `frontend/src/app/work/website-gemms/page.tsx` and `frontend/src/app/work/apex-protocol/page.tsx`:

- `frontend/src/app/work/clinical-genai-pipeline/page.tsx` — renders `<PlaceholderCaseStudy>` with title `Clinical GenAI Agent & Analytics Pipeline` and a short "in design" message.
- `frontend/src/app/work/healthcare-automation-engine/page.tsx` — renders `<PlaceholderCaseStudy>` with title `Enterprise Healthcare Workflow Automation Engine` and a short "in design" message.

The implementation plan should copy the existing placeholder-page pattern verbatim and only swap the title and description strings.

## Things explicitly out of scope

- About page, About sub-sections (`AboutHero`, `AboutSkills`, etc.) — keep current "operational systems" register.
- Project meta on `/work/*` detail pages — case-study copy unchanged.
- `/work` index, blog frontmatter, social/SEO meta tags.
- Any visual register changes (colors, fonts, shadows, animations).
- The `EngineeringLoop` section's diagram, copy, and animations.
- Adding a contact form, CV download, or new pages.

## Acceptance criteria

A reader landing on `/` for the first time should be able to answer, within 8 seconds:

1. *Does this person have real healthcare operational experience?* — Yes (hero subheadline, ProductionIndicators "9+ Years in healthcare operations", anchor system).
2. *Can they actually build technical systems?* — Yes (hero subheadline tool list, Capabilities 4-cluster grid, FeaturedWork progression, EngineeringLoop discipline).
3. *Are they shipping anything real?* — Yes (anchor band: 4 sites, 800+ assets, production since Aug 2025).
4. *Are they reachable / available?* — Yes (status line in hero, ProductionIndicators availability block, FooterCTA).

Recruiter test: a healthcare-tech recruiter who scans only the hero + Capabilities grid + FeaturedWork anchor should see operational depth + analytics + AI + applications without scrolling further.

## Implementation notes

- All edits are local to `frontend/src/components/home/*` and `frontend/src/components/home/AnchorCase.tsx`.
- No new dependencies, no new design tokens, no new fonts, no new animations.
- Existing tests (`HomeHero.test.tsx`, `BuiltWithRow.test.tsx`, `EngineeringLoop.test.tsx`, `ProductionIndicators.test.tsx`, `SystemArchitectureSketch.test.tsx`) should be reviewed for any string-assertion failures and updated to the new copy. No new test files are required by this spec, but the implementation plan should call out which existing tests need updates.
- Run `npm run lint` and `npm run type-check` before claiming done.
- Verify the running dev server (`npm run dev` on port 3001) renders the changes correctly at all three breakpoints (mobile, md, lg).

---

Related: [[homepage-paper-register]], [[positioning-pivot-architect]], [[credibility-program]].
