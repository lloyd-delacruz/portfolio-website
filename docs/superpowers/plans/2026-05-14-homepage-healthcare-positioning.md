# Homepage Healthcare-Positioning Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reposition the homepage (only) as a healthcare-operations + technical-systems funnel by rewriting copy, restructuring the Capabilities section into a 4-cluster 2×2 grid, and reshaping FeaturedWork to a curated 4-card progression (anchor + 2 placeholders + SpendWise). The visual register and the EngineeringLoop section stay untouched.

**Architecture:** Pure homepage component edits scoped to `frontend/src/components/home/*` and two new placeholder route files under `frontend/src/app/work/*`. No new dependencies, no design tokens, no animations. TDD discipline: update / add the failing assertion first, then make it pass.

**Tech Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, lucide-react icons, Vitest + @testing-library/react. The active homepage register is `.home2` (cream `#fbfaf8` / plum `#6d28d9` / Plus Jakarta Sans).

**Spec:** `docs/superpowers/specs/2026-05-14-homepage-healthcare-positioning-design.md`

---

## File Structure

**Modified:**
- `frontend/src/components/home/HomeHero.tsx` — eyebrow, headline, sub, status, secondary CTA target.
- `frontend/src/components/home/HomeHero.test.tsx` — assertions updated to the new copy.
- `frontend/src/components/home/BuiltWithRow.tsx` — `STACK` array expanded.
- `frontend/src/components/home/BuiltWithRow.test.tsx` — assertions updated to the new stack list.
- `frontend/src/components/home/ProductionIndicators.tsx` — metric 3 value, metric 4 label, availability paragraph rewritten.
- `frontend/src/components/home/ProductionIndicators.test.tsx` — assertions updated.
- `frontend/src/components/home/Capabilities.tsx` — restructured to 4-card 2×2 grid with sub-bullets; section anchor `id="core-capabilities"` added.
- `frontend/src/components/home/AnchorCase.tsx` — eyebrow, title, body, bullets, stack rewritten.
- `frontend/src/components/home/FeaturedWork.tsx` — `PROJECTS` array reduced 5→4 (anchor rebrand + two new placeholders + SpendWise repositioned); section sub-line added.
- `frontend/src/components/home/FooterCTA.tsx` — heading + body rewritten.

**Created:**
- `frontend/src/components/home/Capabilities.test.tsx` — covers the 4-cluster shape, anchor id, all 16 sub-skills.
- `frontend/src/components/home/FeaturedWork.test.tsx` — covers the 4-card composition, removals, anchor rebrand, SpendWise repositioning.
- `frontend/src/app/work/clinical-genai-pipeline/page.tsx` — placeholder route.
- `frontend/src/app/work/healthcare-automation-engine/page.tsx` — placeholder route.

**Untouched (explicitly out of scope per the spec):**
- `frontend/src/components/home/EngineeringLoop.tsx` and its test, animations, copy, diagram.
- `frontend/src/components/home/SystemArchitectureSketch.tsx` and its test.
- `frontend/src/components/home/HomeNav.tsx`, `SiteFooter.tsx`, `Reveal.tsx`.
- `frontend/src/app/page.tsx` (the homepage composition stays the same).
- About page and any `/work/*` detail-page components other than the two new placeholder routes.

---

## Conventions

- **Working directory:** all `npm` commands run from `frontend/` unless noted.
- **Run tests scoped to the file under change** with `npm run test -- --run <file>`. (The `--run` flag forces non-watch mode.)
- **Commits use the existing `fix(home):` / `feat(home):` prefix** (see `git log` for precedent).
- **TDD per task:** update / add the failing test first, run it to confirm failure, edit the implementation, run again to confirm pass, commit.
- **No `lint` / `type-check` runs between micro-steps** — those run once at the end (Task 10).

---

## Task 1: HomeHero — copy rewrite

**Files:**
- Modify: `frontend/src/components/home/HomeHero.test.tsx`
- Modify: `frontend/src/components/home/HomeHero.tsx`

- [ ] **Step 1: Replace the test file with the new assertions**

Overwrite `frontend/src/components/home/HomeHero.test.tsx` with this exact content:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { HomeHero } from './HomeHero'

describe('HomeHero', () => {
  it('renders the "Healthcare Operations · Data & AI Systems" eyebrow', () => {
    render(<HomeHero />)
    expect(screen.getByText(/healthcare operations · data & ai systems/i)).toBeInTheDocument()
  })

  it('renders the headline and sub-headline', () => {
    render(<HomeHero />)
    expect(
      screen.getByRole('heading', {
        name: /operational healthcare systems, engineered from inside the workflow/i,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/9 years inside hospital operations, an msc in data science/i),
    ).toBeInTheDocument()
  })

  it('does not force a hard line break inside the headline', () => {
    const { container } = render(<HomeHero />)
    expect(container.querySelector('h1 br')).toBeNull()
  })

  it('renders the recruiter-readable status line', () => {
    render(<HomeHero />)
    expect(
      screen.getByText(
        /open to healthcare data, analytics, ai, and application engineering roles — remote, hybrid, or on-site/i,
      ),
    ).toBeInTheDocument()
    expect(screen.getByText(/vancouver, bc/i)).toBeInTheDocument()
  })

  it('primary CTA links to the production system case study', () => {
    render(<HomeHero />)
    const cta = screen.getByRole('link', { name: /see the production system/i })
    expect(cta).toHaveAttribute('href', '/work/wheelchair-tracking')
  })

  it('secondary CTA anchors to the core-capabilities section', () => {
    render(<HomeHero />)
    const cta = screen.getByRole('link', { name: /core capabilities/i })
    expect(cta).toHaveAttribute('href', '#core-capabilities')
  })
})
```

- [ ] **Step 2: Run the test to confirm it fails**

```bash
cd frontend && npm run test -- --run src/components/home/HomeHero.test.tsx
```

Expected: tests fail (current copy doesn't match new assertions).

- [ ] **Step 3: Update `HomeHero.tsx` to the new copy**

In `frontend/src/components/home/HomeHero.tsx`:

Replace the `<span className="anim-rise inline-flex…">` eyebrow content from:
```tsx
            AI Systems Architect · Applied
```
to:
```tsx
            Healthcare Operations · Data &amp; AI Systems
```

Replace the `<h1 …>` content from:
```tsx
            I architect AI systems that{' '}
            <span className="grad-plum-text">solve real-world problems.</span>
```
to:
```tsx
            Operational healthcare systems, engineered from{' '}
            <span className="grad-plum-text">inside the workflow.</span>
```

Replace the `<p className="anim-rise mt-6 max-w-[52ch] …">` body from:
```tsx
            I design AI-native workflows — agents, LLMs, decision layers,
            and the plumbing between them — and ship them into production.
            Engineered for reliability, observed in the wild.
```
to:
```tsx
            9 years inside hospital operations, an MSc in Data Science, and the analytics, AI,
            and applications clinical teams actually use — SQL, Python, R, Tableau / Power BI,
            LLM workflows, and full-stack systems on Next.js, FastAPI, and PostgreSQL.
```

Replace the `<p className="anim-rise mt-6 text-[12px] …">` status line from:
```tsx
            Vancouver, Canada · Open to AI architecture, systems engineering, and workflow automation roles ·
            Currently shipping a multi-site AI workflow in healthcare
```
to:
```tsx
            Vancouver, BC · Open to healthcare data, analytics, AI, and application engineering roles —
            remote, hybrid, or on-site · Currently running a multi-site hospital equipment-tracking and
            analytics system in production
```

Replace the secondary CTA `<Link href="#ai-workflow" …>` block — change `href="#ai-workflow"` to `href="#core-capabilities"`, and replace its inner text from:
```tsx
              AI workflow methodology
```
to:
```tsx
              Core capabilities
```

The widths (`max-w-[18ch]`, `max-w-[52ch]`), font classes, animation classes, and CTA layout stay untouched.

- [ ] **Step 4: Run the test to confirm pass**

```bash
cd frontend && npm run test -- --run src/components/home/HomeHero.test.tsx
```

Expected: all six assertions pass.

- [ ] **Step 5: Commit**

```bash
git add frontend/src/components/home/HomeHero.tsx frontend/src/components/home/HomeHero.test.tsx
git commit -m "fix(home): rewrite hero copy for healthcare-operations positioning"
```

---

## Task 2: BuiltWithRow — stack list expansion

**Files:**
- Modify: `frontend/src/components/home/BuiltWithRow.test.tsx`
- Modify: `frontend/src/components/home/BuiltWithRow.tsx`

- [ ] **Step 1: Replace the test file**

Overwrite `frontend/src/components/home/BuiltWithRow.test.tsx` with:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BuiltWithRow } from './BuiltWithRow'

describe('BuiltWithRow', () => {
  it('renders both group labels', () => {
    render(<BuiltWithRow />)
    expect(screen.getByText(/^ai tools$/i)).toBeInTheDocument()
    expect(screen.getByText(/^stack$/i)).toBeInTheDocument()
  })

  it('renders all six AI tool names', () => {
    render(<BuiltWithRow />)
    for (const tool of ['Claude', 'OpenAI', 'Gemini', 'Cursor', 'GitHub Copilot', 'Antigravity']) {
      expect(screen.getByText(tool)).toBeInTheDocument()
    }
  })

  it('renders the full healthcare-aligned stack', () => {
    render(<BuiltWithRow />)
    for (const item of [
      'SQL',
      'Python',
      'R',
      'Tableau',
      'Power BI',
      'Next.js',
      'TypeScript',
      'FastAPI',
      'PostgreSQL',
      'Power Platform',
      'Microsoft Lists',
      'QR / barcode workflows',
    ]) {
      expect(screen.getByText(item)).toBeInTheDocument()
    }
  })

  it('does not render LangChain or AWS (dropped on purpose)', () => {
    render(<BuiltWithRow />)
    expect(screen.queryByText(/langchain/i)).toBeNull()
    expect(screen.queryByText(/^aws$/i)).toBeNull()
  })
})
```

- [ ] **Step 2: Run the test to confirm it fails**

```bash
cd frontend && npm run test -- --run src/components/home/BuiltWithRow.test.tsx
```

Expected: the "renders the full healthcare-aligned stack" test fails (most new items aren't in the current `STACK`).

- [ ] **Step 3: Replace the `STACK` constant in `BuiltWithRow.tsx`**

In `frontend/src/components/home/BuiltWithRow.tsx`, replace:
```ts
const STACK = ['Next.js', 'TypeScript', 'PostgreSQL', 'Microsoft Lists', 'QR workflows']
```
with:
```ts
const STACK = [
  'SQL',
  'Python',
  'R',
  'Tableau',
  'Power BI',
  'Next.js',
  'TypeScript',
  'FastAPI',
  'PostgreSQL',
  'Power Platform',
  'Microsoft Lists',
  'QR / barcode workflows',
]
```

Nothing else in this file changes. The flex-wrap container handles the longer list.

- [ ] **Step 4: Run the test to confirm pass**

```bash
cd frontend && npm run test -- --run src/components/home/BuiltWithRow.test.tsx
```

Expected: all four assertions pass.

- [ ] **Step 5: Commit**

```bash
git add frontend/src/components/home/BuiltWithRow.tsx frontend/src/components/home/BuiltWithRow.test.tsx
git commit -m "fix(home): expand BuiltWithRow stack to the full healthcare-aligned list"
```

---

## Task 3: ProductionIndicators — metric label + availability rewrite

**Files:**
- Modify: `frontend/src/components/home/ProductionIndicators.test.tsx`
- Modify: `frontend/src/components/home/ProductionIndicators.tsx`

- [ ] **Step 1: Replace the test file**

Overwrite `frontend/src/components/home/ProductionIndicators.test.tsx` with:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ProductionIndicators } from './ProductionIndicators'

describe('ProductionIndicators', () => {
  it('renders all four metric values', () => {
    render(<ProductionIndicators />)
    expect(screen.getByText('4')).toBeInTheDocument()
    expect(screen.getByText('800+')).toBeInTheDocument()
    expect(screen.getByText('9+')).toBeInTheDocument()
    expect(screen.getByText(/aug 2025/i)).toBeInTheDocument()
  })

  it('labels the live-deployment metric and the equipment-tracking metric', () => {
    render(<ProductionIndicators />)
    expect(screen.getByText(/hospital sites · live deployment/i)).toBeInTheDocument()
    expect(screen.getByText(/equipment-tracking system live since/i)).toBeInTheDocument()
  })

  it('renders the rewritten availability paragraph + contact link', () => {
    render(<ProductionIndicators />)
    expect(screen.getByText(/currently available/i)).toBeInTheDocument()
    expect(
      screen.getByText(
        /vancouver, bc · open to healthcare data, ai, and engineering roles — remote, hybrid, or on-site/i,
      ),
    ).toBeInTheDocument()
    const link = screen.getByRole('link', { name: /start a conversation/i })
    expect(link).toHaveAttribute('href', '/contact')
  })

  it('does NOT render dropped/inflated claims', () => {
    render(<ProductionIndicators />)
    expect(screen.queryByText('10+')).toBeNull()
    expect(screen.queryByText(/50\+/)).toBeNull()
    expect(screen.queryByText(/8\+/)).toBeNull()
  })
})
```

- [ ] **Step 2: Run the test to confirm it fails**

```bash
cd frontend && npm run test -- --run src/components/home/ProductionIndicators.test.tsx
```

Expected: failures on the metric value (`9+` not present, `10+` still present), the new metric label, and the new availability paragraph.

- [ ] **Step 3: Update `ProductionIndicators.tsx`**

In `frontend/src/components/home/ProductionIndicators.tsx`:

Replace the `METRICS` constant from:
```ts
const METRICS = [
  { value: '4',        label: 'Hospital sites · live deployment',     Icon: Building2,  tint: 'var(--plum)',  bg: 'var(--plum-soft)' },
  { value: '800+',     label: 'Assets under one shared state model',  Icon: Boxes,      tint: 'var(--amber)', bg: '#fef3c7' },
  { value: '10+',      label: 'Years in healthcare operations',       Icon: HeartPulse, tint: 'var(--green)', bg: '#d1fae5' },
  { value: 'Aug 2025', label: 'Wheelchair tracking — in production since', Icon: Rocket, tint: 'var(--blue)', bg: '#dbeafe' },
]
```
to:
```ts
const METRICS = [
  { value: '4',        label: 'Hospital sites · live deployment',     Icon: Building2,  tint: 'var(--plum)',  bg: 'var(--plum-soft)' },
  { value: '800+',     label: 'Assets under one shared state model',  Icon: Boxes,      tint: 'var(--amber)', bg: '#fef3c7' },
  { value: '9+',       label: 'Years in healthcare operations',       Icon: HeartPulse, tint: 'var(--green)', bg: '#d1fae5' },
  { value: 'Aug 2025', label: 'Equipment-tracking system live since', Icon: Rocket,     tint: 'var(--blue)',  bg: '#dbeafe' },
]
```

Replace the right-side availability `<p className="mt-1 text-xs leading-relaxed text-ink-muted">` from:
```tsx
            Vancouver, Canada · Open to applied AI, AI systems, and operational intelligence roles
```
to:
```tsx
            Vancouver, BC · open to healthcare data, AI, and engineering roles — remote, hybrid, or on-site
```

Nothing else in this file changes.

- [ ] **Step 4: Run the test to confirm pass**

```bash
cd frontend && npm run test -- --run src/components/home/ProductionIndicators.test.tsx
```

Expected: all four assertions pass.

- [ ] **Step 5: Commit**

```bash
git add frontend/src/components/home/ProductionIndicators.tsx frontend/src/components/home/ProductionIndicators.test.tsx
git commit -m "fix(home): align ProductionIndicators metric label and availability copy"
```

---

## Task 4: Capabilities — restructure to 4-cluster 2×2 grid

**Files:**
- Create: `frontend/src/components/home/Capabilities.test.tsx`
- Modify: `frontend/src/components/home/Capabilities.tsx`

- [ ] **Step 1: Create the new test file**

Create `frontend/src/components/home/Capabilities.test.tsx` with:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Capabilities } from './Capabilities'

describe('Capabilities', () => {
  it('renders the section eyebrow, heading, and subhead', () => {
    render(<Capabilities />)
    expect(screen.getByText(/^core capabilities$/i)).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /built across the stack hospitals run on/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/four capability clusters — built on real clinical operations/i),
    ).toBeInTheDocument()
  })

  it('exposes the #core-capabilities anchor for the hero CTA', () => {
    const { container } = render(<Capabilities />)
    expect(container.querySelector('#core-capabilities')).not.toBeNull()
  })

  it('renders all four cluster titles', () => {
    render(<Capabilities />)
    expect(screen.getByRole('heading', { name: /clinical operations intelligence/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /applied ai & data systems/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /analytics & visualization/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /application development/i })).toBeInTheDocument()
  })

  it('renders every sub-skill from the four clusters', () => {
    render(<Capabilities />)
    const bullets = [
      // Clinical Operations Intelligence
      'Hospital workflow optimization',
      'Rehabilitation operations',
      'Equipment tracking systems',
      'Operational analytics',
      // Applied AI & Data Systems
      'SQL · Python · R',
      'Prompt engineering · LLM workflows',
      'Structured data extraction',
      'AI-assisted automation',
      // Analytics & Visualization
      'Tableau · Power BI',
      'Time-series analytics',
      'KPI & operational reporting',
      'Data storytelling',
      // Application Development
      'React · Next.js · TypeScript',
      'FastAPI · PostgreSQL',
      'Cloud deployment',
      'Production-grade UX',
    ]
    for (const b of bullets) {
      expect(screen.getByText(b)).toBeInTheDocument()
    }
  })

  it('cards are not rendered as click-through links', () => {
    const { container } = render(<Capabilities />)
    const cardLinks = container.querySelectorAll('[data-cluster-card] a')
    expect(cardLinks.length).toBe(0)
  })

  it('does NOT render the prior 5-card single-row labels', () => {
    render(<Capabilities />)
    expect(screen.queryByText(/multi-site operational systems/i)).toBeNull()
    expect(screen.queryByText(/ai workflow engineering/i)).toBeNull()
    expect(screen.queryByText(/operational intelligence layers/i)).toBeNull()
    expect(screen.queryByText(/equipment & asset workflows/i)).toBeNull()
    expect(screen.queryByText(/production engineering discipline/i)).toBeNull()
  })
})
```

- [ ] **Step 2: Run the test to confirm it fails**

```bash
cd frontend && npm run test -- --run src/components/home/Capabilities.test.tsx
```

Expected: most assertions fail (current component has 5 different cards, no anchor id, different copy).

- [ ] **Step 3: Replace `Capabilities.tsx` with the new 4-cluster shape**

Overwrite `frontend/src/components/home/Capabilities.tsx` with:

```tsx
// frontend/src/components/home/Capabilities.tsx
import { Stethoscope, Brain, LineChart, Boxes, type LucideIcon } from 'lucide-react'

type Cluster = {
  title: string
  bullets: string[]
  Icon: LucideIcon
  tint: string
  bg: string
}

const CLUSTERS: Cluster[] = [
  {
    title: 'Clinical Operations Intelligence',
    Icon: Stethoscope,
    tint: 'var(--plum)',
    bg: 'var(--plum-soft)',
    bullets: [
      'Hospital workflow optimization',
      'Rehabilitation operations',
      'Equipment tracking systems',
      'Operational analytics',
    ],
  },
  {
    title: 'Applied AI & Data Systems',
    Icon: Brain,
    tint: 'var(--plum-deep)',
    bg: '#ede9fe',
    bullets: [
      'SQL · Python · R',
      'Prompt engineering · LLM workflows',
      'Structured data extraction',
      'AI-assisted automation',
    ],
  },
  {
    title: 'Analytics & Visualization',
    Icon: LineChart,
    tint: 'var(--amber)',
    bg: '#fef3c7',
    bullets: [
      'Tableau · Power BI',
      'Time-series analytics',
      'KPI & operational reporting',
      'Data storytelling',
    ],
  },
  {
    title: 'Application Development',
    Icon: Boxes,
    tint: 'var(--green)',
    bg: '#d1fae5',
    bullets: [
      'React · Next.js · TypeScript',
      'FastAPI · PostgreSQL',
      'Cloud deployment',
      'Production-grade UX',
    ],
  },
]

export function Capabilities() {
  return (
    <section id="core-capabilities" className="mx-auto max-w-[1180px] px-6 py-16">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-plum">Core capabilities</p>

      <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1fr] lg:items-end">
        <h2 className="font-display text-3xl font-extrabold leading-[1.12] text-ink sm:text-[2.4rem]">
          Built across the stack <span className="text-plum">hospitals run on.</span>
        </h2>
        <p className="max-w-md text-[1.02rem] leading-relaxed text-ink-soft">
          Four capability clusters — built on real clinical operations.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {CLUSTERS.map(({ title, bullets, Icon, tint, bg }) => (
          <div
            key={title}
            data-cluster-card
            className="flex flex-col rounded-2xl bg-white p-6 ghair"
          >
            <div className="grid h-11 w-11 place-items-center rounded-xl" style={{ background: bg }}>
              <Icon size={20} style={{ color: tint }} strokeWidth={1.9} />
            </div>
            <h3 className="mt-4 font-display text-[16px] font-bold text-ink">{title}</h3>
            <ul className="mt-3 space-y-2">
              {bullets.map((b) => (
                <li key={b} className="flex items-start gap-2 text-[13.5px] leading-snug text-ink-soft">
                  <span aria-hidden className="mt-[7px] inline-block h-1 w-1 shrink-0 rounded-full" style={{ background: tint }} />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Run the test to confirm pass**

```bash
cd frontend && npm run test -- --run src/components/home/Capabilities.test.tsx
```

Expected: all six assertions pass.

- [ ] **Step 5: Commit**

```bash
git add frontend/src/components/home/Capabilities.tsx frontend/src/components/home/Capabilities.test.tsx
git commit -m "feat(home): restructure Capabilities into 4-cluster 2x2 grid with sub-skills"
```

---

## Task 5: AnchorCase — rebrand to "Multi-Site Hospital Equipment Tracking & Analytics System"

**Files:**
- Modify: `frontend/src/components/home/AnchorCase.tsx`

(There is no existing test for `AnchorCase`. The rebrand is purely string changes inside an unchanged layout, and the next task adds a `FeaturedWork` test that asserts the rebranded title is rendered, so the assertion lives there.)

- [ ] **Step 1: Update `AnchorCase.tsx`**

In `frontend/src/components/home/AnchorCase.tsx`:

Replace the `BULLETS` constant from:
```ts
const BULLETS = [
  'Multi-site deployment with role-based coordination',
  'QR-driven workflows for intake, dispatch, and return',
  'Lifecycle visibility from acquisition to retirement',
  'Real-time chain-of-custody across hospital units',
]
```
to:
```ts
const BULLETS = [
  'Multi-site coordination across 4 hospitals',
  'QR / barcode workflows for intake, dispatch, and return',
  'Operational analytics on utilization, dwell time, and rotation',
  'Lifecycle visibility from acquisition to retirement',
]
```

Replace the eyebrow `<span>` text from:
```tsx
            Anchor case · Enterprise deployment
```
to:
```tsx
            Anchor system · Production deployment
```

Replace the `<h3>` title text from:
```tsx
            Multi-Site Wheelchair Tracking System
```
to:
```tsx
            Multi-Site Hospital Equipment Tracking &amp; Analytics System
```

Replace the body `<p>` text from:
```tsx
            Production asset-tracking platform deployed across multiple hospital sites —
            coordinating 800+ wheelchairs and clinical assets with QR-driven workflows,
            lifecycle visibility, and chain-of-custody tracking.
```
to:
```tsx
            Production healthcare-operations platform deployed across 4 hospital sites — 800+ tracked
            assets coordinated through QR / barcode workflows, lifecycle visibility, operational
            analytics, and real-time chain-of-custody.
```

Replace the stack `<p>` text from:
```tsx
            Power Platform · Microsoft Lists · React · TypeScript · QR systems
```
to:
```tsx
            Power Platform · Microsoft Lists · React · TypeScript · QR / barcode workflows · operational analytics
```

Nothing else in this file changes (deployment-flow diagram, micro-stats, CTA target are all unchanged).

- [ ] **Step 2: Commit**

```bash
git add frontend/src/components/home/AnchorCase.tsx
git commit -m "fix(home): rebrand AnchorCase to Multi-Site Hospital Equipment Tracking & Analytics System"
```

---

## Task 6: FeaturedWork — restructure PROJECTS array and add the section sub-line

**Files:**
- Create: `frontend/src/components/home/FeaturedWork.test.tsx`
- Modify: `frontend/src/components/home/FeaturedWork.tsx`

- [ ] **Step 1: Create the new test file**

Create `frontend/src/components/home/FeaturedWork.test.tsx` with:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { FeaturedWork, PROJECTS, ANCHOR_CASE_HREF } from './FeaturedWork'

describe('FeaturedWork — composition', () => {
  it('exports exactly 4 PROJECTS in the curated order: anchor, two new placeholders, SpendWise', () => {
    expect(PROJECTS).toHaveLength(4)
    expect(PROJECTS[0].href).toBe(ANCHOR_CASE_HREF)
    expect(PROJECTS[0].title).toBe('Multi-Site Hospital Equipment Tracking & Analytics System')
    expect(PROJECTS[1].title).toBe('Clinical GenAI Agent & Analytics Pipeline')
    expect(PROJECTS[2].title).toBe('Enterprise Healthcare Workflow Automation Engine')
    expect(PROJECTS[3].title).toBe('SpendWise')
  })

  it('removed Population-Health Intelligence, Clinical Risk Engine, and EquiTrackr from the homepage list', () => {
    const titles = PROJECTS.map((p) => p.title)
    expect(titles).not.toContain('Population-Health Intelligence Platform')
    expect(titles).not.toContain('Clinical Risk Engine')
    expect(titles).not.toContain('EquiTrackr')
  })

  it('repositions SpendWise as a Full-Stack Product Engineering proof point', () => {
    const sw = PROJECTS.find((p) => p.title === 'SpendWise')
    expect(sw?.badge).toBe('FULL-STACK PRODUCT ENGINEERING')
    expect(sw?.body).toMatch(/full-stack product platform/i)
    expect(sw?.body).toMatch(/non-healthcare proof point for product-engineering breadth/i)
  })

  it('placeholder cards point at the new placeholder routes', () => {
    expect(PROJECTS[1].href).toBe('/work/clinical-genai-pipeline')
    expect(PROJECTS[2].href).toBe('/work/healthcare-automation-engine')
  })
})

describe('FeaturedWork — render', () => {
  it('renders the section eyebrow + the new sub-line describing the deliberate progression', () => {
    render(<FeaturedWork />)
    expect(screen.getByText(/^featured work$/i)).toBeInTheDocument()
    expect(
      screen.getByText(
        /a deliberate progression: real healthcare operations · applied ai & data engineering · enterprise automation · product-engineering breadth/i,
      ),
    ).toBeInTheDocument()
  })

  it('renders the rebranded anchor title once', () => {
    render(<FeaturedWork />)
    expect(
      screen.getByRole('heading', { name: /multi-site hospital equipment tracking & analytics system/i }),
    ).toBeInTheDocument()
  })

  it('renders the three non-anchor cards in the grid', () => {
    render(<FeaturedWork />)
    expect(
      screen.getByRole('heading', { name: /clinical genai agent & analytics pipeline/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /enterprise healthcare workflow automation engine/i }),
    ).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /^spendwise$/i })).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run the test to confirm it fails**

```bash
cd frontend && npm run test -- --run src/components/home/FeaturedWork.test.tsx
```

Expected: failures on `PROJECTS.length`, ordering, removed-titles, repositioning, sub-line text, etc.

- [ ] **Step 3: Update `FeaturedWork.tsx` — replace the `PROJECTS` array**

In `frontend/src/components/home/FeaturedWork.tsx`, replace the entire `PROJECTS` constant (the `export const PROJECTS: Project[] = [ … ]` block — currently 5 entries) with:

```ts
export const PROJECTS: Project[] = [
  {
    badge: 'HEALTHCARE OPERATIONS',
    TagIcon: QrCode,
    variant: 'states',
    accent: 'var(--plum)',
    wash: 'linear-gradient(135deg,#f3effe,#fbf5fe)',
    title: 'Multi-Site Hospital Equipment Tracking & Analytics System',
    body: 'Production healthcare-operations platform deployed across 4 hospital sites — 800+ tracked assets coordinated through QR / barcode workflows, lifecycle visibility, operational analytics, and real-time chain-of-custody.',
    stack: 'Power Platform · Microsoft Lists · React · TypeScript · QR / barcode workflows · operational analytics',
    href: ANCHOR_CASE_HREF,
    status: 'production',
    capabilities: ['case-study'],
    metric: { value: '4 sites · 800+', label: 'assets in production' },
  },
  {
    badge: 'APPLIED AI + DATA ENGINEERING',
    TagIcon: Brain,
    variant: 'forecast',
    accent: 'var(--plum)',
    wash: 'linear-gradient(135deg,#f3f0fb,#fbf7fe)',
    title: 'Clinical GenAI Agent & Analytics Pipeline',
    body: 'Structured LLM outputs, prompt chaining, and analytics pipelines feeding a normalized PostgreSQL schema — with token-cost optimization for production healthcare AI workflows.',
    stack: 'Python · LLM workflows · structured output · PostgreSQL · prompt-chain orchestration',
    href: '/work/clinical-genai-pipeline',
    status: 'concept',
    capabilities: ['ai-assisted', 'case-study'],
  },
  {
    badge: 'CLOUD AUTOMATION + EVENT-DRIVEN SYSTEMS',
    TagIcon: Workflow,
    variant: 'topology',
    accent: 'var(--blue)',
    wash: 'linear-gradient(135deg,#eef4fe,#f5f8fe)',
    title: 'Enterprise Healthcare Workflow Automation Engine',
    body: 'Power Automate, Azure Functions, and webhook orchestration wired into the Microsoft enterprise ecosystem — real-time healthcare workflow automation and operational alert systems for clinical and operations teams.',
    stack: 'Power Automate · Azure Functions · webhook orchestration · Microsoft Graph · operational alert systems',
    href: '/work/healthcare-automation-engine',
    status: 'concept',
    capabilities: ['case-study'],
  },
  {
    badge: 'FULL-STACK PRODUCT ENGINEERING',
    TagIcon: Wallet,
    variant: 'finance',
    accent: 'var(--green)',
    wash: 'linear-gradient(135deg,#ecfdf4,#f4fbf7)',
    title: 'SpendWise',
    body: 'Full-stack product platform demonstrating scalable application architecture, data modeling, and polished UX systems — a deliberate non-healthcare proof point for product-engineering breadth.',
    stack: 'React Native, Expo, Node.js, PostgreSQL, Prisma',
    href: '/work/spendwise',
    status: 'prototype',
    capabilities: ['case-study', 'demo'],
  },
]
```

The Population-Health Intelligence, Clinical Risk Engine, and EquiTrackr entries are removed.

- [ ] **Step 4: Update the lucide-react import in `FeaturedWork.tsx`**

The new `PROJECTS` array uses `Brain` and `Workflow` icons. Stethoscope and LineChart and Network are no longer used in `PROJECTS`. Update the existing import block at the top of `FeaturedWork.tsx`:

Replace:
```ts
import {
  ArrowRight,
  QrCode,
  Network,
  Wallet,
  LineChart,
  Stethoscope,
  Sparkles,
  BookOpen,
  PlayCircle,
} from 'lucide-react'
```
with:
```ts
import {
  ArrowRight,
  QrCode,
  Brain,
  Workflow,
  Wallet,
  Sparkles,
  BookOpen,
  PlayCircle,
} from 'lucide-react'
```

- [ ] **Step 5: Add the new sub-line under the section eyebrow**

In `FeaturedWork.tsx`, find this header block in the `FeaturedWork` component:
```tsx
      <div className="flex items-end justify-between">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-plum">Featured work</p>
        <Link href="/work" className="group inline-flex items-center gap-1.5 text-sm font-semibold text-plum">
          View all projects
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
```

Replace it with:
```tsx
      <div className="flex items-end justify-between gap-6">
        <div className="max-w-[60ch]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-plum">Featured work</p>
          <p className="mt-2 text-[14.5px] leading-relaxed text-ink-soft">
            A deliberate progression: real healthcare operations · applied AI &amp; data engineering · enterprise automation · product-engineering breadth.
          </p>
        </div>
        <Link href="/work" className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-plum">
          View all projects
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
```

- [ ] **Step 6: Run the test to confirm pass**

```bash
cd frontend && npm run test -- --run src/components/home/FeaturedWork.test.tsx
```

Expected: all seven assertions pass.

- [ ] **Step 7: Commit**

```bash
git add frontend/src/components/home/FeaturedWork.tsx frontend/src/components/home/FeaturedWork.test.tsx
git commit -m "feat(home): curate FeaturedWork to anchor + 2 placeholders + SpendWise progression"
```

---

## Task 7: FooterCTA — copy rewrite

**Files:**
- Modify: `frontend/src/components/home/FooterCTA.tsx`

(There is no existing test for `FooterCTA`. The component is small enough that a smoke test isn't necessary; the production verification in Task 10 covers it visually.)

- [ ] **Step 1: Update `FooterCTA.tsx`**

In `frontend/src/components/home/FooterCTA.tsx`:

Replace the `<h2>` heading from:
```tsx
          <h2 className="font-display text-2xl font-extrabold leading-tight text-ink sm:text-3xl">
            Let&apos;s architect{' '}
            <span className="grad-plum-text">your next system.</span>
          </h2>
```
to:
```tsx
          <h2 className="font-display text-2xl font-extrabold leading-tight text-ink sm:text-3xl">
            Let&apos;s build the next{' '}
            <span className="grad-plum-text">healthcare system.</span>
          </h2>
```

Replace the body `<p>` from:
```tsx
          <p className="text-sm leading-relaxed text-ink-soft">
            I&apos;m currently shipping a multi-site healthcare deployment and have capacity for one more
            applied-AI engagement. The best way in is a 20-minute conversation about the system you&apos;re
            trying to build.
          </p>
```
to:
```tsx
          <p className="text-sm leading-relaxed text-ink-soft">
            I&apos;m running a multi-site hospital equipment-tracking and analytics system in production,
            and I&apos;m open to healthcare data, AI, and application engineering roles — remote, hybrid,
            or on-site. The best way in is a short conversation.
          </p>
```

Nothing else in this file changes.

- [ ] **Step 2: Commit**

```bash
git add frontend/src/components/home/FooterCTA.tsx
git commit -m "fix(home): rewrite FooterCTA copy for healthcare-positioning"
```

---

## Task 8: Placeholder route — Clinical GenAI Agent & Analytics Pipeline

**Files:**
- Create: `frontend/src/app/work/clinical-genai-pipeline/page.tsx`

- [ ] **Step 1: Create the new placeholder route**

Create `frontend/src/app/work/clinical-genai-pipeline/page.tsx` with this exact content (mirrors `frontend/src/app/work/website-gemms/page.tsx`):

```tsx
import { PlaceholderCaseStudy } from '@/components/home/PlaceholderCaseStudy'
import { ProjectMeta } from '@/components/work/ProjectMeta'

export default function Page() {
  return (
    <div className="home2">
      <PlaceholderCaseStudy
        register="surface"
        capability="applied ai + data engineering"
        title="Clinical GenAI Agent & Analytics Pipeline"
        description="Structured LLM outputs, prompt chaining, analytics pipelines, PostgreSQL schema design, and token-cost optimization for production healthcare AI workflows. System brief in Phase 2."
      />
      <ProjectMeta slug="clinical-genai-pipeline" />
    </div>
  )
}
```

- [ ] **Step 2: Verify the route builds**

```bash
cd frontend && npm run build 2>&1 | tail -20
```

Expected: build succeeds. No type errors. The new route appears in the route list.

- [ ] **Step 3: Commit**

```bash
git add frontend/src/app/work/clinical-genai-pipeline/page.tsx
git commit -m "feat(work): add placeholder route for Clinical GenAI Agent & Analytics Pipeline"
```

---

## Task 9: Placeholder route — Enterprise Healthcare Workflow Automation Engine

**Files:**
- Create: `frontend/src/app/work/healthcare-automation-engine/page.tsx`

- [ ] **Step 1: Create the new placeholder route**

Create `frontend/src/app/work/healthcare-automation-engine/page.tsx` with:

```tsx
import { PlaceholderCaseStudy } from '@/components/home/PlaceholderCaseStudy'
import { ProjectMeta } from '@/components/work/ProjectMeta'

export default function Page() {
  return (
    <div className="home2">
      <PlaceholderCaseStudy
        register="surface"
        capability="cloud automation + event-driven systems"
        title="Enterprise Healthcare Workflow Automation Engine"
        description="Power Automate, Azure Functions, and webhook orchestration wired into the Microsoft enterprise ecosystem — real-time healthcare workflow automation and operational alert systems. System brief in Phase 2."
      />
      <ProjectMeta slug="healthcare-automation-engine" />
    </div>
  )
}
```

- [ ] **Step 2: Verify the route builds**

```bash
cd frontend && npm run build 2>&1 | tail -20
```

Expected: build succeeds.

- [ ] **Step 3: Commit**

```bash
git add frontend/src/app/work/healthcare-automation-engine/page.tsx
git commit -m "feat(work): add placeholder route for Enterprise Healthcare Workflow Automation Engine"
```

---

## Task 10: Final verification — full test suite, lint, type-check, dev-server smoke test

**Files:** none (verification only)

- [ ] **Step 1: Run the full test suite**

```bash
cd frontend && npm run test -- --run
```

Expected: all tests pass (HomeHero, BuiltWithRow, ProductionIndicators, Capabilities, FeaturedWork, EngineeringLoop, SystemArchitectureSketch, ProjectMeta, plus any others). If any non-modified test fails, investigate — it likely indicates an unintended coupling.

- [ ] **Step 2: Run lint**

```bash
cd frontend && npm run lint
```

Expected: no errors. Warnings on unrelated files are acceptable but should not exceed the pre-change count.

- [ ] **Step 3: Run type-check**

```bash
cd frontend && npm run type-check
```

Expected: no errors.

- [ ] **Step 4: Start dev server and smoke-test the homepage in a browser**

```bash
cd frontend && npm run dev
```

Then open http://localhost:3001 in a browser and verify:

1. Hero shows the new eyebrow `Healthcare Operations · Data & AI Systems`, the new headline ending with the gradient on `inside the workflow.`, the new subheadline mentioning `9 years inside hospital operations`, and the new status line including `Vancouver, BC`.
2. Hero secondary CTA `Core capabilities →` smooth-scrolls to (or jumps to) the Capabilities section.
3. BuiltWithRow shows the expanded stack list including SQL, Python, R, Tableau, Power BI, FastAPI, Power Platform, Microsoft Lists, QR / barcode workflows.
4. ProductionIndicators shows `9+ Years in healthcare operations` (not 10+) and `Equipment-tracking system live since`.
5. Capabilities renders as 4 cards in a 2×2 grid (1 column on mobile), each card showing the cluster title plus 4 visible bulleted sub-skills.
6. EngineeringLoop is unchanged (visually identical to before this branch, animations intact).
7. FeaturedWork shows the rebranded anchor band, then exactly 3 cards in the grid (Clinical GenAI placeholder, Workflow Automation placeholder, repositioned SpendWise). Population-Health, Clinical Risk Engine, and EquiTrackr are gone.
8. The new FeaturedWork sub-line `A deliberate progression: …` renders under the eyebrow.
9. FooterCTA shows the new heading `Let's build the next healthcare system.` with the gradient on `healthcare system.`, and the new body paragraph.
10. Click each placeholder card (`/work/clinical-genai-pipeline`, `/work/healthcare-automation-engine`) and confirm the placeholder page renders without 404.
11. Resize the window to ~375 px wide and confirm the Capabilities grid collapses to 1 column and FeaturedWork stacks correctly.

- [ ] **Step 5: Stop the dev server and commit any straggler updates**

If any of the smoke tests reveal a missed string or a broken anchor, fix in place, run the relevant scoped test (`npm run test -- --run <file>`), and commit the fix with `fix(home): <short description>`.

If everything passes, this task completes the implementation. No final commit is required because each prior task already committed its scope.

---

## Self-Review

I read through the spec section-by-section and checked each requirement against the plan:

- **§1 HomeHero copy** → Task 1 ✓
- **§2 BuiltWithRow stack expansion** → Task 2 ✓
- **§3 ProductionIndicators metric + availability** → Task 3 ✓
- **§4 Capabilities 4-cluster restructure with `id="core-capabilities"` anchor and dropped per-card linking** → Task 4 ✓
- **§5 EngineeringLoop unchanged** → not in any task; intentionally preserved ✓
- **§6 FeaturedWork composition (anchor + 2 placeholders + SpendWise; remove 3) and section sub-line** → Task 6 ✓
- **§6 AnchorCase rebrand** → Task 5 ✓
- **§7 FooterCTA copy** → Task 7 ✓
- **§ Placeholder routes** → Tasks 8 and 9 ✓
- **§ Implementation notes (lint, type-check, dev-server smoke test, test updates)** → Task 10 ✓

Type-and-name consistency check:
- `ANCHOR_CASE_HREF` is exported from `FeaturedWork.tsx` and reused unchanged in Task 6's new array — consistent ✓
- The `Project` and `Variant` types are unchanged; new placeholder entries use existing `variant` values (`'forecast'` and `'topology'`) so `PreviewMock` renders without modification — consistent ✓
- The new placeholder pages do **not** require a `PROJECTS` registry entry in `frontend/src/lib/projects.ts`; `ProjectMeta` returns `null` when no entry exists (only logs a dev-mode warning). This matches the `website-gemms` precedent ✓
- The new `Capabilities.tsx` uses `Stethoscope`, `Brain`, `LineChart`, `Boxes` from lucide-react (same `LucideIcon` typing pattern as the prior version) ✓
- Hero secondary CTA changes its `href` from `#ai-workflow` to `#core-capabilities`; the `id="core-capabilities"` is added to the Capabilities `<section>` in Task 4 — consistent ✓

No placeholders, TBDs, or "implement later" entries. All code blocks contain the exact strings the engineer needs.
