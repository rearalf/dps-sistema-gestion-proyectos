import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/services/auth.service";
import { LoginCredentials } from "@/interfaces/user.interface";
import { useAuthStore } from "@/store/useAuthStore";

function useLogin() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<LoginCredentials>({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (!formData.email.trim() || !formData.password.trim()) {
        setError("Por favor completa todos los campos");
        setIsLoading(false);
        return;
      }

      const response = await login(formData);

      if (
        response.success &&
        response.data &&
        response.data.user &&
        response.data.accessToken
      ) {
        setAuth(response.data.user, response.data.accessToken);
        router.push("/");
      } else {
        setError(response.message || "Error al iniciar sesión");
      }
    } catch (_err) {
      setError("Error inesperado. Por favor intenta de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

export default useLogin;
