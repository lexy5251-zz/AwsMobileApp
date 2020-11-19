import React from 'react';
import { Card } from "react-native-elements";
import ProgressBar from "../components/ProgressBar";
import { View, TouchableOpacity, Text, StyleSheet, StatusBar, FlatList } from "react-native";
import _ from 'lodash';

const testResult = (test) => {
    if (!test) return;
    let testStatus = {};
    if (test.correctQuestionIds.length / test.questionIds.length >= 0.72) {
        testStatus.status = 'Passed';
        testStatus.statusStyle = '#49CFAE';
        return testStatus;
    } else {
        testStatus.statusStyle = '#EC5563';
        testStatus.status = 'Failed';
        return testStatus;
    }
}

const testResultToBarData = (test) => {
    let data = [];
    if (!test) return;

    let correctCount = test.correctQuestionIds.length;
    let wrongCount = test.questionIds.length - test.correctQuestionIds.length;

    data.push({ value: correctCount, color: "#49CFAE" });
    data.push({ value: wrongCount, color: "#EC5563" });

    return data;
};

const Item = ({ test }) => {
    return (
        <Card containerStyle={styles.cardContainer}>
            <View style={styles.cardTitle}>
                <Text style={styles.textFont}>Test</Text>
                {<Text style={{ color: testResult(test).statusStyle }}>{testResult(test).status}</Text>}
            </View>
            <View style={styles.barStyle}>
                <ProgressBar data={testResultToBarData(test)} />
                <View style={styles.barText}>
                    <Text style={{ marginRight: 10 }}>Correct: {test.correctQuestionIds.length}</Text>
                    <Text>Wrong: {test.questionIds.length - test.correctQuestionIds.length}</Text>
                </View>
            </View>
            <View style={styles.timeAndReviewContainer}>
                <Text>{test.startTimeMs}</Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        onTestReviewPressed();
                    }}>
                    <Text style={styles.text}>Review</Text>
                </TouchableOpacity>
            </View>
        </Card>
    )

}

export default function TestResultComponent({ testList }) {
    console.log("test list: ", testList);

    const renderItem = ({ item }) => (
        <Item test={item} />
    )

    return (
        <View style={styles.container}>
            <FlatList
                data={testList}
                renderItem={renderItem}
            />
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },

    cardContainer: {
        shadowOffset: { width: 5, height: 5 },
        shadowColor: '#C2C0C0',
        shadowOpacity: 0.3,
        backgroundColor: "#FAFAFB",
        elevation: 3,
        borderRadius: 10,
        borderColor: "#FAFAFB",
    },

    cardTitle: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "baseline",
    },

    textFont: {
        fontSize: 16,
    },

    barStyle: {
        height: 30,
        width: "100%",
        marginTop: "2%",
        marginBottom: "5%",
        borderRadius: 5
    },

    timeAndReviewContainer: {
        marginTop: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    },

    button: {
        backgroundColor: "#F1BC5E",
        borderRadius: 2,
        padding: 6,
        shadowOffset: { width: 5, height: 5 },
        shadowColor: "#C2C0C0",
        shadowOpacity: 0.2,
        elevation: 5,
        width: "30%",
        alignItems: 'center'
    },

    text: {
        color: "#fff",
    },

    barText: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 10,
    },
});
