// frontend/src/components/casestudy/mepp/MpBuild.tsx
import { CsSection, Module } from '../bits'

const STATS = [
  { n: '200', label: 'commits' },
  { n: '440', label: 'files' },
  { n: '112', label: 'tests' },
  { n: '31', label: 'SQL migrations' },
  { n: '0', label: 'CI pipelines', muted: true },
]

const CANDOUR = [
  { k: 'Status', v: 'Backend complete. Stalled since June 2026.' },
  { k: 'Deployment', v: 'Never deployed. No users, no production data.' },
  { k: 'Data', v: 'Synthetic records only, throughout.' },
  { k: 'Team', v: 'Built solo, with no CI to catch me.' },
]

export function MpBuild() {
  return (
    <CsSection
      eyebrow="05 · What actually exists"
      title="The honest inventory."
      intro="Counted from the repository, not estimated. What follows is what is built — not what is running."
    >
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {STATS.map(({ n, label, muted }) => (
          <div
            key={label}
            className="rounded-2xl bg-white p-5 ghair soft-shadow-sm"
            style={muted ? { background: 'var(--cream-2)' } : undefined}
          >
            <p
              className="font-display text-[2.1rem] font-extrabold leading-none"
              style={{ color: muted ? 'var(--ink-muted)' : 'var(--plum)' }}
            >
              {n}
            </p>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-muted">{label}</p>
          </div>
        ))}
      </div>

      <Module className="mt-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">Where it stands</p>
        <dl className="mt-4 grid grid-cols-1 gap-x-10 gap-y-3 sm:grid-cols-2">
          {CANDOUR.map(({ k, v }) => (
            <div key={k} className="flex gap-4 border-b border-[var(--line)] pb-3">
              <dt className="w-[104px] shrink-0 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-muted">
                {k}
              </dt>
              <dd className="text-[13px] leading-relaxed text-ink-soft">{v}</dd>
            </div>
          ))}
        </dl>
      </Module>
    </CsSection>
  )
}
