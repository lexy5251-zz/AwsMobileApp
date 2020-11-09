import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useState, useEffect} from "react";
import QuestionComponent from "../components/QuestionComponent";
import {questionById} from '../data/questions'
import {getData, storeData} from '../data'
import _ from 'lodash'


export default function TestScreen({ route }) {
  const {examVersion, questionIdIterator} = route.params;
  // TEST
  /*questionIdIterator = {
    questionIdArray: [1, 5, 7, 9],
    i: 0,
    hasNext: function() {return this.i < this.questionIdArray.length},
    hasPrevious: function() {return this.i > 0},
    next: function() {return this.questionIdArray[this.i++]},
    previous: function() {return this.questionIdArray[this.i--]},
  }
  examVersion = 'c01';*/
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

  const saveProgress = (id, choices, correctAnswers) => {
    if(_.isEmpty(choices)) {
      return;
    }
    let key = `@${examVersion}_progress`;
    getData(key).then((progress) => {
      if (!progress) {
        progress = {};
      }
      let result = 'wrong';
      if (_.isEqual(choices, correctAnswers)) {
        result = 'correct';
      }
      progress[id] = result;
      console.log('save progress', progress);
      return storeData(key, progress);
    });
  }

  const handleNextPage = async () => {
    saveProgress(question.id, choices, question.correctAnswers);
    if(questionIdIterator.hasNext()) {
      loadNextQuestion();
    }
  }

  const handlePrevPage = async () => {
    saveProgress(question.id, choices, question.correctAnswers);
    if(questionIdIterator.hasPrevious()) {
      loadPreviousQuestion();
    }
  }

  return (
    <View style={styles.view}>
      {(question && true) && <QuestionComponent
        question={question}
        showAnswerOnNext={true}
        onChoicesChange={(cc) => {
          choices = cc;
        }}
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
