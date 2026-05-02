import React, { useState, useEffect } from 'react';
import { eciData } from '../data/eciData';
import { motion } from 'framer-motion';
import { CheckSquare, Square, FileText, Info } from 'lucide-react';

const DocumentChecklist = ({ selectedScenarioId }) => {
  const [activeScenario, setActiveScenario] = useState(
    selectedScenarioId || 'first_time_voter'
  );
  
  const [checkedItems, setCheckedItems] = useState({});

  useEffect(() => {
    if (selectedScenarioId) {
      setActiveScenario(selectedScenarioId);
      setCheckedItems({}); // Reset checks when scenario changes
    }
  }, [selectedScenarioId]);

  const toggleCheck = (itemIndex) => {
    setCheckedItems(prev => ({
      ...prev,
      [itemIndex]: !prev[itemIndex]
    }));
  };

  const scenarioData = eciData.scenarios.find(s => s.id === activeScenario);

  if (!scenarioData || !scenarioData.required_documents) {
    return (
      <div className="glass-panel p-8 max-w-2xl mx-auto mt-8 animate-fade-in text-center">
        <p className="text-text-light">No documents required or scenario not selected.</p>
      </div>
    );
  }

  const progress = Object.values(checkedItems).filter(Boolean).length;
  const total = scenarioData.required_documents.length;
  const progressPercent = Math.round((progress / total) * 100);

  return (
    <div className="glass-panel p-8 max-w-2xl mx-auto mt-8 animate-fade-in">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
        <div className="p-3 bg-green bg-opacity-20 rounded-full text-green">
          <FileText size={28} />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-navy m-0">Document Checklist</h2>
          <p className="text-text-light text-sm m-0">Gather these documents for {scenarioData.applicable_form}</p>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-text-dark mb-2">Select Scenario:</label>
        <select 
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent"
          value={activeScenario}
          onChange={(e) => {
            setActiveScenario(e.target.value);
            setCheckedItems({});
          }}
        >
          {eciData.scenarios.filter(s => s.required_documents).map(s => (
            <option key={s.id} value={s.id}>{s.name} ({s.applicable_form})</option>
          ))}
        </select>
      </div>

      <div className="mb-6 bg-white rounded-lg p-4 shadow-sm border border-gray-100">
        <div className="flex justify-between items-end mb-2">
          <span className="text-sm font-semibold text-text-light">Preparation Progress</span>
          <span className="text-lg font-bold text-green">{progressPercent}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div className="bg-green h-2.5 rounded-full transition-all duration-500 ease-out" style={{ width: `${progressPercent}%` }}></div>
        </div>
      </div>

      <div className="space-y-3">
        {scenarioData.required_documents.map((doc, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`p-4 rounded-xl border flex items-start gap-4 cursor-pointer transition-all ${
              checkedItems[idx] 
                ? 'bg-green-light border-green border-opacity-50' 
                : 'bg-white border-gray-200 hover:border-green hover:shadow-md'
            }`}
            onClick={() => toggleCheck(idx)}
          >
            <div className={`mt-1 flex-shrink-0 ${checkedItems[idx] ? 'text-green' : 'text-gray-400'}`}>
              {checkedItems[idx] ? <CheckSquare size={24} /> : <Square size={24} />}
            </div>
            <div>
              <p className={`font-medium ${checkedItems[idx] ? 'text-green line-through opacity-70' : 'text-text-dark'}`}>
                {doc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-saffron-light rounded-lg border border-saffron border-opacity-30 flex gap-3">
        <Info className="text-saffron shrink-0" size={20} />
        <p className="text-sm text-text-dark">Ensure all copies are clear and legible. Self-attestation is often required when submitting offline.</p>
      </div>
    </div>
  );
};

export default DocumentChecklist;
