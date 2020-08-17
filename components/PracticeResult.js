import React from 'react';
import { Text, View } from 'react-native';
import 'react-native-gesture-handler';


const PracticeResult = ({currentPractice}) => {

  const { questions } = currentPractice;
  const correctAnswers = Object.values(questions).filter(q => {
      return q.correctAnswers.includes(q.choiceText);
    });
   

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Correct Answers: {correctAnswers.length}</Text>
      <Text>Wrong Answers: {Object.keys(questions).length-correctAnswers.length}</Text>
    </View>
  );
}

export default PracticeResult;
