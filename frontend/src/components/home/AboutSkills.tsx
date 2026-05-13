'use client'

// frontend/src/components/home/AboutSkills.tsx
import { motion } from 'framer-motion'

type Skill = { label: string; pct: number }

const GROUPS: { title: string; tint: string; skills: Skill[] }[] = [
  {
    title: 'Data Analytics',
    tint: 'var(--plum)',
    skills: [
      { label: 'SQL, Python & R', pct: 90 },
      { label: 'Tableau & Excel', pct: 85 },
      { label: 'AI & Prompt Engineering', pct: 80 },
    ],
  },
  {
    title: 'Project Management',
    tint: 'var(--amber)',
    skills: [
      { label: 'Lean Six Sigma', pct: 95 },
      { label: 'Process Optimization', pct: 90 },
      { label: 'Stakeholder Engagement', pct: 85 },
    ],
  },
  {
    title: 'Healthcare & Communication',
    tint: 'var(--green)',
    skills: [
      { label: 'Patient Care', pct: 95 },
      { label: 'Multidisciplinary Teams', pct: 90 },
      { label: 'Cerner Systems', pct: 75 },
    ],
  },
]

export function AboutSkills() {
  return (
    <section className="mx-auto max-w-[1180px] px-6 py-16">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-plum">Technical expertise</p>
      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[1fr_1fr] lg:items-end">
        <h2 className="font-display text-3xl font-extrabold leading-[1.12] text-ink sm:text-[2.4rem]">
          Technical <span className="text-plum">expertise.</span>
        </h2>
        <p className="max-w-md text-[1.02rem] leading-relaxed text-ink-soft">
          A comprehensive skill set spanning data analytics, healthcare, project management, and
          operational optimization.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-3">
        {GROUPS.map(({ title, tint, skills }) => (
          <div key={title} className="rounded-2xl bg-white p-6 ghair soft-shadow sm:p-7">
            <h3 className="font-display text-lg font-bold" style={{ color: tint }}>
              {title}
            </h3>
            <div className="mt-5 space-y-4">
              {skills.map(({ label, pct }) => (
                <div key={label}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-ink">{label}</span>
                    <span className="text-ink-muted">{pct}%</span>
                  </div>
                  <div
                    className="mt-2 h-1.5 w-full overflow-hidden rounded-full"
                    style={{ background: 'var(--line)' }}
                  >
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: tint }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
