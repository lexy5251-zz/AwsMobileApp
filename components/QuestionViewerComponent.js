import React from "react";
import { View, StyleSheet, Button } from "react-native";
import { useState, useEffect } from "react";
import QuestionComponent from "../components/QuestionComponent";
import { questionById } from "../data/questions";
import { getData, storeData } from "../data";
import _ from "lodash";

export default function QuestionViewerComponent({
  examVersion,
  questionIdIterator,
  showAnswerOnQuestionChange,
  alwaysShowAnswer,
  onChoicesChange,
}) {
  const [question, setQuestion] = useState();
  const [choices, setChoices] = useState([]);
  const [showAnswer, setShowAnswer] = useState(alwaysShowAnswer);
  useEffect(() => {
    loadNextQuestion();
    return () => {};
  }, []);

  const onChoiceClicked = (c) => {
    let currentChoices;
    if (choices.includes(c)) {
      currentChoices = choices.filter((i) => i !== c);
    } else {
      currentChoices = _.concat(choices, [c]);
    }
    setChoices(currentChoices);
    if (onChoicesChange) {
      // i stands for the index of the next question, so use i -1 here.
      onChoicesChange(questionIdIterator.i - 1, currentChoices);
    }
  };

  const loadNextQuestion = () => {
    if (questionIdIterator.hasNext()) {
      let id = questionIdIterator.next();
      questionById(examVersion, id).then((q) => {
        setQuestion(q);
        setChoices([]);
      });
    }
  };

  const loadPreviousQuestion = () => {
    if (questionIdIterator.hasPrevious()) {
      let id = questionIdIterator.previous();
      questionById(examVersion, id).then((q) => {
        setQuestion(q);
        setChoices([]);
      });
    }
  };

  const onQuestionChangeButtonClick = (direction) => {
    if (!alwaysShowAnswer) {
      if (!(showAnswerOnQuestionChange && showAnswer)) {
        saveProgress(question.id, choices, question.answers);
      }

      if (showAnswerOnQuestionChange && !showAnswer) {
        setShowAnswer(true);
        return;
      }
    }

    if (direction === -1 && questionIdIterator.hasPrevious()) {
      loadPreviousQuestion();
      return;
    }
    if (direction === 1 && questionIdIterator.hasNext()) {
      loadNextQuestion();
    }
  };

  const saveProgress = (id, choices, answers) => {
    if (_.isEmpty(choices)) {
      return;
    }
    let key = `@${examVersion}_progress`;
    getData(key).then((progress) => {
      if (!progress) {
        progress = {};
      }
      let result = "wrong";
      if (_.isEqual(choices, answers)) {
        result = "correct";
      }
      progress[id] = result;
      console.log("save progress", progress);
      return storeData(key, progress);
    });
  };

  return (
    <View style={styles.view}>
      {question && true && (
        <QuestionComponent
          question={question}
          selectedChoices={choices}
          showAnswer={showAnswer}
          onChoiceClicked={onChoiceClicked}
        ></QuestionComponent>
      )}
      <View style={styles.fixToText}>
        <Button title="Prev" onPress={() => onQuestionChangeButtonClick(-1)} />
        <Button title="Next" onPress={() => onQuestionChangeButtonClick(1)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  fixToText: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
