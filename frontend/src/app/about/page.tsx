import type { Metadata } from 'next'
import { HomeNav } from '@/components/home/HomeNav'
import { AboutHero } from '@/components/home/AboutHero'
import { AboutCerts } from '@/components/home/AboutCerts'
import { AboutJourney } from '@/components/home/AboutJourney'
import { AboutValues } from '@/components/home/AboutValues'
import { AboutSkills } from '@/components/home/AboutSkills'
import { FooterCTA } from '@/components/home/FooterCTA'
import { SiteFooter } from '@/components/home/SiteFooter'

export const metadata: Metadata = {
  title: 'About — Lloyd Dela Cruz',
  description:
    'Healthcare operations engineer with nine years inside Vancouver Coastal Health — building workflow systems, analytics tools, applied AI, and event-driven automation for clinical use. A portfolio of shipped and prototyped systems across four VCH sites and beyond.',
}

export default function AboutPage() {
  return (
    <div className="home2 min-h-screen">
      <HomeNav active="About" />
      <main>
        <AboutHero />
        <AboutCerts />
        <AboutJourney />
        <AboutValues />
        <AboutSkills />
        <FooterCTA />
      </main>
      <SiteFooter />
    </div>
  )
}
