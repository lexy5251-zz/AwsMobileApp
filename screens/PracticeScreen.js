import React from 'react';
import 'react-native-gesture-handler';
import QuestionPager from '../components/QuestionPager';
import { questions } from '../test/TestData';
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
    questions: state.currentPractice.questions
  }
   
}

const PracticeQuestionPager = connect(mapStateToProps, mapDispatchToProps)(QuestionPager);

export default function PracticeScreen() {
  const dispatch = useDispatch();
  dispatch(startCurrentPractice(questions));
  return (
      <PracticeQuestionPager 
        shouldShowAnswerButton={true} 
        showAnswerOnChoiceSelected={true}
      />
  );
}


