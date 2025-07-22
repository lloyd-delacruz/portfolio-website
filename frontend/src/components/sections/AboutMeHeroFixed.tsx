"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function AboutMeHeroFixed() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return (
            <section className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 text-white">
                <div className="max-w-6xl mx-auto px-4">
                    
                    {/* Section Badge */}
                    <div className="text-center mb-12">
                        <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-medium">
                            About Lloyd Dela Cruz
                        </span>
                    </div>

                    {/* Main Story */}
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        
                        {/* Text Content */}
                        <div>
                            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                                From Industrial Engineering to 
                                <span className="bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
                                    {" "}Healthcare Innovation
                                </span>
                            </h2>
                            
                            <p className="text-xl text-blue-100 mb-6 leading-relaxed">
                                A results-driven analytics professional with 20+ years of healthcare, project management, and operational optimization experience. Currently completing my MSc in Data Analytics (Eastern University, Dec 2025) while serving as a Rehabilitation Assistant at Vancouver Coastal Health, supporting multidisciplinary teams across Neurology, General Surgery, Orthopedics/Trauma, ICU, and Rehabilitation units.
                            </p>
                            
                            <p className="text-lg text-blue-200 mb-8 leading-relaxed">
                                AWS AI Practitioner certified with expertise in SQL, Python, R, and Tableau. I excel at designing performance measurement frameworks, streamlining workflows, and delivering actionable insights through data visualization. Previously led large-scale projects at IEQ Global Singapore, implementing Lean Six Sigma methodologies that reduced project timelines by 15% and costs by 20%.
                            </p>
                            
                            {/* Key Stats */}
                            <div className="grid grid-cols-3 gap-6">
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-cyan-300">20+</div>
                                    <div className="text-sm text-blue-300">Years Experience</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-cyan-300">200+</div>
                                    <div className="text-sm text-blue-300">Patient Plans Annually</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-cyan-300">3</div>
                                    <div className="text-sm text-blue-300">VCH Hospital Sites</div>
                                </div>
                            </div>
                        </div>

                        {/* Visual Element */}
                        <div className="relative">
                            <div className="relative z-10">
                                <div className="w-full h-96 bg-gradient-to-br from-cyan-400/20 to-purple-400/20 rounded-2xl shadow-2xl flex items-center justify-center border border-white/10">
                                    <div className="text-center">
                                        <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        </div>
                                        <p className="text-white/60 text-sm">Professional Photo</p>
                                        <p className="text-white/40 text-xs">Coming Soon</p>
                                    </div>
                                </div>
                                {/* Floating Background Elements */}
                                <div className="absolute -top-4 -right-4 w-24 h-24 bg-cyan-400/20 rounded-full blur-xl"></div>
                                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-400/20 rounded-full blur-xl"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 text-white">
            <div className="max-w-6xl mx-auto px-4">
                
                {/* Section Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-medium">
                        About Lloyd Dela Cruz
                    </span>
                </motion.div>

                {/* Main Story */}
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    
                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                    >
                        <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                            From Industrial Engineering to 
                            <span className="bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
                                {" "}Healthcare Innovation
                            </span>
                        </h2>
                        
                        <p className="text-xl text-blue-100 mb-6 leading-relaxed">
                            A results-driven analytics professional with 20+ years of healthcare, project management, and operational optimization experience. Currently completing my MSc in Data Analytics (Eastern University, Dec 2025) while serving as a Rehabilitation Assistant at Vancouver Coastal Health, supporting multidisciplinary teams across Neurology, General Surgery, Orthopedics/Trauma, ICU, and Rehabilitation units.
                        </p>
                        
                        <p className="text-lg text-blue-200 mb-8 leading-relaxed">
                            AWS AI Practitioner certified with expertise in SQL, Python, R, and Tableau. I excel at designing performance measurement frameworks, streamlining workflows, and delivering actionable insights through data visualization. Previously led large-scale projects at IEQ Global Singapore, implementing Lean Six Sigma methodologies that reduced project timelines by 15% and costs by 20%.
                        </p>
                        
                        {/* Key Stats */}
                        <div className="grid grid-cols-3 gap-6">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-cyan-300">20+</div>
                                <div className="text-sm text-blue-300">Years Experience</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-cyan-300">200+</div>
                                <div className="text-sm text-blue-300">Patient Plans Annually</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-cyan-300">3</div>
                                <div className="text-sm text-blue-300">VCH Hospital Sites</div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Visual Element */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="relative"
                    >
                        <div className="relative z-10">
                            <div className="w-full h-96 bg-gradient-to-br from-cyan-400/20 to-purple-400/20 rounded-2xl shadow-2xl flex items-center justify-center border border-white/10">
                                <div className="text-center">
                                    <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <p className="text-white/60 text-sm">Professional Photo</p>
                                    <p className="text-white/40 text-xs">Coming Soon</p>
                                </div>
                            </div>
                            {/* Floating Background Elements */}
                            <div className="absolute -top-4 -right-4 w-24 h-24 bg-cyan-400/20 rounded-full blur-xl"></div>
                            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-400/20 rounded-full blur-xl"></div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}