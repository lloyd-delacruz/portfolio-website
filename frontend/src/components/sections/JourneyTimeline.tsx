"use client";

import { motion } from "framer-motion";

interface TimelineItem {
    period: string;
    title: string;
    description: string;
    skills: string[];
    color: {
        primary: string;
        secondary: string;
        accent: string;
        bg: string;
        border: string;
        text: string;
        hover: string;
    };
    position: 'left' | 'right';
    isSpecial?: boolean;
    icon: JSX.Element;
}

const timelineData: TimelineItem[] = [
    {
        period: "2007-2012",
        title: "Industrial Engineering & Early Career",
        description: "Graduated BSc Industrial Engineering in 2007. Started in sales (2007-2010), then transitioned to engineering roles in Singapore (2010-2012). Led sustainable energy projects, implemented Lean Six Sigma methodologies, reducing timelines by 15% and costs by 20%.",
        skills: ['Project Management', 'Lean Six Sigma', 'Process Optimization', 'Contract Management'],
        color: {
            primary: "cyan-400",
            secondary: "blue-500",
            accent: "cyan-200",
            bg: "cyan-400/20",
            border: "cyan-400",
            text: "cyan-200",
            hover: "cyan-300"
        },
        position: 'left',
        icon: (
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
        )
    },
    {
        period: "2012-2016",
        title: "Canadian Transition & Education",
        description: "Moved to Canada and worked multiple jobs (service, security, cleaning) to support myself while pursuing full-time studies. Completed Rehabilitation Assistant Diploma at Vancouver Community College and Sustainability Management program at University of British Columbia.",
        skills: ['Adaptability', 'Work Ethic', 'Time Management', 'Resilience', 'Customer Service'],
        color: {
            primary: "amber-400",
            secondary: "orange-500",
            accent: "amber-200",
            bg: "amber-400/20",
            border: "amber-400",
            text: "amber-200",
            hover: "amber-300"
        },
        position: 'right',
        icon: (
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
        )
    },
    {
        period: "2016-2025",
        title: "Healthcare Practice & Data Evolution",
        description: "9+ years at Vancouver Coastal Health as Rehabilitation Assistant, supporting 200+ patient plans annually. Transitioned to data analytics through multiple certifications, AWS AI credentials, and Master's in Data Analytics while building healthcare solutions.",
        skills: ['Patient Care', 'Healthcare Systems', 'Data Analytics', 'Python', 'SQL', 'AWS AI'],
        color: {
            primary: "green-400",
            secondary: "emerald-500",
            accent: "green-200",
            bg: "green-400/20",
            border: "green-400",
            text: "green-200",
            hover: "green-300"
        },
        position: 'left',
        icon: (
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
            </svg>
        )
    },
    {
        period: "2022-Present",
        title: "Data Analytics & AI Transformation",
        description: "Mastering data analytics through multiple certifications and AWS AI Practitioner credential. Currently pursuing Master's in Data Analytics while building full-stack healthcare solutions.",
        skills: ['Python', 'SQL', 'Tableau', 'AWS AI', 'Data Engineering', 'Prompt Engineering'],
        color: {
            primary: "orange-400",
            secondary: "red-500",
            accent: "orange-200",
            bg: "orange-400/20",
            border: "orange-400",
            text: "orange-200",
            hover: "orange-300"
        },
        position: 'right',
        isSpecial: true,
        icon: (
            <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
        )
    }
];

const TimelineNode = ({ color, isSpecial, rotation }: { color: TimelineItem['color'], isSpecial?: boolean, rotation: number }) => {
    if (isSpecial) {
        return (
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
                className={`w-8 h-8 bg-gradient-to-br from-yellow-400 via-${color.primary} to-${color.secondary} rounded-full border-4 border-white shadow-2xl relative`}
            >
                <div className={`absolute inset-0 bg-gradient-to-br from-yellow-400 to-${color.secondary} rounded-full animate-pulse opacity-30`}></div>
                <div className="absolute -top-3 -right-3 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-bounce">
                    <div className="w-full h-full bg-green-400 rounded-full animate-ping opacity-40"></div>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            whileHover={{ scale: 1.3, rotate: rotation }}
            transition={{ type: "spring", stiffness: 300 }}
            className={`w-6 h-6 bg-gradient-to-br from-${color.primary} to-${color.secondary} rounded-full border-4 border-white shadow-xl relative`}
        >
            <div className={`absolute inset-0 bg-gradient-to-br from-${color.primary} to-${color.secondary} rounded-full animate-ping opacity-20`}></div>
        </motion.div>
    );
};

const TimelineCard = ({ item, index }: { item: TimelineItem, index: number }) => {
    const isLeft = item.position === 'left';
    const animationDirection = isLeft ? -100 : 100;
    
    return (
        <motion.div
            initial={{ opacity: 0, x: animationDirection, scale: 0.8 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 * (index + 1) }}
            whileHover={{ scale: 1.02, y: -5 }}
            className="flex items-center justify-between group cursor-pointer"
        >
            {/* Left Content */}
            <div className={`w-5/12 ${isLeft ? 'text-right pr-8' : ''}`}>
                {isLeft && (
                    <motion.div
                        whileHover={{ 
                            scale: 1.05,
                            boxShadow: `0 25px 50px rgba(${item.color.primary === 'cyan-400' ? '6, 182, 212' : item.color.primary === 'amber-400' ? '245, 158, 11' : item.color.primary === 'green-400' ? '34, 197, 94' : '249, 115, 22'}, 0.3)`
                        }}
                        className={`bg-white/${item.isSpecial ? '15' : '10'} backdrop-blur-sm rounded-2xl p-8 border-l-4 border-${item.color.border} shadow-xl hover:bg-white/${item.isSpecial ? '20' : '15'} transition-all duration-300 group-hover:border-${item.color.hover} ${item.isSpecial ? 'relative overflow-hidden' : ''}`}
                    >
                        {item.isSpecial && (
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 group-hover:animate-shine"></div>
                        )}
                        
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            className={`inline-flex items-center px-4 py-2 ${item.isSpecial ? `bg-gradient-to-r from-${item.color.bg} to-red-400/20` : `bg-${item.color.bg}`} rounded-full text-${item.color.text} text-sm font-medium mb-4 ${item.isSpecial ? 'relative z-10' : ''}`}
                        >
                            {item.icon}
                            {item.period}
                        </motion.div>

                        <h3 className={`text-2xl md:text-3xl font-bold ${item.isSpecial ? 'bg-gradient-to-r from-orange-200 to-yellow-200 bg-clip-text text-transparent' : 'text-white'} mb-4 group-hover:text-${item.color.accent} transition-colors ${item.isSpecial ? 'relative z-10' : ''}`}>
                            {item.title}
                        </h3>
                        <p className={`${item.isSpecial ? 'text-blue-100' : 'text-blue-200'} leading-relaxed text-lg ${item.isSpecial ? 'relative z-10' : ''}`}>
                            {item.description}
                        </p>

                        <div className={`flex flex-wrap gap-2 mt-6 ${item.isSpecial ? 'relative z-10' : ''}`}>
                            {item.skills.map((skill) => (
                                <motion.span
                                    key={skill}
                                    whileHover={{ 
                                        scale: 1.1, 
                                        ...(item.isSpecial && { backgroundColor: "rgba(251, 191, 36, 0.4)" })
                                    }}
                                    className={`px-3 py-1 bg-${item.color.primary}/30 text-${item.color.accent.replace('-200', '-100')} rounded-lg text-sm font-medium`}
                                >
                                    {skill}
                                </motion.span>
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>
            
            {/* Timeline Node */}
            <div className="w-2/12 flex justify-center">
                <TimelineNode 
                    color={item.color} 
                    isSpecial={item.isSpecial}
                    rotation={isLeft ? 180 : -180}
                />
            </div>
            
            {/* Right Content */}
            <div className={`w-5/12 ${!isLeft ? 'pl-8' : ''}`}>
                {!isLeft && (
                    <motion.div
                        whileHover={{ 
                            scale: 1.05,
                            boxShadow: `0 25px 50px rgba(${item.color.primary === 'cyan-400' ? '6, 182, 212' : item.color.primary === 'amber-400' ? '245, 158, 11' : item.color.primary === 'green-400' ? '34, 197, 94' : '249, 115, 22'}, 0.3)`
                        }}
                        className={`bg-white/${item.isSpecial ? '15' : '10'} backdrop-blur-sm rounded-2xl p-8 border-l-4 border-${item.color.border} shadow-xl hover:bg-white/${item.isSpecial ? '20' : '15'} transition-all duration-300 group-hover:border-${item.color.hover} ${item.isSpecial ? 'relative overflow-hidden' : ''}`}
                    >
                        {item.isSpecial && (
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 group-hover:animate-shine"></div>
                        )}
                        
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            className={`inline-flex items-center px-4 py-2 ${item.isSpecial ? `bg-gradient-to-r from-${item.color.bg} to-red-400/20` : `bg-${item.color.bg}`} rounded-full text-${item.color.text} text-sm font-medium mb-4 ${item.isSpecial ? 'relative z-10' : ''}`}
                        >
                            {item.icon}
                            {item.period}
                        </motion.div>

                        <h3 className={`text-2xl md:text-3xl font-bold ${item.isSpecial ? 'bg-gradient-to-r from-orange-200 to-yellow-200 bg-clip-text text-transparent' : 'text-white'} mb-4 group-hover:text-${item.color.accent} transition-colors ${item.isSpecial ? 'relative z-10' : ''}`}>
                            {item.title}
                        </h3>
                        <p className={`${item.isSpecial ? 'text-blue-100' : 'text-blue-200'} leading-relaxed text-lg ${item.isSpecial ? 'relative z-10' : ''}`}>
                            {item.description}
                        </p>

                        <div className={`flex flex-wrap gap-2 mt-6 ${item.isSpecial ? 'relative z-10' : ''}`}>
                            {item.skills.map((skill) => (
                                <motion.span
                                    key={skill}
                                    whileHover={{ 
                                        scale: 1.1, 
                                        ...(item.isSpecial && { backgroundColor: "rgba(251, 191, 36, 0.4)" })
                                    }}
                                    className={`px-3 py-1 bg-${item.color.primary}/30 text-${item.color.accent.replace('-200', '-100')} rounded-lg text-sm font-medium`}
                                >
                                    {skill}
                                </motion.span>
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
};

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
                    
                    {/* Timeline Items */}
                    <div className="space-y-16">
                        {timelineData.map((item, index) => (
                            <TimelineCard key={item.period} item={item} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}