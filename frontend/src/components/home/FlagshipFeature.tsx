import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { MonoLabel } from './primitives'

export function FlagshipFeature() {
  return (
    <section className="bg-surface-canvas">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <Link
          href="/work/wheelchair-tracking"
          className="group block rounded-2xl border border-surface-subtle overflow-hidden transition-colors hover:border-gold/40"
        >
          <div className="relative bg-gradient-to-br from-surface-card via-surface-elevated to-[#1c2233] p-8 md:p-12">
            <div className="absolute right-6 top-6">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/10 px-3 py-1">
                <MonoLabel className="text-gold/90">featured · cathedral case study</MonoLabel>
                <ArrowUpRight className="h-3 w-3 text-gold/90 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </div>

            <MonoLabel className="block">01 · healthcare workflow systems</MonoLabel>
            <h3 className="mt-4 text-3xl md:text-5xl font-medium tracking-tight-display leading-[1.05] text-surface-fg max-w-[22ch]">
              Wheelchair Tracking System
            </h3>
            <p className="mt-5 max-w-[58ch] text-sm md:text-base text-surface-fg-secondary leading-relaxed">
              Operational visibility & accountability across VGH, UBC Hospital, Lions Gate, and Richmond. QR-driven workflows, equipment lifecycle tracking, real frontline use.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2">
              <MonoLabel>4 sites live</MonoLabel>
              <MonoLabel>microsoft lists · qr workflows</MonoLabel>
              <MonoLabel>v3.x</MonoLabel>
            </div>
          </div>
        </Link>
      </div>
    </section>
  )
}
