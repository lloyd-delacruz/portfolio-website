# Applied AI Deep Dives — Warm-Register Rebuild

**Date:** 2026-05-13
**Status:** Approved for implementation planning
**Supersedes:** `2026-05-13-applied-ai-system-deep-dives-design.md` (dark-register design — explicitly retired per user redirect)
**Scope:** Rebuild the two Applied-AI project deep-dive pages in the warm `home2` cream/plum register matching `wheelchair-tracking`. Less prose, more diagrams/icons, prominent interactive prediction surfaces. Reorder `/work` page so Applied-AI lands after the existing 4 project tiles.

---

## 1. Goal

Two project deep-dive pages — `/work/population-health-intelligence` and `/work/clinical-risk-engine` — visually indistinguishable in register from the other `/work/*` pages, with these explicit characteristics:

- **Warm cream/plum register** matching `wheelchair-tracking`. No dark surface. No mono headlines as content. No accent cyan.
- **Less prose** — section-level word budgets enforced. Icons + diagrams + chip strips do most of the communication.
- **Interactive prediction centerpiece** per page — auto-cycling demo with manual override, mirroring the `WcWorkflowDemo` pattern.
- **Section order on `/work`** — Operational platforms band first, then Applied AI systems band below it.

The pages must read as siblings to `wheelchair-tracking`, not as a different aesthetic species.

---

## 2. Scope: deletions and additions

### Delete (clean break)

| Path | Reason |
|---|---|
| `frontend/src/components/work/deep-dive/` (entire directory) | Dark-register components, no longer used. 12 components + CSS + barrel. |
| `frontend/src/components/work/population-health/ScenarioConsole.tsx` | Replaced by warm-register `PhForecastDemo` |
| `frontend/src/components/work/clinical-risk/CaseTriagePanel.tsx` | Replaced by warm-register `CrTriageDemo` |
| `@import` line for `deep-dive.css` in `frontend/src/app/globals.css` | Register is gone |

### Keep (no changes)

- `frontend/src/components/work/population-health/surrogate.ts` + `surrogate-data.json` + Vitest tests (5 tests, all pass) — pure logic
- `frontend/src/components/work/clinical-risk/surrogate.ts` + `wdbc-surrogate.json` + `wdbc-cases.json` + Vitest tests (7 tests, all pass) — pure logic
- `frontend/src/components/home/SystemsToolchain.tsx` retargeted links (already point at `/work/<slug>`)

### Modify

- `frontend/src/app/work/page.tsx` — swap section order so Operational platforms comes before Applied AI
- `frontend/src/components/home/FeaturedWork.tsx`:
  - Retune the two Applied-AI tiles' `wash` from dark to warm plum: `linear-gradient(135deg,#f3f0fb,#fbf7fe)`
  - Change their `accent` from `#7DD3FC` to `var(--plum)`
  - Repaint the `ForecastMockup` and `TriageMockup` mini-mockups for the warm register (white card backgrounds, plum data, muted ink) — same shape, light palette
- `frontend/src/app/dashboards/life-expectancy/page.tsx` — replace `<MovedTo>` (deleted) with an inline 30-line warm-register shim. Same UX, no shared primitive needed.
- `frontend/src/app/work/population-health-intelligence/page.tsx` — full rewrite using new `casestudy/popHealth/` components
- `frontend/src/app/work/clinical-risk-engine/page.tsx` — full rewrite using new `casestudy/clinicalRisk/` components

### Add — mirror `casestudy/wheelchair/` exactly

```
frontend/src/components/casestudy/
  bits.tsx                    (existing — reuse)
  wheelchair/                  (existing — unchanged)
  popHealth/                   (NEW)
    PhHero.tsx
    PhProblem.tsx
    PhArchitecture.tsx
    PhForecastDemo.tsx         (interactive centerpiece; uses surrogate.ts)
    PhImpact.tsx
    PhFutureAI.tsx
    PhClose.tsx
  clinicalRisk/                (NEW)
    CrHero.tsx
    CrProblem.tsx
    CrArchitecture.tsx
    CrTriageDemo.tsx           (interactive centerpiece; uses surrogate.ts)
    CrImpact.tsx
    CrFutureAI.tsx
    CrClose.tsx
```

---

## 3. Visual register (binding)

Use the existing `home2` register exactly as `wheelchair-tracking` uses it:

- **Background/surface:** `var(--cream)`, `var(--cream-2)` for inactive panels, `white` for cards
- **Accent:** `var(--plum)`, `var(--plum-soft)` for active states
- **Status colors:** `var(--green)`, `var(--amber)`, `var(--coral)`, `var(--blue)` from existing palette
- **Typography:** `font-display` for headings, default body for prose
- **Cards:** `Module` (white bg, `ghair` 1px border, `soft-shadow-sm`)
- **Chips:** `Chip` from `casestudy/bits.tsx` (`plum | green | amber | blue | coral | neutral` tones)
- **Eyebrows:** `Eyebrow` from `bits.tsx` (plum, uppercase, tracking-[0.18em])
- **Sections:** `CsSection` from `bits.tsx` (eyebrow + title + intro + children + optional footnote)
- **Motion:** the existing `anim-rise` keyframe for hero entrance, `transition-all duration-300` for state changes. Auto-cycle interval `1900ms` matches `WcWorkflowDemo`.

### Explicit no-go list (binding)

- ❌ No dark backgrounds anywhere on these pages
- ❌ No `dd-mono` or other dark-register utility classes (all gone, but listing for clarity)
- ❌ No purple-cyan gradients
- ❌ No mono prose (mono allowed only for inline numerics where it aids readability — e.g., latency `<50ms` figures inside metric cards)
- ❌ No prose paragraph longer than 3 sentences in any section
- ❌ No accuracy/precision/recall leaderboard tables as headline content (impact metrics OK; raw confusion matrices not OK)

---

## 4. Shared page anatomy (7 sections, identical spine for both)

Both pages compose this exact 7-section flow in the `home2` register. Each section maps to one component in `casestudy/popHealth/` or `casestudy/clinicalRisk/`.

| # | Section | Component | Word budget |
|---|---|---|---|
| 1 | **Hero** | `PhHero` / `CrHero` | Subtitle ≤20 words |
| 2 | **Problem** | `PhProblem` / `CrProblem` | Body ≤80 words across 2 paragraphs; 3 × 4-word callouts |
| 3 | **Architecture** | `PhArchitecture` / `CrArchitecture` | Intro 1 sentence; icon-card body ≤15 words |
| 4 | **Live demo** | `PhForecastDemo` / `CrTriageDemo` | Step captions ≤25 words each |
| 5 | **Impact** | `PhImpact` / `CrImpact` | Metric captions ≤8 words |
| 6 | **Future AI** | `PhFutureAI` / `CrFutureAI` | Card body 1 sentence each |
| 7 | **Close** | `PhClose` / `CrClose` | 1-line provocation |

### Hero shape (both pages)

```
┌────────────────────────────────────┬────────────────────────┐
│ ← All work                         │                        │
│                                    │                        │
│ [eyebrow chip · plum]              │   Right glyph          │
│ Title (font-display, extrabold)    │   (small visual,       │
│ Subtitle (≤20 words, ink-soft)     │    icon-based 4 nodes  │
│ [Primary CTA · plum] [Secondary]   │    with plum signal)   │
│                                    │                        │
│ META 4-up: Role · X · Y · Status   │                        │
└────────────────────────────────────┴────────────────────────┘
```

`hero-wash` background layer (same as `WcHero`), `anim-rise` staggered entrances.

### Problem shape

```
[01 · Problem]
Title — 1 line.

  Paragraph 1 — ≤40 words.
  Paragraph 2 — ≤40 words.

[icon] phrase    [icon] phrase    [icon] phrase
```

Icons from `lucide-react`, all rendered at `size={17}`, color `var(--plum)`.

### Architecture shape

```
[02 · Solution architecture]
Title — 1 line.
1-sentence intro.

┌─ Module ─────────────────────────────────────────────────┐
│ THE SPINE                                                │
│ [Stage1] → [Stage2] → [Stage3] → [Stage4 · primary plum] │
│                                                          │
│ Reads downstream: [chip] [chip] [chip] [chip]            │
└──────────────────────────────────────────────────────────┘

4-up grid of icon-cards (white, ghair, soft-shadow-sm).
Each: 40px plum-soft icon tile + heading + 1 sentence.
```

### Live demo shape (the centerpiece)

Mirror of `WcWorkflowDemo` structure exactly:

```
┌─ Module (no padding) ────────────────────────────────────┐
│ ┌── Controls ────────────────────────────────────────┐  │
│ │ [▶ Run loop] [↺ Reset]   ●1 ○2 ○3 step buttons    │  │
│ └────────────────────────────────────────────────────┘  │
│ ──── progress bar (plum) ───────────────────────────    │
│ ┌──────────┐ ┌──────────────┐ ┌──────────────────────┐  │
│ │ Zone 1   │ │ Zone 2       │ │ Zone 3               │  │
│ │ (active  │ │ (cream-2     │ │ (cream-2 when        │  │
│ │  plum-   │ │  when        │ │  inactive)           │  │
│ │  soft)   │ │  inactive)   │ │                      │  │
│ └──────────┘ └──────────────┘ └──────────────────────┘  │
│ ──── caption strip ─────────────────────────────────    │
│ N. Step name — caption sentence.                        │
└──────────────────────────────────────────────────────────┘
```

**Behavior contract (both demos):**
- Auto-cycle through 3 named steps every `1900ms` when `playing === true`
- Default `playing === true` UNLESS `usePrefersReducedMotion()` returns true (then default `false`)
- Clicking a step button OR engaging an input pauses auto-cycle (`setPlaying(false)`)
- `▶ Run loop` resumes from current step. `↺ Reset` returns to step 1 and stops.
- Zone with `active === true` uses `background: var(--plum-soft)` + `border: rgba(109,40,217,0.25)`; inactive zones use `var(--cream-2)` + `var(--line)` border
- Animated transitions via `transition-all duration-300`
- Inputs sit inside the zones; manual edits drive the prediction directly

### Impact shape

```
[04 · Impact]
Title.

3 metric cards (responsive 1/2/3 columns):
┌────────────┐ ┌────────────┐ ┌────────────┐
│ 193        │ │ ±1.8y      │ │ <50ms      │
│ countries  │ │ typical CI │ │ per scen.  │
└────────────┘ └────────────┘ └────────────┘

Operator chip strip: [chip] [chip] [chip]
```

### Future AI shape

```
[05 · What's next]

3-up icon-cards:
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ icon · plum  │ │ icon · plum  │ │ icon · plum  │
│ Heading      │ │ Heading      │ │ Heading      │
│ 1 sentence.  │ │ 1 sentence.  │ │ 1 sentence.  │
└──────────────┘ └──────────────┘ └──────────────┘
```

### Close shape

```
1-line provocation (font-display, ink).
← All work link.
```

---

## 5. Project 1 — Population-Health Intelligence Platform

**Page route:** `/work/population-health-intelligence/page.tsx`

### 5.1 Hero (`PhHero.tsx`)

- Eyebrow chip: `Applied AI · Population Health`
- Title: `Population-Health Intelligence Platform`
- Subtitle: *Calibrated life-expectancy forecasts for 193 nations — with the signals driving each trajectory.*
- Primary CTA: `See the forecast` → `#demo`
- Secondary CTA: `Start from the problem` → `#problem`
- META 4-up:
  - Role · Applied AI engineering
  - Coverage · 193 countries
  - Sources · WHO · World Bank · IMF
  - Status · Prototype
- Right glyph: 4 small icon nodes (`Globe`, `Database`, `Brain`, `Zap`) connected by a faint plum signal line. `Zap` represents the inference API as the output node. Same compositional energy as `WcSystemMap` — small SVG composed of icons + connecting lines.

### 5.2 Problem (`PhProblem.tsx`)

- Eyebrow: `01 · Problem`
- Title: `Planning decisions deserve more than a point estimate.`
- Body (≤80 words):
  > Public-health planners decide on top of life-expectancy estimates. The numbers they get are national averages with no signal about *why* a trajectory is shifting.
  >
  > Two countries can decelerate for opposite reasons — declining immunization, GDP contraction — and need different interventions. The output should reflect that.
- 3 icon callouts:
  - `TrendingDown` · Point estimates only
  - `HelpCircle` · No signal on why
  - `AlertTriangle` · Wrong interventions

### 5.3 Architecture (`PhArchitecture.tsx`)

- Eyebrow: `02 · Solution architecture`
- Title: `From indicators to a planner console.`
- Intro: *Validated features in, calibrated forecast out — with attribution.*
- Spine (4 stages, last is primary):
  - `Globe` Sources · daily ingest
  - `Database` Feature Store · versioned
  - `Brain` Forecaster · ensemble + quantile
  - `Zap` **Inference API** · /predict /attribute /scenario (primary)
- Reads downstream chips: `Scenario diff` · `Attribution (SHAP)` · `CI band` · `Planner console`
- 4 icon-cards (mirror the spine 1:1):
  - **Globe · Sources** — WHO, World Bank, IMF. Daily ingest, schema validated.
  - **Database · Feature store** — Versioned features keyed by country × year × indicator.
  - **Brain · Forecaster** — Gradient boosting with quantile regression for CI bands.
  - **Zap · Inference API** — `/predict`, `/attribute`, `/scenario` — every response carries CI + SHAP attribution.

### 5.4 Live demo (`PhForecastDemo.tsx`)

- Eyebrow: `03 · Live forecast`
- Title: `Watch the model reason.`
- Intro: *One country, one scenario, one forecast — with the signals that drove it. Step through it or let it run.*
- Footnote: *Interactive prototype · deterministic surrogate of the trained ensemble.*

**Three zones:**
- **Zone 1 — THE COUNTRY**: country `<select>` dropdown (12 options from `surrogate-data.json`). Shows baseline life expectancy and 2015 anchor.
- **Zone 2 — THE SCENARIO**: 4 sliders (`Schooling`, `GDP per capita`, `Immunization %`, `HIV deaths /1k`) using current country defaults. Range/step/unit from existing FIELD_RANGES (carry over from deleted ScenarioConsole).
- **Zone 3 — THE FORECAST**: prediction value + 90% CI band + top 4 ranked attributions + delta vs baseline.

**Auto-cycle steps (loop every 1900ms when playing):**
1. **Country** — Zone 1 active; country slot shows "Bangladesh" baseline (default selection).
2. **Scenario** — Zone 2 active; sliders animate to "boost schooling" override (+3 yrs above default).
3. **Forecast** — Zone 3 active; prediction card updates, attribution panel re-sorts with Schooling at top.

User interaction pauses auto-cycle. Country dropdown change resets sliders to that country's defaults (carry over from ScenarioConsole behavior).

Implementation reuses `predict()`, `attributions()`, `COUNTRIES`, `WEIGHTS`, `type InputVector` from existing `surrogate.ts`.

### 5.5 Impact (`PhImpact.tsx`)

- Eyebrow: `04 · Impact`
- Title: `Forecast with reasoning.`
- 3 metric cards:
  - `193` · Countries covered
  - `±1.8y` · Typical 90% CI band
  - `<50ms` · Per-scenario inference
- Operator chip strip: `WHO planners` · `Ministry-of-health teams` · `Donor portfolios`

### 5.6 Future AI (`PhFutureAI.tsx`)

- Eyebrow: `05 · What's next`
- 3 icon-cards:
  - **Activity · Streaming ingest** — Daily snapshots replaced with WHO/WB change-data-capture.
  - **GitCompare · Scenario diff** — Submit two override vectors, get a structured comparison payload.
  - **LineChart · Drift monitors** — Track distribution shift, auto-flag when calibration degrades.

### 5.7 Close (`PhClose.tsx`)

- Provocation: *Forecasting that shows its work.*
- `← All work` link

---

## 6. Project 2 — Clinical Risk Engine

**Page route:** `/work/clinical-risk-engine/page.tsx`

### 6.1 Hero (`CrHero.tsx`)

- Eyebrow chip: `Applied AI · Clinical Decision Support`
- Title: `Clinical Risk Engine`
- Subtitle: *Calibrated malignancy risk scoring for biopsy triage — designed for the clinician, not around them.*
- Primary CTA: `See the triage demo` → `#demo`
- Secondary CTA: `Start from the problem` → `#problem`
- META 4-up:
  - Role · Applied AI engineering
  - Dataset · Wisconsin Diagnostic (569 cases)
  - Features · 30 cell-morphology signals
  - Status · Prototype
- Right glyph: 4 small icon nodes (`Microscope`, `Filter`, `Brain`, `Target`) with the `Target` (calibration) node highlighted as the primary output stage. Faint plum signal line connecting them. The ambiguity flag is a downstream behavior, not a stage — it appears in the live demo, not the hero glyph.

### 6.2 Problem (`CrProblem.tsx`)

- Eyebrow: `01 · Problem`
- Title: `A probability isn't a decision.`
- Body (≤80 words):
  > Pathologists triage biopsy cases under heavy cognitive load. A raw model probability — even a confident one — doesn't tell them when the model is *uncertain*.
  >
  > The cases that matter most are the ambiguous ones, sitting on either side of the decision boundary. Those need a flag, not just a number.
- 3 icon callouts:
  - `Brain` · High cognitive load
  - `AlertTriangle` · Mis-triage is expensive
  - `HelpCircle` · Ambiguity needs a flag

### 6.3 Architecture (`CrArchitecture.tsx`)

- Eyebrow: `02 · Solution architecture`
- Title: `Calibration is a first-class layer.`
- Intro: *Raw ensemble probability isn't a clinical signal. Calibration makes the number actionable.*
- Spine (4 stages, last is primary):
  - `Microscope` FNA vector · 30 features
  - `Filter` Validation · schema + range
  - `Brain` Ensemble · GBM + RF voting
  - `Target` **Calibration** · isotonic + Wald CI (primary)
- Reads downstream chips: `Triage payload` · `Ambiguity flag` · `Cohort %ile` · `Audit log`
- 4 icon-cards (mirror the spine 1:1):
  - **Microscope · FNA vector** — 30 cell-nucleus features per biopsy slide.
  - **Filter · Validation** — Schema enforcement and range checks before inference.
  - **Brain · Ensemble** — Gradient boosting + random forest voting, SHAP attribution.
  - **Target · Calibration** — Isotonic calibration over the WDBC training cohort. The ambiguity flag fires downstream when the 90% CI straddles 0.5.

### 6.4 Live demo (`CrTriageDemo.tsx`)

- Eyebrow: `03 · Live triage`
- Title: `One case at a time.`
- Intro: *Pick a case, see the calibrated probability, watch the ambiguity flag fire when the model is unsure.*
- Footnote: *Interactive prototype · calibrated surrogate of the production ensemble.*

**Three zones:**
- **Zone 1 — CASE**: case `<select>` dropdown (5 entries from `wdbc-cases.json`). Shows top 3 feature values as small `<input type="number">` fields. The other 5 features hidden behind `[+5 more]` accordion.
- **Zone 2 — INFERENCE**: calibrated probability `p` + 90% CI band + top 4 ranked contributions.
- **Zone 3 — TRIAGE**: ambiguity flag (pulsing amber when active) + triage recommendation + cohort percentile.

**Auto-cycle cases (loop every 1900ms when playing):**
1. **Clear benign** (Case 112) — p ≈ 0.07, flag dark, recommendation `Standard queue` (green tone)
2. **Ambiguous** (Case 301) — p ≈ 0.51, **flag pulses amber**, recommendation `Second review recommended` (amber tone). This is the load-bearing visual moment.
3. **Clear malignant** (Case 219) — p ≈ 0.93, flag dark, recommendation `Priority review queue` (coral tone)

When user picks a different case from the dropdown OR edits a feature value, auto-cycle pauses. Editing fires re-inference instantly.

Implementation reuses `predictMalignancy()`, `ambiguityFlag()`, `type WdbcFeatures`, and `wdbc-cases.json` from existing `surrogate.ts`.

**Ambiguity-flag pulse**: amber border + `animate-pulse` (Tailwind default) OR a custom keyframe matching the `dd-pulse` cadence (2.8s ease-in-out). Either works; pick whichever fits motion language better at implementation time.

### 6.5 Impact (`CrImpact.tsx`)

- Eyebrow: `04 · Impact`
- Title: `From probability to decision.`
- 3 metric cards:
  - `0.99` · AUC (calibrated ensemble)
  - `0.041` · Brier loss post-calibration
  - `22ms` · Per-case inference latency
- Operator chip strip: `Pathology labs` · `Telemedicine networks` · `Clinical research`

### 6.6 Future AI (`CrFutureAI.tsx`)

- Eyebrow: `05 · What's next`
- 3 icon-cards:
  - **Network · FHIR ingestion** — Pull FNA observations from PACS/LIS directly.
  - **Activity · Drift monitoring** — Watch input distributions, auto-flag calibration drift.
  - **Users · Human-in-the-loop** — Clinician overrides feed the calibration retrain queue.

### 6.7 Close (`CrClose.tsx`)

- Provocation: *Triage that knows what it doesn't know.*
- `← All work` link

---

## 7. `/work` page reorder

Currently `/work/page.tsx` renders two sections: Applied AI systems (first) → Operational platforms (second).

Swap to: Operational platforms (first) → Applied AI systems (second).

Single-file edit. Same partition logic by `badge.startsWith('APPLIED AI')`. Eyebrow + heading copy on each section stays identical to current. Just reorder the JSX.

---

## 8. `FeaturedWork.tsx` warm retune

Currently the two Applied-AI tiles use:
```ts
accent: '#7DD3FC',
wash: 'linear-gradient(135deg,#0A0A0B,#111114)',
```

Change to (matching the existing healthcare-systems tile palette):
```ts
accent: 'var(--plum)',
wash: 'linear-gradient(135deg,#f3f0fb,#fbf7fe)',
```

Repaint `ForecastMockup` and `TriageMockup` mini-renderings inside the tiles:
- Replace `bg-[#0A0A0B]` → `bg-white/85` or `bg-[var(--cream-2)]`
- Replace `text-white/60` → `text-[var(--ink-muted)]`
- Replace `#7DD3FC` accents → `var(--plum)`
- Replace `bg-white/30` bars → `bg-[var(--plum-soft)]` or `rgba(28,22,46,0.10)` from the existing SOFT constant in the file
- Replace `#FCD34D` amber → `var(--amber)`

The mockup shapes (heatmap grid, sparkline bar chart, ambiguity flag glyph) stay identical. Only the palette flips.

---

## 9. `/dashboards/life-expectancy` shim

Inline replacement (no shared primitive). 30-line file rendering inside `home2` register:

- `<HomeNav />` + `<SiteFooter />` chrome
- Centered content card with eyebrow "This case study has moved", title, and a plum `Link` to `/work/population-health-intelligence`
- Same warm cream background as everywhere else

No more `MovedTo` component (it lived in the deleted `deep-dive/` directory).

---

## 10. Testing

- **Vitest:** existing surrogate tests stay. 5 + 7 = 12 tests. No new unit tests required (the interactive components are visual; no business logic moves out of the surrogates).
- **Type-check + lint + build** must pass on every task.
- **Visual smoke test:** dev server visit confirms both pages render in `home2` register, auto-cycle runs, manual interaction pauses cycle and updates prediction.

---

## 11. Open implementation questions (deferred to plan)

1. **Ambiguity flag pulse:** Tailwind `animate-pulse` vs. custom keyframe. Recommendation: start with `animate-pulse` (zero extra CSS); upgrade to custom keyframe only if motion feels wrong.
2. **Right-side hero glyphs:** rendered as SVG, composed inline within each Hero component (no separate `*SystemMap` files unless they grow beyond ~50 lines). Each glyph is ~4 icon nodes + 2-3 connecting lines.
3. **Architecture spine on mobile:** current `WcArchitecture` uses `flex-col lg:flex-row` for the spine. Both new architecture components follow that.
4. **`PhArchitecture` chip strip equivalent of WcArchitecture's lifecycle strip:** SKIP. Wheelchair has a state-machine lifecycle worth visualizing; these projects don't have an equivalent state ladder. The 4-icon-card grid is sufficient. (Confirmed in §5.3 / §6.3 — no chip strip.)
