'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Code, Database, Brain, BarChart3, Zap, ExternalLink, X } from 'lucide-react'
import Link from 'next/link'
import { ProjectsSection } from '@/components/sections/ProjectsSection'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { useState } from 'react'

export default function ProjectsPage() {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null)

  const skillsData = {
    'Data Analytics': {
      icon: Database,
      color: 'blue',
      description: 'Advanced data processing, statistical analysis, and insights generation for healthcare systems.',
      details: [
        'ETL pipeline development for clinical data integration',
        'Statistical modeling for patient outcome prediction',
        'Real-time analytics dashboards for operational insights',
        'Data quality assessment and cleansing protocols'
      ],
      technologies: ['Python', 'SQL', 'Pandas', 'NumPy', 'Apache Spark', 'Databricks', 'PostgreSQL'],
      projects: [
        { name: 'Hospital Spending Analytics', description: 'Comprehensive analysis of healthcare expenditure patterns' },
        { name: 'National Health Expenditure Dashboard', description: 'Canadian health spending trends visualization' }
      ]
    },
    'AI/ML': {
      icon: Brain,
      color: 'purple',
      description: 'Machine learning models and AI solutions for predictive healthcare analytics.',
      details: [
        'Predictive models for disease risk assessment',
        'Natural language processing for clinical notes',
        'Computer vision for medical imaging analysis',
        'Automated decision support systems'
      ],
      technologies: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'Keras', 'OpenCV', 'Hugging Face', 'MLflow'],
      projects: [
        { name: 'Heart Disease Prediction Model', description: 'ML model predicting cardiovascular risk factors' },
        { name: 'Life Expectancy Analysis', description: 'AI-driven population health outcome forecasting' }
      ]
    },
    'Visualization': {
      icon: BarChart3,
      color: 'green',
      description: 'Interactive data visualization and business intelligence solutions.',
      details: [
        'Executive dashboard development',
        'Real-time monitoring systems',
        'Interactive patient journey mapping',
        'Performance metrics visualization'
      ],
      technologies: ['D3.js', 'Recharts', 'Plotly', 'Tableau', 'Power BI', 'Chart.js', 'Observable'],
      projects: [
        { name: 'Happiness Analytics Dashboard', description: 'Employee wellbeing metrics visualization' },
        { name: 'Inventory Management System', description: 'Real-time supply chain analytics' }
      ]
    },
    'Full Stack': {
      icon: Code,
      color: 'yellow',
      description: 'End-to-end application development with modern web technologies.',
      details: [
        'Responsive web application development',
        'RESTful API design and implementation',
        'Database architecture and optimization',
        'Cloud deployment and DevOps practices'
      ],
      technologies: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Express', 'FastAPI', 'AWS'],
      projects: [
        { name: 'Healthcare Portfolio Platform', description: 'This comprehensive portfolio website' },
        { name: 'Clinical Data Platform', description: 'Secure patient data management system' }
      ]
    },
    'Automation': {
      icon: Zap,
      color: 'orange',
      description: 'Process automation and workflow optimization for healthcare operations.',
      details: [
        'Automated report generation systems',
        'Data pipeline orchestration',
        'Clinical workflow automation',
        'Quality assurance automation'
      ],
      technologies: ['Python', 'Apache Airflow', 'Docker', 'Kubernetes', 'Jenkins', 'GitHub Actions', 'Terraform'],
      projects: [
        { name: 'Automated Analytics Pipeline', description: 'Self-updating healthcare metrics system' },
        { name: 'Report Generation Engine', description: 'Automated clinical reporting workflow' }
      ]
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900">
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
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-xl"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2.5, delay: 0.3, ease: "easeOut" }}
            className="absolute top-3/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-xl"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 3, delay: 0.6, ease: "easeOut" }}
            className="absolute top-1/2 left-1/2 w-48 h-48 bg-green-500/20 rounded-full blur-xl transform -translate-x-1/2 -translate-y-1/2"
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
              Portfolio Showcase
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            My Projects
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-xl md:text-2xl text-purple-200 mb-12 max-w-4xl mx-auto"
          >
            Innovative solutions at the intersection of healthcare, data analytics, 
            and artificial intelligence
          </motion.p>

          {/* Tech Stack Icons */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-16 max-w-3xl mx-auto"
          >
            {Object.entries(skillsData).map(([skillName, skillData], index) => {
              const IconComponent = skillData.icon
              return (
                <Dialog key={skillName}>
                  <DialogTrigger asChild>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1 + index * 0.1 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 text-center cursor-pointer hover:bg-white/20 hover:border-white/40 transition-all duration-300"
                    >
                      <IconComponent className={`h-8 w-8 text-${skillData.color}-300 mx-auto mb-2`} />
                      <div className="text-white/80 text-sm font-medium">{skillName}</div>
                    </motion.div>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-3 text-2xl">
                        <IconComponent className={`h-8 w-8 text-${skillData.color}-600`} />
                        {skillName}
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6 mt-6">
                      <p className="text-gray-700 leading-relaxed">{skillData.description}</p>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Key Capabilities</h4>
                        <ul className="space-y-2">
                          {skillData.details.map((detail, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-gray-600">
                              <div className={`w-2 h-2 rounded-full bg-${skillData.color}-500 mt-2 flex-shrink-0`} />
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Technologies & Tools</h4>
                        <div className="flex flex-wrap gap-2">
                          {skillData.technologies.map((tech, idx) => (
                            <Badge key={idx} variant="secondary" className={`bg-${skillData.color}-50 text-${skillData.color}-700 border-${skillData.color}-200`}>
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Featured Projects</h4>
                        <div className="space-y-3">
                          {skillData.projects.map((project, idx) => (
                            <div key={idx} className={`p-4 bg-${skillData.color}-50 rounded-lg border border-${skillData.color}-100`}>
                              <h5 className={`font-medium text-${skillData.color}-900 mb-1`}>{project.name}</h5>
                              <p className={`text-sm text-${skillData.color}-700`}>{project.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              )
            })}
          </motion.div>

          {/* Featured Project Highlight */}
          <Link href="/dashboards/happiness-analytics">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              whileHover={{ scale: 1.02, y: -5 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm rounded-xl p-8 border border-white/20 max-w-4xl mx-auto cursor-pointer hover:border-white/40 transition-all duration-300"
            >
              <div className="flex items-center justify-center mb-4">
                <ExternalLink className="h-6 w-6 text-white mr-2" />
                <span className="text-white font-semibold">Featured Project</span>
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">Happiness Analytics Dashboard</h3>
              <p className="text-white/80 leading-relaxed mb-6">
              A comprehensive employee wellbeing analytics platform that provides real-time insights 
                into workplace happiness, satisfaction metrics, and organizational health across 
                departments and teams.
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <span className="px-3 py-1 bg-blue-500/30 text-blue-200 rounded-full text-sm">Python</span>
                <span className="px-3 py-1 bg-green-500/30 text-green-200 rounded-full text-sm">React</span>
                <span className="px-3 py-1 bg-purple-500/30 text-purple-200 rounded-full text-sm">AWS</span>
                <span className="px-3 py-1 bg-orange-500/30 text-orange-200 rounded-full text-sm">TensorFlow</span>
              </div>
            </motion.div>
          </Link>
        </div>
      </section>

      {/* Projects Content */}
      <ProjectsSection />

      {/* Technical Skills Showcase */}
      <section className="py-20 bg-gradient-to-r from-purple-900/50 to-blue-900/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-6">Technical Expertise</h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Leveraging cutting-edge technologies to solve complex healthcare challenges
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
              <Database className="h-12 w-12 text-blue-300 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Data Engineering</h3>
              <p className="text-white/80 mb-4">ETL pipelines, data warehousing, and real-time processing</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-blue-500/30 text-blue-200 rounded text-xs">SQL</span>
                <span className="px-2 py-1 bg-blue-500/30 text-blue-200 rounded text-xs">Python</span>
                <span className="px-2 py-1 bg-blue-500/30 text-blue-200 rounded text-xs">Apache Spark</span>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <Brain className="h-12 w-12 text-purple-300 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Machine Learning</h3>
              <p className="text-white/80 mb-4">Predictive modeling, NLP, and computer vision solutions</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-purple-500/30 text-purple-200 rounded text-xs">TensorFlow</span>
                <span className="px-2 py-1 bg-purple-500/30 text-purple-200 rounded text-xs">PyTorch</span>
                <span className="px-2 py-1 bg-purple-500/30 text-purple-200 rounded text-xs">Scikit-learn</span>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <Code className="h-12 w-12 text-green-300 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Full Stack Development</h3>
              <p className="text-white/80 mb-4">End-to-end application development and deployment</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-green-500/30 text-green-200 rounded text-xs">React</span>
                <span className="px-2 py-1 bg-green-500/30 text-green-200 rounded text-xs">Node.js</span>
                <span className="px-2 py-1 bg-green-500/30 text-green-200 rounded text-xs">AWS</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-purple-900">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-white mb-8"
          >
            Let's Build Something Amazing
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/80 mb-8 max-w-2xl mx-auto"
          >
            Ready to discuss your next healthcare analytics project?
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-4 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
              >
                Start a Conversation
              </motion.button>
            </Link>
            <Link href="/experience">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-lg font-semibold border border-white/20 hover:bg-white/20 transition-colors"
              >
                View Experience
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  )
}