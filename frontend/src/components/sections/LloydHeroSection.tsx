"use client";

import { HeroGeometric } from "@/components/ui/shape-landing-hero";
import { motion } from "framer-motion";
import { MapPin, Download, Eye, Mail } from "lucide-react";

function LloydHeroGeometric() {
    return (
        <div className="relative">
            <HeroGeometric 
                badge="Available for new opportunities"
                title1="Hi, I'm Lloyd Dela Cruz"
                title2="Code Architect"
            />
            
            {/* Custom content overlay */}
            <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2, duration: 0.8 }}
                    className="text-center"
                >
                    {/* Subtitle */}
                    <p className="text-lg md:text-xl text-white/70 mb-6 max-w-2xl mx-auto px-4">
                        Industrial Engineer turned Data Scientist, bridging healthcare and technology 
                        through innovative full-stack solutions.
                    </p>
                    
                    {/* Location */}
                    <div className="flex items-center justify-center text-white/60 mb-8">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>Vancouver, BC • Available Now</span>
                    </div>
                    
                    {/* Enhanced Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <motion.button
                            whileHover={{ 
                                scale: 1.05,
                                boxShadow: "0 20px 40px rgba(255, 255, 255, 0.3)"
                            }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold text-lg shadow-lg hover:bg-blue-50 transition-all duration-300 group"
                        >
                            <motion.div
                                whileHover={{ x: 5 }}
                                transition={{ duration: 0.3 }}
                                className="mr-2"
                            >
                                👁️
                            </motion.div>
                            View My Work
                            <motion.div
                                animate={{ x: [0, 5, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                →
                            </motion.div>
                        </motion.button>
                        
                        <motion.button
                            whileHover={{ 
                                scale: 1.05,
                                backgroundColor: "rgba(255, 255, 255, 0.25)"
                            }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center px-8 py-4 bg-white/20 backdrop-blur-sm text-white rounded-xl font-semibold text-lg border border-white/30 hover:border-white/50 transition-all duration-300"
                        >
                            <Mail className="h-5 w-5 mr-2" />
                            Contact Me
                        </motion.button>
                        
                        <motion.button
                            whileHover={{ 
                                scale: 1.05,
                                backgroundColor: "rgba(255, 255, 255, 0.25)"
                            }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center px-8 py-4 bg-white/20 backdrop-blur-sm text-white rounded-xl font-semibold text-lg border border-white/30 hover:border-white/50 transition-all duration-300"
                        >
                            <Download className="h-5 w-5 mr-2" />
                            Download CV
                        </motion.button>
                    </div>
                    
                    {/* Scroll Indicator */}
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white/70"
                    >
                        <span className="text-sm mb-2">Scroll to explore</span>
                        <motion.div
                            animate={{ y: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}

export { LloydHeroGeometric };