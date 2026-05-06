---
trigger: model_decision
---

# FINALIZED PROBLEM STATEMENT (PS-6 – Financial Intelligence & Risk)

## Problem

Financial intelligence systems fail because they rely on static data, delayed analysis, and fragmented sources.

- Market data changes every second
- Fraud and risk must be detected instantly
- Company activities (payments, deals, partnerships, compliance) evolve continuously
- Traditional RAG systems become outdated quickly
- Decision-makers lack a single real-time intelligence view

As a result, financial, compliance, and strategic decisions are often made using **stale or incomplete information**.

## Solution (Pathway-Aligned)

Build a real-time, agentic financial intelligence platform that:

- Continuously ingests **live** market, company, news, and transactional data
- Maintains always-updated knowledge using Pathway’s **live RAG**
- Uses multiple specialized AI agents to analyze different financial dimensions
- Produces **instant insights**, risk signals, and intelligence updates as new data arrives

*Pathway acts as the core real-time data ingestion, processing, and reasoning engine, ensuring that all AI outputs are based on the latest available information.*

This system functions as a **next-generation financial intelligence terminal**, inspired by platforms like Bloomberg or Palantir, but built on real-time AI reasoning instead of static dashboards.

## 🧠 Your Agentic RAG System

### Core Architecture Idea

You are building a **multi-agent financial intelligence system**, coordinated by a **Core Orchestrator Agent**, all powered by Pathway’s streaming pipelines.

### Agent Categories (Refined & Judge-Friendly)

#### 1. Market & Financial Agents

- Stocks & Market Trend Analysis Agent
- Financial Analysis & Risk Agent
- Previous Historical Data Analysis Agent

**Purpose:**
- Track live prices, trends, volatility
- Compare historical vs current patterns
- Detect abnormal movements and risk signals

#### 2. Company Intelligence Agents

- Documents Agent (filings, reports)
- News & Reports Agent
- Partners & Deals Agent
- Country of Origin & Source Scenario Agent

**Purpose:**
- Monitor company announcements
- Track partnerships, mergers, contracts
- Analyze geopolitical or source-related risks
- Keep company intelligence always current

#### 3. Business Operations Agents

- Supply Agent
- Demand Agent
- Products Agent

**Purpose:**
- Understand supply-demand signals
- Track product launches or shortages
- Correlate business events with market impact

#### 4. Customer & Sentiment Agents

- Customer Agent
- Reviews & Public Sentiment Agent

**Purpose:**
- Track sentiment shifts
- Detect reputational or demand risks
- Link sentiment changes to stock movement

#### 5. Core Intelligence Orchestrator (MOST IMPORTANT)

- Receives outputs from all agents
- Resolves conflicts
- Maintains unified real-time state
- Answers complex questions like: *“Has this company recently signed major deals, received large payments, and does current market sentiment support growth?”*

*This core agent + Pathway = your **killer differentiator**.*

## ⚙️ How This Solves the PS “Properly”

| Hackathon Expectation | Solution Mapping |
| :--- | :--- |
| Stream transactions and market feeds | ✔ You ingest **live** stock, news, filings, and company data |
| Compute risk metrics in real time | ✔ Agents continuously compute trends, anomalies, correlations |
| Detect anomalies instantly | ✔ Pathway streaming + incremental analysis = **instant detection** |
| Use live RAG to validate against latest policies | ✔ Pathway Document Store keeps all documents **fresh automatically** |
| Pathway must be the core | ✔ Pathway is your ingestion + processing + RAG **backbone** |

This is a **textbook perfect PS match**.

## 🌍 Real Data: Where You Will Get It (Important)

### 1. Stock & Market Data
- Yahoo Finance (API / scraping with rate limits)
- Alpha Vantage (free tier)
- Polygon.io (free tier)
- Binance / Coinbase (crypto via WebSocket)
*Pathway ingests these as continuous streams.*

### 2. Company Filings & Reports
- SEC EDGAR (US filings)
- Company investor relations pages
- Annual / quarterly PDFs (file watcher mode)
*Pathway auto-updates when files change.*

### 3. News & Deals
- RSS feeds (Reuters, Bloomberg summaries, government bulletins)
- News APIs
- Company press releases
- Government tender portals
*All streamed + indexed live.*

### 4. Payments, Deals, Partners (IMPORTANT NOTE)

*You must **not** claim access to private bank transactions.*

**What you CAN legally analyze:**
- Public deal announcements
- M&A disclosures
- Contract filings
- Government procurement data
- Payment mentions in filings & reports

*Frame it as: “Publicly disclosed financial flows and agreements”*

### 5. Sentiment & Reviews
- Social media APIs (rate-limited)
- Product review sites
- News sentiment scoring

## 🧨 Very Important Wording Advice (Please Follow)

**❌ Don’t say:**
> “Tracking all company payments to whomsoever”

**✅ Say instead:**
> “Analyzing publicly available disclosures, filings, and announcements related to financial transactions, partnerships, and agreements”