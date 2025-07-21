import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: 'http://localhost:5000',
  timeout: 10000,
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Only redirect if we had a token (meaning user was authenticated)
      const token = localStorage.getItem('access_token');
      if (token) {
        // Token expired or invalid
        clearAuth();
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export const authUtils = {
  // Save auth data to localStorage
  saveAuth: (token: string, user: { role: string; id: string; email: string; full_name?: string; username?: string }) => {
    localStorage.setItem('access_token', token);
    localStorage.setItem('user_role', user.role);
    localStorage.setItem('user_id', user.id);
    localStorage.setItem('user_email', user.email);
    localStorage.setItem('user_name', user.full_name || user.username || '');
    localStorage.setItem('auth_timestamp', Date.now().toString());
  },

  getCurrentUser: () => {
    const token = localStorage.getItem('access_token');
    const role = localStorage.getItem('user_role');
    const id = localStorage.getItem('user_id');
    const email = localStorage.getItem('user_email');
    const name = localStorage.getItem('user_name');
    
    if (!token || !role) return null;
    
    return { token, role, id, email, name };
  },

  isAuthenticated: () => {
    const token = localStorage.getItem('access_token');
    const timestamp = localStorage.getItem('auth_timestamp');
    
    if (!token || !timestamp) return false;
    
    const now = Date.now();
    const authTime = parseInt(timestamp);
    const hoursSinceAuth = (now - authTime) / (1000 * 60 * 60);
    
    if (hoursSinceAuth > 24) {
      clearAuth();
      return false;
    }
    
    return true;
  },

  getUserRole: () => {
    return localStorage.getItem('user_role');
  },

  clearAuth: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_role');
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_email');
    localStorage.removeItem('user_name');
    localStorage.removeItem('auth_timestamp');
    localStorage.removeItem('temp_email');
  },

  // Get dashboard route based on role
  getDashboardRoute: (role: string) => {
    switch (role) {
      case 'admin':
      case 'hod':
        return '/dashboard/hod';
      case 'super-admin':
        return '/dashboard/super-admin';
      case 'student':
        return '/dashboard/student';
      case 'parent':
        return '/dashboard/parent';
      default:
        return '/dashboard/hod';
    }
  }
};

export const clearAuth = authUtils.clearAuth;

export default api;
