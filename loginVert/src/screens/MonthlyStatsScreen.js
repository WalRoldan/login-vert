import React from "react";
import { View, Text, StyleSheet } from "react-native";

const MonthlyStatsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Monthly Stats Screen</Text>
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

export default MonthlyStatsScreen;
