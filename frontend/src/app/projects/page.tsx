import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

/**
 * Retired route. `/projects` belonged to an older design generation and has been
 * folded into `/work`.
 *
 * `redirects()` in next.config is server-implemented and is silently dropped
 * under `output: 'export'`, so the bridge is done client-side: a meta refresh
 * for browsers plus a canonical + noindex for crawlers, with a visible link so
 * the page is never a dead end without JS.
 */
const TARGET = '/work/'

export const metadata: Metadata = {
  title: 'Moved to Work — Lloyd Dela Cruz',
  description: 'This page has moved. The project portfolio now lives at /work.',
  alternates: { canonical: '/work' },
  robots: { index: false, follow: true },
}

export default function ProjectsBridgePage() {
  return (
    <div className="home2 flex min-h-screen items-center justify-center px-6 py-24">
      <meta httpEquiv="refresh" content={`0; url=${TARGET}`} />
      <main className="max-w-md text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-muted">
          Page moved
        </p>
        <h1 className="font-display mt-3 text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
          The portfolio now lives at Work
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink-soft">
          You are being redirected. If nothing happens, follow the link below.
        </p>
        <Link
          href={TARGET}
          className="ghair-2 lift mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white"
          style={{ background: 'var(--plum)' }}
        >
          Go to Work
          <ArrowRight className="h-4 w-4" />
        </Link>
      </main>
    </div>
  )
}
