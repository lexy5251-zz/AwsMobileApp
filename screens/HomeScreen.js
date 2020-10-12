import React from 'react';
import ReactDOM from 'react-dom';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { createQuestions } from '../test/TestData';
import _ from 'lodash'
import { startCurrentPractice, startCurrentTest } from '../actions';
import { Card } from 'react-native-elements';
import { VictoryBar, VictoryStack, VictoryLabel } from "victory-native";

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const currentPractice = useSelector(state => state.currentPractice);
  const currentTest = useSelector(state => state.currentTest);
  console.log(">>>>>>>home screen current practice", currentPractice, (!currentPractice && true));

  console.log(">>>>>>>home screen current test", currentTest, (!currentTest && true));

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Hello, Good Morning</Text>
          <Card containerStyle={{
            borderRadius: 10,
            paddingTop: 10,
            paddingLeft: 15,
            paddingRight: 15,
            borderRadius: 10,
            shadowOffset:{ width: 5, height: 5 },
            shadowColor: '#C2C0C0',
            shadowOpacity: 0.2,
            border: 'none',
            backgroundColor: '#FAFAFB',
            elevation: 5
          }}>
            <View style={styles.cardTitle}>
              <Text style={styles.textFont}>Sample</Text>
              <Text style={styles.total}>Total 20 Questions</Text>
            </View>
            <VictoryStack 
              horizontal
              height={110}
              colorScale={['#49CFAE', '#EC5563', '#C2C0C0']}
              domainPadding={{ x: [-100, 55], y: [-70, 28] }}
              style={{
                data: {
                  width: 30,
                },
                labels: { padding: -80 },
              }}
            >
            <VictoryBar 
              data={[{ x: 'progress', y: 45 }]}
              labels={({ datum }) => `Correct: ${datum.y}`}
              style={{ 
                labels: { 
                  fill: "white",
                  fontSize: 12,
                } 
              }}
              
            />
            <VictoryBar 
              data={[{ x: 'progress', y: 25 }]} 
              labels={({ datum }) => `Wrong: ${datum.y}`}
              style={{
                labels: { 
                  fill: "white",                   
                  fontSize: 12,
                }
              }}
              />
            <VictoryBar 
              data={[{ x: 'progress', y: 30 }]} 
              labels={({ datum }) => `Unfinished: ${datum.y}`}
              style={{
                labels: { 
                  fill: "white",                   
                  fontSize: 12,
                }
              }}
            />
          </VictoryStack>            
          <View style={styles.buttonContainer}>
          <TouchableOpacity
            style = {styles.button}
            onPress={() => onNewPracticePressed(navigation, dispatch)}
            >
            <Text style={styles.text}>Practice</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style = {styles.button}
            onPress={() => onNewTestPressed(navigation, dispatch)}
            >
            <Text style={styles.text}>Test</Text>
          </TouchableOpacity>  
          </View>
          </Card>
        {/* <View style={styles.buttonContainer}>
          <TouchableOpacity
            style = {styles.button}
            onPress={() => onNewPracticePressed(navigation, dispatch)}
            >
            <Text style={styles.text}>Start New Practice</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style = {styles.button}
              onPress={() => onNewTestPressed(navigation, dispatch)}
            >
            <Text style={styles.text}>Start New Test</Text>
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
        <View style={styles.buttonContainer}>
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
      </View> */}
    </View>
  );
}

const onNewPracticePressed = (navigation, dispatch) => {
  dispatch(startCurrentPractice(createQuestions()));
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
    marginTop: '4%',
    padding: '2%',    
  },

  titleText: {
    paddingLeft: '5%',
    fontSize: 18,
    fontFamily: 'Avenir-Book'
  },

  buttonContainer: {
    flexWrap: 'wrap', 
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -30
  },

  button: {
    flexBasis: '45%',
    alignItems: 'center',
    backgroundColor: '#F1BC5E',
    borderRadius: 5,
    padding: 12,
    shadowOffset:{ width: 5, height: 5 },
    shadowColor: '#C2C0C0',
    shadowOpacity: 0.2,
    elevation: 5
  },
  text: {
    color: '#fff',
  },
  cardTitle: {
    display:'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline'
  },

  textFont: {
    fontFamily: 'Avenir-Black',
    fontSize: 16
  },
  total: {
    fontFamily: 'Avenir-Black',
    color: '#4A4949',
    fontSize: 12
  }
});
