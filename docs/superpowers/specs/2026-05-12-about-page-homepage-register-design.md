# About page — homepage register port

**Date:** 2026-05-12
**Status:** Approved

## Goal

Recreate `/about` so it shares the homepage's "Slack-style AI-native" visual register
(warm cream background, plum accent, Plus Jakarta display font, white rounded cards with
hairline borders + soft shadows, washed hero) instead of the current dark blue→purple
gradient register. All existing content (bio copy, stats, journey timeline, core values,
skills) is preserved verbatim — only the presentation changes. The photo (`/images/my_photo.jpeg`)
is kept.

## Constraints / non-goals

- No changes to any other page.
- No changes to `frontend/out/` build artifacts (regenerated on build).
- No edits to the existing `frontend/src/components/sections/*` components — leave them in place.
- No new global CSS — everything uses the existing `.home2` utilities (`hero-wash`, `lift`,
  `ghair`, `soft-shadow*`, `grad-plum-text`, `font-display`, `text-ink*`, `text-plum`) plus
  inline `style={{...}}` for accent colors, exactly like the homepage components do.
- New components live under `frontend/src/components/home/`.

## Page shell — `frontend/src/app/about/page.tsx` (rewritten)

```
<div className="home2 min-h-screen">
  <HomeNav active="About" />
  <main>
    <AboutHero />
    <Reveal><AboutJourney /></Reveal>
    <Reveal><AboutValues /></Reveal>
    <Reveal><AboutSkills /></Reveal>
    <FooterCTA />
  </main>
  <SiteFooter />
</div>
```

- Reuses existing `HomeNav`, `Reveal`, `FooterCTA`, `SiteFooter` from `components/home/`.
- Removes the old floating "Back to Home" button (nav covers it).
- Replaces the old `AboutCTA` with the homepage `FooterCTA`.

## New components

### 1. `components/home/AboutHero.tsx`

- Section with `hero-wash` decorative background layer (same idiom as `HomeHero`).
- `max-w-[1180px]` container, `grid` 1 col → `lg:grid-cols-[1.05fr_1fr]`.
- **Left column:**
  - Eyebrow chip: small rounded-full white pill, uppercase tracked text "About" with a tiny
    green dot (same as `HomeHero`'s "Systems Engineer" chip).
  - `font-display` headline: `From Industrial Engineering to ` + `<span className="grad-plum-text">Healthcare Innovation</span>`.
  - Location line: `MapPin` icon (plum) + "Vancouver, BC · Healthcare Technology".
  - Two bio paragraphs, verbatim from `AboutMeHeroFixed`:
    1. "Results-driven data analytics professional with 20+ years of cross-functional
       experience—8 of which are in healthcare operations, project management, and clinical
       optimization. Currently completing an MSc in Data Analytics at Eastern University
       (expected Dec 2025), while contributing to patient care and interdisciplinary
       collaboration as a Rehabilitation Assistant at Vancouver Coastal Health, supporting
       Neurology, General Surgery, Orthopedics/Trauma, ICU, and Rehab units."
    2. "Certified in BrainStation Data Analytics, Google Data Analytics, DeepLearning.AI Data
       Engineering, and AWS AI Practitioner. Proficient in SQL, Python, R, and Tableau, with a
       strong focus on data-driven decision-making, workflow optimization, and visual
       storytelling. Adept at designing performance measurement frameworks and building
       insightful dashboards that enhance clinical and operational efficiency. Successfully
       led large-scale initiatives at IEQ Global Singapore, applying Lean Six Sigma
       methodologies to reduce project timelines by 15% and cut operational costs by 20%,
       demonstrating the power of analytics in real-world impact."
  - 3-stat row (each: big `font-display` plum number + small `text-ink-muted` uppercase label):
    - **20+** — Years Experience
    - **200+** — Patient Plans Annually
    - **3** — VCH Hospital Sites
- **Right column:** photo `/images/my_photo.jpeg` via `next/image` (`fill`, `object-cover object-top`)
  in a `rounded-2xl` white card with `ghair` border + `soft-shadow-lg`, fixed aspect (~`w-80 h-96`
  centered, responsive). Behind it: 1–2 soft plum/pink blurred blobs (`blur-2xl`, low opacity),
  toned down from the old version.

### 2. `components/home/AboutJourney.tsx`

- Eyebrow: uppercase tracked "Career Evolution" in `text-plum`.
- `font-display` heading "My Professional Journey" + subhead
  "From Industrial Engineering to Healthcare Analytics — a 20+ year evolution."
- **Left-rail vertical timeline:** a thin vertical line (`var(--line)`, ~2px) running down the
  left; each entry is a row: colored dot node on the line + a white `rounded-2xl` `lift` card
  (same card treatment as `Capabilities`). Card contains:
  - period as a small tinted pill (tint = entry accent),
  - `font-display` title,
  - description paragraph,
  - skill tags as light chips (subtle tinted background).
- Accent tint per entry, cycling homepage accents: plum / amber / green / coral.
- Data verbatim from `JourneyTimeline.tsx` `timelineData` (4 entries):
  1. **2007–2012 — Industrial Engineering & Early Career.** "Graduated BSc Industrial
     Engineering in 2007. Started in sales (2007-2010), then transitioned to engineering roles
     in Singapore (2010-2012). Led sustainable energy projects, implemented Lean Six Sigma
     methodologies, reducing timelines by 15% and costs by 20%." — tags: Project Management,
     Lean Six Sigma, Process Optimization, Contract Management.
  2. **2012–2016 — Canadian Transition & Education.** "Moved to Canada and worked multiple jobs
     (service, security, cleaning) to support myself while pursuing full-time studies. Completed
     Rehabilitation Assistant Diploma at Vancouver Community College and Sustainability
     Management program at University of British Columbia." — tags: Adaptability, Work Ethic,
     Time Management, Resilience, Customer Service.
  3. **2016–2025 — Healthcare Practice & Data Evolution.** "9+ years at Vancouver Coastal Health
     as Rehabilitation Assistant, supporting 200+ patient plans annually. Transitioned to data
     analytics through multiple certifications, AWS AI credentials, and Master's in Data
     Analytics while building healthcare solutions." — tags: Patient Care, Healthcare Systems,
     Data Analytics, Python, SQL, AWS AI.
  4. **2022–Present — Data Analytics & AI Transformation.** "Mastering data analytics through
     multiple certifications and AWS AI Practitioner credential. Currently pursuing Master's in
     Data Analytics while building full-stack healthcare solutions." — tags: Python, SQL,
     Tableau, AWS AI, Data Engineering, Prompt Engineering. (This one may carry a subtle
     "current" marker — e.g. a small pulsing green dot — but no heavy gradient/shine effects.)

### 3. `components/home/AboutValues.tsx`

- Eyebrow "What drives me" + `font-display` heading "What Drives Me" + subhead
  "The principles that guide my approach to healthcare technology."
- 3 white `lift` cards (same pattern as `Capabilities`): rounded-xl tinted icon tile (`lucide`
  icon) + `font-display` title + body. Verbatim:
  - **Innovation First** (plum, `Zap`): "Every healthcare challenge is an opportunity to
    innovate. I believe in pushing boundaries to create solutions that truly make a difference
    in patient care."
  - **Human-Centered** (pink, `Heart`): "Technology should serve humanity, not the other way
    around. Every line of code I write is focused on improving the human experience in
    healthcare."
  - **Quality Driven** (green, `ShieldCheck`): "In healthcare, there's no room for 'good
    enough.' I'm committed to delivering robust, reliable, and scalable solutions that
    healthcare professionals can trust."

### 4. `components/home/AboutSkills.tsx`

- Eyebrow "Technical expertise" + `font-display` heading "Technical Expertise" + intro
  "A comprehensive skill set spanning data analytics, healthcare, project management, and
  operational optimization."
- 3 white `ghair`/`soft-shadow` cards, each `font-display` titled with an accent color, each
  containing skill rows: label (`text-ink`) + percentage (`text-ink-muted`) + a slim progress
  bar — track `var(--line)`, fill in the card's accent tint, animated width on view (reuse the
  `framer-motion` `whileInView` width pattern). Verbatim:
  - **Data Analytics** (plum): SQL, Python & R — 90%; Tableau & Excel — 85%; AI & Prompt
    Engineering — 80%.
  - **Project Management** (amber): Lean Six Sigma — 95%; Process Optimization — 90%;
    Stakeholder Engagement — 85%.
  - **Healthcare & Communication** (green): Patient Care — 95%; Multidisciplinary Teams — 90%;
    Cerner Systems — 75%.

## Verification

- `npm run lint` and `npm run type-check` pass.
- `npm run build` succeeds.
- Manual: `/about` renders with cream background, plum accents, Jakarta headings, photo visible
  in a white card, all four sections present, nav/footer match the homepage, no console errors,
  reduced-motion respected (via `Reveal` / existing `.home2` media query).
