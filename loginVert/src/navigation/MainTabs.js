import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

// Importa las pantallas
import ActivitiesScreen from "../screens/ActivitiesScreen";
import MonthlyStatsScreen from "../screens/MonthlyStatsScreen";
import MonthlyActivitiesScreen from "../screens/MonthlyActivitiesScreen";
import AuthScreen from "../screens/AuthScreen"; // Importa AuthScreen

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Configuración del Stack Navigator para las Actividades
function ActivitiesStack() {
  return (
    <Stack.Navigator>
      {/* Mantén "Activities" aquí si es importante */}
      <Stack.Screen name="Activities" component={ActivitiesScreen} />
      <Stack.Screen
        name="MonthlyActivities"
        component={MonthlyActivitiesScreen}
      />
    </Stack.Navigator>
  );
}

// Configuración del Bottom Tab Navigator
export default function MainTabs() {
  const userLoggedIn = false; // Aquí deberías revisar si el usuario está autenticado. Puedes usar Zustand para gestionar el estado de autenticación.

  return (
    <Stack.Navigator>
      {userLoggedIn ? (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;

              if (route.name === "ActivitiesTab") {
                iconName = "bicycle";
              } else if (route.name === "Monthly Stats") {
                iconName = "stats-chart";
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
        >
          <Tab.Screen name="ActivitiesTab" component={ActivitiesStack} />
          <Tab.Screen name="Monthly Stats" component={MonthlyStatsScreen} />
        </Tab.Navigator>
      ) : (
        // Si el usuario no está autenticado, mostramos la pantalla de Auth
        <Stack.Screen name="Auth" component={AuthScreen} />
      )}
    </Stack.Navigator>
  );
}
