import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useUser, UserRole } from '../contexts/UserContext';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<UserRole>('student');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useUser();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      // Get existing users from localStorage or empty array
      const savedUsers = JSON.parse(localStorage.getItem('smartreadUsers') || '[]');

      // Check if email already exists (optional, for better UX)
      const emailExists = savedUsers.some((user: any) => user.email === email);
      if (emailExists) {
        setError('Email is already registered');
        setIsLoading(false);
        return;
      }

      // Create new user with password included
      const newUser = {
        id: Math.random().toString(36).substr(2, 9),
        username,
        email,
        password,
        role,
      };

      // Add new user to saved users list
      const updatedUsers = [...savedUsers, newUser];
      localStorage.setItem('smartreadUsers', JSON.stringify(updatedUsers));

      // Log the user in immediately
      login(newUser);

      // Navigate based on role
      switch (role) {
        case 'student':
          navigate('/student');
          break;
        case 'teacher':
          navigate('/teacher');
          break;
        case 'guardian':
          navigate('/guardian');
          break;
        default:
          navigate('/');
      }

      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="max-w-md mx-auto">
      <motion.div
        className="bg-white rounded-xl shadow-lg overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-blue-600 p-6 text-white">
          <h1 className="text-2xl font-bold text-center">Create Your Account</h1>
          <p className="text-center text-blue-100 mt-2">Join SmartRead Educational Platform</p>
        </div>

        <div className="p-6">
          {error && (
            <motion.div
              className="bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded mb-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-700 font-medium mb-2">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="role" className="block text-gray-700 font-medium mb-2">
                I am a:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: 'student', label: 'Student', bgColor: 'bg-blue-100', hoverColor: 'hover:bg-blue-200' },
                  { value: 'teacher', label: 'Teacher', bgColor: 'bg-yellow-100', hoverColor: 'hover:bg-yellow-200' },
                  { value: 'guardian', label: 'Guardian', bgColor: 'bg-green-100', hoverColor: 'hover:bg-green-200' },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setRole(option.value as UserRole)}
                    className={`p-3 rounded-lg border-2 transition-colors ${
                      role === option.value
                        ? `border-blue-600 ${option.bgColor}`
                        : `border-gray-200 ${option.hoverColor}`
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-2 px-4 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors ${
                isLoading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? 'Creating Account...' : 'Register'}
            </button>
          </form>

          <div className="mt-4 text-center text-gray-600">
            <p>
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
