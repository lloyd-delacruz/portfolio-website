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
            Healthcare Operations &middot; Data &amp; AI Systems
          </span>

          <h1
            className="anim-rise mt-6 max-w-[18ch] font-display text-[2.85rem] font-extrabold leading-[1.04] text-ink sm:text-[3.4rem] lg:text-[4rem]"
            style={{ animationDelay: '60ms' }}
          >
            Operational healthcare systems, engineered from{' '}
            <span className="grad-plum-text">inside the workflow.</span>
          </h1>

          <p
            className="anim-rise mt-6 max-w-[52ch] text-[1.05rem] leading-relaxed text-ink-soft"
            style={{ animationDelay: '120ms' }}
          >
            9 years inside hospital operations, an MSc in Data Science, and the analytics, AI,
            and applications clinical teams actually use — SQL, Python, R, Tableau / Power BI,
            LLM workflows, and full-stack systems on Next.js, FastAPI, and PostgreSQL.
          </p>

          <p
            className="anim-rise mt-6 text-[12px] leading-relaxed text-ink-muted"
            style={{ animationDelay: '180ms' }}
          >
            Vancouver, BC · Open to healthcare data, analytics, AI, and application engineering roles —
            remote, hybrid, or on-site · Currently running a multi-site hospital equipment-tracking and
            analytics system in production
          </p>

          <div
            className="anim-rise mt-6 flex flex-wrap items-center gap-6"
            style={{ animationDelay: '240ms' }}
          >
            <Link
              href="/work/wheelchair-tracking"
              className="group inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white soft-shadow transition-transform hover:-translate-y-0.5"
              style={{ background: 'var(--plum)' }}
            >
              See the production system
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="#core-capabilities"
              className="group inline-flex items-center gap-1.5 text-sm font-semibold text-ink transition-colors hover:text-[var(--plum)]"
            >
              Core capabilities
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
