import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import ChoiceComponent from './ChoiceComponent';
import _ from 'lodash';

export default class QuestionComponent extends React.Component {
  constructor(props) {
    super(props);
    const { correctAnswers, wrongAnswers } = this.props.question;
    this.state = {
      answers: [],
      selectedChoices: [],
      showAnswer: this.props.alwaysShowAnswer
    }
  };

  handleChoiceClick = (text) => {
    let currentChoices = this.state.selectedChoices;

    if(currentChoices.includes(text)) {
      currentChoices = currentChoices.filter(item => item !== text);
    } else {
      currentChoices.push(text);
    }
    this.setState({ selectedChoices: currentChoices });
    this.props.onChoicesChange(currentChoices);
  };

  onPrevButton = () => {
    this.props.onPrevPage();
    this.setState({ showAnswer: false });
  }

  onNextButton = () => {
    if (this.state.showAnswer || !this.props.showAnswerOnNext) {
      console.log('>>>>>>!show answer');
      this.props.onNextPage();
      this.setState({ showAnswer: false });
      return;
    }
    console.log('>>>>>>show answer');
    this.setState({
      showAnswer: true
    });
  }


  render() {
    let { text, explanation, correctAnswers, wrongAnswers } = this.props.question;
    let { selectedChoices, showAnswer } = this.state;
    let answers = correctAnswers.concat(wrongAnswers)
    if (!selectedChoices) {
      selectedChoices = this.props.question.selectedChoices;
    }
    const { hideControlButtons } = this.props;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>IN QUESTION Component</Text>
        <Text>{text}</Text>
        {answers.map((choice, i) => {
          let isCorrectChoice = correctAnswers.includes(choice);
          let checkedColor = 'blue';
          if (showAnswer) {
            checkedColor = isCorrectChoice ? 'green' : 'red';
          } else {
            explanation = '';
          }

          return (<ChoiceComponent
            key={i}
            text={choice}
            checked={selectedChoices.includes(choice) || (isCorrectChoice && showAnswer)}
            onClick={this.handleChoiceClick}
            checkedColor={checkedColor}
            explanation={explanation}
            disabled={showAnswer}
          />)
        })}
        {!hideControlButtons && <View style={styles.fixToText}>
          <Button
            title="Prev"
            onPress={() => this.onPrevButton()}
          />
          <Button
            title="Next"
            onPress={() => this.onNextButton()}
          />
        </View>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
