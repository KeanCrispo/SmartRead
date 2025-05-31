import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Users, FilePlus, BarChart3, List } from 'lucide-react';
import { useUser } from '../../contexts/UserContext';
import { lessons, students } from '../../data/mockData';

const TeacherDashboard = () => {
  const { user } = useUser();
  const [teacherLessons, setTeacherLessons] = useState([]);
  
  useEffect(() => {
    // Filter lessons created by this teacher
    // In a real app, you would fetch from an API
    setTeacherLessons(lessons);
  }, []);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  return (
    <div className="max-w-5xl mx-auto">
      {/* Welcome Banner */}
      <motion.div 
        className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl p-6 mb-8 text-white shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl md:text-3xl font-bold mb-2">
          Hello, {user?.username || 'Teacher'}!
        </h1>
        <p className="opacity-90">
          Welcome to your teacher dashboard. Create and manage lessons for your students.
        </p>
      </motion.div>
      
      {/* Quick Actions */}
      <div className="mb-8">
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {[
            { 
              title: 'Create Lesson', 
              description: 'Add a new lesson',
              icon: <FilePlus className="text-white" size={24} />,
              color: 'bg-blue-500',
              link: '/teacher/lessons/create'
            },
            { 
              title: 'View Lessons', 
              description: 'Manage lessons',
              icon: <List className="text-white" size={24} />,
              color: 'bg-green-500',
              link: '/teacher/lessons'
            },
            { 
              title: 'Student Progress', 
              description: 'View statistics',
              icon: <BarChart3 className="text-white" size={24} />,
              color: 'bg-purple-500',
              link: '/teacher'
            },
            { 
              title: 'Manage Students', 
              description: 'View student list',
              icon: <Users className="text-white" size={24} />,
              color: 'bg-orange-500',
              link: '/teacher'
            }
          ].map((action, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
            >
              <Link to={action.link}>
                <div className={`${action.color} rounded-xl shadow-md p-4 text-white h-full`}>
                  <div className="flex flex-col h-full">
                    <div className="p-2 bg-white bg-opacity-20 rounded-lg self-start mb-2">
                      {action.icon}
                    </div>
                    <h3 className="font-bold">{action.title}</h3>
                    <p className="text-sm opacity-90 mt-1">{action.description}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* Your Lessons Section */}
      <motion.section 
        className="mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">Your Lessons</h2>
          <Link to="/teacher/lessons" className="text-blue-600 hover:text-blue-800 text-sm">
            View All
          </Link>
        </div>
        
        {teacherLessons.length > 0 ? (
          <div className="bg-white rounded-xl shadow p-4">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Difficulty
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created
                    </th>
                    <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {teacherLessons.slice(0, 5).map((lesson: any) => (
                    <tr key={lesson.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <BookOpen className="text-blue-500" size={16} />
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">{lesson.title}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          lesson.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                          lesson.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {lesson.difficulty}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {new Date(lesson.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <Link to={`/teacher/lessons/${lesson.id}`} className="text-blue-600 hover:text-blue-900">
                            View
                          </Link>
                          <Link to={`/teacher/lessons/${lesson.id}/edit`} className="text-green-600 hover:text-green-900">
                            Edit
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-6 text-center">
            <p className="text-gray-600">You haven't created any lessons yet. <Link to="/teacher/lessons/create" className="text-blue-600 hover:text-blue-800">Create one now!</Link></p>
          </div>
        )}
      </motion.section>
      
      {/* Student Progress Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <div className="flex items-center mb-4">
          <Users className="text-blue-500 mr-2" size={24} />
          <h2 className="text-xl font-bold text-gray-800">Student Progress</h2>
        </div>
        
        <div className="bg-white rounded-xl shadow p-4">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Progress
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Activity
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {students.slice(0, 5).map((student: any) => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="text-green-800 text-sm font-medium">
                            {student.name.charAt(0)}
                          </span>
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">{student.name}</div>
                          <div className="text-xs text-gray-500">Grade {student.grade_level}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${student.progress}%` }}></div>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">{student.progress}% complete</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {student.last_activity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default TeacherDashboard;