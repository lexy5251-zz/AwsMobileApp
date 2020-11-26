import React from "react";
import { View, StyleSheet, Text, Switch } from "react-native";
import { useState, useRef } from "react";
import QuestionViewerComponent from "../components/QuestionViewerComponent";
import { getData } from "../data";
import { useFocusEffect } from "@react-navigation/native";
import { questionCount } from "../data/questions";
import _ from "lodash";
import OptionsMenu from "../components/OptionMenuComponent";
import Toast from "react-native-easy-toast";

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
  const [mode, setMode] = useState("browse");
  const [questionIndex, setQuestionIndex] = useState(0);
  const toast = useRef(null);

  useFocusEffect(
    React.useCallback(() => {
      fetchQuestionIds(examVersion).then((v) => setIdMap(v));
      return () => {};
    }, [])
  );

  const onFilterSelected = (selected) => {
    fetchQuestionIds(examVersion).then((v) => {
      if (_.isEmpty(v[selected])) {
        toast.current.show("no questions");
        return;
      }
      setQuestionIndex(0);
      setIdMap(v);
      setFilter(selected);
      toast.current.show(`filtered by ${selected}`);
    });
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

  const questionIdIterator = (filter, startIndex = 0) => {
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

  let filterOptions = [
    "All",
    "Mistakes",
    "Learned",
    "Unfinished",
    "Saved",
    "Cancel",
  ];
  filterOptions = filterOptions.map((s) => {
    if (s === filter) {
      return `${s}   \u2713`;
    }
    return s;
  });
  let modeOptions = ["Challenge mode   \u2713", "Browse mode", "Cancel"];
  if (mode === "browse") {
    modeOptions = ["Challenge mode", "Browse mode    \u2713", "Cancel"];
  }

  const MyIcon = ({ filter }) => {
    return <Text>Filtered By:{filter}</Text>;
  };
  const toggleSwitch = (value) => {
    if (value) {
      setMode("browse");
    } else {
      setMode("challenge");
    }
  };

  return (
    <View style={styles.view}>
      <View style={styles.controllerStyle}>
        <View>
          <Switch
            trackColor={{ false: "#C2C0C0", true: "#F1BC5E" }}
            onValueChange={(value) => toggleSwitch(value)}
            value={mode === "browse"}
            style={{ transform: [{ scaleX: 0.9 }, { scaleY: 0.8 }] }}
          />
          <Text style={styles.toggleText}>Show Anwser</Text>
        </View>
        <View style={styles.filterStyle}>
          <OptionsMenu
            customButton={<MyIcon filter={filter} />}
            options={filterOptions}
            actions={[
              () => onFilterSelected("All"),
              () => onFilterSelected("Mistakes"),
              () => onFilterSelected("Learned"),
              () => onFilterSelected("Unfinished"),
              () => onFilterSelected("Saved"),
            ]}
          />
        </View>
      </View>

      {questionIdIterator(filter) && true && (
        <QuestionViewerComponent
          questionIdIterator={questionIdIterator(filter, questionIndex)}
          examVersion={examVersion}
          showAnswerOnQuestionChange={mode === "challenge"}
          alwaysShowAnswer={mode === "browse"}
          showQuestionLabels={true}
        />
      )}
      <Toast ref={toast} />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    paddingTop: "2%",
    backgroundColor: "#ffffff",
  },

  filterStyle: {
    display: "flex",
    flexDirection: "row",
  },

  controllerStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    alignItems: "center",
  },
  toggleText: {
    fontSize: 9,
    fontFamily: "Avenir-Heavy",
  },

  pageNumberStyle: {
    textAlign: "center",
  },
});
