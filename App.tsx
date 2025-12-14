import React, { useState } from 'react';
import Background from './components/Background';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Editor from './components/Editor';
import Calendar from './components/Calendar';
import { ViewState } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.DASHBOARD);

  return (
    <div className="min-h-screen text-tron-100 font-body relative overflow-x-hidden selection:bg-tron-accent selection:text-black">
      <Background />
      
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header currentView={currentView} onChangeView={setCurrentView} />
        
        <main className="flex-grow flex flex-col">
           {currentView === ViewState.DASHBOARD && <Dashboard onChangeView={setCurrentView} />}
           {currentView === ViewState.EDITOR && <Editor />}
           {currentView === ViewState.CALENDAR && <Calendar />}
        </main>

        <footer className="w-full text-center py-6 text-tron-700 font-mono text-[10px] uppercase tracking-widest border-t border-tron-900/50">
           INYTX OS v2.0.25 // SECURE CONNECTION ESTABLISHED
        </footer>
      </div>
    </div>
  );
};

export default App;