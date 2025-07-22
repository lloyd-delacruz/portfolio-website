"use client";

import { motion } from "framer-motion";

export function JourneyTimeline() {
    return (
        <section className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 text-white relative overflow-hidden">
            
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
                <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-blue-400/10 rounded-full blur-2xl animate-float"></div>
            </div>

            <div className="max-w-6xl mx-auto px-4 relative z-10">
                
                {/* Enhanced Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    {/* Section Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8"
                    >
                        <div className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full mr-3 animate-pulse"></div>
                        <span className="text-lg font-medium text-blue-100">Career Evolution</span>
                    </motion.div>

                    <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent">
                        My Professional Journey
                    </h2>
                    <p className="text-xl md:text-2xl text-blue-200 max-w-3xl mx-auto leading-relaxed">
                        From Industrial Engineering to Healthcare Analytics - A 20+ year evolution
                    </p>
                </motion.div>

                {/* Interactive Timeline */}
                <div className="relative">
                    
                    {/* Animated Central Timeline Line */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full">
                        <motion.div
                            initial={{ height: 0 }}
                            whileInView={{ height: "100%" }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                            className="w-full bg-gradient-to-b from-cyan-400 via-blue-500 to-purple-500 rounded-full shadow-lg"
                        />
                    </div>
                    
                    {/* Timeline Items with Enhanced Animations */}
                    <div className="space-y-16">
                        
                        {/* Industrial Engineering Foundation */}
                        <motion.div
                            initial={{ opacity: 0, x: -100, scale: 0.8 }}
                            whileInView={{ opacity: 1, x: 0, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            whileHover={{ scale: 1.02, y: -5 }}
                            className="flex items-center justify-between group cursor-pointer"
                        >
                            <div className="w-5/12 text-right pr-8">
                                <motion.div
                                    whileHover={{ 
                                        scale: 1.05,
                                        boxShadow: "0 25px 50px rgba(6, 182, 212, 0.3)"
                                    }}
                                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border-l-4 border-cyan-400 shadow-xl hover:bg-white/15 transition-all duration-300 group-hover:border-cyan-300"
                                >
                                    {/* Timeline Period Badge */}
                                    <motion.div
                                        whileHover={{ scale: 1.1 }}
                                        className="inline-flex items-center px-4 py-2 bg-cyan-400/20 rounded-full text-cyan-200 text-sm font-medium mb-4"
                                    >
                                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                        </svg>
                                        2007-2012
                                    </motion.div>

                                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-cyan-200 transition-colors">
                                        Industrial Engineering & Early Career
                                    </h3>
                                    <p className="text-blue-200 leading-relaxed text-lg">
                                        BSc Industrial Engineering foundation followed by project management roles in Singapore. 
                                        Led sustainable energy projects, implemented Lean Six Sigma methodologies, reducing timelines by 15% and costs by 20%.
                                    </p>

                                    {/* Skills Tags */}
                                    <div className="flex flex-wrap gap-2 mt-6">
                                        {['Project Management', 'Lean Six Sigma', 'Process Optimization', 'Contract Management'].map((skill) => (
                                            <motion.span
                                                key={skill}
                                                whileHover={{ scale: 1.1 }}
                                                className="px-3 py-1 bg-cyan-400/30 text-cyan-100 rounded-lg text-sm font-medium"
                                            >
                                                {skill}
                                            </motion.span>
                                        ))}
                                    </div>
                                </motion.div>
                            </div>
                            
                            {/* Animated Timeline Node */}
                            <div className="w-2/12 flex justify-center">
                                <motion.div
                                    whileHover={{ scale: 1.3, rotate: 180 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                    className="w-6 h-6 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full border-4 border-white shadow-xl relative"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full animate-ping opacity-20"></div>
                                </motion.div>
                            </div>
                            <div className="w-5/12"></div>
                        </motion.div>

                        {/* Healthcare Transition & Education */}
                        <motion.div
                            initial={{ opacity: 0, x: 100, scale: 0.8 }}
                            whileInView={{ opacity: 1, x: 0, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            whileHover={{ scale: 1.02, y: -5 }}
                            className="flex items-center justify-between group cursor-pointer"
                        >
                            <div className="w-5/12"></div>
                            
                            {/* Animated Timeline Node */}
                            <div className="w-2/12 flex justify-center">
                                <motion.div
                                    whileHover={{ scale: 1.3, rotate: -180 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                    className="w-6 h-6 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full border-4 border-white shadow-xl relative"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full animate-ping opacity-20"></div>
                                </motion.div>
                            </div>
                            
                            <div className="w-5/12 pl-8">
                                <motion.div
                                    whileHover={{ 
                                        scale: 1.05,
                                        boxShadow: "0 25px 50px rgba(168, 85, 247, 0.3)"
                                    }}
                                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border-l-4 border-purple-400 shadow-xl hover:bg-white/15 transition-all duration-300 group-hover:border-purple-300"
                                >
                                    {/* Timeline Period Badge */}
                                    <motion.div
                                        whileHover={{ scale: 1.1 }}
                                        className="inline-flex items-center px-4 py-2 bg-purple-400/20 rounded-full text-purple-200 text-sm font-medium mb-4"
                                    >
                                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        2013-2016
                                    </motion.div>

                                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-purple-200 transition-colors">
                                        Healthcare Transition & Education
                                    </h3>
                                    <p className="text-blue-200 leading-relaxed text-lg">
                                        Pivotal transition into healthcare through Sustainability Management and Occupational/Physical Therapy Assistant education.
                                        Gained direct patient care experience and healthcare system insights.
                                    </p>

                                    {/* Skills Tags */}
                                    <div className="flex flex-wrap gap-2 mt-6">
                                        {['Healthcare Systems', 'Patient Care', 'Rehabilitation', 'Sustainability'].map((skill) => (
                                            <motion.span
                                                key={skill}
                                                whileHover={{ scale: 1.1 }}
                                                className="px-3 py-1 bg-purple-400/30 text-purple-100 rounded-lg text-sm font-medium"
                                            >
                                                {skill}
                                            </motion.span>
                                        ))}
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Healthcare Practice & Data Discovery */}
                        <motion.div
                            initial={{ opacity: 0, x: -100, scale: 0.8 }}
                            whileInView={{ opacity: 1, x: 0, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            whileHover={{ scale: 1.02, y: -5 }}
                            className="flex items-center justify-between group cursor-pointer"
                        >
                            <div className="w-5/12 text-right pr-8">
                                <motion.div
                                    whileHover={{ 
                                        scale: 1.05,
                                        boxShadow: "0 25px 50px rgba(34, 197, 94, 0.3)"
                                    }}
                                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border-l-4 border-green-400 shadow-xl hover:bg-white/15 transition-all duration-300 group-hover:border-green-300"
                                >
                                    {/* Timeline Period Badge */}
                                    <motion.div
                                        whileHover={{ scale: 1.1 }}
                                        className="inline-flex items-center px-4 py-2 bg-green-400/20 rounded-full text-green-200 text-sm font-medium mb-4"
                                    >
                                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                                            <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                                        </svg>
                                        2016-2022
                                    </motion.div>

                                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-green-200 transition-colors">
                                        Healthcare Practice & Data Discovery
                                    </h3>
                                    <p className="text-blue-200 leading-relaxed text-lg">
                                        8 years at Vancouver Coastal Health as Rehabilitation Assistant, supporting 200+ patient plans annually.
                                        Identified data-driven opportunities, including wheelchair inventory optimization with Cerner integration.
                                    </p>

                                    {/* Skills Tags */}
                                    <div className="flex flex-wrap gap-2 mt-6">
                                        {['Patient Care', 'Healthcare Systems', 'Process Improvement', 'Multidisciplinary Collaboration'].map((skill) => (
                                            <motion.span
                                                key={skill}
                                                whileHover={{ scale: 1.1 }}
                                                className="px-3 py-1 bg-green-400/30 text-green-100 rounded-lg text-sm font-medium"
                                            >
                                                {skill}
                                            </motion.span>
                                        ))}
                                    </div>
                                </motion.div>
                            </div>
                            
                            {/* Animated Timeline Node */}
                            <div className="w-2/12 flex justify-center">
                                <motion.div
                                    whileHover={{ scale: 1.3, rotate: 360 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                    className="w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full border-4 border-white shadow-xl relative"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full animate-ping opacity-20"></div>
                                </motion.div>
                            </div>
                            <div className="w-5/12"></div>
                        </motion.div>

                        {/* Data Analytics Mastery */}
                        <motion.div
                            initial={{ opacity: 0, x: 100, scale: 0.8 }}
                            whileInView={{ opacity: 1, x: 0, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                            whileHover={{ scale: 1.02, y: -5 }}
                            className="flex items-center justify-between group cursor-pointer"
                        >
                            <div className="w-5/12"></div>
                            
                            {/* Special Animated Timeline Node for Current */}
                            <div className="w-2/12 flex justify-center">
                                <motion.div
                                    animate={{ 
                                        scale: [1, 1.2, 1],
                                        rotate: [0, 360, 0]
                                    }}
                                    transition={{ 
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                    whileHover={{ scale: 1.4 }}
                                    className="w-8 h-8 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-full border-4 border-white shadow-2xl relative"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-red-500 rounded-full animate-pulse opacity-30"></div>
                                    
                                    {/* Current indicator */}
                                    <div className="absolute -top-3 -right-3 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-bounce">
                                        <div className="w-full h-full bg-green-400 rounded-full animate-ping opacity-40"></div>
                                    </div>
                                </motion.div>
                            </div>
                            
                            <div className="w-5/12 pl-8">
                                <motion.div
                                    whileHover={{ 
                                        scale: 1.05,
                                        boxShadow: "0 25px 50px rgba(249, 115, 22, 0.4)"
                                    }}
                                    className="bg-white/15 backdrop-blur-sm rounded-2xl p-8 border-l-4 border-orange-400 shadow-2xl hover:bg-white/20 transition-all duration-300 group-hover:border-orange-300 relative overflow-hidden"
                                >
                                    {/* Shine effect for current position */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 group-hover:animate-shine"></div>
                                    
                                    {/* Timeline Period Badge */}
                                    <motion.div
                                        whileHover={{ scale: 1.1 }}
                                        className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-400/20 to-red-400/20 rounded-full text-orange-200 text-sm font-medium mb-4 relative z-10"
                                    >
                                        <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                                        2022-Present
                                    </motion.div>

                                    <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-orange-200 to-yellow-200 bg-clip-text text-transparent mb-4 relative z-10">
                                        Data Analytics & AI Transformation
                                    </h3>
                                    <p className="text-blue-100 leading-relaxed text-lg relative z-10">
                                        Mastering data analytics through multiple certifications and AWS AI Practitioner credential.
                                        Currently pursuing Master's in Data Analytics while building full-stack healthcare solutions.
                                    </p>

                                    {/* Enhanced Skills Tags for Current Role */}
                                    <div className="flex flex-wrap gap-2 mt-6 relative z-10">
                                        {['Python', 'SQL', 'Tableau', 'AWS AI', 'Data Engineering', 'Prompt Engineering'].map((skill) => (
                                            <motion.span
                                                key={skill}
                                                whileHover={{ scale: 1.1, backgroundColor: "rgba(251, 191, 36, 0.4)" }}
                                                className="px-3 py-1 bg-orange-400/30 text-orange-100 rounded-lg text-sm font-medium"
                                            >
                                                {skill}
                                            </motion.span>
                                        ))}
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}