'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Create auth context
const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
  isAdmin: false,
  isLoading: true,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
});

// Admin credentials for direct login (development only)
const ADMIN_EMAIL = 'admin@bemsvuns.com';
const ADMIN_PASSWORD = 'admin123';

// Get API URL from environment variables
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// Auth provider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Check for stored admin session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsLoading(true);
        
        // First check localStorage for admin login (development only)
        const storedUser = localStorage.getItem('bemsvuns_user');
        if (storedUser) {
          try {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            setIsAuthenticated(true);
            setIsAdmin(parsedUser.role === 'admin');
            setIsLoading(false);
            return;
          } catch (e) {
            // Invalid JSON in localStorage
            localStorage.removeItem('bemsvuns_user');
          }
        }
        
        // Skip API check if backend is not running
        console.log("API check skipped - using local authentication only");
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (credentials) => {
    try {
      setIsLoading(true);
      
      // Check for hardcoded admin credentials first
      if (credentials.email === ADMIN_EMAIL && credentials.password === ADMIN_PASSWORD) {
        const adminUser = {
          id: 1,
          name: 'Admin BEM SV UNS',
          email: ADMIN_EMAIL,
          role: 'admin'
        };
        
        setUser(adminUser);
        setIsAuthenticated(true);
        setIsAdmin(true);
        
        // Store in localStorage for persistence
        localStorage.setItem('bemsvuns_user', JSON.stringify(adminUser));
        
        return { success: true };
      }
      
      // If credentials don't match admin, return error
      return {
        success: false,
        error: 'Invalid credentials. Please check your email and password.'
      };
    } catch (error) {
      return { 
        success: false, 
        error: 'Login failed. Please try again.' 
      };
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      setIsLoading(true);
      // For now, just return success with mock data
      const newUser = {
        id: 2,
        name: userData.name,
        email: userData.email,
        role: 'user'
      };
      
      setUser(newUser);
      setIsAuthenticated(true);
      setIsAdmin(false);
      
      localStorage.setItem('bemsvuns_user', JSON.stringify(newUser));
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: 'Registration failed. Please try again.' 
      };
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      setIsLoading(true);
      
      // Clear localStorage
      localStorage.removeItem('bemsvuns_user');
      
      setUser(null);
      setIsAuthenticated(false);
      setIsAdmin(false);
      router.push('/sign-in');
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      return { 
        success: false, 
        error: 'Logout failed.' 
      };
    } finally {
      setIsLoading(false);
    }
  };

  // Context value
  const value = {
    user,
    isAuthenticated,
    isAdmin,
    isLoading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook for using auth context
export function useAuth() {
  return useContext(AuthContext);
}
