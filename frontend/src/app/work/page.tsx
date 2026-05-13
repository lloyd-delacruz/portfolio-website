import type { Metadata } from 'next'
import { HomeNav } from '@/components/home/HomeNav'
import { SiteFooter } from '@/components/home/SiteFooter'
import { FooterCTA } from '@/components/home/FooterCTA'
import { PROJECTS, WorkCard } from '@/components/home/FeaturedWork'

export const metadata: Metadata = {
  title: 'Work — Lloyd Dela Cruz',
  description:
    'Selected work across healthcare operations, healthcare systems, fintech, and AI — operational platforms, workflow systems, and data-driven products.',
}

export default function WorkPage() {
  return (
    <div className="home2 min-h-screen">
      <HomeNav active="Work" />
      <main>
        <section className="mx-auto max-w-[1180px] px-6 pt-16 pb-12">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-plum">Selected work</p>
          <h1 className="mt-3 max-w-2xl font-display text-4xl font-extrabold leading-tight text-ink sm:text-5xl">
            Operational systems and data-driven products.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft">
            A cross-section of projects spanning healthcare operations, healthcare systems, fintech, and AI —
            built around real workflows, clean data, and the people who depend on them.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.map((p) => (
              <WorkCard key={p.title} p={p} />
            ))}
          </div>
        </section>
        <FooterCTA />
      </main>
      <SiteFooter />
    </div>
  )
}
