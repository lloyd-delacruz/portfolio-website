// frontend/src/app/work/mepp/page.tsx
import type { Metadata } from 'next'
import { HomeNav } from '@/components/home/HomeNav'
import { SiteFooter } from '@/components/home/SiteFooter'
import { FooterCTA } from '@/components/home/FooterCTA'
import { Reveal } from '@/components/home/Reveal'
import { ProjectMeta } from '@/components/work/ProjectMeta'
import { MpHero } from '@/components/casestudy/mepp/MpHero'
import { MpProblem } from '@/components/casestudy/mepp/MpProblem'
import { MpArchitecture } from '@/components/casestudy/mepp/MpArchitecture'
import { MpBlindIndex } from '@/components/casestudy/mepp/MpBlindIndex'
import { MpLifecycle } from '@/components/casestudy/mepp/MpLifecycle'
import { MpBuild } from '@/components/casestudy/mepp/MpBuild'
import { MpClose } from '@/components/casestudy/mepp/MpClose'

export const metadata: Metadata = {
  title: 'MEPP 2.0 — medical equipment provisioning with a hard privacy boundary',
  description:
    'A Postgres-first system of record for provisioning medical equipment: forced row-level security keyed on tenant, application-level AES-256-GCM encryption of PHI, a keyed-HMAC blind index for searching encrypted patient names, and de-identified vendor projections. Built solo; not deployed; synthetic data only.',
}

export default function Page() {
  return (
    <div className="home2 min-h-screen">
      <HomeNav active="Work" />
      <main>
        <MpHero />
        <ProjectMeta slug="mepp" />
        <Reveal>
          <MpProblem />
        </Reveal>
        <Reveal>
          <MpArchitecture />
        </Reveal>
        <Reveal>
          <MpBlindIndex />
        </Reveal>
        <Reveal>
          <MpLifecycle />
        </Reveal>
        <Reveal>
          <MpBuild />
        </Reveal>
        <MpClose />
        <FooterCTA />
      </main>
      <SiteFooter />
    </div>
  )
}
