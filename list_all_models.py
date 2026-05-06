import requests
import os
from dotenv import load_dotenv

load_dotenv()

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

if not OPENROUTER_API_KEY:
    print("Error: OPENROUTER_API_KEY not found in .env")
    exit(1)

headers = {
    "Authorization": f"Bearer {OPENROUTER_API_KEY}"
}

response = requests.get(
    "https://openrouter.ai/api/v1/models",
    headers=headers,
    timeout=30
)

if response.status_code == 200:
    models = response.json()["data"]
    print("ALL Available OpenRouter Models:")
    print("=" * 80)
    for model in models:
        print(f"ID: {model['id']}")
        print(f"  Name: {model.get('name', 'N/A')}")
        print(f"  Provider: {model.get('provider', 'N/A')}")
        print(f"  Context Limit: {model.get('context_length', 'N/A')}")
        print()
else:
    print(f"Error: {response.status_code}")
    print(response.text)