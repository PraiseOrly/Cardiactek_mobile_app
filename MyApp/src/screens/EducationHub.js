import React, { useState } from 'react';
import { BookOpen, Video, FileText, Award, Bookmark, Play, Clock, TrendingUp, MessageCircle, CheckCircle } from 'lucide-react';

export default function EducationHub() {
  const [activeTab, setActiveTab] = useState('recommended');
  const [bookmarked, setBookmarked] = useState([2, 5]);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizScore, setQuizScore] = useState(null);

  const content = [
    {
      id: 1,
      title: 'Understanding Your Heart Rhythm',
      type: 'article',
      duration: '5 min read',
      category: 'Basics',
      progress: 100,
      thumbnail: '📊',
      description: 'Learn about normal and abnormal heart rhythms and what they mean for your health.'
    },
    {
      id: 2,
      title: 'Medication Management Best Practices',
      type: 'video',
      duration: '12 min',
      category: 'Treatment',
      progress: 60,
      thumbnail: '💊',
      description: 'Tips for taking your cardiac medications safely and effectively.'
    },
    {
      id: 3,
      title: 'Heart-Healthy Diet Guide',
      type: 'interactive',
      duration: '20 min',
      category: 'Lifestyle',
      progress: 0,
      thumbnail: '🥗',
      description: 'Interactive meal planning and nutrition guidelines for cardiac patients.'
    },
    {
      id: 4,
      title: 'Exercise After Cardiac Surgery',
      type: 'video',
      duration: '15 min',
      category: 'Recovery',
      progress: 30,
      thumbnail: '🏃',
      description: 'Safe exercises and activities during your recovery period.'
    },
    {
      id: 5,
      title: 'Recognizing Warning Signs',
      type: 'article',
      duration: '8 min read',
      category: 'Emergency',
      progress: 100,
      thumbnail: '⚠️',
      description: 'Important symptoms that require immediate medical attention.'
    },
    {
      id: 6,
      title: 'Managing Stress for Heart Health',
      type: 'interactive',
      duration: '25 min',
      category: 'Wellness',
      progress: 0,
      thumbnail: '🧘',
      description: 'Techniques and strategies to reduce stress and improve heart health.'
    }
  ];

  const quizData = {
    title: 'Heart Health Basics Quiz',
    questions: [
      {
        id: 1,
        question: 'What is a normal resting heart rate for adults?',
        options: ['40-60 bpm', '60-100 bpm', '100-120 bpm', '120-140 bpm'],
        correct: 1
      },
      {
        id: 2,
        question: 'Which nutrient should cardiac patients limit?',
        options: ['Fiber', 'Sodium', 'Protein', 'Vitamin C'],
        correct: 1
      },
      {
        id: 3,
        question: 'What does blood pressure measure?',
        options: ['Heart rate', 'Blood sugar', 'Force of blood against artery walls', 'Oxygen levels'],
        correct: 2
      }
    ]
  };

  const toggleBookmark = (id) => {
    setBookmarked(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const submitQuiz = () => {
    let score = 0;
    quizData.questions.forEach(q => {
      if (quizAnswers[q.id] === q.correct) score++;
    });
    setQuizScore(score);
  };

  const filteredContent = activeTab === 'bookmarked' 
    ? content.filter(c => bookmarked.includes(c.id))
    : content;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Education Hub</h1>
              <p className="text-sm text-gray-600">Personalized cardiac health learning</p>
            </div>
            <button onClick={() => setShowQuiz(true)} className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium">
              <Award className="w-5 h-5" />
              <span>Take Quiz</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-blue-500">
            <div className="flex items-center justify-between mb-2">
              <BookOpen className="w-8 h-8 text-blue-500" />
            </div>
            <p className="text-sm text-gray-600">Articles Read</p>
            <p className="text-3xl font-bold text-gray-900">12</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-purple-500">
            <div className="flex items-center justify-between mb-2">
              <Video className="w-8 h-8 text-purple-500" />
            </div>
            <p className="text-sm text-gray-600">Videos Watched</p>
            <p className="text-3xl font-bold text-gray-900">8</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-green-500">
            <div className="flex items-center justify-between mb-2">
              <Award className="w-8 h-8 text-green-500" />
            </div>
            <p className="text-sm text-gray-600">Quizzes Passed</p>
            <p className="text-3xl font-bold text-gray-900">5</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-pink-500">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-8 h-8 text-pink-500" />
            </div>
            <p className="text-sm text-gray-600">Learning Streak</p>
            <p className="text-3xl font-bold text-gray-900">7 <span className="text-lg text-gray-500">days</span></p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 mb-6 bg-white rounded-lg p-1 shadow-sm w-fit">
          <button onClick={() => setActiveTab('recommended')} className={`px-6 py-2 rounded-md font-medium text-sm transition ${activeTab === 'recommended' ? 'bg-purple-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
            Recommended
          </button>
          <button onClick={() => setActiveTab('bookmarked')} className={`px-6 py-2 rounded-md font-medium text-sm transition ${activeTab === 'bookmarked' ? 'bg-purple-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
            Bookmarked ({bookmarked.length})
          </button>
          <button onClick={() => setActiveTab('categories')} className={`px-6 py-2 rounded-md font-medium text-sm transition ${activeTab === 'categories' ? 'bg-purple-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
            Categories
          </button>
        </div>

        {/* Content Grid */}
        {(activeTab === 'recommended' || activeTab === 'bookmarked') && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredContent.map(item => (
              <div key={item.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition">
                <div className="h-40 bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-6xl">
                  {item.thumbnail}
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${item.type === 'video' ? 'bg-purple-100 text-purple-700' : item.type === 'article' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                      {item.type === 'video' ? '🎥 Video' : item.type === 'article' ? '📄 Article' : '🎮 Interactive'}
                    </span>
                    <button onClick={() => toggleBookmark(item.id)} className="p-1 hover:bg-gray-100 rounded transition">
                      <Bookmark className={`w-5 h-5 ${bookmarked.includes(item.id) ? 'fill-purple-600 text-purple-600' : 'text-gray-400'}`} />
                    </button>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{item.duration}</span>
                    </div>
                    <span className="px-2 py-1 bg-gray-100 rounded">{item.category}</span>
                  </div>
                  {item.progress > 0 && (
                    <div className="mb-3">
                      <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>Progress</span>
                        <span>{item.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" style={{ width: `${item.progress}%` }}></div>
                      </div>
                    </div>
                  )}
                  <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium">
                    {item.type === 'video' ? <Play className="w-4 h-4" /> : <BookOpen className="w-4 h-4" />}
                    <span>{item.progress > 0 ? 'Continue' : 'Start'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Categories View */}
        {activeTab === 'categories' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {['Basics', 'Treatment', 'Lifestyle', 'Recovery', 'Emergency', 'Wellness'].map((cat, idx) => (
              <div key={cat} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition cursor-pointer">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${idx % 3 === 0 ? 'bg-blue-100' : idx % 3 === 1 ? 'bg-purple-100' : 'bg-green-100'}`}>
                    {idx === 0 ? '📚' : idx === 1 ? '💊' : idx === 2 ? '🏃' : idx === 3 ? '❤️' : idx === 4 ? '🚨' : '🧘'}
                  </div>
                  <span className="text-sm font-medium text-gray-600">{Math.floor(Math.random() * 10) + 5} articles</span>
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{cat}</h3>
                <p className="text-sm text-gray-600">Explore resources about {cat.toLowerCase()}</p>
              </div>
            ))}
          </div>
        )}

        {/* Request Topics Section */}
        <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-start space-x-4">
            <MessageCircle className="w-6 h-6 text-purple-600 mt-1" />
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 mb-2">Request a Topic</h3>
              <p className="text-sm text-gray-600 mb-4">Have a specific cardiac health question? Request content tailored to your needs.</p>
              <div className="flex space-x-2">
                <input type="text" placeholder="What would you like to learn about?" className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
                <button className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quiz Modal */}
      {showQuiz && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">{quizData.title}</h3>
              <Award className="w-8 h-8 text-purple-600" />
            </div>

            {quizScore === null ? (
              <div className="space-y-6">
                {quizData.questions.map((q, qIdx) => (
                  <div key={q.id} className="p-4 bg-gray-50 rounded-lg">
                    <p className="font-medium text-gray-900 mb-3">
                      {qIdx + 1}. {q.question}
                    </p>
                    <div className="space-y-2">
                      {q.options.map((opt, optIdx) => (
                        <button key={optIdx} onClick={() => setQuizAnswers({...quizAnswers, [q.id]: optIdx})} className={`w-full text-left px-4 py-3 rounded-lg border-2 transition ${quizAnswers[q.id] === optIdx ? 'border-purple-600 bg-purple-50' : 'border-gray-200 hover:border-gray-300'}`}>
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}

                <div className="flex space-x-3">
                  <button onClick={() => setShowQuiz(false)} className="flex-1 px-4 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50">
                    Cancel
                  </button>
                  <button onClick={submitQuiz} className="flex-1 px-4 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700">
                    Submit Quiz
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className={`w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center ${quizScore === quizData.questions.length ? 'bg-green-100' : quizScore >= quizData.questions.length / 2 ? 'bg-yellow-100' : 'bg-red-100'}`}>
                  <CheckCircle className={`w-12 h-12 ${quizScore === quizData.questions.length ? 'text-green-600' : quizScore >= quizData.questions.length / 2 ? 'text-yellow-600' : 'text-red-600'}`} />
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-2">
                  Score: {quizScore}/{quizData.questions.length}
                </h4>
                <p className="text-gray-600 mb-6">
                  {quizScore === quizData.questions.length ? 'Perfect! You have excellent knowledge!' : 
                   quizScore >= quizData.questions.length / 2 ? 'Good job! Keep learning!' : 
                   'Keep studying to improve your knowledge.'}
                </p>
                <button onClick={() => {setShowQuiz(false); setQuizScore(null); setQuizAnswers({});}} className="px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700">
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}