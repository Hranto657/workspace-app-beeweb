export type User = {
  id: number;
  email: string;
  fullName: string;
};

export type AuthResponse = {
  accessToken: string;
  user: User;
};

export type LoginDto = {
  email: string;
  password: string;
};

export type RegisterDto = {
  fullName: string;
  email: string;
  password: string;
};

export type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    fullName: string,
    email: string,
    password: string
  ) => Promise<void>;
  logout: () => void;
};
