{/*
  OWNER: CONFIRM BEFORE PUBLISHING.
  This page describes two third-party open-source codebases (OpenEMR,
  Cal.com/cal.diy) found in your GitHub account with no commits authored by
  you beyond an initial import. The copy below deliberately makes NO claim
  that you deployed, configured, customised, or operated either system —
  there was no evidence of that in the repositories. If you actually did
  more (self-hosted it, configured modules, ran it for a period), tell me
  and I will rewrite this page to reflect that accurately. Until then, treat
  this page as a narrow, honest placeholder — not a case study.
*/}
import type { Metadata } from 'next'
import { AlertTriangle } from 'lucide-react'
import { HomeNav } from '@/components/home/HomeNav'
import { SiteFooter } from '@/components/home/SiteFooter'
import { FooterCTA } from '@/components/home/FooterCTA'
import { ProjectMeta } from '@/components/work/ProjectMeta'
import { CsSection, Module, Chip } from '@/components/casestudy/bits'

export const metadata: Metadata = {
  title: 'Self-Hosted Healthcare Infrastructure',
  description:
    'An evaluation of open-source EMR and scheduling platforms — OpenEMR and Cal.com — as a possible foundation for a clinic booking product. Third-party software, not authored by Lloyd Dela Cruz.',
  alternates: { canonical: '/work/self-hosted-infrastructure' },
}

export default function Page() {
  return (
    <div className="home2 min-h-screen">
      <HomeNav active="Work" />
      <main>
        <section className="mx-auto max-w-[1180px] px-6 pt-16 pb-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-muted">
            Third-party infrastructure
          </p>
          <h1 className="mt-3 max-w-2xl font-display text-4xl font-extrabold leading-tight text-ink sm:text-5xl">
            Evaluating open-source clinic infrastructure.
          </h1>

          {/* Above-the-fold disclosure, as plainly as the design system allows. */}
          <div className="mt-6 flex max-w-2xl gap-3 rounded-2xl bg-white p-5 ghair">
            <AlertTriangle size={18} className="mt-0.5 shrink-0 text-[var(--amber-ink)]" aria-hidden />
            <p className="text-[14px] leading-relaxed text-ink-soft">
              <strong className="text-ink">
                OpenEMR and Cal.com are open-source projects built by their respective communities —
                not authored by Lloyd.
              </strong>{' '}
              What is his own work here is narrow: importing each platform for evaluation, and
              analysing OpenEMR&apos;s role-based access model against how a real clinic&apos;s
              roles actually work.
            </p>
          </div>
        </section>

        <ProjectMeta slug="self-hosted-infrastructure" />

        <CsSection
          eyebrow="What was evaluated"
          title="Two platforms, two different questions"
          intro="A clinic booking product needs either a scheduling layer or a full EMR, depending on scope. Both categories have mature open-source options, so the evaluation started there rather than from a blank page."
        >
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Module>
              <Chip tone="blue">OpenEMR · GPL-3.0</Chip>
              <p className="mt-3 font-display text-lg font-bold text-ink">
                Open-source electronic medical record system
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-ink-soft">
                A mature, widely-deployed EMR. Imported for evaluation of its data model and
                access-control system — not modified or extended.
              </p>
            </Module>
            <Module>
              <Chip tone="blue">Cal.com / cal.diy · AGPL-3.0</Chip>
              <p className="mt-3 font-display text-lg font-bold text-ink">
                Open-source scheduling infrastructure
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-ink-soft">
                The self-hostable community edition of Cal.com. Evaluated as a scheduling layer;
                no changes were made to the upstream codebase.
              </p>
            </Module>
          </div>
        </CsSection>

        <CsSection
          eyebrow="The one original piece of analysis"
          title="Mapping OpenEMR's access control onto real clinic roles"
          intro="OpenEMR ships a role-based access control layer (gacl). The useful question for a clinic product isn't whether that layer exists, but whether its role definitions match how a clinic's front desk, clinicians, and admin actually divide work — which required walking the permission model against a real operational structure."
        >
          <Module>
            <p className="text-[13px] leading-relaxed text-ink-soft">
              This produced a role-by-role workflow analysis: which OpenEMR permissions map cleanly
              onto front-desk, clinician, and admin responsibilities, and where the built-in roles
              are coarser than a real clinic needs. That analysis — not the EMR itself — is the
              output worth showing.
            </p>
          </Module>
        </CsSection>

        <FooterCTA />
      </main>
      <SiteFooter />
    </div>
  )
}
