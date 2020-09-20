import { connect } from 'react-redux';
import { setCurrentTestQuestionIndex, setUserChoiceForCurrentTest, endCurrentTest } from '../actions';
import SessionScreen from './SessionScreen';

const mapDispatchToProps = (dispatch) => {
  return {
    onQuestionChoiceChange: (index, text) => {
      dispatch(setUserChoiceForCurrentTest(index, text));
    },
    onCurrentQuestionChange: (index) => {
      dispatch(setCurrentTestQuestionIndex(index));
    },
    onSessionEnd: () => {
      dispatch(endCurrentTest());
    },
  }
}

const mapStateToProps = (state) => {
  return {
    session: state.currentTest,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SessionScreen);
