import { useState } from "react";
import {
  Tarea,
  crearTarea,
  actualizarTarea,
  eliminarTarea,
} from "@/lib/services/tareas.service";

const estadoInicial: Omit<Tarea, "id"> = {
  proyectoId: 0,
  titulo: "",
  descripcion: "",
  estado: "pendiente",
  prioridad: "media",
  usuarioAsignadoId: null,
  fechaCreacion: new Date().toISOString().split("T")[0],
  fechaVencimiento: "",
};

function useTareas(onSuccess: () => void) {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [tareaEditando, setTareaEditando] = useState<Tarea | null>(null);
  const [formData, setFormData] = useState<Omit<Tarea, "id">>(estadoInicial);
  const [error, setError] = useState("");
  const [confirmandoEliminar, setConfirmandoEliminar] = useState<number | null>(null);

  const abrirModalCrear = () => {
    setTareaEditando(null);
    setFormData({
      ...estadoInicial,
      fechaCreacion: new Date().toISOString().split("T")[0],
    });
    setError("");
    setModalAbierto(true);
  };

  const abrirModalEditar = (tarea: Tarea) => {
    setTareaEditando(tarea);
    setFormData({
      proyectoId: tarea.proyectoId,
      titulo: tarea.titulo,
      descripcion: tarea.descripcion,
      estado: tarea.estado,
      prioridad: tarea.prioridad,
      usuarioAsignadoId: tarea.usuarioAsignadoId,
      fechaCreacion: tarea.fechaCreacion,
      fechaVencimiento: tarea.fechaVencimiento,
    });
    setError("");
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setTareaEditando(null);
    setFormData(estadoInicial);
    setError("");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "proyectoId" || name === "usuarioAsignadoId" 
        ? (value === "" || value === "null" ? null : Number(value))
        : value,
    }));
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.titulo.trim() || !formData.fechaVencimiento || !formData.proyectoId) {
      setError("Título, proyecto y fecha de vencimiento son obligatorios");
      return;
    }

    try {
      if (tareaEditando?.id) {
        await actualizarTarea(tareaEditando.id, formData);
      } else {
        await crearTarea(formData);
      }
      cerrarModal();
      onSuccess();
    } catch {
      setError("Error al guardar la tarea. Intenta de nuevo.");
    }
  };

  const handleEliminar = async (id: number) => {
    try {
      await eliminarTarea(id);
      setConfirmandoEliminar(null);
      onSuccess();
    } catch {
      setError("Error al eliminar la tarea.");
    }
  };

  return {
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
  };
}

export default useTareas;
