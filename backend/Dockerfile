FROM python:3.11-slim
WORKDIR /app

COPY requirements.serve.txt .
RUN pip install --no-cache-dir -r requirements.serve.txt

COPY . .

# Render / Cloud Run inject $PORT; default 8000 for local `docker run`.
ENV PORT=8000
CMD ["sh", "-c", "uvicorn main:app --host 0.0.0.0 --port ${PORT}"]
