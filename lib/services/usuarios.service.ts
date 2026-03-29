import { api } from "../api";
import { Usuario } from "@/interfaces/user.interface";

export interface CreateUsuarioData {
  nombre: string;
  email: string;
  password: string;
  rol: "gerente" | "usuario";
}

export interface UpdateUsuarioData {
  nombre?: string;
  email?: string;
  password?: string;
  rol?: "gerente" | "usuario";
}

export interface UsuarioResponse {
  success: boolean;
  message: string;
  data?: Usuario | Usuario[];
}

// Obtener todos los usuarios
export const getAllUsuarios = async (): Promise<UsuarioResponse> => {
  try {
    const response = await api.get<Usuario[]>("/usuarios");
    return {
      success: true,
      message: "Usuarios obtenidos correctamente",
      data: response.data,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Error al obtener usuarios",
    };
  }
};

// Obtener un usuario por ID
export const getUsuarioById = async (id: number): Promise<UsuarioResponse> => {
  try {
    const response = await api.get<Usuario>(`/users/${id}`);
    return {
      success: true,
      message: "Usuario obtenido correctamente",
      data: response.data,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Error al obtener el usuario",
    };
  }
};

// Crear un nuevo usuario
export const createUsuario = async (
  usuarioData: CreateUsuarioData
): Promise<UsuarioResponse> => {
  try {
    const response = await api.post<Usuario>("/users", usuarioData);
    return {
      success: true,
      message: "Usuario creado correctamente",
      data: response.data,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Error al crear el usuario",
    };
  }
};

// Actualizar un usuario
export const updateUsuario = async (
  id: number,
  usuarioData: UpdateUsuarioData
): Promise<UsuarioResponse> => {
  try {
    const response = await api.patch<Usuario>(`/users/${id}`, usuarioData);
    return {
      success: true,
      message: "Usuario actualizado correctamente",
      data: response.data,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Error al actualizar el usuario",
    };
  }
};

// Eliminar un usuario
export const deleteUsuario = async (id: number): Promise<UsuarioResponse> => {
  try {
    await api.delete(`/users/${id}`);
    return {
      success: true,
      message: "Usuario eliminado correctamente",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Error al eliminar el usuario",
    };
  }
};

// Obtener solo gerentes
export const getGerentes = async (): Promise<UsuarioResponse> => {
  try {
    const response = await api.get<Usuario[]>("/users?rol=gerente");
    return {
      success: true,
      message: "Gerentes obtenidos correctamente",
      data: response.data,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Error al obtener gerentes",
    };
  }
};

// Obtener solo usuarios regulares
export const getUsuariosRegulares = async (): Promise<UsuarioResponse> => {
  try {
    const response = await api.get<Usuario[]>("/users?rol=usuario");
    return {
      success: true,
      message: "Usuarios obtenidos correctamente",
      data: response.data,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Error al obtener usuarios",
    };
  }
};
