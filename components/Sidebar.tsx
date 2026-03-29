"use client";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";
import useSidebar from "@/hooks/useSidebar";

export default function Sidebar() {
  const { isOpen, setIsOpen, pathname, filteredNavItems } = useSidebar();

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-3 left-3 z-50 p-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors shadow-lg"
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <FaTimes className="text-xl" />
        ) : (
          <FaBars className="text-xl" />
        )}
      </button>

      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`
          w-64 bg-gray-900 min-h-screen fixed left-0 top-0 text-white z-40
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="p-6">
          <Link
            href="/"
            className="text-2xl font-bold text-white hover:text-blue-400 transition-colors block mb-8"
          >
            SGP
          </Link>
          <nav className="space-y-2">
            {filteredNavItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}
