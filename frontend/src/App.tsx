import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AnalyzerPage } from './pages/AnalyzerPage';
import { InsightsPage } from './pages/InsightsPage';
import { ComparisonPage } from './pages/ComparisonPage';
import { AboutPage } from './pages/AboutPage';
import { checkHealth } from './services/api';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('analyzer');
  const [isBackendHealthy, setIsBackendHealthy] = useState<boolean>(false);

  useEffect(() => {
    const verifyHealth = () => {
      checkHealth()
        .then((res) => {
          setIsBackendHealthy(res.status === 'healthy' && res.model_loaded);
        })
        .catch(() => {
          setIsBackendHealthy(false);
        });
    };

    verifyHealth();
    const interval = setInterval(verifyHealth, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#05070D] text-[#F1F5F9] font-sans selection:bg-[#00E5FF] selection:text-[#05070D]">
      
      {/* Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isBackendHealthy={isBackendHealthy}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'analyzer' && <AnalyzerPage />}
        {activeTab === 'insights' && <InsightsPage />}
        {activeTab === 'comparison' && <ComparisonPage />}
        {activeTab === 'about' && <AboutPage />}
        {activeTab !== 'analyzer' && activeTab !== 'insights' && activeTab !== 'comparison' && activeTab !== 'about' && (
          <AnalyzerPage />
        )}
      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
};

export default App;
