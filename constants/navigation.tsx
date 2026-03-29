import { NavItem } from "@/interfaces/components.interface";
import {
  FaHome,
  FaUsers,
  FaProjectDiagram,
  FaTasks,
} from "react-icons/fa";

export const NAV_ITEMS: NavItem[] = [
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
    name: "Proyectos",
    href: "/proyectos",
    icon: <FaProjectDiagram className="text-xl" />,
  },
  {
    name: "Tareas",
    href: "/tareas",
    icon: <FaTasks className="text-xl" />,
  },
];
