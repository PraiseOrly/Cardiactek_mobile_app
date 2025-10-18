import React, { useState } from 'react';
import { Calendar, Video, Clock, Download, Bell, Plus, MapPin, User, FileText, Phone } from 'lucide-react';

export default function AppointmentsTelehealth() {
  const [view, setView] = useState('upcoming');
  const [showBooking, setShowBooking] = useState(false);
  const [selectedDate, setSelectedDate] = useState('2025-10-22');
  const [selectedTime, setSelectedTime] = useState('');
  const [showVideoCall, setShowVideoCall] = useState(false);

  const appointments = [
    { 
      id: 1, 
      doctor: 'Dr. Sarah Johnson', 
      specialty: 'Cardiologist', 
      date: '2025-10-22', 
      time: '10:00 AM', 
      type: 'Video Call',
      status: 'Confirmed',
      location: 'Virtual',
      notes: 'Follow-up on ECG results'
    },
    { 
      id: 2, 
      doctor: 'Dr. Michael Chen', 
      specialty: 'Cardiac Surgeon', 
      date: '2025-10-25', 
      time: '2:30 PM', 
      type: 'In-Person',
      status: 'Confirmed',
      location: 'CardiacTek Center, Room 204',
      notes: 'Pre-surgery consultation'
    },
    { 
      id: 3, 
      doctor: 'Dr. Emily Rodriguez', 
      specialty: 'Rehabilitation Specialist', 
      date: '2025-10-28', 
      time: '11:00 AM', 
      type: 'Video Call',
      status: 'Pending',
      location: 'Virtual',
      notes: 'Cardiac rehab progress check'
    }
  ];

  const pastVisits = [
    {
      id: 4,
      doctor: 'Dr. Sarah Johnson',
      date: '2025-10-15',
      type: 'Video Call',
      summary: 'ECG shows improvement. Continue current medication.',
      hasSummary: true
    },
    {
      id: 5,
      doctor: 'Dr. Michael Chen',
      date: '2025-10-08',
      type: 'In-Person',
      summary: 'Initial consultation completed. Surgery scheduled.',
      hasSummary: true
    }
  ];

  const timeSlots = ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Appointments</h1>
              <p className="text-sm text-gray-600">Manage your healthcare visits</p>
            </div>
            <button onClick={() => setShowBooking(true)} className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
              <Plus className="w-5 h-5" />
              <span>Book Appointment</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* View Toggle */}
        <div className="flex space-x-2 mb-6 bg-white rounded-lg p-1 shadow-sm w-fit">
          <button onClick={() => setView('upcoming')} className={`px-6 py-2 rounded-md font-medium text-sm transition ${view === 'upcoming' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
            Upcoming
          </button>
          <button onClick={() => setView('past')} className={`px-6 py-2 rounded-md font-medium text-sm transition ${view === 'past' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
            Past Visits
          </button>
          <button onClick={() => setView('calendar')} className={`px-6 py-2 rounded-md font-medium text-sm transition ${view === 'calendar' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
            Calendar
          </button>
        </div>

        {/* Upcoming Appointments */}
        {view === 'upcoming' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {appointments.map(apt => (
              <div key={apt.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {apt.doctor.split(' ')[1][0]}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{apt.doctor}</h3>
                      <p className="text-sm text-gray-600">{apt.specialty}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${apt.status === 'Confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                          {apt.status}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${apt.type === 'Video Call' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>
                          {apt.type}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Bell className="w-5 h-5 text-gray-400 cursor-pointer hover:text-blue-600" />
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-700">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>{new Date(apt.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-700">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span>{apt.time}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-700">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span>{apt.location}</span>
                  </div>
                  {apt.notes && (
                    <div className="flex items-start space-x-2 text-sm text-gray-700 mt-3 p-3 bg-gray-50 rounded-lg">
                      <FileText className="w-4 h-4 text-gray-400 mt-0.5" />
                      <span>{apt.notes}</span>
                    </div>
                  )}
                </div>

                <div className="flex space-x-2 pt-4 border-t">
                  {apt.type === 'Video Call' && (
                    <button onClick={() => setShowVideoCall(true)} className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                      <Video className="w-4 h-4" />
                      <span>Join Call</span>
                    </button>
                  )}
                  <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium text-gray-700">
                    <Calendar className="w-4 h-4" />
                    <span>Reschedule</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Past Visits */}
        {view === 'past' && (
          <div className="space-y-4">
            {pastVisits.map(visit => (
              <div key={visit.id} className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-bold">
                      {visit.doctor.split(' ')[1][0]}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{visit.doctor}</h3>
                      <p className="text-sm text-gray-600">{new Date(visit.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                    </div>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full ${visit.type === 'Video Call' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>
                    {visit.type}
                  </span>
                </div>
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-700 mb-1">Visit Summary</p>
                  <p className="text-sm text-gray-600">{visit.summary}</p>
                </div>
                <div className="flex space-x-2 mt-4">
                  <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium">
                    <Download className="w-4 h-4" />
                    <span>Download Summary</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium text-gray-700">
                    <Calendar className="w-4 h-4" />
                    <span>Book Follow-up</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Calendar View */}
        {view === 'calendar' && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="grid grid-cols-7 gap-2 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center font-medium text-gray-600 text-sm py-2">{day}</div>
              ))}
              {Array.from({ length: 35 }, (_, i) => {
                const dayNum = i - 2;
                const hasAppointment = [20, 23, 26].includes(dayNum);
                return (
                  <div key={i} className={`aspect-square border rounded-lg flex items-center justify-center text-sm cursor-pointer transition ${dayNum < 1 || dayNum > 31 ? 'bg-gray-50 text-gray-400' : hasAppointment ? 'bg-blue-100 border-blue-300 text-blue-700 font-bold hover:bg-blue-200' : 'hover:bg-gray-50'}`}>
                    {dayNum > 0 && dayNum <= 31 ? dayNum : ''}
                  </div>
                );
              })}
            </div>
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm font-medium text-blue-900">October 2025</p>
              <p className="text-xs text-blue-700 mt-1">3 appointments scheduled this month</p>
            </div>
          </div>
        )}
      </div>

      {/* Book Appointment Modal */}
      {showBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Book New Appointment</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Doctor</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>Dr. Sarah Johnson - Cardiologist</option>
                  <option>Dr. Michael Chen - Cardiac Surgeon</option>
                  <option>Dr. Emily Rodriguez - Rehabilitation Specialist</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Appointment Type</label>
                <div className="grid grid-cols-2 gap-3">
                  <button className="flex items-center justify-center space-x-2 p-4 border-2 border-blue-600 bg-blue-50 rounded-lg font-medium text-blue-700">
                    <Video className="w-5 h-5" />
                    <span>Video Call</span>
                  </button>
                  <button className="flex items-center justify-center space-x-2 p-4 border-2 border-gray-300 rounded-lg font-medium text-gray-700 hover:border-blue-600 hover:bg-blue-50">
                    <MapPin className="w-5 h-5" />
                    <span>In-Person</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
                <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Available Time Slots</label>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map(time => (
                    <button key={time} onClick={() => setSelectedTime(time)} className={`p-3 rounded-lg font-medium text-sm transition ${selectedTime === time ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Reason for Visit</label>
                <textarea className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" rows="3" placeholder="Brief description of your concern..."></textarea>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button onClick={() => setShowBooking(false)} className="flex-1 px-4 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50">
                Cancel
              </button>
              <button className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Video Call Interface */}
      {showVideoCall && (
        <div className="fixed inset-0 bg-gray-900 flex items-center justify-center z-50">
          <div className="w-full h-full relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="w-32 h-32 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-16 h-16" />
                </div>
                <h3 className="text-2xl font-bold">Dr. Sarah Johnson</h3>
                <p className="text-blue-200 mt-2">Connecting...</p>
              </div>
            </div>

            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4">
              <button className="w-14 h-14 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition">
                <Video className="w-6 h-6 text-white" />
              </button>
              <button className="w-14 h-14 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition">
                <Phone className="w-6 h-6 text-white" />
              </button>
              <button onClick={() => setShowVideoCall(false)} className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition">
                <Phone className="w-6 h-6 text-white transform rotate-135" />
              </button>
            </div>

            <div className="absolute top-4 right-4 w-48 h-36 bg-gray-800 rounded-lg overflow-hidden border-2 border-white">
              <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                <User className="w-12 h-12 text-gray-500" />
              </div>
            </div>
          </div>
        </div>
      )}