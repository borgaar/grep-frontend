import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  AxiosError,
} from "axios";
import router from "@/router";
import { authService } from "./auth-service";

interface HttpService {
  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
  post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
  patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
}

class ApiService implements HttpService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: "http://localhost:8080/api/",
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    this.api.interceptors.request.use(
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

    this.api.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error: AxiosError) => {
        if (error.response && error.response.status === 401) {
          if (router.currentRoute.value.name !== "sign-in") {
            authService.logout();
          }
        }

        return Promise.reject(error);
      },
    );
  }

  public get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.api.get<T>(url, config);
  }

  public post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.api.post<T>(url, data, config);
  }

  public put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.api.put<T>(url, data, config);
  }

  public patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.api.patch<T>(url, data, config);
  }

  public delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.api.delete<T>(url, config);
  }
}

export const httpClient = new ApiService();
