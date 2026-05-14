# Healthcare Automation Engine — Case Study Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the placeholder route at `/work/healthcare-automation-engine` with a complete 8-section prototype-tier case study, register the project in `ProjectMeta`, and reframe the homepage `FeaturedWork` card from `concept` → `prototype`.

**Architecture:** Server-rendered Next.js sections under `frontend/src/components/casestudy/automationEngine/`, one `'use client'` interactive section for the flow demo, deterministic fixtures under `frontend/src/components/work/automation-engine/data.ts`, all rendered inside the `home2` warm register matching `clinical-genai-pipeline`.

**Tech Stack:** Next.js 14 (App Router), TypeScript, Tailwind, Lucide icons, vitest + @testing-library/react. No new dependencies.

**Spec:** `docs/superpowers/specs/2026-05-14-healthcare-automation-engine-case-study-design.md`

---

## Path convention note (binding)

The spec proposed `frontend/src/components/casestudy/automationEngine/data.ts`. The existing project convention (mirrored from `clinical-genai-pipeline`) places fixtures under `frontend/src/components/work/<slug>/data.ts` with tests in `__tests__/`. **This plan follows the project convention**, not the spec's placement, so the new structure is:

```
frontend/src/components/casestudy/automationEngine/      ← UI components (Ae*.tsx)
frontend/src/components/work/automation-engine/data.ts   ← fixtures + types
frontend/src/components/work/automation-engine/__tests__/data.test.ts
```

UI components import via `@/components/work/automation-engine/data`.

---

## File map

### Create
```
frontend/src/components/casestudy/automationEngine/AeHero.tsx
frontend/src/components/casestudy/automationEngine/AeProblem.tsx
frontend/src/components/casestudy/automationEngine/AeArchitecture.tsx
frontend/src/components/casestudy/automationEngine/AeFlowDemo.tsx          ('use client')
frontend/src/components/casestudy/automationEngine/AePatterns.tsx
frontend/src/components/casestudy/automationEngine/AeReliability.tsx
frontend/src/components/casestudy/automationEngine/AeImpact.tsx
frontend/src/components/casestudy/automationEngine/AeClose.tsx
frontend/src/components/work/automation-engine/data.ts
frontend/src/components/work/automation-engine/__tests__/data.test.ts
```

### Modify
```
frontend/src/lib/projects.ts                              (add registry entry)
frontend/src/lib/projects.test.ts                         (add slug to expected list)
frontend/src/components/home/FeaturedWork.tsx             (status flip + body refresh)
frontend/src/components/home/FeaturedWork.test.tsx        (update body assertion if present)
frontend/src/app/work/healthcare-automation-engine/page.tsx (replace PlaceholderCaseStudy with composition)
```

### Delete
None. `PlaceholderCaseStudy` component stays — other routes may still use it.

---

## Phase 1 — Foundation (data, registry, card)

### Task 1: Flow demo fixtures + types

**Files:**
- Create: `frontend/src/components/work/automation-engine/data.ts`
- Test: `frontend/src/components/work/automation-engine/__tests__/data.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
// frontend/src/components/work/automation-engine/__tests__/data.test.ts
import { describe, expect, it } from 'vitest'
import {
  FLOW,
  STEP_KINDS,
  ACTION_SURFACES,
  type FlowScenario,
  type FlowStep,
  type FlowAction,
} from '../data'

describe('automation-engine flow fixture', () => {
  it('exposes one named scenario', () => {
    expect(FLOW.scenarioId).toBe('wheelchair-needs-service')
    expect(FLOW.trigger.source).toMatch(/Microsoft Lists/i)
  })

  it('has exactly 5 orchestration steps with stable ids 1..5', () => {
    expect(FLOW.steps).toHaveLength(5)
    FLOW.steps.forEach((s, i) => {
      expect(s.id).toBe(i + 1)
      expect(STEP_KINDS).toContain(s.kind)
      expect(s.label.length).toBeGreaterThan(0)
    })
  })

  it('has at least one orchestration step of kind "function"', () => {
    expect(FLOW.steps.some((s) => s.kind === 'function')).toBe(true)
  })

  it('every action references an allowed Microsoft Graph surface', () => {
    FLOW.actions.forEach((a: FlowAction) => {
      expect(ACTION_SURFACES).toContain(a.surface)
      expect(['POST', 'PATCH']).toContain(a.method)
      expect(a.path.startsWith('/')).toBe(true)
    })
  })

  it('produces a deterministic correlation id and ok outcome', () => {
    expect(FLOW.audit.correlationId).toMatch(/^[A-Za-z0-9-]+$/)
    expect(FLOW.audit.outcome).toBe('ok')
    expect(FLOW.audit.durationMs).toBeGreaterThan(0)
  })

  it('FlowScenario type compiles when referenced', () => {
    const sample: FlowScenario = FLOW
    const step: FlowStep = sample.steps[0]
    expect(step.id).toBe(1)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
cd frontend && npm run test -- src/components/work/automation-engine/__tests__/data.test.ts
```

Expected: FAIL with `Cannot find module '../data'`.

- [ ] **Step 3: Write the data module**

```ts
// frontend/src/components/work/automation-engine/data.ts
// Deterministic fixtures for the AeFlowDemo component.
// All values are hand-authored. No external calls; no real tenant data.

export const STEP_KINDS = ['trigger', 'function', 'branch', 'action', 'persist'] as const
export type StepKind = (typeof STEP_KINDS)[number]

export const STEP_ICONS = ['Webhook', 'Cloud', 'GitBranch', 'Send', 'Database'] as const
export type StepIcon = (typeof STEP_ICONS)[number]

export const ACTION_SURFACES = ['Teams', 'Planner', 'Lists'] as const
export type ActionSurface = (typeof ACTION_SURFACES)[number]

export interface FlowStep {
  id: 1 | 2 | 3 | 4 | 5
  label: string
  icon: StepIcon
  kind: StepKind
  /** ≤30 words. Shown as the active-step caption. */
  caption: string
}

export interface FlowAction {
  method: 'POST' | 'PATCH'
  path: string
  surface: ActionSurface
  /** Step id (1..5) at which this action becomes visible. */
  emittedAtStep: 1 | 2 | 3 | 4 | 5
}

export interface FlowAudit {
  correlationId: string
  outcome: 'ok' | 'retry' | 'fail'
  durationMs: number
}

export interface FlowTrigger {
  source: string
  payload: Record<string, unknown>
}

export interface FlowScenario {
  scenarioId: 'wheelchair-needs-service'
  trigger: FlowTrigger
  steps: FlowStep[]
  actions: FlowAction[]
  audit: FlowAudit
}

export const FLOW: FlowScenario = {
  scenarioId: 'wheelchair-needs-service',
  trigger: {
    source: 'Microsoft Lists · trigger: item changed',
    payload: {
      list: 'Assets',
      itemId: 'A-0427',
      assetType: 'wheelchair',
      site: 'Site A',
      previousStatus: 'in-service',
      currentStatus: 'needs_service',
      changedBy: 'biomed.tech@site',
    },
  },
  steps: [
    {
      id: 1,
      label: 'Trigger fires',
      icon: 'Webhook',
      kind: 'trigger',
      caption: 'List item change arrives. Flow run starts with a fresh correlation id.',
    },
    {
      id: 2,
      label: 'Classify severity',
      icon: 'Cloud',
      kind: 'function',
      caption: 'Azure Function inspects asset type and prior service history; returns severity = high.',
    },
    {
      id: 3,
      label: 'Route channel',
      icon: 'GitBranch',
      kind: 'branch',
      caption: 'Severity branch selects the biomed on-call channel and posts a structured incident card to Teams.',
    },
    {
      id: 4,
      label: 'Open task',
      icon: 'Send',
      kind: 'action',
      caption: 'Planner task created in the biomed repair bucket, due same shift, linked back to the asset.',
    },
    {
      id: 5,
      label: 'Update + audit',
      icon: 'Database',
      kind: 'persist',
      caption: 'Asset lifecycle stage advanced and one row appended to the flow audit list with outcome and duration.',
    },
  ],
  actions: [
    { method: 'POST',  path: '/teams/{teamId}/channels/{channelId}/messages', surface: 'Teams',   emittedAtStep: 3 },
    { method: 'POST',  path: '/planner/tasks',                                 surface: 'Planner', emittedAtStep: 4 },
    { method: 'PATCH', path: '/sites/{siteId}/lists/{listId}/items/{itemId}',  surface: 'Lists',   emittedAtStep: 5 },
  ],
  audit: {
    correlationId: 'flow-7c93a1',
    outcome: 'ok',
    durationMs: 1840,
  },
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
cd frontend && npm run test -- src/components/work/automation-engine/__tests__/data.test.ts
```

Expected: all 6 tests pass.

- [ ] **Step 5: Commit**

```bash
git add frontend/src/components/work/automation-engine/data.ts \
        frontend/src/components/work/automation-engine/__tests__/data.test.ts
git commit -m "$(cat <<'EOF'
feat(automation-engine): add deterministic flow fixture and types

Five-step orchestration scenario (Lists trigger → severity classification
→ Teams + Planner + Lists fan-out + audit) used by the AeFlowDemo
interactive. Hand-authored, no external calls, no real tenant data.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 2: ProjectMeta registry entry

**Files:**
- Modify: `frontend/src/lib/projects.ts`
- Modify: `frontend/src/lib/projects.test.ts`

- [ ] **Step 1: Extend the expected-slug test**

Open `frontend/src/lib/projects.test.ts` and edit the `expected` array in the third test:

```ts
  it('contains all eight in-scope projects', () => {
    const expected = [
      'wheelchair-tracking',
      'clinical-risk-engine',
      'population-health-intelligence',
      'clinical-genai-pipeline',
      'apex-protocol',
      'equitrackr',
      'spendwise',
      'website-gemms',
      'healthcare-automation-engine',
    ]
    expected.forEach((slug) => {
      expect(PROJECTS[slug]).toBeDefined()
    })
  })
```

> Note: the original test title says "seven in-scope projects" and the array contains seven slugs. If `clinical-genai-pipeline` is already present in the array (from the genai case study work), do not duplicate it — only add `healthcare-automation-engine`. Update the count in the title to match the final length of `expected`.

- [ ] **Step 2: Run the registry test to verify it fails**

```bash
cd frontend && npm run test -- src/lib/projects.test.ts
```

Expected: FAIL with `PROJECTS['healthcare-automation-engine']` undefined.

- [ ] **Step 3: Add the registry entry**

In `frontend/src/lib/projects.ts`, add the following entry inside the `PROJECTS` object, placed after the `'clinical-genai-pipeline'` entry (or wherever keeps the file's organizational order):

```ts
  'healthcare-automation-engine': {
    slug: 'healthcare-automation-engine',
    title: 'Enterprise Healthcare Workflow Automation Engine',
    status: 'prototype',
    role: 'System design · Power Platform & Azure engineering',
    period: '2025',
    deployment: 'Built prototypes · Microsoft 365 enterprise tenant',
    stack: ['Power Automate', 'Azure Functions', 'Microsoft Graph', 'SharePoint / Lists', 'Webhooks', 'TypeScript'],
    scale: '4 reusable patterns · cross-system orchestration',
  },
```

- [ ] **Step 4: Run all registry-related tests**

```bash
cd frontend && npm run test -- src/lib/projects.test.ts
```

Expected: all tests pass; no `slug must match key` failure.

- [ ] **Step 5: Commit**

```bash
git add frontend/src/lib/projects.ts frontend/src/lib/projects.test.ts
git commit -m "$(cat <<'EOF'
feat(projects): register healthcare-automation-engine as prototype

Adds the ProjectMeta record so the case study page renders its metadata
aside (status, role, period, deployment, stack chips, scale) instead of
silently returning null.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 3: FeaturedWork card — flip status, refresh body

**Files:**
- Modify: `frontend/src/components/home/FeaturedWork.tsx`
- Modify: `frontend/src/components/home/FeaturedWork.test.tsx`

- [ ] **Step 1: Read the current card entry and the existing test assertions**

```bash
grep -n "Enterprise Healthcare Workflow Automation Engine\|healthcare-automation-engine\|concept" \
  frontend/src/components/home/FeaturedWork.tsx \
  frontend/src/components/home/FeaturedWork.test.tsx
```

Confirm: the entry currently has `status: 'concept'` and a body referencing "real-time healthcare workflow automation". The existing test file (per spec inventory) does not assert on this specific card's `status` or `body` — only on its title, order, and href. If a new assertion is needed it goes in Step 2.

- [ ] **Step 2: Add a failing assertion that pins the new status + body**

In `frontend/src/components/home/FeaturedWork.test.tsx`, append a new test inside the `describe('FeaturedWork — composition', …)` block:

```ts
  it('automation engine card is prototype-tier with built-prototype framing', () => {
    const ae = PROJECTS.find((p) => p.href === '/work/healthcare-automation-engine')
    expect(ae).toBeDefined()
    expect(ae!.status).toBe('prototype')
    expect(ae!.body).toMatch(/built prototypes/i)
    expect(ae!.body).toMatch(/microsoft 365/i)
  })
```

- [ ] **Step 3: Run the test to verify it fails**

```bash
cd frontend && npm run test -- src/components/home/FeaturedWork.test.tsx
```

Expected: the new test FAILs (status is still `'concept'`; body does not contain "built prototypes").

- [ ] **Step 4: Update the card entry**

In `frontend/src/components/home/FeaturedWork.tsx`, locate the `PROJECTS[2]` entry (the automation engine). Change only these two fields:

```ts
    status: 'prototype',
    body: 'Power Automate flows, Azure Functions, and webhook orchestration wired into the Microsoft 365 ecosystem — built prototypes of the patterns that turn manual hospital handoffs into event-driven workflows.',
```

Leave `badge`, `TagIcon`, `variant`, `accent`, `wash`, `title`, `stack`, `href`, `capabilities` unchanged.

- [ ] **Step 5: Run all FeaturedWork tests to verify they pass**

```bash
cd frontend && npm run test -- src/components/home/FeaturedWork.test.tsx
```

Expected: all tests pass, including the new assertion.

- [ ] **Step 6: Commit**

```bash
git add frontend/src/components/home/FeaturedWork.tsx \
        frontend/src/components/home/FeaturedWork.test.tsx
git commit -m "$(cat <<'EOF'
fix(home): reframe automation engine card from concept to prototype

Aligns the homepage card with the case study's honest framing — the
underlying work is built prototypes inside a Microsoft 365 tenant, not
a concept. Refreshes the body copy to match.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Phase 2 — Section components

All sections sit under `frontend/src/components/casestudy/automationEngine/` and use the shared `CsSection`, `Module`, `Chip`, `Eyebrow` primitives from `../bits`. Only `AeFlowDemo` is `'use client'`; all others are server components.

### Task 4: AeHero

**Files:**
- Create: `frontend/src/components/casestudy/automationEngine/AeHero.tsx`

- [ ] **Step 1: Create the file**

```tsx
// frontend/src/components/casestudy/automationEngine/AeHero.tsx
import Link from 'next/link'
import { Webhook, Workflow, Cloud, Send } from 'lucide-react'
import { Eyebrow } from '../bits'

const META = [
  { label: 'Role',    value: 'System design · Power Platform & Azure engineering' },
  { label: 'Inputs',  value: 'Forms, list changes, schedules, webhooks' },
  { label: 'Output',  value: 'Teams alerts, Lists writes, Planner tasks, audit log' },
  { label: 'Status',  value: 'Prototype patterns' },
]

const NODE_ICONS = [Webhook, Workflow, Cloud, Send]

export function AeHero() {
  return (
    <section className="mx-auto max-w-[1180px] px-6 pt-16 pb-10">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
        <div>
          <Eyebrow>Cloud automation · Event-driven systems</Eyebrow>
          <h1 className="mt-3 max-w-3xl font-display text-[2.4rem] font-extrabold leading-[1.08] text-ink sm:text-5xl">
            Enterprise Healthcare Workflow Automation Engine
          </h1>
          <p className="mt-5 max-w-2xl text-[1.05rem] leading-relaxed text-ink-soft">
            The connective tissue between Microsoft 365, custom apps, and clinical operations — turning manual handoffs into event-driven workflows.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="#demo"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--plum)] px-4 py-2 text-sm font-semibold text-white"
            >
              See a flow run
            </Link>
            <Link
              href="#problem"
              className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink ghair"
            >
              Start from the problem
            </Link>
          </div>
        </div>

        <div
          className="relative h-44 rounded-2xl bg-white p-6 ghair soft-shadow-sm"
          role="img"
          aria-label="Four-node signal flow: trigger to orchestrator to cloud to action"
        >
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 320 160" fill="none" aria-hidden="true">
            <path
              d="M40 80 H280"
              stroke="var(--blue)"
              strokeOpacity="0.35"
              strokeWidth="1.6"
              strokeDasharray="2 4"
            />
          </svg>
          <div className="relative grid h-full grid-cols-4 items-center">
            {NODE_ICONS.map((Icon, i) => (
              <div key={i} className="flex justify-center">
                <span
                  className="grid h-11 w-11 place-items-center rounded-full bg-[var(--cream-2)] ghair"
                  style={{ color: 'var(--blue)' }}
                >
                  <Icon size={20} strokeWidth={1.8} />
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <dl className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {META.map((m) => (
          <div key={m.label} className="rounded-xl bg-white p-4 ghair">
            <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-muted">{m.label}</dt>
            <dd className="mt-1 text-sm text-ink">{m.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
```

- [ ] **Step 2: Type-check**

```bash
cd frontend && npm run type-check
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add frontend/src/components/casestudy/automationEngine/AeHero.tsx
git commit -m "feat(automation-engine): add AeHero section

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 5: AeProblem

**Files:**
- Create: `frontend/src/components/casestudy/automationEngine/AeProblem.tsx`

- [ ] **Step 1: Create the file**

```tsx
// frontend/src/components/casestudy/automationEngine/AeProblem.tsx
import { MessageSquare, RefreshCw, AlertTriangle } from 'lucide-react'
import { CsSection, Module } from '../bits'

const CALLOUTS = [
  { Icon: MessageSquare,  label: 'Manual coordination' },
  { Icon: RefreshCw,      label: 'Repetitive handoffs' },
  { Icon: AlertTriangle,  label: 'Missed escalations' },
]

export function AeProblem() {
  return (
    <CsSection
      id="problem"
      eyebrow="01 · Problem"
      title="Hospitals run on glue work."
      footnote="Lloyd has spent 9+ years inside hospital operations — the handoff patterns and ecosystem constraints are first-hand."
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-4 text-[1.02rem] leading-relaxed text-ink-soft">
          <p>
            Most hospital operations live in Microsoft 365 — Lists, SharePoint, Forms, Teams, Outlook — plus a fragmented set of custom apps. The handoffs <em>between</em> them are largely manual: copy-paste, email chains, &ldquo;did you see my Teams message?&rdquo;
          </p>
          <p>
            Operations leaders lose hours each week to coordination work that should be automatic. The work is small, repetitive, and exactly the work event-driven systems were built to handle.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {CALLOUTS.map(({ Icon, label }) => (
            <Module key={label} className="flex items-center gap-3 p-4">
              <span
                className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[var(--cream-2)]"
                style={{ color: 'var(--blue)' }}
              >
                <Icon size={17} strokeWidth={1.9} />
              </span>
              <span className="text-sm font-medium text-ink">{label}</span>
            </Module>
          ))}
        </div>
      </div>
    </CsSection>
  )
}
```

- [ ] **Step 2: Type-check**

```bash
cd frontend && npm run type-check
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add frontend/src/components/casestudy/automationEngine/AeProblem.tsx
git commit -m "feat(automation-engine): add AeProblem section

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 6: AeArchitecture

**Files:**
- Create: `frontend/src/components/casestudy/automationEngine/AeArchitecture.tsx`

- [ ] **Step 1: Create the file**

```tsx
// frontend/src/components/casestudy/automationEngine/AeArchitecture.tsx
import { Webhook, Workflow, Send, Database } from 'lucide-react'
import { CsSection, Module, Chip } from '../bits'

type Layer = {
  title: string
  Icon: typeof Webhook
  color: string
  examples: string[]
}

const LAYERS: Layer[] = [
  {
    title: 'Trigger surface',
    Icon: Webhook,
    color: 'var(--blue)',
    examples: ['Forms submitted', 'List item changed', 'Schedule (CRON)', 'External webhook'],
  },
  {
    title: 'Orchestration',
    Icon: Workflow,
    color: 'var(--plum)',
    examples: ['Power Automate flow', 'Azure Function', 'Branching + retry', 'Secrets via Key Vault'],
  },
  {
    title: 'Action surface',
    Icon: Send,
    color: 'var(--green)',
    examples: ['Teams channel post', 'Lists write', 'Planner task', 'Email + Calendar'],
  },
]

export function AeArchitecture() {
  return (
    <CsSection
      eyebrow="02 · System architecture"
      title="Three layers, composable across the Microsoft ecosystem."
      intro="Trigger surfaces fan into an orchestration layer that calls action surfaces — the same shape for every automation."
      footnote="Built prototypes inside a Microsoft 365 enterprise tenant. Not yet deployed at platform scale."
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {LAYERS.map((layer) => (
          <Module key={layer.title} className="p-5">
            <div className="flex items-center gap-3">
              <span
                className="grid h-9 w-9 place-items-center rounded-lg bg-[var(--cream-2)]"
                style={{ color: layer.color }}
              >
                <layer.Icon size={18} strokeWidth={1.9} />
              </span>
              <h3 className="font-display text-base font-bold text-ink">{layer.title}</h3>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {layer.examples.map((ex) => (
                <Chip key={ex} tone="neutral">{ex}</Chip>
              ))}
            </div>
          </Module>
        ))}
      </div>

      <div
        className="mt-8 rounded-2xl bg-white p-6 ghair soft-shadow-sm"
        role="img"
        aria-label="Flow diagram: trigger feeds orchestration which fans out to actions, with an audit branch from orchestration"
      >
        <svg viewBox="0 0 720 200" className="h-44 w-full" fill="none" aria-hidden="true">
          {/* spine */}
          <path d="M90 90 H310" stroke="var(--blue)" strokeWidth="1.8" strokeDasharray="3 4" />
          <path d="M410 90 H630" stroke="var(--blue)" strokeWidth="1.8" strokeDasharray="3 4" />
          {/* audit branch */}
          <path d="M360 110 V170 H540" stroke="rgba(28,22,46,0.35)" strokeWidth="1.5" strokeDasharray="2 4" />
          {/* arrows */}
          <path d="M300 86 L312 90 L300 94 Z" fill="var(--blue)" />
          <path d="M620 86 L632 90 L620 94 Z" fill="var(--blue)" />
          <path d="M528 166 L542 170 L528 174 Z" fill="rgba(28,22,46,0.6)" />

          {/* node 1 — trigger */}
          <g transform="translate(20, 60)">
            <rect width="140" height="60" rx="12" fill="white" stroke="rgba(28,22,46,0.12)" />
            <text x="70" y="28" textAnchor="middle" fill="var(--ink)" fontSize="13" fontWeight="600">Trigger</text>
            <text x="70" y="46" textAnchor="middle" fill="rgba(28,22,46,0.55)" fontSize="10">List · webhook · CRON</text>
          </g>
          {/* node 2 — orchestration */}
          <g transform="translate(290, 60)">
            <rect width="140" height="60" rx="12" fill="white" stroke="rgba(28,22,46,0.12)" />
            <text x="70" y="28" textAnchor="middle" fill="var(--ink)" fontSize="13" fontWeight="600">Orchestration</text>
            <text x="70" y="46" textAnchor="middle" fill="rgba(28,22,46,0.55)" fontSize="10">Flow + Azure Function</text>
          </g>
          {/* node 3 — actions */}
          <g transform="translate(560, 60)">
            <rect width="140" height="60" rx="12" fill="white" stroke="rgba(28,22,46,0.12)" />
            <text x="70" y="28" textAnchor="middle" fill="var(--ink)" fontSize="13" fontWeight="600">Actions</text>
            <text x="70" y="46" textAnchor="middle" fill="rgba(28,22,46,0.55)" fontSize="10">Microsoft Graph</text>
          </g>
          {/* node 4 — audit */}
          <g transform="translate(420, 150)">
            <rect width="140" height="40" rx="10" fill="var(--cream-2)" stroke="rgba(28,22,46,0.12)" />
            <text x="70" y="25" textAnchor="middle" fill="rgba(28,22,46,0.7)" fontSize="12" fontWeight="500">Audit log</text>
          </g>
        </svg>
      </div>
    </CsSection>
  )
}
```

- [ ] **Step 2: Type-check**

```bash
cd frontend && npm run type-check
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add frontend/src/components/casestudy/automationEngine/AeArchitecture.tsx
git commit -m "feat(automation-engine): add AeArchitecture section

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 7: AeFlowDemo (interactive)

**Files:**
- Create: `frontend/src/components/casestudy/automationEngine/AeFlowDemo.tsx`

- [ ] **Step 1: Create the file**

```tsx
// frontend/src/components/casestudy/automationEngine/AeFlowDemo.tsx
'use client'

import { useEffect, useState } from 'react'
import {
  Play, Pause, RotateCcw,
  Webhook, Cloud, GitBranch, Send, Database,
  CheckCircle2, ArrowRight,
} from 'lucide-react'
import { usePrefersReducedMotion } from '@/lib/hooks/usePrefersReducedMotion'
import { CsSection, Module, Chip } from '../bits'
import { FLOW, type StepIcon } from '@/components/work/automation-engine/data'

const ICON_MAP: Record<StepIcon, typeof Webhook> = {
  Webhook,
  Cloud,
  GitBranch,
  Send,
  Database,
}

const CYCLE_MS = 2200

type StepStatus = 'pending' | 'running' | 'done'

function statusFor(stepId: number, activeStep: number): StepStatus {
  if (stepId < activeStep) return 'done'
  if (stepId === activeStep) return 'running'
  return 'pending'
}

export function AeFlowDemo() {
  const reduced = usePrefersReducedMotion()
  const [activeStep, setActiveStep] = useState<number>(reduced ? FLOW.steps.length : 1)
  const [playing, setPlaying] = useState<boolean>(!reduced)

  useEffect(() => {
    if (!playing) return
    const t = setInterval(() => {
      setActiveStep((s) => (s >= FLOW.steps.length ? 1 : s + 1))
    }, CYCLE_MS)
    return () => clearInterval(t)
  }, [playing])

  const visibleActions = FLOW.actions.filter((a) => a.emittedAtStep <= activeStep)
  const auditVisible = activeStep >= FLOW.steps.length
  const currentCaption = FLOW.steps.find((s) => s.id === activeStep)?.caption ?? ''

  function handleStepClick(id: number) {
    setPlaying(false)
    setActiveStep(id)
  }

  return (
    <CsSection
      id="demo"
      eyebrow="03 · One flow, end-to-end"
      title="Watch one handoff become a workflow."
      intro="A trigger fires, the orchestrator decides, actions fan out, and everything is logged. Step through it or let it run."
      footnote="Representative built prototype. Concrete example shown to illustrate the shape — the same scaffold is reused across the patterns shown next."
    >
      <div
        aria-live="polite"
        className="sr-only"
      >
        {`Step ${activeStep} of ${FLOW.steps.length}: ${currentCaption}`}
      </div>

      <div className="mb-5 flex items-center gap-2">
        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          className="inline-flex items-center gap-2 rounded-full bg-[var(--plum)] px-3 py-1.5 text-xs font-semibold text-white"
        >
          {playing ? <Pause size={13} /> : <Play size={13} />}
          {playing ? 'Pause' : 'Run flow'}
        </button>
        <button
          type="button"
          onClick={() => { setPlaying(false); setActiveStep(1) }}
          className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-ink ghair"
        >
          <RotateCcw size={13} /> Reset
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Zone 1 — trigger payload */}
        <Module className="p-5">
          <header className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-muted">
            {FLOW.trigger.source}
          </header>
          <pre className="mt-3 overflow-auto rounded-lg bg-[var(--cream-2)] p-3 text-[11px] leading-snug text-ink-soft">
{JSON.stringify(FLOW.trigger.payload, null, 2)}
          </pre>
        </Module>

        {/* Zone 2 — orchestration */}
        <Module className="p-5">
          <header className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-muted">
            Orchestration
          </header>
          <ol className="mt-3 space-y-2">
            {FLOW.steps.map((step) => {
              const status = statusFor(step.id, activeStep)
              const Icon = ICON_MAP[step.icon]
              return (
                <li key={step.id}>
                  <button
                    type="button"
                    aria-pressed={status === 'running'}
                    onClick={() => handleStepClick(step.id)}
                    className="flex w-full items-center gap-3 rounded-lg p-2 text-left transition-all duration-300"
                    style={{
                      background:
                        status === 'running'
                          ? 'rgba(59,130,246,0.10)'
                          : status === 'done'
                            ? 'rgba(16,185,129,0.08)'
                            : 'transparent',
                      border:
                        status === 'running'
                          ? '1px solid rgba(59,130,246,0.35)'
                          : '1px solid rgba(28,22,46,0.06)',
                    }}
                  >
                    <span
                      className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-white"
                      style={{
                        color:
                          status === 'done'
                            ? 'var(--green)'
                            : status === 'running'
                              ? 'var(--blue)'
                              : 'rgba(28,22,46,0.4)',
                      }}
                    >
                      {status === 'done' ? <CheckCircle2 size={15} /> : <Icon size={14} />}
                    </span>
                    <span className="flex-1 text-[12px] font-medium text-ink">{step.label}</span>
                    <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
                      {step.kind}
                    </span>
                  </button>
                </li>
              )
            })}
          </ol>
          <p className="mt-3 text-[11px] italic leading-snug text-ink-soft">{currentCaption}</p>
        </Module>

        {/* Zone 3 — actions & audit */}
        <div className="flex flex-col gap-4">
          <Module className="p-5">
            <header className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-muted">
              Actions fanned out
            </header>
            <ul className="mt-3 space-y-2">
              {FLOW.actions.map((a) => {
                const visible = a.emittedAtStep <= activeStep
                return (
                  <li
                    key={a.path}
                    className="flex items-center gap-2 rounded-md bg-[var(--cream-2)] p-2"
                    style={{ opacity: visible ? 1 : 0.35 }}
                  >
                    <Chip tone={visible ? 'green' : 'neutral'}>{a.method}</Chip>
                    <code className="flex-1 truncate text-[10.5px] text-ink">{a.path}</code>
                    <span className="text-[10px] text-ink-muted">{a.surface}</span>
                    {visible && <CheckCircle2 size={13} style={{ color: 'var(--green)' }} />}
                  </li>
                )
              })}
            </ul>
            {visibleActions.length === 0 && (
              <p className="mt-2 text-[10px] italic text-ink-muted">Awaiting orchestration…</p>
            )}
          </Module>

          <Module className="p-5">
            <header className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-muted">
              Audit log
            </header>
            <div
              className="mt-3 flex items-center gap-3 rounded-md bg-[var(--cream-2)] p-3"
              style={{ opacity: auditVisible ? 1 : 0.35 }}
            >
              <ArrowRight size={14} style={{ color: 'var(--blue)' }} />
              <code className="flex-1 text-[10.5px] text-ink">
                {FLOW.audit.correlationId} · outcome={FLOW.audit.outcome} · {FLOW.audit.durationMs}ms
              </code>
            </div>
          </Module>
        </div>
      </div>
    </CsSection>
  )
}
```

- [ ] **Step 2: Type-check**

```bash
cd frontend && npm run type-check
```

Expected: no errors.

- [ ] **Step 3: Smoke-test in dev**

```bash
cd frontend && npm run dev
```

Open `http://localhost:3001/work/healthcare-automation-engine` once Task 12 is done. For now, briefly confirm no compile error appears in the terminal output, then stop the dev server.

- [ ] **Step 4: Commit**

```bash
git add frontend/src/components/casestudy/automationEngine/AeFlowDemo.tsx
git commit -m "feat(automation-engine): add AeFlowDemo interactive section

Auto-cycling 5-step orchestration walkthrough with trigger payload,
orchestration step list, action fan-out, and audit log panels. Respects
prefers-reduced-motion (auto-cycle disabled, fully expanded on mount).

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 8: AePatterns

**Files:**
- Create: `frontend/src/components/casestudy/automationEngine/AePatterns.tsx`

- [ ] **Step 1: Create the file**

```tsx
// frontend/src/components/casestudy/automationEngine/AePatterns.tsx
import { AlertTriangle, ClipboardList, RefreshCw, Share2 } from 'lucide-react'
import { CsSection, Module, Chip } from '../bits'

type Pattern = {
  Icon: typeof AlertTriangle
  name: string
  definition: string
  example: string
  chips: string[]
}

const PATTERNS: Pattern[] = [
  {
    Icon: AlertTriangle,
    name: 'Alert routing',
    definition: 'Event from a system-of-record is classified and routed to the right human channel with full audit.',
    example: 'Equipment marked needs_service → severity classified → biomed on-call Teams channel + Planner task',
    chips: ['List changed', 'Azure Function', 'Teams + Planner'],
  },
  {
    Icon: ClipboardList,
    name: 'Form → system-of-record',
    definition: 'A submitted form drives an approval / write-back loop into a List or SharePoint document, with the submitter notified at each state.',
    example: 'Service request form → approval routing → Lists write + submitter notification',
    chips: ['Form submitted', 'Power Automate', 'Lists + Email'],
  },
  {
    Icon: RefreshCw,
    name: 'Scheduled sync',
    definition: 'Azure Function runs on a CRON, pulls from one Microsoft system, transforms, and writes to another — with idempotency keys and dead-letter routing.',
    example: 'Nightly: pull asset roster from List A → reconcile → write changes to List B',
    chips: ['CRON', 'Azure Function', 'Lists (read + write)'],
  },
  {
    Icon: Share2,
    name: 'Webhook fan-out',
    definition: 'External system event arrives by webhook and is fanned out to multiple downstream Microsoft Graph actions with per-action retry.',
    example: 'External incident.created webhook → Teams post + calendar event + Lists row',
    chips: ['Webhook', 'Azure Function', 'Graph (3 calls)'],
  },
]

export function AePatterns() {
  return (
    <CsSection
      eyebrow="04 · Patterns"
      title="Four shapes that cover most of the work."
      intro="Most operational automations collapse into a small set of reusable patterns. Each has been built and demonstrated."
      footnote="Patterns shown have been built as prototypes inside a Microsoft 365 enterprise tenant."
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {PATTERNS.map((p) => (
          <Module key={p.name} className="p-5">
            <div className="flex items-center gap-3">
              <span
                className="grid h-10 w-10 place-items-center rounded-lg bg-[var(--cream-2)]"
                style={{ color: 'var(--blue)' }}
              >
                <p.Icon size={22} strokeWidth={1.8} />
              </span>
              <h3 className="font-display text-base font-bold text-ink">{p.name}</h3>
            </div>
            <p className="mt-3 text-[13px] leading-relaxed text-ink-soft">{p.definition}</p>
            <p className="mt-2 text-[12.5px] italic leading-relaxed text-ink-muted">{p.example}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {p.chips.map((c) => (
                <Chip key={c} tone="neutral">{c}</Chip>
              ))}
            </div>
          </Module>
        ))}
      </div>
    </CsSection>
  )
}
```

- [ ] **Step 2: Type-check**

```bash
cd frontend && npm run type-check
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add frontend/src/components/casestudy/automationEngine/AePatterns.tsx
git commit -m "feat(automation-engine): add AePatterns section

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 9: AeReliability

**Files:**
- Create: `frontend/src/components/casestudy/automationEngine/AeReliability.tsx`

- [ ] **Step 1: Create the file**

```tsx
// frontend/src/components/casestudy/automationEngine/AeReliability.tsx
import { KeyRound, RotateCcw, KeySquare, ScrollText } from 'lucide-react'
import { CsSection, Module } from '../bits'

const CARDS = [
  {
    Icon: KeyRound,
    title: 'Idempotency',
    body: 'Every flow accepts a correlation ID. Duplicate triggers resolve to the same outcome without double-posting.',
  },
  {
    Icon: RotateCcw,
    title: 'Retry & dead-letter',
    body: 'Transient failures retry with exponential backoff. Permanent failures route to a dead-letter list with full payload + error.',
  },
  {
    Icon: KeySquare,
    title: 'Secrets in Key Vault',
    body: 'No credentials in flow definitions. All keys, tokens, connection strings resolve through Azure Key Vault references.',
  },
  {
    Icon: ScrollText,
    title: 'Audit by design',
    body: 'Every run writes a row to a flow_audit list with correlation ID, outcome, duration, and triggering identity.',
  },
]

export function AeReliability() {
  return (
    <CsSection
      eyebrow="05 · Reliability & governance"
      title="Past the happy path."
      intro="The difference between a clever flow and a production-worthy capability is everything that happens when something fails."
      footnote="Prototype-grade implementations of each pattern, not yet hardened to production SLAs."
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {CARDS.map(({ Icon, title, body }) => (
          <Module key={title} className="p-5">
            <div className="flex items-center gap-3">
              <span
                className="grid h-9 w-9 place-items-center rounded-lg bg-[var(--cream-2)]"
                style={{ color: 'var(--plum)' }}
              >
                <Icon size={18} strokeWidth={1.9} />
              </span>
              <h3 className="font-display text-base font-bold text-ink">{title}</h3>
            </div>
            <p className="mt-3 text-[13px] leading-relaxed text-ink-soft">{body}</p>
          </Module>
        ))}
      </div>
    </CsSection>
  )
}
```

- [ ] **Step 2: Type-check**

```bash
cd frontend && npm run type-check
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add frontend/src/components/casestudy/automationEngine/AeReliability.tsx
git commit -m "feat(automation-engine): add AeReliability section

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 10: AeImpact

**Files:**
- Create: `frontend/src/components/casestudy/automationEngine/AeImpact.tsx`

- [ ] **Step 1: Create the file**

```tsx
// frontend/src/components/casestudy/automationEngine/AeImpact.tsx
import Link from 'next/link'
import { ArrowRightLeft, ShieldCheck, Blocks } from 'lucide-react'
import { CsSection, Module } from '../bits'

const CARDS = [
  {
    Icon: ArrowRightLeft,
    title: 'Removes manual handoffs',
    body: 'Every pattern eliminates a category of “did you see my message?” coordination work between Microsoft 365 surfaces.',
  },
  {
    Icon: ShieldCheck,
    title: 'Closes the audit gap',
    body: 'Operational events that used to live only in chat now have a structured, correlation-ID’d audit trail.',
  },
  {
    Icon: Blocks,
    title: 'Composable, not bespoke',
    body: 'Each pattern is a scaffold — new automations slot into the same three-layer shape rather than being one-off scripts.',
  },
]

export function AeImpact() {
  return (
    <CsSection
      eyebrow="06 · What this enables"
      title="Coordination work that doesn’t get forgotten."
      intro="The honest framing — what these patterns make possible, without claiming production scale."
      footnote={
        <span>
          Designed to layer on top of existing systems like the{' '}
          <Link href="/work/wheelchair-tracking" className="text-plum underline-offset-2 hover:underline">
            wheelchair tracking platform
          </Link>
          , not replace them.
        </span>
      }
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {CARDS.map(({ Icon, title, body }) => (
          <Module key={title} className="p-5">
            <div className="flex items-center gap-3">
              <span
                className="grid h-9 w-9 place-items-center rounded-lg bg-[var(--cream-2)]"
                style={{ color: 'var(--blue)' }}
              >
                <Icon size={18} strokeWidth={1.9} />
              </span>
              <h3 className="font-display text-base font-bold text-ink">{title}</h3>
            </div>
            <p className="mt-3 text-[13px] leading-relaxed text-ink-soft">{body}</p>
          </Module>
        ))}
      </div>
    </CsSection>
  )
}
```

- [ ] **Step 2: Type-check**

```bash
cd frontend && npm run type-check
```

Expected: no errors. Note: `CsSection`'s `footnote` prop accepts `ReactNode`, so passing a JSX `<span>` with a `<Link>` is supported (see `bits.tsx`).

- [ ] **Step 3: Commit**

```bash
git add frontend/src/components/casestudy/automationEngine/AeImpact.tsx
git commit -m "feat(automation-engine): add AeImpact section

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 11: AeClose

**Files:**
- Create: `frontend/src/components/casestudy/automationEngine/AeClose.tsx`

- [ ] **Step 1: Verify the contact CTA href used by the sibling close section**

```bash
grep -n "href" frontend/src/components/casestudy/clinicalGenai/CgClose.tsx
```

Note the contact-CTA `href` used in `CgClose.tsx` (e.g. `/about#contact`, `/#contact`, or similar). Use that **exact same value** in Step 2 below where the placeholder `<CONTACT_HREF>` appears, and leave a brief inline comment documenting why.

- [ ] **Step 2: Create the file**

```tsx
// frontend/src/components/casestudy/automationEngine/AeClose.tsx
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'

// Mirrors CgClose's contact CTA href so the two close sections stay in lock-step.
const CONTACT_HREF = '/about#contact' // ← replace with the actual href found in Step 1 if different

const PROD_REQS = [
  'ALM pipeline · solution packaging · environment promotion',
  'Centralized monitoring · Application Insights · alerting',
  'Naming standards · DLP policies · CoE oversight',
]

export function AeClose() {
  return (
    <section className="mx-auto max-w-[1180px] px-6 py-20">
      <div className="mx-auto max-w-2xl text-center">
        <p className="font-display text-2xl font-extrabold leading-snug text-ink sm:text-3xl">
          “Most operations don’t need a new platform. They need the existing one to talk to itself.”
        </p>
        <ul className="mt-8 space-y-1.5 text-[11.5px] font-mono tracking-tight text-ink-muted">
          {PROD_REQS.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink ghair"
          >
            <ArrowLeft size={14} /> All work
          </Link>
          <Link
            href={CONTACT_HREF}
            className="inline-flex items-center gap-2 rounded-full bg-[var(--plum)] px-4 py-2 text-sm font-semibold text-white"
          >
            Talk about a similar automation <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Type-check**

```bash
cd frontend && npm run type-check
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add frontend/src/components/casestudy/automationEngine/AeClose.tsx
git commit -m "feat(automation-engine): add AeClose section

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Phase 3 — Integration & verification

### Task 12: Replace page composition

**Files:**
- Modify: `frontend/src/app/work/healthcare-automation-engine/page.tsx`

- [ ] **Step 1: Replace the file contents**

```tsx
// frontend/src/app/work/healthcare-automation-engine/page.tsx
import type { Metadata } from 'next'
import { HomeNav } from '@/components/home/HomeNav'
import { SiteFooter } from '@/components/home/SiteFooter'
import { Reveal } from '@/components/home/Reveal'
import { ProjectMeta } from '@/components/work/ProjectMeta'
import { AeHero } from '@/components/casestudy/automationEngine/AeHero'
import { AeProblem } from '@/components/casestudy/automationEngine/AeProblem'
import { AeArchitecture } from '@/components/casestudy/automationEngine/AeArchitecture'
import { AeFlowDemo } from '@/components/casestudy/automationEngine/AeFlowDemo'
import { AePatterns } from '@/components/casestudy/automationEngine/AePatterns'
import { AeReliability } from '@/components/casestudy/automationEngine/AeReliability'
import { AeImpact } from '@/components/casestudy/automationEngine/AeImpact'
import { AeClose } from '@/components/casestudy/automationEngine/AeClose'

export const metadata: Metadata = {
  title: 'Enterprise Healthcare Workflow Automation Engine — Lloyd Dela Cruz',
  description:
    'Built Power Automate, Azure Functions, and Microsoft Graph orchestration prototypes for healthcare operations — four reusable patterns that turn manual hospital handoffs into event-driven workflows. Prototypes; not yet at enterprise scale.',
}

export default function Page() {
  return (
    <div className="home2 min-h-screen">
      <HomeNav active="Work" />
      <main>
        <AeHero />
        <ProjectMeta slug="healthcare-automation-engine" />
        <Reveal><AeProblem /></Reveal>
        <Reveal><AeArchitecture /></Reveal>
        <Reveal><AeFlowDemo /></Reveal>
        <Reveal><AePatterns /></Reveal>
        <Reveal><AeReliability /></Reveal>
        <Reveal><AeImpact /></Reveal>
        <AeClose />
      </main>
      <SiteFooter />
    </div>
  )
}
```

- [ ] **Step 2: Type-check**

```bash
cd frontend && npm run type-check
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add frontend/src/app/work/healthcare-automation-engine/page.tsx
git commit -m "$(cat <<'EOF'
feat(work): replace automation engine placeholder with full case study

Composes the 8 Ae* sections with HomeNav, ProjectMeta, Reveal wrappers,
and SiteFooter — mirrors clinical-genai-pipeline's page shape.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 13: Final verification

- [ ] **Step 1: Full test suite**

```bash
cd frontend && npm run test
```

Expected: all tests pass. If the existing FeaturedWork integration tests render the homepage and assert on titles, they should continue to find "Enterprise Healthcare Workflow Automation Engine."

- [ ] **Step 2: Lint**

```bash
cd frontend && npm run lint
```

Expected: no new warnings or errors introduced by Ae* files or modified files.

- [ ] **Step 3: Type-check**

```bash
cd frontend && npm run type-check
```

Expected: no errors.

- [ ] **Step 4: Production build (static export)**

```bash
cd frontend && npm run build
```

Expected: build succeeds; `/work/healthcare-automation-engine` is present in the build output. No errors about missing modules or unresolved imports.

- [ ] **Step 5: Dev server smoke test**

```bash
cd frontend && npm run dev
```

Open `http://localhost:3001/work/healthcare-automation-engine` and confirm in the browser:

1. Page renders all 8 sections in order: Hero · ProjectMeta aside · Problem · Architecture · FlowDemo · Patterns · Reliability · Impact · Close.
2. `ProjectMeta` aside shows `Status: Prototype`, role, period, deployment, scale, and stack chips.
3. The flow demo auto-cycles through 5 steps roughly every 2.2s, the active step highlights blue, completed steps go green, action rows reveal in order, and the audit row appears at step 5.
4. Clicking any orchestration step pauses auto-cycle and jumps the demo to that step.
5. `Reset` returns to step 1 and stays paused.
6. The intro CTAs (`See a flow run`, `Start from the problem`) scroll to `#demo` and `#problem` respectively.
7. Toggle `prefers-reduced-motion` in DevTools (Rendering panel → Emulate CSS media feature) → reload → demo renders fully expanded with all actions + audit visible and no auto-cycle.
8. Open `http://localhost:3001/` and confirm the automation engine card in `FeaturedWork` now shows the `Prototype` status pill (not `Concept`) and the new body copy mentioning "built prototypes".
9. No console warnings — in particular, no `ProjectMeta: no registry entry for slug "healthcare-automation-engine"`.

If any check fails, fix in place, type-check + lint + test again, then re-verify the failing item before committing the fix.

- [ ] **Step 6: Final tidy commit (only if Step 5 surfaced fixes)**

```bash
git add -p   # selectively stage only relevant changes — avoid accidentally including unrelated parallel-session work
git commit -m "$(cat <<'EOF'
fix(automation-engine): address smoke-test findings

<one-line description of what the smoke test revealed and how it was fixed>

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

> **Important:** Per `[[parallel-claude-sessions]]` memory, the user sometimes runs concurrent sessions on the same branch. **Do not** use `git add -A` or `git add .`. Stage only files this plan touched.

---

## Spec coverage map

| Spec section | Implemented by |
|---|---|
| §1 Goal & framing | Task 12 (page composition) + Task 3 (card body) |
| §2 Files added / modified | Tasks 1–12 collectively; PlaceholderCaseStudy left intact |
| §3 Visual register (binding) | Every Ae* component (Tasks 4–11) — uses `home2` class via page.tsx wrapper, accents from CSS vars |
| §3 No-go list | Every Ae* component's copy was authored to comply; verified in Task 13 Step 5 |
| §4 Page anatomy (8 sections) | Task 12 |
| §5.1 Hero | Task 4 |
| §5.2 Problem | Task 5 |
| §5.3 Architecture | Task 6 |
| §5.4 Flow demo (interactive) | Task 7 + Task 1 fixtures |
| §5.5 Patterns | Task 8 |
| §5.6 Reliability | Task 9 |
| §5.7 Impact | Task 10 |
| §5.8 Close | Task 11 (incl. Step 1 contact-CTA verification) |
| §6 ProjectMeta registry | Task 2 |
| §7 FeaturedWork card update | Task 3 |
| §8 Page composition | Task 12 |
| §9 Accessibility & motion | Task 7 (sr-only aria-live, aria-pressed, prefers-reduced-motion) + Task 6 (SVG aria-label) |
| §10 Performance | Task 7 marked `'use client'`; all others are server components; fixtures are static |
| §11 Out of scope | Honored — no real flow JSON, no tenant screenshots, no multi-flow gallery, no separate roadmap page |
| §12 Acceptance criteria | Task 13 Steps 1–5 verify each item |
