import sys
import os

sys.path.insert(0, os.path.dirname(__file__))

from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

# Real headlines directly from FakeNewsNet PolitiFact callset
samples = [
    ("PolitiFact Fake #1", "BREAKING: First NFL Team Declares Bankruptcy Over Anthem Protests"),
    ("PolitiFact Fake #2", "Court Orders Obama To Pay $400 Million In Restitution"),
    ("PolitiFact Real #1", "Donald Trump says his tax plan would benefit middle class and not wealthy"),
    ("PolitiFact Real #2", "Barack Obama says Paul Ryan proposed cutting Pell Grants by 20 percent"),
    ("PolitiFact Real #3", "Hillary Clinton says 17 intelligence agencies agreed Russia hacked Democratic DNC")
]

def run_predictions():
    print("==================================================")
    print("      POLITIFACT REAL DATASET SAMPLE PREDICTIONS  ")
    print("==================================================\n")
    for label, text in samples:
        res = client.post("/api/predict", json={"text": text})
        data = res.json()
        print(f"[{label}]")
        print(f" Headline      : \"{text}\"")
        print(f" Prediction    : {data['prediction']}")
        print(f" Confidence    : {data['confidence']*100:.2f}%")
        print(f" Class Probs   : FAKE={data['probabilities']['FAKE']*100:.2f}%, REAL={data['probabilities']['REAL']*100:.2f}%")
        print("-" * 60)

if __name__ == "__main__":
    run_predictions()
