import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import _ from "lodash";

export default function TestMenuScreen({ route, navigation }) {
  const { examVersion } = route.params;

  const onStartPressed = () => {
    navigation.navigate("Test", { examVersion, resumingSession: {} });
  };

  const onResumePressed = () => {
    navigation.navigate("Test", { examVersion, resumingSession: {} });
  };

  const onHistoryPressed = () => {
    navigation.navigate("TestHistory", { examVersion });
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={onResumePressed}>
          <Text style={styles.text}>Resume</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onStartPressed}>
          <Text style={styles.text}>Start</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onHistoryPressed}>
          <Text style={styles.text}>History</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: "4%",
    padding: "2%",
  },

  titleText: {
    paddingLeft: "5%",
    fontSize: 18,
    fontFamily: "Avenir-Book",
  },

  buttonContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  button: {
    flexBasis: "45%",
    alignItems: "center",
    backgroundColor: "#F1BC5E",
    borderRadius: 5,
    padding: 12,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: "#C2C0C0",
    shadowOpacity: 0.2,
    elevation: 5,
  },
  text: {
    color: "#fff",
  },
});
