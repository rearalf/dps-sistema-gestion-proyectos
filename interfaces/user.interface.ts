export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  password?: string;
  rol: "gerente" | "usuario";
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    user: Omit<Usuario, "password">;
    accessToken: string;
  };
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthState {
  user: Omit<Usuario, "password"> | null;
  token: string | null;
  isAuthenticated: boolean;

  setAuth: (user: Omit<Usuario, "password">, token: string) => void;
  logout: () => void;
}
