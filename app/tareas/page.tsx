"use client";
import { useCallback, useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import Sidebar from "@/components/Sidebar";
import { Tarea, obtenerTareas, filtrarTareasPorUsuario } from "@/lib/services/tareas.service";
import { Proyecto, obtenerProyectos, filtrarProyectosPorUsuario } from "@/lib/services/proyectos.service";
import { Usuario } from "@/interfaces/user.interface";
import { getAllUsuarios } from "@/lib/services/usuarios.service";
import useTareas from "@/hooks/useTareas";
import usePermissions from "@/hooks/usePermissions";
import { useAuthStore } from "@/store/useAuthStore";
import { FaPlus, FaEdit, FaTrash, FaUser } from "react-icons/fa";

const estadoColores: Record<string, string> = {
  completada: "bg-green-900/40 text-green-400",
  "en-progreso": "bg-blue-900/40 text-blue-400",
  pendiente: "bg-yellow-900/40 text-yellow-400",
  cancelada: "bg-red-900/40 text-red-400",
};

const prioridadColores: Record<string, string> = {
  alta: "text-red-400",
  media: "text-yellow-400",
  baja: "text-green-400",
};

const prioridadIconos: Record<string, string> = {
  alta: "🔴",
  media: "🟡",
  baja: "🟢",
};

export default function TareasPage() {
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const { canCreateTarea, canEditTarea, canDeleteTarea, canUpdateTareaEstado, isGerente } = usePermissions();
  const user = useAuthStore((state) => state.user);

  const cargarDatos = useCallback(async () => {
    const [tareasData, proyectosData] = await Promise.all([
      obtenerTareas(),
      obtenerProyectos(),
    ]);
    
    // Filtrar proyectos según el rol del usuario
    let proyectosFiltrados = proyectosData;
    if (user) {
      proyectosFiltrados = filtrarProyectosPorUsuario(proyectosData, user.id, user.rol);
    }
    
    const proyectosIds = proyectosFiltrados.map(p => p.id).filter((id): id is number => id !== undefined);
    
    // Filtrar tareas por proyectos Y por usuario asignado
    let tareasFiltradas = tareasData;
    if (user) {
      // Primero filtrar por proyectos accesibles
      tareasFiltradas = tareasData.filter(t => proyectosIds.includes(t.proyectoId));
      
      // Luego aplicar filtro de usuario asignado
      if (user.rol === "usuario") {
        tareasFiltradas = filtrarTareasPorUsuario(tareasFiltradas, user.id, user.rol, proyectosIds);
      }
    }
    
    setTareas(tareasFiltradas);
    setProyectos(proyectosFiltrados);
  }, [user]);

  const cargarUsuarios = useCallback(async () => {
    const response = await getAllUsuarios();
    if (response.success && response.data) {
      const usuariosArray = Array.isArray(response.data) ? response.data : [response.data];
      // Cargar usuarios con rol "usuario" para asignación
      setUsuarios(usuariosArray.filter((u: Usuario) => u.rol === "usuario"));
    }
  }, []);

  useEffect(() => {
    cargarDatos();
    cargarUsuarios();
  }, [cargarDatos, cargarUsuarios]);

  const nombreProyecto = (id: number) =>
    proyectos.find((p) => p.id === id)?.nombre || "Sin proyecto";

  const nombreUsuario = (id: number | null) => {
    if (!id) return "Sin asignar";
    return usuarios.find((u) => u.id === id)?.nombre || `Usuario #${id}`;
  };

  const {
    modalAbierto,
    tareaEditando,
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
  } = useTareas(cargarDatos);

  return (
    <ProtectedRoute>
      <Sidebar />
      <main className="lg:ml-64 min-h-screen bg-gray-950 flex-1 w-full">
        <div className="pt-14 lg:pt-0">
          <div className="py-4 sm:py-6 lg:py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-50 mb-2">Tareas</h1>
              <p className="text-gray-400 text-sm sm:text-base">Gestión completa de tareas</p>
            </div>
            {canCreateTarea && (
              <button
                onClick={abrirModalCrear}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition w-full sm:w-auto"
              >
                <FaPlus />
                Nueva Tarea
              </button>
            )}
          </div>

          {/* Vista Desktop: Tabla */}
          <div className="hidden md:block bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
            <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left p-4 text-gray-400 font-medium">Título</th>
                  <th className="text-left p-4 text-gray-400 font-medium">Proyecto</th>
                  <th className="text-left p-4 text-gray-400 font-medium">Estado</th>
                  <th className="text-left p-4 text-gray-400 font-medium hidden xl:table-cell">Asignado a</th>
                  <th className="text-left p-4 text-gray-400 font-medium hidden lg:table-cell">Prioridad</th>
                  <th className="text-left p-4 text-gray-400 font-medium hidden lg:table-cell">Vencimiento</th>
                  {(canEditTarea || canDeleteTarea || canUpdateTareaEstado) && (
                    <th className="text-right p-4 text-gray-400 font-medium">Acciones</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {tareas.map((tarea) => (
                  <tr
                    key={tarea.id}
                    className="border-b border-gray-800 hover:bg-gray-800/50 transition"
                  >
                    <td className="p-4 text-gray-100 font-medium">{tarea.titulo}</td>
                    <td className="p-4 text-gray-400 text-sm">
                      {nombreProyecto(tarea.proyectoId)}
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${estadoColores[tarea.estado] || "bg-gray-800 text-gray-400"}`}>
                        {tarea.estado}
                      </span>
                    </td>
                    <td className="p-4 text-gray-400 text-sm hidden xl:table-cell">
                      <div className="flex items-center gap-1">
                        <FaUser className="text-blue-400 text-xs" />
                        <span className={tarea.usuarioAsignadoId ? "text-gray-300" : "text-gray-500"}>
                          {nombreUsuario(tarea.usuarioAsignadoId)}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 hidden lg:table-cell">
                      <span className={`text-sm font-medium ${prioridadColores[tarea.prioridad]}`}>
                        {prioridadIconos[tarea.prioridad]} {tarea.prioridad}
                      </span>
                    </td>
                    <td className="p-4 text-gray-400 text-sm hidden lg:table-cell">
                      {tarea.fechaVencimiento}
                    </td>
                    {(canEditTarea || canDeleteTarea || canUpdateTareaEstado) && (
                      <td className="p-4">
                        <div className="flex items-center justify-end gap-2">
                          {canEditTarea ? (
                            <button
                              onClick={() => abrirModalEditar(tarea)}
                              className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-900/20 rounded-lg transition"
                              title="Editar"
                            >
                              <FaEdit />
                            </button>
                          ) : canUpdateTareaEstado && (
                            <button
                              onClick={() => abrirModalEditar(tarea)}
                              className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-900/20 rounded-lg transition"
                              title="Actualizar estado"
                            >
                              <FaEdit />
                            </button>
                          )}
                          {canDeleteTarea && (
                            <button
                              onClick={() => setConfirmandoEliminar(tarea.id!)}
                              className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-900/20 rounded-lg transition"
                              title="Eliminar"
                            >
                              <FaTrash />
                            </button>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
                {tareas.length === 0 && (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-gray-500">
                      No hay tareas aún. ¡Creá la primera!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            </div>
          </div>

          {/* Vista Mobile: Cards */}
          <div className="md:hidden space-y-4">
            {tareas.length === 0 ? (
              <div className="bg-gray-900 rounded-lg border border-gray-800 p-6 text-center text-gray-100">
                No hay tareas aún. ¡Creá la primera!
              </div>
            ) : (
              tareas.map((tarea) => (
                <div
                  key={tarea.id}
                  className="bg-gray-900 rounded-lg border border-gray-800 p-4 space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-100 mb-1">
                        {tarea.titulo}
                      </h3>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`inline-block px-2 py-1 text-xs rounded-full ${estadoColores[tarea.estado] || "bg-gray-800 text-gray-400"}`}>
                          {tarea.estado}
                        </span>
                        <span className={`text-sm font-medium ${prioridadColores[tarea.prioridad]}`}>
                          {prioridadIconos[tarea.prioridad]} {tarea.prioridad}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <span className="text-gray-500">Proyecto:</span>
                        <p className="text-gray-300 truncate">{nombreProyecto(tarea.proyectoId)}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Vencimiento:</span>
                        <p className="text-gray-300">{tarea.fechaVencimiento}</p>
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-500 flex items-center gap-1">
                        <FaUser className="text-blue-400 text-xs" /> Asignado a:
                      </span>
                      <p className={`text-xs mt-1 ${tarea.usuarioAsignadoId ? "text-gray-300" : "text-gray-500"}`}>
                        {nombreUsuario(tarea.usuarioAsignadoId)}
                      </p>
                    </div>
                  </div>

                  {(canEditTarea || canDeleteTarea || canUpdateTareaEstado) && (
                    <div className="flex gap-2 pt-3 border-t border-gray-800">
                      {(canEditTarea || canUpdateTareaEstado) && (
                        <button
                          onClick={() => abrirModalEditar(tarea)}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition text-sm font-medium"
                        >
                          <FaEdit />
                          {canEditTarea ? "Editar" : "Cambiar Estado"}
                        </button>
                      )}
                      {canDeleteTarea && (
                        <button
                          onClick={() => setConfirmandoEliminar(tarea.id!)}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition text-sm font-medium"
                        >
                          <FaTrash />
                          Eliminar
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
        </div>
        </div>

        {/* Modal Crear / Editar */}
        {modalAbierto && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 rounded-2xl border border-gray-800 w-full max-w-lg shadow-2xl max-h-[90vh] flex flex-col">
              <div className="p-4 sm:p-6 border-b border-gray-800">
                <h2 className="text-lg sm:text-xl font-bold text-gray-100">
                  {canEditTarea 
                    ? (tareaEditando ? "Editar Tarea" : "Nueva Tarea")
                    : "Actualizar Estado de Tarea"}
                </h2>
              </div>
              <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 overflow-y-auto">

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Título *
                  </label>
                  <input
                    name="titulo"
                    value={formData.titulo}
                    onChange={handleChange}
                    disabled={!canEditTarea}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="Título de la tarea"
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
                    disabled={!canEditTarea}
                    rows={3}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="Descripción de la tarea"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Proyecto *
                  </label>
                  <select
                    name="proyectoId"
                    value={formData.proyectoId}
                    onChange={handleChange}
                    disabled={!canEditTarea}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <option value={0}>Seleccioná un proyecto</option>
                    {proyectos.map((p) => (
                      <option key={p.id} value={p.id}>{p.nombre}</option>
                    ))}
                  </select>
                </div>

                {canEditTarea && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      <FaUser className="inline mr-2 text-blue-400 text-xs" />
                      Asignar a Usuario
                    </label>
                    <select
                      name="usuarioAsignadoId"
                      value={formData.usuarioAsignadoId || ""}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Sin asignar</option>
                      {usuarios.map((usuario) => (
                        <option key={usuario.id} value={usuario.id}>
                          {usuario.nombre}
                        </option>
                      ))}
                    </select>
                    <p className="text-xs text-gray-500 mt-1">
                      Opcional: Asignar esta tarea a un usuario específico
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Estado {!canEditTarea && "(Solo este campo se puede editar)"}
                    </label>
                    <select
                      name="estado"
                      value={formData.estado}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="pendiente">Pendiente</option>
                      <option value="en-progreso">En Progreso</option>
                      <option value="completada">Completada</option>
                      <option value="cancelada">Cancelada</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Prioridad
                    </label>
                    <select
                      name="prioridad"
                      value={formData.prioridad}
                      onChange={handleChange}
                      disabled={!canEditTarea}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <option value="baja">🟢 Baja</option>
                      <option value="media">🟡 Media</option>
                      <option value="alta">🔴 Alta</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Fecha de Vencimiento *
                  </label>
                  <input
                    type="date"
                    name="fechaVencimiento"
                    value={formData.fechaVencimiento}
                    onChange={handleChange}
                    disabled={!canEditTarea}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>

                {error && (
                  <div className="bg-red-900/20 border border-red-800 text-red-400 px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
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
                    {canEditTarea 
                      ? (tareaEditando ? "Guardar Cambios" : "Crear Tarea")
                      : "Actualizar Estado"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal Confirmar Eliminar */}
        {confirmandoEliminar !== null && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 rounded-2xl border border-gray-800 w-full max-w-sm shadow-2xl p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-bold text-gray-100 mb-2">¿Eliminar tarea?</h2>
              <p className="text-sm sm:text-base text-gray-400 mb-6">Esta acción no se puede deshacer.</p>
              <div className="flex flex-col sm:flex-row gap-3">
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
