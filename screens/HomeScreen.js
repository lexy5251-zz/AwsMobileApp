import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import _ from "lodash";
import { Card } from "react-native-elements";
import { getData } from "../data";
import { useFocusEffect } from "@react-navigation/native";
import ProgressBar from "../components/ProgressBar";

export default function HomeScreen({ navigation }) {
  const [c01Progress, setC01Progress] = useState({});
  const [c02Progress, setC02Progress] = useState({});


  useFocusEffect(
    React.useCallback(() => {
      getProgress("c01").then((p) => setC01Progress(p));
      getProgress("c02").then((p) => setC02Progress(p));
      return () => {};
    }, [])
  );

  const getProgress = (examVersion) => {
    let key = `@${examVersion}_progress`;
    return getData(key).then((v) => {
      let progress = { total: 1185, learned: 0, mistakes: 0 };
      if (!v) {
        return progress;
      }
      let wrongNum = Object.values(v).filter((i) => i === "wrong").length;
      let correctNum = Object.values(v).filter((i) => i === "correct").length;
      progress.learned = correctNum;
      progress.mistakes = wrongNum;
      return progress;
    });
  };

  const progressToBarData = (progress) => {
    let data = [];
    if (!progress || !progress.total) {
      return data;
    }
    let v1 = (progress.learned / progress.total) * 100;
    if (v1) {
      if (v1 < 5) {
        v1 = 5;
      }
      data.push({ value: v1, color: "#49CFAE" });
    }
    let v2 = (progress.mistakes / progress.total) * 100;
    if (v2) {
      if (v2 < 5) {
        v2 = 5;
      }
      data.push({ value: v2, color: "#EC5563" });
    }
    data.push({ value: 100 - v1 - v2, color: "#C2C0C0" });
    return data;
  };

  const onStudyPressed = (examVersion) => {
    navigation.navigate("Study", { examVersion });
  };

  const onTestPressed = (examVersion) => {
    navigation.navigate("TestMenu", { examVersion });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Hello, Good Morning</Text>
      <Card
        containerStyle={{
          shadowColor: "#C2C0C0",
          shadowOpacity: 0.2,
          border: "none",
          backgroundColor: "#FAFAFB",
          elevation: 5,
        }}
      >
        <View style={styles.cardTitle}>
          <Text style={styles.textFont}>Sample</Text>
          <Text style={styles.total}>
            Total {c01Progress ? c01Progress.total : 0} Questions
          </Text>
        </View>
        <View style={{ height: 50, width: "100%" }}>
          <ProgressBar data={progressToBarData(c01Progress)} />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              onStudyPressed("c01");
            }}
          >
            <Text style={styles.text}>Study</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              onTestPressed("c01");
            }}
          >
            <Text style={styles.text}>Test</Text>
          </TouchableOpacity>
        </View>
      </Card>

      <Card
        containerStyle={{
          shadowColor: "#C2C0C0",
          shadowOpacity: 0.2,
          border: "none",
          backgroundColor: "#FAFAFB",
          elevation: 5,
        }}
      >
        <View style={styles.cardTitle}>
          <Text style={styles.textFont}>c02</Text>
          <Text style={styles.total}>
            Total {c02Progress ? c02Progress.total : 0} Questions
          </Text>
        </View>
        <View style={{ height: 50, width: "100%" }}>
          <ProgressBar data={progressToBarData(c02Progress)} />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              onStudyPressed("c02");
            }}
          >
            <Text style={styles.text}>Study</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              onTestPressed("c02");
            }}
          >
            <Text style={styles.text}>Test</Text>
          </TouchableOpacity>
        </View>
      </Card>
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
  cardTitle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },

  textFont: {
    fontFamily: "Avenir-Black",
    fontSize: 16,
  },
  total: {
    fontFamily: "Avenir-Black",
    color: "#4A4949",
    fontSize: 12,
  },
});
