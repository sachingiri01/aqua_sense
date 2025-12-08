'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Building2, AlertCircle, Send } from 'lucide-react';
import { db } from '@/lib/firebaseClient';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useSession } from 'next-auth/react';

export default function ShareMessage() {
  console.log('Firestore db:', db);
  const { data: session } = useSession();
  const [urgency, setUrgency] = useState(50);
  const [formData, setFormData] = useState({
    category: '',
    plantType: '',
    description: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  // image file state
  const [imageFiles, setImageFiles] = useState([]); // File[]
  const [imagePreviews, setImagePreviews] = useState([]); // object URLs for preview
  const fileInputRef = useRef(null);

  // cleanup object URLs on unmount or when previews change
  useEffect(() => {
    return () => {
      imagePreviews.forEach((url) => {
        try { URL.revokeObjectURL(url); } catch (e) {}
      });
    };
  }, [imagePreviews]);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // when user selects files
  const handleFiles = (e) => {
    const files = Array.from(e.target.files || []);
    // revoke old previews
    imagePreviews.forEach((url) => {
      try { URL.revokeObjectURL(url); } catch (err) {}
    });

    const previews = files.map((f) => URL.createObjectURL(f));
    setImageFiles(files);
    setImagePreviews(previews);
  };

  // open file picker when clicking upload area
  const openFilePicker = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e?.preventDefault?.();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      // trim values for robust validation
      const payload = {
        category: (formData.category || '').trim(),
        plantType: (formData.plantType || '').trim(),
        description: (formData.description || '').trim(),
      };

      if (!payload.category || !payload.plantType || !payload.description) {
        setSubmitMessage('Please fill in all fields');
        setIsSubmitting(false);
        return;
      }

      // robust user id fallback (next-auth may not expose `id`)
      const userId = session?.user?.id || session?.user?.sub || session?.user?.email || null;
      const userName = session?.user?.name || session?.user?.email || 'Anonymous';

      // Build title (location removed)
      const title = `[${payload.category}] Issue`;

      // 1) Upload files to your server route which will forward to Cloudinary
      let uploadedImageUrls = [];
      if (imageFiles && imageFiles.length > 0) {
        const fd = new FormData();
        // append fields (optional, server echoes them back)
        fd.append('title', title);
        fd.append('category', payload.category);
        fd.append('plantType', payload.plantType);
        fd.append('description', payload.description);
        fd.append('urgency', String(urgency));

        // append each file under field name "photos"
        for (const file of imageFiles) {
          fd.append('photos', file, file.name);
        }

        const res = await fetch('/api/feed', {
          method: 'POST',
          body: fd,
        });

        const body = await res.json();
        if (!res.ok) {
          const detail = body?.detail || body?.error || 'Upload failed';
          throw new Error(detail);
        }

        uploadedImageUrls = Array.isArray(body.uploadedImageUrls) ? body.uploadedImageUrls : [];
      }

      // 2) Save Firestore document including image URLs
      const docPayload = {
        title: title,
        content: payload.description,
        category: payload.category,
        plantType: payload.plantType,
        urgencyLevel: urgency,
        urgencyLabel: getUrgencyLabel(),
        userId,
        userName,
        isIssue: true,
        created_at: serverTimestamp(),
        updated_at: serverTimestamp(),
        likes: 0,
        replies: 0,
        status: 'open',
        imageUrls: uploadedImageUrls.length ? uploadedImageUrls : null,
      };

      // debug: log payload so you can see it in the browser console
      console.debug('Attempting to add community message:', docPayload);

      // Write issue to Firestore in real-time (merged into community_messages)
      const ref = await addDoc(collection(db, 'community_messages'), docPayload);

      console.debug('Document written with ID:', ref.id);

      setSubmitMessage('Issue submitted successfully! Community experts will respond soon.');
      // Reset form
      setFormData({ category: '', plantType: '', description: '' });
      setUrgency(50);

      // clear file inputs & previews
      setImageFiles([]);
      imagePreviews.forEach((url) => {
        try { URL.revokeObjectURL(url); } catch (e) {}
      });
      setImagePreviews([]);
      if (fileInputRef.current) fileInputRef.current.value = '';

      // Clear message after 3 seconds
      setTimeout(() => setSubmitMessage(''), 3000);
    } catch (error) {
      console.error('Error submitting issue:', error);
      const message = error?.message || String(error);
      setSubmitMessage(`Failed to submit issue. ${message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="share-issue" className="py-16 bg-gradient-to-b from-white to-shakespeare-50 relative overflow-hidden">
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
          <div className="relative glassmorphism-strong rounded-3xl p-8 md:p-10 shadow-2xl border border-shakespeare-200 overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0 bg-gradient-to-br from-shakespeare-400 via-aqua-teal to-shakespeare-600 animate-water-flow" />
            </div>

            <div className="relative z-10 space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-shakespeare-900">
                  Upload Photos/Videos
                </label>
                <div
                  className="border-2 border-dashed border-shakespeare-300 rounded-2xl p-8 text-center hover:border-shakespeare-500 transition-colors cursor-pointer bg-white/50 backdrop-blur-sm"
                  onClick={openFilePicker}
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-shakespeare-400 to-shakespeare-600 flex items-center justify-center">
                      <Camera className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-shakespeare-900">Click to upload or drag and drop</p>
                      <p className="text-sm text-shakespeare-600">Images of broken pipes, water quality, equipment issues</p>
                    </div>
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*,video/*"
                    multiple
                    onChange={handleFiles}
                    className="sr-only"
                  />

                  {imagePreviews.length > 0 && (
                    <div className="mt-4 flex gap-3 overflow-x-auto justify-center">
                      {imagePreviews.map((src, i) => (
                        <div key={i} className="w-20 h-20 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center border">
                          <img src={src} alt={`preview-${i}`} className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-shakespeare-900">
                    Issue Category
                  </label>
                  <div className="relative">
                    <AlertCircle className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-shakespeare-500" />
                    <select 
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/70 backdrop-blur-sm border border-shakespeare-300 focus:border-shakespeare-500 focus:ring-2 focus:ring-shakespeare-200 outline-none transition-all text-shakespeare-900 font-medium">
                      <option>Select issue category</option>
                      <option value="💧 Water Quality">💧 Water Quality</option>
                      <option value="⚙️ Equipment Failure">⚙️ Equipment Failure</option>
                      <option value="🔧 Maintenance">🔧 Maintenance</option>
                      <option value="📊 Parameter Fluctuation">📊 Parameter Fluctuation</option>
                      <option value="💥 Leakage/Pipe Burst">💥 Leakage/Pipe Burst</option>
                      <option value="🧪 Chemical Issues">🧪 Chemical Issues</option>
                      <option value="🌾 Irrigation Problems">🌾 Irrigation Problems</option>
                      <option value="❓ General Query">❓ General Query</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-shakespeare-900">
                    Type of Plant
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-shakespeare-500" />
                    <select 
                      name="plantType"
                      value={formData.plantType}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/70 backdrop-blur-sm border border-shakespeare-300 focus:border-shakespeare-500 focus:ring-2 focus:ring-shakespeare-200 outline-none transition-all text-shakespeare-900 font-medium">
                      <option>Select plant type</option>
                      <option value="Municipal Water Treatment">Municipal Water Treatment</option>
                      <option value="Industrial Wastewater">Industrial Wastewater</option>
                      <option value="Sewage Treatment Plant">Sewage Treatment Plant</option>
                      <option value="Reverse Osmosis Plant">Reverse Osmosis Plant</option>
                      <option value="Irrigation Facility">Irrigation Facility</option>
                      <option value="Desalination Plant">Desalination Plant</option>
                    </select>
                  </div>
                </div>

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

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-shakespeare-900">
                  Describe the Issue
                </label>
                <textarea
                  name="description"
                  rows="4"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Provide detailed information about the problem, when it started, current impact..."
                  className="w-full px-4 py-3 rounded-xl bg-white/70 backdrop-blur-sm border border-shakespeare-300 focus:border-shakespeare-500 focus:ring-2 focus:ring-shakespeare-200 outline-none transition-all text-shakespeare-900 font-medium placeholder:text-shakespeare-400 resize-none"
                />
              </div>

              {submitMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-xl text-center font-semibold ${
                    submitMessage.includes('successfully')
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {submitMessage}
                </motion.div>
              )}

              <button 
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full group relative px-8 py-4 bg-gradient-to-r from-shakespeare-500 to-shakespeare-600 text-white font-bold text-lg rounded-full shadow-xl hover:shadow-2xl transition-all overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed">
                <span className="relative z-10 flex items-center justify-center gap-3">
                  <Send className="w-5 h-5" />
                  {isSubmitting ? 'Submitting...' : 'Submit Issue for Community Help'}
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
