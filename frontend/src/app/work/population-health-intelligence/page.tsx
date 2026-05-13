// frontend/src/app/work/population-health-intelligence/page.tsx
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
import { ScenarioConsole } from '@/components/work/population-health/ScenarioConsole'

export const metadata: Metadata = {
  title: 'Population-Health Intelligence Platform — Lloyd Dela Cruz',
  description:
    'An AI-native decision-support system that ingests WHO, World Bank, and IMF socioeconomic indicators and produces calibrated life-expectancy projections with explainable feature attribution.',
}

export default function Page() {
  return (
    <div className="deep-dive">
      <HomeNav active="Work" />
      <main>
        <DeepDiveHero
          eyebrow="APPLIED AI / OPERATIONAL INTELLIGENCE"
          title="Population-Health Intelligence Platform"
          subtitle="Forecasting longevity outcomes across 193 nations to support strategic public-health planning."
          frame="An operational forecasting layer over WHO, World Bank, and IMF indicators. Ingests 16 years of socioeconomic and disease-burden signals, produces calibrated life-expectancy projections with explainable feature attribution, and exposes the inference layer through a query interface decision-makers can actually use."
          status="Inference live"
          statusItems={[
            { label: 'Latency p50', value: '38ms' },
            { label: 'Coverage', value: '193 countries' },
            { label: 'Records', value: '~3.1k' },
          ]}
          glyphNodes={[
            { id: 'src',  col: 0, row: 1, title: 'Sources',        lines: ['WHO', 'World Bank', 'IMF'] },
            { id: 'fs',   col: 1, row: 1, title: 'Feature Store',  lines: ['versioned'] },
            { id: 'mdl',  col: 2, row: 0, title: 'Forecaster',     lines: ['ensemble', 'quantile CI'] },
            { id: 'inf',  col: 2, row: 2, title: 'Inference API',  lines: ['/predict', '/attribute'] },
          ]}
          glyphEdges={[
            { from: 'src', to: 'fs' },
            { from: 'fs',  to: 'mdl' },
            { from: 'fs',  to: 'inf' },
          ]}
        />

        <SectionShell
          eyebrow="01 / OPERATIONAL PROBLEM"
          title="The decision this system supports"
          deck="Operator: ministries of health, WHO regional planners, health-economics teams, donor organizations."
        >
          <div className="dd-prose">
            <p>
              Ministries of health, policy planners, and longitudinal-health programs make 5-, 10-, and 20-year planning
              decisions on top of life-expectancy estimates. The estimates they rely on today are produced by panel
              models updated annually, reported as national averages, and stripped of any signal about <em>why</em> a
              trajectory is shifting.
            </p>
            <p>
              The cost is concrete: a country whose life-expectancy growth is decelerating because of declining
              immunization coverage gets the same planning treatment as one decelerating because of GDP contraction. The
              interventions are different. The model output should be different.
            </p>
            <p>
              This system frames life-expectancy projection as a <strong>decision-support workflow</strong>, not a
              regression score. Every inference call returns three things: the prediction, the calibrated confidence
              band, and the ranked feature attributions driving the trajectory.
            </p>
          </div>
        </SectionShell>

        <SystemArchDiagram
          eyebrow="02 / SYSTEM ARCHITECTURE"
          title="From WHO indicators to a planner console"
          deck="Five primary services. Versioned feature store gates the inference path; lineage and validation feed back into the store."
          cols={4}
          rows={3}
          nodes={[
            { id: 'who',  col: 0, row: 0, title: 'WHO GHO',         lines: ['life expectancy', 'mortality'] },
            { id: 'wb',   col: 0, row: 1, title: 'World Bank',      lines: ['GDP / capita', 'education'] },
            { id: 'imf',  col: 0, row: 2, title: 'IMF',             lines: ['income composition'] },
            { id: 'fs',   col: 1, row: 1, title: 'Feature Store',   lines: ['versioned', 'schema-enforced'] },
            { id: 'val',  col: 1, row: 2, title: 'Validation',      lines: ['lineage', 'drift'] },
            { id: 'mdl',  col: 2, row: 1, title: 'Forecaster',      lines: ['gradient-boost', 'quantile reg', 'SHAP layer'] },
            { id: 'inf',  col: 3, row: 0, title: 'Inference API',   lines: ['/predict', '/attribute', '/scenario'] },
            { id: 'pc',   col: 3, row: 2, title: 'Planner Console', lines: ['operator UI'] },
          ]}
          edges={[
            { from: 'who', to: 'fs' },
            { from: 'wb',  to: 'fs' },
            { from: 'imf', to: 'fs' },
            { from: 'fs',  to: 'mdl' },
            { from: 'val', to: 'fs' },
            { from: 'mdl', to: 'inf' },
            { from: 'inf', to: 'pc' },
          ]}
          caption="Signal flow is unidirectional from sources → feature store → forecaster → inference → console. Validation feeds the feature store, not the model."
        />

        <DataPipelineGraph
          eyebrow="03 / DATA PIPELINE"
          title="Ingestion, validation, lineage"
          deck="Three external sources, one validated feature store, daily refresh cadence with explicit lineage."
          stages={[
            {
              title: 'Ingest',
              cadence: 'Daily, 03:00 UTC',
              lines: ['WHO GHO REST', 'World Bank API', 'IMF WEO snapshot', 'raw → s3://raw-zone'],
            },
            {
              title: 'Validate',
              cadence: 'Per-ingest',
              lines: ['schema enforcement', 'range checks', 'drop nulls > 30%', 'flag anomalies'],
            },
            {
              title: 'Feature Store',
              cadence: 'Versioned',
              lines: ['country × year × feature', 'lineage refs', 'snapshot id'],
            },
            {
              title: 'Serve',
              cadence: 'On-demand',
              lines: ['hot path to forecaster', 'cold path to lake', 'audit log'],
            },
          ]}
        />

        <InferenceWorkflow
          eyebrow="04 / MODEL & INFERENCE WORKFLOW"
          title="Request → calibrated prediction → attribution"
          deck="Ensemble forecaster fronted by a calibration layer. Every response carries a CI band and ranked feature attributions."
          request={[
            { field: 'country',       type: 'ISO-3',            note: 'e.g. "RWA"' },
            { field: 'horizon_years', type: 'int',              note: '5 | 10 | 20' },
            { field: 'overrides',     type: 'FeatureVector?',   note: 'scenario inputs' },
          ]}
          pipeline={[
            { step: 'Validate',     detail: 'schema + range' },
            { step: 'Transform',    detail: 'feature align' },
            { step: 'Ensemble',     detail: 'GBM + quantile reg' },
            { step: 'Calibrate',    detail: 'isotonic on CI' },
            { step: 'Explain',      detail: 'SHAP attribution' },
          ]}
          response={[
            { field: 'value',         type: 'float',            note: 'years' },
            { field: 'ci90',          type: 'float',            note: '±band' },
            { field: 'attributions',  type: 'Attribution[]',    note: 'ranked' },
            { field: 'baseline',      type: 'float',            note: 'last observed' },
          ]}
        />

        <SectionShell
          eyebrow="05 / LIVE INFERENCE"
          title="Scenario Console"
          deck="The inference layer exposed to a planner. Move a slider, see the prediction update with the contributing signals."
        >
          <ScenarioConsole />
        </SectionShell>

        <DecisionImpact
          eyebrow="06 / DECISION-SUPPORT IMPACT"
          title="Who uses this output, when, to decide what"
          scenarios={[
            {
              operator: 'WHO REGIONAL PLANNER',
              scenario:
                'Runs a 2030 projection with degraded immunization assumptions to size a vaccine-financing case.',
            },
            {
              operator: 'NATIONAL HEALTH-ECONOMICS TEAM',
              scenario:
                'Uses feature attribution to decide whether the next $100M moves the dial more on schooling-adjacent programs or HIV treatment expansion.',
            },
            {
              operator: 'DONOR PORTFOLIO LEAD',
              scenario:
                'Compares projected trajectories across a portfolio of 12 recipient countries to allocate the next funding cycle.',
            },
          ]}
        />

        <FutureScalability
          eyebrow="07 / FUTURE SCALABILITY"
          title="What this becomes in production"
          items={[
            { heading: 'Streaming ingest', body: 'Replace daily snapshots with WHO GHO API streaming + change-data-capture on World Bank releases.' },
            { heading: 'Model registry',   body: 'Pin model versions, gate deploys behind backtest deltas, expose registry to the planner console.' },
            { heading: 'Drift monitoring', body: 'Track distribution shift on incoming features; auto-flag when drift exceeds thresholds.' },
            { heading: 'Scenario API',     body: 'First-class scenario diff endpoint — submit two override vectors, get a structured comparison payload.' },
          ]}
        />

        <ProjectAppendix
          eyebrow="08 / APPENDIX"
          title="Model performance, dataset, references"
          modelPerformance={[
            { label: 'MAE (test, years)',     value: '1.42' },
            { label: 'RMSE (test, years)',    value: '1.91' },
            { label: 'R² (test)',             value: '0.94' },
            { label: 'CI coverage (90%)',     value: '0.91' },
          ]}
          datasetStats={[
            { label: 'Countries',        value: '193' },
            { label: 'Years',            value: '2000 – 2015' },
            { label: 'Records',          value: '~3,090' },
            { label: 'Features',         value: '22' },
          ]}
          references={[
            { label: 'WHO Global Health Observatory',                     href: 'https://www.who.int/data/gho' },
            { label: 'World Bank Open Data',                              href: 'https://data.worldbank.org/' },
            { label: 'IMF World Economic Outlook',                        href: 'https://www.imf.org/en/Publications/WEO' },
          ]}
          surrogateNote="The Scenario Console runs a deterministic linear surrogate of the forecaster for sub-millisecond browser-side inference. Surrogate weights are derived offline from the trained ensemble; the full ensemble is the production inference path."
        />
      </main>
      <SiteFooter />
    </div>
  )
}
