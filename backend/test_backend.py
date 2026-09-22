import sys
import os

# Put backend root in sys.path
sys.path.insert(0, os.path.dirname(__file__))

from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_endpoints():
    print("--- TESTING BACKEND ENDPOINTS ---")
    
    # 1. Root
    res = client.get("/")
    assert res.status_code == 200, f"Root failed: {res.text}"
    print("[PASS] GET / ->", res.json())

    # 2. Health
    res = client.get("/api/health")
    assert res.status_code == 200, f"Health failed: {res.text}"
    print("[PASS] GET /api/health ->", res.json())

    # 3. Model Info
    res = client.get("/api/model-info")
    assert res.status_code == 200, f"Model info failed: {res.text}"
    print("[PASS] GET /api/model-info -> Model Name:", res.json().get("model_name"))

    # 4. Metrics
    res = client.get("/api/metrics")
    assert res.status_code == 200, f"Metrics failed: {res.text}"
    metrics_data = res.json()
    print("[PASS] GET /api/metrics -> Best Model:", metrics_data.get("selected_model", {}).get("name"))

    # 5. Predict Fake News
    fake_payload = {
        "text": "Shocking discovery! Secret miracle herb cures all stage 4 diseases overnight! Pharmaceutical companies suppressing the truth."
    }
    res = client.post("/api/predict", json=fake_payload)
    assert res.status_code == 200, f"Predict failed: {res.text}"
    fake_res = res.json()
    print("[PASS] POST /api/predict (Fake sample) -> Prediction:", fake_res["prediction"], "| Confidence:", fake_res["confidence"])

    # 6. Predict Real News
    real_payload = {
        "text": "The Federal Reserve announced an adjustment to the benchmark interest rate following deliberations by the Federal Open Market Committee."
    }
    res = client.post("/api/predict", json=real_payload)
    assert res.status_code == 200, f"Predict failed: {res.text}"
    real_res = res.json()
    print("[PASS] POST /api/predict (Real sample) -> Prediction:", real_res["prediction"], "| Confidence:", real_res["confidence"])

    # 7. Batch Predict
    batch_payload = {
        "articles": [fake_payload["text"], real_payload["text"]]
    }
    res = client.post("/api/batch-predict", json=batch_payload)
    assert res.status_code == 200, f"Batch predict failed: {res.text}"
    print("[PASS] POST /api/batch-predict -> Processed:", res.json()["total_processed"], "items.")

    print("\nALL BACKEND ENDPOINT TESTS PASSED SUCCESSFULLY!")

if __name__ == "__main__":
    test_endpoints()
