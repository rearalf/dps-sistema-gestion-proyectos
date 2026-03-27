"use client";
import useDashboardData from "@/hooks/useDashboardData";

import Statistics from "@/components/DashboardComponents/Statistics";
import ListProject from "@/components/DashboardComponents/ListProject";
import TaskStatus from "@/components/DashboardComponents/TaskStatus";
import ProtectedRoute from "@/components/ProtectedRoute";
import UserInfo from "@/components/UserInfo";

export default function Home() {
  const dashboardData = useDashboardData();

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-gray-950 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-4xl font-bold text-gray-50 mb-2">
                  Dashboard de Proyectos
                </h1>
                <p className="text-gray-100">
                  Resumen general del sistema de gestión
                </p>
              </div>

              {/* Información del usuario autenticado */}
              <UserInfo />
            </div>
          </div>

          {/* Estadísticas principales */}
          <Statistics data={dashboardData} />

          {/* Proyectos y Estado de Tareas */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Lista de Proyectos */}
            <ListProject proyectos={dashboardData.proyectos} />

            {/* Estado de Tareas */}
            <TaskStatus data={dashboardData} />
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}
