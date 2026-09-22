import React from 'react';
import { Info, Target, Layers, Cpu, AlertTriangle, Rocket, ShieldCheck } from 'lucide-react';
import { VisualPipeline } from '../components/VisualPipeline';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-10 py-4 px-2 sm:px-4">
      
      {/* Page Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/30 text-[#00E5FF] text-xs font-mono">
          <Info className="w-3.5 h-3.5" />
          <span>PROJECT ARCHITECTURE & SPECIFICATIONS</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-[#F1F5F9] uppercase font-sans">
          ABOUT <span className="text-[#00E5FF]">FAKE NEWS DETECTION AI</span>
        </h1>
        <p className="text-sm text-[#8B9AAF] max-w-xl mx-auto">
          An academic NLP and Machine Learning text classification system engineered for research evaluation and viva defense.
        </p>
      </div>

      {/* Grid Details */}
      <div className="space-y-6">
        
        {/* System Architecture Visual Pipeline */}
        <div className="glass-panel p-6 space-y-4">
          <h3 className="text-xs font-mono font-bold text-[#00E5FF] uppercase tracking-widest flex items-center space-x-2">
            <Layers className="w-4 h-4 text-[#00E5FF]" />
            <span>SYSTEM PIPELINE ARCHITECTURE</span>
          </h3>
          <VisualPipeline activeStep={4} />
        </div>

        {/* Problem Statement & Project Objectives */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="glass-panel p-6 space-y-3">
            <h3 className="text-sm font-bold text-[#F1F5F9] flex items-center space-x-2 font-mono">
              <Target className="w-4 h-4 text-[#00E5FF]" />
              <span>Problem Statement</span>
            </h3>
            <p className="text-xs text-[#8B9AAF] leading-relaxed">
              The rapid propagation of deceptive textual content on social media and digital platforms creates significant challenges for media consumers. Automated text classification models assist in identifying structural and linguistic indicators characteristic of unverified news articles.
            </p>
          </div>

          <div className="glass-panel p-6 space-y-3">
            <h3 className="text-sm font-bold text-[#F1F5F9] flex items-center space-x-2 font-mono">
              <ShieldCheck className="w-4 h-4 text-[#20E6A4]" />
              <span>Project Objectives</span>
            </h3>
            <ul className="text-xs text-[#8B9AAF] leading-relaxed space-y-1.5 list-disc list-inside">
              <li>Engineered a clean NLP text cleaning & TF-IDF vectorization pipeline.</li>
              <li>Trained and evaluated Logistic Regression, Naive Bayes, and Linear SVM models.</li>
              <li>Built an asynchronous FastAPI REST API for real-time model inference.</li>
              <li>Designed a modern React dashboard presenting empirical evaluation metrics.</li>
            </ul>
          </div>

        </div>

        {/* Technology Stack */}
        <div className="glass-panel p-6 space-y-4">
          <h3 className="text-sm font-bold text-[#F1F5F9] flex items-center space-x-2 font-mono">
            <Cpu className="w-4 h-4 text-[#3B82F6]" />
            <span>Technology Stack</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            <div className="p-4 rounded-xl bg-[#090D16] border border-[#1D2A3A] space-y-2">
              <span className="font-bold text-[#00E5FF] block">BACKEND & MACHINE LEARNING</span>
              <p className="text-[#8B9AAF]">
                Python 3.14, FastAPI, Uvicorn, scikit-learn, pandas, numpy, joblib. Trained on 80/20 stratified split with 5,000 TF-IDF n-gram features and Multinomial Naive Bayes classification.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#090D16] border border-[#1D2A3A] space-y-2">
              <span className="font-bold text-[#3B82F6] block">FRONTEND & USER INTERFACE</span>
              <p className="text-[#8B9AAF]">
                React 18, Vite, TypeScript, Tailwind CSS, Lucide React icons, Recharts visualization library.
              </p>
            </div>
          </div>
        </div>

        {/* Academic Limitations & Future Scope */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="glass-panel p-6 border-[#FF3158]/30 space-y-3">
            <h3 className="text-sm font-bold text-[#FF3158] flex items-center space-x-2 font-mono">
              <AlertTriangle className="w-4 h-4 text-[#FF3158]" />
              <span>Academic Limitations</span>
            </h3>
            <p className="text-xs text-[#8B9AAF] leading-relaxed">
              The system operates strictly on statistical text pattern matching. It does not perform active internet web scraping, external cross-referencing, or objective real-world truth verification.
            </p>
          </div>

          <div className="glass-panel p-6 border-[#00E5FF]/30 space-y-3">
            <h3 className="text-sm font-bold text-[#00E5FF] flex items-center space-x-2 font-mono">
              <Rocket className="w-4 h-4 text-[#00E5FF]" />
              <span>Future Scope</span>
            </h3>
            <ul className="text-xs text-[#8B9AAF] leading-relaxed space-y-1 list-disc list-inside">
              <li>Transformer models (BERT, RoBERTa, DistilBERT).</li>
              <li>Multilingual news classification.</li>
              <li>Source credibility & domain authority scoring.</li>
              <li>Browser extension for instant news analysis.</li>
            </ul>
          </div>

        </div>

      </div>

    </div>
  );
};
