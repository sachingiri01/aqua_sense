'use client';

import { useState } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import GlassCard from '@/components/admin/GlassCard';
import WaveDivider from '@/components/admin/WaveDivider';
import { 
  FileText,
  Save,
  Plus,
  Trash2,
  Edit2
} from 'lucide-react';
import Header from '@/components/Header';

export default function SettingsPage() {
  const [companyRules, setCompanyRules] = useState([
    {
      id: 1,
      title: 'Customer Query Response Time',
      description: 'All customer queries must be responded to within 24 hours during business days.',
      category: 'Response Policy'
    },
    {
      id: 2,
      title: 'Technical Issue Escalation',
      description: 'Critical technical issues should be escalated to the technical team within 2 hours of reporting.',
      category: 'Escalation Policy'
    },
    {
      id: 3,
      title: 'Consultation Scheduling',
      description: 'Free consultations should be scheduled within 3-5 business days of request.',
      category: 'Service Policy'
    },
    {
      id: 4,
      title: 'Follow-up Protocol',
      description: 'Follow up with customers after 7 days if no response is received on proposals.',
      category: 'Follow-up Policy'
    },
    {
      id: 5,
      title: 'Data Privacy Compliance',
      description: 'All customer data must be handled according to GDPR and local data protection regulations. No data sharing without explicit consent.',
      category: 'Privacy Policy'
    },
    {
      id: 6,
      title: 'Quality Assurance Standards',
      description: 'All sensor installations must pass quality checks within 48 hours. Documentation and calibration certificates are mandatory.',
      category: 'Quality Policy'
    }
  ]);

  const [isAddingRule, setIsAddingRule] = useState(false);
  const [editingRule, setEditingRule] = useState(null);
  const [newRule, setNewRule] = useState({
    title: '',
    description: '',
    category: 'Response Policy'
  });

  const handleAddRule = () => {
    if (newRule.title && newRule.description) {
      setCompanyRules(prev => [...prev, {
        id: Date.now(),
        ...newRule
      }]);
      setNewRule({ title: '', description: '', category: 'Response Policy' });
      setIsAddingRule(false);
    }
  };

  const handleEditRule = (rule) => {
    setEditingRule(rule);
    setNewRule({
      title: rule.title,
      description: rule.description,
      category: rule.category
    });
  };

  const handleUpdateRule = () => {
    if (newRule.title && newRule.description) {
      setCompanyRules(prev => prev.map(r => 
        r.id === editingRule.id 
          ? { ...r, title: newRule.title, description: newRule.description, category: newRule.category }
          : r
      ));
      setEditingRule(null);
      setNewRule({ title: '', description: '', category: 'Response Policy' });
    }
  };

  const handleDeleteRule = (id) => {
    if (confirm('Are you sure you want to delete this rule?')) {
      setCompanyRules(prev => prev.filter(r => r.id !== id));
    }
  };

  const handleSave = () => {
    console.log('Saving company rules:', companyRules);
    alert('Company rules saved successfully!');
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
              Company Rules
            </h1>
            <p className="text-shakespeare-100 text-lg">
              Manage company policies and operational guidelines
            </p>
          </div>
          <WaveDivider className="absolute -bottom-1" />
        </div>

        {/* Content */}
        <div className="p-8 mt-30">
          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-aqua-teal to-shakespeare-500 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="font-display text-2xl font-bold text-shakespeare-950">
                    Company Rules & Policies
                  </h2>
                  <p className="text-sm text-shakespeare-700">
                    Define and update organizational guidelines
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsAddingRule(true)}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-shakespeare-500 to-shakespeare-600 text-white font-semibold hover:shadow-lg hover:shadow-shakespeare-500/30 transition-all duration-300 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add New Rule
              </button>
            </div>

            {/* Add/Edit Rule Form */}
            {(isAddingRule || editingRule) && (
              <div className="mb-6 p-5 rounded-2xl bg-shakespeare-500/10 border border-shakespeare-300/30">
                <h3 className="font-semibold text-shakespeare-950 mb-4">
                  {editingRule ? 'Edit Rule' : 'Add New Rule'}
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-shakespeare-950">
                      Rule Title *
                    </label>
                    <input
                      type="text"
                      value={newRule.title}
                      onChange={(e) => setNewRule(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-shakespeare-300/30 text-shakespeare-950 focus:outline-none focus:border-shakespeare-500 transition-all duration-300"
                      placeholder="Enter rule title..."
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-shakespeare-950">
                      Category *
                    </label>
                    <select
                      value={newRule.category}
                      onChange={(e) => setNewRule(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-shakespeare-300/30 text-shakespeare-950 focus:outline-none focus:border-shakespeare-500 transition-all duration-300"
                    >
                      <option value="Response Policy">Response Policy</option>
                      <option value="Escalation Policy">Escalation Policy</option>
                      <option value="Service Policy">Service Policy</option>
                      <option value="Follow-up Policy">Follow-up Policy</option>
                      <option value="Privacy Policy">Privacy Policy</option>
                      <option value="Quality Policy">Quality Policy</option>
                      <option value="Safety Policy">Safety Policy</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-shakespeare-950">
                      Description *
                    </label>
                    <textarea
                      value={newRule.description}
                      onChange={(e) => setNewRule(prev => ({ ...prev, description: e.target.value }))}
                      rows="4"
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-shakespeare-300/30 text-shakespeare-950 focus:outline-none focus:border-shakespeare-500 transition-all duration-300 resize-none"
                      placeholder="Enter detailed rule description..."
                    />
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={editingRule ? handleUpdateRule : handleAddRule}
                      className="px-6 py-2 rounded-xl bg-gradient-to-r from-shakespeare-500 to-shakespeare-600 text-white font-semibold hover:shadow-lg hover:shadow-shakespeare-500/30 transition-all duration-300"
                    >
                      {editingRule ? 'Update Rule' : 'Add Rule'}
                    </button>
                    <button
                      onClick={() => {
                        setIsAddingRule(false);
                        setEditingRule(null);
                        setNewRule({ title: '', description: '', category: 'Response Policy' });
                      }}
                      className="px-6 py-2 rounded-xl bg-shakespeare-200/50 hover:bg-shakespeare-300/50 text-shakespeare-950 font-semibold transition-all duration-300"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Rules List */}
            <div className="space-y-3">
              {companyRules.length === 0 ? (
                <div className="text-center py-12">
                  <FileText className="w-16 h-16 text-shakespeare-400 mx-auto mb-4" />
                  <p className="text-shakespeare-700 text-lg">No company rules defined yet.</p>
                  <p className="text-shakespeare-600 text-sm">Click "Add New Rule" to create your first rule.</p>
                </div>
              ) : (
                companyRules.map((rule) => (
                  <div key={rule.id} className="p-5 rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-300">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-shakespeare-950 text-lg">{rule.title}</h3>
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-shakespeare-500/20 text-shakespeare-700">
                            {rule.category}
                          </span>
                        </div>
                        <p className="text-sm text-shakespeare-700 leading-relaxed">{rule.description}</p>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => handleEditRule(rule)}
                          className="p-2 rounded-lg bg-shakespeare-500/10 hover:bg-shakespeare-500/20 text-shakespeare-600 transition-all duration-300"
                          title="Edit Rule"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteRule(rule.id)}
                          className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-600 transition-all duration-300"
                          title="Delete Rule"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Save Button */}
            {companyRules.length > 0 && (
              <div className="flex justify-end mt-6 pt-6 border-t border-shakespeare-300/30">
                <button
                  onClick={handleSave}
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-shakespeare-500 to-shakespeare-600 text-white font-semibold hover:shadow-lg hover:shadow-shakespeare-500/30 transition-all duration-300 flex items-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  Save All Changes
                </button>
              </div>
            )}
          </GlassCard>
        </div>
      </main>
    </div>
  );
}