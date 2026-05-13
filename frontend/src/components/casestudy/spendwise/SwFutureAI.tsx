// frontend/src/components/casestudy/spendwise/SwFutureAI.tsx
import { Target, TrendingUp, MessageSquareText, ShieldAlert, Workflow, BellRing } from 'lucide-react'
import { CsSection, Module, Chip } from '../bits'

const ITEMS = [
  { Icon: Target, title: 'Intelligent budgeting assistance', note: 'Suggest category targets from spending history and upcoming bills.', tag: 'Direction' },
  { Icon: TrendingUp, title: 'Predictive spending insights', note: 'Forecast month-end by category before it happens.', tag: 'Exploring' },
  { Icon: MessageSquareText, title: 'Financial workflow copilot', note: '"Move $50 from Groceries to Dining Out" in plain language.', tag: 'Direction' },
  { Icon: ShieldAlert, title: 'Anomaly detection', note: 'Flag duplicate charges and unusual merchants for review.', tag: 'Exploring' },
  { Icon: Workflow, title: 'Planning automation', note: 'Auto-roll leftover funds and auto-fund true expenses each cycle.', tag: 'Direction' },
  { Icon: BellRing, title: 'Contextual recommendations', note: 'Nudges tied to recurring bills, low buffers, and goal pace.', tag: 'Exploring' },
]

export function SwFutureAI() {
  return (
    <CsSection
      eyebrow="Future · AI opportunities"
      title="Where the assistant goes next."
      intro="Grounded extensions of the same model — assistive, explainable, and always reversible."
      footnote="Directions under consideration, not shipped features. Each would surface its reasoning and stay user-confirmable."
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {ITEMS.map((it) => (
          <Module key={it.title} className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="grid h-9 w-9 place-items-center rounded-xl" style={{ background: 'var(--teal-soft)' }}>
                <it.Icon size={16} style={{ color: 'var(--teal-deep)' }} />
              </span>
              <Chip tone="neutral">{it.tag}</Chip>
            </div>
            <div>
              <p className="font-display text-[15px] font-bold text-ink">{it.title}</p>
              <p className="mt-1 text-[13px] leading-relaxed text-ink-soft">{it.note}</p>
            </div>
          </Module>
        ))}
      </div>
    </CsSection>
  )
}
