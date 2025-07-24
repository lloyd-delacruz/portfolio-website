"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Download, Mail, MapPin, Calendar } from "lucide-react";

const skills = [
  "Data Analytics",
  "Full-Stack Development", 
  "Healthcare Technology",
  "Machine Learning",
  "Cloud Architecture"
];

const stats = [
  { number: "50+", label: "Projects Completed" },
  { number: "3+", label: "Years Experience" },
  { number: "100%", label: "Client Satisfaction" }
];

export default function Hero() {
  const [currentSkillIndex, setCurrentSkillIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const interval = setInterval(() => {
      setCurrentSkillIndex((prev) => (prev + 1) % skills.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth"
      });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background-subtle to-background-muted"></div>
      
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full mix-blend-multiply filter blur-xl animate-float"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-secondary/20 rounded-full mix-blend-multiply filter blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-72 h-72 bg-success/20 rounded-full mix-blend-multiply filter blur-xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="container mx-auto relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[80vh] py-20"
        >
          {/* Left Column - Content */}
          <div className="text-center lg:text-left space-y-8">
            {/* Status Badge */}
            <motion.div variants={itemVariants} className="inline-flex items-center space-x-2 bg-success/10 border border-success/20 rounded-full px-4 py-2 text-success text-sm font-medium">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span>Available for new opportunities</span>
            </motion.div>

            {/* Main Heading */}
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="hero-title">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-2">
                  Hi, I&apos;m
                </h2>
                <h1 className="hero-full-name text-4xl md:text-5xl lg:text-6xl font-bold leading-tight gradient-text">
                  Lloyd Dela Cruz
                </h1>
              </div>
              
              {/* Animated Subtitle */}
              <div className="text-xl md:text-2xl lg:text-3xl font-medium text-foreground-muted">
                <span>I specialize in </span>
                <motion.span
                  key={currentSkillIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="gradient-text font-semibold"
                >
                  {skills[currentSkillIndex]}
                </motion.span>
              </div>
            </motion.div>

            {/* Description */}
            <motion.p variants={itemVariants} className="lead max-w-2xl mx-auto lg:mx-0">
              Transforming healthcare through data-driven insights and innovative technology solutions. 
              I bridge the gap between complex healthcare challenges and cutting-edge digital innovation.
            </motion.p>

            {/* Location & Availability */}
            <motion.div variants={itemVariants} className="flex flex-wrap justify-center lg:justify-start gap-6 text-sm text-foreground-muted">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span>Philippines & Remote</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-primary" />
                <span>Available Immediately</span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={() => scrollToSection("projects")}
                className="btn btn-primary btn-lg group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  View My Work
                  <ChevronDown className="ml-2 w-4 h-4 group-hover:translate-y-1 transition-transform duration-200" />
                </span>
                <div className="absolute inset-0 bg-gradient-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              
              <button
                onClick={() => scrollToSection("contact")}
                className="btn btn-secondary btn-lg group"
              >
                <Mail className="mr-2 w-4 h-4" />
                Get In Touch
              </button>
              
              <button className="btn btn-secondary btn-lg group">
                <Download className="mr-2 w-4 h-4 group-hover:translate-y-1 transition-transform duration-200" />
                Download CV
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div variants={itemVariants} className="grid grid-cols-3 gap-8 pt-8 border-t border-border">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-2xl md:text-3xl font-bold gradient-text">{stat.number}</div>
                  <div className="text-sm text-foreground-muted mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Column - Professional Image */}
          <motion.div
            variants={itemVariants}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Main Image Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative z-10"
              >
                <div className="w-80 h-80 lg:w-96 lg:h-96 relative">
                  {/* Gradient Border */}
                  <div className="absolute inset-0 bg-gradient-accent rounded-2xl p-1">
                    <div className="w-full h-full bg-background rounded-2xl overflow-hidden">
                      {/* Placeholder for professional photo */}
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                        <div className="w-32 h-32 bg-gradient-primary rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-2xl">
                          LD
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating Elements */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 1 }}
                    className="absolute -left-6 top-20 card p-4 bg-background border shadow-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-success rounded-lg flex items-center justify-center">
                        <div className="w-4 h-4 bg-white rounded-sm"></div>
                      </div>
                      <div>
                        <div className="text-sm font-semibold">Healthcare Analytics</div>
                        <div className="text-xs text-foreground-muted">50+ Projects</div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 1.2 }}
                    className="absolute -right-6 bottom-20 card p-4 bg-background border shadow-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                        <div className="w-4 h-4 bg-white rounded-sm"></div>
                      </div>
                      <div>
                        <div className="text-sm font-semibold">Full-Stack Dev</div>
                        <div className="text-xs text-foreground-muted">3+ Years</div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-accent rounded-2xl opacity-20 blur-2xl -z-10 animate-pulse-glow"></div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center"
        >
          <button
            onClick={() => scrollToSection("about")}
            className="flex flex-col items-center space-y-2 text-foreground-muted hover:text-primary transition-colors duration-300 group"
          >
            <span className="text-sm">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown className="w-5 h-5 group-hover:text-primary" />
            </motion.div>
          </button>
        </motion.div>
      </div>
    </section>
  );
}