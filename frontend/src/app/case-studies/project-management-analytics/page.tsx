'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, Users, Building, Target, CheckCircle, TrendingUp, Database, BarChart3, DollarSign, Clock } from 'lucide-react'
import Link from 'next/link'

export default function ProjectManagementCaseStudy() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <section className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-20">
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
              <span className="px-4 py-2 bg-purple-500/30 text-purple-100 rounded-full text-sm font-semibold">
                Project Management
              </span>
              <span className="px-4 py-2 bg-green-500/30 text-green-100 rounded-full text-sm font-semibold">
                Successfully Implemented
              </span>
            </div>
            
            <h1 className="text-5xl font-bold mb-6">
              Project Management Analytics Dashboard
            </h1>
            
            <p className="text-xl text-purple-100 mb-8 leading-relaxed">
              Lean Six Sigma & Performance Optimization
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <DollarSign className="h-8 w-8 text-purple-200 mb-2" />
                <div className="text-2xl font-bold text-white">20%</div>
                <div className="text-purple-200 text-sm">Cost Savings</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <Clock className="h-8 w-8 text-purple-200 mb-2" />
                <div className="text-2xl font-bold text-white">15%↓</div>
                <div className="text-purple-200 text-sm">Timeline Reduction</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <TrendingUp className="h-8 w-8 text-purple-200 mb-2" />
                <div className="text-2xl font-bold text-white">35%↑</div>
                <div className="text-purple-200 text-sm">Successful Bids</div>
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
                    Developed for IEQ Global PTE LTD, this comprehensive analytics platform transformed project management 
                    processes through data-driven insights. Implemented advanced financial planning models and variance 
                    analysis, resulting in 35% increase in successful bids and improved stakeholder communication across 
                    government agencies and contractors.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Challenge</h4>
                      <p className="text-gray-600">
                        Large-scale construction and engineering projects lacked systematic performance tracking, 
                        leading to cost overruns, timeline delays, and reduced bid success rates.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Solution</h4>
                      <p className="text-gray-600">
                        Comprehensive analytics solution implementing Lean Six Sigma methodologies with advanced 
                        financial modeling and real-time performance tracking.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Business Impact */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Business Impact</h2>
                <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <Target className="h-8 w-8 text-purple-600 mb-4" />
                      <h4 className="font-semibold text-gray-900 mb-3">Financial Performance</h4>
                      <p className="text-gray-600 mb-4">
                        Advanced financial planning and variance analysis led to significant cost reductions 
                        and improved project profitability across all managed projects.
                      </p>
                      <ul className="space-y-2 text-gray-600">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          20% reduction in project costs
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          15% timeline improvement
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          Enhanced ROI tracking
                        </li>
                      </ul>
                    </div>
                    <div>
                      <Database className="h-8 w-8 text-purple-600 mb-4" />
                      <h4 className="font-semibold text-gray-900 mb-3">Operational Excellence</h4>
                      <p className="text-gray-600 mb-4">
                        Lean Six Sigma implementation streamlined processes and improved stakeholder 
                        communication across government agencies and contractors.
                      </p>
                      <ul className="space-y-2 text-gray-600">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          35% increase in successful bids
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          Improved stakeholder communication
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          Standardized reporting processes
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Technical Implementation */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Technical Implementation</h2>
                <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Lean Six Sigma Framework</h4>
                      <p className="text-gray-600 mb-4">
                        Implemented comprehensive Lean Six Sigma methodology to identify waste, reduce variation, 
                        and optimize project delivery processes across all phases of construction projects.
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-purple-50 rounded-lg p-4">
                        <BarChart3 className="h-6 w-6 text-purple-600 mb-2" />
                        <h5 className="font-medium text-gray-900 mb-1">Advanced Analytics</h5>
                        <p className="text-sm text-gray-600">Excel Advanced & SQL for financial modeling and variance analysis</p>
                      </div>
                      <div className="bg-purple-50 rounded-lg p-4">
                        <Database className="h-6 w-6 text-purple-600 mb-2" />
                        <h5 className="font-medium text-gray-900 mb-1">Risk Assessment</h5>
                        <p className="text-sm text-gray-600">Comprehensive risk frameworks with Tableau visualization</p>
                      </div>
                      <div className="bg-purple-50 rounded-lg p-4">
                        <TrendingUp className="h-6 w-6 text-purple-600 mb-2" />
                        <h5 className="font-medium text-gray-900 mb-1">Process Analytics</h5>
                        <p className="text-sm text-gray-600">Continuous improvement tracking and optimization</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Key Methodologies */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Key Methodologies</h2>
                <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4">DMAIC Process</h4>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-bold">D</div>
                          <div>
                            <p className="font-medium text-gray-900">Define</p>
                            <p className="text-sm text-gray-600">Project scope and customer requirements</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-bold">M</div>
                          <div>
                            <p className="font-medium text-gray-900">Measure</p>
                            <p className="text-sm text-gray-600">Current performance and baseline metrics</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-bold">A</div>
                          <div>
                            <p className="font-medium text-gray-900">Analyze</p>
                            <p className="text-sm text-gray-600">Root causes and process inefficiencies</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-bold">I</div>
                          <div>
                            <p className="font-medium text-gray-900">Improve</p>
                            <p className="text-sm text-gray-600">Implement solutions and optimizations</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-bold">C</div>
                          <div>
                            <p className="font-medium text-gray-900">Control</p>
                            <p className="text-sm text-gray-600">Sustain improvements and monitor performance</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4">Financial Modeling</h4>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                          <div>
                            <p className="font-medium text-gray-900">Variance Analysis</p>
                            <p className="text-sm text-gray-600">Budget vs. actual performance tracking</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                          <div>
                            <p className="font-medium text-gray-900">Cash Flow Modeling</p>
                            <p className="text-sm text-gray-600">Predictive financial planning and forecasting</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                          <div>
                            <p className="font-medium text-gray-900">Risk Quantification</p>
                            <p className="text-sm text-gray-600">Monte Carlo simulations for risk assessment</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                          <div>
                            <p className="font-medium text-gray-900">Performance KPIs</p>
                            <p className="text-sm text-gray-600">Real-time dashboard monitoring</p>
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
                      <span className="text-sm font-medium text-gray-700">Duration</span>
                    </div>
                    <p className="text-sm text-gray-600">12 months implementation</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Building className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">Client</span>
                    </div>
                    <p className="text-sm text-gray-600">IEQ Global PTE LTD</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">Industry</span>
                    </div>
                    <p className="text-sm text-gray-600">Construction & Engineering</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">Stakeholders</span>
                    </div>
                    <p className="text-sm text-gray-600">Government agencies, contractors, project teams</p>
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
                  {["Excel Advanced", "SQL", "Lean Six Sigma", "Financial Modeling", "Risk Assessment", "Tableau", "Process Analytics"].map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Key Achievements */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
              >
                <h3 className="font-bold text-gray-900 mb-4">Key Features</h3>
                <ul className="space-y-3">
                  {[
                    "Advanced financial planning & analysis",
                    "Variance reporting & insights",
                    "Lean Six Sigma implementation",
                    "Cross-functional coordination tools",
                    "Risk assessment frameworks"
                  ].map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-purple-600 mt-0.5" />
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