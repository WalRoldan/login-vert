import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../store/useAuthStore";
import { fetchActivities } from "../api/stravaApi";

const ActivitiesScreen = () => {
  const { userToken } = useAuthStore();

  // Uso correcto de useQuery en v5
  const { data, isLoading, error } = useQuery({
    queryKey: ["activities"], // Clave de la consulta
    queryFn: () => fetchActivities(userToken), // Función de la consulta
  });

  if (isLoading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text>Error al cargar actividades</Text>;

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.activityItem}>
            <Text>{item.name}</Text>
            <Text>{new Date(item.start_date).toLocaleDateString()}</Text>
            <Text>Distancia: {item.distance} metros</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  activityItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});

export default ActivitiesScreen;
