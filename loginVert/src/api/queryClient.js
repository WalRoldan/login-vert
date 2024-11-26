import { QueryClient } from "@tanstack/react-query";

// Crea un cliente para React Query
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2, // Número de reintentos en caso de fallo
      refetchOnWindowFocus: false, // No refetch al reenfocar la ventana (opcional)
    },
  },
});
