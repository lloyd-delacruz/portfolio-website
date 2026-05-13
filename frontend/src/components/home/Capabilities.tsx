// frontend/src/components/home/Capabilities.tsx
import Link from 'next/link'
import { Brain, Boxes, Workflow, Database, Activity, ArrowRight, type LucideIcon } from 'lucide-react'

type Card = {
  title: string
  body: string
  Icon: LucideIcon
  tint: string
  bg: string
  href: string
}

const CARDS: Card[] = [
  {
    title: 'Multi-site operational systems',
    body: 'QR workflows, event streams, and shared state across distributed sites — designed to keep four hospitals on one operational truth.',
    Icon: Boxes,
    tint: 'var(--plum)',
    bg: 'var(--plum-soft)',
    href: '/work/wheelchair-tracking',
  },
  {
    title: 'AI workflow engineering',
    body: 'Calibrated inference, ensemble forecasting, and decision-gated pipelines — agents do the heavy work inside specified, observable gates.',
    Icon: Brain,
    tint: 'var(--plum-deep)',
    bg: '#ede9fe',
    href: '/work/clinical-risk-engine',
  },
  {
    title: 'Operational intelligence layers',
    body: 'Forecasting and explainable feature attribution on top of operational data — built for planners, not notebooks.',
    Icon: Activity,
    tint: 'var(--amber)',
    bg: '#fef3c7',
    href: '/work/population-health-intelligence',
  },
  {
    title: 'Equipment & asset workflows',
    body: 'Lifecycle state models, scan-driven transitions, and chain-of-custody — operational software clinicians actually use.',
    Icon: Workflow,
    tint: 'var(--green)',
    bg: '#d1fae5',
    href: '/work/equitrackr',
  },
  {
    title: 'Production engineering discipline',
    body: 'Specs before code, tests before commits, every diff reviewed — the algorithm, not the vibe.',
    Icon: Database,
    tint: 'var(--pink)',
    bg: '#fce7f3',
    href: '#ai-workflow',
  },
]

export function Capabilities() {
  return (
    <section className="mx-auto max-w-[1180px] px-6 py-16">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-plum">What I do</p>

      <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1fr_auto] lg:items-end">
        <h2 className="font-display text-3xl font-extrabold leading-[1.12] text-ink sm:text-[2.4rem]">
          What I <span className="text-plum">actually</span> build.
        </h2>
        <p className="max-w-md text-[1.02rem] leading-relaxed text-ink-soft">
          Five capability areas — each one linked to a real system you can read end-to-end.
        </p>
        <Link href="/work" className="group inline-flex items-center gap-1.5 text-sm font-semibold text-plum lg:pb-1">
          View all projects
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {CARDS.map(({ title, body, Icon, tint, bg, href }) => (
          <Link
            key={title}
            href={href}
            className="lift group flex flex-col rounded-2xl bg-white p-5 ghair"
          >
            <div className="grid h-11 w-11 place-items-center rounded-xl" style={{ background: bg }}>
              <Icon size={20} style={{ color: tint }} strokeWidth={1.9} />
            </div>
            <h3 className="mt-4 font-display text-[15px] font-bold text-ink">{title}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{body}</p>
            <span
              className="mt-4 inline-flex items-center gap-1 text-[12px] font-semibold"
              style={{ color: tint }}
            >
              See the system
              <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}
