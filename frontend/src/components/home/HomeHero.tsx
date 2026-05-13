// frontend/src/components/home/HomeHero.tsx
import { CtaButton, SectionEyebrow, StatItem } from './primitives'

const STATS = [
  { value: '10+', label: 'Years in healthcare' },
  { value: 'MSc', label: 'Data Analytics' },
  { value: 'AWS', label: 'AI Practitioner' },
]

export function HomeHero() {
  return (
    <section className="bg-paper-bg">
      <div className="mx-auto max-w-6xl px-6 pb-20 pt-32 md:pt-36">
        <div className="mx-auto max-w-3xl text-center">
          <SectionEyebrow>Applied AI Engineer · Healthcare Systems Builder</SectionEyebrow>

          <h1 className="mt-6 font-sans text-5xl font-bold leading-[1.06] tracking-tight-display text-paper-ink md:text-6xl">
            I build healthcare systems that <span className="text-gold-ink">work</span>.
          </h1>

          <p className="mx-auto mt-6 max-w-[52ch] text-lg leading-relaxed text-paper-ink-soft">
            I design and ship AI-native workflows that connect people, systems, and data —
            turning frontline complexity into operational clarity.
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <CtaButton href="/work/wheelchair-tracking" variant="filled">View case study</CtaButton>
            <CtaButton href="#systems" variant="outline">Explore the work</CtaButton>
          </div>

          <div className="mx-auto mt-12 flex max-w-md items-stretch justify-center divide-x divide-paper-subtle">
            {STATS.map((s) => (
              <div key={s.label} className="flex-1 px-4">
                <StatItem value={s.value} label={s.label} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
