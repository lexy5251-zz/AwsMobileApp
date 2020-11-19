import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import QuestionComponent from "../components/QuestionComponent";
import { questionById } from "../data/questions";
import { getData, storeData } from "../data";
import _ from "lodash";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

export default function QuestionViewerComponent({
  examVersion,
  questionIdIterator,
  showAnswerOnQuestionChange,
  alwaysShowAnswer,
  onChoicesChange,
  onQuestionChange,
  onLastQuestionFinished,
  selectedChoicesForIndex,
}) {
  const [question, setQuestion] = useState();
  const [choices, setChoices] = useState([]);
  const [showAnswer, setShowAnswer] = useState(alwaysShowAnswer);
  useEffect(() => {
    loadNextQuestion();
    return () => { };
  }, []);

  const onChoiceClicked = (c) => {
    let currentChoices;
    if (choices.includes(c)) {
      currentChoices = choices.filter((i) => i !== c);
    } else {
      currentChoices = _.concat(choices, [c]);
    }
    setChoices(currentChoices);
    let currentQuestionIndex = questionIdIterator.i;
    if (onChoicesChange) {
      onChoicesChange(currentQuestionIndex, currentChoices);
    }
  };

  const loadNextQuestion = () => {
    if (questionIdIterator.hasNext()) {
      let id = questionIdIterator.next();
      if (onQuestionChange) {
        onQuestionChange(questionIdIterator.i);
      }
      questionById(examVersion, id).then((q) => {
        setQuestion(q);
        let cc = [];
        if (
          selectedChoicesForIndex &&
          !_.isEmpty(selectedChoicesForIndex(questionIdIterator.i))
        ) {
          cc = selectedChoicesForIndex(questionIdIterator.i);
        }
        setChoices(cc);
        setShowAnswer(alwaysShowAnswer);
      });
      return;
    }
  };

  const loadPreviousQuestion = () => {
    if (questionIdIterator.hasPrevious()) {
      let id = questionIdIterator.previous();
      if (onQuestionChange) {
        onQuestionChange(questionIdIterator.i);
      }
      questionById(examVersion, id).then((q) => {
        setQuestion(q);
        let cc = [];
        if (
          selectedChoicesForIndex &&
          !_.isEmpty(selectedChoicesForIndex(questionIdIterator.i))
        ) {
          cc = selectedChoicesForIndex(questionIdIterator.i);
        }
        setChoices(cc);
        setShowAnswer(alwaysShowAnswer);
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
    if (direction === 1) {
      if (questionIdIterator.hasNext()) {
        loadNextQuestion();
        return;
      }
      if (onLastQuestionFinished) {
        onLastQuestionFinished();
      }
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
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <View style={styles.container}>
        {question && true && (
          <QuestionComponent
            question={question}
            selectedChoices={choices}
            showAnswer={showAnswer}
            onChoiceClicked={onChoiceClicked}
          ></QuestionComponent>
        )}
        <View style={styles.fixToText}>
          <Button
            titleStyle={{
              fontSize: 16,
              paddingLeft: 10
            }}
            buttonStyle={{
              paddingLeft: 15,
              paddingRight: 15,
              backgroundColor: '#4FC1E9'
            }}
            icon={
              <Icon
                name="arrow-left"
                size={15}
                color="white"
              />
            }

            title="Prev"
            onPress={() => onQuestionChangeButtonClick(-1)} />
          <Button
            buttonStyle={{
              paddingLeft: 15,
              paddingRight: 15,
              backgroundColor: '#4FC1E9'
            }}
            titleStyle={{
              fontSize: 16,
              paddingRight: 10
            }}
            iconRight='true'
            icon={
              <Icon
                name="arrow-right"
                size={15}
                color="white"
              />
            }
            title="Next"
            onPress={() => onQuestionChangeButtonClick(1)} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 10,
  },
  fixToText: {
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-between",
    marginTop: 50,
    color: "#4FC1E9",
  },
});
