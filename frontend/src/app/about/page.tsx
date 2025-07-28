'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, MapPin } from 'lucide-react'
import Link from 'next/link'
import { AboutSection } from '@/components/sections/AboutSection'

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900">
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

      {/* Hero Section - Redesigned to match AboutMeHeroFixed */}
      <section className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 text-white">
        <div className="max-w-6xl mx-auto px-4">
          
          {/* Section Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-medium">
              About Lloyd Dela Cruz
            </span>
          </motion.div>

          {/* Main Content */}
          <div className="max-w-4xl mx-auto text-center">
            
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                Bridging Healthcare Excellence with
                <span className="bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
                  {" "}Data-Driven Innovation
                </span>
              </h1>
              
              <div className="flex items-center justify-center text-blue-200 mb-6">
                <MapPin className="h-5 w-5 mr-2" />
                <span className="text-lg">Vancouver, BC • Healthcare Technology Leader</span>
              </div>
              
              <p className="text-xl text-blue-100 mb-6 leading-relaxed max-w-3xl mx-auto">
                Results-driven data analytics professional with 20+ years of cross-functional experience—8 of which are in healthcare operations, project management, and clinical optimization.
              </p>
              
              <p className="text-lg text-blue-200 mb-8 leading-relaxed max-w-3xl mx-auto">
                Currently completing an MSc in Data Analytics at Eastern University (expected Dec 2025), while contributing to patient care and interdisciplinary collaboration as a Rehabilitation Assistant at Vancouver Coastal Health.
              </p>
              
              {/* Key Stats */}
              <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-300">20+</div>
                  <div className="text-sm text-blue-300">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-300">MSc</div>
                  <div className="text-sm text-blue-300">Data Analytics</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-300">AWS</div>
                  <div className="text-sm text-blue-300">AI Practitioner</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Content */}
      <AboutSection />

      {/* Call to Action - Reduced spacing */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-purple-900">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-white mb-6"
          >
            Let&apos;s Connect
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white/80 mb-6 max-w-2xl mx-auto"
          >
            Ready to collaborate on transforming healthcare through data analytics and AI?
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-4 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
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