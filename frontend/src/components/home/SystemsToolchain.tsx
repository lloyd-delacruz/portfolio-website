// frontend/src/components/home/SystemsToolchain.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { X, ArrowUpRight, type LucideIcon, Atom, Wind } from 'lucide-react'

type Project = { name: string; href?: string }

type Monogram = { text: string; bg: string; fg: string }

type Tool = {
  name: string
  vendor: string
  logo?: string
  Icon?: LucideIcon
  monogram?: Monogram
  tagline: string
  what: string
  trend: string
  how: string
  inWork: string
  projects: Project[]
  url: string
  site: string
}

const AI_TOOLS: Tool[] = [
  {
    name: 'Claude Code',
    vendor: 'Anthropic',
    logo: '/logos/claude.svg',
    tagline: 'Agentic coding tool that lives in your terminal.',
    what:
      'A command-line coding agent: you describe a change in plain English and it reads the codebase, edits across files, runs tests and commands, and iterates until it works — with you reviewing every step.',
    trend:
      'Terminal-native agents are where serious AI coding is heading in 2025–26 — less autocomplete, more "delegate a task, review the diff." Claude Code, OpenAI Codex, and similar tools are converging on this loop.',
    how:
      'Runs locally with access to your files, shell, and git. It plans, makes edits, runs commands, reads the output, and corrects itself — backed by large-context models that hold a whole project in view.',
    inWork: 'My primary builder — most of what ships across these projects is planned, written, and refactored here.',
    projects: [
      { name: 'EquiTrackr', href: '/work/equitrackr' },
      { name: 'SpendWise', href: '/work/spendwise' },
      { name: 'Wheelchair Tracking', href: '/work/wheelchair-tracking' },
      { name: 'This site', href: '/' },
    ],
    url: 'https://claude.com/claude-code',
    site: 'claude.com/claude-code',
  },
  {
    name: 'Codex',
    vendor: 'OpenAI',
    logo: '/logos/openai.svg',
    tagline: 'Cloud-based software-engineering agent.',
    what:
      'Hand it a task and it works in its own sandboxed environment — writing code, running tests, and opening a pull request you review. There is also a CLI version for working locally.',
    trend:
      'The 2025 shift from chat-in-an-editor to autonomous agents you assign work to and check back on later. Codex, Claude Code, and Devin-style tools are racing on this.',
    how:
      'Spins up an isolated container with your repo, runs the task end to end, then reports back with a diff and a log of everything it did.',
    inWork: 'Runs in parallel with Claude Code on self-contained jobs and as an independent second opinion.',
    projects: [
      { name: 'Health dashboards', href: '/dashboards/life-expectancy' },
      { name: 'SpendWise', href: '/work/spendwise' },
      { name: 'EquiTrackr', href: '/work/equitrackr' },
    ],
    url: 'https://openai.com/codex',
    site: 'openai.com/codex',
  },
  {
    name: 'Cursor',
    vendor: 'Anysphere',
    logo: '/logos/cursor.svg',
    tagline: 'An AI-first code editor — a fork of VS Code built around the model.',
    what:
      'A familiar editor where the AI is the centerpiece: chat with your codebase, multi-file edits, autocomplete that predicts your next change, and an agent mode for larger tasks.',
    trend:
      'The most-adopted AI editor of 2024–25. It pushed "tab to accept the model’s next edit" into the mainstream and forced every other editor to follow.',
    how:
      'Indexes your repo for context, then uses frontier models for completion, chat, and agentic edits — all inside the editor you already know.',
    inWork: 'Where I make the fast, in-context edits — layout polish, chart styling, quick fixes.',
    projects: [
      { name: 'Health dashboards', href: '/dashboards/heart-disease-prediction' },
      { name: 'This site', href: '/' },
      { name: 'Wheelchair Tracking', href: '/work/wheelchair-tracking' },
    ],
    url: 'https://cursor.com',
    site: 'cursor.com',
  },
  {
    name: 'Antigravity',
    vendor: 'Google',
    logo: '/logos/antigravity.svg',
    tagline: 'An agent-first development platform.',
    what:
      'An IDE built so AI agents are first-class operators — they plan, write, run, and verify across the editor, terminal, and browser while you supervise from a mission-control view.',
    trend:
      'Part of the late-2025 wave of "agentic IDEs" — the bet that the unit of work is a task handed to an agent, not a line typed by a human.',
    how:
      'Built on Gemini models; agents operate with tools across your environment, surface their plans and artifacts for review, and run longer autonomous stretches.',
    inWork: 'For chunkier, well-scoped work I can hand off and check back on.',
    projects: [
      { name: 'Apex Protocol', href: '/work/apex-protocol' },
      { name: 'EquiTrackr', href: '/work/equitrackr' },
    ],
    url: 'https://antigravity.google',
    site: 'antigravity.google',
  },
  {
    name: 'GitHub Copilot',
    vendor: 'GitHub · Microsoft',
    logo: '/logos/github-copilot.svg',
    tagline: 'The original AI pair programmer — inline in your editor.',
    what:
      'Autocompletes whole lines and functions as you type, answers questions about your code in chat, and now adds an agent mode and PR-review features.',
    trend:
      'The tool that started the category in 2021. In 2025 it broadened from autocomplete to chat, agents, and multi-model support — but its core value is still the frictionless inline suggestion.',
    how:
      'Sends your surrounding code as context to a code model and streams back suggestions you accept with Tab; integrates with most major editors.',
    inWork: 'Always on while I type — boilerplate, type definitions, repetitive blocks across every repo.',
    projects: [
      { name: 'Every repo' },
      { name: 'SpendWise', href: '/work/spendwise' },
    ],
    url: 'https://github.com/features/copilot',
    site: 'github.com/features/copilot',
  },
  {
    name: 'Gemini',
    vendor: 'Google',
    logo: '/logos/gemini.svg',
    tagline: 'Google’s flagship multimodal model family.',
    what:
      'A general-purpose AI that handles text, code, images, audio, and video with very large context windows — usable via the app, the API, and inside tools like Antigravity and Android Studio.',
    trend:
      'The main rival to GPT and Claude. Its huge context windows made "drop the whole codebase or dataset in and ask" a normal workflow in 2025.',
    how:
      'A family of models — Flash for speed, Pro for depth — trained natively on multiple modalities; you prompt it with text plus files and it reasons over all of them.',
    inWork: 'My research-and-review desk — architecture reviews, dataset exploration, multimodal checks of rendered pages.',
    projects: [
      { name: 'Wheelchair Tracking', href: '/work/wheelchair-tracking' },
      { name: 'Life Expectancy analysis', href: '/dashboards/life-expectancy' },
      { name: 'This site', href: '/' },
    ],
    url: 'https://gemini.google.com',
    site: 'gemini.google.com',
  },
]

const FRONTEND_TOOLS: Tool[] = [
  {
    name: 'Next.js',
    vendor: 'Vercel',
    monogram: { text: 'N', bg: '#0a0a0a', fg: '#fdf8f3' },
    tagline: 'The React framework for the web.',
    what:
      'A production framework built on React: file-system routing, server and client components, image optimization, and a build pipeline that handles static export, SSR, and edge rendering from the same codebase.',
    trend:
      'The default React stack in 2025. App Router and React Server Components shifted how teams think about where rendering happens — server-first by default, with islands of interactivity on the client.',
    how:
      'Compiles your `app/` directory into routes, decides per-component whether to render on the server or ship to the client, and bundles only what each page needs. Output can be a Node server, a static export, or edge functions.',
    inWork: "Powers every page you're reading — this site, the case studies, and most of the work I ship to the browser.",
    projects: [
      { name: 'This site', href: '/' },
      { name: 'EquiTrackr', href: '/work/equitrackr' },
      { name: 'SpendWise', href: '/work/spendwise' },
    ],
    url: 'https://nextjs.org',
    site: 'nextjs.org',
  },
  {
    name: 'Astro',
    vendor: 'Astro',
    monogram: { text: 'A', bg: '#1c162e', fg: '#ff5d01' },
    tagline: 'Content-first web framework with islands architecture.',
    what:
      'A framework optimized for content-heavy sites: ships zero JavaScript by default, lets you use React/Vue/Svelte components as islands of interactivity, and includes a content collection system for Markdown and MDX.',
    trend:
      'Part of the 2024–25 backlash against shipping megabytes of JavaScript for a blog. Astro, Hono, and a few others are pushing the "send HTML, hydrate selectively" model into mainstream use.',
    how:
      'Renders pages to HTML at build time, then hydrates only the components you explicitly mark as interactive. The rest of the page ships as plain markup — fast to load, easy to cache.',
    inWork: 'For content-heavy work where the words are the product and a full SPA shell would be overkill.',
    projects: [{ name: 'Explorations' }],
    url: 'https://astro.build',
    site: 'astro.build',
  },
  {
    name: 'React',
    vendor: 'Meta',
    Icon: Atom,
    tagline: 'A library for building UIs from components.',
    what:
      'A JavaScript library where you describe your UI as a tree of components — each one a function that takes data and returns markup. React keeps the rendered output in sync with the data as it changes.',
    trend:
      'Still the dominant UI library by miles. The 2024–25 era added Server Components, which split rendering between server and client — collapsing the line between framework and library.',
    how:
      'Maintains a virtual representation of the UI in memory. When state changes it diffs the new tree against the old one and applies the minimum set of DOM updates needed.',
    inWork: 'Every interactive surface I build — pages, dashboards, charts — sits on React, usually via Next.js.',
    projects: [
      { name: 'This site', href: '/' },
      { name: 'EquiTrackr', href: '/work/equitrackr' },
      { name: 'Health dashboards', href: '/dashboards/life-expectancy' },
    ],
    url: 'https://react.dev',
    site: 'react.dev',
  },
  {
    name: 'TypeScript',
    vendor: 'Microsoft',
    monogram: { text: 'Ts', bg: '#3178c6', fg: '#ffffff' },
    tagline: 'JavaScript with types.',
    what:
      'A superset of JavaScript that adds a static type system. Code compiles down to plain JS, but during development the compiler catches whole classes of errors before the code runs.',
    trend:
      'The default for any serious JavaScript project in 2025. Even traditionally-untyped ecosystems (React Native, Node CLIs, build tools) are moving to TS or TS-checked JSDoc.',
    how:
      'Runs as a compiler and language server: reads your code, infers or checks types against your annotations, and either emits JavaScript or surfaces errors. IDE integration gives you autocomplete and refactoring.',
    inWork: 'Standard across every project — APIs, components, scripts. Strictness on; no escape hatches without a reason.',
    projects: [
      { name: 'This site', href: '/' },
      { name: 'EquiTrackr', href: '/work/equitrackr' },
      { name: 'SpendWise', href: '/work/spendwise' },
    ],
    url: 'https://www.typescriptlang.org',
    site: 'typescriptlang.org',
  },
  {
    name: 'Tailwind CSS',
    vendor: 'Tailwind Labs',
    Icon: Wind,
    tagline: 'Utility-first CSS framework.',
    what:
      'Instead of writing CSS, you compose pre-defined utility classes directly in your markup — spacing, colors, typography, layout. The build step strips out unused classes so the shipped CSS stays small.',
    trend:
      'The most-adopted styling approach in modern React/Next codebases. v4 collapsed config into CSS itself and made theming through CSS variables a first-class concept.',
    how:
      'Scans your source for class names at build time, generates only the CSS you actually used, and exposes a theme layer via CSS variables you can override per project.',
    inWork: 'Every component on this site styles through Tailwind — paired with shadcn/ui for primitives and custom utilities for the brand layer.',
    projects: [
      { name: 'This site', href: '/' },
      { name: 'EquiTrackr', href: '/work/equitrackr' },
      { name: 'SpendWise', href: '/work/spendwise' },
    ],
    url: 'https://tailwindcss.com',
    site: 'tailwindcss.com',
  },
  {
    name: 'shadcn/ui',
    vendor: 'shadcn',
    monogram: { text: 'sh', bg: '#1c162e', fg: '#fdf8f3' },
    tagline: 'Copy-paste component library you actually own.',
    what:
      'Not a package — a CLI that drops Radix-based React components directly into your project, styled with Tailwind. You own the source, so you can modify any component without fighting library defaults.',
    trend:
      'The dominant approach for design-system primitives in React in 2025. Headless logic (Radix) plus owned, restyled markup has effectively replaced traditional component libraries like Material UI for new projects.',
    how:
      'A CLI fetches the source for a component and writes it into your `components/ui` folder. From then on it\'s your code — no package to update, no version conflicts to manage.',
    inWork: 'The base layer for buttons, dialogs, dropdowns, and other primitives — restyled to fit the warm-paper aesthetic of this site.',
    projects: [
      { name: 'This site', href: '/' },
      { name: 'EquiTrackr', href: '/work/equitrackr' },
    ],
    url: 'https://ui.shadcn.com',
    site: 'ui.shadcn.com',
  },
]

function ToolThumb({ tool }: { tool: Tool }) {
  if (tool.Icon) {
    const Icon = tool.Icon
    return (
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#f5f3f8] ghair">
        <Icon size={22} className="text-ink" strokeWidth={1.75} />
      </span>
    )
  }
  if (tool.monogram) {
    const { text, bg, fg } = tool.monogram
    return (
      <span
        className="grid h-11 w-11 shrink-0 place-items-center rounded-xl ghair font-display text-[13px] font-bold tracking-tight"
        style={{ background: bg, color: fg }}
      >
        {text}
      </span>
    )
  }
  if (tool.logo) {
    return (
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#f5f3f8] ghair">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={tool.logo} alt="" className="h-[22px] w-[22px]" />
      </span>
    )
  }
  return null
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mt-4">
      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-muted">{label}</p>
      <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-soft">{children}</p>
    </div>
  )
}

type RowContent = {
  eyebrow: string
  headlineLead: string
  headlineAccent: string
  description: string
  tools: Tool[]
}

function ToolRow({ row, onSelect }: { row: RowContent; onSelect: (t: Tool) => void }) {
  return (
    <div className="rounded-[1.6rem] bg-white/70 p-7 ghair sm:p-9">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-plum">{row.eyebrow}</p>

      <div className="mt-3 grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_1fr] lg:items-end">
        <h2 className="font-display text-2xl font-extrabold leading-[1.15] text-ink sm:text-[2rem]">
          {row.headlineLead}{' '}
          <span className="text-plum">{row.headlineAccent}</span>
        </h2>
        <p className="max-w-md text-[1.02rem] leading-relaxed text-ink-soft">{row.description}</p>
      </div>

      <div className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {row.tools.map((t) => (
          <button
            key={t.name}
            type="button"
            onClick={() => onSelect(t)}
            className="flex items-center gap-4 rounded-2xl bg-white p-5 text-left ghair lift"
          >
            <ToolThumb tool={t} />
            <span>
              <span className="block font-display text-[15px] font-bold text-ink">{t.name}</span>
              <span className="mt-0.5 block text-[12px] text-ink-muted">{t.vendor}</span>
              <span className="mt-1 block text-[12.5px] leading-snug text-ink-soft">{t.tagline}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

const AI_ROW: RowContent = {
  eyebrow: 'The toolchain',
  headlineLead: 'Agents do the heavy lifting.',
  headlineAccent: 'I direct the work.',
  description:
    'A stack of agentic coding tools, each pointed at what it does best. Tap any one to see what it is, where the field is heading, how it works — and where it shows up in my work.',
  tools: AI_TOOLS,
}

const FRONTEND_ROW: RowContent = {
  eyebrow: 'The frontend',
  headlineLead: 'The interface layer.',
  headlineAccent: 'What you see and touch.',
  description:
    'What renders in the browser — component-driven, typed end-to-end, and tuned for fast pages. Same modal shape: what it is, where the field is now, how it works, and where it shows up in my work.',
  tools: FRONTEND_TOOLS,
}

export function SystemsToolchain() {
  const [active, setActive] = useState<Tool | null>(null)

  useEffect(() => {
    if (!active) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(null)
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [active])

  return (
    <section className="mx-auto max-w-[1180px] px-6 pt-4 pb-16 space-y-6">
      <ToolRow row={AI_ROW} onSelect={setActive} />
      <ToolRow row={FRONTEND_ROW} onSelect={setActive} />

      {active && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1c162e]/45 p-4 backdrop-blur-sm"
          onClick={() => setActive(null)}
          role="dialog"
          aria-modal="true"
          aria-label={active.name}
        >
          <div
            className="home2 max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 soft-shadow-lg sm:p-7"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <ToolThumb tool={active} />
                <div>
                  <h3 className="font-display text-base font-bold text-ink">{active.name}</h3>
                  <p className="text-[12px] text-ink-muted">
                    {active.vendor} · {active.tagline}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActive(null)}
                aria-label="Close"
                className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-ink-muted transition-colors hover:bg-black/5 hover:text-ink"
              >
                <X size={16} />
              </button>
            </div>

            <Section label="What it is">{active.what}</Section>
            <Section label="Where the field is now">{active.trend}</Section>
            <Section label="How it works">{active.how}</Section>

            <div className="mt-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-muted">In my work</p>
              <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-soft">{active.inWork}</p>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {active.projects.map((p) =>
                  p.href ? (
                    <Link
                      key={p.name}
                      href={p.href}
                      className="group inline-flex items-center gap-1 rounded-full bg-[var(--cream)]/70 px-3 py-1 text-[12px] font-medium text-ink-soft ghair transition-colors hover:bg-[var(--cream)] hover:text-ink"
                    >
                      {p.name}
                      <ArrowUpRight size={12} className="text-ink-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  ) : (
                    <span
                      key={p.name}
                      className="inline-flex items-center rounded-full bg-[var(--cream)]/70 px-3 py-1 text-[12px] font-medium text-ink-muted ghair"
                    >
                      {p.name}
                    </span>
                  ),
                )}
              </div>
            </div>

            <a
              href={active.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-plum transition-colors hover:text-[var(--plum-deep)]"
            >
              Visit {active.site}
              <ArrowUpRight size={15} />
            </a>
          </div>
        </div>
      )}
    </section>
  )
}
