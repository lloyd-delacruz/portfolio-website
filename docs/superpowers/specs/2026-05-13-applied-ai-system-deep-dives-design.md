# Applied AI System Deep Dives — Design Spec

**Date:** 2026-05-13
**Status:** Approved for implementation planning
**Scope:** Two flagship project deep-dive pages positioning Lloyd as an Applied AI Engineer building operational intelligence systems.

---

## 1. Goal

Reposition two machine-learning projects so they read as enterprise-grade operational AI systems, not Kaggle exercises or notebook hobbies. Both projects live at `/work/<slug>` as members of the existing polished case-study band (`apex-protocol`, `equitrackr`, `wheelchair-tracking`, `spendwise`).

The deep-dives must signal three things to a reader within ten seconds:

1. This person builds **systems**, not models.
2. The system serves a **decision-support workflow** owned by a real operator (policy planner, clinician).
3. The framing is **architecture-first**, with model performance buried in an appendix.

---

## 2. The Two Projects

### Project 1 — Population-Health Intelligence Platform

- **Route:** `/work/population-health-intelligence`
- **Replaces (via shim):** `/dashboards/life-expectancy`
- **Title:** *Population-Health Intelligence Platform*
- **Subtitle:** *Forecasting longevity outcomes across 193 nations to support strategic public-health planning*
- **One-line frame:** An AI-native decision-support system that ingests WHO, World Bank, and IMF socioeconomic indicators, runs predictive inference on national life-expectancy trajectories, and surfaces decision-grade signals for policy planners.
- **Operator:** Ministries of health, WHO regional planners, health-economics teams, donor organizations.
- **Underlying dataset:** WHO Global Health Observatory life-expectancy panel, 193 countries × 16 years (2000–2015), 22 indicators.

### Project 2 — Clinical Risk Engine

- **Route:** `/work/clinical-risk-engine`
- **Replaces:** Nothing — net-new project.
- **Title:** *Clinical Risk Engine — AI-Assisted Diagnostic Support*
- **Subtitle:** *A predictive inference system for early oncological risk triage, designed for integration into clinician workflows*
- **One-line frame:** A calibrated inference system over fine-needle aspiration biopsy feature vectors. Returns a malignancy probability, a calibrated confidence band, and the cell-morphology signals driving the score — designed to sit inside a clinician's review workflow, not replace it.
- **Operator:** Pathology labs, telemedicine networks, clinical research teams.
- **Underlying dataset:** Wisconsin Breast Cancer Diagnostic (WDBC) — 569 records × 30 cell-nucleus features × binary malignant/benign label.

---

## 3. Visual Register

This register is deliberately **distinct from the home page** (`.home2`, warm cream/plum). The home sells the architect; these pages prove the engineer.

### Surface
- Background: `#0A0A0B` (warm-undertone near-black), no gradient. Subtle dotted grid at 4–6% opacity as depth cue only.
- Cards/panels: `#111114` with 1px `#1F1F22` hairline borders. No shadows, no glassmorphism, no backdrop-blur. Depth comes from the border, not from glow.
- Accent: single restrained signal hue — desaturated electric cyan `#7DD3FC`, used **exclusively** for live data points, model-output highlights, and one CTA per page.
- Status colors: muted slate-green for healthy, muted amber for warnings. Red only for genuine clinical risk flags.

### Type
- Display: Inter Tight.
- Body: Inter, ~70ch measure.
- Mono: JetBrains Mono or Berkeley Mono for inference output, model coefficients, feature names, latency numbers, dataset stats. Mono is load-bearing — it signals "this came out of a system."
- Tighter leading than the home page. Left-anchored long-form margins.

### Motion
- One subtle fade-up on scroll per section, ≤200ms, ease-out.
- Hero architecture diagrams have a single quiet cyan signal-flow pulse (one dot traversing the pipeline every ~3s). No other animation.

### Explicit No-Go List (binding for implementation)
- ❌ No purple/violet/pink gradients anywhere.
- ❌ No emoji bullets ("🔍", "📊", "🧠").
- ❌ No "Loading interactive charts…" spinner copy.
- ❌ No accuracy/precision/recall/F1 leaderboard tables as headline content — appendix only.
- ❌ No notebook screenshots, Jupyter cells, or `import sklearn` blocks shown as proof of work.
- ❌ No gradient-text metric cards.
- ❌ No shimmer/animation/glow on cards.
- ❌ No Chart.js default tooltips — interactive surfaces use a custom monochrome treatment.

---

## 4. Shared Page Architecture (Both Deep Dives)

Both projects use the **same 9-section spine** so they read as members of one system, not one-off pages. Section densities differ; the spine is identical.

| # | Section | Purpose |
|---|---|---|
| 1 | **Hero** | Title · Subtitle · One-line system frame · Status chip (mono, pulse). Right side: minimal 4–5 node architecture glyph. |
| 2 | **The Operational Problem** | What decision does this support, and why is making that decision hard today? Names the operator explicitly. |
| 3 | **System Architecture** | Full-width SVG diagram: ingestion → feature store → model service → inference API → decision surface. Monochrome with cyan signal-flow dots. |
| 4 | **Data Pipeline** | Sources, refresh cadence, validation, lineage. Rendered as a small node-graph, not a bullet list. |
| 5 | **Model & Inference Workflow** | Request → feature transform → ensemble inference → calibration → explainability layer → decision payload. Mono-rendered interface signature, not a training notebook. |
| 6 | **Live Inference Panel** | One real interactive surface per project where the reader feeds inputs and sees the model reason. Mono numerics + one-line calibrated narrative. |
| 7 | **Decision-Support Impact** | Two or three concrete operator scenarios. |
| 8 | **Future Scalability** | Streaming ingest, FHIR/PACS integration, model registry, drift monitors, human-in-the-loop review queue. |
| 9 | **Appendix (collapsed)** | Model performance, dataset stats, references. Accuracy 0.93 lives here, as a footnote. |

**Component reuse:** the 9-section spine is implemented as a shared component family — `<DeepDiveHero />`, `<SystemArchDiagram />`, `<DataPipelineGraph />`, `<InferenceWorkflow />`, `<LiveInferencePanel />`, `<DecisionImpact />`, `<FutureScalability />`, `<ProjectAppendix />`. The two pages are mostly composition + content. Project-specific components are limited to the inference panels (`<ScenarioConsole />` and `<CaseTriagePanel />`), which share a mono output-card primitive.

---

## 5. Project 1 — Population-Health Intelligence Platform

### 5.1 Hero copy

> **Population-Health Intelligence Platform**
> Forecasting longevity outcomes across 193 nations to support strategic public-health planning.
>
> An operational forecasting layer over WHO, World Bank, and IMF indicators. Ingests 16 years of socioeconomic and disease-burden signals, produces calibrated life-expectancy projections with explainable feature attribution, and exposes the inference layer through a query interface decision-makers can actually use.
>
> `STATUS  ◉ Inference live  ·  Latency p50 38ms  ·  193 countries  ·  ~3.1k records`

### 5.2 Operational Problem copy

> Ministries of health, policy planners, and longitudinal-health programs make 5-, 10-, and 20-year planning decisions on top of life-expectancy estimates. The estimates they rely on today are produced by panel models updated annually, reported as national averages, and stripped of any signal about *why* a trajectory is shifting.
>
> The cost is concrete: a country whose life-expectancy growth is decelerating because of declining immunization coverage gets the same planning treatment as one decelerating because of GDP contraction. The interventions are different. The model output should be different.
>
> This system frames life-expectancy projection as a **decision-support workflow**, not a regression score. Every inference call returns three things: the prediction, the calibrated confidence band, and the ranked feature attributions driving the trajectory.

### 5.3 System Architecture diagram

```
   ┌──────────────┐
   │ WHO          │──┐
   │ World Bank   │  ├──→ ┌───────────────┐    ┌──────────────┐    ┌──────────────┐
   │ IMF          │──┘    │ Feature Store │──→ │ Ensemble     │──→ │ Inference    │
   └──────────────┘       │ (versioned)   │    │ Forecaster   │    │ Service      │
                          └───────────────┘    │ • Gradient   │    │ /predict     │
                                ↑              │   boosting   │    │ /attribute   │
                                │              │ • Quantile   │    │ /scenario    │
                          ┌───────────────┐    │   reg (CI)   │    └──────┬───────┘
                          │ Validation &  │    │ • SHAP layer │           │
                          │ Lineage       │    └──────────────┘           ↓
                          └───────────────┘                       ┌──────────────┐
                                                                  │ Planner      │
                                                                  │ Console      │
                                                                  └──────────────┘
```

Rendered as a real SVG, monochrome with hairline borders matching the page register, single cyan dot animating along the signal path every ~3s.

### 5.4 Live Inference Panel — `<ScenarioConsole />`

Two-column scenario console.

- **Left column:** country selector + four sliders (schooling years, GDP/capita, immunization coverage, HIV deaths/1k). Each slider's default is the country's real 2015 value from the cleaned WHO dataset.
- **Right column:** single large output card, mono-rendered:

```
PROJECTED LIFE EXPECTANCY    72.4 years    ±1.8 (90% CI)

  TOP CONTRIBUTING SIGNALS
  ▸ Schooling (yrs)             +3.2y
  ▸ Income composition          +1.9y
  ▸ Immunization coverage       +1.4y
  ▸ Adult mortality             −0.8y

  vs. national baseline (2015):  +4.1 years
```

- Slider movement updates output in <100ms. No toasts, no animation flourish, no spinners. Silent inference is the design statement.
- Implementation: client-side precomputed surrogate or ONNX runtime — decided in implementation plan, not this spec.

### 5.5 Decision-Support Impact scenarios

1. A WHO regional planner runs a 2030 projection with degraded immunization assumptions to size a vaccine-financing case.
2. A national health-economics team uses feature attribution to decide whether the next $100M moves the dial more on schooling-adjacent programs or HIV treatment expansion.
3. A donor organization compares projected trajectories across a portfolio of 12 recipient countries.

### 5.6 Future Scalability

Streaming ingest from WHO GHO API, model registry with version pinning, drift detection on feature distributions, scenario-comparison API, integration with strategic-planning frontends used by ministries.

---

## 6. Project 2 — Clinical Risk Engine

### 6.1 Hero copy

> **Clinical Risk Engine**
> AI-assisted diagnostic support for early oncological risk triage.
>
> A calibrated inference system over fine-needle aspiration biopsy feature vectors. Returns a malignancy probability, a calibrated confidence band, and the cell-morphology signals driving the score — designed to sit inside a clinician's review workflow, not replace it.
>
> `STATUS  ◉ Inference live  ·  Latency p50 22ms  ·  Calibrated Brier 0.041`

### 6.2 Operational Problem copy

> A radiologist or pathologist reviewing a biopsy slide makes a malignant/benign call from cell-morphology cues — nuclear texture, concavity, radius variance, perimeter smoothness. The signal is real, the volumes are high, the cognitive load is heavier than the literature admits. Mis-triage in either direction is expensive: a missed malignancy delays treatment, a false alarm sends a patient through unnecessary follow-up.
>
> This system is not a diagnostic replacement. It's a **triage layer** that runs alongside the clinician, scores each case before review, and surfaces the morphological features that drove the score. The clinician keeps the decision; the model compresses the cognitive load and flags the cases where the signal is ambiguous and a second look is warranted.

### 6.3 System Architecture diagram

```
  ┌──────────────┐
  │ FNA biopsy   │──→ ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
  │ feature      │    │ Validation   │──→ │ Ensemble     │──→ │ Calibration  │
  │ vector       │    │ + Schema     │    │ Classifier   │    │ Layer        │
  │ (30 cell-    │    │ Enforcement  │    │ • Gradient   │    │ (isotonic)   │
  │  nucleus     │    └──────────────┘    │   boosting   │    └──────┬───────┘
  │  features)   │                        │ • RF base    │           │
  └──────────────┘                        │ • SHAP attr  │           ↓
                                          └──────────────┘    ┌──────────────┐
                                                              │ Decision     │
                                                              │ Payload      │
                                                              │ • P(malig)   │
                                                              │ • CI band    │
                                                              │ • Top-5 attr │
                                                              │ • Ambiguity  │
                                                              │   flag       │
                                                              └──────┬───────┘
                                                                     ↓
                                                              ┌──────────────┐
                                                              │ Clinician    │
                                                              │ Review UI    │
                                                              └──────────────┘
```

The **calibration layer is a distinct node**. Most ML portfolios show a model → output. Showing a calibration node signals understanding that a raw probability from an ensemble isn't a usable clinical signal without calibration.

### 6.4 Live Inference Panel — `<CaseTriagePanel />`

Single-case clinician-facing view.

- **Left column:** 30 mono-rendered input fields grouped into three families (radius/perimeter/area, smoothness/compactness/concavity, texture/symmetry/fractal-dimension). Each field has an inline distribution glyph showing where this value sits relative to the training cohort. Default values are loaded from a real case-library dropdown ("Case 047 · borderline", "Case 112 · clear benign", "Case 219 · clear malignant").
- **Right column:** output card.

```
MALIGNANCY PROBABILITY         0.83        [HIGH CONFIDENCE]
CALIBRATED CI (90%)            0.77 – 0.88

  TRIAGE RECOMMENDATION        Priority review queue
  AMBIGUITY FLAG               ☐ (calibrated CI fully above 0.5)

  TOP CONTRIBUTING SIGNALS
  ▸ Worst concave points         +0.31
  ▸ Worst perimeter              +0.18
  ▸ Worst radius                 +0.14
  ▸ Mean texture                 +0.09
  ▸ Worst smoothness             +0.07

  COHORT POSITION                 92nd percentile (malignant-leaning)
```

The **ambiguity flag** is the load-bearing UX detail. When the calibrated CI straddles 0.5, the flag turns on and the recommendation text changes to *"Second review recommended — confidence band crosses decision boundary."* This is what distinguishes the panel from a Kaggle dashboard: the model output is shaped by a real triage policy, not just a threshold.

### 6.5 Decision-Support Impact scenarios

1. A pathology lab uses the engine as a pre-review triage layer — cases flagged high-risk and high-confidence go to a priority queue; ambiguous cases get a mandatory second reviewer.
2. A telemedicine network without immediate pathologist access uses the score + attribution to decide which cases need same-day specialist routing.
3. A clinical research team uses cohort-position data to surface morphologically-atypical cases for further study.

### 6.6 Future Scalability

FHIR observation ingestion, integration with PACS/LIS systems, model card + audit log for regulatory review, drift monitoring on incoming feature distributions, human-in-the-loop feedback channel where clinician disagreements with the model retrain the calibration layer.

---

## 7. Migration & Integration Plan

### 7.1 Route changes

| Route | Action |
|---|---|
| `/work/population-health-intelligence` | NEW — full 9-section deep dive |
| `/work/clinical-risk-engine` | NEW — full 9-section deep dive |
| `/dashboards/life-expectancy` | RETIRE — replace 1,300-line Chart.js page with a `<MovedTo target="/work/population-health-intelligence" />` shim (one-line "This case study has moved →"). Static export means no server 301; the shim prevents 404s on inbound links. |
| `/dashboards/heart-disease-prediction` | LEAVE UNTOUCHED — out of scope. Demoted from home Featured Work but route stays live. |

### 7.2 `FeaturedWork.tsx` (home page)

- Add Population-Health Intelligence Platform tile.
- Add Clinical Risk Engine tile.
- Match `AnchorCase` typographic treatment so the new tiles read as siblings to Wheelchair Tracking.
- Remove Heart Disease Prediction from Featured Work (route stays live, just no longer fronts the portfolio).

### 7.3 `SystemsToolchain.tsx` link updates

Currently links:
- `Health dashboards → /dashboards/life-expectancy` (3 places)
- `Health dashboards → /dashboards/heart-disease-prediction` (1 place)

Update all four to point at the new `/work/<slug>` deep dives. Rename labels:
- `Health dashboards` → `Population-health forecasting`
- `Health dashboards` (heart) → `Clinical risk inference`

Framing language must be consistent everywhere it appears.

### 7.4 Out of scope (explicit)

- Actual ONNX model deployment / inference infra spec (resolved in implementation plan).
- New blog posts, resume tweaks, social previews.
- Heart Disease Prediction rebuild.
- Net-new home-page register changes.

---

## 8. Open implementation questions (defer to plan)

1. **Inference runtime:** client-side ONNX vs. precomputed surrogate lookup vs. small serverless function. Recommendation: precomputed surrogate for the Scenario Console (deterministic, <50ms, no runtime dep); ONNX-web for the Case Triage Panel if model size permits, otherwise surrogate. Static export favors surrogate.
2. **Architecture diagrams:** hand-authored SVG vs. component-rendered nodes. Recommendation: hand-authored SVG per page, exported from a single Figma source so both diagrams share visual language.
3. **Shared deep-dive component family:** lives at `frontend/src/components/work/deep-dive/`. Each project page composes from that family + its own inference panel component.
