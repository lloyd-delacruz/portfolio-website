# Applied AI Deep Dives — Warm-Register Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the two Applied-AI project deep-dive pages in the warm `home2` cream/plum register matching `wheelchair-tracking`, with less prose, more diagrams/icons, and a prominent interactive prediction surface per page; also reorder `/work` so Applied AI lands after the existing operational projects.

**Architecture:** Mirror the existing `casestudy/wheelchair/` component family pattern (`*Hero`, `*Problem`, `*Architecture`, `*WorkflowDemo`, `*Impact`, `*FutureAI`, `*Close`) for both new projects under `casestudy/popHealth/` and `casestudy/clinicalRisk/`. Page composition wraps in `<div className="home2 min-h-screen">` exactly like `/work/wheelchair-tracking/page.tsx`. Reuse `CsSection`, `Module`, `Chip`, `Eyebrow` primitives from `casestudy/bits.tsx`. Existing surrogate predictors (`work/population-health/surrogate.ts`, `work/clinical-risk/surrogate.ts`) and their Vitest tests stay; the dark `deep-dive/` component family is deleted.

**Tech Stack:** Next.js 14 App Router, TypeScript strict, Tailwind 3, Framer Motion (used minimally in `WcWorkflowDemo`-style cycles via `setInterval`), `lucide-react` icons, Vitest for unit tests.

**Spec reference:** `docs/superpowers/specs/2026-05-13-applied-ai-warm-rebuild-design.md`

**Branch:** Before starting, create a worktree/branch off `main` via the `superpowers:using-git-worktrees` skill — never commit these tasks directly to `main`.

**Binding constraints (from spec §3):**
- No dark backgrounds anywhere
- No `dd-*` mono utility classes (the register is gone)
- No prose paragraph longer than 3 sentences in any section
- Mono allowed only for inline numerics in metric cards
- All colors via `var(--plum)`, `var(--cream)`, `var(--cream-2)`, `var(--ink)`, `var(--ink-soft)`, `var(--ink-muted)`, `var(--green)`, `var(--amber)`, `var(--coral)`, `var(--blue)`, `var(--line)` (existing palette)

---

## File Structure

```
frontend/src/
├── app/
│   ├── work/
│   │   ├── page.tsx                                       [T15 — section reorder]
│   │   ├── population-health-intelligence/
│   │   │   └── page.tsx                                   [T2 stub → T8 final]
│   │   └── clinical-risk-engine/
│   │       └── page.tsx                                   [T2 stub → T13 final]
│   ├── dashboards/
│   │   └── life-expectancy/
│   │       └── page.tsx                                   [T1 — inline warm shim]
│   └── globals.css                                        [T3 — remove deep-dive @import]
├── components/
│   ├── casestudy/
│   │   ├── bits.tsx                                       (existing — reuse)
│   │   ├── wheelchair/                                    (existing — unchanged)
│   │   ├── popHealth/                                     [NEW — T4–T7]
│   │   │   ├── PhHero.tsx
│   │   │   ├── PhProblem.tsx
│   │   │   ├── PhArchitecture.tsx
│   │   │   ├── PhForecastDemo.tsx
│   │   │   ├── PhImpact.tsx
│   │   │   ├── PhFutureAI.tsx
│   │   │   └── PhClose.tsx
│   │   └── clinicalRisk/                                  [NEW — T9–T12]
│   │       ├── CrHero.tsx
│   │       ├── CrProblem.tsx
│   │       ├── CrArchitecture.tsx
│   │       ├── CrTriageDemo.tsx
│   │       ├── CrImpact.tsx
│   │       ├── CrFutureAI.tsx
│   │       └── CrClose.tsx
│   ├── home/
│   │   └── FeaturedWork.tsx                               [T14 — warm tile retune]
│   └── work/
│       ├── deep-dive/                                     [T3 — DELETE entire dir]
│       ├── population-health/
│       │   ├── surrogate.ts                               (keep)
│       │   ├── surrogate-data.json                        (keep)
│       │   ├── ScenarioConsole.tsx                        [T3 — DELETE]
│       │   └── __tests__/surrogate.test.ts                (keep)
│       └── clinical-risk/
│           ├── surrogate.ts                               (keep)
│           ├── wdbc-surrogate.json                        (keep)
│           ├── wdbc-cases.json                            (keep)
│           ├── CaseTriagePanel.tsx                        [T3 — DELETE]
│           └── __tests__/surrogate.test.ts                (keep)
```

---

## Task 1: Inline warm shim for `/dashboards/life-expectancy`

This task runs BEFORE the deep-dive deletion in T3 so the legacy route never breaks. The shim is self-contained (no MovedTo dependency).

**Files:**
- Replace: `frontend/src/app/dashboards/life-expectancy/page.tsx`

- [ ] **Step 1: Write the inline shim**

Overwrite `frontend/src/app/dashboards/life-expectancy/page.tsx` with:

```tsx
// frontend/src/app/dashboards/life-expectancy/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { HomeNav } from '@/components/home/HomeNav'
import { SiteFooter } from '@/components/home/SiteFooter'

export const metadata: Metadata = {
  title: 'Population-Health Intelligence Platform — Lloyd Dela Cruz',
  description: 'This case study has moved to /work/population-health-intelligence.',
}

export default function Page() {
  return (
    <div className="home2 min-h-screen">
      <HomeNav active="Work" />
      <main className="mx-auto flex max-w-[720px] flex-col items-start gap-6 px-6 py-24">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-plum">
          This case study has moved
        </p>
        <h1 className="font-display text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
          Population-Health Intelligence Platform
        </h1>
        <p className="max-w-[60ch] text-[1.05rem] leading-relaxed text-ink-soft">
          This page has been rebuilt as a full case study in the new Work section.
        </p>
        <Link
          href="/work/population-health-intelligence"
          className="group inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white soft-shadow transition-transform hover:-translate-y-0.5"
          style={{ background: 'var(--plum)' }}
        >
          Open the new deep dive
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
        </Link>
      </main>
      <SiteFooter />
    </div>
  )
}
```

- [ ] **Step 2: Verify build still passes**

Run: `cd frontend && npm run type-check && npm run lint && npm run build`
Expected: clean. The deep-dive components still exist so the other pages still build.

- [ ] **Step 3: Commit**

```bash
git add frontend/src/app/dashboards/life-expectancy/page.tsx
git commit -m "refactor(dashboards): inline warm-register shim for life-expectancy

Replaces the dark-register MovedTo shim with a 30-line inline
warm-register shim using home2 register chrome. Frees the deep-dive
component family to be deleted in a later task.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 2: Stub the two /work deep-dive pages

Replace the two existing dark-register pages with minimal warm-register placeholders so we can delete the deep-dive component family without breaking the build. These stubs are temporary — T8 and T13 replace them with the real pages.

**Files:**
- Replace: `frontend/src/app/work/population-health-intelligence/page.tsx`
- Replace: `frontend/src/app/work/clinical-risk-engine/page.tsx`

- [ ] **Step 1: Write the population-health stub**

Overwrite `frontend/src/app/work/population-health-intelligence/page.tsx` with:

```tsx
// frontend/src/app/work/population-health-intelligence/page.tsx
// TEMPORARY STUB — replaced in plan task T8.
import type { Metadata } from 'next'
import { HomeNav } from '@/components/home/HomeNav'
import { SiteFooter } from '@/components/home/SiteFooter'

export const metadata: Metadata = {
  title: 'Population-Health Intelligence Platform — Lloyd Dela Cruz',
  description: 'Calibrated life-expectancy forecasts for 193 nations.',
}

export default function Page() {
  return (
    <div className="home2 min-h-screen">
      <HomeNav active="Work" />
      <main className="mx-auto max-w-[1180px] px-6 py-24">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-plum">
          Rebuilding
        </p>
        <h1 className="mt-3 font-display text-3xl font-extrabold text-ink">
          Population-Health Intelligence Platform
        </h1>
        <p className="mt-4 max-w-2xl text-ink-soft">This case study is being rebuilt.</p>
      </main>
      <SiteFooter />
    </div>
  )
}
```

- [ ] **Step 2: Write the clinical-risk stub**

Overwrite `frontend/src/app/work/clinical-risk-engine/page.tsx` with:

```tsx
// frontend/src/app/work/clinical-risk-engine/page.tsx
// TEMPORARY STUB — replaced in plan task T13.
import type { Metadata } from 'next'
import { HomeNav } from '@/components/home/HomeNav'
import { SiteFooter } from '@/components/home/SiteFooter'

export const metadata: Metadata = {
  title: 'Clinical Risk Engine — Lloyd Dela Cruz',
  description: 'Calibrated malignancy risk scoring for biopsy triage.',
}

export default function Page() {
  return (
    <div className="home2 min-h-screen">
      <HomeNav active="Work" />
      <main className="mx-auto max-w-[1180px] px-6 py-24">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-plum">
          Rebuilding
        </p>
        <h1 className="mt-3 font-display text-3xl font-extrabold text-ink">
          Clinical Risk Engine
        </h1>
        <p className="mt-4 max-w-2xl text-ink-soft">This case study is being rebuilt.</p>
      </main>
      <SiteFooter />
    </div>
  )
}
```

- [ ] **Step 3: Verify build**

Run: `cd frontend && npm run type-check && npm run lint && npm run build`
Expected: clean.

- [ ] **Step 4: Commit**

```bash
git add frontend/src/app/work/population-health-intelligence/page.tsx \
        frontend/src/app/work/clinical-risk-engine/page.tsx
git commit -m "refactor(work): stub Applied-AI deep-dive pages before rebuild

Replaces both dark-register pages with minimal warm-register placeholders
so the deep-dive component family can be deleted cleanly. Real pages
land in T8 (population-health) and T13 (clinical-risk).

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 3: Delete dark register code

The three pages that imported from `deep-dive/` and the interactive panels now use stubs (T1, T2). Safe to delete.

**Files:**
- Delete entire dir: `frontend/src/components/work/deep-dive/`
- Delete: `frontend/src/components/work/population-health/ScenarioConsole.tsx`
- Delete: `frontend/src/components/work/clinical-risk/CaseTriagePanel.tsx`
- Modify: `frontend/src/app/globals.css` (remove one `@import` line)

- [ ] **Step 1: Inspect the @import line in globals.css**

Run: `cd frontend && grep -n "deep-dive" src/app/globals.css`
Expected: one match — the line `@import "../components/work/deep-dive/deep-dive.css";`

- [ ] **Step 2: Remove the @import line**

Edit `frontend/src/app/globals.css` and delete the line:
```css
@import "../components/work/deep-dive/deep-dive.css";
```

(It should be near the bottom of the file. Leave everything else untouched.)

- [ ] **Step 3: Confirm no other files reference deep-dive**

Run: `cd frontend && grep -rn "work/deep-dive\|@/components/work/deep-dive" src/ 2>/dev/null`
Expected: zero output. If anything matches, surface it — those files would break after deletion.

Run: `cd frontend && grep -rn "ScenarioConsole\|CaseTriagePanel" src/ 2>/dev/null`
Expected: zero output (the stubs in T2 don't reference them; the surrogate tests don't reference them).

- [ ] **Step 4: Delete the directories and files**

```bash
cd /Users/lloyd.vince1985gmail.com/Desktop/Software_Dev/Professional-website/frontend && \
  rm -rf src/components/work/deep-dive && \
  rm src/components/work/population-health/ScenarioConsole.tsx && \
  rm src/components/work/clinical-risk/CaseTriagePanel.tsx
```

- [ ] **Step 5: Verify build**

Run: `cd frontend && npm run type-check && npm run lint && npm run test && npm run build`
Expected: clean. 12 tests still passing (5 population-health + 7 clinical-risk).

- [ ] **Step 6: Commit**

```bash
git add -A frontend/
git commit -m "refactor: delete dark-register deep-dive component family

Removes 12 deep-dive components + scoped CSS register + globals.css
import + ScenarioConsole + CaseTriagePanel. The register is being
replaced by warm casestudy/popHealth/ and casestudy/clinicalRisk/
component families in subsequent tasks. Surrogate predictors and
their Vitest tests are preserved.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 4: PhHero + PhProblem (Population Health intro)

Build the first two casestudy components: Hero + Problem section. Hero includes the right-side SVG glyph inline.

**Files:**
- Create: `frontend/src/components/casestudy/popHealth/PhHero.tsx`
- Create: `frontend/src/components/casestudy/popHealth/PhProblem.tsx`

- [ ] **Step 1: Write PhHero**

```tsx
// frontend/src/components/casestudy/popHealth/PhHero.tsx
import Link from 'next/link'
import { ArrowRight, ArrowLeft, Globe, Database, Brain, Zap } from 'lucide-react'

const META = [
  { k: 'Role', v: 'Applied AI engineering' },
  { k: 'Coverage', v: '193 countries' },
  { k: 'Sources', v: 'WHO · World Bank · IMF' },
  { k: 'Status', v: 'Prototype' },
]

function PhSystemMap() {
  // 4 small icon nodes (Globe → Database → Brain → Zap) connected by a faint plum signal line.
  // Inline SVG, no separate file (per spec §11.2).
  const W = 460
  const H = 200
  const Y = H / 2
  const NODES = [
    { Icon: Globe, label: 'Sources', x: 50 },
    { Icon: Database, label: 'Features', x: 180 },
    { Icon: Brain, label: 'Forecaster', x: 310 },
    { Icon: Zap, label: 'Inference', x: 410, primary: true },
  ]
  return (
    <div className="relative mx-auto w-full max-w-[460px]">
      <div className="relative w-full" style={{ paddingBottom: `${(H / W) * 100}%` }}>
        <div className="absolute inset-0">
          <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" fill="none" aria-hidden>
            {/* connecting line */}
            <path
              d={`M ${NODES[0].x} ${Y} L ${NODES[NODES.length - 1].x} ${Y}`}
              stroke="var(--plum)"
              strokeWidth={1.6}
              strokeOpacity={0.35}
              strokeLinecap="round"
            />
            {NODES.map((n) => (
              <circle key={n.label} cx={n.x} cy={Y} r={3.2} fill="var(--plum)" opacity={n.primary ? 1 : 0.6} />
            ))}
          </svg>

          {/* glow */}
          <div
            className="absolute left-1/2 top-1/2 h-32 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
            style={{ background: 'radial-gradient(closest-side, rgba(124,58,237,0.18), transparent)' }}
          />

          {/* node cards */}
          {NODES.map((n) => (
            <div
              key={n.label}
              className="absolute flex h-[60px] w-[88px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-2xl bg-white px-2 ghair soft-shadow-sm"
              style={{
                left: `${(n.x / W) * 100}%`,
                top: '50%',
                borderColor: n.primary ? 'rgba(109,40,217,0.35)' : undefined,
                background: n.primary ? 'var(--plum-soft)' : undefined,
              }}
            >
              <n.Icon size={18} style={{ color: 'var(--plum)' }} strokeWidth={1.9} />
              <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-ink-muted">
                {n.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function PhHero() {
  return (
    <section className="relative overflow-hidden">
      <div className="hero-wash pointer-events-none absolute inset-0" aria-hidden />
      <div className="relative mx-auto max-w-[1180px] px-6 pb-14 pt-12 lg:pt-16">
        <Link
          href="/work"
          className="group inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted transition-colors hover:text-ink"
        >
          <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" />
          All work
        </Link>

        <div className="mt-6 grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <span className="anim-rise inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-soft ghair">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'var(--plum)' }} />
              Applied AI · Population Health
            </span>

            <h1
              className="anim-rise mt-5 font-display text-[2.5rem] font-extrabold leading-[1.06] text-ink sm:text-[3rem] lg:text-[3.4rem]"
              style={{ animationDelay: '60ms' }}
            >
              Population-Health
              <br />
              <span className="grad-plum-text">Intelligence Platform</span>
            </h1>

            <p
              className="anim-rise mt-5 max-w-[40ch] text-[1.08rem] leading-relaxed text-ink-soft"
              style={{ animationDelay: '120ms' }}
            >
              Calibrated life-expectancy forecasts for 193 nations — with the signals driving each trajectory.
            </p>

            <div className="anim-rise mt-7 flex flex-wrap items-center gap-3" style={{ animationDelay: '180ms' }}>
              <Link
                href="#demo"
                className="group inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white soft-shadow transition-transform hover:-translate-y-0.5"
                style={{ background: 'var(--plum)' }}
              >
                See the forecast
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="#problem"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-ink ghair-2 transition-colors hover:bg-[var(--cream-2)]"
              >
                Start from the problem
              </Link>
            </div>

            <dl
              className="anim-rise mt-9 grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-4"
              style={{ animationDelay: '220ms' }}
            >
              {META.map((m) => (
                <div key={m.k}>
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">{m.k}</dt>
                  <dd className="mt-1 text-sm font-medium text-ink">{m.v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="anim-rise" style={{ animationDelay: '260ms' }}>
            <PhSystemMap />
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Write PhProblem**

```tsx
// frontend/src/components/casestudy/popHealth/PhProblem.tsx
import { TrendingDown, HelpCircle, AlertTriangle } from 'lucide-react'
import { CsSection } from '../bits'

const CALLOUTS = [
  { Icon: TrendingDown, title: 'Point estimates only' },
  { Icon: HelpCircle, title: 'No signal on why' },
  { Icon: AlertTriangle, title: 'Wrong interventions' },
]

export function PhProblem() {
  return (
    <CsSection
      id="problem"
      eyebrow="01 · Problem"
      title="Planning decisions deserve more than a point estimate."
      intro="Public-health planners decide on top of life-expectancy estimates. The numbers they get are national averages with no signal about why a trajectory is shifting."
    >
      <p className="max-w-2xl text-[1.05rem] leading-relaxed text-ink-soft">
        Two countries can decelerate for opposite reasons — declining immunization, GDP contraction — and need
        different interventions. The output should reflect that.
      </p>
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {CALLOUTS.map(({ Icon, title }) => (
          <div key={title} className="flex items-center gap-3 rounded-2xl bg-white p-4 ghair soft-shadow-sm">
            <div
              className="grid h-10 w-10 shrink-0 place-items-center rounded-xl"
              style={{ background: 'rgba(248,112,96,0.12)' }}
            >
              <Icon size={18} style={{ color: 'var(--coral)' }} strokeWidth={1.9} />
            </div>
            <p className="text-[13px] font-semibold text-ink">{title}</p>
          </div>
        ))}
      </div>
    </CsSection>
  )
}
```

- [ ] **Step 3: Verify**

Run: `cd frontend && npm run type-check && npm run lint`
Expected: clean (no new warnings; the two new files don't render yet because no page imports them — that's fine, they'll be picked up at composition in T8).

- [ ] **Step 4: Commit**

```bash
git add frontend/src/components/casestudy/popHealth/PhHero.tsx \
        frontend/src/components/casestudy/popHealth/PhProblem.tsx
git commit -m "feat(popHealth): add PhHero + PhProblem

Hero composes title/subtitle/CTAs/META with an inline 4-node
PhSystemMap glyph (Globe → Database → Brain → Zap). Problem renders
a 2-paragraph body + 3 icon callouts via CsSection + bits.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 5: PhArchitecture

The architecture section: spine of 4 stages + downstream chips + 4 icon-cards mirroring the spine.

**Files:**
- Create: `frontend/src/components/casestudy/popHealth/PhArchitecture.tsx`

- [ ] **Step 1: Write PhArchitecture**

```tsx
// frontend/src/components/casestudy/popHealth/PhArchitecture.tsx
import { Globe, Database, Brain, Zap, ArrowRight, GitCompare, BarChart3, Sigma, LayoutDashboard } from 'lucide-react'
import { CsSection, Module } from '../bits'

const SPINE = [
  { Icon: Globe, label: 'Sources', sub: 'daily ingest' },
  { Icon: Database, label: 'Feature Store', sub: 'versioned' },
  { Icon: Brain, label: 'Forecaster', sub: 'ensemble + quantile' },
  { Icon: Zap, label: 'Inference API', sub: '/predict /attribute', primary: true },
]

const DOWNSTREAM = [
  { Icon: GitCompare, label: 'Scenario diff' },
  { Icon: BarChart3, label: 'Attribution (SHAP)' },
  { Icon: Sigma, label: 'CI band' },
  { Icon: LayoutDashboard, label: 'Planner console' },
]

const LAYERS = [
  { Icon: Globe, title: 'Sources', body: 'WHO, World Bank, IMF. Daily ingest, schema validated.' },
  { Icon: Database, title: 'Feature store', body: 'Versioned features keyed by country × year × indicator.' },
  { Icon: Brain, title: 'Forecaster', body: 'Gradient boosting with quantile regression for CI bands.' },
  { Icon: Zap, title: 'Inference API', body: '/predict, /attribute, /scenario — every response carries CI + SHAP attribution.' },
]

function StageCard({
  Icon,
  label,
  sub,
  primary,
}: {
  Icon: typeof Globe
  label: string
  sub: string
  primary?: boolean
}) {
  return (
    <div
      className={`flex min-w-[140px] flex-1 items-center gap-3 rounded-xl p-3 ${primary ? '' : 'bg-white ghair'}`}
      style={primary ? { background: 'var(--plum-soft)', border: '1px solid rgba(109,40,217,0.25)' } : undefined}
    >
      <div
        className="grid h-9 w-9 shrink-0 place-items-center rounded-lg"
        style={{ background: primary ? 'rgba(109,40,217,0.14)' : 'rgba(28,22,46,0.05)' }}
      >
        <Icon size={17} style={{ color: 'var(--plum)' }} strokeWidth={1.9} />
      </div>
      <div className="leading-tight">
        <p className="text-[13px] font-semibold text-ink">{label}</p>
        <p className="text-[11px] text-ink-muted">{sub}</p>
      </div>
    </div>
  )
}

export function PhArchitecture() {
  return (
    <CsSection
      eyebrow="02 · Solution architecture"
      title="From indicators to a planner console."
      intro="Validated features in, calibrated forecast out — with attribution."
    >
      <Module>
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">The spine</p>
        <div className="mt-4 flex flex-col items-stretch gap-2 lg:flex-row lg:items-center">
          {SPINE.map((s, i) => (
            <div key={s.label} className="flex flex-1 items-center gap-2">
              <StageCard {...s} />
              {i < SPINE.length - 1 && <ArrowRight size={16} className="hidden shrink-0 text-ink-muted lg:block" />}
            </div>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
            Reads downstream
          </span>
          {DOWNSTREAM.map(({ Icon, label }) => (
            <span
              key={label}
              className="inline-flex items-center gap-1.5 rounded-full bg-[var(--cream-2)] px-3 py-1 text-xs font-medium text-ink-soft ghair"
            >
              <Icon size={12} style={{ color: 'var(--plum)' }} />
              {label}
            </span>
          ))}
        </div>
      </Module>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {LAYERS.map(({ Icon, title, body }) => (
          <div key={title} className="rounded-2xl bg-white p-5 ghair soft-shadow-sm">
            <div
              className="grid h-10 w-10 place-items-center rounded-xl"
              style={{ background: 'var(--plum-soft)' }}
            >
              <Icon size={18} style={{ color: 'var(--plum)' }} strokeWidth={1.9} />
            </div>
            <h3 className="mt-3 font-display text-[15px] font-bold text-ink">{title}</h3>
            <p className="mt-1.5 text-[13px] leading-relaxed text-ink-soft">{body}</p>
          </div>
        ))}
      </div>
    </CsSection>
  )
}
```

- [ ] **Step 2: Verify**

Run: `cd frontend && npm run type-check && npm run lint`
Expected: clean.

- [ ] **Step 3: Commit**

```bash
git add frontend/src/components/casestudy/popHealth/PhArchitecture.tsx
git commit -m "feat(popHealth): add PhArchitecture

4-stage spine (Sources → Feature Store → Forecaster → Inference API)
with downstream chips and a 4-up icon-card grid mirroring the spine 1:1.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 6: PhForecastDemo (interactive centerpiece)

The auto-cycling interactive forecast demo. Mirrors WcWorkflowDemo's pattern: controls bar + progress + 3 zones + caption strip. Uses `predict`, `attributions`, `COUNTRIES`, `WEIGHTS`, `InputVector` from the existing surrogate.

**Files:**
- Create: `frontend/src/components/casestudy/popHealth/PhForecastDemo.tsx`

- [ ] **Step 1: Write PhForecastDemo**

```tsx
// frontend/src/components/casestudy/popHealth/PhForecastDemo.tsx
'use client'

import { useEffect, useMemo, useState } from 'react'
import { Play, Pause, RotateCcw, Globe, Sliders, BarChart3 } from 'lucide-react'
import { usePrefersReducedMotion } from '@/lib/hooks/usePrefersReducedMotion'
import { CsSection, Module } from '../bits'
import {
  predict,
  attributions,
  COUNTRIES,
  WEIGHTS,
  type InputVector,
  type Country,
} from '@/components/work/population-health/surrogate'

const FIELD_RANGES = {
  schooling: { min: 4, max: 20, step: 0.1, unit: 'yrs', label: 'Schooling' },
  gdp: { min: 300, max: 80000, step: 100, unit: 'USD', label: 'GDP per capita' },
  immunization: { min: 50, max: 100, step: 1, unit: '%', label: 'Immunization' },
  hiv: { min: 0, max: 12, step: 0.1, unit: '/1k', label: 'HIV deaths' },
} as const

const STEPS = [
  { label: 'Country', icon: Globe, caption: 'Pick a country — the surrogate loads its 2015 baseline and feature defaults.' },
  { label: 'Scenario', icon: Sliders, caption: 'Adjust a signal — here, +3 years of schooling above the country default.' },
  { label: 'Forecast', icon: BarChart3, caption: 'The model returns the prediction, a 90% CI band, and the ranked signals driving it.' },
]

const DEFAULT_COUNTRY = COUNTRIES.find((c) => c.code === 'BGD') ?? COUNTRIES[0]

function formatNumber(n: number, digits = 1): string {
  return n.toLocaleString('en-US', { minimumFractionDigits: digits, maximumFractionDigits: digits })
}

function formatDelta(d: number): string {
  const sign = d >= 0 ? '+' : '−'
  return `${sign}${formatNumber(Math.abs(d), 1)}y`
}

/** Auto-cycle "boost schooling" override applied at step 2+ */
function withSchoolingBoost(country: Country): InputVector {
  return { ...country.defaults, schooling: country.defaults.schooling + 3 }
}

function Zone({ title, active, children }: { title: string; active: boolean; children: React.ReactNode }) {
  return (
    <div
      className="flex-1 rounded-xl p-4 transition-all duration-300"
      style={{
        background: active ? 'var(--plum-soft)' : 'var(--cream-2)',
        border: `1px solid ${active ? 'rgba(109,40,217,0.25)' : 'var(--line)'}`,
      }}
    >
      <p
        className="text-[10px] font-semibold uppercase tracking-[0.14em]"
        style={{ color: active ? 'var(--plum)' : 'var(--ink-muted)' }}
      >
        {title}
      </p>
      <div className="mt-3">{children}</div>
    </div>
  )
}

export function PhForecastDemo() {
  const reduced = usePrefersReducedMotion()
  const [step, setStep] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [country, setCountry] = useState<Country>(DEFAULT_COUNTRY)
  const [userOverride, setUserOverride] = useState<InputVector | null>(null)

  useEffect(() => {
    if (reduced) setPlaying(false)
  }, [reduced])

  useEffect(() => {
    if (!playing) return
    const id = setInterval(() => setStep((s) => (s + 1) % 3), 1900)
    return () => clearInterval(id)
  }, [playing])

  // When user touches a slider or country, pause cycling and use overrides directly.
  // Otherwise, derive inputs from current step (step 0/1: defaults; step 2: schooling boost).
  const inputs: InputVector = useMemo(() => {
    if (userOverride) return userOverride
    return step >= 1 ? withSchoolingBoost(country) : country.defaults
  }, [userOverride, country, step])

  const prediction = useMemo(() => predict(country, inputs, WEIGHTS), [country, inputs])
  const attr = useMemo(() => attributions(country, inputs, WEIGHTS), [country, inputs])
  const baselineDelta = prediction.value - country.baseline

  const handleCountryChange = (code: string) => {
    const next = COUNTRIES.find((c) => c.code === code) ?? COUNTRIES[0]
    setCountry(next)
    setUserOverride(null)
    setPlaying(false)
  }

  const handleSlider = (field: keyof InputVector, value: number) => {
    setUserOverride({ ...inputs, [field]: value })
    setPlaying(false)
  }

  const handleStepClick = (i: number) => {
    setStep(i)
    setUserOverride(null)
    setPlaying(false)
  }

  const reset = () => {
    setStep(0)
    setUserOverride(null)
    setPlaying(false)
  }

  return (
    <CsSection
      id="demo"
      eyebrow="03 · Live forecast"
      title="Watch the model reason."
      intro="One country, one scenario, one forecast — with the signals that drove it. Step through it or let it run."
      footnote="Interactive prototype · deterministic surrogate of the trained ensemble."
    >
      <Module className="!p-0">
        {/* controls */}
        <div className="flex flex-wrap items-center gap-2 px-5 py-4" style={{ borderBottom: '1px solid var(--line)' }}>
          <button
            onClick={() => setPlaying((p) => !p)}
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-white transition-transform hover:-translate-y-0.5"
            style={{ background: 'var(--plum)' }}
          >
            {playing ? <Pause size={13} /> : <Play size={13} />}
            {playing ? 'Pause' : 'Run loop'}
          </button>
          <button
            onClick={reset}
            className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-ink-soft ghair transition-colors hover:text-ink"
          >
            <RotateCcw size={13} />
            Reset
          </button>
          <div className="ml-auto flex flex-wrap gap-1.5">
            {STEPS.map((s, i) => (
              <button
                key={s.label}
                onClick={() => handleStepClick(i)}
                className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] font-medium transition-colors"
                style={{
                  background: i === step ? 'var(--plum-soft)' : 'transparent',
                  color: i === step ? 'var(--plum)' : 'var(--ink-muted)',
                }}
              >
                <span
                  className="grid h-4 w-4 place-items-center rounded-full text-[9px] font-bold"
                  style={{
                    background: i === step ? 'var(--plum)' : 'rgba(28,22,46,0.10)',
                    color: i === step ? '#fff' : 'var(--ink-muted)',
                  }}
                >
                  {i + 1}
                </span>
                <span className="hidden sm:inline">{s.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* progress */}
        <div className="h-1 w-full bg-[var(--cream-2)]">
          <div
            className="h-full rounded-r-full transition-all duration-500"
            style={{ width: `${((step + 1) / 3) * 100}%`, background: 'var(--plum)' }}
          />
        </div>

        {/* stage */}
        <div className="grid grid-cols-1 gap-3 p-5 lg:grid-cols-3">
          {/* Zone 1 — Country */}
          <Zone title="The country" active={step === 0}>
            <select
              value={country.code}
              onChange={(e) => handleCountryChange(e.target.value)}
              className="w-full rounded-md border border-[var(--line)] bg-white px-3 py-2 text-[13px] font-medium text-ink"
            >
              {COUNTRIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.name}
                </option>
              ))}
            </select>
            <p className="mt-3 text-[11px] text-ink-muted">
              Baseline · <span className="font-medium text-ink">{formatNumber(country.baseline, 1)} years</span>{' '}
              (2015)
            </p>
          </Zone>

          {/* Zone 2 — Scenario */}
          <Zone title="The scenario" active={step === 1}>
            <div className="space-y-2.5">
              {(Object.keys(FIELD_RANGES) as Array<keyof InputVector>).map((field) => {
                const range = FIELD_RANGES[field]
                return (
                  <label key={field} className="block">
                    <span className="flex items-baseline justify-between text-[11px] text-ink-muted">
                      <span>{range.label}</span>
                      <span className="font-medium text-ink">
                        {formatNumber(inputs[field], field === 'gdp' || field === 'immunization' ? 0 : 1)}{' '}
                        {range.unit}
                      </span>
                    </span>
                    <input
                      type="range"
                      min={range.min}
                      max={range.max}
                      step={range.step}
                      value={inputs[field]}
                      onChange={(e) => handleSlider(field, Number(e.target.value))}
                      className="mt-1 w-full"
                      style={{ accentColor: 'var(--plum)' }}
                      aria-label={range.label}
                    />
                  </label>
                )
              })}
            </div>
          </Zone>

          {/* Zone 3 — Forecast */}
          <Zone title="The forecast" active={step === 2}>
            <div className="rounded-lg bg-white p-3 ghair">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-muted">Projected</p>
              <p className="mt-1 font-display text-2xl font-extrabold text-ink">
                {formatNumber(prediction.value, 1)}{' '}
                <span className="text-sm font-medium text-ink-muted">years</span>
              </p>
              <p className="mt-0.5 text-[11px] text-ink-muted">
                ±{formatNumber(prediction.ci90, 1)} (90% CI)
              </p>
              <div className="mt-3 space-y-1">
                {attr.slice(0, 4).map((a) => (
                  <div key={a.field} className="flex items-baseline justify-between text-[11px]">
                    <span className="text-ink-soft">
                      <span className="mr-1.5 text-ink-muted">▸</span>
                      {a.label}
                    </span>
                    <span
                      className="font-medium"
                      style={{ color: a.delta >= 0 ? 'var(--green)' : 'var(--coral)' }}
                    >
                      {formatDelta(a.delta)}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-3 border-t pt-2 text-[11px] text-ink-muted" style={{ borderColor: 'var(--line)' }}>
                vs. baseline · <span className="font-medium text-ink">{formatDelta(baselineDelta)}</span>
              </p>
            </div>
          </Zone>
        </div>

        {/* caption */}
        <div className="border-t px-5 py-4 ghair-t">
          <p className="text-[13px] leading-relaxed text-ink-soft">
            <span className="font-semibold text-ink">
              {step + 1}. {STEPS[step].label} —{' '}
            </span>
            {STEPS[step].caption}
          </p>
        </div>
      </Module>
    </CsSection>
  )
}
```

- [ ] **Step 2: Verify**

Run: `cd frontend && npm run type-check && npm run lint && npm run test`
Expected: clean. 12 tests still pass (no changes to surrogate).

- [ ] **Step 3: Commit**

```bash
git add frontend/src/components/casestudy/popHealth/PhForecastDemo.tsx
git commit -m "feat(popHealth): add PhForecastDemo interactive centerpiece

Auto-cycling 3-step demo (Country → Scenario → Forecast) mirroring
WcWorkflowDemo's controls + zones + caption pattern. User interaction
(country select / slider drag / step click) pauses the cycle and
drives the surrogate directly. Reuses predict, attributions, COUNTRIES,
WEIGHTS, InputVector from the existing surrogate module.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 7: PhImpact + PhFutureAI + PhClose

The closing trio. Each is small and follows the wheelchair pattern.

**Files:**
- Create: `frontend/src/components/casestudy/popHealth/PhImpact.tsx`
- Create: `frontend/src/components/casestudy/popHealth/PhFutureAI.tsx`
- Create: `frontend/src/components/casestudy/popHealth/PhClose.tsx`

- [ ] **Step 1: Write PhImpact**

```tsx
// frontend/src/components/casestudy/popHealth/PhImpact.tsx
import { Globe, Sigma, Zap } from 'lucide-react'
import { CsSection, Chip } from '../bits'

const STATS = [
  { Icon: Globe, value: '193', label: 'countries covered', tint: 'var(--plum)', bg: 'var(--plum-soft)' },
  { Icon: Sigma, value: '±1.8y', label: 'typical 90% CI band', tint: 'var(--blue)', bg: '#dbeafe' },
  { Icon: Zap, value: '<50ms', label: 'per-scenario inference', tint: 'var(--green)', bg: '#d1fae5' },
]

const OPERATORS = ['WHO planners', 'Ministry-of-health teams', 'Donor portfolios']

export function PhImpact() {
  return (
    <CsSection
      eyebrow="04 · Impact"
      title="Forecast with reasoning."
      intro="The output isn't a number — it's a number with the signals that produced it, calibrated and ready for a planning conversation."
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {STATS.map(({ Icon, value, label, tint, bg }) => (
          <div key={label} className="rounded-2xl bg-white p-5 ghair soft-shadow-sm">
            <div className="grid h-10 w-10 place-items-center rounded-xl" style={{ background: bg }}>
              <Icon size={18} style={{ color: tint }} strokeWidth={1.9} />
            </div>
            <p className="mt-3 font-display text-2xl font-extrabold text-ink">{value}</p>
            <p className="text-sm text-ink-muted">{label}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
          Operator audiences
        </span>
        {OPERATORS.map((o) => (
          <Chip key={o} tone="plum">
            {o}
          </Chip>
        ))}
      </div>
    </CsSection>
  )
}
```

- [ ] **Step 2: Write PhFutureAI**

```tsx
// frontend/src/components/casestudy/popHealth/PhFutureAI.tsx
import { Activity, GitCompare, LineChart } from 'lucide-react'
import { CsSection } from '../bits'

const CARDS = [
  {
    Icon: Activity,
    title: 'Streaming ingest',
    body: 'Daily snapshots replaced with WHO/WB change-data-capture.',
    tint: 'var(--blue)',
    bg: '#dbeafe',
  },
  {
    Icon: GitCompare,
    title: 'Scenario diff',
    body: 'Submit two override vectors, get a structured comparison payload.',
    tint: 'var(--plum)',
    bg: 'var(--plum-soft)',
  },
  {
    Icon: LineChart,
    title: 'Drift monitors',
    body: 'Track distribution shift, auto-flag when calibration degrades.',
    tint: 'var(--green)',
    bg: '#d1fae5',
  },
]

export function PhFutureAI() {
  return (
    <CsSection
      eyebrow="05 · What's next"
      title="From a forecast to a planning surface."
      intro="The same inference layer extends naturally into streaming data, scenario comparison, and drift monitoring."
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {CARDS.map(({ Icon, title, body, tint, bg }) => (
          <div key={title} className="lift flex flex-col rounded-2xl bg-white p-5 ghair">
            <div className="flex items-center justify-between">
              <div className="grid h-10 w-10 place-items-center rounded-xl" style={{ background: bg }}>
                <Icon size={18} style={{ color: tint }} strokeWidth={1.9} />
              </div>
              <span className="rounded-full bg-[var(--cream-2)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-muted ghair">
                Roadmap
              </span>
            </div>
            <h3 className="mt-4 font-display text-[15px] font-bold text-ink">{title}</h3>
            <p className="mt-1.5 flex-1 text-[13px] leading-relaxed text-ink-soft">{body}</p>
          </div>
        ))}
      </div>
    </CsSection>
  )
}
```

- [ ] **Step 3: Write PhClose**

```tsx
// frontend/src/components/casestudy/popHealth/PhClose.tsx
import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'

export function PhClose() {
  return (
    <section className="mx-auto max-w-[1180px] px-6 py-12">
      <div
        className="flex flex-col items-start gap-6 rounded-3xl px-9 py-9 ghair sm:flex-row sm:items-center sm:justify-between"
        style={{ background: 'linear-gradient(105deg,#ede9fe 0%,#f5f0fe 45%,#fce7f3 100%)' }}
      >
        <div>
          <h2 className="font-display text-2xl font-extrabold leading-tight text-ink sm:text-[1.75rem]">
            Forecasting that shows its work.
          </h2>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-soft">
            Happy to walk through the calibration layer, the attribution chain, and what a production deployment
            looks like.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/work"
            className="group inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-ink ghair-2 transition-colors hover:bg-white/70"
          >
            <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-0.5" />
            All work
          </Link>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white soft-shadow-sm transition-transform hover:-translate-y-0.5"
            style={{ background: 'var(--plum)' }}
          >
            Get in touch
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Verify**

Run: `cd frontend && npm run type-check && npm run lint`
Expected: clean.

- [ ] **Step 5: Commit**

```bash
git add frontend/src/components/casestudy/popHealth/PhImpact.tsx \
        frontend/src/components/casestudy/popHealth/PhFutureAI.tsx \
        frontend/src/components/casestudy/popHealth/PhClose.tsx
git commit -m "feat(popHealth): add PhImpact + PhFutureAI + PhClose

3 metric cards + operator chip strip in Impact. 3 roadmap icon-cards
in FutureAI. CTA strip in Close. All warm register, mirroring the
wheelchair pattern.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 8: Compose `/work/population-health-intelligence/page.tsx`

Wire the 7 popHealth components into the page, replacing the T2 stub.

**Files:**
- Replace: `frontend/src/app/work/population-health-intelligence/page.tsx`

- [ ] **Step 1: Write the final page**

```tsx
// frontend/src/app/work/population-health-intelligence/page.tsx
import type { Metadata } from 'next'
import { HomeNav } from '@/components/home/HomeNav'
import { SiteFooter } from '@/components/home/SiteFooter'
import { Reveal } from '@/components/home/Reveal'
import { PhHero } from '@/components/casestudy/popHealth/PhHero'
import { PhProblem } from '@/components/casestudy/popHealth/PhProblem'
import { PhArchitecture } from '@/components/casestudy/popHealth/PhArchitecture'
import { PhForecastDemo } from '@/components/casestudy/popHealth/PhForecastDemo'
import { PhImpact } from '@/components/casestudy/popHealth/PhImpact'
import { PhFutureAI } from '@/components/casestudy/popHealth/PhFutureAI'
import { PhClose } from '@/components/casestudy/popHealth/PhClose'

export const metadata: Metadata = {
  title: 'Population-Health Intelligence Platform — Lloyd Dela Cruz',
  description:
    'Calibrated life-expectancy forecasts for 193 nations, with the signals driving each trajectory — interactive prototype backed by a deterministic surrogate of the trained ensemble.',
}

export default function Page() {
  return (
    <div className="home2 min-h-screen">
      <HomeNav active="Work" />
      <main>
        <PhHero />
        <Reveal>
          <PhProblem />
        </Reveal>
        <Reveal>
          <PhArchitecture />
        </Reveal>
        <Reveal>
          <PhForecastDemo />
        </Reveal>
        <Reveal>
          <PhImpact />
        </Reveal>
        <Reveal>
          <PhFutureAI />
        </Reveal>
        <PhClose />
      </main>
      <SiteFooter />
    </div>
  )
}
```

- [ ] **Step 2: Verify build**

Run: `cd frontend && npm run type-check && npm run lint && npm run build`
Expected: clean. Route `/work/population-health-intelligence` present in build manifest.

- [ ] **Step 3: Confirm built HTML has expected content**

```bash
cd frontend/out && \
  grep -c "Population-Health" work/population-health-intelligence/index.html && \
  grep -c "Planning decisions deserve" work/population-health-intelligence/index.html && \
  grep -c "From indicators to a planner console" work/population-health-intelligence/index.html && \
  grep -c "Watch the model reason" work/population-health-intelligence/index.html && \
  grep -c "Forecast with reasoning" work/population-health-intelligence/index.html
```
Expected: every grep returns ≥ 1.

- [ ] **Step 4: Commit**

```bash
git add frontend/src/app/work/population-health-intelligence/page.tsx
git commit -m "feat(work): wire Population-Health page from popHealth components

Replaces the T2 stub with the full 7-section composition: PhHero,
PhProblem, PhArchitecture, PhForecastDemo (interactive), PhImpact,
PhFutureAI, PhClose. All inside home2 register; Reveal wrappers for
scroll-fade entrances matching wheelchair-tracking.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 9: CrHero + CrProblem (Clinical Risk intro)

Mirror of T4 with clinical-flavored content.

**Files:**
- Create: `frontend/src/components/casestudy/clinicalRisk/CrHero.tsx`
- Create: `frontend/src/components/casestudy/clinicalRisk/CrProblem.tsx`

- [ ] **Step 1: Write CrHero**

```tsx
// frontend/src/components/casestudy/clinicalRisk/CrHero.tsx
import Link from 'next/link'
import { ArrowRight, ArrowLeft, Microscope, Filter, Brain, Target } from 'lucide-react'

const META = [
  { k: 'Role', v: 'Applied AI engineering' },
  { k: 'Dataset', v: 'Wisconsin Diagnostic (569)' },
  { k: 'Features', v: '30 cell-morphology signals' },
  { k: 'Status', v: 'Prototype' },
]

function CrSystemMap() {
  // 4 small icon nodes (Microscope → Filter → Brain → Target). Target is the primary output stage.
  const W = 460
  const H = 200
  const Y = H / 2
  const NODES = [
    { Icon: Microscope, label: 'Biopsy', x: 50 },
    { Icon: Filter, label: 'Validate', x: 180 },
    { Icon: Brain, label: 'Ensemble', x: 310 },
    { Icon: Target, label: 'Calibration', x: 410, primary: true },
  ]
  return (
    <div className="relative mx-auto w-full max-w-[460px]">
      <div className="relative w-full" style={{ paddingBottom: `${(H / W) * 100}%` }}>
        <div className="absolute inset-0">
          <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" fill="none" aria-hidden>
            <path
              d={`M ${NODES[0].x} ${Y} L ${NODES[NODES.length - 1].x} ${Y}`}
              stroke="var(--plum)"
              strokeWidth={1.6}
              strokeOpacity={0.35}
              strokeLinecap="round"
            />
            {NODES.map((n) => (
              <circle key={n.label} cx={n.x} cy={Y} r={3.2} fill="var(--plum)" opacity={n.primary ? 1 : 0.6} />
            ))}
          </svg>

          <div
            className="absolute left-1/2 top-1/2 h-32 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
            style={{ background: 'radial-gradient(closest-side, rgba(124,58,237,0.18), transparent)' }}
          />

          {NODES.map((n) => (
            <div
              key={n.label}
              className="absolute flex h-[60px] w-[88px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-2xl bg-white px-2 ghair soft-shadow-sm"
              style={{
                left: `${(n.x / W) * 100}%`,
                top: '50%',
                borderColor: n.primary ? 'rgba(109,40,217,0.35)' : undefined,
                background: n.primary ? 'var(--plum-soft)' : undefined,
              }}
            >
              <n.Icon size={18} style={{ color: 'var(--plum)' }} strokeWidth={1.9} />
              <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-ink-muted">
                {n.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function CrHero() {
  return (
    <section className="relative overflow-hidden">
      <div className="hero-wash pointer-events-none absolute inset-0" aria-hidden />
      <div className="relative mx-auto max-w-[1180px] px-6 pb-14 pt-12 lg:pt-16">
        <Link
          href="/work"
          className="group inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted transition-colors hover:text-ink"
        >
          <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" />
          All work
        </Link>

        <div className="mt-6 grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <span className="anim-rise inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-soft ghair">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'var(--plum)' }} />
              Applied AI · Clinical Decision Support
            </span>

            <h1
              className="anim-rise mt-5 font-display text-[2.5rem] font-extrabold leading-[1.06] text-ink sm:text-[3rem] lg:text-[3.4rem]"
              style={{ animationDelay: '60ms' }}
            >
              Clinical
              <br />
              <span className="grad-plum-text">Risk Engine</span>
            </h1>

            <p
              className="anim-rise mt-5 max-w-[40ch] text-[1.08rem] leading-relaxed text-ink-soft"
              style={{ animationDelay: '120ms' }}
            >
              Calibrated malignancy risk scoring for biopsy triage — designed for the clinician, not around them.
            </p>

            <div className="anim-rise mt-7 flex flex-wrap items-center gap-3" style={{ animationDelay: '180ms' }}>
              <Link
                href="#demo"
                className="group inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white soft-shadow transition-transform hover:-translate-y-0.5"
                style={{ background: 'var(--plum)' }}
              >
                See the triage demo
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="#problem"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-ink ghair-2 transition-colors hover:bg-[var(--cream-2)]"
              >
                Start from the problem
              </Link>
            </div>

            <dl
              className="anim-rise mt-9 grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-4"
              style={{ animationDelay: '220ms' }}
            >
              {META.map((m) => (
                <div key={m.k}>
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">{m.k}</dt>
                  <dd className="mt-1 text-sm font-medium text-ink">{m.v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="anim-rise" style={{ animationDelay: '260ms' }}>
            <CrSystemMap />
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Write CrProblem**

```tsx
// frontend/src/components/casestudy/clinicalRisk/CrProblem.tsx
import { Brain, AlertTriangle, HelpCircle } from 'lucide-react'
import { CsSection } from '../bits'

const CALLOUTS = [
  { Icon: Brain, title: 'High cognitive load' },
  { Icon: AlertTriangle, title: 'Mis-triage is expensive' },
  { Icon: HelpCircle, title: 'Ambiguity needs a flag' },
]

export function CrProblem() {
  return (
    <CsSection
      id="problem"
      eyebrow="01 · Problem"
      title="A probability isn't a decision."
      intro="Pathologists triage biopsy cases under heavy cognitive load. A raw model probability — even a confident one — doesn't tell them when the model is uncertain."
    >
      <p className="max-w-2xl text-[1.05rem] leading-relaxed text-ink-soft">
        The cases that matter most are the ambiguous ones, sitting on either side of the decision boundary. Those
        need a flag, not just a number.
      </p>
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {CALLOUTS.map(({ Icon, title }) => (
          <div key={title} className="flex items-center gap-3 rounded-2xl bg-white p-4 ghair soft-shadow-sm">
            <div
              className="grid h-10 w-10 shrink-0 place-items-center rounded-xl"
              style={{ background: 'rgba(248,112,96,0.12)' }}
            >
              <Icon size={18} style={{ color: 'var(--coral)' }} strokeWidth={1.9} />
            </div>
            <p className="text-[13px] font-semibold text-ink">{title}</p>
          </div>
        ))}
      </div>
    </CsSection>
  )
}
```

- [ ] **Step 3: Verify**

Run: `cd frontend && npm run type-check && npm run lint`
Expected: clean.

- [ ] **Step 4: Commit**

```bash
git add frontend/src/components/casestudy/clinicalRisk/CrHero.tsx \
        frontend/src/components/casestudy/clinicalRisk/CrProblem.tsx
git commit -m "feat(clinicalRisk): add CrHero + CrProblem

Hero composes title/subtitle/CTAs/META with an inline 4-node CrSystemMap
glyph (Microscope → Filter → Brain → Target). Problem renders the
'probability isn't a decision' framing with 3 icon callouts.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 10: CrArchitecture

**Files:**
- Create: `frontend/src/components/casestudy/clinicalRisk/CrArchitecture.tsx`

- [ ] **Step 1: Write CrArchitecture**

```tsx
// frontend/src/components/casestudy/clinicalRisk/CrArchitecture.tsx
import { Microscope, Filter, Brain, Target, ArrowRight, Flag, Percent, FileText } from 'lucide-react'
import { CsSection, Module } from '../bits'

const SPINE = [
  { Icon: Microscope, label: 'FNA vector', sub: '30 features' },
  { Icon: Filter, label: 'Validation', sub: 'schema + range' },
  { Icon: Brain, label: 'Ensemble', sub: 'GBM + RF voting' },
  { Icon: Target, label: 'Calibration', sub: 'isotonic + Wald CI', primary: true },
]

const DOWNSTREAM = [
  { Icon: FileText, label: 'Triage payload' },
  { Icon: Flag, label: 'Ambiguity flag' },
  { Icon: Percent, label: 'Cohort %ile' },
  { Icon: FileText, label: 'Audit log' },
]

const LAYERS = [
  { Icon: Microscope, title: 'FNA vector', body: '30 cell-nucleus features per biopsy slide.' },
  { Icon: Filter, title: 'Validation', body: 'Schema enforcement and range checks before inference.' },
  { Icon: Brain, title: 'Ensemble', body: 'Gradient boosting + random forest voting, SHAP attribution.' },
  {
    Icon: Target,
    title: 'Calibration',
    body: 'Isotonic calibration over the WDBC training cohort. The ambiguity flag fires downstream when the 90% CI straddles 0.5.',
  },
]

function StageCard({
  Icon,
  label,
  sub,
  primary,
}: {
  Icon: typeof Microscope
  label: string
  sub: string
  primary?: boolean
}) {
  return (
    <div
      className={`flex min-w-[140px] flex-1 items-center gap-3 rounded-xl p-3 ${primary ? '' : 'bg-white ghair'}`}
      style={primary ? { background: 'var(--plum-soft)', border: '1px solid rgba(109,40,217,0.25)' } : undefined}
    >
      <div
        className="grid h-9 w-9 shrink-0 place-items-center rounded-lg"
        style={{ background: primary ? 'rgba(109,40,217,0.14)' : 'rgba(28,22,46,0.05)' }}
      >
        <Icon size={17} style={{ color: 'var(--plum)' }} strokeWidth={1.9} />
      </div>
      <div className="leading-tight">
        <p className="text-[13px] font-semibold text-ink">{label}</p>
        <p className="text-[11px] text-ink-muted">{sub}</p>
      </div>
    </div>
  )
}

export function CrArchitecture() {
  return (
    <CsSection
      eyebrow="02 · Solution architecture"
      title="Calibration is a first-class layer."
      intro="Raw ensemble probability isn't a clinical signal. Calibration makes the number actionable."
    >
      <Module>
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">The spine</p>
        <div className="mt-4 flex flex-col items-stretch gap-2 lg:flex-row lg:items-center">
          {SPINE.map((s, i) => (
            <div key={s.label} className="flex flex-1 items-center gap-2">
              <StageCard {...s} />
              {i < SPINE.length - 1 && <ArrowRight size={16} className="hidden shrink-0 text-ink-muted lg:block" />}
            </div>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
            Reads downstream
          </span>
          {DOWNSTREAM.map(({ Icon, label }) => (
            <span
              key={label}
              className="inline-flex items-center gap-1.5 rounded-full bg-[var(--cream-2)] px-3 py-1 text-xs font-medium text-ink-soft ghair"
            >
              <Icon size={12} style={{ color: 'var(--plum)' }} />
              {label}
            </span>
          ))}
        </div>
      </Module>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {LAYERS.map(({ Icon, title, body }) => (
          <div key={title} className="rounded-2xl bg-white p-5 ghair soft-shadow-sm">
            <div
              className="grid h-10 w-10 place-items-center rounded-xl"
              style={{ background: 'var(--plum-soft)' }}
            >
              <Icon size={18} style={{ color: 'var(--plum)' }} strokeWidth={1.9} />
            </div>
            <h3 className="mt-3 font-display text-[15px] font-bold text-ink">{title}</h3>
            <p className="mt-1.5 text-[13px] leading-relaxed text-ink-soft">{body}</p>
          </div>
        ))}
      </div>
    </CsSection>
  )
}
```

- [ ] **Step 2: Verify**

Run: `cd frontend && npm run type-check && npm run lint`
Expected: clean.

- [ ] **Step 3: Commit**

```bash
git add frontend/src/components/casestudy/clinicalRisk/CrArchitecture.tsx
git commit -m "feat(clinicalRisk): add CrArchitecture

4-stage spine (FNA vector → Validation → Ensemble → Calibration) with
downstream chips and a 4-up icon-card grid mirroring the spine 1:1.
Calibration node is the primary plum-highlighted stage.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 11: CrTriageDemo (interactive centerpiece)

Mirror of T6 with clinical-risk content. Auto-cycles through 3 representative cases (benign / ambiguous / malignant); the ambiguous case fires the amber-pulsing ambiguity flag.

**Files:**
- Create: `frontend/src/components/casestudy/clinicalRisk/CrTriageDemo.tsx`

- [ ] **Step 1: Write CrTriageDemo**

```tsx
// frontend/src/components/casestudy/clinicalRisk/CrTriageDemo.tsx
'use client'

import { useEffect, useMemo, useState } from 'react'
import { Play, Pause, RotateCcw, ClipboardList, Sigma, Flag } from 'lucide-react'
import { usePrefersReducedMotion } from '@/lib/hooks/usePrefersReducedMotion'
import { CsSection, Module } from '../bits'
import casesJson from '@/components/work/clinical-risk/wdbc-cases.json'
import {
  predictMalignancy,
  ambiguityFlag,
  type WdbcFeatures,
} from '@/components/work/clinical-risk/surrogate'

interface CaseRecord {
  id: string
  label: string
  features: WdbcFeatures
}

const ALL_CASES = casesJson.cases as CaseRecord[]

// Auto-cycle order: benign → ambiguous → malignant.
const CYCLE_IDS = ['WDBC-112', 'WDBC-301', 'WDBC-219'] as const
const CYCLE_CASES: CaseRecord[] = CYCLE_IDS.map(
  (id) => ALL_CASES.find((c) => c.id === id) ?? ALL_CASES[0],
)

const STEPS = [
  { label: 'Case', icon: ClipboardList, caption: 'Pick a case — the surrogate loads its biopsy feature vector.' },
  { label: 'Inference', icon: Sigma, caption: 'Calibrated probability + 90% CI band, with the top contributing signals.' },
  { label: 'Triage', icon: Flag, caption: 'When the CI straddles 0.5, the ambiguity flag fires for clinician second-review.' },
]

const TOP_FEATURES: Array<keyof WdbcFeatures> = ['worst_concave_points', 'worst_perimeter', 'worst_radius']
const FIELD_LABEL: Record<keyof WdbcFeatures, string> = {
  worst_concave_points: 'Worst concave points',
  worst_perimeter: 'Worst perimeter',
  worst_radius: 'Worst radius',
  mean_texture: 'Mean texture',
  worst_smoothness: 'Worst smoothness',
  mean_concavity: 'Mean concavity',
  worst_area: 'Worst area',
  mean_radius: 'Mean radius',
}

function formatProbability(p: number): string {
  return p.toFixed(2)
}

function formatContribution(c: number): string {
  const sign = c >= 0 ? '+' : '−'
  return `${sign}${Math.abs(c).toFixed(2)}`
}

function Zone({ title, active, children }: { title: string; active: boolean; children: React.ReactNode }) {
  return (
    <div
      className="flex-1 rounded-xl p-4 transition-all duration-300"
      style={{
        background: active ? 'var(--plum-soft)' : 'var(--cream-2)',
        border: `1px solid ${active ? 'rgba(109,40,217,0.25)' : 'var(--line)'}`,
      }}
    >
      <p
        className="text-[10px] font-semibold uppercase tracking-[0.14em]"
        style={{ color: active ? 'var(--plum)' : 'var(--ink-muted)' }}
      >
        {title}
      </p>
      <div className="mt-3">{children}</div>
    </div>
  )
}

export function CrTriageDemo() {
  const reduced = usePrefersReducedMotion()
  const [step, setStep] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [cycleIdx, setCycleIdx] = useState(0)
  const [activeCase, setActiveCase] = useState<CaseRecord>(CYCLE_CASES[0])
  const [features, setFeatures] = useState<WdbcFeatures>(CYCLE_CASES[0].features)
  const [userEdited, setUserEdited] = useState(false)

  useEffect(() => {
    if (reduced) setPlaying(false)
  }, [reduced])

  useEffect(() => {
    if (!playing) return
    const id = setInterval(() => {
      setStep((s) => {
        const next = (s + 1) % 3
        if (next === 0) {
          // wrap: advance to next case in the cycle
          setCycleIdx((ci) => {
            const nextCi = (ci + 1) % CYCLE_CASES.length
            const c = CYCLE_CASES[nextCi]
            setActiveCase(c)
            setFeatures(c.features)
            setUserEdited(false)
            return nextCi
          })
        }
        return next
      })
    }, 1900)
    return () => clearInterval(id)
  }, [playing])

  const result = useMemo(() => predictMalignancy(features), [features])
  const ambiguous = ambiguityFlag(result)

  const confidenceTone: 'green' | 'amber' | 'coral' = ambiguous
    ? 'amber'
    : result.p > 0.5
      ? 'coral'
      : 'green'
  const triageText = ambiguous
    ? 'Second review recommended — CI crosses 0.5'
    : result.p > 0.5
      ? 'Priority review queue'
      : 'Standard review queue'

  const toneColor: Record<typeof confidenceTone, string> = {
    green: 'var(--green)',
    amber: 'var(--amber)',
    coral: 'var(--coral)',
  }

  const handleCaseSelect = (id: string) => {
    const c = ALL_CASES.find((x) => x.id === id) ?? ALL_CASES[0]
    setActiveCase(c)
    setFeatures(c.features)
    setUserEdited(false)
    setPlaying(false)
  }

  const handleFeatureChange = (field: keyof WdbcFeatures, value: number) => {
    setFeatures((prev) => ({ ...prev, [field]: value }))
    setUserEdited(true)
    setPlaying(false)
  }

  const handleStepClick = (i: number) => {
    setStep(i)
    setPlaying(false)
  }

  const reset = () => {
    setStep(0)
    setCycleIdx(0)
    setActiveCase(CYCLE_CASES[0])
    setFeatures(CYCLE_CASES[0].features)
    setUserEdited(false)
    setPlaying(false)
  }

  return (
    <CsSection
      id="demo"
      eyebrow="03 · Live triage"
      title="One case at a time."
      intro="Pick a case, see the calibrated probability, watch the ambiguity flag fire when the model is unsure."
      footnote="Interactive prototype · calibrated surrogate of the production ensemble."
    >
      <Module className="!p-0">
        {/* controls */}
        <div className="flex flex-wrap items-center gap-2 px-5 py-4" style={{ borderBottom: '1px solid var(--line)' }}>
          <button
            onClick={() => setPlaying((p) => !p)}
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-white transition-transform hover:-translate-y-0.5"
            style={{ background: 'var(--plum)' }}
          >
            {playing ? <Pause size={13} /> : <Play size={13} />}
            {playing ? 'Pause' : 'Run loop'}
          </button>
          <button
            onClick={reset}
            className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-ink-soft ghair transition-colors hover:text-ink"
          >
            <RotateCcw size={13} />
            Reset
          </button>
          <div className="ml-auto flex flex-wrap gap-1.5">
            {STEPS.map((s, i) => (
              <button
                key={s.label}
                onClick={() => handleStepClick(i)}
                className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] font-medium transition-colors"
                style={{
                  background: i === step ? 'var(--plum-soft)' : 'transparent',
                  color: i === step ? 'var(--plum)' : 'var(--ink-muted)',
                }}
              >
                <span
                  className="grid h-4 w-4 place-items-center rounded-full text-[9px] font-bold"
                  style={{
                    background: i === step ? 'var(--plum)' : 'rgba(28,22,46,0.10)',
                    color: i === step ? '#fff' : 'var(--ink-muted)',
                  }}
                >
                  {i + 1}
                </span>
                <span className="hidden sm:inline">{s.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* progress */}
        <div className="h-1 w-full bg-[var(--cream-2)]">
          <div
            className="h-full rounded-r-full transition-all duration-500"
            style={{ width: `${((step + 1) / 3) * 100}%`, background: 'var(--plum)' }}
          />
        </div>

        {/* stage */}
        <div className="grid grid-cols-1 gap-3 p-5 lg:grid-cols-3">
          {/* Zone 1 — Case */}
          <Zone title="The case" active={step === 0}>
            <select
              value={activeCase.id}
              onChange={(e) => handleCaseSelect(e.target.value)}
              className="w-full rounded-md border border-[var(--line)] bg-white px-3 py-2 text-[13px] font-medium text-ink"
            >
              {ALL_CASES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
            <div className="mt-3 space-y-2">
              {TOP_FEATURES.map((field) => (
                <label key={field} className="block">
                  <span className="flex items-baseline justify-between text-[11px] text-ink-muted">
                    <span>{FIELD_LABEL[field]}</span>
                    <span className="font-medium text-ink">{features[field].toFixed(3)}</span>
                  </span>
                  <input
                    type="number"
                    step="0.001"
                    value={features[field]}
                    onChange={(e) => handleFeatureChange(field, Number(e.target.value))}
                    className="mt-1 w-full rounded-md border border-[var(--line)] bg-white px-2 py-1 text-[12px] text-ink"
                    aria-label={FIELD_LABEL[field]}
                  />
                </label>
              ))}
              <p className="text-[10px] text-ink-muted">+5 more features applied silently</p>
            </div>
          </Zone>

          {/* Zone 2 — Inference */}
          <Zone title="The inference" active={step === 1}>
            <div className="rounded-lg bg-white p-3 ghair">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
                p(malignancy)
              </p>
              <p className="mt-1 font-display text-2xl font-extrabold text-ink">{formatProbability(result.p)}</p>
              <p className="mt-0.5 text-[11px] text-ink-muted">
                CI {formatProbability(result.ciLow)} – {formatProbability(result.ciHigh)}
              </p>
              <div className="mt-3 space-y-1">
                {result.topAttributions.slice(0, 4).map((a) => (
                  <div key={a.field} className="flex items-baseline justify-between text-[11px]">
                    <span className="text-ink-soft">
                      <span className="mr-1.5 text-ink-muted">▸</span>
                      {a.label}
                    </span>
                    <span
                      className="font-medium"
                      style={{ color: a.contribution >= 0 ? 'var(--coral)' : 'var(--green)' }}
                    >
                      {formatContribution(a.contribution)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Zone>

          {/* Zone 3 — Triage */}
          <Zone title="The triage" active={step === 2}>
            <div className="rounded-lg bg-white p-3 ghair">
              <div className="flex items-center gap-2">
                <span
                  className={`grid h-7 w-7 place-items-center rounded-md ${ambiguous ? 'animate-pulse' : ''}`}
                  style={{
                    background: ambiguous ? 'rgba(245,158,11,0.16)' : 'rgba(28,22,46,0.06)',
                    color: ambiguous ? 'var(--amber)' : 'var(--ink-muted)',
                  }}
                >
                  <Flag size={14} strokeWidth={2.2} />
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-soft">
                  Ambiguity flag {ambiguous ? '· active' : '· dark'}
                </span>
              </div>
              <p
                className="mt-3 text-[13px] font-semibold leading-snug"
                style={{ color: toneColor[confidenceTone] }}
              >
                {triageText}
              </p>
              <p className="mt-2 text-[11px] text-ink-muted">
                Cohort position · <span className="font-medium text-ink">{result.cohortPercentile.toFixed(0)}th %ile</span>
              </p>
              {userEdited && (
                <p className="mt-2 text-[10px] italic text-ink-muted">user-edited features</p>
              )}
            </div>
          </Zone>
        </div>

        {/* caption */}
        <div className="border-t px-5 py-4 ghair-t">
          <p className="text-[13px] leading-relaxed text-ink-soft">
            <span className="font-semibold text-ink">
              {step + 1}. {STEPS[step].label} —{' '}
            </span>
            {STEPS[step].caption}
          </p>
        </div>
      </Module>
    </CsSection>
  )
}
```

- [ ] **Step 2: Verify**

Run: `cd frontend && npm run type-check && npm run lint && npm run test`
Expected: clean. 12 tests still pass.

- [ ] **Step 3: Commit**

```bash
git add frontend/src/components/casestudy/clinicalRisk/CrTriageDemo.tsx
git commit -m "feat(clinicalRisk): add CrTriageDemo interactive centerpiece

Auto-cycling 3-case demo (benign → ambiguous → malignant) with the
ambiguity flag pulsing amber on the ambiguous case — the load-bearing
visual moment. User can pick a different case from the library or edit
the top-3 features directly. Re-uses predictMalignancy + ambiguityFlag
from the existing surrogate module.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 12: CrImpact + CrFutureAI + CrClose

**Files:**
- Create: `frontend/src/components/casestudy/clinicalRisk/CrImpact.tsx`
- Create: `frontend/src/components/casestudy/clinicalRisk/CrFutureAI.tsx`
- Create: `frontend/src/components/casestudy/clinicalRisk/CrClose.tsx`

- [ ] **Step 1: Write CrImpact**

```tsx
// frontend/src/components/casestudy/clinicalRisk/CrImpact.tsx
import { Target, Sigma, Zap } from 'lucide-react'
import { CsSection, Chip } from '../bits'

const STATS = [
  { Icon: Target, value: '0.99', label: 'AUC (calibrated ensemble)', tint: 'var(--plum)', bg: 'var(--plum-soft)' },
  { Icon: Sigma, value: '0.041', label: 'Brier loss post-calibration', tint: 'var(--blue)', bg: '#dbeafe' },
  { Icon: Zap, value: '22ms', label: 'per-case inference latency', tint: 'var(--green)', bg: '#d1fae5' },
]

const OPERATORS = ['Pathology labs', 'Telemedicine networks', 'Clinical research']

export function CrImpact() {
  return (
    <CsSection
      eyebrow="04 · Impact"
      title="From probability to decision."
      intro="A calibrated probability with an ambiguity flag turns a raw model output into something a clinical workflow can route on."
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {STATS.map(({ Icon, value, label, tint, bg }) => (
          <div key={label} className="rounded-2xl bg-white p-5 ghair soft-shadow-sm">
            <div className="grid h-10 w-10 place-items-center rounded-xl" style={{ background: bg }}>
              <Icon size={18} style={{ color: tint }} strokeWidth={1.9} />
            </div>
            <p className="mt-3 font-display text-2xl font-extrabold text-ink">{value}</p>
            <p className="text-sm text-ink-muted">{label}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
          Operator audiences
        </span>
        {OPERATORS.map((o) => (
          <Chip key={o} tone="plum">
            {o}
          </Chip>
        ))}
      </div>
    </CsSection>
  )
}
```

- [ ] **Step 2: Write CrFutureAI**

```tsx
// frontend/src/components/casestudy/clinicalRisk/CrFutureAI.tsx
import { Network, Activity, Users } from 'lucide-react'
import { CsSection } from '../bits'

const CARDS = [
  {
    Icon: Network,
    title: 'FHIR ingestion',
    body: 'Pull FNA observations from PACS/LIS directly.',
    tint: 'var(--blue)',
    bg: '#dbeafe',
  },
  {
    Icon: Activity,
    title: 'Drift monitoring',
    body: 'Watch input distributions, auto-flag calibration drift.',
    tint: 'var(--plum)',
    bg: 'var(--plum-soft)',
  },
  {
    Icon: Users,
    title: 'Human-in-the-loop',
    body: 'Clinician overrides feed the calibration retrain queue.',
    tint: 'var(--green)',
    bg: '#d1fae5',
  },
]

export function CrFutureAI() {
  return (
    <CsSection
      eyebrow="05 · What's next"
      title="From a triage signal to a learning loop."
      intro="The system improves with every clinician decision it observes."
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {CARDS.map(({ Icon, title, body, tint, bg }) => (
          <div key={title} className="lift flex flex-col rounded-2xl bg-white p-5 ghair">
            <div className="flex items-center justify-between">
              <div className="grid h-10 w-10 place-items-center rounded-xl" style={{ background: bg }}>
                <Icon size={18} style={{ color: tint }} strokeWidth={1.9} />
              </div>
              <span className="rounded-full bg-[var(--cream-2)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-muted ghair">
                Roadmap
              </span>
            </div>
            <h3 className="mt-4 font-display text-[15px] font-bold text-ink">{title}</h3>
            <p className="mt-1.5 flex-1 text-[13px] leading-relaxed text-ink-soft">{body}</p>
          </div>
        ))}
      </div>
    </CsSection>
  )
}
```

- [ ] **Step 3: Write CrClose**

```tsx
// frontend/src/components/casestudy/clinicalRisk/CrClose.tsx
import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'

export function CrClose() {
  return (
    <section className="mx-auto max-w-[1180px] px-6 py-12">
      <div
        className="flex flex-col items-start gap-6 rounded-3xl px-9 py-9 ghair sm:flex-row sm:items-center sm:justify-between"
        style={{ background: 'linear-gradient(105deg,#ede9fe 0%,#f5f0fe 45%,#fce7f3 100%)' }}
      >
        <div>
          <h2 className="font-display text-2xl font-extrabold leading-tight text-ink sm:text-[1.75rem]">
            Triage that knows what it doesn&apos;t know.
          </h2>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-soft">
            Happy to walk through the calibration approach, the ambiguity policy, and what FHIR integration would
            look like.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/work"
            className="group inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-ink ghair-2 transition-colors hover:bg-white/70"
          >
            <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-0.5" />
            All work
          </Link>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white soft-shadow-sm transition-transform hover:-translate-y-0.5"
            style={{ background: 'var(--plum)' }}
          >
            Get in touch
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Verify**

Run: `cd frontend && npm run type-check && npm run lint`
Expected: clean.

- [ ] **Step 5: Commit**

```bash
git add frontend/src/components/casestudy/clinicalRisk/CrImpact.tsx \
        frontend/src/components/casestudy/clinicalRisk/CrFutureAI.tsx \
        frontend/src/components/casestudy/clinicalRisk/CrClose.tsx
git commit -m "feat(clinicalRisk): add CrImpact + CrFutureAI + CrClose

3 metric cards (AUC / Brier / latency) + operator chip strip. 3 roadmap
cards (FHIR / drift / HITL). Warm CTA strip.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 13: Compose `/work/clinical-risk-engine/page.tsx`

**Files:**
- Replace: `frontend/src/app/work/clinical-risk-engine/page.tsx`

- [ ] **Step 1: Write the final page**

```tsx
// frontend/src/app/work/clinical-risk-engine/page.tsx
import type { Metadata } from 'next'
import { HomeNav } from '@/components/home/HomeNav'
import { SiteFooter } from '@/components/home/SiteFooter'
import { Reveal } from '@/components/home/Reveal'
import { CrHero } from '@/components/casestudy/clinicalRisk/CrHero'
import { CrProblem } from '@/components/casestudy/clinicalRisk/CrProblem'
import { CrArchitecture } from '@/components/casestudy/clinicalRisk/CrArchitecture'
import { CrTriageDemo } from '@/components/casestudy/clinicalRisk/CrTriageDemo'
import { CrImpact } from '@/components/casestudy/clinicalRisk/CrImpact'
import { CrFutureAI } from '@/components/casestudy/clinicalRisk/CrFutureAI'
import { CrClose } from '@/components/casestudy/clinicalRisk/CrClose'

export const metadata: Metadata = {
  title: 'Clinical Risk Engine — Lloyd Dela Cruz',
  description:
    'Calibrated malignancy risk scoring for biopsy triage — interactive prototype backed by a calibrated surrogate of the production ensemble, with an ambiguity flag for clinician second-review.',
}

export default function Page() {
  return (
    <div className="home2 min-h-screen">
      <HomeNav active="Work" />
      <main>
        <CrHero />
        <Reveal>
          <CrProblem />
        </Reveal>
        <Reveal>
          <CrArchitecture />
        </Reveal>
        <Reveal>
          <CrTriageDemo />
        </Reveal>
        <Reveal>
          <CrImpact />
        </Reveal>
        <Reveal>
          <CrFutureAI />
        </Reveal>
        <CrClose />
      </main>
      <SiteFooter />
    </div>
  )
}
```

- [ ] **Step 2: Verify build**

Run: `cd frontend && npm run type-check && npm run lint && npm run build`
Expected: clean. Route `/work/clinical-risk-engine` in build manifest.

- [ ] **Step 3: Confirm built HTML**

```bash
cd frontend/out && \
  grep -c "Clinical" work/clinical-risk-engine/index.html && \
  grep -c "A probability isn" work/clinical-risk-engine/index.html && \
  grep -c "Calibration is a first-class layer" work/clinical-risk-engine/index.html && \
  grep -c "One case at a time" work/clinical-risk-engine/index.html && \
  grep -c "From probability to decision" work/clinical-risk-engine/index.html
```
Expected: every grep returns ≥ 1.

- [ ] **Step 4: Commit**

```bash
git add frontend/src/app/work/clinical-risk-engine/page.tsx
git commit -m "feat(work): wire Clinical Risk page from clinicalRisk components

Replaces T2 stub with the full 7-section composition: CrHero, CrProblem,
CrArchitecture, CrTriageDemo (interactive), CrImpact, CrFutureAI,
CrClose. All inside home2 register.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 14: Retune FeaturedWork tiles (warm palette)

Convert the two Applied-AI tiles from dark wash to warm plum wash, and repaint the inline `ForecastMockup` and `TriageMockup` mini-renderings.

**Files:**
- Modify: `frontend/src/components/home/FeaturedWork.tsx`

- [ ] **Step 1: Read current state of the two tiles + mockups**

```bash
cd /Users/lloyd.vince1985gmail.com/Desktop/Software_Dev/Professional-website/frontend && \
  grep -n "APPLIED AI\|ForecastMockup\|TriageMockup\|#0A0A0B\|#7DD3FC\|#FCD34D" src/components/home/FeaturedWork.tsx
```

Note the line numbers — you will:
- Modify the 2 PROJECTS entries (`accent` + `wash` values)
- Modify the `ForecastMockup` function (palette)
- Modify the `TriageMockup` function (palette)

- [ ] **Step 2: Update the two PROJECTS entries**

In the Population-Health entry:
- Change `accent: '#7DD3FC',` → `accent: 'var(--plum)',`
- Change `wash: 'linear-gradient(135deg,#0A0A0B,#111114)',` → `wash: 'linear-gradient(135deg,#f3f0fb,#fbf7fe)',`

In the Clinical-Risk entry, the same two substitutions.

- [ ] **Step 3: Repaint `ForecastMockup`**

Replace the entire `ForecastMockup` function with:

```tsx
function ForecastMockup() {
  return (
    <div className="flex flex-1 flex-col gap-2 rounded-md bg-white/85 p-2.5 ghair">
      <div className="flex items-center gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'var(--plum)' }} />
        <span className="text-[10px] tracking-[0.12em] text-ink-muted">FORECAST · p50 38ms</span>
      </div>
      <div className="flex h-12 items-end gap-1">
        {[3, 5, 6, 7, 8, 9, 10, 11, 12, 11, 12, 13].map((h, i) => (
          <span key={i} className="w-1.5 rounded-sm" style={{ height: `${h * 6}%`, background: 'rgba(28,22,46,0.18)' }} />
        ))}
        <span className="ml-1 w-1.5 rounded-sm" style={{ height: '84%', background: 'var(--plum)' }} />
      </div>
      <Bar w="62%" c="var(--plum)" />
      <Bar w="40%" c="rgba(28,22,46,0.10)" />
    </div>
  )
}
```

- [ ] **Step 4: Repaint `TriageMockup`**

Replace the entire `TriageMockup` function with:

```tsx
function TriageMockup() {
  return (
    <div className="flex flex-1 flex-col gap-2 rounded-md bg-white/85 p-2.5 ghair">
      <div className="flex items-center gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'var(--plum)' }} />
        <span className="text-[10px] tracking-[0.12em] text-ink-muted">CASE · p(malig) 0.83</span>
      </div>
      <div className="grid grid-cols-5 gap-1">
        {Array.from({ length: 10 }).map((_, i) => (
          <span
            key={i}
            className="h-3 rounded-sm"
            style={{ background: i < 8 ? 'var(--plum)' : 'rgba(28,22,46,0.10)' }}
          />
        ))}
      </div>
      <div className="flex items-center gap-1">
        <span className="h-2 w-2" style={{ border: '1px solid var(--amber)' }} />
        <span className="text-[10px] tracking-[0.06em] text-ink-muted">AMBIGUITY FLAG</span>
      </div>
    </div>
  )
}
```

- [ ] **Step 5: Verify**

```bash
cd /Users/lloyd.vince1985gmail.com/Desktop/Software_Dev/Professional-website/frontend && \
  grep -c "#7DD3FC\|#0A0A0B\|#111114" src/components/home/FeaturedWork.tsx
```
Expected: 0.

Run: `cd frontend && npm run type-check && npm run lint && npm run build`
Expected: clean.

- [ ] **Step 6: Commit**

```bash
git add frontend/src/components/home/FeaturedWork.tsx
git commit -m "refactor(home): retune Applied-AI FeaturedWork tiles to warm plum

Switches both Applied-AI tiles from dark wash + cyan accent to warm
plum wash + plum accent, matching the rest of the operational tiles.
Repaints ForecastMockup and TriageMockup mini-renderings for the
warm register (white-tinted card backgrounds, plum data, muted ink
labels, amber ambiguity flag). Tile shapes unchanged.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 15: Reorder /work page sections

Move the Operational Platforms section above the Applied AI Systems section.

**Files:**
- Modify: `frontend/src/app/work/page.tsx`

- [ ] **Step 1: Verify current state**

Run: `cd /Users/lloyd.vince1985gmail.com/Desktop/Software_Dev/Professional-website/frontend && grep -n "Applied AI systems\|Operational platforms" src/app/work/page.tsx`
Expected: 2 hits — Applied AI first, Operational Platforms second.

- [ ] **Step 2: Swap the two sections**

Edit `frontend/src/app/work/page.tsx` to swap the order of the two sections so the **Operational platforms** section JSX comes BEFORE the **Applied AI systems** section JSX.

Specifically, replace this block:

```tsx
        {/* Applied AI systems — flagship band */}
        <section className="mx-auto max-w-[1180px] px-6 pt-12 pb-8">
          <div className="border-t border-ink/10 pt-10">
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-plum">
                  Applied AI systems
                </p>
                <h2 className="mt-2 font-display text-2xl font-bold leading-tight text-ink sm:text-3xl">
                  Operational intelligence and decision support
                </h2>
              </div>
              <p className="max-w-md text-sm leading-relaxed text-ink-soft">
                Calibrated predictive inference for public-health planning and clinician-in-the-loop triage.
                Architecture-first deep dives with live inference panels.
              </p>
            </div>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {APPLIED_AI.map((p) => (
              <WorkCard key={p.title} p={p} />
            ))}
          </div>
        </section>

        {/* Operational platforms — the rest */}
        <section className="mx-auto max-w-[1180px] px-6 pt-4 pb-16">
          <div className="border-t border-ink/10 pt-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-plum">
              Operational platforms
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold leading-tight text-ink sm:text-3xl">
              Healthcare operations, fintech, and product work
            </h2>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {OTHER.map((p) => (
              <WorkCard key={p.title} p={p} />
            ))}
          </div>
        </section>
```

with the same two sections in swapped order:

```tsx
        {/* Operational platforms */}
        <section className="mx-auto max-w-[1180px] px-6 pt-12 pb-8">
          <div className="border-t border-ink/10 pt-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-plum">
              Operational platforms
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold leading-tight text-ink sm:text-3xl">
              Healthcare operations, fintech, and product work
            </h2>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {OTHER.map((p) => (
              <WorkCard key={p.title} p={p} />
            ))}
          </div>
        </section>

        {/* Applied AI systems — flagship band, below the operational projects */}
        <section className="mx-auto max-w-[1180px] px-6 pt-4 pb-16">
          <div className="border-t border-ink/10 pt-10">
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-plum">
                  Applied AI systems
                </p>
                <h2 className="mt-2 font-display text-2xl font-bold leading-tight text-ink sm:text-3xl">
                  Operational intelligence and decision support
                </h2>
              </div>
              <p className="max-w-md text-sm leading-relaxed text-ink-soft">
                Calibrated predictive inference for public-health planning and clinician-in-the-loop triage.
                Architecture-first deep dives with live inference panels.
              </p>
            </div>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {APPLIED_AI.map((p) => (
              <WorkCard key={p.title} p={p} />
            ))}
          </div>
        </section>
```

Note the spacing changes (`pt-12 pb-8` on the first section, `pt-4 pb-16` on the second — these match the original layout rhythm, just attached to the new order).

- [ ] **Step 3: Verify**

Run: `cd frontend && npm run type-check && npm run lint && npm run build`
Expected: clean.

```bash
cd frontend/out && \
  python3 -c "import re; t=open('work/index.html').read(); op=t.find('Operational platforms'); ai=t.find('Applied AI systems'); print(f'Operational platforms at: {op}'); print(f'Applied AI systems at: {ai}'); print('Order OK' if op > 0 and ai > op else 'WRONG ORDER')"
```
Expected: `Order OK` printed.

- [ ] **Step 4: Commit**

```bash
git add frontend/src/app/work/page.tsx
git commit -m "refactor(work): place Operational platforms band before Applied AI

Reorders the two project bands on /work so the established operational
work appears first, with the newer Applied AI systems work below it.
Same partition logic, same copy — only the JSX order swaps.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 16: Full-stack verification + smoke test

**Files:** none — verification only.

- [ ] **Step 1: Run all gates**

```bash
cd /Users/lloyd.vince1985gmail.com/Desktop/Software_Dev/Professional-website/frontend && \
  npm run type-check && \
  npm run lint && \
  npm run test && \
  npm run build
```

Expected:
- type-check: clean
- lint: only the 4 pre-existing `@typescript-eslint/no-explicit-any` warnings in `src/lib/health-data-real.ts` and `src/types/dashboard.types.ts`
- test: 12 tests passing (5 population-health + 7 clinical-risk)
- build: 35 static pages, success

- [ ] **Step 2: Confirm no dark-register leftovers**

```bash
cd /Users/lloyd.vince1985gmail.com/Desktop/Software_Dev/Professional-website && \
  ls frontend/src/components/work/deep-dive 2>/dev/null; echo "exit=$?" && \
  grep -rn "deep-dive\|ScenarioConsole\|CaseTriagePanel\|--dd-\|dd-mono\|dd-card" frontend/src/ 2>/dev/null | grep -v "node_modules" | head -20
```
Expected: `exit=2` (directory gone), zero or near-zero grep hits (any hit means residual reference).

- [ ] **Step 3: Confirm built HTML content on the four touched routes**

```bash
cd /Users/lloyd.vince1985gmail.com/Desktop/Software_Dev/Professional-website/frontend/out && \
  echo "--- /work ---" && \
  grep -c "Operational platforms" work/index.html && \
  grep -c "Applied AI systems" work/index.html && \
  grep -c "Wheelchair Tracking" work/index.html && \
  grep -c "Population-Health Intelligence Platform" work/index.html && \
  echo "--- /work/population-health-intelligence ---" && \
  grep -c "Population-Health" work/population-health-intelligence/index.html && \
  grep -c "Watch the model reason" work/population-health-intelligence/index.html && \
  grep -c "From indicators to a planner console" work/population-health-intelligence/index.html && \
  echo "--- /work/clinical-risk-engine ---" && \
  grep -c "Clinical Risk Engine" work/clinical-risk-engine/index.html && \
  grep -c "One case at a time" work/clinical-risk-engine/index.html && \
  grep -c "Calibration is a first-class layer" work/clinical-risk-engine/index.html && \
  echo "--- /dashboards/life-expectancy (shim) ---" && \
  grep -c "This case study has moved" dashboards/life-expectancy/index.html && \
  grep -c "/work/population-health-intelligence" dashboards/life-expectancy/index.html
```
Expected: every grep returns ≥ 1.

- [ ] **Step 4: Confirm no constraint violations**

```bash
cd /Users/lloyd.vince1985gmail.com/Desktop/Software_Dev/Professional-website/frontend/out && \
  echo "--- DARK BACKGROUNDS ---" && \
  grep -cE "bg-\[#0A0A0B\]|#0A0A0B|#111114" work/population-health-intelligence/index.html work/clinical-risk-engine/index.html dashboards/life-expectancy/index.html && \
  echo "--- CYAN ACCENT ---" && \
  grep -c "#7DD3FC" work/population-health-intelligence/index.html work/clinical-risk-engine/index.html dashboards/life-expectancy/index.html work/index.html index.html
```
Expected: 0 across both checks. Dark colors and cyan accent are gone.

- [ ] **Step 5: Visual smoke test**

```bash
cd /Users/lloyd.vince1985gmail.com/Desktop/Software_Dev/Professional-website/frontend && npm run dev
```

Walk through:

| URL | What to confirm |
|---|---|
| `http://localhost:3001/` | FeaturedWork shows two Applied-AI tiles with warm plum wash (NOT dark). ForecastMockup + TriageMockup mini-renderings are warm-themed. |
| `http://localhost:3001/work` | Operational Platforms band appears FIRST (Wheelchair / EquiTrackr / SpendWise / Apex). Applied AI systems band appears SECOND (Population-Health / Clinical-Risk). |
| `http://localhost:3001/work/population-health-intelligence` | Warm cream/plum register matching wheelchair-tracking. Hero with PhSystemMap glyph. Architecture spine + 4 cards. PhForecastDemo auto-cycles through 3 steps; sliders pause the cycle; country dropdown resets to defaults. |
| `http://localhost:3001/work/clinical-risk-engine` | Same warm register. CrTriageDemo auto-cycles through 3 cases (benign → ambiguous → malignant); ambiguity flag pulses amber on the ambiguous case; case dropdown lets you pick any of 5 cases. |
| `http://localhost:3001/dashboards/life-expectancy` | Shim renders inside warm `home2` register with "Open the new deep dive" plum link. |

If any URL shows the dark `.deep-dive` register, the wrong tile palette, or the demos don't auto-cycle, surface the issue.

Stop dev server.

- [ ] **Step 6: Ready for review**

The branch is complete. Use `superpowers:finishing-a-development-branch` to merge or open a PR.

---

## Self-Review

**Spec coverage (against `2026-05-13-applied-ai-warm-rebuild-design.md`):**

| Spec section | Covered by |
|---|---|
| §1 Goal — warm register, less prose, interactive centerpiece, /work reorder | T4–T13 (warm components + pages), T15 (reorder) |
| §2 Deletions: deep-dive/, ScenarioConsole, CaseTriagePanel, globals.css @import | T3 |
| §2 Modify: /work/page.tsx, FeaturedWork.tsx, /dashboards/life-expectancy, both /work pages | T15, T14, T1, T2/T8/T13 |
| §2 Keep: surrogate + tests + retargeted SystemsToolchain links | Implicit (no task touches them) |
| §2 Add: popHealth/ + clinicalRisk/ component families | T4–T7, T9–T12 |
| §3 Visual register binding | Every component task uses `home2` + var(--plum) tokens; no `.deep-dive` anywhere |
| §3 No-go list | T16 grep checks confirm no dark colors / cyan / mono classes |
| §4 Shared anatomy + 7 sections | T4–T7 (popHealth) + T9–T12 (clinicalRisk) |
| §5 Project 1 hero, problem, architecture, demo, impact, future, close | T4, T5, T6, T7 |
| §5.4 PhForecastDemo (auto-cycle, manual override, surrogate-backed) | T6 |
| §6 Project 2 hero, problem, architecture, demo, impact, future, close | T9, T10, T11, T12 |
| §6.4 CrTriageDemo (ambiguity flag pulse) | T11 |
| §7 /work reorder (Operational first) | T15 |
| §8 FeaturedWork warm retune (tile + mockups) | T14 |
| §9 /dashboards/life-expectancy shim | T1 |
| §10 Testing — 12 unit tests preserved, gates per task | T3 verifies tests, T16 final |
| §11 Open questions — animate-pulse for ambiguity flag (used in T11), inline SVG glyphs in Hero files (T4, T9), no chip strip | All resolved in plan |

**Placeholder scan:** No TBD / TODO / "implement later" / "similar to Task N" / handwave verification. Every code step has complete code; every verify step names the command and expected outcome.

**Type consistency:**
- `Country`, `InputVector`, `Weights` from `surrogate.ts` used in T6. ✓
- `WdbcFeatures` from `surrogate.ts` used in T11. ✓
- `predict`, `attributions`, `COUNTRIES`, `WEIGHTS` imports in T6 match exports of existing surrogate module. ✓
- `predictMalignancy`, `ambiguityFlag` imports in T11 match exports of existing clinical-risk surrogate. ✓
- `casesJson` import in T11 matches existing JSON shape. ✓
- All Ph* and Cr* component exports named in T8 / T13 page composition tasks. ✓
- `Reveal` component imported in T8 / T13 matches the import path used in `/work/wheelchair-tracking/page.tsx`. ✓

No issues found.
