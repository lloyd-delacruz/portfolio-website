'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Code, Database, Brain, Shield, Cloud, Award } from 'lucide-react'
import Link from 'next/link'
import { SkillsExpertise } from '@/components/sections/SkillsExpertise'

export default function SkillsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-blue-900">
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
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 3, delay: 0.6, ease: "easeOut" }}
            className="absolute top-1/2 left-1/2 w-48 h-48 bg-purple-500/20 rounded-full blur-xl transform -translate-x-1/2 -translate-y-1/2"
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
              Technical Expertise
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            Skills & Expertise
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-xl md:text-2xl text-green-200 mb-12 max-w-4xl mx-auto"
          >
            Comprehensive technical stack spanning healthcare analytics, AI implementation, 
            and full-stack development
          </motion.p>

          {/* Skill Categories Grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 text-center group hover:bg-white/20 transition-all duration-300">
              <Database className="h-10 w-10 text-blue-300 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <div className="text-lg font-bold text-white mb-2">Data Analytics</div>
              <div className="text-white/80 text-sm">Python, SQL, R, Tableau</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 text-center group hover:bg-white/20 transition-all duration-300">
              <Brain className="h-10 w-10 text-purple-300 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <div className="text-lg font-bold text-white mb-2">Machine Learning</div>
              <div className="text-white/80 text-sm">TensorFlow, PyTorch, AWS AI</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 text-center group hover:bg-white/20 transition-all duration-300">
              <Code className="h-10 w-10 text-green-300 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <div className="text-lg font-bold text-white mb-2">Full Stack Dev</div>
              <div className="text-white/80 text-sm">React, Node.js, Next.js</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 text-center group hover:bg-white/20 transition-all duration-300">
              <Cloud className="h-10 w-10 text-yellow-300 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <div className="text-lg font-bold text-white mb-2">Cloud Platforms</div>
              <div className="text-white/80 text-sm">AWS, Azure, GCP</div>
            </div>
          </motion.div>

          {/* Certifications Highlight */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-sm rounded-xl p-8 border border-white/20 max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center mb-6">
              <Award className="h-8 w-8 text-white mr-3" />
              <span className="text-2xl font-bold text-white">Professional Certifications</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-lg font-semibold text-white mb-2">AWS AI Practitioner</div>
                <div className="text-white/80 text-sm">Amazon Web Services</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-lg font-semibold text-white mb-2">Lean Six Sigma</div>
                <div className="text-white/80 text-sm">Process Excellence</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-lg font-semibold text-white mb-2">MSc Data Analytics</div>
                <div className="text-white/80 text-sm">Advanced Degree</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Content */}
      <SkillsExpertise />

      {/* Technical Proficiency Matrix */}
      <section className="py-20 bg-gradient-to-r from-green-900/50 to-blue-900/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-6">Proficiency Matrix</h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Deep expertise across the entire technology stack
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {/* Technical Skills */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Code className="h-6 w-6 mr-2" />
                Technical Skills
              </h3>
              <div className="space-y-4">
                {[
                  { skill: 'Python & R', level: 95 },
                  { skill: 'SQL & Databases', level: 90 },
                  { skill: 'JavaScript/TypeScript', level: 85 },
                  { skill: 'React & Next.js', level: 80 },
                  { skill: 'Machine Learning', level: 90 },
                  { skill: 'Data Visualization', level: 85 }
                ].map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-2">
                      <span className="text-white font-medium">{item.skill}</span>
                      <span className="text-white/80">{item.level}%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        className="bg-gradient-to-r from-green-400 to-blue-400 h-2 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Healthcare Domain */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Shield className="h-6 w-6 mr-2" />
                Healthcare Domain
              </h3>
              <div className="space-y-4">
                {[
                  { skill: 'Healthcare Operations', level: 95 },
                  { skill: 'Clinical Analytics', level: 90 },
                  { skill: 'Process Optimization', level: 92 },
                  { skill: 'Quality Improvement', level: 88 },
                  { skill: 'Regulatory Compliance', level: 85 },
                  { skill: 'Change Management', level: 87 }
                ].map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-2">
                      <span className="text-white font-medium">{item.skill}</span>
                      <span className="text-white/80">{item.level}%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        className="bg-gradient-to-r from-purple-400 to-pink-400 h-2 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-green-900">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-white mb-8"
          >
            Ready to Leverage These Skills?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/80 mb-8 max-w-2xl mx-auto"
          >
            Let's discuss how my technical expertise can drive your healthcare innovation
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
                View Projects
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