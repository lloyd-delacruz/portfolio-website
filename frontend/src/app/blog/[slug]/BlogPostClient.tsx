'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Calendar, Clock, BookOpen, Eye, Play } from 'lucide-react'
import Link from 'next/link'
import { HomeNav } from '@/components/home/HomeNav'
import { SiteFooter } from '@/components/home/SiteFooter'
import { processMarkdown } from '@/lib/blog'
import type { BlogPost } from '@/lib/blog'

interface BlogPostClientProps {
  post: BlogPost
}

const Shell = ({ children }: { children: React.ReactNode }) => (
  <div className="home2 min-h-screen">
    <HomeNav active="Thoughts" />
    <main>{children}</main>
    <SiteFooter />
  </div>
)

const BlogPostClient = ({ post }: BlogPostClientProps) => {
  const [processedContent, setProcessedContent] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const processContent = async () => {
      try {
        const html = await processMarkdown(post.content)
        setProcessedContent(html)
      } catch (error) {
        console.error('Error processing markdown:', error)
        setProcessedContent(post.content)
      } finally {
        setIsLoading(false)
      }
    }

    processContent()
  }, [post.content])

  if (isLoading) {
    return (
      <Shell>
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-4 h-9 w-9 animate-spin rounded-full border-2 border-[var(--plum-soft)] border-t-plum" />
            <p className="text-sm text-ink-muted">Processing content…</p>
          </div>
        </div>
      </Shell>
    )
  }

  const dateLabel = new Date(post.date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <Shell>
      <article className="mx-auto max-w-3xl px-6 pt-12 pb-16">
        {/* Back */}
        <Link href="/blog" className="group inline-flex items-center gap-1.5 text-sm font-semibold text-plum">
          <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-0.5" />
          All thoughts
        </Link>

        <motion.div
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          {/* Eyebrow + meta */}
          <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-[13px] text-ink-muted">
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-plum">
              {post.category.replace(/-/g, ' ')}
            </span>
            <span aria-hidden>·</span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar size={13} /> {dateLabel}
            </span>
            <span aria-hidden>·</span>
            <span className="inline-flex items-center gap-1.5">
              <Clock size={13} /> {post.readTime}
            </span>
            <span aria-hidden>·</span>
            <span className="inline-flex items-center gap-1.5">
              <BookOpen size={13} /> {post.author}
            </span>
          </div>

          {/* Title */}
          <h1 className="mt-4 font-display text-4xl font-extrabold leading-tight text-ink sm:text-5xl">
            {post.title}
          </h1>

          {post.excerpt && <p className="mt-4 text-lg leading-relaxed text-ink-soft">{post.excerpt}</p>}

          {/* Tags */}
          <div className="mt-6 flex flex-wrap items-center gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[var(--line)] bg-white px-2.5 py-1 text-[11px] font-medium text-ink-soft"
              >
                {tag}
              </span>
            ))}
            {post.video && (
              <span className="inline-flex items-center gap-1 rounded-full bg-[var(--plum-soft)] px-2.5 py-1 text-[11px] font-semibold text-plum">
                <Play size={11} /> Video
              </span>
            )}
            {post.interactive && (
              <span
                className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold"
                style={{ background: 'rgba(16,185,129,0.12)', color: 'var(--green)' }}
              >
                <Eye size={11} /> Interactive
              </span>
            )}
          </div>
        </motion.div>

        {/* Content */}
        <div className="mt-10 border-t border-[var(--line)] pt-10">
          <div className="blog-content" dangerouslySetInnerHTML={{ __html: processedContent }} />
        </div>

        {/* Footer nav */}
        <div className="mt-12 flex items-center justify-between border-t border-[var(--line)] pt-8">
          <Link href="/blog" className="group inline-flex items-center gap-1.5 text-sm font-semibold text-plum">
            <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-0.5" />
            All thoughts
          </Link>
          <Link href="/contact" className="group inline-flex items-center gap-1.5 text-sm font-semibold text-plum">
            Let&apos;s connect
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </article>
    </Shell>
  )
}

export default BlogPostClient
