import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { users } from '../data/mockData';

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string) => Promise<void>;
  logout: () => void;
  switchRole: (role: UserRole) => void; // For demo purposes
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is stored in localStorage (for demo purposes)
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string) => {
    setLoading(true);
    try {
      // Mock login - in a real app, this would make an API call
      const user = users.find(u => u.email === email);
      if (!user) {
        throw new Error('Invalid credentials');
      }
      
      // In a real app, we would validate the password here
      
      setCurrentUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  // For demo purposes - switch between roles
  const switchRole = (role: UserRole) => {
    const userWithRole = users.find(u => u.role === role);
    if (userWithRole) {
      setCurrentUser(userWithRole);
      localStorage.setItem('currentUser', JSON.stringify(userWithRole));
    }
  };

  const value = {
    currentUser,
    isAuthenticated: !!currentUser,
    loading,
    login,
    logout,
    switchRole
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};