// frontend/src/app/work/healthcare-automation-engine/page.tsx
import type { Metadata } from 'next'
import { HomeNav } from '@/components/home/HomeNav'
import { SiteFooter } from '@/components/home/SiteFooter'
import { Reveal } from '@/components/home/Reveal'
import { ProjectMeta } from '@/components/work/ProjectMeta'
import { AeHero } from '@/components/casestudy/automationEngine/AeHero'
import { AeProblem } from '@/components/casestudy/automationEngine/AeProblem'
import { AeArchitecture } from '@/components/casestudy/automationEngine/AeArchitecture'
import { AeFlowDemo } from '@/components/casestudy/automationEngine/AeFlowDemo'
import { AePatterns } from '@/components/casestudy/automationEngine/AePatterns'
import { AeReliability } from '@/components/casestudy/automationEngine/AeReliability'
import { AeImpact } from '@/components/casestudy/automationEngine/AeImpact'
import { AeClose } from '@/components/casestudy/automationEngine/AeClose'

export const metadata: Metadata = {
  title: 'Enterprise Healthcare Workflow Automation Engine — Lloyd Dela Cruz',
  description:
    'Built Power Automate, Azure Functions, and Microsoft Graph orchestration prototypes for healthcare operations — four reusable patterns that turn manual hospital handoffs into event-driven workflows. Prototypes; not yet at enterprise scale.',
}

export default function Page() {
  return (
    <div className="home2 min-h-screen">
      <HomeNav active="Work" />
      <main>
        <AeHero />
        <ProjectMeta slug="healthcare-automation-engine" />
        <Reveal><AeProblem /></Reveal>
        <Reveal><AeArchitecture /></Reveal>
        <Reveal><AeFlowDemo /></Reveal>
        <Reveal><AePatterns /></Reveal>
        <Reveal><AeReliability /></Reveal>
        <Reveal><AeImpact /></Reveal>
        <AeClose />
      </main>
      <SiteFooter />
    </div>
  )
}
