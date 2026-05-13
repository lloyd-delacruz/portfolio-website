# Homepage — AI Systems Architect Evolution Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Evolve the existing `.home2` homepage into an enterprise AI systems architect portfolio — refreshed hero copy + 6-node orchestration diagram, Power Platform in the trusted row, verifiable deployment metrics, a new full-width AnchorCase band for the Wheelchair Tracking system, retuned Capabilities copy, and sharpened credibility quote / footer CTA — without touching the design system, layout, or animations.

**Architecture:** Eight presentational React/TSX components under `frontend/src/components/home/*`. Seven are edited in place; one new component (`AnchorCase.tsx`) is added and consumed by `FeaturedWork.tsx`. No new dependencies, no new design tokens, no shared state, no routing changes. All copy and structural changes are local to each file.

**Tech Stack:** Next.js 15 App Router · TypeScript (strict) · Tailwind CSS · lucide-react · Plus Jakarta Sans · existing CSS vars (`--plum`, `--amber`, `--green`, `--pink`, `--blue`, `--plum-soft`, `--ink`, `--ink-soft`, `--ink-muted`, `--line`) and utility classes (`lift`, `ghair`, `ghair-2`, `ghair-t`, `soft-shadow`, `soft-shadow-sm`, `soft-shadow-lg`, `grad-plum-text`, `anim-rise`, `anim-float`, `anim-drift`, `hero-wash`).

**Verification model:** This codebase has no unit-test harness for `components/home/*`. The spec's verification model is followed: each task ends with `npm run type-check` and `npm run lint` passing; the final task adds `npm run build` and a visual review walk-through. TDD's "write the test first" loop is replaced by "write a tightly-scoped change with explicit expected visual output," and every task ends with a commit.

**Branch:** Continue on `spec/homepage-ai-architect-evolution`. (The spec was committed on that branch; this plan inherits it.)

**Spec reference:** `docs/superpowers/specs/2026-05-13-homepage-ai-architect-evolution-design.md`

---

## File map

| Action | File | Purpose |
|---|---|---|
| Modify | `frontend/src/components/home/HomeHero.tsx` | Eyebrow, headline, sub-headline, secondary CTA copy. |
| Modify | `frontend/src/components/home/DiagramScene.tsx` | Replace 6 node identities/icons/captions; preserve geometry + animation. |
| Modify | `frontend/src/components/home/TrustedRow.tsx` | Relabel, reorder, add Power Platform. |
| Modify | `frontend/src/components/home/MetricsStrip.tsx` | Replace METRICS data; replace right-side panel with availability statement. |
| Modify | `frontend/src/components/home/Capabilities.tsx` | Replace CARDS copy + swap one icon. |
| Create | `frontend/src/components/home/AnchorCase.tsx` | New full-width anchor case band for Wheelchair Tracking. |
| Modify | `frontend/src/components/home/FeaturedWork.tsx` | Render AnchorCase, filter wheelchair from grid, switch to `lg:grid-cols-3`. |
| Modify | `frontend/src/components/home/CredibilityStrip.tsx` | Replace quote text only. |
| Modify | `frontend/src/components/home/FooterCTA.tsx` | Replace headline only. |

`frontend/src/app/page.tsx` is **not** modified.

---

## Task 1: HomeHero copy refresh

**Files:**
- Modify: `frontend/src/components/home/HomeHero.tsx`

- [ ] **Step 1: Update the eyebrow label**

Open `frontend/src/components/home/HomeHero.tsx`. Replace the eyebrow text inside the pill (`<span class="anim-rise inline-flex …">`):

Find:
```tsx
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'var(--green)' }} />
            Systems Engineer
          </span>
```

Replace with:
```tsx
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'var(--green)' }} />
            AI Systems Architect
          </span>
```

- [ ] **Step 2: Update the headline**

Find:
```tsx
          <h1 className="anim-rise mt-6 font-display text-[2.85rem] font-extrabold leading-[1.04] text-ink sm:text-[3.4rem] lg:text-[4rem]" style={{ animationDelay: '60ms' }}>
            I build intelligent
            <br />
            systems that{' '}
            <br className="hidden sm:block" />
            <span className="grad-plum-text">drive impact.</span>
          </h1>
```

Replace with:
```tsx
          <h1 className="anim-rise mt-6 font-display text-[2.85rem] font-extrabold leading-[1.04] text-ink sm:text-[3.4rem] lg:text-[4rem]" style={{ animationDelay: '60ms' }}>
            I architect AI-native
            <br />
            systems that{' '}
            <br className="hidden sm:block" />
            <span className="grad-plum-text">run in production.</span>
          </h1>
```

- [ ] **Step 3: Update the sub-headline**

Find:
```tsx
          <p className="anim-rise mt-6 max-w-[34ch] text-[1.05rem] leading-relaxed text-ink-soft" style={{ animationDelay: '120ms' }}>
            I design and ship AI-native workflows and products that connect people, systems, and
            data — turning complexity into clarity and outcomes.
          </p>
```

Replace with:
```tsx
          <p className="anim-rise mt-6 max-w-[40ch] text-[1.05rem] leading-relaxed text-ink-soft" style={{ animationDelay: '120ms' }}>
            I design and deploy enterprise AI orchestration — agents, workflows, event streams,
            and decision layers that coordinate real operational work across multi-site
            environments.
          </p>
```

(Note: `max-w-[34ch]` widened to `max-w-[40ch]` to accommodate the longer sub-headline without forcing a tall stack.)

- [ ] **Step 4: Update the secondary CTA**

Find:
```tsx
            <Link
              href="/work"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-ink ghair-2 transition-colors hover:bg-[var(--cream-2)]"
            >
              View case studies
            </Link>
```

Replace with:
```tsx
            <Link
              href="/work/wheelchair-tracking"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-ink ghair-2 transition-colors hover:bg-[var(--cream-2)]"
            >
              Read the wheelchair tracking case
            </Link>
```

- [ ] **Step 5: Verify**

Run:
```bash
cd /Users/lloyd.vince1985gmail.com/Desktop/Software_Dev/Professional-website && npm run type-check && npm run lint
```
Expected: both pass with no new errors.

- [ ] **Step 6: Commit**

```bash
git add frontend/src/components/home/HomeHero.tsx
git commit -m "feat(home): refresh hero copy for AI systems architect positioning

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 2: DiagramScene — refresh orchestration nodes

**Files:**
- Modify: `frontend/src/components/home/DiagramScene.tsx`

Replaces the 6 generic icons with architecture-specific identities and adds an outboard mono caption under each. Preserves every geometric and animation property.

- [ ] **Step 1: Update the lucide import**

Open `frontend/src/components/home/DiagramScene.tsx`. Replace the import:

Find:
```tsx
import { Database, Users, Code2, GitBranch, LineChart, Shield } from 'lucide-react'
```

Replace with:
```tsx
import { Bot, Radio, GitFork, Workflow, Library, Activity } from 'lucide-react'
```

- [ ] **Step 2: Extend the Node type with a caption field**

Find:
```tsx
type Node = {
  key: string
  Icon: typeof Database
  color: string
  /** centre point in the 560×437 design space */
  cx: number
  cy: number
  delay: number
}
```

Replace with:
```tsx
type Node = {
  key: string
  Icon: typeof Bot
  color: string
  /** centre point in the 560×437 design space */
  cx: number
  cy: number
  delay: number
  /** uppercase mono caption rendered outboard of the icon */
  caption: string
  /** which side of the icon the caption sits on */
  side: 'left' | 'right'
}
```

- [ ] **Step 3: Replace the NODES array**

Find:
```tsx
const NODES: Node[] = [
  // left column
  { key: 'db',     Icon: Database,  color: 'var(--plum)',  cx: COL_X,     cy: ROW_TOP, delay: 0   },
  { key: 'users',  Icon: Users,     color: 'var(--amber)', cx: COL_X,     cy: ROW_MID, delay: 0.9 },
  { key: 'code',   Icon: Code2,     color: 'var(--green)', cx: COL_X,     cy: ROW_BOT, delay: 0.5 },
  // right column (mirrors of the left, same delays so the pairs float in sync)
  { key: 'flow',   Icon: GitBranch, color: 'var(--pink)',  cx: W - COL_X, cy: ROW_TOP, delay: 0   },
  { key: 'chart',  Icon: LineChart, color: 'var(--blue)',  cx: W - COL_X, cy: ROW_MID, delay: 0.9 },
  { key: 'shield', Icon: Shield,    color: 'var(--plum)',  cx: W - COL_X, cy: ROW_BOT, delay: 0.5 },
]
```

Replace with:
```tsx
const NODES: Node[] = [
  // left column
  { key: 'agents',   Icon: Bot,      color: 'var(--plum)',  cx: COL_X,     cy: ROW_TOP, delay: 0,   caption: 'AI AGENTS',      side: 'left'  },
  { key: 'events',   Icon: Radio,    color: 'var(--amber)', cx: COL_X,     cy: ROW_MID, delay: 0.9, caption: 'EVENT STREAM',   side: 'left'  },
  { key: 'decision', Icon: GitFork,  color: 'var(--green)', cx: COL_X,     cy: ROW_BOT, delay: 0.5, caption: 'DECISION LAYER', side: 'left'  },
  // right column (mirrors of the left, same delays so the pairs float in sync)
  { key: 'workflow', Icon: Workflow, color: 'var(--pink)',  cx: W - COL_X, cy: ROW_TOP, delay: 0,   caption: 'WORKFLOW',       side: 'right' },
  { key: 'knowl',    Icon: Library,  color: 'var(--blue)',  cx: W - COL_X, cy: ROW_MID, delay: 0.9, caption: 'KNOWLEDGE',      side: 'right' },
  { key: 'monitor',  Icon: Activity, color: 'var(--plum)',  cx: W - COL_X, cy: ROW_BOT, delay: 0.5, caption: 'MONITORING',     side: 'right' },
]
```

- [ ] **Step 4: Render captions inside each node wrapper**

Find the node-rendering block at the bottom of the component:
```tsx
          {NODES.map((n) => (
            <div
              key={n.key}
              className="absolute"
              style={{
                width: SIZE,
                height: SIZE,
                left: `${(n.cx / W) * 100}%`,
                top: `${(n.cy / H) * 100}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <div
                className="anim-float grid h-full w-full place-items-center rounded-2xl bg-white ghair soft-shadow-sm"
                style={{
                  animationDelay: `${n.delay}s`,
                  animationDuration: `${6 + (n.delay % 2)}s`,
                }}
              >
                <n.Icon size={22} style={{ color: n.color }} strokeWidth={1.9} />
              </div>
            </div>
          ))}
```

Replace with:
```tsx
          {NODES.map((n) => (
            <div
              key={n.key}
              className="absolute"
              style={{
                width: SIZE,
                height: SIZE,
                left: `${(n.cx / W) * 100}%`,
                top: `${(n.cy / H) * 100}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <div
                className="anim-float grid h-full w-full place-items-center rounded-2xl bg-white ghair soft-shadow-sm"
                style={{
                  animationDelay: `${n.delay}s`,
                  animationDuration: `${6 + (n.delay % 2)}s`,
                }}
              >
                <n.Icon size={22} style={{ color: n.color }} strokeWidth={1.9} />
              </div>
              <span
                className="absolute top-1/2 -translate-y-1/2 text-[9px] font-semibold uppercase tracking-[0.16em] text-ink-muted"
                style={{
                  whiteSpace: 'nowrap',
                  ...(n.side === 'left'
                    ? { right: `${SIZE + 8}px`, textAlign: 'right' }
                    : { left: `${SIZE + 8}px`, textAlign: 'left' }),
                }}
              >
                {n.caption}
              </span>
            </div>
          ))}
```

The caption is a sibling of the `anim-float` div, not a child — this keeps the caption still while the icon drifts. The caption is absolutely positioned relative to the `SIZE × SIZE` wrapper, vertically centred on the icon, and sits outboard of the icon by 8px.

- [ ] **Step 5: Verify**

Run:
```bash
cd /Users/lloyd.vince1985gmail.com/Desktop/Software_Dev/Professional-website && npm run type-check && npm run lint
```
Expected: both pass.

- [ ] **Step 6: Commit**

```bash
git add frontend/src/components/home/DiagramScene.tsx
git commit -m "feat(home): refresh hero diagram with 6 architecture nodes + captions

Replaces generic icons (Database/Users/Code2/GitBranch/LineChart/Shield)
with architecture-specific identities (AI Agents, Event Stream, Decision
Layer, Workflow Engine, Knowledge Base, Ops Monitoring) and adds an
outboard uppercase mono caption per node. Preserves all geometry,
mirror symmetry, animation timings, and connector palette.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 3: TrustedRow — relabel, reorder, add Power Platform

**Files:**
- Modify: `frontend/src/components/home/TrustedRow.tsx`

- [ ] **Step 1: Update the lucide import**

Open `frontend/src/components/home/TrustedRow.tsx`. Replace the import:

Find:
```tsx
import { Terminal, Braces, Cloud, Box, Database, Workflow } from 'lucide-react'
```

Replace with:
```tsx
import { Sparkles, Workflow, LayoutGrid, Braces, Database, Cloud } from 'lucide-react'
```

- [ ] **Step 2: Replace the TECH array**

Find:
```tsx
const TECH = [
  { label: 'Python', Icon: Terminal },
  { label: 'TypeScript', Icon: Braces },
  { label: 'AWS', Icon: Cloud },
  { label: 'Docker', Icon: Box },
  { label: 'PostgreSQL', Icon: Database },
  { label: 'LangChain', Icon: Workflow },
]
```

Replace with:
```tsx
const TECH = [
  { label: 'Claude / OpenAI', Icon: Sparkles },
  { label: 'LangChain', Icon: Workflow },
  { label: 'Power Platform', Icon: LayoutGrid },
  { label: 'Next.js', Icon: Braces },
  { label: 'TypeScript', Icon: Braces },
  { label: 'PostgreSQL', Icon: Database },
  { label: 'AWS', Icon: Cloud },
]
```

- [ ] **Step 3: Update the section label**

Find:
```tsx
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-muted">
        Trusted to build with
      </p>
```

Replace with:
```tsx
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-muted">
        Built with
      </p>
```

- [ ] **Step 4: Verify**

Run:
```bash
cd /Users/lloyd.vince1985gmail.com/Desktop/Software_Dev/Professional-website && npm run type-check && npm run lint
```
Expected: both pass.

- [ ] **Step 5: Commit**

```bash
git add frontend/src/components/home/TrustedRow.tsx
git commit -m "feat(home): reframe TrustedRow with AI orchestration stack + Power Platform

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 4: MetricsStrip — verifiable deployment signals + availability panel

**Files:**
- Modify: `frontend/src/components/home/MetricsStrip.tsx`

- [ ] **Step 1: Update the lucide import**

Open `frontend/src/components/home/MetricsStrip.tsx`. Replace the import:

Find:
```tsx
import { Activity, CalendarDays, Clock, MonitorSmartphone, ArrowRight } from 'lucide-react'
```

Replace with:
```tsx
import { Building2, Boxes, HeartPulse, Rocket, ArrowRight } from 'lucide-react'
```

- [ ] **Step 2: Replace the METRICS array**

Find:
```tsx
const METRICS = [
  { value: '98.7%',  label: 'System Uptime',    Icon: Activity,           tint: 'var(--plum)',  bg: 'var(--plum-soft)' },
  { value: '2.3M+',  label: 'Events Processed', Icon: CalendarDays,       tint: 'var(--amber)', bg: '#fef3c7' },
  { value: '842ms',  label: 'Avg. Response',    Icon: Clock,              tint: 'var(--green)', bg: '#d1fae5' },
  { value: '24/7',   label: 'Monitoring',       Icon: MonitorSmartphone,  tint: 'var(--blue)',  bg: '#dbeafe' },
]
```

Replace with:
```tsx
const METRICS = [
  { value: '3',     label: 'Hospital sites deployed',  Icon: Building2,  tint: 'var(--plum)',  bg: 'var(--plum-soft)' },
  { value: '800+',  label: 'Assets under management',  Icon: Boxes,      tint: 'var(--amber)', bg: '#fef3c7' },
  { value: '10+',   label: 'Years healthcare operations', Icon: HeartPulse, tint: 'var(--green)', bg: '#d1fae5' },
  { value: '50+',   label: 'Projects shipped',         Icon: Rocket,     tint: 'var(--blue)',  bg: '#dbeafe' },
]
```

- [ ] **Step 3: Replace the right-side panel**

Find:
```tsx
        <div className="lg:w-52">
          <p className="flex items-center gap-2 text-sm font-medium text-ink">
            <span className="h-2 w-2 rounded-full" style={{ background: 'var(--green)' }} />
            All systems operational
          </p>
          <p className="mt-1 text-xs text-ink-muted">Last updated 2 min ago</p>
          <Link href="/work" className="group mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-plum">
            View live status
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
```

Replace with:
```tsx
        <div className="lg:w-52">
          <p className="flex items-center gap-2 text-sm font-medium text-ink">
            <span className="h-2 w-2 rounded-full" style={{ background: 'var(--green)' }} />
            Currently available
          </p>
          <p className="mt-1 text-xs text-ink-muted">Open to senior architecture and AI systems roles</p>
          <Link href="/contact" className="group mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-plum">
            Start a conversation
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
```

- [ ] **Step 4: Verify**

Run:
```bash
cd /Users/lloyd.vince1985gmail.com/Desktop/Software_Dev/Professional-website && npm run type-check && npm run lint
```
Expected: both pass.

- [ ] **Step 5: Commit**

```bash
git add frontend/src/components/home/MetricsStrip.tsx
git commit -m "feat(home): replace placeholder metrics with verifiable deployment signals

Swaps synthetic live-ops numbers (uptime/events/response/monitoring)
for honest, sanity-checkable signals (sites, assets, years, projects).
Replaces 'All systems operational' theatre with a Currently Available
panel pointing to /contact.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 5: Capabilities — copy retune + one icon swap

**Files:**
- Modify: `frontend/src/components/home/Capabilities.tsx`

- [ ] **Step 1: Update the lucide import**

Open `frontend/src/components/home/Capabilities.tsx`. Replace the import:

Find:
```tsx
import { Brain, Boxes, Code2, Database, Activity, ArrowRight } from 'lucide-react'
```

Replace with:
```tsx
import { Brain, Boxes, Workflow, Database, Activity, ArrowRight } from 'lucide-react'
```

- [ ] **Step 2: Replace the CARDS array**

Find:
```tsx
const CARDS = [
  {
    title: 'AI-Native Engineering',
    body: 'Build intelligent workflows and agents that automate complex processes.',
    Icon: Brain,
    tint: 'var(--plum)',
    bg: 'var(--plum-soft)',
  },
  {
    title: 'Systems Architecture',
    body: 'Design scalable, resilient systems that withstand real-world complexity.',
    Icon: Boxes,
    tint: 'var(--plum-deep)',
    bg: '#ede9fe',
  },
  {
    title: 'Product Engineering',
    body: 'Build full-stack products with a focus on usability, performance, and impact.',
    Icon: Code2,
    tint: 'var(--amber)',
    bg: '#fef3c7',
  },
  {
    title: 'Data & Integration',
    body: 'Turn messy data into usable, trusted, and actionable intelligence.',
    Icon: Database,
    tint: 'var(--green)',
    bg: '#d1fae5',
  },
  {
    title: 'Operational Intelligence',
    body: 'Create observability and automation systems that drive operational clarity.',
    Icon: Activity,
    tint: 'var(--pink)',
    bg: '#fce7f3',
  },
]
```

Replace with:
```tsx
const CARDS = [
  {
    title: 'AI Orchestration',
    body: 'Design agent workflows, decision layers, and tool integrations that coordinate real work across enterprise systems.',
    Icon: Brain,
    tint: 'var(--plum)',
    bg: 'var(--plum-soft)',
  },
  {
    title: 'Systems Architecture',
    body: 'Architect resilient, observable systems — from event streams to data layers to integration boundaries.',
    Icon: Boxes,
    tint: 'var(--plum-deep)',
    bg: '#ede9fe',
  },
  {
    title: 'Workflow Automation',
    body: 'Replace manual coordination with scalable workflow engines that span people, systems, and AI agents.',
    Icon: Workflow,
    tint: 'var(--amber)',
    bg: '#fef3c7',
  },
  {
    title: 'Enterprise Integration',
    body: 'Connect operational data, legacy systems, and AI services into coherent, deployable platforms.',
    Icon: Database,
    tint: 'var(--green)',
    bg: '#d1fae5',
  },
  {
    title: 'Operational Intelligence',
    body: 'Build monitoring, automation, and feedback loops that turn raw events into operational clarity.',
    Icon: Activity,
    tint: 'var(--pink)',
    bg: '#fce7f3',
  },
]
```

- [ ] **Step 3: Verify**

Run:
```bash
cd /Users/lloyd.vince1985gmail.com/Desktop/Software_Dev/Professional-website && npm run type-check && npm run lint
```
Expected: both pass.

- [ ] **Step 4: Commit**

```bash
git add frontend/src/components/home/Capabilities.tsx
git commit -m "feat(home): retune Capabilities copy for AI orchestration framing

Renames Product Engineering → Workflow Automation (icon Code2 → Workflow),
Data & Integration → Enterprise Integration, AI-Native Engineering → AI
Orchestration. Body copy sharpened across all five cards to emphasize
orchestration, observability, and enterprise integration.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 6: Create AnchorCase component

**Files:**
- Create: `frontend/src/components/home/AnchorCase.tsx`

A new full-width band rendered above the project grid. Two-column layout on `lg`: copy on the left, mini architecture diagram + micro-stats on the right.

- [ ] **Step 1: Create the component file**

Create `frontend/src/components/home/AnchorCase.tsx` with exactly this content:

```tsx
// frontend/src/components/home/AnchorCase.tsx
import Link from 'next/link'
import {
  ArrowRight,
  Building2,
  QrCode,
  Workflow,
  Database,
  Gauge,
  Check,
} from 'lucide-react'

type FlowNode = { Icon: typeof Building2; label: string }

const FLOW: FlowNode[] = [
  { Icon: Building2, label: 'Sites' },
  { Icon: QrCode,    label: 'QR Scan' },
  { Icon: Workflow,  label: 'Workflow' },
  { Icon: Database,  label: 'Lifecycle DB' },
  { Icon: Gauge,     label: 'Ops Dashboard' },
]

const BULLETS = [
  'Multi-site deployment with role-based coordination',
  'QR-driven workflows for intake, dispatch, and return',
  'Lifecycle visibility from acquisition to retirement',
  'Real-time chain-of-custody across hospital units',
]

const STATS = [
  { value: '3 sites',    label: 'deployed' },
  { value: '800+',       label: 'assets tracked' },
  { value: 'Multi-site', label: 'coordination' },
  { value: 'Chain',      label: 'of custody' },
]

export function AnchorCase() {
  return (
    <article className="lift mt-8 overflow-hidden rounded-2xl bg-white ghair soft-shadow">
      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr]">
        {/* left column — copy */}
        <div className="flex flex-col p-7 lg:p-9">
          <span className="inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-plum" style={{ background: 'var(--plum-soft)' }}>
            Anchor case · Enterprise deployment
          </span>

          <h3 className="mt-5 font-display text-2xl font-extrabold leading-[1.15] text-ink sm:text-[1.9rem]">
            Multi-Site Wheelchair Tracking System
          </h3>

          <p className="mt-3 max-w-[58ch] text-[15px] leading-relaxed text-ink-soft">
            Production asset-tracking platform deployed across multiple hospital sites —
            coordinating 800+ wheelchairs and clinical assets with QR-driven workflows,
            lifecycle visibility, and chain-of-custody tracking.
          </p>

          <ul className="mt-5 space-y-2.5">
            {BULLETS.map((b) => (
              <li key={b} className="flex items-start gap-2.5 text-[14px] leading-snug text-ink-soft">
                <Check size={14} className="mt-1 shrink-0 text-plum" strokeWidth={2.4} />
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
            Power Platform · Microsoft Lists · React · TypeScript · QR systems
          </p>

          <Link
            href="/work/wheelchair-tracking"
            className="group mt-6 inline-flex w-fit items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white soft-shadow-sm transition-transform hover:-translate-y-0.5"
            style={{ background: 'var(--plum)' }}
          >
            Read the case study
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* right column — mini architecture + micro-stats */}
        <div
          className="flex flex-col gap-5 p-7 lg:p-9"
          style={{ background: 'linear-gradient(135deg,#f3effe,#fbf5fe)' }}
        >
          {/* deployment flow */}
          <div className="rounded-2xl bg-white p-5 ghair soft-shadow-sm">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-muted">
              Deployment flow
            </p>
            <div className="mt-4 flex items-center justify-between gap-1">
              {FLOW.map((n, i) => (
                <div key={n.label} className="flex items-center">
                  <div className="flex flex-col items-center gap-1.5">
                    <div
                      className="grid h-9 w-9 place-items-center rounded-lg"
                      style={{ background: 'var(--plum-soft)' }}
                    >
                      <n.Icon size={16} style={{ color: 'var(--plum)' }} strokeWidth={1.9} />
                    </div>
                    <span className="text-[9px] font-semibold uppercase tracking-[0.12em] text-ink-muted">
                      {n.label}
                    </span>
                  </div>
                  {i < FLOW.length - 1 && (
                    <svg width="18" height="6" viewBox="0 0 18 6" className="mx-1" aria-hidden>
                      <path
                        d="M0 3 H14 M11 1 L15 3 L11 5"
                        stroke="var(--plum)"
                        strokeOpacity="0.45"
                        strokeWidth="1.2"
                        fill="none"
                      />
                    </svg>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* micro-stats */}
          <div className="grid grid-cols-2 gap-3">
            {STATS.map((s) => (
              <div key={s.value + s.label} className="rounded-xl bg-white p-3 ghair">
                <p className="font-display text-base font-extrabold leading-tight text-ink">{s.value}</p>
                <p className="mt-0.5 text-[11px] text-ink-muted">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  )
}
```

- [ ] **Step 2: Verify**

Run:
```bash
cd /Users/lloyd.vince1985gmail.com/Desktop/Software_Dev/Professional-website && npm run type-check && npm run lint
```
Expected: both pass. (The component is not yet rendered, so this only confirms it compiles.)

- [ ] **Step 3: Commit**

```bash
git add frontend/src/components/home/AnchorCase.tsx
git commit -m "feat(home): add AnchorCase component for Wheelchair Tracking band

Full-width two-column anchor case: copy + capability bullets + stack +
CTA on the left, deployment flow diagram + 2x2 micro-stats on the
right. Uses existing design tokens and primitive classes; introduces
no new tokens or shared state. Not yet rendered.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 7: FeaturedWork — render AnchorCase and tighten grid

**Files:**
- Modify: `frontend/src/components/home/FeaturedWork.tsx`

- [ ] **Step 1: Import AnchorCase**

Open `frontend/src/components/home/FeaturedWork.tsx`. Find:
```tsx
import Link from 'next/link'
import { ArrowRight, QrCode, Network, Wallet, Dumbbell } from 'lucide-react'
```

Replace with:
```tsx
import Link from 'next/link'
import { ArrowRight, QrCode, Network, Wallet, Dumbbell } from 'lucide-react'
import { AnchorCase } from './AnchorCase'
```

- [ ] **Step 2: Render AnchorCase and filter the grid**

Find the entire `FeaturedWork` export at the bottom of the file:
```tsx
export function FeaturedWork() {
  return (
    <section className="mx-auto max-w-[1180px] px-6 py-12">
      <div className="flex items-end justify-between">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-plum">Featured work</p>
        <Link href="/work" className="group inline-flex items-center gap-1.5 text-sm font-semibold text-plum">
          View all projects
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {PROJECTS.map((p) => (
          <WorkCard key={p.title} p={p} />
        ))}
      </div>
    </section>
  )
}
```

Replace with:
```tsx
export function FeaturedWork() {
  const gridProjects = PROJECTS.filter((p) => p.href !== '/work/wheelchair-tracking')

  return (
    <section className="mx-auto max-w-[1180px] px-6 py-12">
      <div className="flex items-end justify-between">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-plum">Featured work</p>
        <Link href="/work" className="group inline-flex items-center gap-1.5 text-sm font-semibold text-plum">
          View all projects
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      <AnchorCase />

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {gridProjects.map((p) => (
          <WorkCard key={p.title} p={p} />
        ))}
      </div>
    </section>
  )
}
```

Three concrete changes:
- Filter out the wheelchair-tracking project from the grid via its `href`.
- Render `<AnchorCase />` between the eyebrow row and the grid.
- Change `lg:grid-cols-4` to `lg:grid-cols-3` so the remaining three projects fill the row at desktop widths.

The exported `PROJECTS` array is left intact so `/work` and any other consumers continue to see all four projects.

- [ ] **Step 3: Verify**

Run:
```bash
cd /Users/lloyd.vince1985gmail.com/Desktop/Software_Dev/Professional-website && npm run type-check && npm run lint
```
Expected: both pass.

- [ ] **Step 4: Commit**

```bash
git add frontend/src/components/home/FeaturedWork.tsx
git commit -m "feat(home): wire AnchorCase into FeaturedWork; tighten grid to 3-up

Renders AnchorCase between the section header and the project grid,
filters Wheelchair Tracking out of the grid (canonical PROJECTS array
preserved), and switches the grid from lg:grid-cols-4 to lg:grid-cols-3.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 8: CredibilityStrip — sharpen the quote

**Files:**
- Modify: `frontend/src/components/home/CredibilityStrip.tsx`

- [ ] **Step 1: Replace the quote**

Open `frontend/src/components/home/CredibilityStrip.tsx`. Find:
```tsx
          <p className="pl-7 text-[1.05rem] leading-relaxed text-ink-soft">
            I thrive at the intersection of AI, systems, and product — building solutions that make a
            measurable difference.
          </p>
```

Replace with:
```tsx
          <p className="pl-7 text-[1.05rem] leading-relaxed text-ink-soft">
            I design AI-native systems that run in the real world — across multi-site enterprise
            environments where operational intelligence is non-negotiable.
          </p>
```

- [ ] **Step 2: Verify**

Run:
```bash
cd /Users/lloyd.vince1985gmail.com/Desktop/Software_Dev/Professional-website && npm run type-check && npm run lint
```
Expected: both pass.

- [ ] **Step 3: Commit**

```bash
git add frontend/src/components/home/CredibilityStrip.tsx
git commit -m "feat(home): sharpen CredibilityStrip quote for enterprise systems framing

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 9: FooterCTA — retune the headline

**Files:**
- Modify: `frontend/src/components/home/FooterCTA.tsx`

- [ ] **Step 1: Replace the headline**

Open `frontend/src/components/home/FooterCTA.tsx`. Find:
```tsx
          <h2 className="font-display text-2xl font-extrabold leading-tight text-ink sm:text-3xl">
            Let&apos;s build something{' '}
            <span className="grad-plum-text">extraordinary together.</span>
          </h2>
```

Replace with:
```tsx
          <h2 className="font-display text-2xl font-extrabold leading-tight text-ink sm:text-3xl">
            Let&apos;s architect{' '}
            <span className="grad-plum-text">your next system.</span>
          </h2>
```

- [ ] **Step 2: Verify**

Run:
```bash
cd /Users/lloyd.vince1985gmail.com/Desktop/Software_Dev/Professional-website && npm run type-check && npm run lint
```
Expected: both pass.

- [ ] **Step 3: Commit**

```bash
git add frontend/src/components/home/FooterCTA.tsx
git commit -m "feat(home): retune FooterCTA headline for architect framing

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 10: Full build + visual verification

**Files:** none modified.

- [ ] **Step 1: Run a full production build**

Run:
```bash
cd /Users/lloyd.vince1985gmail.com/Desktop/Software_Dev/Professional-website && npm run build
```
Expected: the Next.js build completes with no errors. Static export (`frontend/out/`) regenerates without crash.

If the build fails, fix the failure inline and re-run. Do not move on.

- [ ] **Step 2: Start the dev server for visual review**

Run:
```bash
cd /Users/lloyd.vince1985gmail.com/Desktop/Software_Dev/Professional-website && npm run dev
```

Open `http://localhost:3001` and walk the page top-to-bottom. Verify each checkpoint:

- **Hero eyebrow** reads `AI Systems Architect`, green dot visible.
- **Hero headline** reads `I architect AI-native systems that run in production.` with `run in production.` in the plum gradient.
- **Hero sub-headline** mentions agents, workflows, event streams, decision layers, multi-site.
- **Secondary CTA** reads `Read the wheelchair tracking case` and links to `/work/wheelchair-tracking`.
- **Hero diagram** shows 6 labelled nodes (AI AGENTS / EVENT STREAM / DECISION LAYER on the left, WORKFLOW / KNOWLEDGE / MONITORING on the right). Captions sit outboard of each icon, do not overlap connectors, and do not drift with the float animation.
- **TrustedRow** label reads `Built with`. Seven items present, Power Platform among them.
- **MetricsStrip** shows `3 / 800+ / 10+ / 50+` with the new labels. Right panel reads `Currently available` and links to `/contact`.
- **Capabilities** shows five cards with the new copy. Card 3 title is `Workflow Automation` and uses the `Workflow` icon. No `Product Engineering` or `Data & Integration` strings remain.
- **AnchorCase** appears between the `Featured work` header and the grid. Two-column layout on desktop, stacked on mobile. Five-step deployment flow renders inside the right panel; 2×2 micro-stats below it. CTA button links to `/work/wheelchair-tracking`.
- **Project grid** shows exactly three cards: EquiTrackr, SpendWise, Apex Protocol. Wheelchair Tracking is not in the grid.
- **CredibilityStrip** quote starts with `I design AI-native systems that run in the real world…`
- **FooterCTA** headline reads `Let's architect your next system.` with `your next system.` in the plum gradient.

Then spot-check that unrelated routes still render:
- `/about` — loads, no errors.
- `/work` — still shows all four projects (canonical `PROJECTS` array preserved).
- `/work/wheelchair-tracking` — loads.
- `/contact` — loads.

- [ ] **Step 3: Stop the dev server, commit any build artefacts if the project tracks them**

If `frontend/out/` is tracked (it appears to be — see `git status`), commit the regenerated static export separately so the source commits stay clean:

```bash
git add frontend/out
git commit -m "build(home): regenerate static export after homepage architect evolution

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

If `frontend/out/` is *not* meant to be tracked (check `.gitignore` first), skip this step.

- [ ] **Step 4: Final verification report**

Print a one-paragraph summary of:
- Tasks completed (1–9) with commit shas.
- Build status (`npm run build` exit code).
- Type-check / lint status (already verified per task).
- Anything observed during visual review that warranted a follow-up fix.

This is the handoff signal that the homepage evolution is complete.

---

## Spec coverage check

Mapping every requirement in `docs/superpowers/specs/2026-05-13-homepage-ai-architect-evolution-design.md` to a task:

| Spec section | Task(s) |
|---|---|
| §1 HomeHero copy changes | Task 1 |
| §1 DiagramScene node refresh + captions | Task 2 |
| §2 TrustedRow | Task 3 |
| §3 MetricsStrip data + side panel | Task 4 |
| §4 AnchorCase new component | Task 6 |
| §5 FeaturedWork integration + 3-up grid | Task 7 |
| §5 Capabilities (numbered §5 in spec but appears after §4 logically) | Task 5 |
| §6 CredibilityStrip quote | Task 8 |
| §6 FooterCTA headline | Task 9 |
| Spec §"Testing & verification" | Task 10 |
| Spec §"Out of scope" | enforced by absence — no plan task touches navigation, case-study pages, backend, or design tokens |

All requirements have a corresponding task. No placeholders. Function/file names are consistent across tasks.
