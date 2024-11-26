import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./src/api/queryClient"; // Importa tu configuración de QueryClient
import MainTabs from "./src/navigation/MainTabs";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <MainTabs />
      </NavigationContainer>
    </QueryClientProvider>
  );
}
