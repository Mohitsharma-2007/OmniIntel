import os

agents = [
    # Core Orchestration
    ("Core Intelligence Orchestrator Agent", "Core Orchestration"),
    ("Real-Time Event Router Agent", "Core Orchestration"),
    ("Data Freshness & Consistency Agent", "Core Orchestration"),
    ("Conflict Resolution Agent", "Core Orchestration"),
    ("Explainability & Traceability Agent", "Core Orchestration"),
    
    # Markets
    ("Live Stock Price Monitoring Agent", "Markets"),
    ("Market Trend & Momentum Agent", "Markets"),
    ("Volatility & Risk Scoring Agent", "Markets"),
    ("Derivatives & Options Analysis Agent", "Markets"),
    ("Sector & Industry Performance Agent", "Markets"),
    ("Index Correlation Agent", "Markets"),
    ("Institutional Activity Tracking Agent", "Markets"),
    ("Insider Trading Signals Agent", "Markets"),
    ("Liquidity & Volume Flow Agent", "Markets"),
    
    # Company
    ("Company Profile & Fundamentals Agent", "Company"),
    ("Financial Statements Analysis Agent", "Company"),
    ("Earnings & Guidance Agent", "Company"),
    ("Mergers & Acquisitions Agent", "Company"),
    ("Partnerships & Alliances Agent", "Company"),
    ("Contracts & Deal Disclosure Agent", "Company"),
    ("Country of Origin & Exposure Agent", "Company"),
    ("Subsidiary & Ownership Mapping Agent", "Company"),
    
    # Compliance
    ("Regulatory Filings Agent", "Compliance"),
    ("Compliance Rules Intelligence Agent", "Compliance"),
    ("Sanctions & Watchlist Agent", "Compliance"),
    ("Policy Change Detection Agent", "Compliance"),
    ("Legal Risk & Litigation Agent", "Compliance"),
    ("Audit & Governance Agent", "Compliance"),
    
    # News
    ("Real-Time News Ingestion Agent", "News"),
    ("Breaking News Impact Agent", "News"),
    ("Media Bias & Credibility Agent", "News"),
    ("Press Release Intelligence Agent", "News"),
    ("Rumor vs Verified News Agent", "News"),
    
    # Macro
    ("Geopolitical Risk Agent", "Macro"),
    ("Country Stability & Policy Agent", "Macro"),
    ("Trade & Tariff Impact Agent", "Macro"),
    ("Currency & FX Risk Agent", "Macro"),
    ("Global Supply Chain Risk Agent", "Macro"),
    
    # Supply
    ("Supply Chain Intelligence Agent", "Operations"),
    ("Demand Forecasting Agent", "Operations"),
    ("Inventory & Production Signals Agent", "Operations"),
    ("Vendor & Supplier Risk Agent", "Operations"),
    
    # Customer
    ("Customer Sentiment Agent", "Customer"),
    ("Product Reviews Intelligence Agent", "Customer"),
    ("Brand Reputation Agent", "Customer"),
    ("Social Media Market Sentiment Agent", "Customer"),
    
    # Fraud
    ("Transaction Anomaly Detection Agent", "Fraud"),
    ("Fraud Pattern Intelligence Agent", "Fraud"),
    ("Behavioral Risk Agent", "Fraud"),
    ("Financial Crime Typology Agent", "Fraud"),
    
    # Meta
    ("Historical Pattern Learning Agent", "Meta"),
    ("Cross-Agent Insight Synthesis Agent", "Meta"),
    ("Alert Prioritization Agent", "Meta"),
    ("User Query Interpretation Agent", "Meta"),
    ("Continuous Improvement & Feedback Agent", "Meta")
]

base_path = "e:/OmniIntel/backend/agents"

if not os.path.exists(base_path):
    os.makedirs(base_path)

for name, category in agents:
    folder_name = name.lower().replace(" ", "_").replace("&", "and")
    agent_path = os.path.join(base_path, folder_name)
    os.makedirs(agent_path, exist_ok=True)
    
    # Create SKILL.md
    with open(os.path.join(agent_path, "SKILL.md"), "w") as f:
        f.write(f"# Skill: {name}\n\nCategory: {category}\n\n## Description\nDetailed intelligence capabilities for {name}.\n\n## Capabilities\n- Real-time data processing\n- Pattern recognition in {category.lower()} data\n- Anomaly detection\n")
    
    # Create PROMPT.md
    with open(os.path.join(agent_path, "PROMPT.md"), "w") as f:
        f.write(f"# System Prompt: {name}\n\nYou are the {name}, part of the OmniIntel Intelligence Ecosystem. Your primary objective is to provide deep, evidence-based insights into {category.lower()} patterns using the Pathway-provided real-time data context.\n\n## Instructions\n1. Use only the provided data context.\n2. Cite sources and evidence for every claim.\n3. Identify risks and opportunities explicitly.")

print(f"Generated {len(agents)} agent documentation suites.")
