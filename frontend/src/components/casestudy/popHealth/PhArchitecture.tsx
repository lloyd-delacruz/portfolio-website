// frontend/src/components/casestudy/popHealth/PhArchitecture.tsx
import { Globe, Database, Brain, Zap, ArrowRight, GitCompare, BarChart3, Sigma, LayoutDashboard } from 'lucide-react'
import { CsSection, Module } from '../bits'

const SPINE = [
  { Icon: Globe, label: 'Sources', sub: 'daily ingest' },
  { Icon: Database, label: 'Feature Store', sub: 'versioned' },
  { Icon: Brain, label: 'Forecaster', sub: 'ensemble + quantile' },
  { Icon: Zap, label: 'Inference API', sub: '/predict /attribute', primary: true },
]

const DOWNSTREAM = [
  { Icon: GitCompare, label: 'Scenario diff' },
  { Icon: BarChart3, label: 'Attribution (SHAP)' },
  { Icon: Sigma, label: 'CI band' },
  { Icon: LayoutDashboard, label: 'Planner console' },
]

const LAYERS = [
  { Icon: Globe, title: 'Sources', body: 'WHO, World Bank, IMF. Daily ingest, schema validated.' },
  { Icon: Database, title: 'Feature store', body: 'Versioned features keyed by country × year × indicator.' },
  { Icon: Brain, title: 'Forecaster', body: 'Gradient boosting with quantile regression for CI bands.' },
  { Icon: Zap, title: 'Inference API', body: '/predict, /attribute, /scenario — every response carries CI + SHAP attribution.' },
]

function StageCard({
  Icon,
  label,
  sub,
  primary,
}: {
  Icon: typeof Globe
  label: string
  sub: string
  primary?: boolean
}) {
  return (
    <div
      className={`flex min-w-[140px] flex-1 items-center gap-3 rounded-xl p-3 ${primary ? '' : 'bg-white ghair'}`}
      style={primary ? { background: 'var(--plum-soft)', border: '1px solid rgba(109,40,217,0.25)' } : undefined}
    >
      <div
        className="grid h-9 w-9 shrink-0 place-items-center rounded-lg"
        style={{ background: primary ? 'rgba(109,40,217,0.14)' : 'rgba(28,22,46,0.05)' }}
      >
        <Icon size={17} style={{ color: 'var(--plum)' }} strokeWidth={1.9} />
      </div>
      <div className="leading-tight">
        <p className="text-[13px] font-semibold text-ink">{label}</p>
        <p className="text-[11px] text-ink-muted">{sub}</p>
      </div>
    </div>
  )
}

export function PhArchitecture() {
  return (
    <CsSection
      eyebrow="02 · Solution architecture"
      title="From indicators to a planner console."
      intro="Validated features in, calibrated forecast out — with attribution."
    >
      <Module>
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">The spine</p>
        <div className="mt-4 flex flex-col items-stretch gap-2 lg:flex-row lg:items-center">
          {SPINE.map((s, i) => (
            <div key={s.label} className="flex flex-1 items-center gap-2">
              <StageCard {...s} />
              {i < SPINE.length - 1 && <ArrowRight size={16} className="hidden shrink-0 text-ink-muted lg:block" />}
            </div>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
            Reads downstream
          </span>
          {DOWNSTREAM.map(({ Icon, label }) => (
            <span
              key={label}
              className="inline-flex items-center gap-1.5 rounded-full bg-[var(--cream-2)] px-3 py-1 text-xs font-medium text-ink-soft ghair"
            >
              <Icon size={12} style={{ color: 'var(--plum)' }} />
              {label}
            </span>
          ))}
        </div>
      </Module>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {LAYERS.map(({ Icon, title, body }) => (
          <div key={title} className="rounded-2xl bg-white p-5 ghair soft-shadow-sm">
            <div
              className="grid h-10 w-10 place-items-center rounded-xl"
              style={{ background: 'var(--plum-soft)' }}
            >
              <Icon size={18} style={{ color: 'var(--plum)' }} strokeWidth={1.9} />
            </div>
            <h3 className="mt-3 font-display text-[15px] font-bold text-ink">{title}</h3>
            <p className="mt-1.5 text-[13px] leading-relaxed text-ink-soft">{body}</p>
          </div>
        ))}
      </div>
    </CsSection>
  )
}
