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
  const response = await api.get("/proyectos");
  return response.data;
};

export const crearProyecto = async (
  proyecto: Omit<Proyecto, "id">
): Promise<Proyecto> => {
  const response = await api.post("/proyectos", proyecto);
  return response.data;
};

export const actualizarProyecto = async (
  id: number,
  proyecto: Omit<Proyecto, "id">
): Promise<Proyecto> => {
  const response = await api.put(`/proyectos/${id}`, proyecto);
  return response.data;
};

export const eliminarProyecto = async (id: number): Promise<void> => {
  await api.delete(`/proyectos/${id}`);
};

/**
 * Filtra proyectos según el rol del usuario:
 * - Gerentes ven todos los proyectos
 * - Usuarios solo ven proyectos donde están asignados
 */
export const filtrarProyectosPorUsuario = (
  proyectos: Proyecto[],
  userId: number,
  userRole: "gerente" | "usuario"
): Proyecto[] => {
  if (userRole === "gerente") {
    return proyectos;
  }
  return proyectos.filter((proyecto) =>
    proyecto.usuariosAsignados.includes(userId)
  );
};
