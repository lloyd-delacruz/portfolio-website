import BlogIndexClient from './BlogIndexClient'
import { loadPostsFromFiles } from '@/lib/blog-server'
import { getCategories } from '@/lib/blog'
import type { Metadata } from 'next'

const TITLE = 'Notes from the workflow — Lloyd Dela Cruz'
const DESCRIPTION =
  'Short essays on operational AI, healthcare workflows, and the systems around the model — written from inside the shift, not above it.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: '/blog',
    siteName: 'Lloyd Dela Cruz',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
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
    canonical: '/blog',
  },
}

const BlogPage = () => {
  const posts = loadPostsFromFiles()
  const categories = getCategories(posts)

  return <BlogIndexClient initialPosts={posts} initialCategories={categories} />
}

export default BlogPage