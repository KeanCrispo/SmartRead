import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define user roles
export type UserRole = 'student' | 'teacher' | 'guardian';

// Define user interface
export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
}

// Define context interface
interface UserContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

// Create context with default values
const UserContext = createContext<UserContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
});

// Create a custom hook for using this context
export const useUser = () => useContext(UserContext);

// Provider component
export const UserProvider = ({ children }: { children: ReactNode }) => {
  // Check if user exists in local storage
  const storedUser = localStorage.getItem('smartread_user');
  const [user, setUser] = useState<User | null>(storedUser ? JSON.parse(storedUser) : null);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('smartread_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('smartread_user');
  };

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};