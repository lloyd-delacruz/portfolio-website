import { SystemsMap } from '@/components/home/SystemsMap'
import { LiveDot, MonoLabel } from '@/components/home/primitives'

const SITES = ['vgh', 'ubc', 'lions_gate', 'richmond'] as const

export function ColdOpen() {
  return (
    <section className="relative min-h-[100svh] bg-surface-canvas text-surface-fg overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 pt-32 pb-16 md:pt-40">
        <MonoLabel className="block text-gold">01 · healthcare workflow systems · v3.x</MonoLabel>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-12 lg:items-center">
          <div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight-display leading-[1.04] text-surface-fg max-w-[18ch]">
              A system you can&apos;t see, running across four hospitals.
            </h1>

            <ul className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
              {SITES.map((site) => (
                <li key={site} className="inline-flex items-center gap-2">
                  <LiveDot />
                  <MonoLabel className="text-surface-fg-secondary">{site} · live</MonoLabel>
                </li>
              ))}
            </ul>

            <p className="mt-10 font-mono text-[10px] uppercase tracking-wide-label text-surface-fg-muted">
              representative operational model · phase 2 case study
            </p>
          </div>

          <div className="relative aspect-square w-full max-w-md mx-auto rounded-2xl border border-surface-subtle bg-surface-card overflow-hidden">
            <SystemsMap />
          </div>
        </div>
      </div>
    </section>
  )
}
