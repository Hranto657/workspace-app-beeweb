import axios from "axios";
import { AuthAPI } from "@/services/auth.api";

let accessToken: string | null = null;

export const setAccessToken = (token: string) => {
  accessToken = token;
};

export const api = axios.create({
  baseURL: "http://localhost:4000/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    const isUnauthorized = error.response?.status === 401;
    const isNotRetry = !originalRequest._retry;
    const isNotRefreshEndpoint = originalRequest.url !== "/auth/refresh";

    if (isUnauthorized && isNotRetry && isNotRefreshEndpoint) {
      originalRequest._retry = true;

      try {
        const { accessToken: newToken } = await AuthAPI.refresh();
        setAccessToken(newToken);

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        setAccessToken("");
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
