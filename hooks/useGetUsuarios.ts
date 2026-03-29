import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";

import { Usuario } from "@/interfaces/user.interface";
import { deleteUsuario, getAllUsuarios } from "@/lib/services/usuarios.service";
import { useAuthStore } from "@/store/useAuthStore";

function useGetUsuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedRol, setSelectedRol] = useState<string>("todos");
  const router = useRouter();
  const user = useAuthStore((state) => state.user);

  const fetchUsuarios = async () => {
    const response = await getAllUsuarios();
    if (response.success && Array.isArray(response.data)) {
      setUsuarios(response.data);
    } else {
      setError(response.message);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchUsuarios();
    })();
  }, []);

  const filteredUsuarios = useMemo(() => {
    if (selectedRol === "todos") {
      return usuarios;
    } else {
      return usuarios.filter((u) => u.rol === selectedRol);
    }
  }, [selectedRol, usuarios]);

  const handleDelete = async (id: number) => {
    if (window.confirm("¿Estás seguro de eliminar este usuario?")) {
      const response = await deleteUsuario(id);
      if (response.success) {
        alert(response.message);
        fetchUsuarios();
      } else {
        alert(response.message);
      }
    }
  };

  const handleEdit = (id: number) => {
    router.push(`/usuarios/${id}/editar`);
  };

  const handleCreate = () => {
    router.push("/usuarios/nuevo");
  };

  return {
    user,
    error,
    usuarios,
    selectedRol,
    filteredUsuarios,
    handleEdit,
    handleCreate,
    handleDelete,
    setSelectedRol,
  };
}

export default useGetUsuarios;
