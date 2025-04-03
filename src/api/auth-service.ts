import router from "@/router";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  // Phone number
  sub: string;

  /// Issue-date: seconds since epoch
  iat: number;

  /// Expire-date: seconds since epoch
  exp: number;
}

const API_URL = "http://localhost:8080/api/auth";

class AuthService {
  private storeToken(token: string): void {
    localStorage.setItem("Authorization", token);
  }

  public getToken(): string | null {
    return localStorage.getItem("Authorization");
  }

  public isAuthenticated(): boolean {
    return !this.isTokenExpired();
  }

  public async login(phone: string, password: string): Promise<{ token: string }> {
    try {
      const response = await axios.post(API_URL + "/login", {
        phone: phone,
        password: password,
        // This is temporary as login and register uses same RequestBody class in backend
        firstName: "temp",
        lastName: "orary",
      });

      if (response.data.token) {
        this.storeToken(response.data.token);
      }

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async register(
    phone: string,
    password: string,
    firstName: string,
    lastName: string,
  ): Promise<{ token: string }> {
    try {
      const response = await axios.post(API_URL + "/register", {
        phone,
        password,
        firstName,
        lastName,
      });

      if (response.data.token) {
        this.storeToken(response.data.token);
      }

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public logout(): void {
    localStorage.removeItem("Authorization");
    router.push({ name: "sign-in" });
  }

  private decodeToken(): DecodedToken | null {
    const token = this.getToken();
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

export const authService = new AuthService();
