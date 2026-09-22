from fastapi import APIRouter, HTTPException, status
from app.schemas.predict import (
    PredictionRequest,
    PredictionResponse,
    BatchPredictionRequest,
    BatchPredictionResponse
)
from app.services.model_service import model_service

router = APIRouter()

@router.get("/health", summary="Check backend and model health status")
def health_check():
    return {
        "status": "healthy",
        "model_loaded": model_service.is_loaded,
        "model_name": model_service.model_name
    }

@router.post("/predict", response_model=PredictionResponse, summary="Classify a news article/headline")
def predict_news(request: PredictionRequest):
    if not request.text.strip():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Provided text must not be empty."
        )
    
    if not model_service.is_loaded:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="ML model artifacts are not loaded on server. Run training script first."
        )
        
    try:
        res = model_service.predict(request.text)
        return res
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error performing text prediction: {str(e)}"
        )

@router.post("/batch-predict", response_model=BatchPredictionResponse, summary="Batch classify news articles")
def batch_predict_news(request: BatchPredictionRequest):
    if not model_service.is_loaded:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="ML model artifacts are not loaded."
        )
    
    results = model_service.predict_batch(request.articles)
    return {
        "results": results,
        "total_processed": len(results)
    }

@router.get("/model-info", summary="Get model architecture and training configuration metadata")
def get_model_info():
    return model_service.get_model_info()

@router.get("/metrics", summary="Get training dataset evaluation results and comparison metrics")
def get_metrics():
    metrics = model_service.get_metrics()
    if not metrics:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Training metrics not found. Please train models first."
        )
    return metrics
