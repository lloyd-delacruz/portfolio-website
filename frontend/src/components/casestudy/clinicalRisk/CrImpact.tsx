import { Target, Sigma, Zap } from 'lucide-react'
import { CsSection, Chip } from '../bits'

const STATS = [
  { Icon: Target, value: '0.99', label: 'AUC (calibrated ensemble)', tint: 'var(--plum)', bg: 'var(--plum-soft)' },
  { Icon: Sigma, value: '0.041', label: 'Brier loss post-calibration', tint: 'var(--blue)', bg: '#dbeafe' },
  { Icon: Zap, value: '22ms', label: 'per-case inference latency', tint: 'var(--green)', bg: '#d1fae5' },
]

const OPERATORS = ['Pathology labs', 'Telemedicine networks', 'Clinical research']

export function CrImpact() {
  return (
    <CsSection
      eyebrow="04 · Impact"
      title="From probability to decision."
      intro="A calibrated probability with an ambiguity flag turns a raw model output into something a clinical workflow can route on."
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
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
