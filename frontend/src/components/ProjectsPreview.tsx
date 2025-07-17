'use client'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, BarChart3, MonitorSpeaker, Database, ExternalLink, Github } from "lucide-react"
import { motion } from "framer-motion"

const projects = [
  {
    title: "Healthcare Analytics Dashboard",
    description: "Comprehensive analytics platform for healthcare data visualization and insights, featuring real-time patient metrics and outcome predictions.",
    icon: BarChart3,
    category: "Healthcare Analytics",
    technologies: ["React", "Python", "PostgreSQL", "D3.js"],
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    title: "Wheelchair Tracking System",
    description: "Full-stack application for real-time wheelchair asset management in healthcare facilities, improving operational efficiency.",
    icon: MonitorSpeaker,
    category: "Full-Stack Development",
    technologies: ["Next.js", "Node.js", "MongoDB", "IoT"],
    gradient: "from-purple-500 to-pink-500"
  },
  {
    title: "Medical Data Pipeline",
    description: "Robust data processing pipeline for medical records, ensuring compliance with healthcare standards and data integrity.",
    icon: Database,
    category: "Data Engineering",
    technologies: ["Python", "Apache Airflow", "AWS", "Docker"],
    gradient: "from-green-500 to-emerald-500"
  }
]

export default function ProjectsPreview() {
  const handleScrollToContact = () => {
    const element = document.querySelector("#contact")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="w-full max-w-7xl mx-auto py-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Featured Projects</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore my work at the intersection of healthcare, data science, and technology
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="group"
          >
            <Card className="h-full flex flex-col justify-between bg-surface-elevated border border-border/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/20 hover:shadow-xl overflow-hidden">
              <div className="relative">
                {/* Gradient Header */}
                <div className={`h-2 bg-gradient-to-r ${project.gradient}`} />
                
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3 mb-4">
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`p-3 bg-gradient-to-r ${project.gradient} rounded-lg shadow-lg`}
                    >
                      <project.icon className="h-6 w-6 text-white" />
                    </motion.div>
                    <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                      {project.category}
                    </span>
                  </div>
                  <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    {project.description}
                  </CardDescription>
                  
                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-2 py-1 bg-muted rounded-md text-muted-foreground font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="pt-0 space-y-3">
                  <div className="flex gap-2 w-full">
                    <Button variant="ghost" className="flex-1 group-hover:bg-primary/5 transition-colors">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Demo
                    </Button>
                    <Button variant="ghost" className="flex-1 group-hover:bg-primary/5 transition-colors">
                      <Github className="h-4 w-4 mr-2" />
                      Code
                    </Button>
                  </div>
                  <Button variant="outline" className="w-full justify-between border-primary/20 hover:bg-primary/5 hover:border-primary/40 transition-all duration-300">
                    Learn More
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button 
            size="lg" 
            className="gradient-primary text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-glow"
            onClick={handleScrollToContact}
          >
            View All Projects
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )
}