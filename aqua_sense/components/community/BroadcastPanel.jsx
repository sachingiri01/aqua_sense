'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Sparkles, Lightbulb, ChevronLeft, ChevronRight, Upload, X, Send } from 'lucide-react';

export default function BroadcastPanel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    type: 'announcement',
    title: '',
    message: '',
  });

  // broadcasts state (fetched from server)
  const [broadcasts, setBroadcasts] = useState([]);
  const [loadingBroadcasts, setLoadingBroadcasts] = useState(true);

  // admin state
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingAdmin, setCheckingAdmin] = useState(true);

  useEffect(() => {
    if (isPaused) return;
    if (!broadcasts || broadcasts.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % broadcasts.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, broadcasts.length]);

  // Fetch admin status on mount (endpoint returns { isAdmin: boolean }).
  useEffect(() => {
    let mounted = true;
    setCheckingAdmin(true);

    fetch('/api/broadcasts', { method: 'GET', credentials: 'same-origin' })
      .then(async (res) => {
        try {
          const data = await res.json();
          if (mounted) {
            setIsAdmin(!!data?.isAdmin);
          }
        } catch (err) {
          console.error('Failed parsing admin response', err);
          if (mounted) setIsAdmin(false);
        }
      })
      .catch((err) => {
        console.error('Error checking admin status:', err);
        if (mounted) setIsAdmin(false);
      })
      .finally(() => {
        if (mounted) setCheckingAdmin(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  // Fetch broadcasts list from backend.
  // Expects endpoint '/api/broadcasts/list' to return array of broadcast rows.
  useEffect(() => {
    let mounted = true;
    setLoadingBroadcasts(true);

    const fetchList = async () => {
      try {
        const res = await fetch('/api/broadcasts/list', { method: 'GET', credentials: 'same-origin' });

        if (!res.ok) {
          console.warn('/api/broadcasts/list returned not ok:', res.status);
          if (mounted) {
            setBroadcasts([]);
          }
          return;
        }

        const data = await res.json();

        if (!Array.isArray(data)) {
          console.warn('/api/broadcasts/list returned non-array; using empty list.');
          if (mounted) setBroadcasts([]);
          return;
        }

        // Normalize items so UI has the fields it expects.
        const normalized = data.map((b, idx) => ({
          broadcast_id: b.broadcast_id ?? b.id ?? String(idx + 1),
          id: b.broadcast_id ?? b.id ?? idx,
          type: b.broadcast_type ?? b.type ?? 'announcement',
          icon:
            (b.broadcast_type ?? b.type) === 'alert' ? AlertTriangle :
            (b.broadcast_type ?? b.type) === 'tip' ? Lightbulb :
            (b.broadcast_type ?? b.type) === 'update' ? Sparkles :
            AlertTriangle,
          title: b.title ?? 'Untitled broadcast',
          message: b.message ?? '',
          color: b.color ?? 'from-shakespeare-600 to-shakespeare-800',
          bgColor: b.bgColor ?? 'bg-shakespeare-50',
          created_at: b.created_at ?? b.createdAt ?? null,
        }));

        if (mounted) setBroadcasts(normalized);
      } catch (err) {
        console.error('Error fetching broadcasts list:', err);
        if (mounted) setBroadcasts([]);
      } finally {
        if (mounted) setLoadingBroadcasts(false);
      }
    };

    fetchList();

    return () => {
      mounted = false;
    };
  }, []);

  const handlePrev = () => {
    if (!broadcasts || broadcasts.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + broadcasts.length) % broadcasts.length);
  };

  const handleNext = () => {
    if (!broadcasts || broadcasts.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % broadcasts.length);
  };

  // When clicking Post Broadcast, only open modal if user is admin
  const handleOpenPost = () => {
    if (checkingAdmin) {
      alert('Checking permissions — please wait a moment.');
      return;
    }

    if (!isAdmin) {
      alert('Only admins can create broadcasts.');
      return;
    }

    setShowUploadModal(true);
  };

  const handleUploadSubmit = async (e) => {
    e.preventDefault();

    if (!isAdmin) {
      alert('Only admins can create broadcasts.');
      return;
    }

    const payload = {
      broadcast_type: uploadForm.type,
      title: uploadForm.title.trim(),
      message: uploadForm.message.trim(),
    };

    if (!payload.broadcast_type || !payload.title || !payload.message) {
      alert('Please fill in all required fields.');
      return;
    }

    try {
      const res = await fetch('/api/broadcasts', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (res.status === 201) {
        const created = await res.json();
        console.log('Broadcast created:', created);
        alert('Broadcast posted successfully.');
        setShowUploadModal(false);
        setUploadForm({ type: 'announcement', title: '', message: '' });

        // append to local list so UI updates immediately
        const newItem = {
          broadcast_id: created.broadcast_id ?? created.id ?? String(Date.now()),
          id: created.broadcast_id ?? created.id ?? Date.now(),
          type: created.broadcast_type ?? payload.broadcast_type,
          icon:
            (created.broadcast_type ?? payload.broadcast_type) === 'alert' ? AlertTriangle :
            (created.broadcast_type ?? payload.broadcast_type) === 'tip' ? Lightbulb :
            (created.broadcast_type ?? payload.broadcast_type) === 'update' ? Sparkles :
            AlertTriangle,
          title: created.title ?? payload.title,
          message: created.message ?? payload.message,
          color: 'from-shakespeare-600 to-shakespeare-800',
          bgColor: 'bg-shakespeare-50',
          created_at: created.created_at ?? new Date().toISOString(),
        };

        setBroadcasts((prev) => [newItem, ...prev]);
        setCurrentIndex(0);
      } else if (res.status === 401) {
        alert('You are not authorized. Please sign in.');
      } else if (res.status === 403) {
        alert('Forbidden: only admins can post broadcasts.');
        setIsAdmin(false);
      } else if (res.status === 400) {
        const text = await res.text();
        alert('Bad request: ' + text);
      } else {
        const text = await res.text();
        console.error('POST /api/broadcasts unexpected response:', res.status, text);
        alert('Unable to post broadcast. Please try again later.');
      }
    } catch (err) {
      console.error('Network error posting broadcast:', err);
      alert('Network error while posting broadcast.');
    }
  };

  // Safe current item (if none, show a simple placeholder object used solely to render UI)
  const current = (broadcasts && broadcasts.length > 0)
    ? broadcasts[currentIndex % broadcasts.length]
    : {
        id: 'empty',
        broadcast_id: 'empty',
        type: 'announcement',
        icon: AlertTriangle,
        title: loadingBroadcasts ? 'Loading broadcasts...' : 'No broadcasts available',
        message: loadingBroadcasts ? 'Please wait while we load broadcasts.' : 'There are no broadcasts to show right now.',
        color: 'from-shakespeare-600 to-shakespeare-800',
        bgColor: 'bg-shakespeare-50',
        created_at: null,
      };

  const Icon = current.icon ?? AlertTriangle;

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

                <div className="flex flex-col items-end">
                  {isAdmin && (
  <button
    onClick={handleOpenPost}
    className="px-4 py-2 rounded-xl bg-gradient-to-r from-shakespeare-500 to-shakespeare-600 text-white font-semibold text-sm hover:shadow-lg transition-all flex items-center gap-2"
  >
    <Upload className="w-4 h-4" />
    Post Broadcast
  </button>
)}


                  {/* Minimal non-intrusive notice for non-admins (keeps original UI intact) */}
                  {!checkingAdmin && !isAdmin && (
                    <p className="mt-1 text-xs text-shakespeare-500"></p>
                  )}
                  {checkingAdmin && (
                    <p className="mt-1 text-xs text-shakespeare-400">Checking permissions...</p>
                  )}
                </div>
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
                    {current.created_at && (
                      <p className="mt-2 text-xs text-shakespeare-400">
                        {new Date(current.created_at).toLocaleString()}
                      </p>
                    )}
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
                {(broadcasts && broadcasts.length > 0) ? (
                  broadcasts.map((_, index) => (
                    <button
                      key={_.broadcast_id ?? index}
                      onClick={() => setCurrentIndex(index)}
                      className={`transition-all rounded-full ${
                        index === currentIndex
                          ? 'w-8 h-2 bg-shakespeare-600'
                          : 'w-2 h-2 bg-shakespeare-300 hover:bg-shakespeare-400'
                      }`}
                      aria-label={`Go to broadcast ${index + 1}`}
                    />
                  ))
                ) : (
                  <div className="text-xs text-shakespeare-400">No broadcasts</div>
                )}
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
