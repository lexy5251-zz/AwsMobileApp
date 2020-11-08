import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { createQuestions } from "../test/TestData";
import _ from "lodash";
import { Card } from "react-native-elements";
import { getData } from "../data";
import ProgressBar from "../components/ProgressBar";
import { questionCount } from "../data/questions";
import { useFocusEffect } from "@react-navigation/native";

export default function QuestionViewerOptionScreen({ route, navigation }) {
  const { examVersion } = route.params;
  const [idMap, setIdMap] = useState({
    all: [],
    saved: [],
    mistakes: [],
    unfinished: [],
  });

  useFocusEffect(
    React.useCallback(() => {
      fetchQuestionIds(examVersion).then((v) => setIdMap(v));
      return () => {};
    }, [])
  );

  const fetchQuestionIds = async (examVersion) => {
    let qc = await questionCount(examVersion);
    let progress = await getData(`@${examVersion}_progress`);
    let saved = await getData(`@${examVersion}_saved`);
    let all = [];
    for (let i = 1; i <= qc; i++) {
      all.push(`${i}`);
    }
    let mistakes = Object.keys(progress).filter((k) => progress[k] === "wrong");
    let learned = Object.keys(progress).filter(
      (k) => progress[k] === "correct"
    );
    let unfinished = _.difference(all, mistakes);
    unfinished = _.difference(unfinished, learned);
    return { all, saved, mistakes, unfinished };
  };

  const questionIdIterator = (ids, startIndex) => {
    return {
      questionIdArray: ids,
      i: startIndex,
      hasNext: function () {
        return this.i < this.questionIdArray.length;
      },
      hasPrevious: function () {
        return this.i > 0;
      },
      next: function () {
        return this.questionIdArray[this.i++];
      },
      previous: function () {
        return this.questionIdArray[this.i--];
      },
    };
  };

  const onAllPressed = () => {
    let ids = idMap["all"];
    if (_.isEmpty(ids)) {
      // TODO: show warning or disable button
      return;
    }
    navigation.navigate("QuestionViewer", {
      examVersion,
      questionIdIterator: questionIdIterator(ids, 5),
    });
  };

  const onMistakesPressed = () => {
    let ids = idMap["mistakes"];
    if (_.isEmpty(ids)) {
      // TODO: show warning or disable button
      return;
    }
    navigation.navigate("QuestionViewer", {
      examVersion,
      questionIdIterator: questionIdIterator(ids, 0),
    });
  };

  const onSavedPressed = () => {
    let ids = idMap["saved"];
    if (_.isEmpty(ids)) {
      // TODO: show warning or disable button
      return;
    }
    navigation.navigate("QuestionViewer", {
      examVersion,
      questionIdIterator: questionIdIterator(ids, 0),
    });
  };

  const onUnfinishedPressed = () => {
    let ids = idMap["learned"];
    if (_.isEmpty(ids)) {
      // TODO: show warning or disable button
      return;
    }
    navigation.navigate("QuestionViewer", {
      examVersion,
      questionIdIterator: questionIdIterator(ids, 0),
    });
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
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={onAllPressed}
          >
            <Text style={styles.text}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={onSavedPressed}
          >
            <Text style={styles.text}>Mistakes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={onMistakesPressed}
          >
            <Text style={styles.text}>Saved</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={onUnfinishedPressed}
          >
            <Text style={styles.text}>Unfinished</Text>
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
