import React from "react";
import { View, StyleSheet } from "react-native";
import { useState, useEffect} from "react";
import { questionCount } from "../data/questions";
import QuestionViewerComponent from "../components/QuestionViewerComponent";
import _ from 'lodash'

export default function TestScreen({ route }) {
  const {examVersion, resumingSession} = route.params;
  const [session, setSession] = useState(resumingSession);
  useEffect(() => { 
    if (!_.isEmpty(session)) {
      return;
    }
    createNewSession().then(s => setSession(s));
    return () => {};
  }, []);

  const createNewSession = async () => {
    let qc = await questionCount(examVersion);
    let all = [];
    for (let i = 1; i <= qc; i++) {
      all.push(`${i}`);
    }
    let shuffled = _.shuffle(all);
    let session = {questionIds: [], answers: [], currentIndex: 0};
    for (let i=0;i<65;i++) {
      session.questionIds.push(shuffled[i]);
      session.answers.push('');
    }
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
      {(questionIdIterator() && true) && <QuestionViewerComponent questionIdIterator={questionIdIterator()} examVersion={examVersion} showAnswerOnNext={false} alwaysShowAnswer={false}/>}
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
});
