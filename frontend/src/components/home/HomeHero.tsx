// frontend/src/components/home/HomeHero.tsx
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SystemArchitectureSketch } from './SystemArchitectureSketch'

export function HomeHero() {
  return (
    <section className="relative overflow-hidden">
      <div className="hero-wash pointer-events-none absolute inset-0" aria-hidden />
      <div className="relative mx-auto grid max-w-[1180px] grid-cols-1 items-center gap-14 px-6 pb-16 pt-14 lg:grid-cols-[1.05fr_1fr] lg:pt-20">
        {/* left */}
        <div>
          <span className="anim-rise inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-soft ghair">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'var(--plum)' }} />
            Healthcare Systems Engineer
          </span>

          <h1
            className="anim-rise mt-6 max-w-[18ch] font-display text-[2.125rem] font-extrabold leading-[1.06] text-ink sm:text-[2.75rem] lg:text-[3.375rem] xl:text-[4rem]"
            style={{ animationDelay: '60ms' }}
          >
            Operational healthcare systems, built from{' '}
            <span className="grad-plum-text">inside the workflow.</span>
          </h1>

          <p
            className="anim-rise mt-6 max-w-[52ch] text-[1.05rem] leading-relaxed text-ink-soft"
            style={{ animationDelay: '120ms' }}
          >
            I spent years on hospital and rehab floors before I wrote the software for them.
            Now I build the multi-tenant, audit-enforced systems clinical operations run on —
            equipment fleets, provisioning, and clinical retrieval.
          </p>

          <p
            className="anim-rise mt-6 text-[12px] leading-relaxed text-ink-muted"
            style={{ animationDelay: '180ms' }}
          >
            Clinical workflows · Backend architecture · Applied AI — Vancouver, BC · Currently running a
            multi-site equipment-tracking system live across 4 Vancouver Coastal Health sites
          </p>

          <div
            className="anim-rise mt-6 flex flex-wrap items-center gap-3"
            style={{ animationDelay: '240ms' }}
          >
            <Link
              href="/work/wheelchair-tracking"
              className="group inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white soft-shadow transition-transform hover:-translate-y-0.5"
              style={{ background: 'var(--plum)' }}
            >
              See the live system
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/work"
              className="group inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-ink ghair transition-transform hover:-translate-y-0.5"
            >
              View all projects
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Link>
          </div>
        </div>

        {/* right */}
        <div className="anim-rise" style={{ animationDelay: '220ms' }}>
          <SystemArchitectureSketch />
        </div>
      </div>
    </section>
  )
}
