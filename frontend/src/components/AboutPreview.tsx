"use client";

import { motion } from "framer-motion";
import { Award, Users, Target, Heart, Brain, Zap } from "lucide-react";

const values = [
  {
    icon: Award,
    title: "Excellence",
    description: "Delivering high-quality solutions with precision and attention to detail"
  },
  {
    icon: Users,
    title: "Collaboration", 
    description: "Working closely with healthcare professionals to understand real needs"
  },
  {
    icon: Target,
    title: "Impact",
    description: "Focusing on solutions that make a measurable difference in healthcare"
  }
];

const skills = [
  "React & Next.js",
  "Python & Django", 
  "Healthcare Analytics",
  "Machine Learning",
  "Cloud Architecture",
  "Data Visualization",
  "API Development",
  "Database Design"
];

const achievements = [
  { number: "50+", label: "Healthcare Projects", color: "text-success" },
  { number: "98%", label: "Client Satisfaction", color: "text-primary" },
  { number: "3+", label: "Years Experience", color: "text-secondary" }
];

export default function AboutPreview() {
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
    <section id="about" className="section bg-background-subtle relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary rounded-full filter blur-3xl"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              About <span className="gradient-text">Me</span>
            </h2>
            <p className="lead max-w-3xl mx-auto">
              Bridging the gap between healthcare challenges and innovative technology solutions 
              through data-driven insights and cutting-edge development.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center mb-20">
            {/* Left Column - Image & Stats */}
            <motion.div variants={itemVariants} className="relative">
              <div className="relative max-w-md mx-auto lg:mx-0">
                {/* Main Image */}
                <div className="relative">
                  <div className="aspect-square bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8 border border-border">
                    <div className="w-full h-full bg-gradient-primary rounded-xl flex items-center justify-center text-white text-6xl font-bold shadow-2xl">
                      LD
                    </div>
                  </div>
                  
                  {/* Floating Achievement Cards */}
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="absolute -left-8 -bottom-6 card p-4 bg-background border shadow-xl"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-success rounded-lg flex items-center justify-center">
                        <Heart className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-lg font-bold text-success">Healthcare</div>
                        <div className="text-sm text-foreground-muted">Specialist</div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    viewport={{ once: true }}
                    className="absolute -right-8 top-1/4 card p-4 bg-background border shadow-xl"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                        <Brain className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-lg font-bold text-primary">Data Driven</div>
                        <div className="text-sm text-foreground-muted">Analytics</div>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Achievement Stats */}
                <motion.div
                  variants={itemVariants}
                  className="grid grid-cols-3 gap-4 mt-8"
                >
                  {achievements.map((achievement, index) => (
                    <motion.div
                      key={achievement.label}
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                      viewport={{ once: true }}
                      className="text-center card p-4"
                    >
                      <div className={`text-2xl font-bold ${achievement.color}`}>
                        {achievement.number}
                      </div>
                      <div className="text-sm text-foreground-muted mt-1">
                        {achievement.label}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>

            {/* Right Column - Content */}
            <motion.div variants={itemVariants} className="space-y-8">
              {/* Story */}
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold">My Journey</h3>
                <div className="space-y-4 text-foreground-muted">
                  <p>
                    I&apos;m passionate about leveraging data and technology to solve complex problems in healthcare. 
                    My work spans from developing full-stack applications to conducting in-depth healthcare analytics, 
                    always with a focus on creating meaningful impact.
                  </p>
                  <p>
                    With expertise in both data science and full-stack development, I bridge the gap between 
                    technical innovation and practical healthcare solutions, ensuring that cutting-edge technology 
                    translates into real-world benefits for healthcare professionals and patients.
                  </p>
                  <p>
                    My unique combination of technical skills and healthcare domain knowledge allows me to 
                    understand complex medical workflows and translate them into efficient, user-friendly digital solutions.
                  </p>
                </div>
              </div>

              {/* Skills Grid */}
              <div>
                <h4 className="text-lg font-semibold mb-4">Core Expertise</h4>
                <div className="grid grid-cols-2 gap-3">
                  {skills.map((skill, index) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      viewport={{ once: true }}
                      className="flex items-center space-x-2 text-sm"
                    >
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-foreground-muted">{skill}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <button className="btn btn-primary group">
                  <span className="flex items-center">
                    Download Resume
                    <Zap className="ml-2 w-4 h-4 group-hover:rotate-12 transition-transform duration-200" />
                  </span>
                </button>
              </motion.div>
            </motion.div>
          </div>

          {/* Values Section */}
          <motion.div variants={itemVariants}>
            <h3 className="text-3xl font-semibold text-center mb-12">
              What Drives <span className="gradient-text">Me</span>
            </h3>
            
            <div className="grid md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="card card-elevated p-8 text-center group hover:scale-105 transition-all duration-300"
                >
                  <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h4 className="text-xl font-semibold mb-4 group-hover:text-primary transition-colors duration-300">
                    {value.title}
                  </h4>
                  
                  <p className="text-foreground-muted leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}