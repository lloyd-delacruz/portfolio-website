import BlogPostClient from './BlogPostClient'
import Link from 'next/link'
import { loadPostsFromFiles } from '@/lib/blog-server'
import type { BlogPost } from '@/lib/blog'
import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/constants'

// Blog content is now loaded from markdown files

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

// Helper function to get post by slug
function getPostBySlug(slug: string): BlogPost | null {
  const posts = loadPostsFromFiles()
  return posts.find(post => post.slug === slug) || null
}

const BlogPostPage = ({ params }: BlogPostPageProps) => {
  const { slug } = params
  const post = getPostBySlug(slug)

  if (!post) {
    return (
      <div className="home2 flex min-h-screen items-center justify-center bg-[var(--cream)]">
        <div className="text-center px-6">
          <h1 className="font-display text-4xl font-extrabold text-ink mb-3">Post not found</h1>
          <p className="text-ink-soft mb-8">The thought you&apos;re looking for doesn&apos;t exist.</p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white soft-shadow-sm transition-transform hover:-translate-y-0.5"
            style={{ background: 'var(--plum)' }}
          >
            Back to all thoughts
          </Link>
        </div>
      </div>
    )
  }

  return <BlogPostClient post={post} />
}

export async function generateStaticParams() {
  const posts = loadPostsFromFiles()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = params
  const post = getPostBySlug(slug)

  if (!post) {
    return {
      title: 'Post Not Found | Lloyd Dela Cruz',
      description: 'The blog post you are looking for could not be found.',
    }
  }

  const postUrl = `${SITE_URL}/blog/${post.slug}`
  // Only set an OG image when the post actually ships one — pointing at a
  // generic fallback that doesn't exist produces a broken social-card image,
  // which is worse than omitting `images` entirely.
  const imageUrl = post.image ? `${SITE_URL}${post.image}` : undefined

  return {
    title: `${post.title} | Lloyd Dela Cruz`,
    description: post.excerpt,
    keywords: post.tags.join(', '),
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: postUrl,
      siteName: 'Lloyd Dela Cruz',
      images: imageUrl
        ? [{ url: imageUrl, width: 1200, height: 630, alt: post.title }]
        : undefined,
      locale: 'en_US',
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: imageUrl ? [imageUrl] : undefined,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: postUrl,
    },
  }
}

export default BlogPostPage