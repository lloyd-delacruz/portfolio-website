'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Briefcase, Award, TrendingUp, Users, Target } from 'lucide-react'
import Link from 'next/link'
import { ExperienceSection } from '@/components/sections/ExperienceSection'

export default function ExperiencePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
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
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-green-500/20 rounded-full blur-xl"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2.5, delay: 0.3, ease: "easeOut" }}
            className="absolute top-3/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-xl"
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
              Professional Journey
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            Experience & Expertise
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-xl md:text-2xl text-blue-200 mb-12 max-w-4xl mx-auto"
          >
            Two decades of transforming healthcare operations through data analytics, 
            process optimization, and strategic leadership
          </motion.p>

          {/* Key Achievements Grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 text-center">
              <Briefcase className="h-8 w-8 text-blue-300 mx-auto mb-3" />
              <div className="text-2xl font-bold text-white mb-2">20+ Years</div>
              <div className="text-white/80 text-sm">Professional Experience</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 text-center">
              <Award className="h-8 w-8 text-green-300 mx-auto mb-3" />
              <div className="text-2xl font-bold text-white mb-2">Project Management</div>
              <div className="text-white/80 text-sm">Process Excellence</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 text-center">
              <TrendingUp className="h-8 w-8 text-purple-300 mx-auto mb-3" />
              <div className="text-2xl font-bold text-white mb-2">Data Analytics</div>
              <div className="text-white/80 text-sm">Performance Optimization</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 text-center">
              <Users className="h-8 w-8 text-yellow-300 mx-auto mb-3" />
              <div className="text-2xl font-bold text-white mb-2">Innovation & AI</div>
              <div className="text-white/80 text-sm">Prompt Engineering • MCP • LLMs • ML</div>
            </div>
          </motion.div>

          {/* Current Role Highlight */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-xl p-8 border border-white/20 max-w-3xl mx-auto"
          >
            <div className="flex items-center justify-center mb-4">
              <Target className="h-6 w-6 text-white mr-2" />
              <span className="text-white font-semibold">Current Focus</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Healthcare Analytics Projects</h3>
            <p className="text-white/80 leading-relaxed">
              Developing innovative data analytics solutions to optimize healthcare delivery, 
              reduce operational costs, and improve patient outcomes through 
              evidence-based decision making and AI implementation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Experience Content */}
      <ExperienceSection />

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-green-900 to-blue-900">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-white mb-8"
          >
            Ready to Drive Results?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/80 mb-8 max-w-2xl mx-auto"
          >
            Let's discuss how my experience can help optimize your healthcare operations
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/projects">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-4 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
              >
                View My Projects
              </motion.button>
            </Link>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-lg font-semibold border border-white/20 hover:bg-white/20 transition-colors"
              >
                Get In Touch
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  )
}