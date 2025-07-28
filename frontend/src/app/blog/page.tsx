import BlogIndexClient from './BlogIndexClient'
import { loadPostsFromFiles } from '@/lib/blog-server'
import { getCategories } from '@/lib/blog'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog | Lloyd Dela Cruz - Healthcare Technology Expert',
  description: 'Explore insights on healthcare technology, AI, data science, and software development. Learn from real-world case studies and practical implementations.',
  keywords: [
    'healthcare technology',
    'AI in healthcare', 
    'data science',
    'software development',
    'machine learning',
    'health informatics',
    'digital health',
    'Lloyd Dela Cruz'
  ].join(', '),
  openGraph: {
    title: 'Blog | Lloyd Dela Cruz - Healthcare Technology Expert',
    description: 'Explore insights on healthcare technology, AI, data science, and software development. Learn from real-world case studies and practical implementations.',
    url: 'https://lloyddelacruz.com/blog',
    siteName: 'Lloyd Dela Cruz',
    images: [
      {
        url: 'https://lloyddelacruz.com/images/og-blog.jpg',
        width: 1200,
        height: 630,
        alt: 'Lloyd Dela Cruz Blog - Healthcare Technology Insights',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | Lloyd Dela Cruz - Healthcare Technology Expert',
    description: 'Explore insights on healthcare technology, AI, data science, and software development.',
    images: ['https://lloyddelacruz.com/images/og-blog.jpg'],
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
    canonical: 'https://lloyddelacruz.com/blog',
  },
}

const BlogPage = () => {
  const posts = loadPostsFromFiles()
  const categories = getCategories(posts)

  return <BlogIndexClient initialPosts={posts} initialCategories={categories} />
}

export default BlogPage