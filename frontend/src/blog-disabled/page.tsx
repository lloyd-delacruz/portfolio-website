'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowLeft, Calendar, Clock, Share2, BookmarkPlus, Play, Pause, Volume2, VolumeX, Eye, Heart } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface BlogPostProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  // Return empty array since this is just a demo route
  return []
}

const BlogPostPage = ({ params }: BlogPostProps) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [likes, setLikes] = useState(127)
  const [isLiked, setIsLiked] = useState(false)
  const [readingProgress, setReadingProgress] = useState(0)

  const { scrollYProgress } = useScroll()
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -100])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -50])

  // Mock blog post data - in a real app, this would be fetched based on the slug
  const blogPost = {
    id: 1,
    title: "Revolutionizing Healthcare with AI-Driven Analytics",
    subtitle: "How machine learning transforms patient outcomes and operational efficiency in modern healthcare systems",
    author: "Lloyd Dela Cruz",
    date: "2024-01-15",
    readTime: "8 min read",
    category: "Healthcare Tech",
    tags: ["AI", "Healthcare", "Analytics", "Machine Learning"],
    image: "/api/placeholder/1200/600",
    video: "/api/placeholder/video.mp4",
    hasVideo: true,
    hasInteractive: true,
    gradient: "from-blue-600 via-purple-600 to-indigo-800",
    content: [
      {
        type: "paragraph",
        content: "In today's rapidly evolving healthcare landscape, artificial intelligence stands as a beacon of transformation. The integration of AI-driven analytics into healthcare systems isn't just a technological advancement—it's a paradigm shift that's reshaping how we approach patient care, operational efficiency, and clinical decision-making."
      },
      {
        type: "heading",
        level: 2,
        content: "The Current State of Healthcare Analytics"
      },
      {
        type: "paragraph",
        content: "Healthcare organizations generate massive amounts of data daily. From electronic health records to medical imaging, from wearable device readings to genomic sequences, the volume and variety of healthcare data present both unprecedented opportunities and complex challenges."
      },
      {
        type: "interactive-chart",
        title: "Healthcare Data Growth",
        description: "Exponential growth of healthcare data over the past decade"
      },
      {
        type: "heading",
        level: 2,
        content: "AI-Powered Predictive Analytics"
      },
      {
        type: "paragraph",
        content: "Machine learning algorithms excel at identifying patterns in complex datasets that might escape human analysis. In healthcare, this capability translates to:"
      },
      {
        type: "list",
        items: [
          "Early disease detection through pattern recognition",
          "Personalized treatment recommendations",
          "Risk stratification for better resource allocation",
          "Predictive modeling for epidemic outbreaks"
        ]
      },
      {
        type: "video-section",
        title: "Interactive Demo: AI in Action",
        description: "Watch how our AI system processes patient data in real-time"
      },
      {
        type: "heading",
        level: 2,
        content: "Real-World Implementation"
      },
      {
        type: "paragraph",
        content: "The journey from proof-of-concept to production-ready AI systems in healthcare requires careful consideration of regulatory compliance, data privacy, and clinical workflow integration. Our experience implementing AI solutions across multiple healthcare institutions has taught us valuable lessons about scalable, ethical AI deployment."
      },
      {
        type: "interactive-dashboard",
        title: "Live Healthcare Dashboard",
        description: "Explore real-time analytics in action"
      }
    ]
  }

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (window.scrollY / totalHeight) * 100
      setReadingProgress(progress)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikes(prev => isLiked ? prev - 1 : prev + 1)
  }

  const renderContent = (item: any, index: number) => {
    switch (item.type) {
      case 'paragraph':
        return (
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="text-lg text-gray-300 leading-relaxed mb-6"
          >
            {item.content}
          </motion.p>
        )
      
      case 'heading':
        const HeadingTag = `h${item.level}` as keyof JSX.IntrinsicElements
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <HeadingTag className={cn(
              "font-bold text-white mb-4",
              item.level === 2 ? "text-3xl" : "text-2xl"
            )}>
              {item.content}
            </HeadingTag>
          </motion.div>
        )
      
      case 'list':
        return (
          <motion.ul
            key={index}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="space-y-3 mb-8"
          >
            {item.items.map((listItem: string, listIndex: number) => (
              <motion.li
                key={listIndex}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: listIndex * 0.1 }}
                className="flex items-start gap-3 text-gray-300"
              >
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                {listItem}
              </motion.li>
            ))}
          </motion.ul>
        )
      
      case 'video-section':
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 rounded-2xl p-8 mb-12 border border-white/10"
          >
            <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
            <p className="text-gray-300 mb-6">{item.description}</p>
            
            <div className="relative aspect-video bg-black rounded-xl overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                  className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all duration-300"
                >
                  {isVideoPlaying ? (
                    <Pause className="w-8 h-8 text-white ml-1" />
                  ) : (
                    <Play className="w-8 h-8 text-white ml-1" />
                  )}
                </motion.button>
              </div>
              
              <div className="absolute bottom-4 right-4 flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-2 bg-black/50 backdrop-blur-sm rounded-lg text-white"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </motion.button>
              </div>
            </div>
          </motion.div>
        )
      
      case 'interactive-chart':
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-green-900/30 to-teal-900/30 rounded-2xl p-8 mb-12 border border-white/10"
          >
            <div className="flex items-center gap-3 mb-6">
              <Eye className="w-6 h-6 text-green-400" />
              <h3 className="text-2xl font-bold text-white">{item.title}</h3>
            </div>
            <p className="text-gray-300 mb-8">{item.description}</p>
            
            {/* Mock Interactive Chart */}
            <div className="h-64 bg-black/30 rounded-xl flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-teal-500/10" />
              <div className="text-center">
                <div className="text-4xl mb-4">📊</div>
                <p className="text-white font-medium">Interactive Chart Component</p>
                <p className="text-gray-400 text-sm">Click to explore data points</p>
              </div>
              
              {/* Animated Elements */}
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.8, 0.3]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute top-4 right-4 w-3 h-3 bg-green-400 rounded-full"
              />
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.4, 0.9, 0.4]
                }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
                className="absolute bottom-6 left-6 w-2 h-2 bg-teal-400 rounded-full"
              />
            </div>
          </motion.div>
        )
      
      case 'interactive-dashboard':
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-orange-900/30 to-red-900/30 rounded-2xl p-8 mb-12 border border-white/10"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-6 h-6 bg-gradient-to-r from-orange-400 to-red-400 rounded-md flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-sm" />
              </div>
              <h3 className="text-2xl font-bold text-white">{item.title}</h3>
            </div>
            <p className="text-gray-300 mb-8">{item.description}</p>
            
            {/* Mock Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  className="bg-black/30 rounded-lg p-4 border border-white/10"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-sm text-gray-400">Metric {i}</div>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  </div>
                  <div className="text-2xl font-bold text-white mb-2">
                    {Math.floor(Math.random() * 100)}%
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${Math.floor(Math.random() * 100)}%` }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                      className="h-full bg-gradient-to-r from-orange-400 to-red-400 rounded-full"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )
      
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <div className="h-1 bg-black/20">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
            style={{ width: `${readingProgress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
      </div>

      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed top-20 left-6 z-40"
      >
        <Link href="/blog">
          <motion.button
            whileHover={{ scale: 1.05, x: -5 }}
            className="flex items-center gap-2 px-4 py-2 bg-black/30 backdrop-blur-md rounded-full text-white border border-white/20 hover:bg-black/50 transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </motion.button>
        </Link>
      </motion.div>

      {/* Hero Section */}
      <motion.div style={{ y: heroY }} className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80" />
        <div className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-60",
          blogPost.gradient
        )} />
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm text-white font-medium">
                {blogPost.category}
              </span>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Calendar className="w-4 h-4" />
                {new Date(blogPost.date).toLocaleDateString('en-US', { 
                  month: 'long', 
                  day: 'numeric',
                  year: 'numeric'
                })}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Clock className="w-4 h-4" />
                {blogPost.readTime}
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              {blogPost.title}
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
              {blogPost.subtitle}
            </p>

            <div className="flex items-center justify-center gap-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">LD</span>
                </div>
                <div className="text-left">
                  <div className="text-white font-medium">{blogPost.author}</div>
                  <div className="text-gray-400 text-sm">Code Architect</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLike}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200",
                    isLiked 
                      ? "bg-red-500/80 text-white" 
                      : "bg-white/10 backdrop-blur-sm text-gray-300 hover:bg-white/20"
                  )}
                >
                  <Heart className={cn("w-4 h-4", isLiked && "fill-current")} />
                  {likes}
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="p-2 bg-white/10 backdrop-blur-sm rounded-full text-gray-300 hover:bg-white/20 transition-all duration-200"
                >
                  <Share2 className="w-4 h-4" />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="p-2 bg-white/10 backdrop-blur-sm rounded-full text-gray-300 hover:bg-white/20 transition-all duration-200"
                >
                  <BookmarkPlus className="w-4 h-4" />
                </motion.button>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap justify-center gap-2 mt-8">
              {blogPost.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-white/10 backdrop-blur-sm text-gray-300 text-sm rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Article Content */}
      <motion.div style={{ y: contentY }} className="relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="prose prose-lg prose-invert max-w-none">
            {blogPost.content.map((item, index) => renderContent(item, index))}
          </div>
        </div>
      </motion.div>

      {/* Footer Actions */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl p-8 border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-4">
              Enjoyed this article?
            </h3>
            <p className="text-gray-300 mb-6">
              Share your thoughts and connect with me for more insights on healthcare technology.
            </p>
            <div className="flex justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
              >
                Share Article
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="px-6 py-3 bg-white/10 backdrop-blur-sm text-white font-medium rounded-lg hover:bg-white/20 transition-all duration-200"
              >
                View More Posts
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default BlogPostPage