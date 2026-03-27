import { useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "@/lib/services/auth.service";
import { useAuthStore } from "@/store/useAuthStore";
import type { RegisterFormData } from "@/interfaces/user.interface";

function useRegister() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<RegisterFormData>({
    nombre: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (
        !formData.nombre.trim() ||
        !formData.email.trim() ||
        (formData.password && !formData.password.trim())
      ) {
        setError("Por favor completa todos los campos");
        setIsLoading(false);
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        setError("Las contraseñas no coinciden");
        setIsLoading(false);
        return;
      }

      if (formData.password.length < 6) {
        setError("La contraseña debe tener al menos 6 caracteres");
        setIsLoading(false);
        return;
      }

      const { confirmPassword, ...userData } = formData;
      const response = await register({ ...userData, rol: "usuario" });

      if (
        response.success &&
        response.data &&
        response.data.user &&
        response.data.accessToken
      ) {
        setAuth(response.data.user, response.data.accessToken);
        router.push("/");
      } else {
        setError(response.message || "Error al registrar usuario");
      }
    } catch (_err) {
      setError("Error inesperado. Por favor intenta de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError("");
  };

  return {
    error,
    formData,
    isLoading,
    showPassword,
    setShowPassword,
    handleChange,
    handleSubmit,
  };
}

export default useRegister;
