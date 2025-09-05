import api from "./api";

// Admin Dashboard
export const getAdminDashboardStats = async () => {
  try {
    const response = await api.get('/admin/dashboard/stats');
    return response.data;
  } catch (error) {
    console.error('Error fetching admin dashboard stats:', error);
    throw error;
  }
};

// User Management
export const getAllUsers = async () => {
  try {
    const response = await api.get('/admin/users');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const getUserById = async (userId) => {
  try {
    const response = await api.get(`/admin/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

export const updateUser = async (userId, userData) => {
  try {
    const response = await api.put(`/admin/users/${userId}`, userData);
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await api.delete(`/admin/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

export const suspendUser = async (userId) => {
  try {
    const response = await api.put(`/admin/users/${userId}/suspend`);
    return response.data;
  } catch (error) {
    console.error('Error suspending user:', error);
    throw error;
  }
};

export const activateUser = async (userId) => {
  try {
    const response = await api.put(`/admin/users/${userId}/activate`);
    return response.data;
  } catch (error) {
    console.error('Error activating user:', error);
    throw error;
  }
};

// Account Management
export const getAllAccounts = async () => {
  try {
    const response = await api.get('/admin/accounts');
    return response.data;
  } catch (error) {
    console.error('Error fetching accounts:', error);
    throw error;
  }
};

export const getAccountById = async (accountId) => {
  try {
    const response = await api.get(`/admin/accounts/${accountId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching account:', error);
    throw error;
  }
};

export const updateAccount = async (accountId, accountData) => {
  try {
    const response = await api.put(`/admin/accounts/${accountId}`, accountData);
    return response.data;
  } catch (error) {
    console.error('Error updating account:', error);
    throw error;
  }
};

export const freezeAccount = async (accountId) => {
  try {
    const response = await api.put(`/admin/accounts/${accountId}/freeze`);
    return response.data;
  } catch (error) {
    console.error('Error freezing account:', error);
    throw error;
  }
};

export const unfreezeAccount = async (accountId) => {
  try {
    const response = await api.put(`/admin/accounts/${accountId}/unfreeze`);
    return response.data;
  } catch (error) {
    console.error('Error unfreezing account:', error);
    throw error;
  }
};

// Transaction Management
export const getAllTransactions = async () => {
  try {
    const response = await api.get('/admin/transactions');
    return response.data;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  }
};

export const getTransactionById = async (transactionId) => {
  try {
    const response = await api.get(`/admin/transactions/${transactionId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching transaction:', error);
    throw error;
  }
};

// Loan Management
export const getAllLoans = async () => {
  try {
    const response = await api.get('/admin/loans');
    return response.data;
  } catch (error) {
    console.error('Error fetching loans:', error);
    throw error;
  }
};

export const approveLoan = async (loanId) => {
  try {
    const response = await api.put(`/admin/loans/${loanId}/approve`);
    return response.data;
  } catch (error) {
    console.error('Error approving loan:', error);
    throw error;
  }
};

export const rejectLoan = async (loanId, reason) => {
  try {
    const response = await api.put(`/admin/loans/${loanId}/reject`, { reason });
    return response.data;
  } catch (error) {
    console.error('Error rejecting loan:', error);
    throw error;
  }
};

// Admin Management
export const getAllAdmins = async () => {
  try {
    const response = await api.get('/admin/admins');
    return response.data;
  } catch (error) {
    console.error('Error fetching admins:', error);
    throw error;
  }
};

export const createAdmin = async (adminData) => {
  try {
    const response = await api.post('/admin/admins', adminData);
    return response.data;
  } catch (error) {
    console.error('Error creating admin:', error);
    throw error;
  }
};

export const updateAdmin = async (adminId, adminData) => {
  try {
    const response = await api.put(`/admin/admins/${adminId}`, adminData);
    return response.data;
  } catch (error) {
    console.error('Error updating admin:', error);
    throw error;
  }
};

export const deleteAdmin = async (adminId) => {
  try {
    const response = await api.delete(`/admin/admins/${adminId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting admin:', error);
    throw error;
  }
};
