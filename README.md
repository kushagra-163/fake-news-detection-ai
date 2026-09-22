# FAKE NEWS DETECTION AI

### Machine Learning-Based News Classification Using Natural Language Processing

A full-stack academic machine learning project that classifies news text as **FAKE**, **REAL**, or **UNCERTAIN** using NLP, TF-IDF feature extraction, and Multinomial Naive Bayes.

The project includes a **FastAPI backend**, **React + TypeScript frontend**, trained ML artifacts, evaluation scripts, Jupyter notebook, documentation, and academic presentation materials.

> **Important:** This system performs statistical text classification based on patterns learned from the training data. It does not perform live internet fact verification and should not be treated as an authoritative source of truth.

---

## 📌 Project Overview

Fake news and misleading information can spread rapidly through digital platforms. This project explores how supervised machine learning and natural language processing can be used to classify news text based on linguistic patterns present in a labeled dataset.

The system processes a news headline or text, transforms it into numerical TF-IDF features, and uses a trained Multinomial Naive Bayes classifier to produce a class prediction and confidence-based output.

### Prediction States

- **FAKE** — The learned patterns show stronger association with the FAKE class.
- **REAL** — The learned patterns show stronger association with the REAL class.
- **UNCERTAIN** — The model does not show sufficiently strong class association.

---

## ✨ Features

- News text classification using machine learning
- NLP-based text processing
- TF-IDF feature extraction
- Multinomial Naive Bayes classification
- Probability-based confidence output
- FAKE / REAL / UNCERTAIN prediction states
- Model performance comparison
- Confusion matrix evaluation
- FastAPI REST API
- Interactive React + TypeScript interface
- Model insights and comparison dashboard
- Jupyter notebook for academic experimentation
- Serialized model and TF-IDF artifacts
- Academic report and presentation documentation

---

## 🏗️ System Architecture

```text
                  NEWS TEXT INPUT
                        │
                        ▼
              ┌─────────────────────┐
              │  Text Preprocessing │
              └──────────┬──────────┘
                         │
                         ▼
              ┌─────────────────────┐
              │   TF-IDF Features   │
              │    5,000 Features   │
              └──────────┬──────────┘
                         │
                         ▼
              ┌─────────────────────┐
              │ Multinomial Naive   │
              │       Bayes         │
              └──────────┬──────────┘
                         │
                         ▼
              ┌─────────────────────┐
              │ Probability-Based   │
              │      Output         │
              └──────────┬──────────┘
                         │
             ┌───────────┼───────────┐
             ▼           ▼           ▼
           FAKE        REAL      UNCERTAIN






---

## Project Screenshots

### News Analyzer

![News Analyzer](docs/screenshots/analyzer.png)

### Model Insights

![Model Insights](docs/screenshots/model-insights.png)

### Model Comparison

![Model Comparison](docs/screenshots/model-comparison.png)

### About & System Architecture

![About & System Architecture](docs/screenshots/about.png)

---