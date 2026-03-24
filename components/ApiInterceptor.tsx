"use client";

import { useEffect } from "react";
import { api } from "@/lib/api";
import { useLoadingStore } from "@/store/useLoadingStore";

export const ApiInterceptor = () => {
  const startLoading = useLoadingStore((state) => state.startLoading);
  const stopLoading = useLoadingStore((state) => state.stopLoading);

  useEffect(() => {
    const requestInterceptor = api.interceptors.request.use(
      (config) => {
        startLoading();
        return config;
      },
      (error) => {
        stopLoading();
        return Promise.reject(error);
      }
    );

    const responseInterceptor = api.interceptors.response.use(
      (response) => {
        stopLoading();
        return response;
      },
      (error) => {
        stopLoading();
        return Promise.reject(error);
      }
    );

    // Cleanup al desmontar
    return () => {
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.response.eject(responseInterceptor);
    };
  }, [startLoading, stopLoading]);

  return null;
};
