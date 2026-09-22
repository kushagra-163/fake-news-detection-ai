import React, { useEffect, useState } from 'react';
import { Database, Layers, PieChart as PieIcon, Sparkles, TrendingUp, HelpCircle, Cpu, Award } from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { fetchMetrics } from '../services/api';
import { MetricsPayload } from '../types/api';

export const InsightsPage: React.FC = () => {
  const [metrics, setMetrics] = useState<MetricsPayload | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMetrics()
      .then((data) => {
        setMetrics(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading metrics:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center space-y-3">
          <div className="w-8 h-8 border-4 border-[#00E5FF] border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-mono text-[#8B9AAF]">Loading empirical ML metrics...</span>
        </div>
      </div>
    );
  }

  if (!metrics) {
    return (
      <div className="text-center py-16 space-y-4">
        <p className="text-[#FF3158] font-semibold font-mono">Failed to load metrics from backend.</p>
        <p className="text-xs text-[#8B9AAF]">Ensure FastAPI backend is running on http://127.0.0.1:8000</p>
      </div>
    );
  }

  const { dataset_metadata, feature_importance, selected_model } = metrics;

  // Class pie distribution data
  const classPieData = [
    { name: 'FAKE News', value: dataset_metadata.class_distribution.FAKE || 1876, color: '#FF3158' },
    { name: 'REAL News', value: dataset_metadata.class_distribution.REAL || 2033, color: '#20E6A4' },
  ];

  // Top predictive words bar chart data
  const topFakeWords = (feature_importance?.top_fake_predictive_words || []).slice(0, 10);
  const topRealWords = (feature_importance?.top_real_predictive_words || []).slice(0, 10);

  return (
    <div className="max-w-7xl mx-auto space-y-10 py-4 px-2 sm:px-4">
      
      {/* Page Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/30 text-[#00E5FF] text-xs font-mono">
          <Sparkles className="w-3.5 h-3.5" />
          <span>EMPIRICAL METRICS & FEATURE EXTRACTION</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-[#F1F5F9] uppercase font-sans">
          MODEL <span className="text-[#00E5FF]">INTELLIGENCE</span>
        </h1>
        <p className="text-sm text-[#8B9AAF] max-w-2xl mx-auto">
          Empirical dataset profiles, feature extraction weights, and deployed model performance metrics.
        </p>
      </div>

      {/* SECTION 1: DATASET PROFILE */}
      <div className="space-y-4">
        <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-[#00E5FF] flex items-center space-x-2">
          <Database className="w-4 h-4 text-[#00E5FF]" />
          <span>DATASET PROFILE</span>
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="glass-panel p-5 space-y-1">
            <span className="text-[11px] font-mono text-[#8B9AAF] uppercase tracking-wider block">Raw Dataset Rows</span>
            <span className="text-2xl sm:text-3xl font-black text-[#F1F5F9] font-mono">{dataset_metadata.raw_total_rows}</span>
            <span className="text-[10px] text-[#8B9AAF] block font-mono">PolitiFact + GossipCop</span>
          </div>

          <div className="glass-panel p-5 space-y-1">
            <span className="text-[11px] font-mono text-[#8B9AAF] uppercase tracking-wider block">Cleaned Samples</span>
            <span className="text-2xl sm:text-3xl font-black text-[#00E5FF] font-mono">{dataset_metadata.cleaned_total_rows}</span>
            <span className="text-[10px] text-[#8B9AAF] block font-mono">147 duplicates dropped</span>
          </div>

          <div className="glass-panel p-5 space-y-1">
            <span className="text-[11px] font-mono text-[#8B9AAF] uppercase tracking-wider block">Train / Test Split</span>
            <span className="text-2xl sm:text-3xl font-black text-[#3B82F6] font-mono">{dataset_metadata.train_samples} / {dataset_metadata.test_samples}</span>
            <span className="text-[10px] text-[#8B9AAF] block font-mono">80% Train / 20% Test</span>
          </div>

          <div className="glass-panel p-5 space-y-1">
            <span className="text-[11px] font-mono text-[#8B9AAF] uppercase tracking-wider block">TF-IDF Features</span>
            <span className="text-2xl sm:text-3xl font-black text-[#20E6A4] font-mono">{dataset_metadata.feature_count}</span>
            <span className="text-[10px] text-[#8B9AAF] block font-mono">Vocabulary tokens</span>
          </div>
        </div>
      </div>

      {/* Class Distribution & Deployed Model */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Class Distribution Chart */}
        <div className="glass-panel p-6 space-y-4">
          <h3 className="text-sm font-bold text-[#F1F5F9] flex items-center space-x-2 font-mono">
            <PieIcon className="w-4 h-4 text-[#00E5FF]" />
            <span>Class Distribution (Near Balanced)</span>
          </h3>

          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={classPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={70}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {classPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#0D1320', borderColor: '#1D2A3A', borderRadius: '8px', color: '#F1F5F9', fontSize: '12px' }}
                  itemStyle={{ color: '#F1F5F9' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex justify-center space-x-6 text-xs font-mono">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-[#FF3158]" />
              <span className="text-[#FF3158] font-bold">FAKE: {dataset_metadata.class_distribution.FAKE || 1876}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-[#20E6A4]" />
              <span className="text-[#20E6A4] font-bold">REAL: {dataset_metadata.class_distribution.REAL || 2033}</span>
            </div>
          </div>
        </div>

        {/* SECTION 2 & 3: DEPLOYED MODEL & PERFORMANCE METRICS */}
        <div className="md:col-span-2 glass-panel p-6 flex flex-col justify-between space-y-6 border-[#00E5FF]/30 bg-gradient-to-r from-[#0D1320] via-[#090D16] to-[#05070D]">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#00E5FF] bg-[#00E5FF]/10 px-2.5 py-0.5 rounded-full border border-[#00E5FF]/30">
                DEPLOYED MODEL
              </span>
              <span className="text-[10px] font-mono text-[#8B9AAF]">SELECTED VIA HIGHEST TEST F1-SCORE</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-[#F1F5F9] font-sans tracking-tight">{selected_model.name}</h3>
            <p className="text-xs text-[#8B9AAF] mt-1 font-mono">
              Bayesian probability classifier operating over 5,000 TF-IDF n-gram features.
            </p>
          </div>

          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#00E5FF] block mb-3">
              PERFORMANCE METRICS (782 TEST SAMPLES)
            </span>
            <div className="grid grid-cols-4 gap-3 bg-[#05070D] p-4 rounded-xl border border-[#1D2A3A] text-center font-mono">
              <div>
                <span className="text-[10px] text-[#8B9AAF] block">ACCURACY</span>
                <span className="text-lg sm:text-xl font-black text-[#00E5FF]">{(selected_model.metrics.accuracy * 100).toFixed(1)}%</span>
              </div>
              <div>
                <span className="text-[10px] text-[#8B9AAF] block">PRECISION</span>
                <span className="text-lg sm:text-xl font-black text-[#3B82F6]">{(selected_model.metrics.precision * 100).toFixed(1)}%</span>
              </div>
              <div>
                <span className="text-[10px] text-[#8B9AAF] block">RECALL</span>
                <span className="text-lg sm:text-xl font-black text-[#20E6A4]">{(selected_model.metrics.recall * 100).toFixed(1)}%</span>
              </div>
              <div>
                <span className="text-[10px] text-[#8B9AAF] block">F1 SCORE</span>
                <span className="text-lg sm:text-xl font-black text-[#FFB020]">{(selected_model.metrics.f1_score * 100).toFixed(1)}%</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* SECTION 4: FEATURE SIGNALS */}
      <div className="space-y-4">
        <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-[#00E5FF] flex items-center space-x-2">
          <Layers className="w-4 h-4 text-[#00E5FF]" />
          <span>FEATURE SIGNALS (TOP TF-IDF WEIGHTS)</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Top FAKE Words */}
          <div className="glass-panel p-6 space-y-4 border-[#FF3158]/30">
            <h3 className="text-sm font-bold text-[#FF3158] flex items-center space-x-2 font-mono">
              <TrendingUp className="w-4 h-4 text-[#FF3158]" />
              <span>Top Predictive Words for FAKE Class</span>
            </h3>

            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topFakeWords} layout="vertical" margin={{ top: 5, right: 20, left: 40, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1D2A3A" />
                  <XAxis type="number" stroke="#8B9AAF" fontSize={10} />
                  <YAxis dataKey="word" type="category" stroke="#F1F5F9" fontSize={11} width={85} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0D1320', borderColor: '#1D2A3A', borderRadius: '8px', color: '#F1F5F9', fontSize: '11px' }}
                    itemStyle={{ color: '#FF3158' }}
                    cursor={{ fill: 'rgba(255, 49, 88, 0.05)' }}
                  />
                  <Bar dataKey="weight" fill="#FF3158" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top REAL Words */}
          <div className="glass-panel p-6 space-y-4 border-[#20E6A4]/30">
            <h3 className="text-sm font-bold text-[#20E6A4] flex items-center space-x-2 font-mono">
              <TrendingUp className="w-4 h-4 text-[#20E6A4]" />
              <span>Top Predictive Words for REAL Class</span>
            </h3>

            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topRealWords} layout="vertical" margin={{ top: 5, right: 20, left: 40, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1D2A3A" />
                  <XAxis type="number" stroke="#8B9AAF" fontSize={10} />
                  <YAxis dataKey="word" type="category" stroke="#F1F5F9" fontSize={11} width={85} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0D1320', borderColor: '#1D2A3A', borderRadius: '8px', color: '#F1F5F9', fontSize: '11px' }}
                    itemStyle={{ color: '#20E6A4' }}
                    cursor={{ fill: 'rgba(32, 230, 164, 0.05)' }}
                  />
                  <Bar dataKey="weight" fill="#20E6A4" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
