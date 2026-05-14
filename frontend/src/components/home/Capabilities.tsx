// frontend/src/components/home/Capabilities.tsx
import { Stethoscope, Brain, LineChart, Boxes, type LucideIcon } from 'lucide-react'

type Cluster = {
  title: string
  bullets: string[]
  Icon: LucideIcon
  tint: string
  bg: string
}

const CLUSTERS: Cluster[] = [
  {
    title: 'Clinical Operations Intelligence',
    Icon: Stethoscope,
    tint: 'var(--plum)',
    bg: 'var(--plum-soft)',
    bullets: [
      'Hospital workflow optimization',
      'Rehabilitation operations',
      'Equipment tracking systems',
      'Operational analytics',
    ],
  },
  {
    title: 'Applied AI & Data Systems',
    Icon: Brain,
    tint: 'var(--plum-deep)',
    bg: 'var(--plum-soft)',
    bullets: [
      'SQL · Python · R',
      'Prompt engineering · LLM workflows',
      'Structured data extraction',
      'AI-assisted automation',
    ],
  },
  {
    title: 'Analytics & Visualization',
    Icon: LineChart,
    tint: 'var(--amber)',
    bg: '#fef3c7',
    bullets: [
      'Tableau · Power BI',
      'Time-series analytics',
      'KPI & operational reporting',
      'Data storytelling',
    ],
  },
  {
    title: 'Application Development',
    Icon: Boxes,
    tint: 'var(--green)',
    bg: '#d1fae5',
    bullets: [
      'React · Next.js · TypeScript',
      'FastAPI · PostgreSQL',
      'Cloud deployment',
      'Production-grade UX',
    ],
  },
]

export function Capabilities() {
  return (
    <section id="core-capabilities" className="mx-auto max-w-[1180px] px-6 py-16">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-plum">Core capabilities</p>

      <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1fr] lg:items-end">
        <h2 className="font-display text-3xl font-extrabold leading-[1.12] text-ink sm:text-[2.4rem]">
          Built across the stack <span className="text-plum">hospitals run on.</span>
        </h2>
        <p className="max-w-md text-[1.02rem] leading-relaxed text-ink-soft">
          Four capability clusters — built on real clinical operations.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {CLUSTERS.map(({ title, bullets, Icon, tint, bg }) => (
          <div
            key={title}
            data-cluster-card
            className="flex flex-col rounded-2xl bg-white p-6 ghair"
          >
            <div className="grid h-11 w-11 place-items-center rounded-xl" style={{ background: bg }}>
              <Icon size={20} style={{ color: tint }} strokeWidth={1.9} />
            </div>
            <h3 className="mt-4 font-display text-[16px] font-bold text-ink">{title}</h3>
            <ul className="mt-3 space-y-2">
              {bullets.map((b) => (
                <li key={b} className="flex items-start gap-2 text-[13.5px] leading-snug text-ink-soft">
                  <span aria-hidden className="mt-[7px] inline-block h-1 w-1 shrink-0 rounded-full" style={{ background: tint }} />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
