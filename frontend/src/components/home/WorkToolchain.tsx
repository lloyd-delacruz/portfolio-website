// frontend/src/components/home/WorkToolchain.tsx
import { Terminal, Bot, MousePointer2, Orbit, Github, Gem } from 'lucide-react'

const TOOLS = [
  {
    name: 'Claude Code',
    role: 'Primary agent — architecture, multi-file refactors, and the bulk of implementation under direction.',
    Icon: Terminal,
    tint: 'var(--plum)',
    bg: 'var(--plum-soft)',
  },
  {
    name: 'Codex',
    role: 'Parallel agent for isolated tasks, scripted changes, and a second pass on tricky problems.',
    Icon: Bot,
    tint: 'var(--plum-deep)',
    bg: '#ede9fe',
  },
  {
    name: 'Cursor',
    role: 'In-editor pair programming for quick edits, inline review, and tight feedback loops.',
    Icon: MousePointer2,
    tint: 'var(--blue)',
    bg: '#e0ecfe',
  },
  {
    name: 'Antigravity',
    role: 'Agent-first IDE for longer autonomous runs — letting the agent drive across a whole task.',
    Icon: Orbit,
    tint: 'var(--coral)',
    bg: '#fde6e3',
  },
  {
    name: 'GitHub Copilot',
    role: 'Inline completion in the flow of writing code — the small stuff, instantly.',
    Icon: Github,
    tint: 'var(--ink)',
    bg: '#ece9f3',
  },
  {
    name: 'Gemini',
    role: 'Research, large-context review, and multimodal sanity checks on designs and data.',
    Icon: Gem,
    tint: 'var(--green)',
    bg: '#d1fae5',
  },
]

export function WorkToolchain() {
  return (
    <section className="mx-auto max-w-[1180px] px-6 pt-4 pb-12">
      <div className="rounded-[1.6rem] bg-white/70 p-7 ghair sm:p-9">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-plum">How these systems get built</p>

        <div className="mt-3 grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_1fr] lg:items-end">
          <h2 className="font-display text-2xl font-extrabold leading-[1.15] text-ink sm:text-[2rem]">
            Built AI-native — agents do the heavy lifting,{' '}
            <span className="text-plum">I direct the work.</span>
          </h2>
          <p className="max-w-md text-[1.02rem] leading-relaxed text-ink-soft">
            Every project on this page is built with a stack of agentic coding tools, each pointed at
            what it does best. The tools change every quarter; the discipline — clean data, tested
            code, real workflows — doesn&apos;t.
          </p>
        </div>

        <div className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TOOLS.map(({ name, role, Icon, tint, bg }) => (
            <div key={name} className="flex gap-4 rounded-2xl bg-white p-5 ghair">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl" style={{ background: bg }}>
                <Icon size={20} style={{ color: tint }} strokeWidth={1.9} />
              </div>
              <div>
                <h3 className="font-display text-[15px] font-bold text-ink">{name}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-ink-soft">{role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
