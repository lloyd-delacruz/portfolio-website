// frontend/src/components/casestudy/clinicalGenai/CgDataModel.tsx
import { Users, FileText, Database, Activity, History, ListChecks, TrendingUp, TrendingDown } from 'lucide-react'
import { CsSection, Module } from '../bits'

const TABLES = [
  {
    name: 'patients_demo',
    Icon: Users,
    body: 'Demographic anchor — synthetic only.',
    columns: ['id', 'cohort', 'enrolled_at'],
  },
  {
    name: 'rehab_notes',
    Icon: FileText,
    body: 'Raw dictated note bodies.',
    columns: ['id', 'patient_id', 'dictated_at', 'source'],
  },
  {
    name: 'extracted_metrics',
    Icon: Database,
    body: 'Per-note structured output.',
    columns: ['note_id', 'field', 'value', 'confidence'],
  },
  {
    name: 'metric_observations',
    Icon: Activity,
    body: 'Time-series flatten for analytics.',
    columns: ['patient_id', 'metric', 'value', 'observed_at'],
  },
  {
    name: 'extraction_audit_log',
    Icon: History,
    body: 'Append-only audit trail.',
    columns: ['note_id', 'stage', 'model_version', 'tokens', 'at'],
  },
  {
    name: 'review_queue',
    Icon: ListChecks,
    body: 'Routed low-confidence extractions.',
    columns: ['note_id', 'reason', 'status', 'routed_at'],
  },
]

const KPIS = [
  { label: 'Avg pain score',      value: '2.8',   trend: '-1.4',  Icon: TrendingDown, dir: 'good' as const },
  { label: 'Gait distance Δ',     value: '+22m',  trend: '+18m',  Icon: TrendingUp,   dir: 'good' as const },
  { label: 'Therapy tolerance',   value: '94%',   trend: '+11%',  Icon: TrendingUp,   dir: 'good' as const },
  { label: 'Discharge readiness', value: '0.81',  trend: '+0.22', Icon: TrendingUp,   dir: 'good' as const },
]

const CURVE = [0.20, 0.28, 0.31, 0.46, 0.55, 0.62, 0.74, 0.83]

function SparkLine() {
  const W = 320
  const H = 60
  const pad = 4
  const pts = CURVE.map((y, i) => {
    const x = pad + (i * (W - pad * 2)) / (CURVE.length - 1)
    const py = H - pad - y * (H - pad * 2)
    return `${x},${py}`
  }).join(' ')
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" aria-hidden>
      <polyline points={pts} fill="none" stroke="var(--plum)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      {CURVE.map((y, i) => {
        const x = pad + (i * (W - pad * 2)) / (CURVE.length - 1)
        const py = H - pad - y * (H - pad * 2)
        return <circle key={i} cx={x} cy={py} r={2.4} fill="var(--plum)" />
      })}
    </svg>
  )
}

export function CgDataModel() {
  return (
    <CsSection
      eyebrow="04 · Data model & analytics"
      title="Time-series recovery, modeled for analysis."
      intro="Normalized observation tables, append-only audit, and a review queue — designed so recovery trends are a query, not a project."
    >
      {/* Part A — schema grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TABLES.map(({ name, Icon, body, columns }) => (
          <div key={name} className="rounded-2xl bg-white p-5 ghair soft-shadow-sm">
            <div className="flex items-center gap-2.5">
              <div className="grid h-9 w-9 place-items-center rounded-lg" style={{ background: 'var(--plum-soft)' }}>
                <Icon size={16} style={{ color: 'var(--plum)' }} strokeWidth={1.9} />
              </div>
              <p className="text-[13px] font-semibold text-ink" style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace' }}>
                {name}
              </p>
            </div>
            <p className="mt-2.5 text-[12px] leading-relaxed text-ink-soft">{body}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {columns.map((c) => (
                <span
                  key={c}
                  className="inline-flex items-center rounded-full bg-[var(--cream-2)] px-2 py-[2px] text-[10px] font-medium text-ink-muted"
                  style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace' }}
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Part B — analytics mock */}
      <Module className="mt-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-plum">Recovery trends</p>
          <p className="text-[11px] text-ink-muted">Patient 042 · synthetic · 8-session window</p>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {KPIS.map(({ label, value, trend, Icon }) => (
            <div key={label} className="rounded-xl bg-[var(--cream-2)] p-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-muted">{label}</p>
              <p className="mt-1 font-display text-xl font-extrabold text-ink">{value}</p>
              <p className="mt-0.5 inline-flex items-center gap-1 text-[11px] font-medium" style={{ color: 'var(--green)' }}>
                <Icon size={12} strokeWidth={2.2} />
                {trend}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-xl bg-[var(--cream-2)] p-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-muted">Recovery curve</p>
          <div className="mt-2">
            <SparkLine />
          </div>
          <p className="mt-1 text-[10px] text-ink-muted">Composite recovery index, sessions 1–8 (synthetic).</p>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">Filters</span>
          {['Cohort · ortho post-op', 'Sessions 1–8', 'Confidence ≥ 0.6'].map((f) => (
            <span key={f} className="inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-medium text-ink-soft ghair">
              {f}
            </span>
          ))}
        </div>
      </Module>

      <p className="mt-6 text-xs italic text-ink-muted">
        Mock dashboard — synthetic data. The real pipeline targets Tableau or Power BI as the analytics surface.
      </p>
    </CsSection>
  )
}
