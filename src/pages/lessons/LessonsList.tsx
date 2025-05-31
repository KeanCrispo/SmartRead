import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, BookOpen, Plus, BookText, Filter } from 'lucide-react';
import { lessons } from '../../data/mockData';
import { UserRole } from '../../contexts/UserContext';

interface LessonsListProps {
  userRole: UserRole;
}

const LessonsList = ({ userRole }: LessonsListProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<string | null>(null);
  const [filteredLessons, setFilteredLessons] = useState(lessons);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  useEffect(() => {
    let result = lessons;
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(
        lesson => 
          lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lesson.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply difficulty filter
    if (difficultyFilter) {
      result = result.filter(lesson => lesson.difficulty === difficultyFilter);
    }
    
    setFilteredLessons(result);
  }, [searchTerm, difficultyFilter]);
  
  const getPageTitle = () => {
    switch (userRole) {
      case 'student':
        return 'Your Lessons';
      case 'teacher':
        return 'Manage Lessons';
      case 'guardian':
        return 'Student Lessons Progress';
      default:
        return 'Lessons';
    }
  };
  
  const getDashboardLink = () => {
    switch (userRole) {
      case 'student':
        return '/student';
      case 'teacher':
        return '/teacher';
      case 'guardian':
        return '/guardian';
      default:
        return '/';
    }
  };
  
  const getLessonLink = (lessonId: string) => {
    switch (userRole) {
      case 'student':
        return `/student/lessons/${lessonId}`;
      case 'teacher':
        return `/teacher/lessons/${lessonId}`;
      case 'guardian':
        return `/student/lessons/${lessonId}`; // guardians view the student view
      default:
        return `/lessons/${lessonId}`;
    }
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  return (
    <div className="max-w-5xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <motion.h1 
          className="text-2xl font-bold text-gray-800 mb-4 md:mb-0"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {getPageTitle()}
        </motion.h1>
        
        {userRole === 'teacher' && (
          <Link 
            to="/teacher/lessons/create"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg inline-flex items-center"
          >
            <Plus size={18} className="mr-1" />
            <span>Create Lesson</span>
          </Link>
        )}
      </div>
      
      {/* Search and Filter Section */}
      <motion.div 
        className="bg-white rounded-xl shadow-md p-4 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="text-gray-400" size={18} />
            </div>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
              placeholder="Search lessons..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-lg"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <Filter size={18} className="mr-2 text-gray-600" />
              <span>Filter</span>
            </button>
          </div>
        </div>
        
        {/* Filter options */}
        {isFilterOpen && (
          <motion.div 
            className="mt-4 p-4 border-t border-gray-200"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-sm font-medium text-gray-700 mb-2">Difficulty</h3>
            <div className="flex flex-wrap gap-2">
              {['All', 'easy', 'medium', 'hard'].map((difficulty) => (
                <button
                  key={difficulty}
                  className={`px-3 py-1.5 rounded-lg text-sm ${
                    (difficulty === 'All' && !difficultyFilter) || difficultyFilter === difficulty
                      ? 'bg-blue-100 text-blue-800 border border-blue-300'
                      : 'bg-gray-100 text-gray-800 border border-gray-200 hover:bg-gray-200'
                  }`}
                  onClick={() => setDifficultyFilter(difficulty === 'All' ? null : difficulty)}
                >
                  {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
      
      {/* Lessons List */}
      {filteredLessons.length > 0 ? (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredLessons.map((lesson) => (
            <motion.div
              key={lesson.id}
              variants={itemVariants}
              transition={{ duration: 0.3 }}
            >
              <Link to={getLessonLink(lesson.id)}>
                <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow h-full">
                  <div className="h-32 bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                    <BookText className="text-white" size={40} />
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-gray-800">{lesson.title}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        lesson.difficulty === 'easy' 
                          ? 'bg-green-100 text-green-800' 
                          : lesson.difficulty === 'medium'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                      }`}>
                        {lesson.difficulty}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{lesson.description.substring(0, 100)}...</p>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-xs text-gray-500">By {lesson.uploaded_by}</span>
                      {userRole === 'student' && (
                        <div className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          Not started
                        </div>
                      )}
                      {userRole === 'teacher' && (
                        <div className="flex space-x-1">
                          <Link 
                            to={`/teacher/lessons/${lesson.id}/edit`}
                            className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"
                            onClick={(e) => e.stopPropagation()}
                          >
                            Edit
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm p-6 text-center">
          <BookOpen className="mx-auto text-gray-400 mb-2" size={40} />
          <h3 className="text-lg font-medium text-gray-800 mb-1">No lessons found</h3>
          <p className="text-gray-600">
            {searchTerm || difficultyFilter 
              ? "Try adjusting your search or filters"
              : userRole === 'teacher' 
                ? "Get started by creating your first lesson"
                : "Check back later for new lessons"
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default LessonsList;