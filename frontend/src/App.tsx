import ClaudeChatInput from '@/components/ui/claude-style-ai-input';
import { useState, useEffect, useRef } from 'react';
import { Loader } from '@/components/ui/loader';
import { AnimatePresence, motion } from 'framer-motion';
import { Sparkles, Bot, User, Zap, ChevronRight, FileText } from 'lucide-react';
import { DocumentReport, type DocumentData } from "./components/ui/document-report";
import { ThinkingPaths } from "./components/ui/thinking-paths";
import { IntelligenceCanvas, type CanvasTab } from '@/components/ui/intelligence-canvas';
import { cn } from '@/lib/utils';
import { processQuery, getMarketData, getModels } from '@/lib/openrouter';

const AGENTS = [
    "Core Intelligence Orchestrator Agent", "Real-Time Event Router Agent", "Data Freshness & Consistency Agent", "Conflict Resolution Agent", "Explainability & Traceability Agent",
    "Live Stock Price Monitoring Agent", "Market Trend & Momentum Agent", "Volatility & Risk Scoring Agent", "Derivatives & Options Analysis Agent", "Sector & Industry Performance Agent",
    "Index Correlation Agent", "Institutional Activity Tracking Agent", "Insider Trading Signals Agent", "Liquidity & Volume Flow Agent",
    "Company Profile & Fundamentals Agent", "Financial Statements Analysis Agent", "Earnings & Guidance Agent", "Mergers & Acquisitions Agent", "Partnerships & Alliances Agent",
    "Contracts & Deal Disclosure Agent", "Country of Origin & Exposure Agent", "Subsidiary & Ownership Mapping Agent",
    "Regulatory Filings Agent", "Compliance Rules Intelligence Agent", "Sanctions & Watchlist Agent", "Policy Change Detection Agent", "Legal Risk & Litigation Agent", "Audit & Governance Agent",
    "Real-Time News Ingestion Agent", "Breaking News Impact Agent", "Media Bias & Credibility Agent", "Press Release Intelligence Agent", "Rumor vs Verified News Agent",
    "Geopolitical Risk Agent", "Country Stability & Policy Agent", "Trade & Tariff Impact Agent", "Currency & FX Risk Agent", "Global Supply Chain Risk Agent",
    "Supply Chain Intelligence Agent", "Demand Forecasting Agent", "Inventory & Production Signals Agent", "Vendor & Supplier Risk Agent",
    "Customer Sentiment Agent", "Product Reviews Intelligence Agent", "Brand Reputation Agent", "Social Media Market Sentiment Agent",
    "Transaction Anomaly Detection Agent", "Fraud Pattern Intelligence Agent", "Behavioral Risk Agent", "Financial Crime Typology Agent",
    "Historical Pattern Learning Agent", "Cross-Agent Insight Synthesis Agent", "Alert Prioritization Agent", "User Query Interpretation Agent", "Continuous Improvement & Feedback Agent"
];

function App() {
    const [messages, setMessages] = useState<{
        role: 'user' | 'assistant',
        content: string,
        data?: DocumentData
    }[]>([]);
    const [currentAgentIndex, setCurrentAgentIndex] = useState(0);
    const [isGenerating, setIsGenerating] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);
    const [isSuperMode, setIsSuperMode] = useState(false);
    const [isDeepThinking, setIsDeepThinking] = useState(false);
    const [isCanvasOpen, setIsCanvasOpen] = useState(false);
    const [activeCanvasTab, setActiveCanvasTab] = useState<CanvasTab>("preview");
    const [selectedDocData, setSelectedDocData] = useState<DocumentData | undefined>(undefined);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Convert AGENTS to ModelOption format with "Super" badge for some
    const agentModels = AGENTS.map((agent, index) => ({
        id: `agent-${index}`,
        name: agent,
        description: isSuperMode ? "Super Mode Enabled" : "Specialized AI Agent",
        badge: index < 5 ? (isSuperMode ? "MAX" : "Core") : "Agent"
    }));

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentAgentIndex((prev) => (prev + 1) % AGENTS.length);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isGenerating]);

    const generateMockReport = (companyName: string): DocumentData => {
        return {
            title: `${companyName} Intelligence Summary`,
            subtitle: "Agentic Multi-Source Synthesis",
            date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
            author: "Core Orchestrator - OmniIntel",
            summary: `Comprehensive analysis for ${companyName} reveals strong market position with moderate regulatory risks. Institutional activity shows defensive accumulation during recent volatility. Strategic partnerships in the logistics sector are driving operational efficiency improvements.`,
            sections: [
                {
                    title: "Market Performance & Financials",
                    content: `Recent trading sessions show ${companyName} outperforming its sector index by 1.2%. Financial statements indicate a stable Debt-to-Equity ratio of 0.45, with quarterly revenue growth trending upwards. Liquidity flow analysis suggests resilient institutional support at key support levels.`,
                    tables: [
                        {
                            caption: "Quarterly Financial Highlights",
                            headers: ["Metric", "Current Q", "Previous Q", "Change (%)"],
                            rows: [
                                ["Revenue", "₹14,250 Cr", "₹13,100 Cr", "+8.7%"],
                                ["EBITDA", "₹2,840 Cr", "₹2,610 Cr", "+8.8%"],
                                ["Net Profit", "₹1,120 Cr", "₹980 Cr", "+14.3%"],
                                ["Op. Margin", "19.9%", "19.9%", "0.0%"]
                            ]
                        }
                    ]
                },
                {
                    title: "Strategic Partnerships & Expansion",
                    content: `The Company Profile Agent has identified 3 new global alliances formed in the last 48 hours. These deals focus on AI-driven supply chain optimization and last-mile delivery automation in the North Indian market.`,
                    tables: [
                        {
                            caption: "Recent Deal Intelligence",
                            headers: ["Partner", "Sector", "Impact", "Confidence"],
                            rows: [
                                ["LogiTech AI", "Software", "Operational Efficiency", "High"],
                                ["Bharat Ports", "Infrastructure", "Market Expansion", "Medium"],
                                ["GreenFuel Corp", "Energy", "Sustainability", "High"]
                            ]
                        }
                    ]
                },
                {
                    title: "Regulatory Compliance & Risk",
                    content: "The Regulatory Filings Agent detected a recent SEBI circular update that may impact disclosure requirements. Compliance scoring remains within the 'Green' zone, though litigation risk is moderately elevated due to ongoing sector-wide tax observations.",
                    tables: [
                        {
                            caption: "Risk Vector Analysis",
                            headers: ["Risk Domain", "Level", "Trend", "Agent Action"],
                            rows: [
                                ["Market Risk", "Moderate", "Neutral", "Continuous Monitoring"],
                                ["Compliance Risk", "Low", "Stable", "Quarterly Audit"],
                                ["Operational Risk", "Moderate", "Down", "Efficiency Track"],
                                ["Litigation Risk", "Medium", "Up", "Legal Review"]
                            ]
                        }
                    ]
                }
            ]
        };
    };

    const handleSendMessage = async (message: string) => {
        if (!hasStarted) setHasStarted(true);
        setMessages(prev => [
            ...prev,
            { role: 'user', content: message }
        ]);

        const isReportRequest = message.toLowerCase().includes('report') ||
            message.toLowerCase().includes('summary') ||
            message.toLowerCase().includes('analyse') ||
            message.toLowerCase().includes('analyze');

        setIsGenerating(true);
        if (isSuperMode || isReportRequest) {
            setIsDeepThinking(true);
        }

        try {
            const result = await processQuery(
                message,
                isSuperMode ? "core_intelligence_orchestrator_agent" : "user_query_interpretation_agent"
            );

            if (isDeepThinking) {
                // Simulate some extra thinking time for "Deep Mode"
                await new Promise(resolve => setTimeout(resolve, 2000));
                setIsDeepThinking(false);
            }

            if (isReportRequest) {
                const companyMatch = message.match(/(?:for|about|of)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/i);
                const companyName = companyMatch ? companyMatch[1] : "Market Entity";

                setMessages(prev => [...prev, {
                    role: 'assistant',
                    content: result.response,
                    data: result.data || {
                        ...generateMockReport(companyName),
                        summary: result.response,
                        author: result.agent || "OmniIntel Intelligence"
                    }
                }]);
            } else {
                setMessages(prev => [...prev, {
                    role: 'assistant',
                    content: result.response
                }]);
            }
        } catch (error) {
            console.error("Query failed:", error);
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: "I've encountered a system interruption while synthesizing your request. Please ensure the Intelligence Engine is online."
            }]);
        } finally {
            setIsGenerating(false);
            setIsDeepThinking(false);
        }
    };

    return (
        <div className="min-h-screen font-sans flex relative overflow-hidden text-stone-900 bg-[#FCFBFA]">
            {/* Background: Luxury Nude Radial Gradient */}
            <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_left,_#F5F5F0_0%,_#FCFBFA_100%)] pointer-events-none" />

            {/* Main Content Area (Chat) */}
            <motion.div
                layout
                className={cn(
                    "flex flex-col items-center relative z-10 transition-all duration-700 ease-in-out px-4 h-full",
                    isCanvasOpen ? "w-[55%]" : "w-full"
                )}
            >
                <div className={cn(
                    "w-full flex flex-col transition-all duration-700 h-full",
                    hasStarted ? "max-w-3xl" : "max-w-3xl items-center"
                )}>
                    <motion.div
                        layout
                        className={`w-full flex flex-col relative z-10 transition-all duration-700 ease-in-out ${hasStarted ? 'h-full pt-4 pb-4' : 'h-screen justify-center items-center gap-8'}`}
                    >
                        {/* Header */}
                        <motion.div layout className="text-center space-y-8">
                            <motion.h1
                                layout
                                className={`font-serif font-extralight text-stone-900 tracking-[0.05em] transition-all duration-700 ${hasStarted ? 'text-2xl' : 'text-6xl md:text-8xl'}`}
                            >
                                OmniIntel
                            </motion.h1>
                            <motion.div layout className="h-4 flex items-center justify-center overflow-hidden">
                                <AnimatePresence mode="wait">
                                    <motion.p
                                        key={currentAgentIndex}
                                        initial={{ opacity: 0, letterSpacing: '0.5em' }}
                                        animate={{ opacity: 0.4, letterSpacing: '0.3em' }}
                                        exit={{ opacity: 0, letterSpacing: '0.1em' }}
                                        transition={{ duration: 1.2, ease: "easeInOut" }}
                                        className="text-stone-900 font-black text-[10px] uppercase tracking-[0.3em]"
                                    >
                                        {AGENTS[currentAgentIndex]}
                                    </motion.p>
                                </AnimatePresence>
                            </motion.div>
                        </motion.div>

                        {/* Chat Area - Only visible after start */}
                        {hasStarted && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="flex-1 overflow-y-auto no-scrollbar space-y-6 py-6"
                            >
                                {messages.map((m, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={`flex gap-4 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        {m.role === 'assistant' && (
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-50 to-stone-100 border border-stone-200 flex items-center justify-center flex-shrink-0 mt-1">
                                                <Bot className="w-4 h-4 text-stone-600" />
                                            </div>
                                        )}
                                        <div className={`p-6 rounded-[32px] max-w-[85%] shadow-sm text-[15px] leading-relaxed ${m.role === 'user'
                                            ? 'bg-stone-900 text-white rounded-tr-none'
                                            : 'bg-white/60 backdrop-blur-md border border-stone-200/50 text-stone-800 rounded-tl-none shadow-xl'
                                            }`}>
                                            <p>{m.content}</p>
                                            {m.data && (
                                                <div className="mt-4 w-full">
                                                    {m.data.thinking_paths && (
                                                        <ThinkingPaths paths={m.data.thinking_paths} />
                                                    )}
                                                    <div className="mb-3 flex items-center justify-between bg-stone-50 p-3 rounded-xl border border-stone-100">
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                                                                <FileText className="w-4 h-4" />
                                                            </div>
                                                            <div>
                                                                <div className="text-[10px] font-black text-stone-400 uppercase tracking-tighter">Generated Insight</div>
                                                                <div className="text-xs font-bold text-stone-700">{m.data.title}</div>
                                                            </div>
                                                        </div>
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setSelectedDocData(m.data);
                                                                setIsCanvasOpen(true);
                                                                setActiveCanvasTab("preview");
                                                            }}
                                                            className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-900 text-white rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-stone-800 transition-colors shadow-lg"
                                                        >
                                                            Open in Canvas
                                                            <ChevronRight className="w-3 h-3" />
                                                        </button>
                                                    </div>
                                                    {!isCanvasOpen && <DocumentReport data={m.data} />}
                                                </div>
                                            )}
                                        </div>
                                        {m.role === 'user' && (
                                            <div className="w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center flex-shrink-0 mt-1">
                                                <User className="w-4 h-4 text-stone-500" />
                                            </div>
                                        )}
                                    </motion.div>
                                ))}

                                {isGenerating && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="flex gap-4 justify-start"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-50 to-stone-100 border border-stone-200 flex items-center justify-center flex-shrink-0 mt-1">
                                            <Bot className="w-4 h-4 text-stone-600" />
                                        </div>
                                        <div className="bg-white border border-stone-100 p-4 rounded-2xl rounded-tl-sm shadow-sm flex items-center">
                                            <Loader variant="typing" size="sm" className="text-stone-400" />
                                        </div>
                                    </motion.div>
                                )}
                                <div ref={messagesEndRef} />
                            </motion.div>
                        )}

                        {/* Input Area */}
                        <motion.div layout className={`w-full ${hasStarted ? 'sticky bottom-0 bg-gradient-to-t from-white via-white to-transparent pt-4 pb-2' : ''}`}>
                            <ClaudeChatInput
                                onSendMessage={handleSendMessage}
                                placeholder={isSuperMode ? "Ask Deep Reasoning Agent..." : "Ask OmniIntel anything..."}
                                models={agentModels}
                                defaultModel={agentModels[0].id}
                            />
                            {/* Super Mode Toggle - Positioned below input when centered, or inline/hidden when chat starts */}
                            {!hasStarted && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex justify-center mt-6"
                                >
                                    <button
                                        onClick={() => setIsSuperMode(!isSuperMode)}
                                        className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${isSuperMode ? 'bg-gradient-to-r from-amber-400 to-orange-400 text-white shadow-lg scale-105' : 'bg-white border border-stone-200 text-stone-500 hover:bg-stone-50 hover:border-stone-300'}`}
                                    >
                                        {isSuperMode ? <Zap className="w-4 h-4 fill-current animate-pulse" /> : <Sparkles className="w-4 h-4" />}
                                        {isSuperMode ? "Super Mode Active" : "Enable Super Mode"}
                                    </button>
                                </motion.div>
                            )}
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Intelligence Canvas Overlay/Side panel */}
            <AnimatePresence>
                {isCanvasOpen && (
                    <IntelligenceCanvas
                        isOpen={isCanvasOpen}
                        onClose={() => setIsCanvasOpen(false)}
                        activeTab={activeCanvasTab}
                        setActiveTab={setActiveCanvasTab}
                        documentData={selectedDocData}
                    />
                )}
            </AnimatePresence>

            {/* Deep Thinking Loader Overlay - Now full screen */}
            <AnimatePresence>
                {isDeepThinking && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-white/80 backdrop-blur-md"
                    >
                        <Loader variant="classic" size="lg" className="scale-150" />
                        <p className="mt-8 text-stone-600 font-medium animate-pulse text-lg tracking-tight">Synthesizing Deep Context...</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default App;
