"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Droplets, Waves, Beaker, Sparkles, FlaskConical, Microscope, Cpu, Leaf } from 'lucide-react';

const journeyStages = [
  {
    id: 'river',
    icon: Waves,
    title: 'River Water',
    description: 'Fresh water from rivers and surface sources',
    color: 'from-shakespeare-400 to-shakespeare-600',
    background: 'bg-shakespeare-100',
    facts: ['TDS: 50-200 ppm', 'pH: 7-8.5', 'Source: Natural rivers']
  },
  {
    id: 'drain',
    icon: Droplets,
    title: 'Drainage & Collection',
    description: 'Wastewater collected from homes and industries',
    color: 'from-shakespeare-600 to-shakespeare-800',
    background: 'bg-shakespeare-200',
    facts: ['TDS: 400-800 ppm', 'High organic content', 'Mixed pollutants']
  },
  {
    id: 'sewage',
    icon: FlaskConical,
    title: 'Sewage System',
    description: 'Raw sewage transported to treatment plants',
    color: 'from-shakespeare-700 to-shakespeare-900',
    background: 'bg-shakespeare-300',
    facts: ['BOD: 200-400 mg/L', 'Contains bacteria', 'Requires treatment']
  },
  {
    id: 'treatment',
    icon: Beaker,
    title: 'Treatment Plant',
    description: 'Multi-stage filtration and purification',
    color: 'from-aqua-teal to-shakespeare-600',
    background: 'bg-shakespeare-400',
    facts: ['Removes 95%+ impurities', 'Uses biological processes', 'Chemical treatment']
  },
  {
    id: 'filtration',
    icon: Sparkles,
    title: 'Advanced Filtration',
    description: 'RO, UV, and activated carbon filtering',
    color: 'from-royal-blue to-aqua-teal',
    background: 'bg-shakespeare-500',
    facts: ['TDS reduced to <50 ppm', 'UV disinfection', 'Crystal clear water']
  },
  {
    id: 'ml-prediction',
    icon: Cpu,
    title: 'ML Quality Check',
    description: 'AquaSense AI predicts water quality in real-time',
    color: 'from-orange-accent to-royal-blue',
    background: 'bg-shakespeare-600',
    facts: ['Real-time TDS monitoring', 'Turbidity prediction', 'AI-powered safety checks']
  },
  {
    id: 'clean',
    icon: Microscope,
    title: 'Clean Reusable Water',
    description: 'Safe, treated water ready for reuse',
    color: 'from-green-400 to-aqua-teal',
    background: 'bg-shakespeare-700',
    facts: ['Meets WHO standards', 'Safe for irrigation', 'Industrial reuse ready']
  },
  {
    id: 'reuse',
    icon: Leaf,
    title: 'Agriculture & Industry',
    description: 'Reused water nourishing farms and factories',
    color: 'from-green-500 to-shakespeare-500',
    background: 'bg-shakespeare-800',
    facts: ['Saves 50M L/day', '85% less freshwater use', 'Sustainable future']
  }
];

const infoCards = [
  { stage: 1, question: 'What is TDS?', answer: 'Total Dissolved Solids - minerals and salts in water (ppm)' },
  { stage: 2, question: 'What is Turbidity?', answer: 'Cloudiness caused by suspended particles, measured in NTU' },
  { stage: 4, question: 'Why is pH important?', answer: 'pH 6.5-8.5 is safe. Too acidic or alkaline harms crops and pipes' },
  { stage: 5, question: 'What causes contamination?', answer: 'Industrial discharge, sewage, agricultural runoff, and chemicals' },
  { stage: 6, question: 'How ML predicts quality?', answer: 'AquaSense uses sensor data + ML models to forecast TDS, turbidity, pH' }
];

export default function WaterJourney() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  return (
    <section ref={containerRef} className="relative py-32 bg-gradient-to-b from-shakespeare-50 via-shakespeare-100 to-shakespeare-200 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 water-texture opacity-20"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-shakespeare-900 mb-6">
            The Journey of a <span className="text-gradient">Water Droplet</span>
          </h2>
          <p className="text-xl text-shakespeare-700 max-w-3xl mx-auto">
            Scroll down to follow water's transformation from river to reuse
          </p>
        </motion.div>

        {/* Journey Container */}
        <div className="relative max-w-6xl mx-auto">
          {/* Central flowing path/line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-shakespeare-400 via-aqua-teal to-green-500 transform -translate-x-1/2 opacity-30"></div>

          {/* Journey Stages */}
          <div className="space-y-32 py-20">
            {journeyStages.map((stage, index) => {
              const isLeft = index % 2 === 0;
              const infoCard = infoCards.find(card => card.stage === index);

              return (
                <div key={stage.id} className="relative">
                  <div className={`flex items-center ${isLeft ? 'flex-row' : 'flex-row-reverse'} gap-8`}>
                    {/* Stage Card */}
                    <motion.div
                      initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-100px' }}
                      transition={{ duration: 0.6 }}
                      className="flex-1"
                    >
                      <div className={`relative glassmorphism-strong p-8 rounded-3xl border-2 border-shakespeare-400/30 shadow-2xl hover:scale-105 transition-transform animate-liquid-morph ${stage.background}`}
                        style={{ animationDuration: '10s', animationDelay: `${index * 0.5}s` }}
                      >
                        {/* Icon */}
                        <div className={`w-20 h-20 bg-gradient-to-br ${stage.color} rounded-2xl flex items-center justify-center mb-6 shadow-xl`}>
                          <stage.icon className="w-10 h-10 text-white" />
                        </div>

                        {/* Title */}
                        <h3 className="text-3xl font-bold text-shakespeare-900 mb-4">{stage.title}</h3>
                        <p className="text-lg text-shakespeare-800 mb-6">{stage.description}</p>

                        {/* Facts */}
                        <div className="space-y-2">
                          {stage.facts.map((fact, idx) => (
                            <div key={idx} className="flex items-center space-x-2 text-sm text-shakespeare-700">
                              <div className="w-1.5 h-1.5 bg-shakespeare-600 rounded-full"></div>
                              <span>{fact}</span>
                            </div>
                          ))}
                        </div>

                        {/* Bubbles animation */}
                        <div className="absolute -bottom-4 -right-4 w-24 h-24 pointer-events-none">
                          {[...Array(3)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="absolute bg-shakespeare-300/30 rounded-full"
                              style={{
                                width: `${10 + i * 8}px`,
                                height: `${10 + i * 8}px`,
                              }}
                              animate={{
                                y: [-20, -60],
                                opacity: [0.5, 0],
                                scale: [1, 1.5]
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.4
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </motion.div>

                    {/* Center connector */}
                    <div className="flex items-center justify-center w-24">
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        className={`w-12 h-12 bg-gradient-to-br ${stage.color} rounded-full shadow-lg flex items-center justify-center`}
                      >
                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-xs font-bold text-shakespeare-900">
                          {index + 1}
                        </div>
                      </motion.div>
                    </div>

                    {/* Info Card (if exists) */}
                    <div className="flex-1">
                      {infoCard ? (
                        <motion.div
                          initial={{ opacity: 0, x: isLeft ? 100 : -100 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: 0.2 }}
                          className="glassmorphism p-6 rounded-2xl border border-orange-accent/30 shadow-xl hover:shadow-orange-accent/20 transition-shadow animate-float"
                          style={{ animationDelay: `${index * 0.3}s` }}
                        >
                          <div className="flex items-start space-x-3">
                            <div className="w-8 h-8 bg-orange-accent rounded-lg flex items-center justify-center flex-shrink-0">
                              <span className="text-white text-lg">?</span>
                            </div>
                            <div>
                              <h4 className="font-bold text-shakespeare-900 mb-2">{infoCard.question}</h4>
                              <p className="text-sm text-shakespeare-700">{infoCard.answer}</p>
                            </div>
                          </div>
                        </motion.div>
                      ) : (
                        <div></div>
                      )}
                    </div>
                  </div>

                  {/* Flowing particles between stages */}
                  {index < journeyStages.length - 1 && (
                    <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-16">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-2 h-2 bg-aqua-teal rounded-full"
                          animate={{
                            y: [0, 64],
                            opacity: [0, 1, 0]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.4
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}