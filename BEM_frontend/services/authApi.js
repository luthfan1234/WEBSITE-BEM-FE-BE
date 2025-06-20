/**
 * Authentication API service for handling login, register, and auth state
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// Helper function for API calls
async function fetchAPI(endpoint, options = {}) {
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // Important for cookies/session
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(`${API_URL}${endpoint}`, mergedOptions);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  } catch (error) {
    console.error('Auth API error:', error);
    throw error;
  }
}

// Auth API methods
const authApi = {
  // Login user
  login: (credentials) => 
    fetchAPI('/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),
  
  // Register new user
  register: (userData) => 
    fetchAPI('/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),
  
  // Logout user
  logout: () => 
    fetchAPI('/logout', {
      method: 'POST',
    }),
  
  // Get current authenticated user
  getCurrentUser: () => 
    fetchAPI('/user'),
  
  // Check if user is authenticated
  checkAuth: async () => {
    try {
      const data = await fetchAPI('/user');
      return { isAuthenticated: true, user: data.user };
    } catch (error) {
      return { isAuthenticated: false, user: null };
    }
  },
  
  // Check if user is admin
  isAdmin: async () => {
    try {
      const data = await fetchAPI('/user/is-admin');
      return data.isAdmin;
    } catch (error) {
      return false;
    }
  }
};

export default authApi;
