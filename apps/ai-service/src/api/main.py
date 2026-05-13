from fastapi import FastAPI

app = FastAPI(title="AEMS AI Service")

@app.get('/health')
def health():
    return {"status": "ok", "service": "aems-ai"}
