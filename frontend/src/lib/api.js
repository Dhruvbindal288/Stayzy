import axiosInstance from "./axios";
export const login= async (formData) => {
      const response = await axiosInstance.post("/auth/login", formData);
      return response.data;
    }
