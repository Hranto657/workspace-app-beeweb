import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { setAccessToken } from "@/lib/axios";
import { AuthAPI } from "@/services/auth.api";
import { AuthContext } from "@/contexts/AuthContext";
import { User, AuthResponse } from "@/types/auth";
import { queryClient } from "@/pages/_app";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const init = async () => {
      const wasLoggedIn = localStorage.getItem("wasLoggedIn");

      if (!wasLoggedIn) {
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }
      try {
        const { accessToken } = await AuthAPI.refresh();
        setAccessToken(accessToken);

        const user = await AuthAPI.getProfile();
        setUser(user);
        setIsAuthenticated(true);
      } catch {
        setAccessToken("");
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    init();
  }, []);

  const authenticate = async (fn: () => Promise<AuthResponse>) => {
    try {
      const { accessToken, user } = await fn();
      setAccessToken(accessToken);
      setUser(user);
      setIsAuthenticated(true);
      localStorage.setItem("wasLoggedIn", "true");
      router.push("/dashboard");
    } catch (error) {
      throw error;
    }
  };

  const login = (email: string, password: string) => {
    return authenticate(() => AuthAPI.login({ email, password }));
  };

  const register = (fullName: string, email: string, password: string) => {
    return authenticate(() => AuthAPI.register({ fullName, email, password }));
  };

  const logout = async (redirect = true) => {
    await AuthAPI.logout();
    setAccessToken("");
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("wasLoggedIn");
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
