import React, { useState } from 'react';
import { AlertCircle, Phone, MapPin, Heart, User, Download, Share2, Navigation, Clock, Activity } from 'lucide-react';

export default function EmergencyAccess() {
  const [sosActive, setSosActive] = useState(false);
  const [countdown, setCountdown] = useState(null);

  const emergencyContacts = [
    { id: 1, name: 'Dr. Sarah Johnson', relation: 'Cardiologist', phone: '+1 (555) 123-4567', priority: 'Primary' },
    { id: 2, name: 'John Doe', relation: 'Spouse', phone: '+1 (555) 987-6543', priority: 'Family' },
    { id: 3, name: 'Emergency Services', relation: '911', phone: '911', priority: 'Emergency' }
  ];

  const nearbyFacilities = [
    { id: 1, name: 'City General Hospital', distance: '2.3 km', time: '8 min', type: 'Hospital', hasER: true },
    { id: 2, name: 'CardiacTek Center', distance: '3.1 km', time: '12 min', type: 'Specialty', hasER: false },
    { id: 3, name: 'St. Mary\'s Medical Center', distance: '4.5 km', time: '15 min', type: 'Hospital', hasER: true }
  ];

  const currentVitals = {
    heartRate: 72,
    bloodPressure: '120/80',
    oxygenLevel: 98,
    location: 'Kigali, Rwanda'
  };

  const activateSOS = () => {
    setCountdown(5);
    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setSosActive(true);
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Emergency & Healthcare Access</h1>
              <p className="text-sm text-gray-600">Quick access to emergency services</p>
            </div>
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <span className="text-sm font-medium text-gray-700">24/7 Support Active</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* SOS Button Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6 border-2 border-red-200">
          <div className="text-center">
            <AlertCircle className="w-16 h-16 text-red-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Emergency SOS</h2>
            <p className="text-gray-600 mb-6">
              Instantly alert emergency contacts and share your location and vitals
            </p>
            
            {sosActive ? (
              <div className="space-y-4">
                <div className="p-6 bg-red-100 rounded-xl border-2 border-red-300 animate-pulse">
                  <div className="flex items-center justify-center space-x-3 mb-3">
                    <div className="w-4 h-4 bg-red-600 rounded-full animate-ping"></div>
                    <p className="text-lg font-bold text-red-900">SOS ACTIVATED</p>
                  </div>
                  <p className="text-sm text-red-700">Emergency contacts have been notified</p>
                  <p className="text-sm text-red-700">Sharing live location and vitals</p>
                </div>
                <button onClick={() => setSosActive(false)} className="px-8 py-3 bg-gray-600 text-white rounded-xl font-bold hover:bg-gray-700 text-lg">
                  Cancel Alert
                </button>
              </div>
            ) : countdown !== null ? (
              <div className="space-y-4">
                <div className="text-6xl font-bold text-red-600 animate-pulse">
                  {countdown}
                </div>
                <p className="text-gray-600">Activating SOS...</p>
                <button onClick={() => {setCountdown(null); setSosActive(false);}} className="px-8 py-3 bg-gray-600 text-white rounded-xl font-bold hover:bg-gray-700">
                  Cancel
                </button>
              </div>
            ) : (
              <button onClick={activateSOS} className="px-12 py-6 bg-red-600 text-white rounded-2xl font-bold hover:bg-red-700 text-2xl shadow-xl transform hover:scale-105 transition">
                <div className="flex items-center space-x-3">
                  <AlertCircle className="w-10 h-10" />
                  <span>ACTIVATE SOS</span>
                </div>
              </button>
            )}

            <p className="text-xs text-gray-500 mt-4">
              Press and hold for 5 seconds to activate
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Current Vitals */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">Current Vitals</h2>
              <Activity className="w-5 h-5 text-green-600" />
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Heart className="w-5 h-5 text-red-600" />
                  <span className="text-sm font-medium text-gray-700">Heart Rate</span>
                </div>
                <span className="text-lg font-bold text-gray-900">{currentVitals.heartRate} bpm</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-gray-700">Blood Pressure</span>
                </div>
                <span className="text-lg font-bold text-gray-900">{currentVitals.bloodPressure}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-gray-700">Oxygen Level</span>
                </div>
                <span className="text-lg font-bold text-gray-900">{currentVitals.oxygenLevel}%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-purple-600" />
                  <span className="text-sm font-medium text-gray-700">Location</span>
                </div>
                <Navigation className="w-5 h-5 text-purple-600" />
              </div>
            </div>
            <button className="w-full mt-4 flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
              <Share2 className="w-4 h-4" />
              <span>Share Vitals</span>
            </button>
          </div>

          {/* Emergency Contacts */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Emergency Contacts</h2>
            <div className="space-y-3">
              {emergencyContacts.map(contact => (
                <div key={contact.id} className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-300 transition">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">{contact.name}</h3>
                      <p className="text-sm text-gray-600">{contact.relation}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${contact.priority === 'Emergency' ? 'bg-red-100 text-red-700' : contact.priority === 'Primary' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                      {contact.priority}
                    </span>
                  </div>
                  <a href={`tel:${contact.phone}`} className="flex items-center justify-center space-x-2 w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium text-sm mt-3">
                    <Phone className="w-4 h-4" />
                    <span>{contact.phone}</span>
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Nearby Facilities */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Nearby Facilities</h2>
            <div className="space-y-3">
              {nearbyFacilities.map(facility => (
                <div key={facility.id} className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-300 transition">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-sm">{facility.name}</h3>
                      <p className="text-xs text-gray-600 mt-1">{facility.type}</p>
                    </div>
                    {facility.hasER && (
                      <span className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded-full font-medium">
                        ER
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-4 text-xs text-gray-600 mb-3">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-3 h-3" />
                      <span>{facility.distance}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{facility.time}</span>
                    </div>
                  </div>
                  <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm">
                    <Navigation className="w-4 h-4" />
                    <span>Get Directions</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Treatment Plans */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Emergency Treatment Plan</h2>
            <div className="space-y-3">
              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                <h3 className="font-semibold text-red-900 mb-2">⚠️ If Chest Pain Occurs</h3>
                <ol className="text-sm text-red-700 space-y-1 list-decimal list-inside">
                  <li>Stop all activity and sit down</li>
                  <li>Take prescribed nitroglycerin if available</li>
                  <li>Call emergency services immediately</li>
                  <li>Chew aspirin if not allergic</li>
                </ol>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <h3 className="font-semibold text-yellow-900 mb-2">⚠️ If Shortness of Breath</h3>
                <ol className="text-sm text-yellow-700 space-y-1 list-decimal list-inside">
                  <li>Sit upright in comfortable position</li>
                  <li>Practice slow, deep breathing</li>
                  <li>Use oxygen if prescribed</li>
                  <li>Contact doctor if severe</li>
                </ol>
              </div>
            </div>
            <button className="w-full mt-4 flex items-center justify-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium">
              <Download className="w-4 h-4" />
              <span>Download Full Plan</span>
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Medical Information Card</h2>
            <div className="p-4 bg-gray-50 rounded-lg border-2 border-gray-200 space-y-3">
              <div className="flex items-center space-x-3 pb-3 border-b">
                <User className="w-10 h-10 text-gray-600" />
                <div>
                  <p className="font-bold text-gray-900">John Doe</p>
                  <p className="text-sm text-gray-600">DOB: 05/12/1975</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div>
                  <p className="font-medium text-gray-700">Condition:</p>
                  <p className="text-gray-600">Post-MI Cardiac Recovery</p>
                </div>
                <div>
                  <p className="font-medium text-gray-700">Medications:</p>
                  <p className="text-gray-600">Lisinopril, Metoprolol, Aspirin</p>
                </div>
                <div>
                  <p className="font-medium text-gray-700">Allergies:</p>
                  <p className="text-red-600 font-medium">Penicillin</p>
                </div>
                <div>
                  <p className="font-medium text-gray-700">Blood Type:</p>
                  <p className="text-gray-600">O+</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-4">
              <button className="flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                <Download className="w-4 h-4" />
                <span>Download</span>
              </button>
              <button className="flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium text-gray-700">
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}