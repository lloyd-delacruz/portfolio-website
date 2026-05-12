import { RegisterHandoff } from './primitives'
import { MonoLabel } from '@/components/home/primitives'

type Tile = { numeral: string; label: string; before: string; after: string }

const TILES: Tile[] = [
  { numeral: '< 4 min', label: 'Time to locate equipment',     before: '~30 min · radio call', after: 'scan-driven' },
  { numeral: '94%',     label: 'State-accurate at any hour',   before: 'unknowable',           after: 'registry-backed' },
  { numeral: '38 min',  label: 'Median cleaning cycle',        before: 'untracked',            after: 'timestamped' },
  { numeral: '22 min',  label: 'Cross-site transfer lag',      before: 'phone-dependent',      after: 'in-app handoff' },
  { numeral: '6 hr',    label: 'Maintenance flag → resolution', before: 'multi-day',            after: 'flagged at scan' },
  { numeral: '100%',    label: 'State-change audit coverage',  before: '0%',                   after: 'every event logged' },
]

export function ImpactGrid() {
  return (
    <>
      <RegisterHandoff direction="paper-to-surface" />
      <section className="bg-surface-canvas text-surface-fg">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <MonoLabel className="block mb-4 text-gold">operational impact · representative model</MonoLabel>
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight-h text-surface-fg max-w-[28ch] mb-12">
            What changes when the system is observable.
          </h2>

          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TILES.map((t) => (
              <li key={t.label} className="rounded-xl border border-surface-subtle bg-surface-card p-6">
                <div className="font-mono text-3xl font-medium tracking-tight-h text-surface-fg">
                  {t.numeral}
                </div>
                <div className="mt-2 text-sm text-surface-fg-secondary">
                  {t.label}
                </div>
                <div className="mt-5 pt-4 border-t border-surface-subtle">
                  <MonoLabel className="block mb-1 text-surface-fg-muted">before → after</MonoLabel>
                  <p className="font-mono text-[11px] text-surface-fg-secondary">
                    <span className="text-surface-fg-muted">{t.before}</span>
                    <span className="mx-1.5 text-gold">→</span>
                    <span>{t.after}</span>
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <p className="mt-10 font-mono text-[10px] uppercase tracking-wide-label text-surface-fg-muted">
            30-day rolling · representative operational figures · phase 2 wires real telemetry
          </p>
        </div>
      </section>
    </>
  )
}
