# FAKE NEWS DETECTION AI — 12-SLIDE PRESENTATION DECK

---

## SLIDE 1: Title Slide
- **Title:** FAKE NEWS DETECTION AI
- **Subtitle:** An End-to-End NLP Machine Learning Text Classification System
- **Context:** Academic Internship Project Submission & Viva Presentation
- **Technologies:** Python, FastAPI, scikit-learn, React, TypeScript, Tailwind CSS, Recharts

---

## SLIDE 2: Problem Statement
- **Problem:** Online platforms experience a high volume of unverified text content.
- **Challenge:** Human editors cannot manually verify millions of daily articles.
- **Solution:** Apply NLP feature engineering and supervised Machine Learning to classify text based on vocabulary signatures learned from labeled datasets.

---

## SLIDE 3: Project Objectives
- Build a standardized NLP text preprocessing and normalization pipeline.
- Implement TF-IDF vectorization (unigrams & bigrams, 5,000 vocabulary features).
- Train & compare 3 models: Logistic Regression, Naive Bayes, Linear SVM.
- Deploy an asynchronous FastAPI REST API backend.
- Build a responsive React dashboard presenting live classification and evaluation metrics.

---

## SLIDE 4: Genuine Dataset & Preprocessing
- **Dataset Source:** FakeNewsNet Benchmark Dataset (PolitiFact + GossipCop callsets).
- **Dataset Size:** 4,056 raw records (3,909 cleaned unique news headlines/articles).
- **Class Balance:** 2,033 REAL (52.0%) / 1,876 FAKE (48.0%).
- **Split:** 80% Train (3,127 samples) / 20% Test (782 samples) stratified split.
- **Preprocessing:** Lowercase, HTML/URL stripping, punctuation filtering, duplicate removal.

---

## SLIDE 5: Feature Engineering (TF-IDF)
- **Vectorization Method:** Term Frequency-Inverse Document Frequency.
- **Configuration:** `ngram_range=(1, 2)`, `max_features=5000` (5,000 vocabulary features extracted).
- **Data Leakage Safeguard:** Vectorizer fitted strictly on training data (`X_train`), avoiding test set contamination.

---

## SLIDE 6: Machine Learning Models Evaluated
1. **Multinomial Naive Bayes (Selected Winner):** Bayes probability classifier for term counts.
2. **Logistic Regression:** Log-odds probability model with Sigmoid activation.
3. **Linear Support Vector Machine (LinearSVC):** Maximum margin linear hyperplane classifier.

---

## SLIDE 7: System Architecture
- **Monorepo Architecture:**
  - `frontend/` (React + Vite + TypeScript + Tailwind CSS)
  - `backend/` (FastAPI + Uvicorn + scikit-learn)
- **API Endpoints:** `/api/health`, `/api/predict`, `/api/model-info`, `/api/metrics`
- **Artifact Persistence:** Models saved via `joblib` (`best_model.joblib`, `tfidf_vectorizer.joblib`, `metrics.json`).

---

## SLIDE 8: Evaluation Results (782 Test Samples)
- **Multinomial Naive Bayes (Selected Winner):** 76.60% Accuracy | 77.05% Precision | 78.38% Recall | **77.71% F1-Score**
- **Logistic Regression:** 75.32% Accuracy | 73.36% Precision | 82.56% Recall | **77.69% F1-Score**
- **Linear SVM:** 75.19% Accuracy | 75.06% Precision | 78.38% Recall | **76.68% F1-Score**

---

## SLIDE 9: Confusion Matrix (Multinomial Naive Bayes)
- **True Negative (TN - FAKE correctly predicted as FAKE):** 280
- **False Positive (FP - FAKE incorrectly predicted as REAL):** 95
- **False Negative (FN - REAL incorrectly predicted as FAKE):** 88
- **True Positive (TP - REAL correctly predicted as REAL):** 319

---

## SLIDE 10: Real-Time Prediction Demo
- User inputs headline or article text into UI.
- System preprocesses text and generates a TF-IDF vector.
- Deployed model returns classification (`FAKE` or `REAL`) with calibrated confidence score and breakdown.

---

## SLIDE 11: Academic Limitations & Future Scope
- **Limitations:** Performs statistical pattern matching on learned data; does not perform live internet fact-checking.
- **Future Scope:**
  - Transformer models (BERT / RoBERTa).
  - Multilingual support.
  - Browser extension for real-time web news scoring.

---

## SLIDE 12: Conclusion & Q&A
- Delivered a complete, submission-ready academic ML product trained strictly on authentic dataset.
- All evaluation results derived from actual model training.
- Thank you! Ready for Viva Defense Questions.
