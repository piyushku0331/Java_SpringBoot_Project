import api from "./api";

export const applyLoan = (data) => api.post("/loans/apply", data);
export const getLoanStatus = () => api.get("/loans/status");

export const getCustomerLoans = async (userId) => {
  if (!userId) {
    throw new Error("User ID is required to fetch loans.");
  }
  try {
    console.log("loanService: Fetching loans for userId:", userId);
    const response = await api.get(`/customer/loans?userId=${userId}`);
    console.log("loanService: Received loans:", response.data);
    return response.data;
  } catch (error) {
    console.error("loanService: Error fetching customer loans:", error);
    console.error("loanService: Error response:", error.response);
    throw error;
  }
};

export const getLoanDetails = async (loanId) => {
  try {
    const response = await api.get(`/customer/loans/${loanId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching loan details:", error);
    throw error;
  }
};

export const makeLoanPayment = async (loanId, paymentData) => {
  try {
    const response = await api.post(`/customer/loans/${loanId}/payments`, paymentData);
    return response.data;
  } catch (error) {
    console.error("Error making loan payment:", error);
    throw error;
  }
};

export const getLoanPaymentSchedule = async (loanId) => {
  try {
    const response = await api.get(`/customer/loans/${loanId}/payment-schedule`);
    return response.data;
  } catch (error) {
    console.error("Error fetching loan payment schedule:", error);
    throw error;
  }
};
