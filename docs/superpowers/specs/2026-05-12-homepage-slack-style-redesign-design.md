# Homepage — Slack-style AI-native redesign

**Date:** 2026-05-12
**Status:** Approved, implementing
**Supersedes (visual register):** `2026-05-12-homepage-warm-light-redesign-design.md` for the homepage only.

## Goal

Recreate the homepage in a clean, spacious, product-grade "Slack / Linear / Stripe" register: warm cream background, plum/purple primary accent, restrained coral/pink/green/blue highlights, soft shadows, rounded cards, thin borders, generous whitespace. AI-native + systems-oriented tone. Light theme only.

## Scope decision

- Replace `frontend/src/components/home/*` with the new sections; rewire `frontend/src/app/page.tsx`.
- Nav theme dot is decorative (no functional dark mode).
- Other routes (`/about`, `/work`, etc.) untouched in this pass.
- No new dependencies (Framer Motion already present). Add `Plus Jakarta Sans` via `next/font/google` for display headings; body stays on Geist Sans.

## Design language

- Background: warm cream (~`#FBFAF8` / `hsl(40 33% 98%)`), with faint pastel radial wash behind the hero.
- Primary: plum `#5B21B6`–`#7C3AED` range; gradient text on key headline words.
- Accents (tiny doses only — icons, connector lines, card arrows): coral `#F97362`, pink `#EC4899`, green `#10B981`, blue `#3B82F6`, amber `#F59E0B`.
- Surfaces: white cards on cream, 1px hairline borders (`rgba(20,16,30,0.08)`), soft diffuse shadows, radii 14–24px.
- Motion: one staggered load-in on hero; gentle float on diagram nodes; subtle hover lift on cards. No glow, no noise.

## Section structure

1. **NavBar** — `LD` wordmark (plum) left · centered links Home·Work·Systems·About·Thoughts·Resume (active = plum + dot) · sun dot · plum pill "Let's connect →".
2. **Hero** — two-column. Left: `● SYSTEMS ENGINEER` pill chip; H1 "I build intelligent systems that **drive impact.**" (last line plum→pink gradient); paragraph; "Explore my work →" (filled plum) + "View case studies" (outline). Right: `DiagramScene` — center white card "AI / Orchestration Engine", 6 capability icon tiles (database, people, code, branch/flow, chart, shield), thin dotted multi-color connectors, gentle drift.
3. **TrustedRow** — "TRUSTED TO BUILD WITH" + muted monochrome wordmarks: Python, TypeScript, AWS, Docker, PostgreSQL, LangChain.
4. **MetricsStrip** — single rounded white card: 98.7% System Uptime · 2.3M+ Events Processed · 842ms Avg. Response · 24/7 Monitoring · right block "● All systems operational / Last updated 2 min ago / View live status →".
5. **Capabilities** — eyebrow "WHAT I DO"; H2 "Systems that **scale.** Solutions that **last.**" (scale=plum, last=coral); intro line; "View all capabilities →". 5 cards: AI-Native Engineering, Systems Architecture, Product Engineering, Data & Integration, Operational Intelligence — each soft-gradient icon, blurb, colored arrow.
6. **FeaturedWork** — eyebrow "FEATURED WORK" + "View all projects →". 4 cards: Intelligent Document Router, Real-time Analytics Platform, Workflow Automation Hub, RAG Assistant Platform. Each: pastel CSS-drawn faux-UI preview (no images), tag label, title, blurb, tech-stack footer + arrow.
7. **CredibilityStrip** — 10+ Years in Tech · 50+ Projects Shipped · 8+ Industries Served + pull-quote "I thrive at the intersection of AI, systems, and product — building solutions that make a measurable difference."
8. **FooterCTA** — soft purple gradient banner: chat icon, "Let's build something **extraordinary together.**", sub-copy + "Start a conversation →", social icons (GitHub, LinkedIn, Twitter, email).
9. **SiteFooter** — "© 2024 LD. All rights reserved." + repeat nav links.

## Files

- `frontend/src/components/home/NavBar.tsx`, `HomeHero.tsx`, `DiagramScene.tsx`, `TrustedRow.tsx`, `MetricsStrip.tsx`, `Capabilities.tsx`, `FeaturedWork.tsx`, `CredibilityStrip.tsx`, `FooterCTA.tsx`, `SiteFooter.tsx`, plus small `icons.tsx` for inline SVGs and `Reveal.tsx` (reuse existing if present).
- `frontend/src/app/page.tsx` — compose the above.
- `frontend/src/app/globals.css` — add `--plum`, accent vars, cream bg vars under a homepage scope class.
- `frontend/src/app/layout.tsx` — load Plus Jakarta Sans.
- Old `home/*` components not referenced elsewhere get removed.

## Out of scope

Functional dark mode; restyling other routes; contact form wiring.
