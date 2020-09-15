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
  return {
    questions: state.currentPractice.questions,
    startTimeMs: state.currentPractice.startTimeMs,
    initialPage: state.currentPractice.currentQuestionIndex
  }
}

const PracticeQuestionPager = connect(mapStateToProps, mapDispatchToProps)(QuestionPager);

export default class PracticeScreen extends React.Component {
  handlePagerFinish = () => {
    this.props.navigation.navigate('Result');
  }
 
  render() {
    return (
          <PracticeQuestionPager 
            showAnswerOnNext={true}
            onPagerFinish={this.handlePagerFinish}
          /> 
  );
}
}

