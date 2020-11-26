import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { View, StyleSheet } from "react-native";
import TestResultComponent from "../components/TestResultComponent";
import { getData } from "../data";

export default function TestHistoryScreen({ navigation, route }) {
  const { examVersion } = route.params;
 
  const [testList, setTestList] = useState([]);
  useEffect(() => {
    getData(`test_history_${examVersion}`).then(h => {setTestList(_.reverse(h))});

    return () => { }
  }, []);

  const handlePressTest = (test) => {
    navigation.navigate('TestReview', {test})
  }

  return (
    <View style={styles.container}>
        <TestResultComponent 
          testList = {testList}
          onTestPress = {handlePressTest}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: "2%",
    backgroundColor: '#ffffff'
  },
});
