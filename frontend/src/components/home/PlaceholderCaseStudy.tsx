import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

type Props = {
  capability: string
  title: string
  description: string
  register: 'surface' | 'paper'
}

export function PlaceholderCaseStudy({ capability, title, description, register }: Props) {
  const isPaper = register === 'paper'
  return (
    <main className={isPaper ? 'min-h-screen bg-paper-bg text-paper-ink' : 'min-h-screen bg-surface-canvas text-surface-fg'}>
      <div className="mx-auto max-w-3xl px-6 py-32">
        <Link
          href="/"
          className={`inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wide-label ${isPaper ? 'text-paper-ink-soft hover:text-paper-ink' : 'text-surface-fg-secondary hover:text-surface-fg'}`}
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          back to systems
        </Link>

        <p className={`mt-12 font-mono text-[10px] uppercase tracking-wide-label ${isPaper ? 'text-paper-ink-soft' : 'text-surface-fg-muted'}`}>
          {capability}
        </p>
        <h1 className={`mt-3 font-medium tracking-tight-display ${isPaper ? 'font-serif text-4xl md:text-6xl leading-[1.05]' : 'text-4xl md:text-6xl leading-[1.05]'}`}>
          {title}
        </h1>
        <p className={`mt-6 max-w-[58ch] leading-relaxed ${isPaper ? 'font-serif text-lg' : 'text-base text-surface-fg-secondary'}`}>
          {description}
        </p>

        <div className={`mt-12 inline-flex items-center gap-2 rounded-full border px-3 py-1 ${isPaper ? 'border-paper-subtle' : 'border-surface-subtle'}`}>
          <span className={`font-mono text-[10px] uppercase tracking-wide-label ${isPaper ? 'text-paper-ink-soft' : 'text-surface-fg-muted'}`}>
            case study · phase 2
          </span>
        </div>
      </div>
    </main>
  )
}
