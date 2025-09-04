import api from "./api";

export const getUserAccounts = async (userId) => {
  if (!userId) {
    throw new Error("User ID is required to fetch accounts.");
  }
  try {
    console.log("Frontend: Fetching accounts for userId:", userId);
    const response = await api.get(`/customer/accounts?userId=${userId}`);
    console.log("Frontend: Received accounts:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user accounts:", error);
    throw error;
  }
};

export const getAccountDetails = async (accountId) => {
  try {
    const response = await api.get(`/customer/accounts/${accountId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching account details:", error);
    throw error;
  }
};

export const createAccount = async (accountData) => {
  try {
    const response = await api.post("/customer/accounts", accountData);
    return response.data;
  } catch (error) {
    console.error("Error creating account:", error);
    throw error;
  }
};

export const updateAccount = async (accountId, accountData) => {
  try {
    const response = await api.put(`/customer/accounts/${accountId}`, accountData);
    return response.data;
  } catch (error) {
    console.error("Error updating account:", error);
    throw error;
  }
};

export const deleteAccount = async (accountId) => {
  try {
    const response = await api.delete(`/customer/accounts/${accountId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting account:", error);
    throw error;
  }
};

export const getAccountTransactions = async (accountId) => {
  try {
    const response = await api.get(`/customer/accounts/${accountId}/transactions`);
    return response.data;
  } catch (error) {
    console.error("Error fetching account transactions:", error);
    throw error;
  }
};
