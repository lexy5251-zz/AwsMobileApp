import React, {useState, useEffect} from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { createQuestions } from '../test/TestData';
import _ from 'lodash'
import { startCurrentPractice, startCurrentTest } from '../actions';
import { Card } from 'react-native-elements';
import { VictoryBar, VictoryStack, VictoryLabel, VictoryContainer } from "victory-native";
import {getData} from '../data'
import { useFocusEffect } from '@react-navigation/native';
import ProgressBar from '../components/ProgressBar';


export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const currentPractice = useSelector(state => state.currentPractice);
  const currentTest = useSelector(state => state.currentTest);
  const [progress, setProgress] = useState({total: 0});

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

  const progressToBarData = (progress) => {
    let data = [];
    let v1 = progress.learned / progress.total * 100;
    if (v1) {
      if(v1<5) {
        v1 = 5;
      }
      data.push({value: v1, color: '#49CFAE'});
    }
    let v2 = progress.mistakes / progress.total * 100;
    if (v2) {
      if(v2<5) {
        v2 = 5;
      }
      data.push({value: v2, color: '#EC5563'});
    }
    data.push({value: 100 - v1 - v2, color: '#C2C0C0'});
    return data;
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Hello, Good Morning</Text>
          <Card containerStyle={{
            // borderRadius: 10,
            // paddingTop: 10,
            // paddingLeft: 15,
            // paddingRight: 15,
            // borderRadius: 10,
            // shadowOffset:{ width: 5, height: 5 },
            shadowColor: '#C2C0C0',
            shadowOpacity: 0.2,
            border: 'none',
            backgroundColor: '#FAFAFB',
            elevation: 5
          }}>
            <View style={styles.cardTitle}>
              <Text style={styles.textFont}>Sample</Text>
              <Text style={styles.total}>Total {progress.total} Questions</Text>
            </View>
            <View style={{height: 50, width: '100%'}}>
            <ProgressBar data={progressToBarData(progress)} />
            </View>
            {/* <VictoryStack 
              horizontal
              containerComponent = {<VictoryContainer responsive={false}/>}
              width = {300}
              height={110}
              colorScale={['#49CFAE', '#EC5563', '#C2C0C0']}
              domain = {{y:[0, 100]}}
              //domainPadding={{ y: -70,28 }}
              style={{
                data: {
                  width: 30,
                },
                // labels: { padding: -80 },
              }}
            >
            <VictoryBar 
              data={[{ x: 'progress', y: 10 }]}
              labels={({ datum }) => `Correct: ${datum.y}`}
              style={{ 
                labels: { 
                  fill: "white",
                  fontSize: 12,
                } 
              }}
              
            />
            <VictoryBar 
              data={[{ x: 'progress', y: 10 }]} 
              labels={({ datum }) => `Wrong: ${datum.y}`}
              style={{
                labels: { 
                  fill: "white",                   
                  fontSize: 12,
                }
              }}
              />
            <VictoryBar 
              data={[{ x: 'progress', y: 90 }]} 
              labels={({ datum }) => `Unfinished: ${datum.y}`}
              style={{
                labels: { 
                  fill: "white",                   
                  fontSize: 12,
                }
              }}
            />
          </VictoryStack>             */}
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
