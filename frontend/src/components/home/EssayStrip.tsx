import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

export function EssayStrip() {
  return (
    <section className="bg-paper-bg text-paper-ink border-y border-paper-subtle">
      <div className="mx-auto max-w-3xl px-6 py-20 md:py-28">
        <p className="font-mono text-[10px] uppercase tracking-wide-label text-paper-ink-soft mb-6">
          a short note on how I build
        </p>
        <div className="font-serif text-lg md:text-xl leading-[1.7] text-paper-ink space-y-5">
          <p>
            Operational AI doesn&apos;t fail in the model. It fails in the workflow around the model — the scan, the handoff, the missing step, the place where the human and the system stop agreeing.
          </p>
          <p>
            Ten years on the frontline taught me to look there first. The interesting engineering problem is rarely the algorithm; it&apos;s the system <em>around</em> the algorithm: how it gets data, how it surfaces decisions, how it survives a real shift with real people.
          </p>
          <p>
            So when I build, I start from the workflow and work inward. The AI is a node in the system, not the centre of the universe.
          </p>
        </div>

        <Link
          href="/blog"
          className="mt-10 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wide-label text-paper-ink-soft hover:text-paper-ink transition-colors"
        >
          read more
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </section>
  )
}
