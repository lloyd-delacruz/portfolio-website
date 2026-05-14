// frontend/src/components/casestudy/automationEngine/AeHero.tsx
import Link from 'next/link'
import { Webhook, Workflow, Cloud, Send } from 'lucide-react'
import { Eyebrow } from '../bits'

const META = [
  { label: 'Role',    value: 'System design · Power Platform & Azure engineering' },
  { label: 'Inputs',  value: 'Forms, list changes, schedules, webhooks' },
  { label: 'Output',  value: 'Teams alerts, Lists writes, Planner tasks, audit log' },
  { label: 'Status',  value: 'Prototype patterns' },
]

const NODE_ICONS = [Webhook, Workflow, Cloud, Send]

export function AeHero() {
  return (
    <section className="mx-auto max-w-[1180px] px-6 pt-16 pb-10">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
        <div>
          <Eyebrow>Cloud automation · Event-driven systems</Eyebrow>
          <h1 className="mt-3 max-w-3xl font-display text-[2.4rem] font-extrabold leading-[1.08] text-ink sm:text-5xl">
            Enterprise Healthcare Workflow Automation Engine
          </h1>
          <p className="mt-5 max-w-2xl text-[1.05rem] leading-relaxed text-ink-soft">
            The connective tissue between Microsoft 365, custom apps, and clinical operations — turning manual handoffs into event-driven workflows.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="#demo"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--plum)] px-4 py-2 text-sm font-semibold text-white"
            >
              See a flow run
            </Link>
            <Link
              href="#problem"
              className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink ghair"
            >
              Start from the problem
            </Link>
          </div>
        </div>

        <div
          className="relative h-44 rounded-2xl bg-white p-6 ghair soft-shadow-sm"
          role="img"
          aria-label="Four-node signal flow: trigger to orchestrator to cloud to action"
        >
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 320 160" fill="none" aria-hidden="true">
            <path
              d="M40 80 H280"
              stroke="var(--blue)"
              strokeOpacity="0.35"
              strokeWidth="1.6"
              strokeDasharray="2 4"
            />
          </svg>
          <div className="relative grid h-full grid-cols-4 items-center">
            {NODE_ICONS.map((Icon, i) => (
              <div key={i} className="flex justify-center">
                <span
                  className="grid h-11 w-11 place-items-center rounded-full bg-[var(--cream-2)] ghair"
                  style={{ color: 'var(--blue)' }}
                >
                  <Icon size={20} strokeWidth={1.8} />
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <dl className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {META.map((m) => (
          <div key={m.label} className="rounded-xl bg-white p-4 ghair">
            <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-muted">{m.label}</dt>
            <dd className="mt-1 text-sm text-ink">{m.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
