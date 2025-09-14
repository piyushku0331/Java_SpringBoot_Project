import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, registerUser } from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (storedUser && token) {
      try {
        // Check if token is expired
        const isExpired = (() => {
          try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const currentTime = Date.now() / 1000;
            return payload.exp < currentTime;
          } catch (error) {
            console.error('Error parsing token:', error);
            return true;
          }
        })();

        if (isExpired) {
          console.log('Stored token is expired, clearing localStorage');
          localStorage.removeItem('user');
          localStorage.removeItem('token');
        } else {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      setLoading(true);
      const response = await loginUser(credentials);
      
      // Handle different response structures
      let loggedInUser, token;
      if (response.data) {
        loggedInUser = response.data.user || response.data;
        token = response.data.token;
      } else {
        loggedInUser = response.user || response;
        token = response.token;
      }

      console.log('Login - User:', loggedInUser);
      console.log('Login - Token:', token);

      if (loggedInUser) {
        setUser(loggedInUser);
        localStorage.setItem('user', JSON.stringify(loggedInUser));
      }
      
      if (token) {
        localStorage.setItem('token', token);
      }

      return { success: true, user: loggedInUser, token };
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        error: error.response?.data?.error || 'Login failed'
      };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      console.log('Registration attempt with data:', userData);
      const response = await registerUser(userData);
      console.log('Registration API response:', response);
      
      // Handle different response structures
      let newUser, token;
      if (response.data) {
        newUser = response.data.user || response.data;
        token = response.data.token;
      } else {
        newUser = response.user || response;
        token = response.token;
      }
      
      console.log('Parsed user from response:', newUser);
      console.log('Token from response:', token);

      if (newUser) {
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
      }
      
      if (token) {
        localStorage.setItem('token', token);
      }

      return { success: true, user: newUser, token };
    } catch (error) {
      console.error('Registration error:', error);
      console.error('Error response:', error.response);
      console.error('Error data:', error.response?.data);
      return {
        success: false,
        error: error.response?.data?.error || 'Registration failed'
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const value = {
    user,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
