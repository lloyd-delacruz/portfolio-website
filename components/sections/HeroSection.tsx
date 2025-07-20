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
    <section className="relative h-[65vh] min-h-[500px] max-h-[650px] overflow-hidden bg-gray-900 text-white w-full">
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
            className="text-center space-y-4"
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
              <p className="text-primary-300 text-sm md:text-base font-medium tracking-[0.1em] uppercase">
                Senior Healthcare Data Scientist
              </p>
            </motion.div>

            {/* Main Heading */}
            <motion.div variants={fadeInUpVariants} className="space-y-3">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.2] tracking-tight">
                <span className="text-white">Transforming Healthcare</span>
                <br />
                <span className="bg-gradient-to-r from-primary-400 via-primary-300 to-secondary-400 bg-clip-text text-transparent">
                  Through Data Science
                </span>
              </h1>
            </motion.div>

            {/* Description */}
            <motion.div variants={fadeInUpVariants} className="px-4">
              <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                Two decades of expertise bridging clinical practice with cutting-edge analytics,{" "}
                <span className="text-white font-medium">driving measurable improvements</span>{" "}
                in patient outcomes and operational efficiency
              </p>
            </motion.div>

            {/* Call-to-Action Buttons */}
            <motion.div variants={fadeInUpVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <motion.div variants={scaleVariants} whileHover="hover" whileTap="tap">
                <Button 
                  size="lg"
                  variant="primary"
                  className="w-full sm:w-auto min-w-[180px] h-11 text-sm font-medium bg-primary-600 hover:bg-primary-700 text-white hover:text-white shadow-lg shadow-primary-600/25 hover:shadow-primary-600/40 transition-all duration-300"
                  rightIcon={<ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
                  asChild
                >
                  <Link href="/projects">
                    Explore My Work
                  </Link>
                </Button>
              </motion.div>
              
              <motion.div variants={scaleVariants} whileHover="hover" whileTap="tap">
                <Button 
                  size="lg"
                  variant="primary"
                  className="w-full sm:w-auto min-w-[180px] h-11 text-sm font-medium bg-secondary-600 hover:bg-secondary-700 text-white hover:text-white shadow-lg shadow-secondary-600/25 hover:shadow-secondary-600/40 transition-all duration-300"
                  leftIcon={<Download className="w-4 h-4" />}
                  asChild
                >
                  <Link href="/documents/Lloyd_dela_Cruz_Resume.pdf" download>
                    Download Resume
                  </Link>
                </Button>
              </motion.div>
            </motion.div>

            {/* Stats Grid */}
            <motion.div variants={fadeInUpVariants} className="pt-8">
              <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                {[
                  { number: "20+", label: "Years Experience" },
                  { number: "50+", label: "Healthcare Projects" },
                  { number: "95%", label: "Client Satisfaction" }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="text-center group"
                  >
                    <div className="text-lg md:text-xl lg:text-2xl font-bold text-white mb-1 transition-colors group-hover:text-primary-300">
                      {stat.number}
                    </div>
                    <div className="text-xs text-gray-400 uppercase tracking-wider font-medium leading-tight">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={fadeInUpVariants} className="pt-6 pb-12">
              <div className="flex items-center justify-center gap-3">
                {[
                  { icon: Linkedin, href: "https://linkedin.com/in/lloyddelacruz", label: "LinkedIn" },
                  { icon: Github, href: "https://github.com/lloyddelacruz", label: "GitHub" },
                  { icon: Mail, href: "mailto:lloyd@example.com", label: "Email" }
                ].map(({ icon: Icon, href, label }) => (
                  <motion.div
                    key={label}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-12 w-12 p-0 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300 flex items-center justify-center"
                      asChild
                    >
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                      >
                        <Icon className="w-6 h-6" />
                      </a>
                    </Button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </Container>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        >
          <motion.button
            onClick={() => window.scrollTo({ top: window.innerHeight * 0.8, behavior: 'smooth' })}
            className="flex flex-col items-center space-y-1 text-gray-400 hover:text-white transition-colors group cursor-pointer"
            whileHover={{ y: -2 }}
            aria-label="Scroll to next section"
          >
            <span className="text-xs uppercase tracking-wider font-medium bg-gray-900/80 px-2 py-1 rounded backdrop-blur-sm">
              Discover More
            </span>
            <div className="relative">
              <div className="w-5 h-8 border-2 border-current rounded-full flex justify-center transition-colors">
                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="w-1 h-2 bg-current rounded-full mt-1"
                />
              </div>
              <ChevronDown className="w-3 h-3 mt-1 mx-auto transition-transform group-hover:translate-y-1" />
            </div>
          </motion.button>
        </motion.div>
      </Vortex>
    </section>
  )
}