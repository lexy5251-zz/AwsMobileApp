import React from "react";
import { View, StyleSheet, Button } from "react-native";
import { useState, useLayoutEffect } from "react";
import QuestionViewerComponent from "../components/QuestionViewerComponent";
import { getData } from "../data";
import { useFocusEffect } from "@react-navigation/native";
import { questionCount } from "../data/questions";
import _ from "lodash";
import OptionsMenu from "../components/OptionMenuComponent";
import Toast from "react-native-simple-toast";

const filterIcon = require("../assets/filter.png");
const viewIcon = require("../assets/viewmode.png");


export default function StudyScreen({ navigation, route }) {
  const { examVersion } = route.params;
  const [idMap, setIdMap] = useState({
    All: [],
    Saved: [],
    Mistakes: [],
    Unfinished: [],
    Learned: [],
  });
  const [filter, setFilter] = useState("All");
  const [viewmode, setViewMode] = useState("challenge");

  const setHeaderRight = (currentFilter, currentMode) => {
    let filterOptions = [
      "All",
      "Mistakes",
      "Learned",
      "Unfinished",
      "Saved",
      "Cancel",
    ];
    filterOptions = filterOptions.map((s) => {
      if (s === currentFilter) {
        return `${s}   \u2713`;
      }
      return s;
    });
    let modeOptions = ["Challenge mode   \u2713", "Browse mode", "Cancel"];
    if (currentMode === "browse") {
      modeOptions = ["Challenge mode", "Browse mode    \u2713", "Cancel"];
    }

    navigation.setOptions({
      headerRight: () => (
        <View style={{flexDirection:'row'}}>
          <OptionsMenu
            button={filterIcon}
            buttonStyle={{
              width: 32,
              height: 16,
              resizeMode: "contain",
            }}
            options={filterOptions}
            actions={[
              () => onFilterSelected("All"),
              () => onFilterSelected("Mistakes"),
              () => onFilterSelected("Learned"),
              () => onFilterSelected("Unfinished"),
              () => onFilterSelected("Saved"),
            ]}
          />
          <OptionsMenu
            button={viewIcon}
            buttonStyle={{
              width: 32,
              height: 16,
              resizeMode: "contain",
            }}
            options={modeOptions}
            actions={[
              () => onModeSelected("challenge"),
              () => onModeSelected("browse"),
            ]}
          />
        </View>
      ),
    });
  };
  useLayoutEffect(() => {
    setHeaderRight(filter);
  }, [navigation]);

  useFocusEffect(
    React.useCallback(() => {
      fetchQuestionIds(examVersion).then((v) => setIdMap(v));
      return () => {};
    }, [])
  );

  const onFilterSelected = (filter) => {
    fetchQuestionIds(examVersion).then((v) => {
      if (_.isEmpty(v[filter])) {
        Toast.show("No questions");
        return;
      }
      setIdMap(v);
      setFilter(filter);
      setHeaderRight(filter);
    });
  };

  const onModeSelected = (mode) => {
    setViewMode(mode);
    setHeaderRight(filter, mode);
  };

  const fetchQuestionIds = async (examVersion) => {
    let qc = await questionCount(examVersion);
    let progress = await getData(`@${examVersion}_progress`);
    let Saved = await getData(`@${examVersion}_saved`);
    let All = [];
    for (let i = 1; i <= qc; i++) {
      All.push(`${i}`);
    }
    let Mistakes = _.isEmpty(progress)
      ? []
      : Object.keys(progress).filter(
          (k) => !_.isEmpty(progress[k]) && progress[k].status === "wrong"
        );
    let Learned = _.isEmpty(progress)
      ? []
      : Object.keys(progress).filter(
          (k) => !_.isEmpty(progress[k]) && progress[k].status === "correct"
        );
    let Unfinished = _.difference(All, Mistakes);
    Unfinished = _.difference(Unfinished, Learned);
    return { All, Saved, Mistakes, Unfinished, Learned };
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
