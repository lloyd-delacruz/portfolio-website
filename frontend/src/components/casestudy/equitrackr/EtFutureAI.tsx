// frontend/src/components/casestudy/equitrackr/EtFutureAI.tsx
import { Wrench, TrendingUp, MessageSquare, Workflow, ScanSearch, Route } from 'lucide-react'
import { CsSection } from '../bits'

const CARDS = [
  { Icon: Wrench, title: 'Predictive maintenance', body: 'Usage hours and state history surface the assets most likely to need service before they fail in a unit.', tint: 'var(--coral)', bg: 'rgba(248,112,96,0.12)' },
  { Icon: TrendingUp, title: 'Utilization forecasting', body: 'Anticipate demand by department and shift; pre-position equipment instead of chasing it.', tint: 'var(--blue)', bg: '#dbeafe' },
  { Icon: MessageSquare, title: 'Operational copilot', body: 'Ask the registry plainly — “which pumps are idle in Imaging?” — grounded in real records, not guesses.', tint: 'var(--plum)', bg: 'var(--plum-soft)' },
  { Icon: Workflow, title: 'Workflow intelligence', body: 'Spot where turnaround stalls — long cleaning queues, slow returns — and where the process needs help.', tint: 'var(--green)', bg: '#d1fae5' },
  { Icon: ScanSearch, title: 'Anomaly detection', body: 'Flag the unusual: an asset that never returns, a unit hoarding pumps, a state that’s been stuck too long.', tint: 'var(--amber)', bg: '#fef3c7' },
  { Icon: Route, title: 'Intelligent routing', body: 'Match a request to the nearest suitable asset and suggest the handoff — before a shortage delays care.', tint: 'var(--plum-deep)', bg: '#ede9fe' },
]

export function EtFutureAI() {
  return (
    <CsSection
      eyebrow="06 · Where the platform goes"
      title="The registry becomes the training set."
      intro="Every scan is already a labelled event. Over time that’s a clean operational dataset — and a foundation for intelligence that stays grounded in what the platform actually records."
      footnote="Roadmap — grounded in the data the platform already produces; no model where a rule will do."
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CARDS.map(({ Icon, title, body, tint, bg }) => (
          <div key={title} className="lift flex flex-col rounded-2xl bg-white p-5 ghair">
            <div className="flex items-center justify-between">
              <div className="grid h-10 w-10 place-items-center rounded-xl" style={{ background: bg }}>
                <Icon size={18} style={{ color: tint }} strokeWidth={1.9} />
              </div>
              <span className="rounded-full bg-[var(--cream-2)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-muted ghair">Roadmap</span>
            </div>
            <h3 className="mt-4 font-display text-[15px] font-bold text-ink">{title}</h3>
            <p className="mt-1.5 flex-1 text-[13px] leading-relaxed text-ink-soft">{body}</p>
          </div>
        ))}
      </div>
    </CsSection>
  )
}
