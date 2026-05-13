// frontend/src/app/work/clinical-risk-engine/page.tsx
import type { Metadata } from 'next'
import { HomeNav } from '@/components/home/HomeNav'
import { SiteFooter } from '@/components/home/SiteFooter'
import { Reveal } from '@/components/home/Reveal'
import { CrHero } from '@/components/casestudy/clinicalRisk/CrHero'
import { CrProblem } from '@/components/casestudy/clinicalRisk/CrProblem'
import { CrArchitecture } from '@/components/casestudy/clinicalRisk/CrArchitecture'
import { CrTriageDemo } from '@/components/casestudy/clinicalRisk/CrTriageDemo'
import { CrImpact } from '@/components/casestudy/clinicalRisk/CrImpact'
import { CrFutureAI } from '@/components/casestudy/clinicalRisk/CrFutureAI'
import { CrClose } from '@/components/casestudy/clinicalRisk/CrClose'

export const metadata: Metadata = {
  title: 'Clinical Risk Engine — Lloyd Dela Cruz',
  description:
    'Calibrated malignancy risk scoring for biopsy triage — interactive prototype backed by a calibrated surrogate of the production ensemble, with an ambiguity flag for clinician second-review.',
}

export default function Page() {
  return (
    <div className="home2 min-h-screen">
      <HomeNav active="Work" />
      <main>
        <CrHero />
        <Reveal>
          <CrProblem />
        </Reveal>
        <Reveal>
          <CrArchitecture />
        </Reveal>
        <Reveal>
          <CrTriageDemo />
        </Reveal>
        <Reveal>
          <CrImpact />
        </Reveal>
        <Reveal>
          <CrFutureAI />
        </Reveal>
        <CrClose />
      </main>
      <SiteFooter />
    </div>
  )
}
