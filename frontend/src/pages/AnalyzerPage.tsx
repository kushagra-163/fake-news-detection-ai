import React, { useState } from 'react';
import { Search, RotateCcw, Sparkles, ShieldCheck, AlertTriangle, Cpu, Terminal, ArrowRight, Activity } from 'lucide-react';
import { analyzeNewsText } from '../services/api';
import { PredictionResponse } from '../types/api';
import { VisualPipeline } from '../components/VisualPipeline';

const SAMPLE_PRESETS = [
  {
    label: 'FAKE-LIKE DEMO 1',
    text: 'Scientists Discover A Device That Allows Humans To Breathe Underwater',
    type: 'FAKE'
  },
  {
    label: 'FAKE-LIKE DEMO 2',
    text: 'New Smartphone Technology Can Charge Any Battery In Just Five Seconds',
    type: 'FAKE'
  },
  {
    label: 'REAL-LIKE DEMO 1',
    text: 'Researchers Publish A Study On Improving Solar Panel Efficiency',
    type: 'REAL'
  },
  {
    label: 'REAL-LIKE DEMO 2',
    text: 'University Launches A New Program Focused On Artificial Intelligence Research',
    type: 'REAL'
  }
];

export const AnalyzerPage: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (textToAnalyze?: string) => {
    const text = textToAnalyze || inputText;
    if (!text.trim()) {
      setError('Please paste or type a news article headline or text.');
      return;
    }

    if (text.trim().length < 10) {
      setError('Input text is too short. Please enter at least 10 characters.');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await analyzeNewsText(text);
      setResult(data);
    } catch (err: any) {
      console.error(err);
      setError(
        err.response?.data?.detail || 'Failed to connect to backend server. Make sure FastAPI server is running on http://127.0.0.1:8000'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setInputText('');
    setResult(null);
    setError(null);
  };

  const handlePresetSelect = (text: string) => {
    setInputText(text);
    handleAnalyze(text);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-4 px-2 sm:px-4">
      
      {/* Page Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/30 text-[#00E5FF] text-xs font-mono">
          <Sparkles className="w-3.5 h-3.5" />
          <span>AI TEXT ANALYSIS ENGINE</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-[#F1F5F9] uppercase font-sans">
          AI NEWS <span className="text-[#00E5FF]">INTELLIGENCE</span>
        </h1>
        
        <p className="text-sm text-[#8B9AAF] max-w-xl mx-auto leading-relaxed">
          Analyze linguistic patterns in news text using machine learning.
        </p>

        {/* System Status Row */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] font-mono text-[#8B9AAF] pt-1">
          <span className="flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-[#0D1320] border border-[#1D2A3A]">
            <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse" />
            <span className="text-[#00E5FF] font-semibold">SYSTEM ONLINE</span>
          </span>
          <span className="px-2.5 py-1 rounded-md bg-[#0D1320] border border-[#1D2A3A]">TF-IDF ENGINE ACTIVE</span>
          <span className="px-2.5 py-1 rounded-md bg-[#0D1320] border border-[#1D2A3A]">NLP CLASSIFIER ACTIVE</span>
          <span className="px-2.5 py-1 rounded-md bg-[#0D1320] border border-[#1D2A3A] text-[#00E5FF]">5,000 FEATURES</span>
        </div>
      </div>

      {/* Preset Headlines */}
      <div className="space-y-2">
        <label className="text-xs font-mono text-[#8B9AAF] uppercase tracking-wider block">
          TRY DEMO ANALYSIS SIGNALS:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {SAMPLE_PRESETS.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => handlePresetSelect(preset.text)}
              className={`p-3 rounded-xl border text-left transition-all text-xs flex items-center justify-between ${
                preset.type === 'FAKE'
                  ? 'bg-[#0D1320] border-[#FF3158]/30 text-[#F1F5F9] hover:border-[#FF3158]/60 hover:bg-[#FF3158]/5'
                  : 'bg-[#0D1320] border-[#20E6A4]/30 text-[#F1F5F9] hover:border-[#20E6A4]/60 hover:bg-[#20E6A4]/5'
              }`}
            >
              <div className="space-y-0.5 truncate pr-2">
                <span className="font-semibold block truncate text-[#F1F5F9]">{preset.label}</span>
                <span className="text-[11px] text-[#8B9AAF] truncate block">{preset.text}</span>
              </div>
              <ArrowRight className="w-4 h-4 shrink-0 text-[#8B9AAF]" />
            </button>
          ))}
        </div>
      </div>

      {/* Input Form Card */}
      <div className="glass-panel p-6 space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-[#F1F5F9] uppercase tracking-wider font-mono flex items-center space-x-2">
            <Activity className="w-4 h-4 text-[#00E5FF]" />
            <span>INPUT SIGNAL</span>
          </label>
          <span className="text-xs font-mono text-[#8B9AAF]">
            {inputText.length} characters
          </span>
        </div>

        <textarea
          rows={4}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Paste a news headline or article for analysis..."
          className="w-full p-4 rounded-xl bg-[#090D16] border border-[#1D2A3A] text-[#F1F5F9] placeholder-[#8B9AAF]/50 focus:outline-none focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF] text-sm leading-relaxed transition-all resize-y font-sans"
        />

        {error && (
          <div className="p-3.5 rounded-xl bg-[#FF3158]/10 border border-[#FF3158]/40 flex items-center space-x-2 text-[#FF3158] text-xs font-mono">
            <AlertTriangle className="w-4 h-4 text-[#FF3158] shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="flex items-center justify-between pt-2">
          <button
            onClick={handleClear}
            disabled={!inputText && !result}
            className="px-4 py-2.5 rounded-lg text-[#8B9AAF] hover:text-[#F1F5F9] hover:bg-[#111827] text-xs font-semibold flex items-center space-x-1.5 transition-all disabled:opacity-40"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>

          <button
            onClick={() => handleAnalyze()}
            disabled={loading || !inputText.trim()}
            className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#3B82F6] text-[#05070D] font-black text-xs uppercase tracking-wider shadow-lg shadow-[#00E5FF]/20 hover:shadow-[#00E5FF]/40 hover:scale-[1.02] transition-all disabled:opacity-40 disabled:scale-100 flex items-center space-x-2 cursor-pointer"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-[#05070D]/30 border-t-[#05070D] rounded-full animate-spin" />
                <span>PROCESSING PIPELINE...</span>
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span>ANALYZE SIGNAL →</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Analysis Processing Visualization State */}
      {loading && (
        <div className="glass-panel p-6 animate-fade-in text-center space-y-4">
          <VisualPipeline activeStep={2} />
          <p className="text-xs font-mono text-[#00E5FF] animate-pulse">
            Executing TF-IDF Feature Extraction & Naive Bayes Inference...
          </p>
        </div>
      )}

      {/* Results Section */}
      {result && !loading && (
        <div className="space-y-6 animate-fade-in">
          
          <div className="text-center">
            <span className="text-xs font-mono uppercase tracking-widest text-[#00E5FF] bg-[#00E5FF]/10 px-3 py-1 rounded-full border border-[#00E5FF]/30">
              ANALYSIS COMPLETE
            </span>
          </div>

          {/* Main Results Panel */}
          {(() => {
            const conf = result.confidence;
            let displayTitle = '';
            let badgeText = '';
            let breakdownText = '';
            let cardBorder = '';
            let titleColor = '';
            let badgeStyle = '';
            let progressGradient = '';

            if (conf < 0.55) {
              displayTitle = 'UNCERTAIN';
              badgeText = 'UNCERTAIN';
              breakdownText = 'The model does not have sufficient confidence for a reliable classification.';
              cardBorder = 'border-[#FFB020]/40 bg-[#0D1320]';
              titleColor = 'text-[#FFB020]';
              badgeStyle = 'bg-[#FFB020]/20 text-[#FFB020] border-[#FFB020]/40';
              progressGradient = 'bg-gradient-to-r from-[#FFB020] to-[#FFB020]';
            } else if (result.prediction === 'FAKE') {
              displayTitle = 'FAKE';
              badgeText = 'FAKE-LIKE PATTERN';
              breakdownText = conf >= 0.70
                ? 'The TF-IDF model detected linguistic patterns that were more strongly associated with the FAKE class in the training data.'
                : 'The model detected a weak class association in the learned training patterns.';
              cardBorder = 'border-[#FF3158]/40 bg-[#0D1320] shadow-[0_0_30px_rgba(255,49,88,0.1)]';
              titleColor = 'text-[#FF3158]';
              badgeStyle = 'bg-[#FF3158]/20 text-[#FF3158] border-[#FF3158]/40';
              progressGradient = 'bg-gradient-to-r from-[#FF3158] to-[#FFB020]';
            } else {
              displayTitle = 'REAL';
              badgeText = 'REAL-LIKE PATTERN';
              breakdownText = conf >= 0.70
                ? 'The TF-IDF model detected linguistic patterns that were more strongly associated with the REAL class in the training data.'
                : 'The model detected a weak class association in the learned training patterns.';
              cardBorder = 'border-[#20E6A4]/40 bg-[#0D1320] shadow-[0_0_30px_rgba(32,230,164,0.1)]';
              titleColor = 'text-[#20E6A4]';
              badgeStyle = 'bg-[#20E6A4]/20 text-[#20E6A4] border-[#20E6A4]/40';
              progressGradient = 'bg-gradient-to-r from-[#3B82F6] to-[#20E6A4]';
            }

            return (
              <div className={`p-6 sm:p-8 rounded-2xl border ${cardBorder} transition-all`}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                  
                  {/* Left Column: Classification Result */}
                  <div className="space-y-3 text-center md:text-left">
                    <span className="text-xs font-mono uppercase tracking-widest text-[#8B9AAF] block">
                      CLASSIFICATION RESULT
                    </span>
                    
                    <div className="inline-flex items-center space-x-3 flex-wrap gap-y-2">
                      <span className={`text-4xl sm:text-5xl font-black tracking-tight ${titleColor}`}>
                        {displayTitle}
                      </span>
                      
                      <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider border ${badgeStyle}`}>
                        {badgeText}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2 text-xs text-[#8B9AAF] pt-1 font-mono">
                      <Cpu className="w-4 h-4 text-[#00E5FF]" />
                      <span>Classifier: <strong className="text-[#F1F5F9]">{result.model_used}</strong></span>
                    </div>
                  </div>

                  {/* Center Column: Confidence & Probability Distribution */}
                  <div className="space-y-3 bg-[#090D16] p-4 rounded-xl border border-[#1D2A3A]">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-[#8B9AAF]">CALIBRATED CONFIDENCE:</span>
                      <span className="text-[#F1F5F9] font-bold text-sm">{(result.confidence * 100).toFixed(1)}%</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-3 bg-[#05070D] rounded-full overflow-hidden p-0.5 border border-[#1D2A3A]">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${progressGradient}`}
                        style={{ width: `${(result.confidence * 100).toFixed(1)}%` }}
                      />
                    </div>

                    <div className="flex justify-between text-[11px] font-mono">
                      <span className="text-[#FF3158] font-bold">FAKE: {(result.probabilities.FAKE * 100).toFixed(1)}%</span>
                      <span className="text-[#20E6A4] font-bold">REAL: {(result.probabilities.REAL * 100).toFixed(1)}%</span>
                    </div>
                  </div>

                  {/* Right Column: Pattern Breakdown */}
                  <div className="space-y-2 text-xs text-[#F1F5F9] leading-relaxed bg-[#090D16] p-4 rounded-xl border border-[#1D2A3A]">
                    <h4 className="font-bold text-[#F1F5F9] flex items-center space-x-1.5 font-mono">
                      <ShieldCheck className="w-4 h-4 text-[#00E5FF]" />
                      <span>PATTERN BREAKDOWN</span>
                    </h4>
                    <p className="text-[12px] text-[#8B9AAF]">
                      {breakdownText}
                    </p>
                  </div>

                </div>

                {/* Preprocessed Text Output */}
                <div className="mt-6 pt-4 border-t border-[#1D2A3A] space-y-2">
                  <span className="text-[11px] font-mono uppercase text-[#8B9AAF] flex items-center space-x-1.5">
                    <Terminal className="w-3.5 h-3.5 text-[#00E5FF]" />
                    <span>PREPROCESSED TEXT (FED TO TF-IDF VECTORIZER):</span>
                  </span>
                  <p className="text-xs font-mono bg-[#05070D] p-3 rounded-lg text-[#00E5FF]/90 border border-[#1D2A3A] overflow-x-auto">
                    "{result.cleaned_text}"
                  </p>
                </div>

                {/* Disclaimer */}
                <div className="mt-4 text-[11px] text-[#8B9AAF] italic text-center sm:text-left">
                  * {result.disclaimer}
                </div>

              </div>
            );
          })()}

          {/* Flowchart Visual Pipeline */}
          <div className="glass-panel p-6">
            <VisualPipeline activeStep={4} />
          </div>

        </div>
      )}

    </div>
  );
};
