import React, { useState } from "react";
import {
    FileText,
    ChevronDown,
    ChevronUp,
    Download,
    Activity,
    Zap
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export interface DocTable {
    headers: string[];
    rows: string[][];
    caption?: string;
}

export interface DocChart {
    labels: string[];
    series: number[];
}

export interface StockData {
    symbol: string;
    price: string;
    change: string;
    sector: string;
    industry?: string;
    market_cap: string;
    chart: DocChart;
}

export interface SentimentData {
    buy: number;
    hold: number;
    sell: number;
    score: number;
    rating: string;
}

export interface GrowthMetric {
    metric: string;
    value: string;
    remarks: string;
}

export interface DocSection {
    title: string;
    content: string;
    tables?: DocTable[];
}

export interface DocumentData {
    title: string;
    subtitle?: string;
    date: string;
    author: string;
    summary: string;
    thinking_paths?: string[];
    stock_data?: StockData;
    sentiment?: SentimentData;
    growth_metrics?: GrowthMetric[];
    sections: DocSection[];
}

interface DocumentReportProps {
    data: DocumentData;
}

// --- LUXURY SUB-COMPONENTS ---

const CircularGauge: React.FC<{ value: number, label: string, color: string, size?: number }> = ({ value, label, color, size = 100 }) => {
    const radius = size * 0.45;
    const center = size / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (value / 100) * circumference;

    return (
        <div className="flex flex-col items-center">
            <div className="relative" style={{ width: size, height: size }}>
                <svg className="w-full h-full transform -rotate-90">
                    <circle
                        cx={center} cy={center} r={radius}
                        stroke="currentColor" strokeWidth={size * 0.1}
                        fill="transparent" className="text-stone-100"
                    />
                    <motion.circle
                        cx={center} cy={center} r={radius}
                        stroke={color} strokeWidth={size * 0.1}
                        fill="transparent"
                        strokeDasharray={circumference}
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset: offset }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-xl font-bold text-stone-800">{value}%</span>
                </div>
            </div>
            <span className="mt-2 text-[10px] font-black text-stone-400 uppercase tracking-tighter">{label}</span>
        </div>
    );
};

const StockHeaderLuxury: React.FC<{ data: StockData }> = ({ data }) => {
    const isPositive = data.change.includes('+');

    return (
        <div className="mb-10 p-1 bg-stone-100/50 rounded-[40px] shadow-sm overflow-hidden">
            <div className="p-8 rounded-[38px] bg-white border border-stone-200/50 shadow-inner relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 via-stone-200 to-indigo-400" />

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="space-y-1">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-50 border border-stone-100 mb-2">
                            <Activity className="w-3 h-3 text-stone-400" />
                            <span className="text-[10px] font-black text-stone-400 uppercase tracking-[0.2em]">LIVE INTELLIGENCE SYNC</span>
                        </div>
                        <h2 className="text-5xl font-serif font-light tracking-tight text-stone-900">{data.symbol}</h2>
                        <div className="flex items-center gap-3 text-sm font-medium text-stone-400">
                            <span>{data.sector}</span>
                            <div className="w-1 h-1 rounded-full bg-stone-300" />
                            <span>{data.market_cap}</span>
                        </div>
                    </div>

                    <div className="flex flex-col items-end">
                        <div className="text-6xl font-sans font-light tracking-tighter text-stone-900 mb-1">{data.price}</div>
                        <div className={cn(
                            "px-3 py-1 rounded-full text-xs font-bold transition-all",
                            isPositive ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                        )}>
                            {data.change}
                        </div>
                    </div>
                </div>

                {/* Line Chart Style Sparkline */}
                <div className="mt-12 h-32 w-full relative">
                    <svg className="w-full h-full" preserveAspectRatio="none">
                        <defs>
                            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="rgb(168, 162, 158)" stopOpacity="0.2" />
                                <stop offset="100%" stopColor="rgb(168, 162, 158)" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                        <motion.path
                            d={`M 0 ${128 - (data.chart.series[0] * 2)} ${data.chart.series.map((val, i) => `L ${(i / (data.chart.series.length - 1)) * 1000} ${128 - (val * 2)}`).join(' ')}`}
                            fill="none"
                            stroke="rgb(120, 113, 108)"
                            strokeWidth="2"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                        />
                        <path
                            d={`M 0 ${128 - (data.chart.series[0] * 2)} ${data.chart.series.map((val, i) => `L ${(i / (data.chart.series.length - 1)) * 1000} ${128 - (val * 2)}`).join(' ')} V 128 H 0 Z`}
                            fill="url(#chartGradient)"
                        />
                    </svg>
                    {/* Data Points */}
                    <div className="absolute inset-0 flex justify-between items-end border-b border-stone-200/50">
                        {data.chart.labels.map((label, i) => (
                            <div key={i} className="flex flex-col items-center">
                                <div className="w-1.5 h-1.5 rounded-full bg-stone-300 mb-[-3px]" />
                                <span className="text-[9px] font-black text-stone-300 mt-2 uppercase tracking-tighter">{label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const LuxuryStats: React.FC<{ data: SentimentData, metrics: GrowthMetric[] }> = ({ data, metrics }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10">
            {/* Sentiment Circle */}
            <div className="p-8 rounded-[40px] bg-white border border-stone-100 shadow-sm flex flex-col items-center justify-center text-center">
                <CircularGauge value={data.buy} label="Market Sentiment" color="rgb(16, 185, 129)" size={140} />
                <div className="mt-6">
                    <div className="text-3xl font-serif text-stone-800">{data.rating}</div>
                    <div className="text-[10px] font-black text-stone-400 uppercase tracking-widest mt-1">Consensus Rating</div>
                </div>
            </div>

            {/* OmniIntel Score Card */}
            <div className="p-8 rounded-[40px] bg-[#FAF9F6] border border-stone-100 flex flex-col items-center justify-center text-center relative overflow-hidden group">
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-indigo-100/30 rounded-full blur-2xl group-hover:bg-indigo-100/50 transition-colors" />
                <div className="text-[10px] font-black text-stone-400 uppercase tracking-[0.3em] mb-4">OmniIntel Score</div>
                <div className="text-8xl font-sans font-thin tracking-tighter text-stone-900 leading-none">{data.score}</div>
                <div className="text-xs font-bold text-stone-400 mt-2">ALGO-VERIFIED / 10</div>
                <div className="mt-8 flex gap-1">
                    {[...Array(10)].map((_, i) => (
                        <div key={i} className={cn("w-2 h-1 rounded-full", i < data.score ? "bg-stone-800" : "bg-stone-200")} />
                    ))}
                </div>
            </div>

            {/* Quick Metrics */}
            <div className="p-8 rounded-[40px] bg-white border border-stone-100 shadow-sm space-y-6">
                <h4 className="text-[11px] font-black text-stone-400 uppercase tracking-widest flex items-center gap-2">
                    <Zap className="w-3 h-3 text-amber-500" />
                    Growth Signals
                </h4>
                {metrics.map((m, i) => (
                    <div key={i} className="flex items-center justify-between group">
                        <div className="space-y-0.5">
                            <div className="text-[10px] font-black text-stone-300 uppercase tracking-tighter">{m.metric}</div>
                            <div className="text-lg font-bold text-stone-800 group-hover:text-stone-900 transition-colors">{m.value}</div>
                        </div>
                        <div className={cn(
                            "px-2 py-0.5 rounded text-[10px] font-bold uppercase",
                            m.remarks.toLowerCase().includes('bullish') || m.remarks.toLowerCase().includes('positive') || m.remarks.toLowerCase().includes('accelerating')
                                ? "bg-emerald-50 text-emerald-600"
                                : "bg-stone-100 text-stone-500"
                        )}>
                            {m.remarks}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- MAIN COMPONENT ---

export const DocumentReport: React.FC<DocumentReportProps> = ({ data }) => {
    const [isExpanded, setIsExpanded] = useState(true);

    if (!data) return null;

    return (
        <div className={cn(
            "w-full max-w-full my-8 transition-all duration-700",
            isExpanded ? "opacity-100" : "opacity-90 grayscale-[0.5]"
        )}>
            {/* Luxury Container */}
            <div className="bg-[#FCFBFA] rounded-[50px] border border-stone-200/60 shadow-[0_32px_128px_-16px_rgba(0,0,0,0.08)] overflow-hidden">

                {/* Header Ribbon */}
                <div
                    className="p-8 flex items-center justify-between cursor-pointer"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-[28px] bg-stone-900 flex items-center justify-center text-white shadow-xl">
                            <FileText className="w-8 h-8" />
                        </div>
                        <div>
                            <h3 className="text-3xl font-serif font-light text-stone-900 tracking-tight leading-tight">{data.title}</h3>
                            <div className="flex items-center gap-3 text-sm font-medium text-stone-400 mt-1">
                                <span>{data.subtitle || "Agentic Audit Intelligence"}</span>
                                <div className="w-1 h-1 rounded-full bg-stone-200" />
                                <span>{data.date}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={(e) => { e.stopPropagation(); window.print(); }}
                            className="bg-stone-900 text-stone-50 px-6 py-3 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] shadow-xl hover:bg-stone-800 transition-all flex items-center gap-2 active:scale-95"
                        >
                            <Download className="w-4 h-4" />
                            Report PDF
                        </button>
                        <div className="p-3 rounded-2xl bg-stone-100/80 text-stone-400 hover:text-stone-900 transition-colors">
                            {isExpanded ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
                        </div>
                    </div>
                </div>

                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <div className="px-10 pb-20 space-y-16">

                                {/* Analysis Header */}
                                {data.stock_data && <StockHeaderLuxury data={data.stock_data} />}

                                {/* Statistics Dashboard Row */}
                                {data.sentiment && data.growth_metrics && (
                                    <LuxuryStats data={data.sentiment} metrics={data.growth_metrics} />
                                )}

                                {/* Summary Box */}
                                <div className="space-y-4">
                                    <h5 className="text-[10px] font-black text-stone-300 uppercase tracking-[0.4em]">Proprietary Synthesis</h5>
                                    <div className="relative">
                                        <div className="absolute -inset-1 bg-gradient-to-r from-amber-100/20 via-transparent to-indigo-100/20 blur-xl opacity-50" />
                                        <div className="relative bg-white/60 backdrop-blur-md border border-stone-200/50 p-12 rounded-[50px] shadow-sm">
                                            <p className="text-2xl font-serif font-light leading-relaxed text-stone-800 italic">
                                                "{data.summary}"
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Detailed Sections */}
                                <div className="space-y-24">
                                    {data.sections.map((section, idx) => (
                                        <div key={idx} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                                            <div className="lg:col-span-4">
                                                <div className="sticky top-8">
                                                    <div className="text-[10px] font-black text-stone-300 uppercase tracking-[0.4em] mb-4">Audit Section 0{idx + 1}</div>
                                                    <h4 className="text-4xl font-serif font-light text-stone-900 tracking-tight leading-none">{section.title}</h4>
                                                    <div className="mt-8 flex gap-2">
                                                        <div className="w-12 h-1 bg-stone-900 rounded-full" />
                                                        <div className="w-2 h-1 bg-stone-200 rounded-full" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="lg:col-span-8">
                                                <div className="text-xl leading-relaxed text-stone-500 font-medium space-y-6">
                                                    {section.content.split('\n').map((para, i) => (
                                                        para.trim() && <p key={i}>{para}</p>
                                                    ))}
                                                </div>
                                                {section.tables && section.tables.map((table, tIdx) => (
                                                    <div key={tIdx} className="mt-12 rounded-[32px] border border-stone-100 bg-stone-50/30 overflow-hidden shadow-inner p-2">
                                                        <div className="p-10 rounded-[30px] bg-white">
                                                            <div className="flex items-center justify-between mb-8">
                                                                <h6 className="text-sm font-bold text-stone-800">{table.caption}</h6>
                                                            </div>
                                                            <table className="w-full text-left">
                                                                <thead>
                                                                    <tr className="border-b border-stone-100 text-[10px] font-black text-stone-300 uppercase tracking-[0.2em]">
                                                                        {table.headers.map((h, i) => <th key={i} className="pb-4">{h}</th>)}
                                                                    </tr>
                                                                </thead>
                                                                <tbody className="divide-y divide-stone-50">
                                                                    {table.rows.map((row, rIdx) => (
                                                                        <tr key={rIdx} className="group transition-colors hover:bg-stone-50/50">
                                                                            {row.map((cell, cIdx) => (
                                                                                <td key={cIdx} className="py-5 text-sm font-medium text-stone-600 group-hover:text-stone-900">{cell}</td>
                                                                            ))}
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Luxury Footer */}
                            <div className="p-10 bg-stone-900 text-stone-400 flex flex-col md:flex-row items-center justify-between gap-8 mt-20">
                                <div className="flex items-center gap-10">
                                    <div className="flex items-center gap-3">
                                        <Activity className="w-4 h-4 text-emerald-500" />
                                        <span className="text-[10px] font-black uppercase tracking-[0.3em]">OmniIntel Verified</span>
                                    </div>
                                    <div className="w-px h-6 bg-white/10 hidden md:block" />
                                    <div className="text-[10px] font-bold tracking-widest text-stone-500">ENGINE ID: SYN-29402X</div>
                                </div>
                                <div className="flex gap-8 text-[11px] font-black uppercase tracking-[0.3em] overflow-hidden">
                                    <motion.span
                                        animate={{ opacity: [0.2, 0.5, 0.2] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="text-white/20 whitespace-nowrap"
                                    >
                                        AUTHENTICATED PORTAL ACCESS SECURED
                                    </motion.span>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
