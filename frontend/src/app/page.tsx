// frontend/src/app/page.tsx
import { HomeNav } from '@/components/home/HomeNav'
import { HomeHero } from '@/components/home/HomeHero'
import { BuiltWithRow } from '@/components/home/BuiltWithRow'
import { ProductionIndicators } from '@/components/home/ProductionIndicators'
import { Capabilities } from '@/components/home/Capabilities'
import { FeaturedWork } from '@/components/home/FeaturedWork'
import { FooterCTA } from '@/components/home/FooterCTA'
import { SiteFooter } from '@/components/home/SiteFooter'
import { Reveal } from '@/components/home/Reveal'

export default function Home() {
  return (
    <div className="home2 min-h-screen">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <HomeNav />
      <main id="main-content">
        <HomeHero />
        {/* Proof moved directly under the hero: a recruiter should hit evidence
            before a technology list. */}
        <Reveal><ProductionIndicators /></Reveal>
        <Reveal><Capabilities /></Reveal>
        <Reveal><FeaturedWork /></Reveal>
        <BuiltWithRow />
        <FooterCTA />
      </main>
      <SiteFooter />
    </div>
  )
}
