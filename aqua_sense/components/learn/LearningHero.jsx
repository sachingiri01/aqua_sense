"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, BookOpen, MapPin } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

export default function LearningHero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.8]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* HD Video Background - Water Ripple with Parallax */}
      <motion.div className="absolute inset-0 z-0" style={{ y }}>
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-30"
        >
          <source src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ef711400-4759-4522-a94e-77bc1b479bba/generated_videos/close-up-of-water-droplets-falling-and-c-e21a1042-20251130140131.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-shakespeare-950 via-shakespeare-900/95 to-shakespeare-800/90"></div>
      </motion.div>

      {/* Floating India Map Silhouette - Enhanced 3D */}
      <motion.div 
        className="absolute inset-0 opacity-10"
        style={{ 
          y: useTransform(scrollY, [0, 500], [0, -100]),
          rotateX: useTransform(scrollY, [0, 500], [0, 15])
        }}
      >
        <svg viewBox="0 0 1000 1000" className="w-full h-full animate-float-3d">
          <path
            d="M 650 150 L 680 180 L 690 220 L 670 260 L 680 300 L 650 340 L 620 380 L 600 420 L 580 460 L 560 500 L 540 540 L 520 580 L 500 620 L 480 650 L 460 680 L 440 700 L 420 680 L 400 660 L 380 640 L 360 620 L 340 600 L 320 580 L 300 560 L 280 540 L 260 520 L 240 500 L 230 480 L 220 460 L 210 440 L 200 420 L 190 400 L 180 380 L 190 360 L 200 340 L 220 320 L 240 300 L 260 280 L 280 260 L 300 250 L 320 240 L 340 230 L 360 220 L 380 210 L 400 200 L 420 190 L 440 185 L 460 180 L 480 175 L 500 170 L 520 165 L 540 160 L 560 155 L 580 152 L 600 150 L 620 148 L 640 147 L 650 150 Z"
            fill="url(#indiaGradient)"
            className="animate-pulse"
          />
          <defs>
            <linearGradient id="indiaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4ac0e6" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#1488b5" stopOpacity="0.3" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Enhanced Floating Water Droplets - Parallax Layers */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-shakespeare-300 rounded-full opacity-50 animate-float-3d"
            style={{
              width: `${Math.random() * 12 + 6}px`,
              height: `${Math.random() * 12 + 6}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${8 + Math.random() * 4}s`,
              filter: `blur(${Math.random() * 3}px)`,
              y: useTransform(scrollY, [0, 500], [0, -i * 20]),
            }}
            animate={{
              x: (mousePosition.x - 50) * (i * 0.3),
              y: (mousePosition.y - 50) * (i * 0.3),
            }}
            transition={{ type: "spring", stiffness: 50, damping: 10 }}
          />
        ))}
      </div>

      {/* Caustic Light Effect - Animated */}
      <div className="caustic-overlay z-10"></div>

      {/* Main Content with Scroll Effects */}
      <motion.div 
        className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 py-32 pt-40"
        style={{ opacity, scale }}
      >
        <div className="max-w-6xl mx-auto text-center">
          {/* Badge with Bounce */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center space-x-2 glassmorphism-strong px-6 py-3 rounded-full shadow-2xl mb-8 border border-shakespeare-400/30"
          >
            <BookOpen className="w-5 h-5 text-shakespeare-200" />
            <span className="text-shakespeare-100 font-semibold">Learn About India's Water Crisis</span>
          </motion.div>

          {/* Main Headline with Staggered Animation */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl sm:text-7xl lg:text-8xl font-display font-black tracking-tight mb-8"
          >
            <motion.span 
              className="block text-transparent bg-clip-text bg-gradient-to-r from-shakespeare-100 via-shakespeare-300 to-aqua-teal"
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{ duration: 5, repeat: Infinity }}
              style={{ backgroundSize: '200% 200%' }}
            >
              Understand Water.
            </motion.span>
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="block text-transparent bg-clip-text bg-gradient-to-r from-aqua-teal via-shakespeare-400 to-royal-blue mt-2"
            >
              Reuse Water.
            </motion.span>
            <motion.span 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="block text-transparent bg-clip-text bg-gradient-to-r from-royal-blue via-orange-accent to-shakespeare-300 mt-2"
            >
              Save the Future.
            </motion.span>
          </motion.h1>

          {/* Subtitle with Fade */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-xl sm:text-2xl text-shakespeare-200 max-w-3xl mx-auto leading-relaxed font-light mb-12"
          >
            AquaSense brings <span className="font-bold text-aqua-teal">India-first</span> water intelligence and sustainability learning.
            <br />
            Powered by <span className="font-bold text-orange-accent">Smart AI</span> and <span className="font-bold text-royal-blue">Real Data</span>.
          </motion.p>

          {/* CTA Buttons with Hover Effects */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8"
          >
            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: "0 20px 60px rgba(0, 70, 255, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-10 py-5 bg-gradient-to-r from-royal-blue to-shakespeare-600 text-white rounded-full font-semibold text-lg shadow-2xl overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Start Learning
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-shakespeare-400 to-aqua-teal"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>

            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group px-10 py-5 glassmorphism-strong text-shakespeare-100 rounded-full font-semibold text-lg border-2 border-shakespeare-300/30 hover:border-aqua-teal/50 shadow-2xl"
            >
              <span className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Explore India's Water Map
              </span>
            </motion.button>
          </motion.div>

          {/* Enhanced Scroll Indicator */}
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20"
          >
            <div className="flex flex-col items-center gap-2">
              <span className="text-shakespeare-300 text-sm font-semibold">Scroll to explore</span>
              <div className="w-6 h-10 border-2 border-shakespeare-300 rounded-full flex items-start justify-center p-2 glassmorphism">
                <motion.div
                  animate={{ y: [0, 16, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-1.5 h-3 bg-shakespeare-300 rounded-full"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Wave Divider at Bottom - Animated */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <svg viewBox="0 0 1200 120" className="w-full h-auto" preserveAspectRatio="none">
          <motion.path
            d="M0,60 C200,90 400,90 600,60 C800,30 1000,30 1200,60 L1200,120 L0,120 Z"
            fill="url(#waveGradient)"
            animate={{
              d: [
                "M0,60 C200,90 400,90 600,60 C800,30 1000,30 1200,60 L1200,120 L0,120 Z",
                "M0,60 C200,30 400,30 600,60 C800,90 1000,90 1200,60 L1200,120 L0,120 Z",
                "M0,60 C200,90 400,90 600,60 C800,30 1000,30 1200,60 L1200,120 L0,120 Z"
              ]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f1fafe" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#f1fafe" stopOpacity="1" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
}