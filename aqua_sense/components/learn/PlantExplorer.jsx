"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Wind, Filter, Droplets, Zap, Sparkles, Sun, Activity, CheckCircle, X } from 'lucide-react';

const plantStages = [
  {
    id: 'aeration',
    name: 'Aeration Tank',
    icon: Wind,
    position: { x: 15, y: 30 },
    color: 'from-shakespeare-400 to-shakespeare-600',
    description: 'Oxygen is pumped into wastewater to help bacteria break down organic matter',
    process: 'Aerobic bacteria consume organic pollutants, reducing BOD (Biochemical Oxygen Demand)',
    indiaChallenge: 'High power consumption in India due to inconsistent electricity supply',
    mlRole: 'AquaSense predicts optimal oxygen levels based on incoming waste load, reducing energy by 20%',
    animation: 'bubbles'
  },
  {
    id: 'primary',
    name: 'Primary Clarifier',
    icon: Droplets,
    position: { x: 35, y: 20 },
    color: 'from-aqua-teal to-shakespeare-500',
    description: 'Heavy solids settle to the bottom, separated from water',
    process: 'Gravity settling removes 50-70% of suspended solids and 30% of BOD',
    indiaChallenge: 'Variable flow rates from mixed sewage systems cause inefficiency',
    mlRole: 'ML models predict sludge accumulation, optimizing cleaning schedules',
    animation: 'settling'
  },
  {
    id: 'secondary',
    name: 'Secondary Clarifier',
    icon: Activity,
    position: { x: 55, y: 25 },
    color: 'from-shakespeare-500 to-shakespeare-700',
    description: 'Further settling after biological treatment',
    process: 'Removes remaining suspended solids and biological flocs',
    indiaChallenge: 'Monsoon dilution affects settling efficiency',
    mlRole: 'AquaSense forecasts weather impact on treatment performance',
    animation: 'swirl'
  },
  {
    id: 'sand',
    name: 'Sand Filter',
    icon: Filter,
    position: { x: 75, y: 35 },
    color: 'from-sand-gold to-shakespeare-600',
    description: 'Water flows through sand layers, trapping fine particles',
    process: 'Removes turbidity and remaining suspended particles down to 10 microns',
    indiaChallenge: 'Frequent clogging from high sediment load in Indian water',
    mlRole: 'Predicts filter backwash timing, extending filter life by 30%',
    animation: 'filter'
  },
  {
    id: 'carbon',
    name: 'Activated Carbon',
    icon: Sparkles,
    position: { x: 15, y: 60 },
    color: 'from-shakespeare-700 to-shakespeare-900',
    description: 'Activated carbon absorbs dissolved organic compounds and odors',
    process: 'Removes color, taste, odor, and trace organic contaminants',
    indiaChallenge: 'Industrial chemicals from textile and pharma industries',
    mlRole: 'AI monitors carbon saturation, optimizing replacement cycles',
    animation: 'absorption'
  },
  {
    id: 'ro',
    name: 'RO Membrane',
    icon: Zap,
    position: { x: 35, y: 70 },
    color: 'from-royal-blue to-aqua-teal',
    description: 'Reverse osmosis removes dissolved salts and heavy metals',
    process: 'Reduces TDS from 600+ ppm to <50 ppm, removes 95%+ contaminants',
    indiaChallenge: 'High reject water wastage (40-60% in conventional systems)',
    mlRole: 'AquaSense optimizes pressure and recovery rate, reducing waste by 25%',
    animation: 'membrane'
  },
  {
    id: 'uv',
    name: 'UV Disinfection',
    icon: Sun,
    position: { x: 55, y: 65 },
    color: 'from-orange-accent to-royal-blue',
    description: 'UV light kills bacteria, viruses, and pathogens',
    process: '99.99% microbial inactivation without chemicals',
    indiaChallenge: 'Power cuts affect continuous disinfection',
    mlRole: 'Real-time turbidity monitoring ensures effective UV dose',
    animation: 'rays'
  },
  {
    id: 'reuse',
    name: 'Reuse Outlet',
    icon: CheckCircle,
    position: { x: 75, y: 60 },
    color: 'from-green-500 to-aqua-teal',
    description: 'Clean, safe water ready for agriculture and industry',
    process: 'Meets WHO standards for irrigation and industrial cooling',
    indiaChallenge: 'Ensuring consistent quality for diverse reuse applications',
    mlRole: 'AquaSense AI certifies water quality in real-time for safe reuse',
    animation: 'flow'
  }
];

export default function PlantExplorer() {
  const [selectedStage, setSelectedStage] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const renderAnimation = (type) => {
    switch(type) {
      case 'bubbles':
        return [...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-shakespeare-300/40 rounded-full"
            style={{
              width: `${4 + Math.random() * 6}px`,
              height: `${4 + Math.random() * 6}px`,
              left: `${20 + Math.random() * 60}%`,
              bottom: 0
            }}
            animate={{
              y: [-10, -80],
              opacity: [0.6, 0],
              scale: [1, 1.3]
            }}
            transition={{
              duration: 2 + Math.random(),
              repeat: Infinity,
              delay: i * 0.3
            }}
          />
        ));
      case 'filter':
        return (
          <motion.div 
            className="absolute inset-0 bg-gradient-to-b from-transparent via-sand-gold/20 to-transparent"
            animate={{ y: [-20, 20] }}
            transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
          />
        );
      case 'rays':
        return [...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-1/2 left-1/2 w-1 h-20 bg-gradient-to-b from-orange-accent/60 to-transparent origin-top"
            style={{ transform: `rotate(${i * 60}deg)` }}
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
          />
        ));
      default:
        return null;
    }
  };

  return (
    <section className="relative py-32 bg-gradient-to-br from-shakespeare-900 via-shakespeare-800 to-shakespeare-900 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 water-texture opacity-20"></div>
      <div className="caustic-overlay"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-shakespeare-50 mb-6">
            3D Treatment Plant <span className="text-gradient">Explorer</span>
          </h2>
          <p className="text-xl text-shakespeare-200 max-w-3xl mx-auto">
            Click on any stage to explore how Indian wastewater treatment works with AquaSense AI
          </p>
        </motion.div>

        {/* 3D Isometric Plant View */}
        <div className="relative max-w-6xl mx-auto h-[600px]">
          <motion.div
            className="relative w-full h-full"
            style={{
              rotateX: mousePosition.y * 0.1,
              rotateY: mousePosition.x * 0.1,
            }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          >
            {/* Connecting pipes/lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
              <defs>
                <linearGradient id="pipeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4ac0e6" />
                  <stop offset="100%" stopColor="#1488b5" />
                </linearGradient>
              </defs>
              
              {/* Flowing pipes between stages */}
              <motion.path
                d="M 18,33 Q 25,25 38,23"
                stroke="url(#pipeGradient)"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.path
                d="M 38,23 Q 45,23 58,28"
                stroke="url(#pipeGradient)"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 0.3, repeat: Infinity }}
              />
              <motion.path
                d="M 58,28 Q 65,30 78,38"
                stroke="url(#pipeGradient)"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 0.6, repeat: Infinity }}
              />
              <motion.path
                d="M 78,38 Q 70,48 18,63"
                stroke="url(#pipeGradient)"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 0.9, repeat: Infinity }}
              />
              <motion.path
                d="M 18,63 Q 25,65 38,73"
                stroke="url(#pipeGradient)"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 1.2, repeat: Infinity }}
              />
              <motion.path
                d="M 38,73 Q 45,70 58,68"
                stroke="url(#pipeGradient)"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 1.5, repeat: Infinity }}
              />
              <motion.path
                d="M 58,68 Q 65,65 78,63"
                stroke="url(#pipeGradient)"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 1.8, repeat: Infinity }}
              />
            </svg>

            {/* Plant Stages */}
            {plantStages.map((stage, index) => (
              <motion.div
                key={stage.id}
                className="absolute cursor-pointer group"
                style={{
                  left: `${stage.position.x}%`,
                  top: `${stage.position.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ scale: 1.15, z: 50 }}
                onClick={() => setSelectedStage(stage)}
              >
                <div className="relative">
                  {/* Stage container */}
                  <div className={`relative w-32 h-32 bg-gradient-to-br ${stage.color} rounded-3xl shadow-2xl border-4 border-shakespeare-300/30 overflow-hidden animate-liquid-morph`}
                    style={{ animationDuration: '12s', animationDelay: `${index * 0.8}s` }}
                  >
                    {/* Icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <stage.icon className="w-12 h-12 text-white z-10" />
                    </div>

                    {/* Animation overlay */}
                    <div className="absolute inset-0">
                      {renderAnimation(stage.animation)}
                    </div>

                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-colors"></div>
                  </div>

                  {/* Label */}
                  <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                    <div className="glassmorphism-strong px-4 py-2 rounded-full border border-shakespeare-300/30 text-shakespeare-50 font-semibold text-sm">
                      {stage.name}
                    </div>
                  </div>

                  {/* Pulsing ring */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl border-2 border-shakespeare-300"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0, 0.5]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: index * 0.5
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Info Card Modal */}
        <AnimatePresence>
          {selectedStage && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100]"
                onClick={() => setSelectedStage(null)}
              />

              {/* Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 50 }}
                className="fixed top-[52%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl max-h-[90vh] overflow-y-auto z-[110] p-4"
              >
                <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden">
                  {/* Close button */}
                  <button
                    onClick={() => setSelectedStage(null)}
                    className="absolute top-4 right-4 z-10 bg-shakespeare-900 text-white p-2 rounded-full hover:bg-shakespeare-800 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  {/* Header with icon */}
                  <div className={`relative p-8 bg-gradient-to-br ${selectedStage.color}`}>
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                        <selectedStage.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-3xl font-bold text-white">{selectedStage.name}</h3>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 space-y-6">
                    <div>
                      <h4 className="text-lg font-bold text-shakespeare-900 mb-2">What Happens Here</h4>
                      <p className="text-shakespeare-700">{selectedStage.description}</p>
                    </div>

                    <div className="glassmorphism-strong p-4 rounded-xl">
                      <h4 className="text-lg font-bold text-shakespeare-900 mb-2">The Process</h4>
                      <p className="text-shakespeare-700">{selectedStage.process}</p>
                    </div>

                    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl">
                      <h4 className="text-lg font-bold text-red-900 mb-2">India's Challenge</h4>
                      <p className="text-red-800">{selectedStage.indiaChallenge}</p>
                    </div>

                    <div className="bg-gradient-to-br from-royal-blue to-aqua-teal p-6 rounded-xl text-white">
                      <h4 className="text-lg font-bold mb-2 flex items-center">
                        <Sparkles className="w-5 h-5 mr-2" />
                        AquaSense ML Prediction
                      </h4>
                      <p>{selectedStage.mlRole}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}