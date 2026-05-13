import type { Metadata } from 'next'
import { HomeNav } from '@/components/home/HomeNav'
import { SiteFooter } from '@/components/home/SiteFooter'
import { Reveal } from '@/components/home/Reveal'
import { WcHero } from '@/components/casestudy/wheelchair/WcHero'
import { WcProblem } from '@/components/casestudy/wheelchair/WcProblem'
import { WcArchitecture } from '@/components/casestudy/wheelchair/WcArchitecture'
import { WcWorkflowDemo } from '@/components/casestudy/wheelchair/WcWorkflowDemo'
import { WcImpact } from '@/components/casestudy/wheelchair/WcImpact'
import { WcFutureAI } from '@/components/casestudy/wheelchair/WcFutureAI'
import { WcClose } from '@/components/casestudy/wheelchair/WcClose'

export const metadata: Metadata = {
  title: 'Multi-Site Wheelchair Tracking System — Lloyd Dela Cruz',
  description:
    'Real-time visibility and chain-of-custody for 800+ wheelchairs and clinical assets across four hospital sites, built on QR scan workflows and a shared state model.',
}

export default function Page() {
  return (
    <div className="home2 min-h-screen">
      <HomeNav active="Work" />
      <main>
        <WcHero />
        <Reveal><WcProblem /></Reveal>
        <Reveal><WcArchitecture /></Reveal>
        <Reveal><WcWorkflowDemo /></Reveal>
        <Reveal><WcImpact /></Reveal>
        <Reveal><WcFutureAI /></Reveal>
        <WcClose />
      </main>
      <SiteFooter />
    </div>
  )
}
