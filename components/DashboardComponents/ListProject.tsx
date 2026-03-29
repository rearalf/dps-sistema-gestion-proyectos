"use client";
import { Proyecto } from "@/lib/services/proyectos.service";
import { FaUsers } from "react-icons/fa";
import { useAuthStore } from "@/store/useAuthStore";

interface ListProjectProps {
  proyectos: Proyecto[];
}

const ListProject = ({ proyectos }: ListProjectProps) => {
  const user = useAuthStore((state) => state.user);
  const isGerente = user?.rol === "gerente";

  return (
    <div className="bg-gray-900 rounded-lg shadow border border-gray-800">
      <div className="p-4 sm:p-6 border-b border-gray-800">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-100">
            Proyectos Recientes
          </h2>
          {!isGerente && (
            <span className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded">
              Mis proyectos
            </span>
          )}
        </div>
      </div>
      <div className="p-4 sm:p-6">
        {proyectos.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-400">
              {isGerente 
                ? "No hay proyectos registrados"
                : "No tienes proyectos asignados"}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {proyectos.slice(0, 5).map((proyecto) => (
              <div
                key={proyecto.id}
                className="border-l-4 border-blue-500 pl-3 sm:pl-4 py-2 hover:bg-gray-800/50 transition rounded-r"
              >
                <div className="flex items-center justify-between mb-1 gap-2">
                  <h3 className="font-semibold text-gray-100 text-sm sm:text-base truncate">
                    {proyecto.nombre}
                  </h3>
                  <span
                    className={`px-2 py-1 text-xs rounded-full whitespace-nowrap shrink-0 ${
                      proyecto.estado === "completado"
                        ? "bg-green-900/40 text-green-400"
                        : proyecto.estado === "en-progreso"
                          ? "bg-blue-900/40 text-blue-400"
                          : proyecto.estado === "planificacion"
                            ? "bg-yellow-900/40 text-yellow-400"
                            : "bg-gray-800 text-gray-400"
                    }`}
                  >
                    {proyecto.estado}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-gray-400 line-clamp-2 mb-2">
                  {proyecto.descripcion}
                </p>
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs text-gray-500">
                  <span>📅 Inicio: {proyecto.fechaInicio}</span>
                  <span>🏁 Fin: {proyecto.fechaFin}</span>
                  {proyecto.usuariosAsignados && proyecto.usuariosAsignados.length > 0 && (
                    <span className="flex items-center gap-1 text-blue-400">
                      <FaUsers className="text-xs" />
                      {proyecto.usuariosAsignados.length} usuario{proyecto.usuariosAsignados.length !== 1 ? 's' : ''}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ListProject;
