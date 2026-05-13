'use client'

// frontend/src/components/home/AboutJourney.tsx
import { motion } from 'framer-motion'
import { Briefcase, GraduationCap, HeartPulse, Sparkles } from 'lucide-react'
import { usePrefersReducedMotion } from '@/lib/hooks/usePrefersReducedMotion'

const ENTRIES = [
  {
    period: '2007 — 2012',
    title: 'Industrial Engineering & early career',
    body:
      'Earned a BSc in Industrial Engineering in 2007. Spent the first few years in sales, then relocated to Singapore for engineering work on sustainable-energy projects. Applied Lean Six Sigma to cut project timelines by ~15% and costs by ~20% — the foundation for how I still approach systems and operations today.',
    skills: ['Project Management', 'Lean Six Sigma', 'Process Optimization', 'Contract Management'],
    Icon: Briefcase,
    tint: 'var(--plum)',
    soft: 'var(--plum-soft)',
    current: false,
  },
  {
    period: '2012 — 2016',
    title: 'Starting over in Canada',
    body:
      'Moved to Canada in 2012 and rebuilt from the ground up. Worked service, security, and cleaning jobs to fund full-time study — Rehabilitation Assistant Diploma at Vancouver Community College, then Sustainability Management at UBC. The grind itself was the curriculum: every job taught me something about how people actually use systems.',
    skills: ['Adaptability', 'Resilience', 'Time Management', 'Customer Service'],
    Icon: GraduationCap,
    tint: 'var(--amber)',
    soft: '#fef3c7',
    current: false,
  },
  {
    period: '2016 — 2022',
    title: 'Healthcare practice at VCH',
    body:
      "Joined Vancouver Coastal Health as a Rehabilitation Assistant in 2016. Supported 200+ patient care plans per year across three hospital sites — outpatient and acute. Six years close to the operational gaps that don't show up in reports: scheduling friction, equipment misplacement, handoffs that fall through. That's where the engineering work started.",
    skills: ['Patient care', 'Clinical workflows', 'Equipment logistics', 'Cross-team coordination', 'Cerner'],
    Icon: HeartPulse,
    tint: 'var(--green)',
    soft: '#d1fae5',
    current: false,
  },
  {
    period: '2022 — Present',
    title: 'Engineering, analytics & applied AI',
    body:
      'Began layering engineering and analytics work on top of clinical practice. Completed an MSc in Data Analytics at Eastern University; earned certifications across analytics, cloud, and applied AI (BrainStation, Google, DeepLearning.AI, AWS AI Practitioner); shipped the first version of a wheelchair-logistics platform now used across three VCH hospital sites. Still at VCH — open to product engineering, applied AI, and operational software work where healthcare context becomes an operational advantage.',
    skills: ['Python', 'SQL', 'Tableau', 'AWS', 'Next.js', 'TypeScript', 'Applied AI', 'RAG'],
    Icon: Sparkles,
    tint: 'var(--coral)',
    soft: '#ffe4e0',
    current: true,
  },
]

export function AboutJourney() {
  const reduced = usePrefersReducedMotion()

  return (
    <section className="mx-auto max-w-[1180px] px-6 py-16">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-plum">Career evolution</p>
      <h2 className="mt-3 font-display text-3xl font-extrabold leading-[1.12] text-ink sm:text-[2.5rem]" style={{ letterSpacing: '-0.02em' }}>
        My professional <span className="grad-plum-text">journey.</span>
      </h2>
      <p className="mt-3 max-w-2xl text-[1.05rem] leading-relaxed text-ink-soft">
        From Industrial Engineering to applied AI — a multi-decade arc across continents,
        disciplines, and the systems behind healthcare.
      </p>

      <ol className="relative mt-12 space-y-7 pl-9 sm:pl-12">
        {/* rail */}
        {reduced ? (
          <span className="absolute left-[10px] top-3 bottom-3 w-px sm:left-[14px]" style={{ background: 'var(--line-strong)' }} aria-hidden />
        ) : (
          <motion.span
            className="absolute left-[10px] top-3 w-px origin-top sm:left-[14px]"
            style={{ background: 'var(--line-strong)' }}
            initial={{ height: 0 }}
            whileInView={{ height: 'calc(100% - 1.5rem)' }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: 'easeInOut' }}
            aria-hidden
          />
        )}

        {ENTRIES.map((e, i) => (
          <motion.li
            key={e.period}
            className="relative"
            initial={reduced ? false : { opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.08 }}
          >
            {/* node */}
            <span
              className="absolute -left-[34px] top-3 grid h-5 w-5 place-items-center rounded-full ring-4 ring-[var(--cream)] sm:-left-[42px]"
              style={{ background: e.soft }}
              aria-hidden
            >
              <span className={`h-2 w-2 rounded-full ${e.current ? 'anim-pulse' : ''}`} style={{ background: e.tint }} />
            </span>

            <div className="lift group rounded-2xl bg-white p-6 ghair sm:p-7">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl transition-transform group-hover:scale-105" style={{ background: e.soft }}>
                  <e.Icon size={18} style={{ color: e.tint }} strokeWidth={1.9} />
                </div>
                <span
                  className="inline-flex items-center rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em]"
                  style={{ background: e.soft, color: e.tint }}
                >
                  {e.period}
                </span>
                {e.current && (
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-ink-muted">
                    <span className="anim-pulse h-1.5 w-1.5 rounded-full" style={{ background: 'var(--green)' }} />
                    now
                  </span>
                )}
              </div>

              <h3 className="mt-4 font-display text-xl font-bold text-ink sm:text-[1.4rem]" style={{ letterSpacing: '-0.01em' }}>
                {e.title}
              </h3>
              <p className="mt-2.5 text-[1rem] leading-relaxed text-ink-soft">{e.body}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                {e.skills.map((s) => (
                  <span
                    key={s}
                    className="rounded-lg px-2.5 py-1 text-xs font-medium text-ink-soft transition-colors"
                    style={{ background: 'rgba(28,22,46,0.05)' }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </motion.li>
        ))}
      </ol>
    </section>
  )
}
