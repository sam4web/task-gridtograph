import type { IApiResponse } from "@repo/shared";
import axios, { type AxiosResponse } from "axios";

import { env } from "~/config/env";
import { useAuthStore } from "~/store/auth-store";

export const apiClient = axios.create({
  baseURL: `${env.VITE_API_BASE_URL}/api`,
  withCredentials: true,
});

apiClient.interceptors.response.use(
  <T>(res: AxiosResponse<IApiResponse<T>>): T => {
    return res.data.data as T;
  },
  (err) => {
    const message = err.response?.data?.message || "Something went wrong";
    return Promise.reject(new Error(message));
  },
);

apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
  return config;
});
