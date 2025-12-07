'use client';

import { TrendingUp, BarChart3, PieChart, Map } from 'lucide-react';
import GlassCard from './GlassCard';

export default function Charts() {
  // Mock data for visualization
  const waterQualityData = Array.from({ length: 7 }, (_, i) => ({
    day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
    value: Math.random() * 30 + 70
  }));

  const batchData = Array.from({ length: 7 }, (_, i) => ({
    day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
    count: Math.floor(Math.random() * 500 + 1500)
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Water Quality Trends - Line Chart */}
      <GlassCard className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-shakespeare-400 to-shakespeare-600 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-display text-lg font-bold text-shakespeare-950">Water Quality Trends</h3>
            <p className="text-xs text-shakespeare-700">Last 7 days</p>
          </div>
        </div>
        
        <div className="h-64 flex items-end gap-2">
          {waterQualityData.map((item, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full relative" style={{ height: `${item.value}%` }}>
                <div className="absolute inset-0 bg-gradient-to-t from-shakespeare-500 to-aqua-teal rounded-t-lg animate-float" />
              </div>
              <span className="text-xs text-shakespeare-700 font-medium">{item.day}</span>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Batch Count - Bar Chart */}
      <GlassCard className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-aqua-teal to-shakespeare-500 flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-display text-lg font-bold text-shakespeare-950">Batch Count Per Day</h3>
            <p className="text-xs text-shakespeare-700">Last 7 days</p>
          </div>
        </div>
        
        <div className="h-64 flex items-end gap-3">
          {batchData.map((item, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full relative" style={{ height: `${(item.count / 2000) * 100}%` }}>
                <div className="absolute inset-0 bg-gradient-to-t from-royal-blue to-shakespeare-400 rounded-t-xl hover:scale-105 transition-transform duration-300" />
              </div>
              <span className="text-xs text-shakespeare-700 font-medium">{item.day}</span>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Prediction Accuracy - Donut Chart */}
      <GlassCard className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-royal-blue to-shakespeare-700 flex items-center justify-center">
            <PieChart className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-display text-lg font-bold text-shakespeare-950">Prediction Accuracy</h3>
            <p className="text-xs text-shakespeare-700">ML Model Performance</p>
          </div>
        </div>
        
        <div className="flex items-center justify-center h-64">
          <div className="relative w-48 h-48">
            {/* Donut chart representation */}
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="currentColor"
                strokeWidth="12"
                className="text-shakespeare-200/30"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="url(#gradient1)"
                strokeWidth="12"
                strokeDasharray="251.2"
                strokeDashoffset="37.68"
                strokeLinecap="round"
                className="animate-float"
              />
              <defs>
                <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4ac0e6" />
                  <stop offset="100%" stopColor="#1488b5" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-display font-bold text-shakespeare-950">94.2%</span>
              <span className="text-xs text-shakespeare-700">Accurate</span>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Region-wise Reuse Impact - India Heatmap */}
      <GlassCard className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-shakespeare-500 to-shakespeare-700 flex items-center justify-center">
            <Map className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-display text-lg font-bold text-shakespeare-950">Region-wise Reuse Impact</h3>
            <p className="text-xs text-shakespeare-700">Across India</p>
          </div>
        </div>
        
        <div className="h-64 flex items-center justify-center relative">
          {/* Simplified India map representation */}
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="w-48 h-56 relative">
              {/* India outline mockup with regions */}
              <div className="absolute top-0 left-1/2 w-20 h-16 bg-gradient-to-br from-shakespeare-400/40 to-shakespeare-500/60 rounded-t-3xl -translate-x-1/2 animate-pulse">
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-bold text-shakespeare-950">North</span>
              </div>
              <div className="absolute top-16 left-1/2 w-32 h-20 bg-gradient-to-br from-aqua-teal/40 to-shakespeare-400/60 rounded-2xl -translate-x-1/2 animate-pulse" style={{ animationDelay: '0.5s' }}>
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-bold text-shakespeare-950">Central</span>
              </div>
              <div className="absolute bottom-8 left-4 w-24 h-20 bg-gradient-to-br from-shakespeare-500/40 to-royal-blue/60 rounded-2xl animate-pulse" style={{ animationDelay: '1s' }}>
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-bold text-shakespeare-950">West</span>
              </div>
              <div className="absolute bottom-8 right-4 w-24 h-20 bg-gradient-to-br from-shakespeare-600/40 to-shakespeare-700/60 rounded-2xl animate-pulse" style={{ animationDelay: '1.5s' }}>
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-bold text-shakespeare-950">East</span>
              </div>
              <div className="absolute bottom-0 left-1/2 w-20 h-12 bg-gradient-to-br from-shakespeare-400/40 to-aqua-teal/60 rounded-b-3xl -translate-x-1/2 animate-pulse" style={{ animationDelay: '2s' }}>
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-bold text-shakespeare-950">South</span>
              </div>
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
