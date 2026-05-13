'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, MapPin } from 'lucide-react'
import Link from 'next/link'
import { AboutSection } from '@/components/sections/AboutSection'

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-paper-bg text-paper-ink">
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
            className="inline-flex items-center px-4 py-2 rounded-lg font-medium border border-paper-ink/25 bg-paper-bg/70 text-paper-ink backdrop-blur-sm transition-colors hover:border-gold-ink/50 hover:text-gold-ink focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-ink focus-visible:outline-offset-2"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </motion.button>
        </Link>
      </motion.div>

      {/* Hero Section - Redesigned to match AboutMeHeroFixed */}
      <section className="py-20 bg-paper-bg text-paper-ink">
        <div className="max-w-6xl mx-auto px-4">

          {/* Section Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center px-4 py-2 rounded-full border border-paper-subtle bg-paper-card text-xs font-bold uppercase tracking-wide-label text-gold-ink">
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
                <span className="text-gold-ink">
                  {" "}Data-Driven Innovation
                </span>
              </h1>

              <div className="flex items-center justify-center text-paper-ink-soft mb-6">
                <MapPin className="h-5 w-5 mr-2 text-gold-ink" />
                <span className="text-lg">Vancouver, BC • Healthcare Technology Leader</span>
              </div>

              <p className="text-xl text-paper-ink-soft mb-6 leading-relaxed max-w-3xl mx-auto">
                Results-driven data analytics professional with 20+ years of cross-functional experience—8 of which are in healthcare operations, project management, and clinical optimization.
              </p>

              <p className="text-lg text-paper-ink-soft mb-8 leading-relaxed max-w-3xl mx-auto">
                Currently completing an MSc in Data Analytics at Eastern University (expected Dec 2025), while contributing to patient care and interdisciplinary collaboration as a Rehabilitation Assistant at Vancouver Coastal Health.
              </p>

              {/* Key Stats */}
              <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gold-ink">20+</div>
                  <div className="text-sm text-paper-ink-soft uppercase tracking-wide-label">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gold-ink">MSc</div>
                  <div className="text-sm text-paper-ink-soft uppercase tracking-wide-label">Data Analytics</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gold-ink">AWS</div>
                  <div className="text-sm text-paper-ink-soft uppercase tracking-wide-label">AI Practitioner</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Content */}
      <AboutSection />

      {/* Call to Action - Reduced spacing */}
      <section className="py-16 bg-paper-bg border-t border-paper-subtle">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-paper-ink mb-6"
          >
            Let&apos;s Connect
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-paper-ink-soft mb-8 max-w-2xl mx-auto"
          >
            Ready to collaborate on transforming healthcare through data and AI?
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
                className="inline-flex items-center px-8 py-4 rounded-lg font-semibold bg-paper-ink text-paper-bg hover:bg-paper-ink/90 transition-colors"
              >
                Get in touch
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
