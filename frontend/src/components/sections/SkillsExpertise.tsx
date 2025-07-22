"use client";

import { motion } from "framer-motion";

export function SkillsExpertise() {
    return (
        <section className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 text-white">
            <div className="max-w-6xl mx-auto px-4">
                
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold mb-4">Technical Expertise</h2>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                        A comprehensive skill set spanning data analytics, healthcare, project management, and operational optimization
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-8">
                    
                    {/* Data Analytics */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
                    >
                        <h3 className="text-2xl font-bold mb-6 text-cyan-300">Data Analytics</h3>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between mb-2">
                                    <span>SQL, Python & R</span>
                                    <span>90%</span>
                                </div>
                                <div className="w-full bg-white/20 rounded-full h-2">
                                    <motion.div 
                                        className="bg-gradient-to-r from-cyan-400 to-blue-400 h-2 rounded-full"
                                        initial={{ width: 0 }}
                                        whileInView={{ width: '90%' }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1, delay: 0.2 }}
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between mb-2">
                                    <span>Tableau & Excel</span>
                                    <span>85%</span>
                                </div>
                                <div className="w-full bg-white/20 rounded-full h-2">
                                    <motion.div 
                                        className="bg-gradient-to-r from-cyan-400 to-blue-400 h-2 rounded-full"
                                        initial={{ width: 0 }}
                                        whileInView={{ width: '85%' }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1, delay: 0.3 }}
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between mb-2">
                                    <span>AI & Prompt Engineering</span>
                                    <span>80%</span>
                                </div>
                                <div className="w-full bg-white/20 rounded-full h-2">
                                    <motion.div 
                                        className="bg-gradient-to-r from-cyan-400 to-blue-400 h-2 rounded-full"
                                        initial={{ width: 0 }}
                                        whileInView={{ width: '80%' }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1, delay: 0.4 }}
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Project Management */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
                    >
                        <h3 className="text-2xl font-bold mb-6 text-purple-300">Project Management</h3>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between mb-2">
                                    <span>Lean Six Sigma</span>
                                    <span>95%</span>
                                </div>
                                <div className="w-full bg-white/20 rounded-full h-2">
                                    <motion.div 
                                        className="bg-gradient-to-r from-purple-400 to-pink-400 h-2 rounded-full"
                                        initial={{ width: 0 }}
                                        whileInView={{ width: '95%' }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1, delay: 0.2 }}
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between mb-2">
                                    <span>Process Optimization</span>
                                    <span>90%</span>
                                </div>
                                <div className="w-full bg-white/20 rounded-full h-2">
                                    <motion.div 
                                        className="bg-gradient-to-r from-purple-400 to-pink-400 h-2 rounded-full"
                                        initial={{ width: 0 }}
                                        whileInView={{ width: '90%' }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1, delay: 0.3 }}
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between mb-2">
                                    <span>Stakeholder Engagement</span>
                                    <span>85%</span>
                                </div>
                                <div className="w-full bg-white/20 rounded-full h-2">
                                    <motion.div 
                                        className="bg-gradient-to-r from-purple-400 to-pink-400 h-2 rounded-full"
                                        initial={{ width: 0 }}
                                        whileInView={{ width: '85%' }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1, delay: 0.4 }}
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Healthcare & Communication */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
                    >
                        <h3 className="text-2xl font-bold mb-6 text-blue-300">Healthcare & Communication</h3>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between mb-2">
                                    <span>Patient Care</span>
                                    <span>95%</span>
                                </div>
                                <div className="w-full bg-white/20 rounded-full h-2">
                                    <motion.div 
                                        className="bg-gradient-to-r from-blue-400 to-indigo-400 h-2 rounded-full"
                                        initial={{ width: 0 }}
                                        whileInView={{ width: '95%' }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1, delay: 0.2 }}
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between mb-2">
                                    <span>Multidisciplinary Teams</span>
                                    <span>90%</span>
                                </div>
                                <div className="w-full bg-white/20 rounded-full h-2">
                                    <motion.div 
                                        className="bg-gradient-to-r from-blue-400 to-indigo-400 h-2 rounded-full"
                                        initial={{ width: 0 }}
                                        whileInView={{ width: '90%' }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1, delay: 0.3 }}
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between mb-2">
                                    <span>Cerner Systems</span>
                                    <span>75%</span>
                                </div>
                                <div className="w-full bg-white/20 rounded-full h-2">
                                    <motion.div 
                                        className="bg-gradient-to-r from-blue-400 to-indigo-400 h-2 rounded-full"
                                        initial={{ width: 0 }}
                                        whileInView={{ width: '75%' }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1, delay: 0.4 }}
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}