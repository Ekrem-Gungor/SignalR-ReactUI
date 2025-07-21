import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: `${BASE_URL}/api`, // senin API adresin
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwtToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (err) => {
    const originalRequest = err.config;

    // Token expired hatası
    if (
      err.response?.status === 401 &&
      !originalRequest._retry &&
      localStorage.getItem("refreshToken")
    ) {
      originalRequest._retry = true;
      try {
        const resp = await axios.post(`${BASE_URL}/api/auth/refresh-token`, {
          refresToken: localStorage.getItem("refreshToken"),
        });

        const newToken = resp.data.token;
        localStorage.setItem("jwtToken", newToken);
        api.defaults.headers.Authorization = `Bearer ${newToken}`;
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/auth/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(err);
  }
);

export default api;
