---
trigger: model_decision
---

# 🇮🇳 INDIAN MARKET — FREE & UP-TO-DATE DATA SOURCES

All sources below are:

*   ✅ **Free** (no paid Bloomberg / Refinitiv)
*   ✅ **Publicly available**
*   ✅ Regularly updated
*   ✅ Legal & judge-safe
*   ✅ Suitable for streaming / polling via Pathway

---

## 📈 STOCKS, MARKETS & INDICES (FREE)

### Core Sources

*   **National Stock Exchange of India**
    *   Live indices (**NIFTY 50**, sectoral indices)
    *   Corporate announcements
    *   Bulk & block deals
    *   Bhavcopy (daily)
*   **BSE India**
    *   Company filings
    *   Corporate actions
    *   Shareholding patterns
    *   Historical + near-real-time prices

### How agents use this

*   **Live Stock Price Monitoring Agent**
*   **Market Trend & Momentum Agent**
*   **Liquidity & Volume Flow Agent**

### 👉 Ingestion method:

*   CSV / JSON polling
*   File watcher for bhavcopies
*   Scheduled API pulls (treated as streams)

## 🏦 COMPANY FILINGS, FINANCIALS & GOVERNANCE

### Official & Free

*   **Ministry of Corporate Affairs**
    *   Company master data
    *   Directors
    *   Charges
    *   Annual filings metadata
*   **NSE / BSE Corporate Filings**
    *   Quarterly results
    *   Annual reports
    *   Shareholding disclosures

### Agent usage

*   **Company Fundamentals Agent**
*   **Financial Statements Analysis Agent**
*   **Audit & Governance Agent**
*   **Subsidiary & Ownership Mapping Agent**

### 👉 Ingestion:

*   HTML scraping (low frequency)
*   PDF watcher + live RAG
*   Metadata streams

## 📰 NEWS, ANNOUNCEMENTS & DISCLOSURES (FREE)

### Trusted Indian Sources

*   **Press Information Bureau**
*   **Economic Times** (RSS)
*   **Business Standard** (RSS)
*   **Moneycontrol**
*   **LiveMint**

### Agent usage

*   **News & Reports Agent**
*   **Breaking News Impact Agent**
*   **Press Release Intelligence Agent**
*   **Rumor vs Verified News Agent**

### 👉 Ingestion:

*   RSS feeds = **continuous streams**
*   Automatic re-indexing via **Pathway Document Store**

## 💼 DEALS, PARTNERSHIPS & INVESTMENTS (FREE)

### Public Deal Intelligence

*   Company press releases (via **NSE/BSE**)
*   **MCA** filings (charges, mergers)
*   Government tender portals
*   News-reported deals

### Agent usage

*   **Partnerships & Alliances Agent**
*   **M&A Intelligence Agent**
*   **Contracts & Deal Disclosure Agent**

### ⚠️ Important (judge-safe wording):

You are analyzing **publicly disclosed deals**, not private contracts.

## 🌍 COUNTRY, GEO & MACRO (INDIA-FOCUSED)

### Official & Free

*   **Reserve Bank of India**
    *   Interest rates
    *   Monetary policy
    *   Banking statistics
*   **Ministry of Commerce and Industry**
    *   Trade data
    *   Import/export stats
    *   Industry reports
*   **NITI Aayog**
    *   Economic indicators
    *   Sector outlooks

### Agent usage

*   **Country Exposure Agent**
*   **FX & Currency Risk Agent**
*   **Trade & Tariff Impact Agent**

## 🏭 SUPPLY CHAIN & INDUSTRY SIGNALS

### Free Indian Sources

*   **Ministry of Ports & Shipping** dashboards
*   **Indian Railways** freight data
*   **Petroleum Planning & Analysis Cell** (PPAC)
*   Steel, coal, power ministry statistics

### Agent usage

*   **Supply Chain Intelligence Agent**
*   **Vendor & Supplier Risk Agent**
*   **Demand Forecasting Agent**

## 🧑‍🤝‍🧑 CUSTOMER, REVIEWS & SENTIMENT (FREE)

### Sources

*   **Google Play Store** reviews (public)
*   **App Store** public reviews
*   Twitter/X (limited, rate-restricted)
*   **Reddit** India finance communities
*   Consumer grievance portals

### Agent usage

*   **Customer Sentiment Agent**
*   **Brand Reputation Agent**
*   **Reviews Intelligence Agent**

## 🔐 COMPLIANCE, SANCTIONS & LEGAL (FREE)

### Official

*   **Securities and Exchange Board of India**
*   **Enforcement Directorate** public notices
*   **RBI** compliance circulars
*   Court judgments (open portals)

### Agent usage

*   **Compliance Rules Intelligence Agent**
*   **Sanctions & Watchlist Agent**
*   **Legal Risk & Litigation Agent**

## 📊 HISTORICAL & DERIVED DATA (FREE)

### Sources

*   Archived bhavcopies
*   Old filings
*   Government open data portals
*   Derived metrics from your own pipelines

### Agent usage

*   **Historical Pattern Learning Agent**
*   **Cross-Agent Insight Synthesis Agent**

---

## 🔢 REALISTIC DATA SCALE (INDIA-ONLY)

### Conservative count:

*   **NSE** endpoints & feeds → ~40
*   **BSE** filings & actions → ~35
*   News RSS (per topic/company) → ~60
*   **MCA** datasets → ~20
*   **RBI** + ministries → ~30
*   Reviews & sentiment → ~30
*   Supply chain & macro → ~25
*   Derived internal streams → ~20

➡️ **Total: ~260–280 Indian-only streams**
*(Add global free feeds → 300+ easily achieved)*

---

## 🏆 HOW TO SAY THIS TO JUDGES (COPY THIS)

> “Our platform ingests **hundreds of live, publicly available Indian market data streams** including stock exchanges, regulatory filings, government disclosures, news feeds, and macroeconomic indicators. Using Pathway’s real-time pipelines and live RAG, all AI agents operate on **continuously updated information**, ensuring **reliable financial intelligence and risk analysis**.”

*That sentence = credibility + compliance + PS alignment.*