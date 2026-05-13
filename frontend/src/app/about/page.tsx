import type { Metadata } from 'next'
import { HomeNav } from '@/components/home/HomeNav'
import { AboutHero } from '@/components/home/AboutHero'
import { AboutJourney } from '@/components/home/AboutJourney'
import { AboutValues } from '@/components/home/AboutValues'
import { AboutSkills } from '@/components/home/AboutSkills'
import { FooterCTA } from '@/components/home/FooterCTA'
import { SiteFooter } from '@/components/home/SiteFooter'
import { Reveal } from '@/components/home/Reveal'

export const metadata: Metadata = {
  title: 'About — Lloyd Dela Cruz',
  description:
    'From Industrial Engineering to healthcare innovation — 20+ years of cross-functional experience across healthcare operations, project management, and data analytics.',
}

export default function AboutPage() {
  return (
    <div className="home2 min-h-screen">
      <HomeNav active="About" />
      <main>
        <AboutHero />
        <Reveal>
          <AboutJourney />
        </Reveal>
        <Reveal>
          <AboutValues />
        </Reveal>
        <Reveal>
          <AboutSkills />
        </Reveal>
        <FooterCTA />
      </main>
      <SiteFooter />
    </div>
  )
}
