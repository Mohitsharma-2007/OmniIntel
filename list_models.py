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
    print("Available OpenRouter Models:")
    print("=" * 60)
    for model in models:
        print(f"{model['id']}")
        if 'credits' in model:
            print(f"  Provider: {model.get('provider', 'N/A')}")
        print()
else:
    print(f"Error: {response.status_code}")
    print(response.text)