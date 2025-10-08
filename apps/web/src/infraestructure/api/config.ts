import axios from "axios";
import { useGlobalStore } from "../../core/store/global_store";

export const ApiIntance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Replace with your API endpoint
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Enable cookies for cross-site requests
});

// Add a request interceptor to inject the token
ApiIntance.interceptors.request.use(
  (config) => {
    const token = useGlobalStore.getState().token; // 🔥 obtiene token actual de Zustand
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: Add a response interceptor to handle token expiration
// ApiIntance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       // Attempt to refresh token or redirect to login
//       // e.g., await refreshToken(); or router.push("/login");
//       return ApiIntance(originalRequest);
//     }
//     return Promise.reject(error);
//   }
// );

