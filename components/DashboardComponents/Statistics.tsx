"use client";
import DashboardCard from "../DashboardCard";
import { DashboardData } from "@/hooks/useDashboardData";

interface StatisticsProps {
  data: DashboardData;
}

const Statistics = ({ data: stats }: StatisticsProps) => {

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Total Proyectos */}
      <DashboardCard
        icon="total_project"
        title="Total Proyectos"
        totalProyectos={stats.totalProyectos}
        footerText={`✓ ${stats.proyectosCompletados} completados`}
      />

      {/* Proyectos en Progreso */}
      <DashboardCard
        icon="progress"
        title="En Progreso"
        totalProyectos={stats.proyectosEnProgreso}
        footerText="Proyectos activos"
      />

      {/* Total Tareas */}
      <DashboardCard
        icon="total_task"
        title="Total Tareas"
        totalProyectos={stats.totalTareas}
        taskBreakdown={{
          completadas: stats.tareasCompletadas,
          enProgreso: stats.tareasEnProgreso,
          pendientes: stats.tareasPendientes,
        }}
      />

      {/* Tareas Alta Prioridad */}
      <DashboardCard
        icon="high_priority"
        title="Alta Prioridad"
        totalProyectos={stats.tareasAltaPrioridad}
        footerText="Tareas urgentes pendientes"
        numberColor="text-red-600"
      />
    </div>
  );
};

export default Statistics;
