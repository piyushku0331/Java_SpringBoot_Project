// Authentication Test Utility
// Use this to check if you're properly authenticated

export const checkAuthStatus = () => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  
  console.log('=== Authentication Status ===');
  console.log('Token exists:', !!token);
  console.log('User exists:', !!user);
  
  if (token) {
    console.log('Token preview:', token.substring(0, 20) + '...');
    try {
      // Decode JWT payload (without verification)
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log('Token payload:', payload);
      console.log('Token expires:', new Date(payload.exp * 1000));
      console.log('Token is expired:', new Date(payload.exp * 1000) < new Date());
    } catch (e) {
      console.log('Error parsing token:', e.message);
    }
  }
  
  if (user) {
    try {
      const userData = JSON.parse(user);
      console.log('User data:', userData);
    } catch (e) {
      console.log('Error parsing user data:', e.message);
    }
  }
  
  console.log('==============================');
  
  return {
    hasToken: !!token,
    hasUser: !!user,
    isAuthenticated: !!(token && user)
  };
};

// Clear authentication data
export const clearAuth = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  console.log('Authentication data cleared');
};
