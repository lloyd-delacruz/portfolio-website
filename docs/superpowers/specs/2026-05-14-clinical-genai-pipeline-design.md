# Clinical GenAI Agent & Analytics Pipeline — Case Study Design

**Date:** 2026-05-14
**Status:** Draft (pending user review)
**Scope:** Add a new featured portfolio project — a designed (not deployed) AI-assisted clinical documentation and analytics pipeline for rehabilitation workflows. Includes a `/work/clinical-genai-pipeline` case study page and a featured-work card on the homepage. Sits as a third Applied-AI sibling to `clinical-risk-engine` and `population-health-intelligence`, in the same warm `home2` register.

---

## 1. Goal

A case study page that positions Lloyd for healthcare data science, applied AI, data engineering, and healthcare-AI roles, demonstrating in one artifact:

- Healthcare domain knowledge (rehab documentation, recovery metrics)
- LLM structured extraction with schema constraints
- Data engineering and PostgreSQL modeling for time-series analytics
- Cost-aware AI system design
- Validation, audit, and human-review patterns appropriate to healthcare

The page must read as **a designed, healthcare-safe, enterprise-grade system** — never as a production medical tool, a diagnostic system, or a replacement for clinicians. All inputs are synthetic; the dashboard is a mock; metric language uses *"designed to"* / *"targets"* / *"the design guarantees"* — never measured numbers that don't exist.

Visually it is **indistinguishable in register** from the other `/work/*` pages (`wheelchair-tracking`, `clinical-risk-engine`, `population-health-intelligence`).

---

## 2. Files added / modified

### Add

```
frontend/src/components/casestudy/clinicalGenai/
  CgHero.tsx
  CgProblem.tsx
  CgArchitecture.tsx
  CgExtractionDemo.tsx       (interactive centerpiece, auto-cycling)
  CgDataModel.tsx
  CgCostAware.tsx
  CgChallenges.tsx
  CgImpact.tsx
  CgClose.tsx
  data.ts                    (synthetic notes + extracted JSON fixtures)

frontend/src/app/work/clinical-genai-pipeline/
  page.tsx
```

### Modify

| Path | Change |
|---|---|
| `frontend/src/components/home/FeaturedWork.tsx` | Add new `PROJECTS[]` entry; add `'extraction'` variant to the `Variant` union and to the `PreviewMock` switch |
| `frontend/src/lib/projects.ts` | Add `'clinical-genai-pipeline'` `ProjectMetaRecord` entry |
| `frontend/src/app/work/page.tsx` | Section partition logic already keys on badge prefix `APPLIED AI`; the new card will join the Applied-AI band automatically. Verify and adjust if not. |

### No deletions.

---

## 3. Visual register (binding)

Use the existing `home2` register exactly as `clinical-risk-engine` uses it:

- **Background:** `var(--cream)`, `var(--cream-2)` for inactive panels, `white` for cards
- **Accent:** `var(--plum)`, `var(--plum-soft)` for active states
- **Status / tone colors:** `var(--green)`, `var(--amber)`, `var(--coral)`, `var(--blue)`
- **Typography:** `font-display` for headings, default body for prose
- **Primitives:** `CsSection`, `Module`, `Chip`, `Eyebrow` from `casestudy/bits.tsx`
- **Motion:** `Reveal` wrapper for section entrance (mirrors `clinical-risk-engine/page.tsx`); auto-cycle interval `1900ms` for the extraction demo
- **Chrome:** `HomeNav active="Work"` + `ProjectMeta slug="clinical-genai-pipeline"` + `SiteFooter`, same wrapper as `clinical-risk-engine/page.tsx`

### Explicit no-go list (binding)

- ❌ No dark backgrounds anywhere on this page
- ❌ No prose paragraph longer than 3 sentences in any section
- ❌ No claims of "X% accurate," "fully automates clinical decisions," "diagnoses patients," "replaces documentation review"
- ❌ No realistic patient names, dates of birth, MRNs, or any data that could be mistaken for PHI. All synthetic content uses `Patient 042` / `Patient A` / generic placeholders, always paired with a "Synthetic example · no PHI" footer chip in the relevant section.
- ❌ No screenshot of a real dashboard (Tableau, Power BI, or otherwise). The analytics view is a mock built from in-page SVG / divs in the same warm-register style.

---

## 4. Page anatomy (9 sections)

The user's spec defines 7 numbered content sections. Adding Hero (entry) and Close (exit), this is a 9-section page — slightly heavier than the 7-section anatomy of the sibling Applied-AI pages, but each section is load-bearing for one of the seven positioning pillars in the spec (domain, architecture, LLM design, data engineering, cost-awareness, engineering challenges, recruiter summary).

| # | Section | Component | Word budget |
|---|---|---|---|
| 1 | Hero | `CgHero` | Subtitle ≤22 words |
| 2 | Problem & clinical context | `CgProblem` | Body ≤80 words across 2 paragraphs; 3 × short callouts |
| 3 | System architecture | `CgArchitecture` | Intro 1 sentence; icon-card body ≤18 words |
| 4 | Extraction in action (live demo) | `CgExtractionDemo` | Step captions ≤30 words each |
| 5 | Database & analytics design | `CgDataModel` | Intro 1 sentence; table descriptions ≤12 words each |
| 6 | Cost-aware LLM design | `CgCostAware` | Card body ≤18 words each |
| 7 | Engineering challenges | `CgChallenges` | Challenge body ≤25 words each |
| 8 | Recruiter-facing summary (impact) | `CgImpact` | Metric captions ≤8 words |
| 9 | Close | `CgClose` | 1-line provocation |

---

## 5. Section specs

### 5.1 Hero (`CgHero.tsx`)

- Eyebrow chip: `Applied AI · Clinical Documentation`
- Title: `Clinical GenAI Agent & Analytics Pipeline`
- Subtitle: *Designed to turn messy dictated rehab notes into structured recovery metrics — with validation, audit, and human review built in.*
- Primary CTA: `See the extraction demo` → `#demo`
- Secondary CTA: `Start from the problem` → `#problem`
- META 4-up:
  - Role · System design · Applied AI
  - Inputs · Synthetic rehab notes
  - Output · Analytics-ready recovery metrics
  - Status · Prototype design
- Right glyph: 4 small icon nodes (`Mic` → `Cpu` → `Brain` → `Database`) connected by a faint plum signal line. Composed inline as SVG (no separate file).

### 5.2 Problem & clinical context (`CgProblem.tsx`)

- Eyebrow: `01 · Problem`
- Title: `Recovery data is trapped inside free text.`
- Body (≤80 words):
  > Rehab documentation is largely dictated and free-text. Abbreviations, incomplete sentences, and inconsistent terminology mean recovery progress sits in prose, not in structured fields a team can analyze.
  >
  > Manual review of those notes is slow and inconsistent. Operational and clinical teams can't easily compare patient progress, visit outcomes, or therapy indicators across sites or time.
- 3 icon callouts (`size={17}`, color `var(--plum)`):
  - `FileText` · Free-text dictation
  - `BarChart3` · No structured analytics
  - `Clock` · Slow manual review
- Footnote: *Lloyd worked 9+ years inside hospital rehab and clinical operations — the documentation patterns and workflow constraints are first-hand domain knowledge.*

### 5.3 System architecture (`CgArchitecture.tsx`)

- Eyebrow: `02 · System architecture`
- Title: `From dictation to dashboard, with humans in the loop.`
- Intro: *A pipeline that respects clinical context — validation gates, audit logs, and a review queue before anything goes downstream.*

**Spine (8 stages, last is primary):**

| Stage | Icon | Label | Sub |
|---|---|---|---|
| 1 | `Mic` | Dictated note | React intake |
| 2 | `Cpu` | FastAPI | Python orchestration |
| 3 | `ShieldCheck` | Preprocess | De-identification + chunking |
| 4 | `Brain` | LLM extraction | Schema-constrained output |
| 5 | `CheckCircle2` | Validation | Rules + confidence thresholds |
| 6 | `Database` | PostgreSQL | Time-series + audit log |
| 7 | `Users` | Review queue | Low-confidence routing |
| 8 (primary) | `BarChart3` | **Analytics** | Recovery trends + KPIs |

**Reads downstream chips:**
`Recovery KPIs` · `Time-series trends` · `Audit trail` · `Review backlog`

**Layer cards (4-up grid, white, ghair, soft-shadow-sm):**

- **Cpu · Backend** — FastAPI + Pydantic. Async orchestration; every stage gates the next.
- **ShieldCheck · Privacy** — De-identification layer strips identifiers before any model call. Synthetic data only in this build.
- **Brain · LLM layer** — Schema-constrained extraction with confidence scoring; structured outputs reduce retries.
- **Database · Storage** — PostgreSQL with normalized recovery metrics, time-series observation table, and an append-only audit log.

Footnote on the section: *Designed pipeline. No real patient data; all examples are synthetic.*

### 5.4 Extraction in action (`CgExtractionDemo.tsx`) — interactive centerpiece

- Eyebrow: `03 · Extraction in action`
- Title: `Watch a messy note become structured data.`
- Intro: *Three stages, one synthetic note. Step through it or let it run.*
- Footnote: *Interactive prototype · synthetic example · no PHI.*

**Three zones (same shape as `CrTriageDemo` / `WcWorkflowDemo`):**

- **Zone 1 — DICTATED NOTE**: a styled "note card" showing one of three synthetic dictated rehab notes (selected via dropdown). Mono-ish typography for the note body. Header shows `Patient 042 · synthetic · session 04`.
- **Zone 2 — STRUCTURED EXTRACTION**: a JSON-styled panel showing the LLM's structured output for that note. Fields appear with their values + a small confidence chip per field (green ≥0.85, amber 0.6–0.85, coral <0.6). Fields visible: `mobility_level`, `assistance_required`, `gait_distance_m`, `pain_score`, `therapy_tolerance`, `discharge_readiness`.
- **Zone 3 — VALIDATION & ROUTING**: two stacked sub-panels:
  - **Validation rules pass/fail strip** (green / amber / coral pills): schema valid, ranges valid, required fields present, confidence threshold met
  - **Routing decision** card: either `→ PostgreSQL` (green tone, all checks passed) or `→ Review queue` (amber tone, with a one-line reason like "Low confidence on `discharge_readiness`")

**Auto-cycle steps (loop every 1900ms when playing):**

1. **Note 1 — Clean note** (Patient 042): all fields high-confidence, validation green, routes to PostgreSQL. Establishes the happy path.
2. **Note 2 — Ambiguous note** (Patient A): mixed confidence; `discharge_readiness` lands at coral, routes to **Review queue**. Load-bearing visual moment — shows the human-review pattern.
3. **Note 3 — Incomplete note** (Patient B): missing required field `gait_distance_m`; validation surfaces an amber "missing required field" chip and routes to **Review queue**.

**Behavior contract:**
- Default `playing === true` UNLESS `usePrefersReducedMotion()` returns true
- Clicking a step pill or the dropdown pauses auto-cycle (`setPlaying(false)`)
- `▶ Run loop` / `↺ Reset` controls match `CrTriageDemo`
- Active zone uses `background: var(--plum-soft)` + `border: rgba(109,40,217,0.25)`; inactive zones use `var(--cream-2)` + `var(--line)`
- Transitions via `transition-all duration-300`

**Data fixtures (`data.ts`):**

Three hand-authored synthetic note objects, each with:
- `noteText: string` (50–80 words of plausible dictated rehab prose, fully synthetic)
- `extracted: Record<FieldKey, { value: unknown; confidence: number }>` (six fields)
- `validation: { rule: string; status: 'pass' | 'warn' | 'fail'; detail?: string }[]`
- `routing: { destination: 'postgres' | 'review'; reason?: string }`

No model call is made at runtime — all values are pre-computed fixtures. This keeps the demo deterministic and removes any API-key/cost surface from the static export.

### 5.5 Database & analytics design (`CgDataModel.tsx`)

- Eyebrow: `04 · Data model & analytics`
- Title: `Time-series recovery, modeled for analysis.`
- Intro: *Normalized observation tables, append-only audit, and a review queue — designed so recovery trends are a query, not a project.*

**Two-part layout:**

**Part A — Schema grid (6 table cards in a 3×2 grid, white, ghair, soft-shadow-sm):**

Each card: small icon tile (plum-soft bg) + table name (font-mono small) + one-line description + 3–4 column chips.

| Table | Description | Columns shown |
|---|---|---|
| `patients_demo` | Demographic anchor (synthetic) | `id`, `cohort`, `enrolled_at` |
| `rehab_notes` | Raw dictated note bodies | `id`, `patient_id`, `dictated_at`, `source` |
| `extracted_metrics` | Per-note structured output | `note_id`, `field`, `value`, `confidence` |
| `metric_observations` | Time-series flatten of metrics | `patient_id`, `metric`, `value`, `observed_at` |
| `extraction_audit_log` | Append-only audit trail | `note_id`, `stage`, `model_version`, `tokens`, `at` |
| `review_queue` | Routed low-confidence extractions | `note_id`, `reason`, `status`, `routed_at` |

Subtle FK arrow glyphs between cards (dashed plum, low opacity) — `rehab_notes → extracted_metrics → metric_observations`, `rehab_notes → audit_log`, `rehab_notes → review_queue`.

**Part B — Analytics mock panel (one Module spanning full width):**

Header: `Recovery trends · Patient 042 · synthetic`. Inside:
- 4 KPI cards across the top (`Avg pain score`, `Gait distance Δ`, `Therapy tolerance`, `Discharge readiness`) — small numeric values, plum trend arrows
- A spark-line chart placeholder (SVG, ~60px tall) showing a synthetic recovery curve over 8 sessions, with the trend line in plum
- A filter chip strip below: `Cohort · ortho post-op` · `Session range · 1–8` · `Confidence ≥ 0.6`

No real charts library — pure inline SVG, matching the existing site-mock aesthetic in `PreviewMock`.

Footnote: *Mock dashboard — synthetic data. The real pipeline targets Tableau or Power BI as the analytics surface.*

### 5.6 Cost-aware LLM design (`CgCostAware.tsx`)

- Eyebrow: `05 · Cost-aware design`
- Title: `Engineered for fewer, cheaper calls.`
- Intro: *Token cost is a design constraint, not an afterthought.*

**4 cards (2×2 grid on desktop, stacked on mobile):**

| Icon | Title | Body |
|---|---|---|
| `Scissors` | Prompt compression | Strip filler, normalize abbreviations, drop redundant context before the call. |
| `Database` | Caching repeated patterns | Hash-keyed cache for recurring note shapes — same input, no second call. |
| `Layers` | Split extraction from validation | Validation runs on structured output, not by re-prompting the model. |
| `FileJson` | Schema-constrained output | Structured outputs cut retries; malformed responses are caught at parse, not by another call. |

Footnote: *Design choices, not measured savings. The pipeline is designed to reduce unnecessary token usage and repeated model calls.*

### 5.7 Engineering challenges (`CgChallenges.tsx`)

- Eyebrow: `06 · Engineering challenges`
- Title: `Where the work actually was.`
- Intro: *Five concrete problems this pipeline is built to handle.*

**5 challenge cards (responsive grid: 1 col mobile, 2 cols tablet, 3 cols desktop with last row centered or 5-up at xl):**

Each card: small numbered tag in plum-soft, font-display title, 1–2 sentence body.

| # | Title | Body |
|---|---|---|
| 01 | Messy clinical language | Dictated notes contain abbreviations, incomplete sentences, and inconsistent phrasing. The extractor has to be tolerant without inventing data. |
| 02 | Data integrity | Invalid or missing metrics are flagged before being stored. Validation gates run on every extraction. |
| 03 | Analytics readiness | Free-text recovery descriptions become normalized metrics suitable for time-series analysis. |
| 04 | LLM cost control | Caching, compressed prompts, and structured outputs are layered to reduce unnecessary API calls. |
| 05 | Human review | Low-confidence extractions route to a review queue. The pipeline never treats unsure as fact. |

### 5.8 Recruiter-facing summary (`CgImpact.tsx`)

- Eyebrow: `07 · What this demonstrates`
- Title: `One project, eight capabilities.`
- Intro: *Designed end-to-end so each layer is legible in isolation.*

**Capability chip grid (8 plum chips with icons, 4 per row on desktop):**

`Healthcare AI` · `Healthcare data engineering` · `Clinical workflow understanding` · `PostgreSQL modeling` · `Python backend (FastAPI)` · `LLM system design` · `Analytics dashboarding` · `Responsible AI design`

**3 stat-style cards below:**

| Top line | Caption |
|---|---|
| `9+ yrs` | Hospital rehab + clinical operations background |
| `8 stages` | End-to-end pipeline, designed with human-in-the-loop |
| `0 PHI` | Synthetic data only — privacy-aware design |

Operator chip strip: `Rehab clinics` · `Therapy networks` · `Healthcare AI teams`

### 5.9 Close (`CgClose.tsx`)

- Provocation: *Documentation that knows when to ask for a human.*
- `← All work` link

---

## 6. Homepage card (`FeaturedWork.tsx`)

**New entry in `PROJECTS[]`** (inserted between the existing Population-Health and Clinical Risk entries to keep the three Applied-AI cards visually grouped — alternative is appended at end; final order at implementation time):

```ts
{
  badge: 'APPLIED AI / CLINICAL DOCUMENTATION',
  TagIcon: FileText,             // import from lucide-react
  variant: 'extraction',          // new variant
  accent: 'var(--plum)',
  wash: 'linear-gradient(135deg,#f3f0fb,#fbf7fe)',
  title: 'Clinical GenAI Agent & Analytics Pipeline',
  body: 'AI-assisted rehab documentation pipeline that converts messy dictated therapy notes into structured recovery metrics and analytics-ready data — with validation, audit, and human review built in.',
  stack: 'FastAPI, Python, PostgreSQL, LLMs, React, TypeScript',
  href: '/work/clinical-genai-pipeline',
  status: 'prototype',
  capabilities: ['ai-assisted', 'case-study'],
}
```

**New `'extraction'` variant in `PreviewMock`** (same h-40 mockup region as the other variants):

Layout: a small "note line" on the left (3 short bars indicating prose), an arrow, then a small JSON-like panel on the right (3 key:value rows where the values are colored plum bars and one bar gets a small green confidence tick). Optionally a small DB icon glyph in the bottom corner. Pure CSS/SVG, ~25 lines like the existing variants.

This matches the aesthetic of `triage` and `forecast` variants — abstract, semantic, no realistic UI screenshots.

---

## 7. `projects.ts` registry entry

```ts
'clinical-genai-pipeline': {
  slug: 'clinical-genai-pipeline',
  title: 'Clinical GenAI Agent & Analytics Pipeline',
  status: 'prototype',
  role: 'System design · Applied AI engineering',
  period: '2025',
  deployment: 'Designed pipeline · synthetic data only',
  stack: ['FastAPI', 'Python', 'PostgreSQL', 'LLM structured outputs', 'React', 'TypeScript'],
  scale: '8-stage pipeline · 6 tables · synthetic notes',
}
```

`ProjectMeta` will render this strip immediately under the hero, matching the other case studies.

---

## 8. Testing

- **Type-check + lint + build** must pass.
- **Visual smoke test:** dev server visit to `/work/clinical-genai-pipeline` confirms:
  - Page renders in `home2` register (warm cream background, plum accents)
  - 9 sections appear in order with `Reveal` entrance animations
  - Extraction demo auto-cycles through 3 synthetic notes every 1900ms
  - Clicking a step pauses auto-cycle; `↺ Reset` returns to step 1
  - Active zone uses plum-soft background; inactive zones use cream-2
  - Homepage `/` shows the new card in the Applied-AI grid; card preview mock renders in the new `'extraction'` variant
- **No unit tests required** — the demo is fixture-driven (no business logic outside the fixtures); rendering is visual.

---

## 9. Out of scope (explicit)

- No real LLM API integration. The demo runs entirely off pre-computed fixtures in `data.ts`.
- No real Tableau or Power BI embed. The dashboard is a mock built from inline SVG/divs.
- No FastAPI service code — this is a design case study, not a deployed system. The architecture spine and table schema are illustrative.
- No de-identification implementation. The privacy story is in the *design*, not in working code.
- No content-management plumbing (no MDX entry) — the page is a hand-coded React component tree, consistent with the other `/work/*` pages.

---

## 10. Open implementation questions (deferred to plan)

1. **Card ordering in `FeaturedWork.PROJECTS`** — insert between Population-Health and Clinical-Risk, or append at end? Either preserves the partition logic in `/work` page. Recommendation: append at end so existing card order is undisturbed; let the `/work` Applied-AI band carry the grouping.
2. **`extraction` variant glyph specifics** — exact mark positions are a 30-minute fiddle; pick at implementation time with the other variant glyphs in side-by-side view.
3. **Mobile collapse of the 8-stage spine** — `flex-col lg:flex-row` works for 4 stages (sibling pages) but may be tall for 8. Recommendation: 2-row grid on mobile (4+4) with arrows between members of each row and a down-arrow between rows. Decide at implementation when the layout is in front of you.
4. **`CgChallenges` 5-card grid layout at `lg`** — 3+2 with the bottom row centered vs. 5-across. Recommendation: 3+2 centered; 5-across feels cramped at the current container width.
