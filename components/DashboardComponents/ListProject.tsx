"use client";
import { Proyecto } from "@/lib/services/proyectos.service";

interface ListProjectProps {
  proyectos: Proyecto[];
}

const ListProject = ({ proyectos }: ListProjectProps) => {

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">
          Proyectos Recientes
        </h2>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {proyectos.slice(0, 5).map((proyecto) => (
            <div
              key={proyecto.id}
              className="border-l-4 border-blue-500 pl-4 py-2"
            >
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-semibold text-gray-900">
                  {proyecto.nombre}
                </h3>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    proyecto.estado === "completado"
                      ? "bg-green-100 text-green-800"
                      : proyecto.estado === "en-progreso"
                        ? "bg-blue-100 text-blue-800"
                        : proyecto.estado === "planificacion"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {proyecto.estado}
                </span>
              </div>
              <p className="text-sm text-gray-600 line-clamp-2">
                {proyecto.descripcion}
              </p>
              <div className="mt-2 flex gap-4 text-xs text-gray-500">
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
