// frontend/src/components/casestudy/equitrackr/EtLifecycle.tsx
import { ArrowRight, RotateCcw } from 'lucide-react'
import { CsSection, Module } from '../bits'

const C = {
  green: 'var(--green)',
  plum: 'var(--plum)',
  blue: 'var(--blue)',
  amber: 'var(--amber)',
  coral: 'var(--coral)',
  grey: 'rgba(28,22,46,0.35)',
}

const MAIN = [
  { name: 'Available', note: 'in the pool, ready to assign', color: C.green },
  { name: 'In Use', note: 'checked out to a unit / request', color: C.plum },
  { name: 'Returned', note: 'scanned back, awaiting turnaround', color: C.blue },
  { name: 'Cleaning', note: 'EVS cleans & confirms', color: C.amber },
]

const BRANCH = [
  { name: 'Maintenance', note: 'biomed services & signs off', color: C.coral },
  { name: 'Out of Service', note: 'removed from the pool', color: C.grey },
]

const DIST = [
  { name: 'Available', pct: 36, color: C.green },
  { name: 'In Use', pct: 41, color: C.plum },
  { name: 'Returned', pct: 6, color: C.blue },
  { name: 'Cleaning', pct: 11, color: C.amber },
  { name: 'Maintenance', pct: 4, color: C.coral },
  { name: 'Out of service', pct: 2, color: C.grey },
]

function StateCard({ name, note, color }: { name: string; note: string; color: string }) {
  return (
    <div className="flex-1 rounded-xl bg-white p-3.5 ghair soft-shadow-sm">
      <div className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full" style={{ background: color }} />
        <span className="text-[13px] font-bold text-ink">{name}</span>
      </div>
      <p className="mt-1 text-[11px] leading-relaxed text-ink-muted">{note}</p>
    </div>
  )
}

export function EtLifecycle() {
  return (
    <CsSection
      eyebrow="04 · Equipment lifecycle"
      title="Six states. Every asset knows which one it’s in."
      intro="Inventory is a count. A lifecycle is memory — it’s how the system knows what’s overdue for cleaning, what’s waiting on biomed, and what’s actually available right now."
      footnote="State mix is representative."
    >
      <Module>
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">The cycle</p>

        <div className="mt-4 flex flex-col items-stretch gap-2 lg:flex-row lg:items-center">
          {MAIN.map((s, i) => (
            <div key={s.name} className="flex flex-1 items-center gap-2">
              <StateCard {...s} />
              {i < MAIN.length - 1 && <ArrowRight size={16} className="hidden shrink-0 text-ink-muted lg:block" />}
            </div>
          ))}
          <div className="hidden items-center gap-1 text-ink-muted lg:flex">
            <RotateCcw size={14} />
            <span className="text-[10px] font-medium uppercase tracking-[0.1em]">back to available</span>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-3 rounded-xl bg-[var(--cream-2)] p-4 ghair sm:flex-row sm:items-center">
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">Side paths</span>
          <div className="flex flex-1 flex-col gap-2 sm:flex-row">
            {BRANCH.map((s, i) => (
              <div key={s.name} className="flex flex-1 items-center gap-2">
                <span className="text-xs text-ink-muted" aria-hidden>{i === 0 ? '└→' : '→'}</span>
                <StateCard {...s} />
              </div>
            ))}
          </div>
        </div>
        <p className="mt-3 text-xs text-ink-muted">Returned or Cleaning can branch to Maintenance; Maintenance can end at Out of Service. Every hop is one scan and one record.</p>
      </Module>

      <Module className="mt-6">
        <div className="flex items-baseline justify-between">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">Where the fleet is right now</p>
          <span className="text-[11px] text-ink-muted">representative</span>
        </div>
        <div className="mt-4 flex h-3 w-full overflow-hidden rounded-full">
          {DIST.map((d) => (
            <div key={d.name} style={{ width: `${d.pct}%`, background: d.color }} title={`${d.name} ${d.pct}%`} />
          ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
          {DIST.map((d) => (
            <span key={d.name} className="inline-flex items-center gap-1.5 text-[11px] text-ink-soft">
              <span className="h-2 w-2 rounded-full" style={{ background: d.color }} />
              {d.name} <span className="text-ink-muted">{d.pct}%</span>
            </span>
          ))}
        </div>
      </Module>
    </CsSection>
  )
}
