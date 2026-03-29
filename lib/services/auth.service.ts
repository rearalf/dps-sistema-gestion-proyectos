import { AxiosError } from "axios";
import { api } from "../api";
import {
  LoginCredentials,
  AuthResponse,
  Usuario,
} from "@/interfaces/user.interface";

export const login = async (
  credentials: LoginCredentials,
): Promise<AuthResponse> => {
  try {
    const response = await api.post<{
      accessToken: string;
      user: Usuario;
    }>("/login", {
      email: credentials.email,
      password: credentials.password,
    });

    const { accessToken, user } = response.data;
    const { password, ...usuarioSinPassword } = user;

    return {
      success: true,
      message: "Inicio de sesión exitoso",
      data: {
        user: usuarioSinPassword,
        accessToken,
      },
    };
  } catch (error) {
    console.log(error);
    if (error instanceof AxiosError && error.response?.status === 400) {
      return {
        success: false,
        message: "Email o contraseña incorrectos",
      };
    }

    return {
      success: false,
      message: "Error al intentar iniciar sesión",
    };
  }
};

export const register = async (
  userData: Omit<Usuario, "id">,
): Promise<AuthResponse> => {
  try {
    const response = await api.post<{
      accessToken: string;
      user: Usuario;
    }>("/register", userData);

    const { accessToken, user } = response.data;
    const { password, ...usuarioSinPassword } = user;

    return {
      success: true,
      message: "Registro exitoso",
      data: {
        user: usuarioSinPassword,
        accessToken,
      },
    };
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 400) {
      return {
        success: false,
        message: "El email ya está registrado",
      };
    }

    return {
      success: false,
      message: "Error al registrar usuario",
    };
  }
};
