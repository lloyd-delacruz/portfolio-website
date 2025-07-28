import BlogPostClient from './BlogPostClient'
import Link from 'next/link'
import { loadPostsFromFiles } from '@/lib/blog-server'
import type { BlogPost } from '@/lib/blog'
import type { Metadata } from 'next'

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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Post Not Found</h1>
          <p className="text-gray-300 mb-8">The blog post you're looking for doesn't exist.</p>
          <Link href="/blog">
            <button className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-lg font-medium border border-white/20 hover:bg-white/20 transition-colors">
              Back to Blog
            </button>
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

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://lloyddelacruz.com'
  const postUrl = `${baseUrl}/blog/${post.slug}`
  const imageUrl = post.image ? `${baseUrl}${post.image}` : `${baseUrl}/images/og-default.jpg`

  return {
    title: `${post.title} | Lloyd Dela Cruz`,
    description: post.excerpt,
    keywords: post.tags.join(', '),
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: postUrl,
      siteName: 'Lloyd Dela Cruz - Healthcare Technology Expert',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
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
      images: [imageUrl],
      creator: '@lloyddelacruz',
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