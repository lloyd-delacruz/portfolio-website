"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, ChevronRight } from "lucide-react";
import Link from "next/link";

const experiences = [
  {
    id: 1,
    title: "Rehabilitation Assistant",
    company: "Vancouver Coastal Health",
    location: "Vancouver, BC",
    period: "2016 - Present",
    type: "Full-time",
    description: "Deliver physiotherapy and occupational therapy interventions across various healthcare sites, including Vancouver General Hospital, Richmond Hospital, and Lions Gate Hospital. Collaborate with multidisciplinary teams supporting over 200+ patient plans annually.",
    achievements: [
      "Support 200+ patient plans annually across multiple healthcare sites",
      "Collaborate with multidisciplinary teams in Neurology, General Surgery, Orthopedics/Trauma, ICU, and Rehabilitation",
      "Spearheaded wheelchair inventory optimization project with Cerner integration",
      "Maintain compassionate patient care with high service standards"
    ],
    technologies: ["Cerner", "Healthcare Systems", "Patient Care", "Data Analysis", "Process Optimization", "Inventory Management"],
    color: "blue"
  },
  {
    id: 2,
    title: "Project Engineer (Project Management)",
    company: "IEQ GLOBAL PTE LTD",
    location: "Singapore", 
    period: "2010 - 2012",
    type: "Full-time",
    description: "Directed large-scale sustainable and energy-efficient projects involving contract management, system analysis, workflow design, and cross-functional coordination with architects, engineers, contractors, and government agencies.",
    achievements: [
      "Achieved 35% increase in successful bids through comprehensive tender documents",
      "Implemented Lean Six Sigma methodologies reducing project timelines by 15%",
      "Reduced project costs by 20% through process optimization",
      "Improved compliance rates by 10% through effective stakeholder communication"
    ],
    technologies: ["Lean Six Sigma", "Project Management", "Financial Analysis", "Database Systems", "Risk Assessment", "Contract Management"],
    color: "purple"
  },
  {
    id: 3,
    title: "Pharmaceutical Sales Representative",
    company: "United Laboratories",
    location: "Philippines",
    period: "2008 - 2010", 
    type: "Full-time",
    description: "Successfully reached and exceeded sales quota targets, achieving up to $1 million in total sales. Developed new market segments among ENT specialists and expanded territory coverage through strategic data analysis.",
    achievements: [
      "Achieved $1M in total sales with 20% increase in overall performance",
      "Developed ENT specialist market segment with 30% increase in product adoption",
      "Expanded territory coverage resulting in 25% growth in territory sales",
      "Exceeded sales targets by 15% through strategic data analysis"
    ],
    technologies: ["Sales Analytics", "Market Analysis", "CRM Systems", "Data Analysis", "Territory Management", "Client Relationship Management"],
    color: "cyan"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export function ExperienceSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50/30">
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
            Professional Experience
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A journey from industrial engineering to healthcare technology, 
            building solutions that make a real impact on patient care and organizational efficiency.
          </p>
        </motion.div>

        {/* Experience Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative"
        >
          {/* Timeline Line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-blue-200 via-purple-200 to-cyan-200"></div>

          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              variants={itemVariants}
              className={`relative mb-16 ${
                index % 2 === 0 ? 'md:pr-1/2' : 'md:pl-1/2 md:text-right'
              }`}
            >
              {/* Timeline Dot */}
              <div className={`hidden md:block absolute top-8 ${
                index % 2 === 0 ? 'right-0' : 'left-0'
              } w-4 h-4 ${
                exp.color === 'blue' ? 'bg-blue-500' : 
                exp.color === 'purple' ? 'bg-purple-500' : 'bg-cyan-500'
              } rounded-full border-4 border-white shadow-lg transform ${
                index % 2 === 0 ? 'translate-x-2' : '-translate-x-2'
              }`}></div>

              {/* Content Card */}
              <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className={`bg-white rounded-2xl shadow-xl p-8 border border-gray-100 ${
                  index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'
                }`}
              >
                {/* Header */}
                <div className={`mb-6 ${index % 2 === 1 ? 'md:text-right' : ''}`}>
                  <div className="flex items-center gap-2 mb-2 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span>{exp.period}</span>
                    <span className="text-gray-300">•</span>
                    <span>{exp.type}</span>
                  </div>
                  
                  <h3 className={`text-2xl font-bold ${
                    exp.color === 'blue' ? 'text-blue-600' : 
                    exp.color === 'purple' ? 'text-purple-600' : 'text-cyan-600'
                  } mb-2`}>
                    {exp.title}
                  </h3>
                  
                  <div className="flex items-center gap-2 text-lg font-semibold text-gray-700">
                    <span>{exp.company}</span>
                  </div>
                  
                  <div className="flex items-center gap-1 text-gray-500 mt-1">
                    <MapPin className="w-4 h-4" />
                    <span>{exp.location}</span>
                  </div>
                </div>

                {/* Description */}
                <p className={`text-gray-600 mb-6 leading-relaxed ${
                  index % 2 === 1 ? 'md:text-right' : ''
                }`}>
                  {exp.description}
                </p>

                {/* Key Achievements */}
                <div className={`mb-6 ${index % 2 === 1 ? 'md:text-right' : ''}`}>
                  <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    {index % 2 === 0 && <ChevronRight className="w-4 h-4 text-blue-500" />}
                    Key Achievements
                    {index % 2 === 1 && <ChevronRight className="w-4 h-4 text-blue-500 rotate-180" />}
                  </h4>
                  <ul className={`space-y-2 ${index % 2 === 1 ? 'md:text-right' : ''}`}>
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className="text-gray-600 flex items-start gap-2">
                        {index % 2 === 0 ? (
                          <>
                            <div className={`w-2 h-2 ${
                          exp.color === 'blue' ? 'bg-blue-400' : 
                          exp.color === 'purple' ? 'bg-purple-400' : 'bg-cyan-400'
                        } rounded-full mt-2 flex-shrink-0`}></div>
                            <span>{achievement}</span>
                          </>
                        ) : (
                          <>
                            <span className="flex-1">{achievement}</span>
                            <div className={`w-2 h-2 ${
                          exp.color === 'blue' ? 'bg-blue-400' : 
                          exp.color === 'purple' ? 'bg-purple-400' : 'bg-cyan-400'
                        } rounded-full mt-2 flex-shrink-0`}></div>
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div className={`${index % 2 === 1 ? 'md:text-right' : ''}`}>
                  <h4 className="font-semibold text-gray-800 mb-3">Technologies Used</h4>
                  <div className={`flex flex-wrap gap-2 ${
                    index % 2 === 1 ? 'md:justify-end' : ''
                  }`}>
                    {exp.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className={`px-3 py-1 ${
                          exp.color === 'blue' ? 'bg-blue-100 text-blue-800' : 
                          exp.color === 'purple' ? 'bg-purple-100 text-purple-800' : 'bg-cyan-100 text-cyan-800'
                        } rounded-full text-sm font-medium`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-gray-600 mb-6">
            Interested in my professional journey and how I can contribute to your team?
          </p>
          <Link href="/contact">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              Get In Touch
              <ChevronRight className="w-4 h-4 ml-2" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}