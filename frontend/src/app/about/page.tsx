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
    'From Industrial Engineering to healthcare innovation — 20+ years of cross-functional experience across healthcare operations, project management, and data analytics.',
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
