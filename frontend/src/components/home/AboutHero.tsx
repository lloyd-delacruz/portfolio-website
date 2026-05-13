// frontend/src/components/home/AboutHero.tsx
import Image from 'next/image'
import { MapPin } from 'lucide-react'

const STATS = [
  { value: '20+', label: 'Years Experience' },
  { value: '200+', label: 'Patient Plans Annually' },
  { value: '3', label: 'VCH Hospital Sites' },
]

export function AboutHero() {
  return (
    <section className="relative overflow-hidden">
      <div className="hero-wash pointer-events-none absolute inset-0" aria-hidden />
      <div className="relative mx-auto grid max-w-[1180px] grid-cols-1 items-center gap-14 px-6 pb-16 pt-14 lg:grid-cols-[1.05fr_1fr] lg:pt-20">
        {/* left */}
        <div>
          <span className="anim-rise inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-soft ghair">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'var(--green)' }} />
            About
          </span>

          <h1
            className="anim-rise mt-6 font-display text-[2.6rem] font-extrabold leading-[1.06] text-ink sm:text-[3.1rem] lg:text-[3.5rem]"
            style={{ animationDelay: '60ms' }}
          >
            From Industrial Engineering to{' '}
            <span className="grad-plum-text">Healthcare Innovation.</span>
          </h1>

          <p
            className="anim-rise mt-5 flex items-center gap-2 text-sm font-medium text-ink-soft"
            style={{ animationDelay: '100ms' }}
          >
            <MapPin size={16} className="text-plum" />
            Vancouver, BC · Healthcare Technology
          </p>

          <p
            className="anim-rise mt-6 max-w-[58ch] text-[1.02rem] leading-relaxed text-ink-soft"
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
            className="anim-rise mt-4 max-w-[58ch] text-[0.98rem] leading-relaxed text-ink-muted"
            style={{ animationDelay: '180ms' }}
          >
            Certified in BrainStation Data Analytics, Google Data Analytics, DeepLearning.AI Data
            Engineering, and AWS AI Practitioner. Proficient in SQL, Python, R, and Tableau, with a
            strong focus on data-driven decision-making, workflow optimization, and visual
            storytelling. Adept at designing performance measurement frameworks and building
            insightful dashboards that enhance clinical and operational efficiency. Successfully led
            large-scale initiatives at IEQ Global Singapore, applying Lean Six Sigma methodologies
            to reduce project timelines by 15% and cut operational costs by 20%, demonstrating the
            power of analytics in real-world impact.
          </p>

          <div className="anim-rise mt-9 grid max-w-md grid-cols-3 gap-6" style={{ animationDelay: '220ms' }}>
            {STATS.map(({ value, label }) => (
              <div key={label}>
                <p className="font-display text-3xl font-extrabold text-plum">{value}</p>
                <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-muted">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* right */}
        <div className="anim-rise relative mx-auto" style={{ animationDelay: '260ms' }}>
          <div
            className="absolute -right-8 -top-8 h-40 w-40 rounded-full blur-2xl"
            style={{ background: 'rgba(124,58,237,0.16)' }}
            aria-hidden
          />
          <div
            className="absolute -bottom-8 -left-8 h-44 w-44 rounded-full blur-2xl"
            style={{ background: 'rgba(236,72,153,0.14)' }}
            aria-hidden
          />
          <div className="relative h-[26rem] w-[20rem] overflow-hidden rounded-2xl bg-white ghair soft-shadow-lg">
            <Image
              src="/images/my_photo.jpeg"
              alt="Lloyd Dela Cruz"
              fill
              sizes="(max-width: 768px) 320px, 320px"
              className="object-cover object-top"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
