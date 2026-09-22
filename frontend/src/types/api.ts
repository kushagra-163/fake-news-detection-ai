export interface PredictionRequest {
  text: string;
}

export interface Probabilities {
  FAKE: number;
  REAL: number;
}

export interface PredictionResponse {
  prediction: 'FAKE' | 'REAL' | 'UNKNOWN';
  confidence: number;
  probabilities: Probabilities;
  model_used: string;
  cleaned_text: string;
  disclaimer: string;
}

export interface TfidfConfig {
  ngram_range: [number, number];
  max_features: number;
  min_df: number;
  max_df: number;
}

export interface DatasetMetadata {
  raw_total_rows: number;
  cleaned_total_rows: number;
  duplicates_removed: number;
  train_samples: number;
  test_samples: number;
  class_distribution: Record<string, number>;
  num_classes: number;
  feature_count: number;
  tfidf_config: TfidfConfig;
}

export interface ConfusionMatrixLabels {
  true_negative_FAKE: number;
  false_positive_REAL: number;
  false_negative_FAKE: number;
  true_positive_REAL: number;
}

export interface ModelMetricsItem {
  accuracy: number;
  precision: number;
  recall: number;
  f1_score: number;
  confusion_matrix: number[][];
  confusion_matrix_labels: ConfusionMatrixLabels;
}

export interface SelectedModel {
  name: string;
  selection_criterion: string;
  metrics: ModelMetricsItem;
}

export interface FeatureWord {
  word: string;
  weight: number;
}

export interface FeatureImportance {
  top_fake_predictive_words: FeatureWord[];
  top_real_predictive_words: FeatureWord[];
}

export interface MetricsPayload {
  dataset_metadata: DatasetMetadata;
  models_evaluation: Record<string, ModelMetricsItem>;
  selected_model: SelectedModel;
  feature_importance: FeatureImportance;
}

export interface ModelInfoResponse {
  status: string;
  model_name: string;
  model_type: string;
  vectorizer_type: string;
  vocabulary_size: number;
  dataset_metadata: DatasetMetadata;
  selected_model_metrics: SelectedModel;
}
