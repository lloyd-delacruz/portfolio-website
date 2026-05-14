# Project Meta Credibility Strip Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a typed projects registry and a mono `<ProjectMeta>` credibility strip rendered directly below the hero on seven `/work/*` pages, replacing two ad-hoc META blocks on the AI deep-dives.

**Architecture:** Three new modules — a pure-data registry in `src/lib/projects.ts`, a presentational `<ProjectMeta>` component in `src/components/work/ProjectMeta.tsx`, and a `.project-meta` CSS block scoped inside `.home2` in `src/app/globals.css`. The component takes a `slug` prop, looks the record up in the registry, and renders a `<dl>` of label/value pairs in mono. Two deep-dive hero components (`CrHero.tsx`, `PhHero.tsx`) lose their existing 4-field META blocks; the new strip subsumes them.

**Tech Stack:** Next.js 14, React, TypeScript, Vitest, `@testing-library/react`, plain CSS in `globals.css` (no CSS modules in this codebase). All work pages live inside `.home2`.

**Spec reference:** `docs/superpowers/specs/2026-05-13-project-meta-credibility-strip-design.md`

---

## Important context the implementer needs

- **Test runner:** Vitest. `npm run test` runs once; `npm run test:watch` watches. Run a single file with `npx vitest run <path>`.
- **Type-check:** `npm run type-check` (runs `tsc --noEmit`). Lint: `npm run lint`. Dev server: `npm run dev` on port 3001.
- **All commands run from `frontend/`**, not the repo root. The plan paths reference files from the repo root (so `frontend/src/...`), but commands assume `cd frontend` first.
- **Tests live next to components** (see `frontend/src/components/home/HomeHero.test.tsx` for the established pattern).
- **CSS lives in `globals.css`** under the `.home2` scope (line 416 onwards). Do not create new CSS files. The new `.project-meta` block sits inside `.home2`.
- **The `.home2` scope defines the design tokens** `--ink`, `--ink-soft`, `--ink-muted`, `--plum`, `--line` etc. The strip references these.
- **No public repos exist** for any project — the `source` field is reserved in the schema but never populated in this PR.
- **The two AI deep-dive heroes** (`CrHero.tsx`, `PhHero.tsx`) each define a local `const META = [...]` array and render it as a `<dl>` near the bottom of the hero. **That entire META array and its `<dl>` rendering must be removed**; the new strip outside the hero subsumes it.

---

## Task 1: Registry types and all seven entries

**Files:**
- Create: `frontend/src/lib/projects.ts`
- Create: `frontend/src/lib/projects.test.ts`

This task creates the single source of truth. Pure data, no React.

- [ ] **Step 1: Write the failing test**

Create `frontend/src/lib/projects.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { PROJECTS } from './projects'

describe('PROJECTS registry', () => {
  it('every entry slug matches its key', () => {
    Object.entries(PROJECTS).forEach(([key, record]) => {
      expect(record.slug).toBe(key)
    })
  })

  it('every entry has slug + title', () => {
    Object.values(PROJECTS).forEach((record) => {
      expect(record.slug).toBeTruthy()
      expect(record.title).toBeTruthy()
    })
  })

  it('contains all seven in-scope projects', () => {
    const expected = [
      'wheelchair-tracking',
      'clinical-risk-engine',
      'population-health-intelligence',
      'apex-protocol',
      'equitrackr',
      'spendwise',
      'website-gemms',
    ]
    expected.forEach((slug) => {
      expect(PROJECTS[slug]).toBeDefined()
    })
  })

  it('every status value is one of the allowed enum values', () => {
    const allowed = new Set(['live', 'in-production', 'prototype', 'archived', 'concept'])
    Object.values(PROJECTS).forEach((record) => {
      if (record.status) expect(allowed.has(record.status)).toBe(true)
    })
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd frontend && npx vitest run src/lib/projects.test.ts`
Expected: FAIL — cannot resolve `./projects`.

- [ ] **Step 3: Write the registry**

Create `frontend/src/lib/projects.ts`:

```ts
export type ProjectStatus = 'live' | 'in-production' | 'prototype' | 'archived' | 'concept'

export interface ProjectMetaRecord {
  slug: string
  title: string
  status?: ProjectStatus
  statusLabel?: string
  role?: string
  period?: string
  deployment?: string
  stack?: string[]
  live?: { href: string; label?: string }
  source?: { href: string; label?: string }
  scale?: string
}

export const PROJECTS: Record<string, ProjectMetaRecord> = {
  'wheelchair-tracking': {
    slug: 'wheelchair-tracking',
    title: 'Wheelchair Tracking',
    status: 'live',
    statusLabel: 'Live since Aug 2025',
    role: 'Built solo',
    period: 'Aug 2025 – present',
    deployment: 'Hospital intranet · 4 sites',
    stack: ['Microsoft Lists', 'QR workflows', 'React', 'TypeScript'],
    scale: '4 sites · 800+ assets',
  },

  'clinical-risk-engine': {
    slug: 'clinical-risk-engine',
    title: 'Clinical Risk Engine',
    status: 'prototype',
    role: 'Applied AI engineering',
    period: '2025',
    deployment: 'Static export · client-side inference',
    stack: ['Next.js', 'TypeScript', 'Python', 'scikit-learn'],
    scale: 'Wisconsin Diagnostic · 569 cases · 30 features',
  },

  'population-health-intelligence': {
    slug: 'population-health-intelligence',
    title: 'Population-Health Intelligence Platform',
    status: 'prototype',
    role: 'Applied AI engineering',
    period: '2025',
    deployment: 'Static export · client-side inference',
    stack: ['Next.js', 'TypeScript', 'Python', 'scikit-learn'],
    scale: '193 countries · WHO · World Bank · IMF',
  },

  'apex-protocol': {
    slug: 'apex-protocol',
    title: 'Apex Protocol',
    status: 'concept',
    role: 'Solo concept',
    period: '2025',
  },

  'equitrackr': {
    slug: 'equitrackr',
    title: 'EquiTrackr',
    status: 'prototype',
    role: 'Built solo',
    period: '2025',
    stack: ['Next.js', 'TypeScript'],
  },

  'spendwise': {
    slug: 'spendwise',
    title: 'SpendWise',
    status: 'prototype',
    role: 'Built solo',
    period: '2025',
    stack: ['Next.js', 'TypeScript'],
  },

  'website-gemms': {
    slug: 'website-gemms',
    title: 'Website Gemms',
    status: 'concept',
    role: 'Solo concept',
    period: '2025',
  },
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd frontend && npx vitest run src/lib/projects.test.ts`
Expected: PASS — 4 tests pass.

- [ ] **Step 5: Run type-check**

Run: `cd frontend && npm run type-check`
Expected: PASS — no type errors.

- [ ] **Step 6: Commit**

```bash
git add frontend/src/lib/projects.ts frontend/src/lib/projects.test.ts
git commit -m "feat(projects): add typed projects registry with seven entries"
```

---

## Task 2: ProjectMeta component — null cases

**Files:**
- Create: `frontend/src/components/work/ProjectMeta.tsx`
- Create: `frontend/src/components/work/ProjectMeta.test.tsx`

Build the component skeleton first, with the safe-fallback behavior verified.

- [ ] **Step 1: Write the failing tests**

Create `frontend/src/components/work/ProjectMeta.test.tsx`:

```tsx
import { describe, it, expect, vi, afterEach } from 'vitest'
import { render } from '@testing-library/react'
import { ProjectMeta } from './ProjectMeta'

describe('ProjectMeta — null cases', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('returns null when slug is not in the registry', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const { container } = render(<ProjectMeta slug="this-slug-does-not-exist" />)
    expect(container.firstChild).toBeNull()
    warnSpy.mockRestore()
  })

  it('warns in dev when slug is not in the registry', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    render(<ProjectMeta slug="missing-slug" />)
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('missing-slug'))
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd frontend && npx vitest run src/components/work/ProjectMeta.test.tsx`
Expected: FAIL — cannot resolve `./ProjectMeta`.

- [ ] **Step 3: Write minimal implementation**

Create `frontend/src/components/work/ProjectMeta.tsx`:

```tsx
import { PROJECTS } from '@/lib/projects'

interface Props {
  slug: string
}

export function ProjectMeta({ slug }: Props) {
  const record = PROJECTS[slug]

  if (!record) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(`ProjectMeta: no registry entry for slug "${slug}"`)
    }
    return null
  }

  return null
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd frontend && npx vitest run src/components/work/ProjectMeta.test.tsx`
Expected: PASS — 2 tests pass.

- [ ] **Step 5: Commit**

```bash
git add frontend/src/components/work/ProjectMeta.tsx frontend/src/components/work/ProjectMeta.test.tsx
git commit -m "feat(work): scaffold ProjectMeta with null-case handling"
```

---

## Task 3: ProjectMeta — full rendering for Flavor A

**Files:**
- Modify: `frontend/src/components/work/ProjectMeta.test.tsx`
- Modify: `frontend/src/components/work/ProjectMeta.tsx`

Flavor A (wheelchair-tracking) exercises every field except `live`/`source`. Get this right and the other flavors fall out.

- [ ] **Step 1: Add failing tests for Flavor A**

Append to `frontend/src/components/work/ProjectMeta.test.tsx` (after the existing `describe` block):

```tsx
describe('ProjectMeta — Flavor A (wheelchair-tracking)', () => {
  it('renders Status field with statusLabel and dot', () => {
    const { container, getByText } = render(<ProjectMeta slug="wheelchair-tracking" />)
    expect(getByText('Status')).toBeInTheDocument()
    expect(getByText('Live since Aug 2025')).toBeInTheDocument()
    const dot = container.querySelector('.project-meta__dot')
    expect(dot).toHaveAttribute('data-state', 'live')
    expect(dot).toHaveAttribute('aria-hidden', 'true')
  })

  it('renders Role, Period, Deployment, Scale fields', () => {
    const { getByText } = render(<ProjectMeta slug="wheelchair-tracking" />)
    expect(getByText('Role')).toBeInTheDocument()
    expect(getByText('Built solo')).toBeInTheDocument()
    expect(getByText('Period')).toBeInTheDocument()
    expect(getByText('Aug 2025 – present')).toBeInTheDocument()
    expect(getByText('Deployment')).toBeInTheDocument()
    expect(getByText('Hospital intranet · 4 sites')).toBeInTheDocument()
    expect(getByText('Scale')).toBeInTheDocument()
    expect(getByText('4 sites · 800+ assets')).toBeInTheDocument()
  })

  it('renders all stack chips', () => {
    const { getByText } = render(<ProjectMeta slug="wheelchair-tracking" />)
    ;['Microsoft Lists', 'QR workflows', 'React', 'TypeScript'].forEach((chip) => {
      expect(getByText(chip)).toBeInTheDocument()
    })
  })

  it('does not render Live or Source fields when unset', () => {
    const { queryByText } = render(<ProjectMeta slug="wheelchair-tracking" />)
    expect(queryByText('Live')).not.toBeInTheDocument()
    expect(queryByText('Source')).not.toBeInTheDocument()
  })

  it('wrapper has region role with aria-label', () => {
    const { getByRole } = render(<ProjectMeta slug="wheelchair-tracking" />)
    expect(getByRole('region', { name: /project metadata/i })).toBeInTheDocument()
  })
})
```

Add the import for `screen` is not needed — we're using destructured `render` results. Make sure the top of the file already imports `render` from `@testing-library/react`.

- [ ] **Step 2: Run test to verify it fails**

Run: `cd frontend && npx vitest run src/components/work/ProjectMeta.test.tsx`
Expected: FAIL — five new tests fail; component still returns `null`.

- [ ] **Step 3: Replace the component implementation**

Replace the entire contents of `frontend/src/components/work/ProjectMeta.tsx` with:

```tsx
import { PROJECTS, type ProjectStatus } from '@/lib/projects'

interface Props {
  slug: string
}

const STATUS_DISPLAY: Record<ProjectStatus, string> = {
  'live': 'Live',
  'in-production': 'In production',
  'prototype': 'Prototype',
  'archived': 'Archived',
  'concept': 'Concept',
}

export function ProjectMeta({ slug }: Props) {
  const record = PROJECTS[slug]

  if (!record) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(`ProjectMeta: no registry entry for slug "${slug}"`)
    }
    return null
  }

  const hasStack = record.stack && record.stack.length > 0
  const hasContent =
    record.status ||
    record.statusLabel ||
    record.role ||
    record.period ||
    record.deployment ||
    record.scale ||
    record.live?.href ||
    record.source?.href ||
    hasStack

  if (!hasContent) return null

  const statusText = record.statusLabel ?? (record.status ? STATUS_DISPLAY[record.status] : undefined)

  return (
    <aside className="project-meta" role="region" aria-label="Project metadata">
      <dl className="project-meta__list">
        {statusText && (
          <div className="project-meta__field">
            <dt>Status</dt>
            <dd>
              {record.status && (
                <span
                  className="project-meta__dot"
                  data-state={record.status}
                  aria-hidden="true"
                />
              )}
              {statusText}
            </dd>
          </div>
        )}
        {record.role && (
          <div className="project-meta__field">
            <dt>Role</dt>
            <dd>{record.role}</dd>
          </div>
        )}
        {record.period && (
          <div className="project-meta__field">
            <dt>Period</dt>
            <dd>{record.period}</dd>
          </div>
        )}
        {record.deployment && (
          <div className="project-meta__field">
            <dt>Deployment</dt>
            <dd>{record.deployment}</dd>
          </div>
        )}
        {record.scale && (
          <div className="project-meta__field">
            <dt>Scale</dt>
            <dd>{record.scale}</dd>
          </div>
        )}
        {record.live?.href && (
          <div className="project-meta__field">
            <dt>Live</dt>
            <dd>
              <a href={record.live.href}>{record.live.label ?? record.live.href}</a>
            </dd>
          </div>
        )}
        {record.source?.href && (
          <div className="project-meta__field">
            <dt>Source</dt>
            <dd>
              <a href={record.source.href}>{record.source.label ?? record.source.href}</a>
            </dd>
          </div>
        )}
        {hasStack && (
          <div className="project-meta__field project-meta__field--wide">
            <dt>Stack</dt>
            <dd>
              {record.stack!.map((chip) => (
                <span key={chip} className="project-meta__chip">
                  {chip}
                </span>
              ))}
            </dd>
          </div>
        )}
      </dl>
    </aside>
  )
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `cd frontend && npx vitest run src/components/work/ProjectMeta.test.tsx`
Expected: PASS — 7 tests pass total (2 null-case + 5 Flavor A).

- [ ] **Step 5: Commit**

```bash
git add frontend/src/components/work/ProjectMeta.tsx frontend/src/components/work/ProjectMeta.test.tsx
git commit -m "feat(work): implement ProjectMeta full rendering"
```

---

## Task 4: ProjectMeta — Flavor C (thin-stub) tests

**Files:**
- Modify: `frontend/src/components/work/ProjectMeta.test.tsx`

The implementation is already complete; this task just verifies omitted-field behavior with a different fixture.

- [ ] **Step 1: Add Flavor C tests**

Append to `frontend/src/components/work/ProjectMeta.test.tsx`:

```tsx
describe('ProjectMeta — Flavor C (equitrackr — thin stub)', () => {
  it('renders Status, Role, Period, Stack only', () => {
    const { getByText } = render(<ProjectMeta slug="equitrackr" />)
    expect(getByText('Status')).toBeInTheDocument()
    expect(getByText('Prototype')).toBeInTheDocument()
    expect(getByText('Role')).toBeInTheDocument()
    expect(getByText('Built solo')).toBeInTheDocument()
    expect(getByText('Period')).toBeInTheDocument()
    expect(getByText('Stack')).toBeInTheDocument()
  })

  it('omits Deployment, Scale, Live, Source', () => {
    const { queryByText } = render(<ProjectMeta slug="equitrackr" />)
    expect(queryByText('Deployment')).not.toBeInTheDocument()
    expect(queryByText('Scale')).not.toBeInTheDocument()
    expect(queryByText('Live')).not.toBeInTheDocument()
    expect(queryByText('Source')).not.toBeInTheDocument()
  })

  it('status dot reflects prototype state', () => {
    const { container } = render(<ProjectMeta slug="equitrackr" />)
    const dot = container.querySelector('.project-meta__dot')
    expect(dot).toHaveAttribute('data-state', 'prototype')
  })
})
```

- [ ] **Step 2: Run tests to verify they pass**

Run: `cd frontend && npx vitest run src/components/work/ProjectMeta.test.tsx`
Expected: PASS — 10 tests pass.

- [ ] **Step 3: Commit**

```bash
git add frontend/src/components/work/ProjectMeta.test.tsx
git commit -m "test(work): cover ProjectMeta thin-stub flavor"
```

---

## Task 5: Add `.project-meta` CSS to globals.css

**Files:**
- Modify: `frontend/src/app/globals.css`

Add the CSS for the strip inside the `.home2` block. The block already defines the design tokens we need.

- [ ] **Step 1: Read globals.css to find the insertion point**

Open `frontend/src/app/globals.css`. Find the end of the `.home2` block — that's after the keyframes around line 505. The `.project-meta` block goes at the very end of the `.home2`-scoped rules but before the closing of any wrapping media queries (none for `.home2`).

Insert the new CSS at the end of the `.home2`-scoped section. A safe approach: search for the last `.home2 ` rule in the file and append immediately after.

- [ ] **Step 2: Add the CSS block**

Append to `frontend/src/app/globals.css` (immediately after the last `.home2`-scoped rule):

```css
/* ─────────────────────────────────────────────────────────────────
   ProjectMeta credibility strip (rendered on /work/* pages)
   Scoped under .home2 so it inherits cream tokens.
   [data-register="dark"] override kept as future-proofing — not
   applied to any current page.
   ───────────────────────────────────────────────────────────────── */

.home2 .project-meta {
  --meta-rule:        rgba(28, 22, 46, 0.08);
  --meta-ink:         var(--ink-soft);
  --meta-label-ink:   var(--ink-muted);
  --meta-chip-border: rgba(28, 22, 46, 0.12);

  border-top:    1px solid var(--meta-rule);
  border-bottom: 1px solid var(--meta-rule);
  margin: 0 auto;
  max-width: 1180px;
  padding: 1.5rem;
}

.home2 .project-meta__list {
  display: flex;
  flex-wrap: wrap;
  column-gap: 40px;
  row-gap: 20px;
  margin: 0;
  padding: 0;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
}

.home2 .project-meta__field {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 0;
}

.home2 .project-meta__field--wide {
  flex: 1 0 100%;
}

.home2 .project-meta dt {
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: var(--meta-label-ink);
}

.home2 .project-meta dd {
  font-size: 13px;
  line-height: 1.3;
  color: var(--meta-ink);
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin: 0;
}

.home2 .project-meta__dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.home2 .project-meta__dot[data-state="live"]          { background: #16a34a; }
.home2 .project-meta__dot[data-state="in-production"] { background: #16a34a; }
.home2 .project-meta__dot[data-state="prototype"]     { background: #d97706; }
.home2 .project-meta__dot[data-state="archived"]      { background: #6b7280; }
.home2 .project-meta__dot[data-state="concept"]       { background: #6b7280; }

.home2 .project-meta__chip {
  display: inline-block;
  border: 1px solid var(--meta-chip-border);
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 4px;
  color: var(--meta-ink);
}

@media (max-width: 640px) {
  .home2 .project-meta__field:not(.project-meta__field--wide) {
    flex: 1 0 100%;
  }
}

/* Future-proofing: dark-register override. No page currently
   carries data-register="dark"; the deep-dive register described
   in the applied-ai-system-deep-dives spec was never implemented. */
[data-register="dark"] .project-meta {
  --meta-rule:        #1F1F22;
  --meta-ink:         #E5E5E5;
  --meta-label-ink:   #6B7280;
  --meta-chip-border: #1F1F22;
  background: #111114;
  border-radius: 12px;
  border: 1px solid var(--meta-rule);
}

[data-register="dark"] .project-meta__dot[data-state="live"] {
  background: #7DD3FC;
}
```

- [ ] **Step 3: Run type-check**

Run: `cd frontend && npm run type-check`
Expected: PASS — CSS is not type-checked but this is the cheapest sanity gate before continuing.

- [ ] **Step 4: Commit**

```bash
git add frontend/src/app/globals.css
git commit -m "feat(work): add .project-meta CSS scoped under .home2"
```

---

## Task 6: Retrofit `/work/wheelchair-tracking`

**Files:**
- Modify: `frontend/src/app/work/wheelchair-tracking/page.tsx`

Simplest retrofit — full-structure page in `.home2`. Insert `<ProjectMeta />` between `<WcHero />` and the first `<Reveal>`.

- [ ] **Step 1: Open the file and add the import**

Add to the imports in `frontend/src/app/work/wheelchair-tracking/page.tsx`:

```tsx
import { ProjectMeta } from '@/components/work/ProjectMeta'
```

- [ ] **Step 2: Insert the strip below the hero**

In the same file, change:

```tsx
        <WcHero />
        <Reveal><WcProblem /></Reveal>
```

to:

```tsx
        <WcHero />
        <ProjectMeta slug="wheelchair-tracking" />
        <Reveal><WcProblem /></Reveal>
```

- [ ] **Step 3: Run dev server and verify visually**

Run: `cd frontend && npm run dev` (port 3001).
Open `http://localhost:3001/work/wheelchair-tracking` in a browser.
Verify the strip appears between the hero and the WcProblem section, shows Status/Role/Period/Deployment/Scale/Stack fields, dot is green for "live".
Stop the dev server (`Ctrl+C`).

- [ ] **Step 4: Commit**

```bash
git add frontend/src/app/work/wheelchair-tracking/page.tsx
git commit -m "feat(work): render ProjectMeta on wheelchair-tracking"
```

---

## Task 7: Retrofit `/work/clinical-risk-engine` (remove META `<dl>`, add strip)

**Files:**
- Modify: `frontend/src/components/casestudy/clinicalRisk/CrHero.tsx`
- Modify: `frontend/src/app/work/clinical-risk-engine/page.tsx`

The hero component renders an existing 4-field META `<dl>` (Role · Dataset · Features · Status). That block is removed; the new strip below the hero subsumes it.

- [ ] **Step 1: Remove the META block from CrHero**

In `frontend/src/components/casestudy/clinicalRisk/CrHero.tsx`:

Delete the `META` constant declaration at the top (lines 5–10 in the current file):

```tsx
const META = [
  { k: 'Role', v: 'Applied AI engineering' },
  { k: 'Dataset', v: 'Wisconsin Diagnostic (569)' },
  { k: 'Features', v: '30 cell-morphology signals' },
  { k: 'Status', v: 'Prototype' },
]
```

Delete the entire `<dl>` block that renders it (lines 121–131 in the current file):

```tsx
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
```

- [ ] **Step 2: Add the strip to the page composition**

In `frontend/src/app/work/clinical-risk-engine/page.tsx`:

Add the import:

```tsx
import { ProjectMeta } from '@/components/work/ProjectMeta'
```

Change:

```tsx
        <CrHero />
        <Reveal>
          <CrProblem />
        </Reveal>
```

to:

```tsx
        <CrHero />
        <ProjectMeta slug="clinical-risk-engine" />
        <Reveal>
          <CrProblem />
        </Reveal>
```

- [ ] **Step 3: Run type-check**

Run: `cd frontend && npm run type-check`
Expected: PASS — no type errors.

- [ ] **Step 4: Run dev server and verify visually**

Run: `cd frontend && npm run dev`.
Open `http://localhost:3001/work/clinical-risk-engine`.
Verify: the in-hero 4-column META grid is GONE; the strip appears below the hero with Status/Role/Period/Deployment/Scale/Stack fields; status dot is amber (prototype).
Stop the dev server.

- [ ] **Step 5: Commit**

```bash
git add frontend/src/components/casestudy/clinicalRisk/CrHero.tsx frontend/src/app/work/clinical-risk-engine/page.tsx
git commit -m "feat(work): replace CrHero META dl with ProjectMeta strip"
```

---

## Task 8: Retrofit `/work/population-health-intelligence` (same pattern as Task 7)

**Files:**
- Modify: `frontend/src/components/casestudy/popHealth/PhHero.tsx`
- Modify: `frontend/src/app/work/population-health-intelligence/page.tsx`

Mirror of Task 7. The PhHero file follows the same structure as CrHero.

- [ ] **Step 1: Remove the META block from PhHero**

In `frontend/src/components/casestudy/popHealth/PhHero.tsx`:

Delete the `META` constant (lines 5–10 in the current file):

```tsx
const META = [
  { k: 'Role', v: 'Applied AI engineering' },
  { k: 'Coverage', v: '193 countries' },
  { k: 'Sources', v: 'WHO · World Bank · IMF' },
  { k: 'Status', v: 'Prototype' },
]
```

Delete the entire `<dl>` block that renders it (lines 125–135 in the current file):

```tsx
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
```

- [ ] **Step 2: Add the strip to the page composition**

In `frontend/src/app/work/population-health-intelligence/page.tsx`:

Add the import:

```tsx
import { ProjectMeta } from '@/components/work/ProjectMeta'
```

Change:

```tsx
        <PhHero />
        <Reveal>
          <PhProblem />
        </Reveal>
```

to:

```tsx
        <PhHero />
        <ProjectMeta slug="population-health-intelligence" />
        <Reveal>
          <PhProblem />
        </Reveal>
```

- [ ] **Step 3: Run type-check**

Run: `cd frontend && npm run type-check`
Expected: PASS.

- [ ] **Step 4: Run dev server and verify visually**

Run: `cd frontend && npm run dev`.
Open `http://localhost:3001/work/population-health-intelligence`.
Verify: in-hero META grid is GONE; strip appears below hero; Scale reads "193 countries · WHO · World Bank · IMF".
Stop the dev server.

- [ ] **Step 5: Commit**

```bash
git add frontend/src/components/casestudy/popHealth/PhHero.tsx frontend/src/app/work/population-health-intelligence/page.tsx
git commit -m "feat(work): replace PhHero META dl with ProjectMeta strip"
```

---

## Task 9: Retrofit `/work/equitrackr`

**Files:**
- Modify: `frontend/src/app/work/equitrackr/page.tsx`

Full-structure page in `.home2`, no META block to remove. Same pattern as wheelchair-tracking.

- [ ] **Step 1: Add the import and insert the strip**

In `frontend/src/app/work/equitrackr/page.tsx`:

Add the import:

```tsx
import { ProjectMeta } from '@/components/work/ProjectMeta'
```

Change:

```tsx
        <EtHero />
        <Reveal><EtProblem /></Reveal>
```

to:

```tsx
        <EtHero />
        <ProjectMeta slug="equitrackr" />
        <Reveal><EtProblem /></Reveal>
```

- [ ] **Step 2: Run dev server and verify visually**

Run: `cd frontend && npm run dev`.
Open `http://localhost:3001/work/equitrackr`.
Verify: strip appears with Status/Role/Period/Stack only (no Deployment, Scale, Live, Source — those are unset for this entry). Status dot is amber (prototype).
Stop the dev server.

- [ ] **Step 3: Commit**

```bash
git add frontend/src/app/work/equitrackr/page.tsx
git commit -m "feat(work): render ProjectMeta on equitrackr"
```

---

## Task 10: Retrofit `/work/spendwise`

**Files:**
- Modify: `frontend/src/app/work/spendwise/page.tsx`

Same pattern as equitrackr.

- [ ] **Step 1: Add the import and insert the strip**

In `frontend/src/app/work/spendwise/page.tsx`:

Add the import:

```tsx
import { ProjectMeta } from '@/components/work/ProjectMeta'
```

Change:

```tsx
        <SwHero />
        <Reveal><SwProblem /></Reveal>
```

to:

```tsx
        <SwHero />
        <ProjectMeta slug="spendwise" />
        <Reveal><SwProblem /></Reveal>
```

- [ ] **Step 2: Run dev server and verify visually**

Run: `cd frontend && npm run dev`.
Open `http://localhost:3001/work/spendwise`.
Verify: strip appears with Status/Role/Period/Stack only.
Stop the dev server.

- [ ] **Step 3: Commit**

```bash
git add frontend/src/app/work/spendwise/page.tsx
git commit -m "feat(work): render ProjectMeta on spendwise"
```

---

## Task 11: Retrofit `/work/apex-protocol` and `/work/website-gemms` (PlaceholderCaseStudy pages)

**Files:**
- Modify: `frontend/src/app/work/apex-protocol/page.tsx`
- Modify: `frontend/src/app/work/website-gemms/page.tsx`

These pages render `<PlaceholderCaseStudy>`, which uses a different register (`bg-surface-canvas`) — **not** `.home2`. The strip's CSS is scoped to `.home2`, so we need to wrap the strip in a `.home2` container, or wrap the entire page in `.home2`.

**Resolution:** Wrap each page's return JSX in a `<div className="home2">` so the strip picks up the cream-register styles. The `PlaceholderCaseStudy` component has its own `<main>` with its own background, so we render the strip **after** the placeholder, inside the `.home2` wrapper but outside the placeholder's `<main>`. This produces a small `.home2`-styled strip below the placeholder block — honest about the page being thin.

- [ ] **Step 1: Update apex-protocol**

Replace the entire contents of `frontend/src/app/work/apex-protocol/page.tsx` with:

```tsx
import { PlaceholderCaseStudy } from '@/components/home/PlaceholderCaseStudy'
import { ProjectMeta } from '@/components/work/ProjectMeta'

export default function Page() {
  return (
    <div className="home2">
      <PlaceholderCaseStudy
        register="surface"
        capability="03 · ai-native product systems"
        title="Apex Protocol"
        description="AI-assisted fitness intelligence platform. System brief in Phase 2."
      />
      <ProjectMeta slug="apex-protocol" />
    </div>
  )
}
```

- [ ] **Step 2: Update website-gemms**

Replace the entire contents of `frontend/src/app/work/website-gemms/page.tsx` with:

```tsx
import { PlaceholderCaseStudy } from '@/components/home/PlaceholderCaseStudy'
import { ProjectMeta } from '@/components/work/ProjectMeta'

export default function Page() {
  return (
    <div className="home2">
      <PlaceholderCaseStudy
        register="surface"
        capability="05 · ai-assisted digital experiences"
        title="Website Gemms"
        description="AI-assisted digital product and web studio. System brief in Phase 2."
      />
      <ProjectMeta slug="website-gemms" />
    </div>
  )
}
```

- [ ] **Step 3: Run dev server and verify both pages visually**

Run: `cd frontend && npm run dev`.

Open `http://localhost:3001/work/apex-protocol`:
- Verify the strip appears below the placeholder block.
- Verify it shows Status (Concept, slate dot), Role (Solo concept), Period (2025). No other fields.

Open `http://localhost:3001/work/website-gemms`:
- Same verification as apex-protocol.

Stop the dev server.

- [ ] **Step 4: Commit**

```bash
git add frontend/src/app/work/apex-protocol/page.tsx frontend/src/app/work/website-gemms/page.tsx
git commit -m "feat(work): render ProjectMeta below PlaceholderCaseStudy on apex-protocol + website-gemms"
```

---

## Task 12: Final verification

**Files:** No file changes — verification only.

- [ ] **Step 1: Run the full test suite**

Run: `cd frontend && npm run test`
Expected: PASS — all tests pass, including the two new files (`ProjectMeta.test.tsx`, `projects.test.ts`).

- [ ] **Step 2: Run type-check**

Run: `cd frontend && npm run type-check`
Expected: PASS — no type errors.

- [ ] **Step 3: Run lint**

Run: `cd frontend && npm run lint`
Expected: PASS — no lint errors. (Warnings about pre-existing issues are fine; new code should not introduce warnings.)

- [ ] **Step 4: Run a production build to verify static export works**

Run: `cd frontend && npm run build`
Expected: PASS — build succeeds. Static export should produce HTML for all seven `/work/*` routes with the strip rendered.

- [ ] **Step 5: Final visual sweep of all seven pages**

Run: `cd frontend && npm run dev`.

Visit each page in turn and confirm the strip renders correctly:

1. `http://localhost:3001/work/wheelchair-tracking` — green dot, full meta (8 fields)
2. `http://localhost:3001/work/clinical-risk-engine` — amber dot, in-hero META gone, strip below hero
3. `http://localhost:3001/work/population-health-intelligence` — amber dot, in-hero META gone, strip below hero
4. `http://localhost:3001/work/equitrackr` — amber dot, 4 fields (no Deployment/Scale)
5. `http://localhost:3001/work/spendwise` — amber dot, 4 fields
6. `http://localhost:3001/work/apex-protocol` — slate dot (concept), 3 fields below placeholder
7. `http://localhost:3001/work/website-gemms` — slate dot (concept), 3 fields below placeholder

Stop the dev server.

- [ ] **Step 6: Final commit (only if any verification fixes are needed)**

If no fixes are needed, no commit. If a small fix was needed during verification, commit it now.

---

## Spec coverage check

Spec requirement → task that covers it:

- Single source of truth registry → Task 1
- `<ProjectMeta>` component → Tasks 2, 3, 4
- Three flavors covered → Task 1 (data) + Tasks 3, 4 (rendering)
- CSS scoped under `.home2`, future-proofed dark register → Task 5
- Mono typography → Task 5 (font-family in `.project-meta__list`)
- Honest discipline (skip unset fields, return null on empty) → Task 3 (component logic)
- Edge cases (slug missing, content empty) → Tasks 2, 3 (tests + logic)
- Accessibility (`role=region`, `aria-label`, `aria-hidden` on dot) → Task 3
- Retrofit 5 full work pages → Tasks 6, 7, 8, 9, 10
- Retrofit 2 PlaceholderCaseStudy pages → Task 11
- Remove META `<dl>` from CrHero and PhHero → Tasks 7, 8
- `npm run type-check` and `npm run lint` pass → Task 12
- Static export builds → Task 12
- Bundle size delta < 5 KB → covered by Task 12 build inspection (output sizes printed by Next)

All success criteria from the spec are covered.

## Out of scope (per spec)

- Migrating `FeaturedWork.tsx` / `SystemsToolchain.tsx` to read from the registry.
- Populating any `source` URLs (no public repos yet).
- The two legacy `/case-studies/*` pages.
- Lifting the four thin-stub work pages to the 9-section deep-dive spine.
- Dashboards cleanup.
