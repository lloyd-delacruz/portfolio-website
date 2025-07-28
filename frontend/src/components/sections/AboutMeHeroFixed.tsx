"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

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
                                Results-driven data analytics professional with 20+ years of cross-functional experience—8 of which are in healthcare operations, project management, and clinical optimization. Currently completing an MSc in Data Analytics at Eastern University (expected Dec 2025), while contributing to patient care and interdisciplinary collaboration as a Rehabilitation Assistant at Vancouver Coastal Health, supporting Neurology, General Surgery, Orthopedics/Trauma, ICU, and Rehab units.
                            </p>
                            
                            <p className="text-lg text-blue-200 mb-8 leading-relaxed">
                                Certified in BrainStation Data Analytics, Google Data Analytics, DeepLearning.AI Data Engineering, and AWS AI Practitioner. Proficient in SQL, Python, R, and Tableau, with a strong focus on data-driven decision-making, workflow optimization, and visual storytelling. Adept at designing performance measurement frameworks and building insightful dashboards that enhance clinical and operational efficiency. Successfully led large-scale initiatives at IEQ Global Singapore, applying Lean Six Sigma methodologies to reduce project timelines by 15% and cut operational costs by 20%, demonstrating the power of analytics in real-world impact.
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
                                {/* Main photo container */}
                                <div className="relative w-80 h-96 mx-auto">
                                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-400/30 to-purple-400/30 blur-sm"></div>
                                    <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl">
                                        <Image
                                            src="/images/my_photo.jpeg"
                                            alt="Lloyd Dela Cruz - Professional Photo"
                                            fill
                                            sizes="(max-width: 768px) 320px, 320px"
                                            className="object-cover object-top scale-90"
                                            priority
                                        />
                                        {/* Subtle overlay for depth */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent"></div>
                                    </div>
                                </div>
                                
                                {/* Floating Background Elements */}
                                <div className="absolute -top-6 -right-6 w-20 h-20 bg-cyan-400/20 rounded-full blur-xl animate-pulse"></div>
                                <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-purple-400/20 rounded-full blur-xl animate-pulse animation-delay-1000"></div>
                                <div className="absolute top-1/2 -right-8 w-16 h-16 bg-blue-400/15 rounded-full blur-lg"></div>
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
                            Results-driven data analytics professional with 20+ years of cross-functional experience—8 of which are in healthcare operations, project management, and clinical optimization. Currently completing an MSc in Data Analytics at Eastern University (expected Dec 2025), while contributing to patient care and interdisciplinary collaboration as a Rehabilitation Assistant at Vancouver Coastal Health, supporting Neurology, General Surgery, Orthopedics/Trauma, ICU, and Rehab units.
                        </p>
                        
                        <p className="text-lg text-blue-200 mb-8 leading-relaxed">
                            Certified in BrainStation Data Analytics, Google Data Analytics, DeepLearning.AI Data Engineering, and AWS AI Practitioner. Proficient in SQL, Python, R, and Tableau, with a strong focus on data-driven decision-making, workflow optimization, and visual storytelling. Adept at designing performance measurement frameworks and building insightful dashboards that enhance clinical and operational efficiency. Successfully led large-scale initiatives at IEQ Global Singapore, applying Lean Six Sigma methodologies to reduce project timelines by 15% and cut operational costs by 20%, demonstrating the power of analytics in real-world impact.
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
                            {/* Main photo container */}
                            <div className="relative w-80 h-96 mx-auto">
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-400/30 to-purple-400/30 blur-sm"></div>
                                <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl">
                                    <Image
                                        src="/images/my_photo.jpeg"
                                        alt="Lloyd Dela Cruz - Professional Photo"
                                        fill
                                        sizes="(max-width: 768px) 320px, 320px"
                                        className="object-cover object-top scale-90"
                                        priority
                                    />
                                    {/* Subtle overlay for depth */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent"></div>
                                </div>
                            </div>
                            
                            {/* Floating Background Elements */}
                            <div className="absolute -top-6 -right-6 w-20 h-20 bg-cyan-400/20 rounded-full blur-xl animate-pulse"></div>
                            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-purple-400/20 rounded-full blur-xl animate-pulse animation-delay-1000"></div>
                            <div className="absolute top-1/2 -right-8 w-16 h-16 bg-blue-400/15 rounded-full blur-lg"></div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}