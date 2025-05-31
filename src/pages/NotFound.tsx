import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HomeIcon } from 'lucide-react';

const NotFound = () => {
  return (
    <motion.div 
      className="flex flex-col items-center justify-center py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <img 
        src="https://images.pexels.com/photos/3755761/pexels-photo-3755761.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
        alt="Lost in books" 
        className="w-64 h-64 object-cover rounded-full mb-8 border-4 border-white shadow-lg"
      />
      
      <h1 className="text-4xl font-bold text-blue-600 mb-2">Oops!</h1>
      <p className="text-xl text-gray-600 mb-6">We can't find the page you're looking for.</p>
      
      <Link 
        to="/"
        className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors"
      >
        <HomeIcon size={20} />
        <span>Back to Home</span>
      </Link>
    </motion.div>
  );
};

export default NotFound;