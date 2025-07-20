"use client";
import { useState, useEffect } from 'react';
import { authUtils } from '@/lib/auth';

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  token: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = authUtils.getCurrentUser();
    if (currentUser && currentUser.id && currentUser.email && currentUser.name) {
      setUser({
        id: currentUser.id,
        email: currentUser.email,
        name: currentUser.name,
        role: currentUser.role,
        token: currentUser.token
      });
    }
    setLoading(false);
  }, []);

  const login = (token: string, userData: any) => {
    authUtils.saveAuth(token, userData);
    const currentUser = authUtils.getCurrentUser();
    if (currentUser && currentUser.id && currentUser.email && currentUser.name) {
      setUser({
        id: currentUser.id,
        email: currentUser.email,
        name: currentUser.name,
        role: currentUser.role,
        token: currentUser.token
      });
    }
  };

  const logout = () => {
    authUtils.clearAuth();
    setUser(null);
  };

  const isAuthenticated = () => {
    return authUtils.isAuthenticated();
  };

  const getUserRole = () => {
    return authUtils.getUserRole();
  };

  const getDashboardRoute = (role?: string) => {
    return authUtils.getDashboardRoute(role || user?.role || 'student');
  };

  return {
    user,
    loading,
    login,
    logout,
    isAuthenticated,
    getUserRole,
    getDashboardRoute
  };
};
