import os
from uuid import uuid4
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from .schemas import ChatRequest
from ..embeddings.provider import get_embeddings
from ..storage.chroma_store import get_store, upsert_documents
from ..ingestion.pdf_loader import load_and_chunk_pdf
from ..pipelines.rag_pipeline import answer_question

app = FastAPI(title="AEMS AI Service")
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

OLLAMA_BASE_URL = os.getenv("OLLAMA_BASE_URL", "http://localhost:11434")
CHROMA_PERSIST_DIR = os.getenv("CHROMA_PERSIST_DIR", "./chroma_db")
UPLOAD_DIR = os.getenv("UPLOAD_DIR", "./uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.get('/health')
def health():
    return {"status": "ok", "service": "aems-ai"}

@app.post('/api/v1/rag/upload')
async def upload_pdf(company_id: str = Form(...), file: UploadFile = File(...)):
    if not file.filename.lower().endswith('.pdf'):
        raise HTTPException(status_code=400, detail='Only PDF files are supported')
    path = os.path.join(UPLOAD_DIR, f"{uuid4()}-{file.filename}")
    with open(path, 'wb') as out:
        out.write(await file.read())

    docs = load_and_chunk_pdf(path, company_id)
    store = get_store(collection_name=f"company_{company_id}", persist_dir=CHROMA_PERSIST_DIR, embeddings=get_embeddings(OLLAMA_BASE_URL))
    upsert_documents(store, docs)
    return {"chunks": len(docs), "file": file.filename}

@app.post('/api/v1/rag/chat')
def chat(payload: ChatRequest):
    store = get_store(collection_name=f"company_{payload.company_id}", persist_dir=CHROMA_PERSIST_DIR, embeddings=get_embeddings(OLLAMA_BASE_URL))
    return answer_question(store, payload.question, OLLAMA_BASE_URL)
