# Portfolio Repositioning — Phase 1 Design

**Date:** 2026-05-12
**Owner:** Lloyd Dela Cruz
**Scope:** Strategic repositioning + Phase 1 creative direction (positioning, moodboard, homepage structure, hero). Phase 2 (full project showcase choreography, deep AI-native interactivity strategy, complete content hierarchy across sub-pages) is held for the next brainstorm cycle.

---

## 1. Brand Positioning

### The shift

| | From | To |
|---|---|---|
| Identity | Healthcare data analyst + full-stack developer | Applied AI engineer who builds operational systems |
| Frame | "Person with a portfolio" | "Engineer with a thesis" |
| Healthcare | Category / specialization | Unfair-advantage moat |
| Site genre | Resume website | Operator's product surface |

### Positioning statement

> Applied AI engineer building the workflow infrastructure that makes operational AI actually work in the real world.

### Audience hierarchy

- **Primary — AI-native founder / CTO / engineering leader** at Series A–C AI-native startups. Reads in dark mode. Scans the first viewport in under three seconds. Respects terse-engineering aesthetics. Healthcare is the *moat* that makes Lloyd unusual in this audience, not the category he's pitching.
- **Secondary — Healthcare innovation buyer:** hospital innovation teams, health-tech founders, operational leaders. Recognizes that Lloyd has lived frontline healthcare workflows, logistics, rehab operations, and systems thinking — which most AI engineers do not.

### Ideal reaction (primary audience, first viewport)

> "This person thinks in systems, understands operations, and can actually build AI-native products in real environments."

### Anti-positions (what the site must NOT read as)

- Traditional data analyst / BI analyst portfolio
- Generic frontend developer site
- Healthcare-professional CV
- Personal-brand influencer page
- Generic SaaS marketing template
- Finance-aggressive aesthetic

---

## 2. Voice & Tone

### Lineage

- **Dominant DNA:** Linear / Vercel — confident-quiet, dense, dark, engineer-respectful, motion-rich, terse copy where verbs do the work.
- **Undertone (long-form only):** Anthropic / OpenAI Cookbook — researcher-thoughtful, soft, considered, diagram-oriented. Used in case studies and systems-philosophy writing.

### Register rule

The site has two literal registers — not just two tones, but two visual environments (see §3 Visual Direction).

- **Surface register** — homepage, capability index, project cards, navigation. Linear-dark. Engineer-coded.
- **Depth register** — flagship case study, secondary deep-dive, systems-philosophy essays, long-form writing. Anthropic-paper. Calm, spacious, diagram-led.

### Copy principles

- Verbs over adjectives. "Builds workflow infrastructure" beats "innovative workflow solutions."
- Numbers and proper nouns earn trust. "Live across four hospitals" beats "scalable healthcare deployments."
- Each section title should pass the *founder skim test* — readable in under one second, meaning unambiguous.
- No buzzword stacking. No "leveraging," "synergize," "robust," "cutting-edge."
- Never reference AI generically. Always reference a *system* that uses AI.

---

## 3. Visual Direction — Dual Register

### The brand idea

The surface-vs-depth duality of the positioning ("operator on the outside, systems thinker on the inside") is expressed structurally in the design system as two coexisting registers.

### Surface register (dark)

| Token | Value | Use |
|---|---|---|
| `bg.canvas` | `#0a0a0c` | Page background |
| `bg.surface` | `#11131a` | Cards, tiles, panels |
| `bg.elevated` | `#16181d` | Hovered/active surfaces |
| `fg.primary` | `#e8eaed` | Body text |
| `fg.secondary` | `#aab0bf` | Captions, labels |
| `fg.muted` | `#6a6f7a` | Metadata |
| `border.subtle` | `rgba(255,255,255,0.06)` | Card outlines |
| `accent` | `#c79d6a` (warm gold) | Single brand accent, used sparingly |
| `signal.live` | `#6cd99a` | Live status only |

### Depth register (paper)

| Token | Value | Use |
|---|---|---|
| `bg.paper` | `#f4eee3` | Long-form essay background |
| `fg.ink` | `#2a2520` | Body |
| `fg.ink-soft` | `#4a3f2f` | Captions |
| `border.paper` | `rgba(0,0,0,0.08)` | Quiet rules |
| `accent.paper` | `#7a5a32` (same hue, ink-tuned) | Section markers |

### Register switching

The page enters the depth register inside:
- The flagship case study (`/work/wheelchair-tracking`)
- The secondary deep-dive (`/work/equitrackr`)
- Long-form writing (`/writing/[slug]`)

Everywhere else uses surface register. Transitions between registers should be deliberate — a clear page break, not a section blur — so the shift is felt as intentional.

### Typography

- **Display / UI:** Geist or Inter (sans). Tight tracking (`-0.01em` to `-0.02em` on headlines). Weight 500–600. No display weights above 700 — restraint is the brand.
- **Long-form (depth register):** A readable transitional or humanist serif (e.g., Source Serif, Tiempos Text, or similar). Generous line-height (1.6–1.7), 64–72ch measure.
- **Mono:** Geist Mono or JetBrains Mono. Used for: labels, status, metric units, file paths in case studies, version numbers.

### Motion principles

- Motion is the secondary brand. Never decorative.
- Three approved motion patterns:
  1. **Inference pulse** — subtle, breathing animations on live nodes / live signals. Used in the Systems Map hero and Live Status block.
  2. **Edge traverse** — when a workflow edge "fires," a brief travelling dot moves along it.
  3. **Register handoff** — page transitions into depth register fade through a brief neutral surface, never a hard cut.
- No parallax. No scroll-jacking. No particles. No gradient meshes outside the small accent uses already defined.

### Imagery rules

- No stock photography.
- No portrait headshots in the hero.
- Architecture diagrams > screenshots. Always.
- One real photograph allowed: a single tasteful frontline image somewhere in the flagship case study (a wheelchair in situ, a QR scan in a hospital corridor) — chosen specifically to ground the work in real operations.

---

## 4. Homepage Structure — Operator's Surface

Reads like a Linear product surface, not a Vercel marketing scroll. The capability index in the first viewport answers the founder/CTO's first question — *"what does this person actually build?"* — instantly. The cinematic flagship is the emotional anchor in the *middle*, not the opener.

### Section order

1. **Nav** — `lloyd.dev` · systems · writing · contact. Mono. Fixed, translucent on scroll.
2. **Hero — Systems Map** *(see §5)*
3. **Capability index — system map** — 4 capability tiles in a tight grid:
   - 01 · Healthcare Workflow Systems *(2 systems)*
   - 02 · AI-Native Product Systems *(1 system)*
   - 03 · Financial & Planning Systems *(1 system)*
   - 04 · AI-Assisted Digital Experiences *(1 system)*

   Each tile is a thesis-coded heading and clicks through to a capability destination (sub-page vs. scroll-anchor resolved in Phase 2 — see §9 Q2).

4. **Live Operational Status trust block** — a "Currently running" panel showing the wheelchair system live across VGH · UBC · Lions Gate · Richmond. Acts as the credibility bridge into the flagship.
5. **Flagship cinematic feature tile** — `Wheelchair Tracking System` — large, dual-register-foreshadowing tile that opens the cathedral case study.
6. **Selected systems** — Linear-row entries:
   - 02 · EquiTrackr (secondary deep-dive)
   - 03 · Apex Protocol
   - 04 · SpendWise
   - 05 · Website Gemms
7. **Register-shift essay strip** — compressed paper-register block. 3 paragraphs of systems philosophy. Acts as tonal bridge.
8. **Now / contact** — single mono line. No form. Just an email and three external links (GitHub, LinkedIn, X).

### Skim test

A reader who lands and scrolls in 5 seconds must walk away knowing: (a) it's an applied AI engineer site, (b) there's a healthcare flagship, (c) there's a thesis about operational systems. The first three sections must each pass independently.

---

## 5. Hero Direction — Systems Map + Live Status pairing

### Default hero — Systems Map

A subtle animated systems-diagram sits behind the headline as the hero background. A central `workflow_core` node connects via dashed edges to four peripheral hospital nodes (`vgh`, `ubc`, `lions_gate`, `richmond`) and two secondary system nodes.

**What it communicates in the first second:** "this person thinks in systems" — before a single word is read.

**Ambient AI-native moment:** the central node has a slow inference-pulse breathing animation. Approximately every 6–10 seconds, an edge "fires" — a small dot traverses one edge as if a workflow event has been received. Tasteful, not noisy.

**Foreground content (over the map):**
- Translucent backdrop-blurred nav strip.
- Headline: *Systems for `operational` intelligence.* (`operational` in accent gold.)
- Subline: *Applied AI workflow infrastructure — live across four hospitals.*
- Three credibility pills: `10y healthcare` · `MSc Analytics` · `AWS AI`.

**Constraints / guardrails:**
- The diagram is monochrome with accent only on the flagship edges/node — never a rainbow particle field.
- Stops animating when the user scrolls past it (no off-screen CPU burn).
- Respects `prefers-reduced-motion`.

### Companion — Live Operational Status (further down)

A separate "Currently running" trust panel sits between the capability index and the flagship feature tile. Same visual language; different role.

**Contents:**
- Live dot + `System status · v3.x`
- Primary metric: total tracked equipment count
- Per-site row: VGH · UBC · Lions Gate · Richmond, each with a live indicator
- 30-day uptime number

**Honesty rule:** the numbers must be either (a) wired to real telemetry from the wheelchair system, or (b) clearly labelled as an illustrative status panel. No fake real-time without a label. Founders see through unlabelled fake metrics instantly and the trust loss is irrecoverable.

---

## 6. Showcase Architecture (locked thesis, full detail in Phase 2)

Capability-led hybrid: thesis-first index on the homepage, cinematic cathedral on the flagship, secondary depth on EquiTrackr, premium-but-shorter peers.

### Project tiers

| Tier | Project | Treatment |
|---|---|---|
| Flagship | Wheelchair Tracking System | Multi-scroll cinematic case study in depth register |
| Secondary depth | EquiTrackr | Shorter case study in depth register; reinforces the operational systems pattern |
| Premium peers | Apex Protocol, SpendWise, Website Gemms | Single-page "system briefs" in surface register |

The reader should never get the feeling of "these are unrelated apps." Every project page must open with a *capability heading* before the project name, framing the work as an instance of a pattern.

**Held for Phase 2:** the exact section choreography of the flagship cathedral (intro → context → constraints → architecture → workflow walkthrough → operational impact → reflections → next), the interactive moment inside the flagship, the secondary deep-dive shape, and the peer "system brief" template.

---

## 7. AI-Native Posture

The site looks AI-native and is *literately* AI-native in a small number of intentional places — never as gimmick.

### Surface-level (ambient)

- **Hero inference-pulse** on the Systems Map central node. *(See §5.)*
- **Edge-fire traverse** every 6–10s. *(See §5.)*
- *(Allowed, optional)* the headline streams in once on first load with an inference-style cursor, then is static on subsequent navigation. No persistent typing animations.

### Depth-level (the one real interactive)

Inside the flagship case study, one playable interactive — to be designed in Phase 2 — demonstrates that Lloyd builds live systems. Candidates:
- A simulated QR scan → state transition mini-demo
- A draggable workflow node graph that re-routes equipment between sites
- A toggle-able systems diagram showing the pre/post operational state

### Hard no's

- No chatbot in the corner.
- No "ask the portfolio" agent surface.
- No full chat-first navigation. (Increasingly meme-coded; founder audiences are saturated.)
- No "AI summarize this case study" buttons.

---

## 8. Out of scope for Phase 1 (handed to Phase 2)

These were deliberately deferred so this spec stays focused and implementable:

- Full flagship case study choreography (section-by-section)
- Secondary deep-dive (EquiTrackr) shape
- Peer project "system brief" template
- The specific interactive built into the flagship
- Writing / essays section structure and template
- Capability sub-page templates (when a tile is clicked)
- Resume / CV download strategy
- Contact-page treatment
- Open Graph / metadata system
- Performance & accessibility budget
- Analytics, telemetry to Live Status

---

## 9. Open questions for Phase 2 kickoff

1. Is the Live Status panel wired to real wheelchair-system telemetry, or labeled illustrative? (Answer drives infrastructure scope.)
2. Should each capability tile click through to a real capability sub-page, or scroll-anchor to a section on the homepage? (Drives routing.)
3. Which interactive lives inside the flagship case study? (Drives the flagship build effort.)
4. Light-register toggle for accessibility — supported, or dark-only? (Drives token system complexity.)

---

## 10. Decisions log

- **Audience:** primary = AI-native founder/CTO; secondary = healthcare innovation buyer. Healthcare = moat.
- **Voice lineage:** Linear/Vercel dominant + Anthropic undertone for long-form.
- **Showcase architecture:** capability-led thesis index (hybrid C + B from brainstorm).
- **AI-native posture:** ambient light surfaces (B) + one real interactive in flagship (C).
- **Moodboard:** Direction C — Dual Register (Linear-dark surface + Anthropic-paper depth).
- **Homepage:** Operator's Surface (Option B).
- **Hero:** Systems Map (Hero 1) + Live Status trust block (Hero 3) used lower on the page.
