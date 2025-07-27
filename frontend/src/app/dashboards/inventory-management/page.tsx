'use client'

import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { InventoryManagementDashboard } from '@/components/dashboards/InventoryManagementDashboard'

export default function InventoryManagementPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50">
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
              Inventory Management System
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Smart healthcare equipment tracking and maintenance scheduling across VCH sites
            </p>
          </motion.div>
        </div>
      </section>

      {/* Data Disclaimer */}
      <section className="px-4 pb-8">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-lg mb-8"
          >
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-amber-700">
                  <strong>Data Disclaimer:</strong> The data presented in this dashboard is generated and randomly selected for demonstration purposes only. 
                  This system has not yet been implemented and is presented as a proposal to assist management in making informed decisions about potential implementation.
                </p>
              </div>
            </div>
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
            <InventoryManagementDashboard />
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
                This intelligent inventory management system optimizes healthcare equipment tracking 
                and maintenance scheduling across Vancouver Coastal Health facilities, reducing 
                downtime and improving patient care efficiency.
              </p>
              <p>
                The system provides real-time visibility into equipment availability, predictive 
                maintenance alerts, and automated ordering workflows to ensure optimal resource utilization.
              </p>
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Key Features</h3>
                  <ul className="space-y-1 text-sm">
                    <li>• Real-time equipment tracking</li>
                    <li>• Predictive maintenance scheduling</li>
                    <li>• Multi-site inventory visibility</li>
                    <li>• Automated reorder management</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Impact</h3>
                  <ul className="space-y-1 text-sm">
                    <li>• 40% reduction in equipment downtime</li>
                    <li>• 25% improvement in utilization rates</li>
                    <li>• $200K+ annual cost savings</li>
                    <li>• Enhanced patient care delivery</li>
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