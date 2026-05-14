// frontend/src/components/casestudy/clinicalGenai/CgArchitecture.tsx
import {
  Mic,
  Cpu,
  ShieldCheck,
  Brain,
  CheckCircle2,
  Database,
  Users,
  BarChart3,
  ArrowRight,
  ListChecks,
  History,
  TrendingUp,
} from 'lucide-react'
import { CsSection, Module } from '../bits'

const SPINE = [
  { Icon: Mic,          label: 'Dictated note',  sub: 'React intake' },
  { Icon: Cpu,          label: 'FastAPI',        sub: 'Python orchestration' },
  { Icon: ShieldCheck,  label: 'Preprocess',     sub: 'De-id + chunk' },
  { Icon: Brain,        label: 'LLM extraction', sub: 'Schema-constrained' },
  { Icon: CheckCircle2, label: 'Validation',     sub: 'Rules + confidence' },
  { Icon: Database,     label: 'PostgreSQL',     sub: 'Time-series + audit' },
  { Icon: Users,        label: 'Review queue',   sub: 'Low-confidence' },
  { Icon: BarChart3,    label: 'Analytics',      sub: 'Recovery trends + KPIs', primary: true },
]

const DOWNSTREAM = [
  { Icon: TrendingUp,  label: 'Recovery KPIs' },
  { Icon: BarChart3,   label: 'Time-series trends' },
  { Icon: History,     label: 'Audit trail' },
  { Icon: ListChecks,  label: 'Review backlog' },
]

const LAYERS = [
  { Icon: Cpu,         title: 'Backend',  body: 'FastAPI + Pydantic. Async orchestration; every stage gates the next.' },
  { Icon: ShieldCheck, title: 'Privacy',  body: 'De-identification strips identifiers before any model call. Synthetic data only here.' },
  { Icon: Brain,       title: 'LLM layer', body: 'Schema-constrained extraction with per-field confidence; structured outputs reduce retries.' },
  { Icon: Database,    title: 'Storage',  body: 'PostgreSQL with normalized metrics, time-series observations, and an append-only audit log.' },
]

function StageCard({
  Icon,
  label,
  sub,
  primary,
}: {
  Icon: typeof Mic
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

function SpineRow({ stages }: { stages: typeof SPINE }) {
  return (
    <div className="flex flex-col items-stretch gap-2 lg:flex-row lg:items-center">
      {stages.map((s, i) => (
        <div key={s.label} className="flex flex-1 items-center gap-2">
          <StageCard {...s} />
          {i < stages.length - 1 && <ArrowRight size={16} className="hidden shrink-0 text-ink-muted lg:block" />}
        </div>
      ))}
    </div>
  )
}

export function CgArchitecture() {
  const row1 = SPINE.slice(0, 4)
  const row2 = SPINE.slice(4)

  return (
    <CsSection
      eyebrow="02 · System architecture"
      title="From dictation to dashboard, with humans in the loop."
      intro="A pipeline that respects clinical context — validation gates, audit logs, and a review queue before anything goes downstream."
    >
      <Module>
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">The spine</p>
        <div className="mt-4 space-y-2">
          <SpineRow stages={row1} />
          <div className="hidden justify-center py-1 lg:flex">
            <ArrowRight size={16} className="rotate-90 text-ink-muted" />
          </div>
          <SpineRow stages={row2} />
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
            <div className="grid h-10 w-10 place-items-center rounded-xl" style={{ background: 'var(--plum-soft)' }}>
              <Icon size={18} style={{ color: 'var(--plum)' }} strokeWidth={1.9} />
            </div>
            <h3 className="mt-3 font-display text-[15px] font-bold text-ink">{title}</h3>
            <p className="mt-1.5 text-[13px] leading-relaxed text-ink-soft">{body}</p>
          </div>
        ))}
      </div>

      <p className="mt-6 text-xs italic text-ink-muted">
        Designed pipeline. No real patient data; all examples in this case study are synthetic.
      </p>
    </CsSection>
  )
}
