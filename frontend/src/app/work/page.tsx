import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Boxes, Building2, Rocket, ShieldCheck } from 'lucide-react'
import { HomeNav } from '@/components/home/HomeNav'
import { SiteFooter } from '@/components/home/SiteFooter'
import { FooterCTA } from '@/components/home/FooterCTA'
import { PROJECTS, WorkCard, ANCHOR_CASE_HREF } from '@/components/home/FeaturedWork'
import { AnchorCase } from '@/components/home/AnchorCase'
import { PROJECT_LIST, type ProjectMetaRecord } from '@/lib/projects'

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Healthcare systems, applied AI and product engineering — each project labelled with its honest build status, and every figure countable from source control.',
  alternates: { canonical: '/work' },
}

/** Cards in the rich grid, excluding the anchor which gets its own band. */
const SYSTEM_CARDS = PROJECTS.filter((p) => p.href !== ANCHOR_CASE_HREF)

/**
 * Slugs that have a case-study page on disk. Anything not listed here renders
 * without a link, so the index can never produce a 404.
 */
const SLUGS_WITH_PAGES = new Set([
  'wheelchair-tracking',
  'mepp',
  'clinical-ai-assistant',
  'spendwise',
  'clinical-risk-engine',
  'population-health-intelligence',
  'clinical-genai-pipeline',
  'healthcare-automation-engine',
  'equitrackr',
  'apex-protocol',
  'client-work',
  'website-gemms',
  'self-hosted-infrastructure',
])

const DESIGN_STUDIES = PROJECT_LIST.filter((p) => p.tier === 'concept')
const CLIENT_WORK = PROJECT_LIST.filter((p) => p.tier === 'client')
const INFRASTRUCTURE = PROJECT_LIST.filter((p) => p.tier === 'infrastructure')

/** Countable from source control across the five engineered systems. */
const PROOF_METRICS = [
  { value: '5',   label: 'Systems architected end to end', Icon: Rocket,      tint: 'var(--plum)',  bg: 'var(--plum-soft)' },
  { value: '498', label: 'Automated tests',                Icon: ShieldCheck, tint: 'var(--green)', bg: '#d1fae5' },
  { value: '154', label: 'Database migrations authored',   Icon: Building2,   tint: 'var(--blue)',  bg: '#dbeafe' },
  { value: '1,229', label: 'Commits across those systems', Icon: Boxes,       tint: 'var(--amber)', bg: '#fef3c7' },
]

function SectionHeader({
  eyebrow,
  dot,
  title,
  blurb,
}: {
  eyebrow: string
  dot: string
  title: string
  blurb: string
}) {
  return (
    <div className="border-t border-ink/10 pt-10">
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-plum">
            <span
              className="mr-2 inline-block h-1.5 w-1.5 translate-y-[-2px] rounded-full align-middle"
              style={{ background: dot }}
            />
            {eyebrow}
          </p>
          <h2 className="mt-2 font-display text-2xl font-bold leading-tight text-ink sm:text-3xl">
            {title}
          </h2>
        </div>
        <p className="max-w-md text-sm leading-relaxed text-ink-soft">{blurb}</p>
      </div>
    </div>
  )
}

/**
 * Ledger row treatment. Deliberately quieter than a product card — service and
 * design work should not compete visually with the engineered systems.
 */
function ProjectRow({ p }: { p: ProjectMetaRecord }) {
  const linked = SLUGS_WITH_PAGES.has(p.slug)

  const inner = (
    <>
      <div className="min-w-0 flex-1">
        <p className="font-display text-[15px] font-bold leading-snug text-ink">{p.title}</p>
        {p.tagline && (
          <p className="mt-1 text-[13px] leading-relaxed text-ink-soft">{p.tagline}</p>
        )}
      </div>
      <div className="flex shrink-0 items-center gap-4">
        {p.statusLabel && (
          <span className="hidden font-mono text-[11px] text-ink-muted sm:inline">
            {p.statusLabel}
          </span>
        )}
        {linked && <ArrowRight size={15} className="shrink-0 text-plum" aria-hidden />}
      </div>
    </>
  )

  const className =
    'flex items-center gap-4 border-b border-[var(--line)] py-4 text-left first:border-t'

  return linked ? (
    <Link href={`/work/${p.slug}`} className={`${className} group transition-colors hover:bg-white`}>
      {inner}
    </Link>
  ) : (
    <div className={className}>{inner}</div>
  )
}

export default function WorkPage() {
  return (
    <div className="home2 min-h-screen">
      <a href="#work-content" className="skip-link">
        Skip to content
      </a>
      <HomeNav active="Work" />
      <main id="work-content">
        {/* Hero */}
        <section className="mx-auto max-w-[1180px] px-6 pt-16 pb-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-plum">
            Selected work
          </p>
          <h1 className="mt-3 max-w-2xl font-display text-4xl font-extrabold leading-tight text-ink sm:text-5xl">
            Healthcare systems, applied AI, and product engineering.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft">
            Each project carries its honest build status. Where a figure appears, it is countable
            from source control — tests, migrations, commits. Nothing here claims a deployment or a
            user base it does not have.
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

        {/* Tier 1 — Flagship */}
        <section className="mx-auto max-w-[1180px] px-6 pt-10 pb-8">
          <SectionHeader
            eyebrow="Flagship system"
            dot="var(--plum)"
            title="Where the workflow lives in the database"
            blurb="The deepest system in this portfolio: an equipment fleet platform whose 11-state lifecycle and tenant isolation are enforced in Postgres rather than in the client."
          />
          <AnchorCase />
        </section>

        {/* Tier 2 — Engineered systems */}
        <section className="mx-auto max-w-[1180px] px-6 pt-4 pb-8">
          <SectionHeader
            eyebrow="Engineered systems"
            dot="var(--blue)"
            title="Regulated data, retrieval, and financial correctness"
            blurb="Three more systems built end to end. Each one solves a problem that a CRUD app cannot: encrypted-but-searchable identity, retrieval that refuses, and a ledger the database will not let you edit."
          />
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SYSTEM_CARDS.map((p) => (
              <WorkCard key={p.title} p={p} />
            ))}
          </div>
          <p className="mt-6 text-[13px] leading-relaxed text-ink-muted">
            Also built: <span className="text-ink-soft">Gemms AI Assistant</span> — a multi-tenant
            retrieval widget on pgvector with an HNSW index, where tenant filtering runs before
            ranking rather than after. Case study not yet written.
          </p>
        </section>

        {/* Tier 3 — Design studies */}
        <section className="mx-auto max-w-[1180px] px-6 pt-4 pb-8">
          <SectionHeader
            eyebrow="Design studies"
            dot="var(--amber)"
            title="Systems designed, modelled, and reasoned about"
            blurb="Architecture and modelling exercises. These are design work with in-browser demonstrations — they are not shipped backends, and each page says so."
          />
          <div className="mt-6">
            {DESIGN_STUDIES.map((p) => (
              <ProjectRow key={p.slug} p={p} />
            ))}
          </div>
        </section>

        {/* Tier 4 — Client work */}
        <section className="mx-auto max-w-[1180px] px-6 pt-4 pb-8">
          <SectionHeader
            eyebrow="Client &amp; web work"
            dot="rgba(28,22,46,0.45)"
            title="Delivered for clinics and local organisations"
            blurb="Service work rather than product engineering — marketing and booking sites built for real businesses."
          />
          <div className="mt-6">
            {CLIENT_WORK.map((p) => (
              <ProjectRow key={p.slug} p={p} />
            ))}
          </div>
        </section>

        {/* Tier 5 — Third-party infrastructure */}
        <section className="mx-auto max-w-[1180px] px-6 pt-4 pb-16">
          <SectionHeader
            eyebrow="Third-party infrastructure"
            dot="rgba(28,22,46,0.45)"
            title="Open-source platforms evaluated, not authored"
            blurb="Listed separately and explicitly: these are open-source codebases written by other people, assessed as a possible foundation for a clinic booking product."
          />
          <div className="mt-6">
            {INFRASTRUCTURE.map((p) => (
              <ProjectRow key={p.slug} p={p} />
            ))}
          </div>
        </section>

        <FooterCTA />
      </main>
      <SiteFooter />
    </div>
  )
}
