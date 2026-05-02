import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Fingerprint, UserCheck, CheckCircle2, Navigation, AlertTriangle, ArrowRight, ArrowLeft } from 'lucide-react';

const PollingWalkthrough = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: 'entry',
      title: 'Entry & Identification',
      icon: <UserCheck size={32} />,
      content: 'Present your EPIC (Voter ID) or approved alternative photo ID to the First Polling Officer. They will verify your identity against the marked copy of the electoral roll and call out your name and serial number.',
      color: 'bg-blue',
      warning: 'You can use an unofficial voter slip to find your serial number, but it is not valid for identification.'
    },
    {
      id: 'inking',
      title: 'Inking & Register',
      icon: <Fingerprint size={32} />,
      content: 'The Second Polling Officer will mark your left forefinger with indelible ink, record your serial number in the Register of Voters, and take your signature or thumb impression. You will receive a signed voter slip.',
      color: 'bg-saffron',
      warning: 'Do not wipe off the ink.'
    },
    {
      id: 'control_unit',
      title: 'Control Unit Activation',
      icon: <CheckCircle2 size={32} />,
      content: 'Hand over your signed voter slip to the Third Polling Officer. They will press the "Ballot" button on the Control Unit to activate the voting machine for you, and direct you to the voting compartment.',
      color: 'bg-green',
      warning: 'Wait for the Third Polling Officer\'s signal before proceeding.'
    },
    {
      id: 'voting',
      title: 'Casting the Vote',
      icon: <Navigation size={32} />,
      content: 'Inside the voting compartment, press the blue candidate button on the Balloting Unit next to your chosen candidate. A red lamp will glow, and you will hear a "beep" sound confirming your vote.',
      color: 'bg-navy',
      warning: 'Maintain the secrecy of your vote. Photography inside the voting compartment is strictly prohibited.'
    }
  ];

  const handleNext = () => {
    if (activeStep < steps.length - 1) setActiveStep(prev => prev + 1);
  };

  const handlePrev = () => {
    if (activeStep > 0) setActiveStep(prev => prev - 1);
  };

  const currentStepData = steps[activeStep];

  return (
    <div className="glass-panel p-8 max-w-3xl mx-auto mt-8 animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-navy mb-2">Polling Day Walkthrough</h2>
        <p className="text-text-light">A step-by-step guide to casting your vote at the polling station.</p>
      </div>

      {/* Progress Tracker */}
      <div className="flex justify-between items-center mb-10 relative">
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -z-10 -translate-y-1/2"></div>
        <div 
          className="absolute top-1/2 left-0 h-1 bg-saffron -z-10 -translate-y-1/2 transition-all duration-500"
          style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
        ></div>
        
        {steps.map((step, idx) => (
          <div 
            key={step.id} 
            className="flex flex-col items-center cursor-pointer"
            onClick={() => setActiveStep(idx)}
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold transition-all duration-300 ${
              idx <= activeStep ? step.color + ' shadow-lg scale-110' : 'bg-gray-300'
            }`}>
              {idx + 1}
            </div>
            <span className={`mt-2 text-xs font-medium hidden sm:block ${idx <= activeStep ? 'text-navy' : 'text-gray-400'}`}>
              {step.title.split(' ')[0]}
            </span>
          </div>
        ))}
      </div>

      {/* Content Area */}
      <div className="min-h-[300px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className={`p-4 rounded-xl text-white ${currentStepData.color}`}>
                {currentStepData.icon}
              </div>
              <h3 className="text-2xl font-bold text-navy">{currentStepData.title}</h3>
            </div>
            
            <p className="text-lg text-text-dark leading-relaxed mb-6">
              {currentStepData.content}
            </p>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg flex gap-3 items-start">
              <AlertTriangle className="text-yellow-600 shrink-0 mt-0.5" size={20} />
              <p className="text-sm text-yellow-800 font-medium">{currentStepData.warning}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div className="flex justify-between mt-8">
        <button 
          onClick={handlePrev} 
          disabled={activeStep === 0}
          className={`btn-outline flex items-center gap-2 ${activeStep === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <ArrowLeft size={18} /> Previous
        </button>
        <button 
          onClick={handleNext} 
          disabled={activeStep === steps.length - 1}
          className={`btn-primary flex items-center gap-2 ${activeStep === steps.length - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Next <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default PollingWalkthrough;
