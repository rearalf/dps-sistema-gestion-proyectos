"use client";
import { DashboardData } from "@/hooks/useDashboardData";

interface TaskStatusProps {
  data: DashboardData;
}

const TaskStatus = ({ data: stats }: TaskStatusProps) => {

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 sm:p-6 border-b border-gray-200">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
          Estado de Tareas
        </h2>
      </div>
      <div className="p-4 sm:p-6">
        <div className="mb-6">
          <div className="flex justify-between mb-2 text-sm">
            <span className="text-gray-600">Progreso General</span>
            <span className="font-semibold">
              {stats.totalTareas > 0
                ? Math.round(
                    (stats.tareasCompletadas / stats.totalTareas) * 100,
                  )
                : 0}
              %
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-green-500 h-3 rounded-full transition-all duration-300"
              style={{
                width: `${
                  stats.totalTareas > 0
                    ? (stats.tareasCompletadas / stats.totalTareas) * 100
                    : 0
                }%`,
              }}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-gray-700">Completadas</span>
            </div>
            <span className="font-semibold text-gray-900">
              {stats.tareasCompletadas}
            </span>
          </div>

          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-gray-700">En Progreso</span>
            </div>
            <span className="font-semibold text-gray-900">
              {stats.tareasEnProgreso}
            </span>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
              <span className="text-gray-700">Pendientes</span>
            </div>
            <span className="font-semibold text-gray-900">
              {stats.tareasPendientes}
            </span>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">
            Por Prioridad
          </h3>
          <div className="space-y-2">
            <div className="space-y-2">
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-red-600">🔴 Alta</span>
                  <span className="font-medium text-gray-800">
                    {stats.tareas.filter((t) => t.prioridad === "alta").length}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-red-500 h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${stats.tareas.length > 0 ? (stats.tareas.filter((t) => t.prioridad === "alta").length / stats.tareas.length) * 100 : 0}%`,
                    }}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-yellow-600">🟡 Media</span>
                  <span className="font-medium text-gray-800">
                    {stats.tareas.filter((t) => t.prioridad === "media").length}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${stats.tareas.length > 0 ? (stats.tareas.filter((t) => t.prioridad === "media").length / stats.tareas.length) * 100 : 0}%`,
                    }}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-green-600">🟢 Baja</span>
                  <span className="font-medium text-gray-800">
                    {stats.tareas.filter((t) => t.prioridad === "baja").length}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${stats.tareas.length > 0 ? (stats.tareas.filter((t) => t.prioridad === "baja").length / stats.tareas.length) * 100 : 0}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskStatus;
