"use client";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { FaUser, FaSignOutAlt } from "react-icons/fa";

export default function UserInfo() {
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    // Cerrar sesión usando el store de Zustand
    logout();

    // Redirigir al login
    router.push("/login");
  };

  if (!user) return null;

  return (
    <div className="flex items-center gap-4 bg-gray-900 px-4 py-3 rounded-lg border border-gray-800">
      {/* Avatar e info */}
      <div className="flex items-center gap-3 flex-1">
        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
          <FaUser className="text-white text-lg" />
        </div>
        <div>
          <p className="text-gray-100 font-semibold">{user.nombre}</p>
          <p className="text-gray-400 text-sm">{user.email}</p>
          <p className="text-gray-500 text-xs capitalize">
            Rol: {user.rol}
          </p>
        </div>
      </div>

      {/* Botón de cerrar sesión */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition duration-200"
        title="Cerrar sesión"
      >
        <FaSignOutAlt />
        <span className="hidden sm:inline">Cerrar sesión</span>
      </button>
    </div>
  );
}
