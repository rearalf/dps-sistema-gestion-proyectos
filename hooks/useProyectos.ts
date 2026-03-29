import { useState } from "react";
import {
  Proyecto,
  crearProyecto,
  actualizarProyecto,
  eliminarProyecto,
} from "@/lib/services/proyectos.service";

const estadoInicial: Omit<Proyecto, "id"> = {
  nombre: "",
  descripcion: "",
  fechaInicio: "",
  fechaFin: "",
  estado: "planificacion",
  gerenteId: 1,
  usuariosAsignados: [],
};

function useProyectos(onSuccess: () => void) {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [proyectoEditando, setProyectoEditando] = useState<Proyecto | null>(null);
  const [formData, setFormData] = useState<Omit<Proyecto, "id">>(estadoInicial);
  const [error, setError] = useState("");
  const [confirmandoEliminar, setConfirmandoEliminar] = useState<number | null>(null);

  const abrirModalCrear = () => {
    setProyectoEditando(null);
    setFormData(estadoInicial);
    setError("");
    setModalAbierto(true);
  };

  const abrirModalEditar = (proyecto: Proyecto) => {
    setProyectoEditando(proyecto);
    setFormData({
      nombre: proyecto.nombre,
      descripcion: proyecto.descripcion,
      fechaInicio: proyecto.fechaInicio,
      fechaFin: proyecto.fechaFin,
      estado: proyecto.estado,
      gerenteId: proyecto.gerenteId,
      usuariosAsignados: proyecto.usuariosAsignados,
    });
    setError("");
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setProyectoEditando(null);
    setFormData(estadoInicial);
    setError("");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.nombre.trim() || !formData.fechaInicio || !formData.fechaFin) {
      setError("Nombre, fecha de inicio y fecha de fin son obligatorios");
      return;
    }

    try {
      if (proyectoEditando?.id) {
        await actualizarProyecto(proyectoEditando.id, formData);
      } else {
        await crearProyecto(formData);
      }
      cerrarModal();
      onSuccess();
    } catch {
      setError("Error al guardar el proyecto. Intenta de nuevo.");
    }
  };

  const handleEliminar = async (id: number) => {
    try {
      await eliminarProyecto(id);
      setConfirmandoEliminar(null);
      onSuccess();
    } catch {
      setError("Error al eliminar el proyecto.");
    }
  };

  return {
    modalAbierto,
    proyectoEditando,
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

export default useProyectos;
