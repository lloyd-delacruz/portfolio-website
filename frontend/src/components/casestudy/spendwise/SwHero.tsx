// frontend/src/components/casestudy/spendwise/SwHero.tsx
import Link from 'next/link'
import { ArrowRight, ArrowLeft, Sparkles } from 'lucide-react'
import { SwPhone } from './SwPhone'
import { ReadyToAssignScreen, Sparkbars, CategoryRow, CATEGORIES } from './SwScreens'

const META = [
  { k: 'Role', v: 'Product & systems design' },
  { k: 'Surface', v: 'iOS · Android · Web' },
  { k: 'Method', v: 'Zero-based budgeting' },
  { k: 'Stack', v: 'React Native · Expo · Node · Postgres · Prisma' },
]

export function SwHero() {
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
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'var(--teal)' }} />
              Fintech · AI-native planning platform
            </span>

            <h1 className="anim-rise mt-5 font-display text-[2.5rem] font-extrabold leading-[1.06] text-ink sm:text-[3rem] lg:text-[3.4rem]" style={{ animationDelay: '60ms' }}>
              SpendWise — give every
              <br />
              <span className="grad-swirl-text">dollar a job.</span>
            </h1>

            <p className="anim-rise mt-5 max-w-[44ch] text-[1.08rem] leading-relaxed text-ink-soft" style={{ animationDelay: '120ms' }}>
              A modern financial operating system: onboard, connect accounts, build a
              zero-based budget, track every transaction, and let AI-assisted planning keep
              the plan honest — calm, mobile-first, and operationally thoughtful.
            </p>

            <div className="anim-rise mt-7 flex flex-wrap items-center gap-3" style={{ animationDelay: '180ms' }}>
              <Link href="#product" className="group inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white soft-shadow transition-transform hover:-translate-y-0.5" style={{ background: 'var(--teal)' }}>
                See the product
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link href="#problem" className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-ink ghair-2 transition-colors hover:bg-[var(--cream-2)]">
                Start from the friction
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

          {/* layered preview composition */}
          <div className="anim-rise relative mx-auto w-full max-w-[460px]" style={{ animationDelay: '260ms' }}>
            <div className="absolute left-1/2 top-1/2 h-52 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl" style={{ background: 'radial-gradient(closest-side, rgba(13,148,136,0.16), transparent)' }} aria-hidden />
            {/* dashboard card behind */}
            <div className="absolute -left-2 top-6 w-[78%] rounded-2xl bg-white p-4 ghair soft-shadow">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-ink-muted">This month</p>
              <div className="mt-2"><Sparkbars values={[40, 62, 48, 70, 55, 80, 64]} /></div>
              <div className="mt-3 space-y-1.5">{CATEGORIES.slice(0, 3).map((c) => <CategoryRow key={c.name} {...c} />)}</div>
            </div>
            {/* phone in front */}
            <div className="relative ml-auto"><SwPhone width={210}><ReadyToAssignScreen /></SwPhone></div>
            {/* floating AI chip */}
            <div className="absolute -bottom-3 left-0 flex items-center gap-2 rounded-xl bg-white px-3 py-2 ghair soft-shadow-sm">
              <span className="grid h-6 w-6 place-items-center rounded-lg" style={{ background: 'var(--teal-soft)' }}><Sparkles size={12} style={{ color: 'var(--teal-deep)' }} /></span>
              <span className="text-[10px] font-medium leading-tight text-ink-soft">Insight: $40 left to assign<br /><span className="text-ink-muted">tap to finish your plan</span></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
