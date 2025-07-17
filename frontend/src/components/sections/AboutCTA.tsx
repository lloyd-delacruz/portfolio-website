"use client";

import { motion } from "framer-motion";

export function AboutCTA() {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-4xl mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl p-12 text-white"
                >
                    <h2 className="text-4xl font-bold mb-6">Ready to Transform Healthcare Together?</h2>
                    <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                        Let&apos;s discuss how we can leverage technology to create innovative solutions 
                        that improve patient outcomes and healthcare efficiency.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
                        >
                            Start a Conversation
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white rounded-xl font-semibold border border-white/30 hover:bg-white/30 transition-colors"
                        >
                            View My Projects
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}