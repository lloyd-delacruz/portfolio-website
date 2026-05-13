// frontend/src/app/work/population-health-intelligence/page.tsx
// TEMPORARY STUB — replaced in plan task T8.
import type { Metadata } from 'next'
import { HomeNav } from '@/components/home/HomeNav'
import { SiteFooter } from '@/components/home/SiteFooter'

export const metadata: Metadata = {
  title: 'Population-Health Intelligence Platform — Lloyd Dela Cruz',
  description: 'Calibrated life-expectancy forecasts for 193 nations.',
}

export default function Page() {
  return (
    <div className="home2 min-h-screen">
      <HomeNav active="Work" />
      <main className="mx-auto max-w-[1180px] px-6 py-24">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-plum">
          Rebuilding
        </p>
        <h1 className="mt-3 font-display text-3xl font-extrabold text-ink">
          Population-Health Intelligence Platform
        </h1>
        <p className="mt-4 max-w-2xl text-ink-soft">This case study is being rebuilt.</p>
      </main>
      <SiteFooter />
    </div>
  )
}
