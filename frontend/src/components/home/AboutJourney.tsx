// frontend/src/components/home/AboutJourney.tsx
const ENTRIES = [
  {
    period: '2007–2012',
    title: 'Industrial Engineering & Early Career',
    body:
      'Graduated BSc Industrial Engineering in 2007. Started in sales (2007-2010), then transitioned to engineering roles in Singapore (2010-2012). Led sustainable energy projects, implemented Lean Six Sigma methodologies, reducing timelines by 15% and costs by 20%.',
    skills: ['Project Management', 'Lean Six Sigma', 'Process Optimization', 'Contract Management'],
    tint: 'var(--plum)',
    soft: 'var(--plum-soft)',
    current: false,
  },
  {
    period: '2012–2016',
    title: 'Canadian Transition & Education',
    body:
      'Moved to Canada and worked multiple jobs (service, security, cleaning) to support myself while pursuing full-time studies. Completed Rehabilitation Assistant Diploma at Vancouver Community College and Sustainability Management program at University of British Columbia.',
    skills: ['Adaptability', 'Work Ethic', 'Time Management', 'Resilience', 'Customer Service'],
    tint: 'var(--amber)',
    soft: '#fef3c7',
    current: false,
  },
  {
    period: '2016–2025',
    title: 'Healthcare Practice & Data Evolution',
    body:
      "9+ years at Vancouver Coastal Health as Rehabilitation Assistant, supporting 200+ patient plans annually. Transitioned to data analytics through multiple certifications, AWS AI credentials, and Master's in Data Analytics while building healthcare solutions.",
    skills: ['Patient Care', 'Healthcare Systems', 'Data Analytics', 'Python', 'SQL', 'AWS AI'],
    tint: 'var(--green)',
    soft: '#d1fae5',
    current: false,
  },
  {
    period: '2022–Present',
    title: 'Data Analytics & AI Transformation',
    body:
      "Mastering data analytics through multiple certifications and AWS AI Practitioner credential. Currently pursuing Master's in Data Analytics while building full-stack healthcare solutions.",
    skills: ['Python', 'SQL', 'Tableau', 'AWS AI', 'Data Engineering', 'Prompt Engineering'],
    tint: 'var(--coral)',
    soft: '#ffe4e0',
    current: true,
  },
]

export function AboutJourney() {
  return (
    <section className="mx-auto max-w-[1180px] px-6 py-16">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-plum">Career evolution</p>
      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[1fr_1fr] lg:items-end">
        <h2 className="font-display text-3xl font-extrabold leading-[1.12] text-ink sm:text-[2.4rem]">
          My professional <span className="text-plum">journey.</span>
        </h2>
        <p className="max-w-md text-[1.02rem] leading-relaxed text-ink-soft">
          From Industrial Engineering to Healthcare Analytics — a 20+ year evolution across
          continents, disciplines, and industries.
        </p>
      </div>

      <ol className="relative mt-12 space-y-8 pl-8 sm:pl-10">
        <span
          className="absolute left-[6px] top-2 bottom-2 w-px sm:left-[10px]"
          style={{ background: 'var(--line-strong)' }}
          aria-hidden
        />
        {ENTRIES.map((e) => (
          <li key={e.period} className="relative">
            <span
              className="absolute -left-[28px] top-1.5 grid h-3.5 w-3.5 place-items-center rounded-full ring-4 ring-[var(--cream)] sm:-left-[34px]"
              style={{ background: e.tint }}
              aria-hidden
            >
              {e.current && <span className="anim-pulse h-3.5 w-3.5 rounded-full" style={{ background: e.tint }} />}
            </span>
            <div className="lift rounded-2xl bg-white p-6 ghair sm:p-7">
              <span
                className="inline-flex items-center rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em]"
                style={{ background: e.soft, color: e.tint }}
              >
                {e.period}
              </span>
              <h3 className="mt-4 font-display text-xl font-bold text-ink sm:text-2xl">{e.title}</h3>
              <p className="mt-3 text-[0.98rem] leading-relaxed text-ink-soft">{e.body}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {e.skills.map((s) => (
                  <span
                    key={s}
                    className="rounded-lg px-2.5 py-1 text-xs font-medium text-ink-soft"
                    style={{ background: 'rgba(28,22,46,0.05)' }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
