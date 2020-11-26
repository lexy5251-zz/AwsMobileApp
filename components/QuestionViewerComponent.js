import React from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import { useState, useEffect, useRef } from "react";
import QuestionComponent from "../components/QuestionComponent";
import { questionById } from "../data/questions";
import { setQuestionProgress } from "../data";
import _ from "lodash";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import Toast from 'react-native-easy-toast'

export default function QuestionViewerComponent({
  examVersion,
  questionIdIterator,
  showAnswerOnQuestionChange,
  alwaysShowAnswer,
  onChoicesChange,
  onQuestionChange,
  onLastQuestionFinished,
  selectedChoicesForIndex,
  showQuestionLabels,
}) {
  const [question, setQuestion] = useState();
  const [choices, setChoices] = useState([]);
  const [showAnswer, setShowAnswer] = useState(alwaysShowAnswer);
  const toast = useRef(null);

  useEffect(() => {
    loadNextQuestion();
    return () => {};
  }, [questionIdIterator, showAnswerOnQuestionChange, alwaysShowAnswer]);

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
    let isShowingAnswer = showAnswer;
    let shouldGoNext = isShowingAnswer || !showAnswerOnQuestionChange;
    let shouldSaveProgress = !isShowingAnswer;
    let shoudShowAnswer = !isShowingAnswer && showAnswerOnQuestionChange;

    if (shouldSaveProgress) {
      saveProgress(question.id, choices, question.answers).then(() => {
        if (shoudShowAnswer) {
          setShowAnswer(true);
        }
      });
    }

    if (!shouldGoNext) {
      return;
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
    let status = "wrong";
    if (_.isEqual(choices, answers)) {
      status = "correct";
    }
    toast.current.show(status);
    return setQuestionProgress(id, examVersion, { status });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View>
          {question && true && (
            <QuestionComponent
              question={question}
              selectedChoices={choices}
              showAnswer={showAnswer}
              onChoiceClicked={onChoiceClicked}
              showQuestionLabels={showQuestionLabels}
            ></QuestionComponent>
          )}
          </View>
          </ScrollView>
          <View style={styles.bottons}>
            <Button
              titleStyle={{
                fontSize: 16,
                paddingLeft: 10,
              }}
              buttonStyle={{
                paddingLeft: 15,
                paddingRight: 15,
                backgroundColor: "#4FC1E9",
              }}
              icon={<Icon name="arrow-left" size={15} color="white" />}
              title="Prev"
              onPress={() => onQuestionChangeButtonClick(-1)}
            />
            <Button
              buttonStyle={{
                paddingLeft: 15,
                paddingRight: 15,
                backgroundColor: "#4FC1E9",
                position: 'relative'
              }}
              titleStyle={{
                fontSize: 16,
                paddingRight: 10,
              }}
              iconRight={true}
              icon={<Icon name="arrow-right" size={15} color="white" />}
              title="Next"
              onPress={() => onQuestionChangeButtonClick(1)}
            />
          </View>
      <Toast ref={toast} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    marginTop: 10,
  },
  bottons: {
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-between",
    color: "#4FC1E9",
    padding: 10,
  },
});
