# About Page Rewrite — Authentic, Grounded, High-Trust

**Date:** 2026-05-13
**Scope:** Copy rewrite across all five About page sections. No structural / component / styling changes.
**Files touched:**

- `frontend/src/app/about/page.tsx` — `metadata.description`
- `frontend/src/components/home/AboutHero.tsx`
- `frontend/src/components/home/AboutJourney.tsx`
- `frontend/src/components/home/AboutValues.tsx`
- `frontend/src/components/home/AboutSkills.tsx`

`AboutCerts.tsx` is unchanged — its content is factually accurate cert/tool chips.

---

## Goal & narrative

Reposition the About page so it reads as a **systems / product engineer with unusual operational depth**, not a healthcare worker forcing an AI identity. The narrative arc:

> Industrial Engineering grounding → years inside high-acuity hospital operations → frontline-driven pivot into analytics, engineering, and applied AI → shipped multi-site healthcare software → open to product engineering / applied AI work.

### Voice principles
- **Concrete over abstract.** Name what was built, not what was experienced.
- **Earned over claimed.** Lead with the work; let titles describe themselves.
- **Restraint with the AI stack.** Specific models / frameworks live in *Skills*, not in the bio.
- **First-person, plain register.** "I build…" beats "AI-native systems builder…"
- **Factually consistent.** No "20+ years" framing. The truthful numbers are: 9+ years at VCH, MSc completed (Eastern University), wheelchair-logistics platform shipped across 3 VCH sites, still employed at VCH.

### Ground truth (confirmed by user, 2026-05-13)
- MSc in Data Analytics — **completed**
- Currently employed at VCH as Rehabilitation Assistant — **yes**
- Wheelchair-logistics platform across 3 VCH sites — **shipped, in real operational use**

---

## Section 1 — Hero (`AboutHero.tsx`)

### Eyebrow
*Unchanged:* `About Lloyd Dela Cruz`

### H1
**`Healthcare operations, engineered from the inside.`**
Gradient accent (`grad-plum-text`) wraps **`from the inside.`** (replaces current accent on "real-world operations.").

### Location line
**`Vancouver, BC · Healthcare workflow engineering · Analytics · Applied AI`**
(replaces "Vancouver, BC · AI Systems · Product Engineering · Operational Intelligence")

### Bio paragraph 1
> I build operational software for healthcare — workflow systems, analytics tools, and AI-assisted features designed to hold up in real clinical use. My background is Industrial Engineering, shaped by years working inside high-acuity hospital environments.

### Bio paragraph 2
> Over the last several years I've moved from frontline care into the systems side of healthcare — an MSc in Data Analytics, certifications in analytics, cloud, and applied AI, and a wheelchair-logistics platform now running across three Vancouver Coastal Health sites. I'm still a Rehabilitation Assistant at VCH; the engineering work grew out of problems I kept watching happen on shift.

**Note:** "certifications in analytics, cloud, and applied AI" — wording mirrored from the Journey Phase 4 fix for consistency between sections (the current Hero says "data and AI stack").

### Bio paragraph 3
**Removed.** Current paragraph 3 ("Built real-world operational systems…") is redundant once paragraph 2 names the wheelchair platform directly, and its tool list belongs in Skills.

### Stats (3 columns)

| Position | New value | New label |
|---|---|---|
| 1 | `9+` | `Years at VCH` |
| 2 | `200+` | `Patient plans / yr` |
| 3 | `3` | `Multi-site VCH` |

**Note on stat 3:** the user's locked phrasing was *"Multi-site deployment across 3 hospitals."* The component renders `value` in extrabold display type (sized for short numerals like `20+` / `200+`) and `label` in small uppercase tracked type. The longer phrasing "Multi-site VCH deployment" (25 chars) overflowed the ~133px column on desktop and wrapped to 2–3 lines on mobile, breaking baseline alignment with the adjacent 1-line labels. Trimmed to **`Multi-site VCH`** (14 chars) to fit cleanly on one line at every viewport while retaining the multi-site framing; "deployment" is implicit between the value (`3`) and the label. Final rendered stat: **3 · MULTI-SITE VCH**.

### Available pill
**`Open to product engineering & applied AI work`**
(replaces "Open to AI-native product work")

---

## Section 2 — Certifications (`AboutCerts.tsx`)

**No changes.** Cert list and core stack chips are accurate.

---

## Section 3 — Journey (`AboutJourney.tsx`)

Four phases with **non-overlapping date ranges** (current phases 3 & 4 overlap on 2022–2025). The era marker is the *focus* of that period, not the end of any job — Phase 4 explicitly states "still at VCH."

### Phase 1 · 2007 — 2012
**Title:** `Industrial Engineering & early career`
**Body:**
> Earned a BSc in Industrial Engineering in 2007. Spent the first few years in sales, then relocated to Singapore for engineering work on sustainable-energy projects. Applied Lean Six Sigma to cut project timelines by ~15% and costs by ~20% — the foundation for how I still approach systems and operations today.

**Skills:** `Project Management` · `Lean Six Sigma` · `Process Optimization` · `Contract Management`
*(Icon / tint / soft / current: unchanged — Briefcase, plum, plum-soft, false)*

### Phase 2 · 2012 — 2016
**Title:** `Starting over in Canada` *(was "Canadian Transition & Education")*
**Body:**
> Moved to Canada in 2012 and rebuilt from the ground up. Worked service, security, and cleaning jobs to fund full-time study — Rehabilitation Assistant Diploma at Vancouver Community College, then Sustainability Management at UBC. The grind itself was the curriculum: every job taught me something about how people actually use systems.

**Skills:** `Adaptability` · `Resilience` · `Time Management` · `Customer Service`
*(removed "Work Ethic" — implicit; kept count tight)*
*(Icon / tint / soft / current: unchanged — GraduationCap, amber, #fef3c7, false)*

### Phase 3 · 2016 — 2022
**Title:** `Healthcare practice at VCH` *(was "Healthcare Practice & Data Evolution")*
**Period range moved:** 2025 → 2022. The era *defined by* clinical practice ends when the engineering pivot becomes the second track.
**Body:**
> Joined Vancouver Coastal Health as a Rehabilitation Assistant in 2016. Supported 200+ patient care plans per year across three hospital sites — outpatient and acute. Six years close to the operational gaps that don't show up in reports: scheduling friction, equipment misplacement, handoffs that fall through. That's where the engineering work started.

**Skills:** `Patient care` · `Clinical workflows` · `Equipment logistics` · `Cross-team coordination` · `Cerner`
*(Icon / tint / soft / current: unchanged — HeartPulse, green, #d1fae5, false)*

### Phase 4 · 2022 — Present  *(current)*
**Title:** `Engineering, analytics & applied AI` *(was "Data Analytics & AI Transformation")*
**Body:**
> Began layering engineering and analytics work on top of clinical practice. Completed an MSc in Data Analytics at Eastern University; earned certifications across analytics, cloud, and applied AI (BrainStation, Google, DeepLearning.AI, AWS AI Practitioner); shipped the first version of a wheelchair-logistics platform now used across three VCH hospital sites. Still at VCH — open to product engineering, applied AI, and operational software work where healthcare context becomes an operational advantage.

**Skills:** `Python` · `SQL` · `Tableau` · `AWS` · `Next.js` · `TypeScript` · `Applied AI` · `RAG`
*(Icon / tint / soft / current: unchanged — Sparkles, coral, #ffe4e0, true)*

### Section intro copy
**H2:** unchanged — `My professional journey.` (accent kept on "journey.")
**Subhead:** unchanged — `From Industrial Engineering to AI-native systems — a 20+ year evolution across continents, disciplines, and industries.` → **replace with:**
> `From Industrial Engineering to applied AI — a multi-decade arc across continents, disciplines, and the systems behind healthcare.`

Two reasons: drop "AI-native systems" (consistent with rest of page), and avoid stacking "20+ year" alongside the new Hero stat that scopes years differently.

---

## Section 4 — Values (`AboutValues.tsx`)

**Cards 1 & 2 (`Systems thinking`, `AI as a building block`): no changes.** Summaries, detail bodies, and proof points are already concrete and on-tone.

### Card 3 · Operational pragmatism — detail body only
**Replace:**
> ~~20 years on hospital floors shape how I build. Reliability, sensible fallbacks, clear ownership, and humane interfaces are non-negotiable. I optimise for the operator's worst day, not the demo.~~

**With:**
> Nine years on hospital floors shape how I build. Reliability, sensible fallbacks, clear ownership, and humane interfaces are non-negotiable. I optimise for the operator's worst day, not the demo.

*(Single-word fix: "20 years" → "Nine years" for factual consistency with the rest of the page. Last sentence — the load-bearing one — is preserved exactly.)*

Summary, proof points, icon, tint: unchanged.

---

## Section 5 — Skills (`AboutSkills.tsx`)

### Section intro copy
**H2:** unchanged — `Technical expertise.`
**Subhead:** **replace:**
> ~~Three overlapping bodies of work: AI-native engineering, full-stack product development, and 20+ years of healthcare operations. Tap a card for context.~~

**With:**
> Three overlapping bodies of work: applied AI engineering, full-stack product development, and nearly a decade inside healthcare operations. Each area reflects a different layer of the systems work.

### Card 1 · Applied AI & product engineering
**Title:** `Applied AI & product engineering` *(was "AI & product engineering")*

**Summary:** **replace:**
> ~~Building AI-native product experiences with LLMs as first-class components — orchestration, retrieval, tool use, and structured output.~~

**With:**
> I build LLM-powered features the way I build any other engineering — scoped, tested, and observable. Retrieval, tool use, structured generation, and human checkpoints, used where they earn their place.

**Tools (unchanged):** Claude · OpenAI · LangChain · RAG · Vector DBs · Cursor
**Detail body & highlights:** unchanged.

### Card 2 · Full-stack development
**No changes.**

### Card 3 · Healthcare operations
**Summary:** **replace:**
> ~~20+ years across hospital operations and frontline care — domain context that informs how I scope and build healthcare products.~~

**With:**
> Nine years inside Vancouver Coastal Health — frontline care, equipment logistics, and the operational gaps that don't show up in reports. The domain context that informs how I scope and build healthcare products.

**Tools:** **replace:**
> ~~`VCH operations` · `Lean Six Sigma` · `Workflow design` · `Stakeholder comms` · `Cerner`~~

**With:**
> `VCH operations` · `Clinical workflows` · `Equipment logistics` · `Lean Six Sigma` · `Cerner` · `Stakeholder comms`

**Detail body & highlights:** unchanged.

---

## Section 6 — Page metadata (`app/about/page.tsx`)

**Replace `metadata.description`:**
> ~~"From Industrial Engineering to healthcare innovation — 20+ years of cross-functional experience across healthcare operations, project management, and data analytics."~~

**With:**
> "Healthcare operations engineer with nine years inside Vancouver Coastal Health — building workflow systems, analytics tools, and applied AI for clinical use."

Page `title` unchanged: `About — Lloyd Dela Cruz`

---

## Out of scope

- No component / styling / animation changes.
- No icon / tint / colour changes anywhere.
- No structural reordering of sections.
- `AboutCerts.tsx` is not modified.
- `AboutSection.tsx`, `AboutPreview.tsx`, `AboutCTA.tsx`, `AboutMeHeroFixed.tsx` are legacy / preview components not used in the `/about` route — out of scope.

## Verification plan

After implementation:
1. `npm run type-check` from repo root — must pass.
2. `npm run lint` from repo root — must pass.
3. Visual check: run `npm run dev` and load `/about` in browser. Verify:
   - Hero H1 renders with gradient on "from the inside."
   - Stat 3 reads "Multi-site" with "deployment across 3 hospitals" label.
   - All four Journey phases render with correct dates / titles / bodies.
   - Phase 4 is the only one with the "now" indicator.
   - No regressions on Certs / Values cards 1-2 / Skills card 2.
