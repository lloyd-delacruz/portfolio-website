import type { Metadata } from 'next'
import { Globe2 } from 'lucide-react'
import { HomeNav } from '@/components/home/HomeNav'
import { SiteFooter } from '@/components/home/SiteFooter'
import { FooterCTA } from '@/components/home/FooterCTA'
import { ProjectMeta } from '@/components/work/ProjectMeta'
import { CsSection } from '@/components/casestudy/bits'

export const metadata: Metadata = {
  title: 'Client & Deployed Web Work',
  description:
    'Marketing and booking sites delivered for clinics and local organisations — service work, kept visually and narratively separate from the engineered products above.',
  alternates: { canonical: '/work/client-work' },
}

/**
 * File counts below were read directly from each repository's git tree.
 * Liveness was not independently re-verified for this page, so no site is
 * described as currently live and no URLs are linked.
 */
const SITES = [
  {
    name: 'Physio in Motion',
    kind: 'Physiotherapy clinic',
    detail: 'Service pages, booking-intent CTAs, and a clinic-appropriate visual system.',
    files: '99 files',
  },
  {
    name: 'Physiotherapy Clinic',
    kind: 'Clinic marketing site',
    detail: 'A second clinic build in the same category, distinct visual identity.',
    files: '94 files',
  },
  {
    name: 'Kerrisdale Little League',
    kind: 'Community sports organisation',
    detail: 'Registration information and league communication for a volunteer-run league.',
    files: '77 files · most recent',
  },
  {
    name: 'Langley Foodie',
    kind: 'Local food & business site',
    detail: 'The most fully-built of the collection — content structure, imagery, navigation.',
    files: '103 files',
  },
  {
    name: 'Website Gemms',
    kind: 'Astro site',
    detail: 'Built on Astro rather than Next.js — a deliberate stack comparison.',
    files: '269 files',
  },
]

export default function Page() {
  return (
    <div className="home2 min-h-screen">
      <HomeNav active="Work" />
      <main>
        {/* Hero — deliberately monochrome. This tier is service work, not a
            product, and should not compete visually with the engineered
            systems above it. */}
        <section className="mx-auto max-w-[1180px] px-6 pt-16 pb-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-muted">
            Client &amp; deployed web work
          </p>
          <h1 className="mt-3 max-w-2xl font-display text-4xl font-extrabold leading-tight text-ink sm:text-5xl">
            Sites built for real businesses.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft">
            Design and build work for clinics and local organisations — Next.js, Astro, and
            Tailwind. Service work, kept separate here from the engineered systems: no fleet
            of colourful product cards, just a list of what was built.
          </p>
        </section>

        <ProjectMeta slug="client-work" />

        <CsSection
          eyebrow="The collection"
          title="Five sites, one delivery pattern"
          intro="Content structure, booking-intent CTAs, and a visual system suited to the client's category — repeated across clinics, a community league, and a local business site."
        >
          <div role="list" aria-label="Client sites">
            {SITES.map((site) => (
              <div
                key={site.name}
                role="listitem"
                className="flex flex-col gap-3 border-b border-[var(--line)] py-5 first:border-t sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-start gap-3">
                  <Globe2 size={16} className="mt-0.5 shrink-0 text-ink-muted" aria-hidden />
                  <div>
                    <p className="font-display text-[15px] font-bold leading-snug text-ink">
                      {site.name}
                    </p>
                    <p className="mt-1 text-[13px] leading-relaxed text-ink-soft">
                      {site.kind} — {site.detail}
                    </p>
                  </div>
                </div>
                <span className="shrink-0 font-mono text-[11px] text-ink-muted">
                  {site.files}
                </span>
              </div>
            ))}
          </div>
        </CsSection>

        <FooterCTA />
      </main>
      <SiteFooter />
    </div>
  )
}
