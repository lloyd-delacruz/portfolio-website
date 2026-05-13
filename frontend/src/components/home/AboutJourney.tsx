'use client'

// frontend/src/components/home/AboutJourney.tsx
import { motion } from 'framer-motion'
import { Briefcase, GraduationCap, HeartPulse, Sparkles, ArrowRight } from 'lucide-react'
import { usePrefersReducedMotion } from '@/lib/hooks/usePrefersReducedMotion'

const ENTRIES = [
  {
    period: '2007 — 2012',
    title: 'Industrial Engineering & Early Career',
    body:
      'Graduated BSc Industrial Engineering in 2007. Started in sales (2007-2010), then transitioned to engineering roles in Singapore (2010-2012). Led sustainable energy projects, implemented Lean Six Sigma methodologies, reducing timelines by 15% and costs by 20%.',
    skills: ['Project Management', 'Lean Six Sigma', 'Process Optimization', 'Contract Management'],
    Icon: Briefcase,
    tint: 'var(--plum)',
    soft: 'var(--plum-soft)',
    current: false,
  },
  {
    period: '2012 — 2016',
    title: 'Canadian Transition & Education',
    body:
      'Moved to Canada and worked multiple jobs (service, security, cleaning) to support myself while pursuing full-time studies. Completed Rehabilitation Assistant Diploma at Vancouver Community College and Sustainability Management program at University of British Columbia.',
    skills: ['Adaptability', 'Work Ethic', 'Time Management', 'Resilience', 'Customer Service'],
    Icon: GraduationCap,
    tint: 'var(--amber)',
    soft: '#fef3c7',
    current: false,
  },
  {
    period: '2016 — 2025',
    title: 'Healthcare Practice & Data Evolution',
    body:
      "9+ years at Vancouver Coastal Health as Rehabilitation Assistant, supporting 200+ patient plans annually. Transitioned to data analytics through multiple certifications, AWS AI credentials, and Master's in Data Analytics while building healthcare solutions.",
    skills: ['Patient Care', 'Healthcare Systems', 'Data Analytics', 'Python', 'SQL', 'AWS AI'],
    Icon: HeartPulse,
    tint: 'var(--green)',
    soft: '#d1fae5',
    current: false,
  },
  {
    period: '2022 — Present',
    title: 'Data Analytics & AI Transformation',
    body:
      "Mastering data analytics through multiple certifications and AWS AI Practitioner credential. Currently pursuing Master's in Data Analytics while building full-stack healthcare solutions.",
    skills: ['Python', 'SQL', 'Tableau', 'AWS AI', 'Data Engineering', 'Prompt Engineering'],
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
      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[1fr_1fr] lg:items-end">
        <h2 className="font-display text-3xl font-extrabold leading-[1.12] text-ink sm:text-[2.5rem]" style={{ letterSpacing: '-0.02em' }}>
          My professional <span className="grad-plum-text">journey.</span>
        </h2>
        <p className="max-w-md text-[1.05rem] leading-relaxed text-ink-soft">
          From Industrial Engineering to Healthcare Analytics — a 20+ year evolution across
          continents, disciplines, and industries.
        </p>
      </div>

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

              <ArrowRight
                size={16}
                style={{ color: e.tint }}
                className="mt-5 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100"
                aria-hidden
              />
            </div>
          </motion.li>
        ))}
      </ol>
    </section>
  )
}
