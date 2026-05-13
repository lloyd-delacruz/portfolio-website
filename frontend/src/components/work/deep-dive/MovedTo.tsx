// frontend/src/components/work/deep-dive/MovedTo.tsx
import Link from 'next/link'

export interface MovedToProps {
  /** Destination href, e.g. /work/population-health-intelligence */
  href: string
  /** Destination title, displayed in the link */
  title: string
}

export function MovedTo({ href, title }: MovedToProps) {
  return (
    <div className="deep-dive">
      <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-start justify-center gap-6 px-6 py-24">
        <div className="dd-mono text-[11px] tracking-[0.14em] text-[var(--dd-text-muted)]">
          THIS CASE STUDY HAS MOVED
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-[var(--dd-text)] md:text-4xl">
          {title}
        </h1>
        <Link
          href={href}
          className="dd-mono inline-flex items-center gap-2 rounded-full border border-[var(--dd-border-strong)] bg-[var(--dd-surface-2)] px-4 py-2 text-[13px] text-[var(--dd-accent)] hover:bg-[var(--dd-surface)]"
        >
          Open the new deep dive →
        </Link>
      </main>
    </div>
  )
}
