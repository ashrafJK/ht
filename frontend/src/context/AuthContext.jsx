import React, { createContext, useContext, useState, useEffect } from 'react';
import API from '../services/api';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [tutorProfile, setTutorProfile] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);

  // Check auth state on mount
  useEffect(() => {
    const fetchMe = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const { data } = await API.get('/auth/me');
        setUser({
          _id: data._id,
          name: data.name,
          email: data.email,
          phone: data.phone,
          role: data.role,
          status: data.status,
        });
        setTutorProfile(data.tutorProfile || null);
      } catch (err) {
        console.error('Failed to authenticate stored token:', err.message);
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        setTutorProfile(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMe();
  }, [token]);

  // Login function (works for both Tutors & Admin)
  const login = async (email, password) => {
    try {
      const { data } = await API.post('/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      setToken(data.token);
      setUser({
        _id: data._id,
        name: data.name,
        email: data.email,
        phone: data.phone,
        role: data.role,
        status: data.status,
      });
      setTutorProfile(data.tutorProfile || null);
      toast.success(`Welcome back, ${data.name}!`);
      return data;
    } catch (err) {
      toast.error(err.message || 'Login failed');
      throw err;
    }
  };

  // Tutor Register function
  const register = async (registerData) => {
    try {
      const { data } = await API.post('/auth/register', registerData);
      localStorage.setItem('token', data.token);
      setToken(data.token);
      setUser({
        _id: data._id,
        name: data.name,
        email: data.email,
        phone: data.phone,
        role: data.role,
        status: data.status,
      });
      setTutorProfile(data.tutorProfile || null);
      toast.success('Registration successful! Welcome to Home Tutor BD.');
      return data;
    } catch (err) {
      toast.error(err.message || 'Registration failed');
      throw err;
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setTutorProfile(null);
    toast.success('Logged out successfully');
  };

  // Update tutor profile in context state after edit
  const updateTutorProfileState = (updatedProfile) => {
    setTutorProfile(updatedProfile);
    if (user && updatedProfile.name) {
      setUser((prev) => ({ ...prev, name: updatedProfile.name }));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        tutorProfile,
        token,
        loading,
        login,
        register,
        logout,
        updateTutorProfileState,
        isAdmin: user?.role === 'admin',
        isTutor: user?.role === 'tutor',
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
