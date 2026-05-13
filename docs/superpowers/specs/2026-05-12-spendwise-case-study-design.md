# SpendWise — Featured Project / Case-Study Page — Design

**Date:** 2026-05-12
**Status:** Approved (pending spec review)
**Route:** `/work/spendwise` (replaces the current `PlaceholderCaseStudy` stub)

## Goal

Replace the SpendWise placeholder with a full, premium case-study page that presents
SpendWise as a modern, AI-native financial planning & operational budgeting platform —
not a budgeting spreadsheet, not a banking dashboard clone, not a fintech template.

The page lives in the existing `.home2` warm-paper register and follows the established
case-study component pattern (see `frontend/src/components/casestudy/equitrackr/`):
hand-built SVG/CSS "fake UI" surfaces (no screenshots), `Reveal` scroll animations,
`HomeNav` + `SiteFooter` chrome, `bits.tsx` helpers (`CsSection`, `Eyebrow`, `Module`, `Chip`).

The product is YNAB-style **zero-based budgeting** ("give every dollar a job",
"Ready to Assign") delivered as a calm, mobile-first consumer product with AI-assisted
planning. Reference screens (from the live app onboarding flow): *Let's Get Started* →
*Where is your money?* (add accounts) → *What do you spend on?* (budget categories:
Housing, Groceries, Dining Out, Monthly Bills) → *Give every dollar a job* (Ready to
Assign $5,000) → *Ready to go*. Category examples and copy on the page should echo these.

## Visual register

- Inherit `.home2` tokens. **Add three scoped tokens** to the `.home2` block in
  `frontend/src/app/globals.css`:
  - `--teal: #0d9488;` — SpendWise primary UI accent (matches the app's "Continue" buttons / category icons)
  - `--teal-deep: #0f766e;`
  - a brand-swirl gradient utility `.home2 .grad-swirl-text` / `.home2 .bg-swirl` using
    `conic-gradient`/`linear-gradient` across plum → magenta → teal → amber (the SpendWise mark colors)
- **Accent system:** teal-forward for product UI and primary CTAs; the multi-color brand
  swirl (plum / `--pink` / teal / `--amber`) only for the logo mark and one or two
  signature accents (hero headline span, section dividers). Plum stays as the page's
  structural accent (eyebrows, links) for consistency with the rest of the site.
  Money-positive figures use teal/`--green`; warnings use `--amber`; overspend uses `--coral`.
- All "screenshots" are constructed from divs/SVG (bars, donuts, sparkline charts, phone
  frames with notch + `9:41` status bar), matching `EtConsolePreview` / `FeaturedWork`'s
  `PreviewMock` approach. No raster images, no stock graphics.
- Motion: `anim-rise` staggered entrances in the hero; `Reveal` on each section; `flow-line`
  dashed-stroke animation on the workflow rail; respect `prefers-reduced-motion` (already
  globally handled). No autoplay carousels, no parallax, no count-up spam.

## Page structure

`frontend/src/app/work/spendwise/page.tsx` composes, in order (mirroring `equitrackr/page.tsx`):

```
<div className="home2 min-h-screen">
  <HomeNav active="Work" />
  <main>
    <SwHero />
    <Reveal><SwProblem /></Reveal>
    <Reveal><SwExperience /></Reveal>
    <Reveal><SwWorkflow /></Reveal>
    <Reveal><SwInsights /></Reveal>
    <Reveal><SwMobile /></Reveal>
    <Reveal><SwFutureAI /></Reveal>
    <SwClose />
  </main>
  <SiteFooter />
</div>
```

Plus `export const metadata` (title + description) like the EquiTrackr page.

### Shared bits

Reuse `frontend/src/components/casestudy/bits.tsx` (`CsSection`, `Eyebrow`, `Module`, `Chip`).
Add **one new shared bit**: `SpendWiseMark` (the swirl logo + wordmark, sizable) — placed in
`frontend/src/components/casestudy/spendwise/SwMark.tsx` since it's SpendWise-specific.
A small reusable `PhoneFrame` wrapper (notch, status bar, home indicator, configurable
screen content) also lives in the spendwise folder (`SwPhone.tsx`) — used by Hero, Workflow,
and Mobile sections.

### 1. `SwHero.tsx`

Premium fintech hero. Left column: "All work" back-link, a pill badge
("Fintech · AI-native planning platform"), `font-display` headline with a swirl-gradient
span (e.g. *"SpendWise — give every dollar / a job."*), a 1–2 line subhead, two CTAs
(`See the product` → `#product`, `Start from the friction` → `#problem`), and a 4-item
meta `<dl>` (Role: Product & systems design / Surface: iOS · Android · Web / Method:
Zero-based budgeting / Stack: React Native · Expo · Node · Postgres · Prisma).
Right column: a **layered preview composition** — a planning-dashboard card (sparkline +
category bars + "Ready to Assign" tile) sitting behind a `SwPhone` showing the
"Give every dollar a job" screen, with a small floating "AI insight" chip card. Subtle
`hero-wash` ambient gradient behind the section.

### 2. `SwProblem.tsx` — "Money is everywhere. Clarity isn't."

`CsSection` with eyebrow "The friction", short intro. Visual-first, minimal copy. A
**pain-map**: 4–5 small `Module` cards arranged around a faint center node, each a tiny
illustrated state, captioned in ≤6 words:
- *Fragmented visibility* — accounts scattered across banks/apps (disconnected card glyphs)
- *Budgeting friction* — spreadsheets that rot (a grid with a crack/strike-through)
- *Disconnected tracking* — transactions that never reach a plan (broken arrow)
- *Overwhelming planning* — too many knobs (a cluttered dial cluster)
- *Poor organization* — uncategorized pile (loose chips, no buckets)
Center node = a small SpendWise mark with "one plan underneath" caption — sets up the product.

### 3. `SwExperience.tsx` — "One operating system for your money."

`CsSection`, eyebrow "The product". A **tabbed surface explorer**: a left rail of 7
labelled items (Onboarding · Add accounts · Budget setup · Transactions · Recurring ·
Insights · Planning dashboard), and a large right-hand `Module` that renders the
corresponding hand-built UI mock. Default active = "Budget setup". Tabs are real buttons
(client component, `useState`); no animation beyond a quick crossfade. Each mock is a
small, believable fintech screen built from the design tokens:
- **Onboarding** — the 3-dot progress flow ("Let's Get Started" card)
- **Add accounts** — account rows (Checking $2,000 / Savings $3,500 / + Add account)
- **Budget setup** — category list with icon, name, $/month, utilization bar (Housing $1,200 · Groceries $300 · Dining Out $100 · Monthly Bills $150 · + Add category)
- **Transactions** — a transaction list with merchant, amount, auto-assigned category chip
- **Recurring** — recurring items with cadence + next-date + a tiny calendar dot strip
- **Insights** — a spend-by-category donut + a "this month vs last" sparkline + one AI callout
- **Planning dashboard** — "Ready to Assign $5,000" hero tile + assignment rows + a runway/age-of-money stat

### 4. `SwWorkflow.tsx` — "From signup to a plan that runs itself."

`CsSection`, eyebrow "The flow". A horizontal **flow rail** with 6 stops connected by an
animated `flow-line` SVG path, each stop a compact node (icon + label + one-line caption):
`Onboard → Connect accounts → Build the budget → Track spending → See insights → Optimize the plan`.
Below the rail, a single `SwPhone` "scrubber": three small thumbnail screens the user can
click to advance the phone through three representative states (budget → transaction →
insight). Calm, seamless feel — short transitions only.

### 5. `SwInsights.tsx` — "See where it goes. Know what's next."

`CsSection`, eyebrow "Insights & planning". A 2-column grid of `Module`s:
- **Spending analytics** — stacked monthly bars + trend line, legend of top categories
- **Category tracking** — 4 utilization rows (spent / budgeted, color = under/at/over)
- **Budget utilization** — a set of small donut dials (e.g. Housing 100%, Groceries 84%, Dining 142% overspent in coral)
- **Operational visibility** — stat tiles: Age of money · Ready to Assign · This month spent · Forecast end-of-month
- One full-width **AI-assist strip**: a chat-style insight card ("You're on pace to overspend Dining Out by ~$60 — move $40 from Groceries?") with Accept / Adjust buttons — grounded, not flashy.

### 6. `SwMobile.tsx` — "Built mobile-first, not mobile-shrunk."

`CsSection`, eyebrow "Mobile experience". A row of 3–4 `SwPhone` frames showing different
screens (home/plan, add transaction sheet, insights, onboarding step) with a few
annotation callouts pointing at interaction patterns (swipe-to-categorize, one-tap assign,
bottom-sheet entry, progress dots). Right side or below: a short list of mobile UX
principles as `Chip`s + one-liners (Thumb-reachable primary actions · Bottom-sheet flows ·
Optimistic updates · Offline-tolerant sync).

### 7. `SwFutureAI.tsx` — "Where the assistant goes next."

`CsSection`, eyebrow "Future · AI opportunities". Grounded, realistic — no AGI imagery.
A grid of 5–6 small `Module` cards, each: icon, title, 1–2 line description, a "Direction"
or "Exploring" `Chip`:
- Intelligent budgeting assistance (suggests category targets from history)
- Predictive spending insights (forecasts month-end by category)
- Financial workflow copilot (natural-language "move $50 from X to Y")
- Anomaly detection (flags duplicate charges / unusual merchants)
- Planning automation (auto-rolls leftover funds, auto-funds true expenses)
- Contextual recommendations (nudges tied to upcoming recurring bills)
Footnote: a one-line note that these are directions, not shipped features.

### 8. `SwClose.tsx`

Mirror `EtClose`: a wrap-up line, the SpendWise mark, two links (`All work` → `/work`,
`Next project` → `/work/apex-protocol` or `/work/equitrackr`), and a contact CTA consistent
with the other case studies' closings.

## Files

**New:**
- `frontend/src/components/casestudy/spendwise/SwMark.tsx`
- `frontend/src/components/casestudy/spendwise/SwPhone.tsx`
- `frontend/src/components/casestudy/spendwise/SwHero.tsx`
- `frontend/src/components/casestudy/spendwise/SwProblem.tsx`
- `frontend/src/components/casestudy/spendwise/SwExperience.tsx` (client component — tabs)
- `frontend/src/components/casestudy/spendwise/SwWorkflow.tsx` (client component — scrubber)
- `frontend/src/components/casestudy/spendwise/SwInsights.tsx`
- `frontend/src/components/casestudy/spendwise/SwMobile.tsx`
- `frontend/src/components/casestudy/spendwise/SwFutureAI.tsx`
- `frontend/src/components/casestudy/spendwise/SwClose.tsx`

**Modified:**
- `frontend/src/app/work/spendwise/page.tsx` — replace placeholder with the composition + `metadata`
- `frontend/src/app/globals.css` — add `--teal`, `--teal-deep`, swirl gradient utility to the `.home2` block
- `frontend/src/components/home/FeaturedWork.tsx` — (optional, low-risk) keep the SpendWise card as-is; no change required. *Out of scope unless trivially worth it.*

## Constraints / non-goals

- No new dependencies. Charts are hand-built SVG/CSS, not Chart.js/Recharts (consistent with the other case studies).
- No raster images, stock photos, crypto/trading aesthetics, dashboard spam, or autoplay motion.
- Keep each component focused and independently readable; if a mock gets large, factor its sub-pieces into local helper components within the same file (as `EtConsolePreview` does).
- Copy stays concise and visual-first; this is a product showcase, not a text case study.
- Static-export safe (no server-only APIs); client components only where interaction requires it.
- Build must pass `npm run lint` and `npm run type-check`.

## Verification

- `npm run lint` and `npm run type-check` clean.
- `npm run dev`, visit `/work/spendwise`: all 8 sections render, nav highlights "Work",
  tabs and the workflow scrubber work, reduced-motion disables animations, layout holds at
  375px / 768px / 1180px+ widths, and `/work` + `/` SpendWise links still resolve.
