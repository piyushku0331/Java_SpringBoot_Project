import api from "./api";

export const loginUser = (data) => api.post("/auth/login", data);
export const registerUser = (data) => api.post("/auth/register", data);
export const resetPassword = (data) => api.post("/auth/reset-password", data);
