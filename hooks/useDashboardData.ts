import { useEffect, useState } from "react";
import { obtenerProyectos, Proyecto, filtrarProyectosPorUsuario } from "@/lib/services/proyectos.service";
import { obtenerTareas, Tarea, filtrarTareasPorUsuario } from "@/lib/services/tareas.service";
import { useAuthStore } from "@/store/useAuthStore";

export interface DashboardData {
  proyectos: Proyecto[];
  tareas: Tarea[];
  totalProyectos: number;
  proyectosEnProgreso: number;
  proyectosCompletados: number;
  totalTareas: number;
  tareasCompletadas: number;
  tareasPendientes: number;
  tareasEnProgreso: number;
  tareasAltaPrioridad: number;
}

function useDashboardData(): DashboardData {
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [proyectosData, tareasData] = await Promise.all([
          obtenerProyectos(),
          obtenerTareas(),
        ]);
        
        // Filtrar proyectos según el rol del usuario
        let proyectosFiltrados = proyectosData;
        if (user) {
          proyectosFiltrados = filtrarProyectosPorUsuario(proyectosData, user.id, user.rol);
        }
        
        const proyectosIds = proyectosFiltrados.map(p => p.id).filter((id): id is number => id !== undefined);
        
        // Filtrar tareas: por proyectos Y por usuario asignado
        let tareasFiltradas = tareasData;
        if (user) {
          // Primero filtrar por proyectos accesibles
          tareasFiltradas = tareasData.filter(t => proyectosIds.includes(t.proyectoId));
          
          // Luego aplicar filtro de usuario asignado
          if (user.rol === "usuario") {
            tareasFiltradas = filtrarTareasPorUsuario(tareasFiltradas, user.id, user.rol, proyectosIds);
          }
        }
        
        setProyectos(proyectosFiltrados);
        setTareas(tareasFiltradas);
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    };

    fetchData();
  }, [user]);

  return {
    proyectos,
    tareas,
    totalProyectos: proyectos.length,
    proyectosEnProgreso: proyectos.filter((p) => p.estado === "en-progreso")
      .length,
    proyectosCompletados: proyectos.filter((p) => p.estado === "completado")
      .length,
    totalTareas: tareas.length,
    tareasCompletadas: tareas.filter((t) => t.estado === "completada").length,
    tareasPendientes: tareas.filter((t) => t.estado === "pendiente").length,
    tareasEnProgreso: tareas.filter((t) => t.estado === "en-progreso").length,
    tareasAltaPrioridad: tareas.filter(
      (t) => t.prioridad === "alta" && t.estado !== "completada",
    ).length,
  };
}

export default useDashboardData;
