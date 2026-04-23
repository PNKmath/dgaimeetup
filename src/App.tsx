import React, { useState } from 'react';
import { AppProvider } from './context/AppContext';
import { LandingPage } from './pages/LandingPage';
import { OnboardingForm } from './pages/OnboardingForm';
import { LiveDirectory } from './pages/LiveDirectory';
import { ProjectorView } from './pages/ProjectorView';

type ViewState = 'landing' | 'onboarding' | 'directory' | 'projector';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('landing');

  return (
    <AppProvider>
      <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-cyan-500/30">
        {view === 'landing' && (
          <LandingPage 
            onJoin={() => setView('onboarding')} 
            onViewProjector={() => setView('projector')} 
          />
        )}
        
        {view === 'onboarding' && (
          <OnboardingForm onComplete={() => setView('directory')} />
        )}
        
        {view === 'directory' && (
          <LiveDirectory />
        )}
        
        {view === 'projector' && (
          <ProjectorView />
        )}

        {/* Global Navigation Hint for Demo */}
        {view !== 'landing' && view !== 'projector' && (
          <div className="fixed bottom-0 left-0 right-0 p-4 flex justify-center gap-4 bg-slate-950/80 backdrop-blur-sm border-t border-slate-800 z-50">
            <button 
              onClick={() => setView('onboarding')}
              className={`text-[10px] uppercase tracking-widest font-bold ${view === 'onboarding' ? 'text-cyan-400' : 'text-slate-500'}`}
            >
              Form
            </button>
            <button 
              onClick={() => setView('directory')}
              className={`text-[10px] uppercase tracking-widest font-bold ${view === 'directory' ? 'text-cyan-400' : 'text-slate-500'}`}
            >
              Directory
            </button>
            <button 
              onClick={() => setView('landing')}
              className="text-[10px] uppercase tracking-widest font-bold text-slate-500"
            >
              Exit
            </button>
          </div>
        )}
      </div>
    </AppProvider>
  );
};

export default App;
