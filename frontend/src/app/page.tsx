// frontend/src/app/page.tsx
import { HomeNav } from '@/components/home/HomeNav'
import { HomeHero } from '@/components/home/HomeHero'
import { TrustedRow } from '@/components/home/TrustedRow'
import { MetricsStrip } from '@/components/home/MetricsStrip'
import { Capabilities } from '@/components/home/Capabilities'
import { FeaturedWork } from '@/components/home/FeaturedWork'
import { CredibilityStrip } from '@/components/home/CredibilityStrip'
import { FooterCTA } from '@/components/home/FooterCTA'
import { SiteFooter } from '@/components/home/SiteFooter'
import { Reveal } from '@/components/home/Reveal'

export default function Home() {
  return (
    <div className="home2 min-h-screen">
      <HomeNav />
      <main>
        <HomeHero />
        <TrustedRow />
        <Reveal><MetricsStrip /></Reveal>
        <Reveal><Capabilities /></Reveal>
        <Reveal><FeaturedWork /></Reveal>
        <Reveal><CredibilityStrip /></Reveal>
        <FooterCTA />
      </main>
      <SiteFooter />
    </div>
  )
}
