"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Cpu, FlaskConical, TrendingUp } from 'lucide-react';

export default function CTASection() {
  const sectionRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.5]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <section ref={sectionRef} className="relative py-32 bg-gradient-to-br from-shakespeare-900 via-shakespeare-800 to-shakespeare-950 overflow-hidden">
      {/* Animated Background effects */}
      <motion.div 
        className="absolute inset-0 water-texture opacity-20"
        style={{ y }}
      />
      <div className="caustic-overlay"></div>

      {/* Animated water ripples with Scroll */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute border-2 border-shakespeare-400/20 rounded-full"
            style={{
              width: `${300 + i * 200}px`,
              height: `${300 + i * 200}px`,
              left: '50%',
              top: '50%',
              marginLeft: `-${150 + i * 100}px`,
              marginTop: `-${150 + i * 100}px`,
              scale: useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 1.2]),
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0, 0.3]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              delay: i * 1.2
            }}
          />
        ))}
      </div>

      {/* Floating particles with Parallax */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-shakespeare-300 rounded-full opacity-30"
            style={{
              width: `${Math.random() * 8 + 2}px`,
              height: `${Math.random() * 8 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              y: useTransform(scrollYProgress, [0, 1], [0, (i - 15) * 30]),
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, Math.random() * 30 - 15, 0],
              opacity: [0.2, 0.6, 0.2]
            }}
            transition={{
              duration: 5 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3
            }}
          />
        ))}
      </div>

      <motion.div 
        className="container mx-auto px-4 relative z-10"
        style={{ opacity, scale }}
      >
        <div className="max-w-5xl mx-auto text-center">
          {/* Main Message with Scroll Reveal */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            {/* Animated Icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block mb-8"
            >
              <motion.div
                className="w-24 h-24 mx-auto bg-gradient-to-br from-aqua-teal to-shakespeare-500 rounded-3xl flex items-center justify-center shadow-2xl"
                style={{ rotate }}
                whileHover={{ scale: 1.1 }}
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotateZ: [0, 10, -10, 0]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  💧
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.h2 
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-shakespeare-50 mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Let's Build a Sustainable India —
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-aqua-teal via-royal-blue to-orange-accent">
                One Drop at a Time
              </span>
            </motion.h2>

            <motion.p 
              className="text-xl md:text-2xl text-shakespeare-200 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              Join the water revolution. Explore our AI-powered platform and discover how technology can save millions of liters every day.
            </motion.p>
          </motion.div>

          {/* CTA Buttons with Stagger */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20"
          >
            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: "0 20px 60px rgba(255, 144, 19, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-10 py-5 bg-gradient-to-r from-orange-accent to-shakespeare-500 text-white font-bold text-lg rounded-full overflow-hidden shadow-2xl"
            >
              <span className="relative z-10 flex items-center space-x-2">
                <span>Learn More</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </span>
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-shakespeare-400 to-royal-blue"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>

            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group px-10 py-5 glassmorphism-strong text-shakespeare-100 font-bold text-lg rounded-full border-2 border-shakespeare-400/50 hover:border-shakespeare-300 shadow-2xl"
            >
              <span className="flex items-center space-x-2">
                <FlaskConical className="w-5 h-5" />
                <span>Try Reuse Simulator</span>
              </span>
            </motion.button>

            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group px-10 py-5 glassmorphism-strong text-shakespeare-100 font-bold text-lg rounded-full border-2 border-shakespeare-400/50 hover:border-shakespeare-300 shadow-2xl"
            >
              <span className="flex items-center space-x-2">
                <Cpu className="w-5 h-5" />
                <span>Explore ML Models</span>
              </span>
            </motion.button>
          </motion.div>

          {/* Stats/Impact Cards with 3D Effects */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          >
            {[
              { 
                icon: '🌊', 
                value: '50M+', 
                label: 'Liters Saved Daily',
                gradient: 'from-shakespeare-400 to-shakespeare-600',
                delay: 0
              },
              { 
                icon: '🤖', 
                value: 'AI-Powered', 
                label: 'Smart Predictions',
                gradient: 'from-royal-blue to-aqua-teal',
                delay: 0.1
              },
              { 
                icon: '🇮🇳', 
                value: 'India-First', 
                label: 'Water Intelligence',
                gradient: 'from-orange-accent to-shakespeare-500',
                delay: 0.2
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, rotateX: -20 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.9 + stat.delay, type: "spring" }}
                whileHover={{ 
                  y: -15, 
                  scale: 1.05,
                  rotateY: 5,
                  transition: { duration: 0.3 }
                }}
                className="group relative glassmorphism-strong rounded-3xl p-8 border-2 border-shakespeare-400/30 shadow-2xl overflow-hidden"
                style={{ 
                  perspective: '1000px',
                  transformStyle: 'preserve-3d'
                }}
              >
                {/* Animated gradient background */}
                <motion.div 
                  className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-10`}
                  animate={{
                    opacity: [0.1, 0.2, 0.1]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.5
                  }}
                />
                
                {/* Water texture */}
                <div className="absolute inset-0 water-texture opacity-30"></div>

                {/* Icon */}
                <motion.div 
                  className="relative mx-auto text-6xl mb-4"
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.15, 1]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: index * 0.7
                  }}
                >
                  {stat.icon}
                </motion.div>
                
                {/* Stats */}
                <div className="relative z-10">
                  <motion.div 
                    className="text-4xl font-bold text-shakespeare-50 mb-2"
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1 + index * 0.1 }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-shakespeare-200 font-semibold">{stat.label}</div>
                </div>

                {/* Ripple effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-shakespeare-300/50 rounded-full"
                      style={{
                        width: `${80 + i * 40}px`,
                        height: `${80 + i * 40}px`,
                      }}
                      animate={{
                        scale: [1, 1.5],
                        opacity: [0.5, 0]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.4
                      }}
                    />
                  ))}
                </div>

                {/* 3D Shadow */}
                <div className="absolute inset-0 bg-shakespeare-900/30 rounded-3xl blur-xl opacity-0 group-hover:opacity-70 transition-opacity -z-10" 
                     style={{ transform: 'translateZ(-50px) translateY(20px)' }} 
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Additional Message with Fade */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.2 }}
            className="mt-16 text-shakespeare-300 text-lg"
          >
            <motion.p
              animate={{
                opacity: [0.7, 1, 0.7]
              }}
              transition={{
                duration: 3,
                repeat: Infinity
              }}
            >
              Every drop counts. Every action matters. Together, we can transform India's water future.
            </motion.p>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom wavy divider - Animated */}
      <div className="absolute bottom-0 left-0 w-full h-24">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full">
          <motion.path 
            d="M0,50 Q300,10 600,50 T1200,50 L1200,120 L0,120 Z" 
            fill="#f1fafe"
            animate={{
              d: [
                "M0,50 Q300,10 600,50 T1200,50 L1200,120 L0,120 Z",
                "M0,50 Q300,90 600,50 T1200,50 L1200,120 L0,120 Z",
                "M0,50 Q300,10 600,50 T1200,50 L1200,120 L0,120 Z"
              ]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </svg>
      </div>
    </section>
  );
}