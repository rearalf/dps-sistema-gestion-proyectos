"use client";
import { useEffect, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { useLoadingStore } from "@/store/useLoadingStore";

interface PublicRouteProps {
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

export default function PublicRoute({ children }: PublicRouteProps) {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();
  const isClient = useIsClient();
  const hasStoredUser = isClient ? getStoredAuth() : false;
  const startLoading = useLoadingStore((state) => state.startLoading);
  const stopLoading = useLoadingStore((state) => state.stopLoading);

  const isReady = isClient && !isAuthenticated && !hasStoredUser;

  useEffect(() => {
    if (isClient && (isAuthenticated || hasStoredUser)) {
      router.replace("/");
    }
  }, [isClient, isAuthenticated, hasStoredUser, router]);

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
