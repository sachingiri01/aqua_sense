"use client";

import { motion } from 'framer-motion';
import { ArrowRight, Play, Droplets, TrendingUp, Zap } from 'lucide-react';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* HD Video Background with 3D flowing water */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ef711400-4759-4522-a94e-77bc1b479bba/generated_videos/close-up-of-water-droplets-falling-and-c-e21a1042-20251130140131.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-shakespeare-950/70 via-shakespeare-900/80 to-shakespeare-950/90 opacity-80"></div>
      </div>

      {/* Caustic Light Effect - creates water refraction illusion */}
      <div className="caustic-overlay z-10"></div>

      {/* 3D Floating Water Droplets with depth */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-shakespeare-300 rounded-full opacity-40 animate-float-3d"
            style={{
              width: `${Math.random() * 8 + 4}px`,
              height: `${Math.random() * 8 + 4}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${10 + Math.random() * 5}s`,
              filter: `blur(${Math.random() * 2}px)`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 py-32 pt-40">
        <div className="max-w-6xl mx-auto text-center">
          {/* Badge with glassmorphism */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 glassmorphism-strong px-6 py-3 rounded-full shadow-2xl mb-8 border border-shakespeare-400/30"
          >
            {/* <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span> */}
            <Image 
      src="/SIH.png"   // file in public folder
      alt="Water tank"
      width={50}
      height={30}
      className="rounded-lg"
    /> 
            <span className="text-shakespeare-100 font-semibold">In Smart India Hackathon 2025</span>
          </motion.div>

          {/* Main Headline with enhanced gradient */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-7xl lg:text-8xl font-bold text-shakespeare-50 mb-8 leading-tight"
          >
            Where Data, AI, and
            <br />
            <span className="text-gradient">Water Flow Together</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-shakespeare-200 mb-12 max-w-4xl mx-auto leading-relaxed"
          >
            India's smartest water reuse intelligence system. Maximizing water efficiency through real-time monitoring, AI forecasting, and IoT integration.
          </motion.p>

          {/* CTA Buttons with ripple effect */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20"
          >
            <button className="group relative px-10 py-5 bg-gradient-to-r from-orange-accent to-shakespeare-500 text-white font-bold text-lg rounded-full overflow-hidden shadow-2xl hover:shadow-orange-accent/50 transition-all hover:scale-105">
              <span className="relative z-10 flex items-center space-x-2">
                <span>Explore AquaSense</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-shakespeare-400 to-royal-blue opacity-0 group-hover:opacity-100 transition-opacity animate-water-flow"></div>
            </button>

            <button className="group px-10 py-5 glassmorphism-strong text-shakespeare-100 font-bold text-lg rounded-full border-2 border-shakespeare-400/50 hover:border-shakespeare-300 transition-all hover:scale-105 shadow-2xl">
              <span className="flex items-center space-x-2">
                <Play className="w-5 h-5" />
                <span>Watch Demo</span>
              </span>
            </button>
          </motion.div>

          {/* Stats - Water-themed liquid cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          >
            {[
              { icon: Droplets, value: '50M+', label: 'Liters Saved Daily', gradient: 'from-shakespeare-400 to-shakespeare-600' },
              { icon: TrendingUp, value: '85%', label: 'Efficiency Boost', gradient: 'from-aqua-teal to-shakespeare-500' },
              { icon: Zap, value: 'Real-time', label: 'AI Monitoring', gradient: 'from-orange-accent to-shakespeare-600' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10, scale: 1.05 }}
                className="group relative glassmorphism-strong rounded-3xl p-8 border-2 border-shakespeare-400/30 shadow-2xl overflow-hidden animate-liquid-morph"
                style={{
                  animationDelay: `${index * 0.5}s`
                }}
              >
                {/* Animated gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-10 group-hover:opacity-20 transition-opacity animate-water-flow`}></div>
                
                {/* Water texture */}
                <div className="absolute inset-0 water-texture opacity-30"></div>

                {/* Icon with 3D depth */}
                <div className={`relative mx-auto w-16 h-16 bg-gradient-to-br ${stat.gradient} rounded-2xl flex items-center justify-center mb-4 shadow-xl group-hover:scale-110 transition-transform depth-layer-1`}>
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                
                {/* Stats */}
                <div className="relative z-10">
                  <div className="text-5xl font-bold text-shakespeare-50 mb-2">{stat.value}</div>
                  <div className="text-shakespeare-200 font-semibold">{stat.label}</div>
                </div>

                {/* Ripple effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-shakespeare-300/50 rounded-full animate-ripple-3d"></div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <div className="w-6 h-10 border-2 border-shakespeare-300 rounded-full flex items-start justify-center p-2 glassmorphism">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-shakespeare-300 rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}