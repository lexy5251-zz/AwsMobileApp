import React from 'react';
import { Text, View } from 'react-native';
import 'react-native-gesture-handler';
import ResultSummaryComponent from '../components/ResultSummaryComponent';

export default function ResultScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>ResultScreen</Text>
      <ResultSummaryComponent />
    </View>
  );
}