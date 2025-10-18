import React, { useState } from 'react';
import { Activity, Utensils, Droplets, Moon, Target, TrendingUp, Plus, Play, CheckCircle, Award } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

export default function LifestyleRehab() {
  const [showLogModal, setShowLogModal] = useState(false);
  const [logType, setLogType] = useState('');
  const [showExercise, setShowExercise] = useState(false);

  const goals = [
    { id: 1, name: 'Daily Steps', target: 8000, current: 5420, unit: 'steps', icon: Activity, color: 'blue' },
    { id: 2, name: 'Water Intake', target: 8, current: 5, unit: 'glasses', icon: Droplets, color: 'cyan' },
    { id: 3, name: 'Sleep Duration', target: 8, current: 6.5, unit: 'hours', icon: Moon, color: 'indigo' },
    { id: 4, name: 'Healthy Meals', target: 3, current: 2, unit: 'meals', icon: Utensils, color: 'green' }
  ];

  const weeklyData = [
    { day: 'Mon', steps: 7200, water: 7, sleep: 7 },
    { day: 'Tue', steps: 6800, water: 6, sleep: 6.5 },
    { day: 'Wed', steps: 8500, water: 8, sleep: 8 },
    { day: 'Thu', steps: 5200, water: 5, sleep: 6 },
    { day: 'Fri', steps: 7800, water: 7, sleep: 7.5 },
    { day: 'Sat', steps: 9200, water: 9, sleep: 8 },
    { day: 'Sun', steps: 5420, water: 5, sleep: 6.5 }
  ];

  const exercises = [
    { id: 1, name: 'Gentle Walking', duration: '15 min', difficulty: 'Beginner', completed: true, calories: 50 },
    { id: 2, name: 'Breathing Exercises', duration: '10 min', difficulty: 'Beginner', completed: true, calories: 20 },
    { id: 3, name: 'Chair Yoga', duration: '20 min', difficulty: 'Beginner', completed: false, calories: 60 },
    { id: 4, name: 'Light Stretching', duration: '15 min', difficulty: 'Beginner', completed: false, calories: 40 }
  ];

  const meals = [
    { id: 1, name: 'Breakfast', time: '8:00 AM', items: 'Oatmeal with berries, Green tea', calories: 320, logged: true },
    { id: 2, name: 'Lunch', time: '12:30 PM', items: 'Grilled chicken salad, Whole grain bread', calories: 450, logged: true },
    { id: 3, name: 'Dinner', time: '6:00 PM', items: '', calories: 0, logged: false }
  ];

  const achievements = [
    { id: 1, title: '7-Day Streak', icon: '🔥', unlocked: true },
    { id: 2, title: 'Step Master', icon: '👟', unlocked: true },
    { id: 3, title: 'Hydration Hero', icon: '💧', unlocked: false },
    { id: 4, title: 'Sleep Champion', icon: '😴', unlocked: false }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Lifestyle & Rehab</h1>
              <p className="text-sm text-gray-600">Track your recovery journey</p>
            </div>
            <div className="flex space-x-2">
              <button onClick={() => {setShowLogModal(true); setLogType('activity');}} className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium">
                <Plus className="w-5 h-5" />
                <span>Log Activity</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Daily Goals */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {goals.map(goal => {
            const Icon = goal.icon;
            const percentage = Math.min((goal.current / goal.target) * 100, 100);
            return (
              <div key={goal.id} className="bg-white rounded-xl shadow-sm p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-full bg-${goal.color}-100 flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 text-${goal.color}-600`} />
                  </div>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${percentage >= 100 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {percentage.toFixed(0)}%
                  </span>
                </div>
                <h3 className="font-medium text-gray-900 mb-2">{goal.name}</h3>
                <div className="flex items-baseline space-x-1 mb-2">
                  <span className="text-2xl font-bold text-gray-900">{goal.current}</span>
                  <span className="text-sm text-gray-500">/ {goal.target} {goal.unit}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className={`bg-gradient-to-r from-${goal.color}-500 to-${goal.color}-600 h-2 rounded-full transition-all`} style={{ width: `${percentage}%` }}></div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Weekly Progress Chart */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Weekly Activity Summary</h2>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="day" stroke="#9ca3af" style={{ fontSize: '12px' }} />
                  <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
                  <Tooltip />
                  <Bar dataKey="steps" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-4 grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600">Avg Steps</p>
                  <p className="text-xl font-bold text-blue-600">7314</p>
                </div>
                <div className="text-center p-3 bg-cyan-50 rounded-lg">
                  <p className="text-sm text-gray-600">Avg Water</p>
                  <p className="text-xl font-bold text-cyan-600">6.7 gl</p>
                </div>
                <div className="text-center p-3 bg-indigo-50 rounded-lg">
                  <p className="text-sm text-gray-600">Avg Sleep</p>
                  <p className="text-xl font-bold text-indigo-600">7.1 hr</p>
                </div>
              </div>
            </div>

            {/* Exercise Program */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">Today's Exercise Program</h2>
                <span className="text-sm text-gray-600">2 of 4 completed</span>
              </div>
              <div className="space-y-3">
                {exercises.map(exercise => (
                  <div key={exercise.id} className={`p-4 rounded-lg border-2 transition ${exercise.completed ? 'border-green-200 bg-green-50' : 'border-gray-200 hover:border-blue-300'}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 flex-1">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${exercise.completed ? 'bg-green-500 border-green-500' : 'border-gray-300'}`}>
                          {exercise.completed && <CheckCircle className="w-4 h-4 text-white" />}
                        </div>
                        <div className="flex-1">
                          <h3 className={`font-medium ${exercise.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                            {exercise.name}
                          </h3>
                          <div className="flex items-center space-x-3 text-sm text-gray-500 mt-1">
                            <span>⏱ {exercise.duration}</span>
                            <span>🔥 {exercise.calories} cal</span>
                            <span className="px-2 py-0.5 bg-gray-100 rounded text-xs">{exercise.difficulty}</span>
                          </div>
                        </div>
                      </div>
                      {!exercise.completed && (
                        <button onClick={() => setShowExercise(true)} className="flex items-center space-x-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium">
                          <Play className="w-4 h-4" />
                          <span>Start</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Meal Tracking */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">Meal Tracker</h2>
                <button onClick={() => {setShowLogModal(true); setLogType('meal');}} className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  + Add Meal
                </button>
              </div>
              <div className="space-y-3">
                {meals.map(meal => (
                  <div key={meal.id} className={`p-4 rounded-lg ${meal.logged ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-medium text-gray-900">{meal.name}</h3>
                          <span className="text-xs text-gray-500">{meal.time}</span>
                        </div>
                        {meal.logged ? (
                          <>
                            <p className="text-sm text-gray-600 mb-2">{meal.items}</p>
                            <span className="text-xs font-medium text-green-700 bg-green-100 px-2 py-1 rounded">
                              {meal.calories} calories
                            </span>
                          </>
                        ) : (
                          <p className="text-sm text-gray-500 italic">Not logged yet</p>
                        )}
                      </div>
                      <Utensils className={`w-5 h-5 ${meal.logged ? 'text-green-600' : 'text-gray-400'}`} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Today's Total</span>
                  <span className="text-lg font-bold text-blue-600">770 / 1800 cal</span>
                </div>
                <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '42.8%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Weekly Feedback */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center space-x-2 mb-4">
                <TrendingUp className="w-6 h-6 text-green-600" />
                <h2 className="text-lg font-bold text-gray-900">Weekly Feedback</h2>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-green-900 mb-1">Great Progress!</p>
                      <p className="text-sm text-green-700">Your activity levels have increased by 18% this week.</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex items-start space-x-2">
                    <Target className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-yellow-900 mb-1">Improvement Area</p>
                      <p className="text-sm text-yellow-700">Try to increase your water intake by 2 glasses daily.</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-start space-x-2">
                    <Award className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-blue-900 mb-1">Next Milestone</p>
                      <p className="text-sm text-blue-700">3 more days to earn your "14-Day Streak" badge!</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Achievements</h2>
              <div className="grid grid-cols-2 gap-3">
                {achievements.map(achievement => (
                  <div key={achievement.id} className={`p-4 rounded-lg text-center ${achievement.unlocked ? 'bg-gradient-to-br from-yellow-400 to-orange-500' : 'bg-gray-100'}`}>
                    <div className={`text-4xl mb-2 ${achievement.unlocked ? '' : 'opacity-30'}`}>
                      {achievement.icon}
                    </div>
                    <p className={`text-xs font-medium ${achievement.unlocked ? 'text-white' : 'text-gray-500'}`}>
                      {achievement.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Rehab Schedule */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">This Week's Schedule</h2>
              <div className="space-y-3">
                {['Monday', 'Wednesday', 'Friday'].map((day, idx) => (
                  <div key={day} className={`p-3 rounded-lg ${idx === 0 ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'}`}>
                    <p className="font-medium text-gray-900 text-sm">{day}</p>
                    <p className="text-xs text-gray-600 mt-1">
                      {idx === 0 ? '🏃 Walking + Breathing' : idx === 1 ? '🧘 Yoga + Stretching' : '💪 Light Strength'}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-sm p-6 text-white">
              <h2 className="text-lg font-bold mb-3">💡 Daily Tip</h2>
              <p className="text-sm opacity-90">
                Taking short walks after meals can help improve digestion and regulate blood sugar levels, supporting your cardiac health recovery.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Log Activity Modal */}
      {showLogModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Log {logType === 'activity' ? 'Activity' : 'Meal'}
            </h3>
            
            {logType === 'activity' ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Activity Type</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                    <option>Walking</option>
                    <option>Swimming</option>
                    <option>Cycling</option>
                    <option>Yoga</option>
                    <option>Stretching</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Duration (minutes)</label>
                  <input type="number" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" placeholder="30" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Intensity</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Light', 'Moderate', 'Vigorous'].map(intensity => (
                      <button key={intensity} className="px-4 py-2 border-2 border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 text-sm font-medium">
                        {intensity}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Notes (Optional)</label>
                  <textarea className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" rows="2" placeholder="How did you feel?"></textarea>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Meal Type</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                    <option>Breakfast</option>
                    <option>Lunch</option>
                    <option>Dinner</option>
                    <option>Snack</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Food Items</label>
                  <textarea className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" rows="3" placeholder="Grilled salmon, steamed vegetables, brown rice"></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Estimated Calories</label>
                  <input type="number" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" placeholder="450" />
                </div>
              </div>
            )}

            <div className="flex space-x-3 mt-6">
              <button onClick={() => setShowLogModal(false)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50">
                Cancel
              </button>
              <button onClick={() => setShowLogModal(false)} className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700">
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Exercise Video Modal */}
      {showExercise && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full overflow-hidden">
            <div className="aspect-video bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
              <div className="text-center text-white">
                <Play className="w-20 h-20 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Chair Yoga Session</h3>
                <p className="text-blue-200">20 minutes • Beginner Level</p>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-bold text-gray-900">Exercise Instructions</h4>
                  <p className="text-sm text-gray-600">Follow along at your own pace</p>
                </div>
                <button onClick={() => setShowExercise(false)} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium">
                  Mark Complete
                </button>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <p>• Sit comfortably with your back straight</p>
                <p>• Breathe deeply and slowly throughout</p>
                <p>• Stop if you feel any discomfort</p>
                <p>• Stay hydrated during the session</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}