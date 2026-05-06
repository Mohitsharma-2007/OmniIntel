"use client";

import React, { useState } from "react";
import {
    X,
    Maximize2,
    Download,
    FileText,
    GitBranch,
    Globe,
    Users,
    BarChart3,
    ArrowRight,
    Command,
    Zap
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
    FlowchartViewer,
    MapViewer,
    ConnectionsViewer,
    FinancialViewer
} from "./canvas-viewers";
import { DocumentReport, type DocumentData } from "./document-report";

import { downloadReport } from "@/lib/download";

export type CanvasTab = "preview" | "flowchart" | "map" | "connections" | "financials";

interface IntelligenceCanvasProps {
    isOpen: boolean;
    onClose: () => void;
    activeTab: CanvasTab;
    setActiveTab: (tab: CanvasTab) => void;
    documentData?: DocumentData;
}

export const IntelligenceCanvas: React.FC<IntelligenceCanvasProps> = ({
    isOpen,
    onClose,
    activeTab,
    setActiveTab,
    documentData
}) => {
    const tabs = [
        { id: "preview", label: "Report Preview", icon: FileText },
        { id: "flowchart", label: "Logic Flow", icon: GitBranch },
        { id: "map", label: "Global Exposure", icon: Globe },
        { id: "connections", label: "Connections", icon: Users },
        { id: "financials", label: "Financials", icon: BarChart3 },
    ];

    const handleDownload = () => {
        if (documentData) {
            downloadReport(documentData.title, documentData);
        }
    };

    if (!isOpen) return null;

    return (
        <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-[45%] bg-white/70 backdrop-blur-3xl border-l border-stone-200/50 shadow-[-20px_0_50px_rgba(0,0,0,0.05)] z-[100] flex flex-col"
        >
            {/* Canvas Header */}
            <div className="px-6 py-5 border-b border-stone-200/40 flex items-center justify-between bg-stone-50/50">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-stone-900 flex items-center justify-center text-white">
                        <Command className="w-4 h-4" />
                    </div>
                    <div>
                        <h2 className="text-sm font-black text-stone-800 uppercase tracking-tighter">Intelligence Canvas</h2>
                        <div className="flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Live Reasoning Active</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={handleDownload}
                        className="p-2 rounded-xl hover:bg-stone-200/50 text-stone-500 transition-colors"
                        title="Download Report"
                    >
                        <Download className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-xl hover:bg-stone-200/50 text-stone-500 transition-colors">
                        <Maximize2 className="w-4 h-4" />
                    </button>
                    <div className="w-px h-6 bg-stone-200 mx-1" />
                    <button
                        onClick={onClose}
                        className="p-2 rounded-xl bg-stone-900 text-white hover:bg-stone-800 transition-colors shadow-lg"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Tab Navigation */}
            <div className="px-6 py-3 flex items-center gap-4 border-b border-stone-100 bg-white/30 overflow-x-auto no-scrollbar">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as CanvasTab)}
                        className={cn(
                            "flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 relative whitespace-nowrap",
                            activeTab === tab.id
                                ? "text-indigo-600 bg-indigo-50/50 shadow-sm"
                                : "text-stone-400 hover:text-stone-600 hover:bg-stone-100/50"
                        )}
                    >
                        <tab.icon className={cn("w-3.5 h-3.5", activeTab === tab.id ? "animate-pulse" : "")} />
                        {tab.label}
                        {activeTab === tab.id && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute inset-0 rounded-full border border-indigo-200/50 pointer-events-none"
                            />
                        )}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto no-scrollbar relative">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="w-full h-full"
                    >
                        {activeTab === "preview" && documentData && (
                            <div className="p-8">
                                <DocumentReport data={documentData} />
                            </div>
                        )}
                        {activeTab === "flowchart" && <FlowchartViewer />}
                        {activeTab === "map" && <MapViewer />}
                        {activeTab === "connections" && <ConnectionsViewer />}
                        {activeTab === "financials" && <FinancialViewer />}

                        {!documentData && activeTab === "preview" && (
                            <div className="w-full h-full flex flex-col items-center justify-center text-stone-300 space-y-4">
                                <FileText className="w-16 h-16 opacity-20" />
                                <p className="text-sm font-bold uppercase tracking-widest opacity-40">No Document Selected</p>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Footer / Context Bar */}
            <div className="p-6 border-t border-stone-100 bg-gradient-to-t from-stone-50/80 to-transparent">
                <div className="p-4 rounded-[24px] bg-stone-900 flex items-center justify-between text-white shadow-2xl">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center">
                            <Zap className="w-5 h-5 fill-current" />
                        </div>
                        <div>
                            <div className="text-[10px] font-black text-stone-400 uppercase tracking-tighter">Current Context</div>
                            <div className="text-xs font-bold truncate max-w-[200px]">
                                {documentData?.title || "Passive Monitoring..."}
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={handleDownload}
                        className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors group"
                    >
                        Export All
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};
