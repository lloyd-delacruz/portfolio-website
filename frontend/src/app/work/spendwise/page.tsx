import type { Metadata } from 'next'
import { HomeNav } from '@/components/home/HomeNav'
import { SiteFooter } from '@/components/home/SiteFooter'
import { Reveal } from '@/components/home/Reveal'
import { SwHero } from '@/components/casestudy/spendwise/SwHero'
import { SwProblem } from '@/components/casestudy/spendwise/SwProblem'
import { SwExperience } from '@/components/casestudy/spendwise/SwExperience'
import { SwWorkflow } from '@/components/casestudy/spendwise/SwWorkflow'
import { SwInsights } from '@/components/casestudy/spendwise/SwInsights'
import { SwMobile } from '@/components/casestudy/spendwise/SwMobile'
import { SwFutureAI } from '@/components/casestudy/spendwise/SwFutureAI'
import { SwClose } from '@/components/casestudy/spendwise/SwClose'

export const metadata: Metadata = {
  title: 'SpendWise — AI-native financial planning platform — Lloyd Dela Cruz',
  description:
    'SpendWise: a modern, AI-native financial planning and operational budgeting platform — onboarding, account aggregation, zero-based budgeting, transaction tracking, recurring expenses, analytics, and AI-assisted planning, mobile-first.',
}

export default function Page() {
  return (
    <div className="home2 min-h-screen">
      <HomeNav active="Work" />
      <main>
        <SwHero />
        <Reveal><SwProblem /></Reveal>
        <Reveal><SwExperience /></Reveal>
        <Reveal><SwWorkflow /></Reveal>
        <Reveal><SwInsights /></Reveal>
        <Reveal><SwMobile /></Reveal>
        <Reveal><SwFutureAI /></Reveal>
        <SwClose />
      </main>
      <SiteFooter />
    </div>
  )
}
