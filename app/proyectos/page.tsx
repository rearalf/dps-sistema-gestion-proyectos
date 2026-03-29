"use client";
import { useCallback, useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Proyecto, obtenerProyectos } from "@/lib/services/proyectos.service";
import useProyectos from "@/hooks/useProyectos";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const estadoColores: Record<string, string> = {
  completado: "bg-green-900/40 text-green-400",
  "en-progreso": "bg-blue-900/40 text-blue-400",
  planificacion: "bg-yellow-900/40 text-yellow-400",
  cancelado: "bg-red-900/40 text-red-400",
};

export default function ProyectosPage() {
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);

  const cargarProyectos = useCallback(async () => {
    const data = await obtenerProyectos();
    setProyectos(data);
  }, []);

  useEffect(() => {
    cargarProyectos();
  }, [cargarProyectos]);

  const {
    modalAbierto,
    proyectoEditando,
    formData,
    error,
    confirmandoEliminar,
    setConfirmandoEliminar,
    abrirModalCrear,
    abrirModalEditar,
    cerrarModal,
    handleChange,
    handleSubmit,
    handleEliminar,
  } = useProyectos(cargarProyectos);

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-gray-950 p-8">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-50 mb-2">Proyectos</h1>
              <p className="text-gray-400">Gestión completa de proyectos</p>
            </div>
            <button
              onClick={abrirModalCrear}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
            >
              <FaPlus />
              Nuevo Proyecto
            </button>
          </div>

          {/* Tabla */}
          <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left p-4 text-gray-400 font-medium">Nombre</th>
                  <th className="text-left p-4 text-gray-400 font-medium hidden md:table-cell">Descripción</th>
                  <th className="text-left p-4 text-gray-400 font-medium">Estado</th>
                  <th className="text-left p-4 text-gray-400 font-medium hidden lg:table-cell">Fecha Inicio</th>
                  <th className="text-left p-4 text-gray-400 font-medium hidden lg:table-cell">Fecha Fin</th>
                  <th className="text-right p-4 text-gray-400 font-medium">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {proyectos.map((proyecto) => (
                  <tr
                    key={proyecto.id}
                    className="border-b border-gray-800 hover:bg-gray-800/50 transition"
                  >
                    <td className="p-4 text-gray-100 font-medium">{proyecto.nombre}</td>
                    <td className="p-4 text-gray-400 text-sm hidden md:table-cell max-w-xs truncate">
                      {proyecto.descripcion}
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${estadoColores[proyecto.estado] || "bg-gray-800 text-gray-400"}`}>
                        {proyecto.estado}
                      </span>
                    </td>
                    <td className="p-4 text-gray-400 text-sm hidden lg:table-cell">{proyecto.fechaInicio}</td>
                    <td className="p-4 text-gray-400 text-sm hidden lg:table-cell">{proyecto.fechaFin}</td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => abrirModalEditar(proyecto)}
                          className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-900/20 rounded-lg transition"
                          title="Editar"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => setConfirmandoEliminar(proyecto.id!)}
                          className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-900/20 rounded-lg transition"
                          title="Eliminar"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {proyectos.length === 0 && (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-gray-500">
                      No hay proyectos aún. ¡Creá el primero!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Crear / Editar */}
        {modalAbierto && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 rounded-2xl border border-gray-800 w-full max-w-lg shadow-2xl">
              <div className="p-6 border-b border-gray-800">
                <h2 className="text-xl font-bold text-gray-100">
                  {proyectoEditando ? "Editar Proyecto" : "Nuevo Proyecto"}
                </h2>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Nombre *
                  </label>
                  <input
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nombre del proyecto"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Descripción
                  </label>
                  <textarea
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    placeholder="Descripción del proyecto"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Fecha Inicio *
                    </label>
                    <input
                      type="date"
                      name="fechaInicio"
                      value={formData.fechaInicio}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Fecha Fin *
                    </label>
                    <input
                      type="date"
                      name="fechaFin"
                      value={formData.fechaFin}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Estado
                  </label>
                  <select
                    name="estado"
                    value={formData.estado}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="planificacion">Planificación</option>
                    <option value="en-progreso">En Progreso</option>
                    <option value="completado">Completado</option>
                    <option value="cancelado">Cancelado</option>
                  </select>
                </div>

                {error && (
                  <div className="bg-red-900/20 border border-red-800 text-red-400 px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={cerrarModal}
                    className="flex-1 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
                  >
                    {proyectoEditando ? "Guardar Cambios" : "Crear Proyecto"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal Confirmar Eliminar */}
        {confirmandoEliminar !== null && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 rounded-2xl border border-gray-800 w-full max-w-sm shadow-2xl p-6">
              <h2 className="text-xl font-bold text-gray-100 mb-2">¿Eliminar proyecto?</h2>
              <p className="text-gray-400 mb-6">Esta acción no se puede deshacer.</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setConfirmandoEliminar(null)}
                  className="flex-1 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => handleEliminar(confirmandoEliminar)}
                  className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </ProtectedRoute>
  );
}
