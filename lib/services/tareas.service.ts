import { api } from '../api';

export interface Tarea {
  id?: number;
  proyectoId: number;
  titulo: string;
  descripcion: string;
  estado: 'pendiente' | 'en-progreso' | 'completada' | 'cancelada';
  prioridad: 'baja' | 'media' | 'alta';
  usuarioAsignadoId: number | null;
  fechaCreacion: string;
  fechaVencimiento: string;
}

export const obtenerTareas = async (): Promise<Tarea[]> => {
  try {
    const response = await api.get('/tareas');
    return response.data;
  } catch (error) {
    console.error('Error al obtener tareas:', error);
    throw error;
  }
};
