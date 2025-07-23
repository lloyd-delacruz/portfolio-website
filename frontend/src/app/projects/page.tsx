'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Code, Database, Brain, BarChart3, Zap, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { ProjectsSection } from '@/components/sections/ProjectsSection'

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900">
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
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-xl"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2.5, delay: 0.3, ease: "easeOut" }}
            className="absolute top-3/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-xl"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 3, delay: 0.6, ease: "easeOut" }}
            className="absolute top-1/2 left-1/2 w-48 h-48 bg-green-500/20 rounded-full blur-xl transform -translate-x-1/2 -translate-y-1/2"
          />
        </div>

        <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <span className="px-4 py-2 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-full text-sm">
              Portfolio Showcase
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            My Projects
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-xl md:text-2xl text-purple-200 mb-12 max-w-4xl mx-auto"
          >
            Innovative solutions at the intersection of healthcare, data analytics, 
            and artificial intelligence
          </motion.p>

          {/* Tech Stack Icons */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-16 max-w-3xl mx-auto"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 text-center">
              <Database className="h-8 w-8 text-blue-300 mx-auto mb-2" />
              <div className="text-white/80 text-sm font-medium">Data Analytics</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 text-center">
              <Brain className="h-8 w-8 text-purple-300 mx-auto mb-2" />
              <div className="text-white/80 text-sm font-medium">AI/ML</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 text-center">
              <BarChart3 className="h-8 w-8 text-green-300 mx-auto mb-2" />
              <div className="text-white/80 text-sm font-medium">Visualization</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 text-center">
              <Code className="h-8 w-8 text-yellow-300 mx-auto mb-2" />
              <div className="text-white/80 text-sm font-medium">Full Stack</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 text-center">
              <Zap className="h-8 w-8 text-orange-300 mx-auto mb-2" />
              <div className="text-white/80 text-sm font-medium">Automation</div>
            </div>
          </motion.div>

          {/* Featured Project Highlight */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm rounded-xl p-8 border border-white/20 max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center mb-4">
              <ExternalLink className="h-6 w-6 text-white mr-2" />
              <span className="text-white font-semibold">Featured Project</span>
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">Healthcare Analytics Dashboard</h3>
            <p className="text-white/80 leading-relaxed mb-6">
              A comprehensive real-time analytics platform that transformed VCH's operational 
              efficiency by 35%, integrating machine learning models for predictive insights 
              and automated reporting systems.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <span className="px-3 py-1 bg-blue-500/30 text-blue-200 rounded-full text-sm">Python</span>
              <span className="px-3 py-1 bg-green-500/30 text-green-200 rounded-full text-sm">React</span>
              <span className="px-3 py-1 bg-purple-500/30 text-purple-200 rounded-full text-sm">AWS</span>
              <span className="px-3 py-1 bg-orange-500/30 text-orange-200 rounded-full text-sm">TensorFlow</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Content */}
      <ProjectsSection />

      {/* Technical Skills Showcase */}
      <section className="py-20 bg-gradient-to-r from-purple-900/50 to-blue-900/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-6">Technical Expertise</h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Leveraging cutting-edge technologies to solve complex healthcare challenges
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <Database className="h-12 w-12 text-blue-300 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Data Engineering</h3>
              <p className="text-white/80 mb-4">ETL pipelines, data warehousing, and real-time processing</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-blue-500/30 text-blue-200 rounded text-xs">SQL</span>
                <span className="px-2 py-1 bg-blue-500/30 text-blue-200 rounded text-xs">Python</span>
                <span className="px-2 py-1 bg-blue-500/30 text-blue-200 rounded text-xs">Apache Spark</span>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <Brain className="h-12 w-12 text-purple-300 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Machine Learning</h3>
              <p className="text-white/80 mb-4">Predictive modeling, NLP, and computer vision solutions</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-purple-500/30 text-purple-200 rounded text-xs">TensorFlow</span>
                <span className="px-2 py-1 bg-purple-500/30 text-purple-200 rounded text-xs">PyTorch</span>
                <span className="px-2 py-1 bg-purple-500/30 text-purple-200 rounded text-xs">Scikit-learn</span>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <Code className="h-12 w-12 text-green-300 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Full Stack Development</h3>
              <p className="text-white/80 mb-4">End-to-end application development and deployment</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-green-500/30 text-green-200 rounded text-xs">React</span>
                <span className="px-2 py-1 bg-green-500/30 text-green-200 rounded text-xs">Node.js</span>
                <span className="px-2 py-1 bg-green-500/30 text-green-200 rounded text-xs">AWS</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-purple-900">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-white mb-8"
          >
            Let's Build Something Amazing
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/80 mb-8 max-w-2xl mx-auto"
          >
            Ready to discuss your next healthcare analytics project?
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-4 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
              >
                Start a Conversation
              </motion.button>
            </Link>
            <Link href="/experience">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-lg font-semibold border border-white/20 hover:bg-white/20 transition-colors"
              >
                View Experience
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  )
}