import React from "react";
import { View, StyleSheet } from "react-native";
import { useState } from "react";
import QuestionViewerComponent from "../components/QuestionViewerComponent";
import { getData } from "../data";
import { useFocusEffect } from "@react-navigation/native";
import { questionCount } from "../data/questions";
import _ from "lodash";

export default function StudyScreen({ route }) {
  const { examVersion } = route.params;
  const [idMap, setIdMap] = useState({
    all: [],
    saved: [],
    mistakes: [],
    unfinished: [],
    learned: [],
  });
  const [filter, setFilter] = useState("all");
  const [viewmode, setViewMode] = useState("browse");

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
    let mistakes = _.isEmpty(progress)
      ? []
      : Object.keys(progress).filter((k) => progress[k] === "wrong");
    let learned = _.isEmpty(progress)
      ? []
      : Object.keys(progress).filter((k) => progress[k] === "correct");
    let unfinished = _.difference(all, mistakes);
    unfinished = _.difference(unfinished, learned);
    return { all, saved, mistakes, unfinished, learned };
  };

  const questionIdIterator = (filter, startIndex = -1) => {
    if (_.isEmpty(idMap[filter])) {
      // TODO: add no question warning
      return;
    }
    return {
      questionIdArray: idMap[filter],
      i: startIndex,
      hasNext: function () {
        return this.i + 1 < this.questionIdArray.length;
      },
      hasPrevious: function () {
        return this.i - 1 > 0;
      },
      next: function () {
        return this.questionIdArray[++this.i];
      },
      previous: function () {
        return this.questionIdArray[--this.i];
      },
    };
  };

  return (
    <View style={styles.view}>
      {questionIdIterator(filter) && true && (
        <QuestionViewerComponent
          questionIdIterator={questionIdIterator(filter)}
          examVersion={examVersion}
          showAnswerOnQuestionChange={viewmode === "challenge"}
          alwaysShowAnswer={viewmode === "browse"}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
});
