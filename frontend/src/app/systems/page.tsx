import type { Metadata } from 'next'
import { HomeNav } from '@/components/home/HomeNav'
import { SiteFooter } from '@/components/home/SiteFooter'
import { FooterCTA } from '@/components/home/FooterCTA'
import { AIWorkflowAlgorithm } from '@/components/home/AIWorkflowAlgorithm'
import { SystemsToolchain } from '@/components/home/SystemsToolchain'

export const metadata: Metadata = {
  title: 'Systems — Lloyd Dela Cruz',
  description:
    'The system behind the systems — an AI-native engineering practice built on agentic coding tools: Claude Code, Codex, Cursor, Antigravity, GitHub Copilot, and Gemini.',
}

export default function SystemsPage() {
  return (
    <div className="home2 min-h-screen">
      <HomeNav active="Systems" />
      <main>
        <section className="mx-auto max-w-[1180px] px-6 pt-16 pb-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-plum">How I build</p>
          <h1 className="mt-3 max-w-2xl font-display text-4xl font-extrabold leading-tight text-ink sm:text-5xl">
            The system behind the systems.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft">
            I work AI-native: agentic coding tools handle the heavy lifting while I set direction,
            review every change, and own the result. It&apos;s how a one-person practice ships
            production systems — fast, but grounded in tested code, clean data, and real workflows.
          </p>
        </section>
        <AIWorkflowAlgorithm />
        <SystemsToolchain />
        <FooterCTA />
      </main>
      <SiteFooter />
    </div>
  )
}
