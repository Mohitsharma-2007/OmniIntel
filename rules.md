---
trigger: always_on
---

# VIBE-CODING HARD RULE SET
(Agentic Real-Time Financial Intelligence System)

Use this as **SYSTEM / GUARDRAIL PROMPT** for your AI IDE.

## 🧠 GLOBAL SYSTEM RULES (NON-NEGOTIABLE)

*   This system is **REAL-TIME**, not batch.
*   Every component must assume data is continuously updating.
*   No static datasets unless explicitly marked as historical.

### Pathway is the SINGLE SOURCE OF TRUTH

*   All data ingestion, processing, and reasoning must flow through Pathway.
*   No parallel data logic outside Pathway tables.

### LLMs are EXPLANATION layers, not THINKING layers

*   LLMs may summarize, explain, format.
*   LLMs may **NOT** invent facts, numbers, entities, or events.

## 🚫 ANTI-HALLUCINATION CORE RULES

*   No data → **No answer**.
*   If retrieval returns empty, respond: *“No verified live data available at this time.”*

### LLM NEVER accesses the open internet

*   No browsing.
*   No search.
*   No external URLs at inference time.

### Every answer must be grounded

At least one of:
*   Pathway document chunk
*   Pathway computed metric
*   Agent-validated signal

### Time awareness is mandatory

Every output must include:
*   **Latest data timestamp**
*   **Data source category** (market, filing, news, macro)

## 🤖 AGENT BEHAVIOR RULES

*   Each agent has a **fixed domain**.
*   Agents may **NOT** operate outside assigned scope.
*   Agents are **stateless**.
    *   No memory stored inside prompts.
    *   All state must exist in Pathway tables.

### Inter-Agent Communication

*   Agents do not talk to each other directly.
*   All inter-agent communication goes through:
    *   Core Intelligence Orchestrator
    *   Pathway tables

### Agents cannot guess

*   No “likely”, “probably”, “may have”.
*   Only **evidence-based outputs** allowed.

## 🔁 EVENT & STREAMING RULES

*   All logic is **event-driven**.
*   Agents trigger on:
    *   New data arrival
    *   Table updates
    *   Threshold breaches
*   Polling = streaming. Even APIs polled periodically must be treated as event streams.

### Data freshness checks are mandatory

*   If data age exceeds threshold:
    *   Flag as stale
    *   Reduce confidence score

## 📚 RAG-SPECIFIC RULES

*   RAG is **LIVE**, not cached.
*   Index updates automatically (No manual re-ingestion).

### Retrieval Requirements

*   **Hybrid retrieval only** (Vector similarity + keyword (BM25)).
*   Never vector-only answers.

### Citation Enforcement

Every RAG response must reference:
*   Document ID or
*   Filing type or
*   News source category

## ⚖️ CONFLICT & UNCERTAINTY RULES

*   Conflicts must be **exposed**, not hidden.
    *   Show disagreement.
    *   Provide confidence scores.
*   Confidence is proportional to **evidence**.
*   Freshness > volume.

### Error Handling Preference

*   Silence is better than false confidence.
*   **Under-answering is preferred**.
*   **Over-confidence is forbidden**.

## 🔐 LEGAL & ETHICAL SAFETY RULES

*   No private or confidential data.
*   Only publicly available, legal sources allowed.
*   **No claims of hidden access**.

### Never imply access to:

*   Bank transactions
*   Private contracts
*   Internal company systems

### Wording

*   Always use **“publicly disclosed”** wording (especially for deals, payments, partnerships).

## 🧪 DEVELOPMENT / VIBE-CODING SAFETY RULES

*   If unclear, **ASK before building**. No assumption-based coding.
*   No feature without data. If data source not defined → feature not built.
*   Start minimal, expand modularly. **Phase-1 agents first**.
*   No premature optimization.

### Fail Safely

*   **Empty state > wrong answer**.
*   Warning > hallucination.

## 🧾 OUTPUT FORMAT RULES

*   **Structured outputs only** (JSON / schema-based internal outputs).
*   Free-text only at final presentation layer.

### Always include explanation trail

*   What data was used
*   Which agent produced it
*   When it was last updated

## 🏁 FINAL GOLDEN RULE

If the system cannot prove it, the system must **refuse to say it**.