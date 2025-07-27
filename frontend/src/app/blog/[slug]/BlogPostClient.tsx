'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, Clock, Share2, BookOpen, Eye, Play } from 'lucide-react'
import Link from 'next/link'

interface BlogPost {
  id: number
  title: string
  slug: string
  excerpt: string
  category: string
  readTime: string
  date: string
  author: string
  video: boolean
  interactive: boolean
  tags: string[]
  gradient: string
  content: string
}

interface BlogPostClientProps {
  post: BlogPost
}

const BlogPostClient = ({ post }: BlogPostClientProps) => {
  return (
    <div className={`min-h-screen bg-gradient-to-br ${post.gradient} relative overflow-hidden`}>
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-white/3 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Link href="/blog">
            <motion.button
              whileHover={{ scale: 1.05, x: -2 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-lg font-medium border border-white/20 hover:bg-white/20 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </motion.button>
          </Link>
        </motion.div>

        {/* Article Header */}
        <motion.article
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Category and Meta */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm text-white font-medium capitalize">
              {post.category.replace('-', ' ')}
            </span>
            
            <div className="flex items-center gap-4 text-sm text-gray-300">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date(post.date).toLocaleDateString('en-US', { 
                  month: 'long', 
                  day: 'numeric',
                  year: 'numeric'
                })}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </div>
              <div className="flex items-center gap-1">
                <BookOpen className="w-4 h-4" />
                {post.author}
              </div>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
            {post.title}
          </h1>

          {/* Tags and Badges */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-white border border-white/20"
              >
                {tag}
              </span>
            ))}
            
            {post.video && (
              <div className="flex items-center gap-1 bg-red-500/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-white border border-red-400/30">
                <Play className="w-3 h-3" />
                Video Content
              </div>
            )}
            
            {post.interactive && (
              <div className="flex items-center gap-1 bg-green-500/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-white border border-green-400/30">
                <Eye className="w-3 h-3" />
                Interactive
              </div>
            )}
          </div>

          {/* Share Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mb-12 inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-lg font-medium border border-white/20 hover:bg-white/20 transition-colors"
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share Article
          </motion.button>

          {/* Content */}
          <div className="prose prose-lg prose-invert max-w-none">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <div 
                className="text-gray-200 leading-relaxed"
                dangerouslySetInnerHTML={{ 
                  __html: post.content.replace(/\n/g, '<br>').replace(/#{1,6} /g, '<h2 class="text-2xl font-bold text-white mt-8 mb-4">').replace(/<h2 class="text-2xl font-bold text-white mt-8 mb-4">/g, '</p><h2 class="text-2xl font-bold text-white mt-8 mb-4">').replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>').replace(/^\s*<\/p>/, '')
                }}
              />
            </div>
          </div>
        </motion.article>
      </div>
    </div>
  )
}

export default BlogPostClient