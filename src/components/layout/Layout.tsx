import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { useUser } from '../../contexts/UserContext';

const Layout = () => {
  const { isAuthenticated, user } = useUser();
  
  // Determine if we should show the full navbar or a simple one
  const isFullNavbar = isAuthenticated && user?.role;
  
  return (
    <div className="flex flex-col min-h-screen bg-blue-50">
      <Navbar 
        isAuthenticated={isAuthenticated} 
        userRole={user?.role} 
        username={user?.username}
      />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;