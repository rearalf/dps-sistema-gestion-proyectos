import { useAuthStore } from "@/store/useAuthStore";

/**
 * Hook personalizado para manejar permisos basados en roles
 * 
 * Roles:
 * - Gerente: Puede crear, actualizar, eliminar y gestionar proyectos, tareas y usuarios
 * - Usuario: Puede ver proyectos asignados y actualizar el estado de tareas
 */
export const usePermissions = () => {
  const user = useAuthStore((state) => state.user);
  
  const isGerente = user?.rol === "gerente";
  const isUsuario = user?.rol === "usuario";
  
  return {
    // Permisos para proyectos
    canCreateProyecto: isGerente,
    canEditProyecto: isGerente,
    canDeleteProyecto: isGerente,
    canViewProyectos: true, // Todos pueden ver proyectos
    
    // Permisos para tareas
    canCreateTarea: isGerente,
    canEditTarea: isGerente,
    canDeleteTarea: isGerente,
    canUpdateTareaEstado: true, // Todos pueden actualizar estado de tareas
    canViewTareas: true, // Todos pueden ver tareas
    
    // Permisos para usuarios
    canCreateUsuario: isGerente,
    canEditUsuario: isGerente,
    canDeleteUsuario: isGerente,
    canViewUsuarios: isGerente, // Solo gerentes pueden ver lista de usuarios
    
    // Información del rol actual
    isGerente,
    isUsuario,
    userRole: user?.rol,
  };
};

export default usePermissions;
