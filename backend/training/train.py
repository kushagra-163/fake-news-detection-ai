import os
import json
import joblib
import numpy as np
import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.naive_bayes import MultinomialNB
from sklearn.svm import LinearSVC
from sklearn.calibration import CalibratedClassifierCV
from sklearn.metrics import accuracy_score, precision_recall_fscore_support, confusion_matrix

from data_loader import load_or_download_dataset
from preprocessing import preprocess_dataframe, clean_text

MODEL_DIR = os.path.join(os.path.dirname(__file__), "..", "models")

def train_and_evaluate():
    os.makedirs(MODEL_DIR, exist_ok=True)
    
    print("--- STEP 1: LOADING DATASET ---")
    raw_df = load_or_download_dataset()
    raw_rows = len(raw_df)
    
    print("\n--- STEP 2: PREPROCESSING DATASET ---")
    df = preprocess_dataframe(raw_df)
    clean_rows = len(df)
    duplicates_removed = raw_rows - clean_rows
    
    class_counts = df['label'].value_counts().to_dict()
    print(f"Raw rows: {raw_rows}, Cleaned rows: {clean_rows}, Duplicates/Invalid removed: {duplicates_removed}")
    print(f"Class distribution: {class_counts}")
    
    # Map labels: FAKE = 0, REAL = 1
    label_mapping = {"FAKE": 0, "REAL": 1}
    inv_label_mapping = {0: "FAKE", 1: "REAL"}
    y = df['label'].map(label_mapping).values
    X_text = df['cleaned_text'].values
    
    print("\n--- STEP 3: TRAIN/TEST SPLIT (80/20 Stratified) ---")
    X_train_text, X_test_text, y_train, y_test = train_test_split(
        X_text, y, test_size=0.20, random_state=42, stratify=y
    )
    print(f"Train samples: {len(X_train_text)}, Test samples: {len(X_test_text)}")
    
    print("\n--- STEP 4: FEATURE ENGINEERING (TF-IDF Vectorization) ---")
    vectorizer = TfidfVectorizer(
        ngram_range=(1, 2),
        max_features=5000,
        min_df=2,
        max_df=0.95
    )
    
    # Fit ONLY on training data to prevent data leakage
    X_train_tfidf = vectorizer.fit_transform(X_train_text)
    X_test_tfidf = vectorizer.transform(X_test_text)
    
    vocabulary_size = len(vectorizer.vocabulary_)
    print(f"TF-IDF Vocabulary size: {vocabulary_size}")
    
    print("\n--- STEP 5: MODEL TRAINING AND EVALUATION ---")
    models = {
        "Logistic Regression": LogisticRegression(C=1.0, max_iter=1000, random_state=42),
        "Multinomial Naive Bayes": MultinomialNB(alpha=1.0),
        "Linear SVM": CalibratedClassifierCV(LinearSVC(C=1.0, random_state=42), cv=5)
    }
    
    results = {}
    best_model_name = None
    best_f1 = -1.0
    best_model_obj = None
    
    for name, model in models.items():
        print(f"\nTraining {name}...")
        model.fit(X_train_tfidf, y_train)
        
        y_pred = model.predict(X_test_tfidf)
        
        acc = float(accuracy_score(y_test, y_pred))
        precision, recall, f1, _ = precision_recall_fscore_support(y_test, y_pred, average='binary', pos_label=1)
        cm = confusion_matrix(y_test, y_pred).tolist() # [[TN, FP], [FN, TP]]
        
        results[name] = {
            "accuracy": round(acc, 4),
            "precision": round(float(precision), 4),
            "recall": round(float(recall), 4),
            "f1_score": round(float(f1), 4),
            "confusion_matrix": cm,
            "confusion_matrix_labels": {
                "true_negative_FAKE": cm[0][0],
                "false_positive_REAL": cm[0][1],
                "false_negative_FAKE": cm[1][0],
                "true_positive_REAL": cm[1][1]
            }
        }
        
        print(f"-> {name} | Accuracy: {acc:.4f} | Precision: {precision:.4f} | Recall: {recall:.4f} | F1: {f1:.4f}")
        
        if f1 > best_f1:
            best_f1 = f1
            best_model_name = name
            best_model_obj = model

    print(f"\n==========================================")
    print(f"WINNING MODEL: {best_model_name} (F1 Score: {best_f1:.4f})")
    print(f"==========================================")
    
    # Extract top TF-IDF feature importance from Logistic Regression model
    log_reg = models["Logistic Regression"]
    coefs = log_reg.coef_[0]
    feature_names = np.array(vectorizer.get_feature_names_out())
    
    top_fake_idx = np.argsort(coefs)[:15]
    top_real_idx = np.argsort(coefs)[-15:][::-1]
    
    top_fake_features = [{"word": str(feature_names[i]), "weight": round(float(coefs[i]), 4)} for i in top_fake_idx]
    top_real_features = [{"word": str(feature_names[i]), "weight": round(float(coefs[i]), 4)} for i in top_real_idx]

    metrics_payload = {
        "dataset_metadata": {
            "raw_total_rows": raw_rows,
            "cleaned_total_rows": clean_rows,
            "duplicates_removed": duplicates_removed,
            "train_samples": len(X_train_text),
            "test_samples": len(X_test_text),
            "class_distribution": class_counts,
            "num_classes": len(class_counts),
            "feature_count": vocabulary_size,
            "tfidf_config": {
                "ngram_range": [1, 2],
                "max_features": 5000,
                "min_df": 2,
                "max_df": 0.95
            }
        },
        "models_evaluation": results,
        "selected_model": {
            "name": best_model_name,
            "selection_criterion": "Highest F1-Score on test evaluation set",
            "metrics": results[best_model_name]
        },
        "feature_importance": {
            "top_fake_predictive_words": top_fake_features,
            "top_real_predictive_words": top_real_features
        }
    }
    
    # Save artifacts
    joblib.dump(best_model_obj, os.path.join(MODEL_DIR, "best_model.joblib"))
    joblib.dump(vectorizer, os.path.join(MODEL_DIR, "tfidf_vectorizer.joblib"))
    
    metrics_json_path = os.path.join(MODEL_DIR, "metrics.json")
    with open(metrics_json_path, "w") as f:
        json.dump(metrics_payload, f, indent=2)
        
    print(f"\nModel artifacts successfully saved to {MODEL_DIR}:")
    print(" - best_model.joblib")
    print(" - tfidf_vectorizer.joblib")
    print(" - metrics.json")

    return metrics_payload

if __name__ == "__main__":
    train_and_evaluate()
