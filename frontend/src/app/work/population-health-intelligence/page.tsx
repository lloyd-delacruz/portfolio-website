// frontend/src/app/work/population-health-intelligence/page.tsx
import type { Metadata } from 'next'
import { HomeNav } from '@/components/home/HomeNav'
import { SiteFooter } from '@/components/home/SiteFooter'
import { Reveal } from '@/components/home/Reveal'
import { PhHero } from '@/components/casestudy/popHealth/PhHero'
import { PhProblem } from '@/components/casestudy/popHealth/PhProblem'
import { PhArchitecture } from '@/components/casestudy/popHealth/PhArchitecture'
import { PhForecastDemo } from '@/components/casestudy/popHealth/PhForecastDemo'
import { PhImpact } from '@/components/casestudy/popHealth/PhImpact'
import { PhFutureAI } from '@/components/casestudy/popHealth/PhFutureAI'
import { PhClose } from '@/components/casestudy/popHealth/PhClose'
import { ProjectMeta } from '@/components/work/ProjectMeta'

export const metadata: Metadata = {
  title: 'Population-Health Intelligence Platform — Lloyd Dela Cruz',
  description:
    'Calibrated life-expectancy forecasts for 193 nations, with the signals driving each trajectory — interactive prototype backed by a deterministic surrogate of the trained ensemble.',
}

export default function Page() {
  return (
    <div className="home2 min-h-screen">
      <HomeNav active="Work" />
      <main>
        <PhHero />
        <ProjectMeta slug="population-health-intelligence" />
        <Reveal>
          <PhProblem />
        </Reveal>
        <Reveal>
          <PhArchitecture />
        </Reveal>
        <Reveal>
          <PhForecastDemo />
        </Reveal>
        <Reveal>
          <PhImpact />
        </Reveal>
        <Reveal>
          <PhFutureAI />
        </Reveal>
        <PhClose />
      </main>
      <SiteFooter />
    </div>
  )
}
