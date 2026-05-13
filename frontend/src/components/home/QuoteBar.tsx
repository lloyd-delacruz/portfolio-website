// frontend/src/components/home/QuoteBar.tsx
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function QuoteBar() {
  return (
    <section className="bg-paper-bg">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col gap-6 rounded-2xl border border-paper-subtle bg-paper-card p-8 md:flex-row md:items-center md:justify-between md:p-10">
          <div className="flex items-start gap-4">
            <span aria-hidden="true" className="font-serif text-5xl leading-none text-gold-ink">&ldquo;</span>
            <p className="max-w-[58ch] text-base leading-relaxed text-paper-ink md:text-lg">
              The best AI doesn&apos;t replace workflows. It makes them observable,
              reliable, and better every day.
            </p>
          </div>
          <Link
            href="/work/wheelchair-tracking"
            className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-gold-ink transition-colors hover:text-gold-ink/80 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-ink focus-visible:outline-offset-2"
          >
            View featured case study
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
