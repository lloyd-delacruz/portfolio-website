import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Page not found — Lloyd Dela Cruz',
  description: 'That page does not exist. Head back to the homepage or browse the work.',
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <div className="home2 flex min-h-screen flex-col">
      <main className="flex flex-1 items-center justify-center px-6 py-24">
        <div className="max-w-lg text-center">
          <p className="font-display text-6xl font-extrabold leading-none text-plum sm:text-7xl">
            404
          </p>
          <h1 className="font-display mt-6 text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
            This page does not exist
          </h1>
          <p className="mt-4 text-base leading-relaxed text-ink-soft">
            The link may be out of date, or the page moved when the site was
            reorganised. Everything worth reading is one of these two clicks away.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/"
              className="lift inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white"
              style={{ background: 'var(--plum)' }}
            >
              Back to home
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/work"
              className="ghair-2 lift inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-ink"
            >
              Browse the work
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
