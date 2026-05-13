FROM python:3.11-slim
WORKDIR /app
COPY apps/ai-service/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY apps/ai-service/src ./src
CMD ["uvicorn", "src.api.main:app", "--host", "0.0.0.0", "--port", "8000"]
