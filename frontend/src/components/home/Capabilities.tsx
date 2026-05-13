// frontend/src/components/home/Capabilities.tsx
import Link from 'next/link'
import { Brain, Boxes, Workflow, Database, Activity, ArrowRight } from 'lucide-react'

const CARDS = [
  {
    title: 'AI Orchestration',
    body: 'Design agent workflows, decision layers, and tool integrations that coordinate real work across enterprise systems.',
    Icon: Brain,
    tint: 'var(--plum)',
    bg: 'var(--plum-soft)',
  },
  {
    title: 'Systems Architecture',
    body: 'Architect resilient, observable systems — from event streams to data layers to integration boundaries.',
    Icon: Boxes,
    tint: 'var(--plum-deep)',
    bg: '#ede9fe',
  },
  {
    title: 'Workflow Automation',
    body: 'Replace manual coordination with scalable workflow engines that span people, systems, and AI agents.',
    Icon: Workflow,
    tint: 'var(--amber)',
    bg: '#fef3c7',
  },
  {
    title: 'Enterprise Integration',
    body: 'Connect operational data, legacy systems, and AI services into coherent, deployable platforms.',
    Icon: Database,
    tint: 'var(--green)',
    bg: '#d1fae5',
  },
  {
    title: 'Operational Intelligence',
    body: 'Build monitoring, automation, and feedback loops that turn raw events into operational clarity.',
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
          From AI orchestration to operational intelligence, I architect reliable, scalable
          systems that solve real problems.
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
