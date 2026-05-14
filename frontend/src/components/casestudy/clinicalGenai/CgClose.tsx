// frontend/src/components/casestudy/clinicalGenai/CgClose.tsx
import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'

export function CgClose() {
  return (
    <section className="mx-auto max-w-[1180px] px-6 py-12">
      <div
        className="flex flex-col items-start gap-6 rounded-3xl px-9 py-9 ghair sm:flex-row sm:items-center sm:justify-between"
        style={{ background: 'linear-gradient(105deg,#ede9fe 0%,#f5f0fe 45%,#fce7f3 100%)' }}
      >
        <div>
          <h2 className="font-display text-2xl font-extrabold leading-tight text-ink sm:text-[1.75rem]">
            Documentation that knows when to ask for a human.
          </h2>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-soft">
            Happy to walk through the extraction schema, the validation policy, and what a production FHIR
            integration would look like.
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
