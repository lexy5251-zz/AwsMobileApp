import React from 'react';
import 'react-native-gesture-handler';
import QuestionPager from '../components/QuestionPager';
import { connect } from 'react-redux';
import { setCurrentQuestionIndex, setUserChoiceForCurrentPractice } from '../actions';

const mapDispatchToProps = (dispatch) => {
  return {
    setChoiceForQuestion: (index, text) => {
      dispatch(setUserChoiceForCurrentPractice(index, text));
    },
    onPageChange: (page) => {
      dispatch(setCurrentQuestionIndex(page));
    }
  }
}

const mapStateToProps = (state) => {
  if(!state.currentPractice) return {questions: []};
  console.log('initial page in redux', state.currentPractice.currentQuestionIndex);
  return {
    questions: state.currentPractice.questions,
    startTimeMs: state.currentPractice.startTimeMs,
    initialPage: state.currentPractice.currentQuestionIndex
  }
   
}

const PracticeQuestionPager = connect(mapStateToProps, mapDispatchToProps)(QuestionPager);

export default function PracticeScreen() { 
  return (
      <PracticeQuestionPager 
        showAnswerOnNext={true}
      />
  );
}


