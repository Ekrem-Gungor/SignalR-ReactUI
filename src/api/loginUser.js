import api from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export const loginApi = async (userName, password) => {
  try {
    const formData = new FormData();
    formData.append("UserName", userName);
    formData.append("Password", password);
    const response = await api.post(`${BASE_URL}/api/Auth/login`, formData);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
