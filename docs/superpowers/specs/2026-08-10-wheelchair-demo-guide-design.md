# Wheelchair Tracking — Live Demo CTA + Demo Guide

Date: 2026-08-10
Status: Approved, moving to implementation

## Problem

The `/work/wheelchair-tracking` case study describes a live, production-grade
system but gives visitors no way to actually touch it. There's a real public
build at `wheelchair-tracking.vercel.app` seeded with synthetic data, but the
page doesn't link to it, and nobody reviewing the portfolio has a way to know
what roles exist, what to click, or how to log in.

## Source of truth

Repo: `github.com/lloyd-delacruz/wheelchair-inventory` (private). Docs pulled
directly from the repo, not invented:

- `claude.md` (repo root) — **authoritative**, actively maintained. Has the
  current seeded-user table (passwords rotated 2026-07-10; the top-level
  `README.md`'s credential table is stale and must not be used).
- `docs/guides/{admin,therapist,rehab-assistant,technician,super-admin}-guide.md`
  — per-role instructions, written for end users.
- `docs/guides/README.md` — the ticket lifecycle diagram and role summary.

All 5 credentials were live-tested (sign in, screenshot the landing dashboard,
sign out) against `wheelchair-tracking.vercel.app` on 2026-08-10 and confirmed
working:

| Role | Email | Password |
|---|---|---|
| Super-Admin | `admin@wheelchairtrack.ca` | `Platform123!` |
| Admin | `admin@vgh.ca` | `Admin123!` |
| Therapist | `therapist1@vgh.ca` | `Therapist123!` |
| Rehab Assistant | `rehab1@vgh.ca` | `Rehab123!` |
| Wheelchair Technician | `tech1@vgh.ca` | `Tech123!` |

The `cleaner` role is intentionally excluded — the repo's own docs mark it
deprecated (folded into Rehab Assistant; no cleaner-only UI remains).

**Data safety:** confirmed directly with the site owner that this deployment
runs on synthetic/seeded data, fully isolated from any real health-authority
system or patient data — safe to publicize the URL and these credentials.

## Design

### 1. Hero CTA (`WcHero.tsx`)

Replace the two current buttons ("See the workflow" / "Start from the
problem") with:
- **Primary:** "View Live Demo" — `target="_blank" rel="noopener noreferrer"`
  to `https://wheelchair-tracking.vercel.app/`, `Accessibility` icon from
  `lucide-react` (matches the live app's own logo mark, not a generic icon).
- **Secondary:** "Demo Instructions" — anchor link (`#demo-guide`) to the new
  section.

### 2. New section: `WcDemoGuide.tsx`

Placed after `WcWorkflowDemo` (the illustrative animated walkthrough) and
before `WcDashboards`, `id="demo-guide"`. Client component (needs copy-to-
clipboard state).

Content, in order:
1. Intro line + a shared-sandbox callout: this is public, seeded data —
   other visitors' test tickets may be visible; that's expected, not broken.
2. **Suggested path** module: one ticket's life across roles — Therapist
   submits a request → Rehab Assistant acknowledges, finds a chair, checks
   out, discharges, cleans, returns it → Technician flags/repairs a chair →
   Admin reviews Reports/Analytics → (optional) Super-Admin tenant view.
   This is the throughline a recruiter can actually follow end to end.
3. Five role cards (Admin, Therapist, Rehab Assistant, Technician,
   Super-Admin), each stating: responsibility, where to start, the workflow
   to test, key actions to press, expected result — sourced from the real
   per-role guides. Each card includes its credentials with a copy button.

`WcRoles.tsx` (the existing "Six roles" narrative — Transport Aide, Ward
Nurse, etc.) is left untouched; it's a deliberate generalized framing, not
the literal app roles, and is out of scope here.

### 3. `projects.ts`

Add a `live` field to the `wheelchair-tracking` record so the existing
`ProjectMeta` aside also surfaces it. Wording distinguishes "production runs
hospital-internal" (existing `deployment` field, unchanged) from "this public
build is a seeded demo" — nothing should imply real hospital data is publicly
reachable.

## Verification plan

- Live-demo link opens correctly, new tab, from both hero CTAs.
- Each of the 5 credentials re-tested after the guide copy is written, to
  confirm the guide's claims (start page, buttons, expected outcome) match
  the actual running app, not just the docs.
- Desktop + mobile layout check on the new section and hero CTA row.
- Keyboard navigation + focus states on the role cards and copy buttons.
- No secrets beyond the intentionally-public demo credentials appear
  anywhere in the diff.
