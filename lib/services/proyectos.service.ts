import { api } from "../api";

export interface Proyecto {
  id?: number;
  nombre: string;
  descripcion: string;
  fechaInicio: string;
  fechaFin: string;
  estado: "planificacion" | "en-progreso" | "completado" | "cancelado";
  gerenteId: number;
  usuariosAsignados: number[];
}

export const obtenerProyectos = async (): Promise<Proyecto[]> => {
  try {
    const response = await api.get("/proyectos");
    return response.data;
  } catch (error) {
    console.error("Error al obtener proyectos:", error);
    throw error;
  }
};
