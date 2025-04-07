import router from "@/router";
import { useUserStore } from "@/state/user";
import axios, { type AxiosResponse } from "axios";
import { jwtDecode } from "jwt-decode";

const API_URL = "http://localhost:8080/api/auth";

interface DecodedToken {
  // Phone number
  sub: string;

  /// Issue-date: seconds since epoch
  iat: number;

  /// Expire-date: seconds since epoch
  exp: number;
}

interface AuthService {
  getToken(): string | null;
  isAuthenticated(): boolean;
  login(phone: string, password: string): Promise<AxiosResponse<any, any>>;
  register(
    phone: string,
    password: string,
    firstName: string,
    lastName: string,
  ): Promise<AxiosResponse<any, any>>;
  logout(): void;
}

export class AuthApiService implements AuthService {
  getToken(): string | null {
    throw new Error("Method not implemented.");
  }
  private axiosClient = axios.create({
    baseURL: API_URL,
    validateStatus: () => true, // Accept all status codes
    headers: {
      "Content-Type": "application/json",
    },
  });

  private storeToken(token: string): void {
    localStorage.setItem("Authorization", token);
  }

  public static getToken(): string | null {
    return localStorage.getItem("Authorization");
  }

  public isAuthenticated(): boolean {
    return !this.isTokenExpired();
  }

  public async login(phone: string, password: string): Promise<AxiosResponse<any, any>> {
    const response = await this.axiosClient.post("/login", {
      phone: phone,
      password: password,
      // TODO: This is temporary as login and register uses same RequestBody class in backend
      firstName: "temp",
      lastName: "orary",
    });

    if (response.data.token) {
      this.storeToken(response.data.token);
    }

    useUserStore().set({
      firstName: response.data.firstName,
      lastName: response.data.lastName,
      phone: response.data.phone,
      role: "admin", // response.data.role,
    });

    return response;
  }

  public async register(
    phone: string,
    password: string,
    firstName: string,
    lastName: string,
  ): Promise<AxiosResponse<any, any>> {
    try {
      const response = await this.axiosClient.post("/register", {
        phone,
        password,
        firstName,
        lastName,
      });

      if (response.data.token) {
        this.storeToken(response.data.token);
      }

      return response;
    } catch (error) {
      throw error;
    }
  }

  public logout(): void {
    localStorage.removeItem("Authorization");
    router.push({ name: "sign-in" });
  }

  private decodeToken(): DecodedToken | null {
    const token = AuthApiService.getToken();
    if (!token) return null;

    try {
      return jwtDecode(token);
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  private isTokenExpired(): boolean {
    const decoded = this.decodeToken();
    if (!decoded) return true;

    return decoded.exp * 1000 < Date.now();
  }
}

export const authService = new AuthApiService();
