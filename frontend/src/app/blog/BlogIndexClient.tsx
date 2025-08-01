'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Clock, ArrowRight, Search, Eye, ArrowLeft, Brain, BarChart3, Stethoscope, PieChart, Cpu, Code, Heart, Database, Smartphone, Cloud, Lightbulb } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import type { BlogPost } from '@/lib/blog'

interface BlogIndexClientProps {
  initialPosts: BlogPost[]
  initialCategories: Array<{ id: string; label: string; count: number }>
}

const BlogIndexClient = ({ initialPosts, initialCategories }: BlogIndexClientProps) => {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [posts] = useState<BlogPost[]>(initialPosts)
  const [categories] = useState(initialCategories)

  // Filter posts based on search and category
  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'healthcare': return Heart
      case 'development': return Code
      case 'data-science': return BarChart3
      case 'ai': return Brain
      default: return Lightbulb
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-6 left-6 z-50"
      >
        <Link href="/">
          <motion.button
            whileHover={{ scale: 1.05, x: -2 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-lg font-medium border border-white/20 hover:bg-white/20 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </motion.button>
        </Link>
      </motion.div>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Insights &
              </span>
              <br />
              <span className="text-white">Innovation</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12">
              Exploring the intersection of healthcare, technology, and data science through 
              <span className="text-blue-400"> interactive stories</span> and 
              <span className="text-purple-400"> visual experiences</span>
            </p>
          </motion.div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col lg:flex-row gap-6 items-center justify-between mb-12"
        >
          {/* Search Bar */}
          <div className="relative w-full lg:w-96">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "px-6 py-2 rounded-full font-medium transition-all duration-200 flex items-center gap-2",
                  selectedCategory === category.id
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25"
                    : "bg-white/10 backdrop-blur-md text-gray-300 hover:bg-white/20 border border-white/20"
                )}
              >
                {category.label}
                <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                  {category.count}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Blog Posts Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredPosts.map((post) => (
              <motion.article
                key={post.slug}
                variants={cardVariants}
                layout
                onHoverStart={() => setHoveredCard(post.slug)}
                onHoverEnd={() => setHoveredCard(null)}
                onClick={() => router.push(`/blog/${post.slug}`)}
                className="group cursor-pointer"
              >
                <div className="relative h-full bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden transition-all duration-500 hover:bg-white/10 hover:border-white/20 hover:shadow-2xl hover:shadow-purple-500/20">
                  {/* Image Section */}
                  <div className="relative h-64 overflow-hidden">
                    <div className={cn(
                      "absolute inset-0 bg-gradient-to-br opacity-80",
                      post.gradient || 'from-cyan-600 via-blue-600 to-indigo-800'
                    )} />
                    <motion.div
                      animate={{
                        scale: hoveredCard === post.slug ? 1.1 : 1,
                      }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="absolute inset-0 bg-black/20"
                    />
                    
                    {/* Main Icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        animate={{
                          scale: hoveredCard === post.slug ? 1.2 : 1,
                          rotate: hoveredCard === post.slug ? 5 : 0,
                        }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="relative"
                      >
                        <div className="absolute inset-0 bg-white/10 rounded-full blur-xl transform scale-150" />
                        {(() => {
                          const IconComponent = getCategoryIcon(post.category)
                          return <IconComponent className="w-16 h-16 text-white/90 relative z-10 drop-shadow-lg" />
                        })()}
                      </motion.div>
                    </div>
                    
                    {/* Content Type Indicators */}
                    <div className="absolute top-4 right-4 flex gap-2">
                      {post.interactive && (
                        <div className="bg-green-500/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                          <Eye className="w-3 h-3 text-white" />
                          <span className="text-xs text-white font-medium">Interactive</span>
                        </div>
                      )}
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-white font-medium capitalize">
                        {post.category.replace('-', ' ')}
                      </span>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.date).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.readTime}
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors duration-200">
                      {post.title}
                    </h3>

                    <p className="text-gray-300 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-white/10 text-gray-300 text-xs rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Read More */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">By {post.author}</span>
                      <motion.div
                        className="flex items-center gap-2 text-blue-400 font-medium group-hover:gap-3 transition-all duration-200"
                      >
                        Read More
                        <ArrowRight className="w-4 h-4" />
                      </motion.div>
                    </div>
                  </div>

                  {/* Hover Effect Overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: hoveredCard === post.slug ? 1 : 0,
                    }}
                    className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent pointer-events-none"
                  />
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* No Results State */}
        {filteredPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-white mb-2">No articles found</h3>
            <p className="text-gray-400">Try adjusting your search or filter criteria</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default BlogIndexClient