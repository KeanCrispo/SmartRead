import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Trash2, Upload, AlertCircle } from 'lucide-react';
import { useUser } from '../../contexts/UserContext';
import { lessons } from '../../data/mockData';

interface LessonEditProps {
  mode: 'create' | 'edit';
}

const LessonEdit = ({ mode }: LessonEditProps) => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const { user } = useUser();
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [difficulty, setDifficulty] = useState('easy');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  useEffect(() => {
    // If editing an existing lesson, fetch and populate form
    if (mode === 'edit' && lessonId) {
      const lessonToEdit = lessons.find(l => l.id === lessonId);
      
      if (lessonToEdit) {
        setTitle(lessonToEdit.title);
        setDescription(lessonToEdit.description);
        setContent(lessonToEdit.content || '');
        setDifficulty(lessonToEdit.difficulty);
      } else {
        setError('Lesson not found');
      }
    }
  }, [mode, lessonId]);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    
    if (!description.trim()) {
      setError('Description is required');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    // Simulate API call with timeout
    setTimeout(() => {
      // In a real app, this would call an API to create/update the lesson
      
      // Redirect to lessons list
      navigate('/teacher/lessons');
      
      setIsSubmitting(false);
    }, 1000);
  };
  
  const handleDelete = () => {
    // Confirm deletion
    if (window.confirm('Are you sure you want to delete this lesson? This action cannot be undone.')) {
      setIsSubmitting(true);
      
      // Simulate API call with timeout
      setTimeout(() => {
        // In a real app, this would call an API to delete the lesson
        
        // Redirect to lessons list
        navigate('/teacher/lessons');
        
        setIsSubmitting(false);
      }, 1000);
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      {/* Back Button */}
      <div className="mb-6">
        <Link 
          to="/teacher/lessons" 
          className="inline-flex items-center text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft size={16} className="mr-1" />
          <span>Back to lessons</span>
        </Link>
      </div>
      
      {/* Form Header */}
      <motion.div 
        className="bg-white rounded-xl shadow-md overflow-hidden mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4 text-white">
          <h1 className="text-2xl font-bold">
            {mode === 'create' ? 'Create New Lesson' : 'Edit Lesson'}
          </h1>
        </div>
        
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4">
            <div className="flex items-center">
              <AlertCircle className="text-red-500 mr-2" size={20} />
              <p className="text-red-800">{error}</p>
            </div>
          </div>
        )}
        
        <div className="p-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6">
              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Lesson Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter a descriptive title"
                  required
                />
              </div>
              
              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Briefly describe what this lesson is about"
                  required
                />
              </div>
              
              {/* Difficulty */}
              <div>
                <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-1">
                  Difficulty Level
                </label>
                <select
                  id="difficulty"
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
              
              {/* Content */}
              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                  Lesson Content
                </label>
                <textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={10}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter the full lesson content here. You can include instructions, examples, and activities."
                />
              </div>
              
              {/* File Upload */}
              <div>
                <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-1">
                  Attachment (optional)
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto text-gray-400" size={24} />
                    <div className="flex text-sm text-gray-600">
                      <label htmlFor="file" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                        <span>Upload a file</span>
                        <input 
                          id="file" 
                          name="file" 
                          type="file" 
                          className="sr-only"
                          onChange={handleFileChange}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PDF, DOCX, PPT up to 10MB
                    </p>
                    {selectedFile && (
                      <p className="text-sm text-green-600">
                        {selectedFile.name} selected
                      </p>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Form Actions */}
              <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                {mode === 'edit' ? (
                  <button
                    type="button"
                    onClick={handleDelete}
                    disabled={isSubmitting}
                    className="inline-flex items-center text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={16} className="mr-1" />
                    <span>Delete Lesson</span>
                  </button>
                ) : (
                  <div></div> // Empty div to maintain flex spacing
                )}
                
                <div className="flex space-x-3">
                  <Link
                    to="/teacher/lessons"
                    className="bg-gray-100 text-gray-800 hover:bg-gray-200 px-4 py-2 rounded-lg"
                  >
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 ${
                      isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    <Save size={16} className="mr-1" />
                    <span>{isSubmitting ? 'Saving...' : 'Save Lesson'}</span>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default LessonEdit;