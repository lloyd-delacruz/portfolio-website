// frontend/src/components/home/FeaturedWork.tsx
import Link from 'next/link'
import { ArrowRight, QrCode, Network, Wallet, Dumbbell } from 'lucide-react'

type Variant = 'states' | 'topology' | 'finance' | 'mobile'

const PROJECTS: {
  badge: string
  TagIcon: typeof QrCode
  variant: Variant
  accent: string
  wash: string
  title: string
  body: string
  stack: string
  href: string
}[] = [
  {
    badge: 'HEALTHCARE OPERATIONS',
    TagIcon: QrCode,
    variant: 'states',
    accent: 'var(--plum)',
    wash: 'linear-gradient(135deg,#f3effe,#fbf5fe)',
    title: 'Multi-Site Wheelchair Tracking System',
    body: 'Operational tracking platform supporting 800+ wheelchairs and clinical assets across multiple hospital sites — QR workflows, utilization tracking, lifecycle coordination, and chain-of-custody visibility.',
    stack: 'Microsoft Lists, QR Systems, Power Platform, React, TypeScript',
    href: '/work/wheelchair-tracking',
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
  },
  {
    badge: 'AI FITNESS SYSTEMS',
    TagIcon: Dumbbell,
    variant: 'mobile',
    accent: 'var(--coral)',
    wash: 'linear-gradient(135deg,#fef0ee,#fdf6f5)',
    title: 'Apex Protocol',
    body: 'AI-native fitness and coaching platform combining training workflows, analytics, personalized programming, and operational athlete tracking systems.',
    stack: 'React Native, Expo, Node.js, PostgreSQL, OpenAI',
    href: '/work/apex-protocol',
  },
]

const SOFT = 'rgba(28,22,46,0.08)'

function Bar({ w, c = SOFT }: { w: string; c?: string }) {
  return <div className="h-1.5 rounded-full" style={{ width: w, background: c }} />
}

function Window({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-1 flex-col gap-2 rounded-md bg-white/85 p-2.5">
      <div className="flex items-center gap-1">
        <span className="h-1.5 w-1.5 rounded-full bg-black/15" />
        <span className="h-1.5 w-1.5 rounded-full bg-black/15" />
        <span className="h-1.5 w-1.5 rounded-full bg-black/15" />
      </div>
      {children}
    </div>
  )
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
      {/* mini sidebar */}
      <div className="hidden w-9 shrink-0 flex-col gap-1.5 rounded-md bg-white/70 p-2 sm:flex">
        <div className="h-2 w-2 rounded-full" style={{ background: accent }} />
        <Bar w="100%" />
        <Bar w="70%" />
        <Bar w="85%" />
      </div>

      <Window>
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

export function FeaturedWork() {
  return (
    <section className="mx-auto max-w-[1180px] px-6 py-12">
      <div className="flex items-end justify-between">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-plum">Featured work</p>
        <Link href="/work" className="group inline-flex items-center gap-1.5 text-sm font-semibold text-plum">
          View all projects
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {PROJECTS.map((p) => (
          <Link
            key={p.title}
            href={p.href}
            className="lift group flex flex-col overflow-hidden rounded-2xl bg-white ghair"
          >
            <div className="relative h-40 overflow-hidden" style={{ background: p.wash }}>
              <PreviewMock variant={p.variant} accent={p.accent} />
              <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/85 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-ink-soft backdrop-blur">
                <p.TagIcon size={11} style={{ color: p.accent }} />
                {p.badge}
              </span>
            </div>

            <div className="flex flex-1 flex-col p-5">
              <h3 className="font-display text-[15px] font-bold leading-snug text-ink">{p.title}</h3>
              <p className="mt-2 flex-1 text-[13px] leading-relaxed text-ink-soft">{p.body}</p>
              <div className="mt-4 flex items-center justify-between gap-2 pt-3 ghair-t">
                <span className="text-[11px] leading-tight text-ink-muted">{p.stack}</span>
                <ArrowRight size={15} style={{ color: p.accent }} className="shrink-0 transition-transform group-hover:translate-x-0.5" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
