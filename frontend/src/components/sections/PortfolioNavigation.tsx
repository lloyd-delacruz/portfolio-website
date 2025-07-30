'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Briefcase, FolderOpen, Brain, GraduationCap, ChevronDown, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const portfolioItems = [
  {
    id: 'about',
    title: 'About Me',
    icon: User,
    color: 'blue',
    gradient: 'from-blue-500/20 to-purple-500/20',
    link: '/about',
    description: 'Learn about my journey from industrial engineering to healthcare frontline worker',
    badge: '20+ Years Experience',
    details: {
      highlights: [
        'BSc Industrial Engineering background',
        'MSc Data Analytics (Dec 2025)',
        'AWS AI Practitioner certified',
        'Healthcare transformation specialist'
      ],
      experience: '20+ years of professional experience across multiple industries',
      focus: 'Bridging engineering principles with healthcare innovation'
    }
  },
  {
    id: 'experience',
    title: 'Experience',
    icon: Briefcase,
    color: 'green',
    gradient: 'from-green-500/20 to-blue-500/20',
    link: '/experience',
    description: 'Explore my professional journey and key achievements in healthcare transformation',
    badge: 'VCH Healthcare Leader',
    details: {
      highlights: [
        'Vancouver Coastal Health - Rehabilitation Assistant',
        'IEQ Global - Project Engineer (Project Management)',
        'United Laboratories - Pharmaceutical Sales',
        'Process optimization and data analytics expert'
      ],
      experience: 'Healthcare operations, project management, and pharmaceutical sales',
      focus: 'Optimizing patient care through data-driven solutions'
    }
  },
  {
    id: 'projects',
    title: 'Projects',
    icon: FolderOpen,
    color: 'purple',
    gradient: 'from-purple-500/20 to-pink-500/20',
    link: '/projects',
    description: 'Discover innovative solutions in healthcare analytics and AI implementation',
    badge: 'AI & Data Analytics',
    details: {
      highlights: [
        'Healthcare analytics dashboards',
        'AI-powered process optimization',
        'Wheelchair inventory management system',
        'Patient care workflow automation'
      ],
      experience: 'Full-stack development with healthcare focus',
      focus: 'Building solutions that improve patient outcomes and operational efficiency'
    }
  },
  {
    id: 'skills',
    title: 'Skills & Expertise',
    icon: Brain,
    color: 'orange',
    gradient: 'from-orange-500/20 to-red-500/20',
    link: '/skills',
    description: 'Comprehensive technical skills across data science, AI, and healthcare domains',
    badge: 'Technical Proficiency',
    details: {
      highlights: [
        'Python, JavaScript, TypeScript',
        'React, Next.js, Node.js',
        'Machine Learning & AI',
        'AWS Cloud Services & AI Tools'
      ],
      experience: 'Full-stack development, data analytics, and AI implementation',
      focus: 'Leveraging technology to solve complex healthcare challenges'
    }
  },
  {
    id: 'education',
    title: 'Education',
    icon: GraduationCap,
    color: 'indigo',
    gradient: 'from-indigo-500/20 to-blue-500/20',
    link: '/education',
    description: 'Academic foundation and continuous learning in data analytics and engineering',
    badge: 'MSc Data Analytics',
    details: {
      highlights: [
        'MSc Data Analytics (Dec 2025) - University of Hertfordshire',
        'BSc Industrial Engineering - Technological University Philippines',
        'AWS AI Practitioner Certification',
        'Continuous learning in emerging technologies'
      ],
      experience: 'Strong academic foundation with practical application',
      focus: 'Combining theoretical knowledge with real-world problem solving'
    }
  }
]

export default function PortfolioNavigation() {
  const [expandedItem, setExpandedItem] = useState<string | null>(null)

  const handleItemClick = (itemId: string) => {
    setExpandedItem(expandedItem === itemId ? null : itemId)
  }

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return {
          icon: 'text-blue-300',
          badge: 'text-blue-300',
          border: 'border-blue-300/30',
          highlight: 'text-blue-200'
        }
      case 'green':
        return {
          icon: 'text-green-300',
          badge: 'text-green-300',
          border: 'border-green-300/30',
          highlight: 'text-green-200'
        }
      case 'purple':
        return {
          icon: 'text-purple-300',
          badge: 'text-purple-300',
          border: 'border-purple-300/30',
          highlight: 'text-purple-200'
        }
      case 'orange':
        return {
          icon: 'text-orange-300',
          badge: 'text-orange-300',
          border: 'border-orange-300/30',
          highlight: 'text-orange-200'
        }
      case 'indigo':
        return {
          icon: 'text-indigo-300',
          badge: 'text-indigo-300',
          border: 'border-indigo-300/30',
          highlight: 'text-indigo-200'
        }
      default:
        return {
          icon: 'text-gray-300',
          badge: 'text-gray-300',
          border: 'border-gray-300/30',
          highlight: 'text-gray-200'
        }
    }
  }

  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-3 xs:px-4 sm:px-6 2xl:px-8 3xl:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl xs:text-3xl sm:text-4xl font-bold text-white mb-4 xs:mb-6">
            Explore My Portfolio
          </h2>
          <p className="text-sm xs:text-base sm:text-lg md:text-xl text-white/70 max-w-3xl mx-auto">
            Discover my expertise across healthcare analytics, data science, and technology innovation
          </p>
        </motion.div>

        {/* Portfolio Cards in One Line */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          {portfolioItems.map((item, index) => {
            const Icon = item.icon
            const colors = getColorClasses(item.color)
            const isExpanded = expandedItem === item.id

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`bg-gradient-to-br ${item.gradient} backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden transition-all duration-300`}
              >
                {/* Main Card */}
                <div
                  onClick={() => handleItemClick(item.id)}
                  className="p-6 cursor-pointer hover:bg-white/5 transition-colors flex items-center justify-between"
                >
                  <div className="flex items-center space-x-6">
                    <Icon className={`h-8 w-8 ${colors.icon} flex-shrink-0`} />
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                      <p className="text-white/80 text-sm max-w-2xl">{item.description}</p>
                      <div className={`text-xs ${colors.badge} font-medium mt-2`}>
                        {item.badge}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <Link href={item.link}>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-lg font-medium border border-white/20 hover:bg-white/20 transition-colors text-sm"
                      >
                        View Details
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </motion.button>
                    </Link>
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="h-5 w-5 text-white/60" />
                    </motion.div>
                  </div>
                </div>

                {/* Expandable Content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className={`border-t ${colors.border} bg-black/20`}
                    >
                      <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {/* Highlights */}
                          <div>
                            <h4 className={`font-semibold ${colors.highlight} mb-3 text-sm uppercase tracking-wide`}>
                              Key Highlights
                            </h4>
                            <ul className="space-y-2">
                              {item.details.highlights.map((highlight, i) => (
                                <li key={i} className="text-white/70 text-sm flex items-start">
                                  <div className={`w-1.5 h-1.5 ${colors.icon.replace('text-', 'bg-')} rounded-full mt-2 mr-3 flex-shrink-0`}></div>
                                  <span>{highlight}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Experience */}
                          <div>
                            <h4 className={`font-semibold ${colors.highlight} mb-3 text-sm uppercase tracking-wide`}>
                              Experience
                            </h4>
                            <p className="text-white/70 text-sm leading-relaxed">
                              {item.details.experience}
                            </p>
                          </div>

                          {/* Focus */}
                          <div>
                            <h4 className={`font-semibold ${colors.highlight} mb-3 text-sm uppercase tracking-wide`}>
                              Focus Area
                            </h4>
                            <p className="text-white/70 text-sm leading-relaxed">
                              {item.details.focus}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}