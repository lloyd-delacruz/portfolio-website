// frontend/src/components/casestudy/wheelchair/WcHero.tsx
import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { WcSystemMap } from './WcSystemMap'

const META = [
  { k: 'Role', v: 'Systems design & build' },
  { k: 'Sites', v: '4 hospitals' },
  { k: 'Scale', v: '800+ assets' },
  { k: 'Status', v: 'In production' },
]

export function WcHero() {
  return (
    <section className="relative overflow-hidden">
      <div className="hero-wash pointer-events-none absolute inset-0" aria-hidden />
      <div className="relative mx-auto max-w-[1180px] px-6 pb-14 pt-12 lg:pt-16">
        <Link href="/work" className="group inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted transition-colors hover:text-ink">
          <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" />
          All work
        </Link>

        <div className="mt-6 grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <span className="anim-rise inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-soft ghair">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'var(--plum)' }} />
              Healthcare Operations · Multi-Site
            </span>

            <h1 className="anim-rise mt-5 font-display text-[2.5rem] font-extrabold leading-[1.06] text-ink sm:text-[3rem] lg:text-[3.4rem]" style={{ animationDelay: '60ms' }}>
              Multi-Site Wheelchair
              <br />
              <span className="grad-plum-text">Tracking System</span>
            </h1>

            <p className="anim-rise mt-5 max-w-[40ch] text-[1.08rem] leading-relaxed text-ink-soft" style={{ animationDelay: '120ms' }}>
              Real-time visibility and chain-of-custody for 800+ wheelchairs and clinical assets
              across four hospital sites — built on QR scan workflows and a shared state model.
            </p>

            <div className="anim-rise mt-7 flex flex-wrap items-center gap-3" style={{ animationDelay: '180ms' }}>
              <Link
                href="#workflow"
                className="group inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white soft-shadow transition-transform hover:-translate-y-0.5"
                style={{ background: 'var(--plum)' }}
              >
                See the workflow
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="#problem"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-ink ghair-2 transition-colors hover:bg-[var(--cream-2)]"
              >
                Start from the problem
              </Link>
            </div>

            <dl className="anim-rise mt-9 grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-4" style={{ animationDelay: '220ms' }}>
              {META.map((m) => (
                <div key={m.k}>
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">{m.k}</dt>
                  <dd className="mt-1 text-sm font-medium text-ink">{m.v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="anim-rise" style={{ animationDelay: '260ms' }}>
            <WcSystemMap />
          </div>
        </div>
      </div>
    </section>
  )
}
