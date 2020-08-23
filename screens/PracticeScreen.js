import React from 'react';
import 'react-native-gesture-handler';
import QuestionPager from '../components/QuestionPager';
import { questions } from '../test/TestData';
import { useDispatch } from 'react-redux';

export default function PracticeScreen() {
  return (
      <QuestionPager shouldShowAnswerButton={true} questions={questions}/>
  );
}


