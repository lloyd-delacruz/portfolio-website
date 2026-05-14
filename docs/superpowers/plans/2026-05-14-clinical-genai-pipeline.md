# Clinical GenAI Pipeline — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a new featured portfolio project — a 9-section case study at `/work/clinical-genai-pipeline` plus a homepage card — for an AI-assisted clinical documentation and analytics pipeline. Visually indistinguishable from the existing Applied-AI siblings (`clinical-risk-engine`, `population-health-intelligence`).

**Architecture:** Mirrors the existing `clinical-risk-engine` case study layout. Logic and synthetic fixtures live in `frontend/src/components/work/clinical-genai/` (with unit tests); visual components live in `frontend/src/components/casestudy/clinicalGenai/`. A new entry is added to `FeaturedWork.PROJECTS[]` with a new `'extraction'` `PreviewMock` variant, plus a `projects.ts` registry entry and a one-line update to `/work/page.tsx` so the card lands in the Applied-AI band.

**Tech Stack:** Next.js 15 App Router, TypeScript (strict), Tailwind, lucide-react icons, Vitest. No new runtime deps. No LLM API calls at runtime — all demo content is pre-computed fixtures.

**Spec:** `docs/superpowers/specs/2026-05-14-clinical-genai-pipeline-design.md`

---

## Conventions used by this plan

- **All commands assume CWD is the repo root** (`/Users/lloyd.vince1985gmail.com/Desktop/Software_Dev/Professional-website`).
- **Visual components are not unit-tested** in this codebase (only `lib/` logic, hooks, and a handful of complex render-tested components have tests). For visual components in this plan, verification is `npm run type-check` + `npm run lint` + a dev-server visual check; no failing-test-first dance.
- **TDD is applied only to the fixture file (Task 1)**, which has a typed schema that benefits from validation.
- **Commit cadence:** one commit per task. Conventional Commits format: `feat(work):`, `feat(home):`, `chore:`. The "by Claude" co-author trailer is the existing repo convention (it's already used by recent commits — verify by `git log --format=%B -n 3`).

---

## File Structure

```
frontend/src/components/work/clinical-genai/                  (NEW — data + types + tests)
  data.ts                       Types + synthetic note fixtures
  __tests__/data.test.ts        Validates fixture shape + invariants

frontend/src/components/casestudy/clinicalGenai/              (NEW — visual)
  CgHero.tsx
  CgProblem.tsx
  CgArchitecture.tsx
  CgExtractionDemo.tsx          Interactive centerpiece (auto-cycle)
  CgDataModel.tsx
  CgCostAware.tsx
  CgChallenges.tsx
  CgImpact.tsx
  CgClose.tsx

frontend/src/app/work/clinical-genai-pipeline/                (NEW — page)
  page.tsx

Modified:
  frontend/src/lib/projects.ts                                Adds clinical-genai-pipeline entry
  frontend/src/components/home/FeaturedWork.tsx               New PROJECTS[] entry + 'extraction' variant
  frontend/src/app/work/page.tsx                              Adds new href to APPLIED_AI_HREFS
```

---

## Task 1 — Fixture data + types

**Files:**
- Create: `frontend/src/components/work/clinical-genai/data.ts`
- Test:   `frontend/src/components/work/clinical-genai/__tests__/data.test.ts`

This file is the single source of truth for the three synthetic notes that drive the extraction demo. Everything downstream (the demo zones, the validation strip, the routing decision) reads from these objects. Keeping the data hand-authored and deterministic means no runtime model calls and a stable demo.

### Step 1.1 — Write the failing test

Create `frontend/src/components/work/clinical-genai/__tests__/data.test.ts`:

```ts
import { describe, expect, it } from 'vitest'
import {
  NOTES,
  FIELD_KEYS,
  type SyntheticNote,
  type FieldKey,
  type RoutingDestination,
} from '../data'

describe('clinical-genai fixtures', () => {
  it('exposes exactly three notes', () => {
    expect(NOTES).toHaveLength(3)
  })

  it('every note carries every field defined in FIELD_KEYS', () => {
    NOTES.forEach((note) => {
      FIELD_KEYS.forEach((key) => {
        expect(note.extracted[key]).toBeDefined()
        expect(typeof note.extracted[key].confidence).toBe('number')
        expect(note.extracted[key].confidence).toBeGreaterThanOrEqual(0)
        expect(note.extracted[key].confidence).toBeLessThanOrEqual(1)
      })
    })
  })

  it('every note has at least one validation rule', () => {
    NOTES.forEach((note) => {
      expect(note.validation.length).toBeGreaterThan(0)
      note.validation.forEach((r) => {
        expect(['pass', 'warn', 'fail']).toContain(r.status)
      })
    })
  })

  it('routing destination is one of the documented options', () => {
    const allowed: RoutingDestination[] = ['postgres', 'review']
    NOTES.forEach((note) => {
      expect(allowed).toContain(note.routing.destination)
    })
  })

  it('happy-path note routes to postgres', () => {
    const happy = NOTES.find((n) => n.id === 'note-clean')
    expect(happy).toBeDefined()
    expect(happy!.routing.destination).toBe('postgres')
  })

  it('ambiguous and incomplete notes route to review', () => {
    const ambig = NOTES.find((n) => n.id === 'note-ambiguous')
    const incomp = NOTES.find((n) => n.id === 'note-incomplete')
    expect(ambig!.routing.destination).toBe('review')
    expect(incomp!.routing.destination).toBe('review')
  })

  it('exposes one cycle order with three entries', () => {
    // Sanity: every note id is unique
    const ids = new Set(NOTES.map((n) => n.id))
    expect(ids.size).toBe(3)
  })

  it('SyntheticNote type compiles when referenced', () => {
    const sample: SyntheticNote = NOTES[0]
    const key: FieldKey = FIELD_KEYS[0]
    expect(sample.extracted[key]).toBeDefined()
  })
})
```

### Step 1.2 — Run the test, verify it fails

Run: `npm run test -- src/components/work/clinical-genai`

Expected: FAIL — module not found (`../data` does not exist yet).

### Step 1.3 — Implement `data.ts`

Create `frontend/src/components/work/clinical-genai/data.ts`:

```ts
// Synthetic rehab note fixtures driving the extraction demo.
// No real patient data. All values are hand-authored for a deterministic demo.

export const FIELD_KEYS = [
  'mobility_level',
  'assistance_required',
  'gait_distance_m',
  'pain_score',
  'therapy_tolerance',
  'discharge_readiness',
] as const

export type FieldKey = (typeof FIELD_KEYS)[number]

export interface ExtractedField {
  value: string | number | null
  confidence: number // 0..1
}

export type ValidationStatus = 'pass' | 'warn' | 'fail'

export interface ValidationRule {
  rule: string
  status: ValidationStatus
  detail?: string
}

export type RoutingDestination = 'postgres' | 'review'

export interface RoutingDecision {
  destination: RoutingDestination
  reason?: string
}

export interface SyntheticNote {
  id: 'note-clean' | 'note-ambiguous' | 'note-incomplete'
  patientLabel: string // e.g. "Patient 042 · synthetic"
  session: string // e.g. "Session 04"
  noteText: string // 50–80 words of dictated rehab prose
  extracted: Record<FieldKey, ExtractedField>
  validation: ValidationRule[]
  routing: RoutingDecision
}

const CLEAN: SyntheticNote = {
  id: 'note-clean',
  patientLabel: 'Patient 042 · synthetic',
  session: 'Session 04',
  noteText:
    'Pt ambulated 30m with rolling walker, contact-guard assist. Pain 2/10 at rest, 3/10 with weight-bearing. Tolerated full 45-min session, no signs of fatigue. Transfers sit-to-stand independent. Plan: progress to single-point cane next visit, discharge planning to begin within two weeks.',
  extracted: {
    mobility_level:       { value: 'ambulatory · walker',          confidence: 0.94 },
    assistance_required:  { value: 'contact-guard',                 confidence: 0.92 },
    gait_distance_m:      { value: 30,                              confidence: 0.96 },
    pain_score:           { value: 3,                               confidence: 0.90 },
    therapy_tolerance:    { value: 'tolerated full session',        confidence: 0.91 },
    discharge_readiness:  { value: 'approaching · 2 weeks',         confidence: 0.88 },
  },
  validation: [
    { rule: 'Schema valid',          status: 'pass' },
    { rule: 'Ranges valid',          status: 'pass' },
    { rule: 'Required fields',       status: 'pass' },
    { rule: 'Confidence ≥ 0.85',     status: 'pass' },
  ],
  routing: { destination: 'postgres' },
}

const AMBIGUOUS: SyntheticNote = {
  id: 'note-ambiguous',
  patientLabel: 'Patient A · synthetic',
  session: 'Session 07',
  noteText:
    'Worked on bed mobility, transfers. Pt fatigued, somewhat reluctant. Gait attempted with FWW, distance ~5m before requesting to sit. Pain reported but pt unclear on number, "not too bad". Family asked about going home — not addressed today. Tolerance variable.',
  extracted: {
    mobility_level:       { value: 'ambulatory · FWW',              confidence: 0.78 },
    assistance_required:  { value: 'min-A',                         confidence: 0.71 },
    gait_distance_m:      { value: 5,                               confidence: 0.82 },
    pain_score:           { value: null,                            confidence: 0.42 },
    therapy_tolerance:    { value: 'variable',                      confidence: 0.69 },
    discharge_readiness:  { value: 'unclear',                       confidence: 0.38 },
  },
  validation: [
    { rule: 'Schema valid',          status: 'pass' },
    { rule: 'Ranges valid',          status: 'pass' },
    { rule: 'Required fields',       status: 'warn', detail: 'pain_score is null' },
    { rule: 'Confidence ≥ 0.85',     status: 'fail', detail: 'discharge_readiness · 0.38' },
  ],
  routing: {
    destination: 'review',
    reason: 'Low confidence on discharge_readiness',
  },
}

const INCOMPLETE: SyntheticNote = {
  id: 'note-incomplete',
  patientLabel: 'Patient B · synthetic',
  session: 'Session 02',
  noteText:
    'Brief session, pt nauseous mid-treatment. Sit-to-stand x3 with mod-A. Did not attempt ambulation. Pain 4/10. Will retry tomorrow. Therapy abbreviated.',
  extracted: {
    mobility_level:       { value: 'transfers only',                confidence: 0.86 },
    assistance_required:  { value: 'mod-A',                         confidence: 0.89 },
    gait_distance_m:      { value: null,                            confidence: 0.20 },
    pain_score:           { value: 4,                               confidence: 0.93 },
    therapy_tolerance:    { value: 'abbreviated · nausea',          confidence: 0.84 },
    discharge_readiness:  { value: 'not yet',                       confidence: 0.79 },
  },
  validation: [
    { rule: 'Schema valid',          status: 'pass' },
    { rule: 'Ranges valid',          status: 'pass' },
    { rule: 'Required fields',       status: 'fail', detail: 'gait_distance_m missing' },
    { rule: 'Confidence ≥ 0.85',     status: 'warn', detail: 'gait_distance_m · 0.20' },
  ],
  routing: {
    destination: 'review',
    reason: 'Required field missing · gait_distance_m',
  },
}

// Demo cycle order: clean (happy path) → ambiguous (load-bearing moment) → incomplete.
export const NOTES: SyntheticNote[] = [CLEAN, AMBIGUOUS, INCOMPLETE]

export const FIELD_LABELS: Record<FieldKey, string> = {
  mobility_level:       'Mobility level',
  assistance_required:  'Assistance required',
  gait_distance_m:      'Gait distance (m)',
  pain_score:           'Pain score',
  therapy_tolerance:    'Therapy tolerance',
  discharge_readiness:  'Discharge readiness',
}
```

### Step 1.4 — Run the test, verify it passes

Run: `npm run test -- src/components/work/clinical-genai`

Expected: PASS (all 8 assertions green).

### Step 1.5 — Type-check + lint

Run: `npm run type-check && npm run lint`

Expected: clean.

### Step 1.6 — Commit

```bash
git add frontend/src/components/work/clinical-genai/
git commit -m "$(cat <<'EOF'
feat(work): add clinical-genai synthetic note fixtures

Three hand-authored synthetic rehab notes (clean, ambiguous, incomplete)
with per-field confidence scores, validation rules, and routing decisions.
Deterministic — no LLM call at runtime.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 2 — Registry entry in `projects.ts`

**Files:**
- Modify: `frontend/src/lib/projects.ts`

### Step 2.1 — Add the registry entry

In `frontend/src/lib/projects.ts`, add a new key inside the `PROJECTS` object, immediately after the `'population-health-intelligence'` entry (preserves grouping by topic):

```ts
  'clinical-genai-pipeline': {
    slug: 'clinical-genai-pipeline',
    title: 'Clinical GenAI Agent & Analytics Pipeline',
    status: 'prototype',
    role: 'System design · Applied AI engineering',
    period: '2025',
    deployment: 'Designed pipeline · synthetic data only',
    stack: ['FastAPI', 'Python', 'PostgreSQL', 'LLM structured outputs', 'React', 'TypeScript'],
    scale: '8-stage pipeline · 6 tables · synthetic notes',
  },
```

### Step 2.2 — Verify the projects.test.ts still passes

Run: `npm run test -- src/lib/projects`

Expected: PASS. (The existing tests should not assume a specific set of slugs.)

### Step 2.3 — Type-check + lint

Run: `npm run type-check && npm run lint`

Expected: clean.

### Step 2.4 — Commit

```bash
git add frontend/src/lib/projects.ts
git commit -m "$(cat <<'EOF'
feat(work): register clinical-genai-pipeline in project metadata

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 3 — `CgHero` component

**Files:**
- Create: `frontend/src/components/casestudy/clinicalGenai/CgHero.tsx`

Mirrors `CrHero.tsx` exactly — same layout, same `hero-wash`, same anim-rise stagger, same META 4-up below the section. Right-side glyph is a 4-node inline SVG (`Mic → Cpu → Brain → Database`), `Database` as the primary (output) node.

### Step 3.1 — Implement the component

Create `frontend/src/components/casestudy/clinicalGenai/CgHero.tsx`:

```tsx
// frontend/src/components/casestudy/clinicalGenai/CgHero.tsx
import Link from 'next/link'
import { ArrowRight, ArrowLeft, Mic, Cpu, Brain, Database } from 'lucide-react'

function CgSystemMap() {
  const W = 460
  const H = 200
  const Y = H / 2
  const NODES = [
    { Icon: Mic,      label: 'Dictation', x: 50  },
    { Icon: Cpu,      label: 'API',       x: 180 },
    { Icon: Brain,    label: 'Extract',   x: 310 },
    { Icon: Database, label: 'Storage',   x: 410, primary: true },
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

export function CgHero() {
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
              Applied AI · Clinical Documentation
            </span>

            <h1
              className="anim-rise mt-5 font-display text-[2.5rem] font-extrabold leading-[1.06] text-ink sm:text-[3rem] lg:text-[3.4rem]"
              style={{ animationDelay: '60ms' }}
            >
              Clinical GenAI
              <br />
              <span className="grad-plum-text">Agent &amp; Analytics</span>
            </h1>

            <p
              className="anim-rise mt-5 max-w-[42ch] text-[1.08rem] leading-relaxed text-ink-soft"
              style={{ animationDelay: '120ms' }}
            >
              Designed to turn messy dictated rehab notes into structured recovery metrics — with validation,
              audit, and human review built in.
            </p>

            <div className="anim-rise mt-7 flex flex-wrap items-center gap-3" style={{ animationDelay: '180ms' }}>
              <Link
                href="#demo"
                className="group inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white soft-shadow transition-transform hover:-translate-y-0.5"
                style={{ background: 'var(--plum)' }}
              >
                See the extraction demo
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="#problem"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-ink ghair-2 transition-colors hover:bg-[var(--cream-2)]"
              >
                Start from the problem
              </Link>
            </div>
          </div>

          <div className="anim-rise" style={{ animationDelay: '260ms' }}>
            <CgSystemMap />
          </div>
        </div>
      </div>
    </section>
  )
}
```

### Step 3.2 — Type-check + lint

Run: `npm run type-check && npm run lint`

Expected: clean.

### Step 3.3 — Commit

```bash
git add frontend/src/components/casestudy/clinicalGenai/CgHero.tsx
git commit -m "$(cat <<'EOF'
feat(work): add CgHero — clinical-genai case study hero

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 4 — `CgProblem` component

**Files:**
- Create: `frontend/src/components/casestudy/clinicalGenai/CgProblem.tsx`

Mirrors `CrProblem.tsx`. 3 icon callouts in coral-tinted tiles to signal "problem statement" tone — matches the CrProblem pattern. 80-word body across 2 paragraphs. Domain credibility footnote.

### Step 4.1 — Implement the component

Create `frontend/src/components/casestudy/clinicalGenai/CgProblem.tsx`:

```tsx
// frontend/src/components/casestudy/clinicalGenai/CgProblem.tsx
import { FileText, BarChart3, Clock } from 'lucide-react'
import { CsSection } from '../bits'

const CALLOUTS = [
  { Icon: FileText,  title: 'Free-text dictation' },
  { Icon: BarChart3, title: 'No structured analytics' },
  { Icon: Clock,     title: 'Slow manual review' },
]

export function CgProblem() {
  return (
    <CsSection
      id="problem"
      eyebrow="01 · Problem"
      title="Recovery data is trapped inside free text."
      intro="Rehab documentation is largely dictated. Abbreviations, incomplete sentences, and inconsistent terminology mean recovery progress sits in prose, not in fields a team can analyze."
    >
      <p className="max-w-2xl text-[1.05rem] leading-relaxed text-ink-soft">
        Manual review of those notes is slow and inconsistent. Operational and clinical teams can&apos;t easily
        compare patient progress, visit outcomes, or therapy indicators across sites or time.
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

      <p className="mt-8 max-w-2xl text-sm italic text-ink-muted">
        Lloyd worked 9+ years inside hospital rehab and clinical operations — the documentation patterns and
        workflow constraints are first-hand domain knowledge.
      </p>
    </CsSection>
  )
}
```

### Step 4.2 — Type-check + lint

Run: `npm run type-check && npm run lint`

Expected: clean.

### Step 4.3 — Commit

```bash
git add frontend/src/components/casestudy/clinicalGenai/CgProblem.tsx
git commit -m "$(cat <<'EOF'
feat(work): add CgProblem — clinical context section

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 5 — `CgArchitecture` component

**Files:**
- Create: `frontend/src/components/casestudy/clinicalGenai/CgArchitecture.tsx`

Mirrors `CrArchitecture.tsx` but with 8 stages in the spine instead of 4. The 4-card layer grid stays 4-up (highlighting four conceptual layers, not 1:1 with the spine). On mobile the spine collapses to a single column; on `lg` it lays out in two 4-stage rows with an arrow between.

### Step 5.1 — Implement the component

Create `frontend/src/components/casestudy/clinicalGenai/CgArchitecture.tsx`:

```tsx
// frontend/src/components/casestudy/clinicalGenai/CgArchitecture.tsx
import {
  Mic,
  Cpu,
  ShieldCheck,
  Brain,
  CheckCircle2,
  Database,
  Users,
  BarChart3,
  ArrowRight,
  ListChecks,
  History,
  TrendingUp,
} from 'lucide-react'
import { CsSection, Module } from '../bits'

const SPINE = [
  { Icon: Mic,          label: 'Dictated note',  sub: 'React intake' },
  { Icon: Cpu,          label: 'FastAPI',        sub: 'Python orchestration' },
  { Icon: ShieldCheck,  label: 'Preprocess',     sub: 'De-id + chunk' },
  { Icon: Brain,        label: 'LLM extraction', sub: 'Schema-constrained' },
  { Icon: CheckCircle2, label: 'Validation',     sub: 'Rules + confidence' },
  { Icon: Database,     label: 'PostgreSQL',     sub: 'Time-series + audit' },
  { Icon: Users,        label: 'Review queue',   sub: 'Low-confidence' },
  { Icon: BarChart3,    label: 'Analytics',      sub: 'Recovery trends + KPIs', primary: true },
]

const DOWNSTREAM = [
  { Icon: TrendingUp,  label: 'Recovery KPIs' },
  { Icon: BarChart3,   label: 'Time-series trends' },
  { Icon: History,     label: 'Audit trail' },
  { Icon: ListChecks,  label: 'Review backlog' },
]

const LAYERS = [
  { Icon: Cpu,         title: 'Backend',  body: 'FastAPI + Pydantic. Async orchestration; every stage gates the next.' },
  { Icon: ShieldCheck, title: 'Privacy',  body: 'De-identification strips identifiers before any model call. Synthetic data only here.' },
  { Icon: Brain,       title: 'LLM layer', body: 'Schema-constrained extraction with per-field confidence; structured outputs reduce retries.' },
  { Icon: Database,    title: 'Storage',  body: 'PostgreSQL with normalized metrics, time-series observations, and an append-only audit log.' },
]

function StageCard({
  Icon,
  label,
  sub,
  primary,
}: {
  Icon: typeof Mic
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

function SpineRow({ stages }: { stages: typeof SPINE }) {
  return (
    <div className="flex flex-col items-stretch gap-2 lg:flex-row lg:items-center">
      {stages.map((s, i) => (
        <div key={s.label} className="flex flex-1 items-center gap-2">
          <StageCard {...s} />
          {i < stages.length - 1 && <ArrowRight size={16} className="hidden shrink-0 text-ink-muted lg:block" />}
        </div>
      ))}
    </div>
  )
}

export function CgArchitecture() {
  const row1 = SPINE.slice(0, 4)
  const row2 = SPINE.slice(4)

  return (
    <CsSection
      eyebrow="02 · System architecture"
      title="From dictation to dashboard, with humans in the loop."
      intro="A pipeline that respects clinical context — validation gates, audit logs, and a review queue before anything goes downstream."
    >
      <Module>
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">The spine</p>
        <div className="mt-4 space-y-2">
          <SpineRow stages={row1} />
          <div className="hidden justify-center py-1 lg:flex">
            <ArrowRight size={16} className="rotate-90 text-ink-muted" />
          </div>
          <SpineRow stages={row2} />
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
            <div className="grid h-10 w-10 place-items-center rounded-xl" style={{ background: 'var(--plum-soft)' }}>
              <Icon size={18} style={{ color: 'var(--plum)' }} strokeWidth={1.9} />
            </div>
            <h3 className="mt-3 font-display text-[15px] font-bold text-ink">{title}</h3>
            <p className="mt-1.5 text-[13px] leading-relaxed text-ink-soft">{body}</p>
          </div>
        ))}
      </div>

      <p className="mt-6 text-xs italic text-ink-muted">
        Designed pipeline. No real patient data; all examples in this case study are synthetic.
      </p>
    </CsSection>
  )
}
```

### Step 5.2 — Type-check + lint

Run: `npm run type-check && npm run lint`

Expected: clean.

### Step 5.3 — Commit

```bash
git add frontend/src/components/casestudy/clinicalGenai/CgArchitecture.tsx
git commit -m "$(cat <<'EOF'
feat(work): add CgArchitecture — 8-stage pipeline spine

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 6 — `CgExtractionDemo` interactive centerpiece

**Files:**
- Create: `frontend/src/components/casestudy/clinicalGenai/CgExtractionDemo.tsx`

Largest task. Mirrors `CrTriageDemo.tsx` state-machine pattern: 3 steps, 3 zones, auto-cycle every 1900ms with manual override, `↺ Reset` returns to step 1.

Behaviour contract:
- Default `playing === true` unless `usePrefersReducedMotion()` returns true
- Clicking a step pill OR changing the note dropdown pauses auto-cycle
- Auto-cycle: step 0 → step 1 → step 2 → wraps to step 0 AND advances to next note
- Active zone: `var(--plum-soft)` bg + plum border; inactive: `var(--cream-2)` + `var(--line)`

### Step 6.1 — Implement the component

Create `frontend/src/components/casestudy/clinicalGenai/CgExtractionDemo.tsx`:

```tsx
// frontend/src/components/casestudy/clinicalGenai/CgExtractionDemo.tsx
'use client'

import { useEffect, useState } from 'react'
import { Play, Pause, RotateCcw, FileText, Braces, GitBranch, CheckCircle2, AlertCircle, XCircle } from 'lucide-react'
import { usePrefersReducedMotion } from '@/lib/hooks/usePrefersReducedMotion'
import { CsSection, Module } from '../bits'
import {
  NOTES,
  FIELD_KEYS,
  FIELD_LABELS,
  type SyntheticNote,
  type FieldKey,
  type ValidationStatus,
} from '@/components/work/clinical-genai/data'

const STEPS = [
  { label: 'Note',       icon: FileText,  caption: 'A dictated rehab note arrives via the intake form. Free text, dictation patterns, abbreviations.' },
  { label: 'Extraction', icon: Braces,    caption: 'The LLM emits a schema-constrained JSON object. Each field carries its own confidence score.' },
  { label: 'Routing',    icon: GitBranch, caption: 'Validation rules and confidence thresholds decide whether the record goes to storage or to the review queue.' },
]

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

function confidenceTone(c: number): 'green' | 'amber' | 'coral' {
  if (c >= 0.85) return 'green'
  if (c >= 0.6) return 'amber'
  return 'coral'
}

const TONE_HEX: Record<'green' | 'amber' | 'coral', string> = {
  green: 'var(--green)',
  amber: 'var(--amber)',
  coral: 'var(--coral)',
}

const STATUS_ICON: Record<ValidationStatus, typeof CheckCircle2> = {
  pass: CheckCircle2,
  warn: AlertCircle,
  fail: XCircle,
}

const STATUS_TONE: Record<ValidationStatus, 'green' | 'amber' | 'coral'> = {
  pass: 'green',
  warn: 'amber',
  fail: 'coral',
}

function formatFieldValue(value: SyntheticNote['extracted'][FieldKey]['value']): string {
  if (value === null) return '∅'
  if (typeof value === 'number') return String(value)
  return value
}

export function CgExtractionDemo() {
  const reduced = usePrefersReducedMotion()
  const [step, setStep] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [noteIdx, setNoteIdx] = useState(0)

  useEffect(() => {
    if (reduced) setPlaying(false)
  }, [reduced])

  useEffect(() => {
    if (!playing) return
    const id = setInterval(() => {
      setStep((s) => {
        const next = (s + 1) % 3
        if (next === 0) {
          setNoteIdx((n) => (n + 1) % NOTES.length)
        }
        return next
      })
    }, 1900)
    return () => clearInterval(id)
  }, [playing])

  const note = NOTES[noteIdx]

  const handleNoteSelect = (id: SyntheticNote['id']) => {
    const idx = NOTES.findIndex((n) => n.id === id)
    setNoteIdx(idx >= 0 ? idx : 0)
    setPlaying(false)
  }

  const handleStepClick = (i: number) => {
    setStep(i)
    setPlaying(false)
  }

  const reset = () => {
    setStep(0)
    setNoteIdx(0)
    setPlaying(false)
  }

  const routingTone: 'green' | 'amber' = note.routing.destination === 'postgres' ? 'green' : 'amber'

  return (
    <CsSection
      id="demo"
      eyebrow="03 · Extraction in action"
      title="Watch a messy note become structured data."
      intro="Three stages, one synthetic note. Step through it or let it run."
      footnote="Interactive prototype · synthetic example · no PHI."
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
            className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-ink-soft transition-colors hover:text-ink"
            style={{ border: '1px solid var(--line)' }}
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
          {/* Zone 1 — Dictated note */}
          <Zone title="Dictated note" active={step === 0}>
            <select
              value={note.id}
              onChange={(e) => handleNoteSelect(e.target.value as SyntheticNote['id'])}
              className="w-full rounded-md border border-[var(--line)] bg-white px-3 py-2 text-[13px] font-medium text-ink"
            >
              {NOTES.map((n) => (
                <option key={n.id} value={n.id}>
                  {n.id === 'note-clean' && 'Clean note · happy path'}
                  {n.id === 'note-ambiguous' && 'Ambiguous note · review queue'}
                  {n.id === 'note-incomplete' && 'Incomplete note · review queue'}
                </option>
              ))}
            </select>
            <div className="mt-3 rounded-lg bg-white p-3" style={{ border: '1px solid var(--line)' }}>
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
                {note.patientLabel} · {note.session}
              </p>
              <p className="mt-2 text-[12px] leading-relaxed text-ink-soft" style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace' }}>
                {note.noteText}
              </p>
            </div>
          </Zone>

          {/* Zone 2 — Structured extraction */}
          <Zone title="Structured extraction" active={step === 1}>
            <div className="rounded-lg bg-white p-3" style={{ border: '1px solid var(--line)' }}>
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-muted">JSON output</p>
              <div className="mt-2 space-y-1.5">
                {FIELD_KEYS.map((key) => {
                  const f = note.extracted[key]
                  const tone = confidenceTone(f.confidence)
                  return (
                    <div key={key} className="flex items-baseline justify-between gap-2 text-[11px]">
                      <span className="truncate text-ink-soft">
                        <span className="mr-1 text-ink-muted">▸</span>
                        {FIELD_LABELS[key]}
                      </span>
                      <span className="flex shrink-0 items-center gap-1.5">
                        <span className="font-medium text-ink">{formatFieldValue(f.value)}</span>
                        <span
                          className="inline-flex items-center rounded-full px-1.5 py-[1px] text-[9px] font-semibold"
                          style={{ background: 'rgba(28,22,46,0.05)', color: TONE_HEX[tone] }}
                        >
                          {f.confidence.toFixed(2)}
                        </span>
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          </Zone>

          {/* Zone 3 — Validation + routing */}
          <Zone title="Validation &amp; routing" active={step === 2}>
            <div className="space-y-2">
              <div className="rounded-lg bg-white p-3" style={{ border: '1px solid var(--line)' }}>
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-muted">Validation</p>
                <div className="mt-2 space-y-1.5">
                  {note.validation.map((r) => {
                    const Icon = STATUS_ICON[r.status]
                    const tone = STATUS_TONE[r.status]
                    return (
                      <div key={r.rule} className="flex items-start gap-1.5 text-[11px]">
                        <Icon size={13} style={{ color: TONE_HEX[tone] }} strokeWidth={2.2} />
                        <div className="flex-1">
                          <span className="text-ink-soft">{r.rule}</span>
                          {r.detail && <span className="ml-1 text-[10px] text-ink-muted">· {r.detail}</span>}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
              <div
                className="rounded-lg p-3"
                style={{
                  background: routingTone === 'green' ? 'rgba(16,185,129,0.10)' : 'rgba(245,158,11,0.10)',
                  border: `1px solid ${routingTone === 'green' ? 'rgba(16,185,129,0.30)' : 'rgba(245,158,11,0.30)'}`,
                }}
              >
                <p
                  className="text-[10px] font-semibold uppercase tracking-[0.14em]"
                  style={{ color: TONE_HEX[routingTone] }}
                >
                  Routing
                </p>
                <p className="mt-1 text-[13px] font-semibold leading-snug" style={{ color: TONE_HEX[routingTone] }}>
                  {note.routing.destination === 'postgres' ? '→ PostgreSQL' : '→ Review queue'}
                </p>
                {note.routing.reason && (
                  <p className="mt-1 text-[11px] text-ink-muted">{note.routing.reason}</p>
                )}
              </div>
            </div>
          </Zone>
        </div>

        {/* caption */}
        <div className="border-t px-5 py-4" style={{ borderColor: 'var(--line)' }}>
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

### Step 6.2 — Type-check + lint

Run: `npm run type-check && npm run lint`

Expected: clean.

### Step 6.3 — Visual smoke test

Run: `npm run dev` (port 3001). Open `http://localhost:3001/work/clinical-genai-pipeline` — page won't exist yet, so visit the component via a temporary check or wait for Task 12. **Defer visual verification to Task 15.**

### Step 6.4 — Commit

```bash
git add frontend/src/components/casestudy/clinicalGenai/CgExtractionDemo.tsx
git commit -m "$(cat <<'EOF'
feat(work): add CgExtractionDemo — interactive note→JSON→routing flow

Auto-cycles through 3 synthetic notes every 1900ms. Pause-on-interaction
matches CrTriageDemo pattern. All values are pre-computed fixtures.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 7 — `CgDataModel` component

**Files:**
- Create: `frontend/src/components/casestudy/clinicalGenai/CgDataModel.tsx`

Two-part section: a 3×2 grid of table cards with column chips, then a single full-width Module with a mock recovery-trends dashboard (KPI cards + inline SVG sparkline + filter chips).

### Step 7.1 — Implement the component

Create `frontend/src/components/casestudy/clinicalGenai/CgDataModel.tsx`:

```tsx
// frontend/src/components/casestudy/clinicalGenai/CgDataModel.tsx
import { Users, FileText, Database, Activity, History, ListChecks, TrendingUp, TrendingDown } from 'lucide-react'
import { CsSection, Module } from '../bits'

const TABLES = [
  {
    name: 'patients_demo',
    Icon: Users,
    body: 'Demographic anchor — synthetic only.',
    columns: ['id', 'cohort', 'enrolled_at'],
  },
  {
    name: 'rehab_notes',
    Icon: FileText,
    body: 'Raw dictated note bodies.',
    columns: ['id', 'patient_id', 'dictated_at', 'source'],
  },
  {
    name: 'extracted_metrics',
    Icon: Database,
    body: 'Per-note structured output.',
    columns: ['note_id', 'field', 'value', 'confidence'],
  },
  {
    name: 'metric_observations',
    Icon: Activity,
    body: 'Time-series flatten for analytics.',
    columns: ['patient_id', 'metric', 'value', 'observed_at'],
  },
  {
    name: 'extraction_audit_log',
    Icon: History,
    body: 'Append-only audit trail.',
    columns: ['note_id', 'stage', 'model_version', 'tokens', 'at'],
  },
  {
    name: 'review_queue',
    Icon: ListChecks,
    body: 'Routed low-confidence extractions.',
    columns: ['note_id', 'reason', 'status', 'routed_at'],
  },
]

const KPIS = [
  { label: 'Avg pain score',      value: '2.8',   trend: '-1.4',  Icon: TrendingDown, dir: 'good' as const },
  { label: 'Gait distance Δ',     value: '+22m',  trend: '+18m',  Icon: TrendingUp,   dir: 'good' as const },
  { label: 'Therapy tolerance',   value: '94%',   trend: '+11%',  Icon: TrendingUp,   dir: 'good' as const },
  { label: 'Discharge readiness', value: '0.81',  trend: '+0.22', Icon: TrendingUp,   dir: 'good' as const },
]

// Synthetic recovery curve, 8 sessions, normalized 0–1 for the spark line.
const CURVE = [0.20, 0.28, 0.31, 0.46, 0.55, 0.62, 0.74, 0.83]

function SparkLine() {
  const W = 320
  const H = 60
  const pad = 4
  const pts = CURVE.map((y, i) => {
    const x = pad + (i * (W - pad * 2)) / (CURVE.length - 1)
    const py = H - pad - y * (H - pad * 2)
    return `${x},${py}`
  }).join(' ')
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" aria-hidden>
      <polyline points={pts} fill="none" stroke="var(--plum)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      {CURVE.map((y, i) => {
        const x = pad + (i * (W - pad * 2)) / (CURVE.length - 1)
        const py = H - pad - y * (H - pad * 2)
        return <circle key={i} cx={x} cy={py} r={2.4} fill="var(--plum)" />
      })}
    </svg>
  )
}

export function CgDataModel() {
  return (
    <CsSection
      eyebrow="04 · Data model & analytics"
      title="Time-series recovery, modeled for analysis."
      intro="Normalized observation tables, append-only audit, and a review queue — designed so recovery trends are a query, not a project."
    >
      {/* Part A — schema grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TABLES.map(({ name, Icon, body, columns }) => (
          <div key={name} className="rounded-2xl bg-white p-5 ghair soft-shadow-sm">
            <div className="flex items-center gap-2.5">
              <div className="grid h-9 w-9 place-items-center rounded-lg" style={{ background: 'var(--plum-soft)' }}>
                <Icon size={16} style={{ color: 'var(--plum)' }} strokeWidth={1.9} />
              </div>
              <p className="text-[13px] font-semibold text-ink" style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace' }}>
                {name}
              </p>
            </div>
            <p className="mt-2.5 text-[12px] leading-relaxed text-ink-soft">{body}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {columns.map((c) => (
                <span
                  key={c}
                  className="inline-flex items-center rounded-full bg-[var(--cream-2)] px-2 py-[2px] text-[10px] font-medium text-ink-muted"
                  style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace' }}
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Part B — analytics mock */}
      <Module className="mt-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-plum">Recovery trends</p>
          <p className="text-[11px] text-ink-muted">Patient 042 · synthetic · 8-session window</p>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {KPIS.map(({ label, value, trend, Icon }) => (
            <div key={label} className="rounded-xl bg-[var(--cream-2)] p-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-muted">{label}</p>
              <p className="mt-1 font-display text-xl font-extrabold text-ink">{value}</p>
              <p className="mt-0.5 inline-flex items-center gap-1 text-[11px] font-medium" style={{ color: 'var(--green)' }}>
                <Icon size={12} strokeWidth={2.2} />
                {trend}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-xl bg-[var(--cream-2)] p-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-muted">Recovery curve</p>
          <div className="mt-2">
            <SparkLine />
          </div>
          <p className="mt-1 text-[10px] text-ink-muted">Composite recovery index, sessions 1–8 (synthetic).</p>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">Filters</span>
          {['Cohort · ortho post-op', 'Sessions 1–8', 'Confidence ≥ 0.6'].map((f) => (
            <span key={f} className="inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-medium text-ink-soft ghair">
              {f}
            </span>
          ))}
        </div>
      </Module>

      <p className="mt-6 text-xs italic text-ink-muted">
        Mock dashboard — synthetic data. The real pipeline targets Tableau or Power BI as the analytics surface.
      </p>
    </CsSection>
  )
}
```

### Step 7.2 — Type-check + lint

Run: `npm run type-check && npm run lint`

Expected: clean.

### Step 7.3 — Commit

```bash
git add frontend/src/components/casestudy/clinicalGenai/CgDataModel.tsx
git commit -m "$(cat <<'EOF'
feat(work): add CgDataModel — 6-table schema + mock dashboard

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 8 — `CgCostAware` component

**Files:**
- Create: `frontend/src/components/casestudy/clinicalGenai/CgCostAware.tsx`

4 cards in a 2×2 grid on desktop, stacked on mobile. Same card aesthetic as the architecture layer cards.

### Step 8.1 — Implement the component

Create `frontend/src/components/casestudy/clinicalGenai/CgCostAware.tsx`:

```tsx
// frontend/src/components/casestudy/clinicalGenai/CgCostAware.tsx
import { Scissors, Database, Layers, FileJson } from 'lucide-react'
import { CsSection } from '../bits'

const TECHNIQUES = [
  {
    Icon: Scissors,
    title: 'Prompt compression',
    body: 'Strip filler, normalize abbreviations, drop redundant context before the call.',
  },
  {
    Icon: Database,
    title: 'Caching repeated patterns',
    body: 'Hash-keyed cache for recurring note shapes — same input, no second call.',
  },
  {
    Icon: Layers,
    title: 'Split extraction from validation',
    body: 'Validation runs on structured output, not by re-prompting the model.',
  },
  {
    Icon: FileJson,
    title: 'Schema-constrained output',
    body: 'Structured outputs cut retries; malformed responses are caught at parse, not by another call.',
  },
]

export function CgCostAware() {
  return (
    <CsSection
      eyebrow="05 · Cost-aware design"
      title="Engineered for fewer, cheaper calls."
      intro="Token cost is a design constraint, not an afterthought."
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {TECHNIQUES.map(({ Icon, title, body }) => (
          <div key={title} className="rounded-2xl bg-white p-5 ghair soft-shadow-sm">
            <div className="grid h-10 w-10 place-items-center rounded-xl" style={{ background: 'var(--plum-soft)' }}>
              <Icon size={18} style={{ color: 'var(--plum)' }} strokeWidth={1.9} />
            </div>
            <h3 className="mt-3 font-display text-[15px] font-bold text-ink">{title}</h3>
            <p className="mt-1.5 text-[13px] leading-relaxed text-ink-soft">{body}</p>
          </div>
        ))}
      </div>

      <p className="mt-6 text-xs italic text-ink-muted">
        Design choices, not measured savings. The pipeline is designed to reduce unnecessary token usage and
        repeated model calls.
      </p>
    </CsSection>
  )
}
```

### Step 8.2 — Type-check + lint

Run: `npm run type-check && npm run lint`

Expected: clean.

### Step 8.3 — Commit

```bash
git add frontend/src/components/casestudy/clinicalGenai/CgCostAware.tsx
git commit -m "$(cat <<'EOF'
feat(work): add CgCostAware — token-economy design choices

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 9 — `CgChallenges` component

**Files:**
- Create: `frontend/src/components/casestudy/clinicalGenai/CgChallenges.tsx`

5 numbered challenge cards. Responsive grid: 1 col mobile, 2 cols tablet, 3 cols desktop with bottom row centered (`grid-cols-3` with last 2 cards spanning around center).

### Step 9.1 — Implement the component

Create `frontend/src/components/casestudy/clinicalGenai/CgChallenges.tsx`:

```tsx
// frontend/src/components/casestudy/clinicalGenai/CgChallenges.tsx
import { CsSection } from '../bits'

const CHALLENGES = [
  {
    num: '01',
    title: 'Messy clinical language',
    body: 'Dictated notes contain abbreviations, incomplete sentences, and inconsistent phrasing. The extractor has to be tolerant without inventing data.',
  },
  {
    num: '02',
    title: 'Data integrity',
    body: 'Invalid or missing metrics are flagged before being stored. Validation gates run on every extraction.',
  },
  {
    num: '03',
    title: 'Analytics readiness',
    body: 'Free-text recovery descriptions become normalized metrics suitable for time-series analysis.',
  },
  {
    num: '04',
    title: 'LLM cost control',
    body: 'Caching, compressed prompts, and structured outputs are layered to reduce unnecessary API calls.',
  },
  {
    num: '05',
    title: 'Human review',
    body: 'Low-confidence extractions route to a review queue. The pipeline never treats unsure as fact.',
  },
]

function ChallengeCard({ num, title, body }: { num: string; title: string; body: string }) {
  return (
    <div className="rounded-2xl bg-white p-5 ghair soft-shadow-sm">
      <span
        className="inline-flex items-center rounded-md px-2 py-[2px] text-[11px] font-bold tracking-[0.1em]"
        style={{ background: 'var(--plum-soft)', color: 'var(--plum)' }}
      >
        {num}
      </span>
      <h3 className="mt-3 font-display text-[15px] font-bold leading-snug text-ink">{title}</h3>
      <p className="mt-2 text-[13px] leading-relaxed text-ink-soft">{body}</p>
    </div>
  )
}

export function CgChallenges() {
  return (
    <CsSection
      eyebrow="06 · Engineering challenges"
      title="Where the work actually was."
      intro="Five concrete problems this pipeline is built to handle."
    >
      {/* Mobile/tablet: clean 1–2 col grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:hidden">
        {CHALLENGES.map((c) => (
          <ChallengeCard key={c.num} {...c} />
        ))}
      </div>

      {/* Desktop: 3 across top, 2 centered below */}
      <div className="hidden lg:block">
        <div className="grid grid-cols-3 gap-4">
          {CHALLENGES.slice(0, 3).map((c) => (
            <ChallengeCard key={c.num} {...c} />
          ))}
        </div>
        <div className="mt-4 grid grid-cols-3 gap-4">
          <div />
          {CHALLENGES.slice(3).map((c) => (
            <ChallengeCard key={c.num} {...c} />
          ))}
        </div>
      </div>
    </CsSection>
  )
}
```

### Step 9.2 — Type-check + lint

Run: `npm run type-check && npm run lint`

Expected: clean.

### Step 9.3 — Commit

```bash
git add frontend/src/components/casestudy/clinicalGenai/CgChallenges.tsx
git commit -m "$(cat <<'EOF'
feat(work): add CgChallenges — five engineering challenge cards

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 10 — `CgImpact` component

**Files:**
- Create: `frontend/src/components/casestudy/clinicalGenai/CgImpact.tsx`

Three sub-parts: capability chip grid (8 plum chips), 3 stat cards, operator chip strip.

### Step 10.1 — Implement the component

Create `frontend/src/components/casestudy/clinicalGenai/CgImpact.tsx`:

```tsx
// frontend/src/components/casestudy/clinicalGenai/CgImpact.tsx
import { Stethoscope, Database, Workflow, Layers, Code2, Brain, BarChart3, ShieldCheck, Calendar, Network, Lock } from 'lucide-react'
import { CsSection, Chip } from '../bits'

const CAPABILITIES = [
  { Icon: Stethoscope, label: 'Healthcare AI' },
  { Icon: Database,    label: 'Healthcare data engineering' },
  { Icon: Workflow,    label: 'Clinical workflow understanding' },
  { Icon: Layers,      label: 'PostgreSQL modeling' },
  { Icon: Code2,       label: 'Python backend (FastAPI)' },
  { Icon: Brain,       label: 'LLM system design' },
  { Icon: BarChart3,   label: 'Analytics dashboarding' },
  { Icon: ShieldCheck, label: 'Responsible AI design' },
]

const STATS = [
  { Icon: Calendar, value: '9+ yrs', label: 'Hospital rehab + clinical ops background', tint: 'var(--plum)', bg: 'var(--plum-soft)' },
  { Icon: Network,  value: '8',      label: 'Pipeline stages, human-in-the-loop',       tint: 'var(--blue)', bg: '#dbeafe' },
  { Icon: Lock,     value: '0',      label: 'PHI — synthetic data only',                tint: 'var(--green)', bg: '#d1fae5' },
]

const OPERATORS = ['Rehab clinics', 'Therapy networks', 'Healthcare AI teams']

export function CgImpact() {
  return (
    <CsSection
      eyebrow="07 · What this demonstrates"
      title="One project, eight capabilities."
      intro="Designed end-to-end so each layer is legible in isolation."
    >
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
        {CAPABILITIES.map(({ Icon, label }) => (
          <div key={label} className="inline-flex items-center gap-2 rounded-xl bg-white px-3 py-2.5 ghair soft-shadow-sm">
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md" style={{ background: 'var(--plum-soft)' }}>
              <Icon size={14} style={{ color: 'var(--plum)' }} strokeWidth={1.9} />
            </span>
            <span className="text-[12px] font-medium text-ink-soft">{label}</span>
          </div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
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

### Step 10.2 — Type-check + lint

Run: `npm run type-check && npm run lint`

Expected: clean.

### Step 10.3 — Commit

```bash
git add frontend/src/components/casestudy/clinicalGenai/CgImpact.tsx
git commit -m "$(cat <<'EOF'
feat(work): add CgImpact — capability surface + honest stats

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 11 — `CgClose` component

**Files:**
- Create: `frontend/src/components/casestudy/clinicalGenai/CgClose.tsx`

Mirrors `CrClose.tsx` — gradient CTA card, provocation headline, two action buttons.

### Step 11.1 — Implement the component

Create `frontend/src/components/casestudy/clinicalGenai/CgClose.tsx`:

```tsx
// frontend/src/components/casestudy/clinicalGenai/CgClose.tsx
import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'

export function CgClose() {
  return (
    <section className="mx-auto max-w-[1180px] px-6 py-12">
      <div
        className="flex flex-col items-start gap-6 rounded-3xl px-9 py-9 ghair sm:flex-row sm:items-center sm:justify-between"
        style={{ background: 'linear-gradient(105deg,#ede9fe 0%,#f5f0fe 45%,#fce7f3 100%)' }}
      >
        <div>
          <h2 className="font-display text-2xl font-extrabold leading-tight text-ink sm:text-[1.75rem]">
            Documentation that knows when to ask for a human.
          </h2>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-soft">
            Happy to walk through the extraction schema, the validation policy, and what a production FHIR
            integration would look like.
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

### Step 11.2 — Type-check + lint

Run: `npm run type-check && npm run lint`

Expected: clean.

### Step 11.3 — Commit

```bash
git add frontend/src/components/casestudy/clinicalGenai/CgClose.tsx
git commit -m "$(cat <<'EOF'
feat(work): add CgClose — closing CTA card

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 12 — Wire up the page

**Files:**
- Create: `frontend/src/app/work/clinical-genai-pipeline/page.tsx`

Mirrors `frontend/src/app/work/clinical-risk-engine/page.tsx`.

### Step 12.1 — Implement the page

Create `frontend/src/app/work/clinical-genai-pipeline/page.tsx`:

```tsx
// frontend/src/app/work/clinical-genai-pipeline/page.tsx
import type { Metadata } from 'next'
import { HomeNav } from '@/components/home/HomeNav'
import { SiteFooter } from '@/components/home/SiteFooter'
import { Reveal } from '@/components/home/Reveal'
import { ProjectMeta } from '@/components/work/ProjectMeta'
import { CgHero } from '@/components/casestudy/clinicalGenai/CgHero'
import { CgProblem } from '@/components/casestudy/clinicalGenai/CgProblem'
import { CgArchitecture } from '@/components/casestudy/clinicalGenai/CgArchitecture'
import { CgExtractionDemo } from '@/components/casestudy/clinicalGenai/CgExtractionDemo'
import { CgDataModel } from '@/components/casestudy/clinicalGenai/CgDataModel'
import { CgCostAware } from '@/components/casestudy/clinicalGenai/CgCostAware'
import { CgChallenges } from '@/components/casestudy/clinicalGenai/CgChallenges'
import { CgImpact } from '@/components/casestudy/clinicalGenai/CgImpact'
import { CgClose } from '@/components/casestudy/clinicalGenai/CgClose'

export const metadata: Metadata = {
  title: 'Clinical GenAI Agent & Analytics Pipeline — Lloyd Dela Cruz',
  description:
    'AI-assisted clinical documentation and analytics pipeline for rehab workflows — schema-constrained extraction, validation, human review, and time-series recovery analytics. Designed pipeline; synthetic data only.',
}

export default function Page() {
  return (
    <div className="home2 min-h-screen">
      <HomeNav active="Work" />
      <main>
        <CgHero />
        <ProjectMeta slug="clinical-genai-pipeline" />
        <Reveal>
          <CgProblem />
        </Reveal>
        <Reveal>
          <CgArchitecture />
        </Reveal>
        <Reveal>
          <CgExtractionDemo />
        </Reveal>
        <Reveal>
          <CgDataModel />
        </Reveal>
        <Reveal>
          <CgCostAware />
        </Reveal>
        <Reveal>
          <CgChallenges />
        </Reveal>
        <Reveal>
          <CgImpact />
        </Reveal>
        <CgClose />
      </main>
      <SiteFooter />
    </div>
  )
}
```

### Step 12.2 — Type-check + lint + build

Run: `npm run type-check && npm run lint && npm run build`

Expected: clean. Build should include the new route.

### Step 12.3 — Commit

```bash
git add frontend/src/app/work/clinical-genai-pipeline/
git commit -m "$(cat <<'EOF'
feat(work): wire up /work/clinical-genai-pipeline page

Composes the 9 section components in order, matching the clinical-risk-engine
page chrome (HomeNav + ProjectMeta + Reveal-wrapped sections + SiteFooter).

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 13 — Homepage card + `extraction` `PreviewMock` variant

**Files:**
- Modify: `frontend/src/components/home/FeaturedWork.tsx`

Two changes in one file:
1. Append a new entry to `PROJECTS[]`
2. Add `'extraction'` to the `Variant` type union and a new branch in `PreviewMock` rendering a simple note→JSON glyph

### Step 13.1 — Add `'extraction'` to the Variant union

In `frontend/src/components/home/FeaturedWork.tsx`, change line 20:

```ts
// Before:
type Variant = 'states' | 'topology' | 'finance' | 'mobile' | 'forecast' | 'triage'

// After:
type Variant = 'states' | 'topology' | 'finance' | 'mobile' | 'forecast' | 'triage' | 'extraction'
```

### Step 13.2 — Import `FileText` icon

In `frontend/src/components/home/FeaturedWork.tsx`, line 3-13, add `FileText` to the lucide-react imports if not already imported. Verify current imports — `FileText` is NOT in the existing imports list. Add it:

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
  FileText,
} from 'lucide-react'
```

### Step 13.3 — Append the new project entry

In `frontend/src/components/home/FeaturedWork.tsx`, inside the `PROJECTS` array, append (after the existing SpendWise entry, before the closing `]`):

```ts
  {
    badge: 'APPLIED AI / CLINICAL DOCUMENTATION',
    TagIcon: FileText,
    variant: 'extraction',
    accent: 'var(--plum)',
    wash: 'linear-gradient(135deg,#f3f0fb,#fbf7fe)',
    title: 'Clinical GenAI Agent & Analytics Pipeline',
    body: 'AI-assisted rehab documentation pipeline that converts messy dictated therapy notes into structured recovery metrics and analytics-ready data — with validation, audit, and human review built in.',
    stack: 'FastAPI, Python, PostgreSQL, LLMs, React, TypeScript',
    href: '/work/clinical-genai-pipeline',
    status: 'prototype',
    capabilities: ['ai-assisted', 'case-study'],
  },
```

### Step 13.4 — Add the `'extraction'` branch in `PreviewMock`

In `frontend/src/components/home/FeaturedWork.tsx`, inside the `PreviewMock` `Window`, after the `variant === 'mobile'` block and before the closing `</Window>` tag, append:

```tsx
        {variant === 'extraction' && (
          <div className="flex flex-1 items-center gap-2">
            {/* note lines */}
            <div className="flex flex-1 flex-col gap-1.5">
              <Bar w="80%" />
              <Bar w="60%" />
              <Bar w="72%" />
              <Bar w="48%" />
            </div>
            {/* arrow */}
            <svg width="18" height="10" viewBox="0 0 18 10" aria-hidden>
              <path d="M0 5 H14 M11 1 L15 5 L11 9" stroke={accent} strokeOpacity="0.6" strokeWidth="1.3" fill="none" />
            </svg>
            {/* JSON-style panel */}
            <div className="flex w-[68px] shrink-0 flex-col gap-1 rounded-md bg-white/85 p-1.5" style={{ border: `1px solid ${SOFT}` }}>
              <div className="flex items-center gap-1">
                <span className="h-1 flex-1 rounded-full" style={{ background: accent, opacity: 0.6 }} />
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'var(--green)' }} />
              </div>
              <div className="flex items-center gap-1">
                <span className="h-1 flex-1 rounded-full" style={{ background: accent, opacity: 0.45 }} />
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'var(--amber)' }} />
              </div>
              <div className="flex items-center gap-1">
                <span className="h-1 flex-1 rounded-full" style={{ background: accent, opacity: 0.6 }} />
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'var(--green)' }} />
              </div>
            </div>
          </div>
        )}
```

### Step 13.5 — Type-check + lint + build

Run: `npm run type-check && npm run lint && npm run build`

Expected: clean.

### Step 13.6 — Commit

```bash
git add frontend/src/components/home/FeaturedWork.tsx
git commit -m "$(cat <<'EOF'
feat(home): add clinical-genai card with extraction preview variant

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 14 — Pin the card to the Applied AI band on `/work`

**Files:**
- Modify: `frontend/src/app/work/page.tsx`

Without this change, the new card falls into "Product & operational work" because the partition uses an explicit Set.

### Step 14.1 — Add the new href to `APPLIED_AI_HREFS`

In `frontend/src/app/work/page.tsx`, change lines 15-18:

```ts
// Before:
const APPLIED_AI_HREFS = new Set([
  '/work/clinical-risk-engine',
  '/work/population-health-intelligence',
])

// After:
const APPLIED_AI_HREFS = new Set([
  '/work/clinical-risk-engine',
  '/work/population-health-intelligence',
  '/work/clinical-genai-pipeline',
])
```

### Step 14.2 — Type-check + build

Run: `npm run type-check && npm run build`

Expected: clean.

### Step 14.3 — Commit

```bash
git add frontend/src/app/work/page.tsx
git commit -m "$(cat <<'EOF'
feat(work): pin clinical-genai-pipeline to Applied AI band

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 15 — Visual smoke test + final verification

**Files:** none modified.

This is the final end-to-end check. No commit.

### Step 15.1 — Run the full suite

Run, sequentially:

```bash
npm run type-check
npm run lint
npm run test
npm run build
```

Expected: every command exits 0.

### Step 15.2 — Visual smoke test in dev mode

Run: `npm run dev`

Then in a browser at `http://localhost:3001`:

- [ ] **Homepage `/`** — scroll to "Featured work". Confirm:
  - New card appears with badge `APPLIED AI / CLINICAL DOCUMENTATION`, title "Clinical GenAI Agent & Analytics Pipeline"
  - Preview mock renders the new `extraction` variant (note bars → arrow → JSON-style panel)
  - Card uses warm plum register (no dark background)
  - Card hover lifts; arrow nudges right
  - Clicking navigates to `/work/clinical-genai-pipeline`

- [ ] **`/work`** — scroll to "Applied AI systems" tier. Confirm the new card sits alongside the other two Applied-AI cards (3 cards total in that grid). Confirm it does NOT also appear in "Product & operational work".

- [ ] **`/work/clinical-genai-pipeline`** — visit directly. Confirm:
  - Page loads with `home2` warm cream background, no console errors
  - Hero renders with 4-node SVG glyph (`Mic → Cpu → Brain → Database`), `Database` highlighted as primary
  - `ProjectMeta` strip appears under hero with status `Prototype`, role, period, stack chips
  - 9 sections render in order with `Reveal` entrance animations as you scroll
  - **Extraction demo auto-cycles**: every ~1.9s the active zone shifts, and on wrap the note advances. Three notes visible: clean, ambiguous, incomplete.
  - Clicking a step pill or the note dropdown pauses auto-cycle
  - `↺ Reset` returns to step 1, note 1, paused
  - Architecture spine renders 8 stages on desktop (4 per row, arrow between rows on `lg`); single column on mobile
  - Data model: 6 table cards in 3×2 grid, then mock analytics dashboard with KPIs + sparkline
  - Challenges: 5 cards (3 on top row, 2 centered on bottom row at `lg`)
  - Close CTA has the gradient background and two action buttons

- [ ] **Reduced-motion check** — in browser devtools, enable `prefers-reduced-motion: reduce`. Reload `/work/clinical-genai-pipeline` and confirm:
  - Extraction demo starts paused (`▶ Run loop` button visible, not `▮▮ Pause`)
  - `Reveal` entrances are instant (no slide-up animation)

- [ ] **Mobile check** — narrow browser to 380px width:
  - Extraction demo zones stack vertically
  - Architecture spine collapses to single column
  - Challenges grid collapses to single column
  - All text remains readable; no horizontal scroll

### Step 15.3 — Final git status check

Run: `git status && git log --oneline -16`

Expected: clean working tree; 14 new commits (one per Task 1–14), each titled `feat(...):` with the Claude co-author trailer.

### Step 15.4 — Commit the spec + plan (if not already committed)

If the spec (`docs/superpowers/specs/2026-05-14-clinical-genai-pipeline-design.md`) and this plan (`docs/superpowers/plans/2026-05-14-clinical-genai-pipeline.md`) are untracked, commit them:

```bash
git add docs/superpowers/specs/2026-05-14-clinical-genai-pipeline-design.md docs/superpowers/plans/2026-05-14-clinical-genai-pipeline.md
git commit -m "$(cat <<'EOF'
docs: spec + plan for clinical-genai-pipeline case study

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Risk register / things to watch

1. **`CgExtractionDemo` `noteIdx` lint trap** — the demo's `noteIdx` state is read via `const note = NOTES[noteIdx]`. If ESLint complains about unused state, double-check that line isn't accidentally dropped. The `setNoteIdx` setter is the load-bearing call inside the auto-cycle interval.

2. **Architecture spine arrow-between-rows on mobile** — the vertical arrow between row1 and row2 uses `hidden lg:flex`. On mobile (`<lg`) the spine collapses to a single column and the arrow disappears; that's intentional (the visual flow is implied by stacking order). If a future tweak wants a mobile arrow, add a `lg:hidden` rotated arrow in between row1 and row2.

3. **Card insertion order in `PROJECTS`** — currently appended at the end, which puts it last visually. The `/work` partition logic groups by href, so the three Applied-AI cards still cluster correctly on `/work`. On the homepage `FeaturedWork` (which renders all non-anchor projects in one grid), the new card lands at the bottom — that's acceptable since the homepage grid isn't ordered by recency. If we want it grouped with the other Applied-AI tiles on the homepage, move its `PROJECTS[]` entry to sit between the Population-Health and Clinical-Risk entries.

4. **No tests for visual components** — verification is manual via Step 15.2. If a regression slips through, the most likely failure mode is the extraction demo's state machine — that's the only stateful logic in the entire new surface.
