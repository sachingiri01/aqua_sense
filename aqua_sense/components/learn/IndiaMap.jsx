"use client";

import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useState, useRef } from 'react';
import { X, Droplet, TrendingDown, AlertCircle, CheckCircle } from 'lucide-react';

const statesData = [
  {
    id: 'rajasthan',
    name: 'Rajasthan',
    status: 'severe',
    position: { x: 25, y: 35 },
    issues: ['Extreme water scarcity', 'Desert climate challenges', 'Groundwater depletion'],
    stats: { groundwater: '15%', pollution: 'Moderate', rainfall: '250mm/year' },
    image: 'https://images.unsplash.com/photo-1618944847828-82e943c3bdb7?w=800',
    reuse: 'Wastewater reuse can provide 40% of agricultural water needs',
    aiSolution: 'ML models predict optimal reuse timing for crops, reducing water waste by 35%'
  },
  {
    id: 'maharashtra',
    name: 'Maharashtra',
    status: 'depletion',
    position: { x: 30, y: 50 },
    issues: ['Groundwater over-extraction', 'Industrial pollution', 'Farmer water stress'],
    stats: { groundwater: '45%', pollution: 'High', rainfall: '800mm/year' },
    image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=800',
    reuse: 'Industrial wastewater can be treated for irrigation, saving 2.5M liters daily',
    aiSolution: 'IoT sensors + AI agents optimize water routing for sugarcane farms'
  },
  {
    id: 'tamilnadu',
    name: 'Tamil Nadu',
    status: 'pollution',
    position: { x: 35, y: 70 },
    issues: ['River pollution from textiles', 'Coastal salinity intrusion', 'Urban water shortage'],
    stats: { groundwater: '60%', pollution: 'Very High', rainfall: '950mm/year' },
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800',
    reuse: 'Textile wastewater treatment enables 60% reuse for dyeing processes',
    aiSolution: 'AquaSense predicts TDS & turbidity to ensure safe textile reuse'
  },
  {
    id: 'punjab',
    name: 'Punjab',
    status: 'depletion',
    position: { x: 30, y: 20 },
    issues: ['Agricultural over-pumping', 'Groundwater falling rapidly', 'Rice-wheat cycle stress'],
    stats: { groundwater: '35%', pollution: 'Moderate', rainfall: '600mm/year' },
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800',
    reuse: 'Canal water reuse + treated sewage can save 30% groundwater extraction',
    aiSolution: 'ML forecasts crop water needs, optimizing canal + reuse water mix'
  },
  {
    id: 'kerala',
    name: 'Kerala',
    status: 'moderate',
    position: { x: 32, y: 68 },
    issues: ['Seasonal flooding', 'Monsoon dependency', 'Urban sprawl impacts'],
    stats: { groundwater: '75%', pollution: 'Low', rainfall: '3000mm/year' },
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800',
    reuse: 'Rainwater harvesting + reuse systems can support year-round supply',
    aiSolution: 'AquaSense agents predict monsoon patterns for optimal storage'
  },
  {
    id: 'delhi',
    name: 'Delhi NCR',
    status: 'severe',
    position: { x: 32, y: 28 },
    issues: ['Yamuna pollution critical', 'Population density stress', 'Groundwater contamination'],
    stats: { groundwater: '25%', pollution: 'Critical', rainfall: '700mm/year' },
    image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800',
    reuse: 'Decentralized wastewater treatment can provide 50% of non-potable needs',
    aiSolution: 'Real-time ML monitoring ensures safe reuse standards for urban gardens'
  },
];

const statusConfig = {
  severe: { color: 'text-red-500', bg: 'bg-red-500/20', label: '🔴 Severe Scarcity', border: 'border-red-400' },
  depletion: { color: 'text-orange-600', bg: 'bg-orange-500/20', label: '🟠 Groundwater Depletion', border: 'border-orange-400' },
  pollution: { color: 'text-yellow-500', bg: 'bg-yellow-500/20', label: '🟡 River Pollution', border: 'border-yellow-400' },
  moderate: { color: 'text-green-500', bg: 'bg-green-500/20', label: '🟢 Moderate', border: 'border-green-400' }
};

export default function IndiaMap() {
  const [selectedState, setSelectedState] = useState(null);
  const sectionRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  const mapScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.95]);
  const mapRotate = useTransform(scrollYProgress, [0, 0.5, 1], [-5, 0, 5]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section ref={sectionRef} className="relative py-32 bg-shakespeare-50 overflow-hidden">
      {/* Animated Background effects */}
      <motion.div className="absolute inset-0 water-texture opacity-30" style={{ y: backgroundY }} />
      <div className="caustic-overlay"></div>

      {/* Floating Bubbles with Scroll */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-16 h-16 rounded-full bg-gradient-to-br from-shakespeare-300/20 to-shakespeare-500/20"
            style={{
              left: `${i * 9}%`,
              top: `${(i * 13) % 80}%`,
              y: useTransform(scrollYProgress, [0, 1], [0, -i * 50]),
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header with Scroll Animation */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-shakespeare-600/10 border border-shakespeare-400/30 mb-6"
          >
            <Droplet className="w-4 h-4 text-shakespeare-600" />
            <span className="text-sm font-semibold text-shakespeare-700">Geo-Visualization</span>
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl lg:text-6xl font-display font-black text-shakespeare-900 mb-6">
            India's Water Crisis{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-royal-blue to-aqua-teal">Map</span>
          </h2>
          <p className="text-lg text-shakespeare-700 max-w-2xl mx-auto">
            Click on any region to explore local water challenges and how AquaSense provides solutions
          </p>
        </motion.div>

        {/* Legend with Stagger */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-6 mb-12"
        >
          {Object.entries(statusConfig).map(([key, config], index) => (
            <motion.div 
              key={key} 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 glassmorphism-strong px-4 py-2 rounded-full cursor-pointer"
            >
              <div className={`w-3 h-3 rounded-full bg-red-500 ${key === 'severe' ? 'animate-pulse' : ''}`} 
                   style={{ 
                     background: key === 'severe' ? '#ef4444' : 
                                key === 'depletion' ? '#FF6B00' : 
                                key === 'pollution' ? '#FFAA00' : '#44DD44' 
                   }} 
              />
              <span className="text-sm font-semibold text-shakespeare-800">{config.label}</span>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* India Map SVG with Enhanced Scroll Effects - FIXED COORDINATES */}
          <motion.div 
            className="relative"
            style={{ 
              scale: mapScale,
              rotateY: mapRotate,
            }}
          >
            <div className="relative p-8 rounded-3xl glassmorphism border-2 border-shakespeare-300/30 shadow-2xl">
              <svg viewBox="0 0 500 600" className="w-full h-auto">
                {/* Rajasthan - Northwest */}
                <path
                  d="M 100 100 L 140 90 L 160 110 L 165 140 L 155 170 L 130 180 L 110 170 L 95 150 L 90 125 Z"
                  fill="#FF4444"
                  opacity="0.7"
                  className="cursor-pointer hover:opacity-95 transition-all duration-300 hover:scale-105"
                  style={{ transformOrigin: 'center', filter: 'drop-shadow(0 4px 20px rgba(255,68,68,0.5))' }}
                  onClick={() => setSelectedState(statesData[0])}
                />

                {/* Maharashtra - West-Central */}
                <path
                  d="M 140 190 L 180 180 L 200 210 L 190 250 L 160 260 L 140 240 L 130 210 Z"
                  fill="#FF6B00"
                  opacity="0.7"
                  className="cursor-pointer hover:opacity-95 transition-all duration-300 hover:scale-105"
                  style={{ transformOrigin: 'center', filter: 'drop-shadow(0 4px 20px rgba(255,107,0,0.5))' }}
                  onClick={() => setSelectedState(statesData[1])}
                />

                {/* Tamil Nadu - South */}
                <path
                  d="M 180 340 L 210 330 L 230 360 L 220 390 L 190 400 L 170 380 L 175 350 Z"
                  fill="#FFAA00"
                  opacity="0.7"
                  className="cursor-pointer hover:opacity-95 transition-all duration-300 hover:scale-105"
                  style={{ transformOrigin: 'center', filter: 'drop-shadow(0 4px 20px rgba(255,170,0,0.5))' }}
                  onClick={() => setSelectedState(statesData[2])}
                />

                {/* Punjab - North */}
                <path
                  d="M 140 60 L 170 50 L 190 70 L 185 100 L 160 110 L 140 100 L 135 80 Z"
                  fill="#FF6B00"
                  opacity="0.7"
                  className="cursor-pointer hover:opacity-95 transition-all duration-300 hover:scale-105"
                  style={{ transformOrigin: 'center', filter: 'drop-shadow(0 4px 20px rgba(255,107,0,0.5))' }}
                  onClick={() => setSelectedState(statesData[3])}
                />

                {/* Kerala - Southwest */}
                <path
                  d="M 160 270 L 200 260 L 220 290 L 210 325 L 180 335 L 155 320 L 150 290 Z"
                  fill="#44DD44"
                  opacity="0.7"
                  className="cursor-pointer hover:opacity-95 transition-all duration-300 hover:scale-105"
                  style={{ transformOrigin: 'center', filter: 'drop-shadow(0 4px 20px rgba(68,221,68,0.5))' }}
                  onClick={() => setSelectedState(statesData[4])}
                />

                {/* Delhi NCR - North-Central */}
                <path
                  d="M 155 70 L 170 65 L 180 75 L 177.5 90 L 165 95 L 155 87.5 Z"
                  fill="#FF4444"
                  opacity="0.7"
                  className="cursor-pointer hover:opacity-95 transition-all duration-300 hover:scale-105"
                  style={{ transformOrigin: 'center', filter: 'drop-shadow(0 4px 20px rgba(255,68,68,0.5))' }}
                  onClick={() => setSelectedState(statesData[5])}
                />

                {/* State Labels */}
                <text x="125" y="135" className="fill-shakespeare-900 text-[14px] font-bold pointer-events-none">Rajasthan</text>
                <text x="160" y="225" className="fill-shakespeare-900 text-[14px] font-bold pointer-events-none">Maharashtra</text>
                <text x="195" y="370" className="fill-shakespeare-900 text-[14px] font-bold pointer-events-none">Tamil Nadu</text>
                <text x="155" y="82.5" className="fill-shakespeare-900 text-[14px] font-bold pointer-events-none">Punjab</text>
                <text x="180" y="300" className="fill-shakespeare-900 text-[14px] font-bold pointer-events-none">Kerala</text>
                <text x="160" y="80" className="fill-shakespeare-900 text-[10px] font-bold pointer-events-none">Delhi</text>
              </svg>

              {/* Pulsing Dots */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[30%] left-[32%] w-4 h-4 bg-red-500 rounded-full animate-ping" />
                <div className="absolute top-[52%] left-[42%] w-4 h-4 bg-orange-500 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
                <div className="absolute top-[18%] left-[40%] w-3 h-3 bg-red-600 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
              </div>
            </div>
          </motion.div>

          {/* State Info Panel - Enhanced */}
          <div className="relative min-h-[500px]">
            {selectedState ? (
              <motion.div 
                initial={{ opacity: 0, x: 50, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 50, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="relative p-8 rounded-3xl glassmorphism-strong border-2 border-shakespeare-400/30 shadow-2xl"
              >
                <button
                  onClick={() => setSelectedState(null)}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-shakespeare-200/50 transition-colors"
                >
                  <X className="w-5 h-5 text-shakespeare-700" />
                </button>

                <div className="space-y-6">
                  {/* State Name */}
                  <div className="flex items-center gap-3">
                    {(() => {
                      const SeverityIcon = statusConfig[selectedState.status].color === 'text-red-500' ? AlertCircle : 
                                          statusConfig[selectedState.status].color === 'text-green-500' ? CheckCircle : TrendingDown;
                      return <SeverityIcon className={`w-8 h-8 ${statusConfig[selectedState.status].color}`} />;
                    })()}
                    <h3 className="text-3xl font-display font-black text-shakespeare-900">
                      {selectedState.name}
                    </h3>
                  </div>

                  {/* Severity Badge */}
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${statusConfig[selectedState.status].bg} border-2 ${statusConfig[selectedState.status].border}/30`}>
                    <span className={`text-sm font-bold ${statusConfig[selectedState.status].color} uppercase`}>
                      {statusConfig[selectedState.status].label}
                    </span>
                  </div>

                  {/* Issues */}
                  <div>
                    <h4 className="text-sm font-semibold text-shakespeare-600 uppercase tracking-wide mb-3">Key Water Issues</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedState.issues.map((issue, idx) => (
                        <span key={idx} className="px-3 py-1.5 rounded-full bg-shakespeare-100 text-shakespeare-700 text-sm font-medium border border-shakespeare-300/50">
                          {issue}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl bg-shakespeare-50 border border-shakespeare-200">
                      <p className="text-xs text-shakespeare-600 font-semibold mb-1">Groundwater</p>
                      <p className="text-lg font-bold text-shakespeare-900">{selectedState.stats.groundwater}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-shakespeare-50 border border-shakespeare-200">
                      <p className="text-xs text-shakespeare-600 font-semibold mb-1">Pollution</p>
                      <p className="text-lg font-bold text-shakespeare-900">{selectedState.stats.pollution}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-shakespeare-50 border border-shakespeare-200">
                      <p className="text-xs text-shakespeare-600 font-semibold mb-1">Rainfall</p>
                      <p className="text-lg font-bold text-shakespeare-900">{selectedState.stats.rainfall}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="p-4 rounded-xl bg-gradient-to-br from-shakespeare-100 to-shakespeare-50 border border-shakespeare-300/50">
                    <p className="text-shakespeare-800 leading-relaxed">{selectedState.reuse}</p>
                  </div>

                  {/* AquaSense Solution */}
                  <div className="p-5 rounded-xl bg-gradient-to-br from-royal-blue/10 to-aqua-teal/10 border-2 border-aqua-teal/30">
                    <h4 className="text-sm font-bold text-royal-blue uppercase tracking-wide mb-2 flex items-center gap-2">
                      <Droplet className="w-4 h-4" />
                      How AquaSense Helps
                    </h4>
                    <p className="text-shakespeare-800 font-medium leading-relaxed">{selectedState.aiSolution}</p>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-center h-full p-8 rounded-3xl glassmorphism border-2 border-shakespeare-300/30 shadow-xl"
              >
                <div className="text-center space-y-4">
                  <Droplet className="w-16 h-16 text-shakespeare-400 mx-auto animate-bounce" />
                  <p className="text-xl font-semibold text-shakespeare-700">Click on any state to explore</p>
                  <p className="text-shakespeare-600">Discover water challenges and AI-powered solutions</p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}