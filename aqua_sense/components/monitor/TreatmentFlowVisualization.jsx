// 'use client';

// import { motion, AnimatePresence } from 'framer-motion';
// import { useState, useEffect } from 'react';

// const treatmentStages = [
//   {
//     id: 'primary',
//     name: 'Primary Filtration',
//     icon: '🔷',
//     description: 'Removing large particles and sediments',
//     duration: 8000, // 8 seconds
//     requirements: {
//       turbidity: { target: '<5 NTU', max: 5 },
//       particleSize: { target: '<100μm', max: 100 }
//     }
//   },
//   {
//     id: 'secondary',
//     name: 'Secondary Treatment',
//     icon: '⚗️',
//     description: 'Chemical treatment and disinfection',
//     duration: 10000, // 10 seconds
//     requirements: {
//       pH: { target: '6.5-8.5', min: 6.5, max: 8.5 },
//       TDS: { target: '<400 ppm', max: 400 },
//       bacteria: { target: '<10 CFU/mL', max: 10 }
//     }
//   },
//   {
//     id: 'final',
//     name: 'Final Polishing',
//     icon: '✨',
//     description: 'Advanced filtration for intended use',
//     duration: 6000, // 6 seconds
//     requirements: {
//       turbidity: { target: '<1 NTU', max: 1 },
//       clarity: { target: '>95%', min: 95 },
//       compliance: { target: '100%', min: 100 }
//     }
//   }
// ];

// // NEW: Realistic Water Flow Animation Component
// function RealisticWaterFlow({ isActive, stageColor = 'royal-blue' }) {
//   if (!isActive) return null;

//   return (
//     <div className="relative w-full h-32 overflow-hidden">
//       {/* Water container with glass effect */}
//       <div className="absolute inset-0 glassmorphism-strong rounded-3xl border-4 border-shakespeare-400/30 overflow-hidden">
//         {/* Animated liquid water with wave effect */}
//         <motion.div
//           className="absolute bottom-0 left-0 right-0 h-full bg-gradient-to-t from-royal-blue via-aqua-teal to-shakespeare-400"
//           animate={{
//             height: ['0%', '100%', '100%'],
//           }}
//           transition={{
//             duration: 2,
//             times: [0, 0.7, 1],
//             ease: 'easeInOut'
//           }}
//         >
//           {/* Wave surface animation */}
//           <svg className="absolute top-0 left-0 w-full h-16" viewBox="0 0 1200 120" preserveAspectRatio="none">
//             <motion.path
//               d="M0,60 C300,90 600,30 900,60 C1050,75 1125,60 1200,60 L1200,120 L0,120 Z"
//               fill="rgba(74, 192, 230, 0.3)"
//               animate={{
//                 d: [
//                   "M0,60 C300,90 600,30 900,60 C1050,75 1125,60 1200,60 L1200,120 L0,120 Z",
//                   "M0,60 C300,30 600,90 900,60 C1050,45 1125,75 1200,60 L1200,120 L0,120 Z",
//                   "M0,60 C300,90 600,30 900,60 C1050,75 1125,60 1200,60 L1200,120 L0,120 Z"
//                 ]
//               }}
//               transition={{
//                 duration: 3,
//                 repeat: Infinity,
//                 ease: 'easeInOut'
//               }}
//             />
//           </svg>

//           {/* Flowing water particles */}
//           {[...Array(30)].map((_, i) => (
//             <motion.div
//               key={i}
//               className="absolute w-3 h-3 bg-white/40 rounded-full backdrop-blur-sm"
//               style={{
//                 left: `${Math.random() * 100}%`,
//                 top: `${Math.random() * 100}%`,
//               }}
//               animate={{
//                 x: [0, Math.random() * 100 - 50],
//                 y: [0, Math.random() * 80 - 40],
//                 scale: [1, Math.random() * 1.5 + 0.5, 1],
//                 opacity: [0.3, 0.7, 0.3]
//               }}
//               transition={{
//                 duration: Math.random() * 3 + 2,
//                 repeat: Infinity,
//                 delay: Math.random() * 2,
//                 ease: 'easeInOut'
//               }}
//             />
//           ))}

//           {/* Bubbles rising through water */}
//           {[...Array(15)].map((_, i) => (
//             <motion.div
//               key={`bubble-${i}`}
//               className="absolute w-2 h-2 bg-white/60 rounded-full"
//               style={{
//                 left: `${Math.random() * 100}%`,
//                 bottom: 0,
//               }}
//               animate={{
//                 y: [-120, -400],
//                 x: [0, Math.random() * 40 - 20],
//                 scale: [0.5, 1.2, 0.8],
//                 opacity: [0, 0.8, 0]
//               }}
//               transition={{
//                 duration: Math.random() * 4 + 3,
//                 repeat: Infinity,
//                 delay: Math.random() * 3,
//                 ease: 'linear'
//               }}
//             />
//           ))}

//           {/* Caustic light patterns */}
//           <motion.div
//             className="absolute inset-0 opacity-30"
//             style={{
//               background: `
//                 radial-gradient(ellipse at 20% 40%, rgba(255, 255, 255, 0.4) 0%, transparent 50%),
//                 radial-gradient(ellipse at 80% 60%, rgba(255, 255, 255, 0.3) 0%, transparent 50%),
//                 radial-gradient(ellipse at 50% 30%, rgba(255, 255, 255, 0.35) 0%, transparent 50%)
//               `
//             }}
//             animate={{
//               opacity: [0.2, 0.5, 0.2],
//               scale: [1, 1.1, 1]
//             }}
//             transition={{
//               duration: 4,
//               repeat: Infinity,
//               ease: 'easeInOut'
//             }}
//           />
//         </motion.div>

//         {/* Water level indicator */}
//         <motion.div
//           className="absolute right-4 top-4 glassmorphism rounded-lg px-3 py-2 z-10"
//           animate={{ opacity: [0.7, 1, 0.7] }}
//           transition={{ duration: 2, repeat: Infinity }}
//         >
//           <p className="text-xs font-bold text-shakespeare-900">💧 FLOWING</p>
//         </motion.div>
//       </div>

//       {/* Outer glow effect */}
//       <motion.div
//         className="absolute inset-0 rounded-3xl bg-gradient-to-t from-royal-blue/30 to-aqua-teal/30 blur-2xl -z-10"
//         animate={{
//           opacity: [0.5, 0.8, 0.5],
//           scale: [0.95, 1.05, 0.95]
//         }}
//         transition={{
//           duration: 3,
//           repeat: Infinity,
//           ease: 'easeInOut'
//         }}
//       />
//     </div>
//   );
// }

// function MetricCard({ metric, value, requirement, status }) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, scale: 0.8 }}
//       animate={{ opacity: 1, scale: 1 }}
//       className={`glassmorphism rounded-lg p-3 border-2 ${
//         status === 'pass' ? 'border-emerald-500/50 bg-emerald-500/10' :
//         status === 'processing' ? 'border-aqua-teal/50 bg-aqua-teal/10' :
//         'border-red-500/50 bg-red-500/10'
//       }`}
//     >
//       <div className="flex items-center justify-between mb-1">
//         <p className="text-xs font-semibold text-shakespeare-900 uppercase">{metric}</p>
//         <motion.div
//           animate={status === 'processing' ? { rotate: 360 } : {}}
//           transition={{ duration: 2, repeat: status === 'processing' ? Infinity : 0, ease: 'linear' }}
//         >
//           {status === 'pass' ? '✅' : status === 'processing' ? '⏳' : '❌'}
//         </motion.div>
//       </div>
//       <div className="flex items-baseline gap-2">
//         <p className={`text-lg font-display font-bold ${
//           status === 'pass' ? 'text-emerald-600' :
//           status === 'processing' ? 'text-aqua-teal' :
//           'text-red-600'
//         }`}>
//           {value}
//         </p>
//         <p className="text-xs text-shakespeare-700">/ {requirement}</p>
//       </div>
//     </motion.div>
//   );
// }

// function StageCard({ stage, isActive, isPassed, metrics, onFaultAlert }) {
//   const [timeAtStage, setTimeAtStage] = useState(0);
//   const [isFault, setIsFault] = useState(false);

//   useEffect(() => {
//     if (isActive) {
//       const startTime = Date.now();
//       const interval = setInterval(() => {
//         const elapsed = Date.now() - startTime;
//         setTimeAtStage(elapsed);
        
//         // Check for filter fault (taking too long)
//         if (elapsed > stage.duration * 1.5 && !isFault) {
//           setIsFault(true);
//           if (onFaultAlert) {
//             onFaultAlert(stage.id, stage.name);
//           }
//         }
//       }, 100);
      
//       return () => {
//         clearInterval(interval);
//         setTimeAtStage(0);
//       };
//     }
//   }, [isActive, stage.duration, stage.id, stage.name, isFault, onFaultAlert]);

//   const progress = isActive ? Math.min((timeAtStage / stage.duration) * 100, 100) : isPassed ? 100 : 0;

//   return (
//     <motion.div
//       initial={{ opacity: 0, scale: 0.9 }}
//       animate={{ 
//         opacity: 1, 
//         scale: isActive ? 1.05 : 1,
//         y: isActive ? [0, -5, 0] : 0
//       }}
//       transition={{
//         y: { duration: 2, repeat: isActive ? Infinity : 0, ease: 'easeInOut' }
//       }}
//       className={`glassmorphism-strong rounded-2xl p-6 border-2 relative overflow-hidden ${
//         isActive ? 'border-royal-blue shadow-2xl shadow-royal-blue/50' :
//         isPassed ? 'border-emerald-500 shadow-lg shadow-emerald-500/30' :
//         'border-white/30'
//       }`}
//     >
//       {/* Pulsing background for active stage */}
//       {isActive && (
//         <motion.div
//           animate={{ opacity: [0.1, 0.3, 0.1] }}
//           transition={{ duration: 2, repeat: Infinity }}
//           className="absolute inset-0 bg-gradient-to-br from-royal-blue/20 to-aqua-teal/20"
//         />
//       )}

//       {/* Fault alert overlay */}
//       <AnimatePresence>
//         {isFault && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: [0.5, 1, 0.5] }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.5, repeat: Infinity }}
//             className="absolute inset-0 bg-red-500/20 border-4 border-red-500"
//           >
//             <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase animate-pulse">
//               ⚠️ FILTER FAULT
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <div className="relative z-10">
//         {/* Stage header */}
//         <div className="flex items-center justify-between mb-4">
//           <div className="flex items-center gap-3">
//             <motion.div
//               animate={isActive ? { rotate: [0, 10, -10, 0] } : {}}
//               transition={{ duration: 1.5, repeat: isActive ? Infinity : 0 }}
//               className="text-4xl"
//             >
//               {stage.icon}
//             </motion.div>
//             <div>
//               <h3 className="text-xl font-display font-bold text-shakespeare-900">
//                 {stage.name}
//               </h3>
//               <p className="text-xs text-shakespeare-700">{stage.description}</p>
//             </div>
//           </div>
          
//           {isPassed && !isActive && (
//             <motion.div
//               initial={{ scale: 0, rotate: -180 }}
//               animate={{ scale: 1, rotate: 0 }}
//               className="text-3xl"
//             >
//               ✅
//             </motion.div>
//           )}
//         </div>

//         {/* Progress bar */}
//         {(isActive || isPassed) && (
//           <div className="mb-4">
//             <div className="flex items-center justify-between mb-1">
//               <p className="text-xs font-semibold text-shakespeare-700">
//                 {isActive ? 'Processing...' : 'Completed'}
//               </p>
//               <p className="text-xs font-semibold text-shakespeare-900">
//                 {isActive ? `${Math.floor(timeAtStage / 1000)}s / ${stage.duration / 1000}s` : 'Done ✓'}
//               </p>
//             </div>
//             <div className="h-2 bg-shakespeare-200/50 rounded-full overflow-hidden">
//               <motion.div
//                 initial={{ width: 0 }}
//                 animate={{ width: `${progress}%` }}
//                 className={`h-full rounded-full ${
//                   isFault ? 'bg-gradient-to-r from-red-500 to-red-700' :
//                   isPassed ? 'bg-gradient-to-r from-emerald-400 to-emerald-600' :
//                   'bg-gradient-to-r from-royal-blue to-aqua-teal'
//                 }`}
//               />
//             </div>
//           </div>
//         )}

//         {/* Metrics */}
//         {(isActive || isPassed) && metrics && (
//           <div className="grid grid-cols-2 gap-2">
//             {Object.entries(stage.requirements).map(([key, req]) => (
//               <MetricCard
//                 key={key}
//                 metric={key}
//                 value={metrics[key] || 'N/A'}
//                 requirement={req.target}
//                 status={isPassed ? 'pass' : isActive ? 'processing' : 'waiting'}
//               />
//             ))}
//           </div>
//         )}
//       </div>
//     </motion.div>
//   );
// }

// export default function TreatmentFlowVisualization({ processingData, onComplete }) {
//   const [currentStage, setCurrentStage] = useState(0);
//   const [passedStages, setPassedStages] = useState([]);
//   const [faultAlerts, setFaultAlerts] = useState([]);
//   const [stageMetrics, setStageMetrics] = useState({
//     primary: { turbidity: '3.2 NTU', particleSize: '85μm' },
//     secondary: { pH: '7.2', TDS: '350 ppm', bacteria: '5 CFU/mL' },
//     final: { turbidity: '0.8 NTU', clarity: '97%', compliance: '100%' }
//   });

//   useEffect(() => {
//     if (processingData && currentStage < treatmentStages.length) {
//       const stage = treatmentStages[currentStage];
//       const timer = setTimeout(() => {
//         setPassedStages(prev => [...prev, stage.id]);
//         setCurrentStage(prev => prev + 1);
        
//         if (currentStage === treatmentStages.length - 1) {
//           // All stages complete
//           if (onComplete) {
//             onComplete({
//               success: true,
//               finalMetrics: stageMetrics.final,
//               batchNumber: processingData.batchNumber,
//               intendedUse: processingData.intendedUse
//             });
//           }
//         }
//       }, stage.duration);
      
//       return () => clearTimeout(timer);
//     }
//   }, [currentStage, processingData, stageMetrics.final, onComplete]);

//   const handleFaultAlert = (stageId, stageName) => {
//     setFaultAlerts(prev => [...prev, { stageId, stageName, time: new Date().toLocaleTimeString() }]);
//   };

//   if (!processingData) {
//     return (
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         className="glassmorphism-strong rounded-3xl p-12 text-center border-2 border-white/30"
//       >
//         <div className="text-6xl mb-4 opacity-30">💧</div>
//         <p className="text-shakespeare-700 text-lg">
//           Waiting for batch to start processing...
//         </p>
//       </motion.div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {/* Header with batch info */}
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="glassmorphism-strong rounded-2xl p-6 border-2 border-royal-blue/30"
//       >
//         <div className="flex items-center justify-between">
//           <div>
//             <h2 className="text-2xl font-display font-bold text-shakespeare-900 mb-1">
//               Processing Batch #{processingData.batchNumber.toString().padStart(3, '0')}
//             </h2>
//             <p className="text-shakespeare-700">
//               Intended Use: <span className="font-semibold text-royal-blue">{processingData.intendedUse.icon} {processingData.intendedUse.name}</span>
//             </p>
//           </div>
//           <motion.div
//             animate={{ rotate: 360 }}
//             transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
//             className="text-5xl"
//           >
//             💧
//           </motion.div>
//         </div>
//       </motion.div>

//       {/* Fault alerts */}
//       <AnimatePresence>
//         {faultAlerts.length > 0 && (
//           <motion.div
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: 'auto' }}
//             exit={{ opacity: 0, height: 0 }}
//             className="space-y-2"
//           >
//             {faultAlerts.map((alert, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, x: -50 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 className="glassmorphism-strong rounded-xl p-4 border-2 border-red-500 bg-red-500/10"
//               >
//                 <div className="flex items-center gap-3">
//                   <motion.div
//                     animate={{ scale: [1, 1.2, 1] }}
//                     transition={{ duration: 0.5, repeat: Infinity }}
//                     className="text-3xl"
//                   >
//                     🚨
//                   </motion.div>
//                   <div>
//                     <h4 className="font-display font-bold text-red-700">
//                       Filter Fault Detected: {alert.stageName}
//                     </h4>
//                     <p className="text-sm text-red-600">
//                       Water has been at this stage for too long. Check filter status. Time: {alert.time}
//                     </p>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Treatment stages visualization */}
//       <div className="relative">
//         <div className="space-y-8">
//           {treatmentStages.map((stage, index) => (
//             <div key={stage.id} className="relative">
//               <StageCard
//                 stage={stage}
//                 isActive={currentStage === index}
//                 isPassed={passedStages.includes(stage.id)}
//                 metrics={stageMetrics[stage.id]}
//                 onFaultAlert={handleFaultAlert}
//               />

//               {/* NEW: Realistic Water Flow Animation between stages */}
//               {index < treatmentStages.length - 1 && (
//                 <div className="my-6 px-4 md:px-12">
//                   <RealisticWaterFlow 
//                     isActive={passedStages.includes(stage.id) || currentStage === index}
//                   />
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>

//         {/* Completion celebration */}
//         {currentStage === treatmentStages.length && (
//           <motion.div
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             className="mt-8 glassmorphism-strong rounded-3xl p-8 border-2 border-emerald-500 bg-emerald-500/10 text-center"
//           >
//             <motion.div
//               animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
//               transition={{ duration: 1, repeat: Infinity }}
//               className="text-7xl mb-4"
//             >
//               🎉
//             </motion.div>
//             <h2 className="text-4xl font-display font-bold text-emerald-700 mb-2">
//               Treatment Complete!
//             </h2>
//             <p className="text-emerald-600 text-lg">
//               Water successfully processed and ready for <strong>{processingData.intendedUse.name}</strong>
//             </p>
//           </motion.div>
//         )}
//       </div>
//     </div>
//   );
// }



// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// /* -------------------------
//   Config: treatment stages (kept from your original)
// ------------------------- */
// const treatmentStages = [
//   {
//     id: "primary",
//     name: "Primary Filtration",
//     icon: "🔷",
//     description: "Removing large particles and sediments",
//     duration: 3000 // fallback duration (ms) if needed
//   },
//   {
//     id: "secondary",
//     name: "Secondary Treatment",
//     icon: "⚗️",
//     description: "Chemical treatment and disinfection",
//     duration: 3000
//   },
//   {
//     id: "final",
//     name: "Final Polishing",
//     icon: "✨",
//     description: "Advanced filtration for intended use",
//     duration: 3000
//   }
// ];

// const categoryStageRequirements = {
//   irrigation: {
//     primary: {
//       flow: [5, 200],
//       level: [0, 100],
//       turbidity: [0, 2000],
//       pressure: [0, 200],
//       temperature: [0, 60]
//     },
//     secondary: {
//       do: [1, 12],
//       ph: [6.0, 9.0],
//       orp: [-500, 1000],
//       tss_mlss: [0, 1500],
//       ammonia: [0, 20],
//       sludge_level: [0, 100],
//       secondary_flow: [0.1, 500]
//     },
//     final: {
//       conductivity: [0, 10000],
//       tds: [0, 5000],
//       nitrate: [0, 500],
//       residual_chlorine: [0, 5],
//       turbidity_final: [0, 50],
//       differential_pressure: [0, 1000],
//       salinity: [0, 50],
//       oil_in_water: [0, 200],
//       uvt: [0, 100]
//     }
//   },

//   freshwater: {
//     primary: {
//       flow: [5, 150],
//       level: [10, 100],
//       turbidity: [0, 1000],
//       pressure: [0, 150],
//       temperature: [0, 40]
//     },
//     secondary: {
//       do: [4, 14],
//       ph: [6.5, 8.5],
//       orp: [-500, 1000],
//       tss_mlss: [0, 500],
//       ammonia: [0, 8],
//       sludge_level: [0, 100],
//       secondary_flow: [0.1, 500]
//     },
//     final: {
//       conductivity: [0, 3000],
//       tds: [0, 1000],
//       nitrate: [0, 50],
//       residual_chlorine: [0, 2],
//       turbidity_final: [0, 5],
//       differential_pressure: [0, 500],
//       salinity: [0, 10],
//       oil_in_water: [0, 50],
//       uvt: [50, 100]
//     }
//   },

//   cooling: {
//     primary: {
//       flow: [10, 300],
//       level: [0, 100],
//       turbidity: [0, 3000],
//       pressure: [0, 300],
//       temperature: [0, 80]
//     },
//     secondary: {
//       do: [0.5, 12],
//       ph: [6.0, 9.0],
//       orp: [-500, 1000],
//       tss_mlss: [0, 2000],
//       ammonia: [0, 30],
//       sludge_level: [0, 100],
//       secondary_flow: [0.1, 1000]
//     },
//     final: {
//       conductivity: [0, 10000],
//       tds: [0, 5000],
//       nitrate: [0, 200],
//       residual_chlorine: [0, 5],
//       turbidity_final: [0, 20],
//       differential_pressure: [0, 1000],
//       salinity: [0, 35],
//       oil_in_water: [0, 200],
//       uvt: [0, 100]
//     }
//   },

//   unusable: {
//     primary: {},
//     secondary: {},
//     final: {}
//   }
// };


// function isStageComplete(stageReq = {}, sensorData = {}) {

//   if (!stageReq || Object.keys(stageReq).length === 0) return true;

//   for (const key of Object.keys(stageReq)) {
//     const range = stageReq[key];
//     const val = sensorData[key];

//     if (val === undefined || val === null || Number.isNaN(Number(val))) {
//       return false;
//     }

//     const num = Number(val);
//     const [min, max] = range;
//     if (num < min || num > max) return false;
//   }
//   return true;
// }


// function RealisticWaterFlow({ isActive }) {
//   if (!isActive) return null;
//   return (
//     <div className="relative w-full h-32 overflow-hidden">
//       <div className="absolute inset-0 rounded-3xl overflow-hidden" style={{
//         background: "linear-gradient(180deg, rgba(14,165,233,0.08), rgba(59,130,246,0.06))",
//         border: "1px solid rgba(255,255,255,0.06)"
//       }}>
//         <motion.div
//           className="absolute bottom-0 left-0 right-0 h-full"
//           animate={{ height: ["0%", "100%", "100%"] }}
//           transition={{ duration: 2, times: [0, .7, 1], ease: "easeInOut" }}
//           style={{ background: "linear-gradient(to top, rgba(59,130,246,0.9), rgba(56,189,248,0.5))" }}
//         >
//           {/* simple wave SVG */}
//           <svg className="absolute top-0 left-0 w-full h-16" viewBox="0 0 1200 120" preserveAspectRatio="none">
//             <motion.path
//               d="M0,60 C300,90 600,30 900,60 C1050,75 1125,60 1200,60 L1200,120 L0,120 Z"
//               fill="rgba(255,255,255,0.12)"
//               animate={{ d: [
//                 "M0,60 C300,90 600,30 900,60 C1050,75 1125,60 1200,60 L1200,120 L0,120 Z",
//                 "M0,60 C300,30 600,90 900,60 C1050,45 1125,75 1200,60 L1200,120 L0,120 Z",
//                 "M0,60 C300,90 600,30 900,60 C1050,75 1125,60 1200,60 L1200,120 L0,120 Z"
//               ]}}
//               transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
//             />
//           </svg>
//         </motion.div>
//       </div>
//     </div>
//   );
// }

// function MetricCard({ metric, value, requirement, status }) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, scale: .95 }}
//       animate={{ opacity: 1, scale: 1 }}
//       className={`rounded-lg p-3 border-2`}
//       style={{
//         borderColor: status === "pass" ? "rgba(34,197,94,0.45)" : status === "processing" ? "rgba(56,189,248,0.25)" : "rgba(239,68,68,0.45)",
//         background: status === "pass" ? "rgba(34,197,94,0.06)" : status === "processing" ? "rgba(56,189,248,0.04)" : "rgba(239,68,68,0.04)"
//       }}
//     >
//       <div className="flex items-center justify-between mb-1">
//         <p className="text-xs font-semibold uppercase">{metric}</p>
//         <div>{status === "pass" ? "✅" : status === "processing" ? "⏳" : "❌"}</div>
//       </div>
//       <div className="flex items-baseline gap-2">
//         <p style={{ fontWeight: 700, fontSize: "1.1rem" }}>{value}</p>
//         <p className="text-xs" style={{ opacity: .7 }}>{requirement}</p>
//       </div>
//     </motion.div>
//   );
// }


// export default function TreatmentFlowPage({ processingData, onComplete }) {
  
//   const defaultProcessing = processingData || {
//     batchNumber: 1,
//     intendedUse: { id: "irrigation", name: "Irrigation", icon: "🌾" }
//   };
//   const completeRef = useRef(null);

//   const [currentStage, setCurrentStage] = useState(0);
//   const [passedStages, setPassedStages] = useState([]);
//   const [faultAlerts, setFaultAlerts] = useState([]);
//   const [stageMetrics, setStageMetrics] = useState({ primary: {}, secondary: {}, final: {} });
//   const [isProcessing, setIsProcessing] = useState(Boolean(processingData));

//   // refs to hold latest sensor objects (avoid re-render flood)
//   const primaryRef = useRef(null);
//   const secondaryRef = useRef(null);
//   const tertiaryRef = useRef(null);

//   // SSE event sources refs so we can close them
//   const primaryES = useRef(null);
//   const secondaryES = useRef(null);
//   const tertiaryES = useRef(null);

//   const selectedCategory = (processingData && processingData.intendedUse && processingData.intendedUse.id) || defaultProcessing.intendedUse.id;

//    const stageRefs = useRef({
//   primary: null,
//   secondary: null,
//   final: null
// });

// if (currentStage === treatmentStages.length) {
//   completeRef.current?.scrollIntoView({
//     behavior: "smooth",
//     block: "center"
//   });
// }
//   useEffect(() => {
//   const stage = treatmentStages[currentStage];
//   if (!stage) return;

//   const ref = stageRefs.current[stage.id];
//   if (ref) {
//     ref.scrollIntoView({
//       behavior: "smooth",
//       block: "center"
//     });
//   }
// }, [currentStage]);

//   useEffect(() => {
//     const base = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

//     try {
//       primaryES.current = new EventSource(`${base}/primary_sensors/stream`);
//       primaryES.current.onmessage = (e) => {
//         if (!e.data || e.data.trim() === "") return;
//         try {
//           const parsed = JSON.parse(e.data.replace(/'/g, '"'));
//           // update ref
//           primaryRef.current = parsed;
//           // map values for stageMetrics display
//           setStageMetrics((prev) => ({
//             ...prev,
//             primary: {
//               flow: parsed.flow ?? prev.primary.flow,
//               level: parsed.level ?? prev.primary.level,
//               turbidity: parsed.turbidity ?? prev.primary.turbidity,
//               pressure: parsed.pressure ?? prev.primary.pressure,
//               temperature: parsed.temperature ?? prev.primary.temperature
//             }
//           }));
//         } catch (err) {
//           console.error("Primary SSE parse error", err, e.data);
//         }
//       };
//     } catch (err) {
//       console.error("Primary SSE failed", err);
//     }

//     // SECONDARY SSE
//     try {
//       secondaryES.current = new EventSource(`${base}/secondary_sensors/stream`);
//       secondaryES.current.onmessage = (e) => {
//         if (!e.data || e.data.trim() === "") return;
//         try {
//           const parsed = JSON.parse(e.data.replace(/'/g, '"'));
//           secondaryRef.current = {
//   do: Number(parsed.do),
//   ph: Number(parsed.ph),
//   orp: Number(parsed.orp),
//   tss_mlss: Number(parsed.tss_mlss),
//   ammonia: Number(parsed.ammonia),
//   sludge_level: Number(parsed.sludge_level),
//   secondary_flow: Number(parsed.secondary_flow)
// };

//           setStageMetrics((prev) => ({
//             ...prev,
//             secondary: {
//               ph: parsed.ph ?? prev.secondary.ph,
//               do: parsed.do ?? prev.secondary.do,
//               orp: parsed.orp ?? prev.secondary.orp,
//               tss_mlss: parsed.tss_mlss ?? prev.secondary.tss_mlss,
//               ammonia: parsed.ammonia ?? prev.secondary.ammonia,
//               sludge_level: parsed.sludge_level ?? prev.secondary.sludge_level,
//               secondary_flow: parsed.secondary_flow ?? prev.secondary.secondary_flow
//             }
//           }));
//         } catch (err) {
//           console.error("Secondary SSE parse error", err, e.data);
//         }
//       };
//     } catch (err) {
//       console.error("Secondary SSE failed", err);
//     }

//     // TERTIARY / FINAL SSE
//     try {
//       tertiaryES.current = new EventSource(`${base}/tertiary_sensors/stream`);
//       tertiaryES.current.onmessage = (e) => {
//         if (!e.data || e.data.trim() === "") return;
//         try {
//           const parsed = JSON.parse(e.data.replace(/'/g, '"'));
//           tertiaryRef.current = parsed;
//           setStageMetrics((prev) => ({
//             ...prev,
//             final: {
//               conductivity: parsed.conductivity ?? prev.final.conductivity,
//               tds: parsed.tds ?? prev.final.tds,
//               nitrate: parsed.nitrate ?? prev.final.nitrate,
//               residual_chlorine: parsed.residual_chlorine ?? prev.final.residual_chlorine,
//               turbidity_final: parsed.turbidity_final ?? prev.final.turbidity_final,
//               differential_pressure: parsed.differential_pressure ?? prev.final.differential_pressure,
//               salinity: parsed.salinity ?? prev.final.salinity,
//               oil_in_water: parsed.oil_in_water ?? prev.final.oil_in_water,
//               uvt: parsed.uvt ?? prev.final.uvt
//             }
//           }));
//         } catch (err) {
//           console.error("Tertiary SSE parse error", err, e.data);
//         }
//       };
//     } catch (err) {
//       console.error("Tertiary SSE failed", err);
//     }

//     return () => {
//       // cleanup
//       try { primaryES.current && primaryES.current.close(); } catch(_) {}
//       try { secondaryES.current && secondaryES.current.close(); } catch(_) {}
//       try { tertiaryES.current && tertiaryES.current.close(); } catch(_) {}
//     };
//   }, []); // run once

//   /* -------------------------
//     Stage progression checker
//     We periodically (once/sec) check if the current stage's required
//     parameters (for the selected category) are satisfied by latest sensor data.
//   ------------------------- */
//   useEffect(() => {
//     if (!isProcessing) return;

//     const interval = setInterval(() => {
//       // If already finished all stages, do nothing
//       if (currentStage >= treatmentStages.length) return;

//       const stage = treatmentStages[currentStage];
//       const stageId = stage.id;
//       const stageReq = (categoryStageRequirements[selectedCategory] && categoryStageRequirements[selectedCategory][stageId]) || {};

//       // Select the correct sensor data object
//       let sensorDataForStage = {};
//       if (stageId === "primary") sensorDataForStage = primaryRef.current || {};
//       if (stageId === "secondary") sensorDataForStage = secondaryRef.current || {};
//       if (stageId === "final") sensorDataForStage = tertiaryRef.current || {};

//       // Quick guard: if no sensor data yet, skip
//       if (!sensorDataForStage || Object.keys(sensorDataForStage).length === 0) return;

//       // Check completeness
//       const complete = isStageComplete(stageReq, sensorDataForStage);

//       if (complete) {
//         // mark passed, advance
//         setPassedStages(prev => {
//           if (prev.includes(stageId)) return prev;
//           return [...prev, stageId];
//         });

//         setCurrentStage(prev => prev + 1);

//         // If completed final stage
//         if (stageId === "final") {
//           setIsProcessing(false);
//           if (onComplete) {
//             onComplete({
//               success: true,
//               finalMetrics: stageMetrics.final,
//               batchNumber: defaultProcessing.batchNumber,
//               intendedUse: defaultProcessing.intendedUse
//             });
//           }
//         }
//       } else {
//         // if not complete and taking too long -> optional fault logic
//         // (you can implement a timer for faults per stage if needed)
//       }

//     }, 1000);

//     return () => clearInterval(interval);
//   }, [isProcessing, currentStage, selectedCategory, stageMetrics, onComplete]);

//   /* -------------------------
//     Fault alert helper (called from StageCard in original sample)
//   ------------------------- */
//   const handleFaultAlert = (stageId, stageName) => {
//     setFaultAlerts(prev => [...prev, { stageId, stageName, time: new Date().toLocaleTimeString() }]);
//   };

//   /* -------------------------
//     Render
//   ------------------------- */
//   if (!isProcessing && passedStages.length === 0) {
//     // If not processing and nothing done yet, show waiting or allow start.
//     return (
//       <div className="glassmorphism-strong rounded-3xl p-12 text-center border-2 border-white/30">
//         <div className="text-6xl mb-4 opacity-30">💧</div>
//         <p className="text-shakespeare-700 text-lg">Waiting for batch to start processing...</p>

//         <div style={{ marginTop: 20 }}>
//           <button
//             onClick={() => { setIsProcessing(true); setCurrentStage(0); setPassedStages([]); setFaultAlerts([]); }}
//             style={{ padding: "8px 14px", background: "#38bdf8", borderRadius: 8, color: "#042A2B", fontWeight: 700 }}
//           >
//             Start Processing
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="glassmorphism-strong rounded-2xl p-6 border-2 border-royal-blue/30">
//         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//           <div>
//             <h2 style={{ fontSize: "1.25rem", fontWeight: 800 }}>
//               Processing Batch #{String(defaultProcessing.batchNumber).padStart(3, "0")}
//             </h2>
//             <p style={{ color: "#0f172a" }}>
//               Intended Use: <strong>{defaultProcessing.intendedUse.icon} {defaultProcessing.intendedUse.name}</strong>
//             </p>
//           </div>
//           <div style={{ fontSize: "1.8rem" }}>💧</div>
//         </div>
//       </motion.div>

//       {/* Fault alerts */}
//       <AnimatePresence>
//         {faultAlerts.length > 0 && (
//           <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
//             {faultAlerts.map((alert, idx) => (
//               <div key={`alert-${idx}`} style={{ marginBottom: 8 }} className="glassmorphism-strong rounded-xl p-4 border-2" >
//                 <div style={{ display: "flex", gap: 12 }}>
//                   <div style={{ fontSize: 24 }}>🚨</div>
//                   <div>
//                     <div style={{ fontWeight: 800, color: "#b91c1c" }}>Filter Fault Detected: {alert.stageName}</div>
//                     <div style={{ color: "#b91c1c" }}>Time: {alert.time}</div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Stage cards + flows */}
//       <div className="relative">
//         <div className="space-y-8">
//           {treatmentStages.map((stage, index) => {
//             const isActive = currentStage === index && isProcessing;
//             const isPassed = passedStages.includes(stage.id);

//             // Choose metrics to show based on stage
//             const metrics = stage.id === "primary" ? stageMetrics.primary :
//                             stage.id === "secondary" ? stageMetrics.secondary :
//                             stageMetrics.final;

//             // Build metric cards for display: take all keys from stage requirements for chosen category
//             const stageReq = (categoryStageRequirements[selectedCategory] && categoryStageRequirements[selectedCategory][stage.id]) || {};
//             const metricKeys = Object.keys(stageReq);

//             return (
//               <div key={stage.id} ref={el => (stageRefs.current[stage.id] = el)} >
//                 <div className={`glassmorphism-strong rounded-2xl p-6 border-2 relative ${isActive ? "shadow-2xl" : isPassed ? "" : ""}`}>
//                   <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
//                     <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
//                       <div style={{ fontSize: 28 }}>{stage.icon}</div>
//                       <div>
//                         <div style={{ fontWeight: 800 }}>{stage.name}</div>
//                         <div style={{ color: "#475569" }}>{stage.description}</div>
//                       </div>
//                     </div>
//                     <div>
//                       {isPassed && !isActive ? <div style={{ fontSize: 22 }}>✅</div> : null}
//                     </div>
//                   </div>

//                   {/* Progress + flow */}
//                   { (isActive || isPassed) && (
//                     <>
//                       <div style={{ marginBottom: 12 }}>
//                         <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
//                           <div style={{ fontSize: 12, fontWeight: 700, color: "#374151" }}>{isActive ? "Processing..." : "Completed"}</div>
//                           <div style={{ fontSize: 12, color: "#111827" }}>{isActive ? "Live" : (isPassed ? "Done ✓" : "")}</div>
//                         </div>

//                         <div style={{ height: 8, background: "rgba(15,23,42,0.07)", borderRadius: 6, overflow: "hidden" }}>
//                           <motion.div initial={{ width: 0 }} animate={{ width: isPassed ? "100%" : isActive ? "60%" : "0%" }} style={{ height: "100%", background: isPassed ? "linear-gradient(90deg,#4ade80,#16a34a)" : "linear-gradient(90deg,#60a5fa,#34d399)" }} />
//                         </div>
//                       </div>

//                       {/* Metrics grid */}
//                       <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0,1fr))", gap: 10 }}>
//                         {metricKeys.length > 0 ? metricKeys.map((k) => {
//                           const req = stageReq[k];
//                           const displayVal = metrics && metrics[k] !== undefined ? metrics[k] : "N/A";
//                           const requirementText = Array.isArray(req) ? `${req[0]} - ${req[1]}` : "—";
//                           const status = isPassed ? "pass" : isActive ? (displayVal === "N/A" ? "processing" : (displayVal >= req[0] && displayVal <= req[1] ? "pass" : "processing")) : "waiting";

//                           return (
//                             <MetricCard
//                               key={`${stage.id}-${k}`}
//                               metric={k}
//                               value={displayVal}
//                               requirement={requirementText}
//                               status={status}
//                             />
//                           );
//                         }) : (
//                           <div key={`${stage.id}-nometrics`} style={{ gridColumn: "1 / -1" }}>
//                             <p>No metrics configured for this category-stage</p>
//                           </div>
//                         )}
//                       </div>
//                     </>
//                   )}
//                 </div>

//                 {/* Water flow animation between stages */}
//                 {index < treatmentStages.length - 1 && (
//                   <div style={{ margin: "24px 0" }}>
//                     <RealisticWaterFlow isActive={isActive || isPassed} />
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>

//         {/* Completion celebration */}
//         {currentStage >= treatmentStages.length && (
//           <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mt-8 glassmorphism-strong rounded-3xl p-8 border-2">
//             <div style={{ fontSize: 48, marginBottom: 8 }}>🎉</div>
//             <h2 style={{ fontSize: 28, fontWeight: 800 }}>Treatment Complete!</h2>
//             <p style={{ color: "#16a34a" }}>
//               Water successfully processed and ready for <strong>{defaultProcessing.intendedUse.name}</strong>
//             </p>
//           </motion.div>
//         )}
//       </div>
//     </div>
//   );
// }




// 




"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ===========================
   CONFIG: stages + thresholds
   =========================== */
const treatmentStages = [
  { 
    id: "primary", 
    name: "Primary Filtration", 
    icon: "🔷", 
    duration: 3000,
    wastage: [
      { type: "Screenings & Grit", description: "Solid debris", waterLoss: "<0.1%" },
      { type: "Filter Backwash", description: "Cleaning cycles", waterLoss: "2-5%" },
      { type: "Settling Tank Sludge", description: "Primary sludge", waterLoss: "0.5-1%" }
    ],
    efficiency: "85% to 90%"
  },
  { 
    id: "secondary", 
    name: "Secondary Treatment", 
    icon: "⚗️", 
    duration: 3000,
    wastage: [
      { type: "Waste Activated Sludge (WAS)", description: "Extra biomass", waterLoss: "0.5-2%" },
      { type: "Foam & Scum", description: "Biological froth", waterLoss: "<0.1%" },
      { type: "Evaporation", description: "From aeration tanks", waterLoss: "0.1-0.3%" },
      { type: "Sampling & drainage", description: "Testing losses", waterLoss: "<0.1%" },
      { type: "Clarifier overflow loss", description: "Process loss", waterLoss: "0.1-0.3%" }
    ],
    efficiency: "90% to 99%"
  },
  { 
    id: "final", 
    name: "Final Polishing", 
    icon: "✨", 
    duration: 3000,
    wastage: [
      { type: "Membrane/Filter Backwash", description: "RO/UF cleaning", waterLoss: "5-15%" },
      { type: "UV System Flushing", description: "Maintenance flush", waterLoss: "<0.1%" },
      { type: "Chemical Dosing Residue", description: "Treatment byproduct", waterLoss: "<0.1%" },
      { type: "Final Filter Rinse", description: "Polishing filter", waterLoss: "0.5-1%" }
    ],
    efficiency: "95% to 99.9%"
  }
];

// Category-stage thresholds (sensible defaults — tweak as needed)
const categoryStageRequirements = {
  irrigation: {
    primary: { flow: [5, 200], level: [0, 100], turbidity: [0, 2000], pressure: [0, 200], temperature: [0, 60] },
    secondary: { do: [0, 12], ph: [6, 9], orp: [-500, 1000], tss_mlss: [0, 1500], ammonia: [0, 20], sludge_level: [0, 100], secondary_flow: [0.1, 500] },
    final: { conductivity: [0, 10000], tds: [0, 5000], nitrate: [0, 500], residual_chlorine: [0, 5], turbidity_final: [0, 50], differential_pressure: [0, 1000], salinity: [0, 50], oil_in_water: [0, 200], uvt: [0, 100] }
  },
  freshwater: {
    primary: { flow: [5, 150], level: [10, 100], turbidity: [0, 1000], pressure: [0, 150], temperature: [0, 40] },
    secondary: { do: [4, 14], ph: [6.5, 8.5], orp: [-500, 1000], tss_mlss: [0, 500], ammonia: [0, 8], sludge_level: [0, 100], secondary_flow: [0.1, 500] },
    final: { conductivity: [0, 3000], tds: [0, 1000], nitrate: [0, 50], residual_chlorine: [0, 2], turbidity_final: [0, 5], differential_pressure: [0, 500], salinity: [0, 10], oil_in_water: [0, 50], uvt: [50, 100] }
  },
  cooling: {
    primary: { flow: [10, 300], level: [0, 100], turbidity: [0, 3000], pressure: [0, 300], temperature: [0, 80] },
    secondary: { do: [0.5, 12], ph: [6.0, 9.0], orp: [-500, 1000], tss_mlss: [0, 2000], ammonia: [0, 30], sludge_level: [0, 100], secondary_flow: [0.1, 1000] },
    final: { conductivity: [0, 10000], tds: [0, 5000], nitrate: [0, 200], residual_chlorine: [0, 5], turbidity_final: [0, 20], differential_pressure: [0, 1000], salinity: [0, 35], oil_in_water: [0, 200], uvt: [0, 100] }
  },
  unusable: { primary: {}, secondary: {}, final: {} }
};

/* ===========================
   Helpers
   =========================== */
// Return true only if all required keys exist and numeric value within range
function isStageComplete(stageReq = {}, sensorData = {}) {
  if (!stageReq || Object.keys(stageReq).length === 0) return true;
  if (!sensorData) return false;

  for (const key of Object.keys(stageReq)) {
    const [min, max] = stageReq[key];
    const val = Number(sensorData[key]);

    if (Number.isNaN(val)) return false;
    if (val < min || val > max) return false;
  }
  return true;
}

// Pretty format numbers for UI
function fmt(val) {
  if (val === undefined || val === null) return "N/A";
  const n = Number(val);
  if (Number.isNaN(n)) return "N/A";
  if (Math.abs(n) >= 1000) return n.toFixed(0);
  if (Math.abs(n) >= 10) return n.toFixed(2);
  return n.toFixed(4);
}

/* ===========================
   Small UI components
   =========================== */
function RealisticWaterFlow({ isActive }) {
  if (!isActive) return null;
  return (
    <div className="relative w-full h-28 overflow-hidden rounded-xl" style={{ background: "linear-gradient(180deg,#0ea5e910,#3b82f670)" }}>
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-full"
        animate={{ height: ["20%", "100%", "100%"] }}
        transition={{ duration: 2, times: [0, 0.7, 1], ease: "easeInOut" }}
        style={{ background: "linear-gradient(to top,#60a5fa,#34d399)" }}
      />
    </div>
  );
}

function MetricCard({ metric, value, requirement, isActive, isPassed, range }) {
  const val = Number(value);
  const [min, max] = range || [null, null];

  let status = "waiting";
  if (isPassed) status = "pass";
  else if (isActive) {
    if (!isNaN(val) && val >= min && val <= max) status = "pass";
    else status = "processing";
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="rounded-lg p-3 border-2"
      style={{
        borderColor: status === "pass" ? "rgba(34,197,94,0.45)" : status === "processing" ? "rgba(56,189,248,0.25)" : "rgba(203, 213, 225,0.25)",
        background: status === "pass" ? "rgba(34,197,94,0.06)" : status === "processing" ? "rgba(56,189,248,0.04)" : "transparent"
      }}
    >
      <div className="flex justify-between mb-1">
        <p className="text-xs font-semibold uppercase">{metric}</p>
        <div>{status === "pass" ? "✅" : status === "processing" ? "⏳" : "❗"}</div>
      </div>
      <div className="flex items-baseline gap-2">
        <p style={{ fontWeight: 700 }}>{fmt(value)}</p>
        <p className="text-xs opacity-70">{min !== null ? `${min} - ${max}` : "—"}</p>
      </div>
    </motion.div>
  );
}

/* ===========================
   Main Page Component
   =========================== */
export default function TreatmentFlowPage({ processingData, onComplete }) {
  // default processing data if not passed
  const defaultProcessing = processingData || { batchNumber: 1, intendedUse: { id: "irrigation", name: "Irrigation", icon: "🌾" } };

  // refs for SSEs & latest sensor payloads
  const primaryRef = useRef(null);
  const secondaryRef = useRef(null);
  const tertiaryRef = useRef(null);
  const primaryES = useRef(null);
  const secondaryES = useRef(null);
  const tertiaryES = useRef(null);

  // stage refs for scrolling
  const stageRefs = useRef({ primary: null, secondary: null, final: null });
  const completeRef = useRef(null);

  // state
  const [currentStage, setCurrentStage] = useState(0);
  const [passedStages, setPassedStages] = useState([]);
  const [stageFaults, setStageFaults] = useState({}); // { primary: true }
  const [faultAlerts, setFaultAlerts] = useState([]);
  const [stageMetrics, setStageMetrics] = useState({ primary: {}, secondary: {}, final: {} });
  const [isProcessing, setIsProcessing] = useState(Boolean(processingData));
  const [batchData, setBatchData] = useState(null);

  // settings
  const selectedCategory = (processingData && processingData.intendedUse && processingData.intendedUse.id) || defaultProcessing.intendedUse.id;
  const stageTimeoutMs = 30_000; // <-- time allowed per stage (ms) before marking fault (tweak if needed)

  // Helper: open SSEs on mount (immediately)
  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

    // PRIMARY SSE
    try {
      primaryES.current = new EventSource(`${base}/primary_sensors/stream`);
      primaryES.current.onmessage = (e) => {
        if (!e.data || e.data.trim() === "") return;
        try {
          const parsed = JSON.parse(e.data.replace(/'/g, '"'));
          // cast numeric fields
          primaryRef.current = {
            flow: Number(parsed.flow),
            level: Number(parsed.level),
            turbidity: Number(parsed.turbidity),
            pressure: Number(parsed.pressure),
            temperature: Number(parsed.temperature),
            timestamp: parsed.timestamp
          };
          setStageMetrics(prev => ({ ...prev, primary: { ...primaryRef.current } }));
        } catch (err) {
          console.error("Primary SSE parse error", err, e.data);
        }
      };
    } catch (err) {
      console.error("Primary SSE setup failed", err);
    }

    // SECONDARY SSE
    try {
      secondaryES.current = new EventSource(`${base}/secondary_sensors/stream`);
      secondaryES.current.onmessage = (e) => {
        if (!e.data || e.data.trim() === "") return;
        try {
          const parsed = JSON.parse(e.data.replace(/'/g, '"'));
          secondaryRef.current = {
            do: Number(parsed.do),
            ph: Number(parsed.ph),
            orp: Number(parsed.orp),
            tss_mlss: Number(parsed.tss_mlss),
            ammonia: Number(parsed.ammonia),
            sludge_level: Number(parsed.sludge_level),
            secondary_flow: Number(parsed.secondary_flow),
            timestamp: parsed.timestamp
          };
          setStageMetrics(prev => ({ ...prev, secondary: { ...secondaryRef.current } }));
        } catch (err) {
          console.error("Secondary SSE parse error", err, e.data);
        }
      };
    } catch (err) {
      console.error("Secondary SSE setup failed", err);
    }

    // TERTIARY SSE
    try {
      tertiaryES.current = new EventSource(`${base}/tertiary_sensors/stream`);
      tertiaryES.current.onmessage = (e) => {
        if (!e.data || e.data.trim() === "") return;
        try {
          const parsed = JSON.parse(e.data.replace(/'/g, '"'));
          tertiaryRef.current = {
            conductivity: Number(parsed.conductivity),
            tds: Number(parsed.tds),
            nitrate: Number(parsed.nitrate),
            residual_chlorine: Number(parsed.residual_chlorine),
            turbidity_final: Number(parsed.turbidity_final),
            differential_pressure: Number(parsed.differential_pressure),
            salinity: Number(parsed.salinity),
            oil_in_water: Number(parsed.oil_in_water),
            uvt: Number(parsed.uvt),
            timestamp: parsed.timestamp
          };
          setStageMetrics(prev => ({ ...prev, final: { ...tertiaryRef.current } }));
        } catch (err) {
          console.error("Tertiary SSE parse error", err, e.data);
        }
      };
    } catch (err) {
      console.error("Tertiary SSE setup failed", err);
    }

    return () => {
      try { primaryES.current && primaryES.current.close(); } catch (_) {}
      try { secondaryES.current && secondaryES.current.close(); } catch (_) {}
      try { tertiaryES.current && tertiaryES.current.close(); } catch (_) {}
    };
  }, []);

  /* ===========================
     Auto-scroll to active stage / completion
     =========================== */
  useEffect(() => {
    const stage = treatmentStages[currentStage];
    if (stage) {
      const el = stageRefs.current[stage.id];
      if (el && typeof el.scrollIntoView === "function") {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    } else {
      // if stage undefined -> maybe all done, scroll to completion
      completeRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [currentStage]);

  /* ===========================
     Per-stage timer + progression checker
     - For each active stage we start a timer.
     - If stage completes, advance.
     - If timer exceeds timeout, mark fault (red) and emit alert.
     =========================== */
  useEffect(() => {
    if (!isProcessing) return;

    let active = true;
    let stageTimer = 0;
    const tickMs = 1000;

    const stage = treatmentStages[currentStage];
    if (!stage) return;

    const stageId = stage.id;
    const stageReq = (categoryStageRequirements[selectedCategory] && categoryStageRequirements[selectedCategory][stageId]) || {};

    // if category has empty req (unusable), auto-pass
    if (!stageReq || Object.keys(stageReq).length === 0) {
      setPassedStages(prev => prev.includes(stageId) ? prev : [...prev, stageId]);
      setCurrentStage(prev => prev + 1);
      return;
    }

    const interval = setInterval(() => {
      if (!active) return;

      // If stage already faulted, stop timer
      if (stageFaults[stageId]) {
        return;
      }

      // choose sensor data for stage
      const sensorDataForStage = stageId === "primary" ? primaryRef.current : stageId === "secondary" ? secondaryRef.current : tertiaryRef.current;

      // do not check until sensor payload available
      if (!sensorDataForStage || Object.keys(sensorDataForStage).length === 0) {
        stageTimer += tickMs;
      } else {
        const complete = isStageComplete(stageReq, sensorDataForStage);
        if (complete) {
          // PASS: mark passed and advance
          setPassedStages(prev => prev.includes(stageId) ? prev : [...prev, stageId]);
          setCurrentStage(prev => prev + 1);
          clearInterval(interval);
          return;
        } else {
          stageTimer += tickMs;
        }
      }

      // If timer exceeds timeout -> fault
      if (stageTimer >= stageTimeoutMs) {
        setStageFaults(prev => ({ ...prev, [stageId]: true }));
        setFaultAlerts(prev => [...prev, { stageId, stageName: stage.name, time: new Date().toLocaleTimeString() }]);
        clearInterval(interval);
      }
    }, tickMs);

    return () => {
      active = false;
      clearInterval(interval);
    };
  }, [isProcessing, currentStage, selectedCategory, stageFaults]); // re-run if stage changes or faults change

  /* ===========================
     Helper to start fresh processing (reset states)
     =========================== */
  const startProcessing = (overrideProcessingData) => {
    setPassedStages([]);
    setStageFaults({});
    setFaultAlerts([]);
    setStageMetrics({ primary: {}, secondary: {}, final: {} });
    setCurrentStage(0);
    setIsProcessing(true);
  };

  const handleStartBatch = (data) => {
    setBatchData(data);
  };

  useEffect(() => {
    const allDone =
      passedStages.includes("primary") &&
      passedStages.includes("secondary") &&
      passedStages.includes("final");

    if (!allDone) return; // if not finished, exit

    const finalResult = {
      batchNumber: processingData?.batchNumber || 1,
      intendedUse: processingData?.intendedUse || defaultProcessing.intendedUse,

      // Latest sensor packets
      primary: primaryRef.current,
      secondary: secondaryRef.current,
      tertiary: tertiaryRef.current,

      // Optional metadata
      completedAt: new Date().toISOString(),
      status: "success"
    };

    // Send final batch result to parent
    if (onComplete) onComplete(finalResult);

  }, [passedStages]);

  /* ===========================
     Render UI
     =========================== */
  if (!isProcessing && passedStages.length === 0) {
    return (
      <div className="glassmorphism-strong rounded-3xl p-12 text-center border-2 border-white/30">
        <div className="text-6xl mb-4 opacity-30">💧</div>
        <p className="text-shakespeare-700 text-lg">Waiting for batch to start processing...</p>
        <div style={{ marginTop: 20 }}>
          <button onClick={() => startProcessing()} style={{ padding: "8px 14px", background: "#38bdf8", borderRadius: 8, color: "#042A2B", fontWeight: 700 }}>
            Start Processing
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="glassmorphism-strong rounded-2xl p-6 border-2 border-royal-blue/30">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 800 }}>Processing Batch #{String(defaultProcessing.batchNumber).padStart(3, "0")}</h2>
            <p style={{ color: "#0f172a" }}>Intended Use: <strong>{defaultProcessing.intendedUse.icon} {defaultProcessing.intendedUse.name}</strong></p>
          </div>
          <div style={{ fontSize: "1.8rem" }}>💧</div>
        </div>
      </motion.div>

      {/* Fault alerts */}
      <AnimatePresence>
        {faultAlerts.length > 0 && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
            {faultAlerts.map((alert, idx) => (
              <div key={`alert-${idx}`} className="glassmorphism-strong rounded-xl p-4 border-2" style={{ marginBottom: 8 }}>
                <div style={{ display: "flex", gap: 12 }}>
                  <div style={{ fontSize: 24 }}>🚨</div>
                  <div>
                    <div style={{ fontWeight: 800, color: "#b91c1c" }}>Stage Timeout: {alert.stageName}</div>
                    <div style={{ color: "#b91c1c" }}>Time: {alert.time} — Stage exceeded allowed time.</div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stage cards */}
      <div className="relative">
        <div className="space-y-8">
          {treatmentStages.map((stage, index) => {
            const isActive = isProcessing && currentStage === index;
            const isPassed = passedStages.includes(stage.id);
            const isFault = Boolean(stageFaults[stage.id]);
            const metrics = stage.id === "primary" ? stageMetrics.primary : stage.id === "secondary" ? stageMetrics.secondary : stageMetrics.final;
            const stageReq = (categoryStageRequirements[selectedCategory] && categoryStageRequirements[selectedCategory][stage.id]) || {};
            const metricKeys = Object.keys(stageReq);

            return (
              <div key={stage.id} ref={el => (stageRefs.current[stage.id] = el)}>
                <div className={`glassmorphism-strong rounded-2xl p-6 border-2 relative ${isActive ? "shadow-2xl" : isPassed ? "" : ""}`} style={{ borderColor: isFault ? "rgba(239,68,68,0.6)" : undefined }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                      <div style={{ fontSize: 28 }}>{stage.icon}</div>
                      <div>
                        <div style={{ fontWeight: 800 }}>{stage.name}</div>
                        <div style={{ color: "#475569" }}>{stage.description}</div>
                      </div>
                    </div>

                    <div>
                      {isFault ? <div style={{ fontSize: 14, color: "#b91c1c", fontWeight: 700 }}>❗ Taking longer than expected</div> : isPassed && !isActive ? <div style={{ fontSize: 22 }}>✅</div> : null}
                    </div>
                  </div>

                  {(isActive || isPassed) && (
                    <>
                      {/* progress bar */}
                      <div style={{ marginBottom: 12 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                          <div style={{ fontSize: 12, fontWeight: 700, color: "#374151" }}>{isActive ? "Processing..." : "Completed"}</div>
                          <div style={{ fontSize: 12, color: "#111827" }}>{isActive ? "Live" : (isPassed ? "Done ✓" : "")}</div>
                        </div>
                        <div style={{ height: 8, background: "rgba(15,23,42,0.07)", borderRadius: 6, overflow: "hidden" }}>
                          <motion.div initial={{ width: 0 }} animate={{ width: isPassed ? "100%" : isActive ? "60%" : "0%" }} style={{ height: "100%", background: isPassed ? "linear-gradient(90deg,#4ade80,#16a34a)" : "linear-gradient(90deg,#60a5fa,#34d399)" }} />
                        </div>
                      </div>

                      {/* Wastage Information */}
                      {stage.wastage && stage.wastage.length > 0 && (
                        <div style={{ marginBottom: 16, padding: 12, background: "rgba(148, 163, 184, 0.08)", borderRadius: 8 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                            <div style={{ fontSize: 14, fontWeight: 700, color: "#1e293b" }}>💧 Stage Wastage</div>
                            <div style={{ marginLeft: "auto", fontSize: 12, fontWeight: 700, color: "#059669", padding: "2px 8px", background: "rgba(16, 185, 129, 0.1)", borderRadius: 4 }}>
                              Efficiency: {stage.efficiency}
                            </div>
                          </div>
                          <div style={{ display: "grid", gap: 8 }}>
                            {stage.wastage.map((waste, wIdx) => (
                              <div key={wIdx} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "6px 10px", background: "rgba(255, 255, 255, 0.5)", borderRadius: 6, fontSize: 12 }}>
                                <div style={{ flex: 1 }}>
                                  <div style={{ fontWeight: 700, color: "#0f172a" }}>{waste.type}</div>
                                  <div style={{ color: "#64748b", fontSize: 11 }}>{waste.description}</div>
                                </div>
                                <div style={{ fontWeight: 800, color: "#dc2626", fontSize: 13, minWidth: 60, textAlign: "right" }}>
                                  {waste.waterLoss}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* metric grid */}
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0,1fr))", gap: 10 }}>
                        {metricKeys.length > 0 ? metricKeys.map(k => {
                          const req = stageReq[k];
                          const displayVal = metrics && metrics[k] !== undefined ? metrics[k] : "N/A";
                          return (
                            <MetricCard
                              key={`${stage.id}-${k}`}
                              metric={k}
                              value={displayVal}
                              requirement={Array.isArray(req) ? `${req[0]} - ${req[1]}` : "—"}
                              isActive={isActive}
                              isPassed={isPassed}
                              range={req}
                            />
                          );
                        }) : (
                          <div key={`${stage.id}-nometrics`} style={{ gridColumn: "1 / -1" }}>
                            <p>No metrics configured for this category-stage</p>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>

                {/* Water flow between */}
                {index < treatmentStages.length - 1 && (
                  <div style={{ margin: "24px 0" }}>
                    <RealisticWaterFlow isActive={isActive || isPassed} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* completion */}
        {currentStage >= treatmentStages.length && (
          <motion.div ref={completeRef} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-8 glassmorphism-strong rounded-3xl p-8 border-2">
            <div style={{ fontSize: 48, marginBottom: 8 }}>🎉</div>
            <h2 style={{ fontSize: 28, fontWeight: 800 }}>Treatment Complete!</h2>
            <p style={{ color: "#16a34a", marginBottom: 16 }}>Water processed and ready for <strong>{defaultProcessing.intendedUse.name}</strong></p>
            
            {/* Overall Efficiency Summary */}
            <div style={{ marginBottom: 20, padding: 16, background: "linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.15))", borderRadius: 12, border: "2px solid rgba(16, 185, 129, 0.3)" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 12 }}>
                <div style={{ fontSize: 32 }}>✨</div>
                <h3 style={{ fontSize: 22, fontWeight: 800, color: "#047857" }}>Overall Treatment Efficiency</h3>
              </div>
              
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 12 }}>
                {treatmentStages.map((stage, idx) => (
                  <div key={`eff-${idx}`} style={{ padding: 12, background: "rgba(255, 255, 255, 0.6)", borderRadius: 8, textAlign: "center" }}>
                    <div style={{ fontSize: 24, marginBottom: 4 }}>{stage.icon}</div>
                    <div style={{ fontSize: 11, fontWeight: 600, color: "#64748b", marginBottom: 4 }}>{stage.name}</div>
                    <div style={{ fontSize: 16, fontWeight: 800, color: "#059669" }}>{stage.efficiency}</div>
                  </div>
                ))}
              </div>
              
              <div style={{ padding: 16, background: "rgba(16, 185, 129, 0.2)", borderRadius: 10, textAlign: "center" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#065f46", marginBottom: 6 }}>COMBINED SYSTEM EFFICIENCY</div>
                <div style={{ fontSize: 36, fontWeight: 900, color: "#047857", letterSpacing: "-0.02em" }}>90% - 95%</div>
                <div style={{ fontSize: 12, color: "#059669", marginTop: 4 }}>Total water recovery and treatment effectiveness</div>
              </div>
            </div>

            <div style={{ marginTop: 10 }}>
              <button onClick={() => startProcessing()} style={{ padding: "10px 20px", background: "#34d399", borderRadius: 8, color: "#042A2B", fontWeight: 700, fontSize: 15 }}>Run another batch</button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}


