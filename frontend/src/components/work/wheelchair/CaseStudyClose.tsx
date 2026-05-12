import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { MonoLabel } from '@/components/home/primitives'

const LINKS = [
  { label: 'github',   href: 'https://github.com/lloyddelacruz' },
  { label: 'linkedin', href: 'https://www.linkedin.com/in/lloyddelacruz/' },
  { label: 'x',        href: 'https://x.com/lloyddelacruz' },
]

export function CaseStudyClose() {
  return (
    <section className="bg-surface-canvas border-t border-surface-subtle">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <MonoLabel className="block mb-4 text-surface-fg-muted">next case study →</MonoLabel>

        <Link
          href="/work/equitrackr"
          className="group flex items-center justify-between gap-6 rounded-xl border border-surface-subtle px-6 py-6 transition-colors hover:border-gold/40 hover:bg-surface-card focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2"
        >
          <div>
            <MonoLabel className="block mb-2 text-gold">02 · healthcare workflow systems</MonoLabel>
            <h3 className="text-2xl font-medium text-surface-fg">EquiTrackr</h3>
            <p className="mt-1 text-sm text-surface-fg-secondary">Equipment lifecycle & operational logistics platform.</p>
          </div>
          <ArrowUpRight className="h-5 w-5 text-surface-fg-muted group-hover:text-gold group-hover:translate-x-0.5 transition-all" />
        </Link>

        <div className="mt-12 pt-8 border-t border-surface-subtle flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wide-label text-surface-fg-secondary hover:text-surface-fg transition-colors rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            back to systems
          </Link>

          <ul className="flex items-center gap-6">
            <li>
              <a
                href="mailto:lloyd.vince1985@gmail.com"
                className="font-mono text-xs text-surface-fg hover:text-gold transition-colors rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2"
              >
                lloyd.vince1985@gmail.com
              </a>
            </li>
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs uppercase tracking-wide-label text-surface-fg-secondary hover:text-surface-fg transition-colors rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
