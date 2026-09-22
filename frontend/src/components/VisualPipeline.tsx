import React from 'react';
import { FileText, Sparkles, Layers, Cpu, CheckCircle2 } from 'lucide-react';

interface VisualPipelineProps {
  activeStep?: number; // 0 to 4
}

export const VisualPipeline: React.FC<VisualPipelineProps> = ({ activeStep = 4 }) => {
  const steps = [
    {
      title: 'Input Text',
      desc: 'News article headline or text sample',
      icon: FileText,
      badge: 'Step 1',
    },
    {
      title: 'Text Preprocessing',
      desc: 'Lowercase, URL strip & noise removal',
      icon: Sparkles,
      badge: 'Step 2',
    },
    {
      title: 'TF-IDF Vectorization',
      desc: 'Unigram/Bigram matrix (5,000 Features)',
      icon: Layers,
      badge: 'Step 3',
    },
    {
      title: 'Multinomial Naive Bayes',
      desc: 'Pattern matching & probability calculation',
      icon: Cpu,
      badge: 'Step 4',
    },
    {
      title: 'Analysis Result',
      desc: 'FAKE / REAL / UNCERTAIN output',
      icon: CheckCircle2,
      badge: 'Result',
    },
  ];

  return (
    <div className="w-full py-4">
      <div className="text-center mb-6">
        <h3 className="text-xs font-bold text-[#00E5FF] uppercase tracking-widest font-mono">
          Conceptual Pipeline Architecture
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 relative">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isDone = idx <= activeStep;
          const isCurrent = idx === activeStep;

          return (
            <div
              key={idx}
              className={`p-4 rounded-xl transition-all duration-300 relative flex flex-col items-center text-center ${
                isCurrent
                  ? 'bg-[#00E5FF]/10 border-2 border-[#00E5FF] shadow-[0_0_20px_rgba(0,229,255,0.2)] scale-105 z-10'
                  : isDone
                  ? 'bg-[#0D1320] border border-[#1D2A3A] text-[#F1F5F9]'
                  : 'bg-[#05070D]/60 border border-[#1D2A3A]/40 text-[#8B9AAF]'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-all ${
                  isCurrent
                    ? 'bg-[#00E5FF] text-[#05070D] shadow-[0_0_15px_#00E5FF]'
                    : isDone
                    ? 'bg-[#111827] text-[#00E5FF] border border-[#00E5FF]/30'
                    : 'bg-[#090D16] text-[#8B9AAF]'
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>

              <span className="text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full bg-[#111827] text-[#8B9AAF] border border-[#1D2A3A] mb-1.5">
                {step.badge}
              </span>

              <h4 className="text-xs font-bold text-[#F1F5F9] mb-1">{step.title}</h4>
              <p className="text-[11px] text-[#8B9AAF] leading-tight font-sans">{step.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
