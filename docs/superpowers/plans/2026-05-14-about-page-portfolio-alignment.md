# About Page — Portfolio Alignment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Surgical copy refresh across 5 About-page files so the page reflects the current portfolio of shipped + prototyped systems instead of the stale "one wheelchair platform, three sites" framing.

**Architecture:** Five independent file edits — four component files (`AboutHero`, `AboutJourney`, `AboutValues`, `AboutSkills`) plus the route file's `metadata.description`. No new files, no new components, no architecture or animation changes. Each task is "edit one file, type-check, commit".

**Tech Stack:** Next.js 14, TypeScript, Tailwind. No new dependencies.

**Spec:** `docs/superpowers/specs/2026-05-14-about-page-portfolio-alignment-design.md`

---

## File map

### Modify
```
frontend/src/components/home/AboutHero.tsx       (3 edits: STATS, body paragraph, availability pill)
frontend/src/components/home/AboutJourney.tsx    (2 edits: ENTRIES[3].body + ENTRIES[3].skills)
frontend/src/components/home/AboutValues.tsx     (1 edit: VALUES[1].detail.proof array)
frontend/src/components/home/AboutSkills.tsx     (4 edits: GROUPS[0].highlights, GROUPS[0].tools, GROUPS[2].highlights[0], GROUPS[2].tools)
frontend/src/app/about/page.tsx                  (1 edit: metadata.description)
```

### Create / Delete
None.

### Tests
None required. The spec explicitly marks tests as optional for this refresh and no existing tests exist on these components.

---

## Phase 1 — Per-file copy edits

Each task touches exactly one file. Tasks are independent and could in principle run in parallel, but the subagent-driven workflow dispatches them sequentially because the parallel-sessions memory warns against concurrent commits to the same branch.

---

### Task 1: AboutHero — STATS, body, availability pill

**Files:**
- Modify: `frontend/src/components/home/AboutHero.tsx`

- [ ] **Step 1: Edit STATS array (third entry)**

Find the `STATS` array near the top of the file:
```ts
const STATS = [
  { value: '9+', label: 'Years at VCH' },
  { value: '200+', label: 'Patient plans / yr' },
  { value: '3', label: 'Multi-site VCH' },
]
```

Replace the third entry so the array becomes:
```ts
const STATS = [
  { value: '9+', label: 'Years at VCH' },
  { value: '200+', label: 'Patient plans / yr' },
  { value: '4 / 800+', label: 'Sites · assets' },
]
```

- [ ] **Step 2: Edit second body paragraph (around line 50–59)**

Find this JSX block:
```tsx
<p
  className="anim-rise mt-4 max-w-[58ch] text-[0.98rem] leading-[1.7] text-ink-muted"
  style={{ animationDelay: '170ms' }}
>
  Over the last several years I&apos;ve moved from frontline care into the systems side
  of healthcare — an MSc in Data Analytics, certifications in analytics, cloud, and
  applied AI, and a wheelchair-logistics platform now running across three Vancouver
  Coastal Health sites. I&apos;m still a Rehabilitation Assistant at VCH; the engineering
  work grew out of problems I kept watching happen on shift.
</p>
```

Replace the paragraph body text only (preserve the wrapping `<p>` element, `className`, and `style` attributes exactly). The replacement body text:

```
Over the last several years I&apos;ve moved from frontline care into the systems side
of healthcare — an MSc in Data Analytics, certifications in analytics, cloud, and
applied AI, and a wheelchair-logistics platform now running across four Vancouver
Coastal Health sites. Alongside it sits a growing portfolio of healthcare data,
applied-AI, and automation systems — clinical documentation pipelines, workflow
automation, risk and population-health tools. I&apos;m still a Rehabilitation Assistant
at VCH; the engineering work grew out of problems I kept watching happen on shift.
```

After replacement the full block looks like:
```tsx
<p
  className="anim-rise mt-4 max-w-[58ch] text-[0.98rem] leading-[1.7] text-ink-muted"
  style={{ animationDelay: '170ms' }}
>
  Over the last several years I&apos;ve moved from frontline care into the systems side
  of healthcare — an MSc in Data Analytics, certifications in analytics, cloud, and
  applied AI, and a wheelchair-logistics platform now running across four Vancouver
  Coastal Health sites. Alongside it sits a growing portfolio of healthcare data,
  applied-AI, and automation systems — clinical documentation pipelines, workflow
  automation, risk and population-health tools. I&apos;m still a Rehabilitation Assistant
  at VCH; the engineering work grew out of problems I kept watching happen on shift.
</p>
```

- [ ] **Step 3: Edit availability pill (around line 120–123)**

Find:
```tsx
<span className="text-[12px] font-semibold text-ink">Open to product engineering &amp; applied AI work</span>
```

Replace with:
```tsx
<span className="text-[12px] font-semibold text-ink">Open to healthcare data, analytics, AI &amp; application engineering roles</span>
```

- [ ] **Step 4: Type-check**

```bash
cd frontend && npm run type-check
```
Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add frontend/src/components/home/AboutHero.tsx
git commit -m "$(cat <<'EOF'
fix(about): refresh AboutHero stats, body, and availability copy

- STATS third entry now reflects 4 sites · 800+ assets from projects.ts
- Second body paragraph updated to 4 sites and surfaces the portfolio
- Availability pill aligned to canonical "healthcare data, analytics,
  AI & application engineering roles" phrasing

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 2: AboutJourney — Now entry body + skills chips

**Files:**
- Modify: `frontend/src/components/home/AboutJourney.tsx`

- [ ] **Step 1: Edit ENTRIES[3].body**

Find the fourth entry in the `ENTRIES` array (the one with `period: '2022 — Present'`, `Icon: Sparkles`, `current: true`). The current `body` is:

```ts
    body:
      'Began layering engineering and analytics work on top of clinical practice. Completed an MSc in Data Analytics at Eastern University; earned certifications across analytics, cloud, and applied AI (BrainStation, Google, DeepLearning.AI, AWS AI Practitioner); shipped the first version of a wheelchair-logistics platform now used across three VCH hospital sites. Still at VCH — open to product engineering, applied AI, and operational software work where healthcare context becomes an operational advantage.',
```

Replace with:

```ts
    body:
      'Began layering engineering, data, and applied AI work on top of clinical practice. Completed an MSc in Data Analytics at Eastern University; earned certifications across analytics, cloud, and applied AI (BrainStation, Google, DeepLearning.AI, AWS AI Practitioner); shipped a wheelchair-tracking platform now running across four VCH sites with 800+ tracked assets; and built a portfolio of healthcare prototypes — a clinical GenAI documentation pipeline, an enterprise workflow automation engine, and applied-ML risk and population-health tools. Still at VCH — open to healthcare data, analytics, AI, and application engineering roles.',
```

- [ ] **Step 2: Edit ENTRIES[3].skills**

In the same fourth entry, find:
```ts
    skills: ['Python', 'SQL', 'Tableau', 'AWS', 'Next.js', 'TypeScript', 'Applied AI', 'RAG'],
```

Replace with:
```ts
    skills: ['Python', 'SQL', 'Tableau', 'AWS', 'Next.js', 'TypeScript', 'FastAPI', 'PostgreSQL', 'Applied AI'],
```

Note: chip count goes from 8 → 9. The chip row in the UI wraps automatically (flex flex-wrap), so no layout adjustment needed.

- [ ] **Step 3: Type-check**

```bash
cd frontend && npm run type-check
```
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add frontend/src/components/home/AboutJourney.tsx
git commit -m "$(cat <<'EOF'
fix(about): refresh AboutJourney "Now" entry to cite portfolio

- Body now cites the full case-study portfolio (Clinical GenAI,
  Automation Engine, Clinical Risk, Population Health) instead of
  only the wheelchair platform
- 3 → 4 sites with 800+ tracked assets
- Skills chips drop generic "RAG" buzzword; add FastAPI + PostgreSQL
  to reflect the actual Clinical GenAI stack

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 3: AboutValues — "AI as a building block" proof refresh

**Files:**
- Modify: `frontend/src/components/home/AboutValues.tsx`

- [ ] **Step 1: Edit VALUES[1].detail.proof**

Find the second entry in the `VALUES` array (the one with `title: 'AI as a building block'`). Inside its `detail` object, find the `proof` array:

```ts
      proof: [
        {
          label: 'Stack',
          text: 'Hands-on with Claude, OpenAI, LangChain, RAG patterns, vector stores, and structured-output tool use.',
        },
        {
          label: 'Workflow',
          text: 'Daily driver of Cursor + Claude Code for production engineering, not just side projects.',
        },
      ],
```

Replace the entire `proof` array with:

```ts
      proof: [
        {
          label: 'Built patterns',
          text: 'Schema-constrained LLM extraction with validation gates and human review (Clinical GenAI pipeline). Event-driven orchestration with audit, retry, and dead-letter routing (Healthcare Automation Engine).',
        },
        {
          label: 'Shipped inference',
          text: 'Client-side ML inference shipped as a static export — the model runs in the browser, no server (Clinical Risk Engine, Population Health Intelligence).',
        },
      ],
```

Keep `title`, `Icon`, `tint`, `bg`, `summary`, and `detail.body` unchanged. Only the two-entry `proof` array changes.

- [ ] **Step 2: Type-check**

```bash
cd frontend && npm run type-check
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add frontend/src/components/home/AboutValues.tsx
git commit -m "$(cat <<'EOF'
fix(about): cite shipped case studies in "AI as a building block" proof

Replaces generic stack-and-tooling proof ("Cursor + Claude Code daily
driver") with concrete proof from the actual built case studies:
schema-constrained extraction, event-driven orchestration, client-side
inference shipped as static export.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 4: AboutSkills — Applied AI + Healthcare operations refresh

**Files:**
- Modify: `frontend/src/components/home/AboutSkills.tsx`

This task makes 4 edits to two of the three `GROUPS[]` entries. `GROUPS[1]` ("Full-stack development") is intentionally untouched.

- [ ] **Step 1: Edit GROUPS[0].detail.highlights (Applied AI)**

Find `GROUPS[0]` (the entry with `title: 'Applied AI & product engineering'`). Inside its `detail` object, find:

```ts
      highlights: [
        {
          label: 'Patterns',
          text: 'Retrieval-augmented workflows, multi-step tool use, structured-output schemas, and human-in-the-loop checkpoints.',
        },
        {
          label: 'Daily workflow',
          text: 'Cursor and Claude Code for production engineering — not just prototypes.',
        },
      ],
```

Replace with:

```ts
      highlights: [
        {
          label: 'Built patterns',
          text: 'Schema-constrained LLM extraction · event-driven Microsoft Graph orchestration · client-side ML inference shipped as static export · human-in-the-loop review queues.',
        },
        {
          label: 'In production / prototype',
          text: 'Wheelchair tracking (4 sites · 800+ assets · live). Clinical GenAI pipeline, healthcare automation engine, clinical risk engine, population-health intelligence (prototypes / case studies).',
        },
      ],
```

- [ ] **Step 2: Edit GROUPS[0].tools (Applied AI tool chips)**

Still in `GROUPS[0]`, find:
```ts
    tools: ['Claude', 'OpenAI', 'LangChain', 'RAG', 'Vector DBs', 'Cursor'],
```

Replace with:
```ts
    tools: ['Claude', 'OpenAI', 'FastAPI', 'PostgreSQL', 'Microsoft Graph', 'Vector DBs'],
```

Chip count stays at 6.

- [ ] **Step 3: Edit GROUPS[2].detail.highlights[0] (Healthcare operations — Operations highlight)**

Find `GROUPS[2]` (the entry with `title: 'Healthcare operations'`). Inside its `detail.highlights` array, find the first entry:

```ts
        {
          label: 'Operations',
          text: 'Project leadership and workflow design across 3 VCH hospital sites; supported 200+ patient plans per year.',
        },
```

Replace with:

```ts
        {
          label: 'Operations',
          text: 'Project leadership and workflow design across 4 VCH hospital sites; supported 200+ patient care plans per year.',
        },
```

The second highlight (the `Method` entry referencing Lean Six Sigma) is **not** edited.

- [ ] **Step 4: Edit GROUPS[2].tools (Healthcare operations tool chips)**

Still in `GROUPS[2]`, find:
```ts
    tools: ['VCH operations', 'Clinical workflows', 'Equipment logistics', 'Lean Six Sigma', 'Cerner', 'Stakeholder comms'],
```

Replace with:
```ts
    tools: ['VCH operations', 'Clinical workflows', 'Equipment logistics', 'Microsoft 365 ecosystem', 'Cerner', 'Lean Six Sigma'],
```

Chip count stays at 6. `Stakeholder comms` removed; `Microsoft 365 ecosystem` added; ordering tweaked so domain-specific chips lead.

- [ ] **Step 5: Type-check**

```bash
cd frontend && npm run type-check
```
Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add frontend/src/components/home/AboutSkills.tsx
git commit -m "$(cat <<'EOF'
fix(about): align AboutSkills with built portfolio + 4-site reality

Applied AI group:
- Highlights now cite specific built patterns and project roster
  instead of abstract pattern names
- Tool chips swap LangChain/RAG/Cursor for FastAPI/PostgreSQL/
  Microsoft Graph to match the actual case-study stacks

Healthcare ops group:
- 3 → 4 VCH hospital sites in Operations highlight
- Tool chips add Microsoft 365 ecosystem (Automation Engine surface);
  drop generic Stakeholder comms

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 5: about/page.tsx — metadata description refresh

**Files:**
- Modify: `frontend/src/app/about/page.tsx`

- [ ] **Step 1: Edit metadata.description**

Find:
```ts
export const metadata: Metadata = {
  title: 'About — Lloyd Dela Cruz',
  description:
    'Healthcare operations engineer with nine years inside Vancouver Coastal Health — building workflow systems, analytics tools, and applied AI for clinical use.',
}
```

Replace with:
```ts
export const metadata: Metadata = {
  title: 'About — Lloyd Dela Cruz',
  description:
    'Healthcare operations engineer with nine years inside Vancouver Coastal Health — building workflow systems, analytics tools, applied AI, and event-driven automation for clinical use. A portfolio of shipped and prototyped systems across four VCH sites and beyond.',
}
```

Title is unchanged; only the description string changes.

- [ ] **Step 2: Type-check**

```bash
cd frontend && npm run type-check
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add frontend/src/app/about/page.tsx
git commit -m "$(cat <<'EOF'
fix(about): expand metadata description to surface portfolio + automation

Existing description framed Lloyd as one-person-with-AI-tools; new
description surfaces both the event-driven automation capability and
the broader portfolio across four VCH sites. Stays under search-result
truncation (~320 chars).

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Phase 2 — Verification

### Task 6: Final verification

- [ ] **Step 1: Full test suite**

```bash
cd frontend && npm run test
```
Expected: 94/94 tests pass (no test changes in this refresh).

- [ ] **Step 2: Lint**

```bash
cd frontend && npm run lint
```
Expected: no NEW warnings or errors in the 5 edited files. Pre-existing warnings in other files are acceptable.

- [ ] **Step 3: Type-check**

```bash
cd frontend && npm run type-check
```
Expected: 0 errors.

- [ ] **Step 4: Production build**

```bash
cd frontend && npm run build
```
Expected: build succeeds; `/about` is in the build output.

- [ ] **Step 5: Dev server smoke check (headless)**

Start the dev server in the background, then curl the page and grep for both the new phrases (must be present) and the stale phrases (must be absent):

```bash
cd frontend && npm run dev > /tmp/aboutdev.log 2>&1 &
# wait briefly for server start (the first response after dev start may take a moment)
until curl -sf http://localhost:3001/about >/dev/null 2>&1; do sleep 1; done
BODY=$(curl -s http://localhost:3001/about)

# Phrases that MUST appear (new copy)
echo "$BODY" | grep -q "four Vancouver Coastal Health sites"        && echo "PRESENT: four Vancouver Coastal Health sites" || echo "MISSING: four Vancouver Coastal Health sites"
echo "$BODY" | grep -q "clinical GenAI documentation pipeline"      && echo "PRESENT: clinical GenAI documentation pipeline" || echo "MISSING: clinical GenAI documentation pipeline"
echo "$BODY" | grep -q "Open to healthcare data, analytics, AI"     && echo "PRESENT: Open to healthcare data, analytics, AI" || echo "MISSING: Open to healthcare data, analytics, AI"
echo "$BODY" | grep -q "Schema-constrained LLM extraction"          && echo "PRESENT: Schema-constrained LLM extraction" || echo "MISSING: Schema-constrained LLM extraction"
echo "$BODY" | grep -q "4 / 800+"                                    && echo "PRESENT: 4 / 800+ stat" || echo "MISSING: 4 / 800+ stat"

# Phrases that MUST NOT appear (stale copy removed)
echo "$BODY" | grep -q "three Vancouver Coastal Health sites"       && echo "STALE STILL PRESENT: three Vancouver Coastal Health sites" || echo "REMOVED: three Vancouver Coastal Health sites"
echo "$BODY" | grep -q "Cursor + Claude Code"                       && echo "STALE STILL PRESENT: Cursor + Claude Code" || echo "REMOVED: Cursor + Claude Code"
echo "$BODY" | grep -q "Multi-site VCH"                             && echo "STALE STILL PRESENT: Multi-site VCH" || echo "REMOVED: Multi-site VCH"

# Kill the dev server
pkill -f "next dev" || true
```

Expected output: 5 `PRESENT:` lines + 3 `REMOVED:` lines, in any order. Any `MISSING:` or `STALE STILL PRESENT:` line is a failure — fix in the corresponding task before completing.

- [ ] **Step 6: Reporting**

If all checks pass, the implementation is complete. No commit needed for the verification task itself.

If any check fails:
1. Identify which task's edit produced the gap
2. Re-open that task's commit and apply a fix (use `git revert` + new commit, or amend if the commit hasn't been pushed)
3. Re-run Step 5 to confirm

**Discipline reminder:** Per the user's parallel-sessions memory, never stage with `git add -A` or `git add .`. Stage only the file(s) you touched.

---

## Spec coverage map

| Spec section | Implemented by |
|---|---|
| §1 Goal | All tasks collectively bring page in line with portfolio |
| §2 Binding constraints | No task adds sections / changes register / touches animation — verified by file scope being limited to copy-only fields |
| §3 Files modified (5 files) | Task 1 (Hero) · Task 2 (Journey) · Task 3 (Values) · Task 4 (Skills) · Task 5 (page metadata) |
| §4.1 AboutHero — 3 edits | Task 1 Steps 1–3 |
| §4.2 AboutJourney — 2 edits | Task 2 Steps 1–2 |
| §4.3 AboutValues — proof refresh | Task 3 Step 1 |
| §4.4 AboutSkills — 4 edits | Task 4 Steps 1–4 |
| §4.5 page.tsx metadata | Task 5 Step 1 |
| §5 What is NOT changing | Honored: every task scoped to only the fields named in §4; nothing else is touched |
| §6 Tests | None required per spec; not added |
| §7 Verification gates | Task 6 Steps 1–5 |
| §8 Out of scope | Honored: no new sections, no screenshots, no cross-page edits, no test additions, no primitive refactors |
| §9 Acceptance criteria | Phase 1 produces the 5 edits exactly per spec; Phase 2 verifies all gates |
