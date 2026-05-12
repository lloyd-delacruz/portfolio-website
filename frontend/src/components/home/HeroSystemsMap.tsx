import { SystemsMap } from './SystemsMap'
import { AccentPill } from './primitives'

export function HeroSystemsMap() {
  return (
    <section className="relative min-h-[100svh] bg-surface-canvas overflow-hidden">
      <SystemsMap />
      <div className="absolute inset-0 bg-gradient-to-b from-surface-canvas/0 via-surface-canvas/30 to-surface-canvas/85 pointer-events-none" />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-center px-6 pt-24">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight-display leading-[1.04] text-surface-fg max-w-[18ch]">
          Systems for <span className="text-gold">operational</span> intelligence.
        </h1>
        <p className="mt-6 max-w-[42ch] text-base md:text-lg text-surface-fg-secondary leading-relaxed">
          Applied AI workflow infrastructure — live across four hospitals.
        </p>
        <div className="mt-8 flex flex-wrap gap-2">
          <AccentPill>10y healthcare</AccentPill>
          <AccentPill>MSc Analytics</AccentPill>
          <AccentPill>AWS AI</AccentPill>
        </div>
      </div>
    </section>
  )
}
