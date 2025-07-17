'use client'

import { motion } from 'framer-motion'
import { ArrowDown, Download, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { fadeInUp, staggerContainer } from '@/lib/utils'

const HeroSection = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const offsetTop = element.offsetTop - 80
      window.scrollTo({ top: offsetTop, behavior: 'smooth' })
    }
  }

  return (
    <section 
      id="home"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-primary/80 to-primary/60 text-primary-foreground relative overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-white/10 rounded-full mix-blend-overlay filter blur-xl animate-blob" />
        <div className="absolute top-3/4 right-1/4 w-72 h-72 bg-white/10 rounded-full mix-blend-overlay filter blur-xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-white/10 rounded-full mix-blend-overlay filter blur-xl animate-blob animation-delay-4000" />
      </div>

      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto"
      >
        {/* Status Badge */}
        <motion.div
          variants={fadeInUp}
          className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-white/20 backdrop-blur-sm border border-white/30 mb-8"
        >
          <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
          Available for new opportunities
        </motion.div>

        {/* Main Title */}
        <motion.h1
          variants={fadeInUp}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6"
        >
          Hi, I&apos;m{' '}
          <span className="bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent">
            Lloyd Dela Cruz
          </span>
        </motion.h1>

        <motion.h2
          variants={fadeInUp}
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 text-white/90"
        >
          Code Architect
        </motion.h2>

        {/* Description */}
        <motion.p
          variants={fadeInUp}
          className="text-lg sm:text-xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          Bridging healthcare and technology through code. Industrial Engineer turned Data Scientist, 
          combining healthcare experience with full-stack development expertise to create innovative solutions.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        >
          <Button
            size="lg"
            variant="secondary"
            className="w-full sm:w-auto bg-white text-primary hover:bg-white/90"
            onClick={() => scrollToSection('projects')}
          >
            <Eye className="mr-2 h-5 w-5" />
            View My Work
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10"
            onClick={() => scrollToSection('contact')}
          >
            Contact Me
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10"
          >
            <Download className="mr-2 h-5 w-5" />
            Download CV
          </Button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          variants={fadeInUp}
          className="animate-bounce cursor-pointer"
          onClick={() => scrollToSection('about')}
        >
          <ArrowDown className="h-6 w-6 text-white/60 mx-auto" />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default HeroSection