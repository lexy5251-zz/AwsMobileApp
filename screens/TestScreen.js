import React from "react";
import { View, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { questionCount } from "../data/questions";
import QuestionViewerComponent from "../components/QuestionViewerComponent";
import _ from "lodash";
import { getData, storeData } from "../data";
import Dialog from "react-native-dialog";


export default function TestScreen({ route, navigation }) {
  const { examVersion, resumingSession } = route.params;
  const [session, setSession] = useState(resumingSession);
  const [finishDialogVisible, setFinishDialogVisible] = useState(false);

  useEffect(() => {
    if (!_.isEmpty(resumingSession)) {
      return;
    }
    createNewSession().then((s) => setSession(s));
    return () => {};
  }, []);

  const createNewSession = async () => {
    let qc = await questionCount(examVersion);
    let all = [];
    for (let i = 1; i <= qc; i++) {
      all.push(`${i}`);
    }
    let shuffled = _.shuffle(all);
    let session = { examVersion, questionIds: [], choices: [], currentIndex: 0, correctQuestionIds:[], durationMs: 0};
    for (let i = 0; i < 2; i++) {
      session.questionIds.push(shuffled[i]);
      session.choices.push([]);
    }
    session.currentQuestionStartTimeMs = _.now();
    await storeData(`test_session_${examVersion}`, session);
    return session;
  };

  const questionIdIterator = () => {
    if (_.isEmpty(session) || _.isEmpty(session.questionIds)) {
      // TODO: add no question warning
      return;
    }
    return {
      questionIdArray: session.questionIds,
      i: session.currentIndex,
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

  const handleChoicesChange = (index, choices, isCorrect) => {
    session.choices[index] = choices;
    let id = session.questionIds[index];
    if (isCorrect && !_.includes(id)) {
      session.correctQuestionIds.push(id);
    } else if (!isCorrect && _.includes(id)) {
      session.correctQuestionIds = session.correctQuestionIds.filter((v) => v !== id);
    }
    storeData(`test_session_${examVersion}`, session);
  };

  const handleQuestionChange = (index) => {
    session.durationMs = session.durationMs + _.now() - session.currentQuestionStartTimeMs;
    session.currentIndex = index;
    session.currentQuestionStartTimeMs = _.now();
    storeData(`test_session_${examVersion}`, session);
  }

  const finishTest = () => {
    session.endTimeMs = _.now();
    getData(`test_history_${examVersion}`).then(h => {
      if (!h) {
        h = [];
      }
      h.push(session);
      return storeData(`test_history_${examVersion}`, h);
    }).then(() => {
      return storeData(`test_session_${examVersion}`, null);
    }).then(() => {
      showTestResult();
    })
  };

  const showTestResult = () => {
    navigation.replace("TestHistory", { examVersion });
  };

  return (
    <View style={styles.view}>
      <Dialog.Container visible={finishDialogVisible}>
        <Dialog.Title>Finish test</Dialog.Title>
        <Dialog.Description>
          This is the last question, finish test?
        </Dialog.Description>
        <Dialog.Button label="No" onPress={() => setFinishDialogVisible(false)} />
        <Dialog.Button label="Yes" onPress={() => {
          setFinishDialogVisible(false);
          finishTest();
        }} />
      </Dialog.Container>
      {questionIdIterator() && true && (
        <QuestionViewerComponent
          onChoicesChange={handleChoicesChange}
          onQuestionChange={handleQuestionChange}
          onLastQuestionFinished={() => setFinishDialogVisible(true)}
          questionIdIterator={questionIdIterator()}
          examVersion={examVersion}
          selectedChoicesForIndex={(index) => session.choices[index]}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    paddingTop: "2%",
    backgroundColor: '#ffffff'
  },
});
