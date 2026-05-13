'use client'

// frontend/src/components/home/AboutSkills.tsx
import { motion } from 'framer-motion'
import { BarChart3, Workflow, HeartPulse } from 'lucide-react'
import { usePrefersReducedMotion } from '@/lib/hooks/usePrefersReducedMotion'

type Skill = { label: string; pct: number }

const GROUPS: { title: string; tint: string; bg: string; Icon: typeof BarChart3; skills: Skill[] }[] = [
  {
    title: 'Data Analytics',
    tint: 'var(--plum)',
    bg: 'var(--plum-soft)',
    Icon: BarChart3,
    skills: [
      { label: 'SQL, Python & R', pct: 90 },
      { label: 'Tableau & Excel', pct: 85 },
      { label: 'AI & Prompt Engineering', pct: 80 },
    ],
  },
  {
    title: 'Project Management',
    tint: 'var(--amber)',
    bg: '#fef3c7',
    Icon: Workflow,
    skills: [
      { label: 'Lean Six Sigma', pct: 95 },
      { label: 'Process Optimization', pct: 90 },
      { label: 'Stakeholder Engagement', pct: 85 },
    ],
  },
  {
    title: 'Healthcare & Communication',
    tint: 'var(--green)',
    bg: '#d1fae5',
    Icon: HeartPulse,
    skills: [
      { label: 'Patient Care', pct: 95 },
      { label: 'Multidisciplinary Teams', pct: 90 },
      { label: 'Cerner Systems', pct: 75 },
    ],
  },
]

function Bar({ pct, tint, reduced }: { pct: number; tint: string; reduced: boolean }) {
  return (
    <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full" style={{ background: 'var(--line)' }}>
      <motion.div
        className="h-full rounded-full"
        style={{ background: tint }}
        initial={reduced ? { width: `${pct}%` } : { width: 0 }}
        whileInView={{ width: `${pct}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.2, 0.7, 0.3, 1] }}
      />
    </div>
  )
}

export function AboutSkills() {
  const reduced = usePrefersReducedMotion()

  return (
    <section className="mx-auto max-w-[1180px] px-6 py-16">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-plum">Technical expertise</p>
      <h2 className="mt-3 font-display text-3xl font-extrabold leading-[1.12] text-ink sm:text-[2.5rem]" style={{ letterSpacing: '-0.02em' }}>
        Technical <span className="grad-plum-text">expertise.</span>
      </h2>
      <p className="mt-3 max-w-2xl text-[1.05rem] leading-relaxed text-ink-soft">
        A skill set spanning data analytics, healthcare, project management, and operational
        optimization.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-3">
        {GROUPS.map(({ title, tint, bg, Icon, skills }, i) => (
          <motion.div
            key={title}
            className="lift group rounded-2xl bg-white p-6 ghair soft-shadow sm:p-7"
            initial={reduced ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.1 }}
          >
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl transition-transform duration-300 group-hover:scale-110" style={{ background: bg }}>
                <Icon size={18} style={{ color: tint }} strokeWidth={1.9} />
              </div>
              <h3 className="font-display text-[17px] font-bold" style={{ color: tint, letterSpacing: '-0.01em' }}>
                {title}
              </h3>
            </div>
            <div className="mt-5 space-y-4">
              {skills.map(({ label, pct }) => (
                <div key={label}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-ink">{label}</span>
                    <span className="font-display text-[13px] font-bold text-ink-muted">{pct}%</span>
                  </div>
                  <Bar pct={pct} tint={tint} reduced={reduced} />
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
