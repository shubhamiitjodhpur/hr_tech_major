import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  switchRole: (role: UserRole) => void; // For demo purposes only
}

// Sample user data for demonstration
const mockUsers: Record<UserRole, User> = {
  'hr-admin': {
    id: '1',
    name: 'Alex Morgan',
    email: 'alex@company.com',
    role: 'hr-admin',
    department: 'Human Resources',
    position: 'HR Director',
    avatar: 'https://images.pexels.com/photos/1840608/pexels-photo-1840608.jpeg?auto=compress&cs=tinysrgb&w=96'
  },
  'manager': {
    id: '2',
    name: 'Jamie Wilson',
    email: 'jamie@company.com',
    role: 'manager',
    department: 'Engineering',
    position: 'Engineering Manager',
    avatar: 'https://images.pexels.com/photos/2951142/pexels-photo-2951142.jpeg?auto=compress&cs=tinysrgb&w=96'
  },
  'employee': {
    id: '3',
    name: 'Taylor Reed',
    email: 'taylor@company.com',
    role: 'employee',
    department: 'Marketing',
    position: 'Marketing Specialist',
    avatar: 'https://images.pexels.com/photos/3786525/pexels-photo-3786525.jpeg?auto=compress&cs=tinysrgb&w=96'
  }
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => {},
  logout: () => {},
  switchRole: () => {}
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in (could use localStorage in a real app)
    const storedRole = localStorage.getItem('userRole') as UserRole | null;
    if (storedRole && mockUsers[storedRole]) {
      setUser(mockUsers[storedRole]);
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo, set a default role of hr-admin
      const role: UserRole = 'hr-admin';
      setUser(mockUsers[role]);
      localStorage.setItem('userRole', role);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('userRole');
  };

  // For demo purposes - allows switching between different user roles
  const switchRole = (role: UserRole) => {
    if (mockUsers[role]) {
      setUser(mockUsers[role]);
      localStorage.setItem('userRole', role);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
};