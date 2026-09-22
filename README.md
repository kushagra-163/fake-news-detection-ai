# FAKE NEWS DETECTION AI — Monorepo ML Project

[![Python 3.14](https://img.shields.io/badge/Python-3.14-blue.svg)](https://python.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688.svg)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/React-18.2-61DAFB.svg)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC.svg)](https://tailwindcss.com)

> An end-to-end Academic Internship Project featuring an NLP Machine Learning Pipeline, FastAPI REST Backend, React/TypeScript Dashboard, Jupyter Notebook, and Presentation Documentation.

---

## 1. DATASET SPECIFICATION & SOURCE

- **Dataset Source:** **FakeNewsNet Benchmark Dataset** (PolitiFact + GossipCop callsets)
- **Repository Reference:** [KaiDMML/FakeNewsNet](https://github.com/KaiDMML/FakeNewsNet)
- **Citation:** Shu, K., Mahudeswaran, D., Wang, S., Lee, D., & Liu, H. (2020). *FakeNewsNet: A Data Repository with News Content, Social Context, and Spatiotemporal Information*. Big Data, 8(3), 171-188.
- **Raw Records:** 4,056 news samples (2,124 REAL, 1,932 FAKE)
- **Cleaned Records:** 3,909 unique news samples (147 duplicate/invalid rows removed)
- **Class Balance:** 2,033 REAL (52.0%) / 1,876 FAKE (48.0%)
- **Train / Test Split:** 80% Training (3,127 samples) / 20% Testing (782 samples) stratified split with `random_state=42`.

### Academic Disclaimer
> **IMPORTANT:** The system is a machine-learning text classification system. It predicts whether text matches patterns learned from training data. It does NOT independently verify facts on the internet and must NOT be claimed to determine objective truth.

---

## 2. MONOREPO STRUCTURE

```text
fake-news-detection/
│
├── frontend/                     # React + Vite + TypeScript + Tailwind CSS UI
│   ├── src/
│   │   ├── components/          # Navbar, Footer, VisualPipeline
│   │   ├── pages/               # LandingPage, AnalyzerPage, InsightsPage, ComparisonPage, DocPage, AboutPage
│   │   ├── services/            # Axios API client
│   │   ├── types/               # TypeScript interfaces
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── backend/                      # FastAPI Service & ML Training Pipeline
│   ├── app/
│   │   ├── main.py              # FastAPI app entrypoint
│   │   ├── routes/              # Health, predict, batch-predict, model-info, metrics routes
│   │   ├── services/            # ModelService manager
│   │   └── schemas/             # Pydantic request/response models
│   │
│   ├── models/                  # Serialized artifacts (best_model.joblib, tfidf_vectorizer.joblib, metrics.json)
│   ├── data/                    # Authentic dataset CSV
│   ├── training/                # Data loader, preprocessing, train.py script
│   ├── test_backend.py          # Automated endpoint test suite
│   ├── requirements.txt
│   └── .venv/                   # Python virtual environment
│
├── notebooks/
│   └── fake_news_detection.ipynb # Step-by-step academic notebook for viva
│
├── docs/
│   ├── REPORT.md                # Comprehensive academic project report
│   └── PRESENTATION_SLIDES.md  # 12-slide presentation structure with actual metrics
│
├── README.md                    # Project documentation
└── .gitignore
```

---

## 3. HOW TO TRAIN THE MODEL

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Run training script:
   ```bash
   .\.venv\Scripts\python.exe training\train.py
   ```
3. The script will:
   - Download the genuine FakeNewsNet dataset into `backend/data/news_dataset.csv`.
   - Clean and preprocess text (3,909 unique rows).
   - Fit `TfidfVectorizer(max_features=5000, ngram_range=(1, 2))` on training split only (3,127 samples).
   - Train Logistic Regression, Multinomial Naive Bayes, and Linear SVM models.
   - Evaluate on 782 test samples (Accuracy, Precision, Recall, F1-Score, Confusion Matrix).
   - Select the winning model (**Multinomial Naive Bayes**) based on test F1-score (77.71%).
   - Save `best_model.joblib`, `tfidf_vectorizer.joblib`, and `metrics.json` to `backend/models/`.

---

## 4. HOW TO RUN BACKEND API

From `backend/`:

```bash
.\.venv\Scripts\python.exe -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```

- Base API: `http://127.0.0.1:8000/api`
- Interactive Swagger Docs: `http://127.0.0.1:8000/docs`

---

## 5. HOW TO RUN FRONTEND UI

1. Navigate to `frontend/`:
   ```bash
   cd frontend
   ```
2. Start Vite development server:
   ```bash
   npm run dev
   ```
3. Open browser at `http://localhost:3000` (or `http://localhost:5173`).

---

## 6. ACTUAL EVALUATION RESULTS ON GENUINE DATASET

Calculated on **782 independent test samples**:

| Model | Accuracy | Precision | Recall | F1-Score | Status |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Multinomial Naive Bayes** | **76.60%** | **77.05%** | **78.38%** | **77.71%** | **Selected Winner** |
| **Logistic Regression** | 75.32% | 73.36% | 82.56% | 77.69% | Evaluated |
| **Linear SVM** | 75.19% | 75.06% | 78.38% | 76.68% | Evaluated |

### Confusion Matrix (Multinomial Naive Bayes)
- **True Negative (FAKE correctly predicted as FAKE)**: 280
- **False Positive (FAKE incorrectly predicted as REAL)**: 95
- **False Negative (REAL incorrectly predicted as FAKE)**: 88
- **True Positive (REAL correctly predicted as REAL)**: 319

---

## 7. LICENSE & REFERENCES

- Shu, K. et al. (2020). *FakeNewsNet: A Data Repository with News Content, Social Context, and Spatiotemporal Information*. Big Data, 8(3), 171-188. Repository: `https://github.com/KaiDMML/FakeNewsNet`.
- Pedregosa et al. (2011). *Scikit-learn: Machine Learning in Python*. JMLR.
- Ramirez et al. (2020). *FastAPI Framework Documentation*.
