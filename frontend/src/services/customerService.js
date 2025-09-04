import api from "./api";

export const getAccounts = () => api.get("/accounts");

export const getCustomerAccounts = async (userId) => {
  try {
    console.log("Fetching accounts for userId:", userId);
    const response = await api.get("/customer/accounts", { params: { userId } });
    console.log("Accounts response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching customer accounts:", error);
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

export const closeAccount = async (accountId) => {
  try {
    const response = await api.delete(`/customer/accounts/${accountId}`);
    return response.data;
  } catch (error) {
    console.error("Error closing account:", error);
    throw error;
  }
};
