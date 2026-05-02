import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, User, Phone, Mail, Building, Users } from 'lucide-react';
import officersData from '../data/officersData.json';

const Directory = () => {
  const [openSection, setOpenSection] = useState(Object.keys(officersData)[0]); // Default open the first section

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="glass-panel p-8 max-w-5xl mx-auto mt-8 animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-navy mb-2">Officers Directory</h2>
        <p className="text-text-light">Contact information for Election Commission of India officials.</p>
      </div>

      <div className="space-y-4">
        {Object.entries(officersData).map(([department, officers]) => (
          <div key={department} className="border border-gray-200 rounded-xl overflow-hidden shadow-sm bg-white">
            
            {/* Accordion Header */}
            <button
              onClick={() => toggleSection(department)}
              className={`w-full flex items-center justify-between p-5 text-left transition-colors duration-200 ${
                openSection === department ? 'bg-blue-light text-navy' : 'hover:bg-gray-50 text-navy'
              }`}
            >
              <div className="flex items-center gap-3">
                <Building className={openSection === department ? 'text-blue' : 'text-gray-400'} size={24} />
                <h3 className="text-lg font-bold">{department}</h3>
              </div>
              {openSection === department ? (
                <ChevronUp className="text-blue" size={24} />
              ) : (
                <ChevronDown className="text-gray-400" size={24} />
              )}
            </button>

            {/* Accordion Content */}
            <AnimatePresence>
              {openSection === department && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="p-6 bg-gray-50 border-t border-gray-100">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {officers.map((officer, idx) => (
                        <div key={idx} className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                          
                          <div className="flex items-start gap-4 mb-4">
                            <div className="bg-blue-light p-3 rounded-full shrink-0">
                              <User className="text-blue" size={24} />
                            </div>
                            <div>
                              <h4 className="text-xl font-bold text-navy">{officer.name}</h4>
                              <p className="text-sm font-semibold text-green mb-1">{officer.designation}</p>
                              
                              <div className="mt-3 space-y-2 text-sm text-text-dark">
                                {officer.email && (
                                  <div className="flex items-center gap-2">
                                    <Mail className="text-gray-400" size={16} />
                                    <a href={`mailto:${officer.email}`} className="hover:text-blue transition-colors">
                                      {officer.email}
                                    </a>
                                  </div>
                                )}
                                {officer.phones && officer.phones.length > 0 && (
                                  <div className="flex items-start gap-2">
                                    <Phone className="text-gray-400 shrink-0 mt-0.5" size={16} />
                                    <span>{officer.phones.join(', ')}</span>
                                  </div>
                                )}
                                {officer.intercom && (
                                  <div className="flex items-center gap-2">
                                    <span className="font-semibold text-gray-500 text-xs uppercase">Intercom:</span>
                                    <span>{officer.intercom}</span>
                                  </div>
                                )}
                                {officer.fax && (
                                  <div className="flex items-center gap-2">
                                    <span className="font-semibold text-gray-500 text-xs uppercase">Fax:</span>
                                    <span>{officer.fax}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Staff Section */}
                          {officer.staff && officer.staff.length > 0 && (
                            <div className="mt-4 pt-4 border-t border-gray-100">
                              <div className="flex items-center gap-2 mb-2 text-sm font-semibold text-gray-600">
                                <Users size={16} />
                                <h5>Staff / Officers</h5>
                              </div>
                              <ul className="space-y-2">
                                {officer.staff.map((staffMember, sIdx) => (
                                  <li key={sIdx} className="text-sm flex justify-between items-center bg-gray-50 p-2 rounded">
                                    <span className="font-medium text-navy">{staffMember.name} <span className="text-xs text-gray-500 ml-1">({staffMember.designation})</span></span>
                                    {staffMember.intercom && (
                                      <span className="text-xs font-mono text-gray-500 bg-white px-2 py-0.5 rounded border border-gray-200">
                                        Ext: {staffMember.intercom}
                                      </span>
                                    )}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Directory;
