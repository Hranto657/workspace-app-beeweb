import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AuthService } from "@/services/auth.service";
import { AuthContext } from "@/contexts/AuthContext";
import { User, AuthResponse } from "@/types/auth";
import { queryClient } from "@/pages/_app";
import {
  getAccessToken,
  setAccessToken,
  removeAccessToken,
} from "@/utils/token";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const token = getAccessToken();
    if (!token) {
      setIsAuthenticated(false);
      setIsLoading(false);
      return;
    }

    AuthService.getProfile()
      .then((user) => {
        setUser(user);
        setIsAuthenticated(true);
      })
      .catch(() => {
        removeAccessToken();
        setIsAuthenticated(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const authenticate = async (fn: () => Promise<AuthResponse>) => {
    try {
      const { accessToken, user } = await fn();
      setAccessToken(accessToken);
      setUser(user);
      setIsAuthenticated(true);
      router.push("/dashboard");
    } catch (error) {
      throw error;
    }
  };

  const login = (email: string, password: string) => {
    return authenticate(() => AuthService.login({ email, password }));
  };

  const register = (fullName: string, email: string, password: string) => {
    return authenticate(() =>
      AuthService.register({ fullName, email, password })
    );
  };

  const logout = (redirect = true) => {
    removeAccessToken();
    setUser(null);
    setIsAuthenticated(false);
    queryClient.clear();
    if (redirect) router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, register, logout }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  );
};
