// frontend/src/components/casestudy/clinicalAi/CaHero.tsx
import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { DBox, VArrow } from './svg'

function CaHeroGlyph() {
  return (
    <svg
      viewBox="0 0 440 300"
      className="h-auto w-full max-w-[440px]"
      role="img"
      aria-label="A clinical question passes through retrieval against a vector store, then a language model that either answers with citations or refuses and states what the corpus is missing."
    >
      <title>Retrieval, then answer or refusal</title>
      <DBox x={120} y={8} w={200} h={52} label="Clinical question" fs={12} />
      <VArrow x={220} y1={60} y2={84} />
      <DBox x={120} y={86} w={200} h={56} label="Retrieve" sub="vector store" fs={12} tone="plum" />
      <VArrow x={220} y1={142} y2={166} />
      <DBox x={120} y={168} w={200} h={56} label="LLM" sub="temperature 0" fs={12} />
      <VArrow x={150} y1={224} y2={246} />
      <VArrow x={290} y1={224} y2={246} />
      <DBox x={20} y={248} w={200} h={48} label="Answer + citations" fs={11.5} />
      <DBox x={230} y={248} w={200} h={48} label="Refusal, with reason" fs={11.5} tone="muted" />
    </svg>
  )
}

export function CaHero() {
  return (
    <section className="relative overflow-hidden">
      <div className="hero-wash pointer-events-none absolute inset-0" aria-hidden />
      <div className="relative mx-auto max-w-[1180px] px-6 pb-14 pt-12 lg:pt-16">
        <Link
          href="/work"
          className="group inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted transition-colors hover:text-ink"
        >
          <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" />
          All work
        </Link>

        <div className="mt-6 grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <span className="anim-rise inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-soft ghair">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'var(--plum)' }} />
              Applied AI · Retrieval
            </span>

            <h1
              className="anim-rise mt-5 font-display text-[2.5rem] font-extrabold leading-[1.06] text-ink sm:text-[3rem] lg:text-[3.3rem]"
              style={{ animationDelay: '60ms' }}
            >
              Clinical AI Assistant
              <br />
              <span className="grad-plum-text">Refusal as a feature</span>
            </h1>

            <p
              className="anim-rise mt-5 max-w-[44ch] text-[1.08rem] leading-relaxed text-ink-soft"
              style={{ animationDelay: '120ms' }}
            >
              A retrieval-grounded assistant that answers clinical questions from a curated reference corpus with
              page-level citations — and says plainly when the corpus does not cover the question.
            </p>

            <div className="anim-rise mt-7 flex flex-wrap items-center gap-3" style={{ animationDelay: '180ms' }}>
              <Link
                href="#refusal"
                className="group inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white soft-shadow transition-transform hover:-translate-y-0.5"
                style={{ background: 'var(--plum)' }}
              >
                Why refusal is engineered
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="#pipeline"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-ink ghair-2 transition-colors hover:bg-[var(--cream-2)]"
              >
                See the pipeline
              </Link>
            </div>
          </div>

          <div className="anim-rise" style={{ animationDelay: '260ms' }}>
            <CaHeroGlyph />
          </div>
        </div>
      </div>
    </section>
  )
}
