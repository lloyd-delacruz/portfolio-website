// frontend/src/components/casestudy/wheelchair/WcProblem.tsx
import { Accessibility, EyeOff, Radio, ClipboardX, Clock, HelpCircle } from 'lucide-react'
import { CsSection, Module } from '../bits'

const PAINS = [
  { Icon: EyeOff, title: 'No shared visibility', body: 'Each site tracked its own equipment its own way — nothing read across the network.' },
  { Icon: Radio, title: 'Manual coordination', body: 'Finding a chair meant a radio call and a walk through the floor.' },
  { Icon: ClipboardX, title: 'Inconsistent state', body: 'Cleaned? Inspected? Overdue? The log was paper — and often stale.' },
  { Icon: Clock, title: 'Slow, low accountability', body: 'Turnaround dragged, and there was no record of who had what, when.' },
]

function Silo({ label, dim }: { label: string; dim?: boolean }) {
  return (
    <div className="relative flex-1 rounded-xl bg-[var(--cream-2)] p-3 ghair">
      <span className="text-[11px] font-semibold text-ink-soft">{label}</span>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {[0, 1, 2, 3].map((i) => (
          <Accessibility
            key={i}
            size={16}
            strokeWidth={2}
            style={{ color: i === (dim ? 1 : 2) ? 'rgba(28,22,46,0.18)' : 'rgba(28,22,46,0.32)' }}
          />
        ))}
        <HelpCircle size={16} strokeWidth={2} style={{ color: 'var(--coral)' }} />
      </div>
    </div>
  )
}

export function WcProblem() {
  return (
    <CsSection
      id="problem"
      eyebrow="01 · The problem"
      title="An empty wheelchair was an open question."
      intro="Thousands of patient moves a week relied on equipment no system could locate. Four sites, four ways of knowing — and none of them shared."
      footnote="Pre-system state · representative."
    >
      <Module>
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">Before · fragmented coordination</p>
        <div className="mt-4 flex items-stretch gap-2 sm:gap-3">
          <Silo label="Site A" />
          <span className="self-center text-ink-muted" aria-hidden>· · ·</span>
          <Silo label="Site B" dim />
          <span className="self-center text-ink-muted" aria-hidden>· · ·</span>
          <Silo label="Site C" />
          <span className="self-center text-ink-muted" aria-hidden>· · ·</span>
          <Silo label="Site D" dim />
        </div>
        <p className="mt-3 text-xs text-ink-muted">No connecting line — because there wasn&apos;t one. The dotted gaps are radio calls, sticky notes, and best guesses.</p>
      </Module>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {PAINS.map(({ Icon, title, body }) => (
          <div key={title} className="rounded-2xl bg-white p-5 ghair soft-shadow-sm">
            <div className="grid h-10 w-10 place-items-center rounded-xl" style={{ background: 'rgba(248,112,96,0.12)' }}>
              <Icon size={18} style={{ color: 'var(--coral)' }} strokeWidth={1.9} />
            </div>
            <h3 className="mt-3 font-display text-[15px] font-bold text-ink">{title}</h3>
            <p className="mt-1.5 text-[13px] leading-relaxed text-ink-soft">{body}</p>
          </div>
        ))}
      </div>
    </CsSection>
  )
}
