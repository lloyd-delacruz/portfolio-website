// frontend/src/app/dashboards/life-expectancy/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { HomeNav } from '@/components/home/HomeNav'
import { SiteFooter } from '@/components/home/SiteFooter'

export const metadata: Metadata = {
  title: 'Population-Health Intelligence Platform — Lloyd Dela Cruz',
  description: 'This case study has moved to /work/population-health-intelligence.',
}

export default function Page() {
  return (
    <div className="home2 min-h-screen">
      <HomeNav active="Work" />
      <main className="mx-auto flex max-w-[720px] flex-col items-start gap-6 px-6 py-24">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-plum">
          This case study has moved
        </p>
        <h1 className="font-display text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
          Population-Health Intelligence Platform
        </h1>
        <p className="max-w-[60ch] text-[1.05rem] leading-relaxed text-ink-soft">
          This page has been rebuilt as a full case study in the new Work section.
        </p>
        <Link
          href="/work/population-health-intelligence"
          className="group inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white soft-shadow transition-transform hover:-translate-y-0.5"
          style={{ background: 'var(--plum)' }}
        >
          Open the new deep dive
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
        </Link>
      </main>
      <SiteFooter />
    </div>
  )
}
