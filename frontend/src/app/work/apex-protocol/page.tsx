import type { Metadata } from 'next'
import { HomeNav } from '@/components/home/HomeNav'
import { SiteFooter } from '@/components/home/SiteFooter'
import { FooterCTA } from '@/components/home/FooterCTA'
import { ProjectMeta } from '@/components/work/ProjectMeta'
import { CsSection, Module } from '@/components/casestudy/bits'

export const metadata: Metadata = {
  title: 'Apex Protocol',
  description:
    'A performance-training concept for tracking strength progression, hypertrophy training, and body metrics — a progressive-overload intelligence system for a shared mobile-first architecture.',
  alternates: { canonical: '/work/apex-protocol' },
}

export default function Page() {
  return (
    <div className="home2 min-h-screen">
      <HomeNav active="Work" />
      <main>
        <section className="mx-auto max-w-[1180px] px-6 pt-16 pb-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-plum">
            Concept · Off-domain
          </p>
          <h1 className="mt-3 max-w-2xl font-display text-4xl font-extrabold leading-tight text-ink sm:text-5xl">
            Apex Protocol
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft">
            A performance-training concept: a progressive-overload intelligence system for
            strength progression, hypertrophy training, and body-metric tracking, designed for a
            shared mobile-first architecture across iOS and Android.
          </p>
        </section>

        <ProjectMeta slug="apex-protocol" />

        <CsSection
          eyebrow="Why it's here"
          title="A deliberate non-healthcare data point"
          intro="Kept separate from the healthcare-systems work — evidence of product thinking applied outside the primary domain, not a claim of a shipped app."
        >
          <Module>
            <p className="text-[13px] leading-relaxed text-ink-soft">
              The public repository holds the concept and architecture notes; there is no shipped
              mobile build to demo. Treat this as a design exercise, not a deployed product.
            </p>
          </Module>
        </CsSection>

        <FooterCTA />
      </main>
      <SiteFooter />
    </div>
  )
}
