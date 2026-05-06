# UI/UX PHILOSOPHY: The Real-Time Intelligence Terminal

Your UI is **not a website**. It is a **Real-Time Intelligence Terminal**.

## Core Principles

*   **Data-first**, not decoration-first
*   **Live updates** > animations
*   **Confidence** > flashiness
*   Everything **traceable**
*   No **dead widgets**

**Think:** "If Bloomberg Terminal and Palantir had a clean web UI built for AI agents."

---

# 🧱 GLOBAL UI STRUCTURE (HIGH LEVEL)

| Area | Description | UX Rule |
| :--- | :--- | :--- |
| **Top Status Bar** | System + Freshness | Trust Layer |
| **Left Nav** | Intelligence Modules | Domain-based Navigation |
| **Main Intelligence Workspace** | Dynamic, Contextual | Core Value Area |
| **Bottom Panel** | Insight / Logs / Explanations | Anti-Hallucination |

> This layout **never changes**. Only the content inside changes.

---

## 1️⃣ TOP STATUS BAR (TRUST LAYER)

**Purpose:** Instantly tell the user "**Is this system trustworthy right now?**"

### Elements
*   🟢 **System Status** (Live / Degraded / Partial)
*   ⏱ **Last Data Update Timestamp**
*   📡 **Active Data Streams Count**
*   🤖 **Active Agents Count**
*   ⚠️ **Alerts Indicator**

### UX Rules
*   **Always visible**
*   No scrolling
*   **Red/amber/green logic only**
*   Clicking status opens **System Health Panel**

---

## 2️⃣ LEFT NAVIGATION (INTELLIGENCE MODULES)

**Purpose:** Domain-based navigation, not pages.

### Sections
#### A. Market Intelligence
*   Live Markets
*   Trends & Momentum
*   Volatility & Risk
#### B. Company Intelligence
*   Company Overview
*   Financials
*   Deals & Partnerships
*   Ownership & Origin
#### C. News & Signals
*   Breaking News
*   Sentiment
*   Media Impact
#### D. Compliance & Risk
*   Regulatory Updates
*   Sanctions & Legal
*   Risk Flags
#### E. Supply & Macro
*   Supply Chain
*   Demand Signals
*   Macro Indicators
#### F. Agents & System
*   Agent Activity
*   Data Sources
*   System Logs

### UX Rules
*   No deep nesting (max **2 levels**)
*   Icons + text
*   Active module **always highlighted**
*   **Keyboard navigable** (important for terminal feel)

---

## 3️⃣ MAIN INTELLIGENCE WORKSPACE (CORE AREA)

> This is where **90% of value** lives.

### Structure (Dynamic Grid)

| Area | Purpose |
| :--- | :--- |
| **Context Header** | What & Why (MANDATORY) |
| **Primary Panel** | Live Data (Core Focus) |
| **Secondary Panel** | Context / Comparison |
| **Insights / Agent Summary** | (Feeds into Bottom Panel) |

#### A. Context Header (MANDATORY)

**Always shows:**
*   Current entity (Company / Market / Sector)
*   Active agents contributing
*   **Data confidence level**
*   Time window (e.g., “Last 24h”)

> This kills confusion instantly.

#### B. Primary Panel (LIVE DATA)

**Depends on module, examples:**

*   **Market View:** Live price stream, Volume, Trend direction, Volatility band
*   **Company View:** Key metrics, Recent filings, Active deals, Risk flags

**UX Rules:**
*   Numbers update smoothly (**no blinking**)
*   Highlight only **meaningful changes**
*   No charts **without explanation**

#### C. Secondary Panel (CONTEXT)
Used for:
*   Historical comparison
*   Related entities
*   Supporting data
*   Cross-agent signals

*Example: Stock price (primary) vs. News sentiment correlation (secondary).*

---

## 4️⃣ INSIGHTS & AGENT EXPLANATION PANEL (BOTTOM)

> This is your **anti-hallucination UX weapon**.

### Tabs
*   🧠 **AI Insight**
*   📄 **Evidence**
*   🤖 **Agent Contributions**
*   ⚠️ **Warnings**

#### A. AI Insight Tab
*   Natural language explanation
*   Short, factual, **cautious tone**
*   No predictions **without evidence**

#### B. Evidence Tab
*   List of: Documents, Filings, News items
*   **Timestamped**
*   Clickable

#### C. Agent Contributions Tab
*   Shows: Which agent contributed what
*   **Confidence score** per agent
*   **Data freshness** per agent

#### D. Warnings Tab
*   Data gaps
*   Conflicts
*   Stale signals

> Judges **LOVE** this panel.

---

## 5️⃣ QUERY & COMMAND INTERFACE (TERMINAL MODE)

*Optional but powerful.*

### Modes
*   🔍 Ask a Question
*   📊 Compare
*   ⚠️ Check Risk
*   📈 Explain Change

### Example Queries
*   "Why did this stock move today?"
*   "Show recent deals for this company"
*   "Any compliance risks detected?"

### UX Rules
*   Autocomplete suggestions
*   **Query preview** (what agents will be used)
*   Refuse vague queries **politely**

---

## 6️⃣ AGENT ACTIVITY DASHBOARD (SYSTEM TRANSPARENCY)

### What it shows
*   Agent name
*   Status (Idle / Processing)
*   Last trigger time
*   Data source used
*   Confidence output

### UX Rule
*   **Read-only**
*   No manual agent triggering (**important for trust**)

---

## 7️⃣ DATA SOURCE EXPLORER

### Shows
*   All connected data sources
*   Update frequency
*   Last successful pull
*   Failure count

> This proves "**real data**" to judges.

---

## 8️⃣ ALERTS & SIGNALS UX

Alerts are:
*   Non-intrusive
*   Contextual
*   **Explainable**

### Each alert shows:
*   Triggering agent
*   Threshold crossed
*   **Supporting evidence**
*   Confidence level

> No "**AI says**" alerts. **Ever.**

---

# 🎨 VISUAL DESIGN SYSTEM (KEEP IT SIMPLE)

### Color Palette
*   **Dark mode default**
*   Muted blues / greys
*   **Red only for confirmed risk**
*   Yellow for uncertainty

### Typography
*   **Monospace for numbers**
*   Clean sans-serif for text
*   Consistent hierarchy

### Motion
*   **Subtle transitions only**
*   No spinners unless real loading
*   No fake skeleton screens

---

# 🧠 UX RULES TO PREVENT HALLUCINATION (UI LEVEL)

*   Never show an insight **without evidence access**
*   Never hide **uncertainty**
*   Always show **timestamps**
*   Disable UI sections if data unavailable
*   Prefer "**No data**" over placeholder text

---

# 🏁 HOW TO EXPLAIN THIS TO JUDGES

> "Our UI is designed as an **intelligence terminal**, not a dashboard. Every insight is **traceable, time-stamped, and linked to agent outputs**. If data is missing or stale, the UI **explicitly shows it instead of guessing**."

That sentence = **maturity**.