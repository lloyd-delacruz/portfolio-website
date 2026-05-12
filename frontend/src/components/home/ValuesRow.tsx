// frontend/src/components/home/ValuesRow.tsx
import { Network, Workflow, Database, Cpu, Users } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { IconBadge } from './primitives'

type Value = { icon: LucideIcon; title: string; statement: string }

const VALUES: Value[] = [
  { icon: Network,  title: 'systems thinker',     statement: 'I see the whole system — people, process, data, and technology.' },
  { icon: Workflow, title: 'workflow architect',  statement: 'I design operational workflows that scale in the real world.' },
  { icon: Database, title: 'data & integration',  statement: 'I build reliable data systems that create a single source of truth.' },
  { icon: Cpu,      title: 'ai-native builder',   statement: 'I integrate AI where it amplifies decisions, not where it replaces them.' },
  { icon: Users,    title: 'frontline focused',   statement: 'I build for the people who keep healthcare moving.' },
]

export function ValuesRow() {
  return (
    <section className="border-t border-surface-subtle bg-surface-canvas">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <ul className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 xl:divide-x xl:divide-surface-subtle">
          {VALUES.map((v) => (
            <li key={v.title} className="xl:px-6 xl:first:pl-0 xl:last:pr-0">
              <IconBadge icon={v.icon} />
              <p className="mt-4 font-mono text-[11px] uppercase tracking-wide-label text-surface-fg">
                {v.title}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-surface-fg-secondary">
                {v.statement}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
