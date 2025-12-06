'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, MapPin, Building2, AlertCircle, Send, Image } from 'lucide-react';

export default function ShareIssueSection() {
  const [urgency, setUrgency] = useState(50);

  const getUrgencyColor = () => {
    if (urgency < 30) return 'from-emerald-500 to-emerald-600';
    if (urgency < 70) return 'from-amber-500 to-amber-600';
    return 'from-red-500 to-red-600';
  };

  const getUrgencyLabel = () => {
    if (urgency < 30) return 'Low Priority';
    if (urgency < 70) return 'Medium Priority';
    return 'High Priority';
  };

  return (
    <section id="share-issue" className="py-16 bg-gradient-to-b from-white to-shakespeare-50 relative overflow-hidden">
      {/* Animated water ripple background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-shakespeare-400 rounded-full animate-ripple-3d" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-shakespeare-950 mb-3">
            Share Your <span className="text-gradient">Issue</span>
          </h2>
          <p className="text-lg text-shakespeare-600">
            Upload problems quickly and get expert help from the community
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          {/* Floating card with water ripple effect */}
          <div className="relative glassmorphism-strong rounded-3xl p-8 md:p-10 shadow-2xl border border-shakespeare-200 overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0 bg-gradient-to-br from-shakespeare-400 via-aqua-teal to-shakespeare-600 animate-water-flow" />
            </div>

            <div className="relative z-10 space-y-6">
              {/* Photo Upload */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-shakespeare-900">
                  Upload Photos/Videos
                </label>
                <div className="border-2 border-dashed border-shakespeare-300 rounded-2xl p-8 text-center hover:border-shakespeare-500 transition-colors cursor-pointer bg-white/50 backdrop-blur-sm">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-shakespeare-400 to-shakespeare-600 flex items-center justify-center">
                      <Camera className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-shakespeare-900">Click to upload or drag and drop</p>
                      <p className="text-sm text-shakespeare-600">Images of broken pipes, water quality, equipment issues</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Parameter Issue */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-shakespeare-900">
                    Issue Category
                  </label>
                  <div className="relative">
                    <AlertCircle className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-shakespeare-500" />
                    <select className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/70 backdrop-blur-sm border border-shakespeare-300 focus:border-shakespeare-500 focus:ring-2 focus:ring-shakespeare-200 outline-none transition-all text-shakespeare-900 font-medium">
                      <option>Select issue category</option>
                      <option>💧 Water Quality</option>
                      <option>⚙️ Equipment Failure</option>
                      <option>🔧 Maintenance</option>
                      <option>📊 Parameter Fluctuation</option>
                      <option>💥 Leakage/Pipe Burst</option>
                      <option>🧪 Chemical Issues</option>
                      <option>🌾 Irrigation Problems</option>
                      <option>❓ General Query</option>
                    </select>
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-shakespeare-900">
                    Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-shakespeare-500" />
                    <input
                      type="text"
                      placeholder="e.g., Indore Plant, Zone A"
                      className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/70 backdrop-blur-sm border border-shakespeare-300 focus:border-shakespeare-500 focus:ring-2 focus:ring-shakespeare-200 outline-none transition-all text-shakespeare-900 font-medium placeholder:text-shakespeare-400"
                    />
                  </div>
                </div>

                {/* Plant Type */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-shakespeare-900">
                    Type of Plant
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-shakespeare-500" />
                    <select className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/70 backdrop-blur-sm border border-shakespeare-300 focus:border-shakespeare-500 focus:ring-2 focus:ring-shakespeare-200 outline-none transition-all text-shakespeare-900 font-medium">
                      <option>Select plant type</option>
                      <option>Municipal Water Treatment</option>
                      <option>Industrial Wastewater</option>
                      <option>Sewage Treatment Plant</option>
                      <option>Reverse Osmosis Plant</option>
                      <option>Irrigation Facility</option>
                      <option>Desalination Plant</option>
                    </select>
                  </div>
                </div>

                {/* Urgency Slider */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-shakespeare-900">
                    Urgency Level
                  </label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={urgency}
                      onChange={(e) => setUrgency(Number(e.target.value))}
                      className="w-full h-3 rounded-full appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, #10b981 0%, #f59e0b ${urgency}%, #e5e7eb ${urgency}%, #e5e7eb 100%)`,
                      }}
                    />
                    <div className={`inline-flex px-4 py-2 rounded-full bg-gradient-to-r ${getUrgencyColor()} text-white text-sm font-bold shadow-md`}>
                      {getUrgencyLabel()}
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-shakespeare-900">
                  Describe the Issue
                </label>
                <textarea
                  rows="4"
                  placeholder="Provide detailed information about the problem, when it started, current impact..."
                  className="w-full px-4 py-3 rounded-xl bg-white/70 backdrop-blur-sm border border-shakespeare-300 focus:border-shakespeare-500 focus:ring-2 focus:ring-shakespeare-200 outline-none transition-all text-shakespeare-900 font-medium placeholder:text-shakespeare-400 resize-none"
                />
              </div>

              {/* Submit Button */}
              <button className="w-full group relative px-8 py-4 bg-gradient-to-r from-shakespeare-500 to-shakespeare-600 text-white font-bold text-lg rounded-full shadow-xl hover:shadow-2xl transition-all overflow-hidden">
                <span className="relative z-10 flex items-center justify-center gap-3">
                  <Send className="w-5 h-5" />
                  Submit Issue for Community Help
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-royal-blue to-shakespeare-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}