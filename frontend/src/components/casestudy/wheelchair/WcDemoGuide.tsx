// frontend/src/components/casestudy/wheelchair/WcDemoGuide.tsx
'use client'

import { useState } from 'react'
import {
  ShieldCheck, Settings2, Stethoscope, ClipboardCheck, Wrench,
  Copy, Check, ArrowRight, type LucideIcon,
} from 'lucide-react'
import { CsSection, Module, Chip } from '../bits'

type Tone = 'plum' | 'coral' | 'blue' | 'green' | 'amber'

type RoleCard = {
  Icon: LucideIcon
  tone: Tone
  title: string
  responsibility: string
  startHere: string
  workflow: string
  keyActions: string[]
  expect: string
  email: string
  password: string
}

const ROLES: RoleCard[] = [
  {
    Icon: Stethoscope,
    tone: 'blue',
    title: 'Therapist',
    responsibility: 'Requests the right wheelchair for a patient and tracks it until they have it.',
    startHere: 'Dashboard → "Request Wheelchair"',
    workflow: 'Fill out the one-page request form — patient initials, chair type/size, cushion, footrests, urgency — and submit.',
    keyActions: ['Request Wheelchair → Submit', '"My Requests" tab'],
    expect: 'A ticket appears immediately with a confirmation number (e.g. TKT-0123). No fitting chair? The patient joins a first-come, first-served waiting list that auto-matches the moment one is free.',
    email: 'therapist1@vgh.ca',
    password: 'Therapist123!',
  },
  {
    Icon: ClipboardCheck,
    tone: 'green',
    title: 'Rehab Assistant',
    responsibility: 'Runs the full chair lifecycle — acknowledge, find, check out, discharge, clean, return.',
    startHere: 'Request Queue — 5 tabs: New, On Hold, Waiting List, In Use, Post-Use',
    workflow: 'Open the "New" tab → Acknowledge & Find Chair → run the 3-step Find-a-Chair wizard (chair, cushion, footrests). The chair reserves and moves to On Hold.',
    keyActions: ['Acknowledge & Find Chair', 'Check Out to Patient', 'Discharge Chair', 'Mark Cleaned', 'Return to Service'],
    expect: 'The ticket advances one queue tab at a time, and the chair’s own status chip updates in lockstep: Available → Assigned → In Use → Dirty → Cleaned → Available.',
    email: 'rehab1@vgh.ca',
    password: 'Rehab123!',
  },
  {
    Icon: Wrench,
    tone: 'amber',
    title: 'Wheelchair Technician',
    responsibility: 'Repairs flagged chairs and keeps the fleet airworthy.',
    startHere: 'Maintenance — the repair queue, oldest first',
    workflow: 'Acknowledge a repair to claim it, do the (real-world) work, then Complete Repair with an outcome, work performed, costs, and notes.',
    keyActions: ['Acknowledge', 'Complete Repair'],
    expect: 'The chair flips to Repaired and waits for a Rehab Assistant to physically return it to service. Technicians can also self-flag a chair via Asset Management → Flag for Maintenance.',
    email: 'tech1@vgh.ca',
    password: 'Tech123!',
  },
  {
    Icon: Settings2,
    tone: 'coral',
    title: 'Admin',
    responsibility: 'Everything the workflow roles can do, plus inventory, users, and reporting for their site(s).',
    startHere: 'Dashboard, then Inventory',
    workflow: 'Inventory → Add Asset to register a wheelchair, cushion, or footrest. Then Administration → System Analytics for utilization, wait-time, and repair-cost reporting.',
    keyActions: ['Inventory → Add Asset', 'Administration → IT Management', 'Administration → System Analytics'],
    expect: 'New assets appear instantly in Inventory; Analytics reflects the shared demo data live, with drill-downs and CSV/Excel/PDF export.',
    email: 'admin@vgh.ca',
    password: 'Admin123!',
  },
  {
    Icon: ShieldCheck,
    tone: 'plum',
    title: 'Super-Admin',
    responsibility: 'Platform operator — stands up health authorities and hospital sites. Not part of daily clinical workflow.',
    startHere: 'The Platform Scope bar at the top of the screen',
    workflow: 'Tenants → open Vancouver Coastal Health → open a site to see its locations, wheelchairs, and users. Scope into VCH / Vancouver General Hospital to work exactly like a site Admin would.',
    keyActions: ['Tenants', 'Tenant / site switcher'],
    expect: 'Nothing loads meaningfully until a tenant and site are scoped — that’s intentional, it’s what stops two hospitals’ data from ever mixing.',
    email: 'admin@wheelchairtrack.ca',
    password: 'Platform123!',
  },
]

const TONE_STYLE: Record<Tone, { bg: string; fg: string }> = {
  plum:  { bg: 'var(--plum-soft)',  fg: 'var(--plum-deep)' },
  coral: { bg: 'var(--coral-tint)', fg: 'var(--coral-ink)' },
  blue:  { bg: 'var(--blue-tint)',  fg: 'var(--blue-ink)' },
  green: { bg: 'var(--green-tint)', fg: 'var(--green-ink)' },
  amber: { bg: 'var(--amber-tint)', fg: 'var(--amber-ink)' },
}

function CredentialRow({ role }: { role: RoleCard }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(`${role.email} / ${role.password}`)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      // Clipboard API unavailable (e.g. insecure context) — the credentials
      // are still visible as plain text for manual copy.
    }
  }

  return (
    <div className="mt-4 flex items-center justify-between gap-3 rounded-xl border border-[var(--line)] bg-[var(--cream-2)] px-3.5 py-3">
      <div className="min-w-0">
        <p className="truncate font-mono text-[12.5px] text-ink">{role.email}</p>
        <p className="truncate font-mono text-[12.5px] text-ink-muted">{role.password}</p>
      </div>
      <button
        type="button"
        onClick={handleCopy}
        aria-label={`Copy ${role.title} credentials`}
        className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-white px-2.5 py-1.5 text-xs font-semibold text-ink-soft ghair transition-colors hover:bg-[var(--cream)]"
      >
        {copied ? <Check size={13} className="text-[var(--green-ink)]" /> : <Copy size={13} />}
        {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
  )
}

export function WcDemoGuide() {
  return (
    <CsSection
      id="demo-guide"
      eyebrow={<>Try it yourself</>}
      title="How to use the live demo."
      intro="wheelchair-tracking.vercel.app is a public build seeded with synthetic data — no real patients, no real hospital records. Sign in with any account below; it's a shared sandbox, so you may see test tickets other visitors left behind. That's expected, not a bug."
    >
      <Module className="mb-6" style={{ background: 'linear-gradient(105deg,#ede9fe 0%,#f5f0fe 45%,#fce7f3 100%)' }}>
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
          Suggested path — follow one ticket end to end
        </p>
        <p className="mt-3 text-[13.5px] leading-relaxed text-ink-soft">
          Log in as <strong className="text-ink">Therapist</strong> and submit a request → log in as{' '}
          <strong className="text-ink">Rehab Assistant</strong> and acknowledge it, find a chair, check it out,
          then discharge, clean, and return it → log in as{' '}
          <strong className="text-ink">Wheelchair Technician</strong> and flag or repair a chair → log in as{' '}
          <strong className="text-ink">Admin</strong> to see it all land in Reports &amp; Analytics. The{' '}
          <strong className="text-ink">Super-Admin</strong> account is a separate platform-operator view, not part
          of this chain.
        </p>
      </Module>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {ROLES.map((role) => {
          const tone = TONE_STYLE[role.tone]
          return (
            <div key={role.title} className="flex flex-col rounded-2xl bg-white p-5 ghair soft-shadow-sm">
              <div className="flex items-center gap-2.5">
                <div className="grid h-9 w-9 place-items-center rounded-lg" style={{ background: tone.bg }}>
                  <role.Icon size={16} style={{ color: tone.fg }} strokeWidth={1.9} />
                </div>
                <p className="font-display text-[15px] font-bold text-ink">{role.title}</p>
              </div>

              <p className="mt-3 text-[13px] leading-snug text-ink-soft">{role.responsibility}</p>

              <dl className="mt-4 space-y-2.5 border-t pt-3 ghair-t">
                <div>
                  <dt className="text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-muted">Start here</dt>
                  <dd className="mt-1 text-[12.5px] leading-snug text-ink">{role.startHere}</dd>
                </div>
                <div>
                  <dt className="text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-muted">Workflow to try</dt>
                  <dd className="mt-1 text-[12.5px] leading-snug text-ink-soft">{role.workflow}</dd>
                </div>
                <div>
                  <dt className="text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-muted">Key actions</dt>
                  <dd className="mt-1.5 flex flex-wrap gap-1">
                    {role.keyActions.map((a) => (
                      <Chip key={a} tone={role.tone}>{a}</Chip>
                    ))}
                  </dd>
                </div>
                <div>
                  <dt className="text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-muted">What to expect</dt>
                  <dd className="mt-1 text-[12.5px] leading-snug text-ink-soft">{role.expect}</dd>
                </div>
              </dl>

              <CredentialRow role={role} />
            </div>
          )
        })}
      </div>

      <a
        href="https://wheelchair-tracking.vercel.app/"
        target="_blank"
        rel="noopener noreferrer"
        className="group mt-8 inline-flex w-fit items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white soft-shadow-sm transition-transform hover:-translate-y-0.5"
        style={{ background: 'var(--plum)' }}
      >
        Open the live demo
        <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
      </a>
    </CsSection>
  )
}
