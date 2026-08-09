// frontend/src/components/casestudy/clientWork/CwList.tsx
import { CwWire, type WireKind } from './CwWire'

type Entry = {
  repo: string
  name: string
  scope: string
  files: number
  wire: WireKind
  note?: string
}

const ENTRIES: Entry[] = [
  {
    repo: 'physioinmotion',
    name: 'Physiotherapy clinic',
    scope: 'Services, practitioner pages and enquiry routing for a physiotherapy practice.',
    files: 99,
    wire: 'clinic',
  },
  {
    repo: 'physiotherapy-clinic',
    name: 'Clinic site',
    scope: 'A second clinic build: treatment information, location details and a booking-led homepage.',
    files: 94,
    wire: 'booking',
  },
  {
    repo: 'kerrisdale-little-league',
    name: 'Community sports organisation',
    scope: 'Seasons, divisions, schedules and registration information for a volunteer-run league.',
    files: 77,
    wire: 'roster',
    note: 'most recent',
  },
  {
    repo: 'langley-foodie',
    name: 'Local food & business',
    scope: 'A browsable local food directory with listing pages and category navigation.',
    files: 103,
    wire: 'grid',
  },
  {
    repo: 'websitegemms',
    name: 'Business site · Astro',
    scope: 'Content-led marketing site built on Astro, with a static-first delivery model.',
    files: 269,
    wire: 'editorial',
  },
]

function Row({ entry }: { entry: Entry }) {
  return (
    <li className="ghair-t">
      <div className="flex flex-col gap-4 py-6 sm:flex-row sm:items-start sm:gap-6">
        <CwWire kind={entry.wire} />

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <h3 className="font-display text-[17px] font-bold leading-tight text-ink">{entry.name}</h3>
            {entry.note && (
              <span className="rounded-full border border-[var(--line-strong)] px-2 py-[2px] font-mono text-[10px] uppercase tracking-[0.08em] text-ink-muted">
                {entry.note}
              </span>
            )}
          </div>
          <p className="mt-2 max-w-[62ch] text-[13.5px] leading-relaxed text-ink-soft">{entry.scope}</p>
        </div>

        <dl className="shrink-0 sm:w-[190px] sm:text-right">
          <dt className="sr-only">Repository</dt>
          <dd className="font-mono text-[11px] text-ink-muted">{entry.repo}</dd>
          <dt className="sr-only">Files</dt>
          <dd className="mt-1.5 font-mono text-[11px] text-ink-muted">{entry.files} files</dd>
        </dl>
      </div>
    </li>
  )
}

export function CwList() {
  return (
    <section className="mx-auto max-w-[1180px] px-6 py-14">
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted">The work</p>
      <h2 className="mt-3 font-display text-[1.75rem] font-extrabold leading-tight text-ink sm:text-[2rem]">
        Five builds
      </h2>

      <ul className="mt-8">
        {ENTRIES.map((e) => (
          <Row key={e.repo} entry={e} />
        ))}
      </ul>

      <div className="ghair-t pt-5">
        <p className="max-w-[70ch] text-xs leading-relaxed text-ink-muted">
          File counts are taken from each repository. Repositories are private, so there are no source links here,
          and no deployment URL is claimed — the sketches above indicate page structure only and are not
          screenshots. Client names, logos and marks are not reproduced.
        </p>
      </div>
    </section>
  )
}
