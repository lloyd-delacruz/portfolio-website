import { Network, Activity, Users } from 'lucide-react'
import { CsSection } from '../bits'

const CARDS = [
  {
    Icon: Network,
    title: 'FHIR ingestion',
    body: 'Pull FNA observations from PACS/LIS directly.',
    tint: 'var(--blue)',
    bg: '#dbeafe',
  },
  {
    Icon: Activity,
    title: 'Drift monitoring',
    body: 'Watch input distributions, auto-flag calibration drift.',
    tint: 'var(--plum)',
    bg: 'var(--plum-soft)',
  },
  {
    Icon: Users,
    title: 'Human-in-the-loop',
    body: 'Clinician overrides feed the calibration retrain queue.',
    tint: 'var(--green)',
    bg: '#d1fae5',
  },
]

export function CrFutureAI() {
  return (
    <CsSection
      eyebrow="05 · What's next"
      title="From a triage signal to a learning loop."
      intro="The system improves with every clinician decision it observes."
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
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
