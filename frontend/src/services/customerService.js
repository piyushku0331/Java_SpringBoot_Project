import api from "./api";

export const getAccounts = () => api.get("/accounts");

export const getCustomerAccounts = async (userId) => {
  try {
    console.log("Fetching accounts for userId:", userId);
    // Skip the problematic endpoint and use the working one directly
    let response;
    try {
      // Use the working endpoint with query parameter
      response = await api.get("/customer/accounts", { params: { userId } });
      console.log("Accounts response:", response.data);
      return Array.isArray(response.data) ? response.data : [];
    } catch (firstError) {
      console.log("Customer accounts endpoint failed, trying generic:", firstError.message);
      try {
        // Fallback to generic accounts endpoint
        response = await api.get("/accounts");
        console.log("Generic accounts response:", response.data);
        return Array.isArray(response.data) ? response.data : [];
      } catch (secondError) {
        console.log("All endpoints failed:", secondError.message);
        return [];
      }
    }
  } catch (error) {
    console.error("Error fetching customer accounts:", error);
    // Return empty array instead of throwing to prevent UI crash
    return [];
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
