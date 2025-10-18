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
        question: 'What is a normal resting heart