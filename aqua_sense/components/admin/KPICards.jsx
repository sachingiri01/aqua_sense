'use client';

import { Users, Droplets, Activity, TrendingUp, AlertTriangle, Bot } from 'lucide-react';
import GlassCard from './GlassCard';

export default function KPICards() {
  const kpis = [
    {
      icon: Users,
      label: 'Total Users',
      value: '2,847',
      change: '+12%',
      positive: true,
      gradient: 'from-shakespeare-400 to-shakespeare-600'
    },
    {
      icon: Droplets,
      label: 'Total Batches',
      value: '15,234',
      change: '+8%',
      positive: true,
      gradient: 'from-aqua-teal to-shakespeare-500'
    },
    {
      icon: Activity,
      label: 'Active Operators',
      value: '342',
      change: '+5%',
      positive: true,
      gradient: 'from-royal-blue to-shakespeare-600'
    },
    {
      icon: TrendingUp,
      label: 'Reuse % Today',
      value: '87.3%',
      change: '+3.2%',
      positive: true,
      gradient: 'from-shakespeare-500 to-shakespeare-700'
    },
    {
      icon: AlertTriangle,
      label: 'Total Alerts',
      value: '23',
      change: '-15%',
      positive: true,
      gradient: 'from-orange-accent to-red-500'
    },
    {
      icon: Bot,
      label: 'AI Agent Actions',
      value: '1,847',
      change: '+24%',
      positive: true,
      gradient: 'from-shakespeare-400 to-royal-blue'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {kpis.map((kpi, idx) => {
        const Icon = kpi.icon;
        return (
          <GlassCard key={idx} className="p-6 group">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-shakespeare-700 font-medium mb-2">{kpi.label}</p>
                <h3 className="text-3xl font-display font-bold text-shakespeare-950 mb-1">
                  {kpi.value}
                </h3>
                <span className={`text-xs font-semibold ${kpi.positive ? 'text-green-600' : 'text-red-600'}`}>
                  {kpi.change} from last week
                </span>
              </div>
              
              <div className={`
                w-14 h-14 rounded-2xl bg-gradient-to-br ${kpi.gradient}
                flex items-center justify-center
                shadow-lg group-hover:scale-110 transition-transform duration-300
                animate-float
              `}>
                <Icon className="w-7 h-7 text-white" />
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-4 h-1.5 bg-shakespeare-200/30 rounded-full overflow-hidden">
              <div 
                className={`h-full bg-gradient-to-r ${kpi.gradient} rounded-full transition-all duration-1000`}
                style={{ width: `${Math.random() * 40 + 60}%` }}
              />
            </div>
          </GlassCard>
        );
      })}
    </div>
  );
}
