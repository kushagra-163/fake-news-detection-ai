import axios from 'axios';
import { PredictionResponse, MetricsPayload, ModelInfoResponse } from '../types/api';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export const checkHealth = async () => {
  const response = await apiClient.get('/health');
  return response.data;
};

export const analyzeNewsText = async (text: string): Promise<PredictionResponse> => {
  const response = await apiClient.post<PredictionResponse>('/predict', { text });
  return response.data;
};

export const fetchMetrics = async (): Promise<MetricsPayload> => {
  const response = await apiClient.get<MetricsPayload>('/metrics');
  return response.data;
};

export const fetchModelInfo = async (): Promise<ModelInfoResponse> => {
  const response = await apiClient.get<ModelInfoResponse>('/model-info');
  return response.data;
};
