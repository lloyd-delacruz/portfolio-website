// frontend/src/app/work/clinical-ai-assistant/page.tsx
import type { Metadata } from 'next'
import { HomeNav } from '@/components/home/HomeNav'
import { SiteFooter } from '@/components/home/SiteFooter'
import { FooterCTA } from '@/components/home/FooterCTA'
import { Reveal } from '@/components/home/Reveal'
import { ProjectMeta } from '@/components/work/ProjectMeta'
import { CaHero } from '@/components/casestudy/clinicalAi/CaHero'
import { CaProblem } from '@/components/casestudy/clinicalAi/CaProblem'
import { CaArchitecture } from '@/components/casestudy/clinicalAi/CaArchitecture'
import { CaRefusal } from '@/components/casestudy/clinicalAi/CaRefusal'
import { CaRetrieval } from '@/components/casestudy/clinicalAi/CaRetrieval'
import { CaCitations } from '@/components/casestudy/clinicalAi/CaCitations'
import { CaBuild } from '@/components/casestudy/clinicalAi/CaBuild'
import { CaClose } from '@/components/casestudy/clinicalAi/CaClose'

export const metadata: Metadata = {
  title: 'Clinical AI Assistant — retrieval-grounded answers with engineered refusal',
  description:
    'A retrieval-augmented clinical assistant built on ChromaDB and LangChain: query rewriting, maximal marginal relevance retrieval, AMA-style page-level citations rendered by a custom rehype plugin, and a designed refusal that names what the corpus does not cover. Built solo; Dockerised; not deployed.',
}

export default function Page() {
  return (
    <div className="home2 min-h-screen">
      <HomeNav active="Work" />
      <main>
        <CaHero />
        <ProjectMeta slug="clinical-ai-assistant" />
        <Reveal>
          <CaProblem />
        </Reveal>
        <Reveal>
          <CaArchitecture />
        </Reveal>
        <Reveal>
          <CaRefusal />
        </Reveal>
        <Reveal>
          <CaRetrieval />
        </Reveal>
        <Reveal>
          <CaCitations />
        </Reveal>
        <Reveal>
          <CaBuild />
        </Reveal>
        <CaClose />
        <FooterCTA />
      </main>
      <SiteFooter />
    </div>
  )
}
