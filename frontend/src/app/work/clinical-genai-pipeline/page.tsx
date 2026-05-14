// frontend/src/app/work/clinical-genai-pipeline/page.tsx
import type { Metadata } from 'next'
import { HomeNav } from '@/components/home/HomeNav'
import { SiteFooter } from '@/components/home/SiteFooter'
import { Reveal } from '@/components/home/Reveal'
import { ProjectMeta } from '@/components/work/ProjectMeta'
import { CgHero } from '@/components/casestudy/clinicalGenai/CgHero'
import { CgProblem } from '@/components/casestudy/clinicalGenai/CgProblem'
import { CgArchitecture } from '@/components/casestudy/clinicalGenai/CgArchitecture'
import { CgExtractionDemo } from '@/components/casestudy/clinicalGenai/CgExtractionDemo'
import { CgDataModel } from '@/components/casestudy/clinicalGenai/CgDataModel'
import { CgCostAware } from '@/components/casestudy/clinicalGenai/CgCostAware'
import { CgChallenges } from '@/components/casestudy/clinicalGenai/CgChallenges'
import { CgImpact } from '@/components/casestudy/clinicalGenai/CgImpact'
import { CgClose } from '@/components/casestudy/clinicalGenai/CgClose'

export const metadata: Metadata = {
  title: 'Clinical GenAI Agent & Analytics Pipeline — Lloyd Dela Cruz',
  description:
    'AI-assisted clinical documentation and analytics pipeline for rehab workflows — schema-constrained extraction, validation, human review, and time-series recovery analytics. Designed pipeline; synthetic data only.',
}

export default function Page() {
  return (
    <div className="home2 min-h-screen">
      <HomeNav active="Work" />
      <main>
        <CgHero />
        <ProjectMeta slug="clinical-genai-pipeline" />
        <Reveal>
          <CgProblem />
        </Reveal>
        <Reveal>
          <CgArchitecture />
        </Reveal>
        <Reveal>
          <CgExtractionDemo />
        </Reveal>
        <Reveal>
          <CgDataModel />
        </Reveal>
        <Reveal>
          <CgCostAware />
        </Reveal>
        <Reveal>
          <CgChallenges />
        </Reveal>
        <Reveal>
          <CgImpact />
        </Reveal>
        <CgClose />
      </main>
      <SiteFooter />
    </div>
  )
}
