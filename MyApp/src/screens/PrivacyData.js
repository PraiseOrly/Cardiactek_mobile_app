import React, { useState } from 'react';
import { Shield, Eye, Lock, Download, Trash2, FileText, User, Clock, Check, X, Fingerprint } from 'lucide-react';

export default function PrivacyRecords() {
  const [activeTab, setActiveTab] = useState('access');
  const [biometricEnabled, setBiometricEnabled] = useState(true);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);

  const accessLogs = [
    { id: 1, user: 'Dr. Sarah Johnson', action: 'Viewed ECG Results', date: '2025-10-18 10:30 AM', location: 'CardiacTek Center' },
    { id: 2, user: 'Nurse Amy Williams', action: 'Updated Medication List', date: '2025-10-17 2:45 PM', location: 'CardiacTek Center' },
    { id: 3, user: 'Dr. Michael Chen', action: 'Downloaded Lab Reports', date: '2025-10-15 9:15 AM', location: 'CardiacTek Center' },
    { id: 4, user: 'You', action: 'Exported Health Data', date: '2025-10-14 7:20 PM', location: 'Home' }
  ];

  const sharingPreferences = [
    { id: 1, name: 'Dr. Sarah Johnson', role: 'Cardiologist', access: 'Full', status: 'Active' },
    { id: 2, name: 'Dr. Michael Chen', role: 'Cardiac Surgeon', access: 'Full', status: 'Active' },
    { id: 3, name: 'Nurse Amy Williams', role: 'Cardiac Care Team', access: 'Limited', status: 'Active' },
    { id: 4, name: 'John Doe', role: 'Emergency Contact', access: 'Emergency Only', status: 'Active' }
  ];

  const dataCategories = [
    { id: 1, name: 'Medical History', size: '2.4 MB', records: 156, lastUpdate: '2025-10-18' },
    { id: 2, name: 'Lab Results', size: '8.7 MB', records: 89, lastUpdate: '2025-10-17' },
    { id: 3, name: 'Imaging & Scans', size: '45.2 MB', records: 23, lastUpdate: '2025-10-15' },
    { id: 4, name: 'Medications', size: '0.8 MB', records: 34, lastUpdate: '2025-10-18' },
    { id: 5, name: 'Vital Signs', size: '3.1 MB', records: 1420, lastUpdate: '2025-10-18' },
    { id: 6, name: 'Appointments', size: '1.2 MB', records: 67, lastUpdate: '2025-10-16' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Privacy & Data Control</h1>
              <p className="text-sm text-gray-600">Manage your health data access and security</p>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium text-gray-700">Protected</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Security Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-green-500">
            <div className="flex items-center justify-between mb-2">
              <Shield className="w-8 h-8 text-green-500" />
              <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">Active</span>
            </div>
            <p className="text-sm text-gray-600">Encryption Status</p>
            <p className="text-2xl font-bold text-gray-900">256-bit AES</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-blue-500">
            <div className="flex items-center justify-between mb-2">
              <Fingerprint className="w-8 h-8 text-blue-500" />
              <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">Enabled</span>
            </div>
            <p className="text-sm text-gray-600">Biometric Login</p>
            <p className="text-2xl font-bold text-gray-900">Fingerprint</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-purple-500">
            <div className="flex items-center justify-between mb-2">
              <Eye className="w-8 h-8 text-purple-500" />
              <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded">Tracked</span>
            </div>
            <p className="text-sm text-gray-600">Access Logs</p>
            <p className="text-2xl font-bold text-gray-900">{accessLogs.length} <span className="text-lg text-gray-500">events</span></p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 mb-6 bg-white rounded-lg p-1 shadow-sm w-fit">
          <button onClick={() => setActiveTab('access')} className={`px-6 py-2 rounded-md font-medium text-sm transition ${activeTab === 'access' ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
            Access Logs
          </button>
          <button onClick={() => setActiveTab('sharing')} className={`px-6 py-2 rounded-md font-medium text-sm transition ${activeTab === 'sharing' ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
            Sharing
          </button>
          <button onClick={() => setActiveTab('export')} className={`px-6 py-2 rounded-md font-medium text-sm transition ${activeTab === 'export' ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
            Export Data
          </button>
          <button onClick={() => setActiveTab('security')} className={`px-6 py-2 rounded-md font-medium text-sm transition ${activeTab === 'security' ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
            Security
          </button>
        </div>

        {/* Access Logs */}
        {activeTab === 'access' && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="text-lg font-bold text-gray-900 mb-2">Recent Access Activity</h2>
              <p className="text-sm text-gray-600">Monitor who accessed your health records</p>
            </div>
            <div className="divide-y">
              {accessLogs.map(log => (
                <div key={log.id} className="p-6 hover:bg-gray-50 transition">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-indigo-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{log.user}</h3>
                        <p className="text-sm text-gray-600 mt-1">{log.action}</p>
                        <div className="flex items-center space-x-3 mt-2 text-xs text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>{log.date}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Shield className="w-3 h-3" />
                            <span>{log.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
                      Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sharing Preferences */}
        {activeTab === 'sharing' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Data Sharing Consent</h2>
              <div className="space-y-3">
                {sharingPreferences.map(pref => (
                  <div key={pref.id} className="p-4 border-2 border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 flex-1">
                        <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                          {pref.name.split(' ')[0][0]}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{pref.name}</h3>
                          <p className="text-sm text-gray-600">{pref.role}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                          <option>Full Access</option>
                          <option>Limited Access</option>
                          <option>Emergency Only</option>
                          <option>No Access</option>
                        </select>
                        <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 flex items-center justify-center space-x-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 font-medium text-gray-700">
                <User className="w-5 h-5" />
                <span>Add New Contact</span>
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Consent History</h2>
              <div className="space-y-3">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <Check className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-green-900">Consent granted to Dr. Sarah Johnson</p>
                      <p className="text-sm text-green-700 mt-1">Full access • October 1, 2025</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <Clock className="w-5 h-5 text-gray-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Access modified for Nurse Amy Williams</p>
                      <p className="text-sm text-gray-600 mt-1">Changed to Limited access • September 28, 2025</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Export Data */}
        {activeTab === 'export' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Export Your Health Data</h2>
              <p className="text-sm text-gray-600 mb-6">Download your complete health records in various formats</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {dataCategories.map(category => (
                  <div key={category.id} className="p-4 border-2 border-gray-200 rounded-lg hover:border-indigo-300 transition">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <FileText className="w-8 h-8 text-indigo-600" />
                        <div>
                          <h3 className="font-semibold text-gray-900">{category.name}</h3>
                          <p className="text-xs text-gray-500">{category.records} records • {category.size}</p>
                        </div>
                      </div>
                      <input type="checkbox" className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500" defaultChecked />
                    </div>
                    <p className="text-xs text-gray-500">Last updated: {category.lastUpdate}</p>
                  </div>
                ))}
              </div>

              <div className="border-t pt-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Export Format</label>
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <button className="p-3 border-2 border-indigo-600 bg-indigo-50 rounded-lg font-medium text-indigo-700 text-sm">
                    PDF
                  </button>
                  <button className="p-3 border-2 border-gray-300 rounded-lg font-medium text-gray-700 text-sm hover:border-indigo-600">
                    CSV
                  </button>
                  <button className="p-3 border-2 border-gray-300 rounded-lg font-medium text-gray-700 text-sm hover:border-indigo-600">
                    JSON
                  </button>
                </div>

                <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium">
                  <Download className="w-5 h-5" />
                  <span>Export Selected Data</span>
                </button>
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <div className="flex items-start space-x-3">
                <Trash2 className="w-6 h-6 text-red-600 mt-1" />
                <div className="flex-1">
                  <h3 className="font-bold text-red-900 mb-2">Request Data Deletion</h3>
                  <p className="text-sm text-red-700 mb-4">
                    You have the right to request deletion of your personal health data. This action is permanent and cannot be undone.
                  </p>
                  <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium text-sm">
                    Request Deletion
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Security Settings */}
        {activeTab === 'security' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Authentication Methods</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Fingerprint className="w-6 h-6 text-indigo-600" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Biometric Login</h3>
                      <p className="text-sm text-gray-600">Use fingerprint or face recognition</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={biometricEnabled} onChange={(e) => setBiometricEnabled(e.target.checked)} className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Lock className="w-6 h-6 text-indigo-600" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Two-Factor Authentication</h3>
                      <p className="text-sm text-gray-600">Extra security with SMS or authenticator app</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={twoFactorEnabled} onChange={(e) => setTwoFactorEnabled(e.target.checked)} className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Session Management</h2>
              <div className="space-y-3">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-green-900">Current Device</p>
                      <p className="text-sm text-green-700 mt-1">iPhone 14 • Kigali, Rwanda</p>
                      <p className="text-xs text-green-600 mt-1">Active now</p>
                    </div>
                    <Check className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">MacBook Pro</p>
                      <p className="text-sm text-gray-600 mt-1">Safari • Kigali, Rwanda</p>
                      <p className="text-xs text-gray-500 mt-1">Last active: 2 hours ago</p>
                    </div>
                    <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
              <button className="w-full mt-4 px-4 py-3 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 font-medium">
                Sign Out All Devices
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Privacy Preferences</h2>
              <div className="space-y-3">
                <label className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                  <span className="text-sm text-gray-700">Allow anonymous usage analytics</span>
                  <input type="checkbox" className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500" />
                </label>
                <label className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                  <span className="text-sm text-gray-700">Send crash reports</span>
                  <input type="checkbox" className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500" defaultChecked />
                </label>
                <label className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                  <span className="text-sm text-gray-700">Personalized health recommendations</span>
                  <input type="checkbox" className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500" defaultChecked />
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}