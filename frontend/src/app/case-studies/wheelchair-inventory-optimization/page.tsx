import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

/**
 * Retired route. The wheelchair inventory case study was rewritten as the
 * `/work/wheelchair-tracking` project page.
 *
 * `redirects()` in next.config does not run under `output: 'export'`, so this
 * bridges client-side: meta refresh + canonical + noindex, with a visible link.
 */
const TARGET = '/work/wheelchair-tracking/'

export const metadata: Metadata = {
  title: 'Moved — Wheelchair Tracking',
  description:
    'This case study has moved. The wheelchair tracking write-up now lives at /work/wheelchair-tracking.',
  alternates: { canonical: '/work/wheelchair-tracking' },
  robots: { index: false, follow: true },
}

export default function WheelchairCaseStudyBridgePage() {
  return (
    <div className="home2 flex min-h-screen items-center justify-center px-6 py-24">
      <meta httpEquiv="refresh" content={`0; url=${TARGET}`} />
      <main className="max-w-md text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-muted">
          Page moved
        </p>
        <h1 className="font-display mt-3 text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
          This case study is now the Wheelchair Tracking project page
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink-soft">
          You are being redirected. If nothing happens, follow the link below.
        </p>
        <Link
          href={TARGET}
          className="ghair-2 lift mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white"
          style={{ background: 'var(--plum)' }}
        >
          Go to Wheelchair Tracking
          <ArrowRight className="h-4 w-4" />
        </Link>
      </main>
    </div>
  )
}
