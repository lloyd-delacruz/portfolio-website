import { LiveDot, MonoLabel } from './primitives'

type SiteRow = { name: string; live: boolean }
const SITES: SiteRow[] = [
  { name: 'VGH', live: true },
  { name: 'UBC Hospital', live: true },
  { name: 'Lions Gate', live: true },
  { name: 'Richmond', live: true },
]

export function LiveStatusPanel() {
  return (
    <section className="bg-surface-canvas">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 lg:items-end">
          <div>
            <MonoLabel className="block mb-3">live · currently running</MonoLabel>
            <h2 className="font-serif text-2xl md:text-3xl font-medium tracking-tight-h text-surface-fg max-w-[26ch]">
              The system isn&apos;t a slide deck. It&apos;s running right now.
            </h2>
            <p className="mt-3 max-w-[44ch] text-sm text-surface-fg-secondary">
              Workflow infrastructure across four hospitals in Vancouver Coastal Health.
            </p>
          </div>

          <div className="w-full lg:w-[360px] rounded-xl border border-surface-subtle bg-surface-card p-5">
            <div className="flex items-center justify-between mb-4">
              <span className="inline-flex items-center gap-2">
                <LiveDot />
                <MonoLabel>system status</MonoLabel>
              </span>
              <MonoLabel>v3.x · illustrative</MonoLabel>
            </div>

            <div className="font-mono text-3xl font-medium tracking-tight-h text-surface-fg">
              2,847 <span className="text-sm font-normal text-surface-fg-muted">tracked equipment</span>
            </div>

            <ul className="mt-5 divide-y divide-surface-subtle">
              {SITES.map((s) => (
                <li key={s.name} className="flex items-center justify-between py-2">
                  <span className="text-xs text-surface-fg-secondary">{s.name}</span>
                  <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-gold tracking-wide-label">
                    <LiveDot pulse={false} />
                    live
                  </span>
                </li>
              ))}
            </ul>

            <div className="flex items-center justify-between border-t border-surface-subtle pt-3 mt-1">
              <MonoLabel>uptime · 30d</MonoLabel>
              <span className="font-mono text-xs text-gold">99.94%</span>
            </div>
          </div>
        </div>

        <p className="mt-4 font-mono text-[10px] uppercase tracking-wide-label text-surface-fg-muted">
          metrics shown are illustrative · phase 2 wires real telemetry
        </p>
      </div>
    </section>
  )
}
