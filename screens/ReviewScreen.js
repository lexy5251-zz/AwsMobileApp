import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useState, useEffect} from "react";
import QuestionComponent from "../components/QuestionComponent";
import {questionById} from '../data/questions'
import {getData, storeData} from '../data'
import _ from 'lodash'


export default function ReviewScreen({ questionIdIterator, examVersion }) {
  // TEST
  questionIdIterator = {
    questionIdArray: [1, 5, 7, 9],
    i: 0,
    hasNext: function() {return this.i < this.questionIdArray.length},
    hasPrevious: function() {return this.i > 0},
    next: function() {return this.questionIdArray[this.i++]},
    previous: function() {return this.questionIdArray[this.i--]},
  }
  examVersion = 'c01';
  // FINISH TEST

  let choices = [];
  const [question, setQuestion] = useState();
  useEffect(() => {
    loadNextQuestion();
    return () => {};
  }, []);


  const loadNextQuestion = () => {
    if (questionIdIterator.hasNext()) {
      let id = questionIdIterator.next();
      questionById(examVersion, id).then(q => {
        setQuestion(q);
      });
    }
  }
  const loadPreviousQuestion = () => {
    if (questionIdIterator.hasPrevious()) {
      let id = questionIdIterator.previous();
      questionById(examVersion, id).then(q => {
        setQuestion(q);
      });
    }
  }

  const handleNextPage = async () => {
    if(questionIdIterator.hasNext()) {
      loadNextQuestion();
    }
  }

  const handlePrevPage = async () => {
    if(questionIdIterator.hasPrevious()) {
      loadPreviousQuestion();
    }
  }
  return (
    <View style={styles.view}>
      {(question && true) && <QuestionComponent
        question={question}
        showAnswerOnNext={true}
        onChoicesChange={() => {}}
        viewOnlyMode={true}
        onNextPage={handleNextPage}
        onPrevPage={handlePrevPage}
      ></QuestionComponent>}
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
});
