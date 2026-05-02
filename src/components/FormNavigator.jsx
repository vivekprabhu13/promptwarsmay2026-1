import React, { useState } from 'react';
import { eciData } from '../data/eciData';
import { motion, AnimatePresence } from 'framer-motion';
import { FileQuestion, AlertCircle, Phone, ArrowRight, RotateCcw } from 'lucide-react';

const FormNavigator = ({ onSelectScenario }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [resultId, setResultId] = useState(null);

  const questions = [
    {
      id: 'isNew',
      text: 'Are you registering to vote for the very first time?',
      options: [
        { label: 'Yes, first time', value: 'yes', nextStep: 1 },
        { label: 'No, I am already registered', value: 'no', nextStep: 2 }
      ]
    },
    {
      id: 'residenceType',
      text: 'Where do you currently reside?',
      options: [
        { label: 'In India', value: 'india', result: 'first_time_voter' },
        { label: 'Abroad (NRI)', value: 'nri', result: 'nri_voter' }
      ]
    },
    {
      id: 'modificationType',
      text: 'What do you need to do?',
      options: [
        { label: 'Shift my residence', value: 'shift', result: 'recently_moved_shifting' },
        { label: 'Correct my details (Name, Age, etc.)', value: 'correct', result: 'correction_entries' },
        { label: 'Get a replacement EPIC (Lost/Damaged)', value: 'lost', result: 'lost_card' },
        { label: 'Mark as Person with Disability (PwD)', value: 'pwd', result: 'pwd_marking' },
        { label: 'Delete a name / Raise objection', value: 'delete', result: 'deletion_objection' }
      ]
    }
  ];

  const handleOptionSelect = (option) => {
    setAnswers({ ...answers, [questions[currentStep].id]: option.value });
    
    if (option.result) {
      setResultId(option.result);
    } else if (option.nextStep !== undefined) {
      setCurrentStep(option.nextStep);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers({});
    setResultId(null);
  };

  const currentQuestion = questions[currentStep];
  const resultData = resultId ? eciData.scenarios.find(s => s.id === resultId) : null;

  return (
    <div className="glass-panel p-8 max-w-2xl mx-auto mt-8 animate-fade-in">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
        <div className="p-3 bg-saffron bg-opacity-20 rounded-full text-saffron">
          <FileQuestion size={28} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-navy m-0">Form Navigator</h2>
          <p className="text-text-light text-sm m-0">Find the correct ECI form for your needs.</p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!resultData ? (
          <motion.div
            key="question"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="py-6"
          >
            <h3 className="text-xl font-medium mb-6">{currentQuestion.text}</h3>
            <div className="flex flex-col gap-4">
              {currentQuestion.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleOptionSelect(option)}
                  className="btn-outline flex items-center justify-between text-left hover:border-saffron hover:text-saffron group"
                >
                  <span>{option.label}</span>
                  <ArrowRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-4"
          >
            <div className="bg-green-light p-6 rounded-xl border border-green border-opacity-30 mb-6">
              <h3 className="text-2xl font-bold text-green mb-2">Use {resultData.applicable_form}</h3>
              <p className="font-medium text-lg">{resultData.name}</p>
              <p className="text-text-dark mt-2">{resultData.description}</p>
            </div>

            {resultData.qualifying_dates && (
              <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold mb-2">Qualifying Dates</h4>
                <p className="text-sm text-text-light mb-2">You must be 18 on one of these dates:</p>
                <div className="flex flex-wrap gap-2">
                  {resultData.qualifying_dates.map(date => (
                    <span key={date} className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium">{date}</span>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-blue-light p-4 rounded-lg flex gap-3 items-start mb-6 border border-blue border-opacity-20">
              <AlertCircle className="text-blue shrink-0 mt-1" size={20} />
              <div>
                <h4 className="font-semibold text-blue">Important "Wait-Time" Logic</h4>
                <p className="text-sm">{resultData.process_note}</p>
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <button onClick={() => onSelectScenario(resultData.id)} className="btn-primary flex-1 flex items-center justify-center gap-2">
                Go to Document Checklist <ArrowRight size={18} />
              </button>
              <button onClick={handleReset} className="btn-outline flex items-center gap-2">
                <RotateCcw size={18} /> Restart
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FormNavigator;
