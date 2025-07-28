'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, GraduationCap, BookOpen, Award, Brain, Calendar, MapPin } from 'lucide-react'
import Link from 'next/link'
import EducationSection from '@/components/sections/EducationSection'

export default function EducationPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900">
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
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-500/20 rounded-full blur-xl"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2.5, delay: 0.3, ease: "easeOut" }}
            className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-xl"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 3, delay: 0.6, ease: "easeOut" }}
            className="absolute top-1/2 left-1/2 w-48 h-48 bg-blue-500/20 rounded-full blur-xl transform -translate-x-1/2 -translate-y-1/2"
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
              Academic Journey
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            Education & Learning
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-xl md:text-2xl text-indigo-200 mb-12 max-w-4xl mx-auto"
          >
            Continuous learning journey from engineering foundations to advanced data analytics 
            and AI specialization
          </motion.p>

          {/* Education Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 text-center">
              <GraduationCap className="h-8 w-8 text-indigo-300 mx-auto mb-3" />
              <div className="text-2xl font-bold text-white mb-2">MSc</div>
              <div className="text-white/80 text-sm">Data Analytics</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 text-center">
              <BookOpen className="h-8 w-8 text-purple-300 mx-auto mb-3" />
              <div className="text-2xl font-bold text-white mb-2">BSc</div>
              <div className="text-white/80 text-sm">Industrial Engineering</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 text-center">
              <Award className="h-8 w-8 text-blue-300 mx-auto mb-3" />
              <div className="text-2xl font-bold text-white mb-2">AWS</div>
              <div className="text-white/80 text-sm">AI Practitioner</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 text-center">
              <Brain className="h-8 w-8 text-green-300 mx-auto mb-3" />
              <div className="text-2xl font-bold text-white mb-2">Prompt</div>
              <div className="text-white/80 text-sm">Engineering</div>
            </div>
          </motion.div>

          {/* Featured Degree Highlight */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 backdrop-blur-sm rounded-xl p-8 border border-white/20 max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center mb-4">
              <GraduationCap className="h-8 w-8 text-white mr-3" />
              <span className="text-2xl font-bold text-white">Current Studies</span>
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">Master of Science in Data Analytics</h3>
            <div className="flex items-center justify-center text-white/80 mb-4">
              <MapPin className="h-5 w-5 mr-2" />
              <span>Advanced Analytics Program</span>
              <Calendar className="h-5 w-5 ml-6 mr-2" />
              <span>2023 - Present</span>
            </div>
            <p className="text-white/80 leading-relaxed mb-6">
              Specialized focus on machine learning, predictive modeling, and healthcare analytics. 
              Developing expertise in advanced statistical methods, AI implementation, and 
              data-driven decision making for healthcare optimization.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <span className="px-3 py-1 bg-indigo-500/30 text-indigo-200 rounded-full text-sm">Machine Learning</span>
              <span className="px-3 py-1 bg-purple-500/30 text-purple-200 rounded-full text-sm">Statistical Analysis</span>
              <span className="px-3 py-1 bg-blue-500/30 text-blue-200 rounded-full text-sm">Healthcare Analytics</span>
              <span className="px-3 py-1 bg-green-500/30 text-green-200 rounded-full text-sm">Research Methods</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Education Content */}
      <EducationSection />

      {/* Continuous Learning Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-900/50 to-purple-900/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-6">Continuous Learning</h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Staying at the forefront of technology through ongoing education and professional development
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <BookOpen className="h-12 w-12 text-indigo-300 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Online Courses</h3>
              <p className="text-white/80 mb-4">Regular completion of specialized courses in emerging technologies</p>
              <div className="space-y-2">
                <div className="text-sm text-white/70">• Advanced Machine Learning (Coursera)</div>
                <div className="text-sm text-white/70">• AWS Cloud Practitioner</div>
                <div className="text-sm text-white/70">• Healthcare Data Science</div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <Award className="h-12 w-12 text-purple-300 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Professional Certifications</h3>
              <p className="text-white/80 mb-4">Industry-recognized certifications to validate expertise</p>
              <div className="space-y-2">
                <div className="text-sm text-white/70">• AWS AI Practitioner</div>
                <div className="text-sm text-white/70">• Prompt & Context Engineering</div>
                <div className="text-sm text-white/70">• Project Management</div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <Brain className="h-12 w-12 text-blue-300 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Research & Development</h3>
              <p className="text-white/80 mb-4">Active engagement in healthcare technology research</p>
              <div className="space-y-2">
                <div className="text-sm text-white/70">• Healthcare AI Applications</div>
                <div className="text-sm text-white/70">• Process Optimization Studies</div>
                <div className="text-sm text-white/70">• Data Analytics Research</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Academic Achievements Timeline */}
      <section className="py-20 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-6">Academic Milestones</h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Key educational achievements that shaped my career trajectory
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-indigo-500 to-purple-500"></div>
              
              {/* Timeline items */}
              <div className="space-y-12">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex items-center"
                >
                  <div className="w-1/2 pr-8 text-right">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                      <h3 className="text-xl font-bold text-white mb-2">MSc Data Analytics</h3>
                      <p className="text-indigo-200 mb-2">2023 - Present</p>
                      <p className="text-white/80 text-sm">Advanced studies in machine learning and healthcare analytics</p>
                    </div>
                  </div>
                  <div className="w-4 h-4 bg-indigo-500 rounded-full border-4 border-white relative z-10"></div>
                  <div className="w-1/2 pl-8"></div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex items-center"
                >
                  <div className="w-1/2 pr-8"></div>
                  <div className="w-4 h-4 bg-purple-500 rounded-full border-4 border-white relative z-10"></div>
                  <div className="w-1/2 pl-8">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                      <h3 className="text-xl font-bold text-white mb-2">AWS AI Practitioner</h3>
                      <p className="text-purple-200 mb-2">2025</p>
                      <p className="text-white/80 text-sm">Cloud-based AI and machine learning certification</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex items-center"
                >
                  <div className="w-1/2 pr-8"></div>
                  <div className="w-4 h-4 bg-green-500 rounded-full border-4 border-white relative z-10"></div>
                  <div className="w-1/2 pl-8">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                      <h3 className="text-xl font-bold text-white mb-2">Data Engineering - Deep Learning</h3>
                      <p className="text-green-200 mb-2">2025</p>
                      <p className="text-white/80 text-sm">Advanced data engineering and deep learning techniques</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex items-center"
                >
                  <div className="w-1/2 pr-8 text-right">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                      <h3 className="text-xl font-bold text-white mb-2">Data Analytics Certificate - BrainStation IO</h3>
                      <p className="text-orange-200 mb-2">2024</p>
                      <p className="text-white/80 text-sm">Professional data analytics certification</p>
                    </div>
                  </div>
                  <div className="w-4 h-4 bg-orange-500 rounded-full border-4 border-white relative z-10"></div>
                  <div className="w-1/2 pl-8"></div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex items-center"
                >
                  <div className="w-1/2 pr-8"></div>
                  <div className="w-4 h-4 bg-yellow-500 rounded-full border-4 border-white relative z-10"></div>
                  <div className="w-1/2 pl-8">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                      <h3 className="text-xl font-bold text-white mb-2">Google Data Analytics Certificate</h3>
                      <p className="text-yellow-200 mb-2">2022</p>
                      <p className="text-white/80 text-sm">Google professional data analytics certification</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex items-center"
                >
                  <div className="w-1/2 pr-8 text-right">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                      <h3 className="text-xl font-bold text-white mb-2">Fullstack Web Development - Udemy</h3>
                      <p className="text-red-200 mb-2">2021</p>
                      <p className="text-white/80 text-sm">Comprehensive fullstack web development training</p>
                    </div>
                  </div>
                  <div className="w-4 h-4 bg-red-500 rounded-full border-4 border-white relative z-10"></div>
                  <div className="w-1/2 pl-8"></div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex items-center"
                >
                  <div className="w-1/2 pr-8"></div>
                  <div className="w-4 h-4 bg-blue-500 rounded-full border-4 border-white relative z-10"></div>
                  <div className="w-1/2 pl-8">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                      <h3 className="text-xl font-bold text-white mb-2">BSc Industrial Engineering</h3>
                      <p className="text-blue-200 mb-2">2007</p>
                      <p className="text-white/80 text-sm">Foundation in process optimization and systems analysis</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-purple-900 to-indigo-900">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-white mb-8"
          >
            Let's Collaborate
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/80 mb-8 max-w-2xl mx-auto"
          >
            Ready to apply this educational foundation to your next healthcare analytics challenge?
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/experience">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-4 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
              >
                View Experience
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