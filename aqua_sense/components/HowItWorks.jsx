"use client";

import { motion } from 'framer-motion';
import { Radio, Cloud, Brain, Recycle, ArrowRight } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      icon: Radio,
      title: 'IoT Sensors',
      description: 'Smart sensors continuously monitor water quality, flow rates, temperature, pH levels, and contamination across your facility.',
      step: '01',
      gradient: 'from-shakespeare-500 to-shakespeare-700',
    },
    {
      icon: Cloud,
      title: 'Data Processing',
      description: 'Data streams securely to our  platform where it\'s processed, stored, and made available for real-time analysis.',
      step: '02',
      gradient: 'from-aqua-teal to-shakespeare-600',
    },
    {
      icon: Brain,
      title: 'ML Models',
      description: 'Advanced machine learning algorithms analyze patterns and predict optimal reuse opportunities.',
      step: '03',
      gradient: 'from-royal-blue to-shakespeare-700',
    },
    {
      icon: Recycle,
      title: 'Smart Reuse Routing',
      description: 'Treated water is intelligently routed to appropriate reuse applications - irrigation, cooling, industrial processes, or conservation.',
      step: '04',
      gradient: 'from-orange-accent to-shakespeare-600',
    },
  ];

  return (
    <section className="relative py-32 overflow-hidden">
      {/* HD Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ef711400-4759-4522-a94e-77bc1b479bba/generated_images/aerial-view-of-pristine-indian-river-gan-898087a1-20251130140111.jpg"
          alt=""
          className="w-full h-full object-cover opacity-20 animate-wave-flow-3d"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-shakespeare-100/95 via-shakespeare-50/90 to-shakespeare-200/95"></div>
      </div>

      {/* Floating water droplets */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        {[...Array(18)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-shakespeare-400 rounded-full opacity-25 animate-float-3d"
            style={{
              width: `${Math.random() * 6 + 3}px`,
              height: `${Math.random() * 6 + 3}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${10 + Math.random() * 5}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Caustic overlay */}
      <div className="caustic-overlay z-10"></div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 z-20">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <span className="inline-block px-6 py-2 glassmorphism-strong text-shakespeare-800 rounded-full font-bold text-sm mb-4 border border-shakespeare-400/30">
            Flow of Intelligence
          </span>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-shakespeare-950 mb-6">
            How <span className="text-gradient">AquaSense</span> Works
          </h2>
          <p className="text-xl text-shakespeare-700 max-w-3xl mx-auto">
            From sensors to smart decisions - our end-to-end water intelligence pipeline
          </p>
        </motion.div>

        {/* Steps with water-themed cards */}
        <div className="max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="relative mb-20 last:mb-0"
            >
              <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-16`}>
                {/* Content - Liquid shaped card */}
                <div className="flex-1">
                  <div className="relative">
                    {/* Step Number */}
                    <div className={`absolute -top-12 ${index % 2 === 0 ? 'left-0' : 'right-0'} text-9xl font-bold text-shakespeare-400 opacity-10 z-0`}>
                      {step.step}
                    </div>
                    
                    <motion.div
                      whileHover={{ scale: 1.02, y: -10 }}
                      className="relative glassmorphism-strong p-10 shadow-2xl border-2 border-shakespeare-400/30 hover:border-shakespeare-500/50 transition-all overflow-hidden animate-liquid-morph"
                    >
                      {/* Gradient background */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-5 group-hover:opacity-10 transition-opacity animate-water-flow`}></div>
                      
                      {/* Water texture */}
                      <div className="absolute inset-0 water-texture opacity-50"></div>

                      <div className={`relative inline-flex items-center space-x-3 px-5 py-3 bg-gradient-to-r ${step.gradient} rounded-full mb-6`}>
                        <span className="text-white font-bold text-lg">Step {step.step}</span>
                      </div>
                      
                      <h3 className="relative text-4xl font-bold text-shakespeare-900 mb-5 z-10">
                        {step.title}
                      </h3>
                      
                      <p className="relative text-lg text-shakespeare-700 leading-relaxed z-10">
                        {step.description}
                      </p>
                    </motion.div>
                  </div>
                </div>

                {/* Icon - 3D floating */}
                <div className="flex-shrink-0">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.15 }}
                    transition={{ duration: 0.8 }}
                    className="relative w-40 h-40 rounded-full flex items-center justify-center shadow-2xl animate-float-3d"
                    style={{
                      background: `linear-gradient(135deg, var(--color-${step.gradient.split(' ')[0].replace('from-', '')}) 0%, var(--color-${step.gradient.split(' ')[1].replace('to-', '')}) 100%)`,
                      animationDelay: `${index * 0.5}s`
                    }}
                  >
                    <step.icon className="w-20 h-20 text-white relative z-10" />
                    
                    {/* Multiple pulse rings for 3D effect */}
                    <div className="absolute inset-0 rounded-full border-4 border-shakespeare-400 opacity-20 animate-ripple-3d"></div>
                    <div className="absolute inset-0 rounded-full border-4 border-shakespeare-300 opacity-10 animate-ripple-3d" style={{ animationDelay: '0.5s' }}></div>
                    
                    {/* Glow effect */}
                    <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${step.gradient} blur-2xl opacity-30`}></div>
                  </motion.div>
                </div>
              </div>

              {/* Connecting Arrow with water flow */}
              {index < steps.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 + 0.4 }}
                  className="flex justify-center my-12"
                >
                  <div className="relative">
                    <ArrowRight className="w-12 h-12 text-shakespeare-500 transform rotate-90 animate-float" />
                    <div className="absolute inset-0 blur-xl bg-shakespeare-400 opacity-30 animate-pulse"></div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Bottom Stats - Liquid shape */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-24 text-center"
        >
          <div className="inline-block glassmorphism-strong rounded-3xl px-16 py-10 shadow-2xl border-2 border-shakespeare-400/30 animate-liquid-morph">
            <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
              <div>
                <div className="text-5xl font-bold text-shakespeare-600 mb-3">&lt;2 min</div>
                <div className="text-shakespeare-700 text-lg">Setup Time</div>
              </div>
              <div className="w-px h-16 bg-shakespeare-400 hidden md:block"></div>
              <div>
                <div className="text-5xl font-bold text-shakespeare-600 mb-3">99.9%</div>
                <div className="text-shakespeare-700 text-lg">Accuracy</div>
              </div>
              <div className="w-px h-16 bg-shakespeare-400 hidden md:block"></div>
              <div>
                <div className="text-5xl font-bold text-shakespeare-600 mb-3">24/7</div>
                <div className="text-shakespeare-700 text-lg">Monitoring</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}