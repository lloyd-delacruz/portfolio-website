import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { MonoLabel } from './primitives'

type Entry = { number: string; capability: string; title: string; description: string; href: string }

const ENTRIES: Entry[] = [
  { number: '02', capability: 'healthcare workflows', title: 'EquiTrackr',   description: 'Equipment lifecycle & operational logistics platform.', href: '/work/equitrackr' },
  { number: '03', capability: 'ai-native products',   title: 'Apex Protocol', description: 'AI-assisted fitness intelligence platform.',           href: '/work/apex-protocol' },
  { number: '04', capability: 'financial systems',    title: 'SpendWise',     description: 'Modern fintech budgeting & planning.',                 href: '/work/spendwise' },
  { number: '05', capability: 'ai studio',            title: 'Website Gemms', description: 'AI-assisted digital product & web studio.',           href: '/work/website-gemms' },
]

export function SelectedSystems() {
  return (
    <section className="bg-surface-canvas">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <MonoLabel className="block mb-4">selected systems</MonoLabel>
        <ul className="divide-y divide-surface-subtle border-y border-surface-subtle">
          {ENTRIES.map((e) => (
            <li key={e.number}>
              <Link
                href={e.href}
                className="group grid grid-cols-[auto_1fr_auto] items-center gap-6 px-2 py-6 transition-colors hover:bg-surface-card"
              >
                <MonoLabel className="text-gold">{e.number}</MonoLabel>
                <div>
                  <div className="flex items-baseline gap-3">
                    <h3 className="text-lg font-medium text-surface-fg">{e.title}</h3>
                    <MonoLabel>{e.capability}</MonoLabel>
                  </div>
                  <p className="mt-1 text-sm text-surface-fg-secondary">{e.description}</p>
                </div>
                <ArrowUpRight className="h-4 w-4 text-surface-fg-muted group-hover:text-surface-fg group-hover:translate-x-0.5 transition-all" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
