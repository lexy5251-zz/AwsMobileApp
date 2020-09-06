import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import 'react-native-gesture-handler';
import QuestionComponent from './QuestionComponent';

export default QuestionResultComponent = ({ questions }) => {
  
  const correctAnswers = Object.values(questions).filter(q => {
      return q.correctAnswers.includes(q.choiceText);
    }
  );   

  return (
    <ScrollView>
      <Text>Correct Answers: {correctAnswers.length}</Text>
      <Text>Wrong Answers: {Object.keys(questions).length-correctAnswers.length}</Text>
      {Object.entries(questions).map(([id, q], i) => {
            return (
              <View key={i}>
              <QuestionComponent question={q} hideControlButtons={true} showAnswerOnChoiceSelected={true}/>
             </View>
            )
         })}
    </ScrollView>
  );
}
