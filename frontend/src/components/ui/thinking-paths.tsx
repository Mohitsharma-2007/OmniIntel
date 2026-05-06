"use client";

import type React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Zap, CheckCircle2 } from "lucide-react";
import { useState } from "react";

interface ThinkingPathsProps {
    paths: string[];
}

export const ThinkingPaths: React.FC<ThinkingPathsProps> = ({ paths }) => {
    const [isExpanded, setIsExpanded] = useState(true);

    if (!paths || paths.length === 0) return null;

    return (
        <div className="w-full mb-6 overflow-hidden rounded-2xl border border-stone-200/50 bg-white/30 backdrop-blur-md shadow-sm">
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full px-5 py-3 flex items-center justify-between text-stone-500 hover:bg-stone-50 transition-colors"
            >
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
                        <Zap className="w-4 h-4 text-amber-500" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest">Thinking Paths</span>
                </div>
                {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-5 pb-5 pt-2"
                    >
                        <div className="space-y-3">
                            {paths.map((path, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ x: -10, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="flex items-start gap-3"
                                >
                                    <div className="mt-1">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-stone-300" />
                                    </div>
                                    <p className="text-[13px] text-stone-600 font-medium leading-relaxed">
                                        {path}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
