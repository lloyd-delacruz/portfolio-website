// frontend/src/components/casestudy/clientWork/CwCraft.tsx

const PIPELINE = [
  { n: '01', k: 'Content model', v: 'Pages, sections and copy decided before any styling.' },
  { n: '02', k: 'Components', v: 'TypeScript components, Tailwind for the visual layer.' },
  { n: '03', k: 'Static build', v: 'Next.js or Astro, rendered ahead of the request.' },
  { n: '04', k: 'Vercel', v: 'Deployed from the repository.' },
]

const NOTES = [
  {
    k: 'Two frameworks, one shape',
    v: 'Next.js where a site behaves like an application; Astro where it is fundamentally content.',
  },
  {
    k: 'Small surface, high finish',
    v: 'These are 77–269 file codebases. The work is structure, responsiveness and typography — not backend systems.',
  },
  {
    k: 'Different from the products',
    v: 'Service work is scoped, delivered and handed over. It sits deliberately apart from the engineering projects on this site.',
  },
]

export function CwCraft() {
  return (
    <section className="border-t border-[var(--line)]" style={{ background: 'var(--cream-2)' }}>
      <div className="mx-auto max-w-[1180px] px-6 py-14">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted">How they were built</p>
        <h2 className="mt-3 font-display text-[1.75rem] font-extrabold leading-tight text-ink sm:text-[2rem]">
          The same four steps, every time
        </h2>

        <ol className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-2xl sm:grid-cols-2 lg:grid-cols-4" style={{ background: 'var(--line-strong)' }}>
          {PIPELINE.map(({ n, k, v }) => (
            <li key={n} className="bg-white p-5">
              <span className="font-mono text-[11px] tracking-[0.12em] text-ink-muted">{n}</span>
              <h3 className="mt-3 font-display text-[15px] font-bold text-ink">{k}</h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-ink-soft">{v}</p>
            </li>
          ))}
        </ol>

        <dl className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {NOTES.map(({ k, v }) => (
            <div key={k} className="border-t border-[var(--line-strong)] pt-4">
              <dt className="font-display text-[15px] font-bold text-ink">{k}</dt>
              <dd className="mt-2 text-[13px] leading-relaxed text-ink-soft">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
