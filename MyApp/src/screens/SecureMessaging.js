import React, { useState } from 'react';
import { Send, Paperclip, Image, FileText, Shield, Globe, Smile, Clock, Check, CheckCheck } from 'lucide-react';

export default function SecureMessaging() {
  const [selectedConversation, setSelectedConversation] = useState(1);
  const [message, setMessage] = useState('');
  const [showAttachment, setShowAttachment] = useState(false);
  const [language, setLanguage] = useState('English');

  const conversations = [
    { 
      id: 1, 
      name: 'Dr. Sarah Johnson', 
      specialty: 'Cardiologist', 
      lastMessage: 'Your ECG results look good. Continue with current medication.',
      time: '10:30 AM',
      unread: 2,
      online: true
    },
    { 
      id: 2, 
      name: 'Dr. Michael Chen', 
      specialty: 'Cardiac Surgeon', 
      lastMessage: 'Please upload your latest blood test results.',
      time: 'Yesterday',
      unread: 0,
      online: false
    },
    { 
      id: 3, 
      name: 'Nurse Amy Williams', 
      specialty: 'Cardiac Care Team', 
      lastMessage: 'Reminder: Take your medication at 8 PM',
      time: '2 days ago',
      unread: 0,
      online: true
    }
  ];

  const messages = [
    { id: 1, sender: 'doctor', text: 'Good morning! How are you feeling today?', time: '9:00 AM', status: 'read' },
    { id: 2, sender: 'patient', text: 'Good morning Dr. Johnson. I\'m feeling much better, thank you.', time: '9:15 AM', status: 'delivered' },
    { id: 3, sender: 'doctor', text: 'That\'s great to hear! I\'ve reviewed your latest ECG results.', time: '10:00 AM', status: 'read' },
    { id: 4, sender: 'doctor', text: 'Everything looks good. Your heart rhythm has improved significantly.', time: '10:01 AM', status: 'read' },
    { id: 5, sender: 'patient', text: 'That\'s wonderful news! Should I continue with the same medication dosage?', time: '10:15 AM', status: 'delivered' },
    { id: 6, sender: 'doctor', text: 'Yes, please continue with your current medication. Let\'s schedule a follow-up in 2 weeks.', time: '10:30 AM', status: 'read', attachment: { type: 'file', name: 'ECG_Results_Oct2025.pdf' } }
  ];

  const sendMessage = () => {
    if (message.trim()) {
      setMessage('');
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Secure Messaging</h1>
              <div className="flex items-center space-x-2 mt-1">
                <Shield className="w-4 h-4 text-green-600" />
                <p className="text-sm text-gray-600">HIPAA-Compliant End-to-End Encryption</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <select value={language} onChange={(e) => setLanguage(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
                <option>German</option>
                <option>Chinese</option>
              </select>
              <Globe className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
          {/* Conversations List */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col">
            <div className="p-4 border-b">
              <input type="text" placeholder="Search conversations..." className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm" />
            </div>
            <div className="flex-1 overflow-y-auto">
              {conversations.map(conv => (
                <div key={conv.id} onClick={() => setSelectedConversation(conv.id)} className={`p-4 border-b cursor-pointer transition hover:bg-gray-50 ${selectedConversation === conv.id ? 'bg-blue-50 border-l-4 border-l-blue-600' : ''}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                          {conv.name.split(' ')[1][0]}
                        </div>
                        {conv.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-gray-900 text-sm">{conv.name}</h3>
                          {conv.unread > 0 && <span className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{conv.unread}</span>}
                        </div>
                        <p className="text-xs text-gray-500 mb-1">{conv.specialty}</p>
                        <p className="text-sm text-gray-600 truncate">{conv.lastMessage}</p>
                        <p className="text-xs text-gray-400 mt-1">{conv.time}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="md:col-span-2 bg-white rounded-xl shadow-sm flex flex-col overflow-hidden">
            {/* Chat Header */}
            <div className="p-4 border-b bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center font-bold">
                    J
                  </div>
                  <div>
                    <h3 className="font-semibold">Dr. Sarah Johnson</h3>
                    <p className="text-xs text-blue-100">Cardiologist • Online</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5" />
                  <span className="text-xs">Encrypted</span>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map(msg => (
                <div key={msg.id} className={`flex ${msg.sender === 'patient' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[70%] ${msg.sender === 'patient' ? 'order-2' : 'order-1'}`}>
                    <div className={`rounded-2xl px-4 py-3 ${msg.sender === 'patient' ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200 text-gray-900'}`}>
                      <p className="text-sm">{msg.text}</p>
                      {msg.attachment && (
                        <div className={`mt-3 p-3 rounded-lg flex items-center space-x-2 ${msg.sender === 'patient' ? 'bg-blue-700' : 'bg-gray-50'}`}>
                          <FileText className="w-5 h-5" />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium truncate">{msg.attachment.name}</p>
                            <p className={`text-xs ${msg.sender === 'patient' ? 'text-blue-200' : 'text-gray-500'}`}>PDF • 245 KB</p>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className={`flex items-center space-x-1 mt-1 text-xs text-gray-500 ${msg.sender === 'patient' ? 'justify-end' : 'justify-start'}`}>
                      <Clock className="w-3 h-3" />
                      <span>{msg.time}</span>
                      {msg.sender === 'patient' && (
                        msg.status === 'delivered' ? <Check className="w-3 h-3" /> : <CheckCheck className="w-3 h-3 text-blue-600" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t bg-white">
              <div className="flex items-end space-x-2">
                <div className="flex-1 relative">
                  <textarea value={message} onChange={(e) => setMessage(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), sendMessage())} placeholder="Type your message..." className="w-full px-4 py-3 pr-20 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none" rows="1"></textarea>
                  <div className="absolute right-2 bottom-2 flex space-x-1">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                      <Smile className="w-5 h-5 text-gray-400" />
                    </button>
                    <button onClick={() => setShowAttachment(!showAttachment)} className="p-2 hover:bg-gray-100 rounded-lg transition">
                      <Paperclip className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>
                </div>
                <button onClick={sendMessage} className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">
                  <Send className="w-5 h-5" />
                </button>
              </div>

              {/* Attachment Options */}
              {showAttachment && (
                <div className="mt-3 flex space-x-2">
                  <button className="flex items-center space-x-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition text-sm font-medium">
                    <Image className="w-4 h-4" />
                    <span>Image</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition text-sm font-medium">
                    <FileText className="w-4 h-4" />
                    <span>Document</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition text-sm font-medium">
                    <Paperclip className="w-4 h-4" />
                    <span>Lab Results</span>
                  </button>
                </div>
              )}

              {/* Quick Actions */}
              <div className="mt-3 flex flex-wrap gap-2">
                <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs hover:bg-gray-200 transition">
                  📊 Share vitals</button>
                <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs hover:bg-gray-200 transition">
                  💊 Medication question
                </button>
                <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs hover:bg-gray-200 transition">
                  📅 Schedule appointment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}