// frontend/src/components/casestudy/clinicalRisk/CrProblem.tsx
import { Brain, AlertTriangle, HelpCircle } from 'lucide-react'
import { CsSection } from '../bits'

const CALLOUTS = [
  { Icon: Brain, title: 'High cognitive load' },
  { Icon: AlertTriangle, title: 'Mis-triage is expensive' },
  { Icon: HelpCircle, title: 'Ambiguity needs a flag' },
]

export function CrProblem() {
  return (
    <CsSection
      id="problem"
      eyebrow="01 · Problem"
      title="A probability isn't a decision."
      intro="Pathologists triage biopsy cases under heavy cognitive load. A raw model probability — even a confident one — doesn't tell them when the model is uncertain."
    >
      <p className="max-w-2xl text-[1.05rem] leading-relaxed text-ink-soft">
        The cases that matter most are the ambiguous ones, sitting on either side of the decision boundary. Those
        need a flag, not just a number.
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
