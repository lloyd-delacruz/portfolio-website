'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Search } from 'lucide-react'
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

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-plum">{children}</span>
)

const BlogIndexClient = ({ initialPosts, initialCategories }: BlogIndexClientProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    () => initialCategories[0]?.id ?? 'all'
  )
  const [searchTerm, setSearchTerm] = useState('')
  const [sortMode, setSortMode] = useState<SortMode>('latest')

  const visiblePosts = useMemo(() => {
    const term = searchTerm.trim().toLowerCase()
    const filtered = initialPosts.filter((post) => {
      const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory
      if (!term) return matchesCategory
      const matchesSearch =
        post.title.toLowerCase().includes(term) ||
        post.excerpt.toLowerCase().includes(term) ||
        post.tags.some((tag) => tag.toLowerCase().includes(term))
      return matchesCategory && matchesSearch
    })

    const byDateDesc = (a: BlogPost, b: BlogPost) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()

    if (sortMode === 'latest') {
      return [...filtered].sort(byDateDesc)
    }
    return [...filtered].sort((a, b) => {
      if (a.category !== b.category) return a.category.localeCompare(b.category)
      return byDateDesc(a, b)
    })
  }, [initialPosts, selectedCategory, searchTerm, sortMode])

  const clearFilters = () => {
    setSelectedCategory('all')
    setSearchTerm('')
  }

  const stats = useMemo(() => {
    const essays = initialPosts.length
    const topics = new Set(initialPosts.map((p) => p.category)).size
    const latest = initialPosts.reduce<number>(
      (max, p) => Math.max(max, new Date(p.date).getTime()),
      0
    )
    const updated = latest
      ? new Date(latest).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
      : '—'
    return { essays, topics, updated }
  }, [initialPosts])

  return (
    <div className="home2 min-h-screen">
      <HomeNav active="Thoughts" />
      <main>
        {/* Header */}
        <section className="mx-auto max-w-[1180px] px-6 pt-16 pb-10">
          <Eyebrow>Field notes · writing index</Eyebrow>
          <h1 className="mt-3 max-w-2xl font-display text-4xl font-extrabold leading-tight text-ink sm:text-5xl">
            Notes from the workflow.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft">
            Short essays on operational AI, healthcare workflows, and the systems around the model —
            written from inside the shift, not above it.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] text-ink-muted">
            <span>{stats.essays} essays</span>
            <span aria-hidden>·</span>
            <span>{stats.topics} topics</span>
            <span aria-hidden>·</span>
            <span>updated {stats.updated}</span>
          </div>
        </section>

        {/* Controls */}
        <section className="mx-auto max-w-[1180px] px-6">
          <div className="flex flex-col gap-4 rounded-2xl bg-white p-4 ghair soft-shadow-sm md:flex-row md:items-center md:justify-between">
            {/* Search */}
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

            {/* Category chips */}
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

            {/* Sort toggle */}
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

        {/* Card grid */}
        <section className="mx-auto max-w-[1180px] px-6 py-12">
          <div className="mb-6 flex items-baseline justify-between">
            <Eyebrow>Selected writing</Eyebrow>
            <span className="text-[13px] text-ink-muted">
              {visiblePosts.length} / {initialPosts.length}
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
        <FooterCTA />
      </main>
      <SiteFooter />
    </div>
  )
}

type EssayCardProps = { post: BlogPost; index: number }

function EssayCard({ post, index }: EssayCardProps) {
  const pi = paletteIndex(post.category)
  const accent = ACCENTS[pi]
  const wash = WASHES[pi]
  const dateLabel = new Date(post.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

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
        {/* Wash header */}
        <div className="relative h-32 overflow-hidden" style={{ background: wash }}>
          <span
            className="absolute -right-2 -top-3 font-display text-[88px] font-extrabold leading-none"
            style={{ color: accent, opacity: 0.14 }}
          >
            {(index + 1).toString().padStart(2, '0')}
          </span>
          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/85 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-ink-soft backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
            {post.category.replace(/-/g, ' ')}
          </span>
          <span className="absolute bottom-3 left-3 text-[11px] font-medium text-ink-muted">{post.readTime}</span>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <h2 className="font-display text-[16px] font-bold leading-snug text-ink line-clamp-2 transition-colors group-hover:text-plum">
            {post.title}
          </h2>
          <p className="mt-2 flex-1 text-[13px] leading-relaxed text-ink-soft line-clamp-2">{post.excerpt}</p>
          <div className="mt-4 flex items-center justify-between gap-2 pt-3 ghair-t">
            <span className="text-[11px] leading-tight text-ink-muted">
              {dateLabel}
              {post.tags[0] ? ` · ${post.tags[0]}` : ''}
            </span>
            <ArrowUpRight size={15} style={{ color: accent }} className="shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>
      </Link>
    </motion.li>
  )
}

export default BlogIndexClient
