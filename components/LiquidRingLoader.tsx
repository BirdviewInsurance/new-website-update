"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const PRIMARY_COLOR = "#1D4ED8"; // Brand primary
const SECONDARY_COLOR = "#DC2626"; // Brand secondary

export default function LineRevealLoader() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white overflow-hidden">
            {/* Ambient gradient background glow */}
            <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                style={{
                    background: `radial-gradient(circle at center, ${PRIMARY_COLOR}15 0%, ${SECONDARY_COLOR}10 70%, white 100%)`,
                    filter: "blur(100px)",
                }}
            />

            {/* Expanding line with shimmer */}
            <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1] }}
                className="absolute top-1/2 h-[3px] rounded-full shadow-lg"
                style={{
                    background: `linear-gradient(90deg, ${PRIMARY_COLOR}, ${SECONDARY_COLOR})`,
                    transform: "translateY(-50%)",
                    boxShadow: `0 0 20px ${PRIMARY_COLOR}50, 0 0 40px ${SECONDARY_COLOR}40`,
                }}
            />

            {/* Reveal panels with glass reflections */}
            <AnimatePresence>
                <motion.div
                    initial={{ height: "0%" }}
                    animate={{ height: "100%" }}
                    transition={{
                        delay: 1.3,
                        duration: 1.2,
                        ease: [0.65, 0, 0.35, 1],
                    }}
                    exit={{ height: "0%" }}
                    className="absolute top-0 left-0 w-full backdrop-blur-md"
                    style={{
                        background: `linear-gradient(180deg, ${PRIMARY_COLOR}ee, ${SECONDARY_COLOR}ee)`,
                        transformOrigin: "center top",
                    }}
                />
            </AnimatePresence>

            <AnimatePresence>
                <motion.div
                    initial={{ height: "0%" }}
                    animate={{ height: "100%" }}
                    transition={{
                        delay: 1.3,
                        duration: 1.2,
                        ease: [0.65, 0, 0.35, 1],
                    }}
                    exit={{ height: "0%" }}
                    className="absolute bottom-0 left-0 w-full backdrop-blur-md"
                    style={{
                        background: `linear-gradient(0deg, ${PRIMARY_COLOR}ee, ${SECONDARY_COLOR}ee)`,
                        transformOrigin: "center bottom",
                    }}
                />
            </AnimatePresence>

            {/* Floating gradient orbs (depth illusion) */}
            <motion.div
                className="absolute w-48 h-48 rounded-full"
                style={{
                    background: `radial-gradient(circle, ${PRIMARY_COLOR}55, transparent 70%)`,
                    top: "20%",
                    left: "15%",
                    filter: "blur(60px)",
                }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute w-56 h-56 rounded-full"
                style={{
                    background: `radial-gradient(circle, ${SECONDARY_COLOR}55, transparent 70%)`,
                    bottom: "15%",
                    right: "10%",
                    filter: "blur(80px)",
                }}
                animate={{ scale: [1.1, 0.9, 1.1] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
        </div>
    );
}
