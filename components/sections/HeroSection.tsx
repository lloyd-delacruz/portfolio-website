'use client'

import React from "react"
import { motion } from "framer-motion"
import { Vortex } from "@/components/ui/vortex"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { Container } from "@/components/ui/Container"
import { ArrowRight, Download, Github, Linkedin, Mail, ChevronDown, Sparkles } from "lucide-react"
import Link from "next/link"

const fadeInUpVariants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    scale: 0.95 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
}

const staggerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
}

const scaleVariants = {
  hover: { 
    scale: 1.02,
    transition: { duration: 0.2 }
  },
  tap: { 
    scale: 0.98,
    transition: { duration: 0.1 }
  }
}

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-900 text-white">
      <Vortex
        backgroundColor="black"
        rangeY={800}
        particleCount={500}
        baseHue={120}
        className="flex items-center justify-center w-full h-full"
      >
        {/* Enhanced gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-950/20 via-transparent to-secondary-950/20 pointer-events-none" />
        
        <Container size="lg" className="relative z-10">
          <motion.div
            variants={staggerVariants}
            initial="hidden"
            animate="visible"
            className="text-center space-y-4 md:space-y-6 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
          >
            {/* Status Badge */}
            <motion.div variants={fadeInUpVariants} className="flex justify-center">
              <Badge 
                variant="outline" 
                size="md"
                className="border-primary-400/40 bg-primary-950/60 text-primary-200 backdrop-blur-md hover:border-primary-400/60 transition-all duration-300"
              >
                <Sparkles className="w-3 h-3 mr-2 text-primary-400" />
                Available for Healthcare Analytics Projects
              </Badge>
            </motion.div>

            {/* Professional Title */}
            <motion.div variants={fadeInUpVariants}>
              <p className="text-primary-300 text-sm md:text-base font-medium tracking-[0.15em] uppercase">
                Healthcare Data Science Leader
              </p>
            </motion.div>

            {/* Main Heading */}
            <motion.div variants={fadeInUpVariants} className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] tracking-tight">
                <span className="text-white">Revolutionizing Healthcare</span>
                <br />
                <span className="bg-gradient-to-r from-primary-400 via-primary-300 to-secondary-400 bg-clip-text text-transparent">
                  with Intelligent Analytics
                </span>
              </h1>
            </motion.div>

            {/* Description */}
            <motion.div variants={fadeInUpVariants} className="px-4 sm:px-0">
              <p className="text-gray-300 text-lg md:text-xl lg:text-2xl max-w-4xl mx-auto leading-relaxed">
                Combining <span className="text-white font-semibold">20+ years of clinical expertise</span> with 
                advanced data science to unlock actionable insights that{" "}
                <span className="text-primary-300 font-medium">transform patient care</span> and 
                optimize healthcare delivery
              </p>
            </motion.div>

            {/* Call-to-Action Buttons */}
            <motion.div variants={fadeInUpVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <motion.div variants={scaleVariants} whileHover="hover" whileTap="tap">
                <Button 
                  size="lg"
                  variant="primary"
                  className="w-full sm:w-auto min-w-[200px] h-12 text-base font-semibold bg-primary-600 hover:bg-primary-700 text-white hover:text-white shadow-xl shadow-primary-600/30 hover:shadow-primary-600/50 transition-all duration-300 border border-primary-500/30"
                  rightIcon={<ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />}
                  asChild
                >
                  <Link href="/projects">
                    View My Portfolio
                  </Link>
                </Button>
              </motion.div>
              
              <motion.div variants={scaleVariants} whileHover="hover" whileTap="tap">
                <Button 
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto min-w-[200px] h-12 text-base font-semibold bg-white/10 hover:bg-white/20 text-white hover:text-white border-white/30 hover:border-white/50 shadow-lg backdrop-blur-sm transition-all duration-300"
                  leftIcon={<Download className="w-5 h-5" />}
                  asChild
                >
                  <Link href="/documents/Lloyd_dela_Cruz_Resume.pdf" download>
                    Download Resume
                  </Link>
                </Button>
              </motion.div>
            </motion.div>

            {/* Stats Grid */}
            <motion.div variants={fadeInUpVariants} className="pt-8 md:pt-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-6xl mx-auto">
                {[
                  { number: "20+", label: "Years Clinical & Analytics Experience" },
                  { number: "100+", label: "Healthcare Data Projects" },
                  { number: "$50M+", label: "Healthcare Cost Savings Generated" }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="text-center group cursor-default"
                  >
                    <div className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 transition-colors group-hover:text-primary-300">
                      {stat.number}
                    </div>
                    <div className="text-sm md:text-base lg:text-lg text-gray-400 uppercase tracking-wider font-medium leading-relaxed">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Discover More - positioned to align with middle stat */}
            <motion.div 
              variants={fadeInUpVariants} 
              className="pt-6 md:pt-8 pb-2 md:pb-3 flex justify-center"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-6xl mx-auto w-full">
                <div className="hidden md:block"></div>
                <div className="flex justify-center">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                    className="hidden md:block"
                  >
                    <motion.button
                      onClick={() => window.scrollTo({ top: window.innerHeight * 0.8, behavior: 'smooth' })}
                      className="flex flex-col items-center space-y-3 text-gray-400 hover:text-white transition-colors group cursor-pointer"
                      whileHover={{ y: -2 }}
                      aria-label="Scroll to next section"
                    >
                      <span className="text-xs uppercase tracking-wider font-medium bg-gray-900/90 px-4 py-2 rounded-md backdrop-blur-sm border border-white/10">
                        Discover More
                      </span>
                      <div className="relative flex flex-col items-center">
                        <div className="w-6 h-10 border-2 border-current rounded-full flex justify-center transition-colors">
                          <motion.div
                            animate={{ y: [0, 8, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="w-1.5 h-2 bg-current rounded-full mt-1.5"
                          />
                        </div>
                        <ChevronDown className="w-4 h-4 mt-1 transition-transform group-hover:translate-y-1" />
                      </div>
                    </motion.button>
                  </motion.div>
                </div>
                <div className="hidden md:block"></div>
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={fadeInUpVariants} className="pb-8 md:pb-12 pt-2 md:pt-4">
              <div className="flex items-center justify-center gap-8 md:gap-12">
                {[
                  { icon: Linkedin, href: "https://linkedin.com/in/lloyddelacruz", label: "LinkedIn" },
                  { icon: Github, href: "https://github.com/lloyddelacruz", label: "GitHub" },
                  { icon: Mail, href: "mailto:lloyd@example.com", label: "Email" }
                ].map(({ icon: Icon, href, label }) => (
                  <motion.div
                    key={label}
                    whileHover={{ scale: 1.15, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative group"
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-12 w-12 p-0 text-gray-400 hover:text-white hover:bg-white/15 rounded-full transition-all duration-300 flex items-center justify-center border border-white/10 hover:border-white/30 backdrop-blur-sm"
                      asChild
                    >
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                      >
                        <Icon className="w-5 h-5" />
                      </a>
                    </Button>
                    <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                      <span className="text-xs text-gray-400 whitespace-nowrap bg-gray-900/80 px-2 py-1 rounded backdrop-blur-sm">
                        {label}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </Container>

      </Vortex>
    </section>
  )
}