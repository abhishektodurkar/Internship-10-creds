from pydantic import BaseModel

class ChatRequest(BaseModel):
    company_id: str
    question: str
