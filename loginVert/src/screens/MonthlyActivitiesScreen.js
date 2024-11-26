import React from "react";
import { View, Text, StyleSheet } from "react-native";

const MonthlyActivitiesScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Monthly Activities Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MonthlyActivitiesScreen;
