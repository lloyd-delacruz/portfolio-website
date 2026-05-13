# Systems page — frontend + backend stack rows

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Extend `/systems` from one AI-tools row to three rows — AI agents, Frontend stack, Backend stack — using the same interactive tile + popup pattern.

**Architecture:** Refactor `SystemsToolchain.tsx` to a single component that owns one shared modal and renders three labeled rows via an internal `ToolRow` subcomponent. Add `icon` and `monogram` optional fields to the `Tool` type to support Lucide icons + colored letter tiles for the new rows (no new SVG assets).

**Tech Stack:** Next.js 15, React 18, TypeScript, Tailwind CSS, Framer Motion, Lucide React.

**Spec:** [`docs/superpowers/specs/2026-05-13-systems-page-stack-rows-design.md`](../specs/2026-05-13-systems-page-stack-rows-design.md)

---

## Testing approach (no unit tests in this codebase)

This codebase has no component test framework. Each task verifies via:

1. `npm run type-check` — type errors surface here
2. `npm run lint` — ESLint catches obvious issues
3. `npm run dev` — visual check at `http://localhost:3001/systems`

Run those commands from `frontend/`. Do not run `npm run build` mid-task — the static export is slow and unnecessary until the final task.

## Pre-flight check

Before Task 1, confirm the dev server runs and the page loads.

- [ ] **Step 0.1: Start the dev server**

Run from `frontend/`: `npm run dev`
Expected: server starts on port 3001 without errors.

- [ ] **Step 0.2: Load the page in a browser**

Visit `http://localhost:3001/systems`.
Expected: hero + one rounded white card with 6 AI tool tiles (Claude Code, Codex, Cursor, Antigravity, Copilot, Gemini). Click any tile — modal opens with What/Trend/How/In-my-work sections. Escape closes it.

Leave the dev server running. Tasks 1–4 below all work against the live page.

---

## Task 1: Extend the Tool type and add icon/monogram render helper

**Files:**
- Modify: `frontend/src/components/home/SystemsToolchain.tsx`

This task is a pure refactor of the type and the tile-thumbnail rendering — no new rows yet. After this task the page should look and behave identically.

- [ ] **Step 1.1: Add Lucide imports**

In `frontend/src/components/home/SystemsToolchain.tsx`, replace this line:

```ts
import { X, ArrowUpRight } from 'lucide-react'
```

with:

```ts
import { X, ArrowUpRight, type LucideIcon } from 'lucide-react'
```

- [ ] **Step 1.2: Extend the `Tool` type**

Replace the existing `Tool` type definition with:

```ts
type Monogram = { text: string; bg: string; fg: string }

type Tool = {
  name: string
  vendor: string
  logo?: string
  Icon?: LucideIcon
  monogram?: Monogram
  tagline: string
  what: string
  trend: string
  how: string
  inWork: string
  projects: Project[]
  url: string
  site: string
}
```

Note: `logo` is now optional. The 6 existing AI tools still have a `logo` value, so they will continue to render using the `<img>` path.

- [ ] **Step 1.3: Add a `ToolThumb` helper component**

Below the `TOOLS` array and above the `Section` function, add:

```tsx
function ToolThumb({ tool, size = 22 }: { tool: Tool; size?: number }) {
  if (tool.Icon) {
    const Icon = tool.Icon
    return (
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#f5f3f8] ghair">
        <Icon size={size} className="text-ink" strokeWidth={1.75} />
      </span>
    )
  }
  if (tool.monogram) {
    const { text, bg, fg } = tool.monogram
    return (
      <span
        className="grid h-11 w-11 shrink-0 place-items-center rounded-xl ghair font-display text-[13px] font-bold tracking-tight"
        style={{ background: bg, color: fg }}
      >
        {text}
      </span>
    )
  }
  return (
    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#f5f3f8] ghair">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={tool.logo} alt="" className="h-[22px] w-[22px]" />
    </span>
  )
}
```

- [ ] **Step 1.4: Use `ToolThumb` in the tile button**

In the tile grid (inside `TOOLS.map((t) => (...))`), replace:

```tsx
<span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#f5f3f8] ghair">
  {/* eslint-disable-next-line @next/next/no-img-element */}
  <img src={t.logo} alt="" className="h-[22px] w-[22px]" />
</span>
```

with:

```tsx
<ToolThumb tool={t} />
```

- [ ] **Step 1.5: Use `ToolThumb` in the modal header**

In the modal `<div className="flex items-start justify-between gap-4">` block, replace:

```tsx
<span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#f5f3f8] ghair">
  {/* eslint-disable-next-line @next/next/no-img-element */}
  <img src={active.logo} alt="" className="h-[22px] w-[22px]" />
</span>
```

with:

```tsx
<ToolThumb tool={active} />
```

- [ ] **Step 1.6: Verify**

From `frontend/`:

```bash
npm run type-check
npm run lint
```

Expected: both commands exit 0.

Reload `http://localhost:3001/systems` in the browser. Expected: the page looks identical to before. Click any tile — modal opens with the same logo, content, and behavior.

- [ ] **Step 1.7: Commit**

```bash
git add frontend/src/components/home/SystemsToolchain.tsx
git commit -m "refactor(systems): extract ToolThumb + extend Tool type for icons/monograms"
```

---

## Task 2: Extract `ToolRow` subcomponent

**Files:**
- Modify: `frontend/src/components/home/SystemsToolchain.tsx`

Pull the row UI into a reusable internal component. Rename `TOOLS` to `AI_TOOLS`. Still only one row visible after this task.

- [ ] **Step 2.1: Rename `TOOLS` to `AI_TOOLS`**

Find: `const TOOLS: Tool[] = [`
Replace with: `const AI_TOOLS: Tool[] = [`

(Only one occurrence of `TOOLS` exists at this declaration.)

- [ ] **Step 2.2: Add `RowContent` type and the `ToolRow` subcomponent**

Above the `SystemsToolchain` function definition, add:

```tsx
type RowContent = {
  eyebrow: string
  headlineLead: string
  headlineAccent: string
  description: string
  tools: Tool[]
}

function ToolRow({ row, onSelect }: { row: RowContent; onSelect: (t: Tool) => void }) {
  return (
    <div className="rounded-[1.6rem] bg-white/70 p-7 ghair sm:p-9">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-plum">{row.eyebrow}</p>

      <div className="mt-3 grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_1fr] lg:items-end">
        <h2 className="font-display text-2xl font-extrabold leading-[1.15] text-ink sm:text-[2rem]">
          {row.headlineLead}{' '}
          <span className="text-plum">{row.headlineAccent}</span>
        </h2>
        <p className="max-w-md text-[1.02rem] leading-relaxed text-ink-soft">{row.description}</p>
      </div>

      <div className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {row.tools.map((t) => (
          <button
            key={t.name}
            type="button"
            onClick={() => onSelect(t)}
            className="flex items-center gap-4 rounded-2xl bg-white p-5 text-left ghair lift"
          >
            <ToolThumb tool={t} />
            <span>
              <span className="block font-display text-[15px] font-bold text-ink">{t.name}</span>
              <span className="mt-0.5 block text-[12px] text-ink-muted">{t.vendor}</span>
              <span className="mt-1 block text-[12.5px] leading-snug text-ink-soft">{t.tagline}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 2.3: Define the AI row content**

Above the `SystemsToolchain` function (below `AI_TOOLS`), add:

```ts
const AI_ROW: RowContent = {
  eyebrow: 'The toolchain',
  headlineLead: 'Agents do the heavy lifting.',
  headlineAccent: 'I direct the work.',
  description:
    'A stack of agentic coding tools, each pointed at what it does best. Tap any one to see what it is, where the field is heading, how it works — and where it shows up in my work.',
  tools: AI_TOOLS,
}
```

- [ ] **Step 2.4: Replace the inline row markup with `<ToolRow>`**

In `SystemsToolchain`'s return JSX, the `<section>` currently contains a `<div className="rounded-[1.6rem] bg-white/70 …">` with the row markup inside it, followed by the modal `{active && (…)}` block.

Replace the entire row `<div>` (from `<div className="rounded-[1.6rem] bg-white/70 p-7 ghair sm:p-9">` through its matching `</div>`) with:

```tsx
<ToolRow row={AI_ROW} onSelect={setActive} />
```

After this edit, the JSX inside `<section>` should look like:

```tsx
<section className="mx-auto max-w-[1180px] px-6 pt-4 pb-16 space-y-6">
  <ToolRow row={AI_ROW} onSelect={setActive} />

  {active && (
    /* …existing modal block, unchanged… */
  )}
</section>
```

Note: also change the `<section>` className from `pt-4 pb-16` to `pt-4 pb-16 space-y-6` so the upcoming rows stack with consistent spacing. (The `space-y-6` adds 1.5rem vertical gap between row cards.)

- [ ] **Step 2.5: Verify**

```bash
npm run type-check
npm run lint
```

Both exit 0. Browser: page renders identically to before. Tile click still opens modal.

- [ ] **Step 2.6: Commit**

```bash
git add frontend/src/components/home/SystemsToolchain.tsx
git commit -m "refactor(systems): extract ToolRow subcomponent, rename TOOLS to AI_TOOLS"
```

---

## Task 3: Add the Frontend stack row

**Files:**
- Modify: `frontend/src/components/home/SystemsToolchain.tsx`

Add the second row. After this task, `/systems` shows two cards.

- [ ] **Step 3.1: Add Lucide icon imports**

Update the `lucide-react` import:

```ts
import { X, ArrowUpRight, type LucideIcon, Atom, Wind } from 'lucide-react'
```

- [ ] **Step 3.2: Add `FRONTEND_TOOLS` data**

Below the `AI_TOOLS` array (and above the `AI_ROW` constant if you placed it there, or anywhere above `SystemsToolchain`), add:

```ts
const FRONTEND_TOOLS: Tool[] = [
  {
    name: 'Next.js',
    vendor: 'Vercel',
    monogram: { text: 'N', bg: '#0a0a0a', fg: '#fdf8f3' },
    tagline: 'The React framework for the web.',
    what:
      'A production framework built on React: file-system routing, server and client components, image optimization, and a build pipeline that handles static export, SSR, and edge rendering from the same codebase.',
    trend:
      'The default React stack in 2025. App Router and React Server Components shifted how teams think about where rendering happens — server-first by default, with islands of interactivity on the client.',
    how:
      'Compiles your `app/` directory into routes, decides per-component whether to render on the server or ship to the client, and bundles only what each page needs. Output can be a Node server, a static export, or edge functions.',
    inWork: 'Powers every page you’re reading — this site, the case studies, and most of the work I ship to the browser.',
    projects: [
      { name: 'This site', href: '/' },
      { name: 'EquiTrackr', href: '/work/equitrackr' },
      { name: 'SpendWise', href: '/work/spendwise' },
    ],
    url: 'https://nextjs.org',
    site: 'nextjs.org',
  },
  {
    name: 'Astro',
    vendor: 'Astro',
    monogram: { text: 'A', bg: '#1c162e', fg: '#ff5d01' },
    tagline: 'Content-first web framework with islands architecture.',
    what:
      'A framework optimized for content-heavy sites: ships zero JavaScript by default, lets you use React/Vue/Svelte components as islands of interactivity, and includes a content collection system for Markdown and MDX.',
    trend:
      'Part of the 2024–25 backlash against shipping megabytes of JavaScript for a blog. Astro, Hono, and a few others are pushing the "send HTML, hydrate selectively" model into mainstream use.',
    how:
      'Renders pages to HTML at build time, then hydrates only the components you explicitly mark as interactive. The rest of the page ships as plain markup — fast to load, easy to cache.',
    inWork: 'For content-heavy work where the words are the product and a full SPA shell would be overkill.',
    projects: [{ name: 'Explorations' }],
    url: 'https://astro.build',
    site: 'astro.build',
  },
  {
    name: 'React',
    vendor: 'Meta',
    Icon: Atom,
    tagline: 'A library for building UIs from components.',
    what:
      'A JavaScript library where you describe your UI as a tree of components — each one a function that takes data and returns markup. React keeps the rendered output in sync with the data as it changes.',
    trend:
      'Still the dominant UI library by miles. The 2024–25 era added Server Components, which split rendering between server and client — collapsing the line between framework and library.',
    how:
      'Maintains a virtual representation of the UI in memory. When state changes it diffs the new tree against the old one and applies the minimum set of DOM updates needed.',
    inWork: 'Every interactive surface I build — pages, dashboards, charts — sits on React, usually via Next.js.',
    projects: [
      { name: 'This site', href: '/' },
      { name: 'EquiTrackr', href: '/work/equitrackr' },
      { name: 'Health dashboards', href: '/dashboards/life-expectancy' },
    ],
    url: 'https://react.dev',
    site: 'react.dev',
  },
  {
    name: 'TypeScript',
    vendor: 'Microsoft',
    monogram: { text: 'Ts', bg: '#3178c6', fg: '#ffffff' },
    tagline: 'JavaScript with types.',
    what:
      'A superset of JavaScript that adds a static type system. Code compiles down to plain JS, but during development the compiler catches whole classes of errors before the code runs.',
    trend:
      'The default for any serious JavaScript project in 2025. Even traditionally-untyped ecosystems (React Native, Node CLIs, build tools) are moving to TS or TS-checked JSDoc.',
    how:
      'Runs as a compiler and language server: reads your code, infers or checks types against your annotations, and either emits JavaScript or surfaces errors. IDE integration gives you autocomplete and refactoring.',
    inWork: 'Standard across every project — APIs, components, scripts. Strictness on; no escape hatches without a reason.',
    projects: [
      { name: 'This site', href: '/' },
      { name: 'EquiTrackr', href: '/work/equitrackr' },
      { name: 'SpendWise', href: '/work/spendwise' },
    ],
    url: 'https://www.typescriptlang.org',
    site: 'typescriptlang.org',
  },
  {
    name: 'Tailwind CSS',
    vendor: 'Tailwind Labs',
    Icon: Wind,
    tagline: 'Utility-first CSS framework.',
    what:
      'Instead of writing CSS, you compose pre-defined utility classes directly in your markup — spacing, colors, typography, layout. The build step strips out unused classes so the shipped CSS stays small.',
    trend:
      'The most-adopted styling approach in modern React/Next codebases. v4 collapsed config into CSS itself and made theming through CSS variables a first-class concept.',
    how:
      'Scans your source for class names at build time, generates only the CSS you actually used, and exposes a theme layer via CSS variables you can override per project.',
    inWork: 'Every component on this site styles through Tailwind — paired with shadcn/ui for primitives and custom utilities for the brand layer.',
    projects: [
      { name: 'This site', href: '/' },
      { name: 'EquiTrackr', href: '/work/equitrackr' },
      { name: 'SpendWise', href: '/work/spendwise' },
    ],
    url: 'https://tailwindcss.com',
    site: 'tailwindcss.com',
  },
  {
    name: 'shadcn/ui',
    vendor: 'shadcn',
    monogram: { text: 'sh', bg: '#1c162e', fg: '#fdf8f3' },
    tagline: 'Copy-paste component library you actually own.',
    what:
      'Not a package — a CLI that drops Radix-based React components directly into your project, styled with Tailwind. You own the source, so you can modify any component without fighting library defaults.',
    trend:
      'The dominant approach for design-system primitives in React in 2025. Headless logic (Radix) plus owned, restyled markup has effectively replaced traditional component libraries like Material UI for new projects.',
    how:
      'A CLI fetches the source for a component and writes it into your `components/ui` folder. From then on it’s your code — no package to update, no version conflicts to manage.',
    inWork: 'The base layer for buttons, dialogs, dropdowns, and other primitives — restyled to fit the warm-paper aesthetic of this site.',
    projects: [
      { name: 'This site', href: '/' },
      { name: 'EquiTrackr', href: '/work/equitrackr' },
    ],
    url: 'https://ui.shadcn.com',
    site: 'ui.shadcn.com',
  },
]
```

- [ ] **Step 3.3: Add the `FRONTEND_ROW` content**

Below `AI_ROW`, add:

```ts
const FRONTEND_ROW: RowContent = {
  eyebrow: 'The frontend',
  headlineLead: 'The interface layer.',
  headlineAccent: 'What you see and touch.',
  description:
    'What renders in the browser — component-driven, typed end-to-end, and tuned for fast pages. Same modal shape: what it is, where the field is now, how it works, and where it shows up in my work.',
  tools: FRONTEND_TOOLS,
}
```

- [ ] **Step 3.4: Render the frontend row**

Inside `<section>`, below the AI row, add:

```tsx
<ToolRow row={FRONTEND_ROW} onSelect={setActive} />
```

The section should now look like:

```tsx
<section className="mx-auto max-w-[1180px] px-6 pt-4 pb-16 space-y-6">
  <ToolRow row={AI_ROW} onSelect={setActive} />
  <ToolRow row={FRONTEND_ROW} onSelect={setActive} />

  {active && (
    /* …existing modal… */
  )}
</section>
```

- [ ] **Step 3.5: Confirm Astro project chip with user**

The spec flagged Astro as needing a real project. Right now the tile lists a single inert chip "Explorations." Before committing, ask the user:

> "For the Astro tile on `/systems`, which project(s) should appear in the chips? Right now it shows an inert 'Explorations' chip — happy to swap it for real project links if you have any."

If the user supplies a project, replace the `projects: [{ name: 'Explorations' }]` line in the Astro entry with the appropriate `[{ name, href }, ...]` array.

- [ ] **Step 3.6: Verify**

```bash
npm run type-check
npm run lint
```

Both exit 0. Reload `http://localhost:3001/systems`:

- Two rounded cards now visible: "The toolchain" and "The frontend".
- The Frontend card shows 6 tiles in a 1/2/3 column grid (mobile/tablet/desktop).
- Each tile shows: monogram-or-Lucide-icon, tool name, vendor, tagline.
- Click any frontend tile — modal opens with the right content.
- Project chips at the bottom of each modal link correctly (or render as inert text for "Explorations").
- Escape closes the modal. Backdrop click closes the modal.

- [ ] **Step 3.7: Commit**

```bash
git add frontend/src/components/home/SystemsToolchain.tsx
git commit -m "feat(systems): add Frontend stack row with 6 tools"
```

---

## Task 4: Add the Backend stack row

**Files:**
- Modify: `frontend/src/components/home/SystemsToolchain.tsx`

Add the third row. Same pattern.

- [ ] **Step 4.1: Add Lucide icon imports**

Update the `lucide-react` import to include the backend icons:

```ts
import { X, ArrowUpRight, type LucideIcon, Atom, Wind, Hexagon, Route, Database } from 'lucide-react'
```

- [ ] **Step 4.2: Add `BACKEND_TOOLS` data**

Below the `FRONTEND_TOOLS` array, add:

```ts
const BACKEND_TOOLS: Tool[] = [
  {
    name: 'Node.js',
    vendor: 'OpenJS Foundation',
    Icon: Hexagon,
    tagline: 'JavaScript on the server.',
    what:
      'A runtime that lets you run JavaScript outside the browser — building HTTP servers, scripts, and tools with the same language and packages used on the front end.',
    trend:
      'Still the default for full-stack JS in 2025. The ecosystem is splitting between Node, Bun, and Deno — but Node remains the safe baseline for production work.',
    how:
      'Wraps V8 (Chrome’s JavaScript engine) with a non-blocking I/O event loop and a vast standard library. npm gives you a package for nearly every need; the runtime handles concurrency without threads.',
    inWork: 'The default runtime for any service or build tooling I write — keeps the whole stack in one language.',
    projects: [
      { name: 'EquiTrackr', href: '/work/equitrackr' },
      { name: 'SpendWise', href: '/work/spendwise' },
      { name: 'This site', href: '/' },
    ],
    url: 'https://nodejs.org',
    site: 'nodejs.org',
  },
  {
    name: 'Express',
    vendor: 'OpenJS Foundation',
    Icon: Route,
    tagline: 'Minimalist web framework for Node.js.',
    what:
      'A thin layer over Node’s HTTP module: routes, middleware, request/response helpers. Small surface, fast to learn, easy to embed inside larger services.',
    trend:
      'Still the most common Node web framework, though newer options (Fastify, Hono, Elysia) are pushing on performance and type safety. Express remains the safe choice for straightforward APIs.',
    how:
      'You define routes and middleware functions that chain together — each one looks at the request, optionally mutates state, and either responds or calls the next function in the chain.',
    inWork: 'My go-to for small APIs and admin endpoints when the project doesn’t need a heavier framework.',
    projects: [{ name: 'Explorations' }],
    url: 'https://expressjs.com',
    site: 'expressjs.com',
  },
  {
    name: 'Django',
    vendor: 'Django Software Foundation',
    monogram: { text: 'Dj', bg: '#092e20', fg: '#44b78b' },
    tagline: 'The web framework for perfectionists with deadlines.',
    what:
      'A batteries-included Python framework: ORM, admin interface, auth, forms, templating, and a clear opinionated structure for organizing a project.',
    trend:
      'Still the dominant Python web framework. In 2025 it’s being paired with HTMX or React on the front end as teams move away from heavy SPA setups for internal tools and content sites.',
    how:
      'Maps URL patterns to view functions, views to templates, and models to database tables via the ORM. The admin generates a usable interface for your data with almost no code.',
    inWork: 'When the workload is data-heavy and Python’s ecosystem (pandas, scikit-learn) needs to live next to the web layer.',
    projects: [{ name: 'Explorations' }],
    url: 'https://www.djangoproject.com',
    site: 'djangoproject.com',
  },
  {
    name: 'Wasp',
    vendor: 'Wasp-lang',
    monogram: { text: 'W', bg: '#ffcc00', fg: '#1c162e' },
    tagline: 'Full-stack web framework configured in one file.',
    what:
      'Describes your whole app — pages, auth, data models, jobs — in a single Wasp config, then generates a React + Node + Prisma project around it. You write your domain logic, the framework wires up the rest.',
    trend:
      'Part of the 2024–25 wave of higher-level frameworks aiming to compress full-stack boilerplate. Wasp, RedwoodJS, and t3-stack all bet the wiring layer should be generated, not written.',
    how:
      'The Wasp compiler reads your `.wasp` config and outputs a runnable React/Node/Prisma project. You edit the generated React components and Node operations; Wasp re-generates the glue when the config changes.',
    inWork: 'For greenfield apps where the auth + DB + jobs wiring would otherwise eat the first week of work.',
    projects: [{ name: 'Explorations' }],
    url: 'https://wasp-lang.dev',
    site: 'wasp-lang.dev',
  },
  {
    name: 'Prisma',
    vendor: 'Prisma',
    Icon: Database,
    tagline: 'Type-safe database ORM for Node and TypeScript.',
    what:
      'A schema-first ORM: you write a `.prisma` file defining tables and relations, and Prisma generates a fully-typed client for querying them, plus migrations to keep the database in sync.',
    trend:
      'The default TypeScript ORM in 2025, though Drizzle is gaining ground for projects that want closer-to-SQL ergonomics. Prisma’s bet on type safety end-to-end has held up.',
    how:
      'Generates a TypeScript client from your schema so every query returns precisely-typed results; the migration tool diffs your schema against the database and produces SQL migrations to apply.',
    inWork: 'Owns the schema and queries on every backend I ship — SpendWise, EquiTrackr, and anything else with real data.',
    projects: [
      { name: 'SpendWise', href: '/work/spendwise' },
      { name: 'EquiTrackr', href: '/work/equitrackr' },
    ],
    url: 'https://www.prisma.io',
    site: 'prisma.io',
  },
  {
    name: 'PostgreSQL',
    vendor: 'PostgreSQL Global Dev Group',
    monogram: { text: 'Pg', bg: '#336791', fg: '#ffffff' },
    tagline: 'The world’s most advanced open-source relational database.',
    what:
      'A mature SQL database with strong ACID guarantees, rich types (JSON, arrays, ranges), full-text search, and an extension system that lets you bolt on capabilities like vector search and time-series.',
    trend:
      'The default operational database in 2025. SQLite-on-the-edge and DuckDB-for-analytics are taking specific workloads, but Postgres remains the safe general-purpose pick for production data.',
    how:
      'Stores data in tables on disk, executes SQL queries through a cost-based planner, and uses MVCC so reads don’t block writes. Replication, partitioning, and extensions let it scale up before you outgrow it.',
    inWork: 'The primary datastore for everything I build that needs durable state — paired with Prisma for the application layer.',
    projects: [
      { name: 'SpendWise', href: '/work/spendwise' },
      { name: 'EquiTrackr', href: '/work/equitrackr' },
    ],
    url: 'https://www.postgresql.org',
    site: 'postgresql.org',
  },
]
```

- [ ] **Step 4.3: Add the `BACKEND_ROW` content**

Below `FRONTEND_ROW`:

```ts
const BACKEND_ROW: RowContent = {
  eyebrow: 'The backend',
  headlineLead: 'Where the data lives.',
  headlineAccent: 'And how it gets out.',
  description:
    'Typed APIs, real schemas, and the boring discipline that lets the front end stay simple. Same modal shape as the rest of the toolchain.',
  tools: BACKEND_TOOLS,
}
```

- [ ] **Step 4.4: Render the backend row**

Inside `<section>`, below the frontend row, add:

```tsx
<ToolRow row={BACKEND_ROW} onSelect={setActive} />
```

The section should now look like:

```tsx
<section className="mx-auto max-w-[1180px] px-6 pt-4 pb-16 space-y-6">
  <ToolRow row={AI_ROW} onSelect={setActive} />
  <ToolRow row={FRONTEND_ROW} onSelect={setActive} />
  <ToolRow row={BACKEND_ROW} onSelect={setActive} />

  {active && (
    /* …existing modal… */
  )}
</section>
```

- [ ] **Step 4.5: Confirm Express / Django / Wasp project chips with user**

Before committing, ask the user:

> "For the Express, Django, and Wasp tiles, which projects should appear in their chips? Right now they each show an inert 'Explorations' chip. Happy to swap in real project links."

If the user supplies projects, replace the corresponding `projects: [{ name: 'Explorations' }]` lines with the right arrays.

- [ ] **Step 4.6: Verify**

```bash
npm run type-check
npm run lint
```

Both exit 0. Reload `http://localhost:3001/systems`:

- Three rounded cards now visible: "The toolchain" / "The frontend" / "The backend".
- The Backend card shows 6 tiles in the same grid pattern.
- Click each backend tile — modal opens with the right content.
- Project chips link correctly (or render inert for "Explorations").
- Escape and backdrop-click both close the modal.

- [ ] **Step 4.7: Commit**

```bash
git add frontend/src/components/home/SystemsToolchain.tsx
git commit -m "feat(systems): add Backend stack row with 6 tools"
```

---

## Task 5: Final verification

**Files:** none modified — verification only.

- [ ] **Step 5.1: Run a clean type-check and lint**

```bash
cd frontend
npm run type-check
npm run lint
```

Both must exit 0.

- [ ] **Step 5.2: Run a production build (mid-fidelity smoke test)**

```bash
cd frontend
npm run build
```

Expected: build completes successfully. The `/systems` route appears in the route summary at the end.

- [ ] **Step 5.3: Visual checklist in dev server**

Restart `npm run dev` if needed and reload `http://localhost:3001/systems`. Confirm:

- Three stacked rounded white cards with consistent gap between them.
- Card 1 ("The toolchain") still uses brand SVG logos.
- Cards 2 and 3 use Lucide icons or monogram tiles in the same `h-11 w-11 rounded-xl` container shape.
- All 18 tiles (6 + 6 + 6) are clickable and open the correct popup.
- Each popup has all four content sections (What / Where / How / In my work) plus project chips.
- Escape, backdrop click, and X all close the modal.
- The page is responsive: tiles reflow to 1 column on mobile, 2 on tablet, 3 on desktop. (Resize the browser window to test.)
- No console errors in the browser dev tools.

- [ ] **Step 5.4: Final commit (if anything else moved)**

If Tasks 1–4 commits already cover all changes, skip this step. Otherwise:

```bash
git status
# If only SystemsToolchain.tsx shows up:
git add frontend/src/components/home/SystemsToolchain.tsx
git commit -m "chore(systems): final cleanups"
```

---

## Done criteria

The task is done when:

1. All 5 tasks above are checked off.
2. `npm run type-check` and `npm run lint` both pass.
3. `npm run build` succeeds.
4. `/systems` shows three stacked rows with 18 working tiles total.
5. No console errors during browser interaction.
6. The 4 user-confirmation prompts (Astro, Express, Django, Wasp project chips) have been raised with the user and resolved — either with real links or by keeping the "Explorations" inert chip.
