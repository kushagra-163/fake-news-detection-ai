import os
import json
import joblib
import numpy as np
from typing import Dict, Any, List

from training.preprocessing import clean_text

MODEL_DIR = os.path.normpath(os.path.join(os.path.dirname(__file__), "..", "..", "models"))
BEST_MODEL_PATH = os.path.join(MODEL_DIR, "best_model.joblib")
VECTORIZER_PATH = os.path.join(MODEL_DIR, "tfidf_vectorizer.joblib")
METRICS_PATH = os.path.join(MODEL_DIR, "metrics.json")

class ModelService:
    def __init__(self):
        self.model = None
        self.vectorizer = None
        self.metrics: Dict[str, Any] = {}
        self.model_name: str = "Unknown"
        self.is_loaded: bool = False
        self.load_artifacts()

    def load_artifacts(self):
        try:
            if os.path.exists(BEST_MODEL_PATH) and os.path.exists(VECTORIZER_PATH):
                self.model = joblib.load(BEST_MODEL_PATH)
                self.vectorizer = joblib.load(VECTORIZER_PATH)
                
                if os.path.exists(METRICS_PATH):
                    with open(METRICS_PATH, "r") as f:
                        self.metrics = json.load(f)
                    self.model_name = self.metrics.get("selected_model", {}).get("name", "Trained ML Model")
                else:
                    self.model_name = type(self.model).__name__

                self.is_loaded = True
                print(f"[ModelService] Artifacts loaded successfully. Model: {self.model_name}")
            else:
                print(f"[ModelService] Artifacts not found in {MODEL_DIR}. Please run train.py first.")
                self.is_loaded = False
        except Exception as e:
            print(f"[ModelService] Error loading model artifacts: {e}")
            self.is_loaded = False

    def predict(self, text: str) -> Dict[str, Any]:
        if not self.is_loaded or self.model is None or self.vectorizer is None:
            raise RuntimeError("ML model artifacts are not loaded. Please train the model first.")

        cleaned = clean_text(text)
        if not cleaned:
            # Fallback for empty or punctuation-only text
            return {
                "prediction": "UNKNOWN",
                "confidence": 0.5,
                "probabilities": {"FAKE": 0.5, "REAL": 0.5},
                "model_used": self.model_name,
                "cleaned_text": "",
                "disclaimer": "Prediction based on patterns learned from training data. Input contained insufficient clean text."
            }

        # Transform using vectorizer
        tfidf_vec = self.vectorizer.transform([cleaned])

        # Predict class (0 = FAKE, 1 = REAL)
        raw_pred = self.model.predict(tfidf_vec)[0]
        prediction_label = "REAL" if raw_pred == 1 else "FAKE"

        # Predict probabilities
        if hasattr(self.model, "predict_proba"):
            probs = self.model.predict_proba(tfidf_vec)[0] # [p_fake, p_real]
            prob_fake = float(round(probs[0], 4))
            prob_real = float(round(probs[1], 4))
        else:
            # Fallback for decision function (scaled via sigmoid)
            decision = self.model.decision_function(tfidf_vec)[0]
            prob_real = float(round(1 / (1 + np.exp(-decision)), 4))
            prob_fake = float(round(1.0 - prob_real, 4))

        confidence = prob_real if prediction_label == "REAL" else prob_fake

        return {
            "prediction": prediction_label,
            "confidence": confidence,
            "probabilities": {
                "FAKE": prob_fake,
                "REAL": prob_real
            },
            "model_used": self.model_name,
            "cleaned_text": cleaned,
            "disclaimer": "Prediction based on patterns learned from the training dataset. Does not constitute independent fact verification."
        }

    def predict_batch(self, articles: List[str]) -> List[Dict[str, Any]]:
        return [self.predict(art) for art in articles]

    def get_metrics(self) -> Dict[str, Any]:
        return self.metrics

    def get_model_info(self) -> Dict[str, Any]:
        if not self.is_loaded:
            return {"status": "uninitialized", "message": "Model not loaded"}

        return {
            "status": "ready",
            "model_name": self.model_name,
            "model_type": type(self.model).__name__,
            "vectorizer_type": type(self.vectorizer).__name__,
            "vocabulary_size": len(self.vectorizer.vocabulary_) if self.vectorizer else 0,
            "dataset_metadata": self.metrics.get("dataset_metadata", {}),
            "selected_model_metrics": self.metrics.get("selected_model", {})
        }

# Global singleton instance
model_service = ModelService()
