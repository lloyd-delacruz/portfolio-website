'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Search } from 'lucide-react'
import { NavBar } from '@/components/home/NavBar'
import { MonoLabel } from '@/components/home/primitives'
import { PreviewCanvas, variantFromCategory } from '@/components/blog/PreviewCanvas'
import { cn } from '@/lib/utils'
import type { BlogPost } from '@/lib/blog'

type SortMode = 'latest' | 'topic'

interface BlogIndexClientProps {
  initialPosts: BlogPost[]
  initialCategories: Array<{ id: string; label: string; count: number }>
}

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
      ? new Date(latest).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }).toUpperCase()
      : '—'
    return { essays, topics, updated }
  }, [initialPosts])

  return (
    <>
      <NavBar />
      <main className="min-h-screen bg-surface-canvas text-surface-fg">
        {/* Header band */}
        <section className="border-b border-surface-subtle">
          <div className="mx-auto max-w-6xl px-6 pt-32 pb-12 md:pt-40 md:pb-16">
            <MonoLabel className="block mb-4">field notes · writing index</MonoLabel>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight-display leading-[1.06] text-surface-fg max-w-[22ch]">
              Notes from the <span className="text-gold">workflow</span>.
            </h1>
            <p className="mt-6 max-w-[58ch] font-serif text-lg md:text-xl leading-[1.7] text-surface-fg-secondary">
              Short essays on operational AI, healthcare workflows, and the systems
              around the model — written from inside the shift, not above it.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1">
              <MonoLabel>{stats.essays.toString().padStart(2, '0')} essays</MonoLabel>
              <MonoLabel>·</MonoLabel>
              <MonoLabel>{stats.topics.toString().padStart(2, '0')} topics</MonoLabel>
              <MonoLabel>·</MonoLabel>
              <MonoLabel>updated {stats.updated}</MonoLabel>
            </div>
          </div>
        </section>

        {/* Control band */}
        <section className="border-b border-surface-subtle">
          <div className="mx-auto max-w-6xl px-6 py-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Search */}
            <label className="relative flex items-center w-full md:w-72">
              <Search className="pointer-events-none absolute left-3 h-3.5 w-3.5 text-surface-fg-muted" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="search the index"
                aria-label="Search the writing index"
                className={cn(
                  'w-full rounded-md border border-surface-subtle bg-surface-card/50 py-2 pl-9 pr-3',
                  'font-mono text-xs tracking-wide-label text-surface-fg placeholder:text-surface-fg-muted',
                  'transition-colors focus:outline-none focus:border-surface-strong',
                  'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/40'
                )}
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
                        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 transition-colors',
                        'font-mono text-[10px] uppercase tracking-wide-label',
                        'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/40',
                        active
                          ? 'border-gold/50 bg-surface-elevated text-surface-fg'
                          : 'border-surface-subtle bg-surface-card/50 text-surface-fg-secondary hover:text-surface-fg hover:border-surface-strong'
                      )}
                    >
                      <span>{category.label.toLowerCase()}</span>
                      <span className={cn('text-[10px]', active ? 'text-gold' : 'text-surface-fg-muted')}>
                        {category.count.toString().padStart(2, '0')}
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>

            {/* Sort toggle */}
            <div className="flex items-center gap-1 rounded-full border border-surface-subtle bg-surface-card/50 p-1">
              {(['latest', 'topic'] as SortMode[]).map((mode) => {
                const active = sortMode === mode
                return (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setSortMode(mode)}
                    aria-pressed={active}
                    className={cn(
                      'rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-wide-label transition-colors',
                      'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/40',
                      active
                        ? 'bg-surface-elevated text-surface-fg'
                        : 'text-surface-fg-secondary hover:text-surface-fg'
                    )}
                  >
                    {mode === 'latest' ? 'latest' : 'by topic'}
                  </button>
                )
              })}
            </div>
          </div>
        </section>

        {/* Card grid */}
        <section>
          <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
            <div className="mb-6 flex items-baseline justify-between">
              <MonoLabel>selected writing</MonoLabel>
              <MonoLabel>
                {visiblePosts.length.toString().padStart(2, '0')} /{' '}
                {initialPosts.length.toString().padStart(2, '0')}
              </MonoLabel>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              {visiblePosts.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="border-y border-surface-subtle px-2 py-16 text-center"
                >
                  <MonoLabel className="block">no entries match</MonoLabel>
                  <p className="mt-3 font-serif text-base text-surface-fg-secondary">
                    Try a different search term or clear the active filters.
                  </p>
                  <button
                    type="button"
                    onClick={clearFilters}
                    className={cn(
                      'mt-5 inline-flex items-center gap-1.5 rounded-full border border-surface-subtle bg-surface-card/50 px-3 py-1',
                      'font-mono text-[10px] uppercase tracking-wide-label text-surface-fg-secondary',
                      'transition-colors hover:text-surface-fg hover:border-surface-strong',
                      'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/40'
                    )}
                  >
                    clear filters
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
                  className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3"
                >
                  <AnimatePresence mode="popLayout">
                    {visiblePosts.map((post, idx) => (
                      <EssayCard key={post.slug} post={post} index={idx} />
                    ))}
                  </AnimatePresence>
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        </section>
      </main>
    </>
  )
}

type EssayCardProps = { post: BlogPost; index: number }

function EssayCard({ post, index }: EssayCardProps) {
  const [hovered, setHovered] = useState(false)
  const variant = variantFromCategory(post.category)
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
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        aria-label={`${post.title} — ${post.readTime}`}
        className={cn(
          'group block h-full rounded-lg border bg-surface-card p-5 transition-all',
          'border-surface-subtle hover:border-surface-strong hover:-translate-y-0.5',
          'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/40'
        )}
      >
        {/* Header strip */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MonoLabel className="text-gold">
              {(index + 1).toString().padStart(2, '0')}
            </MonoLabel>
            <MonoLabel>·</MonoLabel>
            <MonoLabel>{post.category.replace(/-/g, ' ')}</MonoLabel>
            <MonoLabel>·</MonoLabel>
            <MonoLabel>{post.readTime}</MonoLabel>
          </div>
          <ArrowUpRight
            className={cn(
              'h-4 w-4 transition-all',
              hovered
                ? 'text-gold translate-x-0.5 -translate-y-0.5'
                : 'text-surface-fg-muted'
            )}
          />
        </div>

        {/* Preview */}
        <PreviewCanvas variant={variant} active={hovered} className="mb-5" />

        {/* Title */}
        <h2
          className={cn(
            'text-lg md:text-xl font-medium tracking-tight-h leading-snug line-clamp-2 transition-colors',
            hovered ? 'text-gold' : 'text-surface-fg'
          )}
        >
          {post.title}
        </h2>

        {/* Excerpt */}
        <p className="mt-2 font-serif text-base leading-[1.7] text-surface-fg-secondary line-clamp-2">
          {post.excerpt}
        </p>

        {/* Footer strip */}
        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1">
          <MonoLabel>{dateLabel}</MonoLabel>
          {post.tags.slice(0, 2).map((tag) => (
            <MonoLabel key={tag}>· {tag}</MonoLabel>
          ))}
        </div>
      </Link>
    </motion.li>
  )
}

export default BlogIndexClient
