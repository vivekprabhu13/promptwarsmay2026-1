import React, { useState } from 'react';
import { Phone, CalendarClock, ExternalLink, ShieldCheck } from 'lucide-react';
import FormNavigator from './components/FormNavigator';
import DocumentChecklist from './components/DocumentChecklist';
import PollingWalkthrough from './components/PollingWalkthrough';

import PracticeBooth from './components/PracticeBooth';
import Directory from './components/Directory';
import ChatAgent from './components/ChatAgent';

function App() {
  const [activeTab, setActiveTab] = useState('navigator');
  const [selectedScenario, setSelectedScenario] = useState(null);

  const handleScenarioSelected = (scenarioId) => {
    setSelectedScenario(scenarioId);
    setActiveTab('checklist');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <ShieldCheck className="text-blue" size={32} />
              <div>
                <h1 className="text-xl font-bold text-navy leading-none">Electoral Intelligence</h1>
                <span className="text-xs font-semibold text-saffron tracking-wider uppercase">India</span>
              </div>
            </div>
            
            <nav className="hidden md:flex space-x-1">
              <button 
                onClick={() => setActiveTab('navigator')}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${activeTab === 'navigator' ? 'bg-blue-light text-blue' : 'text-text-light hover:bg-gray-100 hover:text-navy'}`}
              >
                Form Navigator
              </button>
              <button 
                onClick={() => setActiveTab('checklist')}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${activeTab === 'checklist' ? 'bg-blue-light text-blue' : 'text-text-light hover:bg-gray-100 hover:text-navy'}`}
              >
                Document Checklist
              </button>
              <button 
                onClick={() => setActiveTab('walkthrough')}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${activeTab === 'walkthrough' ? 'bg-blue-light text-blue' : 'text-text-light hover:bg-gray-100 hover:text-navy'}`}
              >
                Polling Walkthrough
              </button>
              <button 
                onClick={() => setActiveTab('practice')}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${activeTab === 'practice' ? 'bg-blue-light text-blue' : 'text-text-light hover:bg-gray-100 hover:text-navy'}`}
              >
                Practice Booth
              </button>
              <button 
                onClick={() => setActiveTab('directory')}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${activeTab === 'directory' ? 'bg-blue-light text-blue' : 'text-text-light hover:bg-gray-100 hover:text-navy'}`}
              >
                Directory
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Module Rendering */}
        {activeTab === 'navigator' && <FormNavigator onSelectScenario={handleScenarioSelected} />}
        {activeTab === 'checklist' && <DocumentChecklist selectedScenarioId={selectedScenario} />}
        {activeTab === 'walkthrough' && <PollingWalkthrough />}
        {activeTab === 'practice' && <PracticeBooth />}
        {activeTab === 'directory' && <Directory />}

      </main>

      {/* Global Footer enforcing Persona Rules */}
      <footer className="bg-navy text-white mt-auto py-8 border-t-4 border-saffron">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <Phone className="text-saffron" size={24} />
                <h3 className="text-lg font-bold">National Helpline</h3>
              </div>
              <p className="text-4xl font-black text-saffron mb-2 tracking-widest">1950</p>
              <p className="text-sm text-gray-400">Call for any election-related queries.</p>
            </div>

            <div className="col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <ShieldCheck className="text-green" size={24} />
                <h3 className="text-lg font-bold">The "Wait-Time" Logic</h3>
              </div>
              <div className="bg-white bg-opacity-10 p-4 rounded-lg border border-gray-600">
                <p className="text-sm font-medium">
                  Having an EPIC (Voter ID) is a necessary but <span className="text-saffron font-bold">insufficient</span> condition to vote.
                </p>
                <p className="text-sm mt-2 text-gray-300">
                  You MUST verify your name is on the Electoral Roll.
                </p>
                <a 
                  href="https://electoralsearch.eci.gov.in" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1 text-sm text-green hover:text-white transition-colors"
                >
                  Verify Now <ExternalLink size={14} />
                </a>
              </div>
            </div>

            <div className="col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <CalendarClock className="text-blue-light" size={24} />
                <h3 className="text-lg font-bold">Qualifying Dates</h3>
              </div>
              <p className="text-sm text-gray-400 mb-3">You can enroll as a new voter if you turn 18 on or before any of these 4 dates every year:</p>
              <div className="grid grid-cols-2 gap-2 text-sm font-semibold">
                <div className="bg-white bg-opacity-5 p-2 rounded text-center">January 1</div>
                <div className="bg-white bg-opacity-5 p-2 rounded text-center">April 1</div>
                <div className="bg-white bg-opacity-5 p-2 rounded text-center">July 1</div>
                <div className="bg-white bg-opacity-5 p-2 rounded text-center">October 1</div>
              </div>
            </div>

          </div>
          <div className="mt-8 pt-6 border-t border-gray-700 text-center text-xs text-gray-500">
            <p>Non-partisan assistant for the Indian Electoral Process.</p>
          </div>
        </div>
      </footer>
      <ChatAgent />
    </div>
  );
}

export default App;
