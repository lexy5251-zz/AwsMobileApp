import { connect } from 'react-redux';
import { setCurrentPracticeQuestionIndex, setUserChoiceForCurrentPractice, endCurrentPractice } from '../actions';
import SessionScreen from './SessionScreen';

const mapDispatchToProps = (dispatch) => {
  return {
    onQuestionChoiceChange: (index, text) => {
      dispatch(setUserChoiceForCurrentPractice(index, text));
    },
    onCurrentQuestionChange: (index) => {
      dispatch(setCurrentPracticeQuestionIndex(index));
    },
    onSessionEnd: () => {
      dispatch(endCurrentPractice());
    },
  }
}

const mapStateToProps = (state) => {
  return {
    session: state.currentPractice,
    showAnswerOnNext: true,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SessionScreen);
