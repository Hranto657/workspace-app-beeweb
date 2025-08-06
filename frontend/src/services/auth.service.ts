import { api } from "./api";
import { User, LoginDto, RegisterDto, AuthResponse } from "@/types/auth";

export const AuthService = {
  async login(data: LoginDto): Promise<AuthResponse> {
    const res = await api.post<AuthResponse>("/auth/login", data);
    return res.data;
  },

  async register(data: RegisterDto): Promise<AuthResponse> {
    const res = await api.post<AuthResponse>("/auth/signup", data);
    return res.data;
  },

  async getProfile(): Promise<User> {
    const res = await api.get<User>("/auth/me");
    return res.data;
  },
};
