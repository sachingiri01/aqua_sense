'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Camera, MapPin, AlertTriangle, Send, CheckCircle, Upload } from 'lucide-react';

export default function StaffReporting() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    priority: 'medium',
    category: '',
    images: [],
  });
  const [submitted, setSubmitted] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);

  const categories = [
    { id: 'equipment', label: '⚙️ Equipment Failure', icon: '⚙️' },
    { id: 'quality', label: '💧 Water Quality Issue', icon: '💧' },
    { id: 'leak', label: '🚰 Leak/Pipe Damage', icon: '🚰' },
    { id: 'maintenance', label: '🔧 Maintenance Required', icon: '🔧' },
    { id: 'safety', label: '⚠️ Safety Concern', icon: '⚠️' },
    { id: 'other', label: '📋 Other', icon: '📋' },
  ];

  const priorities = [
    { value: 'low', label: 'Low', color: 'bg-green-500' },
    { value: 'medium', label: 'Medium', color: 'bg-yellow-500' },
    { value: 'high', label: 'High', color: 'bg-orange-500' },
    { value: 'critical', label: 'Critical', color: 'bg-red-500' },
  ];

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map(file => URL.createObjectURL(file));
    setPreviewImages([...previewImages, ...imageUrls]);
    setFormData({ ...formData, images: [...formData.images, ...files] });
  };

  const removeImage = (index) => {
    const newPreviews = previewImages.filter((_, i) => i !== index);
    const newImages = formData.images.filter((_, i) => i !== index);
    setPreviewImages(newPreviews);
    setFormData({ ...formData, images: newImages });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would send the report to admin
    console.log('Staff report submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        title: '',
        description: '',
        location: '',
        priority: 'medium',
        category: '',
        images: [],
      });
      setPreviewImages([]);
    }, 3000);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-shakespeare-50 to-white relative overflow-hidden">
      {/* Water ripple background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-shakespeare-400 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-aqua-teal rounded-full blur-3xl animate-float-3d" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <FileText className="w-10 h-10 text-orange-accent" />
            <AlertTriangle className="w-8 h-8 text-shakespeare-600" />
          </div>
          <h2 className="text-4xl font-bold text-shakespeare-950 mb-3">
            Staff Report to <span className="text-gradient">Admin</span>
          </h2>
          <p className="text-lg text-shakespeare-600 max-w-2xl mx-auto">
            Field staff can report issues, maintenance needs, and site observations directly to administrators
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border-2 border-shakespeare-200 overflow-hidden">
            {/* Glassmorphism overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-shakespeare-100/50 to-aqua-teal/20 pointer-events-none" />

            {/* Caustic light effect */}
            <div className="caustic-overlay" />

            <div className="relative z-10">
              {submitted ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-float">
                    <CheckCircle className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-shakespeare-950 mb-3">
                    Report Submitted Successfully!
                  </h3>
                  <p className="text-shakespeare-600">
                    Admin team will review your report and take necessary action.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Title */}
                  <div>
                    <label className="block text-sm font-semibold text-shakespeare-900 mb-2">
                      Report Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Brief summary of the issue..."
                      className="w-full px-4 py-3 rounded-xl border-2 border-shakespeare-300 focus:border-shakespeare-500 focus:ring-2 focus:ring-shakespeare-200 outline-none transition-all bg-white/50 backdrop-blur-sm"
                    />
                  </div>

                  {/* Category Selection */}
                  <div>
                    <label className="block text-sm font-semibold text-shakespeare-900 mb-3">
                      Issue Category *
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {categories.map((cat) => (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, category: cat.id })}
                          className={`p-4 rounded-xl border-2 transition-all text-left ${
                            formData.category === cat.id
                              ? 'border-shakespeare-500 bg-shakespeare-100 shadow-lg'
                              : 'border-shakespeare-200 bg-white/50 hover:border-shakespeare-400'
                          }`}
                        >
                          <span className="text-2xl mb-1 block">{cat.icon}</span>
                          <span className="text-sm font-medium text-shakespeare-900">
                            {cat.label.split(' ').slice(1).join(' ')}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Priority Slider */}
                  <div>
                    <label className="block text-sm font-semibold text-shakespeare-900 mb-3">
                      Priority Level: <span className="text-shakespeare-600 font-bold">{formData.priority.toUpperCase()}</span>
                    </label>
                    <div className="relative">
                      <input
                        type="range"
                        min="0"
                        max="3"
                        value={priorities.findIndex(p => p.value === formData.priority)}
                        onChange={(e) => setFormData({ ...formData, priority: priorities[e.target.value].value })}
                        className="w-full h-3 bg-gradient-to-r from-green-300 via-yellow-300 via-orange-300 to-red-300 rounded-full appearance-none cursor-pointer slider"
                        style={{
                          background: 'linear-gradient(to right, #86efac, #fde047, #fdba74, #fca5a5)',
                        }}
                      />
                      <div className="flex justify-between mt-2 text-xs font-medium">
                        {priorities.map((p) => (
                          <span key={p.value} className="text-shakespeare-600">
                            {p.label}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-sm font-semibold text-shakespeare-900 mb-2">
                      <MapPin className="w-4 h-4 inline mr-1" />
                      Location *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="Plant location, section, or equipment ID..."
                      className="w-full px-4 py-3 rounded-xl border-2 border-shakespeare-300 focus:border-shakespeare-500 focus:ring-2 focus:ring-shakespeare-200 outline-none transition-all bg-white/50 backdrop-blur-sm"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-semibold text-shakespeare-900 mb-2">
                      Detailed Description *
                    </label>
                    <textarea
                      required
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Describe the issue in detail, including what you observed, when it started, and any immediate actions taken..."
                      rows="5"
                      className="w-full px-4 py-3 rounded-xl border-2 border-shakespeare-300 focus:border-shakespeare-500 focus:ring-2 focus:ring-shakespeare-200 outline-none transition-all resize-none bg-white/50 backdrop-blur-sm"
                    />
                  </div>

                  {/* Photo Upload */}
                  <div>
                    <label className="block text-sm font-semibold text-shakespeare-900 mb-3">
                      <Camera className="w-4 h-4 inline mr-1" />
                      Upload Photos (Optional)
                    </label>
                    <div className="space-y-4">
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-shakespeare-400 rounded-xl cursor-pointer bg-shakespeare-50/50 hover:bg-shakespeare-100/50 transition-all group">
                        <Upload className="w-8 h-8 text-shakespeare-500 group-hover:scale-110 transition-transform" />
                        <p className="mt-2 text-sm text-shakespeare-600 font-medium">
                          Click to upload site photos
                        </p>
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>

                      {previewImages.length > 0 && (
                        <div className="grid grid-cols-3 gap-3">
                          {previewImages.map((img, index) => (
                            <div key={index} className="relative group">
                              <img
                                src={img}
                                alt={`Preview ${index + 1}`}
                                className="w-full h-24 object-cover rounded-lg border-2 border-shakespeare-200"
                              />
                              <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-4 px-6 bg-gradient-to-r from-orange-accent to-orange-accent/80 text-white font-bold rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-3 group"
                  >
                    <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    Submit Report to Admin
                  </button>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
