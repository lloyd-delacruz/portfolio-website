"use client";

import DisplayCards from "@/components/ui/display-cards";
import { Heart, Cloud, Database, Brain, Activity, Stethoscope } from "lucide-react";
import { motion } from "framer-motion";

const portfolioCards = [
  {
    icon: <Heart className="size-4 text-red-300" />,
    title: "Healthcare Analytics",
    description: "Patient data visualization platform",
    date: "Featured Project",
    iconClassName: "text-red-500",
    titleClassName: "text-red-500",
    className: "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <Cloud className="size-4 text-blue-300" />,
    title: "AWS Cloud Solutions",
    description: "Scalable healthcare infrastructure",
    date: "Current Work",
    iconClassName: "text-blue-500",
    titleClassName: "text-blue-500",
    className: "[grid-area:stack] translate-x-16 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <Database className="size-4 text-green-300" />,
    title: "Data Science Models",
    description: "ML for rehabilitation outcomes",
    date: "Research Project",
    iconClassName: "text-green-500",
    titleClassName: "text-green-500",
    className: "[grid-area:stack] translate-x-32 translate-y-20 hover:translate-y-10",
  },
];

const achievementCards = [
  {
    icon: <Stethoscope className="size-4 text-pink-300" />,
    title: "50+ Healthcare Projects",
    description: "End-to-end solutions delivered",
    date: "Career Highlight",
    iconClassName: "text-pink-500",
    titleClassName: "text-pink-500",
    className: "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <Brain className="size-4 text-purple-300" />,
    title: "AI/ML Expertise",
    description: "Deep learning for healthcare",
    date: "Specialized Skill",
    iconClassName: "text-purple-500",
    titleClassName: "text-purple-500",
    className: "[grid-area:stack] translate-x-16 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <Activity className="size-4 text-orange-300" />,
    title: "3+ Years Experience",
    description: "Full-stack development",
    date: "Professional Growth",
    iconClassName: "text-orange-500",
    titleClassName: "text-orange-500",
    className: "[grid-area:stack] translate-x-32 translate-y-20 hover:translate-y-10",
  },
];

export function FeaturedProjects() {
  return (
    <section id="featured" className="section relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/3 left-0 w-96 h-96 bg-primary rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-secondary rounded-full filter blur-3xl"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="lead max-w-3xl mx-auto">
            Showcasing innovative healthcare technology solutions that bridge the gap between 
            complex medical challenges and cutting-edge development.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Projects Display */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <div className="space-y-8">
              <div className="text-center lg:text-left">
                <h3 className="text-2xl font-semibold mb-4">
                  <span className="gradient-text">Technical Projects</span>
                </h3>
                <p className="text-foreground-muted mb-8">
                  Real-world applications demonstrating expertise in healthcare technology, 
                  cloud infrastructure, and data science.
                </p>
              </div>
              <DisplayCards cards={portfolioCards} />
            </div>
          </motion.div>

          {/* Achievements Display */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <div className="space-y-8">
              <div className="text-center lg:text-left">
                <h3 className="text-2xl font-semibold mb-4">
                  <span className="gradient-text">Key Achievements</span>
                </h3>
                <p className="text-foreground-muted mb-8">
                  Professional milestones highlighting impact in healthcare analytics, 
                  AI/ML development, and full-stack engineering.
                </p>
              </div>
              <DisplayCards cards={achievementCards} />
            </div>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16 pt-16 border-t border-border"
        >
          <h3 className="text-2xl font-semibold mb-6">
            Ready to Explore <span className="gradient-text">More Projects?</span>
          </h3>
          <p className="text-foreground-muted mb-8 max-w-2xl mx-auto">
            Dive deeper into my portfolio to see detailed case studies, technical implementations, 
            and the impact of each healthcare technology solution.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn btn-primary btn-lg group">
              <Database className="mr-2 w-5 h-5" />
              View All Projects
            </button>
            <button className="btn btn-secondary btn-lg group">
              <Activity className="mr-2 w-5 h-5" />
              See Case Studies
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default FeaturedProjects;