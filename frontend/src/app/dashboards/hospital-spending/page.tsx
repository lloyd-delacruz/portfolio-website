'use client';

import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import HospitalSpendingDashboard from '@/components/dashboards/HospitalSpendingDashboard';

export default function HospitalSpendingPage() {
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

      <HospitalSpendingDashboard />
    </div>
  );
}