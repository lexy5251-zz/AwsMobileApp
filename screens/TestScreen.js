import React from 'react';
import 'react-native-gesture-handler';
import QuestionPager from '../components/QuestionPager';
import { createQuestions } from '../test/TestData';
import { useDispatch } from 'react-redux';
import { startCurrentTest, setUserChoiceForCurrentTest } from '../actions';
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch) => {
  return {
    setChoiceForQuestion: (index, text) => {
      dispatch(setUserChoiceForCurrentTest(index, text));
    }
  }
}

const mapStateToProps = (state) => {
  if(!state.currentTest) return {questions: {}};

  return {
    questions: state.currentTest.questions,
    startTimeMs: state.currentTest.startTimeMs
  }
}

const TestQuestionPager = connect(mapStateToProps, mapDispatchToProps)(QuestionPager);

export default function TestScreen() {
  const startTimeMs = Date.now();
  const dispatch = useDispatch();
  dispatch(startCurrentTest(createQuestions(), startTimeMs));

  return (
      <TestQuestionPager />
  );
}

