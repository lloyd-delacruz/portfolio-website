'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Search, BookOpen, Clock, ChevronRight, Bookmark } from 'lucide-react'
import { HomeNav } from '@/components/home/HomeNav'
import { SiteFooter } from '@/components/home/SiteFooter'
import { FooterCTA } from '@/components/home/FooterCTA'
import { cn } from '@/lib/utils'
import type { BlogPost } from '@/lib/blog'

type SortMode = 'latest' | 'topic'

interface BlogIndexClientProps {
  initialPosts: BlogPost[]
  initialCategories: Array<{ id: string; label: string; count: number }>
}

/* ─── photo + palette maps ──────────────────────────────────────────── */

// Unsplash photo IDs (free license). Looked up to match each essay's topic.
// Falls back to the gradient wash if the network photo fails to load.
const PHOTO_BY_SLUG: Record<string, string> = {
  'one-year-of-mcp-what-the-standard-got-right':           '1518770660439-4636190af475', // circuit board
  'calmer-interfaces-fewer-clicks-more-care':              '1486312338219-ce68d2c6f44d', // minimal laptop
  'sepsis-early-warning-vital-sign-streams':               '1576091160399-112ba8d25d1d', // medical / stethoscope
  'prompting-like-an-engineer-ten-patterns':               '1517842645767-c639042777db', // paper notebook
  'ambient-scribes-90-days-voice-first-ehr':               '1538108149393-fbbd81895907', // hospital corridor
  'agent-stack-how-i-wire-claude-cursor-mcp':              '1517694712202-14dd9538aa97', // keyboard close
  'data-science-healthcare-analytics':                     '1551288049-bebda4e38f71', // analytics dashboard
  'coding-with-ai-how-llms-are-reshaping-software-development': '1555066931-4365d14bab8c', // code editor
  'healthcare-ai-revolution-2025':                         '1581090464777-f3220bbe1b8b', // lab science
  'cerner-implementation-vch-transforming-healthcare-through-data': '1551434678-e076c223a692', // team
  'understanding-model-context-protocol-future-ai-integration': '1620712943543-bcc4688e7485', // AI/network
  'my-journey-into-software-development-and-data-analytics': '1531746790731-6c087fecd65a', // laptop coding
}

const photoUrl = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`

const ACCENTS = ['var(--plum)', 'var(--blue)', 'var(--green)', 'var(--coral)']
const WASHES = [
  'linear-gradient(135deg,#f3effe,#fbf5fe)',
  'linear-gradient(135deg,#eef4fe,#f5f8fe)',
  'linear-gradient(135deg,#ecfdf4,#f4fbf7)',
  'linear-gradient(135deg,#fef0ee,#fdf6f5)',
]

function paletteIndex(key: string) {
  let h = 0
  for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) | 0
  return Math.abs(h) % ACCENTS.length
}

const monthYear = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })

const longDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

const prettyCategory = (id: string) =>
  id.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())

/* ─── tiny presentational atoms ─────────────────────────────────────── */

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-plum">{children}</span>
)

const ScribbleUnderline = () => (
  <svg
    aria-hidden
    viewBox="0 0 220 14"
    className="mt-1 h-3 w-[180px]"
    preserveAspectRatio="none"
  >
    <path
      d="M2 9 C 40 2, 80 12, 120 6 S 200 10, 218 4"
      fill="none"
      stroke="var(--plum)"
      strokeWidth="2.2"
      strokeLinecap="round"
      opacity="0.55"
    />
  </svg>
)

const PaperClip = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 40 56" className={className} aria-hidden>
    <path
      d="M20 4c-6 0-11 5-11 11v25c0 5 4 9 9 9s9-4 9-9V16c0-3-2-5-5-5s-5 2-5 5v22"
      fill="none"
      stroke="var(--plum)"
      strokeWidth="2.5"
      strokeLinecap="round"
      opacity="0.7"
    />
  </svg>
)

const WaveDivider = () => (
  <svg
    aria-hidden
    viewBox="0 0 1180 22"
    className="my-12 h-3 w-full"
    preserveAspectRatio="none"
  >
    <path
      d="M0 11 Q 50 0, 100 11 T 200 11 T 300 11 T 400 11 T 500 11 T 600 11 T 700 11 T 800 11 T 900 11 T 1000 11 T 1100 11 T 1180 11"
      fill="none"
      stroke="rgba(28,22,46,0.14)"
      strokeWidth="1.5"
    />
  </svg>
)

/* ─── photo block (with gradient fallback if the URL fails) ─────────── */

function PhotoBlock({
  slug,
  className,
  width = 1200,
}: {
  slug: string
  className?: string
  width?: number
}) {
  const id = PHOTO_BY_SLUG[slug]
  const wash = WASHES[paletteIndex(slug)]
  const [failed, setFailed] = useState(false)

  if (!id || failed) {
    return <div className={cn('h-full w-full', className)} style={{ background: wash }} />
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={photoUrl(id, width)}
      alt=""
      onError={() => setFailed(true)}
      className={cn('h-full w-full object-cover', className)}
      loading="lazy"
    />
  )
}

/* ─── page ──────────────────────────────────────────────────────────── */

const BlogIndexClient = ({ initialPosts, initialCategories }: BlogIndexClientProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    () => initialCategories[0]?.id ?? 'all'
  )
  const [searchTerm, setSearchTerm] = useState('')
  const [sortMode, setSortMode] = useState<SortMode>('latest')

  const sortedAll = useMemo(
    () =>
      [...initialPosts].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      ),
    [initialPosts]
  )

  const featured = sortedAll[0]
  const recent = sortedAll.slice(1, 4)

  const visiblePosts = useMemo(() => {
    const term = searchTerm.trim().toLowerCase()
    const filtered = sortedAll.filter((post) => {
      const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory
      if (!term) return matchesCategory
      const matchesSearch =
        post.title.toLowerCase().includes(term) ||
        post.excerpt.toLowerCase().includes(term) ||
        post.tags.some((tag) => tag.toLowerCase().includes(term))
      return matchesCategory && matchesSearch
    })
    if (sortMode === 'latest') return filtered
    return [...filtered].sort((a, b) => {
      if (a.category !== b.category) return a.category.localeCompare(b.category)
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
  }, [sortedAll, selectedCategory, searchTerm, sortMode])

  const clearFilters = () => {
    setSelectedCategory('all')
    setSearchTerm('')
  }

  const stats = useMemo(() => {
    const essays = initialPosts.length
    const topics = new Set(initialPosts.map((p) => p.category)).size
    const minutes = initialPosts.reduce<number>((sum, p) => {
      const m = parseInt(p.readTime, 10)
      return sum + (Number.isFinite(m) ? m : 0)
    }, 0)
    const updated = featured ? monthYear(featured.date) : '—'
    return { essays, topics, minutes, updated }
  }, [initialPosts, featured])

  // group posts by category for the "shelves" section
  const shelves = useMemo(() => {
    const map = new Map<string, BlogPost[]>()
    sortedAll.forEach((post) => {
      const list = map.get(post.category) ?? []
      list.push(post)
      map.set(post.category, list)
    })
    return Array.from(map.entries())
      .map(([id, posts]) => ({ id, posts: posts.slice(0, 4) }))
      .sort((a, b) => b.posts.length - a.posts.length)
  }, [sortedAll])

  return (
    <div className="home2 min-h-screen">
      <HomeNav active="Thoughts" />
      <main>
        {/* ── header ────────────────────────────────────────────────── */}
        <section className="mx-auto max-w-[1180px] px-6 pt-16 pb-8">
          <div className="flex items-center gap-2">
            <Eyebrow>Field notes · Issue {stats.essays.toString().padStart(2, '0')}</Eyebrow>
            <span className="h-px flex-1 bg-[var(--line)]" />
            <span className="text-[11px] text-ink-muted">Updated {stats.updated}</span>
          </div>

          <h1 className="mt-4 max-w-3xl font-display text-5xl font-extrabold leading-[1.05] text-ink sm:text-6xl">
            Notes from the workflow.
          </h1>
          <ScribbleUnderline />

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg">
            Short essays on operational AI, healthcare workflows, and the systems around the model —
            written from inside the shift, not above it.
          </p>

          {/* stat ribbon */}
          <div className="mt-8 grid grid-cols-3 gap-3 sm:max-w-xl">
            <StatChip label="Essays" value={stats.essays.toString()} />
            <StatChip label="Topics" value={stats.topics.toString()} />
            <StatChip label="Reading" value={`~${stats.minutes} min`} />
          </div>
        </section>

        {/* ── featured spotlight ────────────────────────────────────── */}
        {featured && (
          <section className="mx-auto max-w-[1180px] px-6">
            <div className="flex items-baseline justify-between">
              <Eyebrow>This issue&apos;s lead</Eyebrow>
              <span className="text-[11px] text-ink-muted">{longDate(featured.date)}</span>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="relative mt-4 overflow-hidden rounded-3xl bg-white ghair"
            >
              <PaperClip className="absolute -top-2 right-10 z-10 h-12 w-8 rotate-[14deg]" />
              <Link
                href={`/blog/${featured.slug}`}
                className="group grid grid-cols-1 lg:grid-cols-[1.15fr_1fr]"
              >
                {/* photo */}
                <div className="relative h-[300px] sm:h-[360px] lg:h-[460px] overflow-hidden">
                  <PhotoBlock slug={featured.slug} className="transition-transform duration-700 group-hover:scale-[1.03]" width={1600} />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        'linear-gradient(180deg, rgba(31,26,46,0) 50%, rgba(31,26,46,0.18) 100%)',
                    }}
                  />
                  <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-plum backdrop-blur">
                    <Bookmark size={11} /> Featured
                  </span>
                </div>

                {/* meta */}
                <div className="flex flex-col justify-between gap-6 p-7 sm:p-9 lg:p-10">
                  <div>
                    <Eyebrow>{prettyCategory(featured.category)}</Eyebrow>
                    <h2 className="mt-3 font-display text-2xl font-extrabold leading-snug text-ink transition-colors group-hover:text-plum sm:text-3xl">
                      {featured.title}
                    </h2>
                    <p className="mt-4 text-[15px] leading-relaxed text-ink-soft line-clamp-4">
                      {featured.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-3 text-[12px] text-ink-muted">
                      <span className="inline-flex items-center gap-1.5">
                        <BookOpen size={13} /> {featured.author.split(' ')[0]}
                      </span>
                      <span aria-hidden>·</span>
                      <span className="inline-flex items-center gap-1.5">
                        <Clock size={13} /> {featured.readTime}
                      </span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-plum">
                      Read essay
                      <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          </section>
        )}

        {/* ── recently filed (3 small rail cards) ───────────────────── */}
        {recent.length > 0 && (
          <section className="mx-auto max-w-[1180px] px-6 pt-12">
            <div className="flex items-baseline justify-between">
              <Eyebrow>Recently filed</Eyebrow>
              <span className="text-[11px] text-ink-muted">Last three weeks</span>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {recent.map((post) => (
                <RailCard key={post.slug} post={post} />
              ))}
            </div>
          </section>
        )}

        <WaveDivider />

        {/* ── filter strip ──────────────────────────────────────────── */}
        <section className="mx-auto max-w-[1180px] px-6">
          <div className="flex flex-col gap-4 rounded-2xl bg-white p-4 ghair md:flex-row md:items-center md:justify-between">
            <label className="relative flex w-full items-center md:w-72">
              <Search className="pointer-events-none absolute left-3 h-4 w-4 text-ink-muted" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search the index"
                aria-label="Search the writing index"
                className="w-full rounded-xl border border-[var(--line)] bg-[var(--cream-2)] py-2 pl-9 pr-3 text-sm text-ink placeholder:text-ink-muted transition-colors focus:border-plum focus:outline-none focus:ring-2 focus:ring-[var(--plum-soft)]"
              />
            </label>

            <ul className="flex flex-wrap items-center gap-2">
              {initialCategories.map((category) => {
                const active = selectedCategory === category.id
                return (
                  <li key={category.id}>
                    <button
                      type="button"
                      onClick={() => setSelectedCategory(category.id)}
                      aria-pressed={active}
                      className={cn(
                        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[12px] font-semibold transition-colors',
                        active
                          ? 'border-transparent bg-[var(--plum-soft)] text-plum'
                          : 'border-[var(--line)] bg-white text-ink-soft hover:text-ink hover:border-[var(--line-strong)]'
                      )}
                    >
                      <span>{category.label}</span>
                      <span className={active ? 'text-plum/70' : 'text-ink-muted'}>
                        {category.count}
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>

            <div className="flex items-center gap-1 rounded-full border border-[var(--line)] bg-[var(--cream-2)] p-1">
              {(['latest', 'topic'] as SortMode[]).map((mode) => {
                const active = sortMode === mode
                return (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setSortMode(mode)}
                    aria-pressed={active}
                    className={cn(
                      'rounded-full px-3 py-1 text-[12px] font-semibold transition-colors',
                      active ? 'bg-white text-ink soft-shadow-sm' : 'text-ink-muted hover:text-ink'
                    )}
                  >
                    {mode === 'latest' ? 'Latest' : 'By topic'}
                  </button>
                )
              })}
            </div>
          </div>
        </section>

        {/* ── main grid ─────────────────────────────────────────────── */}
        <section className="mx-auto max-w-[1180px] px-6 pt-10 pb-4">
          <div className="mb-6 flex items-baseline justify-between">
            <Eyebrow>Selected writing</Eyebrow>
            <span className="text-[13px] text-ink-muted">
              {visiblePosts.length} / {sortedAll.length}
            </span>
          </div>

          <AnimatePresence mode="wait" initial={false}>
            {visiblePosts.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="rounded-2xl bg-white px-6 py-16 text-center ghair"
              >
                <Eyebrow>No entries match</Eyebrow>
                <p className="mt-3 text-base text-ink-soft">
                  Try a different search term or clear the active filters.
                </p>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-[var(--line)] bg-white px-4 py-1.5 text-[12px] font-semibold text-ink-soft transition-colors hover:text-ink hover:border-[var(--line-strong)]"
                >
                  Clear filters
                </button>
              </motion.div>
            ) : (
              <motion.ul
                key="grid"
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
              >
                <AnimatePresence mode="popLayout">
                  {visiblePosts.map((post, idx) => (
                    <EssayCard key={post.slug} post={post} index={idx} />
                  ))}
                </AnimatePresence>
              </motion.ul>
            )}
          </AnimatePresence>
        </section>

        <WaveDivider />

        {/* ── topical shelves ───────────────────────────────────────── */}
        <section className="mx-auto max-w-[1180px] px-6 pb-8">
          <div className="flex items-baseline justify-between">
            <Eyebrow>By topic</Eyebrow>
            <span className="text-[11px] text-ink-muted">Latest in each shelf</span>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
            {shelves.map(({ id, posts }) => (
              <Shelf key={id} categoryId={id} posts={posts} />
            ))}
          </div>
        </section>

        <FooterCTA />
      </main>
      <SiteFooter />
    </div>
  )
}

/* ─── sub-components ────────────────────────────────────────────────── */

function StatChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white px-4 py-3 ghair">
      <div className="font-display text-xl font-extrabold text-ink">{value}</div>
      <div className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
        {label}
      </div>
    </div>
  )
}

function RailCard({ post }: { post: BlogPost }) {
  const accent = ACCENTS[paletteIndex(post.category)]
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="lift group grid grid-cols-[88px_1fr] overflow-hidden rounded-2xl bg-white ghair"
    >
      <div className="relative h-full min-h-[88px] overflow-hidden">
        <PhotoBlock slug={post.slug} width={300} />
        <span
          className="absolute left-2 top-2 inline-block h-2 w-2 rounded-full"
          style={{ background: accent }}
        />
      </div>
      <div className="flex flex-col justify-center gap-1 p-3">
        <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
          {prettyCategory(post.category)} · {post.readTime}
        </span>
        <h3 className="font-display text-[14px] font-bold leading-snug text-ink line-clamp-2 transition-colors group-hover:text-plum">
          {post.title}
        </h3>
      </div>
    </Link>
  )
}

type EssayCardProps = { post: BlogPost; index: number }

function EssayCard({ post, index }: EssayCardProps) {
  const pi = paletteIndex(post.category)
  const accent = ACCENTS[pi]
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="list-none"
    >
      <Link
        href={`/blog/${post.slug}`}
        aria-label={`${post.title} — ${post.readTime}`}
        className="lift group flex h-full flex-col overflow-hidden rounded-2xl bg-white ghair"
      >
        <div className="relative h-44 overflow-hidden">
          <PhotoBlock slug={post.slug} width={800} />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(31,26,46,0) 55%, rgba(31,26,46,0.22) 100%)',
            }}
          />
          <span
            className="absolute -right-2 -top-3 font-display text-[72px] font-extrabold leading-none"
            style={{ color: accent, opacity: 0.18 }}
          >
            {(index + 1).toString().padStart(2, '0')}
          </span>
          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-ink-soft backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
            {prettyCategory(post.category)}
          </span>
          <span className="absolute bottom-3 left-3 rounded-full bg-white/85 px-2 py-0.5 text-[10px] font-medium text-ink-soft backdrop-blur">
            {post.readTime}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <h2 className="font-display text-[16px] font-bold leading-snug text-ink line-clamp-2 transition-colors group-hover:text-plum">
            {post.title}
          </h2>
          <p className="mt-2 flex-1 text-[13px] leading-relaxed text-ink-soft line-clamp-2">
            {post.excerpt}
          </p>
          <div className="mt-4 flex items-center justify-between gap-2 pt-3 ghair-t">
            <span className="text-[11px] leading-tight text-ink-muted">
              {longDate(post.date)}
              {post.tags[0] ? ` · ${post.tags[0]}` : ''}
            </span>
            <ArrowUpRight
              size={15}
              style={{ color: accent }}
              className="shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </div>
        </div>
      </Link>
    </motion.li>
  )
}

function Shelf({ categoryId, posts }: { categoryId: string; posts: BlogPost[] }) {
  const accent = ACCENTS[paletteIndex(categoryId)]
  return (
    <div className="overflow-hidden rounded-2xl bg-white ghair">
      <div
        className="flex items-center justify-between gap-3 px-5 py-3"
        style={{ background: WASHES[paletteIndex(categoryId)] }}
      >
        <div className="inline-flex items-center gap-2">
          <span className="h-2 w-2 rounded-full" style={{ background: accent }} />
          <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-ink">
            {prettyCategory(categoryId)}
          </span>
        </div>
        <span className="text-[11px] text-ink-muted">{posts.length} essays</span>
      </div>

      <ul className="divide-y divide-[var(--line)]">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="group flex items-center justify-between gap-4 px-5 py-3 transition-colors hover:bg-[var(--cream-2)]"
            >
              <div className="min-w-0">
                <h3 className="truncate font-display text-[14px] font-semibold text-ink transition-colors group-hover:text-plum">
                  {post.title}
                </h3>
                <p className="mt-0.5 truncate text-[11px] text-ink-muted">
                  {longDate(post.date)} · {post.readTime}
                </p>
              </div>
              <ChevronRight size={14} className="shrink-0 text-ink-muted transition-transform group-hover:translate-x-0.5 group-hover:text-plum" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default BlogIndexClient
