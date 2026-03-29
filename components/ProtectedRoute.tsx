"use client";
import { useEffect, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { useLoadingStore } from "@/store/useLoadingStore";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[]; // Roles permitidos para acceder a esta ruta
}

const emptySubscribe = () => () => {};

function useIsClient() {
  return useSyncExternalStore(emptySubscribe, () => true, () => false);
}

function getStoredAuth() {
  const stored = useAuthStore.persist
    .getOptions()
    .storage?.getItem("auth-storage");
  if (stored && typeof stored === "object" && "state" in stored) {
    const { state } = stored as {
      state: { isAuthenticated?: boolean; user?: unknown };
    };
    return state?.isAuthenticated && state?.user;
  }
  return false;
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();
  const isClient = useIsClient();
  const hasStoredUser = isClient ? getStoredAuth() : false;
  const startLoading = useLoadingStore((state) => state.startLoading);
  const stopLoading = useLoadingStore((state) => state.stopLoading);

  const isReady = isClient && isAuthenticated && !!user;
  const hasPermission = !allowedRoles || (user && allowedRoles.includes(user.rol));

  useEffect(() => {
    if (isClient && !hasStoredUser && (!isAuthenticated || !user)) {
      router.replace("/login");
    } else if (isReady && !hasPermission) {
      // Si el usuario está autenticado pero no tiene el rol adecuado, redirigir al dashboard
      router.replace("/");
    }
  }, [isClient, hasStoredUser, isAuthenticated, user, router, isReady, hasPermission]);

  useEffect(() => {
    if (!isReady) {
      startLoading();
    }
    return () => stopLoading();
  }, [isReady, startLoading, stopLoading]);

  if (!isReady || !hasPermission) {
    return null;
  }

  return <>{children}</>;
}
