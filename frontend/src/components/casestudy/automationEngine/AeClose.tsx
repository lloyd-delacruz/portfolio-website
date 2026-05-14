// frontend/src/components/casestudy/automationEngine/AeClose.tsx
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'

// Mirrors CgClose's contact CTA href so the two close sections stay in lock-step.
const CONTACT_HREF = '/contact' // ← verified from CgClose.tsx line 30

const PROD_REQS = [
  'ALM pipeline · solution packaging · environment promotion',
  'Centralized monitoring · Application Insights · alerting',
  'Naming standards · DLP policies · CoE oversight',
]

export function AeClose() {
  return (
    <section className="mx-auto max-w-[1180px] px-6 py-20">
      <div className="mx-auto max-w-2xl text-center">
        <p className="font-display text-2xl font-extrabold leading-snug text-ink sm:text-3xl">
          &ldquo;Most operations don&rsquo;t need a new platform. They need the existing one to talk to itself.&rdquo;
        </p>
        <ul className="mt-8 space-y-1.5 text-[11.5px] font-mono tracking-tight text-ink-muted">
          {PROD_REQS.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink ghair"
          >
            <ArrowLeft size={14} /> All work
          </Link>
          <Link
            href={CONTACT_HREF}
            className="inline-flex items-center gap-2 rounded-full bg-[var(--plum)] px-4 py-2 text-sm font-semibold text-white"
          >
            Talk about a similar automation <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  )
}
