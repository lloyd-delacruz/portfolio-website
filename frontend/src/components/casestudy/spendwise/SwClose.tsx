// frontend/src/components/casestudy/spendwise/SwClose.tsx
import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { SwMark } from './SwMark'

export function SwClose() {
  return (
    <section className="mx-auto max-w-[1180px] px-6 py-12">
      <div className="flex flex-col items-start gap-6 rounded-3xl px-9 py-9 ghair sm:flex-row sm:items-center sm:justify-between" style={{ background: 'linear-gradient(105deg,var(--teal-soft) 0%,#f4fbf7 45%,#fef3e2 100%)' }}>
        <div>
          <div className="mb-3"><SwMark size={24} /></div>
          <h2 className="font-display text-2xl font-extrabold leading-tight text-ink sm:text-[1.75rem]">Want a walkthrough of the platform?</h2>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-soft">Happy to talk through the zero-based budgeting model, the onboarding flow, and how AI-assisted planning stays grounded and reversible.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Link href="/work/apex-protocol" className="group inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-ink ghair-2 transition-colors hover:bg-white/70">
            <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-0.5" />
            Next project
          </Link>
          <Link href="/contact" className="group inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white soft-shadow-sm transition-transform hover:-translate-y-0.5" style={{ background: 'var(--teal)' }}>
            Get in touch
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
