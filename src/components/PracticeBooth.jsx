import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Fingerprint, UserCheck, CheckCircle2, ChevronRight, Speaker } from 'lucide-react';

const candidates = [
  { id: '1', name: 'Candidate A', symbol: 'A' },
  { id: '2', name: 'Candidate B', symbol: 'B' },
  { id: '3', name: 'Candidate C', symbol: 'C' },
  { id: '4', name: 'NOTA', symbol: 'X' },
];

const PracticeBooth = () => {
  const [stage, setStage] = useState(0);
  const [votedCandidate, setVotedCandidate] = useState(null);
  const [isBeeping, setIsBeeping] = useState(false);
  const [showSlip, setShowSlip] = useState(false);
  const audioContextRef = useRef(null);

  // Play beep sound using Web Audio API
  const playBeep = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    const ctx = audioContextRef.current;
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(1000, ctx.currentTime); // 1000 Hz beep
    
    gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.start();
    setIsBeeping(true);
    
    setTimeout(() => {
      oscillator.stop();
      setIsBeeping(false);
    }, 2000); // 2 second beep
  };

  const handleVote = (candidate) => {
    if (votedCandidate) return; // Prevent multiple votes
    
    setVotedCandidate(candidate);
    playBeep();
    setShowSlip(true);
    
    // Slip drops after 7 seconds
    setTimeout(() => {
      setShowSlip(false);
    }, 7000);
  };

  const nextStage = () => setStage((prev) => Math.min(prev + 1, 4));
  const resetBooth = () => {
    setStage(0);
    setVotedCandidate(null);
    setShowSlip(false);
  };

  return (
    <div className="glass-panel p-8 max-w-4xl mx-auto mt-8 animate-fade-in relative overflow-hidden">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-navy mb-2">Practice Polling Booth</h2>
        <p className="text-text-light">Experience the step-by-step voting process interactively.</p>
      </div>

      <div className="min-h-[450px] relative">
        <AnimatePresence mode="wait">
          
          {/* STAGE 0: Intro */}
          {stage === 0 && (
            <motion.div
              key="stage0"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col items-center justify-center h-[350px] space-y-6"
            >
              <div className="bg-blue-light p-6 rounded-full">
                <CheckCircle2 size={64} className="text-blue" />
              </div>
              <h3 className="text-2xl font-bold text-navy text-center">Welcome to the Mock Polling Station</h3>
              <p className="text-center text-text-dark max-w-md">
                This interactive module simulates the exact process you will follow on election day, from ID verification to casting your vote on an EVM.
              </p>
              <button onClick={nextStage} className="btn-primary flex items-center gap-2">
                Enter Polling Station <ChevronRight size={20} />
              </button>
            </motion.div>
          )}

          {/* STAGE 1: First Officer */}
          {stage === 1 && (
            <motion.div
              key="stage1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col md:flex-row items-center gap-8 p-6 bg-white rounded-2xl shadow-sm border border-gray-100"
            >
              <div className="bg-blue text-white p-6 rounded-xl shrink-0">
                <UserCheck size={64} />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-navy mb-2">First Polling Officer</h3>
                <p className="text-lg text-text-dark mb-4">
                  "Please show me your EPIC (Voter ID) or other approved ID."
                </p>
                <div className="bg-gray-50 p-4 rounded-lg mb-6 text-sm text-gray-600">
                  <p><strong>Action:</strong> You show your ID. The officer finds your name on the electoral roll and calls out your serial number.</p>
                </div>
                <button onClick={nextStage} className="btn-primary">Proceed to 2nd Officer</button>
              </div>
            </motion.div>
          )}

          {/* STAGE 2: Second Officer */}
          {stage === 2 && (
            <motion.div
              key="stage2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col md:flex-row items-center gap-8 p-6 bg-white rounded-2xl shadow-sm border border-gray-100"
            >
              <div className="bg-saffron text-white p-6 rounded-xl shrink-0">
                <Fingerprint size={64} />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-navy mb-2">Second Polling Officer</h3>
                <p className="text-lg text-text-dark mb-4">
                  "Please sign the register and let me mark your finger."
                </p>
                <div className="bg-gray-50 p-4 rounded-lg mb-6 text-sm text-gray-600 space-y-2">
                  <p><strong>Action 1:</strong> Indelible ink is applied to your left forefinger.</p>
                  <p><strong>Action 2:</strong> You sign or put your thumb impression in Form 17A (Register of Voters).</p>
                  <p><strong>Action 3:</strong> You receive a signed voter slip.</p>
                </div>
                <button onClick={nextStage} className="btn-primary">Proceed to 3rd Officer</button>
              </div>
            </motion.div>
          )}

          {/* STAGE 3: Third Officer */}
          {stage === 3 && (
            <motion.div
              key="stage3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col md:flex-row items-center gap-8 p-6 bg-white rounded-2xl shadow-sm border border-gray-100"
            >
              <div className="bg-green text-white p-6 rounded-xl shrink-0">
                <CheckCircle2 size={64} />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-navy mb-2">Third Polling Officer</h3>
                <p className="text-lg text-text-dark mb-4">
                  "Hand me the voter slip, please."
                </p>
                <div className="bg-gray-50 p-4 rounded-lg mb-6 text-sm text-gray-600">
                  <p><strong>Action:</strong> The officer takes your slip and presses the 'Ballot' button on the Control Unit. This unlocks the voting machine inside the compartment for you.</p>
                </div>
                <button onClick={nextStage} className="btn-primary bg-green hover:bg-green-dark border-green">Enter Voting Compartment</button>
              </div>
            </motion.div>
          )}

          {/* STAGE 4: EVM/VVPAT */}
          {stage === 4 && (
            <motion.div
              key="stage4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center w-full"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                {/* Balloting Unit (EVM) */}
                <div className="bg-gray-200 p-6 rounded-lg border-4 border-gray-400 shadow-inner relative">
                  <div className="absolute top-2 right-4 text-xs font-bold text-gray-500">BALLOTING UNIT</div>
                  <div className="space-y-3 mt-4">
                    {candidates.map((cand) => (
                      <div key={cand.id} className="flex items-center gap-4 bg-white p-2 rounded border border-gray-300">
                        <div className="w-10 h-10 bg-gray-100 flex items-center justify-center font-bold border border-gray-300 rounded-sm">
                          {cand.symbol}
                        </div>
                        <div className="flex-1 font-semibold">{cand.name}</div>
                        
                        {/* Red LED */}
                        <div className={`w-4 h-4 rounded-full border border-gray-400 transition-colors duration-300 ${votedCandidate?.id === cand.id ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]' : 'bg-red-900'}`} />
                        
                        {/* Blue Button */}
                        <button
                          onClick={() => handleVote(cand)}
                          disabled={votedCandidate !== null}
                          className={`w-12 h-8 rounded-full border-b-4 transition-all duration-100 ${
                            votedCandidate !== null 
                              ? 'bg-blue opacity-50 cursor-not-allowed border-blue-dark' 
                              : 'bg-blue hover:brightness-110 active:border-b-0 active:translate-y-1 border-blue-dark'
                          }`}
                        />
                      </div>
                    ))}
                  </div>
                  
                  {/* Audio Indicator */}
                  {isBeeping && (
                    <div className="absolute bottom-4 right-4 text-red-500 animate-pulse flex items-center gap-1">
                      <Speaker size={20} /> <span className="font-bold text-sm">BEEEEEP</span>
                    </div>
                  )}
                </div>

                {/* VVPAT Unit */}
                <div className="bg-gray-100 p-6 rounded-lg border-4 border-gray-400 shadow-inner relative flex flex-col items-center justify-center">
                  <div className="absolute top-2 left-4 text-xs font-bold text-gray-500">VVPAT</div>
                  
                  {/* Viewing Window */}
                  <div className="w-48 h-64 bg-black rounded border-8 border-gray-600 relative overflow-hidden flex items-start justify-center pt-4 shadow-inner">
                    
                    {/* Paper Slip Animation */}
                    <AnimatePresence>
                      {showSlip && votedCandidate && (
                        <motion.div
                          initial={{ y: -150, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: 200, opacity: 0 }}
                          transition={{ duration: 1, exit: { delay: 6, duration: 1 } }} // Stays for 7 seconds total
                          className="bg-yellow-50 w-32 p-4 flex flex-col items-center justify-center gap-4 border border-gray-300 shadow-sm"
                        >
                          <div className="text-xl font-bold border-b-2 border-black w-full text-center pb-2">
                            {votedCandidate.symbol}
                          </div>
                          <div className="text-lg font-bold text-center">
                            {votedCandidate.name}
                          </div>
                          <div className="text-[10px] mt-4 border-t border-gray-400 pt-1 text-center w-full">
                            VVPAT SLIP
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    
                    {/* Glass Reflection Effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent opacity-10 pointer-events-none" />
                  </div>
                  
                  <div className="mt-4 text-sm text-gray-600 text-center">
                    <p>Verify your vote here.</p>
                    <p>Slip is visible for 7 seconds.</p>
                  </div>
                </div>
              </div>

              {/* Start Over Button below both units */}
              {votedCandidate && !showSlip && (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="mt-8 flex justify-center w-full"
                >
                  <button onClick={resetBooth} className="btn-primary px-8">
                    Start Over
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}

        </AnimatePresence>
      </div>
      
      {/* Step Indicator */}
      <div className="mt-8 flex justify-center gap-2">
        {[0, 1, 2, 3, 4].map((i) => (
          <div 
            key={i} 
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${i === stage ? 'bg-navy' : i < stage ? 'bg-green' : 'bg-gray-300'}`} 
          />
        ))}
      </div>
    </div>
  );
};

export default PracticeBooth;
