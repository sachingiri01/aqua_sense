// 'use client';

// import { useState } from 'react';
// import AdminSidebar from '@/components/admin/AdminSidebar';
// import GlassCard from '@/components/admin/GlassCard';
// import WaveDivider from '@/components/admin/WaveDivider';
// import { Send, User, Bot } from 'lucide-react';

// export default function CustomerQueriesPage() {
//   const [selectedQuery, setSelectedQuery] = useState(null);
//   const [message, setMessage] = useState('');

//   const queries = [
//     {
//       id: 1,
//       userName: 'Vikram Singh',
//       subject: 'High TDS readings in Plant #3',
//       status: 'Open',
//       assignedTo: 'Support Team A',
//       lastUpdate: '2 hours ago',
//       messages: [
//         {
//           sender: 'Vikram Singh',
//           role: 'user',
//           message: 'We are getting consistently high TDS readings in Plant #3. The values are around 450 ppm. Is this normal?',
//           time: '10:30 AM'
//         },
//         {
//           sender: 'Support Team',
//           role: 'staff',
//           message: 'Thank you for reaching out. TDS readings of 450 ppm are slightly elevated. Could you check if the RO system is functioning properly?',
//           time: '11:15 AM'
//         }
//       ]
//     },
//     {
//       id: 2,
//       userName: 'Anjali Desai',
//       subject: 'Sensor calibration needed',
//       status: 'In Progress',
//       assignedTo: 'Technical Team B',
//       lastUpdate: '1 day ago',
//       messages: [
//         {
//           sender: 'Anjali Desai',
//           role: 'user',
//           message: 'The pH sensor in Zone 2 seems to be giving inconsistent readings. Can someone help with calibration?',
//           time: 'Yesterday 3:45 PM'
//         },
//         {
//           sender: 'Technical Team',
//           role: 'staff',
//           message: 'We have scheduled a technician visit for tomorrow morning. They will calibrate all sensors in Zone 2.',
//           time: 'Yesterday 4:20 PM'
//         }
//       ]
//     },
//     {
//       id: 3,
//       userName: 'Rohit Mehta',
//       subject: 'Dashboard not loading',
//       status: 'Closed',
//       assignedTo: 'IT Support',
//       lastUpdate: '3 days ago',
//       messages: [
//         {
//           sender: 'Rohit Mehta',
//           role: 'user',
//           message: 'The dashboard is not loading on my browser. Getting a blank screen.',
//           time: '3 days ago'
//         },
//         {
//           sender: 'IT Support',
//           role: 'staff',
//           message: 'This was a browser cache issue. Please clear your cache and try again.',
//           time: '3 days ago'
//         },
//         {
//           sender: 'Rohit Mehta',
//           role: 'user',
//           message: 'Fixed! Thank you.',
//           time: '3 days ago'
//         }
//       ]
//     }
//   ];

//   const handleSendMessage = () => {
//     if (message.trim()) {
//       // Handle sending message
//       console.log('Sending message:', message);
//       setMessage('');
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-gradient-to-br from-shakespeare-50 via-shakespeare-100 to-aqua-teal/20">
//       <div className="fixed left-0 top-0 h-screen w-64 bg-white/20 backdrop-blur-xl border-r border-white/20">
        
//          <AdminSidebar />
//       </div>

//       <main className="flex-1 overflow-y-auto ml-72">
//         {/* Header */}
//         <div className=" bg-gradient-to-r from-shakespeare-500 via-shakespeare-600 to-royal-blue overflow-hidden fixed w-full z-50">
//           <div className="absolute inset-0 opacity-20">
//             <div className="absolute top-0 left-0 w-full h-full animate-wave bg-gradient-to-br from-white/20 to-transparent" />
//           </div>
//           <div className="relative z-10 p-8">
//             <h1 className="font-display text-4xl font-bold text-white mb-2">
//               Customer Queries
//             </h1>
//             <p className="text-shakespeare-100 text-lg">
//               Helpdesk support and query management
//             </p>
//           </div>
//           <WaveDivider className="absolute -bottom-1" />
//         </div>

//         {/* Content */}
//         <div className="p-8 mt-30">
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//             {/* Query List */}
//             <div className="lg:col-span-1">
//               <GlassCard className="p-6">
//                 <h2 className="font-display text-xl font-bold text-shakespeare-950 mb-6">
//                   All Queries
//                 </h2>
//                 <div className="space-y-3">
//                   {queries.map((query) => (
//                     <button
//                       key={query.id}
//                       onClick={() => setSelectedQuery(query)}
//                       className={`
//                         w-full p-4 rounded-2xl text-left transition-all duration-300
//                         ${selectedQuery?.id === query.id
//                           ? 'bg-shakespeare-500/20 border-2 border-shakespeare-500'
//                           : 'bg-white/5 hover:bg-white/10 border-2 border-transparent'
//                         }
//                       `}
//                     >
//                       <div className="flex items-center justify-between mb-2">
//                         <span className="font-semibold text-shakespeare-950 text-sm">{query.userName}</span>
//                         <span className={`
//                           px-2 py-1 rounded-full text-xs font-semibold
//                           ${query.status === 'Open' ? 'bg-orange-accent/20 text-orange-accent' :
//                             query.status === 'In Progress' ? 'bg-shakespeare-500/20 text-shakespeare-700' :
//                             'bg-green-500/20 text-green-700'
//                           }
//                         `}>
//                           {query.status}
//                         </span>
//                       </div>
//                       <p className="text-xs text-shakespeare-800 mb-2 line-clamp-2">{query.subject}</p>
//                       <div className="flex items-center justify-between text-xs text-shakespeare-700">
//                         <span>To: {query.assignedTo}</span>
//                         <span>{query.lastUpdate}</span>
//                       </div>
//                     </button>
//                   ))}
//                 </div>
//               </GlassCard>
//             </div>

//             {/* Chat View */}
//             <div className="lg:col-span-2">
//               {selectedQuery ? (
//                 <GlassCard className="h-[calc(100vh-16rem)] flex flex-col">
//                   {/* Chat Header */}
//                   <div className="p-6 border-b border-shakespeare-300/30">
//                     <h3 className="font-display text-xl font-bold text-shakespeare-950 mb-2">
//                       {selectedQuery.subject}
//                     </h3>
//                     <div className="flex items-center gap-4 text-sm text-shakespeare-700">
//                       <span>From: {selectedQuery.userName}</span>
//                       <span>•</span>
//                       <span>Assigned to: {selectedQuery.assignedTo}</span>
//                       <span>•</span>
//                       <span className={`
//                         px-2 py-1 rounded-full text-xs font-semibold
//                         ${selectedQuery.status === 'Open' ? 'bg-orange-accent/20 text-orange-accent' :
//                           selectedQuery.status === 'In Progress' ? 'bg-shakespeare-500/20 text-shakespeare-700' :
//                           'bg-green-500/20 text-green-700'
//                         }
//                       `}>
//                         {selectedQuery.status}
//                       </span>
//                     </div>
//                   </div>

//                   {/* Messages */}
//                   <div className="flex-1 p-6 overflow-y-auto space-y-4">
//                     {selectedQuery.messages.map((msg, idx) => (
//                       <div
//                         key={idx}
//                         className={`flex items-start gap-3 ${
//                           msg.role === 'staff' ? 'flex-row-reverse' : ''
//                         }`}
//                       >
//                         {/* Avatar bubble */}
//                         <div className={`
//                           w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0
//                           ${msg.role === 'user'
//                             ? 'bg-gradient-to-br from-shakespeare-400 to-shakespeare-600'
//                             : 'bg-gradient-to-br from-orange-accent to-orange-accent/80'
//                           }
//                         `}>
//                           {msg.role === 'user' ? (
//                             <User className="w-5 h-5 text-white" />
//                           ) : (
//                             <Bot className="w-5 h-5 text-white" />
//                           )}
//                         </div>

//                         {/* Message bubble */}
//                         <div className={`
//                           flex-1 max-w-lg p-4 rounded-2xl
//                           ${msg.role === 'user'
//                             ? 'bg-white/10 rounded-tl-sm'
//                             : 'bg-shakespeare-500/20 rounded-tr-sm'
//                           }
//                         `}>
//                           <p className="text-sm text-shakespeare-950 mb-1">{msg.message}</p>
//                           <span className="text-xs text-shakespeare-700">{msg.time}</span>
//                         </div>
//                       </div>
//                     ))}
//                   </div>

//                   {/* Message Input */}
//                   <div className="p-6 border-t border-shakespeare-300/30">
//                     <div className="flex items-center gap-3">
//                       <input
//                         type="text"
//                         value={message}
//                         onChange={(e) => setMessage(e.target.value)}
//                         onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
//                         placeholder="Type your response..."
//                         className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-shakespeare-300/30 text-shakespeare-950 placeholder-shakespeare-600 focus:outline-none focus:border-shakespeare-500 transition-all duration-300"
//                       />
//                       <button
//                         onClick={handleSendMessage}
//                         className="px-6 py-3 rounded-xl bg-gradient-to-r from-shakespeare-500 to-shakespeare-600 text-white font-semibold hover:shadow-lg hover:shadow-shakespeare-500/30 transition-all duration-300 flex items-center gap-2"
//                       >
//                         <Send className="w-4 h-4" />
//                         Send
//                       </button>
//                     </div>
//                   </div>
//                 </GlassCard>
//               ) : (
//                 <GlassCard className="h-[calc(100vh-16rem)] flex items-center justify-center">
//                   <div className="text-center">
//                     <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-shakespeare-400 to-shakespeare-600 flex items-center justify-center mx-auto mb-4 animate-float">
//                       <Bot className="w-12 h-12 text-white" />
//                     </div>
//                     <h3 className="font-display text-xl font-bold text-shakespeare-950 mb-2">
//                       Select a query to view
//                     </h3>
//                     <p className="text-shakespeare-700">
//                       Choose a customer query from the list to start responding
//                     </p>
//                   </div>
//                 </GlassCard>
//               )}
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }


'use client';

import { useState } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import GlassCard from '@/components/admin/GlassCard';
import WaveDivider from '@/components/admin/WaveDivider';
import { Mail, Phone, Building2, Calendar, User } from 'lucide-react';

export default function CustomerQueriesPage() {
  const [selectedQuery, setSelectedQuery] = useState(null);

  const queries = [
    {
      id: 1,
      userName: 'Rajesh Kumar',
      email: 'rajesh.k@greenfarms.in',
      phone: '+91 98765 43210',
      organizationType: 'Agriculture',
      subject: 'Water Management Solution for 500-acre Farm',
      message: 'Hello, I run a 500-acre agricultural farm in Punjab. We are facing severe water wastage issues and need an efficient water management system. Our current irrigation method is outdated and we lose almost 40% water due to inefficient distribution. Can AquaSense help us optimize our water usage and reduce costs?',
      status: 'Open',
      submittedOn: 'Dec 7, 2025 - 10:30 AM'
    },
    {
      id: 2,
      userName: 'Priya Sharma',
      email: 'priya.sharma@technimanufacturing.com',
      phone: '+91 98234 56789',
      organizationType: 'Manufacturing',
      subject: 'IoT Sensors for Industrial Water Quality Monitoring',
      message: 'We are a manufacturing unit in Bangalore with high water consumption. We need real-time monitoring of TDS, pH levels, and water flow across 15 different production lines. Can your IoT sensors integrate with our existing SCADA system? Also, what is the ROI timeline?',
      status: 'In Progress',
      submittedOn: 'Dec 6, 2025 - 2:15 PM'
    },
    {
      id: 3,
      userName: 'Amit Patel',
      email: 'amit.patel@citycouncil.gov.in',
      phone: '+91 97654 32109',
      organizationType: 'Municipal',
      subject: 'Smart Water Management for Smart City Project',
      message: 'I am the municipal water officer for Surat Smart City project. We are looking for a comprehensive water management solution to monitor water distribution across 500,000+ households, detect leakages in real-time, and implement predictive maintenance. This is a large-scale deployment. Can you provide a detailed proposal with scalability options?',
      status: 'Open',
      submittedOn: 'Dec 7, 2025 - 9:00 AM'
    },
    {
      id: 4,
      userName: 'Sneha Reddy',
      email: 'sneha.reddy@techpark.in',
      phone: '+91 91234 56780',
      organizationType: 'Commercial',
      subject: 'Water Conservation System for IT Park',
      message: 'We manage a 10-acre IT park in Hyderabad housing 20+ companies. Looking for automated water management with rainwater harvesting integration, greywater recycling monitoring, and usage analytics. Need consultation on implementation.',
      status: 'Resolved',
      submittedOn: 'Dec 5, 2025 - 11:00 AM'
    },
    {
      id: 5,
      userName: 'Vikram Singh',
      email: 'vikram.singh@hotelgroup.in',
      phone: '+91 99876 54321',
      organizationType: 'Commercial',
      subject: 'Water Management for Hotel Chain',
      message: 'We operate a chain of 12 luxury hotels across India. Each property uses 50,000+ liters daily. We want centralized monitoring, automated alerts for anomalies, and detailed analytics per property. What is your experience with hospitality sector?',
      status: 'In Progress',
      submittedOn: 'Dec 6, 2025 - 10:00 AM'
    },
    {
      id: 6,
      userName: 'Anjali Mehta',
      email: 'anjali.mehta@researchinstitute.edu',
      phone: '+91 98123 45670',
      organizationType: 'Other',
      subject: 'Water Quality Research Partnership Inquiry',
      message: 'I am a researcher at IIT Bombay working on sustainable water management. We are interested in using AquaSense sensors for a 2-year research project on urban water quality patterns. Do you offer academic partnerships or discounted pricing for research institutions? We would also like to explore potential collaboration opportunities.',
      status: 'Open',
      submittedOn: 'Dec 7, 2025 - 8:00 AM'
    },
    {
      id: 7,
      userName: 'Karthik Narayanan',
      email: 'karthik.n@textileindustries.com',
      phone: '+91 96543 21098',
      organizationType: 'Manufacturing',
      subject: 'Water Recycling System for Textile Unit',
      message: 'Our textile manufacturing unit in Coimbatore processes 200,000 liters of water daily. We want to implement a water recycling and treatment system to reduce costs and meet environmental compliance. Can you help design a solution that integrates with our current production flow?',
      status: 'Open',
      submittedOn: 'Dec 7, 2025 - 11:45 AM'
    },
    {
      id: 8,
      userName: 'Meera Deshmukh',
      email: 'meera.d@apartmentassociation.in',
      phone: '+91 92345 67801',
      organizationType: 'Commercial',
      subject: 'Water Management for Residential Complex',
      message: 'I represent a 500-apartment residential complex in Pune. We are facing water shortage issues and need better monitoring and distribution. Interested in smart meters, leak detection, and usage analytics for each apartment. Please provide pricing and implementation timeline.',
      status: 'Open',
      submittedOn: 'Dec 6, 2025 - 4:30 PM'
    }
  ];

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
              Customer Queries
            </h1>
            <p className="text-shakespeare-100 text-lg">
              View consultation requests and customer inquiries
            </p>
          </div>
          <WaveDivider className="absolute -bottom-1" />
        </div>

        {/* Content */}
        <div className="p-8 mt-30">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Query List */}
            <div className="lg:col-span-1">
              <GlassCard className="p-6">
                <h2 className="font-display text-xl font-bold text-shakespeare-950 mb-6">
                  All Queries ({queries.length})
                </h2>
                <div className="space-y-3">
                  {queries.map((query) => (
                    <button
                      key={query.id}
                      onClick={() => setSelectedQuery(query)}
                      className={`
                        w-full p-4 rounded-2xl text-left transition-all duration-300
                        ${selectedQuery?.id === query.id
                          ? 'bg-shakespeare-500/20 border-2 border-shakespeare-500'
                          : 'bg-white/5 hover:bg-white/10 border-2 border-transparent'
                        }
                      `}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-shakespeare-950 text-sm">{query.userName}</span>
                        <span className={`
                          px-2 py-1 rounded-full text-xs font-semibold
                          ${query.status === 'Open' ? 'bg-orange-accent/20 text-orange-accent' :
                            query.status === 'In Progress' ? 'bg-shakespeare-500/20 text-shakespeare-700' :
                            'bg-green-500/20 text-green-700'
                          }
                        `}>
                          {query.status}
                        </span>
                      </div>
                      <p className="text-xs text-shakespeare-800 mb-2 line-clamp-2">{query.subject}</p>
                      <div className="flex items-center justify-between text-xs text-shakespeare-700">
                        <span className="truncate">{query.organizationType}</span>
                        <span>{query.submittedOn.split(' - ')[0]}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </GlassCard>
            </div>

            {/* Query Details View */}
            <div className="lg:col-span-2">
              {selectedQuery ? (
                <GlassCard className="p-6">
                  {/* Header Section */}
                  <div className="border-b border-shakespeare-300/30 pb-6 mb-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-display text-2xl font-bold text-shakespeare-950 mb-2">
                          {selectedQuery.subject}
                        </h3>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-shakespeare-600" />
                          <span className="text-sm text-shakespeare-700">{selectedQuery.submittedOn}</span>
                        </div>
                      </div>
                      <span className={`
                        px-4 py-2 rounded-full text-sm font-semibold
                        ${selectedQuery.status === 'Open' ? 'bg-orange-accent/20 text-orange-accent' :
                          selectedQuery.status === 'In Progress' ? 'bg-shakespeare-500/20 text-shakespeare-700' :
                          'bg-green-500/20 text-green-700'
                        }
                      `}>
                        {selectedQuery.status}
                      </span>
                    </div>
                  </div>

                  {/* Customer Details */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-shakespeare-950 mb-4 flex items-center gap-2">
                      <User className="w-5 h-5 text-shakespeare-600" />
                      Customer Details
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-start gap-3 p-4 rounded-xl bg-white/5">
                        <User className="w-5 h-5 text-shakespeare-600 mt-0.5" />
                        <div>
                          <p className="text-xs text-shakespeare-700 mb-1">Name</p>
                          <p className="text-sm font-semibold text-shakespeare-950">{selectedQuery.userName}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-4 rounded-xl bg-white/5">
                        <Mail className="w-5 h-5 text-shakespeare-600 mt-0.5" />
                        <div>
                          <p className="text-xs text-shakespeare-700 mb-1">Email</p>
                          <p className="text-sm font-semibold text-shakespeare-950">{selectedQuery.email}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-4 rounded-xl bg-white/5">
                        <Phone className="w-5 h-5 text-shakespeare-600 mt-0.5" />
                        <div>
                          <p className="text-xs text-shakespeare-700 mb-1">Phone</p>
                          <p className="text-sm font-semibold text-shakespeare-950">{selectedQuery.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-4 rounded-xl bg-white/5">
                        <Building2 className="w-5 h-5 text-shakespeare-600 mt-0.5" />
                        <div>
                          <p className="text-xs text-shakespeare-700 mb-1">Organization Type</p>
                          <p className="text-sm font-semibold text-shakespeare-950">{selectedQuery.organizationType}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Message Section */}
                  <div>
                    <h4 className="font-semibold text-shakespeare-950 mb-3">Message</h4>
                    <div className="p-5 rounded-xl bg-shakespeare-500/10 border border-shakespeare-300/30">
                      <p className="text-shakespeare-950 leading-relaxed">
                        {selectedQuery.message}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 mt-6 pt-6 border-t border-shakespeare-300/30">
                    <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-shakespeare-500 to-shakespeare-600 text-white font-semibold hover:shadow-lg hover:shadow-shakespeare-500/30 transition-all duration-300">
                      Mark as In Progress
                    </button>
                    <button className="px-6 py-3 rounded-xl bg-white/10 border border-shakespeare-300/30 text-shakespeare-950 font-semibold hover:bg-white/20 transition-all duration-300">
                      Mark as Resolved
                    </button>
                    <a 
                      href={`mailto:${selectedQuery.email}`}
                      className="px-6 py-3 rounded-xl bg-white/10 border border-shakespeare-300/30 text-shakespeare-950 font-semibold hover:bg-white/20 transition-all duration-300 flex items-center gap-2"
                    >
                      <Mail className="w-4 h-4" />
                      Send Email
                    </a>
                  </div>
                </GlassCard>
              ) : (
                <GlassCard className="h-[calc(100vh-16rem)] flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-shakespeare-400 to-shakespeare-600 flex items-center justify-center mx-auto mb-4 animate-float">
                      <Mail className="w-12 h-12 text-white" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-shakespeare-950 mb-2">
                      Select a query to view details
                    </h3>
                    <p className="text-shakespeare-700">
                      Choose a customer query from the list to view full details
                    </p>
                  </div>
                </GlassCard>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}