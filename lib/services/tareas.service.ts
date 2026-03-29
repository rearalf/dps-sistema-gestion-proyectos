import { api } from "../api";

export interface Tarea {
  id?: number;
  proyectoId: number;
  titulo: string;
  descripcion: string;
  estado: "pendiente" | "en-progreso" | "completada" | "cancelada";
  prioridad: "baja" | "media" | "alta";
  usuarioAsignadoId: number | null;
  fechaCreacion: string;
  fechaVencimiento: string;
}

export const obtenerTareas = async (): Promise<Tarea[]> => {
  const response = await api.get("/tareas");
  return response.data;
};

export const crearTarea = async (tarea: Omit<Tarea, "id">): Promise<Tarea> => {
  const response = await api.post("/tareas", tarea);
  return response.data;
};

export const actualizarTarea = async (
  id: number,
  tarea: Omit<Tarea, "id">
): Promise<Tarea> => {
  const response = await api.put(`/tareas/${id}`, tarea);
  return response.data;
};

export const eliminarTarea = async (id: number): Promise<void> => {
  await api.delete(`/tareas/${id}`);
};
