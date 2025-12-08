"use client";

import { motion } from 'framer-motion';
import { Brain, LineChart, AlertTriangle, Sparkles, Zap, Target,MessageCircle,Settings } from 'lucide-react';
import Link from "next/link";
export default function AIShowcase() {
  // const aiFeatures = [
  //   {
  //     icon: Brain,
  //     title: 'Predictive Analytics',
  //     description: 'ML models predict optimal water reuse with 95% accuracy.',
  //     metrics: ['95% Accuracy', 'reuse pridiction', 'Real-time Learning'],
  //     gradient: 'from-shakespeare-500 to-royal-blue',
  //   },
  //   {
  //     icon: Target,
  //     title: 'Smart Agent System',
  //     description: 'Autonomous AI agents optimize water routing, treatment schedules, and resource allocation.',
  //     metrics: ['Autonomous', 'Multi-agent', 'Self-optimizing'],
  //     gradient: 'from-aqua-teal to-shakespeare-600',
  //   },
  //   {
  //     icon: LineChart,
  //     title: 'Demand Forecasting',
  //     description: 'Advanced algorithms predict peak usage times and automatically adjust supply strategies.',
  //     metrics: ['Pattern Recognition', 'Seasonal Analysis', 'Anomaly Detection'],
  //     gradient: 'from-shakespeare-600 to-shakespeare-800',
  //   },
  //   {
  //     icon: AlertTriangle,
  //     title: 'Anomaly Detection',
  //     description: 'AI instantly identifies leaks, contamination, or unusual patterns in your water system.',
  //     metrics: ['Instant Alerts', 'Leak Detection', 'Quality Monitoring'],
  //     gradient: 'from-orange-accent to-shakespeare-500',
  //   },
  //   {
  //     icon: Zap,
  //     title: 'Optimization Engine',
  //     description: 'Continuously learns and improves water treatment and distribution efficiency.',
  //     metrics: ['Continuous Learning', 'Efficiency Boost', 'Cost Reduction'],
  //     gradient: 'from-royal-blue to-aqua-teal',
  //   },
  //   {
  //     icon: Sparkles,
  //     title: 'Quality Prediction',
  //     description: 'Predicts water quality metrics before lab testing, enabling proactive treatment.',
  //     metrics: ['Pre-emptive', 'Lab-grade Accuracy', 'Instant Results'],
  //     gradient: 'from-shakespeare-400 to-shakespeare-700',
  //   },
  // ];
  const aiFeatures = [
  {
    icon: Brain,
    title: 'Virtual Sensor Intelligence',
    description:
      'A fully simulated water-quality sensor network that generates realistic pH, turbidity, TDS, DO, and temperature readings for testing, dashboards, and ML pipelines—without needing physical hardware.',
    metrics: [
      'Synthetic Real-time Data',
      'Predictable Range Values',
      'Supports SSE & WebSockets',
    ],
    gradient: 'from-shakespeare-500 to-royal-blue',
  },
  {
    icon: LineChart,
    title: 'ML Training Pipeline',
    description:
      'A controlled dummy-data training system that prepares models using realistic synthetic datasets, ensuring early-stage validation before deploying real sensors.',
    metrics: [
      'Feature Engineering',
      'Data Preprocessing',
      'Range-based Training Samples',
    ],
    gradient: 'from-shakespeare-600 to-shakespeare-800',
  },
  {
    icon: Target,
    title: 'Reuse Suitability Prediction',
    description:
      'ML models classify water suitability for irrigation, cooling, process reuse, or discharge based on real-time sensor values and learned patterns.',
    metrics: [
      'Safety Threshold Checks',
      'Confidence Estimates',
      'Rule + ML Hybrid Decisions',
    ],
    gradient: 'from-aqua-teal to-shakespeare-600',
  },
  {
    icon: AlertTriangle,
    title: 'Anomaly & Drift Detection',
    description:
      'AI continuously monitors for unusual patterns, hardware faults, contamination spikes, and data drift to maintain reliability and system safety.',
    metrics: [
      'Instant Alerts',
      'Sensor Fault Detection',
      'Data Drift Monitoring',
    ],
    gradient: 'from-orange-accent to-shakespeare-500',
  },
  ,

  // NEW: AI Chatbot
  {
    icon: MessageCircle,
    title: 'AI Chatbot Assistant',
    description: 'A conversational chatbot that answers queries, explains water parameters, and assists staff with real-time guidance.',
    metrics: ['24/7 Support', 'Query Resolution', 'Knowledge-based Assistance'],
    gradient: 'from-royal-blue to-shakespeare-500',
  },

  // NEW: AI Operations Agent
  {
    icon: Settings,
    title: 'Operational AI Agent',
    description: 'Acts on behalf of staff by suggesting or executing safe, approval-based routing, quality checks, and workflow automation.',
    metrics: ['Action Automation', 'Safety-first Control', 'Human-supervised AI'],
    gradient: 'from-shakespeare-600 to-aqua-teal',
  },
];


  return (
    <section className="relative py-32 overflow-hidden">
      {/* HD Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-30"
        >
          <source src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ef711400-4759-4522-a94e-77bc1b479bba/generated_videos/smooth-flowing-water-with-gentle-waves-a-85892792-20251130140158.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-br from-shakespeare-950/90 via-shakespeare-900/95 to-shakespeare-800/90"></div>
      </div>

      {/* 3D Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-shakespeare-400 rounded-full opacity-20 animate-float-3d"
            style={{
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${12 + Math.random() * 6}s`,
              filter: `blur(${Math.random() * 3}px)`,
            }}
          ></div>
        ))}
      </div>

      {/* Caustic light effect */}
      <div className="caustic-overlay z-10"></div>

      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-5 z-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-shakespeare-300"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 z-20">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <span className="inline-block px-6 py-2 glassmorphism-strong text-shakespeare-100 rounded-full font-bold text-sm mb-4 border border-shakespeare-400/30">
            Artificial Intelligence
          </span>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-shakespeare-50">
            Powered by <span className="text-gradient">Advanced AI & ML</span>
          </h2>
          <p className="text-xl text-shakespeare-200 max-w-3xl mx-auto">
            Our intelligent agent system learns from your water patterns and continuously optimizes for maximum efficiency
          </p>
        </motion.div>

        {/* AI Features Grid - Unique water shapes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {aiFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -15, scale: 1.03 }}
              className="group relative"
            >
              <div className="relative h-full glassmorphism-strong p-8 border-2 border-shakespeare-600/30 hover:border-shakespeare-400/50 transition-all duration-500 overflow-hidden animate-liquid-morph">
                {/* Gradient Glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-15 transition-opacity animate-water-flow`}></div>
                
                {/* Water texture */}
                <div className="absolute inset-0 water-texture opacity-30"></div>

                {/* Ripple effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-shakespeare-400/40 rounded-full animate-ripple-3d"></div>
                </div>
                
                {/* Icon with 3D depth */}
                <div className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 shadow-2xl group-hover:scale-110 transition-transform animate-float depth-layer-1`}
                  style={{
                    animationDelay: `${index * 0.4}s`
                  }}
                >
                  <feature.icon className="w-10 h-10 text-white" />
                </div>

                {/* Content */}
                <h3 className="relative text-2xl font-bold mb-4 group-hover:text-shakespeare-200 transition-colors z-10 text-shakespeare-100">
                  {feature.title}
                </h3>
                <p className="relative text-shakespeare-300 leading-relaxed mb-6 z-10">
                  {feature.description}
                </p>

                {/* Metrics */}
                <div className="relative flex flex-wrap gap-2 z-10">
                  {feature.metrics.map((metric, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 glassmorphism text-shakespeare-200 text-xs font-medium rounded-full border border-shakespeare-500/30"
                    >
                      {metric}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* AI Demo Section - Large liquid card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-6xl mx-auto"
        >
          <div className="relative glassmorphism-strong p-16 border-2 border-shakespeare-600/30 shadow-2xl overflow-hidden animate-liquid-morph">
            {/* HD Background with movement */}
            <div className="absolute inset-0 z-0 opacity-10">
              <img
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ef711400-4759-4522-a94e-77bc1b479bba/generated_images/crystal-clear-water-flowing-in-waves-wit-6a4f2083-20251130140111.jpg"
                alt=""
                className="w-full h-full object-cover animate-wave-flow-3d"
              />
            </div>

            {/* Water texture */}
            <div className="absolute inset-0 water-texture opacity-40"></div>

            {/* Floating particles */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-3 h-3 bg-shakespeare-300 rounded-full opacity-30 animate-float-3d"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 4}s`,
                  }}
                ></div>
              ))}
            </div>

            <div className="relative text-center z-10">
              <div className="inline-flex items-center space-x-2 px-6 py-3 glassmorphism rounded-full mb-8 border border-shakespeare-500/30">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-shakespeare-200 font-bold">AI Agents Active</span>
              </div>

              <h3 className="text-4xl md:text-5xl font-bold mb-8 text-shakespeare-50">
                See AquaSense Intelligence in Action
              </h3>
              <p className="text-xl text-shakespeare-200 mb-12 max-w-3xl mx-auto">
                Our AI system processes millions of data points every second to deliver real-time insights and automated decision-making
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {[
                  { value: '10K+', label: 'Data Points/Min', gradient: 'from-shakespeare-400 to-shakespeare-600' },
                  { value: '3', label: 'Active AI Agents cum bots', gradient: 'from-aqua-teal to-shakespeare-500' },
                  { value: '1s', label: 'Response Time', gradient: 'from-orange-accent to-shakespeare-600' },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="glassmorphism-strong rounded-2xl p-8 border-2 border-shakespeare-500/30 overflow-hidden animate-liquid-morph"
                    style={{
                      animationDelay: `${index * 0.3}s`
                    }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-10 animate-water-flow`}></div>
                    <div className="relative z-10">
                      <div className="text-5xl font-bold text-aqua-teal mb-3">{stat.value}</div>
                      <div className="text-shakespeare-300 font-semibold">{stat.label}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
<Link href="/ai-chat">
              <button className="px-10 py-5 bg-gradient-to-r from-shakespeare-500 to-shakespeare-600 text-white font-bold text-lg rounded-full shadow-2xl hover:shadow-shakespeare-500/50 hover:scale-105 transition-all">
                Explore
              </button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}