'use client'

// frontend/src/components/home/AboutValues.tsx
import { motion } from 'framer-motion'
import { Zap, Heart, ShieldCheck, ArrowRight } from 'lucide-react'
import { usePrefersReducedMotion } from '@/lib/hooks/usePrefersReducedMotion'

const VALUES = [
  {
    title: 'Innovation First',
    body:
      'Every healthcare challenge is an opportunity to innovate. I believe in pushing boundaries to create solutions that truly make a difference in patient care.',
    Icon: Zap,
    tint: 'var(--plum)',
    bg: 'var(--plum-soft)',
  },
  {
    title: 'Human-Centered',
    body:
      'Technology should serve humanity, not the other way around. Every line of code I write is focused on improving the human experience in healthcare.',
    Icon: Heart,
    tint: 'var(--pink)',
    bg: '#fce7f3',
  },
  {
    title: 'Quality Driven',
    body:
      "In healthcare, there's no room for “good enough.” I'm committed to delivering robust, reliable, and scalable solutions that healthcare professionals can trust.",
    Icon: ShieldCheck,
    tint: 'var(--green)',
    bg: '#d1fae5',
  },
]

export function AboutValues() {
  const reduced = usePrefersReducedMotion()

  return (
    <section className="mx-auto max-w-[1180px] px-6 py-16">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-plum">What drives me</p>
      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[1fr_1fr] lg:items-end">
        <h2 className="font-display text-3xl font-extrabold leading-[1.12] text-ink sm:text-[2.5rem]" style={{ letterSpacing: '-0.02em' }}>
          What <span className="grad-plum-text">drives me.</span>
        </h2>
        <p className="max-w-md text-[1.05rem] leading-relaxed text-ink-soft">
          The principles that guide my approach to healthcare technology.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {VALUES.map(({ title, body, Icon, tint, bg }, i) => (
          <motion.div
            key={title}
            className="lift group flex flex-col rounded-2xl bg-white p-6 ghair sm:p-7"
            initial={reduced ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.1 }}
          >
            <div className="grid h-12 w-12 place-items-center rounded-xl transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6" style={{ background: bg }}>
              <Icon size={22} style={{ color: tint }} strokeWidth={1.9} />
            </div>
            <h3 className="mt-5 font-display text-[19px] font-bold text-ink" style={{ letterSpacing: '-0.01em' }}>{title}</h3>
            <p className="mt-2 flex-1 text-[0.98rem] leading-relaxed text-ink-soft">{body}</p>
            <ArrowRight
              size={16}
              style={{ color: tint }}
              className="mt-5 transition-transform group-hover:translate-x-0.5"
              aria-hidden
            />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
