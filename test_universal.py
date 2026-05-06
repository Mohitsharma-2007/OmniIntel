import requests
import json

url = "http://localhost:8000/query"
payload = {
    "query": "Give me an intelligence report on Nvidia",
    "agent_id": "core_orchestrator"
}
headers = {"Content-Type": "application/json"}

try:
    response = requests.post(url, json=payload, headers=headers)
    print(f"Status: {response.status_code}")
    print(json.dumps(response.json(), indent=2))
except Exception as e:
    print(f"Error: {e}")
