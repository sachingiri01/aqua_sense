'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const useCases = [
  { id: 'irrigation', name: 'Irrigation Water', icon: '🌾', color: 'emerald', requirements: { pH: [6.5, 8.5], TDS: [0, 500], turbidity: [0, 5] } },
  { id: 'freshwater', name: 'Fresh Water', icon: '💧', color: 'blue', requirements: { pH: [6.5, 8.5], TDS: [0, 300], turbidity: [0, 1] } },
  { id: 'cooling', name: 'Cooling System', icon: '❄️', color: 'cyan', requirements: { pH: [6.0, 9.0], TDS: [0, 600], turbidity: [0, 10] } },
  { id: 'unusable', name: 'Unusable', icon: '⚠️', color: 'red', requirements: null }
];
const labelMap = {
  irrigation: { icon: "🌾", name: "Irrigation Water" },
  cooling: { icon: "❄️", name: "Cooling System" },
  freshwater: { icon: "💧", name: "Fresh Water" },
  not_usable: { icon: "⚠️", name: "Unusable" },
  unusable: { icon: "⚠️", name: "Unusable" },

  potable_high_quality_reuse: { 
    icon: "🚰",
    name: "Potable High Quality Reuse"
  }
};


function calculateConfidence(batchData, useCase) {
  console.log("the data recieved from the prv catch ",batchData);
  
  if (!useCase.requirements) return 0;
  
  let score = 0;
  let total = 0;
  
  Object.entries(useCase.requirements).forEach(([key, [min, max]]) => {
    if (batchData[key] !== undefined) {
      const value = parseFloat(batchData[key]);
      const inRange = value >= min && value <= max;
      if (inRange) score++;
      total++;
    }
  });
  
  return total > 0 ? Math.round((score / total) * 100) : 0;
}

export default function MLPredictionPanel({ batchData, onPredictionComplete }) {
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [predictions, setPredictions] = useState([]);
  const [recommendedUse, setRecommendedUse] = useState(null);
   const fetchPrediction = async (batchData) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/pridiction_start`;

    const payload = {
      pH: batchData.pH,
      turbidity_NTU: batchData.turbidity,
      temperature_C: batchData.temperature,
      DO_mg_L: batchData.DO,
      conductivity_uS_cm: batchData.flowRate,
      TDS_mg_L: batchData.TDS
    };

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!res.ok) throw new Error("Backend prediction failed");

    return await res.json();

  } catch (err) {
    console.error("Prediction Error:", err);
    return null;
  }
};

  useEffect(() => {
  if (!batchData) return;

  setIsAnalyzing(true);

  const timer = setTimeout(async () => {
    const prediction = await fetchPrediction(batchData);
    if (!prediction) {
      setIsAnalyzing(false);
      return;
    }

    const formatLabel = (label) => {
      return label
        .replace(/_/g, " ")
        .replace(/\b\w/g, c => c.toUpperCase());
    };

    const conf = prediction.category_confidence;
    
    const formatted = conf.map((item, index) => {
  const rawLabel = item.label;
  const mapped = labelMap[rawLabel] || {
    icon: "❓",
    name: formatLabel(rawLabel)
  };

  return {
    id: index,
    name: mapped.name,
    icon: mapped.icon,
    confidence: +(item.confidence*100).toFixed(2)
  };
});

    setPredictions(formatted);
    setRecommendedUse(formatted[0].name); // Recommended use is formatted label

    setIsAnalyzing(false);

    if (onPredictionComplete) {
      onPredictionComplete(formatted);
    }

  }, 800);

  return () => clearTimeout(timer);

}, [batchData]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="glassmorphism-strong rounded-3xl p-8 border-2 border-white/30 relative overflow-hidden"
    >
      {/* Animated background for ML processing */}
      <AnimatePresence>
        {isAnalyzing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gradient-to-br from-royal-blue/10 via-aqua-teal/10 to-shakespeare-400/10 animate-water-flow"
          />
        )}
      </AnimatePresence>

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <motion.div
            animate={isAnalyzing ? { rotate: 360 } : {}}
            transition={{ duration: 2, repeat: isAnalyzing ? Infinity : 0, ease: 'linear' }}
            className="text-4xl"
          >
            🤖
          </motion.div>
          <div>
            <h2 className="text-3xl font-display font-bold text-shakespeare-900">
              {isAnalyzing ? 'Analyzing with ML Model...' : 'AI Prediction Complete'}
            </h2>
            <p className="text-shakespeare-700">
              {isAnalyzing ? 'Deep learning model processing water quality data' : 'Confidence-based water use recommendations'}
            </p>
          </div>
        </div>

        {isAnalyzing ? (
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: [0.3, 1, 0.3], x: 0 }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                className="glassmorphism rounded-xl p-4 h-20"
              />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {predictions.map((prediction, index) => (
              <motion.div
                key={prediction.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`glassmorphism rounded-xl p-5 relative overflow-hidden group ${
                  index === 0 ? 'border-2 border-royal-blue shadow-lg shadow-royal-blue/30' : ''
                }`}
              >
                {/* Recommended badge */}
                {index === 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-3 right-3 bg-gradient-to-r from-royal-blue to-aqua-teal text-white px-3 py-1 rounded-full text-xs font-bold uppercase"
                  >
                    ⭐ Recommended
                  </motion.div>
                )}

                <div className="flex items-center gap-4">
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 15 }}
                    className="text-5xl"
                  >
                    {prediction.icon}
                  </motion.div>

                  <div className="flex-1">
                    <h3 className="text-xl font-display font-bold text-shakespeare-900 mb-2">
                      {prediction.name}
                    </h3>
                    
                    {/* Confidence bar */}
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-3 bg-shakespeare-200/50 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${prediction.confidence}%` }}
                          transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                          className={`h-full rounded-full ${
                            prediction.confidence >= 80 ? 'bg-gradient-to-r from-emerald-400 to-emerald-600' :
                            prediction.confidence >= 60 ? 'bg-gradient-to-r from-aqua-teal to-shakespeare-500' :
                            prediction.confidence >= 40 ? 'bg-gradient-to-r from-orange-accent to-orange-500' :
                            'bg-gradient-to-r from-red-500 to-red-700'
                          }`}
                        />
                      </div>
                      <motion.span
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 + 0.8 }}
                        className={`text-2xl font-display font-bold ${
                          prediction.confidence >= 80 ? 'text-emerald-600' :
                          prediction.confidence >= 60 ? 'text-aqua-teal' :
                          prediction.confidence >= 40 ? 'text-orange-accent' :
                          'text-red-600'
                        }`}
                      >
                      {(prediction.confidence).toFixed(2)}%
                      </motion.span>
                    </div>
                  </div>
                </div>

                {/* Glow effect on hover */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 blur-xl bg-gradient-to-br ${
                  prediction.confidence >= 80 ? 'from-emerald-400 to-emerald-600' :
                  prediction.confidence >= 60 ? 'from-aqua-teal to-shakespeare-500' :
                  'from-red-500 to-red-700'
                } transition-opacity duration-500 pointer-events-none`}></div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
