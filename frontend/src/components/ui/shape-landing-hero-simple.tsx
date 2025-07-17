import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface HeroGeometricProps {
    badge?: string;
    title1: string;
    title2: string;
}

export function HeroGeometricSimple({ badge, title1, title2 }: HeroGeometricProps) {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
            {/* Navigation bridge - flowing design element */}
            <div className="absolute top-0 left-0 right-0 h-32 z-0">
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="absolute inset-0"
                >
                    {/* Flowing wave shape that bridges nav to hero */}
                    <svg
                        className="absolute top-0 left-0 w-full h-32"
                        viewBox="0 0 1440 128"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <motion.path
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                            d="M0,64 C240,96 480,32 720,64 C960,96 1200,32 1440,64 L1440,0 L0,0 Z"
                            fill="url(#heroGradient)"
                            fillOpacity="0.3"
                        />
                        <defs>
                            <linearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#3B82F6" />
                                <stop offset="50%" stopColor="#8B5CF6" />
                                <stop offset="100%" stopColor="#06B6D4" />
                            </linearGradient>
                        </defs>
                    </svg>
                    
                    {/* Floating geometric elements in the bridge area */}
                    {[...Array(8)].map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 0.6, scale: 1 }}
                            transition={{ 
                                duration: 1.5, 
                                delay: 0.5 + i * 0.1,
                                ease: "easeOut"
                            }}
                            className="absolute w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
                            style={{
                                left: `${10 + i * 10}%`,
                                top: `${20 + Math.sin(i) * 20}px`,
                                filter: 'blur(0.5px)'
                            }}
                        />
                    ))}
                </motion.div>
            </div>

            {/* Animated background shapes with motion */}
            <div className="absolute inset-0">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-xl"
                />
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 2.5, delay: 0.3, ease: "easeOut" }}
                    className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-xl"
                />
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 2.2, delay: 0.6, ease: "easeOut" }}
                    className="absolute top-1/2 right-1/3 w-48 h-48 bg-cyan-500/20 rounded-full blur-xl"
                />
            </div>

            {/* Animated geometric grid overlay */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.1 }}
                transition={{ duration: 1.5, delay: 1 }}
                className="absolute inset-0"
            >
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_49%,rgba(255,255,255,0.1)_49%,rgba(255,255,255,0.1)_51%,transparent_51%)] bg-[length:20px_20px]" />
            </motion.div>

            {/* Main content with staggered animations */}
            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                {badge && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="mb-8"
                    >
                        <Badge variant="secondary" className="px-4 py-2 bg-white/10 backdrop-blur-sm text-white border-white/20">
                            {badge}
                        </Badge>
                    </motion.div>
                )}

                <motion.h1
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
                    className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4"
                >
                    {title1}
                </motion.h1>

                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
                    className="text-2xl md:text-4xl lg:text-5xl font-light text-blue-200 mb-8"
                >
                    {title2}
                </motion.h2>
            </div>

            {/* Animated floating particles */}
            {[...Array(12)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                        opacity: [0.3, 0.8, 0.3], 
                        scale: [0.5, 1, 0.5],
                        y: [0, -20, 0]
                    }}
                    transition={{
                        duration: 3 + i * 0.5,
                        delay: 1.5 + i * 0.2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute w-2 h-2 bg-white/30 rounded-full"
                    style={{
                        left: `${10 + (i * 8)}%`,
                        top: `${20 + Math.sin(i) * 40}%`,
                    }}
                />
            ))}
        </section>
    );
}