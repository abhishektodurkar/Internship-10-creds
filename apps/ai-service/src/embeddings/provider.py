from langchain_ollama import OllamaEmbeddings

def get_embeddings(base_url: str) -> OllamaEmbeddings:
    return OllamaEmbeddings(model="nomic-embed-text", base_url=base_url)
