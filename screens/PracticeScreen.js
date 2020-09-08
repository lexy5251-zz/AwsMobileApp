import React from 'react';
import 'react-native-gesture-handler';
import QuestionPager from '../components/QuestionPager';
import { createQuestions } from '../test/TestData';
import { useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import { startCurrentPractice, setUserChoiceForCurrentPractice } from '../actions';

const mapDispatchToProps = (dispatch) => {
  return {
    setChoiceForQuestion: (id, text) => {
      dispatch(setUserChoiceForCurrentPractice(id, text));
    }
  }
}

const mapStateToProps = (state) => {
  if(!state.currentPractice) return {questions: {}};
  return {
    questions: state.currentPractice.questions,
    startTimeMs: state.currentPractice.startTimeMs
  }
   
}

const PracticeQuestionPager = connect(mapStateToProps, mapDispatchToProps)(QuestionPager);

export default function PracticeScreen() {
  const startTimeMs = Date.now();
  const dispatch = useDispatch();
  dispatch(startCurrentPractice(createQuestions(), startTimeMs));
  return (
      <PracticeQuestionPager 
        showAnswerOnNext={true}
      />
  );
}


