'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import StageNode from './StageNode';
import ValveIndicator from './ValveIndicator';

// Dummy pipeline stages data
const pipelineStages = [
  {
    id: 'stage-a',
    name: 'Source Water Inlet',
    description: 'Raw water collection from municipal or groundwater source',
    status: 'active',
    quality: 'incoming',
    suitability: 'N/A',
    flow: 45.2,
    position: { x: 5, y: 50 },
    sensors: {
      pH: 7.8,
      TDS: 420,
      turbidity: 8.5
    }
  },
  {
    id: 'stage-b',
    name: 'Primary Filtration',
    description: 'Removing large particles and sediments',
    status: 'active',
    quality: 'processing',
    suitability: '65%',
    flow: 43.1,
    position: { x: 25, y: 30 },
    sensors: {
      pH: 7.5,
      TDS: 380,
      turbidity: 3.2
    }
  },
  {
    id: 'stage-c',
    name: 'Secondary Treatment',
    description: 'Chemical treatment and disinfection',
    status: 'active',
    quality: 'processing',
    suitability: '85%',
    flow: 42.8,
    position: { x: 45, y: 60 },
    sensors: {
      pH: 7.2,
      TDS: 350,
      turbidity: 1.8
    }
  },
  {
    id: 'stage-d',
    name: 'Quality Check',
    description: 'AI-powered quality assessment and certification',
    status: 'active',
    quality: 'checking',
    suitability: '92%',
    flow: 42.5,
    position: { x: 65, y: 40 },
    sensors: {
      pH: 7.2,
      TDS: 345,
      turbidity: 0.9
    }
  },
  {
    id: 'stage-e1',
    name: 'Irrigation Route',
    description: 'Suitable for agricultural irrigation',
    status: 'active',
    quality: 'approved',
    suitability: '95%',
    flow: 25.0,
    position: { x: 85, y: 20 },
    sensors: {
      pH: 7.1,
      TDS: 340,
      turbidity: 0.8
    }
  },
  {
    id: 'stage-e2',
    name: 'Cooling System',
    description: 'Suitable for industrial cooling',
    status: 'active',
    quality: 'approved',
    suitability: '93%',
    flow: 12.5,
    position: { x: 85, y: 45 },
    sensors: {
      pH: 7.2,
      TDS: 345,
      turbidity: 0.9
    }
  },
  {
    id: 'stage-e3',
    name: 'Process Water',
    description: 'Suitable for industrial processes',
    status: 'active',
    quality: 'approved',
    suitability: '91%',
    flow: 5.0,
    position: { x: 85, y: 70 },
    sensors: {
      pH: 7.2,
      TDS: 350,
      turbidity: 1.0
    }
  },
  {
    id: 'stage-f',
    name: 'Reject/Discharge',
    description: 'Failed quality check - requires retreatment',
    status: 'idle',
    quality: 'rejected',
    suitability: '0%',
    flow: 0,
    position: { x: 85, y: 90 },
    sensors: {
      pH: 0,
      TDS: 0,
      turbidity: 0
    }
  }
];

// Snake-like river paths between stages
const riverPaths = [
  { from: 'stage-a', to: 'stage-b', path: 'M 10 50 Q 15 40, 25 30', status: 'open', mode: 'auto' },
  { from: 'stage-b', to: 'stage-c', path: 'M 25 30 Q 30 50, 45 60', status: 'open', mode: 'auto' },
  { from: 'stage-c', to: 'stage-d', path: 'M 45 60 Q 55 45, 65 40', status: 'open', mode: 'auto' },
  { from: 'stage-d', to: 'stage-e1', path: 'M 65 40 Q 75 25, 85 20', status: 'open', mode: 'ml-suggested' },
  { from: 'stage-d', to: 'stage-e2', path: 'M 65 40 Q 75 42, 85 45', status: 'open', mode: 'ml-suggested' },
  { from: 'stage-d', to: 'stage-e3', path: 'M 65 40 Q 70 60, 85 70', status: 'open', mode: 'ml-suggested' },
  { from: 'stage-d', to: 'stage-f', path: 'M 65 40 Q 70 75, 85 90', status: 'closed', mode: 'auto' }
];

// Current water position (simulated as flowing through stages)
const waterFlowSequence = ['stage-a', 'stage-b', 'stage-c', 'stage-d', 'stage-e1'];

export default function PipelineFlow() {
  const [selectedStage, setSelectedStage] = useState(null);
  const [viewMode, setViewMode] = useState('top');
  const [currentWaterStage, setCurrentWaterStage] = useState(0);

  // Simulate water flowing through stages
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWaterStage((prev) => (prev + 1) % waterFlowSequence.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const currentStageId = waterFlowSequence[currentWaterStage];
  const nextStageId = waterFlowSequence[(currentWaterStage + 1) % waterFlowSequence.length];

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
      className="relative"
    >
      <div className="text-center mb-8">
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-4xl md:text-5xl font-display font-bold text-shakespeare-900 mb-3"
        >
          Dynamic Pipeline Routing
        </motion.h2>
        <p className="text-shakespeare-700 text-lg mb-6">
          Real-time water flow from source to destination with AI-optimized routing
        </p>

        {/* View mode toggle */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setViewMode('top')}
            className={`px-6 py-3 rounded-full font-display font-semibold transition-all duration-300 ${
              viewMode === 'top'
                ? 'bg-gradient-to-r from-shakespeare-600 to-shakespeare-500 text-white shadow-lg shadow-shakespeare-400/50'
                : 'glassmorphism text-shakespeare-800 hover:bg-white/30'
            }`}
          >
            📐 Top View
          </button>
          <button
            onClick={() => setViewMode('3d')}
            className={`px-6 py-3 rounded-full font-display font-semibold transition-all duration-300 ${
              viewMode === '3d'
                ? 'bg-gradient-to-r from-shakespeare-600 to-shakespeare-500 text-white shadow-lg shadow-shakespeare-400/50'
                : 'glassmorphism text-shakespeare-800 hover:bg-white/30'
            }`}
          >
            🎲 3D Isometric
          </button>
        </div>

        {/* Current flow status */}
        <motion.div
          key={currentStageId}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-block glassmorphism rounded-full px-6 py-3 mb-4"
        >
          <p className="text-shakespeare-900 font-display font-semibold">
            💧 Water Currently at: <span className="text-royal-blue">{pipelineStages.find(s => s.id === currentStageId)?.name}</span>
          </p>
          <p className="text-shakespeare-700 text-sm mt-1">
            → Predicted Next: <span className="text-aqua-teal font-semibold">{pipelineStages.find(s => s.id === nextStageId)?.name}</span>
          </p>
        </motion.div>
      </div>

      {/* Pipeline visualization with river-like curves */}
      <div className="relative glassmorphism-strong rounded-3xl p-8 overflow-hidden">
        <div className={`relative w-full h-[600px] ${viewMode === '3d' ? 'animate-depth-3d' : ''}`}>
          {/* SVG for river paths */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              {/* Gradient for water flow */}
              <linearGradient id="waterGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#4ac0e6" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#0046FF" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#73C8D2" stopOpacity="0.3" />
              </linearGradient>

              {/* Animated gradient for active flow */}
              <linearGradient id="activeWaterGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0046FF" stopOpacity="0.8">
                  <animate attributeName="stop-opacity" values="0.4;0.8;0.4" dur="2s" repeatCount="indefinite" />
                </stop>
                <stop offset="50%" stopColor="#4ac0e6" stopOpacity="1">
                  <animate attributeName="offset" values="0.3;0.7;0.3" dur="3s" repeatCount="indefinite" />
                </stop>
                <stop offset="100%" stopColor="#73C8D2" stopOpacity="0.8">
                  <animate attributeName="stop-opacity" values="0.8;0.4;0.8" dur="2s" repeatCount="indefinite" />
                </stop>
              </linearGradient>

              {/* Filter for glow effect */}
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Draw all river paths */}
            {riverPaths.map((river, idx) => {
              const isActive = river.status === 'open';
              const isCurrentPath = 
                river.from === currentStageId || 
                (river.from === 'stage-d' && ['stage-e1', 'stage-e2', 'stage-e3'].includes(river.to));
              
              return (
                <g key={idx}>
                  {/* Base river path */}
                  <motion.path
                    d={river.path}
                    fill="none"
                    stroke={isActive ? 'url(#waterGradient)' : '#c0e7f7'}
                    strokeWidth={isActive ? "2" : "1"}
                    strokeOpacity={isActive ? 0.6 : 0.3}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: idx * 0.2 }}
                  />

                  {/* Active flowing water */}
                  {isActive && (
                    <motion.path
                      d={river.path}
                      fill="none"
                      stroke="url(#activeWaterGradient)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      filter="url(#glow)"
                      initial={{ pathLength: 0, pathOffset: 0 }}
                      animate={{ 
                        pathLength: [0, 0.3, 0],
                        pathOffset: [0, 1, 1]
                      }}
                      transition={{ 
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                  )}

                  {/* Highlight current path with pulsing effect */}
                  {isCurrentPath && isActive && (
                    <motion.path
                      d={river.path}
                      fill="none"
                      stroke="#0046FF"
                      strokeWidth="4"
                      strokeLinecap="round"
                      filter="url(#glow)"
                      animate={{ 
                        strokeOpacity: [0.3, 1, 0.3],
                        strokeWidth: [3, 5, 3]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  )}

                  {/* Water droplets flowing along path */}
                  {isActive && [...Array(3)].map((_, i) => (
                    <motion.circle
                      key={`droplet-${idx}-${i}`}
                      r="0.8"
                      fill="#4ac0e6"
                      filter="url(#glow)"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 1,
                        ease: "linear"
                      }}
                    >
                      <animateMotion
                        dur="3s"
                        repeatCount="indefinite"
                        begin={`${i}s`}
                        path={river.path}
                      />
                    </motion.circle>
                  ))}
                </g>
              );
            })}
          </svg>

          {/* Stage nodes positioned along the river */}
          {pipelineStages.map((stage) => {
            const isCurrentStage = stage.id === currentStageId;
            const isNextStage = stage.id === nextStageId;
            
            return (
              <motion.div
                key={stage.id}
                className="absolute"
                style={{
                  left: `${stage.position.x}%`,
                  top: `${stage.position.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: 1, 
                  opacity: 1,
                  y: isCurrentStage ? [0, -10, 0] : 0
                }}
                transition={{ 
                  delay: 0.3,
                  y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                <StageNode
                  stage={stage}
                  isSelected={selectedStage?.id === stage.id}
                  onClick={() => setSelectedStage(stage)}
                  viewMode={viewMode}
                  isCurrent={isCurrentStage}
                  isNext={isNextStage}
                />

                {/* Current water indicator */}
                {isCurrentStage && (
                  <motion.div
                    className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="bg-royal-blue text-white px-3 py-1 rounded-full text-xs font-display font-semibold shadow-lg">
                      💧 Water Here
                    </div>
                  </motion.div>
                )}

                {/* Next prediction indicator */}
                {isNextStage && (
                  <motion.div
                    className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <div className="bg-aqua-teal text-white px-3 py-1 rounded-full text-xs font-display font-semibold shadow-lg">
                      🎯 Next Stage
                    </div>
                  </motion.div>
                )}

                {/* Valve indicator */}
                {riverPaths.find(r => r.to === stage.id) && (
                  <motion.div
                    className="absolute -bottom-12 left-1/2 -translate-x-1/2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <ValveIndicator valve={riverPaths.find(r => r.to === stage.id)} />
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* AI Suggestion Bubble */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute top-4 right-4 glassmorphism rounded-2xl p-4 max-w-xs"
        >
          <div className="flex items-start gap-3">
            <div className="text-3xl">🤖</div>
            <div>
              <h4 className="font-display font-semibold text-shakespeare-900 mb-1">AI Routing Agent</h4>
              <p className="text-xs text-shakespeare-700">
                Current routing optimized for maximum water reuse. Irrigation route preferred based on quality score.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Selected stage details popup */}
      {selectedStage && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 glassmorphism-strong rounded-3xl p-8 border-2 border-shakespeare-400/30"
        >
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-3xl font-display font-bold text-shakespeare-900 mb-2">
                {selectedStage.name}
              </h3>
              <p className="text-shakespeare-700">{selectedStage.description}</p>
            </div>
            <button
              onClick={() => setSelectedStage(null)}
              className="text-shakespeare-600 hover:text-shakespeare-900 text-2xl"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glassmorphism rounded-xl p-4">
              <p className="text-shakespeare-600 text-sm mb-1">Status</p>
              <p className="text-2xl font-display font-bold text-shakespeare-900 capitalize">
                {selectedStage.status}
              </p>
            </div>
            <div className="glassmorphism rounded-xl p-4">
              <p className="text-shakespeare-600 text-sm mb-1">Suitability</p>
              <p className="text-2xl font-display font-bold text-shakespeare-900">
                {selectedStage.suitability}
              </p>
            </div>
            <div className="glassmorphism rounded-xl p-4">
              <p className="text-shakespeare-600 text-sm mb-1">Flow Rate</p>
              <p className="text-2xl font-display font-bold text-shakespeare-900">
                {selectedStage.flow} <span className="text-sm">L/min</span>
              </p>
            </div>
            <div className="glassmorphism rounded-xl p-4">
              <p className="text-shakespeare-600 text-sm mb-1">Quality</p>
              <p className="text-2xl font-display font-bold text-shakespeare-900 capitalize">
                {selectedStage.quality}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="font-display font-semibold text-shakespeare-900 mb-3">Sensor Readings</h4>
            <div className="grid grid-cols-3 gap-4">
              <div className="glassmorphism rounded-xl p-4 text-center">
                <p className="text-shakespeare-600 text-sm mb-1">pH</p>
                <p className="text-xl font-display font-bold text-shakespeare-900">
                  {selectedStage.sensors.pH}
                </p>
              </div>
              <div className="glassmorphism rounded-xl p-4 text-center">
                <p className="text-shakespeare-600 text-sm mb-1">TDS</p>
                <p className="text-xl font-display font-bold text-shakespeare-900">
                  {selectedStage.sensors.TDS} <span className="text-xs">ppm</span>
                </p>
              </div>
              <div className="glassmorphism rounded-xl p-4 text-center">
                <p className="text-shakespeare-600 text-sm mb-1">Turbidity</p>
                <p className="text-xl font-display font-bold text-shakespeare-900">
                  {selectedStage.sensors.turbidity} <span className="text-xs">NTU</span>
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.section>
  );
}
// mm