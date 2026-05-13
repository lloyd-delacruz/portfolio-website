'use client'

// frontend/src/components/home/AboutValues.tsx
import { motion } from 'framer-motion'
import { Network, Sparkles, Wrench } from 'lucide-react'
import { InfoCard } from './primitives/InfoCard'
import { usePrefersReducedMotion } from '@/lib/hooks/usePrefersReducedMotion'

type Value = {
  title: string
  Icon: typeof Network
  tint: string
  bg: string
  summary: string
  detail: {
    body: string
    proof: { label: string; text: string }[]
  }
}

const VALUES: Value[] = [
  {
    title: 'Systems thinking',
    Icon: Network,
    tint: 'var(--plum)',
    bg: 'var(--plum-soft)',
    summary:
      'I design for the whole flow — people, data, models, and edges — not just the happy path.',
    detail: {
      body:
        "Most operational problems aren't code problems — they're flow problems. I map the upstream signals, downstream consequences, and the failure modes before reaching for an implementation. The boring middle (handoffs, retries, ownership) is where systems live or die.",
      proof: [
        {
          label: 'Wheelchair logistics',
          text: 'Modelled equipment movement across 3 VCH hospital sites — inventory, dispatch, return — instead of optimising any single screen.',
        },
        {
          label: 'AI orchestration',
          text: 'Designs that compose retrieval, tool use, and human approval as one coordinated loop, not isolated steps.',
        },
      ],
    },
  },
  {
    title: 'AI as a building block',
    Icon: Sparkles,
    tint: 'var(--pink)',
    bg: '#fce7f3',
    summary:
      "LLMs are leverage, not the product. I use them where they earn their place — and keep them out of the way where they don't.",
    detail: {
      body:
        'A model is one component in a larger system. Picking the right one, scoping it tightly, and giving it good context matters more than the model itself. I treat prompting, evals, retrieval, and tool calls as engineering — versioned, tested, and observable.',
      proof: [
        {
          label: 'Stack',
          text: 'Hands-on with Claude, OpenAI, LangChain, RAG patterns, vector stores, and structured-output tool use.',
        },
        {
          label: 'Workflow',
          text: 'Daily driver of Cursor + Claude Code for production engineering, not just side projects.',
        },
      ],
    },
  },
  {
    title: 'Operational pragmatism',
    Icon: Wrench,
    tint: 'var(--green)',
    bg: '#d1fae5',
    summary:
      'Ship things that survive Monday morning. Code that works at 2pm in a busy clinic beats elegant theory.',
    detail: {
      body:
        "20 years on hospital floors shape how I build. Reliability, sensible fallbacks, clear ownership, and humane interfaces are non-negotiable. I optimise for the operator's worst day, not the demo.",
      proof: [
        {
          label: 'Frontline grounded',
          text: 'Built tools used in live healthcare logistics — where wrong, slow, or fragile costs people time and trust.',
        },
        {
          label: 'Working software first',
          text: 'Prefer narrow, shippable slices with measurable outcomes over big-bang re-platforms.',
        },
      ],
    },
  },
]

export function AboutValues() {
  const reduced = usePrefersReducedMotion()

  return (
    <section className="mx-auto max-w-[1180px] px-6 py-16">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-plum">What drives me</p>
      <h2
        className="mt-3 font-display text-3xl font-extrabold leading-[1.12] text-ink sm:text-[2.5rem]"
        style={{ letterSpacing: '-0.02em' }}
      >
        What <span className="grad-plum-text">drives me.</span>
      </h2>
      <p className="mt-3 max-w-2xl text-[1.05rem] leading-relaxed text-ink-soft">
        The principles that guide how I scope, build, and ship systems. Tap a card for how each
        shows up in practice.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {VALUES.map((v, i) => (
          <motion.div
            key={v.title}
            initial={reduced ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.1 }}
          >
            <InfoCard
              Icon={v.Icon}
              title={v.title}
              tint={v.tint}
              bg={v.bg}
              detailLabel="How this shows up"
              detail={
                <div className="space-y-4">
                  <p>{v.detail.body}</p>
                  <ul className="space-y-3 border-t border-[var(--line)] pt-4">
                    {v.detail.proof.map((p) => (
                      <li key={p.label}>
                        <p
                          className="text-[10.5px] font-semibold uppercase tracking-[0.14em]"
                          style={{ color: v.tint }}
                        >
                          {p.label}
                        </p>
                        <p className="mt-1 text-ink-soft">{p.text}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              }
            >
              <p>{v.summary}</p>
            </InfoCard>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
