"use client";
import useDashboardData from "@/hooks/useDashboardData";

import Statistics from "@/components/DashboardComponents/Statistics";
import ListProject from "@/components/DashboardComponents/ListProject";
import TaskStatus from "@/components/DashboardComponents/TaskStatus";
import ProtectedRoute from "@/components/ProtectedRoute";
import UserInfo from "@/components/UserInfo";
import Sidebar from "@/components/Sidebar";

export default function Home() {
  const dashboardData = useDashboardData();

  return (
    <ProtectedRoute>
      <Sidebar />
      <main className="lg:ml-64 min-h-screen bg-gray-950 flex-1 w-full">
        <div className="pt-14 lg:pt-0">
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          <div className="mb-6 lg:mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-50 mb-2">
                  Dashboard de Proyectos
                </h1>
                <p className="text-sm sm:text-base text-gray-100">
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Lista de Proyectos */}
            <ListProject proyectos={dashboardData.proyectos} />

            {/* Estado de Tareas */}
            <TaskStatus data={dashboardData} />
          </div>
        </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}
