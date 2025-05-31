import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, BarChart3, Award, Calendar, Clock } from 'lucide-react';
import { useUser } from '../../contexts/UserContext';
import { students } from '../../data/mockData';

const GuardianDashboard = () => {
  const { user } = useUser();
  const [childData, setChildData] = useState<any>(null);
  
  useEffect(() => {
    // In a real app, we would fetch from an API
    // For now, we'll use mock data - just pick first student as child
    setChildData(students[0]);
  }, []);
  
  // Format date to display nicely
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric'
    });
  };
  
  return (
    <div className="max-w-5xl mx-auto">
      {/* Welcome Banner */}
      <motion.div 
        className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 mb-8 text-white shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl md:text-3xl font-bold mb-2">
          Hello, {user?.username || 'Guardian'}!
        </h1>
        <p className="opacity-90">
          Welcome to your guardian dashboard. Monitor your child's reading progress and stay involved in their education.
        </p>
      </motion.div>
      
      {childData ? (
        <>
          {/* Child Overview */}
          <motion.section 
            className="bg-white rounded-xl shadow-md p-6 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="mb-4 md:mb-0">
                <div className="flex items-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-blue-600 text-xl font-bold">
                      {childData.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">{childData.name}</h2>
                    <p className="text-gray-600">Grade {childData.grade_level}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center text-blue-600 mb-1">
                    <BookOpen size={16} className="mr-1" />
                    <span className="text-sm font-medium">Lessons</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-800">
                    {childData.completed_lessons}/{childData.total_lessons}
                  </div>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center text-green-600 mb-1">
                    <Award size={16} className="mr-1" />
                    <span className="text-sm font-medium">Achievements</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-800">
                    {childData.achievements}
                  </div>
                </div>
                
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <div className="flex items-center text-yellow-600 mb-1">
                    <Clock size={16} className="mr-1" />
                    <span className="text-sm font-medium">Study Time</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-800">
                    {childData.study_hours}h
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
          
          {/* Progress Section */}
          <motion.section 
            className="mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="flex items-center mb-4">
              <BarChart3 className="text-blue-500 mr-2" size={24} />
              <h2 className="text-xl font-bold text-gray-800">Learning Progress</h2>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Overall Progress</span>
                  <span className="text-sm font-medium text-gray-700">{childData.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div 
                    className="bg-blue-600 h-4 rounded-full"
                    style={{ width: `${childData.progress}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Subject Progress</h3>
                  {[
                    { name: 'Phonics', progress: 85, color: 'bg-purple-500' },
                    { name: 'Vocabulary', progress: 65, color: 'bg-green-500' },
                    { name: 'Comprehension', progress: 50, color: 'bg-yellow-500' },
                    { name: 'Writing', progress: 30, color: 'bg-red-500' }
                  ].map((subject, index) => (
                    <div key={index} className="mb-3">
                      <div className="flex justify-between mb-1">
                        <span className="text-xs font-medium text-gray-600">{subject.name}</span>
                        <span className="text-xs font-medium text-gray-600">{subject.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`${subject.color} h-2 rounded-full`}
                          style={{ width: `${subject.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Recent Activity</h3>
                  {[
                    { title: 'Completed "The Cat in the Hat"', date: '2025-04-15' },
                    { title: 'Started "Green Eggs and Ham"', date: '2025-04-13' },
                    { title: 'Earned "Phonics Master" achievement', date: '2025-04-10' },
                    { title: 'Completed vocabulary quiz', date: '2025-04-08' }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-start mb-3">
                      <div className="flex-shrink-0 h-4 w-4 bg-blue-100 rounded-full mt-1 flex items-center justify-center">
                        <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-gray-800">{activity.title}</p>
                        <p className="text-xs text-gray-500">{formatDate(activity.date)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>
          
          {/* Upcoming Lessons */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <div className="flex items-center mb-4">
              <Calendar className="text-green-500 mr-2" size={24} />
              <h2 className="text-xl font-bold text-gray-800">Upcoming Lessons</h2>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { 
                    title: 'Phonics Practice: B and D Sounds',
                    date: '2025-04-20',
                    description: 'Interactive practice distinguishing between b and d sounds in words.',
                    tag: 'Phonics'
                  },
                  { 
                    title: 'Story Time: The Very Hungry Caterpillar',
                    date: '2025-04-22',
                    description: 'Reading comprehension with a classic children\'s story.',
                    tag: 'Reading'
                  },
                  { 
                    title: 'Word Families: AT Words',
                    date: '2025-04-24',
                    description: 'Learn and practice words that end with "-at" (cat, bat, rat, etc.).',
                    tag: 'Vocabulary'
                  },
                  { 
                    title: 'Sentence Building Activity',
                    date: '2025-04-26',
                    description: 'Practice building simple sentences with provided words.',
                    tag: 'Writing'
                  }
                ].map((lesson, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-800">{lesson.title}</h3>
                        <p className="text-sm text-gray-500 mt-1">{formatDate(lesson.date)}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        lesson.tag === 'Phonics' ? 'bg-purple-100 text-purple-800' :
                        lesson.tag === 'Reading' ? 'bg-blue-100 text-blue-800' :
                        lesson.tag === 'Vocabulary' ? 'bg-green-100 text-green-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {lesson.tag}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">{lesson.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>
        </>
      ) : (
        <motion.div 
          className="bg-white rounded-xl shadow-md p-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="mb-4">
            <Users className="mx-auto text-blue-500" size={48} />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">No Students Connected</h2>
          <p className="text-gray-600 mb-4">
            You currently don't have any students connected to your account. Ask your child's teacher for an access code.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
            Connect a Student
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default GuardianDashboard;