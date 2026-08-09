// frontend/src/components/casestudy/clinicalAi/CaClose.tsx
import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'

export function CaClose() {
  return (
    <section className="mx-auto max-w-[1180px] px-6 py-12">
      <div
        className="flex flex-col items-start gap-6 rounded-3xl px-9 py-9 ghair sm:flex-row sm:items-center sm:justify-between"
        style={{ background: 'linear-gradient(105deg,#ede9fe 0%,#f5f0fe 45%,#fce7f3 100%)' }}
      >
        <div>
          <h2 className="font-display text-2xl font-extrabold leading-tight text-ink sm:text-[1.75rem]">
            An assistant that knows the edge of what it knows.
          </h2>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-soft">
            Happy to talk through the retrieval tests, the citation plugin, or how the refusal prompt is evaluated.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/work"
            className="group inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-ink ghair-2 transition-colors hover:bg-white/70"
          >
            <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-0.5" />
            All work
          </Link>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white soft-shadow-sm transition-transform hover:-translate-y-0.5"
            style={{ background: 'var(--plum)' }}
          >
            Get in touch
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
