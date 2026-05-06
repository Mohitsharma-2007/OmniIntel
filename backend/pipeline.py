import pathway as pw
import os
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

# Define Schema for Customized Intelligence Data
class DocumentSchema(pw.Schema):
    doc: str

def run_pipeline():
    # 1. Customized Data Ingestion Layer
    # Read text files from the intelligence_vault
    vault_path = "./backend/data/intelligence_vault"
    os.makedirs(vault_path, exist_ok=True)
    
    docs_stream = pw.io.fs.read(
        vault_path,
        format="binary",
        mode="streaming",
        with_metadata=True
    )
    
    # Process binary to text
    processed_docs = docs_stream.select(
        content=pw.this.data.decode("utf-8", errors="ignore"),
        source=pw.this._metadata["path"]
    )

    # 2. Knowlege Layer (Simplified RAG)
    # In a full setup, we'd use pw.xpacks.llm.vector_store
    # Here we provide the stream for retrieval in main.py
    
    return {
        "docs": processed_docs,
    }

# Function for the API to get context (Mocking retrieval from the stream state)
# In production, this would be a Pathway Table query
def get_custom_context(query: str):
    # For now, we'll read the latest content from the vault directly if the pipeline is just starting
    vault_path = "./backend/data/intelligence_vault"
    context = ""
    try:
        for filename in os.listdir(vault_path):
            if filename.endswith(".txt"):
                with open(os.path.join(vault_path, filename), "r") as f:
                    context += f"SOURCE: {filename}\n{f.read()}\n\n"
    except Exception as e:
        print(f"Error reading vault: {e}")
    return context if context else "No custom intelligence found in vault."

if __name__ == "__main__":
    # Test local indexing
    print("Testing Pathway Ingestion...")
    # This just verifies the logic
    ctx = get_custom_context("OmniIntel")
    print(f"Context found:\n{ctx}")
