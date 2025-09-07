import api from "./api";

export const applyLoan = (data) => api.post("/loans/apply", data);
export const getLoanStatus = () => api.get("/loans/status");

export const getCustomerLoans = async (userId) => {
  if (!userId) {
    throw new Error("User ID is required to fetch loans.");
  }
  
  console.log("=== loanService: Starting loan fetch ===");
  console.log("loanService: userId:", userId);
  console.log("loanService: token available:", !!localStorage.getItem('token'));
  
  const endpoints = [
    `/customer/loans/${userId}`,
    `/customer/loans?userId=${userId}`,
    `/customer/${userId}/loans`,
    `/loans/customer/${userId}`,
    `/loans`
  ];
  
  for (let i = 0; i < endpoints.length; i++) {
    const endpoint = endpoints[i];
    try {
      console.log(`loanService: Trying endpoint ${i + 1}/${endpoints.length}: ${endpoint}`);
      const response = await api.get(endpoint);
      console.log(`loanService: SUCCESS on endpoint ${endpoint}:`, response.data);
      console.log(`loanService: Response status:`, response.status);
      console.log(`loanService: Response headers:`, response.headers);
      return response.data;
    } catch (error) {
      console.log(`loanService: FAILED on endpoint ${endpoint}:`, error.response?.status, error.message);
      if (error.response) {
        console.log(`loanService: Error details:`, error.response.data);
      }
      
      // Continue to next endpoint unless it's the last one
      if (i === endpoints.length - 1) {
        console.error("loanService: All endpoints failed, returning empty array");
        return [];
      }
    }
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
