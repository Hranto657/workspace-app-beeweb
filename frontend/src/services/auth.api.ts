import { api } from "@/lib/axios";
import { AuthResponse, LoginDto, RegisterDto, User } from "@/types/auth";

export const AuthAPI = {
  login: async (data: LoginDto): Promise<AuthResponse> => {
    const res = await api.post("/auth/login", data);
    return res.data;
  },

  register: async (data: RegisterDto): Promise<AuthResponse> => {
    const res = await api.post("/auth/signup", data);
    return res.data;
  },

  getProfile: async (): Promise<User> => {
    const res = await api.get("/auth/me");
    return res.data;
  },

  refresh: async (): Promise<{ accessToken: string }> => {
    const res = await api.post("/auth/refresh");
    return res.data;
  },

  logout: async (): Promise<void> => {
    await api.post("/auth/logout");
  },
};
