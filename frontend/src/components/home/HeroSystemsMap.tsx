// frontend/src/components/home/HeroSystemsMap.tsx
import { CtaButton, LiveDot, MonoLabel } from './primitives'
import { OperationalSystemsMap } from './OperationalSystemsMap'

const PRODUCTION_SITES = ['live', 'live', 'live', 'live']

export function HeroSystemsMap() {
  return (
    <section className="relative bg-surface-canvas">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 pb-20 pt-32 lg:min-h-[100svh] lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:pb-0 lg:pt-24">
        {/* left column */}
        <div>
          <p className="font-mono text-[11px] uppercase tracking-wide-label text-gold">
            applied ai engineer · healthcare systems builder
          </p>

          <h1 className="mt-6 font-serif text-4xl font-medium leading-[1.04] tracking-tight-display text-surface-fg md:text-6xl lg:text-7xl">
            I build operational systems that make healthcare{' '}
            <span className="italic text-gold">work</span>.
          </h1>

          <p className="mt-6 max-w-[46ch] text-base leading-relaxed text-surface-fg-secondary md:text-lg">
            I design and ship AI-native workflows that connect people, systems, and
            data — turning frontline complexity into operational clarity.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <CtaButton href="/work/wheelchair-tracking" variant="filled">
              view case study
            </CtaButton>
            <CtaButton href="#systems" variant="outline">
              explore the system
            </CtaButton>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2">
            <MonoLabel className="text-gold">systems in production</MonoLabel>
            {PRODUCTION_SITES.map((_, i) => (
              <span key={i} className="inline-flex items-center gap-1.5">
                <LiveDot pulse={false} />
                <MonoLabel>live</MonoLabel>
              </span>
            ))}
          </div>
        </div>

        {/* right column */}
        <div className="lg:pl-4">
          <OperationalSystemsMap />
        </div>
      </div>
    </section>
  )
}
