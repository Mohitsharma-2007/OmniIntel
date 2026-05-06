"use client";

import React from "react";
import { motion } from "framer-motion";
import {
    Activity,
    Globe,
    GitBranch,
    Users,
    DollarSign,
    Zap,
    Target,
    ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- FLOWCHART VIEWER ---
export const FlowchartViewer: React.FC<{ data?: any }> = () => {
    return (
        <div className="w-full h-full flex items-center justify-center p-8">
            <svg viewBox="0 0 800 500" className="w-full h-full text-stone-300">
                <defs>
                    <marker id="arrow" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 0 L 10 5 L 0 10 z" className="fill-stone-300" />
                    </marker>
                </defs>

                {/* Nodes */}
                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                    <rect x="350" y="50" width="100" height="50" rx="12" className="fill-indigo-600 shadow-xl" />
                    <text x="400" y="80" textAnchor="middle" className="fill-white text-[10px] font-bold">SOURCE DATA</text>

                    <path d="M 400 100 L 400 150" stroke="currentColor" fill="none" markerEnd="url(#arrow)" />

                    <rect x="325" y="150" width="150" height="60" rx="16" className="fill-white stroke-indigo-100 shadow-sm" />
                    <text x="400" y="185" textAnchor="middle" className="fill-stone-600 text-[10px] font-bold">CORE ORCHESTRATOR</text>

                    {/* Parallel Agents */}
                    {[
                        { x: 150, y: 300, label: "MARKET AGENT", color: "text-blue-500" },
                        { x: 400, y: 300, label: "COMPLIANCE AGENT", color: "text-emerald-500" },
                        { x: 650, y: 300, label: "NEWS AGENT", color: "text-amber-500" }
                    ].map((agent, i) => (
                        <React.Fragment key={i}>
                            <motion.path
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 1.5, delay: i * 0.2 }}
                                d={`M 400 210 L ${agent.x} 290`}
                                stroke="currentColor"
                                fill="none"
                                strokeDasharray="5,5"
                                markerEnd="url(#arrow)"
                            />
                            <rect x={agent.x - 60} y={agent.y} width="120" height="40" rx="12" className="fill-white stroke-stone-200" />
                            <text x={agent.x} y={agent.y + 25} textAnchor="middle" className={cn("text-[9px] font-bold fill-current", agent.color)}>{agent.label}</text>
                        </React.Fragment>
                    ))}

                    {/* Final Output */}
                    <path d="M 400 340 L 400 400" stroke="currentColor" fill="none" markerEnd="url(#arrow)" />
                    <rect x="325" y="400" width="150" height="60" rx="20" className="fill-stone-900" />
                    <text x="400" y="435" textAnchor="middle" className="fill-stone-400 text-[10px] font-bold uppercase tracking-widest">FINAL SYNTHESIS</text>
                </motion.g>
            </svg>
        </div>
    );
};

// --- MAP VIEWER ---
export const MapViewer: React.FC<{ data?: any }> = () => {
    return (
        <div className="w-full h-full relative overflow-hidden flex items-center justify-center p-12">
            <div className="absolute inset-0 bg-indigo-50/20 backdrop-blur-3xl" />

            {/* Stylized World Map SVG */}
            <svg viewBox="0 0 1000 500" className="relative z-10 w-full h-auto text-stone-200 opacity-60">
                <path className="fill-current" d="M150,150 Q180,100 250,120 T350,150 T450,100 T600,120 T750,150 T850,200 T700,350 T500,400 T200,350 T150,150" />
                <path className="fill-indigo-200/40" d="M400,200 Q450,150 550,180 T650,220 T550,280 T400,250 T400,200" />

                {/* Highlight Points */}
                {[
                    { x: 300, y: 200, label: "New York", val: "Critical Exposure" },
                    { x: 550, y: 250, label: "Mumbai", val: "Market Hub" },
                    { x: 750, y: 180, label: "Tokyo", val: "Regulatory Risk" }
                ].map((pt, i) => (
                    <motion.g key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.3 }}>
                        <circle cx={pt.x} cy={pt.y} r="6" className="fill-indigo-600 animate-pulse" />
                        <circle cx={pt.x} cy={pt.y} r="12" className="stroke-indigo-600 fill-none opacity-20" />
                        <text x={pt.x + 15} y={pt.y + 4} className="fill-stone-800 text-[10px] font-bold">{pt.label}</text>
                    </motion.g>
                ))}
            </svg>

            {/* Legend Overlay */}
            <div className="absolute bottom-10 left-10 p-4 bg-white/80 backdrop-blur-xl border border-stone-200/50 rounded-2xl shadow-xl z-20 space-y-3">
                <h6 className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Global Exposure Heatmap</h6>
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-indigo-600" />
                        <span className="text-[11px] font-bold text-stone-600">High Impact</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-indigo-200" />
                        <span className="text-[11px] font-bold text-stone-600">Neutral</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- CONNECTIONS VIEWER ---
export const ConnectionsViewer: React.FC<{ data?: any }> = () => {
    return (
        <div className="w-full h-full flex flex-col p-10 space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h4 className="text-xl font-serif text-stone-800">Company Relationship Graph</h4>
                    <p className="text-xs text-stone-500 font-medium">Mapped via Deals & Institutional Flow</p>
                </div>
                <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-stone-100 flex items-center justify-center text-[10px] font-bold text-stone-400">
                            C{i}
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex-1 border border-stone-100 rounded-[32px] bg-stone-50/30 p-8 relative overflow-hidden">
                {/* Central Entity */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-white shadow-2xl border border-indigo-100 flex flex-col items-center justify-center z-10 text-center p-4">
                    <Target className="w-6 h-6 text-indigo-600 mb-2" />
                    <span className="text-[10px] font-black leading-tight">TARGET ENTITY</span>
                </div>

                {/* Orbital Entities */}
                {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-24 h-24 rounded-3xl bg-white/60 backdrop-blur-md border border-stone-100 shadow-sm flex flex-col items-center justify-center p-3"
                        initial={{ opacity: 0, x: 0, y: 0 }}
                        animate={{
                            opacity: 1,
                            x: Math.cos(angle * Math.PI / 180) * 160,
                            y: Math.sin(angle * Math.PI / 180) * 160
                        }}
                        transition={{ delay: i * 0.1, duration: 1 }}
                        style={{ top: 'calc(50% - 48px)', left: 'calc(50% - 48px)' }}
                    >
                        <Users className="w-4 h-4 text-stone-400 mb-2" />
                        <span className="text-[9px] font-bold text-stone-600 line-clamp-2 text-center uppercase">Partner {i + 1}</span>
                    </motion.div>
                ))}

                {/* Connecting Lines (CSS based) */}
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-indigo-500 border-dashed animate-[spin_60s_linear_infinite]" />
                </div>
            </div>
        </div>
    );
};

// --- FINANCIALS VIEWER ---
export const FinancialViewer: React.FC<{ data?: any }> = () => {
    const [marketData, setMarketData] = React.useState<any>(null);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("http://localhost:8000/market/live");
                const data = await res.json();
                setMarketData(data);
            } catch (err) {
                console.error("Failed to fetch market data:", err);
            }
        };
        fetchData();
        const interval = setInterval(fetchData, 5000);
        return () => clearInterval(interval);
    }, []);

    const stats = [
        { label: "Price", val: marketData ? `₹${marketData.price.toLocaleString()}` : "₹2,640.45", change: marketData ? `${marketData.change > 0 ? '+' : ''}${marketData.change}%` : "+1.2%", icon: DollarSign },
        { label: "Volume", val: marketData ? marketData.volume : "4.2M", change: "-0.5%", icon: Activity },
        { label: "Market Cap", val: "₹18.4T", change: "+0.8%", icon: Globe },
        { label: "Volatility", val: marketData?.status === "bullish" ? "Low" : "1.42", change: "Stable", icon: Zap }
    ];

    return (
        <div className="w-full h-full flex flex-col p-8 space-y-6">
            <div className="grid grid-cols-4 gap-4">
                {stats.map((stat, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-stone-50 border border-stone-100 hover:shadow-md transition-shadow">
                        <stat.icon className="w-4 h-4 text-stone-400 mb-3" />
                        <div className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">{stat.label}</div>
                        <div className="text-lg font-black text-stone-800 mt-1">{stat.val}</div>
                        <div className={cn("text-[9px] font-bold mt-1", stat.change.startsWith('+') ? "text-emerald-500" : "text-stone-400")}>{stat.change}</div>
                    </div>
                ))}
            </div>

            <div className="flex-1 bg-white border border-stone-100 rounded-[24px] p-6 relative">
                <div className="absolute top-4 left-6 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Live Performance Stream</span>
                </div>

                {/* Simple SVG Chart - Now slightly more dynamic height based on price */}
                <svg viewBox="0 0 1000 300" className="w-full h-full text-indigo-100 pt-10">
                    <motion.path
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2 }}
                        d={`M0,250 Q100,200 200,${marketData ? 220 - (marketData.change * 10) : 220} T400,${marketData ? 150 - (marketData.change * 5) : 150} T600,180 T800,100 L1000,120`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    />
                    <motion.path
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2 }}
                        d={`M0,250 Q100,200 200,${marketData ? 220 - (marketData.change * 10) : 220} T400,${marketData ? 150 - (marketData.change * 5) : 150} T600,180 T800,100 L1000,120 V300 H0 Z`}
                        className="fill-indigo-50/30"
                    />
                </svg>
            </div>
        </div>
    );
};
