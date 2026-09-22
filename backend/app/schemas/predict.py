from typing import List, Dict
from pydantic import BaseModel, Field

class PredictionRequest(BaseModel):
    text: str = Field(..., min_length=10, description="News text or headline to analyze")

class PredictionResponse(BaseModel):
    prediction: str = Field(..., description="'FAKE' or 'REAL'")
    confidence: float = Field(..., description="Calibrated prediction probability (0.0 to 1.0)")
    probabilities: Dict[str, float] = Field(..., description="Probabilities for FAKE and REAL classes")
    model_used: str = Field(..., description="Name of the deployed ML model")
    cleaned_text: str = Field(..., description="Preprocessed text fed into TF-IDF vectorizer")
    disclaimer: str = Field(
        default="Prediction based on patterns learned from the training dataset. Does not constitute independent fact verification.",
        description="Academic disclaimer"
    )

class BatchPredictionRequest(BaseModel):
    articles: List[str] = Field(..., min_items=1, max_items=20, description="List of news articles to classify")

class BatchPredictionResponse(BaseModel):
    results: List[PredictionResponse]
    total_processed: int
