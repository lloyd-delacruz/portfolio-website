// frontend/src/components/home/AboutCerts.tsx
import Image from 'next/image'
import { Database, BarChart3, Terminal } from 'lucide-react'
import {
  SiGoogle,
  SiHtml5,
  SiJavascript,
  SiPython,
  SiR,
  SiClaudecode,
  SiGooglegemini,
  SiGithubcopilot,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
} from 'react-icons/si'
import { TooltipIcon } from './primitives/TooltipIcon'

type Cert = { label: string; icon: React.ReactNode }

/**
 * Official brand marks wherever one exists. Google's is in Simple Icons;
 * BrainStation, DeepLearning.AI, and AWS aren't in that curated set (AWS
 * in particular has never cleared its wordmark for redistribution there),
 * so those three are each brand's own favicon/logo asset pulled from
 * their official site and served from /public/logos.
 */
const CERTS: Cert[] = [
  {
    label: 'BrainStation — Data Analytics',
    icon: <Image src="/logos/brainstation.png" alt="" width={16} height={16} unoptimized />,
  },
  { label: 'Google — Data Analytics', icon: <SiGoogle size={15} color="#4285F4" /> },
  {
    label: 'DeepLearning.AI — Data Engineering',
    icon: <Image src="/logos/deeplearning-ai.png" alt="" width={16} height={16} unoptimized />,
  },
  {
    label: 'AWS — AI Practitioner',
    icon: <Image src="/logos/aws.svg" alt="" width={27} height={16} unoptimized />,
  },
]

type StackItem = {
  name: string
  description: string
  icon: React.ReactNode
}

/**
 * Official brand marks via react-icons/si (Simple Icons) wherever one
 * exists, rendered in each brand's real color, plus AWS's own logo asset
 * (see CERTS above — not in Simple Icons' set). SQL and Tableau have no
 * brand mark of their own (SQL is a language spec, not a product; the
 * Tableau product mark isn't in Simple Icons' set either) — those fall
 * back to a neutral Lucide icon instead of an invented mark.
 */
const STACK_GROUPS: { title: string; items: StackItem[] }[] = [
  {
    title: 'Languages & data',
    items: [
      {
        name: 'HTML5',
        description: 'The markup standard behind every page on this site. Semantic, accessible structure comes before any styling or interactivity.',
        icon: <SiHtml5 size={16} color="#E34F26" />,
      },
      {
        name: 'JavaScript',
        description: "The language under every interactive UI I ship, on this site and off it — front end state and Node.js services alike.",
        icon: <SiJavascript size={15} color="#F7DF1E" />,
      },
      {
        name: 'Python',
        description: 'My default for data pipelines, scripting, and backend services — ETL work, prototyping, and automation across healthcare data projects.',
        icon: <SiPython size={16} color="#3776AB" />,
      },
      {
        name: 'SQL',
        description: 'How I query and model relational data, from MSc coursework analysis to the production schemas behind tools like SpendWise.',
        icon: <Database size={16} className="text-ink-soft" strokeWidth={1.9} />,
      },
      {
        name: 'R',
        description: 'Statistical analysis for coursework and healthcare data work, where I want rigorous stats rather than general-purpose scripting.',
        icon: <SiR size={16} color="#276DC3" />,
      },
      {
        name: 'Tableau',
        description: 'Dashboards and stakeholder-facing reporting — turning raw operational data into something a clinical or admin audience can act on.',
        icon: <BarChart3 size={16} className="text-ink-soft" strokeWidth={1.9} />,
      },
    ],
  },
  {
    title: 'AI-assisted development',
    items: [
      {
        name: 'Claude Code',
        description: 'My primary AI pair-programmer — daily use for implementation, refactors, and reviewing changes across this codebase.',
        icon: <SiClaudecode size={16} color="#D97757" />,
      },
      {
        name: 'Codex',
        description: "OpenAI's coding agent — I bring it in for a second opinion on implementation and code review alongside Claude.",
        icon: <Terminal size={16} className="text-ink-soft" strokeWidth={1.9} />,
      },
      {
        name: 'Gemini',
        description: "Google's model — research and a secondary reviewer when I want a different take on a design or a bug.",
        icon: <SiGooglegemini size={16} color="#8E75B2" />,
      },
      {
        name: 'GitHub Copilot',
        description: 'Inline suggestions during day-to-day coding — fast autocomplete for boilerplate so I can focus on the harder parts.',
        icon: <SiGithubcopilot size={16} color="#000000" />,
      },
    ],
  },
  {
    title: 'Full-stack & platform',
    items: [
      {
        name: 'React',
        description: 'The base of every frontend I build — component-driven UI with the ecosystem I know best.',
        icon: <SiReact size={17} color="#61DAFB" />,
      },
      {
        name: 'Next.js',
        description: 'The framework this site runs on — App Router and static export, and my default for new frontend projects.',
        icon: <SiNextdotjs size={16} color="#000000" />,
      },
      {
        name: 'Node.js',
        description: 'JavaScript on the backend — APIs and tooling, so logic and types can be shared across the whole stack.',
        icon: <SiNodedotjs size={16} color="#5FA04E" />,
      },
      {
        name: 'PostgreSQL',
        description: 'The relational database behind production systems, including the wheelchair-tracking platform running across four VCH sites.',
        icon: <SiPostgresql size={16} color="#4169E1" />,
      },
      {
        name: 'AWS',
        description: 'Cloud deployment and infrastructure — where I host and run backend services and data pipelines.',
        icon: <Image src="/logos/aws.svg" alt="" width={27} height={16} unoptimized />,
      },
    ],
  },
]

const CERT_PILL =
  'group inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[13px] font-medium text-ink-soft ghair transition-colors hover:text-ink hover:border-[rgba(109,40,217,0.22)]'

export function AboutCerts() {
  return (
    <section className="mx-auto max-w-[1180px] px-6 pb-12 pt-2">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-muted">Certifications</p>
      <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-3">
        {CERTS.map(({ label, icon }) => (
          <span key={label} className={CERT_PILL}>
            <span className="grid h-4 w-auto shrink-0 place-items-center transition-transform group-hover:scale-110" aria-hidden>
              {icon}
            </span>
            {label}
          </span>
        ))}
      </div>

      <p className="mt-9 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-muted">Core stack</p>
      <div className="mt-5 space-y-14">
        {STACK_GROUPS.map((group) => (
          <div key={group.title}>
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-ink-muted/80">{group.title}</p>
            <div className="mt-3 flex flex-wrap gap-2.5">
              {group.items.map((item) => (
                <TooltipIcon key={item.name} icon={item.icon} name={item.name} description={item.description} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
