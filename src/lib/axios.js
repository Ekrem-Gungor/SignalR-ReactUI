import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: `${BASE_URL}/api`, // senin API adresin
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("AccessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (err) => {
    const originalRequest = err.config;

    // Eğer 401 Unauthorized hatası varsa
    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      localStorage.removeItem("AccessToken");
      window.location.href = "/"; // Şuanda giriş sayfasına yönlendiriliyor. Error sayfaları yapıldığında burada 401 hata sayfasına yönlendirme işlemi yapılacak.
    }

    return Promise.reject(err);
  }
);

export default api;
