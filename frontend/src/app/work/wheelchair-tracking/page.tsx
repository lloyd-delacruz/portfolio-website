import type { Metadata } from 'next'
import { HomeNav } from '@/components/home/HomeNav'
import { SiteFooter } from '@/components/home/SiteFooter'
import { Reveal } from '@/components/home/Reveal'
import { ProjectMeta } from '@/components/work/ProjectMeta'
import { WcHero } from '@/components/casestudy/wheelchair/WcHero'
import { WcProblem } from '@/components/casestudy/wheelchair/WcProblem'
import { WcArchitecture } from '@/components/casestudy/wheelchair/WcArchitecture'
import { WcRoles } from '@/components/casestudy/wheelchair/WcRoles'
import { WcWorkflowDemo } from '@/components/casestudy/wheelchair/WcWorkflowDemo'
import { WcDashboards } from '@/components/casestudy/wheelchair/WcDashboards'
import { WcImpact } from '@/components/casestudy/wheelchair/WcImpact'
import { WcRollout } from '@/components/casestudy/wheelchair/WcRollout'
import { WcFutureAI } from '@/components/casestudy/wheelchair/WcFutureAI'
import { WcClose } from '@/components/casestudy/wheelchair/WcClose'

export const metadata: Metadata = {
  title: 'Multi-Site Wheelchair Tracking System — Lloyd Dela Cruz',
  description:
    'Production asset-tracking platform deployed across four hospital sites — QR-driven workflows, role-shaped surfaces, operational dashboards, phased rollout, and chain-of-custody for 800+ wheelchairs and clinical assets.',
}

export default function Page() {
  return (
    <div className="home2 min-h-screen">
      <HomeNav active="Work" />
      <main>
        <WcHero />
        <ProjectMeta slug="wheelchair-tracking" />
        <Reveal><WcProblem /></Reveal>
        <Reveal><WcArchitecture /></Reveal>
        <Reveal><WcRoles /></Reveal>
        <Reveal><WcWorkflowDemo /></Reveal>
        <Reveal><WcDashboards /></Reveal>
        <Reveal><WcImpact /></Reveal>
        <Reveal><WcRollout /></Reveal>
        <Reveal><WcFutureAI /></Reveal>
        <WcClose />
      </main>
      <SiteFooter />
    </div>
  )
}
