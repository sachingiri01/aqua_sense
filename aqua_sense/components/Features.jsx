"use client";

import { motion } from 'framer-motion';
import { Droplets, Brain, Gauge, Wifi, TrendingUp, Shield, Cloud, Users } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: Droplets,
      title: 'Real-time Water Monitoring',
      description: 'Track water quality, flow rates, and usage patterns with IoT sensors across your facility in real-time.',
      gradient: 'from-shakespeare-400 to-shakespeare-600',
      shape: 'droplet',
    },
    {
      icon: Brain,
      title: 'AI-Powered Forecasting',
      description: 'Machine learning models predict optimal reuse scenarios based on historical data and real-time inputs.',
      gradient: 'from-aqua-teal to-shakespeare-500',
      shape: 'wave',
    },
    {
      icon: TrendingUp,
      title: 'Smart Reuse Suggestions',
      description: 'Get intelligent recommendations for water reuse opportunities based on quality analysis and demand patterns.',
      gradient: 'from-shakespeare-500 to-royal-blue',
      shape: 'ripple',
    },
    {
      icon: Wifi,
      title: 'IoT Device Integration',
      description: 'Seamlessly connect with existing water infrastructure and smart devices for comprehensive monitoring.',
      gradient: 'from-orange-accent to-shakespeare-600',
      shape: 'liquid',
    },
    {
      icon: Gauge,
      title: 'Performance Analytics',
      description: 'Detailed dashboards and reports showing current batch details, efficiency metrics, and environmental impact.',
      gradient: 'from-shakespeare-600 to-shakespeare-800',
      shape: 'wave',
    },
    {
      icon: Shield,
      title: 'Quality Assurance',
      description: 'Automated water quality checks ensure reused water meets safety standards for its intended purpose.',
      gradient: 'from-aqua-teal to-shakespeare-700',
      shape: 'droplet',
    },
    {
      icon: Cloud,
      title: 'Remote-Based Platform',
      description: 'Access your water management system from anywhere with secure infrastructure.',
      gradient: 'from-shakespeare-400 to-royal-blue',
      shape: 'liquid',
    },
    {
      icon: Users,
      title: 'SIH-Ready Innovation',
      description: 'Built specifically for Indian water challenges with scalable solutions for industries and agriculture.',
      gradient: 'from-orange-accent to-aqua-teal',
      shape: 'ripple',
    },
  ];

  const getShapeClass = (shape) => {
    switch(shape) {
      case 'droplet': return 'water-card-droplet';
      case 'wave': return 'water-card-wave';
      case 'ripple': return 'water-card-ripple';
      case 'liquid': return 'animate-liquid-morph';
      default: return 'rounded-3xl';
    }
  };

  return (
    <section id="features" className="relative py-32 overflow-hidden">
      {/* HD Background Image with overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ef711400-4759-4522-a94e-77bc1b479bba/generated_images/underwater-scene-with-water-droplets-and-2bf1b9d8-20251130140112.jpg"
          alt=""
          className="w-full h-full object-cover opacity-15 animate-depth-3d"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-shakespeare-50 via-shakespeare-100/95 to-shakespeare-200/90"></div>
      </div>

      {/* Floating particles for movement */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-shakespeare-400 rounded-full opacity-20 animate-float-3d"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${8 + Math.random() * 4}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Caustic light overlay */}
      <div className="caustic-overlay z-10"></div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 z-20">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-6 py-2 glassmorphism-strong text-shakespeare-800 rounded-full font-bold text-sm mb-4 border border-shakespeare-400/30">
            Waves of Innovation
          </span>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-shakespeare-950 mb-6">
            Powerful Features for
            <br />
            <span className="text-gradient">Smart Water Management</span>
          </h2>
          <p className="text-xl text-shakespeare-700 max-w-3xl mx-auto">
            AquaSense combines cutting-edge technology with practical solutions to revolutionize water reuse in India.
          </p>
        </motion.div>

        {/* Features Grid - Water-themed shapes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -15, scale: 1.03 }}
              className="group relative"
            >
              <div className={`relative h-full glassmorphism-strong p-8 shadow-2xl border-2 border-shakespeare-400/30 hover:border-shakespeare-500/50 transition-all duration-500 overflow-hidden ${getShapeClass(feature.shape)}`}>
                {/* Animated gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-15 transition-opacity duration-500 animate-water-flow`}></div>
                
                {/* Water texture */}
                <div className="absolute inset-0 water-texture opacity-40"></div>

                {/* Ripple effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 border-2 border-shakespeare-400/40 rounded-full animate-ripple-3d"></div>
                </div>

                {/* Icon with 3D depth */}
                <div className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 transition-transform animate-float depth-layer-1`}
                  style={{
                    animationDelay: `${index * 0.3}s`
                  }}
                >
                  <feature.icon className="w-10 h-10 text-white" />
                </div>

                {/* Content */}
                <h3 className="relative text-2xl font-bold text-shakespeare-900 mb-4 group-hover:text-shakespeare-700 transition-colors z-10">
                  {feature.title}
                </h3>
                <p className="relative text-shakespeare-700 leading-relaxed z-10">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-20"
        >
          {/* <button className="px-10 py-5 bg-gradient-to-r from-shakespeare-500 to-shakespeare-600 text-white font-bold text-lg rounded-full shadow-2xl hover:shadow-shakespeare-500/50 hover:scale-105 transition-all">
            Explore All Features
          </button> */}
        </motion.div>
      </div>
    </section>
  );
}