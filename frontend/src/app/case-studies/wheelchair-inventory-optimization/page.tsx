'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, Users, Building, Target, CheckCircle, TrendingUp, Database, BarChart3, Clock } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function WheelchairInventoryCaseStudy() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Link href="/projects">
              <motion.button
                whileHover={{ scale: 1.05, x: -2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-lg font-medium border border-white/20 hover:bg-white/20 transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Projects
              </motion.button>
            </Link>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="px-4 py-2 bg-blue-500/30 text-blue-100 rounded-full text-sm font-semibold">
                Healthcare Operations
              </span>
              <span className="px-4 py-2 bg-green-500/30 text-green-100 rounded-full text-sm font-semibold">
                Project Proposal - VCH
              </span>
            </div>
            
            <h1 className="text-5xl font-bold mb-6">
              Wheelchair Inventory Optimization System
            </h1>
            
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Cerner Integration & Data-Driven Healthcare Management
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <Building className="h-8 w-8 text-blue-200 mb-2" />
                <div className="text-2xl font-bold text-white">3 Sites</div>
                <div className="text-blue-200 text-sm">Hospitals</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <Users className="h-8 w-8 text-blue-200 mb-2" />
                <div className="text-2xl font-bold text-white">200+</div>
                <div className="text-blue-200 text-sm">Patients</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <TrendingUp className="h-8 w-8 text-blue-200 mb-2" />
                <div className="text-2xl font-bold text-white">Proposed</div>
                <div className="text-blue-200 text-sm">Efficiency</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Case Study Content */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Project Overview */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Project Overview</h2>
                <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    Spearheaded a comprehensive project proposal for Vancouver Coastal Health to optimize wheelchair inventory 
                    management across multiple healthcare facilities. The proposed system integrates with existing Cerner EHR 
                    infrastructure to enable real-time tracking, automated maintenance scheduling, and data-driven analytics 
                    for improved patient care delivery.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Challenge</h4>
                      <p className="text-gray-600">
                        Manual wheelchair tracking across VGH, Richmond Hospital, and Lions Gate Hospital led to 
                        inefficiencies, maintenance delays, and reduced patient satisfaction.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Solution</h4>
                      <p className="text-gray-600">
                        Integrated data analytics platform with Cerner EHR integration for real-time inventory 
                        tracking and predictive maintenance scheduling.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Business Context */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Business Context</h2>
                <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <Target className="h-8 w-8 text-blue-600 mb-4" />
                      <h4 className="font-semibold text-gray-900 mb-3">Healthcare Impact</h4>
                      <p className="text-gray-600 mb-4">
                        Wheelchair availability directly impacts patient mobility, discharge timing, and overall 
                        healthcare experience across VCH facilities.
                      </p>
                      <ul className="space-y-2 text-gray-600">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          Reduced patient wait times
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          Improved discharge efficiency
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          Enhanced patient satisfaction
                        </li>
                      </ul>
                    </div>
                    <div>
                      <Database className="h-8 w-8 text-blue-600 mb-4" />
                      <h4 className="font-semibold text-gray-900 mb-3">Operational Benefits</h4>
                      <p className="text-gray-600 mb-4">
                        Streamlined inventory management reduces operational costs and improves resource allocation 
                        across multiple hospital sites.
                      </p>
                      <ul className="space-y-2 text-gray-600">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          Predictive maintenance scheduling
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          Real-time inventory tracking
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          Data-driven decision making
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Technical Approach */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Technical Approach</h2>
                <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Data Integration Strategy</h4>
                      <p className="text-gray-600 mb-4">
                        Proposed integration with Cerner EHR system to leverage existing healthcare data infrastructure 
                        while maintaining compliance with healthcare privacy regulations.
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-blue-50 rounded-lg p-4">
                        <BarChart3 className="h-6 w-6 text-blue-600 mb-2" />
                        <h5 className="font-medium text-gray-900 mb-1">Analytics Engine</h5>
                        <p className="text-sm text-gray-600">SQL & Python for data processing and predictive modeling</p>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-4">
                        <Database className="h-6 w-6 text-blue-600 mb-2" />
                        <h5 className="font-medium text-gray-900 mb-1">Data Visualization</h5>
                        <p className="text-sm text-gray-600">Tableau dashboards for real-time monitoring</p>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-4">
                        <Clock className="h-6 w-6 text-blue-600 mb-2" />
                        <h5 className="font-medium text-gray-900 mb-1">Process Optimization</h5>
                        <p className="text-sm text-gray-600">Excel-based modeling for workflow improvement</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Expected Outcomes */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Expected Outcomes</h2>
                <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4">Quantitative Benefits</h4>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                          <span className="text-gray-700">Inventory Visibility</span>
                          <span className="font-semibold text-green-600">95%+</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                          <span className="text-gray-700">Maintenance Efficiency</span>
                          <span className="font-semibold text-green-600">30% Improvement</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                          <span className="text-gray-700">Patient Wait Time</span>
                          <span className="font-semibold text-green-600">25% Reduction</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4">Qualitative Impact</h4>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                          <div>
                            <p className="font-medium text-gray-900">Enhanced Patient Experience</p>
                            <p className="text-sm text-gray-600">Reduced wait times and improved mobility support</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                          <div>
                            <p className="font-medium text-gray-900">Staff Efficiency</p>
                            <p className="text-sm text-gray-600">Automated tracking reduces manual inventory tasks</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                          <div>
                            <p className="font-medium text-gray-900">Data-Driven Decisions</p>
                            <p className="text-sm text-gray-600">Evidence-based resource allocation and planning</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Project Details */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
              >
                <h3 className="font-bold text-gray-900 mb-4">Project Details</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">Timeline</span>
                    </div>
                    <p className="text-sm text-gray-600">Q2 2024 Proposal</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Building className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">Client</span>
                    </div>
                    <p className="text-sm text-gray-600">Vancouver Coastal Health</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">Scope</span>
                    </div>
                    <p className="text-sm text-gray-600">Multi-site implementation across VGH, Richmond Hospital, Lions Gate Hospital</p>
                  </div>
                </div>
              </motion.div>

              {/* Technologies Used */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
              >
                <h3 className="font-bold text-gray-900 mb-4">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {["SQL", "Python", "Tableau", "Cerner Integration", "Excel", "Data Analysis", "Process Optimization"].map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Key Features */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
              >
                <h3 className="font-bold text-gray-900 mb-4">Key Features</h3>
                <ul className="space-y-3">
                  {[
                    "Cerner EHR integration proposal",
                    "Inventory tracking optimization",
                    "Maintenance scheduling automation",
                    "Data-driven decision making",
                    "Multi-site coordination system"
                  ].map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}