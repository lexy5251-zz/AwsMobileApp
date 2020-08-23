import { combineReducers } from 'redux';
import currentTest from './test';
import currentPractice from './practice';

export default combineReducers({
    currentTest,
    currentPractice
});
