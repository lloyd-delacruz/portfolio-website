// frontend/src/components/home/HomeHero.tsx
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { DiagramScene } from './DiagramScene'

export function HomeHero() {
  return (
    <section className="relative overflow-hidden">
      <div className="hero-wash pointer-events-none absolute inset-0" aria-hidden />
      <div className="relative mx-auto grid max-w-[1180px] grid-cols-1 items-center gap-14 px-6 pb-16 pt-14 lg:grid-cols-[1.05fr_1fr] lg:pt-20">
        {/* left */}
        <div>
          <span className="anim-rise inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-soft ghair">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'var(--green)' }} />
            AI Systems Architect
          </span>

          <h1 className="anim-rise mt-6 font-display text-[2.85rem] font-extrabold leading-[1.04] text-ink sm:text-[3.4rem] lg:text-[4rem]" style={{ animationDelay: '60ms' }}>
            I architect AI-native
            <br />
            systems that{' '}
            <br className="hidden sm:block" />
            <span className="grad-plum-text">run in production.</span>
          </h1>

          <p className="anim-rise mt-6 max-w-[40ch] text-[1.05rem] leading-relaxed text-ink-soft" style={{ animationDelay: '120ms' }}>
            I design and deploy enterprise AI orchestration — agents, workflows, event streams,
            and decision layers that coordinate real operational work across multi-site
            environments.
          </p>

          <div className="anim-rise mt-9 flex flex-wrap items-center gap-3" style={{ animationDelay: '180ms' }}>
            <Link
              href="/work"
              className="group inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white soft-shadow transition-transform hover:-translate-y-0.5"
              style={{ background: 'var(--plum)' }}
            >
              Explore my work
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/work/wheelchair-tracking"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-ink ghair-2 transition-colors hover:bg-[var(--cream-2)]"
            >
              Read the wheelchair tracking case
            </Link>
          </div>
        </div>

        {/* right */}
        <div className="anim-rise" style={{ animationDelay: '220ms' }}>
          <DiagramScene />
        </div>
      </div>
    </section>
  )
}
