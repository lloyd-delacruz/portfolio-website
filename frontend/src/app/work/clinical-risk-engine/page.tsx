// frontend/src/app/work/clinical-risk-engine/page.tsx
import type { Metadata } from 'next'
import { HomeNav } from '@/components/home/HomeNav'
import { SiteFooter } from '@/components/home/SiteFooter'
import {
  DeepDiveHero,
  SectionShell,
  SystemArchDiagram,
  DataPipelineGraph,
  InferenceWorkflow,
  DecisionImpact,
  FutureScalability,
  ProjectAppendix,
} from '@/components/work/deep-dive'
import { CaseTriagePanel } from '@/components/work/clinical-risk/CaseTriagePanel'

export const metadata: Metadata = {
  title: 'Clinical Risk Engine — Lloyd Dela Cruz',
  description:
    'A calibrated inference system over fine-needle aspiration biopsy feature vectors, returning a malignancy probability with explainable cell-morphology attribution for clinician-in-the-loop triage.',
}

export default function Page() {
  return (
    <div className="deep-dive">
      <HomeNav active="Work" />
      <main>
        <DeepDiveHero
          eyebrow="APPLIED AI / CLINICAL DECISION SUPPORT"
          title="Clinical Risk Engine"
          subtitle="AI-assisted diagnostic support for early oncological risk triage."
          frame="A calibrated inference system over fine-needle aspiration biopsy feature vectors. Returns a malignancy probability, a calibrated confidence band, and the cell-morphology signals driving the score — designed to sit inside a clinician's review workflow, not replace it."
          status="Inference live"
          statusItems={[
            { label: 'Latency p50', value: '22ms' },
            { label: 'Brier (calibrated)', value: '0.041' },
            { label: 'Cohort', value: '569 cases' },
          ]}
          glyphNodes={[
            { id: 'in',   col: 0, row: 1, title: 'Biopsy vector',  lines: ['30 features'] },
            { id: 'val',  col: 1, row: 1, title: 'Validation',     lines: ['schema'] },
            { id: 'mdl',  col: 2, row: 0, title: 'Ensemble',       lines: ['GBM + RF', 'SHAP'] },
            { id: 'cal',  col: 2, row: 2, title: 'Calibration',    lines: ['isotonic'] },
          ]}
          glyphEdges={[
            { from: 'in',  to: 'val' },
            { from: 'val', to: 'mdl' },
            { from: 'mdl', to: 'cal' },
          ]}
        />

        <SectionShell
          eyebrow="01 / OPERATIONAL PROBLEM"
          title="A triage layer, not a diagnostic replacement"
          deck="Operator: pathology labs, telemedicine networks, clinical research teams."
        >
          <div className="dd-prose">
            <p>
              A radiologist or pathologist reviewing a biopsy slide makes a malignant/benign call from cell-morphology
              cues — nuclear texture, concavity, radius variance, perimeter smoothness. The signal is real, the volumes
              are high, the cognitive load is heavier than the literature admits. Mis-triage in either direction is
              expensive: a missed malignancy delays treatment, a false alarm sends a patient through unnecessary
              follow-up.
            </p>
            <p>
              This system is not a diagnostic replacement. It is a <strong>triage layer</strong> that runs alongside the
              clinician, scores each case before review, and surfaces the morphological features that drove the score.
              The clinician keeps the decision; the model compresses the cognitive load and flags the cases where the
              signal is ambiguous and a second look is warranted.
            </p>
          </div>
        </SectionShell>

        <SystemArchDiagram
          eyebrow="02 / SYSTEM ARCHITECTURE"
          title="Calibration is a first-class layer"
          deck="The calibration node is distinct from the ensemble. A raw probability from a tree ensemble is not a usable clinical signal — the isotonic layer is what makes the number actionable."
          cols={5}
          rows={3}
          nodes={[
            { id: 'src',   col: 0, row: 1, title: 'FNA biopsy',    lines: ['30 features'] },
            { id: 'val',   col: 1, row: 1, title: 'Validation',    lines: ['schema', 'range check'] },
            { id: 'mdl',  col: 2, row: 1, title: 'Ensemble',       lines: ['GBM + RF', 'SHAP attribution'] },
            { id: 'cal',  col: 3, row: 1, title: 'Calibration',    lines: ['isotonic'] },
            { id: 'pay',  col: 4, row: 0, title: 'Decision Payload', lines: ['p(malig)', 'CI', 'top-5 attr'] },
            { id: 'flag', col: 4, row: 2, title: 'Ambiguity Flag', lines: ['CI straddles 0.5'] },
            { id: 'ui',   col: 4, row: 1, title: 'Clinician UI',   lines: ['review queue'] },
          ]}
          edges={[
            { from: 'src', to: 'val' },
            { from: 'val', to: 'mdl' },
            { from: 'mdl', to: 'cal' },
            { from: 'cal', to: 'pay' },
            { from: 'cal', to: 'flag' },
            { from: 'pay', to: 'ui' },
            { from: 'flag', to: 'ui' },
          ]}
          caption="The ambiguity flag is the decision-support behavior that distinguishes this from a Kaggle dashboard: the model's output is shaped by a real triage policy, not just a 0.5 threshold."
        />

        <DataPipelineGraph
          eyebrow="03 / DATA PIPELINE"
          title="Ingest, validate, version, audit"
          deck="Production inference path. Each case is logged with feature vector, model version, and clinician decision for downstream drift and feedback analysis."
          stages={[
            {
              title: 'Ingest',
              cadence: 'Per case',
              lines: ['FNA feature vector', 'patient ref', 'lab ref'],
            },
            {
              title: 'Validate',
              cadence: 'Synchronous',
              lines: ['schema', 'range', 'missingness < 5%'],
            },
            {
              title: 'Score',
              cadence: 'p50 22ms',
              lines: ['ensemble', 'calibration', 'attribution'],
            },
            {
              title: 'Audit',
              cadence: 'Async',
              lines: ['vector + model ver', 'clinician verdict', 'drift signal'],
            },
          ]}
        />

        <InferenceWorkflow
          eyebrow="04 / MODEL & INFERENCE WORKFLOW"
          title="Request → ensemble → calibration → payload"
          deck="Five-step pipeline. The clinician sees only the decision payload; the audit log retains every preceding stage."
          request={[
            { field: 'patient_ref',   type: 'string',         note: 'opaque' },
            { field: 'features',      type: 'WdbcFeatures',   note: '30 cell-nucleus' },
            { field: 'model_pin',     type: 'ModelVersion?',  note: 'override' },
          ]}
          pipeline={[
            { step: 'Validate',  detail: 'schema + range' },
            { step: 'Transform', detail: 'z-score align' },
            { step: 'Ensemble',  detail: 'GBM + RF voting' },
            { step: 'Calibrate', detail: 'isotonic' },
            { step: 'Explain',   detail: 'SHAP top-5' },
          ]}
          response={[
            { field: 'p',              type: 'float',           note: 'calibrated' },
            { field: 'ci90',           type: '[float, float]',  note: 'low, high' },
            { field: 'attributions',   type: 'Attribution[5]',  note: 'ranked' },
            { field: 'ambiguity_flag', type: 'bool',            note: 'CI ∋ 0.5' },
            { field: 'cohort_pct',     type: 'float',           note: '0–100' },
          ]}
        />

        <SectionShell
          eyebrow="05 / LIVE INFERENCE"
          title="Case Triage Panel"
          deck="Pick a real case from the library or edit the feature vector directly. Watch the calibrated probability, CI, and ambiguity flag respond."
        >
          <CaseTriagePanel />
        </SectionShell>

        <DecisionImpact
          eyebrow="06 / DECISION-SUPPORT IMPACT"
          title="Where this output lands in a clinical workflow"
          scenarios={[
            {
              operator: 'PATHOLOGY LAB',
              scenario:
                'Pre-review triage layer — high-risk + high-confidence cases enter a priority queue; ambiguous cases get a mandatory second reviewer.',
            },
            {
              operator: 'TELEMEDICINE NETWORK',
              scenario:
                'Without immediate pathologist access, the score plus attribution decides which cases need same-day specialist routing.',
            },
            {
              operator: 'CLINICAL RESEARCH',
              scenario:
                'Cohort-position data surfaces morphologically-atypical cases for further study — the model becomes a research instrument.',
            },
          ]}
        />

        <FutureScalability
          eyebrow="07 / FUTURE SCALABILITY"
          title="What this becomes in production"
          items={[
            { heading: 'FHIR ingestion',       body: 'Direct integration with PACS/LIS systems via FHIR observation resources — no manual feature extraction.' },
            { heading: 'Model card + audit',   body: 'Every inference logged with model version + clinician verdict; regulatory-grade audit trail.' },
            { heading: 'Drift monitoring',     body: 'Track incoming feature distributions vs. training cohort. Auto-flag drift before it degrades calibration.' },
            { heading: 'Human-in-the-loop',    body: 'Clinician disagreements feed the calibration layer\'s retraining queue.' },
          ]}
        />

        <ProjectAppendix
          eyebrow="08 / APPENDIX"
          title="Model performance, dataset, references"
          modelPerformance={[
            { label: 'AUC (test)',         value: '0.99' },
            { label: 'Brier (calibrated)', value: '0.041' },
            { label: 'Sensitivity @ p≥0.5', value: '0.96' },
            { label: 'Specificity @ p≥0.5', value: '0.95' },
          ]}
          datasetStats={[
            { label: 'Source',           value: 'Wisconsin Diagnostic (WDBC)' },
            { label: 'Cases',            value: '569' },
            { label: 'Features',         value: '30' },
            { label: 'Class balance',    value: '63% benign / 37% malignant' },
          ]}
          references={[
            { label: 'UCI ML Repository — Wisconsin Breast Cancer Diagnostic',
              href: 'https://archive.ics.uci.edu/dataset/17/breast+cancer+wisconsin+diagnostic' },
            { label: 'Street, Wolberg, Mangasarian — "Nuclear feature extraction for breast tumor diagnosis" (1993)' },
          ]}
          surrogateNote="The Case Triage Panel runs a deterministic calibrated-logistic surrogate of the production ensemble. The surrogate is z-scored against the WDBC cohort, calibrated via a precomputed isotonic table, and CI-banded via Wald. It is fast enough for keystroke-level interaction; the production inference path is the full ensemble."
        />
      </main>
      <SiteFooter />
    </div>
  )
}
