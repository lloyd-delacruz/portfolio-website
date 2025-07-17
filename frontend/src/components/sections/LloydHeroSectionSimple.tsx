"use client";

import { HeroGeometricSimple } from "@/components/ui/shape-landing-hero-simple";
import { MapPin, Download, Eye, Mail } from "lucide-react";
import { motion } from "framer-motion";

function LloydHeroGeometricSimple() {
    return (
        <div className="relative">
            <HeroGeometricSimple 
                badge="Available for new opportunities"
                title1="Hi, I'm Lloyd Dela Cruz"
                title2="Code Architect"
            />
            
            {/* Custom content overlay with animations */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 1.8, ease: "easeOut" }}
                className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20"
            >
                <div className="text-center">
                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 2, ease: "easeOut" }}
                        className="text-lg md:text-xl text-white/70 mb-6 max-w-2xl mx-auto px-4"
                    >
                        Industrial Engineer turned Data Scientist, bridging healthcare and technology 
                        through innovative full-stack solutions.
                    </motion.p>
                    
                    {/* Location */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 2.3, ease: "easeOut" }}
                        className="flex items-center justify-center text-white/60 mb-8"
                    >
                        <motion.div
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        >
                            <MapPin className="h-4 w-4 mr-2" />
                        </motion.div>
                        <span>Vancouver, BC • Available Now</span>
                    </motion.div>
                    
                    {/* Action Buttons with staggered animation */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 2.5, ease: "easeOut" }}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                    >
                        <motion.button
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                            className="inline-flex items-center px-6 py-3 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
                        >
                            <motion.div
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Eye className="h-4 w-4 mr-2" />
                            </motion.div>
                            View My Work
                        </motion.button>
                        
                        <motion.button
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                            className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-lg font-semibold border border-white/20 hover:bg-white/20 transition-colors"
                        >
                            <motion.div
                                whileHover={{ scale: 1.2 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Mail className="h-4 w-4 mr-2" />
                            </motion.div>
                            Contact Me
                        </motion.button>
                        
                        <motion.button
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                            className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-lg font-semibold border border-white/20 hover:bg-white/20 transition-colors"
                        >
                            <motion.div
                                whileHover={{ y: -2 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Download className="h-4 w-4 mr-2" />
                            </motion.div>
                            Download CV
                        </motion.button>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}

export { LloydHeroGeometricSimple };