'use client'

import { useMemo } from 'react'
import { NavBar } from '@/components/home/NavBar'
import { MonoLabel } from '@/components/home/primitives'
import type { BlogPost } from '@/lib/blog'

interface BlogIndexClientProps {
  initialPosts: BlogPost[]
  initialCategories: Array<{ id: string; label: string; count: number }>
}

const BlogIndexClient = ({ initialPosts }: BlogIndexClientProps) => {
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

        {/* Control band — filled in Task 3 */}
        <section className="border-b border-surface-subtle">
          <div className="mx-auto max-w-6xl px-6 py-6">
            <MonoLabel>controls — coming in task 3</MonoLabel>
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
