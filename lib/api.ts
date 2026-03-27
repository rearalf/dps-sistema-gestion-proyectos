import axios from "axios";
import { useAuthStore } from "@/store/useAuthStore";

// Cliente HTTP para el frontend
export const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Instancia de axios para el servidor
const JSON_SERVER_URL = process.env.JSON_SERVER_URL || "http://localhost:3001";

const jsonServerApi = axios.create({
  baseURL: JSON_SERVER_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function fetchFromJsonServer<T = unknown>(
  path: string,
  options?: { method?: string; data?: unknown }
): Promise<T> {
  const response = await jsonServerApi.request<T>({
    url: path,
    method: options?.method || "GET",
    data: options?.data,
  });
  return response.data;
}
