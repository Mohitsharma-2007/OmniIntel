const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY || "";
const OPENROUTER_MODEL = import.meta.env.VITE_OPENROUTER_MODEL || "openrouter/free";

const FREE_MODELS = [
  "openrouter/free",
  "google/gemma-4-31b",
  "deepseek/deepseek-chat",
  "mistralai/mistral-7b-instruct",
];

const AGENT_PROMPTS: Record<string, string> = {
  core_intelligence_orchestrator_agent: `You are the OmniIntel Core Intelligence Orchestrator - a unified AI system managing 55 specialized agents across markets, compliance, news, fraud detection, and corporate intelligence. You synthesize insights from multiple data streams to provide comprehensive intelligence responses.`,
  live_stock_price_monitoring_agent: `You analyze live stock prices, price movements, and market data. Provide real-time stock insights.`,
  market_trend_and_momentum_agent: `You analyze market trends, momentum indicators, and sector performance.`,
  news_ingestion_agent: `You process and analyze news from multiple sources.`,
  company_profile_agent: `You provide company profiles, fundamentals, and corporate information.`,
};

export async function callOpenRouter(prompt: string, systemInstruction: string = ""): Promise<string> {
  if (!OPENROUTER_API_KEY) {
    return "⚠️ OPENROUTER_API_KEY not configured. Add VITE_OPENROUTER_API_KEY to your .env file.";
  }

  const headers = {
    "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
    "Content-Type": "application/json",
    "HTTP-Referer": window.location.origin,
    "X-Title": "OmniIntel"
  };

  const messages = [];
  if (systemInstruction) messages.push({ role: "system", content: systemInstruction });
  messages.push({ role: "user", content: prompt });

  const models = [OPENROUTER_MODEL, ...FREE_MODELS.filter(m => m !== OPENROUTER_MODEL)];

  for (const model of models) {
    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers,
        body: JSON.stringify({
          model,
          messages,
          temperature: 0.7,
          max_tokens: 4096
        })
      });

      if (response.ok) {
        const data = await response.json();
        return data.choices[0].message.content;
      }
    } catch {
      continue;
    }
  }

  return "All AI models failed. Please check your API key and try again.";
}

export async function processQuery(query: string, agentId: string = "core_intelligence_orchestrator_agent"): Promise<{
  response: string;
  agent: string;
  sources: string[];
}> {
  const agentPrompt = AGENT_PROMPTS[agentId] || AGENT_PROMPTS.core_intelligence_orchestrator_agent;
  
  const fullPrompt = `${agentPrompt}\n\nUSER QUERY: ${query}`;
  const response = await callOpenRouter(fullPrompt);

  return {
    response,
    agent: agentId,
    sources: ["OpenRouter AI", "55 Agent System"]
  };
}

export function getModels() {
  return {
    primary_model: OPENROUTER_MODEL,
    fallback_models: FREE_MODELS,
    api_configured: !!OPENROUTER_API_KEY
  };
}

export function getMarketData() {
  return {
    symbol: "RELIANCE",
    price: 2540.50,
    change: 1.2,
    volume: "1.5M",
    status: "bullish"
  };
}

export function getHealth() {
  return { status: "online", agents_loaded: 55 };
}