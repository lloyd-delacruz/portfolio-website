// frontend/src/components/home/AboutHero.tsx
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, ArrowRight, Stethoscope, LineChart, Database, Brain } from 'lucide-react'

const STATS = [
  { value: '20+', label: 'Years Experience' },
  { value: '200+', label: 'Patient Plans / yr' },
  { value: '3', label: 'VCH Hospital Sites' },
]

// floating icon chips around the photo — a small echo of the homepage DiagramScene
const CHIPS = [
  { Icon: Stethoscope, color: 'var(--pink)',  cls: '-left-7 top-10',        delay: 0,   dur: 6.5 },
  { Icon: LineChart,   color: 'var(--blue)',  cls: '-right-8 top-24',       delay: 0.8, dur: 7   },
  { Icon: Database,    color: 'var(--plum)',  cls: '-left-9 bottom-24',     delay: 1.4, dur: 6.8 },
  { Icon: Brain,       color: 'var(--amber)', cls: '-right-6 -bottom-6',    delay: 0.4, dur: 7.2 },
]

export function AboutHero() {
  return (
    <section className="relative overflow-hidden">
      <div className="hero-wash pointer-events-none absolute inset-0" aria-hidden />
      <div className="relative mx-auto grid max-w-[1180px] grid-cols-1 items-center gap-14 px-6 pb-16 pt-14 lg:grid-cols-[1.05fr_1fr] lg:pt-20">
        {/* left */}
        <div>
          <span className="anim-rise inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-soft ghair">
            <span className="anim-pulse h-1.5 w-1.5 rounded-full" style={{ background: 'var(--green)' }} />
            About Lloyd Dela Cruz
          </span>

          <h1
            className="anim-rise mt-6 font-display text-[2.85rem] font-extrabold leading-[1.04] text-ink sm:text-[3.4rem] lg:text-[4rem]"
            style={{ animationDelay: '60ms', letterSpacing: '-0.025em' }}
          >
            From Industrial
            <br className="hidden sm:block" /> Engineering to{' '}
            <span className="grad-plum-text">Healthcare Innovation.</span>
          </h1>

          <p
            className="anim-rise mt-5 flex items-center gap-2 text-sm font-medium text-ink-soft"
            style={{ animationDelay: '100ms' }}
          >
            <MapPin size={16} className="text-plum" strokeWidth={2} />
            Vancouver, BC · Healthcare Technology · MSc Data Analytics (Dec 2025)
          </p>

          <p
            className="anim-rise mt-6 max-w-[56ch] text-[1.12rem] leading-[1.7] text-ink-soft"
            style={{ animationDelay: '140ms' }}
          >
            Results-driven data analytics professional with 20+ years of cross-functional
            experience—8 of which are in healthcare operations, project management, and clinical
            optimization. Currently completing an MSc in Data Analytics at Eastern University
            (expected Dec 2025), while contributing to patient care and interdisciplinary
            collaboration as a Rehabilitation Assistant at Vancouver Coastal Health, supporting
            Neurology, General Surgery, Orthopedics/Trauma, ICU, and Rehab units.
          </p>

          <p
            className="anim-rise mt-4 max-w-[56ch] text-[0.98rem] leading-[1.7] text-ink-muted"
            style={{ animationDelay: '180ms' }}
          >
            Certified in BrainStation Data Analytics, Google Data Analytics, DeepLearning.AI Data
            Engineering, and AWS AI Practitioner. Proficient in SQL, Python, R, and Tableau, with a
            strong focus on data-driven decision-making, workflow optimization, and visual
            storytelling. Adept at designing performance measurement frameworks and building
            insightful dashboards that enhance clinical and operational efficiency. Successfully led
            large-scale initiatives at IEQ Global Singapore, applying Lean Six Sigma methodologies
            to reduce project timelines by 15% and cut operational costs by 20%.
          </p>

          <div className="anim-rise mt-9 flex flex-wrap items-center gap-3" style={{ animationDelay: '210ms' }}>
            <Link
              href="/work"
              className="group inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white soft-shadow transition-transform hover:-translate-y-0.5"
              style={{ background: 'var(--plum)' }}
            >
              See my work
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-ink ghair-2 transition-colors hover:bg-[var(--cream-2)]"
            >
              Get in touch
            </Link>
          </div>

          <div className="anim-rise mt-10 grid max-w-md grid-cols-3 gap-6" style={{ animationDelay: '250ms' }}>
            {STATS.map(({ value, label }) => (
              <div key={label}>
                <p className="font-display text-[2rem] font-extrabold leading-none text-plum" style={{ letterSpacing: '-0.02em' }}>
                  {value}
                </p>
                <p className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-muted">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* right */}
        <div className="anim-rise relative mx-auto w-full max-w-[22rem]" style={{ animationDelay: '280ms' }}>
          {/* glow */}
          <div
            className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
            style={{ background: 'radial-gradient(closest-side, rgba(124,58,237,0.20), transparent)' }}
            aria-hidden
          />
          <div
            className="absolute -bottom-6 -left-6 h-40 w-40 rounded-full blur-2xl"
            style={{ background: 'rgba(236,72,153,0.14)' }}
            aria-hidden
          />

          {/* photo card */}
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[22px] bg-white ghair-2 soft-shadow-lg">
            <Image
              src="/images/my_photo.jpeg"
              alt="Lloyd Dela Cruz"
              fill
              sizes="(max-width: 768px) 320px, 352px"
              className="object-cover object-top"
              priority
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
          </div>

          {/* available pill */}
          <div className="anim-float absolute -left-4 bottom-6 flex items-center gap-2 rounded-full bg-white px-3.5 py-2 ghair soft-shadow" style={{ animationDelay: '1.1s' }}>
            <span className="anim-pulse h-2 w-2 rounded-full" style={{ background: 'var(--green)' }} />
            <span className="text-[12px] font-semibold text-ink">Open to healthcare-tech work</span>
          </div>

          {/* floating icon chips */}
          {CHIPS.map(({ Icon, color, cls, delay, dur }, i) => (
            <div
              key={i}
              className={`anim-float absolute grid h-12 w-12 place-items-center rounded-2xl bg-white ghair soft-shadow-sm ${cls}`}
              style={{ animationDelay: `${delay}s`, animationDuration: `${dur}s` }}
              aria-hidden
            >
              <Icon size={20} style={{ color }} strokeWidth={1.9} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
