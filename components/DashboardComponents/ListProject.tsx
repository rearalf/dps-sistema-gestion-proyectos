"use client";
import { Proyecto } from "@/lib/services/proyectos.service";

interface ListProjectProps {
  proyectos: Proyecto[];
}

const ListProject = ({ proyectos }: ListProjectProps) => {

  return (
    <div className="bg-gray-900 rounded-lg shadow border border-gray-800">
      <div className="p-4 sm:p-6 border-b border-gray-800">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-100">
          Proyectos Recientes
        </h2>
      </div>
      <div className="p-4 sm:p-6">
        <div className="space-y-4">
          {proyectos.slice(0, 5).map((proyecto) => (
            <div
              key={proyecto.id}
              className="border-l-4 border-blue-500 pl-3 sm:pl-4 py-2"
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
              <p className="text-xs sm:text-sm text-gray-400 line-clamp-2">
                {proyecto.descripcion}
              </p>
              <div className="mt-2 flex flex-col sm:flex-row gap-1 sm:gap-4 text-xs text-gray-500">
                <span>📅 Inicio: {proyecto.fechaInicio}</span>
                <span>🏁 Fin: {proyecto.fechaFin}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListProject;
