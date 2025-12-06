'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Sparkles, Lightbulb, ChevronLeft, ChevronRight, Upload, X, Send } from 'lucide-react';

const broadcasts = [
  {
    id: 1,
    type: 'alert',
    icon: AlertTriangle,
    title: 'Water Shortage Alert - Gujarat Region',
    message: 'Municipal authorities advise 20% reduction in water usage. Community support needed.',
    color: 'from-orange-accent to-orange-600',
    bgColor: 'bg-orange-50',
  },
  {
    id: 2,
    type: 'update',
    icon: Sparkles,
    title: 'New ML Model Update Available',
    message: 'AquaSense AI now predicts water quality with 95% accuracy. Update your systems today.',
    color: 'from-royal-blue to-shakespeare-600',
    bgColor: 'bg-shakespeare-50',
  },
  {
    id: 3,
    type: 'tip',
    icon: Lightbulb,
    title: 'Pro Tip for Plant Operators',
    message: 'Regular pH monitoring between 6.5-8.5 ensures optimal treatment efficiency. Check hourly.',
    color: 'from-aqua-teal to-shakespeare-400',
    bgColor: 'bg-aqua-teal/10',
  },
  {
    id: 4,
    type: 'alert',
    icon: AlertTriangle,
    title: 'New Water Regulations - Maharashtra',
    message: 'Updated discharge norms effective from next month. Compliance training available.',
    color: 'from-shakespeare-600 to-shakespeare-800',
    bgColor: 'bg-shakespeare-100',
  },
];

export default function BroadcastPanel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    type: 'announcement',
    title: '',
    message: '',
  });

  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % broadcasts.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + broadcasts.length) % broadcasts.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % broadcasts.length);
  };

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    console.log('Broadcast submitted:', uploadForm);
    setShowUploadModal(false);
    setUploadForm({ type: 'announcement', title: '', message: '' });
  };

  const current = broadcasts[currentIndex];
  const Icon = current.icon;

  return (
    <>
      <section className="py-8 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative glassmorphism-strong rounded-3xl p-6 md:p-8 shadow-xl overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Animated water shimmer background */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0 bg-gradient-to-r from-shakespeare-400 via-aqua-teal to-shakespeare-400 animate-water-flow" />
            </div>

            {/* Caustic light effect */}
            <div className="caustic-overlay opacity-30" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-shakespeare-950">📢 Community Broadcasts</h3>
                <button
                  onClick={() => setShowUploadModal(true)}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-shakespeare-500 to-shakespeare-600 text-white font-semibold text-sm hover:shadow-lg transition-all flex items-center gap-2"
                >
                  <Upload className="w-4 h-4" />
                  Post Broadcast
                </button>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-start gap-4"
                >
                  {/* Icon with pulsing effect */}
                  <div className={`flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br ${current.color} flex items-center justify-center shadow-lg animate-pulse`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-shakespeare-950 mb-2">
                      {current.title}
                    </h3>
                    <p className="text-shakespeare-700 text-base leading-relaxed">
                      {current.message}
                    </p>
                  </div>

                  {/* Navigation Controls */}
                  <div className="flex-shrink-0 flex items-center gap-2">
                    <button
                      onClick={handlePrev}
                      className="w-10 h-10 rounded-full bg-white/50 hover:bg-white/80 backdrop-blur-sm flex items-center justify-center transition-all shadow-md hover:shadow-lg"
                      aria-label="Previous"
                    >
                      <ChevronLeft className="w-5 h-5 text-shakespeare-700" />
                    </button>
                    <button
                      onClick={handleNext}
                      className="w-10 h-10 rounded-full bg-white/50 hover:bg-white/80 backdrop-blur-sm flex items-center justify-center transition-all shadow-md hover:shadow-lg"
                      aria-label="Next"
                    >
                      <ChevronRight className="w-5 h-5 text-shakespeare-700" />
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Progress dots */}
              <div className="flex items-center justify-center gap-2 mt-6">
                {broadcasts.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`transition-all rounded-full ${
                      index === currentIndex
                        ? 'w-8 h-2 bg-shakespeare-600'
                        : 'w-2 h-2 bg-shakespeare-300 hover:bg-shakespeare-400'
                    }`}
                    aria-label={`Go to broadcast ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Upload Modal */}
      <AnimatePresence>
        {showUploadModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowUploadModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-8 max-w-2xl w-full shadow-2xl relative overflow-hidden"
            >
              {/* Background effect */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-gradient-to-br from-shakespeare-400 to-shakespeare-600 animate-water-flow" />
              </div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-shakespeare-950">📢 Create Broadcast</h2>
                  <button
                    onClick={() => setShowUploadModal(false)}
                    className="w-10 h-10 rounded-full hover:bg-shakespeare-100 flex items-center justify-center transition-colors"
                  >
                    <X className="w-5 h-5 text-shakespeare-600" />
                  </button>
                </div>

                <form onSubmit={handleUploadSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-shakespeare-900">
                      Broadcast Type
                    </label>
                    <select
                      value={uploadForm.type}
                      onChange={(e) => setUploadForm({ ...uploadForm, type: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-shakespeare-50 border border-shakespeare-300 focus:border-shakespeare-500 focus:ring-2 focus:ring-shakespeare-200 outline-none transition-all text-shakespeare-900 font-medium"
                    >
                      <option value="announcement">📢 Announcement</option>
                      <option value="alert">⚠️ Alert</option>
                      <option value="update">✨ Update</option>
                      <option value="tip">💡 Tip</option>
                      <option value="event">📅 Event</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-shakespeare-900">
                      Title
                    </label>
                    <input
                      type="text"
                      value={uploadForm.title}
                      onChange={(e) => setUploadForm({ ...uploadForm, title: e.target.value })}
                      placeholder="Enter broadcast title..."
                      className="w-full px-4 py-3 rounded-xl bg-shakespeare-50 border border-shakespeare-300 focus:border-shakespeare-500 focus:ring-2 focus:ring-shakespeare-200 outline-none transition-all text-shakespeare-900 font-medium placeholder:text-shakespeare-400"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-shakespeare-900">
                      Message
                    </label>
                    <textarea
                      value={uploadForm.message}
                      onChange={(e) => setUploadForm({ ...uploadForm, message: e.target.value })}
                      placeholder="Write your broadcast message..."
                      rows="4"
                      className="w-full px-4 py-3 rounded-xl bg-shakespeare-50 border border-shakespeare-300 focus:border-shakespeare-500 focus:ring-2 focus:ring-shakespeare-200 outline-none transition-all text-shakespeare-900 font-medium placeholder:text-shakespeare-400 resize-none"
                      required
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setShowUploadModal(false)}
                      className="flex-1 px-6 py-3 rounded-xl bg-shakespeare-100 text-shakespeare-700 font-semibold hover:bg-shakespeare-200 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-shakespeare-500 to-shakespeare-600 text-white font-semibold hover:shadow-xl transition-all flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      Post Broadcast
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}