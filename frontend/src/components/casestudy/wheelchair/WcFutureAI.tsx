// frontend/src/components/casestudy/wheelchair/WcFutureAI.tsx
import { Wrench, TrendingUp, MessageSquare, Route } from 'lucide-react'
import { CsSection } from '../bits'

const CARDS = [
  {
    Icon: Wrench,
    title: 'Predictive maintenance',
    body: 'Usage and state history flag the assets most likely to need service — before they fail mid-transport.',
    tint: 'var(--coral)',
    bg: 'rgba(248,112,96,0.12)',
  },
  {
    Icon: TrendingUp,
    title: 'Utilization forecasting',
    body: 'Anticipate demand spikes by site and shift, and pre-position equipment instead of chasing it.',
    tint: 'var(--blue)',
    bg: '#dbeafe',
  },
  {
    Icon: MessageSquare,
    title: 'Operational copilot',
    body: 'Ask the registry in plain language — “where are Site C’s idle chairs?” — grounded in real records.',
    tint: 'var(--plum)',
    bg: 'var(--plum-soft)',
  },
  {
    Icon: Route,
    title: 'AI-assisted logistics',
    body: 'Suggest transfers between sites before a shortage becomes a delayed discharge.',
    tint: 'var(--green)',
    bg: '#d1fae5',
  },
]

export function WcFutureAI() {
  return (
    <CsSection
      eyebrow="05 · Where this goes"
      title="The registry becomes the training set."
      intro="Every scan is already a labelled event. Over time that’s a clean operational dataset — and a foundation for intelligence that stays grounded in what the system actually records."
      footnote="Roadmap — no model where a rule will do."
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {CARDS.map(({ Icon, title, body, tint, bg }) => (
          <div key={title} className="lift flex flex-col rounded-2xl bg-white p-5 ghair">
            <div className="flex items-center justify-between">
              <div className="grid h-10 w-10 place-items-center rounded-xl" style={{ background: bg }}>
                <Icon size={18} style={{ color: tint }} strokeWidth={1.9} />
              </div>
              <span className="rounded-full bg-[var(--cream-2)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-muted ghair">
                Roadmap
              </span>
            </div>
            <h3 className="mt-4 font-display text-[15px] font-bold text-ink">{title}</h3>
            <p className="mt-1.5 flex-1 text-[13px] leading-relaxed text-ink-soft">{body}</p>
          </div>
        ))}
      </div>
    </CsSection>
  )
}
