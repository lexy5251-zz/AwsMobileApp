import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { View, StyleSheet } from "react-native";
import TestResultComponent from "../components/TestResultComponent";



export default function TestHistoryScreen() {
  const [testList, setTestList] = useState([]);
  useEffect(() => {
    let fakeTestList = [];
    fakeTestList.push({
      correctQuestionIds: [1, 2, 3, 4, 5, 7, 9, 10, 11],
      questionIds: [2, 4, 6, 8, 10, 1, 3, 5, 7, 9, 11],
      startTimeMs: _.now() - 86400000
    }, {
      correctQuestionIds: [1, 3, 4, 5, 7, 9, 11],
      questionIds: [2, 6, 8, 10, 1, 3, 4, 5, 7, 9, 11],
      startTimeMs: _.now() - 86400000 * 2
    })
    setTestList(fakeTestList);
    return () => { }
  }, []);

  return (
    <View style={styles.container}>
        <TestResultComponent 
          testList = {testList}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: "2%",
    backgroundColor: '#ffffff'
  },
});
