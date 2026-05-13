import { LiveDot, MonoLabel, SectionEyebrow } from './primitives'

type SiteRow = { name: string; live: boolean }
const SITES: SiteRow[] = [
  { name: 'VGH', live: true },
  { name: 'UBC Hospital', live: true },
  { name: 'Lions Gate', live: true },
  { name: 'Richmond', live: true },
]

export function LiveStatusPanel() {
  return (
    <section className="bg-paper-bg">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 lg:items-end">
          <div>
            <SectionEyebrow className="block mb-3">live · currently running</SectionEyebrow>
            <h2 className="font-sans text-2xl md:text-3xl font-bold tracking-tight-h text-paper-ink max-w-[26ch]">
              The system isn&apos;t a slide deck. It&apos;s running right now.
            </h2>
            <p className="mt-3 max-w-[44ch] text-sm text-paper-ink-soft">
              Workflow infrastructure across four hospitals in Vancouver Coastal Health.
            </p>
          </div>

          <div className="w-full lg:w-[360px] rounded-xl border border-paper-subtle bg-paper-card p-5">
            <div className="flex items-center justify-between mb-4">
              <span className="inline-flex items-center gap-2">
                <LiveDot />
                <MonoLabel className="text-paper-ink-soft">system status</MonoLabel>
              </span>
              <MonoLabel className="text-paper-ink-soft">v3.x · illustrative</MonoLabel>
            </div>

            <div className="font-sans text-3xl font-bold tracking-tight-h text-paper-ink">
              2,847 <span className="text-sm font-normal text-paper-ink-soft">tracked equipment</span>
            </div>

            <ul className="mt-5 divide-y divide-paper-subtle">
              {SITES.map((s) => (
                <li key={s.name} className="flex items-center justify-between py-2">
                  <span className="text-xs text-paper-ink-soft">{s.name}</span>
                  <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-gold-ink tracking-wide-label">
                    <LiveDot pulse={false} />
                    live
                  </span>
                </li>
              ))}
            </ul>

            <div className="flex items-center justify-between border-t border-paper-subtle pt-3 mt-1">
              <MonoLabel className="text-paper-ink-soft">uptime · 30d</MonoLabel>
              <span className="font-mono text-xs text-gold-ink">99.94%</span>
            </div>
          </div>
        </div>

        <p className="mt-4 font-mono text-[10px] uppercase tracking-wide-label text-paper-ink-soft">
          metrics shown are illustrative · phase 2 wires real telemetry
        </p>
      </div>
    </section>
  )
}
