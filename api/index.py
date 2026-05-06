import os
import glob
import json
import requests

OPENROUTER_API_KEY = os.environ.get("OPENROUTER_API_KEY", "")

FREE_MODELS = [
    "openrouter/free",
    "google/gemma-4-31b",
    "deepseek/deepseek-chat",
]

PRIMARY_MODEL = os.environ.get("OPENROUTER_MODEL", "openrouter/free")

AGENT_PROMPTS = {}

def load_agent_prompts():
    base_path = os.path.join(os.path.dirname(__file__), "..", "backend", "agents")
    if os.path.exists(base_path):
        for agent_dir in glob.glob(os.path.join(base_path, "*")):
            if os.path.isdir(agent_dir):
                agent_id = os.path.basename(agent_dir)
                prompt_path = os.path.join(agent_dir, "PROMPT.md")
                if os.path.exists(prompt_path):
                    with open(prompt_path, "r") as f:
                        AGENT_PROMPTS[agent_id] = f.read()

load_agent_prompts()

def call_openrouter(prompt: str) -> str:
    if not OPENROUTER_API_KEY:
        return "OPENROUTER_API_KEY not configured"
    
    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json"
    }
    
    for model in [PRIMARY_MODEL] + FREE_MODELS:
        try:
            resp = requests.post(
                "https://openrouter.ai/api/v1/chat/completions",
                headers=headers,
                json={"model": model, "messages": [{"role": "user", "content": prompt}]},
                timeout=60
            )
            if resp.status_code == 200:
                return resp.json()["choices"][0]["message"]["content"]
        except:
            continue
    return "All models failed"

def handler(request):
    path = request.url.path
    
    if path in ["/api/health", "/health"]:
        return {"statusCode": 200, "body": json.dumps({"status": "online"})}
    
    if path == "/api/query":
        try:
            body = json.loads(request.body or "{}")
            query = body.get("query", "")
            response = call_openrouter(query)
            return {"statusCode": 200, "body": json.dumps({"response": response})}
        except Exception as e:
            return {"statusCode": 500, "body": json.dumps({"error": str(e)})}
    
    return {"statusCode": 404, "body": "Not found"}