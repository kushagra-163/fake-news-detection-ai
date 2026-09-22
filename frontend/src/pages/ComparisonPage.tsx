import React, { useEffect, useState } from 'react';
import { Award, BarChart2, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { fetchMetrics } from '../services/api';
import { MetricsPayload } from '../types/api';

export const ComparisonPage: React.FC = () => {
  const [metrics, setMetrics] = useState<MetricsPayload | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMetrics()
      .then((data) => {
        setMetrics(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching comparative metrics:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center space-y-3">
          <div className="w-8 h-8 border-4 border-[#00E5FF] border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-mono text-[#8B9AAF]">Loading comparative metrics...</span>
        </div>
      </div>
    );
  }

  if (!metrics) {
    return (
      <div className="text-center py-16 text-[#FF3158] font-mono">
        Failed to load comparative model metrics. Please check backend connection.
      </div>
    );
  }

  const { models_evaluation, selected_model } = metrics;
  const modelNames = Object.keys(models_evaluation);

  // Chart data formatting
  const chartData = modelNames.map((name) => {
    const item = models_evaluation[name];
    return {
      name,
      Accuracy: +(item.accuracy * 100).toFixed(1),
      Precision: +(item.precision * 100).toFixed(1),
      Recall: +(item.recall * 100).toFixed(1),
      'F1-Score': +(item.f1_score * 100).toFixed(1),
    };
  });

  return (
    <div className="max-w-7xl mx-auto space-y-10 py-4 px-2 sm:px-4">
      
      {/* Page Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/30 text-[#00E5FF] text-xs font-mono">
          <BarChart2 className="w-3.5 h-3.5" />
          <span>SUPERVISED MODEL BENCHMARKING</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-[#F1F5F9] uppercase font-sans">
          MODEL <span className="text-[#00E5FF]">COMPARISON</span>
        </h1>
        <p className="text-sm text-[#8B9AAF] max-w-2xl mx-auto">
          Comparative evaluation results calculated on an independent 20% test dataset ({metrics.dataset_metadata?.test_samples || 782} samples) using Stratified Cross-Validation metrics.
        </p>
      </div>

      {/* Comparison Table */}
      <div className="glass-panel rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-[#1D2A3A] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-[#F1F5F9] flex items-center space-x-2 font-mono">
              <ShieldCheck className="w-5 h-5 text-[#00E5FF]" />
              <span>PERFORMANCE BENCHMARK TABLE</span>
            </h3>
            <p className="text-xs text-[#8B9AAF] mt-0.5">
              Populated directly from scikit-learn model evaluation results. Selected based on overall test-set performance.
            </p>
          </div>

          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-[#00E5FF]/10 border border-[#00E5FF]/30 text-[#00E5FF] text-xs font-mono">
            <Award className="w-4 h-4 text-[#00E5FF]" />
            <span>SELECTED MODEL: {selected_model.name}</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[#090D16] text-[#8B9AAF] uppercase tracking-wider text-[11px] border-b border-[#1D2A3A]">
              <tr>
                <th className="py-4 px-6 font-bold">Model Classifier</th>
                <th className="py-4 px-4 font-bold text-center">Accuracy</th>
                <th className="py-4 px-4 font-bold text-center">Precision</th>
                <th className="py-4 px-4 font-bold text-center">Recall</th>
                <th className="py-4 px-4 font-bold text-center">F1-Score</th>
                <th className="py-4 px-6 font-bold text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1D2A3A]/60 text-[#F1F5F9]">
              {modelNames.map((name) => {
                const item = models_evaluation[name];
                const isSelected = name === selected_model.name;

                return (
                  <tr
                    key={name}
                    className={`transition-colors ${
                      isSelected ? 'bg-[#00E5FF]/5 font-bold text-[#F1F5F9]' : 'hover:bg-[#090D16]/50'
                    }`}
                  >
                    <td className="py-4 px-6 flex items-center space-x-2">
                      <span className="text-sm font-semibold">{name}</span>
                      {isSelected && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] bg-[#00E5FF]/20 text-[#00E5FF] border border-[#00E5FF]/40 font-mono">
                          SELECTED
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-center text-[#00E5FF] font-bold">
                      {(item.accuracy * 100).toFixed(1)}%
                    </td>
                    <td className="py-4 px-4 text-center text-[#3B82F6]">
                      {(item.precision * 100).toFixed(1)}%
                    </td>
                    <td className="py-4 px-4 text-center text-[#20E6A4]">
                      {(item.recall * 100).toFixed(1)}%
                    </td>
                    <td className="py-4 px-4 text-center text-[#FFB020] font-bold">
                      {(item.f1_score * 100).toFixed(1)}%
                    </td>
                    <td className="py-4 px-6 text-center">
                      {isSelected ? (
                        <span className="inline-flex items-center space-x-1 text-[#20E6A4] font-bold">
                          <CheckCircle2 className="w-4 h-4 text-[#20E6A4]" />
                          <span>SELECTED</span>
                        </span>
                      ) : (
                        <span className="text-[#8B9AAF]">Evaluated</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Model Comparison Bar Chart (BUG FIXED TOOLTIP) */}
      <div className="glass-panel p-6 space-y-4">
        <h3 className="text-sm font-bold text-[#F1F5F9] flex items-center space-x-2 font-mono">
          <BarChart2 className="w-4 h-4 text-[#00E5FF]" />
          <span>COMPARATIVE METRICS CHART</span>
        </h3>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1D2A3A" />
              <XAxis dataKey="name" stroke="#8B9AAF" fontSize={12} />
              <YAxis domain={[0, 100]} stroke="#8B9AAF" fontSize={11} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#0D1320', 
                  borderColor: '#1D2A3A', 
                  borderRadius: '8px', 
                  color: '#F1F5F9', 
                  fontSize: '11px', 
                  boxShadow: '0 10px 25px -5px rgba(0,0,0,0.8)' 
                }} 
                itemStyle={{ color: '#F1F5F9' }}
                cursor={{ fill: 'rgba(0, 229, 255, 0.05)' }}
                wrapperStyle={{ outline: 'none' }}
              />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px', color: '#8B9AAF' }} />
              <Bar dataKey="Accuracy" fill="#00E5FF" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Precision" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Recall" fill="#20E6A4" radius={[4, 4, 0, 0]} />
              <Bar dataKey="F1-Score" fill="#FFB020" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Confusion Matrix Cards for Each Model */}
      <div className="space-y-4">
        <h3 className="text-xs font-mono font-bold text-[#00E5FF] uppercase tracking-wider flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-[#00E5FF]" />
          <span>CONFUSION MATRICES ({metrics.dataset_metadata?.test_samples || 782} TEST SAMPLES)</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {modelNames.map((name) => {
            const item = models_evaluation[name];
            const labels = item.confusion_matrix_labels;
            const isSelected = name === selected_model.name;

            return (
              <div
                key={name}
                className={`glass-panel p-5 space-y-3 ${
                  isSelected ? 'border-[#00E5FF]/40 bg-[#00E5FF]/5' : ''
                }`}
              >
                <div className="flex justify-between items-center border-b border-[#1D2A3A] pb-2">
                  <h4 className="text-xs font-bold text-[#F1F5F9] font-mono">{name}</h4>
                  {isSelected && (
                    <span className="text-[10px] font-mono text-[#00E5FF] bg-[#00E5FF]/10 px-2 py-0.5 rounded border border-[#00E5FF]/30 font-bold">
                      SELECTED
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2 text-center text-xs font-mono">
                  <div className="bg-[#090D16] p-3 rounded-lg border border-[#20E6A4]/30">
                    <span className="text-[10px] text-[#8B9AAF] block">True Negative (FAKE)</span>
                    <span className="text-lg font-bold text-[#20E6A4]">{labels.true_negative_FAKE}</span>
                  </div>
                  <div className="bg-[#090D16] p-3 rounded-lg border border-[#FF3158]/30">
                    <span className="text-[10px] text-[#8B9AAF] block">False Positive (REAL)</span>
                    <span className="text-lg font-bold text-[#FF3158]">{labels.false_positive_REAL}</span>
                  </div>
                  <div className="bg-[#090D16] p-3 rounded-lg border border-[#FF3158]/30">
                    <span className="text-[10px] text-[#8B9AAF] block">False Negative (FAKE)</span>
                    <span className="text-lg font-bold text-[#FF3158]">{labels.false_negative_FAKE}</span>
                  </div>
                  <div className="bg-[#090D16] p-3 rounded-lg border border-[#20E6A4]/30">
                    <span className="text-[10px] text-[#8B9AAF] block">True Positive (REAL)</span>
                    <span className="text-lg font-bold text-[#20E6A4]">{labels.true_positive_REAL}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
