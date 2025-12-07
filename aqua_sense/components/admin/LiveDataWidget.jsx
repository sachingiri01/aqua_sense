'use client';

import { Droplet, Beaker, Eye, Gauge, GitBranch, Bot } from 'lucide-react';
import GlassCard from './GlassCard';
import { useEffect, useState } from 'react';

export default function LiveDataWidget() {
  const [data, setData] = useState({
    ph: 7.2,
    tds: 340,
    turbidity: 2.5,
    flowRate: 150,
    routing: 'Reuse',
    notes: 'Water quality within acceptable parameters. Routing to irrigation system.'
  });

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => ({
        ...prev,
        ph: (7 + Math.random() * 0.5).toFixed(1),
        tds: Math.floor(320 + Math.random() * 40),
        turbidity: (2 + Math.random()).toFixed(1),
        flowRate: Math.floor(140 + Math.random() * 20)
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const parameters = [
    { icon: Droplet, label: 'pH Level', value: data.ph, unit: '', color: 'from-shakespeare-400 to-shakespeare-600' },
    { icon: Beaker, label: 'TDS', value: data.tds, unit: 'ppm', color: 'from-aqua-teal to-shakespeare-500' },
    { icon: Eye, label: 'Turbidity', value: data.turbidity, unit: 'NTU', color: 'from-royal-blue to-shakespeare-600' },
    { icon: Gauge, label: 'Flow Rate', value: data.flowRate, unit: 'L/min', color: 'from-shakespeare-500 to-shakespeare-700' }
  ];

  return (
    <GlassCard className="p-6 relative overflow-hidden">
      {/* Animated wave background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-shakespeare-400 to-transparent animate-wave" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-shakespeare-400 to-shakespeare-600 flex items-center justify-center animate-pulse">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-display text-lg font-bold text-shakespeare-950">Live Data Preview</h3>
            <p className="text-xs text-shakespeare-700">Real-time water parameters</p>
          </div>
          <div className="ml-auto">
            <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-700 text-xs font-semibold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Live
            </span>
          </div>
        </div>

        {/* Parameters Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {parameters.map((param, idx) => {
            const Icon = param.icon;
            return (
              <div key={idx} className="p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${param.color} flex items-center justify-center`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-xs text-shakespeare-700 font-medium">{param.label}</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-display font-bold text-shakespeare-950">{param.value}</span>
                  {param.unit && <span className="text-xs text-shakespeare-600">{param.unit}</span>}
                </div>
              </div>
            );
          })}
        </div>

        {/* Current Routing Decision */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-shakespeare-500/10 to-aqua-teal/10 border border-shakespeare-400/30 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <GitBranch className="w-5 h-5 text-shakespeare-600" />
            <span className="text-sm font-semibold text-shakespeare-900">Current Routing Decision</span>
          </div>
          <div className="px-3 py-2 rounded-xl bg-shakespeare-500 text-white font-display font-bold inline-block">
            {data.routing}
          </div>
        </div>

        {/* AI Agent Notes */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-royal-blue/10 to-shakespeare-400/10 border border-royal-blue/30">
          <div className="flex items-center gap-2 mb-2">
            <Bot className="w-5 h-5 text-royal-blue" />
            <span className="text-sm font-semibold text-shakespeare-900">Agent Notes</span>
          </div>
          <p className="text-sm text-shakespeare-800 leading-relaxed">{data.notes}</p>
        </div>
      </div>
    </GlassCard>
  );
}

function Activity({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
  );
}
