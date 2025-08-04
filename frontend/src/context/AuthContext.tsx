import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

type User = {
  id: number;
  email: string;
  fullName: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    fullName: string,
    email: string,
    password: string
  ) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API = "http://localhost:4000/api";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setIsAuthenticated(false);
      return;
    }

    fetch(`${API}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) {
          setUser(data);
          setIsAuthenticated(true);
        } else {
          logout();
        }
      })
      .catch(() => {
        logout();
      });
  }, []);

  const login = async (email: string, password: string) => {
    const res = await fetch(`${API}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Ошибка входа");
    }

    const data = await res.json();
    localStorage.setItem("accessToken", data.accessToken);

    const meRes = await fetch(`${API}/auth/me`, {
      headers: { Authorization: `Bearer ${data.accessToken}` },
    });
    const user = await meRes.json();
    setUser(user);
    setIsAuthenticated(true);

    router.push("/dashboard");
  };

  const register = async (
    fullName: string,
    email: string,
    password: string
  ) => {
    const res = await fetch(`${API}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullName, email, password }),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Ошибка регистрации");
    }

    const data = await res.json();
    localStorage.setItem("accessToken", data.accessToken);

    const meRes = await fetch(`${API}/auth/me`, {
      headers: { Authorization: `Bearer ${data.accessToken}` },
    });
    const user = await meRes.json();
    setUser(user);
    setIsAuthenticated(true);

    router.push("/dashboard");
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
    setIsAuthenticated(false);
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
