import api from './auth';

// Example API calls that use the Authorization header automatically
export const apiService = {
  getUserProfile: async () => {
    const response = await api.get('/api/user/profile');
    return response.data;
  },

  getDashboardData: async (role: string) => {
    const response = await api.get(`/api/dashboard/${role}`);
    return response.data;
  },

  updateProfile: async (profileData: { name?: string; email?: string; [key: string]: unknown }) => {
    const response = await api.put('/api/user/profile', profileData);
    return response.data;
  },

  getAllUsers: async () => {
    const response = await api.get('/api/admin/users');
    return response.data;
  },

  getStudentRecords: async () => {
    const response = await api.get('/api/student/records');
    return response.data;
  },
  getStudentDetails: async (studentId: string) => {
  const response = await api.post('/students/details', { studentId });
  return response.data;
},


  // HOD-specific routes
  getSchoolStats: async () => {
    const response = await api.get('/api/hod/stats');
    return response.data;
  }
};

export const routeProtection = {
  // Check if user can access a route based on role
  canAccess: (userRole: string, requiredRole: string | string[]) => {
    if (Array.isArray(requiredRole)) {
      return requiredRole.includes(userRole);
    }
    return userRole === requiredRole;
  },

  getAllowedRoutes: (role: string) => {
    const baseRoutes = ['/dashboard', '/profile'];
    
    switch (role) {
      case 'admin':
      case 'hod':
        return [...baseRoutes, '/dashboard/admin', '/admin', '/manage-users'];
      case 'student':
        return [...baseRoutes, '/dashboard/student', '/records', '/health-data'];
      default:
        return baseRoutes;
    }
  }
};
