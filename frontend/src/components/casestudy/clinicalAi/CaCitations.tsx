// frontend/src/components/casestudy/clinicalAi/CaCitations.tsx
import { CsSection, Module } from '../bits'
import { TextBars } from './CaProblem'

const STEPS = [
  { k: 'model output', v: 'a citation marker in the generated markdown' },
  { k: 'custom rehype plugin', v: 'rewrites the marker during rendering' },
  { k: 'rendered answer', v: 'a real superscript anchor into the source list' },
]

const SOURCES = [
  { n: 1, page: 'p. 412' },
  { n: 2, page: 'p. 87' },
  { n: 3, page: 'pp. 1103–1104' },
]

export function CaCitations() {
  return (
    <CsSection
      eyebrow="05 · Citations"
      title="Claims you can walk back to a page."
      intro="Citations are AMA-style and page-level, rendered as real superscript links by a custom rehype plugin — not as text the model happened to format."
    >
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.15fr_1fr]">
        <Module>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-plum">Rendered answer</p>
          <div className="mt-4">
            <TextBars widths={[97, 90, 84, 72]} cites={[1, null, 2, 3]} />
          </div>
          <div className="mt-6 border-t border-[var(--line)] pt-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-muted">References</p>
            <ul className="mt-3 space-y-2">
              {SOURCES.map(({ n, page }) => (
                <li key={n} className="flex items-center gap-3">
                  <span
                    className="grid h-5 w-5 shrink-0 place-items-center rounded font-mono text-[10px] font-bold"
                    style={{ background: 'var(--plum-soft)', color: 'var(--plum)' }}
                  >
                    {n}
                  </span>
                  <span
                    className="h-[9px] w-[46%] rounded-full"
                    style={{ background: 'repeating-linear-gradient(135deg, rgba(28,22,46,0.18) 0 5px, rgba(28,22,46,0.07) 5px 10px)' }}
                    aria-label="source title withheld"
                  />
                  <span className="font-mono text-[11px] text-ink-muted">{page}</span>
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-5 text-xs italic text-ink-muted">
            Source titles are withheld: the corpus is copyrighted clinical reference material. Page numbers show the
            citation granularity the system actually produces.
          </p>
        </Module>

        <div className="flex flex-col gap-4">
          {STEPS.map(({ k, v }, i) => (
            <div key={k} className="rounded-2xl bg-white p-5 ghair soft-shadow-sm">
              <div className="flex items-center gap-3">
                <span
                  className="grid h-7 w-7 place-items-center rounded-lg font-mono text-[11px] font-bold"
                  style={{ background: 'var(--plum-soft)', color: 'var(--plum)' }}
                >
                  {i + 1}
                </span>
                <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-muted">{k}</p>
              </div>
              <p className="mt-2.5 text-[13px] leading-relaxed text-ink-soft">{v}</p>
            </div>
          ))}
        </div>
      </div>
    </CsSection>
  )
}
