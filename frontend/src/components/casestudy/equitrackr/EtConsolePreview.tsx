// frontend/src/components/casestudy/equitrackr/EtConsolePreview.tsx
import { Accessibility, BedDouble, ArrowUpDown, Droplets, Search } from 'lucide-react'

const RAIL = [
  { Icon: Accessibility, label: 'Wheelchairs', n: 214, active: true },
  { Icon: BedDouble, label: 'Beds', n: 96 },
  { Icon: ArrowUpDown, label: 'Lifts', n: 32 },
  { Icon: Droplets, label: 'Infusion pumps', n: 140 },
]

const COLUMNS: { title: string; color: string; cards: { id: string; loc: string }[] }[] = [
  { title: 'Available', color: 'var(--green)', cards: [{ id: 'WC-2207', loc: 'EVS · ready' }, { id: 'WC-2188', loc: 'Ward 4B' }] },
  { title: 'In Use', color: 'var(--plum)', cards: [{ id: 'WC-2192', loc: 'ICU · req #4821' }] },
  { title: 'Cleaning', color: 'var(--amber)', cards: [{ id: 'WC-2174', loc: 'EVS · queued' }, { id: 'WC-2201', loc: 'EVS · in prog' }] },
]

function MiniCard({ id, loc, color }: { id: string; loc: string; color: string }) {
  return (
    <div className="rounded-lg bg-white p-2 ghair">
      <div className="flex items-center gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: color }} />
        <span className="text-[11px] font-semibold text-ink">{id}</span>
      </div>
      <p className="mt-0.5 text-[10px] text-ink-muted">{loc}</p>
    </div>
  )
}

export function EtConsolePreview() {
  return (
    <div className="relative mx-auto w-full max-w-[560px]">
      {/* depth ghosts */}
      <div className="absolute -right-4 -top-4 h-full w-full rounded-2xl bg-white/50 ghair" aria-hidden />
      <div className="absolute -left-3 top-3 h-full w-full rounded-2xl bg-white/40 ghair" aria-hidden />

      {/* glow */}
      <div
        className="absolute left-1/2 top-1/2 h-44 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
        style={{ background: 'radial-gradient(closest-side, rgba(124,58,237,0.14), transparent)' }}
        aria-hidden
      />

      {/* window */}
      <div className="relative overflow-hidden rounded-2xl bg-white ghair-2 soft-shadow-lg">
        {/* title bar */}
        <div className="flex items-center gap-2 px-4 py-3" style={{ borderBottom: '1px solid var(--line)' }}>
          <span className="flex gap-1">
            <span className="h-2 w-2 rounded-full bg-black/15" />
            <span className="h-2 w-2 rounded-full bg-black/15" />
            <span className="h-2 w-2 rounded-full bg-black/15" />
          </span>
          <span className="ml-1 text-[11px] font-semibold text-ink-soft">EquiTrackr · Operations</span>
          <span className="ml-auto flex items-center gap-1.5 rounded-md bg-[var(--cream-2)] px-2 py-1 text-[10px] text-ink-muted ghair">
            <Search size={10} /> search assets…
          </span>
        </div>

        <div className="flex">
          {/* rail */}
          <div className="hidden w-36 shrink-0 flex-col gap-1 p-3 sm:flex" style={{ borderRight: '1px solid var(--line)' }}>
            <p className="px-1 pb-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-ink-muted">Asset classes</p>
            {RAIL.map(({ Icon, label, n, active }) => (
              <div
                key={label}
                className="flex items-center gap-2 rounded-lg px-2 py-1.5"
                style={active ? { background: 'var(--plum-soft)' } : undefined}
              >
                <Icon size={13} style={{ color: active ? 'var(--plum)' : 'var(--ink-muted)' }} strokeWidth={2} />
                <span className="text-[11px] font-medium" style={{ color: active ? 'var(--plum)' : 'var(--ink-soft)' }}>{label}</span>
                <span className="ml-auto text-[10px] text-ink-muted">{n}</span>
              </div>
            ))}
          </div>

          {/* board */}
          <div className="grid flex-1 grid-cols-3 gap-2 p-3">
            {COLUMNS.map((col) => (
              <div key={col.title} className="flex flex-col gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: col.color }} />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-ink-soft">{col.title}</span>
                  <span className="ml-auto text-[10px] text-ink-muted">{col.cards.length}</span>
                </div>
                {col.cards.map((c) => (
                  <MiniCard key={c.id} {...c} color={col.color} />
                ))}
                <div className="rounded-lg border border-dashed py-2 text-center text-[10px] text-ink-muted" style={{ borderColor: 'var(--line)' }}>
                  + more
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
