"use client";

import { AboutMeHeroFixed } from "./AboutMeHeroFixed";
import { JourneyTimeline } from "./JourneyTimeline";
import { CoreValues } from "./CoreValues";
import { SkillsExpertise } from "./SkillsExpertise";
import { AboutCTA } from "./AboutCTA";
import { motion } from "framer-motion";

export function AboutSection() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
        >
            <AboutMeHeroFixed />
            <JourneyTimeline />
            <CoreValues />
            <SkillsExpertise />
            <AboutCTA />
        </motion.div>
    );
}