import React from "react";
import { View, StyleSheet, Button } from "react-native";
import { useState, useLayoutEffect } from "react";
import QuestionViewerComponent from "../components/QuestionViewerComponent";
import { getData } from "../data";
import { useFocusEffect } from "@react-navigation/native";
import { questionCount } from "../data/questions";
import RNPickerSelect from "react-native-picker-select";
import _ from "lodash";
import OptionsMenu from "../components/OptionMenuComponent";

const filterIcon = require("../assets/filter.png");

export default function StudyScreen({ navigation, route }) {
  const { examVersion } = route.params;
  const [idMap, setIdMap] = useState({
    all: [],
    saved: [],
    mistakes: [],
    unfinished: [],
    learned: [],
  });
  const [filter, setFilter] = useState("All");
  const [viewmode, setViewMode] = useState("browse");

  // const setHeaderRight = (currentFilter) => {
  //   let options = ["All", "Mistake", "Learned", "Saved"];
  //   options = options.map((s) => {
  //     if (s === currentFilter) {
  //       return `${s}   \u2713`;
  //     }
  //     return s;
  //   })
  //   navigation.setOptions({
  //     headerRight: () => (
  //       <OptionsMenu
  //         button={filterIcon}
  //         buttonStyle={{
  //           width: 32,
  //           height: 16,
  //           resizeMode: "contain",
  //         }}
  //         options={options}
  //         actions={[]}
  //       />
  //     ),
  //   });
  // }
  // useLayoutEffect(() => {
  //   setHeaderRight(filter);
  // }, [navigation]);

  useFocusEffect(
    React.useCallback(() => {
      fetchQuestionIds(examVersion).then((v) => setIdMap(v));
      return () => {};
    }, [])
  );

  const onFilterButtonPressed = () => {};

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
        return this.i - 1 >= 0;
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
          showQuestionLabels={true}
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
