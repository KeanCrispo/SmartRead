import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Award, BookCheck, BookText } from 'lucide-react';
import { useUser } from '../../contexts/UserContext';
import { lessons } from '../../data/mockData';

// Add a type for lessons if you have one, or use 'any' for now
type Lesson = {
  id: string;
  title: string;
  description: string;
  content: string;
  file_path: string;
  difficulty: string;
  uploaded_by: string;
  created_at: string;
};

const StudentDashboard = () => {
  const { user } = useUser();
  const [recentLessons, setRecentLessons] = useState<Lesson[]>([]);
  const [inProgressLessons, setInProgressLessons] = useState<Lesson[]>([]);
  const [completedLessons, setCompletedLessons] = useState<Lesson[]>([]);

  // --- Chat box state and logic (offline only) ---
  const [messages, setMessages] = useState<string[]>(() => {
    const saved = localStorage.getItem('offlineChat');
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem('offlineChat', JSON.stringify(messages));
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Simple offline bot reply
  const getBotReply = (userMessage: string) => {
    const msg = userMessage.toLowerCase();
    if (msg.includes("hello") || msg.includes("hi")) return "Hello! How can I help you today?";
    if (msg.includes("help")) return "Sure! What do you need help with?";
    if (msg.includes("lesson")) return "You can view your lessons in the dashboard.";
    if (msg.includes("bye")) return "Goodbye! Have a great day!";
    return "Sorry, I don't understand. Try asking something else!";
  };

  const sendMessage = () => {
    if (input.trim()) {
      setMessages(prev => [...prev, input]);
      const reply = getBotReply(input);
      setTimeout(() => {
        setMessages(prev => [...prev, reply]);
      }, 500);
      setInput('');
    }
  };
  // --- End chat box logic ---

  useEffect(() => {
    // In a real app, we would fetch from an API
    // For now, we'll use mock data
    setRecentLessons(lessons.slice(0, 3));
    setInProgressLessons(lessons.slice(1, 3)); // Pretend user has started these
    setCompletedLessons(lessons.slice(3, 5)); // Pretend user has completed these
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
        className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 mb-8 text-white shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl md:text-3xl font-bold mb-2">
          Hello, {user?.username || 'Student'}!
        </h1>
        <p className="opacity-90">
          Welcome to your learning dashboard. Ready to continue your reading adventure?
        </p>
      </motion.div>
      
      {/* Progress Overview */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {[
          { 
            title: 'Lessons Completed', 
            value: completedLessons.length, 
            icon: <BookCheck className="text-white" size={24} />,
            color: 'bg-green-500' 
          },
          { 
            title: 'In Progress', 
            value: inProgressLessons.length, 
            icon: <BookText className="text-white" size={24} />,
            color: 'bg-yellow-500' 
          },
          { 
            title: 'Available Lessons', 
            value: lessons.length, 
            icon: <BookOpen className="text-white" size={24} />,
            color: 'bg-blue-500' 
          }
        ].map((stat, index) => (
          <motion.div 
            key={index} 
            className={`${stat.color} rounded-xl shadow-md p-4 text-white`}
            variants={itemVariants}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium opacity-90">{stat.title}</p>
                <h3 className="text-3xl font-bold mt-1">{stat.value}</h3>
              </div>
              <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                {stat.icon}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
      
      {/* Continue Learning Section */}
      <motion.section 
        className="mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">Continue Learning</h2>
          <Link to="/student/lessons" className="text-blue-600 hover:text-blue-800 text-sm">
            View All
          </Link>
        </div>
        
        {inProgressLessons.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {inProgressLessons.map((lesson: any) => (
              <Link key={lesson.id} to={`/student/lessons/${lesson.id}`}>
                <motion.div 
                  className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-yellow-500 hover:shadow-md transition-shadow"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-gray-800">{lesson.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{lesson.description.substring(0, 60)}...</p>
                    </div>
                    <div className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      In Progress
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '35%' }}></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">35% complete</div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-6 text-center">
            <p className="text-gray-600">No lessons in progress. Start a new lesson!</p>
          </div>
        )}
      </motion.section>
      
      {/* New Lessons Section */}
      <motion.section 
        className="mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">New Lessons</h2>
          <Link to="/student/lessons" className="text-blue-600 hover:text-blue-800 text-sm">
            View All
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {recentLessons.map((lesson: any) => (
            <Link key={lesson.id} to={`/student/lessons/${lesson.id}`}>
              <motion.div 
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <div className="h-24 bg-blue-100 flex items-center justify-center">
                  <BookOpen className="text-blue-500" size={32} />
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-gray-800">{lesson.title}</h3>
                      <p className="text-xs text-gray-500 mt-1">By {lesson.uploaded_by}</p>
                    </div>
                    <div className={`text-xs font-medium px-2 py-0.5 rounded ${
                      lesson.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                      lesson.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {lesson.difficulty}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">{lesson.description.substring(0, 60)}...</p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </motion.section>
      
      {/* Achievements Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <div className="flex items-center mb-4">
          <Award className="text-yellow-500 mr-2" size={24} />
          <h2 className="text-xl font-bold text-gray-800">Your Achievements</h2>
        </div>
        
        {completedLessons.length > 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {completedLessons.map((lesson: any, index: number) => (
                <motion.div 
                  key={index}
                  className="flex flex-col items-center text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * index, duration: 0.3 }}
                >
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-2">
                    <Award className="text-yellow-500" size={32} />
                  </div>
                  <p className="text-sm font-medium text-gray-800">{lesson.title}</p>
                  <p className="text-xs text-gray-500">Completed</p>
                </motion.div>
              ))}
              
              {/* Placeholder for future achievements */}
              <motion.div 
                className="flex flex-col items-center text-center opacity-50"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.5, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.3 }}
              >
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-2 border-2 border-dashed border-gray-300">
                  <Award className="text-gray-400" size={32} />
                </div>
                <p className="text-sm font-medium text-gray-500">Reading Pro</p>
                <p className="text-xs text-gray-400">Coming soon</p>
              </motion.div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-6 text-center">
            <p className="text-gray-600">Complete lessons to earn achievements!</p>
          </div>
        )}
      </motion.section>

      {/* Chat Box Component */}
      <div className="fixed bottom-4 right-4 w-80 bg-white rounded-xl shadow-lg flex flex-col">
        <div className="p-3 border-b font-bold bg-blue-500 text-white rounded-t-xl flex justify-between items-center">
          <span>AI Chat</span>
          <button
            className="text-xs bg-white text-blue-500 px-2 py-1 rounded hover:bg-blue-100 transition"
            onClick={() => setMessages([])}
            title="Refresh chat"
            type="button"
          >
            Refresh
          </button>
        </div>
        <div className="flex-1 p-3 overflow-y-auto" style={{ maxHeight: 200 }}>
          {messages.map((msg, idx) => (
            <div key={idx} className="mb-2 text-sm bg-blue-100 p-2 rounded">{msg}</div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="flex border-t p-2">
          <input
            type="text"
            className="flex-1 border rounded-l px-2 py-1"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={async e => {
              if (e.key === 'Enter') {
                e.preventDefault();
                await sendMessage();
              }
            }}
            placeholder="Type a message..."
          />
          <button
            className="bg-blue-500 text-white px-4 rounded-r"
            onClick={sendMessage}
            type="button"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;