import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Users, UserCheck } from 'lucide-react';

const Home = () => {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <motion.section 
        className="w-full py-12 mb-12 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl overflow-hidden relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Welcome to SmartRead!
            </motion.h1>
            <motion.p 
              className="text-xl mb-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Learn and Play Anywhere!
            </motion.p>
            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Link 
                to="/register" 
                className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 px-6 py-3 rounded-full font-bold transition-colors shadow-lg"
              >
                Get Started
              </Link>
              <Link 
                to="/login" 
                className="bg-white hover:bg-gray-100 text-blue-600 px-6 py-3 rounded-full font-bold transition-colors shadow-lg"
              >
                Login
              </Link>
            </motion.div>
          </div>
          <motion.div 
            className="md:w-1/2 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <img 
              src="https://images.pexels.com/photos/8535214/pexels-photo-8535214.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
              alt="Children learning" 
              className="rounded-xl shadow-xl max-w-full h-auto"
              style={{ maxHeight: '300px' }}
            />
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="w-full mb-12">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">How SmartRead Helps</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <BookOpen size={40} className="text-blue-500" />,
              title: "Interactive Lessons",
              description: "Engaging reading lessons designed specifically for Grade 1 students."
            },
            {
              icon: <Users size={40} className="text-yellow-500" />,
              title: "Teacher Resources",
              description: "Upload and manage lesson plans for your classroom."
            },
            {
              icon: <UserCheck size={40} className="text-green-500" />,
              title: "Guardian Involvement",
              description: "Monitor your child's progress and stay connected with their learning."
            }
          ].map((feature, index) => (
            <motion.div 
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * index, duration: 0.5 }}
            >
              <div className="mb-4 flex justify-center">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-center text-gray-800">{feature.title}</h3>
              <p className="text-gray-600 text-center">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <motion.section 
        className="w-full bg-yellow-400 rounded-xl p-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-blue-900">Ready to start the learning journey?</h2>
        <p className="text-blue-900 mb-6 max-w-2xl mx-auto">
          Join SmartRead today and give your students the interactive learning experience they deserve.
        </p>
        <Link 
          to="/register" 
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-bold transition-colors shadow-lg"
        >
          Register Now
        </Link>
      </motion.section>
    </div>
  );
};

export default Home;