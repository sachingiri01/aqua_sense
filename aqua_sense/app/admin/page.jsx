'use client';

import AdminSidebar from '@/components/admin/AdminSidebar';
import KPICards from '@/components/admin/KPICards';
import Charts from '@/components/admin/Charts';
import LiveDataWidget from '@/components/admin/LiveDataWidget';
import WaveDivider from '@/components/admin/WaveDivider';
import Header from '@/components/Header';
import { Home } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-shakespeare-50 via-shakespeare-100 to-aqua-teal/20">
      
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-screen w-64 bg-white/20 backdrop-blur-xl border-r border-white/20">
  
   <AdminSidebar />
</div>

     

      {/* Main Content */}
      <main className="flex-1 ml-72 overflow-y-auto">
        {/* Header */}
        <div className=" bg-gradient-to-r from-shakespeare-500 via-shakespeare-600 to-royal-blue overflow-hidden fixed w-full z-50">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-full h-full animate-wave bg-gradient-to-br from-white/20 to-transparent" />
          </div>
         <div className="relative z-10 p-8 flex items-center "> {/* Home Icon */} 
           
          {/* Title + Subtitle */} 
          
          <div> <h1 className="font-display text-4xl font-bold text-white mb-2"> AquaSense Command Center </h1> <p className="text-shakespeare-100 text-lg"> Real-time water intelligence monitoring and control </p> </div>
          
          
           
          
          </div>
          <WaveDivider className="absolute -bottom-1" />
        </div>

        {/* Dashboard Content */}
        <div className="p-8 space-y-8 mt-30">
          {/* KPI Cards */}
          <section>
            <h2 className="font-display text-2xl font-bold text-shakespeare-950 mb-6">
              Key Performance Indicators
            </h2>
            <KPICards />
          </section>

          {/* Charts and Live Data */}
          <section>
            <h2 className="font-display text-2xl font-bold text-shakespeare-950 mb-6">
              Analytics & Insights
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Charts />
              </div>
              <div>
                <LiveDataWidget />
              </div>
            </div>
          </section>

          {/* Recent Activity */}
          <section>
            <h2 className="font-display text-2xl font-bold text-shakespeare-950 mb-6">
              Recent System Activity
            </h2>
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6">
              <div className="space-y-4">
                {[
                  { time: '2 mins ago', action: 'Batch #15234 routed to irrigation', status: 'success' },
                  { time: '8 mins ago', action: 'High TDS alert resolved by AI Agent', status: 'warning' },
                  { time: '15 mins ago', action: 'New operator logged in from Chennai plant', status: 'info' },
                  { time: '23 mins ago', action: 'Water quality parameters updated', status: 'success' },
                  { time: '45 mins ago', action: 'Staff report submitted from Gujarat facility', status: 'info' }
                ].map((activity, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-300">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.status === 'success' ? 'bg-green-500' :
                      activity.status === 'warning' ? 'bg-orange-accent' :
                      'bg-shakespeare-500'
                    } animate-pulse`} />
                    <div className="flex-1">
                      <p className="text-sm text-shakespeare-900 font-medium">{activity.action}</p>
                      <p className="text-xs text-shakespeare-700">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
