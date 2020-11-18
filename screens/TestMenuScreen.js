import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { getData } from "../data";
import _ from "lodash";

export default function TestMenuScreen({ route, navigation }) {
  const { examVersion } = route.params;

  const onStartPressed = () => {
    navigation.navigate("Test", { examVersion, resumingSession: {} });
  };

  const onResumePressed = () => {
    getData('test_session').then(ss => navigation.navigate("Test", { examVersion, resumingSession: ss }));
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
    display: 'flex',
    flexDirection: "column",
    marginTop: '40%',
    alignItems: 'center'

  },

  button: {
    alignItems: "center",
    backgroundColor: "#F1BC5E",
    borderRadius: 5,
    padding: 15,
    margin: 10,
    width: '55%',
    shadowOffset: { width: 5, height: 5 },
    shadowColor: "#C2C0C0",
    shadowOpacity: 0.1,
    elevation: 5,
  },
  text: {
    color: "#fff",
  },
});
