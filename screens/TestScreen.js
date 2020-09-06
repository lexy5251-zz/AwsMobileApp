import React from 'react';
import 'react-native-gesture-handler';
import QuestionPager from '../components/QuestionPager';
import { createQuestions } from '../test/TestData';
import { useDispatch } from 'react-redux';
import { startCurrentTest, setUserChoiceForCurrentTest } from '../actions';
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch) => {
  return {
    setChoiceForQuestion: (id, text) => {
      dispatch(setUserChoiceForCurrentTest(id, text));
    }
  }
}

const mapStateToProps = (state) => {
  if(!state.currentTest) return {questions: {}};

  return {
    questions: state.currentTest.questions
  }
}

const TestQuestionPager = connect(mapStateToProps, mapDispatchToProps)(QuestionPager);

export default function TestScreen() {
  const dispatch = useDispatch();
  dispatch(startCurrentTest(createQuestions()));

  return (
      <TestQuestionPager />
  );
}

