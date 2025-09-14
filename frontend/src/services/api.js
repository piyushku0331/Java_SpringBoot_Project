import axios from "axios";

// JWT token validation utility
const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Date.now() / 1000;
    return payload.exp < currentTime;
  } catch (error) {
    console.error('Error parsing token:', error);
    return true;
  }
};

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:8080/api",
});

api.interceptors.request.use(
  (config) => {
    let token = null;

    // Determine which token to use based on the URL
    if (config.url?.includes('/admin/')) {
      token = localStorage.getItem('adminToken');
      console.log('API Request - Admin endpoint, checking adminToken:', !!token);
    } else if (config.url?.includes('/auth/')) {
      // No token needed for auth endpoints (login, register)
      console.log('API Request - Auth endpoint, no token needed:', config.url);
      return config;
    } else {
      token = localStorage.getItem('token');
      console.log('API Request - Regular endpoint, checking token:', !!token);
    }

    console.log('API Request - URL:', config.url);
    console.log('API Request - Full localStorage keys:', Object.keys(localStorage));
    console.log('API Request - localStorage token value:', localStorage.getItem('token'));
    console.log('API Request - localStorage adminToken value:', localStorage.getItem('adminToken'));

    if (token) {
      // Check if token is expired
      if (isTokenExpired(token)) {
        console.log('API Request - Token is expired, clearing localStorage');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminInfo');
        // Redirect to login
        window.location.href = '/login';
        return Promise.reject(new Error('Token expired'));
      }

      config.headers.Authorization = `Bearer ${token}`;
      console.log('API Request - Authorization header set to:', `Bearer ${token.substring(0, 20)}...`);
      console.log('API Request - Full config headers:', config.headers);
    } else {
      console.log('API Request - No token found, request will fail authentication');
      console.log('API Request - Current user from localStorage:', localStorage.getItem('user'));
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      console.error('Authentication error:', error.response.status, error.response.data);

      // Clear both admin and user tokens on 401/403
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminInfo');

      // Redirect based on current path
      const currentPath = window.location.pathname;
      if (currentPath.includes('/admin')) {
        window.location.href = '/admin/login';
      } else {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
    