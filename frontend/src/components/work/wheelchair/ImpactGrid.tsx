import { MonoLabel } from '@/components/home/primitives'

type Tile = {
  numeral: string
  label: string
  before: string
  after: string
  /** illustrative fill for the "after" state, 0–1 */
  fill: number
}

const TILES: Tile[] = [
  { numeral: '< 4 min', label: 'Time to locate equipment',      before: '~30 min · radio call', after: 'scan-driven',         fill: 0.13 },
  { numeral: '94%',     label: 'State-accurate at any hour',    before: 'unknowable',           after: 'registry-backed',     fill: 0.94 },
  { numeral: '38 min',  label: 'Median cleaning cycle',         before: 'untracked',            after: 'timestamped',         fill: 0.55 },
  { numeral: '22 min',  label: 'Cross-site transfer lag',       before: 'phone-dependent',      after: 'in-app handoff',      fill: 0.3  },
  { numeral: '6 hr',    label: 'Maintenance flag → resolution', before: 'multi-day',            after: 'flagged at scan',     fill: 0.2  },
  { numeral: '100%',    label: 'State-change audit coverage',   before: '0%',                   after: 'every event logged',  fill: 1.0  },
]

export function ImpactGrid() {
  return (
    <section className="border-t border-surface-subtle bg-surface-canvas text-surface-fg">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <MonoLabel className="block mb-4 text-gold">06 · impact · representative model</MonoLabel>
        <h2 className="text-3xl md:text-4xl font-medium tracking-tight-h text-surface-fg max-w-[26ch]">
          What changes when the system can see itself.
        </h2>

        <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 md:mt-12">
          {TILES.map((t) => (
            <li key={t.label} className="rounded-xl border border-surface-subtle bg-surface-card p-6">
              <div className="font-mono text-3xl font-medium tracking-tight-h text-surface-fg">{t.numeral}</div>
              <div className="mt-2 text-sm text-surface-fg-secondary">{t.label}</div>

              {/* before → after mini-bar (illustrative) */}
              <div className="mt-5 pt-4 border-t border-surface-subtle">
                <div className="relative h-1.5 overflow-hidden rounded-full bg-surface-canvas">
                  <div className="absolute inset-0 bg-white/[0.06]" />
                  <div className="absolute inset-y-0 left-0 rounded-full bg-gold/70" style={{ width: `${Math.round(t.fill * 100)}%` }} />
                </div>
                <p className="mt-2 flex items-center gap-1.5 font-mono text-[11px]">
                  <span className="text-surface-fg-muted line-through decoration-surface-fg-muted/50">{t.before}</span>
                  <span className="text-gold">→</span>
                  <span className="text-surface-fg-secondary">{t.after}</span>
                </p>
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-10 font-mono text-[10px] uppercase tracking-wide-label text-surface-fg-muted">
          30-day rolling · representative operational figures · bars are illustrative · phase 2 wires real telemetry
        </p>
      </div>
    </section>
  )
}
