import React from 'react';
import 'react-native-gesture-handler';
import QuestionPager from '../components/QuestionPager';
import { questions } from '../test/TestData';

export default function TestScreen() {
  
  return (
      <QuestionPager questions={questions}/>
  );
}

