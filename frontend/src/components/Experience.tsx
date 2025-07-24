"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { 
  Briefcase, 
  GraduationCap, 
  Award, 
  Calendar,
  MapPin,
  ExternalLink,
  Building,
  Code,
  Brain,
  Users
} from "lucide-react";

const experiences = [
  {
    id: 1,
    type: "work",
    icon: Briefcase,
    company: "Healthcare Analytics Inc.",
    role: "Senior Data Analyst & Full-Stack Developer",
    period: "2022 - Present",
    location: "Remote",
    description: "Leading the development of data-driven healthcare solutions, building full-stack applications for medical data analysis, and creating machine learning models for patient outcome prediction.",
    achievements: [
      "Developed 15+ healthcare analytics dashboards serving 10,000+ users",
      "Reduced data processing time by 60% through optimized algorithms",
      "Led cross-functional team of 5 developers and data scientists",
      "Implemented HIPAA-compliant data pipelines handling 1M+ records daily"
    ],
    technologies: ["React", "Python", "PostgreSQL", "AWS", "Machine Learning"],
    color: "primary",
    link: "#"
  },
  {
    id: 2,
    type: "work", 
    icon: Code,
    company: "TechMed Solutions",
    role: "Full-Stack Developer",
    period: "2021 - 2022",
    location: "Philippines",
    description: "Developed healthcare management systems and patient tracking applications using modern web technologies.",
    achievements: [
      "Built 8 healthcare applications from concept to deployment",
      "Improved system performance by 40% through code optimization",
      "Mentored 3 junior developers on best practices",
      "Integrated with 5+ third-party medical APIs"
    ],
    technologies: ["Next.js", "Node.js", "MongoDB", "Docker"],
    color: "secondary",
    link: "#"
  },
  {
    id: 3,
    type: "education",
    icon: GraduationCap,
    company: "University of the Philippines",
    role: "Bachelor of Science in Computer Science",
    period: "2017 - 2021",
    location: "Philippines",
    description: "Focused on data science, machine learning, and healthcare informatics. Graduated Magna Cum Laude with specialization in Healthcare Technology.",
    achievements: [
      "Magna Cum Laude graduate (GPA: 3.8/4.0)",
      "Thesis: 'ML Models for Healthcare Outcome Prediction'",
      "President of Healthcare Tech Student Society",
      "Published 2 research papers on medical data analysis"
    ],
    technologies: ["Python", "R", "Machine Learning", "Data Analysis"],
    color: "success",
    link: "#"
  },
  {
    id: 4,
    type: "certification",
    icon: Award,
    company: "AWS Certified Solutions Architect",
    role: "Professional Certification",
    period: "2023",
    location: "Online",
    description: "Advanced cloud architecture certification focusing on healthcare compliance and scalable data solutions.",
    achievements: [
      "Passed with 95% score on first attempt",
      "Specialized in HIPAA-compliant cloud architectures",
      "Expert in serverless healthcare data processing"
    ],
    technologies: ["AWS", "Cloud Architecture", "Security"],
    color: "primary",
    link: "#"
  }
];

const typeConfig = {
  work: { label: "Work Experience", bgColor: "bg-primary/10", borderColor: "border-primary/30" },
  education: { label: "Education", bgColor: "bg-success/10", borderColor: "border-success/30" },
  certification: { label: "Certification", bgColor: "bg-secondary/10", borderColor: "border-secondary/30" }
};

export default function Experience() {
  const [selectedType, setSelectedType] = useState<string>("all");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const filteredExperiences = selectedType === "all" 
    ? experiences 
    : experiences.filter(exp => exp.type === selectedType);

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
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <section id="experience" className="section relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-secondary rounded-full filter blur-3xl"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              My <span className="gradient-text">Journey</span>
            </h2>
            <p className="lead max-w-3xl mx-auto">
              A timeline of my professional growth, education, and achievements in healthcare technology and data science.
            </p>
          </motion.div>

          {/* Filter Tabs */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4 mb-12">
            <button
              onClick={() => setSelectedType("all")}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedType === "all"
                  ? "bg-primary text-white shadow-lg"
                  : "bg-background border border-border text-foreground-muted hover:border-primary hover:text-primary"
              }`}
            >
              All Experience
            </button>
            {Object.entries(typeConfig).map(([type, config]) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedType === type
                    ? "bg-primary text-white shadow-lg"
                    : "bg-background border border-border text-foreground-muted hover:border-primary hover:text-primary"
                }`}
              >
                {config.label}
              </button>
            ))}
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-success transform md:-translate-x-px"></div>

            <div className="space-y-12">
              {filteredExperiences.map((experience, index) => (
                <motion.div
                  key={experience.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Timeline Node */}
                  <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-gradient-primary rounded-full transform -translate-x-2 md:-translate-x-2 border-4 border-background shadow-lg z-10"></div>

                  {/* Content Card */}
                  <div className={`w-full md:w-5/12 ml-20 md:ml-0 ${
                    index % 2 === 0 ? "md:mr-auto md:pr-12" : "md:ml-auto md:pl-12"
                  }`}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="card card-elevated p-6 relative group cursor-pointer"
                      onClick={() => setExpandedId(expandedId === experience.id ? null : experience.id)}
                    >
                      {/* Card Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            experience.color === "primary" ? "bg-gradient-primary" :
                            experience.color === "secondary" ? "bg-gradient-secondary" :
                            "bg-gradient-to-r from-success to-success/80"
                          }`}>
                            <experience.icon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <div className={`text-xs font-medium px-2 py-1 rounded-full ${
                              typeConfig[experience.type as keyof typeof typeConfig]?.bgColor
                            } ${typeConfig[experience.type as keyof typeof typeConfig]?.borderColor} border`}>
                              {typeConfig[experience.type as keyof typeof typeConfig]?.label}
                            </div>
                          </div>
                        </div>
                        <ExternalLink className="w-4 h-4 text-foreground-muted group-hover:text-primary transition-colors duration-300" />
                      </div>

                      {/* Company & Role */}
                      <div className="mb-3">
                        <h3 className="text-xl font-semibold mb-1 group-hover:text-primary transition-colors duration-300">
                          {experience.role}
                        </h3>
                        <div className="flex items-center text-foreground-muted text-sm space-x-4">
                          <div className="flex items-center space-x-1">
                            <Building className="w-4 h-4" />
                            <span>{experience.company}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{experience.period}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{experience.location}</span>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-foreground-muted mb-4 leading-relaxed">
                        {experience.description}
                      </p>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {experience.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-3 py-1 bg-muted text-foreground-muted text-sm rounded-full border"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Expandable Achievements */}
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{
                          height: expandedId === experience.id ? "auto" : 0,
                          opacity: expandedId === experience.id ? 1 : 0
                        }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 border-t border-border">
                          <h4 className="font-semibold mb-3 flex items-center">
                            <Award className="w-4 h-4 mr-2 text-primary" />
                            Key Achievements
                          </h4>
                          <ul className="space-y-2">
                            {experience.achievements.map((achievement, achIndex) => (
                              <motion.li
                                key={achIndex}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: achIndex * 0.05 }}
                                className="flex items-start space-x-2 text-sm text-foreground-muted"
                              >
                                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                                <span>{achievement}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>

                      {/* Expand Indicator */}
                      <motion.div
                        animate={{ rotate: expandedId === experience.id ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex justify-center mt-4 pt-4 border-t border-border"
                      >
                        <button className="text-primary hover:text-primary/80 transition-colors duration-200">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <motion.div
            variants={itemVariants}
            className="text-center mt-16 pt-16 border-t border-border"
          >
            <h3 className="text-2xl font-semibold mb-6">
              Ready to <span className="gradient-text">Collaborate?</span>
            </h3>
            <p className="text-foreground-muted mb-8 max-w-2xl mx-auto">
              I&apos;m always excited to work on new healthcare technology projects that can make a real difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn btn-primary btn-lg group">
                <Users className="mr-2 w-5 h-5" />
                Let&apos;s Work Together
              </button>
              <button className="btn btn-secondary btn-lg group">
                <Brain className="mr-2 w-5 h-5" />
                View My Skills
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}