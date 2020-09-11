import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { createQuestions } from '../test/TestData';
import { startCurrentPractice } from '../actions';

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
    <Text>Practice</Text>
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style = {styles.button}
        onPress={() => onNewPracticePressed(navigation, dispatch)}
      >
      <Text style={styles.text}>Start New</Text>
      </TouchableOpacity>  
      <TouchableOpacity
      style = {styles.button}
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
      onPress={() => navigation.navigate('Practice')}
    >
    <Text style={styles.text}>Start New</Text>
    </TouchableOpacity>  
    <TouchableOpacity
    style = {styles.button}
    onPress={() => navigation.navigate('Test')}
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
  const startTimeMs = Date.now();

  dispatch(startCurrentPractice(createQuestions(), startTimeMs));
  navigation.navigate('Practice');
}

const onResumePracticePressed = (navigation, dispatch) => {
  navigation.navigate('Practice');
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
