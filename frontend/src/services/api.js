import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:8080/api",
});

api.interceptors.request.use(
  (config) => {
    let token = null;
    
    // Determine which token to use based on the URL
    if (config.url?.includes('/admin/')) {
      // Use admin token for admin endpoints
      token = localStorage.getItem('adminToken');
      console.log('API Request - Using admin token for admin endpoint');
    } else if (config.url?.includes('/auth/')) {
      // No token needed for auth endpoints (login, register)
      console.log('API Request - Auth endpoint, no token required');
      return config;
    } else {
      // Use user token for customer endpoints
      token = localStorage.getItem('token');
      console.log('API Request - Using user token for customer endpoint');
    }
    
    console.log('API Request - Token exists:', !!token);
    console.log('API Request - URL:', config.url);
    console.log('API Request - Admin token available:', !!localStorage.getItem('adminToken'));
    console.log('API Request - User token available:', !!localStorage.getItem('token'));
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('API Request - Authorization header set');
    } else {
      console.log('API Request - No appropriate token found');
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
    if (error.response?.status === 401) {
      // Clear both admin and user tokens on 401
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
    