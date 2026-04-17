// import HeaderWaterflow from '@/components/HeaderWaterflow';
// import LiveMetrics from '@/components/LiveMetrics';

// import LegendPanel from '@/components/LegendPanel';
// import FooterWave from '@/components/FooterWave';
// import Header from '@/components/Header';
// export default function WaterMonitor() {
//   return (
//     <main className="min-h-screen bg-gradient-to-b from-shakespeare-50 via-shakespeare-100 to-shakespeare-200 relative overflow-hidden">
//       {/* Animated water background overlay */}
//       <div className="fixed inset-0 pointer-events-none z-0">
//         <div className="absolute inset-0 opacity-30 animate-water-flow bg-gradient-to-br from-shakespeare-300/20 via-aqua-teal/20 to-shakespeare-400/20"></div>

//         {/* Floating particles */}
//         {[...Array(20)].map((_, i) => (
//           <div
//             key={i}
//             className="absolute w-2 h-2 bg-shakespeare-400/30 rounded-full animate-float-3d blur-sm"
//             style={{
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//               animationDelay: `${Math.random() * 5}s`,
//               animationDuration: `${8 + Math.random() * 4}s`
//             }}
//           />
//         ))}
//       </div>

//       {/* Content */}
//       <div className="fixed top-0 left-0 w-full z-50"><Header/></div>
//       <div className="relative z-10 pt-[90px]">

//         <HeaderWaterflow />

//         <div className="container mx-auto px-4 py-8 space-y-12">
//           <LiveMetrics />
//           <LegendPanel />
//           <PipelineFlow />
//         </div>

//         <FooterWave />
//       </div>
//     </main>
//   );
// }

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HeaderWaterflow from '@/components/HeaderWaterflow';
import FooterWave from '@/components/FooterWave';
import BatchInputPanel from '@/components/monitor/BatchInputPanel';
import MLPredictionPanel from '@/components/monitor/MLPredictionPanel';
import UserControlPanel from '@/components/monitor/UserControlPanel';
import TreatmentFlowVisualization from '@/components/monitor/TreatmentFlowVisualization';
import Header from '@/components/Header';
import ClientAuth from "@/components/auth/ClientAuth";
import PipelineFlow from '@/components/PipelineFlow';
export default function WaterMonitor() {
  const [batchData, setBatchData] = useState(null);
  const [predictions, setPredictions] = useState(null);
  const [processingData, setProcessingData] = useState(null);
  const [completedBatches, setCompletedBatches] = useState([]);
  const [currentStep, setCurrentStep] = useState('input'); // input, prediction, control, processing, complete

  // const handleStartBatch = (data) => {
  //   setBatchData(data);
  //   console.log("Batch Data Received:", data);
  //   setCurrentStep('prediction');
  // };
  const handleStartBatch = async (data) => {
    setBatchData(data);
    console.log("Batch Data Received:", data);

    // ⬇️ send to backend (this inserts into batches table)
    await fetch("/api/batches/start", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    setCurrentStep("prediction");
  };

  const handlePredictionComplete = (predictionResults) => {
    setPredictions(predictionResults);
    setCurrentStep('control');
  };

  const handleStartProcessing = (controlData) => {
    setProcessingData(controlData);
    setCurrentStep('processing');
  };

  const handleProcessingComplete = (result) => {
    setCompletedBatches(prev => [...prev, result]);
    setCurrentStep('complete');
  };

  const handleNewBatch = () => {
    setBatchData(null);
    setPredictions(null);
    setProcessingData(null);
    setCurrentStep('input');
  };

  return (
    <ClientAuth>
      <main className="min-h-screen bg-gradient-to-b from-shakespeare-50 via-shakespeare-100 to-shakespeare-200 relative overflow-hidden">
        {/* Animated water background overlay */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 opacity-30 animate-water-flow bg-gradient-to-br from-shakespeare-300/20 via-aqua-teal/20 to-shakespeare-400/20"></div>
          d
          {/* Floating particles */}
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-shakespeare-400/30 rounded-full animate-float-3d blur-sm"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${8 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="fixed top-0 left-0 w-full z-50"><Header /></div>
        <div className="relative z-10 pt-[90px]">
          <HeaderWaterflow />
          <PipelineFlow />
          <div className="container mx-auto px-4 py-8">
            {/* Progress Indicator */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 glassmorphism-strong rounded-2xl p-6 border-2 border-white/30"
            >
              <div className="flex items-center justify-between">
                {[
                  { id: 'input', label: 'Batch Input', icon: '📊' },
                  { id: 'prediction', label: 'ML Prediction', icon: '🤖' },
                  { id: 'control', label: 'User Control', icon: '👨‍💼' },
                  { id: 'processing', label: 'Treatment Flow', icon: '💧' },
                  { id: 'complete', label: 'Complete', icon: '✅' }
                ].map((step, index, arr) => (
                  <div key={step.id} className="flex items-center flex-1">
                    <div className="flex flex-col items-center flex-1">
                      <motion.div
                        animate={{
                          scale: currentStep === step.id ? 1.2 : 1,
                          backgroundColor:
                            currentStep === step.id ? 'rgb(20, 136, 181)' :
                              arr.findIndex(s => s.id === currentStep) > index ? 'rgb(74, 192, 230)' :
                                'rgb(192, 231, 247)'
                        }}
                        className="w-12 h-12 rounded-full flex items-center justify-center text-2xl mb-2 shadow-lg"
                      >
                        {step.icon}
                      </motion.div>
                      <p className={`text-xs font-semibold text-center ${currentStep === step.id ? 'text-shakespeare-900' : 'text-shakespeare-600'
                        }`}>
                        {step.label}
                      </p>
                    </div>
                    {index < arr.length - 1 && (
                      <div className="flex-1 h-1 mx-2 bg-shakespeare-300 rounded-full relative overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{
                            width: arr.findIndex(s => s.id === currentStep) > index ? '100%' : '0%'
                          }}
                          transition={{ duration: 0.5 }}
                          className="h-full bg-gradient-to-r from-shakespeare-500 to-aqua-teal"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Main Content Area */}
            <div className="space-y-8">
              {/* Step 1: Batch Input */}
              <AnimatePresence mode="wait">
                {currentStep === 'input' && (
                  <motion.div
                    key="input"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                  >
                    <BatchInputPanel onStartBatch={handleStartBatch} />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Step 2: ML Prediction */}
              <AnimatePresence mode="wait">
                {(currentStep === 'prediction' || currentStep === 'control' || currentStep === 'processing' || currentStep === 'complete') && batchData && (
                  <motion.div
                    key="prediction"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                  >
                    <MLPredictionPanel
                      batchData={batchData}
                      onPredictionComplete={handlePredictionComplete}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Step 3: User Control */}
              <AnimatePresence mode="wait">
                {(currentStep === 'control' || currentStep === 'processing' || currentStep === 'complete') && predictions && (
                  <motion.div
                    key="control"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                  >
                    <UserControlPanel
                      predictions={predictions}
                      onStartProcessing={handleStartProcessing}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Step 4: Treatment Flow Visualization */}
              <AnimatePresence mode="wait">
                {(currentStep === 'processing' || currentStep === 'complete') && (
                  <motion.div
                    key="processing"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                  >
                    <TreatmentFlowVisualization
                      processingData={processingData}
                      onComplete={handleProcessingComplete}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Step 5: Completion Summary */}
              <AnimatePresence mode="wait">
                {currentStep === 'complete' && completedBatches.length > 0 && (
                  <motion.div
                    key="complete"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="space-y-6"
                  >
                    {/* Summary Card */}
                    <div className="glassmorphism-strong rounded-3xl p-8 border-2 border-emerald-500/50 bg-emerald-500/5">
                      <div className="text-center mb-6">
                        <motion.div
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 2, ease: 'easeInOut' }}
                          className="text-8xl mb-4 inline-block"
                        >
                          🎊
                        </motion.div>
                        <h2 className="text-4xl font-display font-bold text-shakespeare-900 mb-2">
                          Batch Processing Summary
                        </h2>
                        <p className="text-shakespeare-700 text-lg">
                          Successfully completed {completedBatches.length} batch{completedBatches.length > 1 ? 'es' : ''}
                        </p>
                      </div>

                      {/* Latest batch details */}
                      {completedBatches[completedBatches.length - 1] && (
                        <div className="glassmorphism rounded-2xl p-6 mb-6">
                          <h3 className="text-2xl font-display font-bold text-shakespeare-900 mb-4">
                            Latest Batch Results
                          </h3>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="text-center">
                              <p className="text-shakespeare-600 text-sm mb-1">Batch Number</p>
                              <p className="text-3xl font-display font-bold text-royal-blue">
                                #{completedBatches[completedBatches.length - 1].batchNumber.toString().padStart(3, '0')}
                              </p>
                            </div>
                            <div className="text-center">
                              <p className="text-shakespeare-600 text-sm mb-1">Intended Use</p>
                              <p className="text-2xl">
                                {completedBatches[completedBatches.length - 1].intendedUse.icon}
                              </p>
                              <p className="text-sm font-semibold text-shakespeare-900">
                                {completedBatches[completedBatches.length - 1].intendedUse.name}
                              </p>
                            </div>
                            <div className="text-center">
                              <p className="text-shakespeare-600 text-sm mb-1">Status</p>
                              <p className="text-3xl">✅</p>
                              <p className="text-sm font-semibold text-emerald-600">Success</p>
                            </div>
                            <div className="text-center">
                              <p className="text-shakespeare-600 text-sm mb-1">Quality</p>
                              <p className="text-3xl font-display font-bold text-emerald-600">A+</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Action buttons */}
                      <div className="flex gap-4">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleNewBatch}
                          className="flex-1 bg-gradient-to-r from-royal-blue to-aqua-teal text-white font-display font-bold text-xl py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
                        >
                          🔄 Process New Batch
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex-1 glassmorphism-strong text-shakespeare-900 font-display font-bold text-xl py-4 rounded-2xl hover:bg-white/30 transition-all duration-300"
                        >
                          📊 View Full Report
                        </motion.button>
                      </div>
                    </div>

                    {/* Batch History */}
                    {completedBatches.length > 1 && (
                      <div className="glassmorphism-strong rounded-3xl p-8 border-2 border-white/30">
                        <h3 className="text-2xl font-display font-bold text-shakespeare-900 mb-4">
                          📋 Batch History
                        </h3>
                        <div className="space-y-3">
                          {completedBatches.map((batch, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="glassmorphism rounded-xl p-4 flex items-center justify-between"
                            >
                              <div className="flex items-center gap-4">
                                <div className="text-3xl">{batch.intendedUse.icon}</div>
                                <div>
                                  <p className="font-display font-semibold text-shakespeare-900">
                                    Batch #{batch.batchNumber.toString().padStart(3, '0')}
                                  </p>
                                  <p className="text-sm text-shakespeare-700">
                                    {batch.intendedUse.name}
                                  </p>
                                </div>
                              </div>
                              <div className="text-2xl">✅</div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <FooterWave />
        </div>
      </main>
    </ClientAuth>
  );
}