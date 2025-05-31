import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser, UserRole } from '../../contexts/UserContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { user, isAuthenticated } = useUser();

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  if (user && !allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard if authenticated but wrong role
    switch (user.role) {
      case 'student':
        return <Navigate to="/student" replace />;
      case 'teacher':
        return <Navigate to="/teacher" replace />;
      case 'guardian':
        return <Navigate to="/guardian" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  // If authenticated and has correct role, render children
  return <>{children}</>;
};

export default ProtectedRoute;