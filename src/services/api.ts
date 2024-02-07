import axios from "axios";

const API_URL = "http://localhost:3000";

export const api = axios.create({
  baseURL: API_URL,
});

declare module "axios" {
  export interface AxiosRequestConfig {
    silent?: boolean;
  }
}

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    if (response.data.access_token) localStorage.setItem("access_token", response.data.access_token);
    return response;
  },
  (error) => {
    if (error.response.status === 401) window.location.replace("http://localhost:3333/signin");
    return Promise.reject(error);
  }
);
