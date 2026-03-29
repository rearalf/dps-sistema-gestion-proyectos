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

/**
 * Filtra tareas según el rol del usuario:
 * - Gerentes ven todas las tareas
 * - Usuarios solo ven tareas asignadas a ellos o sin asignar de sus proyectos
 */
export const filtrarTareasPorUsuario = (
  tareas: Tarea[],
  userId: number,
  userRole: "gerente" | "usuario",
  proyectosAsignados?: number[]
): Tarea[] => {
  if (userRole === "gerente") {
    return tareas;
  }
  // Usuarios ven: tareas asignadas a ellos O tareas sin asignar de sus proyectos
  return tareas.filter((tarea) => {
    const esAsignadaAlUsuario = tarea.usuarioAsignadoId === userId;
    const esSinAsignarDeSuProyecto = 
      !tarea.usuarioAsignadoId && 
      proyectosAsignados && 
      proyectosAsignados.includes(tarea.proyectoId);
    return esAsignadaAlUsuario || esSinAsignarDeSuProyecto;
  });
};
