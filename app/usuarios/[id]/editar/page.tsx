"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  getUsuarioById,
  updateUsuario,
} from "@/lib/services/usuarios.service";
import { Usuario } from "@/interfaces/user.interface";
import Sidebar from "@/components/Sidebar";

export default function EditarUsuarioPage() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmPassword: "",
    rol: "usuario" as "gerente" | "usuario",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const fetchUsuario = async () => {
    setLoading(true);
    const response = await getUsuarioById(id);
    if (response.success && !Array.isArray(response.data)) {
      const usuario = response.data as Usuario;
      setFormData({
        nombre: usuario.nombre,
        email: usuario.email,
        password: "",
        confirmPassword: "",
        rol: usuario.rol,
      });
    } else {
      alert("Error al cargar el usuario");
      router.push("/usuarios");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsuario();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es requerido";
    }

    if (!formData.email.trim()) {
      newErrors.email = "El email es requerido";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "El email no es válido";
    }

    // Si se ingresó una contraseña, validarla
    if (formData.password) {
      if (formData.password.length < 6) {
        newErrors.password = "La contraseña debe tener al menos 6 caracteres";
      }

      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Las contraseñas no coinciden";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setSaving(true);

    const updateData: {
      nombre: string;
      email: string;
      rol: "gerente" | "usuario";
      password?: string;
    } = {
      nombre: formData.nombre,
      email: formData.email,
      rol: formData.rol,
    };

    // Solo incluir contraseña si se ingresó una nueva
    if (formData.password) {
      updateData.password = formData.password;
    }

    const response = await updateUsuario(id, updateData);

    if (response.success) {
      alert(response.message);
      router.push("/usuarios");
    } else {
      alert(response.message);
      setSaving(false);
    }
  };

  const handleCancel = () => {
    router.push("/usuarios");
  };

  if (loading) {
    return (
      <>
        <Sidebar />
        <div className="lg:ml-64 min-h-screen bg-gray-950 flex items-center justify-center flex-1 w-full">
          <div className="text-xl text-gray-100">Cargando...</div>
        </div>
      </>
    );
  }

  return (
    <>
      <Sidebar />
      <div className="lg:ml-64 min-h-screen bg-gray-950 flex-1 w-full">
        <div className="pt-14 lg:pt-0">
        <div className="py-4 sm:py-6 lg:py-8">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-900 shadow-md rounded-lg border border-gray-800 p-4 sm:p-6">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-100 mb-4 sm:mb-6">
            Editar Usuario
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="nombre"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Nombre Completo
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md shadow-sm bg-gray-800 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.nombre ? "border-red-500" : "border-gray-700"
                }`}
                placeholder="Ingrese el nombre completo"
              />
              {errors.nombre && (
                <p className="mt-1 text-sm text-red-400">{errors.nombre}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md shadow-sm bg-gray-800 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.email ? "border-red-500" : "border-gray-700"
                }`}
                placeholder="usuario@ejemplo.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-400">{errors.email}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Nueva Contraseña (dejar en blanco para no cambiar)
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md shadow-sm bg-gray-800 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.password ? "border-red-500" : "border-gray-700"
                }`}
                placeholder="Mínimo 6 caracteres"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-400">{errors.password}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Confirmar Nueva Contraseña
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md shadow-sm bg-gray-800 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-700"
                }`}
                placeholder="Confirme la contraseña"
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="rol"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Rol
              </label>
              <select
                id="rol"
                name="rol"
                value={formData.rol}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm bg-gray-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="usuario">Usuario</option>
                <option value="gerente">Gerente</option>
              </select>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 sm:py-2 px-4 rounded-md font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors text-sm sm:text-base"
              >
                {saving ? "Guardando..." : "Guardar Cambios"}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                disabled={saving}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2.5 sm:py-2 px-4 rounded-md font-semibold disabled:bg-gray-200 disabled:cursor-not-allowed transition-colors text-sm sm:text-base"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
        </div>
      </div>
        </div>
      </div>
    </>
  );
}
