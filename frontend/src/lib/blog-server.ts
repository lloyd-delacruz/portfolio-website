import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { BlogPost, BlogFrontmatter } from './blog'

// Get posts directory path
const POSTS_PATH = path.join(process.cwd(), 'content/blog')

// Get all markdown files from the blog directory
function getMarkdownFiles(): string[] {
  try {
    if (!fs.existsSync(POSTS_PATH)) {
      return []
    }
    return fs.readdirSync(POSTS_PATH).filter(file => 
      file.endsWith('.md') || file.endsWith('.mdx'))
  } catch (error) {
    console.error('Error reading blog directory:', error)
    return []
  }
}

// Parse a markdown file and return blog post data
function parseMarkdownFile(filename: string): BlogPost | null {
  try {
    const filePath = path.join(POSTS_PATH, filename)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)
    
    const slug = filename.replace(/\.mdx?$/, '')
    
    // Validate required frontmatter fields
    if (!data.title || !data.excerpt || !data.date || !data.category) {
      console.warn(`Missing required frontmatter in ${filename}`)
      return null
    }
    
    return {
      slug,
      title: data.title,
      excerpt: data.excerpt,
      date: data.date,
      author: data.author || 'Lloyd Dela Cruz',
      category: data.category,
      tags: data.tags || [],
      readTime: data.readTime || calculateReadTime(content),
      featured: data.featured || false,
      image: data.image,
      video: data.video || false,
      interactive: data.interactive || false,
      gradient: data.gradient || 'from-blue-600 via-purple-600 to-indigo-800',
      content,
      publishedAt: new Date(data.date)
    }
  } catch (error) {
    console.error(`Error parsing ${filename}:`, error)
    return null
  }
}

// Load posts from markdown files, fallback to sample posts
export function loadPostsFromFiles(): BlogPost[] {
  const markdownFiles = getMarkdownFiles()
  
  if (markdownFiles.length === 0) {
    // Fallback to sample posts if no markdown files found
    return getSamplePosts()
  }
  
  const posts = markdownFiles
    .map(parseMarkdownFile)
    .filter((post): post is BlogPost => post !== null)
    .filter(post => {
      // Filter out unpublished posts in production
      if (process.env.NODE_ENV === 'production') {
        return post.publishedAt <= new Date()
      }
      return true
    })
  
  return posts
}

// Sample posts - fallback when no markdown files exist
function getSamplePosts(): BlogPost[] {
  return [
    {
      slug: 'understanding-model-context-protocol-future-ai-integration',
      title: 'Understanding Model Context Protocol: The Future of AI Integration',
      excerpt: "Explore Anthropic's revolutionary MCP standard that's transforming how AI systems integrate with external tools and data sources, featuring rapid adoption by OpenAI and Google DeepMind.",
      date: '2025-01-20',
      author: 'Lloyd Dela Cruz',
      category: 'development',
      tags: ['MCP', 'AI Integration', 'Anthropic', 'Protocol'],
      readTime: '12 min read',
      featured: true,
      image: '/images/blog/mcp-integration.jpg',
      video: false,
      interactive: true,
      gradient: 'from-indigo-600 via-blue-600 to-purple-800',
      content: `# Understanding Model Context Protocol: The Future of AI Integration

The artificial intelligence landscape is evolving rapidly, and with it comes the need for standardized ways to connect AI systems with external tools and data sources. Enter the **Model Context Protocol (MCP)** - Anthropic's groundbreaking open standard that's revolutionizing how we think about AI integration.

## What is Model Context Protocol?

Think of MCP like a USB-C port for AI applications. Just as USB-C provides a standardized way to connect your devices to various peripherials and accessories, MCP provides a standardized way to connect AI models to different data sources and tools.

## Code Example: Building an MCP Server

\`\`\`typescript
import { Server } from '@modelcontextprotocol/sdk/server/index.js';

const server = new Server({
  name: 'healthcare-data-server',
  version: '1.0.0',
});
\`\`\`

## Conclusion

The Model Context Protocol represents a fundamental shift in how we think about AI system architecture.`,
      publishedAt: new Date('2025-01-20')
    },
    {
      slug: 'healthcare-ai-revolution-2025',
      title: 'AI Revolution in Healthcare 2025: Breakthrough Innovations Transforming Patient Care',
      excerpt: "Discover the latest AI innovations revolutionizing healthcare in 2025, from precision medicine and digital patient platforms to virtual health assistants and regulatory developments.",
      date: '2024-12-22',
      author: 'Lloyd Dela Cruz',
      category: 'healthcare',
      tags: ['AI', 'Healthcare Innovation', 'Precision Medicine', 'Digital Health'],
      readTime: '11 min read',
      featured: true,
      image: '/images/blog/healthcare-ai-2025.jpg',
      video: false,
      interactive: true,
      gradient: 'from-cyan-600 via-blue-600 to-indigo-800',
      content: `# AI Revolution in Healthcare 2025

The healthcare industry is experiencing an unprecedented transformation as artificial intelligence technologies mature and become more accessible.

\`\`\`python
class PrecisionMedicinePlatform:
    def analyze_patient(self, patient_data):
        return {
            'genetic_insights': genetic_profile,
            'recommended_treatments': drug_recommendations
        }
\`\`\`

## Conclusion

The AI revolution in healthcare is not a distant future—it's happening now.`,
      publishedAt: new Date('2024-12-22')
    }
  ]
}

function calculateReadTime(content: string): string {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  const readTime = Math.ceil(words / wordsPerMinute)
  return `${readTime} min read`
}

export function generatePostSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

export function createPostTemplate(title: string, category: string): string {
  const slug = generatePostSlug(title)
  const today = new Date().toISOString().split('T')[0]
  
  return `---
title: "${title}"
excerpt: "A brief description of this post"
date: "${today}"
author: "Lloyd Dela Cruz"
category: "${category}"
tags: ["tag1", "tag2", "tag3"]
readTime: "5 min read"
featured: false
image: "/images/blog/${slug}.jpg"
video: false
interactive: false
gradient: "from-blue-600 via-purple-600 to-indigo-800"
published: true
---

# ${title}

Write your content here using Markdown. You can include:

## Code Blocks

\`\`\`javascript
function example() {
  console.log("Hello, World!");
}
\`\`\`

## Images

![Alt text](/images/blog/${slug}.jpg)

## Interactive Elements

You can add custom React components here if needed.

## Videos

Embed videos using HTML or markdown:

\`\`\`html
<video controls width="100%">
  <source src="/videos/${slug}.mp4" type="video/mp4">
</video>
\`\`\`

Write your amazing content here!
`
}