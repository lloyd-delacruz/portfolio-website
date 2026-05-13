// frontend/src/app/page.tsx
import { HomeNav } from '@/components/home/HomeNav'
import { HomeHero } from '@/components/home/HomeHero'
import { BuiltWithRow } from '@/components/home/BuiltWithRow'
import { ProductionIndicators } from '@/components/home/ProductionIndicators'
import { Capabilities } from '@/components/home/Capabilities'
import { AIWorkflowAlgorithm } from '@/components/home/AIWorkflowAlgorithm'
import { FeaturedWork } from '@/components/home/FeaturedWork'
import { FooterCTA } from '@/components/home/FooterCTA'
import { SiteFooter } from '@/components/home/SiteFooter'
import { Reveal } from '@/components/home/Reveal'

export default function Home() {
  return (
    <div className="home2 min-h-screen">
      <HomeNav />
      <main>
        <HomeHero />
        <BuiltWithRow />
        <Reveal><ProductionIndicators /></Reveal>
        <Reveal><Capabilities /></Reveal>
        <Reveal><AIWorkflowAlgorithm /></Reveal>
        <Reveal><FeaturedWork /></Reveal>
        <FooterCTA />
      </main>
      <SiteFooter />
    </div>
  )
}
