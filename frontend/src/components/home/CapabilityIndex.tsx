import { MonoLabel, SectionEyebrow } from './primitives'

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
    <section id="systems" className="bg-paper-bg border-t border-paper-subtle">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <SectionEyebrow className="mb-4">capabilities · system map</SectionEyebrow>
        <h2 className="font-sans text-2xl md:text-3xl font-bold tracking-tight-h text-paper-ink max-w-[28ch] mb-10">
          The patterns I build across domains.
        </h2>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {CAPABILITIES.map((c) => (
            <li key={c.number}>
              <article className="flex h-full flex-col rounded-lg border border-paper-subtle bg-paper-card p-5">
                <MonoLabel className="text-gold-ink">{c.number}</MonoLabel>
                <p className="mt-4 text-sm font-semibold text-paper-ink leading-snug">{c.title}</p>
                <p className="mt-1 font-mono text-[10px] text-paper-ink-soft tracking-wide-label">{c.count}</p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
