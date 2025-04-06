import axios, { type AxiosResponse, AxiosError } from "axios";
import router from "@/router";
import { authService } from "./auth-service";

const axiosClient = axios.create({
  baseURL: "http://localhost:8080/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = authService.getToken();

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response && error.response.status === 401) {
      if (
        router.currentRoute.value.name !== "sign-in" &&
        router.currentRoute.value.name !== "sign-up"
      ) {
        authService.logout();
      }
    }

    return Promise.reject(error);
  },
);
