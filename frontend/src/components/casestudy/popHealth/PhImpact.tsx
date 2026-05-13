// frontend/src/components/casestudy/popHealth/PhImpact.tsx
import { Globe, Sigma, Zap } from 'lucide-react'
import { CsSection, Chip } from '../bits'

const STATS = [
  { Icon: Globe, value: '193', label: 'countries covered', tint: 'var(--plum)', bg: 'var(--plum-soft)' },
  { Icon: Sigma, value: '±1.8y', label: 'typical 90% CI band', tint: 'var(--blue)', bg: '#dbeafe' },
  { Icon: Zap, value: '<50ms', label: 'per-scenario inference', tint: 'var(--green)', bg: '#d1fae5' },
]

const OPERATORS = ['WHO planners', 'Ministry-of-health teams', 'Donor portfolios']

export function PhImpact() {
  return (
    <CsSection
      eyebrow="04 · Impact"
      title="Forecast with reasoning."
      intro="The output isn't a number — it's a number with the signals that produced it, calibrated and ready for a planning conversation."
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
