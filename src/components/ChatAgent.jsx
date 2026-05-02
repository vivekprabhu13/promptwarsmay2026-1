import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, User, Bot, Loader2 } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { eciData } from '../data/eciData';
import officersData from '../data/officersData.json';

const ChatAgent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'model',
      text: "Hello! I am Electoral Intelligence-India. I can help you with voter registration, polling day processes, or finding ECI officers. How can I assist you today?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  
  // Keep the chat session reference so it remembers context
  const chatSessionRef = useRef(null);

  // Initialize Gemini
  useEffect(() => {
    const initChat = async () => {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      console.log("ChatAgent initializing. Key present:", !!apiKey);
      
      if (!apiKey) {
        console.warn("Gemini API Key is missing. Chat agent will not function properly.");
        return;
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const systemInstruction = `
        You are "Electoral Intelligence-India," a non-partisan, high-precision assistant designed to guide users through the Indian electoral process.
        
        Core Directives:
        - Accuracy: Use ONLY the provided knowledge base.
        - The "Wait-Time" Logic: Proactively explain that having an EPIC (Voter ID) is a necessary but insufficient condition; users MUST verify their name in the Electoral Roll via electoralsearch.eci.gov.in.
        - Always append the National Voter's Service Helpline: 1950 to your answers if relevant.
        - Maintain a professional, civic-minded tone. Do not provide opinions on political parties or candidates.
        
        Knowledge Base:
        ECI Scenarios: ${JSON.stringify(eciData.scenarios)}
        Officers Directory: ${JSON.stringify(officersData)}
      `;

      const model = genAI.getGenerativeModel({ 
        model: "gemini-2.5-flash",
        systemInstruction: systemInstruction
      });

      chatSessionRef.current = model.startChat({
        generationConfig: {
          temperature: 0.2, // Low temperature for factual responses
        }
      });
    };

    initChat();
  }, []);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e) => {
    e?.preventDefault();
    if (!input.trim()) return;

    // Initialize session if missing
    if (!chatSessionRef.current) {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        setMessages(prev => [...prev, { 
          role: 'model', 
          text: "System configuration error: API key not found. Please ensure VITE_GEMINI_API_KEY is set in your build environment." 
        }]);
        return;
      }

      try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const systemInstruction = `
          You are "Electoral Intelligence-India," a non-partisan, high-precision assistant designed to guide users through the Indian electoral process.
          
          Knowledge Base (Grounding):
          1. ECI Scenarios: ${JSON.stringify(eciData)}
          2. Officers Directory: ${JSON.stringify(officersData)}
          
          Directives:
          - Use ONLY the provided knowledge.
          - Enforce "Wait-Time" logic (verify name in electoral roll).
          - Append 1950 Helpline.
        `;

        const model = genAI.getGenerativeModel({ 
          model: "gemini-2.5-flash",
          systemInstruction: systemInstruction
        });

        chatSessionRef.current = model.startChat({
          generationConfig: { temperature: 0.2 }
        });
      } catch (err) {
        console.error("Initialization Error:", err);
        setMessages(prev => [...prev, { role: 'model', text: "Failed to initialize AI assistant. Please try again." }]);
        return;
      }
    }

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const result = await chatSessionRef.current.sendMessage(userMsg);
      const responseText = result.response.text();
      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "I'm sorry, I encountered an error connecting to my knowledge base. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 bg-navy text-white p-4 rounded-full shadow-xl hover:bg-blue transition-all transform hover:scale-110 z-50 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
        aria-label="Open Chat"
      >
        <MessageCircle size={28} />
      </button>

      {/* Chat Window */}
      <div 
        className={`fixed bottom-6 right-6 w-[380px] h-[550px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col z-50 transition-all duration-300 transform origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}
      >
        {/* Header */}
        <div className="bg-navy text-white p-4 rounded-t-2xl flex justify-between items-center border-b-4 border-saffron">
          <div className="flex items-center gap-2">
            <Bot size={24} className="text-saffron" />
            <h3 className="font-bold">Electoral Intelligence</h3>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {!import.meta.env.VITE_GEMINI_API_KEY && import.meta.env.DEV && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-xs border border-red-200 text-center mb-4">
              <strong>Configuration Missing:</strong> Please set VITE_GEMINI_API_KEY in your .env file to enable the AI agent.
            </div>
          )}

          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-blue text-white' : 'bg-gray-200 text-navy'}`}>
                  {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                </div>
                <div className={`p-3 rounded-2xl text-sm ${
                  msg.role === 'user' 
                    ? 'bg-blue text-white rounded-tr-none' 
                    : 'bg-white border border-gray-200 text-navy rounded-tl-none shadow-sm whitespace-pre-wrap'
                }`}>
                  {msg.text}
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex gap-2 max-w-[85%] flex-row">
                <div className="w-8 h-8 rounded-full bg-gray-200 text-navy flex items-center justify-center shrink-0">
                  <Bot size={16} />
                </div>
                <div className="p-3 bg-white border border-gray-200 rounded-2xl rounded-tl-none shadow-sm">
                  <Loader2 className="animate-spin text-blue" size={20} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-200 rounded-b-2xl flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question..."
            className="flex-1 bg-gray-100 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue text-sm"
            disabled={isLoading}
          />
          <button 
            type="submit" 
            disabled={isLoading || !input.trim()}
            className="bg-blue text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-navy transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </>
  );
};

export default ChatAgent;
