"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { BookOpen, Droplets, Cpu, TrendingUp, Microscope, Globe, GraduationCap, ArrowRight } from 'lucide-react';

const modules = [
  {
    id: 'basics',
    title: 'Basics of Water Quality',
    description: 'Learn about TDS, pH, turbidity, and why they matter for safe water',
    icon: Droplets,
    color: 'from-shakespeare-400 to-shakespeare-600',
    duration: '15 min',
    level: 'Beginner',
    illustration: 'https://images.unsplash.com/photo-1581093458791-9d42e1c5e2e9?w=400'
  },
  {
    id: 'wastewater',
    title: 'How Wastewater Becomes Reusable',
    description: 'Explore the complete treatment process from sewage to clean water',
    icon: BookOpen,
    color: 'from-aqua-teal to-shakespeare-500',
    duration: '20 min',
    level: 'Beginner',
    illustration: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400'
  },
  {
    id: 'sensors',
    title: 'Sensors Used in Water Monitoring',
    description: 'Understand IoT sensors that measure TDS, pH, DO, and turbidity',
    icon: Microscope,
    color: 'from-royal-blue to-aqua-teal',
    duration: '18 min',
    level: 'Intermediate',
    illustration: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400'
  },
  {
    id: 'ml',
    title: 'Machine Learning in Water Treatment',
    description: 'How AI predicts water quality and optimizes treatment processes',
    icon: Cpu,
    color: 'from-orange-accent to-royal-blue',
    duration: '25 min',
    level: 'Advanced',
    illustration: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400'
  },
  {
    id: 'aquasense',
    title: 'How AquaSense Predicts Suitability',
    description: 'Deep dive into our ML models and AI agents for water reuse',
    icon: TrendingUp,
    color: 'from-shakespeare-600 to-shakespeare-800',
    duration: '30 min',
    level: 'Advanced',
    illustration: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400'
  },
  {
    id: 'crisis',
    title: "India's Water Crisis Explained",
    description: 'Regional challenges, statistics, and the urgent need for reuse',
    icon: Globe,
    color: 'from-red-500 to-orange-accent',
    duration: '22 min',
    level: 'Beginner',
    illustration: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400'
  },
  {
    id: 'students',
    title: 'Sustainability for Students',
    description: 'How young Indians can contribute to water conservation',
    icon: GraduationCap,
    color: 'from-green-500 to-aqua-teal',
    duration: '12 min',
    level: 'Beginner',
    illustration: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400'
  }
];

const levelColors = {
  'Beginner': 'bg-green-500',
  'Intermediate': 'bg-yellow-500',
  'Advanced': 'bg-orange-accent'
};

export default function ModulesGrid() {
  const sectionRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  const headerY = useTransform(scrollYProgress, [0, 0.3], [100, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <section ref={sectionRef} className="relative py-32 bg-gradient-to-b from-shakespeare-50 to-shakespeare-100 overflow-hidden">
      {/* Animated Background effects */}
      <motion.div 
        className="absolute inset-0 water-texture opacity-20"
        style={{ y: backgroundY }}
      />

      {/* Floating Water Droplets */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-br from-shakespeare-400/30 to-aqua-teal/30 blur-xl"
            style={{
              width: `${50 + Math.random() * 100}px`,
              height: `${50 + Math.random() * 100}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              y: useTransform(scrollYProgress, [0, 1], [0, (i - 7) * 80]),
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 5 + Math.random() * 3,
              repeat: Infinity,
              delay: i * 0.4,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header with Parallax */}
        <motion.div
          style={{ y: headerY, opacity: headerOpacity }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-shakespeare-600/10 border border-shakespeare-400/30 mb-6"
          >
            <BookOpen className="w-4 h-4 text-shakespeare-600" />
            <span className="text-sm font-semibold text-shakespeare-700">Interactive Courses</span>
          </motion.div>

          <h2 className="text-5xl md:text-6xl font-display font-black text-shakespeare-900 mb-6">
            Learning <span className="text-transparent bg-clip-text bg-gradient-to-r from-royal-blue to-aqua-teal">Modules</span>
          </h2>
          <p className="text-xl text-shakespeare-700 max-w-3xl mx-auto">
            Start your water sustainability journey with bite-sized, interactive courses
          </p>
        </motion.div>

        {/* Modules Grid with Stagger & Scroll Effects */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {modules.map((module, index) => {
            const row = Math.floor(index / 3);
            const col = index % 3;
            
            return (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 60, rotateX: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ 
                  delay: col * 0.1 + row * 0.2,
                  duration: 0.6,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  y: -15, 
                  scale: 1.03,
                  rotateY: 5,
                  transition: { duration: 0.3 }
                }}
                className="group relative cursor-pointer"
                style={{ 
                  perspective: '1000px',
                  transformStyle: 'preserve-3d'
                }}
              >
                <div className="relative glassmorphism-strong rounded-3xl overflow-hidden border-2 border-shakespeare-400/30 shadow-xl hover:shadow-2xl transition-all">
                  {/* Image with gradient overlay & Parallax */}
                  <div className="relative h-48 overflow-hidden">
                    <motion.img 
                      src={module.illustration} 
                      alt={module.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.15 }}
                      transition={{ duration: 0.6 }}
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${module.color} opacity-60 group-hover:opacity-70 transition-opacity`}></div>
                    
                    {/* Icon with Float Animation */}
                    <motion.div 
                      className="absolute top-4 left-4"
                      animate={{ 
                        y: [0, -8, 0],
                        rotateZ: [0, 5, -5, 0]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: index * 0.2
                      }}
                    >
                      <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30 shadow-lg">
                        <module.icon className="w-7 h-7 text-white" />
                      </div>
                    </motion.div>

                    {/* Level badge with Pulse */}
                    <motion.div 
                      className="absolute top-4 right-4"
                      whileHover={{ scale: 1.1 }}
                    >
                      <div className={`${levelColors[module.level]} text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg`}>
                        {module.level}
                      </div>
                    </motion.div>

                    {/* Shine effect on hover */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.6 }}
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-4">
                    <h3 className="text-2xl font-bold text-shakespeare-900 group-hover:text-shakespeare-700 transition-colors">
                      {module.title}
                    </h3>
                    
                    <p className="text-shakespeare-700 leading-relaxed">
                      {module.description}
                    </p>

                    {/* Duration & CTA */}
                    <div className="flex items-center justify-between pt-4 border-t border-shakespeare-300/30">
                      <div className="flex items-center space-x-2 text-sm text-shakespeare-600">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{module.duration}</span>
                      </div>

                      <motion.button 
                        whileHover={{ scale: 1.05, x: 5 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-shakespeare-500 to-royal-blue text-white rounded-full font-semibold text-sm shadow-lg hover:shadow-xl transition-all"
                      >
                        <span>Start</span>
                        <ArrowRight className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>

                  {/* Water ripple effect on hover */}
                  <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute border-2 border-shakespeare-400/30 rounded-full"
                        style={{
                          width: `${100 + i * 50}px`,
                          height: `${100 + i * 50}px`,
                          left: '50%',
                          top: '50%',
                          marginLeft: `-${50 + i * 25}px`,
                          marginTop: `-${50 + i * 25}px`,
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
                </div>

                {/* 3D Shadow Effect */}
                <div className="absolute inset-0 bg-shakespeare-900/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity -z-10" 
                     style={{ transform: 'translateY(20px)' }} 
                />
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 20px 60px rgba(20, 136, 181, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-shakespeare-600 to-royal-blue text-white rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transition-all"
          >
            View All Courses
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}