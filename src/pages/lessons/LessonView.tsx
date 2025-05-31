import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Download, BookOpen, Edit, Award } from 'lucide-react';
import { useUser } from '../../contexts/UserContext';
import { lessons } from '../../data/mockData';

const LessonView = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const { user } = useUser();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [complete, setComplete] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const foundLesson = lessons.find(l => l.id === lessonId);
      setLesson(foundLesson || null);
      setLoading(false);
    }, 500);
  }, [lessonId]);

  const handleMarkComplete = () => {
    setComplete(true);
    setTimeout(() => {}, 1500);
  };

  const getDashboardPath = () => {
    if (!user) return '/';
    switch (user.role) {
      case 'student': return '/student/lessons';
      case 'teacher': return '/teacher/lessons';
      case 'guardian': return '/guardian';
      default: return '/';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Lesson Not Found</h2>
        <p className="text-gray-600 mb-4">The lesson you're looking for doesn't exist or has been removed.</p>
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center mx-auto space-x-1 bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          <ArrowLeft size={16} />
          <span>Go Back</span>
        </button>
      </div>
    );
  }

  const handleAnswerClick = (questionKey: string, selectedOption: string) => {
    setSelectedAnswers(prev => ({ ...prev, [questionKey]: selectedOption }));
  };

  const isCorrect = (questionKey: string, option: string) => {
    const correctAnswers: { [key: string]: string } = {
      bSound: 'bat',
      dotCharacter: 'A dog'
    };
    return selectedAnswers[questionKey] === option && option === correctAnswers[questionKey];
  };

  return (
    <div className="max-w-4xl mx-auto">
      {complete && (
        <motion.div 
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className="bg-white rounded-xl p-8 flex flex-col items-center max-w-md mx-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", duration: 0.5 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Award className="text-green-600" size={40} />
              </div>
            </motion.div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Lesson Complete!</h2>
            <p className="text-gray-600 text-center mb-4">
              Great job! You've completed "{lesson.title}".
            </p>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <button 
                onClick={() => navigate(getDashboardPath())}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg"
              >
                Continue Learning
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}

      {/* Back and Lesson Header */}
      <div className="mb-6">
        <Link 
          to={getDashboardPath()} 
          className="inline-flex items-center text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft size={16} className="mr-1" />
          <span>Back to lessons</span>
        </Link>
      </div>

      {/* Lesson Card */}
      <motion.div 
        className="bg-white rounded-xl shadow-md overflow-hidden mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4 text-white">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">{lesson.title}</h1>
            {user?.role === 'teacher' && (
              <Link 
                to={`/teacher/lessons/${lesson.id}/edit`}
                className="inline-flex items-center bg-white bg-opacity-20 text-white px-3 py-1 rounded-lg hover:bg-opacity-30"
              >
                <Edit size={16} className="mr-1" />
                <span>Edit</span>
              </Link>
            )}
          </div>
        </div>

        <div className="p-6">
          <div className="flex flex-wrap gap-4 mb-4">
            <div className="bg-gray-100 px-4 py-2 rounded-lg">
              <p className="text-sm text-gray-500">Difficulty</p>
              <p className="font-medium text-gray-800">{lesson.difficulty}</p>
            </div>
            <div className="bg-gray-100 px-4 py-2 rounded-lg">
              <p className="text-sm text-gray-500">Created By</p>
              <p className="font-medium text-gray-800">{lesson.uploaded_by}</p>
            </div>
            <div className="bg-gray-100 px-4 py-2 rounded-lg">
              <p className="text-sm text-gray-500">Date</p>
              <p className="font-medium text-gray-800">{formatDate(lesson.created_at)}</p>
            </div>
          </div>
          <p className="text-gray-700 mb-4">{lesson.description}</p>
          {lesson.file_path && (
            <div className="flex items-center space-x-2 text-blue-600 mb-4">
              <Download size={16} />
              <a href="#" className="hover:underline">Download lesson materials</a>
            </div>
          )}
        </div>
      </motion.div>

      {/* Lesson Content */}
      <motion.div 
        className="bg-white rounded-xl shadow-md p-6 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <BookOpen size={20} className="mr-2 text-blue-600" />
          Lesson Content
        </h2>

        <div className="prose max-w-none">
          {/* Static Content */}
          <h3>Learning Objectives</h3>
          <ul>
            <li>Recognize and pronounce the letters</li>
            <li>Read simple words with the learned sounds</li>
            <li>Identify the characters in the story</li>
          </ul>

          <h3>Introduction</h3>
          <p>Welcome to today's reading lesson!...</p>

          <h3>Activity 1: Letter Sounds</h3>
          <ul>
            <li><strong>B</strong> - ball</li>
            <li><strong>D</strong> - dog</li>
            <li><strong>P</strong> - pen</li>
          </ul>

          <h3>Activity 2: Word Reading</h3>
          <div className="bg-blue-50 p-4 rounded-lg text-2xl text-center">bat · pen · dot · pad · big</div>

          <h3>Activity 3: Story Time</h3>
          <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
            <p>Pat had a big dog. The dog's name was Dot...</p>
          </div>

          <h3>Wrap-Up</h3>
          <p>Great job with today's lesson!</p>
        </div>
      </motion.div>

      {/* Student Interactivity */}
      {user?.role === 'student' && (
        <motion.div 
          className="bg-white rounded-xl shadow-md p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h2 className="text-xl font-bold text-gray-800 mb-4">Check Your Understanding</h2>

          <div className="mb-6">
            <p className="font-medium text-gray-700 mb-2">Which word has a "b" sound?</p>
            <div className="grid grid-cols-2 gap-4">
              {['bat', 'dog', 'pen', 'top'].map((option) => (
                <button
                  key={option}
                  onClick={() => handleAnswerClick('bSound', option)}
                  className={`p-3 border-2 rounded-lg transition-colors ${
                    selectedAnswers['bSound'] === option
                      ? isCorrect('bSound', option)
                        ? 'bg-green-100 border-green-500'
                        : 'bg-red-100 border-red-500'
                      : 'border-gray-200 hover:bg-blue-50 hover:border-blue-400'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <p className="font-medium text-gray-700 mb-2">What is Dot?</p>
            <div className="grid grid-cols-2 gap-4">
              {['A cat', 'A dog', 'A boy', 'A ball'].map((option) => (
                <button
                  key={option}
                  onClick={() => handleAnswerClick('dotCharacter', option)}
                  className={`p-3 border-2 rounded-lg transition-colors ${
                    selectedAnswers['dotCharacter'] === option
                      ? isCorrect('dotCharacter', option)
                        ? 'bg-green-100 border-green-500'
                        : 'bg-red-100 border-red-500'
                      : 'border-gray-200 hover:bg-blue-50 hover:border-blue-400'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <button 
              onClick={handleMarkComplete}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg"
            >
              Mark Lesson as Complete
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default LessonView;
