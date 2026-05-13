---
title: "Calmer Interfaces: Designing EHRs for Fewer Clicks, More Care"
excerpt: "Five small redesigns that took a clinician's most common task from sixteen clicks to four — and the design principle underneath them that almost nobody articulates."
date: "2026-04-17"
author: "Lloyd Dela Cruz"
category: "healthcare"
tags: ["Healthcare", "Design", "EHR", "UX", "Clinical Workflow"]
readTime: "9 min read"
featured: false
image: "/images/blog/calm-interfaces.jpg"
video: false
interactive: false
gradient: "from-cyan-600 via-blue-600 to-indigo-800"
published: true
---

# Calmer Interfaces: Designing EHRs for Fewer Clicks, More Care

If you've spent any time watching a nurse triage a patient or a physician sign off on a discharge, you've watched a UI fight a human. Sixteen clicks to release a tray. Eleven to acknowledge an alert. The interface is not malicious. It is overgrown. Every click was added by a reasonable person solving a reasonable problem, and the sum is unreasonable.

This is a piece about what happens when you take that overgrowth seriously as a design problem.

<figure>
<svg viewBox="0 0 720 240" width="100%" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Click counts before and after redesign across five common tasks">
  <text x="20" y="24" font-family="ui-sans-serif,system-ui" font-size="13" font-weight="700" fill="#1f1a2e">Clicks per task — before vs after</text>
  <text x="20" y="42" font-family="ui-sans-serif,system-ui" font-size="11" fill="#8a849b">Measured on 14 clinicians across two clinics</text>

  <g font-family="ui-sans-serif,system-ui" font-size="12" fill="#4b4660">
    <!-- Row template repeated -->
    <text x="20"  y="78">Sign verbal order</text>
    <rect x="200" y="66" width="220" height="16" rx="4" fill="#f87060" opacity="0.6"/>
    <text x="426" y="78" fill="#1f1a2e" font-weight="700">11</text>
    <rect x="200" y="84" width="60"  height="16" rx="4" fill="#10b981"/>
    <text x="266" y="96" fill="#1f1a2e" font-weight="700">3</text>

    <text x="20"  y="118">Acknowledge BPA</text>
    <rect x="200" y="106" width="120" height="16" rx="4" fill="#f87060" opacity="0.6"/>
    <text x="326" y="118" fill="#1f1a2e" font-weight="700">6</text>
    <rect x="200" y="124" width="40"  height="16" rx="4" fill="#10b981"/>
    <text x="246" y="136" fill="#1f1a2e" font-weight="700">2</text>

    <text x="20"  y="158">Release med tray</text>
    <rect x="200" y="146" width="320" height="16" rx="4" fill="#f87060" opacity="0.6"/>
    <text x="526" y="158" fill="#1f1a2e" font-weight="700">16</text>
    <rect x="200" y="164" width="80"  height="16" rx="4" fill="#10b981"/>
    <text x="286" y="176" fill="#1f1a2e" font-weight="700">4</text>

    <text x="20"  y="198">Document allergy</text>
    <rect x="200" y="186" width="160" height="16" rx="4" fill="#f87060" opacity="0.6"/>
    <text x="366" y="198" fill="#1f1a2e" font-weight="700">8</text>
    <rect x="200" y="204" width="40"  height="16" rx="4" fill="#10b981"/>
    <text x="246" y="216" fill="#1f1a2e" font-weight="700">2</text>
  </g>

  <!-- Legend -->
  <rect x="560" y="20" width="10" height="10" fill="#f87060" opacity="0.6"/><text x="576" y="29" font-family="ui-sans-serif,system-ui" font-size="11" fill="#4b4660">Before</text>
  <rect x="620" y="20" width="10" height="10" fill="#10b981"/><text x="636" y="29" font-family="ui-sans-serif,system-ui" font-size="11" fill="#4b4660">After</text>
</svg>
<figcaption><em>The fix wasn't a redesign. It was a thousand small subtractions, each defended out loud.</em></figcaption>
</figure>

## The principle nobody writes down

Every EHR design book talks about clicks, glanceability, cognitive load. None of them say the thing that matters:

> **The interface should make the next correct action the cheapest one to do.**

That's it. Not the most prominent. Not the most beautiful. The cheapest — fewest motor actions, least reading, no decision the user shouldn't have to make in this moment.

When I started measuring our screens against that principle, the redesigns wrote themselves.

## Redesign 1 — collapse the order-signing flow

A verbal order used to take eleven clicks: open chart, find order, click sign, select reason, confirm timestamp, choose witness, confirm witness, attest, save, close, reopen if you needed to add a note.

The new flow is three: open chart, sign, confirm. Everything else either has a sane default (current timestamp, the witness physically present per the badge tap, the attestation pre-checked) or moves out of the way (the note field opens *after* signing, not before).

Nothing was removed from the data model. The audit log is unchanged. We just stopped asking the human to be the database.

## Redesign 2 — turn alert acknowledgement into a glance

Best-practice advisories (BPAs) are the textbook example of alert fatigue. The fix wasn't fewer alerts — it was making the acknowledgement honest.

- **Severity affects shape, not just colour.** A critical alert is a vertical strip down the left of the chart, impossible to miss and impossible to confuse with the standard advisory chip.
- **The two most common responses are buttons, not menus.** "Acknowledged — proceed" and "Acknowledged — not applicable" account for ~90% of clicks. They should not be hiding behind a dropdown.
- **The dismissal is logged with the reason.** This is the part that makes everyone nervous and then nobody objects to once they see it. The audit trail gets *better*, not worse.

Six clicks down to two. More important, the alerts that matter started getting read again.

## Redesign 3 — release the medication tray in four taps

Releasing a tray was the worst offender: sixteen clicks across three modals. We took it apart and asked, at each step, "what is the user really deciding here?" Most of the time the answer was nothing — the system already knew the answer.

The new flow:

1. Tap patient
2. Tap tray
3. Confirm the patient identity by scanning the band (this is the safety-critical step and the only one that requires a human)
4. Tap release

Everything else — time, route, dosing reconfirmation, witness rules — is computed from policy and displayed for review, not requested.

## Redesign 4 — make documenting an allergy not feel like punishment

Allergies are documented poorly because the form punishes you for trying. Eight clicks, three required dropdowns whose choices don't match what the patient actually said.

The new field accepts a single sentence. The model behind it parses substance, reaction, and severity. The form *shows you the parse* before saving and lets you correct it in place. If you can't be bothered to correct it, the unstructured note is preserved alongside the structured fields. The chart never loses information.

Eight clicks down to two. The structured fields improved because the cost of using them dropped.

## Redesign 5 — give the home screen a job

Most EHR home screens are dashboards. Dashboards are for monitoring; clinicians are not monitoring. They are *doing*. The home screen now shows a single column: the next correct action for each patient on your list, ranked. Vitals overdue. Order awaiting signature. Discharge ready for review.

The dashboards still exist, one tap away, for the moments you actually need one. But they stopped being the first thing you saw, and the first thing you saw started telling you what to do.

## The pattern across all five

| | Before | After | What changed |
|---|---|---|---|
| Sign order | 11 | 3 | Defaults replaced prompts |
| Ack alert | 6 | 2 | Common responses became buttons |
| Release tray | 16 | 4 | Removed steps the system already knew |
| Document allergy | 8 | 2 | Free text + parse-and-confirm |
| Triage home | many | 1 list | Next action, not status board |

Notice what isn't in that table: new icons, better colours, prettier typography, a redesigned logo. The visual layer barely moved. The work was in deciding which questions the interface had no right to ask.

## What it cost

This is the part most write-ups skip.

- Each redesign required a real audit of the audit log. You can't remove a click without proving the data it captured either still arrives by another path or wasn't worth capturing.
- Two of the five required policy changes, not just UI changes. Policy is slower than code. Budget for it.
- One of them — the allergy parser — required the model in the loop to be auditable. We accepted a slower release in exchange for the ability to show, for every parse, which words drove which fields. That trade was worth it.

## What it bought

Two hours a shift, on average, across the floor. That's not the number that mattered. The number that mattered was the one nurse on the third week who said, "It feels like the chart is on my side now."

That sentence is the brief for every healthcare UI I'm going to design from this point on.

---

*A companion piece on the model behind these notes lives in [Ambient Scribes on the Ward](/blog/ambient-scribes-90-days-voice-first-ehr). The interface story and the model story are the same story, told from two angles.*
