'use client'

import Navigation from '@/components/layout/Navigation'
import { motion } from 'framer-motion'
import { MapPin, Eye, Mail, Download, User, Briefcase, FolderOpen, GraduationCap, Brain, MessageSquare, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      
      {/* Hero Section with Animations */}
      <section className="relative min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 overflow-hidden">
        {/* Navigation Bridge */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black/20 to-transparent"
        />
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-xl"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2.5, delay: 0.3, ease: "easeOut" }}
            className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-xl"
          />
        </div>

        {/* Main Content */}
        <div className="relative z-10 min-h-screen flex items-center justify-center">
          <div className="text-center text-white px-3 xs:px-4 sm:px-6 max-w-4xl mx-auto">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mb-6 xs:mb-8"
            >
              <span className="px-3 xs:px-4 py-2 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-full text-xs xs:text-sm">
                <span className="hidden sm:inline">MSc Data Analytics | AWS AI Practitioner | VCH Healthcare</span>
                <span className="sm:hidden">MSc Data Analytics | AWS AI | VCH</span>
              </span>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
              className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-3 xs:mb-4 leading-tight"
            >
              <span className="hidden xs:inline">Hi, I&apos;m Lloyd Dela Cruz</span>
              <span className="xs:hidden">Lloyd Dela Cruz</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
              className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-blue-200 mb-6 xs:mb-8"
            >
              Data Analytics Professional
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5, ease: "easeOut" }}
              className="text-sm xs:text-base sm:text-lg md:text-xl text-white/80 mb-6 xs:mb-8 max-w-3xl mx-auto leading-relaxed text-center"
            >
              Results‑driven analytics leader with a BSc in Industrial Engineering, 20+ years of professional experience, 
              and an MSc in Data Analytics (Dec 2025). AWS AI Practitioner skilled in data analytics, 
              prompt & context engineering, and apps & web development—leveraging LLMs like Claude code.
            </motion.p>
            
            {/* Location */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.8, ease: "easeOut" }}
              className="flex items-center justify-center text-white/60 mb-12 xs:mb-16 text-sm xs:text-base"
            >
              <MapPin className="h-4 w-4 mr-2" />
              <span>Vancouver, BC • Available Now</span>
            </motion.div>
            
            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-3 xs:gap-4 justify-center items-center mb-12 xs:mb-16"
            >
              <Link href="/projects">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center px-4 xs:px-6 py-2 xs:py-3 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg text-sm xs:text-base"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View My Work
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Portfolio Navigation Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-3 xs:px-4 sm:px-6 2xl:px-8 3xl:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-2xl xs:text-3xl sm:text-4xl font-bold text-white mb-4 xs:mb-6">Explore My Portfolio</h2>
            <p className="text-sm xs:text-base sm:text-lg md:text-xl text-white/70 max-w-3xl mx-auto">
              Discover my expertise across healthcare analytics, data science, and technology innovation
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-4 gap-4 xs:gap-6 sm:gap-8 xl:gap-10"
          >
            {/* About Me Card */}
            <Link href="/about">
              <motion.div 
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-xl p-4 xs:p-6 sm:p-8 border border-white/20 cursor-pointer transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-6">
                  <User className="h-10 w-10 text-blue-300 group-hover:scale-110 transition-transform" />
                  <ArrowRight className="h-5 w-5 text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="text-lg xs:text-xl sm:text-2xl font-bold text-white mb-3 xs:mb-4">About Me</h3>
                <p className="text-sm xs:text-base text-white/80 mb-3 xs:mb-4">
                  Learn about my journey from industrial engineering to healthcare frontline worker 
                </p>
                <div className="text-xs xs:text-sm text-blue-300 font-medium">20+ Years Experience</div>
              </motion.div>
            </Link>

            {/* Experience Card */}
            <Link href="/experience">
              <motion.div 
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-br from-green-500/20 to-blue-500/20 backdrop-blur-sm rounded-xl p-4 xs:p-6 sm:p-8 border border-white/20 cursor-pointer transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-6">
                  <Briefcase className="h-10 w-10 text-green-300 group-hover:scale-110 transition-transform" />
                  <ArrowRight className="h-5 w-5 text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="text-lg xs:text-xl sm:text-2xl font-bold text-white mb-3 xs:mb-4">Experience</h3>
                <p className="text-sm xs:text-base text-white/80 mb-3 xs:mb-4">
                  Explore my professional journey and key achievements in healthcare transformation
                </p>
                <div className="text-xs xs:text-sm text-green-300 font-medium">VCH Healthcare Leader</div>
              </motion.div>
            </Link>

            {/* Projects Card */}
            <Link href="/projects">
              <motion.div 
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-xl p-4 xs:p-6 sm:p-8 border border-white/20 cursor-pointer transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-6">
                  <FolderOpen className="h-10 w-10 text-purple-300 group-hover:scale-110 transition-transform" />
                  <ArrowRight className="h-5 w-5 text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="text-lg xs:text-xl sm:text-2xl font-bold text-white mb-3 xs:mb-4">Projects</h3>
                <p className="text-sm xs:text-base text-white/80 mb-3 xs:mb-4">
                  Discover innovative solutions in healthcare analytics and AI implementation
                </p>
                <div className="text-xs xs:text-sm text-purple-300 font-medium">AI & Data Analytics</div>
              </motion.div>
            </Link>

            {/* Skills Card */}
            <Link href="/skills">
              <motion.div 
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-sm rounded-xl p-4 xs:p-6 sm:p-8 border border-white/20 cursor-pointer transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-6">
                  <Brain className="h-10 w-10 text-orange-300 group-hover:scale-110 transition-transform" />
                  <ArrowRight className="h-5 w-5 text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="text-lg xs:text-xl sm:text-2xl font-bold text-white mb-3 xs:mb-4">Skills & Expertise</h3>
                <p className="text-sm xs:text-base text-white/80 mb-3 xs:mb-4">
                  Comprehensive technical skills across data science, AI, and healthcare domains
                </p>
                <div className="text-xs xs:text-sm text-orange-300 font-medium">Technical Proficiency</div>
              </motion.div>
            </Link>

            {/* Education Card */}
            <Link href="/education">
              <motion.div 
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-br from-indigo-500/20 to-blue-500/20 backdrop-blur-sm rounded-xl p-4 xs:p-6 sm:p-8 border border-white/20 cursor-pointer transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-6">
                  <GraduationCap className="h-10 w-10 text-indigo-300 group-hover:scale-110 transition-transform" />
                  <ArrowRight className="h-5 w-5 text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="text-lg xs:text-xl sm:text-2xl font-bold text-white mb-3 xs:mb-4">Education</h3>
                <p className="text-sm xs:text-base text-white/80 mb-3 xs:mb-4">
                  Academic foundation and continuous learning in data analytics and engineering
                </p>
                <div className="text-xs xs:text-sm text-indigo-300 font-medium">MSc Data Analytics</div>
              </motion.div>
            </Link>

          </motion.div>
        </div>
      </section>

      {/* Quick Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-purple-900">
        <div className="container mx-auto px-3 xs:px-4 sm:px-6 2xl:px-8 3xl:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-2xl xs:text-3xl sm:text-4xl font-bold text-white mb-4 xs:mb-6">Quick Overview</h2>
            <p className="text-sm xs:text-base sm:text-lg md:text-xl text-white/70 max-w-3xl mx-auto">
              Key metrics that define my professional impact
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4 xs:gap-6 sm:gap-8 xl:gap-12"
          >
            <div className="text-center">
              <div className="text-2xl xs:text-3xl sm:text-4xl font-bold text-white mb-1 xs:mb-2">20+</div>
              <div className="text-xs xs:text-sm sm:text-base text-white/70">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-2xl xs:text-3xl sm:text-4xl font-bold text-white mb-1 xs:mb-2">MSc</div>
              <div className="text-xs xs:text-sm sm:text-base text-white/70">Data Analytics</div>
            </div>
            <div className="text-center">
              <div className="text-2xl xs:text-3xl sm:text-4xl font-bold text-white mb-1 xs:mb-2">AWS</div>
              <div className="text-xs xs:text-sm sm:text-base text-white/70">AI Certified</div>
            </div>
            <div className="text-center">
              <div className="text-2xl xs:text-3xl sm:text-4xl font-bold text-white mb-1 xs:mb-2">VCH</div>
              <div className="text-xs xs:text-sm sm:text-base text-white/70">Frontline Worker</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-white mb-8"
          >
            Ready to Transform Healthcare?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/70 mb-12 max-w-3xl mx-auto"
          >
            Let&apos;s collaborate on optimizing your healthcare operations through data analytics, 
            AI implementation, and process excellence.
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
                className="inline-flex items-center px-4 xs:px-6 sm:px-8 py-2 xs:py-3 sm:py-4 bg-white/10 backdrop-blur-sm text-white rounded-lg font-semibold border border-white/20 hover:bg-white/20 transition-colors text-sm xs:text-base"
              >
                <Eye className="h-5 w-5 mr-2" />
                View Portfolio
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  )
}