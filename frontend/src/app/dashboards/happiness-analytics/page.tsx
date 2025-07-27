'use client'

import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import HappinessAnalysisDashboard from '@/components/dashboards/HappinessAnalysisDashboard'

export default function HappinessAnalyticsPage() {
  return (
    <div className="relative">
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

      {/* Data Source Disclaimer */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="pt-24 px-4 pb-8"
      >
        <div className="container mx-auto max-w-7xl">
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg mb-8">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-blue-700">
                  <strong>Data Source:</strong> World Happiness data sourced from Kaggle.com. Analysis performed using multiple programming languages including Python with Pandas for data processing, and Excel for additional data analysis and visualization.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Dashboard Component */}
      <HappinessAnalysisDashboard />
    </div>
  )
}