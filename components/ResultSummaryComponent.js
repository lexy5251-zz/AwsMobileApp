import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { VictoryBar } from "victory-native";

const ResultSummaryComponent = ({ }) => (
    <View style={styles.container}>
        <Text>componentName</Text>
        <VictoryBar />
    </View>
);

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column'
    }
});

export default ResultSummaryComponent;
