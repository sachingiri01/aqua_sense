'use client';

import { useState } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import GlassCard from '@/components/admin/GlassCard';
import DataTable from '@/components/admin/DataTable';
import WaveDivider from '@/components/admin/WaveDivider';
import { X, TrendingUp, Clock, Droplet, GitBranch, Bot, CheckCircle, Download } from 'lucide-react';

export default function BatchHistoryPage() {
  const [selectedBatch, setSelectedBatch] = useState(null);

  const batches = [
    {
      id: 'BTH-15234',
      timestamp: '2024-12-06 14:32:45',
      qualitySummary: 'Good',
      mlPrediction: 'Reuse - 94% confidence',
      finalRouting: 'Irrigation',
      operatorApproval: 'Approved',
      aiComments: 'Water quality exceeds irrigation standards. pH balanced, TDS within limits.'
    },
    {
      id: 'BTH-15233',
      timestamp: '2024-12-06 14:15:20',
      qualitySummary: 'Excellent',
      mlPrediction: 'Reuse - 98% confidence',
      finalRouting: 'Cooling System',
      operatorApproval: 'Approved',
      aiComments: 'Optimal parameters for cooling tower. Low turbidity detected.'
    },
    {
      id: 'BTH-15232',
      timestamp: '2024-12-06 13:48:10',
      qualitySummary: 'Fair',
      mlPrediction: 'Discharge - 76% confidence',
      finalRouting: 'Discharge',
      operatorApproval: 'Approved',
      aiComments: 'High TDS levels. Recommended for safe discharge after treatment.'
    },
    {
      id: 'BTH-15231',
      timestamp: '2024-12-06 13:20:55',
      qualitySummary: 'Good',
      mlPrediction: 'Reuse - 91% confidence',
      finalRouting: 'Reuse',
      operatorApproval: 'Approved',
      aiComments: 'Suitable for non-potable reuse applications.'
    }
  ];

  const columns = [
    { header: 'Batch ID', key: 'id', render: (val) => <span className="font-display font-bold text-shakespeare-600">{val}</span> },
    { header: 'Timestamp', key: 'timestamp' },
    { 
      header: 'Quality', 
      key: 'qualitySummary',
      render: (val) => (
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
          val === 'Excellent' ? 'bg-green-500/20 text-green-700' :
          val === 'Good' ? 'bg-shakespeare-500/20 text-shakespeare-700' :
          'bg-orange-accent/20 text-orange-accent'
        }`}>
          {val}
        </span>
      )
    },
    { header: 'ML Prediction', key: 'mlPrediction' },
    { 
      header: 'Final Routing', 
      key: 'finalRouting',
      render: (val) => (
        <span className="px-3 py-1 rounded-full bg-shakespeare-500 text-white text-xs font-bold">
          {val}
        </span>
      )
    },
    { 
      header: 'Status', 
      key: 'operatorApproval',
      render: (val) => (
        <span className="flex items-center gap-1 text-green-600">
          <CheckCircle className="w-4 h-4" />
          <span className="text-xs font-semibold">{val}</span>
        </span>
      )
    }
  ];

  const handleExportToExcel = () => {
    // Create CSV content
    const headers = ['Batch ID', 'Timestamp', 'Quality Summary', 'ML Prediction', 'Final Routing', 'Operator Approval', 'AI Comments'];
    const csvContent = [
      headers.join(','),
      ...batches.map(batch => [
        batch.id,
        batch.timestamp,
        batch.qualitySummary,
        `"${batch.mlPrediction}"`,
        batch.finalRouting,
        batch.operatorApproval,
        `"${batch.aiComments}"`
      ].join(','))
    ].join('\n');

    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `batch_history_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-shakespeare-50 via-shakespeare-100 to-aqua-teal/20">
      <div className="fixed left-0 top-0 h-screen w-64 bg-white/20 backdrop-blur-xl border-r border-white/20">
        
         <AdminSidebar />
      </div>

      <main className="flex-1 overflow-y-auto ml-72">
        {/* Header */}
        <div className=" bg-gradient-to-r from-shakespeare-500 via-shakespeare-600 to-royal-blue overflow-hidden fixed w-full z-50">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-full h-full animate-wave bg-gradient-to-br from-white/20 to-transparent" />
          </div>
          <div className="relative z-10 p-8">
            <h1 className="font-display text-4xl font-bold text-white mb-2">
              Batch History
            </h1>
            <p className="text-shakespeare-100 text-lg">
              Complete water batch processing records
            </p>
          </div>
          <WaveDivider className="absolute -bottom-1" />
        </div>

        {/* Content */}
        <div className="p-8 mt-30">
          <GlassCard className="overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-xl font-bold text-shakespeare-950">
                  Recent Batches
                </h2>
                <button
                  onClick={handleExportToExcel}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-shakespeare-500 to-shakespeare-600 text-white font-semibold hover:shadow-lg hover:shadow-shakespeare-500/30 transition-all duration-300 flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Export to Excel
                </button>
              </div>
              <DataTable 
                columns={columns} 
                data={batches}
                onRowClick={setSelectedBatch}
              />
            </div>
          </GlassCard>
        </div>

        {/* Detail Drawer */}
        {selectedBatch && (
          <div className="fixed inset-0 bg-shakespeare-950/50 backdrop-blur-sm z-50 flex items-center justify-end">
            <div className="w-full max-w-2xl h-full bg-gradient-to-br from-shakespeare-50 to-shakespeare-100 shadow-2xl overflow-y-auto animate-in slide-in-from-right">
              <div className="p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="font-display text-3xl font-bold text-shakespeare-950 mb-2">
                      {selectedBatch.id}
                    </h2>
                    <p className="text-shakespeare-700 flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {selectedBatch.timestamp}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedBatch(null)}
                    className="w-10 h-10 rounded-full bg-shakespeare-200/50 hover:bg-shakespeare-300/50 flex items-center justify-center transition-all duration-300"
                  >
                    <X className="w-5 h-5 text-shakespeare-950" />
                  </button>
                </div>

                <WaveDivider />

                {/* Water Parameters Graph */}
                <GlassCard className="p-6 mb-6">
                  <h3 className="font-display text-lg font-bold text-shakespeare-950 mb-4 flex items-center gap-2">
                    <Droplet className="w-5 h-5" />
                    Water Parameters
                  </h3>
                  <div className="space-y-4">
                    {[
                      { label: 'pH Level', value: 7.2, max: 14, color: 'bg-shakespeare-500' },
                      { label: 'TDS (ppm)', value: 340, max: 500, color: 'bg-aqua-teal' },
                      { label: 'Turbidity (NTU)', value: 2.5, max: 10, color: 'bg-royal-blue' },
                      { label: 'Flow Rate (L/min)', value: 150, max: 200, color: 'bg-shakespeare-600' }
                    ].map((param, idx) => (
                      <div key={idx}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-shakespeare-800 font-medium">{param.label}</span>
                          <span className="font-display font-bold text-shakespeare-950">{param.value}</span>
                        </div>
                        <div className="h-3 bg-shakespeare-200/30 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${param.color} rounded-full transition-all duration-1000`}
                            style={{ width: `${(param.value / param.max) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </GlassCard>

                {/* Timeline of Decisions */}
                <GlassCard className="p-6 mb-6">
                  <h3 className="font-display text-lg font-bold text-shakespeare-950 mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Decision Timeline
                  </h3>
                  <div className="space-y-4">
                    {[
                      { time: '14:32:45', event: 'Batch initiated', status: 'completed' },
                      { time: '14:32:52', event: 'Sensor data collected', status: 'completed' },
                      { time: '14:33:01', event: 'ML analysis completed', status: 'completed' },
                      { time: '14:33:15', event: 'AI recommendation generated', status: 'completed' },
                      { time: '14:33:45', event: 'Operator approval received', status: 'completed' },
                      { time: '14:34:00', event: 'Routing to irrigation system', status: 'active' }
                    ].map((step, idx) => (
                      <div key={idx} className="flex items-center gap-4">
                        <div className={`w-3 h-3 rounded-full ${
                          step.status === 'completed' ? 'bg-green-500' : 'bg-shakespeare-500 animate-pulse'
                        }`} />
                        <div className="flex-1">
                          <p className="text-sm text-shakespeare-900 font-medium">{step.event}</p>
                          <p className="text-xs text-shakespeare-700">{step.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </GlassCard>

                {/* AI Agent Q&A */}
                <GlassCard className="p-6 mb-6">
                  <h3 className="font-display text-lg font-bold text-shakespeare-950 mb-4 flex items-center gap-2">
                    <Bot className="w-5 h-5" />
                    AI Agent Analysis
                  </h3>
                  <div className="space-y-3">
                    <div className="p-4 rounded-2xl bg-shakespeare-500/10 border border-shakespeare-400/30">
                      <p className="text-xs text-shakespeare-700 font-semibold mb-1">ML Prediction</p>
                      <p className="text-sm text-shakespeare-950">{selectedBatch.mlPrediction}</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-royal-blue/10 border border-royal-blue/30">
                      <p className="text-xs text-shakespeare-700 font-semibold mb-1">Agent Comments</p>
                      <p className="text-sm text-shakespeare-950">{selectedBatch.aiComments}</p>
                    </div>
                  </div>
                </GlassCard>

                {/* Valve Routing Animation */}
                <GlassCard className="p-6">
                  <h3 className="font-display text-lg font-bold text-shakespeare-950 mb-4 flex items-center gap-2">
                    <GitBranch className="w-5 h-5" />
                    Valve Routing
                  </h3>
                  <div className="flex items-center justify-center h-48 relative">
                    <div className="absolute left-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-shakespeare-400 to-shakespeare-600 flex items-center justify-center animate-pulse">
                      <Droplet className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute left-20 top-1/2 w-32 h-1 bg-gradient-to-r from-shakespeare-500 to-transparent animate-wave" />
                    <div className="absolute right-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                      <span className="text-white font-bold text-xs text-center">{selectedBatch.finalRouting}</span>
                    </div>
                  </div>
                </GlassCard>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}