import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import QuestionComponent from './QuestionComponent';

export default ResultComponent = ({ questions }) => {
  
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
              <QuestionComponent 
                question={q} 
                hideControlButtons={true} 
                alwaysShowAnswer={true}/>
             </View>
            )
         })}
    </ScrollView>
  );
}
