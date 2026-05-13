import type { Metadata } from 'next'
import { Building2, Boxes, Globe2, Sparkles } from 'lucide-react'
import { HomeNav } from '@/components/home/HomeNav'
import { SiteFooter } from '@/components/home/SiteFooter'
import { FooterCTA } from '@/components/home/FooterCTA'
import { PROJECTS, WorkCard, ANCHOR_CASE_HREF } from '@/components/home/FeaturedWork'
import { AnchorCase } from '@/components/home/AnchorCase'

export const metadata: Metadata = {
  title: 'Work — Lloyd Dela Cruz',
  description:
    'Selected work across healthcare operations, applied AI, healthcare systems, and fintech — production deployments, calibrated AI prototypes, and product engineering with honest status signals.',
}

const APPLIED_AI_HREFS = new Set([
  '/work/clinical-risk-engine',
  '/work/population-health-intelligence',
])

// Tiered partition: flagship deployment, applied AI, then product & operational work.
const APPLIED_AI = PROJECTS.filter((p) => APPLIED_AI_HREFS.has(p.href))
const PRODUCT_OPS = PROJECTS.filter(
  (p) => p.href !== ANCHOR_CASE_HREF && !APPLIED_AI_HREFS.has(p.href),
)

const PROOF_METRICS = [
  { value: '4',    label: 'Hospital sites in active deployment',  Icon: Building2, tint: 'var(--plum)',  bg: 'var(--plum-soft)' },
  { value: '800+', label: 'Assets tracked in production',         Icon: Boxes,     tint: 'var(--amber)', bg: '#fef3c7' },
  { value: '193',  label: 'Nations modeled with calibrated forecasts', Icon: Globe2, tint: 'var(--blue)', bg: '#dbeafe' },
  { value: '2',    label: 'Calibrated AI inference systems',      Icon: Sparkles,  tint: 'var(--green)', bg: '#d1fae5' },
]

export default function WorkPage() {
  return (
    <div className="home2 min-h-screen">
      <HomeNav active="Work" />
      <main>
        {/* Hero */}
        <section className="mx-auto max-w-[1180px] px-6 pt-16 pb-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-plum">Selected work</p>
          <h1 className="mt-3 max-w-2xl font-display text-4xl font-extrabold leading-tight text-ink sm:text-5xl">
            Production systems, calibrated AI, and operational platforms.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft">
            Each project below is labeled with its honest status — what runs in real hospital environments today,
            what exists as a calibrated prototype with a live demo, and what is published as a full architecture
            case study. No hype, just evidence.
          </p>
        </section>

        {/* Proof metric strip */}
        <section className="mx-auto max-w-[1180px] px-6 pt-6 pb-4">
          <div className="rounded-3xl bg-white px-7 py-7 ghair soft-shadow">
            <div className="grid grid-cols-2 gap-7 sm:grid-cols-4">
              {PROOF_METRICS.map(({ value, label, Icon, tint, bg }) => (
                <div key={label}>
                  <div className="grid h-9 w-9 place-items-center rounded-lg" style={{ background: bg }}>
                    <Icon size={18} style={{ color: tint }} strokeWidth={1.9} />
                  </div>
                  <p className="mt-3 font-display text-2xl font-extrabold text-ink">{value}</p>
                  <p className="text-sm text-ink-muted">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tier 1 — Deployed in production (flagship) */}
        <section className="mx-auto max-w-[1180px] px-6 pt-10 pb-8">
          <div className="border-t border-ink/10 pt-10">
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-plum">
                  <span className="mr-2 inline-block h-1.5 w-1.5 translate-y-[-2px] rounded-full align-middle" style={{ background: 'var(--green)' }} />
                  Deployed in production
                </p>
                <h2 className="mt-2 font-display text-2xl font-bold leading-tight text-ink sm:text-3xl">
                  Running in real hospital environments today
                </h2>
              </div>
              <p className="max-w-md text-sm leading-relaxed text-ink-soft">
                The anchor case: an asset-tracking platform actively coordinating 800+ wheelchairs and clinical
                assets across four hospital sites, with chain-of-custody and lifecycle visibility.
              </p>
            </div>
          </div>
          <AnchorCase />
        </section>

        {/* Tier 2 — Applied AI systems */}
        <section className="mx-auto max-w-[1180px] px-6 pt-4 pb-8">
          <div className="border-t border-ink/10 pt-10">
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-plum">
                  <span className="mr-2 inline-block h-1.5 w-1.5 translate-y-[-2px] rounded-full align-middle" style={{ background: 'var(--amber)' }} />
                  Applied AI systems
                </p>
                <h2 className="mt-2 font-display text-2xl font-bold leading-tight text-ink sm:text-3xl">
                  Calibrated inference for clinicians and planners
                </h2>
              </div>
              <p className="max-w-md text-sm leading-relaxed text-ink-soft">
                Architecture-first deep dives with live inference panels. Each one is a prototype backed by a
                calibrated surrogate of the trained model — published as a full case study with a working demo.
              </p>
            </div>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {APPLIED_AI.map((p) => (
              <WorkCard key={p.title} p={p} />
            ))}
          </div>
        </section>

        {/* Tier 3 — Product & operational work */}
        <section className="mx-auto max-w-[1180px] px-6 pt-4 pb-16">
          <div className="border-t border-ink/10 pt-10">
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-plum">
                  <span className="mr-2 inline-block h-1.5 w-1.5 translate-y-[-2px] rounded-full align-middle" style={{ background: 'var(--amber)' }} />
                  Product &amp; operational work
                </p>
                <h2 className="mt-2 font-display text-2xl font-bold leading-tight text-ink sm:text-3xl">
                  Healthcare and fintech product prototypes
                </h2>
              </div>
              <p className="max-w-md text-sm leading-relaxed text-ink-soft">
                Workflow platforms with interactive console and mobile demos. Each ships as a full case study —
                same engineering discipline applied to healthcare logistics and personal finance.
              </p>
            </div>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {PRODUCT_OPS.map((p) => (
              <WorkCard key={p.title} p={p} />
            ))}
          </div>
        </section>

        <FooterCTA />
      </main>
      <SiteFooter />
    </div>
  )
}
