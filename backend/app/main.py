import os
import sys
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Ensure backend root is on sys.path for internal imports
sys.path.insert(0, os.path.normpath(os.path.join(os.path.dirname(__file__), "..")))

from app.routes.api import router as api_router
from app.services.model_service import model_service

app = FastAPI(
    title="FAKE NEWS DETECTION AI - Backend API",
    description="NLP-powered Machine Learning classification service for Fake News Detection.",
    version="1.0.0"
)

# Enable CORS for local Vite dev server and production frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix="/api")

@app.get("/")
def root():
    return {
        "project": "FAKE NEWS DETECTION AI",
        "status": "online",
        "model_loaded": model_service.is_loaded,
        "docs_url": "/docs"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="127.0.0.1", port=8000, reload=True)
