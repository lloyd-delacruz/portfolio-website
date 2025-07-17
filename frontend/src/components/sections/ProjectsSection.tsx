"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowRight, Activity, MapPin, Database } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Healthcare Analytics Dashboard",
    subtitle: "Real-time Patient Monitoring & Predictive Analytics",
    description: "Comprehensive healthcare analytics platform that processes real-time patient data to provide predictive insights, reduce readmission rates, and improve patient outcomes through advanced machine learning algorithms.",
    longDescription: "Built for a major healthcare network serving 50,000+ patients, this platform integrates with existing EHR systems to provide real-time monitoring and predictive analytics. The system has successfully reduced patient readmission rates by 15% and improved early warning detection by 30%.",
    image: "/api/placeholder/600/400",
    category: "Healthcare Analytics",
    status: "Live in Production",
    impact: {
      patients: "50,000+",
      reduction: "15%",
      detection: "30%"
    },
    technologies: [
      "Python", "TensorFlow", "React", "Node.js", 
      "PostgreSQL", "Apache Kafka", "Docker", "AWS"
    ],
    features: [
      "Real-time patient monitoring",
      "Predictive readmission models", 
      "Automated alert systems",
      "Interactive data visualizations",
      "HIPAA-compliant architecture"
    ],
    links: {
      demo: "#",
      github: "#",
      case_study: "#"
    },
    color: "blue",
    icon: Activity
  },
  {
    id: 2,
    title: "Wheelchair Tracking System", 
    subtitle: "IoT-Based Medical Equipment Management",
    description: "Smart IoT solution for tracking and managing medical equipment in healthcare facilities. Features real-time location tracking, maintenance scheduling, and utilization analytics to optimize equipment usage.",
    longDescription: "Deployed across 3 major hospitals, this system tracks over 500 pieces of medical equipment in real-time. The solution has reduced equipment search time by 60% and improved maintenance compliance by 40%, resulting in significant cost savings.",
    image: "/api/placeholder/600/400",
    category: "IoT & Hardware",
    status: "Deployed at 3 Hospitals",
    impact: {
      equipment: "500+",
      time_saved: "60%",
      compliance: "40%"
    },
    technologies: [
      "Node.js", "MongoDB", "React Native", "Arduino", 
      "LoRaWAN", "GPS", "AWS IoT", "Express.js"
    ],
    features: [
      "Real-time GPS tracking",
      "Automated maintenance alerts",
      "Usage analytics dashboard",
      "Mobile app for staff",
      "Integration with facility systems"
    ],
    links: {
      demo: "#",
      github: "#", 
      case_study: "#"
    },
    color: "purple",
    icon: MapPin
  },
  {
    id: 3,
    title: "Medical Data Pipeline",
    subtitle: "HIPAA-Compliant ETL & Analytics Infrastructure", 
    description: "Scalable data pipeline processing millions of medical records with automated ETL processes, data validation, and real-time analytics. Built with enterprise-grade security and HIPAA compliance.",
    longDescription: "This enterprise data pipeline processes over 2 million medical records daily across multiple healthcare systems. The automated ETL processes ensure data quality and compliance while providing real-time analytics capabilities for clinical decision support.",
    image: "/api/placeholder/600/400",
    category: "Data Engineering",
    status: "Processing 2M+ Records Daily",
    impact: {
      records: "2M+",
      systems: "15+",
      uptime: "99.9%"
    },
    technologies: [
      "Apache Kafka", "Apache Spark", "PostgreSQL", "Redis",
      "Docker", "Kubernetes", "Python", "FastAPI"
    ],
    features: [
      "Real-time data processing",
      "Automated data validation",
      "HIPAA compliance monitoring", 
      "Scalable microservices architecture",
      "Advanced error handling & recovery"
    ],
    links: {
      demo: "#",
      github: "#",
      case_study: "#"
    },
    color: "cyan",
    icon: Database
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export function ProjectsSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Healthcare technology solutions that bridge the gap between complex data 
            and actionable insights, improving patient outcomes and operational efficiency.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-16"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              className={`flex flex-col ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } gap-12 items-center`}
            >
              {/* Project Image/Visual */}
              <div className="lg:w-1/2">
                <motion.div
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  transition={{ duration: 0.3 }}
                  className="relative rounded-2xl overflow-hidden shadow-2xl"
                >
                  <div className={`h-80 bg-gradient-to-br ${
                    project.color === 'blue' ? 'from-blue-100 to-blue-200' : 
                    project.color === 'purple' ? 'from-purple-100 to-purple-200' : 'from-cyan-100 to-cyan-200'
                  } flex items-center justify-center`}>
                    <project.icon className={`w-24 h-24 ${
                      project.color === 'blue' ? 'text-blue-600' : 
                      project.color === 'purple' ? 'text-purple-600' : 'text-cyan-600'
                    }`} />
                  </div>
                  <div className="absolute inset-0 bg-black/10"></div>
                </motion.div>
              </div>

              {/* Project Content */}
              <div className="lg:w-1/2 space-y-6">
                {/* Project Header */}
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-3 py-1 ${
                      project.color === 'blue' ? 'bg-blue-100 text-blue-800' : 
                      project.color === 'purple' ? 'bg-purple-100 text-purple-800' : 'bg-cyan-100 text-cyan-800'
                    } rounded-full text-sm font-semibold`}>
                      {project.category}
                    </span>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                      {project.status}
                    </span>
                  </div>
                  
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">
                    {project.title}
                  </h3>
                  
                  <h4 className={`text-xl ${
                    project.color === 'blue' ? 'text-blue-600' : 
                    project.color === 'purple' ? 'text-purple-600' : 'text-cyan-600'
                  } font-semibold mb-4`}>
                    {project.subtitle}
                  </h4>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-lg leading-relaxed">
                  {project.description}
                </p>

                {/* Impact Metrics */}
                <div className="grid grid-cols-3 gap-4">
                  {Object.entries(project.impact).map(([key, value]) => (
                    <div key={key} className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className={`text-2xl font-bold ${
                        project.color === 'blue' ? 'text-blue-600' : 
                        project.color === 'purple' ? 'text-purple-600' : 'text-cyan-600'
                      }`}>
                        {value}
                      </div>
                      <div className="text-sm text-gray-500 capitalize">
                        {key.replace('_', ' ')}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Key Features */}
                <div>
                  <h5 className="font-semibold text-gray-800 mb-3">Key Features</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {project.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className={`w-2 h-2 ${
                          project.color === 'blue' ? 'bg-blue-500' : 
                          project.color === 'purple' ? 'bg-purple-500' : 'bg-cyan-500'
                        } rounded-full`}></div>
                        <span className="text-gray-600 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technologies */}
                <div>
                  <h5 className="font-semibold text-gray-800 mb-3">Technologies Used</h5>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 pt-4">
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`inline-flex items-center px-6 py-3 ${
                      project.color === 'blue' ? 'bg-blue-600' : 
                      project.color === 'purple' ? 'bg-purple-600' : 'bg-cyan-600'
                    } text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all`}
                  >
                    View Case Study
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center px-6 py-3 bg-gray-800 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                  >
                    <Github className="w-4 h-4 mr-2" />
                    View Code
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Projects CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-20"
        >
          <p className="text-lg text-gray-600 mb-6">
            Want to see more of my work and detailed case studies?
          </p>
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            View All Projects
            <ArrowRight className="w-5 h-5 ml-2" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}