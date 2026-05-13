// frontend/src/components/casestudy/equitrackr/EtProblem.tsx
import { Search, Split, Clock, CircleHelp, ClipboardX, Phone, StickyNote, Footprints } from 'lucide-react'
import { CsSection, Module } from '../bits'

const DEPTS = ['ED', 'ICU', 'Imaging', 'Rehab', 'Wards']
const GREY = 'rgba(28,22,46,0.22)'

const PAINS = [
  { Icon: Search, title: 'Equipment goes missing', body: 'An asset leaves a unit and effectively drops off the map.' },
  { Icon: Split, title: 'Fragmented coordination', body: 'Departments negotiate one device at a time, by phone.' },
  { Icon: Clock, title: 'Delayed retrieval', body: 'Care waits while someone hunts a pump or a lift.' },
  { Icon: CircleHelp, title: 'Unclear status', body: 'Clean? In use? Out of service? Nobody can say for sure.' },
  { Icon: ClipboardX, title: 'Manual tracking friction', body: 'Sign-out sheets and whiteboards that go stale by lunch.' },
]

const FRICTION = [
  { Icon: Phone, label: 'phone around', top: '14%', left: '40%' },
  { Icon: StickyNote, label: 'sign-out sheet', top: '52%', left: '34%' },
  { Icon: Footprints, label: 'walk the units', top: '78%', left: '46%' },
]

const W = 560
const H = 250

export function EtProblem() {
  const deptY = (i: number) => 18 + i * 46
  return (
    <CsSection
      id="problem"
      eyebrow="01 · The operational friction"
      title="Equipment moves all day. Knowledge of it doesn’t."
      intro="Mobile clinical assets cross departments constantly — but coordination still happens by phone, paper, and footwork. The pool is shared; the picture of it isn’t."
      footnote="Pre-platform state · representative."
    >
      <Module>
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">Before · coordination by phone, paper, and footwork</p>
        <div className="relative mt-4 w-full" style={{ paddingBottom: `${(H / W) * 100}%` }}>
          <div className="absolute inset-0">
            <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" fill="none" aria-hidden>
              {DEPTS.map((_, i) => (
                <path
                  key={i}
                  d={`M 130 ${deptY(i) + 14} C 250 ${deptY(i) + 14}, 320 ${110 + (i - 2) * 8}, 420 125`}
                  stroke={GREY}
                  strokeWidth={1.6}
                  strokeDasharray="3 5"
                />
              ))}
            </svg>

            {/* dept boxes */}
            {DEPTS.map((d, i) => (
              <div
                key={d}
                className="absolute flex items-center rounded-lg bg-[var(--cream-2)] px-3 ghair"
                style={{ left: `${(8 / W) * 100}%`, top: `${(deptY(i) / H) * 100}%`, width: `${(122 / W) * 100}%`, height: `${(28 / H) * 100}%` }}
              >
                <span className="text-[11px] font-semibold text-ink-soft">{d}</span>
                <span className="ml-auto text-ink-muted">?</span>
              </div>
            ))}

            {/* friction tags */}
            {FRICTION.map(({ Icon, label, top, left }) => (
              <span
                key={label}
                className="absolute -translate-x-1/2 -translate-y-1/2 inline-flex items-center gap-1 rounded-full bg-white px-2 py-0.5 text-[10px] font-medium text-ink-muted ghair"
                style={{ top, left }}
              >
                <Icon size={10} style={{ color: 'var(--coral)' }} />
                {label}
              </span>
            ))}

            {/* pool */}
            <div
              className="absolute flex flex-col items-center justify-center rounded-xl bg-white ghair-2 soft-shadow-sm"
              style={{ right: '2%', top: '30%', width: `${(124 / W) * 100}%`, height: `${(96 / H) * 100}%` }}
            >
              <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-muted">Shared</span>
              <span className="font-display text-sm font-extrabold text-ink">Equipment pool</span>
              <span className="mt-1 text-[10px] text-ink-muted">whereabouts: unclear</span>
            </div>
          </div>
        </div>
        <p className="mt-3 text-xs text-ink-muted">Every dotted path is a call, a sheet, or a walk — and none of it leaves a record.</p>
      </Module>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
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
