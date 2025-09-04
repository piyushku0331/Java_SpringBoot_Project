import api from "./api";

export const getTransactions = async (accountId = null) => {
  try {
    if (!accountId) {
      throw new Error("Account ID is required to fetch transactions");
    }
    console.log(`Fetching transactions for account ID: ${accountId}`);
    const response = await api.get(`/transactions?accountId=${accountId}`);
    console.log('Transaction API response:', response);
    console.log('Transaction data:', response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    console.error("Error response:", error.response);
    throw error;
  }
};

export const getTransactionDetails = async (transactionId) => {
  try {
    const response = await api.get(`/transactions/${transactionId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching transaction details:", error);
    throw error;
  }
};

export const getAccountTransactions = async (accountId) => {
  try {
    const response = await api.get(`/accounts/${accountId}/transactions`);
    return response.data;
  } catch (error) {
    console.error("Error fetching account transactions:", error);
    throw error;
  }
};

export const transferFunds = async (data) => {
  try {
    const response = await api.post("/transactions/transfer", data);
    return response.data;
  } catch (error) {
    console.error("Error transferring funds:", error);
    throw error;
  }
};

export const createTransaction = async (transactionData) => {
  try {
    const response = await api.post("/transactions", transactionData);
    return response.data;
  } catch (error) {
    console.error("Error creating transaction:", error);
    throw error;
  }
};

export const updateTransaction = async (transactionId, transactionData) => {
  try {
    const response = await api.put(`/transactions/${transactionId}`, transactionData);
    return response.data;
  } catch (error) {
    console.error("Error updating transaction:", error);
    throw error;
  }
};

export const deleteTransaction = async (transactionId) => {
  try {
    const response = await api.delete(`/transactions/${transactionId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting transaction:", error);
    throw error;
  }
};
