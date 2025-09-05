import api from "./api";

// User authentication
export const loginUser = (data) => api.post("/auth/login", data);
export const registerUser = (data) => api.post("/auth/register", data);
export const resetPassword = (data) => api.post("/auth/reset-password", data);

// Admin authentication
export const loginAdmin = async (data) => {
  try {
    const response = await api.post("/admin/login", data);
    if (response.data.token) {
      localStorage.setItem('adminToken', response.data.token);
      localStorage.setItem('adminInfo', JSON.stringify(response.data.admin || response.data.user));
    }
    return response.data;
  } catch (error) {
    console.error('Admin login error:', error);
    throw error;
  }
};

export const logoutAdmin = () => {
  localStorage.removeItem('adminToken');
  localStorage.removeItem('adminInfo');
};

export const logoutUser = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};
