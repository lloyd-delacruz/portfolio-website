'use client'

import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { NavBar } from '@/components/home/NavBar'
import { MonoLabel } from '@/components/home/primitives'
import { cn } from '@/lib/utils'
import type { BlogPost } from '@/lib/blog'

type SortMode = 'latest' | 'topic'

interface BlogIndexClientProps {
  initialPosts: BlogPost[]
  initialCategories: Array<{ id: string; label: string; count: number }>
}

const BlogIndexClient = ({ initialPosts, initialCategories }: BlogIndexClientProps) => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortMode, setSortMode] = useState<SortMode>('latest')

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
                  'focus-visible:ring-1 focus-visible:ring-gold/40'
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

        {/* Grid — filled in Task 4 */}
        <section>
          <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
            <MonoLabel>grid — coming in task 4</MonoLabel>
          </div>
        </section>
      </main>
    </>
  )
}

export default BlogIndexClient
