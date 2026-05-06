"use client";

import type React from "react";
import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import {
    Plus,
    SlidersHorizontal,
    ArrowUp,
    X,
    ChevronDown,
    Loader2,
    AlertCircle,
    Copy,
    Zap,
    Search,
    Bot,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Types
export interface FileWithPreview {
    id: string;
    file: File;
    preview?: string;
    type: string;
    uploadStatus: "pending" | "uploading" | "complete" | "error";
    uploadProgress?: number;
    abortController?: AbortController;
    textContent?: string;
}

export interface PastedContent {
    id: string;
    content: string;
    timestamp: Date;
    wordCount: number;
}

export interface ModelOption {
    id: string;
    name: string;
    description: string;
    badge?: string;
}

interface ChatInputProps {
    onSendMessage?: (
        message: string,
        files: FileWithPreview[],
        pastedContent: PastedContent[]
    ) => void;
    disabled?: boolean;
    placeholder?: string;
    maxFiles?: number;
    maxFileSize?: number; // in bytes
    acceptedFileTypes?: string[];
    models?: ModelOption[];
    defaultModel?: string;
    onModelChange?: (modelId: string) => void;
}

// Constants
const MAX_FILES = 10;
const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
const DEFAULT_MODELS_INTERNAL: ModelOption[] = [
    {
        id: "claude-sonnet-4",
        name: "Claude Sonnet 4",
        description: "Balanced model",
        badge: "Latest",
    },
    {
        id: "claude-opus-3.5",
        name: "Claude Opus 3.5",
        description: "Highest intelligence",
    },
    {
        id: "claude-haiku-3",
        name: "Claude Haiku 3",
        description: "Fastest responses",
    },
];

// File type helpers


const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (
        Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    );
};

const getFileTypeLabel = (type: string): string => {
    const parts = type.split("/");
    let label = parts[parts.length - 1].toUpperCase();
    if (label.length > 7 && label.includes("-")) {
        label = label.substring(0, label.indexOf("-"));
    }
    if (label.length > 10) {
        label = label.substring(0, 10) + "...";
    }
    return label;
};

// Helper function to check if a file is textual
const isTextualFile = (file: File): boolean => {
    const textualTypes = [
        "text/",
        "application/json",
        "application/xml",
        "application/javascript",
        "application/typescript",
    ];

    const textualExtensions = [
        "txt", "md", "py", "js", "ts", "jsx", "tsx", "html", "htm", "css", "scss", "sass",
        "json", "xml", "yaml", "yml", "csv", "sql", "sh", "bash", "php", "rb", "go", "java",
        "c", "cpp", "h", "hpp", "cs", "rs", "swift", "kt", "scala", "r", "vue", "svelte",
        "astro", "config", "conf", "ini", "toml", "log", "gitignore", "dockerfile", "makefile", "readme"
    ];

    const isTextualMimeType = textualTypes.some((type) =>
        file.type.toLowerCase().startsWith(type)
    );

    const extension = file.name.split(".").pop()?.toLowerCase() || "";
    const isTextualExtension =
        textualExtensions.includes(extension) ||
        file.name.toLowerCase().includes("readme") ||
        file.name.toLowerCase().includes("dockerfile") ||
        file.name.toLowerCase().includes("makefile");

    return isTextualMimeType || isTextualExtension;
};

// Helper function to read file content as text
const readFileAsText = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve((e.target?.result as string) || "");
        reader.onerror = (e) => reject(e);
        reader.readAsText(file);
    });
};

// Helper function to get file extension for badge
const getFileExtension = (filename: string): string => {
    const extension = filename.split(".").pop()?.toUpperCase() || "FILE";
    return extension.length > 8 ? extension.substring(0, 8) + "..." : extension;
};

// File Preview Component
const FilePreviewCard: React.FC<{
    file: FileWithPreview;
    onRemove: (id: string) => void;
}> = ({ file, onRemove }) => {
    const isImage = file.type.startsWith("image/");
    const isTextual = isTextualFile(file.file);

    if (isTextual) {
        return <TextualFilePreviewCard file={file} onRemove={onRemove} />;
    }

    return (
        <div
            className={cn(
                "relative group bg-white border w-fit border-stone-200 rounded-lg p-3 size-[125px] shadow-sm flex-shrink-0 overflow-hidden",
                isImage ? "p-0" : "p-3"
            )}
        >
            <div className="flex items-start gap-3 size-[125px] overflow-hidden">
                {isImage && file.preview ? (
                    <div className="relative size-full rounded-md overflow-hidden bg-stone-100">
                        <img
                            src={file.preview || "/placeholder.svg"}
                            alt={file.file.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                ) : (
                    <></>
                )}
                {!isImage && (
                    <div className="flex-1 min-w-0 overflow-hidden">
                        <div className="flex items-center gap-1.5 mb-1">
                            <div className="group absolute flex justify-start items-end p-2 inset-0 bg-gradient-to-b to-[#30302E] from-transparent overflow-hidden">
                                <p className="absolute bottom-2 left-2 capitalize text-stone-700 text-xs bg-white/90 border border-stone-200 px-2 py-1 rounded-md">
                                    {getFileTypeLabel(file.type)}
                                </p>
                            </div>
                            {file.uploadStatus === "uploading" && (
                                <Loader2 className="h-3.5 w-3.5 animate-spin text-blue-400" />
                            )}
                            {file.uploadStatus === "error" && (
                                <AlertCircle className="h-3.5 w-3.5 text-red-400" />
                            )}
                        </div>

                        <p
                            className="max-w-[90%] text-xs font-medium text-stone-700 truncate"
                            title={file.file.name}
                        >
                            {file.file.name}
                        </p>
                        <p className="text-[10px] text-stone-500 mt-1">
                            {formatFileSize(file.file.size)}
                        </p>
                    </div>
                )}
            </div>
            <Button
                size="icon"
                variant="outline"
                className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100"
                onClick={() => onRemove(file.id)}
            >
                <X className="h-4 w-4" />
            </Button>
        </div>
    );
};

// Pasted Content Preview Component
const PastedContentCard: React.FC<{
    content: PastedContent;
    onRemove: (id: string) => void;
}> = ({ content, onRemove }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const previewText = content.content.slice(0, 150);
    const needsTruncation = content.content.length > 150;

    return (
        <div className="bg-zinc-700 border border-zinc-600 relative rounded-lg p-3 size-[125px] shadow-md flex-shrink-0 overflow-hidden">
            <div
                className="text-[8px] text-zinc-300 whitespace-pre-wrap break-words max-h-24 overflow-y-auto custom-scrollbar cursor-pointer hover:bg-zinc-600/50 rounded p-0.5 transition-colors"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                {isExpanded || !needsTruncation ? content.content : previewText}
                {!isExpanded && needsTruncation && "..."}
            </div>
            <div className="group absolute flex justify-start items-end p-2 inset-0 bg-gradient-to-b to-[#30302E] from-transparent overflow-hidden">
                <p className="capitalize text-stone-700 text-xs bg-white/90 border border-stone-200 px-2 py-1 rounded-md">
                    PASTED
                </p>
                <div className="group-hover:opacity-100 opacity-0 transition-opacity duration-300 flex items-center gap-0.5 absolute top-2 right-2">
                    <Button
                        size="icon"
                        variant="outline"
                        className="size-6"
                        onClick={() => navigator.clipboard.writeText(content.content)}
                        title="Copy content"
                    >
                        <Copy className="h-3 w-3" />
                    </Button>
                    <Button
                        size="icon"
                        variant="outline"
                        className="size-6"
                        onClick={() => onRemove(content.id)}
                        title="Remove content"
                    >
                        <X className="h-3 w-3" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

// Internal Agent Browser Modal Component
const AgentBrowserModal = ({
    isOpen,
    onClose,
    models,
    onSelect,
    selectedId
}: {
    isOpen: boolean;
    onClose: () => void;
    models: ModelOption[];
    onSelect: (id: string) => void;
    selectedId: string;
}) => {
    const [search, setSearch] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen]);

    const filteredModels = models.filter(m =>
        m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.description.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm z-[60]"
                    />
                    {/* Modal */}
                    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            className="bg-white/95 backdrop-blur-xl w-full max-w-4xl h-[80vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-white/20 ring-1 ring-stone-900/5 pointer-events-auto"
                        >
                            {/* Header */}
                            <div className="p-6 border-b border-stone-100 flex items-center gap-4 shrink-0">
                                <div className="h-10 w-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-500">
                                    <Bot className="w-5 h-5" />
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-xl font-serif text-stone-800">Select Intelligence Agent</h2>
                                    <p className="text-sm text-stone-500">Choose from {models.length} specialized agents for your task</p>
                                </div>
                                <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-stone-100">
                                    <X className="w-5 h-5 text-stone-400" />
                                </Button>
                            </div>

                            {/* Search */}
                            <div className="p-4 bg-stone-50/50 border-b border-stone-100 shrink-0">
                                <div className="relative max-w-lg mx-auto">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        placeholder="Search agents by name or capability..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 bg-white border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-400/20 text-sm placeholder:text-stone-400"
                                    />
                                </div>
                            </div>

                            {/* Grid Content */}
                            <div className="flex-1 overflow-y-auto p-6 no-scrollbar">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {filteredModels.map((model) => (
                                        <button
                                            key={model.id}
                                            onClick={() => onSelect(model.id)}
                                            className={cn(
                                                "text-left p-4 rounded-2xl border transition-all duration-200 group relative overflow-hidden",
                                                selectedId === model.id
                                                    ? "bg-stone-900 text-white border-stone-900 shadow-lg scale-[1.02]"
                                                    : "bg-white border-stone-100 hover:border-stone-300 hover:shadow-md hover:-translate-y-0.5"
                                            )}
                                        >
                                            <div className="flex items-start justify-between mb-3">
                                                <div className={cn(
                                                    "w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors",
                                                    selectedId === model.id ? "bg-white/20 text-white" :
                                                        model.badge === "Core" ? "bg-blue-50 text-blue-600 group-hover:bg-blue-100" :
                                                            model.badge === "MAX" ? "bg-amber-50 text-amber-600 group-hover:bg-amber-100" :
                                                                "bg-stone-50 text-stone-500 group-hover:bg-stone-100"
                                                )}>
                                                    {model.badge === "Core" ? <div className="w-2.5 h-2.5 bg-current rounded-full" /> :
                                                        model.badge === "MAX" ? <Zap className="w-5 h-5 fill-current" /> :
                                                            <span className="text-sm font-bold">{model.name[0]}</span>
                                                    }
                                                </div>
                                                {model.badge && (
                                                    <span className={cn(
                                                        "text-[10px] uppercase font-bold px-2 py-1 rounded-full tracking-wider",
                                                        selectedId === model.id ? "bg-white/20 text-white" :
                                                            model.badge === "Core" ? "bg-blue-50 text-blue-700" :
                                                                model.badge === "MAX" ? "bg-amber-50 text-amber-700" : "bg-stone-100 text-stone-500"
                                                    )}>
                                                        {model.badge}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="space-y-1">
                                                <div className={cn("font-medium text-sm truncate", selectedId === model.id ? "text-white" : "text-stone-800")}>
                                                    {model.name}
                                                </div>
                                                <div className={cn("text-xs line-clamp-2", selectedId === model.id ? "text-stone-300" : "text-stone-500")}>
                                                    {model.description}
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                                {filteredModels.length === 0 && (
                                    <div className="text-center py-20 text-stone-400">
                                        <p>No agents found matching "{search}"</p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};

// Model Selector Component
const ModelSelectorDropdown: React.FC<{
    models: ModelOption[];
    selectedModel: string;
    onModelChange: (modelId: string) => void;
}> = ({ models, selectedModel, onModelChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [position, setPosition] = useState<{ bottom: number; right: number } | null>(null);
    const selectedModelData =
        models.find((m) => m.id === selectedModel) || models[0];
    const dropdownRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (isOpen && buttonRef.current) {
            const updatePosition = () => {
                const rect = buttonRef.current?.getBoundingClientRect();
                if (rect) {
                    setPosition({
                        bottom: window.innerHeight - rect.top + 8,
                        right: window.innerWidth - rect.right
                    });
                }
            };

            updatePosition();
            window.addEventListener('resize', updatePosition);
            window.addEventListener('scroll', updatePosition);

            return () => {
                window.removeEventListener('resize', updatePosition);
                window.removeEventListener('scroll', updatePosition);
            };
        }
    }, [isOpen]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            const dropdownEl = document.getElementById('model-selector-dropdown');
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(target) &&
                (!dropdownEl || !dropdownEl.contains(target))
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <AgentBrowserModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                models={models}
                onSelect={(id) => {
                    onModelChange(id);
                    setIsModalOpen(false);
                }}
                selectedId={selectedModel}
            />

            <Button
                ref={buttonRef}
                variant="ghost"
                size="sm"
                className="h-9 px-2.5 text-sm font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-100"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="truncate max-w-[200px] sm:max-w-[300px]">
                    {selectedModelData.name}
                </span>
                <ChevronDown
                    className={cn(
                        "ml-1 h-4 w-4 transition-transform",
                        isOpen && "rotate-180"
                    )}
                />
            </Button>

            {isOpen && position && createPortal(
                <div
                    id="model-selector-dropdown"
                    className="fixed w-96 bg-white/90 backdrop-blur-xl border border-stone-200/50 rounded-2xl shadow-2xl z-[9999] p-2 max-h-96 overflow-y-auto no-scrollbar ring-1 ring-stone-900/5 origin-bottom-right"
                    style={{
                        bottom: position.bottom,
                        right: position.right,
                    }}
                >
                    <div className="px-3 py-2 text-xs font-semibold text-stone-400 uppercase tracking-wider">
                        Recent Agents
                    </div>
                    {models.slice(0, 5).map((model) => (
                        <button
                            key={model.id}
                            onClick={() => {
                                onModelChange(model.id);
                                setIsOpen(false);
                            }}
                            className={cn(
                                "w-full text-left p-2.5 rounded-xl flex items-center gap-3 transition-all duration-200 hover:bg-stone-100/80 group",
                                selectedModel === model.id ? "bg-stone-100" : ""
                            )}
                        >
                            <div className={cn(
                                "w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors",
                                model.badge === "Core" ? "bg-blue-50 text-blue-600" :
                                    model.badge === "MAX" ? "bg-amber-50 text-amber-600" : "bg-stone-50 text-stone-500 group-hover:bg-stone-100"
                            )}>
                                {model.badge === "Core" ? <div className="w-2 h-2 bg-current rounded-full" /> :
                                    model.badge === "MAX" ? <Zap className="w-3.5 h-3.5 fill-current" /> :
                                        <span className="text-[10px] font-bold">{model.name[0]}</span>
                                }
                            </div>
                            <div className="min-w-0 flex-1">
                                <div className="font-medium text-stone-800 text-sm truncate">{model.name}</div>
                            </div>
                        </button>
                    ))}

                    <div className="h-px bg-stone-100 my-1" />

                    <button
                        onClick={() => {
                            setIsOpen(false);
                            setIsModalOpen(true);
                        }}
                        className="w-full text-left p-2.5 rounded-xl flex items-center justify-center gap-2 hover:bg-stone-100/80 text-sm font-medium text-stone-600 transition-colors group"
                    >
                        <span>View all {models.length} agents</span>
                        <ArrowUp className="w-4 h-4 rotate-45 group-hover:rotate-0 transition-transform" />
                    </button>
                </div>,
                document.body
            )}
        </div>
    );
};

// Textual File Preview Component
const TextualFilePreviewCard: React.FC<{
    file: FileWithPreview;
    onRemove: (id: string) => void;
}> = ({ file, onRemove }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const previewText = file.textContent?.slice(0, 150) || "";
    const needsTruncation = (file.textContent?.length || 0) > 150;
    const fileExtension = getFileExtension(file.file.name);

    return (
        <div className="bg-white border border-stone-200 relative rounded-lg p-3 size-[125px] shadow-sm flex-shrink-0 overflow-hidden">
            <div
                className="text-[8px] text-stone-600 whitespace-pre-wrap break-words max-h-24 overflow-y-auto custom-scrollbar cursor-pointer hover:bg-stone-50 rounded p-0.5 transition-colors"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                {file.textContent ? (
                    <>
                        {isExpanded || !needsTruncation ? file.textContent : previewText}
                        {!isExpanded && needsTruncation && "..."}
                    </>
                ) : (
                    <div className="flex items-center justify-center h-full text-stone-400">
                        <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                )}
            </div>
            <div className="group absolute flex justify-start items-end p-2 inset-0 bg-gradient-to-b to-[#30302E] from-transparent overflow-hidden">
                <p className="capitalize text-stone-700 text-xs bg-white/90 border border-stone-200 px-2 py-1 rounded-md">
                    {fileExtension}
                </p>
                {file.uploadStatus === "uploading" && (
                    <div className="absolute top-2 left-2">
                        <Loader2 className="h-3.5 w-3.5 animate-spin text-blue-400" />
                    </div>
                )}
                {file.uploadStatus === "error" && (
                    <div className="absolute top-2 left-2">
                        <AlertCircle className="h-3.5 w-3.5 text-red-400" />
                    </div>
                )}
                <div className="group-hover:opacity-100 opacity-0 transition-opacity duration-300 flex items-center gap-0.5 absolute top-2 right-2">
                    {file.textContent && (
                        <Button
                            size="icon"
                            variant="outline"
                            className="size-6"
                            onClick={() =>
                                navigator.clipboard.writeText(file.textContent || "")
                            }
                            title="Copy content"
                        >
                            <Copy className="h-3 w-3" />
                        </Button>
                    )}
                    <Button
                        size="icon"
                        variant="outline"
                        className="size-6"
                        onClick={() => onRemove(file.id)}
                        title="Remove file"
                    >
                        <X className="h-3 w-3" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

// Main ChatInput Component
const ClaudeChatInput: React.FC<ChatInputProps> = ({
    onSendMessage,
    disabled = false,
    placeholder = "How can I help you today?",
    maxFiles = MAX_FILES,
    maxFileSize = MAX_FILE_SIZE,
    acceptedFileTypes,
    models = DEFAULT_MODELS_INTERNAL,
    defaultModel,
    onModelChange,
}) => {
    const [message, setMessage] = useState("");
    const [files, setFiles] = useState<FileWithPreview[]>([]);
    const [pastedContent, setPastedContent] = useState<PastedContent[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const [selectedModel, setSelectedModel] = useState(
        defaultModel || models[0]?.id || ""
    );

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${Math.min(
                textareaRef.current.scrollHeight,
                200
            )}px`;
        }
    }, [message]);

    const handleFileSelect = useCallback(
        (selectedFiles: FileList | null) => {
            if (!selectedFiles) return;
            const currentFileCount = files.length;
            if (currentFileCount >= maxFiles) return;
            const availableSlots = maxFiles - currentFileCount;
            const filesToAdd = Array.from(selectedFiles).slice(0, availableSlots);

            const newFiles = filesToAdd
                .filter(file => file.size <= maxFileSize)
                .map((file) => ({
                    id: Math.random().toString(36).substr(2, 9),
                    file,
                    preview: file.type.startsWith("image/")
                        ? URL.createObjectURL(file)
                        : undefined,
                    type: file.type || "application/octet-stream",
                    uploadStatus: "pending" as const,
                    uploadProgress: 0,
                }));

            setFiles((prev) => [...prev, ...newFiles]);
            // Simulate upload and text reading...
            newFiles.forEach((fileToUpload) => {
                if (isTextualFile(fileToUpload.file)) {
                    readFileAsText(fileToUpload.file).then((textContent) => {
                        setFiles(prev => prev.map(f => f.id === fileToUpload.id ? { ...f, textContent } : f));
                    });
                }
                setFiles(prev => prev.map(f => f.id === fileToUpload.id ? { ...f, uploadStatus: 'complete' } : f));
            });

        },
        [files.length, maxFiles]
    );

    const removeFile = useCallback((id: string) => {
        setFiles((prev) => prev.filter((f) => f.id !== id));
    }, []);

    const handleSend = useCallback(() => {
        if (!message.trim() && files.length === 0) return;
        onSendMessage?.(message, files, pastedContent);
        setMessage("");
        setFiles([]);
        setPastedContent([]);
    }, [message, files, pastedContent, onSendMessage]);

    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    }, [handleSend]);

    return (
        <div
            className="relative w-full max-w-2xl mx-auto"
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
            onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                if (e.dataTransfer.files) handleFileSelect(e.dataTransfer.files);
            }}
        >
            {isDragging && (
                <div className="absolute inset-0 z-50 bg-stone-50/90 border-2 border-dashed border-stone-400 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <span className="text-stone-600 font-medium">Drop files to upload</span>
                </div>
            )}

            <div className="bg-white border border-stone-200 rounded-xl shadow-lg flex flex-col overflow-hidden transition-all duration-200 focus-within:ring-1 focus-within:ring-stone-300 focus-within:shadow-md">
                <textarea
                    ref={textareaRef}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    disabled={disabled}
                    className="w-full bg-transparent text-stone-900 placeholder:text-stone-400 p-4 min-h-[60px] max-h-[200px] resize-none focus:outline-none custom-scrollbar"
                />

                {/* File Previews */}
                {(files.length > 0 || pastedContent.length > 0) && (
                    <div className="px-4 pb-2 flex gap-2 overflow-x-auto custom-scrollbar">
                        {pastedContent.map((content) => (
                            <PastedContentCard
                                key={content.id}
                                content={content}
                                onRemove={(id) =>
                                    setPastedContent((prev) => prev.filter((c) => c.id !== id))
                                }
                            />
                        ))}
                        {files.map(f => (
                            <FilePreviewCard key={f.id} file={f} onRemove={removeFile} />
                        ))}
                    </div>
                )}

                <div className="flex justify-between items-center px-2 py-2 bg-stone-50 border-t border-stone-100">
                    <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="text-stone-400 hover:text-stone-700 hover:bg-stone-200" onClick={() => fileInputRef.current?.click()}>
                            <Plus className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-stone-400 hover:text-stone-700 hover:bg-stone-200">
                            <SlidersHorizontal className="h-5 w-5" />
                        </Button>
                    </div>

                    <div className="flex items-center gap-2">
                        {models.length > 0 && (
                            <ModelSelectorDropdown
                                models={models}
                                selectedModel={selectedModel}
                                onModelChange={(id) => {
                                    setSelectedModel(id);
                                    onModelChange?.(id);
                                }}
                            />
                        )}
                        <Button
                            size="icon"
                            className={cn("transition-all duration-200", message.trim() || files.length > 0 ? "bg-stone-900 text-white hover:bg-stone-700" : "bg-stone-200 text-stone-400")}
                            onClick={handleSend}
                            disabled={!message.trim() && files.length === 0}
                        >
                            <ArrowUp className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </div>
            <input
                ref={fileInputRef}
                type="file"
                multiple
                accept={acceptedFileTypes?.join(',')}
                className="hidden"
                onChange={(e) => handleFileSelect(e.target.files)}
            />
        </div>
    );
};

export default ClaudeChatInput;
