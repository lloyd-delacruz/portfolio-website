# Project Meta Credibility Strip — Design Spec

**Date:** 2026-05-13
**Scope:** Single focused PR against `main`
**Parent program:** "Increase AI credibility through proof, not hype." First of four sub-projects:

1. **This spec — `<ProjectMeta>` primitive + retrofit across all work/case-study pages.**
2. Lift the four thin work pages (apex-protocol, equitrackr, spendwise, website-gemms) to the 9-section deep-dive spine.
3. `/systems` becomes a system-card index.
4. Dashboards legacy cleanup.

Sub-projects 2–4 are out of scope here. They get their own specs after this one ships.

## Goal

Establish a uniform, mono-rendered credibility strip that sits directly below the hero on every `/work/*` and `/case-studies/*` page. The strip declares — in honest, falsifiable terms — what each system is, where it runs, what it's built on, and who built it. Recruiters scanning a page see seven or eight load-bearing facts in the first 600 pixels.

The strip replaces ad-hoc "STATUS ◉ Inference live …" lines on the two existing AI deep-dives and adds a credibility floor to the four currently-thin work pages.

**Original parent brief (from user):**

> Increase AI credibility through proof instead of hype. Add architecture diagrams, workflow maps, technical stack breakdowns, GitHub links, deployment details, model evaluation summaries, and system design visuals throughout the site.

This spec covers the **stack breakdowns, GitHub-link slot, and deployment details** lever from that brief. Architecture diagrams, workflow maps, and model evaluation already exist on the two flagship deep-dives ([[2026-05-13-applied-ai-system-deep-dives-design]]) and the homepage ([[2026-05-13-homepage-credibility-pass-design]]).

**GitHub-link constraint:** the user does not currently have public repos for any portfolio project. The schema reserves a `source` field; ship without it populated. Future ML reference-repo work (publishing sanitized Clinical Risk Engine / Population-Health Intelligence model cards + evaluation notebooks) can fill the slot in without a schema change.

## Architecture

Three new modules, each with one job:

```
src/lib/projects.ts                   # single source of truth (typed registry, keyed by slug)
src/components/work/ProjectMeta.tsx   # presentational strip, takes { slug }, reads registry
src/app/globals.css                   # new .project-meta block, scoped CSS vars
```

**`projects.ts`** — pure data. No React, no styles. Exports a typed `PROJECTS` record. Importable from anywhere (this spec uses it from `ProjectMeta`; future work can migrate `FeaturedWork.tsx` and `SystemsToolchain.tsx` to read from it too — out of scope here).

**`ProjectMeta.tsx`** — takes a `slug` prop, resolves data via `PROJECTS[slug]`, renders the strip. Pure presentation, no state, no effects. Skips any field that isn't set on that project — no empty rows.

**Styling** — single `.project-meta` block in `globals.css` using CSS variables. Default values produce the warm-cream treatment. A `[data-register="dark"]` ancestor on the dark deep-dive pages flips the vars to the `#111114` treatment.

Why this carving:

- Registry has no presentation knowledge — survives a register redesign.
- Component has no data knowledge — a project can be renamed or re-categorized without touching JSX.
- Styles read from vars — a third register can be added later without forking the component.

## Data shape

```ts
export type ProjectStatus = 'live' | 'in-production' | 'prototype' | 'archived' | 'concept'

export interface ProjectMetaRecord {
  slug: string                                // matches /work/<slug> or /case-studies/<slug>
  title: string                               // human-readable label; for registry self-doc
  status?: ProjectStatus
  statusLabel?: string                        // override, e.g. "Live since Aug 2025"
  role?: string                               // "Built solo" | "Led team of 4" | "Contributor"
  period?: string                             // "Aug 2025 – present"
  deployment?: string                         // "Hospital intranet · 4 sites"
  stack?: string[]                            // 3–5 plain-text chips
  live?: { href: string; label?: string }     // only when it points off-site
  source?: { href: string; label?: string }   // slot reserved; empty across the board today
  scale?: string                              // optional, e.g. "4 sites · 800+ assets"
}

export const PROJECTS: Record<string, ProjectMetaRecord> = { /* ... */ }
```

Every field except `slug` + `title` is optional. The component omits any unset field rather than rendering a dash or placeholder.

### Three flavor templates

```ts
// Flavor A — Production-internal (no live link, no source, has scale)
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
}

// Flavor B — ML deep-dive (inference lives on the page itself; no off-site live link)
'clinical-risk-engine': {
  slug: 'clinical-risk-engine',
  title: 'Clinical Risk Engine',
  status: 'live',
  statusLabel: 'Inference live on this page',
  role: 'Built solo',
  period: '2025',
  deployment: 'Static export · client-side inference',
  stack: ['Next.js', 'TypeScript', 'Python', 'scikit-learn', 'ONNX runtime web'],
}

// Flavor C — Thin-stub (concept/prototype; minimal honest meta)
'equitrackr': {
  slug: 'equitrackr',
  title: 'EquiTrackr',
  status: 'prototype',
  role: 'Built solo',
  period: '2025',
  stack: ['Next.js', 'TypeScript'],
}
```

**Honesty discipline locked into the schema:** if a field would have to be invented to look fuller, you omit it. A strip rendering four real facts reads stronger than a strip rendering seven with three unsupported.

## DOM & layout

### Semantic structure

```html
<aside class="project-meta" role="region" aria-label="Project metadata">
  <dl class="project-meta__list">
    <div class="project-meta__field">
      <dt>Status</dt>
      <dd>
        <span class="project-meta__dot" data-state="live" aria-hidden="true"></span>
        Live since Aug 2025
      </dd>
    </div>
    <div class="project-meta__field"><dt>Role</dt><dd>Built solo</dd></div>
    <div class="project-meta__field"><dt>Period</dt><dd>Aug 2025 – present</dd></div>
    <div class="project-meta__field"><dt>Deployment</dt><dd>Hospital intranet · 4 sites</dd></div>
    <div class="project-meta__field"><dt>Scale</dt><dd>4 sites · 800+ assets</dd></div>

    <div class="project-meta__field project-meta__field--wide">
      <dt>Stack</dt>
      <dd>
        <span class="project-meta__chip">Microsoft Lists</span>
        <span class="project-meta__chip">QR workflows</span>
        <span class="project-meta__chip">React</span>
        <span class="project-meta__chip">TypeScript</span>
      </dd>
    </div>
  </dl>
</aside>
```

Wrapping each label/value pair in a `<div>` inside a `<dl>` is valid HTML5 and lets us style each pair as a flex item.

### Visual sketch (warm-cream register, 1180px container)

```
──────────────────────────────────────────────────────────────────────────────────
  STATUS                 ROLE             PERIOD                  DEPLOYMENT
  ● Live since Aug 2025  Built solo       Aug 2025 – present      Hospital intranet · 4 sites

  SCALE                  STACK
  4 sites · 800+ assets  Microsoft Lists   QR workflows   React   TypeScript
──────────────────────────────────────────────────────────────────────────────────
```

### Layout rules

- `<dl>` is `display: flex; flex-wrap: wrap; column-gap: 40px; row-gap: 20px`.
- Compact fields (Status, Role, Period, Deployment, Scale, Live, Source) flow inline.
- `Stack` carries `flex: 1 0 100%` — always claims its own row.
- Labels: `text-[10px] uppercase tracking-[0.16em] font-semibold`, color via `--meta-label-ink`.
- Values: mono, `text-[13px] leading-snug`, color via `--meta-ink`.
- Chips: hairline border, no fill, `text-[11px]`, `px-2 py-0.5 rounded`.
- Status dot: `h-2 w-2 rounded-full`, color via `[data-state]` attribute selector, no animation.
- Mobile (`< 640px`): fields stack vertically, full-width.

### CSS — two registers, no variant prop

```css
.project-meta {
  --meta-surface: transparent;
  --meta-rule: rgba(0, 0, 0, 0.08);
  --meta-ink: var(--ink-soft);
  --meta-label-ink: var(--ink-muted);
  --meta-chip-border: rgba(0, 0, 0, 0.12);

  background: var(--meta-surface);
  border-top: 1px solid var(--meta-rule);
  border-bottom: 1px solid var(--meta-rule);
  padding: 1.5rem 0;
}

[data-register="dark"] .project-meta {
  --meta-surface: #111114;
  --meta-rule: #1F1F22;
  --meta-ink: #E5E5E5;
  --meta-label-ink: #6B7280;
  --meta-chip-border: #1F1F22;

  border: 1px solid var(--meta-rule);
  border-radius: 12px;
  padding: 1.25rem 1.5rem;
}

.project-meta__dot[data-state="live"]            { background: #16a34a; }
[data-register="dark"] .project-meta__dot[data-state="live"] { background: #7DD3FC; }
.project-meta__dot[data-state="in-production"]   { background: #16a34a; }
.project-meta__dot[data-state="prototype"]       { background: #d97706; }
.project-meta__dot[data-state="archived"]        { background: #6b7280; }
.project-meta__dot[data-state="concept"]         { background: #6b7280; }
```

The `[data-register="dark"]` attribute lands on the dark deep-dive page wrappers. The implementation plan chooses whether to add it as a new attribute or to reuse an existing class marker on those pages.

## Retrofit & integration

Seven pages get the strip in this PR. Each falls into one of the three flavors:

| Page | Flavor | Notes |
|---|---|---|
| `/work/wheelchair-tracking` | A | Strip inserts directly below `<WcHero />` |
| `/work/clinical-risk-engine` | B | **Replace** the 4-field `<dl>` META block at the bottom of `CrHero.tsx` (`Role · Dataset · Features · Status`) with `<ProjectMeta slug="clinical-risk-engine" />`. The block's existing values fold into the registry entry. |
| `/work/population-health-intelligence` | B | **Replace** the 4-field `<dl>` META block at the bottom of `PhHero.tsx` (`Role · Coverage · Sources · Status`) with `<ProjectMeta slug="population-health-intelligence" />`. Same fold-in pattern as clinical-risk-engine. |
| `/work/apex-protocol` | C | Page is a `<PlaceholderCaseStudy>`. Render `<ProjectMeta />` inside the placeholder via a new optional `meta` prop slot, OR insert the strip below the placeholder block. Resolved by implementation plan. |
| `/work/equitrackr` | C | Full case-study structure; strip inserts directly below `<EtHero />` |
| `/work/spendwise` | C | Full case-study structure; strip inserts directly below `<SwHero />` |
| `/work/website-gemms` | C | Page is a `<PlaceholderCaseStudy>`. Same handling as apex-protocol. |

**Note on register assumption (corrected from earlier draft).** All seven pages render inside the `.home2` warm-cream wrapper. The dark deep-dive register described in `[[2026-05-13-applied-ai-system-deep-dives-design]]` was never implemented — those pages also live in `.home2`. The `[data-register="dark"]` CSS in this spec is kept as **future-proofing only**; no page receives that attribute in this PR.

**Out of scope: the two legacy `/case-studies/*` pages** (`wheelchair-inventory-optimization`, `project-management-analytics`) use a Framer-Motion-plus-gradient register entirely separate from `.home2`. Retrofitting them requires register migration, which is a different cleanup. They get their own follow-up.

### Per-project content sourcing

The implementation plan extracts whatever values it can from existing page copy (status, role, stack chips, status lines already shown) and flags gaps for user input. **Any field where the implementer would have to invent a value is omitted, not guessed.**

Two content questions surface to the user during implementation:

1. The four thin-stub pages (apex-protocol, equitrackr, spendwise, website-gemms) need at minimum: `status`, `role`, `period`, `stack`. Implementation pauses for input on these rather than fabricating them.
2. The two case-study pages need confirmation on whether they share their work-page sibling's meta or carry their own (a case study can be `archived` even when the underlying system is `live`).

### Deep-dive hero replacement detail

Each deep-dive hero (`CrHero.tsx`, `PhHero.tsx`) carries a 4-field `<dl>` block immediately below the CTAs (the `META` array rendered as a grid of label/value pairs). That `<dl>` is replaced by `<ProjectMeta slug="..." />` rendered **outside** the hero component, immediately below it in the page composition. The hero loses the META array and its `<dl>` render entirely; the new strip subsumes the responsibility.

Existing META values map to registry fields as follows:

- **Clinical Risk Engine:** `Role = Applied AI engineering` → `role`; `Dataset = Wisconsin Diagnostic (569)` and `Features = 30 cell-morphology signals` → fold into `scale: "Wisconsin Diagnostic · 569 cases · 30 features"`; `Status = Prototype` → `status: 'prototype'`.
- **Population-Health:** `Role = Applied AI engineering` → `role`; `Coverage = 193 countries` and `Sources = WHO · World Bank · IMF` → fold into `scale: "193 countries · WHO · World Bank · IMF"`; `Status = Prototype` → `status: 'prototype'`.

This corrects the previous draft of this spec which referenced a non-existent "ad-hoc mono status line" and an Appendix-move of latency/Brier numbers (those numbers are not currently on the pages).

### Out of scope (explicit)

- Lifting the four thin pages to the deep-dive spine (sub-project #2).
- `/systems` becoming a system-card index (sub-project #3).
- Dashboards cleanup (sub-project #4).
- Migrating `FeaturedWork.tsx` or `SystemsToolchain.tsx` to consume the registry.
- Populating any `source` URLs (no public repos yet).
- Adding the strip to `/about`, `/systems`, `/contact`, `/blog`, `/skills`, `/experience`, `/education`, or `/dashboards`.

## Testing

Three test files added under the existing patterns in this repo:

- **`ProjectMeta.test.tsx`** — renders each of the three flavors (A/B/C) from fixtures and asserts:
  - All present fields render with their labels.
  - Omitted fields produce no DOM (no empty `<dt>Source</dt><dd></dd>` rows).
  - The status dot's `data-state` attribute reflects the registry value.
  - The wrapper carries `role="region"` and `aria-label="Project metadata"`.
  - Slug not in registry: component returns `null` (no DOM emitted).
  - Registry entry with only `slug` + `title`: component returns `null`.
- **`projects.test.ts`** — type-only sanity:
  - Every key in `PROJECTS` matches its entry's `slug` property.
  - Required fields (`slug`, `title`) present on every entry.
- No visual-regression harness exists in this repo, so no screenshot tests.

## Accessibility

- Semantic `<dl>` / `<dt>` / `<dd>` — screen readers narrate as label/value pairs.
- `role="region"` + `aria-label="Project metadata"` makes the block a discoverable landmark.
- Status dot has `aria-hidden="true"`; meaning is carried by `statusLabel` text — color is decorative, never load-bearing.
- Color contrast: warm register uses existing `--ink-soft` / `--ink-muted` tokens (project tokens, already AA-compliant); dark register pairs `#E5E5E5` on `#111114` (well above AA).
- No animation on the strip — nothing to guard with `prefers-reduced-motion`.

## Edge cases

| Case | Behavior |
|---|---|
| `slug` not in registry | Return `null`. Emit `console.warn` in dev only (`process.env.NODE_ENV !== 'production'`). No prod-visible breakage. |
| Registry entry has only `slug` + `title` | Return `null`. No phantom empty strip. |
| `stack` array empty | Field omitted. |
| `live` or `source` href present but empty string | Field omitted. |
| Page reached without a `data-register="dark"` ancestor | Renders in warm-cream register (default vars). Safe fallback. |

## Performance

- Pure presentation, no client JS, no images.
- Pure CSS for state-dot color (no JS color lookup).
- Static-export friendly.
- Bundle delta: ~1.5 KB of TSX + ~600 B of CSS. Negligible.

## Cross-cutting

- `npm run type-check` and `npm run lint` must pass.
- No new fonts. Mono font reuses whatever is already loaded for the existing hero mono lines on the two deep-dives — implementation plan confirms (likely JetBrains Mono if bundled, otherwise Tailwind `font-mono` default).
- No new dependencies.
- `next.config.js` static-export settings untouched.

## File-change manifest

**New:**

- `frontend/src/lib/projects.ts`
- `frontend/src/components/work/ProjectMeta.tsx`
- `frontend/src/components/work/ProjectMeta.test.tsx`
- `frontend/src/lib/projects.test.ts`

**Modified:**

- `frontend/src/app/globals.css` — add `.project-meta` block (warm-cream defaults; `[data-register="dark"]` override kept as future-proofing, not applied to any current page)
- `frontend/src/app/work/wheelchair-tracking/page.tsx` — render `<ProjectMeta slug="wheelchair-tracking" />` below `<WcHero />`
- `frontend/src/app/work/clinical-risk-engine/page.tsx` — render `<ProjectMeta slug="clinical-risk-engine" />` below `<CrHero />`
- `frontend/src/app/work/population-health-intelligence/page.tsx` — render `<ProjectMeta slug="population-health-intelligence" />` below `<PhHero />`
- `frontend/src/app/work/apex-protocol/page.tsx` — render `<ProjectMeta slug="apex-protocol" />` (placement TBD by implementation plan — likely below `<PlaceholderCaseStudy>` or via a new prop slot)
- `frontend/src/app/work/equitrackr/page.tsx` — render `<ProjectMeta slug="equitrackr" />` below `<EtHero />`
- `frontend/src/app/work/spendwise/page.tsx` — render `<ProjectMeta slug="spendwise" />` below `<SwHero />`
- `frontend/src/app/work/website-gemms/page.tsx` — render `<ProjectMeta slug="website-gemms" />` (same placement question as apex-protocol)
- `frontend/src/components/casestudy/clinicalRisk/CrHero.tsx` — remove the `META` constant and the `<dl>` block that renders it
- `frontend/src/components/casestudy/popHealth/PhHero.tsx` — remove the `META` constant and the `<dl>` block that renders it

**Deleted:** none.

## Success criteria

- All seven `/work/*` pages in scope render the strip directly below the hero (or for `<PlaceholderCaseStudy>` pages, in the equivalent position resolved by the implementation plan).
- The two AI deep-dives no longer carry their 4-field `<dl>` META block inside the hero; the equivalent facts now live in the strip's registry entries.
- A recruiter scanning any project page can identify status, role, period, deployment (when set), and stack within the first 600 px without scrolling.
- No invented or unsupported fields visible anywhere — every value on every page traces back to a known fact.
- `npm run type-check` and `npm run lint` pass.
- Both new test files pass (`ProjectMeta.test.tsx`, `projects.test.ts`).
- Bundle size delta < 5 KB.

## Open follow-ups (post-implementation, not in this spec)

- Migrate `FeaturedWork.tsx` and `SystemsToolchain.tsx` to read from `PROJECTS`.
- Publish sanitized reference repos for Clinical Risk Engine + Population-Health Intelligence, then populate their `source` fields.
- Sub-project #2: lift the four thin-stub work pages to the 9-section deep-dive spine (separate spec).
- Sub-project #3: rebuild `/systems` as a system-card index reading from `PROJECTS` (separate spec).
- Sub-project #4: decide whether to retire or absorb `/dashboards/*` (separate spec).
