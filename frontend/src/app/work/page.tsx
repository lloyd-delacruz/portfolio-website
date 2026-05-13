import type { Metadata } from 'next'
import { HomeNav } from '@/components/home/HomeNav'
import { SiteFooter } from '@/components/home/SiteFooter'
import { FooterCTA } from '@/components/home/FooterCTA'
import { PROJECTS, WorkCard } from '@/components/home/FeaturedWork'

export const metadata: Metadata = {
  title: 'Work — Lloyd Dela Cruz',
  description:
    'Selected work across applied AI, healthcare operations, healthcare systems, and fintech — operational intelligence systems, workflow platforms, and data-driven products.',
}

// Partition by badge prefix so the two new flagship Applied-AI deep dives
// surface in their own band above the rest of the operational work.
const APPLIED_AI = PROJECTS.filter((p) => p.badge.startsWith('APPLIED AI'))
const OTHER = PROJECTS.filter((p) => !p.badge.startsWith('APPLIED AI'))

export default function WorkPage() {
  return (
    <div className="home2 min-h-screen">
      <HomeNav active="Work" />
      <main>
        {/* Hero */}
        <section className="mx-auto max-w-[1180px] px-6 pt-16 pb-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-plum">Selected work</p>
          <h1 className="mt-3 max-w-2xl font-display text-4xl font-extrabold leading-tight text-ink sm:text-5xl">
            Operational systems and data-driven products.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft">
            A cross-section of projects spanning applied AI, healthcare operations, healthcare systems, and
            fintech — built around real workflows, clean data, and the people who depend on them.
          </p>
        </section>

        {/* Applied AI systems — flagship band */}
        <section className="mx-auto max-w-[1180px] px-6 pt-12 pb-8">
          <div className="border-t border-ink/10 pt-10">
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-plum">
                  Applied AI systems
                </p>
                <h2 className="mt-2 font-display text-2xl font-bold leading-tight text-ink sm:text-3xl">
                  Operational intelligence and decision support
                </h2>
              </div>
              <p className="max-w-md text-sm leading-relaxed text-ink-soft">
                Calibrated predictive inference for public-health planning and clinician-in-the-loop triage.
                Architecture-first deep dives with live inference panels.
              </p>
            </div>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {APPLIED_AI.map((p) => (
              <WorkCard key={p.title} p={p} />
            ))}
          </div>
        </section>

        {/* Operational platforms — the rest */}
        <section className="mx-auto max-w-[1180px] px-6 pt-4 pb-16">
          <div className="border-t border-ink/10 pt-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-plum">
              Operational platforms
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold leading-tight text-ink sm:text-3xl">
              Healthcare operations, fintech, and product work
            </h2>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {OTHER.map((p) => (
              <WorkCard key={p.title} p={p} />
            ))}
          </div>
        </section>

        <FooterCTA />
      </main>
      <SiteFooter />
    </div>
  )
}
