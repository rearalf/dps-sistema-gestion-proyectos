"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import {
  FaHome,
  FaUsers,
  FaUserTie,
} from "react-icons/fa";

interface NavItem {
  name: string;
  href: string;
  icon: React.ReactNode;
  allowedRoles?: string[];
}

export default function Navbar() {
  const pathname = usePathname();
  const user = useAuthStore((state) => state.user);

  const navItems: NavItem[] = [
    {
      name: "Dashboard",
      href: "/",
      icon: <FaHome className="text-xl" />,
    },
    {
      name: "Usuarios",
      href: "/usuarios",
      icon: <FaUsers className="text-xl" />,
      allowedRoles: ["gerente"],
    },
    {
      name: "Gerentes",
      href: "/gerentes",
      icon: <FaUserTie className="text-xl" />,
      allowedRoles: ["gerente"],
    },
  ];

  // Filtrar items según el rol del usuario
  const filteredNavItems = navItems.filter((item) => {
    if (!item.allowedRoles) return true;
    return user && item.allowedRoles.includes(user.rol);
  });

  return (
    <nav className="bg-gray-900 border-b border-gray-800 mb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="text-white font-bold text-xl hover:text-blue-400 transition-colors"
            >
              SGP
            </Link>
            <div className="flex space-x-4">
              {filteredNavItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-gray-800 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    }`}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
