import axios from "axios";
import ModeConfig from "../config/ModeConfig";

const { apiUri } = ModeConfig();

const api = axios.create({
  baseURL: apiUri,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await api.post("/auth/refresh");
        return api(originalRequest);
      } catch (refreshError) {
        console.error(refreshError.response.data.message);
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
