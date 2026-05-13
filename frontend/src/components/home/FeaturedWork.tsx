// frontend/src/components/home/FeaturedWork.tsx
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowRight,
  QrCode,
  Network,
  Wallet,
  LineChart,
  Stethoscope,
  Sparkles,
  BookOpen,
  PlayCircle,
} from 'lucide-react'
import { AnchorCase } from './AnchorCase'
import { Window } from './Window'

/** Slug of the project promoted to the homepage anchor band (excluded from the grid). */
export const ANCHOR_CASE_HREF = '/work/wheelchair-tracking'

type Variant = 'states' | 'topology' | 'finance' | 'mobile' | 'forecast' | 'triage'

export type ProjectStatus = 'production' | 'prototype' | 'concept'
export type ProjectCapability = 'ai-assisted' | 'case-study' | 'demo'

export type Project = {
  badge: string
  TagIcon: typeof QrCode
  variant: Variant
  accent: string
  wash: string
  title: string
  body: string
  stack: string
  href: string
  status: ProjectStatus
  capabilities: ProjectCapability[]
  /** Short, concrete proof point shown on flagship/featured cards. */
  metric?: { value: string; label: string }
  /** Real product screenshot shown in window chrome in place of the abstract PreviewMock. */
  screenshot?: { src: string; alt: string }
}

export const PROJECTS: Project[] = [
  {
    badge: 'HEALTHCARE OPERATIONS',
    TagIcon: QrCode,
    variant: 'states',
    accent: 'var(--plum)',
    wash: 'linear-gradient(135deg,#f3effe,#fbf5fe)',
    title: 'Multi-Site Wheelchair Tracking System',
    body: 'Operational tracking platform supporting 800+ wheelchairs and clinical assets across four hospital sites — QR workflows, utilization tracking, lifecycle coordination, and chain-of-custody visibility.',
    stack: 'Microsoft Lists, QR Systems, Power Platform, React, TypeScript',
    href: ANCHOR_CASE_HREF,
    status: 'production',
    capabilities: ['case-study'],
    metric: { value: '4 sites · 800+', label: 'assets in production' },
  },
  {
    badge: 'APPLIED AI / POPULATION HEALTH',
    TagIcon: LineChart,
    variant: 'forecast',
    accent: 'var(--plum)',
    wash: 'linear-gradient(135deg,#f3f0fb,#fbf7fe)',
    title: 'Population-Health Intelligence Platform',
    body: 'An AI-native forecasting layer over WHO, World Bank, and IMF indicators. Calibrated life-expectancy projections with explainable feature attribution for ministry-of-health planners.',
    stack: 'TypeScript, ensemble forecasting, quantile regression, SHAP, isotonic calibration',
    href: '/work/population-health-intelligence',
    status: 'prototype',
    capabilities: ['ai-assisted', 'case-study', 'demo'],
    screenshot: { src: '/images/Life_Expectancy.png', alt: 'Life-expectancy forecasting dashboard' },
  },
  {
    badge: 'APPLIED AI / CLINICAL DECISION SUPPORT',
    TagIcon: Stethoscope,
    variant: 'triage',
    accent: 'var(--plum)',
    wash: 'linear-gradient(135deg,#f3f0fb,#fbf7fe)',
    title: 'Clinical Risk Engine',
    body: 'A calibrated inference system over biopsy feature vectors. Returns malignancy probability, CI band, and morphology-level attribution for clinician-in-the-loop triage.',
    stack: 'TypeScript, ensemble classifier, isotonic calibration, SHAP, ambiguity-flag triage policy',
    href: '/work/clinical-risk-engine',
    status: 'prototype',
    capabilities: ['ai-assisted', 'case-study', 'demo'],
    screenshot: { src: '/images/Heart_Prediction.png', alt: 'Clinical risk prediction interface' },
  },
  {
    badge: 'HEALTHCARE SYSTEMS',
    TagIcon: Network,
    variant: 'topology',
    accent: 'var(--blue)',
    wash: 'linear-gradient(135deg,#eef4fe,#f5f8fe)',
    title: 'EquiTrackr',
    body: 'Modern healthcare equipment workflow platform for tracking equipment states, operational workflows, maintenance coordination, and hospital logistics systems.',
    stack: 'Next.js, TypeScript, Tailwind, PostgreSQL, Prisma',
    href: '/work/equitrackr',
    status: 'prototype',
    capabilities: ['case-study', 'demo'],
  },
  {
    badge: 'FINTECH & PLANNING',
    TagIcon: Wallet,
    variant: 'finance',
    accent: 'var(--green)',
    wash: 'linear-gradient(135deg,#ecfdf4,#f4fbf7)',
    title: 'SpendWise',
    body: 'AI-native budgeting and financial planning platform focused on operational budgeting, transaction tracking, onboarding flows, and intelligent financial planning.',
    stack: 'React Native, Expo, Node.js, PostgreSQL, Prisma',
    href: '/work/spendwise',
    status: 'prototype',
    capabilities: ['case-study', 'demo'],
  },
]

const SOFT = 'rgba(28,22,46,0.08)'

function Bar({ w, c = SOFT }: { w: string; c?: string }) {
  return <div className="h-1.5 rounded-full" style={{ width: w, background: c }} />
}

function QrGlyph({ accent }: { accent: string }) {
  const cells = [1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 1]
  return (
    <div className="grid grid-cols-4 gap-[2px] rounded-[3px] bg-white/80 p-1">
      {cells.map((on, i) => (
        <span key={i} className="h-1.5 w-1.5 rounded-[1px]" style={{ background: on ? accent : 'transparent' }} />
      ))}
    </div>
  )
}

function PreviewMock({ variant, accent }: { variant: Variant; accent: string }) {
  return (
    <div className="absolute inset-0 flex gap-2 p-3">
      {/* mini sidebar — all variants */}
      <div className="hidden w-9 shrink-0 flex-col gap-1.5 rounded-md bg-white/70 p-2 sm:flex">
        <div className="h-2 w-2 rounded-full" style={{ background: accent }} />
        <Bar w="100%" />
        <Bar w="70%" />
        <Bar w="85%" />
      </div>

      <Window>
        {variant === 'forecast' && (
          <div className="flex flex-1 flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-semibold tracking-[0.12em] text-ink-muted">FORECAST · BGD</span>
              <span className="text-[10px] font-semibold" style={{ color: accent }}>72.4y ±1.8</span>
            </div>
            <div className="flex flex-1 items-end gap-[3px]">
              {[3, 4, 5, 6, 7, 8, 9, 10, 11, 10, 11, 12].map((h, i) => (
                <div key={i} className="flex-1 rounded-sm" style={{ height: `${h * 7}%`, background: SOFT }} />
              ))}
              <div className="ml-0.5 flex-1 rounded-sm" style={{ height: '88%', background: accent, opacity: 0.9 }} />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <span className="text-[8px] tracking-[0.06em] text-ink-muted">SCHOOLING</span>
                <Bar w="62%" c={accent} />
              </div>
              <div className="flex items-center gap-1">
                <span className="text-[8px] tracking-[0.06em] text-ink-muted">INCOME COMP</span>
                <Bar w="40%" />
              </div>
            </div>
          </div>
        )}

        {variant === 'triage' && (
          <div className="flex flex-1 flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-semibold tracking-[0.12em] text-ink-muted">p(MALIG)</span>
              <span className="text-[10px] font-semibold" style={{ color: accent }}>0.83</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full" style={{ background: SOFT }}>
              <div className="h-full rounded-full" style={{ width: '83%', background: accent }} />
            </div>
            <div className="text-[8px] tracking-[0.06em] text-ink-muted">CI 0.77 – 0.88</div>
            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <span className="text-[8px] tracking-[0.06em] text-ink-muted">CONCAVE PTS</span>
                <Bar w="78%" c={accent} />
              </div>
              <div className="flex items-center gap-1">
                <span className="text-[8px] tracking-[0.06em] text-ink-muted">PERIMETER</span>
                <Bar w="54%" c={accent} />
              </div>
            </div>
            <div className="mt-auto flex items-center gap-1.5">
              <span className="grid h-3 w-3 place-items-center rounded-sm" style={{ background: 'rgba(245,158,11,0.18)' }}>
                <span className="h-1 w-1 rounded-[1px]" style={{ background: 'var(--amber)' }} />
              </span>
              <span className="text-[8px] tracking-[0.1em] text-ink-muted">AMBIGUITY FLAG</span>
            </div>
          </div>
        )}

        {variant === 'states' && (
          <div className="relative flex flex-1 items-center">
            <div className="flex w-full items-center justify-between px-1">
              {['rounded-md', 'rounded-full', 'rounded-full', 'rounded-md'].map((shape, i) => (
                <div key={i} className="flex items-center">
                  <span
                    className={`h-5 w-5 ${shape}`}
                    style={{ background: i === 3 ? accent : SOFT, opacity: i === 3 ? 0.85 : 1 }}
                  />
                  {i < 3 && (
                    <svg width="20" height="6" viewBox="0 0 20 6" className="mx-[2px]" aria-hidden>
                      <path d="M0 3 H16 M13 1 L17 3 L13 5" stroke={accent} strokeOpacity="0.45" strokeWidth="1.2" fill="none" />
                    </svg>
                  )}
                </div>
              ))}
            </div>
            <div className="absolute -bottom-1 left-0">
              <QrGlyph accent={accent} />
            </div>
          </div>
        )}

        {variant === 'topology' && (
          <div className="relative flex flex-1 items-center justify-center">
            <span className="absolute left-1 top-2 h-4 w-7 rounded" style={{ background: SOFT }} />
            <span className="absolute bottom-2 left-1 h-4 w-7 rounded" style={{ background: SOFT }} />
            <span className="absolute right-1 top-2 h-4 w-7 rounded" style={{ background: SOFT }} />
            <span className="absolute bottom-2 right-1 h-4 w-7 rounded" style={{ background: SOFT }} />
            <span className="h-7 w-7 rounded-lg" style={{ background: accent, opacity: 0.85 }} />
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 56" fill="none" aria-hidden>
              <path
                d="M50 28 L18 14 M50 28 L82 14 M50 28 L18 44 M50 28 L82 44"
                stroke={accent}
                strokeOpacity="0.4"
                strokeWidth="1.3"
                strokeDasharray="2 3"
              />
            </svg>
          </div>
        )}

        {variant === 'finance' && (
          <div className="flex flex-1 gap-2">
            <div className="flex flex-1 flex-col justify-between">
              <div className="rounded-md p-1.5" style={{ background: 'rgba(16,185,129,0.10)' }}>
                <Bar w="55%" c={accent} />
                <div className="mt-1 flex items-end gap-1">
                  {[50, 75, 40, 90, 60].map((h, i) => (
                    <div key={i} className="flex-1 rounded-sm" style={{ height: 14 * (h / 100) + 4, background: accent, opacity: 0.3 + (i % 2) * 0.3 }} />
                  ))}
                </div>
              </div>
              <div className="space-y-1">
                <Bar w="80%" />
                <Bar w="65%" />
                <Bar w="72%" />
              </div>
            </div>
            <div className="grid w-10 shrink-0 place-items-center">
              <div className="h-9 w-9 rounded-full" style={{ background: `conic-gradient(${accent} 0 62%, ${SOFT} 62% 100%)` }}>
                <div className="m-[6px] h-[21px] w-[21px] rounded-full bg-white" />
              </div>
            </div>
          </div>
        )}

        {variant === 'mobile' && (
          <div className="flex flex-1 items-center justify-center gap-2">
            <div className="flex h-full w-12 shrink-0 flex-col items-center gap-1.5 rounded-lg bg-white p-1.5" style={{ border: `1px solid ${SOFT}` }}>
              <div className="h-1 w-3 rounded-full" style={{ background: SOFT }} />
              <div className="mt-0.5 h-6 w-6 rounded-full" style={{ background: `conic-gradient(${accent} 0 72%, ${SOFT} 72% 100%)` }}>
                <div className="m-1 h-4 w-4 rounded-full bg-white" />
              </div>
              <Bar w="80%" c={accent} />
              <Bar w="60%" />
            </div>
            <div className="flex flex-1 flex-col gap-1.5">
              <Bar w="70%" />
              <div className="flex items-end gap-1">
                {[40, 70, 55, 85, 50, 65].map((h, i) => (
                  <div key={i} className="flex-1 rounded-sm" style={{ height: 18 * (h / 100) + 4, background: accent, opacity: 0.25 + (i % 3) * 0.2 }} />
                ))}
              </div>
              <Bar w="55%" />
            </div>
          </div>
        )}
      </Window>
    </div>
  )
}

const STATUS_CFG: Record<ProjectStatus, { label: string; dot: string; tint: string }> = {
  production: { label: 'Production',  dot: 'var(--green)',           tint: 'rgba(16,185,129,0.10)' },
  prototype:  { label: 'Prototype',   dot: 'var(--amber)',           tint: 'rgba(245,158,11,0.10)' },
  concept:    { label: 'Concept',     dot: 'rgba(28,22,46,0.45)',    tint: 'rgba(28,22,46,0.06)' },
}

export function StatusPill({ status }: { status: ProjectStatus }) {
  const cfg = STATUS_CFG[status]
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2 py-[3px] text-[10px] font-semibold uppercase tracking-[0.1em] text-ink-soft"
      style={{ background: cfg.tint }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: cfg.dot }} />
      {cfg.label}
    </span>
  )
}

const CAPABILITY_CFG: Record<ProjectCapability, { label: string; Icon: typeof Sparkles }> = {
  'ai-assisted': { label: 'AI-Assisted',    Icon: Sparkles },
  'case-study':  { label: 'Case Study',     Icon: BookOpen },
  'demo':        { label: 'Demo Available', Icon: PlayCircle },
}

export function CapabilityPill({ kind }: { kind: ProjectCapability }) {
  const cfg = CAPABILITY_CFG[kind]
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-[3px] text-[10px] font-semibold uppercase tracking-[0.1em] text-ink-muted ghair">
      <cfg.Icon size={10} strokeWidth={2.2} />
      {cfg.label}
    </span>
  )
}

export function ProjectSignals({ p }: { p: Project }) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <StatusPill status={p.status} />
      {p.capabilities.map((c) => (
        <CapabilityPill key={c} kind={c} />
      ))}
    </div>
  )
}

export function WorkCard({ p }: { p: Project }) {
  return (
    <Link
      href={p.href}
      className="lift group flex flex-col overflow-hidden rounded-2xl bg-white ghair"
    >
      <div className="relative h-40 overflow-hidden" style={{ background: p.wash }}>
        {p.screenshot ? (
          <div className="absolute inset-0 flex gap-2 p-3">
            <Window>
              <div className="relative flex-1 overflow-hidden rounded">
                <Image
                  src={p.screenshot.src}
                  alt={p.screenshot.alt}
                  fill
                  sizes="(min-width: 1024px) 360px, 90vw"
                  className="object-cover object-top"
                  unoptimized
                />
              </div>
            </Window>
          </div>
        ) : (
          <PreviewMock variant={p.variant} accent={p.accent} />
        )}
        <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/85 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-ink-soft backdrop-blur">
          <p.TagIcon size={11} style={{ color: p.accent }} />
          {p.badge}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-[15px] font-bold leading-snug text-ink">{p.title}</h3>
        <div className="mt-2.5">
          <ProjectSignals p={p} />
        </div>
        <p className="mt-3 flex-1 text-[13px] leading-relaxed text-ink-soft">{p.body}</p>
        <div className="mt-4 flex items-center justify-between gap-2 pt-3 ghair-t">
          <span className="text-[11px] leading-tight text-ink-muted">{p.stack}</span>
          <ArrowRight size={15} style={{ color: p.accent }} className="shrink-0 transition-transform group-hover:translate-x-0.5" />
        </div>
      </div>
    </Link>
  )
}

export function FeaturedWork() {
  const gridProjects = PROJECTS.filter((p) => p.href !== ANCHOR_CASE_HREF)

  return (
    <section className="mx-auto max-w-[1180px] px-6 py-12">
      <div className="flex items-end justify-between">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-plum">Featured work</p>
        <Link href="/work" className="group inline-flex items-center gap-1.5 text-sm font-semibold text-plum">
          View all projects
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      <AnchorCase />

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {gridProjects.map((p) => (
          <WorkCard key={p.title} p={p} />
        ))}
      </div>
    </section>
  )
}
