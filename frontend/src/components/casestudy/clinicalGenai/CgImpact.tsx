// frontend/src/components/casestudy/clinicalGenai/CgImpact.tsx
import { Stethoscope, Database, Workflow, Layers, Code2, Brain, BarChart3, ShieldCheck, Calendar, Network, Lock } from 'lucide-react'
import { CsSection, Chip } from '../bits'

const CAPABILITIES = [
  { Icon: Stethoscope, label: 'Healthcare AI' },
  { Icon: Database,    label: 'Healthcare data engineering' },
  { Icon: Workflow,    label: 'Clinical workflow understanding' },
  { Icon: Layers,      label: 'PostgreSQL modeling' },
  { Icon: Code2,       label: 'Python backend (FastAPI)' },
  { Icon: Brain,       label: 'LLM system design' },
  { Icon: BarChart3,   label: 'Analytics dashboarding' },
  { Icon: ShieldCheck, label: 'Responsible AI design' },
]

const STATS = [
  { Icon: Calendar, value: '9+ yrs', label: 'Hospital rehab + clinical ops background', tint: 'var(--plum)', bg: 'var(--plum-soft)' },
  { Icon: Network,  value: '8',      label: 'Pipeline stages, human-in-the-loop',       tint: 'var(--blue)', bg: '#dbeafe' },
  { Icon: Lock,     value: '0',      label: 'PHI — synthetic data only',                tint: 'var(--green)', bg: '#d1fae5' },
]

const OPERATORS = ['Rehab clinics', 'Therapy networks', 'Healthcare AI teams']

export function CgImpact() {
  return (
    <CsSection
      eyebrow="07 · What this demonstrates"
      title="One project, eight capabilities."
      intro="Designed end-to-end so each layer is legible in isolation."
    >
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
        {CAPABILITIES.map(({ Icon, label }) => (
          <div key={label} className="inline-flex items-center gap-2 rounded-xl bg-white px-3 py-2.5 ghair soft-shadow-sm">
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md" style={{ background: 'var(--plum-soft)' }}>
              <Icon size={14} style={{ color: 'var(--plum)' }} strokeWidth={1.9} />
            </span>
            <span className="text-[12px] font-medium text-ink-soft">{label}</span>
          </div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {STATS.map(({ Icon, value, label, tint, bg }) => (
          <div key={label} className="rounded-2xl bg-white p-5 ghair soft-shadow-sm">
            <div className="grid h-10 w-10 place-items-center rounded-xl" style={{ background: bg }}>
              <Icon size={18} style={{ color: tint }} strokeWidth={1.9} />
            </div>
            <p className="mt-3 font-display text-2xl font-extrabold text-ink">{value}</p>
            <p className="text-sm text-ink-muted">{label}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
          Operator audiences
        </span>
        {OPERATORS.map((o) => (
          <Chip key={o} tone="plum">
            {o}
          </Chip>
        ))}
      </div>
    </CsSection>
  )
}
