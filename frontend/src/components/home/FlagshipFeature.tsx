import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { MonoLabel } from './primitives'

export function FlagshipFeature() {
  return (
    <section className="bg-paper-bg">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <Link
          href="/work/wheelchair-tracking"
          className="group block rounded-2xl border border-paper-subtle overflow-hidden transition-colors hover:border-gold-ink/40 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-ink focus-visible:outline-offset-2"
        >
          <div className="relative bg-paper-card p-8 md:p-12">
            <div className="absolute right-4 top-4 hidden sm:flex">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-gold-ink/30 bg-gold-ink/10 px-3 py-1">
                <MonoLabel className="text-gold-ink">featured · case study</MonoLabel>
                <ArrowUpRight className="h-3 w-3 text-gold-ink group-hover:translate-x-0.5 transition-transform" />
              </span>
            </div>

            <MonoLabel className="block text-gold-ink">01 · healthcare workflow systems</MonoLabel>
            <h3 className="mt-4 font-sans text-3xl md:text-5xl font-bold tracking-tight-display leading-[1.05] text-paper-ink max-w-[22ch]">
              Wheelchair Tracking System
            </h3>
            <p className="mt-5 max-w-[58ch] text-sm md:text-base text-paper-ink-soft leading-relaxed">
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
