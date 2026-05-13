from langchain_community.vectorstores import Chroma
from langchain_core.documents import Document
from typing import List

def get_store(collection_name: str, persist_dir: str, embeddings):
    return Chroma(collection_name=collection_name, embedding_function=embeddings, persist_directory=persist_dir)

def upsert_documents(store: Chroma, docs: List[Document]):
    if docs:
        store.add_documents(docs)
