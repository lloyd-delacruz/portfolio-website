// frontend/src/components/home/Capabilities.tsx
import Link from 'next/link'
import { Brain, Boxes, Code2, Database, Activity, ArrowRight } from 'lucide-react'

const CARDS = [
  {
    title: 'AI-Native Engineering',
    body: 'Build intelligent workflows and agents that automate complex processes.',
    Icon: Brain,
    tint: 'var(--plum)',
    bg: 'var(--plum-soft)',
  },
  {
    title: 'Systems Architecture',
    body: 'Design scalable, resilient systems that withstand real-world complexity.',
    Icon: Boxes,
    tint: 'var(--plum-deep)',
    bg: '#ede9fe',
  },
  {
    title: 'Product Engineering',
    body: 'Build full-stack products with a focus on usability, performance, and impact.',
    Icon: Code2,
    tint: 'var(--amber)',
    bg: '#fef3c7',
  },
  {
    title: 'Data & Integration',
    body: 'Turn messy data into usable, trusted, and actionable intelligence.',
    Icon: Database,
    tint: 'var(--green)',
    bg: '#d1fae5',
  },
  {
    title: 'Operational Intelligence',
    body: 'Create observability and automation systems that drive operational clarity.',
    Icon: Activity,
    tint: 'var(--pink)',
    bg: '#fce7f3',
  },
]

export function Capabilities() {
  return (
    <section className="mx-auto max-w-[1180px] px-6 py-16">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-plum">What I do</p>

      <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1fr_auto] lg:items-end">
        <h2 className="font-display text-3xl font-extrabold leading-[1.12] text-ink sm:text-[2.4rem]">
          Systems that <span className="text-plum">scale.</span>
          <br />
          Solutions that <span style={{ color: 'var(--coral)' }}>last.</span>
        </h2>
        <p className="max-w-md text-[1.02rem] leading-relaxed text-ink-soft">
          From AI-native engineering to operational intelligence, I build reliable, scalable systems
          that solve real problems.
        </p>
        <Link href="/work" className="group inline-flex items-center gap-1.5 text-sm font-semibold text-plum lg:pb-1">
          View all capabilities
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {CARDS.map(({ title, body, Icon, tint, bg }) => (
          <div
            key={title}
            className="lift group flex flex-col rounded-2xl bg-white p-5 ghair"
          >
            <div className="grid h-11 w-11 place-items-center rounded-xl" style={{ background: bg }}>
              <Icon size={20} style={{ color: tint }} strokeWidth={1.9} />
            </div>
            <h3 className="mt-4 font-display text-[15px] font-bold text-ink">{title}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{body}</p>
            <ArrowRight
              size={16}
              style={{ color: tint }}
              className="mt-4 transition-transform group-hover:translate-x-0.5"
            />
          </div>
        ))}
      </div>
    </section>
  )
}
