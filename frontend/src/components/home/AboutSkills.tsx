'use client'

// frontend/src/components/home/AboutSkills.tsx
import { motion } from 'framer-motion'
import { Brain, Code2, HeartPulse } from 'lucide-react'
import { InfoCard } from './primitives/InfoCard'
import { usePrefersReducedMotion } from '@/lib/hooks/usePrefersReducedMotion'

type Group = {
  title: string
  Icon: typeof Brain
  tint: string
  bg: string
  summary: string
  tools: string[]
  detail: {
    body: string
    highlights: { label: string; text: string }[]
  }
}

const GROUPS: Group[] = [
  {
    title: 'Applied AI & product engineering',
    Icon: Brain,
    tint: 'var(--plum)',
    bg: 'var(--plum-soft)',
    summary:
      'I build LLM-powered features the way I build any other engineering — scoped, tested, and observable. Retrieval, tool use, structured generation, and human checkpoints, used where they earn their place.',
    tools: ['Claude', 'OpenAI', 'LangChain', 'RAG', 'Vector DBs', 'Cursor'],
    detail: {
      body:
        'I treat LLMs the way I treat any other dependency: scope them tightly, give them good context, and put real engineering around the boundary. Prompts and evals go in version control next to the rest of the code.',
      highlights: [
        {
          label: 'Patterns',
          text: 'Retrieval-augmented workflows, multi-step tool use, structured-output schemas, and human-in-the-loop checkpoints.',
        },
        {
          label: 'Daily workflow',
          text: 'Cursor and Claude Code for production engineering — not just prototypes.',
        },
      ],
    },
  },
  {
    title: 'Full-stack development',
    Icon: Code2,
    tint: 'var(--amber)',
    bg: '#fef3c7',
    summary:
      'End-to-end product engineering — from schema and API design to production UI. Ship the whole stack, then iterate.',
    tools: ['Next.js', 'TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Prisma', 'AWS'],
    detail: {
      body:
        "I'm comfortable owning a feature from the database up. The boring engineering — typed APIs, schema migrations, auth, observability — is what lets the interesting parts ship safely.",
      highlights: [
        {
          label: 'Frontend',
          text: 'Next.js App Router, TypeScript, Tailwind, and component systems built for real-world content and data.',
        },
        {
          label: 'Backend',
          text: 'Node.js APIs with PostgreSQL/Prisma, deployed on AWS with sane CI and environment hygiene.',
        },
      ],
    },
  },
  {
    title: 'Healthcare operations',
    Icon: HeartPulse,
    tint: 'var(--green)',
    bg: '#d1fae5',
    summary:
      "Nine years inside Vancouver Coastal Health — frontline care, equipment logistics, and the operational gaps that don't show up in reports. The domain context that informs how I scope and build healthcare products.",
    tools: ['VCH operations', 'Clinical workflows', 'Equipment logistics', 'Lean Six Sigma', 'Cerner', 'Stakeholder comms'],
    detail: {
      body:
        'I\'ve worked the floors I now design software for. That shapes what I prioritise: humane interfaces, sensible fallbacks, and a clear-eyed view of what actually changes behaviour in a clinical setting.',
      highlights: [
        {
          label: 'Operations',
          text: 'Project leadership and workflow design across 3 VCH hospital sites; supported 200+ patient plans per year.',
        },
        {
          label: 'Method',
          text: 'Lean Six Sigma process optimisation paired with stakeholder engagement across clinical and admin teams.',
        },
      ],
    },
  },
]

function ToolChips({ tools, tint }: { tools: string[]; tint: string }) {
  return (
    <ul className="mt-4 flex flex-wrap gap-1.5">
      {tools.map((t) => (
        <li
          key={t}
          className="inline-flex items-center gap-1.5 rounded-full bg-[var(--cream-2)] px-2.5 py-1 text-[12px] font-medium text-ink-soft"
        >
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: tint }} />
          {t}
        </li>
      ))}
    </ul>
  )
}

export function AboutSkills() {
  const reduced = usePrefersReducedMotion()

  return (
    <section className="mx-auto max-w-[1180px] px-6 py-16">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-plum">Technical expertise</p>
      <h2
        className="mt-3 font-display text-3xl font-extrabold leading-[1.12] text-ink sm:text-[2.5rem]"
        style={{ letterSpacing: '-0.02em' }}
      >
        Technical <span className="grad-plum-text">expertise.</span>
      </h2>
      <p className="mt-3 max-w-2xl text-[1.05rem] leading-relaxed text-ink-soft">
        Three overlapping bodies of work: applied AI engineering, full-stack product development,
        and nearly a decade inside healthcare operations. Each area reflects a different layer of
        the systems work.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-3">
        {GROUPS.map((g, i) => (
          <motion.div
            key={g.title}
            initial={reduced ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.1 }}
          >
            <InfoCard
              Icon={g.Icon}
              title={g.title}
              tint={g.tint}
              bg={g.bg}
              detailLabel="What this looks like"
              detail={
                <div className="space-y-4">
                  <p>{g.detail.body}</p>
                  <ul className="space-y-3 border-t border-[var(--line)] pt-4">
                    {g.detail.highlights.map((h) => (
                      <li key={h.label}>
                        <p
                          className="text-[10.5px] font-semibold uppercase tracking-[0.14em]"
                          style={{ color: g.tint }}
                        >
                          {h.label}
                        </p>
                        <p className="mt-1 text-ink-soft">{h.text}</p>
                      </li>
                    ))}
                  </ul>
                  <div className="border-t border-[var(--line)] pt-4">
                    <p className="text-[10.5px] font-semibold uppercase tracking-[0.14em]" style={{ color: g.tint }}>
                      Tools
                    </p>
                    <ToolChips tools={g.tools} tint={g.tint} />
                  </div>
                </div>
              }
            >
              <p>{g.summary}</p>
              <ToolChips tools={g.tools} tint={g.tint} />
            </InfoCard>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
