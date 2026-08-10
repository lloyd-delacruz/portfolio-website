# Wheelchair Tracking Live Demo — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the `/work/wheelchair-tracking` case study into a testable live demo: a "View Live Demo" hero CTA, and a new role-by-role guide section with real, verified credentials.

**Architecture:** Two small edits (`WcHero.tsx` CTA row, `projects.ts` metadata) plus one new client component (`WcDemoGuide.tsx`) wired into the existing case-study page composition in `frontend/src/app/work/wheelchair-tracking/page.tsx`. No new dependencies, no new routes, no backend changes — this is a content/presentation feature on top of the existing `home2`/`CsSection`/`Module`/`Chip` design system.

**Tech Stack:** Next.js 15 App Router, TypeScript, Tailwind (utility classes + CSS variables), lucide-react icons, Vitest for the registry test.

## Global Constraints

- Reference site: `docs/superpowers/specs/2026-08-10-wheelchair-demo-guide-design.md` — this plan implements that spec exactly.
- Credentials and role content must match the verified table in the spec — do not alter emails/passwords/role names.
- `cleaner` role is excluded (deprecated in the source app).
- `WcRoles.tsx` is not modified.
- The live demo link opens in a new tab (`target="_blank" rel="noopener noreferrer"`).
- Existing test `wheelchair-tracking is the one verified live deployment in the registry` in `frontend/src/lib/projects.test.ts` asserts `deployment` still matches `/vancouver coastal health/i` — do not change that field's wording.
- Run `npm run lint`, `npm run type-check`, and `npm test` (all from `frontend/`) after every task; each must pass before moving on.

---

### Task 1: Add the live-demo link to the project registry

**Files:**
- Modify: `frontend/src/lib/projects.ts` (the `wheelchair-tracking` record, currently at lines 46–63)
- Modify: `frontend/src/lib/projects.test.ts` (add one assertion)

**Interfaces:**
- Produces: `PROJECTS['wheelchair-tracking'].live` — `{ href: string; label: string }`, consumed automatically by the existing `ProjectMeta` component (`frontend/src/components/work/ProjectMeta.tsx`), no changes needed there.

- [ ] **Step 1: Write the failing test**

Add to `frontend/src/lib/projects.test.ts`, inside the existing `describe('PROJECTS registry', ...)` block (after the `'wheelchair-tracking is the one verified live deployment...'` test):

```ts
  it('wheelchair-tracking links to the public seeded-data demo, not a claim of exposing real hospital data', () => {
    const record = PROJECTS['wheelchair-tracking']
    expect(record.live?.href).toBe('https://wheelchair-tracking.vercel.app/')
    expect(record.live?.label).toMatch(/demo/i)
    // The production claim and the public-demo claim must both survive —
    // neither field should be describing the other's deployment.
    expect(record.deployment).toMatch(/hospital-internal/i)
  })
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd frontend && npx vitest run src/lib/projects.test.ts`
Expected: FAIL — `record.live` is `undefined`.

- [ ] **Step 3: Add the `live` field and update the file-header comment**

In `frontend/src/lib/projects.ts`, the file header currently reads (around line 37-44):

```ts
/**
 * Every metric in this registry was counted directly against the git tree of the
 * source repository. Deployment and adoption claims are only present where a
 * live URL was verified to resolve.
 *
 * Note: the flagship repositories are private, so no `source` links are set —
 * a source link to a private repo 404s for every visitor.
 */
```

Leave that comment as-is (still accurate — no `source` links are being added). Then update the `wheelchair-tracking` record. Find:

```ts
  'wheelchair-tracking': {
    slug: 'wheelchair-tracking',
    title: 'Wheelchair Tracking',
    status: 'live',
    statusLabel: 'Live · 4 VCH sites',
    role: 'Built solo · 830 of 838 commits',
    period: 'Aug 2025 – present',
    // Runs on hospital-internal infrastructure, which is why there is no
    // public demo link — the Vercel preview URL is a staging artefact, not
    // the production deployment.
    deployment: 'Hospital-internal deployment · 4 Vancouver Coastal Health sites',
    stack: ['React 18', 'Vite', 'JavaScript', 'Supabase', 'PostgreSQL', 'Row-Level Security', 'Edge Functions'],
    scale: '4 sites · 800+ assets tracked · 90 migrations · 243 test files',
    tier: 'flagship',
    category: ['Healthcare', 'SaaS'],
    tagline: 'Multi-tenant equipment fleet tracking where the database, not the browser, enforces the workflow.',
    order: 1,
  },
```

Replace with:

```ts
  'wheelchair-tracking': {
    slug: 'wheelchair-tracking',
    title: 'Wheelchair Tracking',
    status: 'live',
    statusLabel: 'Live · 4 VCH sites',
    role: 'Built solo · 830 of 838 commits',
    period: 'Aug 2025 – present',
    // The system runs on hospital-internal infrastructure in production.
    // wheelchair-tracking.vercel.app is a separate, publicly reachable build
    // seeded with synthetic demo data (confirmed isolated from any real
    // health-authority data) — kept live specifically so this case study can
    // be tried hands-on. See docs/guides/ in the source repo for role docs.
    deployment: 'Hospital-internal deployment · 4 Vancouver Coastal Health sites',
    live: { href: 'https://wheelchair-tracking.vercel.app/', label: 'Live demo (seeded data)' },
    stack: ['React 18', 'Vite', 'JavaScript', 'Supabase', 'PostgreSQL', 'Row-Level Security', 'Edge Functions'],
    scale: '4 sites · 800+ assets tracked · 90 migrations · 243 test files',
    tier: 'flagship',
    category: ['Healthcare', 'SaaS'],
    tagline: 'Multi-tenant equipment fleet tracking where the database, not the browser, enforces the workflow.',
    order: 1,
  },
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd frontend && npx vitest run src/lib/projects.test.ts`
Expected: PASS, all tests in the file green.

- [ ] **Step 5: Run the full check suite**

Run: `cd frontend && npm run lint && npm run type-check && npm test`
Expected: all pass.

- [ ] **Step 6: Commit**

```bash
git add frontend/src/lib/projects.ts frontend/src/lib/projects.test.ts
git commit -m "feat(work): link the wheelchair-tracking public demo in project metadata

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 2: Replace the hero CTAs with View Live Demo + Demo Instructions

**Files:**
- Modify: `frontend/src/components/casestudy/wheelchair/WcHero.tsx:46-61`

**Interfaces:**
- Consumes: nothing new.
- Produces: an anchor target `#demo-guide` that Task 3's section must define via `CsSection`'s `id` prop.

- [ ] **Step 1: Replace the CTA block**

In `frontend/src/components/casestudy/wheelchair/WcHero.tsx`, the import line currently reads:

```tsx
import { ArrowRight, ArrowLeft } from 'lucide-react'
```

Replace with:

```tsx
import { ArrowRight, ArrowLeft, Accessibility } from 'lucide-react'
```

Then replace the CTA block (currently lines 46-61):

```tsx
            <div className="anim-rise mt-7 flex flex-wrap items-center gap-3" style={{ animationDelay: '180ms' }}>
              <Link
                href="#workflow"
                className="group inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white soft-shadow transition-transform hover:-translate-y-0.5"
                style={{ background: 'var(--plum)' }}
              >
                See the workflow
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="#problem"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-ink ghair-2 transition-colors hover:bg-[var(--cream-2)]"
              >
                Start from the problem
              </Link>
            </div>
```

with:

```tsx
            <div className="anim-rise mt-7 flex flex-wrap items-center gap-3" style={{ animationDelay: '180ms' }}>
              <a
                href="https://wheelchair-tracking.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white soft-shadow transition-transform hover:-translate-y-0.5"
                style={{ background: 'var(--plum)' }}
              >
                <Accessibility size={16} />
                View Live Demo
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </a>
              <Link
                href="#demo-guide"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-ink ghair-2 transition-colors hover:bg-[var(--cream-2)]"
              >
                Demo Instructions
              </Link>
            </div>
```

Note: `Link` from `next/link` stays imported and used for the in-page `#demo-guide` anchor; the external demo link uses a plain `<a>` tag since it leaves the site (Next's `Link` is for internal routing).

- [ ] **Step 2: Run the check suite**

Run: `cd frontend && npm run lint && npm run type-check`
Expected: pass. (No unit test exists for this component yet — visual/manual verification happens in Task 5.)

- [ ] **Step 3: Commit**

```bash
git add frontend/src/components/casestudy/wheelchair/WcHero.tsx
git commit -m "feat(work): hero CTA becomes View Live Demo + Demo Instructions

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 3: Build the `WcDemoGuide` section

**Files:**
- Create: `frontend/src/components/casestudy/wheelchair/WcDemoGuide.tsx`
- Test: `frontend/src/components/casestudy/wheelchair/WcDemoGuide.test.tsx`

**Interfaces:**
- Consumes: `CsSection`, `Module`, `Chip` from `../bits` (`frontend/src/components/casestudy/bits.tsx`).
- Produces: `export function WcDemoGuide()` — a self-contained section with `id="demo-guide"` (the hero's secondary CTA from Task 2 targets this id). Default export not used; named export only, matching every other `Wc*` component in this directory.

- [ ] **Step 1: Write the failing test**

Create `frontend/src/components/casestudy/wheelchair/WcDemoGuide.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { WcDemoGuide } from './WcDemoGuide'

describe('WcDemoGuide', () => {
  it('renders a #demo-guide anchor target matching the hero CTA', () => {
    const { container } = render(<WcDemoGuide />)
    expect(container.querySelector('#demo-guide')).not.toBeNull()
  })

  it('renders all five in-scope roles and excludes the deprecated cleaner role', () => {
    render(<WcDemoGuide />)
    ;['Super-Admin', 'Admin', 'Therapist', 'Rehab Assistant', 'Wheelchair Technician'].forEach((role) => {
      expect(screen.getByText(role)).toBeInTheDocument()
    })
    expect(screen.queryByText(/cleaner/i)).not.toBeInTheDocument()
  })

  it('renders working credentials for every role, matching the verified table', () => {
    render(<WcDemoGuide />)
    const expected: Record<string, { email: string; password: string }> = {
      'Super-Admin': { email: 'admin@wheelchairtrack.ca', password: 'Platform123!' },
      Admin: { email: 'admin@vgh.ca', password: 'Admin123!' },
      Therapist: { email: 'therapist1@vgh.ca', password: 'Therapist123!' },
      'Rehab Assistant': { email: 'rehab1@vgh.ca', password: 'Rehab123!' },
      'Wheelchair Technician': { email: 'tech1@vgh.ca', password: 'Tech123!' },
    }
    Object.values(expected).forEach(({ email, password }) => {
      expect(screen.getByText(email)).toBeInTheDocument()
      expect(screen.getByText(password)).toBeInTheDocument()
    })
  })

  it('every role card exposes a labeled copy-credentials control', () => {
    render(<WcDemoGuide />)
    const buttons = screen.getAllByRole('button', { name: /copy/i })
    expect(buttons.length).toBeGreaterThanOrEqual(5)
  })

  it('states plainly that this is a shared, seeded demo environment', () => {
    render(<WcDemoGuide />)
    expect(screen.getByText(/seeded|synthetic|shared/i)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd frontend && npx vitest run src/components/casestudy/wheelchair/WcDemoGuide.test.tsx`
Expected: FAIL — module `./WcDemoGuide` does not exist.

- [ ] **Step 3: Write the component**

Create `frontend/src/components/casestudy/wheelchair/WcDemoGuide.tsx`:

```tsx
// frontend/src/components/casestudy/wheelchair/WcDemoGuide.tsx
'use client'

import { useState } from 'react'
import {
  ShieldCheck, Settings2, Stethoscope, ClipboardCheck, Wrench,
  Copy, Check, ArrowRight, type LucideIcon,
} from 'lucide-react'
import { CsSection, Module, Chip } from '../bits'

type Tone = 'plum' | 'coral' | 'blue' | 'green' | 'amber'

type RoleCard = {
  Icon: LucideIcon
  tone: Tone
  title: string
  responsibility: string
  startHere: string
  workflow: string
  keyActions: string[]
  expect: string
  email: string
  password: string
}

const ROLES: RoleCard[] = [
  {
    Icon: Stethoscope,
    tone: 'blue',
    title: 'Therapist',
    responsibility: 'Requests the right wheelchair for a patient and tracks it until they have it.',
    startHere: 'Dashboard → "Request Wheelchair"',
    workflow: 'Fill out the one-page request form — patient initials, chair type/size, cushion, footrests, urgency — and submit.',
    keyActions: ['Request Wheelchair → Submit', '"My Requests" tab'],
    expect: 'A ticket appears immediately with a confirmation number (e.g. TKT-0123). No fitting chair? The patient joins a first-come, first-served waiting list that auto-matches the moment one is free.',
    email: 'therapist1@vgh.ca',
    password: 'Therapist123!',
  },
  {
    Icon: ClipboardCheck,
    tone: 'green',
    title: 'Rehab Assistant',
    responsibility: 'Runs the full chair lifecycle — acknowledge, find, check out, discharge, clean, return.',
    startHere: 'Request Queue — 5 tabs: New, On Hold, Waiting List, In Use, Post-Use',
    workflow: 'Open the "New" tab → Acknowledge & Find Chair → run the 3-step Find-a-Chair wizard (chair, cushion, footrests). The chair reserves and moves to On Hold.',
    keyActions: ['Acknowledge & Find Chair', 'Check Out to Patient', 'Discharge Chair', 'Mark Cleaned', 'Return to Service'],
    expect: 'The ticket advances one queue tab at a time, and the chair’s own status chip updates in lockstep: Available → Assigned → In Use → Dirty → Cleaned → Available.',
    email: 'rehab1@vgh.ca',
    password: 'Rehab123!',
  },
  {
    Icon: Wrench,
    tone: 'amber',
    title: 'Wheelchair Technician',
    responsibility: 'Repairs flagged chairs and keeps the fleet airworthy.',
    startHere: 'Maintenance — the repair queue, oldest first',
    workflow: 'Acknowledge a repair to claim it, do the (real-world) work, then Complete Repair with an outcome, work performed, costs, and notes.',
    keyActions: ['Acknowledge', 'Complete Repair'],
    expect: 'The chair flips to Repaired and waits for a Rehab Assistant to physically return it to service. Technicians can also self-flag a chair via Asset Management → Flag for Maintenance.',
    email: 'tech1@vgh.ca',
    password: 'Tech123!',
  },
  {
    Icon: Settings2,
    tone: 'coral',
    title: 'Admin',
    responsibility: 'Everything the workflow roles can do, plus inventory, users, and reporting for their site(s).',
    startHere: 'Dashboard, then Inventory',
    workflow: 'Inventory → Add Asset to register a wheelchair, cushion, or footrest. Then Administration → System Analytics for utilization, wait-time, and repair-cost reporting.',
    keyActions: ['Inventory → Add Asset', 'Administration → IT Management', 'Administration → System Analytics'],
    expect: 'New assets appear instantly in Inventory; Analytics reflects the shared demo data live, with drill-downs and CSV/Excel/PDF export.',
    email: 'admin@vgh.ca',
    password: 'Admin123!',
  },
  {
    Icon: ShieldCheck,
    tone: 'plum',
    title: 'Super-Admin',
    responsibility: 'Platform operator — stands up health authorities and hospital sites. Not part of daily clinical workflow.',
    startHere: 'The Platform Scope bar at the top of the screen',
    workflow: 'Tenants → open Vancouver Coastal Health → open a site to see its locations, wheelchairs, and users. Scope into VCH / Vancouver General Hospital to work exactly like a site Admin would.',
    keyActions: ['Tenants', 'Tenant / site switcher'],
    expect: 'Nothing loads meaningfully until a tenant and site are scoped — that’s intentional, it’s what stops two hospitals’ data from ever mixing.',
    email: 'admin@wheelchairtrack.ca',
    password: 'Platform123!',
  },
]

const TONE_STYLE: Record<Tone, { bg: string; fg: string }> = {
  plum:  { bg: 'var(--plum-soft)',  fg: 'var(--plum-deep)' },
  coral: { bg: 'var(--coral-tint)', fg: 'var(--coral-ink)' },
  blue:  { bg: 'var(--blue-tint)',  fg: 'var(--blue-ink)' },
  green: { bg: 'var(--green-tint)', fg: 'var(--green-ink)' },
  amber: { bg: 'var(--amber-tint)', fg: 'var(--amber-ink)' },
}

function CredentialRow({ role }: { role: RoleCard }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(`${role.email} / ${role.password}`)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      // Clipboard API unavailable (e.g. insecure context) — the credentials
      // are still visible as plain text for manual copy.
    }
  }

  return (
    <div className="mt-4 flex items-center justify-between gap-3 rounded-xl border border-[var(--line)] bg-[var(--cream-2)] px-3.5 py-3">
      <div className="min-w-0">
        <p className="truncate font-mono text-[12.5px] text-ink">{role.email}</p>
        <p className="truncate font-mono text-[12.5px] text-ink-muted">{role.password}</p>
      </div>
      <button
        type="button"
        onClick={handleCopy}
        aria-label={`Copy ${role.title} credentials`}
        className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-white px-2.5 py-1.5 text-xs font-semibold text-ink-soft ghair transition-colors hover:bg-[var(--cream)]"
      >
        {copied ? <Check size={13} className="text-[var(--green-ink)]" /> : <Copy size={13} />}
        {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
  )
}

export function WcDemoGuide() {
  return (
    <CsSection
      id="demo-guide"
      eyebrow={<>Try it yourself</>}
      title="How to use the live demo."
      intro="wheelchair-tracking.vercel.app is a public build seeded with synthetic data — no real patients, no real hospital records. Sign in with any account below; it's a shared sandbox, so you may see test tickets other visitors left behind. That's expected, not a bug."
    >
      <Module className="mb-6" style={{ background: 'linear-gradient(105deg,#ede9fe 0%,#f5f0fe 45%,#fce7f3 100%)' }}>
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
          Suggested path — follow one ticket end to end
        </p>
        <p className="mt-3 text-[13.5px] leading-relaxed text-ink-soft">
          Log in as <strong className="text-ink">Therapist</strong> and submit a request → log in as{' '}
          <strong className="text-ink">Rehab Assistant</strong> and acknowledge it, find a chair, check it out,
          then discharge, clean, and return it → log in as{' '}
          <strong className="text-ink">Wheelchair Technician</strong> and flag or repair a chair → log in as{' '}
          <strong className="text-ink">Admin</strong> to see it all land in Reports &amp; Analytics. The{' '}
          <strong className="text-ink">Super-Admin</strong> account is a separate platform-operator view, not part
          of this chain.
        </p>
      </Module>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {ROLES.map((role) => {
          const tone = TONE_STYLE[role.tone]
          return (
            <div key={role.title} className="flex flex-col rounded-2xl bg-white p-5 ghair soft-shadow-sm">
              <div className="flex items-center gap-2.5">
                <div className="grid h-9 w-9 place-items-center rounded-lg" style={{ background: tone.bg }}>
                  <role.Icon size={16} style={{ color: tone.fg }} strokeWidth={1.9} />
                </div>
                <p className="font-display text-[15px] font-bold text-ink">{role.title}</p>
              </div>

              <p className="mt-3 text-[13px] leading-snug text-ink-soft">{role.responsibility}</p>

              <dl className="mt-4 space-y-2.5 border-t pt-3 ghair-t">
                <div>
                  <dt className="text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-muted">Start here</dt>
                  <dd className="mt-1 text-[12.5px] leading-snug text-ink">{role.startHere}</dd>
                </div>
                <div>
                  <dt className="text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-muted">Workflow to try</dt>
                  <dd className="mt-1 text-[12.5px] leading-snug text-ink-soft">{role.workflow}</dd>
                </div>
                <div>
                  <dt className="text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-muted">Key actions</dt>
                  <dd className="mt-1.5 flex flex-wrap gap-1">
                    {role.keyActions.map((a) => (
                      <Chip key={a} tone={role.tone}>{a}</Chip>
                    ))}
                  </dd>
                </div>
                <div>
                  <dt className="text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-muted">What to expect</dt>
                  <dd className="mt-1 text-[12.5px] leading-snug text-ink-soft">{role.expect}</dd>
                </div>
              </dl>

              <CredentialRow role={role} />
            </div>
          )
        })}
      </div>

      <a
        href="https://wheelchair-tracking.vercel.app/"
        target="_blank"
        rel="noopener noreferrer"
        className="group mt-8 inline-flex w-fit items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white soft-shadow-sm transition-transform hover:-translate-y-0.5"
        style={{ background: 'var(--plum)' }}
      >
        Open the live demo
        <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
      </a>
    </CsSection>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd frontend && npx vitest run src/components/casestudy/wheelchair/WcDemoGuide.test.tsx`
Expected: PASS, all 5 tests green.

If `@testing-library/react` isn't already a devDependency, check `frontend/package.json` first — `HomeHero.test.tsx` and `ProjectMeta.test.tsx` already exist in this repo using it, so it should be present; if the import fails, run `cd frontend && npm ls @testing-library/react` to confirm before installing anything.

- [ ] **Step 5: Run the full check suite**

Run: `cd frontend && npm run lint && npm run type-check && npm test`
Expected: all pass.

- [ ] **Step 6: Commit**

```bash
git add frontend/src/components/casestudy/wheelchair/WcDemoGuide.tsx frontend/src/components/casestudy/wheelchair/WcDemoGuide.test.tsx
git commit -m "feat(work): add role-by-role live demo guide for wheelchair-tracking

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 4: Wire `WcDemoGuide` into the case-study page

**Files:**
- Modify: `frontend/src/app/work/wheelchair-tracking/page.tsx`

**Interfaces:**
- Consumes: `WcDemoGuide` from Task 3.

- [ ] **Step 1: Add the import**

In `frontend/src/app/work/wheelchair-tracking/page.tsx`, after the existing:

```tsx
import { WcWorkflowDemo } from '@/components/casestudy/wheelchair/WcWorkflowDemo'
```

add:

```tsx
import { WcDemoGuide } from '@/components/casestudy/wheelchair/WcDemoGuide'
```

- [ ] **Step 2: Render it after the workflow demo**

Replace:

```tsx
        <Reveal><WcWorkflowDemo /></Reveal>
        <Reveal><WcDashboards /></Reveal>
```

with:

```tsx
        <Reveal><WcWorkflowDemo /></Reveal>
        <Reveal><WcDemoGuide /></Reveal>
        <Reveal><WcDashboards /></Reveal>
```

- [ ] **Step 3: Build the site**

Run: `cd frontend && npm run build`
Expected: build succeeds with no errors (static export). This also confirms the App Router page compiles with the new component in the tree.

- [ ] **Step 4: Commit**

```bash
git add frontend/src/app/work/wheelchair-tracking/page.tsx
git commit -m "feat(work): render the demo guide on the wheelchair-tracking page

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 5: End-to-end verification against the real running app

**Files:** none (verification only; fixes go back into the files from Tasks 1-4 if anything is wrong).

- [ ] **Step 1: Run the full local check suite one more time**

Run: `cd frontend && npm run lint && npm run type-check && npm test && npm run build`
Expected: all green.

- [ ] **Step 2: Serve the production build locally and visually check the hero**

Run: `cd frontend && npm run start` (or `npx serve out` if using the static export), then open `/work/wheelchair-tracking` in a browser.
Check: "View Live Demo" and "Demo Instructions" render where the old two buttons were; "View Live Demo" has the wheelchair (`Accessibility`) icon; clicking "Demo Instructions" scrolls to the new section; clicking "View Live Demo" opens `wheelchair-tracking.vercel.app` in a **new tab** (verify the tab, not just the href).

- [ ] **Step 3: Re-verify every credential against the actual live app**

For each of the 5 roles, in an incognito/private window against `https://wheelchair-tracking.vercel.app/`:
- Sign in with the email/password shown in the new card.
- Confirm the landing page matches the card's "Start here" text (e.g. Therapist lands on a dashboard with "Request Wheelchair" in the nav).
- Perform the card's "Key actions" far enough to confirm the button exists and is clickable (does not need to be completed end-to-end for every role, but must exist and be reachable exactly as described).
- Sign out before moving to the next role.
- If any card's copy doesn't match what's actually on screen, fix the copy in `WcDemoGuide.tsx` (Task 3) and re-run its test file.

- [ ] **Step 4: Mobile layout check**

In the browser's device toolbar (e.g. 390×844), check: hero CTAs wrap without overlapping text; the 5 role cards stack to a single column (`grid-cols-1` below `lg:`); the credential row's copy button stays tappable and doesn't get clipped by `truncate` on narrow widths.

- [ ] **Step 5: Keyboard and accessibility pass**

Tab through the page from the hero: confirm both CTAs receive a visible focus ring, `Enter` activates each, and the external demo link's new-tab behavior is announced sensibly (no focus trap). Tab into the demo guide section: confirm each "Copy" button is reachable and `Enter`/`Space` triggers the copy (verify the button briefly shows "Copied"). Confirm no color-only distinction — each role card's tone chip also carries text, not just color.

- [ ] **Step 6: Confirm no unintended secrets leaked**

Run: `git diff main --stat` and review the full diff once more — confirm the only credentials present are the 5 intentionally-public demo accounts from the spec, and that no Supabase keys, tokens, or internal URLs were pulled in from the repo research.

- [ ] **Step 7: Final commit (if Step 3 required copy fixes) or explicit no-op confirmation**

If fixes were needed:

```bash
git add frontend/src/components/casestudy/wheelchair/WcDemoGuide.tsx frontend/src/components/casestudy/wheelchair/WcDemoGuide.test.tsx
git commit -m "fix(work): correct demo guide copy against live app verification

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

If no fixes were needed, state so explicitly in the task summary — do not claim verification passed without having actually re-run Steps 2-6 against the live app.

---

## Self-Review Notes

- **Spec coverage:** Hero CTA (Task 2) ✓, new demo-guide section with 5 roles + credentials + suggested path (Task 3) ✓, `projects.ts` live field (Task 1) ✓, page wiring (Task 4) ✓, full verification incl. live re-test, mobile, keyboard, secret-scan (Task 5) ✓. `WcRoles.tsx` explicitly left untouched per spec.
- **Placeholder scan:** no TBD/TODO; all steps carry real code or a concrete, checkable action.
- **Type consistency:** `RoleCard`/`Tone` types and the `CredentialRow` component are defined once in Task 3 and used only within that same file — no cross-task signature drift to check.
