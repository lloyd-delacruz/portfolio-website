import { LiveDot, MonoLabel } from '@/components/home/primitives'

const SITES = ['vgh', 'ubc', 'lions_gate', 'richmond'] as const
const FLOW = ['scan', 'state change', 'registry', 'dashboards', 'cross-site'] as const

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
            <p className="mt-6 text-base md:text-lg text-surface-fg-secondary max-w-[52ch]">
              QR-driven workflows that track equipment from scan to state to a shared registry — so four hospitals run on one operational truth.
            </p>

            <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              {SITES.map((site) => (
                <li key={site} className="inline-flex items-center gap-2">
                  <LiveDot />
                  <MonoLabel className="text-surface-fg-secondary">{site} · live</MonoLabel>
                </li>
              ))}
            </ul>

            {/* The whole story, before you scroll */}
            <div className="mt-10">
              <MonoLabel className="block mb-3 text-surface-fg-muted">the flow · five steps</MonoLabel>
              <ol className="flex flex-wrap items-center gap-x-2 gap-y-2">
                {FLOW.map((step, i) => (
                  <li key={step} className="inline-flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-surface-subtle bg-surface-card px-3 py-1">
                      <span className="font-mono text-[10px] text-gold">{i + 1}</span>
                      <span className="font-mono text-[10px] uppercase tracking-wide-label text-surface-fg-secondary">{step}</span>
                    </span>
                    {i < FLOW.length - 1 && <span aria-hidden className="font-mono text-[10px] text-surface-fg-muted">→</span>}
                  </li>
                ))}
              </ol>
            </div>

            <p className="mt-8 font-mono text-[10px] uppercase tracking-wide-label text-surface-fg-muted">
              representative operational model · phase 2 case study
            </p>
          </div>

          <div className="relative aspect-square w-full max-w-md mx-auto rounded-2xl border border-surface-subtle bg-surface-card overflow-hidden">
            <svg viewBox="0 0 120 96" className="h-full w-full" aria-hidden="true">
              <circle cx="60" cy="48" r="34" fill="hsl(var(--accent-gold) / 0.06)" />
              {[
                { x: 20, y: 18 },
                { x: 100, y: 18 },
                { x: 20, y: 78 },
                { x: 100, y: 78 },
              ].map((n, i) => (
                <line
                  key={i}
                  x1="60" y1="48" x2={n.x} y2={n.y}
                  stroke="hsl(var(--accent-gold) / 0.4)" strokeWidth={0.35}
                />
              ))}
              {[
                { x: 20, y: 18 },
                { x: 100, y: 18 },
                { x: 20, y: 78 },
                { x: 100, y: 78 },
              ].map((n, i) => (
                <circle
                  key={i}
                  cx={n.x} cy={n.y} r="5.4"
                  fill="hsl(var(--surface-canvas))"
                  stroke="hsl(var(--accent-gold) / 0.55)" strokeWidth={0.35}
                />
              ))}
              <circle cx="60" cy="48" r="11" fill="hsl(var(--surface-canvas))"
                stroke="hsl(var(--accent-gold) / 0.7)" strokeWidth={0.4} />
              <text x="60" y="47.5" textAnchor="middle"
                fontSize="2.6" fontFamily="var(--font-geist-mono), monospace"
                fill="hsl(var(--accent-gold))">workflow_core</text>
              <text x="60" y="51" textAnchor="middle"
                fontSize="2.4" fontFamily="var(--font-geist-mono), monospace"
                fill="hsl(var(--surface-fg-secondary))">v3.x</text>
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
