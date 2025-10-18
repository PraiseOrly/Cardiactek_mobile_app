import React, { useState } from 'react';
import { FileText, Download, Search, Filter, Heart, Activity, Beaker, Image as ImageIcon, Stethoscope, Calendar, Eye, MessageSquare } from 'lucide-react';

export default function MedicalRecords() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'All Records', icon: FileText, count: 234, color: 'gray' },
    { id: 'ecg', name: 'ECG Reports', icon: Activity, count: 45, color: 'red' },
    { id: 'labs', name: 'Lab Results', icon: Beaker, count: 89, color: 'blue' },
    { id: 'imaging', name: 'Imaging', icon: ImageIcon, count: 23, color: 'purple' },
    { id: 'visits', name: 'Visit Notes', icon: Stethoscope, count: 67, color: 'green' },
    { id: 'prescriptions', name: 'Prescriptions', icon: Heart, count: 10, color: 'pink' }
  ];

  const records = [
    {
      id: 1,
      type: 'ecg',
      title: 'ECG Results - Follow-up',
      date: '2025-10-15',
      doctor: 'Dr. Sarah Johnson',
      summary: 'Normal sinus rhythm, heart rate 72 bpm. Significant improvement compared to previous readings.',
      status: 'Normal',
      annotations: 2
    },
    {
      id: 2,
      type: 'labs',
      title: 'Complete Blood Count',
      date: '2025-10-12',
      doctor: 'CardiacTek Lab',
      summary: 'All values within normal range. Cholesterol levels improved.',
      status: 'Normal',
      annotations: 0
    },
    {
      id: 3,
      type: 'imaging',
      title: 'Chest X-Ray',
      date: '2025-10-10',
      doctor: 'Dr. Michael Chen',
      summary: 'Clear lungs, normal heart size. No acute abnormalities detected.',
      status: 'Normal',
      annotations: 1
    },
    {
      id: 4,
      type: 'labs',
      title: 'Lipid Panel',
      date: '2025-10-08',
      doctor: 'CardiacTek Lab',
      summary: 'Total cholesterol: 180 mg/dL, LDL: 100 mg/dL, HDL: 55 mg/dL, Triglycerides: 125 mg/dL',
      status: 'Good',
      annotations: 0
    },
    {
      id: 5,
      type: 'visits',
      title: 'Post-Surgery Consultation',
      date: '2025-10-05',
      doctor: 'Dr. Michael Chen',
      summary: 'Patient recovering well. Incision site healing properly. Continue with prescribed medications.',
      status: 'Review',
      annotations: 3
    },
    {
      id: 6,
      type: 'ecg',
      title: 'Stress Test ECG',
      date: '2025-09-28',
      doctor: 'Dr. Sarah Johnson',
      summary: 'Completed 12 minutes of Bruce protocol. No ST changes. Good exercise capacity.',
      status: 'Normal',
      annotations: 1
    }
  ];

  const filteredRecords = records.filter(record => {
    const matchesCategory = selectedCategory === 'all' || record.type === selectedCategory;
    const matchesSearch = record.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.doctor.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Normal': return 'bg-green-100 text-green-700';
      case 'Good': return 'bg-blue-100 text-blue-700';
      case 'Review': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Medical Record Explorer</h1>
              <p className="text-sm text-gray-600">Browse and download your health records</p>
            </div>
            <div className="flex items-center space-x-2">
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium text-gray-700">
                <Filter className="w-4 h-4" />
                <span>Filter</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                <Download className="w-4 h-4" />
                <span>Download All</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Categories */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          {categories.map(category => {
            const Icon = category.icon;
            return (
              <button key={category.id} onClick={() => setSelectedCategory(category.id)} className={`p-4 rounded-xl shadow-sm transition ${selectedCategory === category.id ? 'bg-blue-600 text-white' : 'bg-white hover:shadow-md'}`}>
                <Icon className={`w-6 h-6 mx-auto mb-2 ${selectedCategory === category.id ? 'text-white' : `text-${category.color}-600`}`} />
                <p className={`text-sm font-medium ${selectedCategory === category.id ? 'text-white' : 'text-gray-900'}`}>{category.name}</p>
                <p className={`text-xs mt-1 ${selectedCategory === category.id ? 'text-blue-100' : 'text-gray-500'}`}>{category.count} records</p>
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search records by title, doctor, or date..." className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Records List */}
          <div className="lg:col-span-2 space-y-4">
            {filteredRecords.length > 0 ? (
              filteredRecords.map(record => {
                const category = categories.find(c => c.id === record.type);
                const Icon = category?.icon || FileText;
                return (
                  <div key={record.id} onClick={() => setSelectedRecord(record)} className={`bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition cursor-pointer ${selectedRecord?.id === record.id ? 'ring-2 ring-blue-500' : ''}`}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start space-x-3 flex-1">
                        <div className={`w-12 h-12 rounded-lg bg-${category?.color}-100 flex items-center justify-center`}>
                          <Icon className={`w-6 h-6 text-${category?.color}-600`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900">{record.title}</h3>
                          <div className="flex items-center space-x-3 mt-1 text-sm text-gray-600">
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-3 h-3" />
                              <span>{new Date(record.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                            </div>
                            <span>•</span>
                            <span>{record.doctor}</span>
                          </div>
                        </div>
                      </div>
                      <span className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusColor(record.status)}`}>
                        {record.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{record.summary}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {record.annotations > 0 && (
                          <div className="flex items-center space-x-1 text-xs text-gray-500">
                            <MessageSquare className="w-3 h-3" />
                            <span>{record.annotations} note{record.annotations > 1 ? 's' : ''}</span>
                          </div>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                          <Eye className="w-4 h-4 text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                          <Download className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">No records found matching your search</p>
              </div>
            )}
          </div>

          {/* Record Detail Panel */}
          <div className="space-y-6">
            {selectedRecord ? (
              <>
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-lg font-bold text-gray-900 mb-4">Record Details</h2>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">Title</p>
                      <p className="text-gray-900">{selectedRecord.title}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">Date</p>
                      <p className="text-gray-900">{new Date(selectedRecord.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">Provider</p>
                      <p className="text-gray-900">{selectedRecord.doctor}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">Status</p>
                      <span className={`inline-block text-sm px-3 py-1 rounded-full font-medium ${getStatusColor(selectedRecord.status)}`}>
                        {selectedRecord.status}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">Summary</p>
                      <p className="text-sm text-gray-700 leading-relaxed">{selectedRecord.summary}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mt-6">
                    <button className="flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                      <Eye className="w-4 h-4" />
                      <span>View Full</span>
                    </button>
                    <button className="flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium text-gray-700">
                      <Download className="w-4 h-4" />
                      <span>Download</span>
                    </button>
                  </div>
                </div>

                {/* Annotations */}
                {selectedRecord.annotations > 0 && (
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="font-bold text-gray-900 mb-4">Your Notes</h3>
                    <div className="space-y-3">
                      <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                        <p className="text-sm text-gray-700">Important to discuss medication adjustment at next visit.</p>
                        <p className="text-xs text-gray-500 mt-2">Added Oct 16, 2025</p>
                      </div>
                    </div>
                    <button className="w-full mt-3 px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 font-medium text-gray-700 text-sm">
                      + Add Note
                    </button>
                  </div>
                )}

                {/* Interpretation */}
                {selectedRecord.type === 'ecg' && (
                  <div className="bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl shadow-sm p-6 text-white">
                    <h3 className="font-bold mb-3 flex items-center space-x-2">
                      <Activity className="w-5 h-5" />
                      <span>AI Interpretation</span>
                    </h3>
                    <p className="text-sm text-blue-100">
                      Your ECG shows normal sinus rhythm with a heart rate of 72 bpm. All intervals are within normal limits, suggesting good heart function.
                    </p>
                  </div>
                )}

                {selectedRecord.type === 'labs' && (
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="font-bold text-gray-900 mb-4">Lab Values Explained</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div>
                          <p className="text-sm font-medium text-gray-900">Cholesterol</p>
                          <p className="text-xs text-gray-600">180 mg/dL</p>
                        </div>
                        <span className="text-xs px-2 py-1 bg-green-200 text-green-800 rounded-full">Optimal</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div>
                          <p className="text-sm font-medium text-gray-900">LDL</p>
                          <p className="text-xs text-gray-600">100 mg/dL</p>
                        </div>
                        <span className="text-xs px-2 py-1 bg-green-200 text-green-800 rounded-full">Good</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                        <div>
                          <p className="text-sm font-medium text-gray-900">HDL</p>
                          <p className="text-xs text-gray-600">55 mg/dL</p>
                        </div>
                        <span className="text-xs px-2 py-1 bg-yellow-200 text-yellow-800 rounded-full">Moderate</span>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">Select a record to view details</p>
              </div>
            )}

            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-4">Record Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Records</span>
                  <span className="font-bold text-gray-900">{records.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">This Month</span>
                  <span className="font-bold text-gray-900">6</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Last Updated</span>
                  <span className="font-bold text-gray-900">Today</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}