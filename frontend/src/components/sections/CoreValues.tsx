"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

export function CoreValues() {
    return (
        <section className="py-20 bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800 text-white relative overflow-hidden">
            
            {/* Dynamic Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
                <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-blue-400/10 rounded-full blur-2xl animate-float"></div>
                <div className="absolute top-10 right-10 w-32 h-32 bg-pink-400/5 rounded-full blur-xl animate-float animation-delay-2000"></div>
            </div>

            {/* Sparkle Effect */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/3 left-1/3 w-2 h-2 bg-white rounded-full animate-ping"></div>
                <div className="absolute top-2/3 right-1/3 w-1 h-1 bg-cyan-300 rounded-full animate-ping animation-delay-2000"></div>
                <div className="absolute bottom-1/3 left-2/3 w-1.5 h-1.5 bg-purple-300 rounded-full animate-ping"></div>
            </div>

            <div className="max-w-6xl mx-auto px-4 relative z-10">
                
                {/* Enhanced Animated Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    {/* Floating Badges */}
                    <div className="flex justify-center items-center gap-4 mb-8">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="animate-float"
                        >
                            <Badge variant="secondary" className="bg-white/10 text-cyan-200 border-cyan-400/50">
                                💡 Innovation
                            </Badge>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="animate-float animation-delay-2000"
                        >
                            <Badge variant="secondary" className="bg-white/10 text-purple-200 border-purple-400/50">
                                ❤️ Empathy
                            </Badge>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 }}
                            className="animate-float"
                        >
                            <Badge variant="secondary" className="bg-white/10 text-blue-200 border-blue-400/50">
                                ⭐ Excellence
                            </Badge>
                        </motion.div>
                    </div>

                    {/* Main Gradient Header */}
                    <motion.h2
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-200 via-blue-200 to-purple-200 bg-clip-text text-transparent animate-gradient"
                    >
                        What Drives Me
                    </motion.h2>
                    
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="text-xl md:text-2xl text-blue-200 max-w-3xl mx-auto leading-relaxed"
                    >
                        The principles that guide my approach to healthcare technology
                    </motion.p>
                </motion.div>

                {/* Interactive Glassmorphism Cards */}
                <div className="grid md:grid-cols-3 gap-8">
                    
                    {/* Value 1: Innovation */}
                    <motion.div
                        initial={{ opacity: 0, y: 50, rotateY: -15 }}
                        whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1, duration: 0.8 }}
                        whileHover={{ 
                            y: -10, 
                            rotateY: 5,
                            scale: 1.02,
                            boxShadow: "0 25px 50px rgba(6, 182, 212, 0.4)"
                        }}
                        className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl hover:bg-white/15 transition-all duration-300 cursor-pointer group transform-gpu"
                    >
                        {/* Animated Icon Container */}
                        <motion.div
                            whileHover={{ scale: 1.1, rotate: 360 }}
                            transition={{ duration: 0.6 }}
                            className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center mb-8 shadow-lg group-hover:shadow-cyan-400/30"
                        >
                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </motion.div>
                        
                        <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-cyan-200 transition-colors">
                            Innovation First
                        </h3>
                        <p className="text-blue-200 leading-relaxed text-lg group-hover:text-blue-100 transition-colors">
                            Every healthcare challenge is an opportunity to innovate. I believe in pushing 
                            boundaries to create solutions that truly make a difference in patient care.
                        </p>
                        
                        {/* Floating Particles */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                            <div className="absolute top-4 right-4 w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
                            <div className="absolute bottom-4 left-4 w-1 h-1 bg-cyan-300 rounded-full animate-ping animation-delay-2000"></div>
                        </div>
                    </motion.div>

                    {/* Value 2: Empathy */}
                    <motion.div
                        initial={{ opacity: 0, y: 50, rotateY: 15 }}
                        whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        whileHover={{ 
                            y: -10, 
                            rotateY: -5,
                            scale: 1.02,
                            boxShadow: "0 25px 50px rgba(168, 85, 247, 0.4)"
                        }}
                        className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl hover:bg-white/15 transition-all duration-300 cursor-pointer group transform-gpu"
                    >
                        {/* Animated Icon Container */}
                        <motion.div
                            whileHover={{ scale: 1.1, rotate: -360 }}
                            transition={{ duration: 0.6 }}
                            className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mb-8 shadow-lg group-hover:shadow-purple-400/30"
                        >
                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </motion.div>
                        
                        <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-purple-200 transition-colors">
                            Human-Centered
                        </h3>
                        <p className="text-blue-200 leading-relaxed text-lg group-hover:text-blue-100 transition-colors">
                            Technology should serve humanity, not the other way around. Every line of code 
                            I write is focused on improving the human experience in healthcare.
                        </p>
                        
                        {/* Floating Particles */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                            <div className="absolute top-4 right-4 w-2 h-2 bg-purple-400 rounded-full animate-ping"></div>
                            <div className="absolute bottom-4 left-4 w-1 h-1 bg-pink-300 rounded-full animate-ping animation-delay-2000"></div>
                        </div>
                    </motion.div>

                    {/* Value 3: Excellence */}
                    <motion.div
                        initial={{ opacity: 0, y: 50, rotateY: -15 }}
                        whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        whileHover={{ 
                            y: -10, 
                            rotateY: 5,
                            scale: 1.02,
                            boxShadow: "0 25px 50px rgba(34, 197, 94, 0.4)"
                        }}
                        className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl hover:bg-white/15 transition-all duration-300 cursor-pointer group transform-gpu"
                    >
                        {/* Animated Icon Container */}
                        <motion.div
                            whileHover={{ scale: 1.1, rotate: 180 }}
                            transition={{ duration: 0.6 }}
                            className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-green-500 rounded-2xl flex items-center justify-center mb-8 shadow-lg group-hover:shadow-emerald-400/30"
                        >
                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                            </svg>
                        </motion.div>
                        
                        <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-emerald-200 transition-colors">
                            Quality Driven
                        </h3>
                        <p className="text-blue-200 leading-relaxed text-lg group-hover:text-blue-100 transition-colors">
                            In healthcare, there&apos;s no room for &quot;good enough.&quot; I&apos;m committed to delivering 
                            robust, reliable, and scalable solutions that healthcare professionals can trust.
                        </p>
                        
                        {/* Floating Particles */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                            <div className="absolute top-4 right-4 w-2 h-2 bg-emerald-400 rounded-full animate-ping"></div>
                            <div className="absolute bottom-4 left-4 w-1 h-1 bg-green-300 rounded-full animate-ping animation-delay-2000"></div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}