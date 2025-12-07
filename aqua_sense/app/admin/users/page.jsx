'use client';

import { useState } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import GlassCard from '@/components/admin/GlassCard';
import DataTable from '@/components/admin/DataTable';
import WaveDivider from '@/components/admin/WaveDivider';
import { Trash2, RefreshCw, Shield, X, Download } from 'lucide-react';
import Header from '@/components/Header';

export default function UsersPage() {
  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const users = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      email: 'rajesh.kumar@aquasense.in',
      role: 'Plant Operator',
      joiningDate: '2024-01-15',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Priya Sharma',
      email: 'priya.sharma@aquasense.in',
      role: 'ML Engineer',
      joiningDate: '2024-02-20',
      status: 'Active'
    },
    {
      id: 3,
      name: 'Amit Patel',
      email: 'amit.patel@aquasense.in',
      role: 'Field Technician',
      joiningDate: '2024-03-10',
      status: 'Inactive'
    },
    {
      id: 4,
      name: 'Sneha Reddy',
      email: 'sneha.reddy@aquasense.in',
      role: 'Water Quality Analyst',
      joiningDate: '2024-04-05',
      status: 'Active'
    }
  ];

  const handleAction = (action, user) => {
    setModalAction(action);
    setSelectedUser(user);
    setShowModal(true);
  };

  const confirmAction = () => {
    // Handle the action here
    console.log(`${modalAction} for user:`, selectedUser);
    setShowModal(false);
  };

  const handleExportToExcel = () => {
    // Create CSV content
    const headers = ['ID', 'Name', 'Email', 'Role', 'Joining Date', 'Status'];
    const csvContent = [
      headers.join(','),
      ...users.map(user => [
        user.id,
        `"${user.name}"`,
        user.email,
        `"${user.role}"`,
        user.joiningDate,
        user.status
      ].join(','))
    ].join('\n');

    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `users_list_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const columns = [
    { 
      header: 'Name', 
      key: 'name',
      render: (val) => <span className="font-semibold text-shakespeare-950">{val}</span>
    },
    { header: 'Email', key: 'email' },
    { 
      header: 'Role', 
      key: 'role',
      render: (val) => (
        <span className="px-3 py-1 rounded-full bg-shakespeare-500/20 text-shakespeare-700 text-xs font-semibold">
          {val}
        </span>
      )
    },
    { header: 'Joining Date', key: 'joiningDate' },
    { 
      header: 'Status', 
      key: 'status',
      render: (val) => (
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
          val === 'Active' ? 'bg-green-500/20 text-green-700' : 'bg-gray-500/20 text-gray-700'
        }`}>
          {val}
        </span>
      )
    },
    {
      header: 'Actions',
      key: 'actions',
      render: (_, user) => (
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAction('Delete', user);
            }}
            className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-600 transition-all duration-300"
            title="Delete User"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAction('Reset Password', user);
            }}
            className="p-2 rounded-lg bg-shakespeare-500/10 hover:bg-shakespeare-500/20 text-shakespeare-600 transition-all duration-300"
            title="Reset Password"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAction('Make Admin', user);
            }}
            className="p-2 rounded-lg bg-orange-accent/10 hover:bg-orange-accent/20 text-orange-accent transition-all duration-300"
            title="Make Admin"
          >
            <Shield className="w-4 h-4" />
          </button>
        </div>
      )
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
              Users Management
            </h1>
            <p className="text-shakespeare-100 text-lg">
              Manage system users and permissions
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
                  All Users ({users.length})
                </h2>
                <button
                  onClick={handleExportToExcel}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-shakespeare-500 to-shakespeare-600 text-white font-semibold hover:shadow-lg hover:shadow-shakespeare-500/30 transition-all duration-300 flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Export to Excel
                </button>
              </div>
              <DataTable columns={columns} data={users} />
            </div>
          </GlassCard>
        </div>

        {/* Confirmation Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-shakespeare-950/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <GlassCard className="w-full max-w-md p-8 animate-in zoom-in-95">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display text-2xl font-bold text-shakespeare-950">
                  Confirm {modalAction}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="w-8 h-8 rounded-full bg-shakespeare-200/50 hover:bg-shakespeare-300/50 flex items-center justify-center transition-all duration-300"
                >
                  <X className="w-4 h-4 text-shakespeare-950" />
                </button>
              </div>

              <div className="mb-6">
                <p className="text-shakespeare-800 mb-4">
                  Are you sure you want to <span className="font-bold">{modalAction.toLowerCase()}</span> for:
                </p>
                <div className="p-4 rounded-2xl bg-shakespeare-500/10 border border-shakespeare-400/30">
                  <p className="font-semibold text-shakespeare-950">{selectedUser?.name}</p>
                  <p className="text-sm text-shakespeare-700">{selectedUser?.email}</p>
                  <p className="text-xs text-shakespeare-600 mt-1">{selectedUser?.role}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-6 py-3 rounded-xl bg-shakespeare-200/50 text-shakespeare-950 font-semibold hover:bg-shakespeare-300/50 transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmAction}
                  className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-orange-accent to-orange-accent/90 text-white font-semibold hover:shadow-lg hover:shadow-orange-accent/30 transition-all duration-300"
                >
                  Confirm
                </button>
              </div>
            </GlassCard>
          </div>
        )}
      </main>
    </div>
  );
}