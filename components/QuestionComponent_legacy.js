import React, { useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import ChoiceComponent from './ChoiceComponent';
import _ from 'lodash';
import { Button, CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

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
      this.props.onNextPage();
      this.setState({ showAnswer: false });
      return;
    }
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
    let style={ };
    if(explanation) {
      style.borderColor = 'green';
      style.borderWidth = 4;
    }
    let showExplanation = explanation != null && explanation != "";
    const { hideControlButtons } = this.props;
    return (
      <SafeAreaView style={styles.questionContainer}>
        <ScrollView style={styles.scrollView}>
        <View style={styles.singleQuestionContainer}>
          <View style={styles.labels}>
            <CheckBox
            center
            title='Learned'
            onPress={() => onClick()}
            size={10}
            uncheckedColor='#B1AEAE'
            uncheckedIcon='dot-circle-o'
            checkedIcon='dot-circle-o'
            checkedColor='#49CFAE'
            containerStyle={{
              color: '#B1AEAE',
              width: '30%',
              marginLeft: 0,
              padding: 5,
              borderRadius: 15,
              borderWidth: 1.5,
              borderColor: '#B1AEAE'
            }}
            textStyle={{
              fontSize: 10,
              color: '#B1AEAE'
            }}
          />
          <CheckBox
            center
            title='Mistake'
            onPress={() => onClick()}
            size={10}
            checked={true}
            uncheckedColor='#B1AEAE'
            uncheckedIcon='dot-circle-o'
            checkedIcon='dot-circle-o'
            checkedColor='#EC5563'
            containerStyle={{
              color: '#B1AEAE',
              width: '30%',
              marginLeft: 0,
              padding: 5,
              borderRadius: 15,
              borderColor: '#EC5563',
              borderWidth: 1.5
            }}
            textStyle={{
              fontSize: 10,
              color: '#EC5563'
            }}
          />
           <CheckBox
            center
            title='Saved'
            onPress={() => onClick()}
            size={10}
            checked={true}
            uncheckedColor='#B1AEAE'
            uncheckedIcon='dot-circle-o'
            checkedIcon='dot-circle-o'
            checkedColor='#F1BC5E'
            containerStyle={{
              color: '#B1AEAE',
              width: '30%',
              marginLeft: 0,
              padding: 5,
              borderRadius: 15,
              borderColor: '#F1BC5E',
              borderWidth: 1.5
            }}
            textStyle={{
              fontSize: 10,
              color: '#F1BC5E'
            }}
          />
        </View>
        <Text style={styles.SingleQuestionStyle}>{text}</Text>
        </View>
        <View style={styles.answersContainer}>

        
        {answers.map((choice, i) => {
          let isCorrectChoice = correctAnswers.includes(choice);
          let checkedColor = '#4FC1E9';
          if (showAnswer) {
            checkedColor = isCorrectChoice ? '#49CFAE' : '#EC5563';
          } else {
            explanation = '';
          }

          return (
          <ChoiceComponent
            key={i}
            text={choice}
            checked={selectedChoices.includes(choice) || (isCorrectChoice && showAnswer)}
            onClick={this.handleChoiceClick}
            checkedColor={checkedColor}
            explanation={explanation}
            disabled={showAnswer}
          />
          
          )
        })}
          {showExplanation && 
            (<Text style={styles.explanationStyle}>{explanation}</Text>)
              }
        </View>
        {!hideControlButtons && <View style={styles.fixToText}>
          <Button
            titleStyle={{
              fontSize: 16,
              paddingLeft: 10
            }}
            buttonStyle={{
              paddingLeft: 15,
              paddingRight: 15,
              backgroundColor: '#4FC1E9'
            }}
            icon={
              <Icon
                name="arrow-left"
                size={15}
                color="white"
              />
            }
            
            title="Prev"
            onPress={() => this.onPrevButton()}
          />
          <Button
            buttonStyle={{
              paddingLeft: 15,
              paddingRight: 15,
              backgroundColor: '#4FC1E9'
            }}
            titleStyle={{
              fontSize: 16,
              paddingRight: 10
            }}
            iconRight='true'
            icon={
              <Icon
                name="arrow-right"
                size={15}
                color="white"
              />
            }
            title="Next"
            onPress={() => this.onNextButton()}
          />
        </View>}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  fixToText: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 50,
    color: '#4FC1E9',
  },
  questionContainer: {
    flex: 1, 
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    marginTop: 10,
  },
  singleQuestionContainer: {
    backgroundColor: '#FAFAFB',
    padding: 20,
    borderRadius: 10,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: '#C2C0C0',
    shadowOpacity: 0.3,
    
  },
  answersContainer: {
    marginTop: '5%',
    paddingTop: 10,
    backgroundColor: '#FAFAFB',
    borderRadius: 10,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: '#C2C0C0',
    shadowOpacity: 0.3,
  },
  SingleQuestionStyle: {
    lineHeight: 20,
    marginTop: 15
  },
  scrollView: {
    marginHorizontal: 20,
  },
  explanationStyle: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    lineHeight: 20,
    paddingBottom: 10
  },
  labels: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  }

});
