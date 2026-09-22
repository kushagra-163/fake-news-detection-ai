import React from 'react';
import { ShieldAlert, Cpu, GitBranch, Award } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-20 border-t border-[#1D2A3A] bg-[#090D16] py-10 text-[#8B9AAF] text-xs font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-6 border-b border-[#1D2A3A]">
          
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-[#F1F5F9] flex items-center space-x-2">
              <Cpu className="w-4 h-4 text-[#00E5FF]" />
              <span>Fake News Detection AI</span>
            </h4>
            <p className="text-[#8B9AAF] leading-relaxed text-xs">
              Academic NLP / Machine Learning Project analyzing news headlines using TF-IDF vectorization & supervised classifiers.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-bold text-[#F1F5F9] flex items-center space-x-2">
              <GitBranch className="w-4 h-4 text-[#3B82F6]" />
              <span>Tech Stack</span>
            </h4>
            <p className="text-[#8B9AAF] text-xs font-mono">
              FastAPI • Python • scikit-learn • React • TypeScript
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-bold text-[#F1F5F9] flex items-center space-x-2">
              <Award className="w-4 h-4 text-[#20E6A4]" />
              <span>Academic Standard</span>
            </h4>
            <p className="text-[#8B9AAF] text-xs">
              Evaluation values are populated from the model evaluation pipeline.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-bold text-[#FFB020] flex items-center space-x-2">
              <ShieldAlert className="w-4 h-4" />
              <span>Disclaimer</span>
            </h4>
            <p className="text-[#FFB020]/90 text-[11px] leading-relaxed">
              Prediction is based on statistical patterns learned from labeled training data. This tool does not perform independent internet fact verification.
            </p>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#8B9AAF] font-mono">
          <p>© 2026 Fake News Detection AI — Academic Project Submission.</p>
          <p>Designed for Academic Evaluation & Viva Defense.</p>
        </div>

      </div>
    </footer>
  );
};
