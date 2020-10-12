import React, {useState, useEffect} from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { createQuestions } from '../test/TestData';
import _ from 'lodash'
import { startCurrentPractice, startCurrentTest } from '../actions';
import {getData} from '../data'
import { useFocusEffect } from '@react-navigation/native';


export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const currentPractice = useSelector(state => state.currentPractice);
  const currentTest = useSelector(state => state.currentTest);
  const [progress, setProgress] = useState({total: 1185});
  console.log(">>>>>>>home screen current practice", currentPractice, (!currentPractice && true));

  console.log(">>>>>>>home screen current test", currentTest, (!currentTest && true));

  useFocusEffect(
    React.useCallback(() => {
      console.log('>>>>>focus!!');
      getProgress('c01').then(p => setProgress(p));
      return () => {};
    }, [])
  );

  const getProgress = (examVersion) => {
    let key = `@${examVersion}_progress`;
    return getData(key).then((v) => {
      console.log(">>>>>>v", v);

      let progress = {total: 1185, learned: 0, mistakes: 0};
      if (!v) {
        return progress;
      }
      let wrongNum = Object.values(v).filter(i => i === 'wrong').length;
      let correctNum = Object.values(v).filter(i => i === 'correct').length;
      progress.learned = correctNum;
      progress.mistakes = wrongNum;
      return progress;
    });
  }
  
  return (
    <View style={styles.container}>
    <Text>Practice</Text>
    {!_.isEmpty(progress) && <Text>Total: {progress.total}, learned: {progress.learned}, mistakes: {progress.mistakes}</Text>}
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style = {styles.button}
        onPress={() => onNewPracticePressed(navigation, dispatch)}
      >
      <Text style={styles.text}>Start New</Text>
      </TouchableOpacity>  
      <TouchableOpacity
      style = {styles.button}
      disabled = {_.isEmpty(currentPractice)}
      onPress={() =>onResumePracticePressed(navigation, dispatch)}
      >
      <Text style={styles.text}>Resume</Text>
      </TouchableOpacity>  
      <TouchableOpacity
        style = {styles.button}
        onPress={() => navigation.navigate('Review')}
      >
      <Text style={styles.text}>History</Text>
      </TouchableOpacity>  
    </View>
    <Text>Test</Text>
    <View style={styles.buttonContainer}>
    <TouchableOpacity
      style = {styles.button}
      onPress={() => onNewTestPressed(navigation, dispatch)}
    >
    <Text style={styles.text}>Start New</Text>
    </TouchableOpacity>  
    <TouchableOpacity
    style = {styles.button}
    disabled = {_.isEmpty(currentTest)}
    onPress={() =>onResumeTestPressed(navigation, dispatch)}
    >
    <Text style={styles.text}>Resume</Text>
    </TouchableOpacity>  
    <TouchableOpacity
      style = {styles.button}
      onPress={() => navigation.navigate('Review')}
    >
    <Text style={styles.text}>History</Text>
    </TouchableOpacity>  
  </View>
    </View>
  );
}

const onNewPracticePressed = (navigation, dispatch) => {
  navigation.navigate('Practice');
}

const onResumePracticePressed = (navigation, dispatch) => {
  navigation.navigate('Practice');
}

const onNewTestPressed = (navigation, dispatch) => {
  dispatch(startCurrentTest(createQuestions()));
  navigation.navigate('Test');
}

const onResumeTestPressed = (navigation, dispatch) => {
  navigation.navigate('Test');
}


const styles = StyleSheet.create({
  container: {
    flex: 1, 
    marginTop: '5%'
  },

  buttonContainer: {
    flexWrap: 'wrap', 
    flexDirection: 'row',
    justifyContent: 'center',
  },

  button: {
    flexBasis: '35%',
    alignItems: 'center',
    backgroundColor: '#E4E0E0',
    borderRadius: 5,
    height: 100,
    width: 100,
    margin: '5%',
  },

  text: {
    marginTop: '30%'
  }
});
