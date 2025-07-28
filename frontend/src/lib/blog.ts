import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import rehypeStringify from 'rehype-stringify'

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  date: string
  author: string
  category: string
  tags: string[]
  readTime: string
  featured?: boolean
  image?: string
  video?: boolean
  interactive?: boolean
  gradient?: string
  content: string
  publishedAt: Date
}

export interface BlogFrontmatter {
  title: string
  excerpt: string
  date: string
  author?: string
  category: string
  tags: string[]
  readTime?: string
  featured?: boolean
  image?: string
  video?: boolean
  interactive?: boolean
  gradient?: string
  published?: boolean
}

// Client-safe blog functions (no file system access)
export function getAllPosts(): BlogPost[] {
  // This will be called from server components only
  // Client components should receive posts as props
  throw new Error('getAllPosts should only be called from server components')
}

// Client-safe markdown processing
export async function processMarkdown(content: string): Promise<string> {
  try {
    const result = await remark()
      .use(remarkGfm)
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeSlug)
      .use(rehypeHighlight)
      .use(rehypeStringify, { allowDangerousHtml: true })
      .process(content)

    return String(result)
  } catch (error) {
    console.error('Error processing markdown:', error)
    return content
  }
}

// Utility functions that work with post data (client-safe)
export function getPostsByCategory(posts: BlogPost[], category: string): BlogPost[] {
  return category === 'all' 
    ? posts 
    : posts.filter(post => post.category === category)
}

export function getCategories(posts: BlogPost[]): Array<{ id: string; label: string; count: number }> {
  const categoryCount = posts.reduce((acc, post) => {
    acc[post.category] = (acc[post.category] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const categories = [
    { id: 'all', label: 'All Posts', count: posts.length }
  ]

  Object.entries(categoryCount).forEach(([category, count]) => {
    categories.push({
      id: category,
      label: category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
      count
    })
  })

  return categories
}

export function getFeaturedPosts(posts: BlogPost[]): BlogPost[] {
  return posts.filter(post => post.featured).slice(0, 3)
}

export function getRelatedPosts(posts: BlogPost[], currentSlug: string, category: string, limit: number = 3): BlogPost[] {
  return posts
    .filter(post => post.slug !== currentSlug && post.category === category)
    .slice(0, limit)
}

export function searchPosts(posts: BlogPost[], query: string): BlogPost[] {
  const searchTerm = query.toLowerCase()
  
  return posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm) ||
    post.excerpt.toLowerCase().includes(searchTerm) ||
    post.content.toLowerCase().includes(searchTerm) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchTerm))
  )
}