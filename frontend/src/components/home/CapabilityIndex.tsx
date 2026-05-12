import { MonoLabel } from './primitives'

type Capability = {
  number: string
  title: string
  count: string
}

const CAPABILITIES: Capability[] = [
  { number: '01', title: 'Healthcare Workflow Systems',     count: '2 systems' },
  { number: '02', title: 'AI-Native Product Systems',       count: '1 system'  },
  { number: '03', title: 'Financial & Planning Systems',    count: '1 system'  },
  { number: '04', title: 'AI-Assisted Digital Experiences', count: '1 system'  },
]

export function CapabilityIndex() {
  return (
    <section id="systems" className="bg-surface-canvas border-t border-surface-subtle">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <MonoLabel className="block mb-4">capabilities · system map</MonoLabel>
        <h2 className="text-2xl md:text-3xl font-medium tracking-tight-h text-surface-fg max-w-[28ch] mb-10">
          The patterns I build across domains.
        </h2>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {CAPABILITIES.map((c) => (
            <li key={c.number}>
              <article className="flex h-full flex-col rounded-lg border border-surface-subtle bg-surface-card p-5">
                <MonoLabel className="text-gold">{c.number}</MonoLabel>
                <p className="mt-4 text-sm font-medium text-surface-fg leading-snug">{c.title}</p>
                <p className="mt-1 font-mono text-[10px] text-surface-fg-muted tracking-wide-label">{c.count}</p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
