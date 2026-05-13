// frontend/src/components/casestudy/popHealth/PhProblem.tsx
import { TrendingDown, HelpCircle, AlertTriangle } from 'lucide-react'
import { CsSection } from '../bits'

const CALLOUTS = [
  { Icon: TrendingDown, title: 'Point estimates only' },
  { Icon: HelpCircle, title: 'No signal on why' },
  { Icon: AlertTriangle, title: 'Wrong interventions' },
]

export function PhProblem() {
  return (
    <CsSection
      id="problem"
      eyebrow="01 · Problem"
      title="Planning decisions deserve more than a point estimate."
      intro="Public-health planners decide on top of life-expectancy estimates. The numbers they get are national averages with no signal about why a trajectory is shifting."
    >
      <p className="max-w-2xl text-[1.05rem] leading-relaxed text-ink-soft">
        Two countries can decelerate for opposite reasons — declining immunization, GDP contraction — and need
        different interventions. The output should reflect that.
      </p>
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {CALLOUTS.map(({ Icon, title }) => (
          <div key={title} className="flex items-center gap-3 rounded-2xl bg-white p-4 ghair soft-shadow-sm">
            <div
              className="grid h-10 w-10 shrink-0 place-items-center rounded-xl"
              style={{ background: 'rgba(248,112,96,0.12)' }}
            >
              <Icon size={18} style={{ color: 'var(--coral)' }} strokeWidth={1.9} />
            </div>
            <p className="text-[13px] font-semibold text-ink">{title}</p>
          </div>
        ))}
      </div>
    </CsSection>
  )
}
