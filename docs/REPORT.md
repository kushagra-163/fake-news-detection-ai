# FAKE NEWS DETECTION AI — ACADEMIC INTERNSHIP PROJECT REPORT

**Project Name:** FAKE NEWS DETECTION AI  
**Domain:** Natural Language Processing (NLP) & Machine Learning  
**Project Type:** Academic Internship Submission  
**Architecture:** Monorepo (FastAPI Backend + React/Vite/TypeScript Frontend)

---

## 1. ABSTRACT
Misinformative text propagation across digital media poses serious threats to public discourse. This academic internship project establishes an end-to-end Machine Learning classification framework capable of predicting whether an input news text belongs to the `FAKE` or `REAL` class based on statistical patterns learned from a genuine, labeled academic benchmark dataset. Utilizing TF-IDF feature vectorization and evaluating three supervised algorithms (Logistic Regression, Multinomial Naive Bayes, and Linear Support Vector Machines), the system achieves robust text classification performance. The model is deployed via a FastAPI backend service paired with a modern React dashboard.

---

## 2. PROBLEM STATEMENT & OBJECTIVES

### 2.1 Problem Statement
The volume of online text content makes manual fact-checking by human editors impossible to scale. Differentiating sensational or fabricated stories from verified institutional press releases requires automated systems capable of recognizing subtle linguistic and n-gram vocabulary signatures.

### 2.2 Objectives
1. **Pipeline Engineering:** Build a reproducible NLP text cleaning and normalization pipeline.
2. **Feature Extraction:** Transform clean text into numerical TF-IDF feature matrices (unigrams & bigrams).
3. **Model Benchmarking:** Train and evaluate Logistic Regression, Multinomial Naive Bayes, and Linear SVM models under identical train/test split conditions.
4. **API Deployment:** Expose asynchronous REST endpoints (`/api/health`, `/api/predict`, `/api/model-info`, `/api/metrics`).
5. **Interactive UI:** Deliver a modern React dashboard visualizing predictions, confidence scores, n-gram feature importance, and model evaluation metrics.

---

## 3. DATASET & NLP PREPROCESSING

### 3.1 Genuine Dataset Specification
- **Dataset Source:** **FakeNewsNet Benchmark Dataset** (PolitiFact + GossipCop callsets)
- **Repository Reference:** [KaiDMML/FakeNewsNet](https://github.com/KaiDMML/FakeNewsNet)
- **Citation:** Shu, K., Mahudeswaran, D., Wang, S., Lee, D., & Liu, H. (2020). *FakeNewsNet: A Data Repository with News Content, Social Context, and Spatiotemporal Information for Studying Fake News on Social Media*. Big Data, 8(3), 171-188.
- **Total Raw Records:** 4,056 news samples (2,124 REAL, 1,932 FAKE)
- **Cleaned Records:** 3,909 unique news samples (147 duplicate/invalid rows removed)
- **Class Balance:** 2,033 REAL (52.0%) / 1,876 FAKE (48.0%)
- **Train / Test Split:** 80% Training (3,127 samples) / 20% Testing (782 samples) stratified split with `random_state=42`.

### 3.2 NLP Text Cleaning Pipeline
1. **Lowercase Conversion:** Normalizes case variations across vocabulary.
2. **HTML & URL Stripping:** Removes `<...>` tags and `http://` / `https://` web link artifacts.
3. **Noise Removal:** Filters non-alphabetical characters while preserving letter spacing.
4. **Whitespace Normalization:** Collapses whitespace sequences into single space separators.
5. **Null & Duplicate Handling:** Eliminates empty text strings and identical duplicate entries.

---

## 4. FEATURE ENGINEERING (TF-IDF)

Term Frequency-Inverse Document Frequency (TF-IDF) converts text documents into numerical feature vectors by weighting term frequency against inverse document frequency:

$$\text{TF-IDF}(t, d, D) = \text{TF}(t, d) \times \log\left(\frac{|D|}{|\{d \in D : t \in d\}|}\right)$$

### Parameters
- `ngram_range`: `(1, 2)` (Includes single words and two-word phrases)
- `max_features`: `5000` (Extracts top 5,000 vocabulary tokens)
- `min_df`: `2` (Ignores terms appearing in fewer than 2 documents)
- `max_df`: `0.95` (Ignores terms appearing in over 95% of documents)
- **Data Leakage Prevention:** Vectorizer is fitted strictly on `X_train` and applied via `.transform()` to `X_test`.

---

## 5. MACHINE LEARNING ALGORITHMS & TRAINING

Three supervised classification algorithms were trained and evaluated:

1. **Logistic Regression:**
   $$P(Y=1|X) = \frac{1}{1 + e^{-(\beta_0 + \sum \beta_i X_i)}}$$

2. **Multinomial Naive Bayes:**
   $$P(y|x_1, \dots, x_n) \propto P(y) \prod_{i=1}^n P(x_i|y)$$

3. **Linear Support Vector Machine (LinearSVC):**
   Finds the maximum margin hyperplane separating classes in feature space.

---

## 6. EXPERIMENTAL RESULTS

Evaluating all models on the **782-sample stratified test set** yielded the following empirical performance:

| Classifier Model | Accuracy | Precision | Recall | F1-Score | Winning Status |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Multinomial Naive Bayes** | **76.60%** | **77.05%** | **78.38%** | **77.71%** | **SELECTED WINNER** |
| **Logistic Regression** | 75.32% | 73.36% | 82.56% | 77.69% | Evaluated |
| **Linear SVM** | 75.19% | 75.06% | 78.38% | 76.68% | Evaluated |

### Selected Model
**Multinomial Naive Bayes** was selected as the final deployed model based on achieving the highest test **F1-Score (77.71%)** and **Accuracy (76.60%)**.

---

## 7. CONFUSION MATRIX (Multinomial Naive Bayes)

Evaluated on 782 test samples:

$$\text{Confusion Matrix} = \begin{bmatrix} 280 & 95 \\ 88 & 319 \end{bmatrix}$$

- **True Negative (TN - FAKE correctly predicted as FAKE)**: 280
- **False Positive (FP - FAKE incorrectly predicted as REAL)**: 95
- **False Negative (FN - REAL incorrectly predicted as FAKE)**: 88
- **True Positive (TP - REAL correctly predicted as REAL)**: 319

---

## 8. ACADEMIC DISCLAIMER & LIMITATIONS

> [!IMPORTANT]
> **Academic Disclaimer:** This project is a statistical machine-learning text classification system. It predicts whether text matches patterns learned from training data. It does NOT independently verify facts on the internet, does NOT access live news feeds, and must NOT be used as an objective arbiter of factual truth.

---

## 9. REFERENCES
1. Shu, K., Mahudeswaran, D., Wang, S., Lee, D., & Liu, H. (2020). *FakeNewsNet: A Data Repository with News Content, Social Context, and Spatiotemporal Information for Studying Fake News on Social Media*. Big Data, 8(3), 171-188. Repository: `https://github.com/KaiDMML/FakeNewsNet`.
2. Pedregosa, F. et al. (2011). *Scikit-learn: Machine Learning in Python*. JMLR.
3. Ramirez, S. et al. (2020). *FastAPI Framework Documentation*.
