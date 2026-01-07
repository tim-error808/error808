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
    if (originalRequest.url === "/user") {
      try {
        await api.post("/auth/refresh");
        return api(originalRequest);
      } catch (error) {
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
