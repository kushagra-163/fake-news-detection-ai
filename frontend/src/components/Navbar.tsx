import React from 'react';
import { Shield, Activity, BarChart2, Info, Search } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isBackendHealthy: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, isBackendHealthy }) => {
  const navItems = [
    { id: 'analyzer', label: 'Analyzer', icon: Search },
    { id: 'insights', label: 'Model Insights', icon: Activity },
    { id: 'comparison', label: 'Model Comparison', icon: BarChart2 },
    { id: 'about', label: 'About', icon: Info },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#090D16]/90 backdrop-blur-xl border-b border-[#1D2A3A] shadow-lg shadow-black/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo & Title */}
        <div 
          onClick={() => setActiveTab('analyzer')} 
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-[#0D1320] border border-[#1D2A3A] flex items-center justify-center text-[#00E5FF] group-hover:border-[#00E5FF]/40 group-hover:shadow-[0_0_15px_rgba(0,229,255,0.2)] transition-all">
            <Shield className="w-5 h-5 text-[#00E5FF]" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-base tracking-tight text-[#F1F5F9] font-sans">
                FAKE NEWS DETECTION <span className="text-[#00E5FF]">AI</span>
              </span>
            </div>
            <p className="text-[10px] text-[#8B9AAF] tracking-widest uppercase font-mono">
              AI NEWS INTELLIGENCE
            </p>
          </div>
        </div>

        {/* Desktop Navigation Tabs */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-mono tracking-wide uppercase transition-all ${
                  isActive
                    ? 'bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/40 shadow-[0_0_15px_rgba(0,229,255,0.15)] font-bold'
                    : 'text-[#8B9AAF] hover:text-[#F1F5F9] hover:bg-[#0D1320]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#00E5FF]' : 'text-[#8B9AAF]'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* System Online Status Indicator */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-[#0D1320] border border-[#1D2A3A] text-xs font-mono">
            <span className={`w-2 h-2 rounded-full ${isBackendHealthy ? 'bg-[#00E5FF] animate-pulse shadow-[0_0_8px_#00E5FF]' : 'bg-[#FF3158]'}`} />
            <span className={isBackendHealthy ? 'text-[#00E5FF] font-semibold' : 'text-[#FF3158] font-semibold'}>
              {isBackendHealthy ? '● SYSTEM ONLINE' : '● API OFFLINE'}
            </span>
          </div>
        </div>

      </div>

      {/* Mobile Nav Bar */}
      <div className="md:hidden flex items-center justify-around border-t border-[#1D2A3A] bg-[#05070D] py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center py-1 px-3 text-[10px] font-mono uppercase ${
                isActive ? 'text-[#00E5FF] font-bold' : 'text-[#8B9AAF]'
              }`}
            >
              <Icon className="w-4 h-4 mb-0.5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
