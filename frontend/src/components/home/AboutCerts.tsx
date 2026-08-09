// frontend/src/components/home/AboutCerts.tsx
import { BadgeCheck, Award, GraduationCap, Cloud, Database, BarChart3, Terminal, type LucideIcon } from 'lucide-react'
import {
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

const CERTS = [
  { label: 'BrainStation — Data Analytics', Icon: BadgeCheck },
  { label: 'Google — Data Analytics', Icon: Award },
  { label: 'DeepLearning.AI — Data Engineering', Icon: GraduationCap },
  { label: 'AWS — AI Practitioner', Icon: Cloud },
]

type StackItem = {
  name: string
  description: string
  icon: React.ReactNode
}

/**
 * Official brand marks via react-icons/si (Simple Icons) wherever one
 * exists, rendered in each brand's real color. A few tools here have no
 * redistributable official logo (SQL is a language spec, not a product;
 * Tableau, AWS, and OpenAI's products aren't in Simple Icons' set) — those
 * fall back to a neutral Lucide icon instead of an invented mark.
 */
const STACK_GROUPS: { title: string; items: StackItem[] }[] = [
  {
    title: 'Languages & data',
    items: [
      { name: 'HTML5', description: 'Markup for every page on this site.', icon: <SiHtml5 size={20} color="#E34F26" /> },
      { name: 'JavaScript', description: 'The language under every interactive UI.', icon: <SiJavascript size={18} color="#F7DF1E" /> },
      { name: 'Python', description: 'Data pipelines, scripting, and backend services.', icon: <SiPython size={19} color="#3776AB" /> },
      { name: 'SQL', description: 'Querying and modeling relational data.', icon: <Database size={19} className="text-ink-soft" strokeWidth={1.9} /> },
      { name: 'R', description: 'Statistical analysis for coursework and healthcare data work.', icon: <SiR size={19} color="#276DC3" /> },
      { name: 'Tableau', description: 'Dashboards and stakeholder-facing reporting.', icon: <BarChart3 size={19} className="text-ink-soft" strokeWidth={1.9} /> },
    ],
  },
  {
    title: 'AI-assisted development',
    items: [
      { name: 'Claude Code', description: 'AI pair-programmer used to build and maintain this site.', icon: <SiClaudecode size={19} color="#D97757" /> },
      { name: 'Codex', description: "OpenAI's coding agent — implementation and review.", icon: <Terminal size={19} className="text-ink-soft" strokeWidth={1.9} /> },
      { name: 'Gemini', description: "Google's model — research and secondary review.", icon: <SiGooglegemini size={19} color="#8E75B2" /> },
      { name: 'GitHub Copilot', description: 'Inline AI suggestions during day-to-day coding.', icon: <SiGithubcopilot size={19} color="#000000" /> },
    ],
  },
  {
    title: 'Full-stack & platform',
    items: [
      { name: 'React', description: 'Component-based UI — the base of every frontend I ship.', icon: <SiReact size={20} color="#61DAFB" /> },
      { name: 'Next.js', description: 'The framework this site, and most of my projects, run on.', icon: <SiNextdotjs size={19} color="#000000" /> },
      { name: 'Node.js', description: 'JavaScript on the backend — APIs and tooling.', icon: <SiNodedotjs size={19} color="#5FA04E" /> },
      { name: 'PostgreSQL', description: 'The relational database behind production systems.', icon: <SiPostgresql size={19} color="#4169E1" /> },
      { name: 'AWS', description: 'Cloud deployment and infrastructure.', icon: <Cloud size={19} className="text-ink-soft" strokeWidth={1.9} /> },
    ],
  },
]

const CERT_PILL =
  'group inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[13px] font-medium text-ink-soft ghair transition-colors hover:text-ink hover:border-[rgba(109,40,217,0.22)]'

function CertIcon({ Icon }: { Icon: LucideIcon }) {
  return <Icon size={15} strokeWidth={1.9} className="text-plum transition-transform group-hover:scale-110" />
}

export function AboutCerts() {
  return (
    <section className="mx-auto max-w-[1180px] px-6 pb-12 pt-2">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-muted">Certifications</p>
      <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-3">
        {CERTS.map(({ label, Icon }) => (
          <span key={label} className={CERT_PILL}>
            <CertIcon Icon={Icon} />
            {label}
          </span>
        ))}
      </div>

      <p className="mt-9 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-muted">Core stack</p>
      <div className="mt-5 space-y-6">
        {STACK_GROUPS.map((group) => (
          <div key={group.title}>
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-ink-muted/80">{group.title}</p>
            <div className="mt-3 flex flex-wrap gap-3">
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
