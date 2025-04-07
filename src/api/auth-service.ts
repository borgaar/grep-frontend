import router from "@/router";
import { useUserStore } from "@/state/user";
import axios, { type AxiosResponse } from "axios";
import { jwtDecode } from "jwt-decode";
import { AuthControllerService, type AuthResponse } from "./services";

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
  login(phone: string, password: string): Promise<AuthResponse>;
  register(
    phone: string,
    password: string,
    firstName: string,
    lastName: string,
  ): Promise<AuthResponse>;
  logout(): void;
}

export class AuthApiService implements AuthService {
  getToken(): string | null {
    throw new Error("Method not implemented.");
  }

  private storeToken(token: string): void {
    localStorage.setItem("Authorization", token);
  }

  public static getToken(): string | null {
    return localStorage.getItem("Authorization");
  }

  public isAuthenticated(): boolean {
    return !this.isTokenExpired();
  }

  public async login(phone: string, password: string): Promise<AuthResponse> {
    const response = await AuthControllerService.login({
      requestBody: {
        phone,
        password,
        // Temporary values for firstName and lastName since backend uses same model
        // for login and register
        firstName: "temp",
        lastName: "orary",
      },
    });

    if (response.token) {
      this.storeToken(response.token);
    }

    useUserStore().set({
      phone: phone,
      role: "admin", // response.data.role,
    });

    return response;
  }

  public async register(
    phone: string,
    password: string,
    firstName: string,
    lastName: string,
  ): Promise<AuthResponse> {
    try {
      const response = await AuthControllerService.register({
        requestBody: {
          phone,
          password,
          firstName: firstName,
          lastName: lastName,
        },
      });

      if (response.token) {
        this.storeToken(response.token);
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
