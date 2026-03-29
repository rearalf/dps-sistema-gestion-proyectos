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
    <div className="flex items-center gap-2 sm:gap-4 bg-gray-900 px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-800 w-full lg:w-auto">
      {/* Avatar e info */}
      <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-full flex items-center justify-center shrink-0">
          <FaUser className="text-white text-sm sm:text-lg" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-gray-100 font-semibold text-sm sm:text-base truncate">{user.nombre}</p>
          <p className="text-gray-400 text-xs sm:text-sm truncate">{user.email}</p>
          <p className="text-gray-500 text-xs capitalize hidden sm:block">
            Rol: {user.rol}
          </p>
        </div>
      </div>

      {/* Botón de cerrar sesión */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition duration-200 shrink-0"
        title="Cerrar sesión"
      >
        <FaSignOutAlt className="text-sm sm:text-base" />
        <span className="hidden sm:inline text-sm">Cerrar sesión</span>
      </button>
    </div>
  );
}
