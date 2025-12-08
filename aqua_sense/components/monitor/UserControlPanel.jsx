'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const useCases = [
  { id: 'irrigation', name: 'Irrigation Water', icon: '🌾', color: 'emerald' },
  { id: 'freshwater', name: 'Fresh Water', icon: '💧', color: 'blue' },
  { id: 'cooling', name: 'Cooling System', icon: '❄️', color: 'cyan' },
  { id: 'unusable', name: 'Unusable', icon: '⚠️', color: 'red' }
];

export default function UserControlPanel({ predictions, onStartProcessing }) {
  const [selectedUse, setSelectedUse] = useState(null);
  const [batchNumber, setBatchNumber] = useState(1);

  const handleStart = () => {
    if (selectedUse) {
      onStartProcessing({
        intendedUse: selectedUse,
        batchNumber: batchNumber
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="glassmorphism-strong rounded-3xl p-8 border-2 border-white/30"
    >
      <h2 className="text-3xl font-display font-bold text-shakespeare-900 mb-2">
        👨‍💼 User Controls
      </h2>
      <p className="text-shakespeare-700 mb-6">Manually select intended use and batch number</p>

      <div className="space-y-6">
        {/* Intended Use Selection */}
        <div>
          <label className="block text-shakespeare-900 font-display font-semibold mb-3">
            Select Intended Use:
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {useCases.map((useCase) => {
              const prediction = predictions?.find(p => p.id === useCase.id);
              const confidence = prediction?.confidence || 0;
              
              return (
                <motion.button
                  key={useCase.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedUse(useCase)}
                  className={`glassmorphism rounded-xl p-4 text-center relative overflow-hidden transition-all duration-300 ${
                    selectedUse?.id === useCase.id 
                      ? 'border-2 border-royal-blue shadow-lg shadow-royal-blue/50' 
                      : 'border-2 border-transparent hover:border-shakespeare-400/50'
                  }`}
                >
                  {/* Selected indicator */}
                  {selectedUse?.id === useCase.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-2 right-2 w-6 h-6 bg-royal-blue rounded-full flex items-center justify-center text-white text-xs"
                    >
                      ✓
                    </motion.div>
                  )}

                  <div className="text-4xl mb-2">{useCase.icon}</div>
                  <p className="font-display font-semibold text-sm text-shakespeare-900 mb-1">
                    {useCase.name}
                  </p>
                  {confidence > 0 && (
                    <p className={`text-xs font-bold ${
                      confidence >= 80 ? 'text-emerald-600' :
                      confidence >= 60 ? 'text-aqua-teal' :
                      confidence >= 40 ? 'text-orange-accent' :
                      'text-red-600'
                    }`}>
                      AI: {confidence}%
                    </p>
                  )}

                  {/* Glow effect when selected */}
                  {selectedUse?.id === useCase.id && (
                    <div className="absolute inset-0 bg-gradient-to-br from-royal-blue/10 to-aqua-teal/10 animate-pulse"></div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Batch Number Input */}
        <div>
          <label className="block text-shakespeare-900 font-display font-semibold mb-3">
            Batch Number:
          </label>
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setBatchNumber(Math.max(1, batchNumber - 1))}
              className="glassmorphism rounded-xl w-12 h-12 flex items-center justify-center text-2xl font-bold text-shakespeare-900 hover:bg-white/30 transition-colors"
            >
              −
            </motion.button>
            
            <div className="flex-1 glassmorphism rounded-xl p-4 text-center">
              <p className="text-4xl font-display font-bold text-shakespeare-900">
                {batchNumber.toString().padStart(3, '0')}
              </p>
              <p className="text-shakespeare-700 text-sm mt-1">Current Batch</p>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setBatchNumber(batchNumber + 1)}
              className="glassmorphism rounded-xl w-12 h-12 flex items-center justify-center text-2xl font-bold text-shakespeare-900 hover:bg-white/30 transition-colors"
            >
              +
            </motion.button>
          </div>
        </div>

        {/* Start Processing Button */}
        <motion.button
          whileHover={{ scale: selectedUse ? 1.02 : 1 }}
          whileTap={{ scale: selectedUse ? 0.98 : 1 }}
          onClick={handleStart}
          disabled={!selectedUse}
          className={`w-full font-display font-bold text-xl py-4 rounded-2xl shadow-xl transition-all duration-300 relative overflow-hidden group ${
            selectedUse
              ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:shadow-2xl hover:shadow-emerald-500/50'
              : 'bg-shakespeare-300/50 text-shakespeare-600 cursor-not-allowed'
          }`}
        >
          {selectedUse && (
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          )}
          <span className="relative z-10 flex items-center justify-center gap-3">
            <span>💧</span>
            <span>Start Water Treatment Flow</span>
            <span>→</span>
          </span>
        </motion.button>
      </div>
    </motion.div>
  );
}
//usercontrol flow