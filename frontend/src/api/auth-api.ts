import { API_URL } from "./api-url";
import { LoginRequest, RegisterRequest } from "../components/auth/auth-model";

export class AuthAPI {
  static async login(loginRequest: LoginRequest): Promise<string> {
    const username = loginRequest.username;
    const password = loginRequest.password;

    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(
        JSON.stringify({ message: data.message, status: response.status }),
      );
    }

    return data.access_token;
  }

  static async register(registerRequest: RegisterRequest): Promise<string> {
    const username = registerRequest.username;
    const password = registerRequest.password;

    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(
        JSON.stringify({ message: data.message, status: response.status }),
      );
    }

    return data.access_token;
  }
}
