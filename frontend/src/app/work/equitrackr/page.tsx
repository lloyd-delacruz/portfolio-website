import type { Metadata } from 'next'
import { HomeNav } from '@/components/home/HomeNav'
import { SiteFooter } from '@/components/home/SiteFooter'
import { Reveal } from '@/components/home/Reveal'
import { ProjectMeta } from '@/components/work/ProjectMeta'
import { EtHero } from '@/components/casestudy/equitrackr/EtHero'
import { EtProblem } from '@/components/casestudy/equitrackr/EtProblem'
import { EtArchitecture } from '@/components/casestudy/equitrackr/EtArchitecture'
import { EtConsoleDemo } from '@/components/casestudy/equitrackr/EtConsoleDemo'
import { EtLifecycle } from '@/components/casestudy/equitrackr/EtLifecycle'
import { EtImpact } from '@/components/casestudy/equitrackr/EtImpact'
import { EtFutureAI } from '@/components/casestudy/equitrackr/EtFutureAI'
import { EtClose } from '@/components/casestudy/equitrackr/EtClose'

export const metadata: Metadata = {
  title: 'EquiTrackr — Healthcare equipment workflow platform — Lloyd Dela Cruz',
  description:
    'A healthcare equipment workflow and operational coordination platform: track, request, clean, and maintain mobile clinical assets across departments on one operational registry.',
}

export default function Page() {
  return (
    <div className="home2 min-h-screen">
      <HomeNav active="Work" />
      <main>
        <EtHero />
        <ProjectMeta slug="equitrackr" />
        <Reveal><EtProblem /></Reveal>
        <Reveal><EtArchitecture /></Reveal>
        <Reveal><EtConsoleDemo /></Reveal>
        <Reveal><EtLifecycle /></Reveal>
        <Reveal><EtImpact /></Reveal>
        <Reveal><EtFutureAI /></Reveal>
        <EtClose />
      </main>
      <SiteFooter />
    </div>
  )
}
