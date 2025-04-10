import router from "@/router";
import { jwtDecode } from "jwt-decode";
import {
  AuthControllerService,
  UserControllerService,
  type AuthLoginResponse,
  type AuthRegisterResponse,
} from "./services";

interface DecodedToken {
  // Phone number
  sub: string;

  /// Issue-date: seconds since epoch
  iat: number;

  /// Expire-date: seconds since epoch
  exp: number;
}

export interface User {
  firstName: string;
  lastName: string;
  phone: string;
  role: UserRole;
}

export type UserRole = "admin" | "user";

interface AuthService {
  getUser(): Promise<User | null>;
  getToken(): string | null;
  isAuthenticated(): boolean;
  login(phone: string, password: string): Promise<AuthLoginResponse>;
  register(
    phone: string,
    password: string,
    firstName: string,
    lastName: string,
  ): Promise<AuthRegisterResponse>;
  logout(): void;
}

export class AuthApiService implements AuthService {
  async getUser(): Promise<User | null> {
    const profile = await UserControllerService.getProfile();

    return {
      firstName: profile.firstName,
      lastName: profile.lastName,
      phone: profile.phone,
      role: profile.role as UserRole,
    };
  }

  getToken(): string | null {
    return localStorage.getItem("Authorization");
  }

  private storeToken(token: string): void {
    localStorage.setItem("Authorization", token);
  }

  public static getToken(): string | null {
    return localStorage.getItem("Authorization");
  }

  public isAuthenticated(): boolean {
    // Allows us to mock out authentication in testing
    if (
      (import.meta.env.MODE === "development" || import.meta.env.VITE_TEST === "true") &&
      localStorage.getItem("Authorization") === "mock-token"
    ) {
      return true;
    }

    return !this.isTokenExpired();
  }

  public async login(phone: string, password: string): Promise<AuthLoginResponse> {
    const response = await AuthControllerService.login({
      requestBody: {
        phone,
        password,
      },
    });

    if (response.token) {
      this.storeToken(response.token);
    }

    return response;
  }

  public async register(
    phone: string,
    password: string,
    firstName: string,
    lastName: string,
  ): Promise<AuthRegisterResponse> {
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
