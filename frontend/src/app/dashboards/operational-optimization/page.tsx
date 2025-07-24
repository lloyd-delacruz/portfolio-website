'use client'

import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { OperationalOptimizationDashboard } from '@/components/dashboards/OperationalOptimizationDashboard'

export default function OperationalOptimizationPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50">
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-6 left-6 z-50"
      >
        <Link href="/projects">
          <motion.button
            whileHover={{ scale: 1.05, x: -2 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-4 py-2 bg-white/90 backdrop-blur-sm text-gray-700 rounded-lg font-medium border border-gray-200 hover:bg-white transition-colors shadow-sm"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Projects
          </motion.button>
        </Link>
      </motion.div>

      {/* Header */}
      <section className="pt-24 pb-8 px-4">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Operational Optimization
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Lean Six Sigma implementation and process improvement analytics dashboard
            </p>
          </motion.div>
        </div>
      </section>

      {/* Dashboard */}
      <section className="px-4 pb-16">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <OperationalOptimizationDashboard />
          </motion.div>
        </div>
      </section>

      {/* Project Context */}
      <section className="px-4 pb-16">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl p-8 shadow-lg border border-gray-200"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Project Overview</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                This operational optimization dashboard tracks Lean Six Sigma initiatives and process 
                improvements across healthcare operations, providing data-driven insights for 
                continuous quality enhancement and cost reduction.
              </p>
              <p>
                The system monitors project performance, financial impact, and operational efficiency 
                metrics to support evidence-based decision making and strategic planning.
              </p>
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Key Features</h3>
                  <ul className="space-y-1 text-sm">
                    <li>• Project performance tracking</li>
                    <li>• ROI and cost-benefit analysis</li>
                    <li>• Process efficiency metrics</li>
                    <li>• Quality improvement reporting</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Achievements</h3>
                  <ul className="space-y-1 text-sm">
                    <li>• 35% operational efficiency improvement</li>
                    <li>• $1.2M+ annual cost savings</li>
                    <li>• 50+ process optimizations</li>
                    <li>• 95% project success rate</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}