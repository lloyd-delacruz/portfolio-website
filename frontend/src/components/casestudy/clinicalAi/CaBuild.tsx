// frontend/src/components/casestudy/clinicalAi/CaBuild.tsx
import { CsSection, Module } from '../bits'

const STATS = [
  { n: '32', label: 'commits' },
  { n: '190', label: 'files' },
  { n: '52', label: 'test files' },
  { n: '0', label: 'CI pipelines', muted: true },
]

const CANDOUR = [
  { k: 'Status', v: 'Works locally. Dockerised, never deployed.' },
  { k: 'Demo', v: 'No public instance — the corpus is copyrighted.' },
  { k: 'Team', v: 'Built solo.' },
  { k: 'Corpus', v: 'A curated clinical reference corpus; titles not published.' },
]

export function CaBuild() {
  return (
    <CsSection
      eyebrow="06 · What actually exists"
      title="The tests cluster where the risk is."
      intro="Fifty-two test files, concentrated on the retrieval layer. That concentration is the argument: the part that can quietly go wrong is the part that is pinned down."
    >
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.1fr_1fr]">
        <Module>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
            Test files by language
          </p>
          <div className="mt-5 space-y-5">
            {[
              { lang: 'Python', n: 27, pct: 52 },
              { lang: 'TypeScript', n: 25, pct: 48 },
            ].map(({ lang, n, pct }) => (
              <div key={lang}>
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-[12px] text-ink-soft">{lang}</span>
                  <span className="font-display text-[15px] font-extrabold text-ink">{n}</span>
                </div>
                <div className="mt-2 h-[10px] w-full overflow-hidden rounded-full" style={{ background: 'var(--cream-2)' }}>
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${pct}%`, background: 'var(--plum)' }}
                    aria-hidden
                  />
                </div>
              </div>
            ))}
          </div>
          <p className="mt-5 border-t border-[var(--line)] pt-3 text-[13px] leading-relaxed text-ink-soft">
            Retrieval is where a RAG system fails silently, so that is where the suite is heaviest.
          </p>
        </Module>

        <div>
          <div className="grid grid-cols-2 gap-4">
            {STATS.map(({ n, label, muted }) => (
              <div
                key={label}
                className="rounded-2xl bg-white p-5 ghair soft-shadow-sm"
                style={muted ? { background: 'var(--cream-2)' } : undefined}
              >
                <p
                  className="font-display text-[2rem] font-extrabold leading-none"
                  style={{ color: muted ? 'var(--ink-muted)' : 'var(--plum)' }}
                >
                  {n}
                </p>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-muted">{label}</p>
              </div>
            ))}
          </div>

          <Module className="mt-4">
            <dl className="space-y-3">
              {CANDOUR.map(({ k, v }) => (
                <div key={k} className="flex gap-4 border-b border-[var(--line)] pb-2 last:border-0 last:pb-0">
                  <dt className="w-[76px] shrink-0 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-muted">
                    {k}
                  </dt>
                  <dd className="text-[13px] leading-relaxed text-ink-soft">{v}</dd>
                </div>
              ))}
            </dl>
          </Module>
        </div>
      </div>
    </CsSection>
  )
}
