---
trigger: always_on
---

# FINAL TECH STACK (REAL, STABLE, HACKATHON-SAFE)

## 🧠 Core Real-Time AI Engine

-   **Pathway (Python)**
    -   Streaming ingestion
    -   Incremental computation
    -   Live Document Store
    -   Vector + BM25 hybrid search
    -   Event-driven tables
-   👉 *This is the brain. Everything else is peripheral.*

## 🤖 LLM & Agent Layer

-   **LLMs (any one, swappable)**
    -   Gemini / OpenAI / Open-source (LLaMA via API)
-   Pathway LLM **xPack**
-   Live **RAG**
-   MCP server
-   Agent orchestration hooks
-   👉 *LLMs **NEVER** see raw internet. Only Pathway outputs.*

## 🧩 Agent Architecture

### Agent Pattern:

-   Stateless reasoning
-   State stored only in Pathway tables

### Orchestration:

-   Core Intelligence Orchestrator Agent

### Execution:

-   Event-triggered, not prompt-triggered

## 📊 Data Ingestion Layer

### Native Pathway Connectors

-   APIs (REST, WebSocket)
-   RSS feeds
-   CSV / JSON
-   File watchers (PDFs, reports)

### Custom Python Connectors

-   NSE / BSE polling
-   MCA scraping
-   News crawling (rate-limited)

## 🗂️ Storage (Minimal, Purpose-Driven)

-   **Pathway Document Store** → Knowledge
-   PostgreSQL (optional) → Metadata, users
-   No external vector DB ❌ (*important for judges*)

## 🌐 Backend & APIs

-   **FastAPI**
    -   Query interface
    -   Agent responses
    -   Alert endpoints

## 🖥️ Frontend (Light, Not Judge-Distracting)

-   React / Next.js
-   Terminal-style UI (**Bloomberg-like**)
-   Focus: live updates, not animations

## 🚢 Deployment

-   **Docker**
-   Single-node deploy (hackathon)
-   Cloud optional (AWS / GCP free tier)

# 2. FULL SYSTEM FLOWCHART (REAL-TIME + AGENTIC)

Below is the exact logical flow judges love because it’s clean.

```
┌───────────────────────────────┐
│   Live Public Data Sources    │
│ (NSE, BSE, RBI, News, MCA)    │
└──────────────┬────────────────┘
               │  (Streaming / Polling)
               ▼
┌───────────────────────────────┐
│      Pathway Ingestion        │
│  (Connectors + Custom APIs)   │
└──────────────┬────────────────┘
               │
               ▼
┌───────────────────────────────┐
│  Streaming Processing Layer   │
│  - Filters                    │
│  - Joins                      │
│  - Aggregations               │
│  - Time Windows               │
└──────────────┬────────────────┘
               │
               ▼
┌───────────────────────────────┐
│  Live Knowledge Layer         │
│  Pathway Document Store       │
│  - Auto chunking              │
│  - Auto embedding             │
│  - Vector + BM25 index        │
└──────────────┬────────────────┘
               │
               ▼
┌───────────────────────────────┐
│  Agent Intelligence Layer     │
│                               │
│  [Market Agent]               │
│  [Company Agent]              │
│  [Compliance Agent]           │
│  [News Agent]                 │
│  [Risk Agent]                 │
│        ↓                      │
│  Core Orchestrator Agent      │
└──────────────┬────────────────┘
               │
               ▼
┌───────────────────────────────┐
│  LLM Reasoning (RAG Only)     │
│  - No raw internet            │
│  - Pathway indexed data only  │
└──────────────┬────────────────┘
               │
               ▼
┌───────────────────────────────┐
│  Outputs                      │
│  - Live answers               │
│  - Risk alerts                │
│  - Explainable insights       └───────────────────────────────┘
```

### 📌 Key Point for Judges:

-   LLM is downstream, not central.
-   **Pathway** controls truth. **LLM** explains it.

# 3. ANTI-HALLUCINATION RULESET (THIS IS GOLD)

*This is the most important part.*
These rules apply even if you vibe-code fast.

## 🔐 RULE 1: NO AGENT CAN THINK WITHOUT DATA

-   ❌ Prompt-only reasoning
-   ✅ Agents must read from **Pathway tables**

### Enforcement

1.  Every agent function requires a `pathway_table` input.
2.  If table is empty → agent returns **“Insufficient live data”**.

## 🔐 RULE 2: LLM NEVER SEES RAW INTERNET

-   ❌ Browsing
-   ❌ Web search
-   ❌ Guessing

### ✅ Only sees:

-   Retrieved chunks
-   Aggregated metrics
-   Agent summaries

*This is non-negotiable.*

## 🔐 RULE 3: RAG OR NO ANSWER

Every response must:

-   Cite at least 1 Pathway document chunk
-   Or 1 computed metric

If retrieval returns nothing:

-   **“No verified data available at this time.”**

*Judges LOVE this honesty.*

## 🔐 RULE 4: TIME-AWARENESS RULE

Each answer includes:

-   Timestamp of latest data used
-   Source type (market / filing / news)

*This kills hallucination instantly.*

## 🔐 RULE 5: AGENT ROLE BOUNDARIES

Each agent has:

-   Allowed data domains
-   Forbidden domains

### Example:

-   **News Agent** ❌ cannot compute financial ratios
-   **Financial Agent** ❌ cannot interpret legal compliance
-   Core Orchestrator merges results.

## 🔐 RULE 6: CONFLICT RESOLUTION BEFORE ANSWER

If two agents disagree:

1.  Core agent flags conflict
2.  Returns confidence-scored output
3.  Mentions uncertainty explicitly

*This is enterprise-grade behavior.*

## 🔐 RULE 7: NO HISTORICAL ASSUMPTIONS

Agents:

-   Compare current vs historical
-   Never extrapolate unless data supports it
-   No “likely”, no “probably” without evidence.

## 🔐 RULE 8: VIBE CODING SAFETY MODE

When fast-coding:

-   **Hard-code guards:**
    -   `if retrieval == empty: abort`
    -   `if data_age > threshold: warn`
-   Default to **under-answering**, never over-answering

# 🏆 HOW YOU EXPLAIN THIS TO JUDGES (SCRIPT)

> “We prevent hallucination **by design**.
> LLMs never access raw data or the internet.
> All agents reason only over Pathway’s live, continuously updated indexes.
> If data is missing or stale, the system explicitly refuses to answer.”

*That line = trust + maturity + win.*