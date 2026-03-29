"use client";
import Sidebar from "@/components/Sidebar";
import useGetUsuarios from "@/hooks/useGetUsuarios";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function UsuariosPage() {
  const {
    user,
    error,
    usuarios,
    selectedRol,
    filteredUsuarios,
    handleEdit,
    handleCreate,
    handleDelete,
    setSelectedRol,
  } = useGetUsuarios();

  return (
    <>
      <Sidebar />
      <div className="lg:ml-64 min-h-screen flex-1 w-full bg-gray-950">
        <div className="pt-14 lg:pt-0">
          <div className="py-4 sm:py-6 lg:py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-50">
                    Gestión de Usuarios
                  </h1>
                  <p className="text-gray-400 mt-1 sm:mt-2 text-sm sm:text-base">
                    Administra todos los usuarios y gerentes del sistema
                  </p>
                </div>
                {user?.rol === "gerente" && (
                  <button
                    onClick={handleCreate}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
                  >
                    + Nuevo Usuario
                  </button>
                )}
              </div>

              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  {error}
                </div>
              )}

              {/* Filtro de roles */}
              <div className="mb-4 sm:mb-6">
                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={() => setSelectedRol("todos")}
                    className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base ${
                      selectedRol === "todos"
                        ? "bg-blue-600 text-white"
                        : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    Todos ({usuarios.length})
                  </button>
                  <button
                    onClick={() => setSelectedRol("usuario")}
                    className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base ${
                      selectedRol === "usuario"
                        ? "bg-green-600 text-white"
                        : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    Usuarios (
                    {usuarios.filter((u) => u.rol === "usuario").length})
                  </button>
                  <button
                    onClick={() => setSelectedRol("gerente")}
                    className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base ${
                      selectedRol === "gerente"
                        ? "bg-purple-600 text-white"
                        : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    Gerentes (
                    {usuarios.filter((u) => u.rol === "gerente").length})
                  </button>
                </div>
              </div>

              <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y">
                    <thead className="border-b border-gray-800">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs text-gray-400 font-medium uppercase tracking-wider">
                          ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs text-gray-400 font-medium uppercase tracking-wider">
                          Nombre
                        </th>
                        <th className="px-6 py-3 text-left text-xs text-gray-400 font-medium uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs text-gray-400 font-medium uppercase tracking-wider">
                          Rol
                        </th>
                        {user?.rol === "gerente" && (
                          <th className="px-6 py-3 text-right text-xs text-gray-400 font-medium uppercase tracking-wider">
                            Acciones
                          </th>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsuarios.length === 0 ? (
                        <tr>
                          <td
                            colSpan={user?.rol === "gerente" ? 5 : 4}
                            className="px-6 py-4 text-center text-gray-100"
                          >
                            No hay usuarios registrados
                          </td>
                        </tr>
                      ) : (
                        filteredUsuarios.map((usuario) => (
                          <tr
                            key={usuario.id}
                            className="border-b border-gray-800 hover:bg-gray-800/50 transition"
                          >
                            <td className="px-6 py-4 whitespace-nowrap text-sm p-4 text-gray-100 font-medium">
                              {usuario.id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm p-4 text-gray-100 font-medium">
                              {usuario.nombre}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">
                              <a
                                href={`mailto:${usuario.email}`}
                                className="text-blue-500 hover:text-blue-400 underline"
                              >
                                {usuario.email}
                              </a>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  usuario.rol === "gerente"
                                    ? "bg-purple-100 text-purple-800"
                                    : "bg-green-100 text-green-800"
                                }`}
                              >
                                {usuario.rol}
                              </span>
                            </td>
                            {user?.rol === "gerente" && (
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <div className="flex items-center justify-end gap-2">
                                  <button
                                    onClick={() => handleEdit(usuario.id)}
                                    className="p-2 text-gray-100 hover:text-blue-400 hover:bg-blue-900/20 rounded-lg transition"
                                    title="Editar"
                                  >
                                    <FaEdit size={18} />
                                  </button>
                                  <button
                                    onClick={() => handleDelete(usuario.id)}
                                    className="p-2 text-gray-100 hover:text-red-400 hover:bg-red-900/20 rounded-lg transition"
                                    title="Eliminar"
                                  >
                                    <FaTrash size={18} />
                                  </button>
                                </div>
                              </td>
                            )}
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
