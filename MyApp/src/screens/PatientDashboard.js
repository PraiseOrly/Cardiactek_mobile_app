import React, { useState } from 'react';
import { Heart, Activity, Pill, TrendingUp, Plus, Calendar, AlertCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function HealthDashboard() {
  const [showSymptomModal, setShowSymptomModal] = useState(false);
  const [medications, setMedications] = useState([
    { id: 1, name: 'Lisinopril 10mg', time: '8:00 AM', taken: true },
    { id: 2, name: 'Metoprolol 50mg', time: '12:00 PM', taken: false },
    { id: 3, name: 'Aspirin 81mg', time: '8:00 PM', taken: false }
  ]);
  const [symptoms, setSymptoms] = useState([
    { id: 1, type: 'Chest Pain', severity: 'Mild', time: '2h ago' },
    { id: 2, type: 'Fatigue', severity: 'Moderate', time: '5h ago' }
  ]);
  const [newSymptom, setNewSymptom] = useState({ type: '', severity: 'Mild', notes: '' });

  const vitalsData = [
    { day: 'Mon', hr: 72, bp: 120 },
    { day: 'Tue', hr: 75, bp: 118 },
    { day: 'Wed', hr: 70, bp: 122 },
    { day: 'Thu', hr: 73, bp: 119 },
    { day: 'Fri', hr: 71, bp: 121 },
    { day: 'Sat', hr: 74, bp: 117 },
    { day: 'Sun', hr: 72, bp: 120 }
  ];

  const toggleMedication = (id) => {
    setMedications(medications.map(med => 
      med.id === id ? { ...med, taken: !med.taken } : med
    ));
  };

  const addSymptom = () => {
    if (newSymptom.type) {
      setSymptoms([{ 
        id: Date.now(), 
        type: newSymptom.type, 
        severity: newSymptom.severity, 
        time: 'Just now' 
      }, ...symptoms]);
      setNewSymptom({ type: '', severity: 'Mild', notes: '' });
      setShowSymptomModal(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Health Dashboard</h1>
              <p className="text-sm text-gray-600">Saturday, October 18, 2025</p>
            </div>
            <div className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-green-500" />
              <span className="text-sm font-medium text-gray-700">System Normal</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Vital Signs Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-red-500">
            <div className="flex items-center justify-between mb-2">
              <Heart className="w-8 h-8 text-red-500" />
              <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">Normal</span>
            </div>
            <p className="text-sm text-gray-600">Heart Rate</p>
            <p className="text-3xl font-bold text-gray-900">72 <span className="text-lg text-gray-500">bpm</span></p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-blue-500">
            <div className="flex items-center justify-between mb-2">
              <Activity className="w-8 h-8 text-blue-500" />
              <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">Good</span>
            </div>
            <p className="text-sm text-gray-600">Blood Pressure</p>
            <p className="text-3xl font-bold text-gray-900">120<span className="text-lg text-gray-500">/80</span></p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-purple-500">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-8 h-8 text-purple-500" />
              <span className="text-xs font-medium text-yellow-600 bg-yellow-50 px-2 py-1 rounded">Monitor</span>
            </div>
            <p className="text-sm text-gray-600">Medication</p>
            <p className="text-3xl font-bold text-gray-900">67<span className="text-lg text-gray-500">%</span></p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-green-500">
            <div className="flex items-center justify-between mb-2">
              <Calendar className="w-8 h-8 text-green-500" />
              <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">Good</span>
            </div>
            <p className="text-sm text-gray-600">Mood/Energy</p>
            <p className="text-3xl font-bold text-gray-900">8<span className="text-lg text-gray-500">/10</span></p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Trend Charts */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">7-Day Vital Trends</h2>
              <div className="space-y-6">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">Heart Rate (bpm)</p>
                  <ResponsiveContainer width="100%" height={150}>
                    <LineChart data={vitalsData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="day" stroke="#9ca3af" style={{ fontSize: '12px' }} />
                      <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} domain={[60, 80]} />
                      <Tooltip />
                      <Line type="monotone" dataKey="hr" stroke="#ef4444" strokeWidth={2} dot={{ fill: '#ef4444' }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">Blood Pressure (Systolic)</p>
                  <ResponsiveContainer width="100%" height={150}>
                    <LineChart data={vitalsData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="day" stroke="#9ca3af" style={{ fontSize: '12px' }} />
                      <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} domain={[110, 130]} />
                      <Tooltip />
                      <Line type="monotone" dataKey="bp" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6' }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Medication Tracker */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">Today's Medications</h2>
                <span className="text-sm text-gray-500">2 of 3 taken</span>
              </div>
              <div className="space-y-3">
                {medications.map(med => (
                  <div key={med.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                    <div className="flex items-center space-x-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center cursor-pointer ${med.taken ? 'bg-green-500 border-green-500' : 'border-gray-300'}`} onClick={() => toggleMedication(med.id)}>
                        {med.taken && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                      </div>
                      <div>
                        <p className={`font-medium ${med.taken ? 'text-gray-400 line-through' : 'text-gray-900'}`}>{med.name}</p>
                        <p className="text-sm text-gray-500">{med.time}</p>
                      </div>
                    </div>
                    <Pill className={`w-5 h-5 ${med.taken ? 'text-gray-400' : 'text-purple-500'}`} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Symptom Log */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">Symptom Log</h2>
                <button onClick={() => setShowSymptomModal(true)} className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-700 font-medium">
                  <Plus className="w-4 h-4" />
                  <span>Add</span>
                </button>
              </div>
              <div className="space-y-3">
                {symptoms.map(symptom => (
                  <div key={symptom.id} className="p-3 bg-red-50 rounded-lg border border-red-100">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{symptom.type}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className={`text-xs px-2 py-1 rounded ${symptom.severity === 'Severe' ? 'bg-red-200 text-red-800' : symptom.severity === 'Moderate' ? 'bg-yellow-200 text-yellow-800' : 'bg-green-200 text-green-800'}`}>
                            {symptom.severity}
                          </span>
                          <span className="text-xs text-gray-500">{symptom.time}</span>
                        </div>
                      </div>
                      <AlertCircle className="w-5 h-5 text-red-500" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Treatment Progress */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Treatment Progress</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Recovery Goal</span>
                    <span className="font-medium text-gray-900">78%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Lifestyle Goals</span>
                    <span className="font-medium text-gray-900">62%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full" style={{ width: '62%' }}></div>
                  </div>
                </div>
                <div className="pt-3 border-t">
                  <p className="text-sm text-gray-600">Next Milestone</p>
                  <p className="font-medium text-gray-900 mt-1">Complete 30 days medication adherence</p>
                  <p className="text-xs text-gray-500 mt-1">12 days remaining</p>
                </div>
              </div>
            </div>

            {/* Mood Tracker */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Mood & Energy</h2>
              <div className="flex justify-between mb-3">
                {['😫', '😕', '😐', '🙂', '😊'].map((emoji, idx) => (
                  <button key={idx} className={`text-3xl hover:scale-110 transition ${idx === 3 ? 'scale-125 bg-blue-100 rounded-full p-2' : ''}`}>
                    {emoji}
                  </button>
                ))}
              </div>
              <p className="text-sm text-gray-600 text-center">Current: Good (8/10)</p>
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-xs text-gray-700">💡 Your energy peaks in the morning. Consider scheduling activities then.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Symptom Modal */}
      {showSymptomModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Log New Symptom</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Symptom Type</label>
                <select value={newSymptom.type} onChange={(e) => setNewSymptom({...newSymptom, type: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">Select symptom...</option>
                  <option value="Chest Pain">Chest Pain</option>
                  <option value="Shortness of Breath">Shortness of Breath</option>
                  <option value="Fatigue">Fatigue</option>
                  <option value="Dizziness">Dizziness</option>
                  <option value="Palpitations">Palpitations</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Severity</label>
                <div className="flex space-x-2">
                  {['Mild', 'Moderate', 'Severe'].map(sev => (
                    <button key={sev} onClick={() => setNewSymptom({...newSymptom, severity: sev})} className={`flex-1 py-2 rounded-lg font-medium text-sm ${newSymptom.severity === sev ? sev === 'Severe' ? 'bg-red-500 text-white' : sev === 'Moderate' ? 'bg-yellow-500 text-white' : 'bg-green-500 text-white' : 'bg-gray-100 text-gray-700'}`}>
                      {sev}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notes (Optional)</label>
                <textarea value={newSymptom.notes} onChange={(e) => setNewSymptom({...newSymptom, notes: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" rows="3" placeholder="Additional details..."></textarea>
              </div>
            </div>
            <div className="flex space-x-3 mt-6">
              <button onClick={() => setShowSymptomModal(false)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50">
                Cancel
              </button>
              <button onClick={addSymptom} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">
                Add Symptom
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}