import React from 'react';
import { Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { shuffle } from '../utils/utils';

const PracticeResult = ({ currentPractice }) => {

  const { questions } = currentPractice;
  const correctAnswers = Object.values(questions).filter(q => {
      return q.correctAnswers.includes(q.choiceText);
    }
  );   

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Correct Answers: {correctAnswers.length}</Text>
      <Text>Wrong Answers: {Object.keys(questions).length-correctAnswers.length}</Text>
      {Object.entries(questions).map(([id, q], i) => {
            return (
              <View key={i}>
               <Text>{id} . {q.questionText}</Text>
               <Text>Choices: {"\n"} {shuffle(q.correctAnswers.concat(q.wrongAnswers)).map(ans => {
                 return (<Text>- {ans}{"\n"}</Text>)
               })}</Text>
               <Text>Your answer: {q.choiceText}</Text>
               <Text>Correct answer: {q.correctAnswers[0]}</Text>
             </View>
            )
         })}
    </View>
  );
}

const mapStateToProps = ({currentPractice}) => {
  return {currentPractice};
}

export default connect(mapStateToProps, null, null, {pure: false})(PracticeResult);