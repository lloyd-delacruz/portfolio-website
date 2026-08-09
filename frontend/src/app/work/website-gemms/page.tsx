import type { Metadata } from 'next'
import { HomeNav } from '@/components/home/HomeNav'
import { SiteFooter } from '@/components/home/SiteFooter'
import { FooterCTA } from '@/components/home/FooterCTA'
import { ProjectMeta } from '@/components/work/ProjectMeta'
import { CsSection, Module } from '@/components/casestudy/bits'

export const metadata: Metadata = {
  title: 'Website Gemms',
  description:
    'A live Astro site — a deliberate stack comparison to the Next.js work elsewhere in this portfolio.',
  alternates: { canonical: '/work/website-gemms' },
}

export default function Page() {
  return (
    <div className="home2 min-h-screen">
      <HomeNav active="Work" />
      <main>
        <section className="mx-auto max-w-[1180px] px-6 pt-16 pb-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-plum">
            Live · Astro
          </p>
          <h1 className="mt-3 max-w-2xl font-display text-4xl font-extrabold leading-tight text-ink sm:text-5xl">
            Website Gemms
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft">
            A full site built on Astro rather than Next.js — a deliberate stack comparison, and
            the only project in this portfolio not built on the React/Next stack.
          </p>
        </section>

        <ProjectMeta slug="website-gemms" />

        <CsSection
          eyebrow="Why Astro"
          title="An intentional stack choice, not a default"
          intro="Astro's island architecture ships less JavaScript by default for content-first sites — a deliberate contrast against the interactive, client-heavy React/Next work that makes up the rest of this portfolio."
        >
          <Module>
            <p className="text-[13px] leading-relaxed text-ink-soft">
              269 files across content, layouts, and components. No further architectural
              detail is published here — the live site speaks for itself.
            </p>
          </Module>
        </CsSection>

        <FooterCTA />
      </main>
      <SiteFooter />
    </div>
  )
}
