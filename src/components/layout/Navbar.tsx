import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LogOut, BookOpen, Home, User, Users, BookType } from 'lucide-react';
import { useUser, UserRole } from '../../contexts/UserContext';
import Logo from './Logo';

interface NavbarProps {
  isAuthenticated: boolean;
  userRole?: UserRole;
  username?: string;
}

const Navbar = ({ isAuthenticated, userRole, username }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { logout } = useUser();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const getRoleBasedLinks = () => {
    switch (userRole) {
      case 'student':
        return [
          { to: '/student', icon: <Home size={20} />, text: 'Dashboard' },
          { to: '/student/lessons', icon: <BookOpen size={20} />, text: 'Lessons' },
        ];
      case 'teacher':
        return [
          { to: '/teacher', icon: <Home size={20} />, text: 'Dashboard' },
          { to: '/teacher/lessons', icon: <BookOpen size={20} />, text: 'Lessons' },
          { to: '/teacher/lessons/create', icon: <BookType size={20} />, text: 'Create Lesson' },
        ];
      case 'guardian':
        return [
          { to: '/guardian', icon: <Home size={20} />, text: 'Dashboard' },
          { to: '/guardian/progress', icon: <Users size={20} />, text: 'Student Progress' },
        ];
      default:
        return [];
    }
  };
  
  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Logo />
            <span className="text-2xl font-bold text-blue-600">SmartRead</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {isAuthenticated ? (
              <>
                {getRoleBasedLinks().map((link, index) => (
                  <Link
                    key={index}
                    to={link.to}
                    className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    {link.icon}
                    <span>{link.text}</span>
                  </Link>
                ))}
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Hi, {username}</span>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-1 text-red-500 hover:text-red-700 transition-colors"
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-blue-600 transition-colors">Login</Link>
                <Link to="/register" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full transition-colors">
                  Register
                </Link>
              </>
            )}
          </nav>
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t overflow-hidden"
          >
            <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              {isAuthenticated ? (
                <>
                  {getRoleBasedLinks().map((link, index) => (
                    <Link
                      key={index}
                      to={link.to}
                      className="flex items-center space-x-2 p-2 rounded-lg hover:bg-blue-50"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.icon}
                      <span>{link.text}</span>
                    </Link>
                  ))}
                  <div className="pt-2 border-t border-gray-200">
                    <div className="text-sm text-gray-600 mb-2">Hi, {username}</div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 text-red-500 p-2 w-full rounded-lg hover:bg-red-50"
                    >
                      <LogOut size={18} />
                      <span>Logout</span>
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="p-2 rounded-lg hover:bg-blue-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Register
                  </Link>
                </>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;