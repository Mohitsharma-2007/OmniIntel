const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY || "";
const OPENROUTER_MODEL = import.meta.env.VITE_OPENROUTER_MODEL || "google/gemma-4-31b";

console.log("🔍 API Key loaded:", OPENROUTER_API_KEY ? "YES (length: " + OPENROUTER_API_KEY.length + ")" : "NO");

const FREE_MODELS = [
  "google/gemma-4-31b",
  "deepseek/deepseek-chat",
  "mistralai/mistral-7b-instruct",
  "meta-llama/llama-3.1-8b-instruct",
  "google/gemma-2-27b-it",
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
    return "⚠️ API Key Missing! Add VITE_OPENROUTER_API_KEY in Vercel → Settings → Environment Variables → Production. Key must start with 'sk-or-'. Then Redeploy!";
  }

  if (!OPENROUTER_API_KEY.startsWith("sk-or-")) {
    return "⚠️ Invalid API Key format! Must start with 'sk-or-'. Get a new key from https://openrouter.ai/keys";
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
      } else {
        const errorText = await response.text();
        console.error(`Model ${model} error:`, response.status, errorText);
        if (response.status === 401) {
          return `🔑 401 Error: Invalid API Key. Please check your VITE_OPENROUTER_API_KEY in Vercel settings.`;
        }
      }
    } catch (err) {
      console.error(`Model ${model} exception:`, err);
      continue;
    }
  }

  return "All AI models failed. Please check console for details.";
}

export async function processQuery(query: string, agentId: string = "core_intelligence_orchestrator_agent"): Promise<{
  response: string;
  agent: string;
  sources: string[];
  data?: any;
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