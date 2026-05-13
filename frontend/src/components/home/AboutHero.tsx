// frontend/src/components/home/AboutHero.tsx
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, ArrowRight } from 'lucide-react'

const STATS = [
  { value: '20+', label: 'Years Experience' },
  { value: '200+', label: 'Patient Plans / yr' },
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
            <span className="anim-pulse h-1.5 w-1.5 rounded-full" style={{ background: 'var(--green)' }} />
            About Lloyd Dela Cruz
          </span>

          <h1
            className="anim-rise mt-6 font-display text-[2.5rem] font-extrabold leading-[1.06] text-ink sm:text-[3rem] lg:text-[3.4rem]"
            style={{ animationDelay: '60ms', letterSpacing: '-0.025em' }}
          >
            Building AI-native systems grounded in{' '}
            <span className="grad-plum-text">real-world operations.</span>
          </h1>

          <p
            className="anim-rise mt-5 flex items-center gap-2 text-sm font-medium text-ink-soft"
            style={{ animationDelay: '100ms' }}
          >
            <MapPin size={16} className="text-plum" strokeWidth={2} />
            Vancouver, BC · AI Systems · Product Engineering · Operational Intelligence
          </p>

          <p
            className="anim-rise mt-6 max-w-[58ch] text-[1.08rem] leading-[1.7] text-ink-soft"
            style={{ animationDelay: '140ms' }}
          >
            AI-native systems builder with a background in Industrial Engineering, healthcare
            operations, and modern product development. MSc in Data Analytics graduate from Eastern
            University with experience building operational workflow systems, AI-assisted platforms,
            and scalable full-stack applications using Claude, Cursor, OpenAI, LangChain, RAG
            architectures, and modern AI engineering workflows.
          </p>

          <p
            className="anim-rise mt-4 max-w-[58ch] text-[0.98rem] leading-[1.7] text-ink-muted"
            style={{ animationDelay: '170ms' }}
          >
            Skilled in React, Next.js, TypeScript, Node.js, PostgreSQL, Prisma, Python, AWS, and
            modern LLM tooling, with a strong focus on operational intelligence, workflow
            orchestration, and thoughtful systems design.
          </p>

          <p
            className="anim-rise mt-4 max-w-[58ch] text-[0.98rem] leading-[1.7] text-ink-muted"
            style={{ animationDelay: '200ms' }}
          >
            Built real-world operational systems supporting healthcare logistics, workflow
            visibility, equipment coordination, and AI-native product experiences through a
            combination of systems thinking, modern engineering, and practical AI integration.
          </p>

          <div className="anim-rise mt-9 flex flex-wrap items-center gap-3" style={{ animationDelay: '230ms' }}>
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

          <div className="anim-rise mt-10 grid max-w-md grid-cols-3 gap-6" style={{ animationDelay: '260ms' }}>
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
        <div className="anim-rise relative mx-auto w-full max-w-[24rem]" style={{ animationDelay: '280ms' }}>
          {/* glow */}
          <div
            className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
            style={{ background: 'radial-gradient(closest-side, rgba(124,58,237,0.20), transparent)' }}
            aria-hidden
          />
          <div
            className="absolute -bottom-6 -left-6 h-44 w-44 rounded-full blur-2xl"
            style={{ background: 'rgba(236,72,153,0.14)' }}
            aria-hidden
          />

          {/* photo card */}
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[22px] bg-white ghair-2 soft-shadow-lg">
            <Image
              src="/images/my_photo.jpeg"
              alt="Lloyd Dela Cruz"
              fill
              sizes="(max-width: 768px) 320px, 384px"
              className="object-cover object-top"
              priority
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
          </div>

          {/* available pill */}
          <div className="anim-float absolute -left-3 bottom-5 flex items-center gap-2 rounded-full bg-white px-3.5 py-2 ghair soft-shadow" style={{ animationDelay: '1.1s' }}>
            <span className="anim-pulse h-2 w-2 rounded-full" style={{ background: 'var(--green)' }} />
            <span className="text-[12px] font-semibold text-ink">Open to AI-native product work</span>
          </div>
        </div>
      </div>
    </section>
  )
}
