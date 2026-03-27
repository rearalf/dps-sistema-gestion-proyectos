"use client";
import { useEffect, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { useLoadingStore } from "@/store/useLoadingStore";

interface ProtectedRouteProps {
  children: React.ReactNode;
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

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();
  const isClient = useIsClient();
  const hasStoredUser = isClient ? getStoredAuth() : false;
  const startLoading = useLoadingStore((state) => state.startLoading);
  const stopLoading = useLoadingStore((state) => state.stopLoading);

  const isReady = isClient && isAuthenticated && !!user;

  useEffect(() => {
    if (isClient && !hasStoredUser && (!isAuthenticated || !user)) {
      router.replace("/login");
    }
  }, [isClient, hasStoredUser, isAuthenticated, user, router]);

  useEffect(() => {
    if (!isReady) {
      startLoading();
    }
    return () => stopLoading();
  }, [isReady, startLoading, stopLoading]);

  if (!isReady) {
    return null;
  }

  return <>{children}</>;
}
