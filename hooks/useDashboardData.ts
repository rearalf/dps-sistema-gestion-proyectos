import { useEffect, useState } from "react";
import { obtenerProyectos, Proyecto } from "@/lib/services/proyectos.service";
import { obtenerTareas, Tarea } from "@/lib/services/tareas.service";

export interface DashboardData {
  loading: boolean;
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [proyectosData, tareasData] = await Promise.all([
          obtenerProyectos(),
          obtenerTareas(),
        ]);
        setProyectos(proyectosData);
        setTareas(tareasData);
      } catch (error) {
        console.error("Error al cargar datos:", error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }
    };

    fetchData();
  }, []);

  return {
    loading,
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
