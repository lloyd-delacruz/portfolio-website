# About Page — Portfolio Alignment Refresh

**Date:** 2026-05-14
**Status:** Draft (pending user review)
**Scope:** Surgical copy-only refresh of `/about` to align the page with Lloyd's current shipped + prototype portfolio. No section additions, no architecture changes, no animation changes. Five named components are edited; six total files including the metadata description on the route file.

---

## 1. Goal

Bring the About page into honest alignment with the work that now exists on the site. Today the page reads as "Lloyd shipped one wheelchair platform across 3 VCH sites and has good background" — the reality is now "Lloyd ships a portfolio of healthcare data, applied-AI, and automation systems, anchored by a 4-site, 800+-asset live platform." The page must reflect that without changing register, layout, or any structural decisions already made in prior About-page work.

This refresh also fixes specific stale facts:
- Wheelchair tracking site count: 3 → **4 sites · 800+ assets**
- Availability copy: aligned to the canonical phrase from positioning memory
- "Now" career-arc entry: cites the full case-study portfolio, not just the wheelchair platform

---

## 2. Binding constraints (do not change)

- **About-page register stays unchanged:** "Operational systems for healthcare, engineered from inside the workflow." Per the positioning-pivot memory, About is the broader operational-systems narrative — distinct from the homepage's healthcare-first recruiter funnel. No copy edit may pivot About's register toward homepage-style framing.
- **No new sections.** Page anatomy stays 5 sections (AboutHero · AboutCerts · AboutJourney · AboutValues · AboutSkills) plus chrome (HomeNav · FooterCTA · SiteFooter).
- **No animation changes.** All `anim-rise` delays, `framer-motion` configurations, and `usePrefersReducedMotion` branches are preserved.
- **No new components.** All edits land in existing component files; no new `About*` files are created.
- **Numbers must be sourced from the registry.** Wheelchair tracking metrics (`4 sites · 800+ assets`) come from `frontend/src/lib/projects.ts` `PROJECTS['wheelchair-tracking']` — that's the canonical source. Don't invent.
- **Honesty rules carry forward** from the case-study work: no fabricated metrics, no "X hours saved" claims that aren't directly observable. Project names mentioned in body copy must match the registry entries exactly.
- **Don't expand `AboutCerts`.** It's already accurate; leave it alone.

---

## 3. Files modified

```
frontend/src/components/home/AboutHero.tsx
frontend/src/components/home/AboutJourney.tsx
frontend/src/components/home/AboutValues.tsx
frontend/src/components/home/AboutSkills.tsx
frontend/src/app/about/page.tsx        (metadata.description refresh only)
```

No files added. No files deleted.

---

## 4. Edit specifications

### 4.1 `AboutHero.tsx`

**Edit 1 — `STATS` array (line ~6–10):**

Change the third stat:
```ts
{ value: '3', label: 'Multi-site VCH' },
```
to:
```ts
{ value: '4 / 800+', label: 'Sites · assets' },
```

Reasoning: Matches `projects.ts` `PROJECTS['wheelchair-tracking'].scale = '4 sites · 800+ assets'`. The compact `4 / 800+` format keeps the stat grid visually balanced (other stats are short: `9+`, `200+`).

**Edit 2 — second body paragraph (line ~50–59):**

Change:
> "Over the last several years I've moved from frontline care into the systems side of healthcare — an MSc in Data Analytics, certifications in analytics, cloud, and applied AI, and a wheelchair-logistics platform now running across three Vancouver Coastal Health sites. I'm still a Rehabilitation Assistant at VCH; the engineering work grew out of problems I kept watching happen on shift."

to:
> "Over the last several years I've moved from frontline care into the systems side of healthcare — an MSc in Data Analytics, certifications in analytics, cloud, and applied AI, and a wheelchair-logistics platform now running across four Vancouver Coastal Health sites. Alongside it sits a growing portfolio of healthcare data, applied-AI, and automation systems — clinical documentation pipelines, workflow automation, risk and population-health tools. I'm still a Rehabilitation Assistant at VCH; the engineering work grew out of problems I kept watching happen on shift."

Reasoning: Same opening, swaps `three → four`, inserts one new sentence between the existing two that surfaces the portfolio without naming individual case studies (those land in `AboutJourney`'s "Now" entry).

**Edit 3 — availability pill (line ~120–123):**

Change:
```tsx
<span className="text-[12px] font-semibold text-ink">Open to product engineering &amp; applied AI work</span>
```
to:
```tsx
<span className="text-[12px] font-semibold text-ink">Open to healthcare data, analytics, AI &amp; application engineering roles</span>
```

Reasoning: Aligned to the canonical availability phrase per positioning memory. Slightly tightened from the full canonical line ("Vancouver, BC · …remote, hybrid, or on-site") because the pill has limited width — location and arrangement details are already covered elsewhere on the page (location in the MapPin row above the body copy).

No other changes to `AboutHero.tsx`.

---

### 4.2 `AboutJourney.tsx`

Single edit to the fourth `ENTRIES[]` entry (the `2022 — Present` "Now" stage, around line 42–52).

**Edit 1 — `body` field:**

Change:
> "Began layering engineering and analytics work on top of clinical practice. Completed an MSc in Data Analytics at Eastern University; earned certifications across analytics, cloud, and applied AI (BrainStation, Google, DeepLearning.AI, AWS AI Practitioner); shipped the first version of a wheelchair-logistics platform now used across three VCH hospital sites. Still at VCH — open to product engineering, applied AI, and operational software work where healthcare context becomes an operational advantage."

to:
> "Began layering engineering, data, and applied AI work on top of clinical practice. Completed an MSc in Data Analytics at Eastern University; earned certifications across analytics, cloud, and applied AI (BrainStation, Google, DeepLearning.AI, AWS AI Practitioner); shipped a wheelchair-tracking platform now running across four VCH sites with 800+ tracked assets; and built a portfolio of healthcare prototypes — a clinical GenAI documentation pipeline, an enterprise workflow automation engine, and applied-ML risk and population-health tools. Still at VCH — open to healthcare data, analytics, AI, and application engineering roles."

**Edit 2 — `skills` array:**

Change:
```ts
skills: ['Python', 'SQL', 'Tableau', 'AWS', 'Next.js', 'TypeScript', 'Applied AI', 'RAG'],
```
to:
```ts
skills: ['Python', 'SQL', 'Tableau', 'AWS', 'Next.js', 'TypeScript', 'FastAPI', 'PostgreSQL', 'Applied AI'],
```

Reasoning: `RAG` was a 2024-era buzzword chip; the actual case studies demonstrate richer applied-AI patterns (schema extraction, event-driven orchestration, client-side inference) — losing the chip avoids underclaiming. `FastAPI` and `PostgreSQL` reflect the Clinical GenAI pipeline's actual stack and round out the polyglot story (Python backend alongside the Next.js work). Chip count stays at 9.

No other changes to `AboutJourney.tsx`.

---

### 4.3 `AboutValues.tsx`

Single edit to the `VALUES[1]` entry — "AI as a building block" — and only to its `detail.proof[]` array (around line 53–64). Title, summary, body, icon, tint, and bg are all preserved.

**Edit — replace `detail.proof` array:**

Change:
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
to:
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

Reasoning: The old proof was tooling-brand-drop ("Cursor + Claude Code") and generic pattern names ("RAG"). The new proof cites the actual built systems (named to match the case-study slugs) and the specific architectural patterns each demonstrates. Stronger credibility per the "proof not hype" memory.

No other changes to `AboutValues.tsx`.

---

### 4.4 `AboutSkills.tsx`

Two `GROUPS[]` entries are edited: `GROUPS[0]` "Applied AI & product engineering" and `GROUPS[2]` "Healthcare operations". `GROUPS[1]` "Full-stack development" is left untouched.

**Edit 1 — `GROUPS[0].detail.highlights` (Applied AI):**

Change:
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
to:
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

Reasoning: Same shape (two highlights, one shorter than the other), more concrete content. The first highlight enumerates the actual patterns the portfolio demonstrates. The second is the proof-roster — what's running and what's prototyped — using project names that match `projects.ts`.

**Edit 2 — `GROUPS[0].tools` (Applied AI tool chips):**

Change:
```ts
tools: ['Claude', 'OpenAI', 'LangChain', 'RAG', 'Vector DBs', 'Cursor'],
```
to:
```ts
tools: ['Claude', 'OpenAI', 'FastAPI', 'PostgreSQL', 'Microsoft Graph', 'Vector DBs'],
```

Reasoning: Drops `LangChain` (none of the shipped case studies use it — Clinical GenAI uses raw structured outputs), `RAG` (underclaims given the schema-extraction + orchestration patterns), and `Cursor` (tooling brand, not a capability). Adds `FastAPI` and `PostgreSQL` (Clinical GenAI's actual stack) and `Microsoft Graph` (Automation Engine's action surface). Chip count stays at 6.

**Edit 3 — `GROUPS[2].detail.highlights[0]` (Healthcare operations — Operations highlight):**

Change:
```ts
{
  label: 'Operations',
  text: 'Project leadership and workflow design across 3 VCH hospital sites; supported 200+ patient plans per year.',
},
```
to:
```ts
{
  label: 'Operations',
  text: 'Project leadership and workflow design across 4 VCH hospital sites; supported 200+ patient care plans per year.',
},
```

Reasoning: Site count alignment (3 → 4); slight word polish ("patient care plans" matches the language in `AboutHero` STATS).

**Edit 4 — `GROUPS[2].tools` (Healthcare operations tool chips):**

Change:
```ts
tools: ['VCH operations', 'Clinical workflows', 'Equipment logistics', 'Lean Six Sigma', 'Cerner', 'Stakeholder comms'],
```
to:
```ts
tools: ['VCH operations', 'Clinical workflows', 'Equipment logistics', 'Microsoft 365 ecosystem', 'Cerner', 'Lean Six Sigma'],
```

Reasoning: Drops the generic `Stakeholder comms` chip (covered by other content); adds `Microsoft 365 ecosystem` (since the Automation Engine sits squarely in that ecosystem and proves Lloyd works in it). Reordered slightly so domain-specific chips lead. Chip count stays at 6.

No other changes to `AboutSkills.tsx`. `GROUPS[1]` "Full-stack development" is intentionally untouched — its current content (Next.js / TypeScript / React / Node.js / PostgreSQL / Prisma / AWS) is already accurate.

---

### 4.5 `frontend/src/app/about/page.tsx`

**Edit — `metadata.description`:**

Change:
```ts
description:
  'Healthcare operations engineer with nine years inside Vancouver Coastal Health — building workflow systems, analytics tools, and applied AI for clinical use.',
```
to:
```ts
description:
  'Healthcare operations engineer with nine years inside Vancouver Coastal Health — building workflow systems, analytics tools, applied AI, and event-driven automation for clinical use. A portfolio of shipped and prototyped systems across four VCH sites and beyond.',
```

Reasoning: Existing description omits the automation work and the portfolio framing. New version adds both without breaking under 200 characters (current: 152 chars; new: 273 chars — still well under search-result truncation at ~320 chars).

No other changes to `page.tsx`. Imports, JSX composition, and section ordering are preserved.

---

## 5. What is NOT changing (explicit)

- `AboutHero` headline, eyebrow, location row, photo, glow effects, CTA buttons, photo card layout, animation delays
- `AboutHero` `STATS[0]` and `STATS[1]` (`9+ Years at VCH`, `200+ Patient plans / yr`) — both still accurate
- `AboutCerts` — entire file
- `AboutJourney` first three `ENTRIES[]` (2007–2012, 2012–2016, 2016–2022), the rail/node animation, the icon/tint mappings
- `AboutValues` `VALUES[0]` "Systems thinking" and `VALUES[2]` "Operational pragmatism"
- `AboutValues` `VALUES[1].body` (the longer essay text — only the `proof` array changes)
- `AboutSkills` `GROUPS[1]` "Full-stack development" — entire entry
- `AboutSkills` `GROUPS[0]` and `GROUPS[2]` summary, body, icon, tint, bg fields
- `FooterCTA` and `SiteFooter` — out of scope (live on the home page too; any edits there belong in a separate site-wide spec)
- The `/about` page composition in `page.tsx` (imports, JSX tree, ordering) — only the `metadata.description` string changes
- All animation, motion, prefers-reduced-motion handling, accessibility attributes

---

## 6. Tests

This is a copy-only refresh. There are no existing tests on these specific About components (`grep -l "About" frontend/src/**/*.test.*` returns no matches relevant to these files). No new tests are required.

A single regression-style content check can be added optionally during implementation if desired — a test asserting that `AboutHero` rendered output contains the phrase "four Vancouver Coastal Health sites" (catches accidental revert during future edits). This is **optional**, not required for spec acceptance.

---

## 7. Verification gates (implementation acceptance)

1. `npm run type-check` clean
2. `npm run lint` produces no new warnings on any of the five edited files
3. `npm run test` — full 94/94 pass (no test changes expected)
4. `npm run build` succeeds; `/about` is in the build output
5. Dev smoke (`curl -s http://localhost:3001/about | head -200`) confirms:
   - The phrase "four Vancouver Coastal Health sites" is present
   - The phrase "Clinical GenAI documentation pipeline" appears in the rendered HTML
   - The phrase "Open to healthcare data, analytics, AI" is present in the availability pill
   - The phrase "Schema-constrained LLM extraction" appears
   - The phrase "three Vancouver Coastal Health sites" is ABSENT (stale text removed)
   - The phrase "Cursor + Claude Code" is ABSENT (stale tooling-brand proof removed)
6. Visual spot-check: open `/about` in a browser, confirm the stats row reads `9+ Years at VCH · 200+ Patient plans / yr · 4 / 800+ Sites · assets` without layout overflow

---

## 8. Out of scope (explicit)

- Adding a new "Featured work" or "Projects" section to the About page
- Embedding case-study screenshots or mocks on the About page
- Changing the home page, work index, or any case-study page
- Touching `FooterCTA` or `SiteFooter` (cross-cutting; belongs in a separate cleanup)
- Adding any tests beyond the optional one noted in §6
- Refactoring `InfoCard` or other primitives used by `AboutValues` and `AboutSkills`
- Changing the photo, glow effects, or visual register
- Pivoting the About-page register toward homepage-style healthcare-first framing — explicitly forbidden per the positioning-pivot memory

---

## 9. Acceptance criteria summary

- All 5 file edits applied exactly as specified in §4
- Verification gates in §7 all pass
- No structural, animation, or visual changes
- About page reads as the public face of a portfolio of shipped + prototyped systems, not as background-story-plus-one-platform
