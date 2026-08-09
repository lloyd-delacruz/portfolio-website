// frontend/src/components/casestudy/mepp/MpHero.tsx
import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { DBox, HArrow, VArrow, Boundary } from './svg'

function MpHeroGlyph() {
  return (
    <svg
      viewBox="0 0 440 280"
      className="h-auto w-full max-w-[440px]"
      role="img"
      aria-label="Clinician requests flow into a dashed tenant boundary holding an encrypted patient store; a separate de-identified path leaves the boundary to reach vendors."
    >
      <title>MEPP trust boundary at a glance</title>
      <DBox x={8} y={112} w={104} h={54} label="Clinician" sub="request" fs={12} />
      <HArrow x1={112} x2={146} y={139} />
      <Boundary x={146} y={16} w={186} h={248} label="TENANT BOUNDARY" />
      <DBox x={160} y={46} w={158} h={50} label="API" sub="tenant-scoped" fs={12} />
      <VArrow x={239} y1={96} y2={124} />
      <DBox x={160} y={124} w={158} h={54} label="Encrypted PHI" sub="AES-256-GCM" tone="plum" fs={12} />
      <VArrow x={239} y1={178} y2={204} />
      <DBox x={160} y={204} w={158} h={48} label="De-identified" sub="projection" tone="muted" fs={12} />
      <HArrow x1={332} x2={368} y={228} tone="plum" />
      <DBox x={368} y={200} w={68} h={56} label="Vendor" fs={12} />
    </svg>
  )
}

export function MpHero() {
  return (
    <section className="relative overflow-hidden">
      <div className="hero-wash pointer-events-none absolute inset-0" aria-hidden />
      <div className="relative mx-auto max-w-[1180px] px-6 pb-14 pt-12 lg:pt-16">
        <Link
          href="/work"
          className="group inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted transition-colors hover:text-ink"
        >
          <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" />
          All work
        </Link>

        <div className="mt-6 grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <span className="anim-rise inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-soft ghair">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'var(--plum)' }} />
              Healthcare SaaS · Postgres-first
            </span>

            <h1
              className="anim-rise mt-5 font-display text-[2.5rem] font-extrabold leading-[1.06] text-ink sm:text-[3rem] lg:text-[3.3rem]"
              style={{ animationDelay: '60ms' }}
            >
              MEPP 2.0
              <br />
              <span className="grad-plum-text">Vendors never see the patient</span>
            </h1>

            <p
              className="anim-rise mt-5 max-w-[44ch] text-[1.08rem] leading-relaxed text-ink-soft"
              style={{ animationDelay: '120ms' }}
            >
              A system of record for prescribing and provisioning medical equipment. Clinicians, coordinators
              and outside vendors share one order — but patient identity stays inside a tenant-scoped,
              encrypted store.
            </p>

            <div className="anim-rise mt-7 flex flex-wrap items-center gap-3" style={{ animationDelay: '180ms' }}>
              <Link
                href="#blind-index"
                className="group inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white soft-shadow transition-transform hover:-translate-y-0.5"
                style={{ background: 'var(--plum)' }}
              >
                The blind index
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="#problem"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-ink ghair-2 transition-colors hover:bg-[var(--cream-2)]"
              >
                Start from the problem
              </Link>
            </div>
          </div>

          <div className="anim-rise" style={{ animationDelay: '260ms' }}>
            <MpHeroGlyph />
          </div>
        </div>
      </div>
    </section>
  )
}
