import React from "react";
import { Text, View, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import ChoiceComponent from "./ChoiceComponent";
import { CheckBox } from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';

export default class QuestionComponent extends React.Component {
  constructor(props) {
    super(props);
    const { learned, mistake, saved } = this.props.question;

    this.state = {
      learnedLabelChecked: learned,
      mistakeLabelChecked: mistake,
      savedLabelChecked: saved,
    }
  };

  handleLabelButtonClick = (title) => {
    if(title == 'Learned') {
      this.setState({
        learnedLabelChecked: !this.state.learnedLabelChecked
      })
    }
    if(title == 'Mistake') {
      this.setState({
        mistakeLabelChecked: !this.state.mistakeLabelChecked
      })
    }
    if(title == 'Saved') {
      this.setState({
        savedLabelChecked: !this.state.savedLabelChecked
      })
    }
   
  };

  render() {
    let { selectedChoices, onChoiceClicked, showAnswer } = this.props;
    let { question_text, explanation, answers, choices } = this.props.question;
    let shownChoiceKeys = Object.keys(choices);
    let style={ };
    if(explanation) {
      style.borderColor = 'green';
      style.borderWidth = 4;
    }
    let showExplanation = showAnswer && explanation != null && explanation != "";
    const { hideControlButtons } = this.props;
    let titles = ['Learned', 'Mistake', 'Saved'];
    let checkedColor;
    return (
      <SafeAreaView>
      <ScrollView>
      <View style={styles.singleQuestionContainer}>
      <RNPickerSelect
            placeholder={{
              label: 'Filter',
              color: 'black',
            }}
            style={{
              placeholder: {
                fontSize: 12,
                fontWeight: 'bold',
              },
            }}
            onValueChange={(value) => console.log(value)}
            items={[
                { label: 'Learned', value: 'learned' },
                { label: 'Mistake', value: 'mistake' },
                { label: 'Saved', value: 'saved' },
            ]}
            onValueChange={value => {
              this.setState({
                favSport0: value,
              });
            }}
      />
        <View style={styles.labels}>
        {titles.map((title) => {
          let checked,
          color;
          if (title == 'Learned') {
            checkedColor = '#49CFAE';
            checked = this.state.learnedLabelChecked;
            if(checked) {
              color = '#49CFAE';
            } else {
              color = '#B1AEAE';
            }
          }
          if (title == 'Mistake') {
            checkedColor = '#EC5563';
            checked = this.state.mistakeLabelChecked;
            if(checked) {
              color = '#EC5563';
            } else {
              color = '#B1AEAE';
            }
          }
          if(title == 'Saved') {
            checkedColor = '#F1BC5E';
            checked = this.state.savedLabelChecked;
            if(checked) {
              color = '#F1BC5E';
            } else {
              color = '#B1AEAE';
            }
          }
          return (
          <CheckBox
            center
            title={title}
            onPress={() => this.handleLabelButtonClick(title)}
            size={10}
            checked={checked}
            uncheckedColor='#B1AEAE'
            uncheckedIcon='dot-circle-o'
            checkedIcon='dot-circle-o'
            checkedColor={checkedColor}
            containerStyle={{
              color: '#B1AEAE',
              width: '30%',
              marginLeft: 0,
              padding: 5,
              borderRadius: 15,
              borderWidth: 1.5,
              borderColor: color
            }}
            textStyle={{
              fontSize: 10,
              color: color
            }}
          />
          );
        })}
        </View>
        <Text style={styles.SingleQuestionStyle}>{question_text}</Text>
      </View>
        <View style={styles.answersContainer}>
        {shownChoiceKeys.map((c, i) => {
          let isCorrectChoice = answers.includes(c);
          let checkedColor = '#4FC1E9';
          if (showAnswer) {
            checkedColor = isCorrectChoice ? '#49CFAE' : '#EC5563';
          }
          let text = c + ". " + choices[c];
          return (
            <ChoiceComponent
              key={i}
              text={text}
              checked={
                selectedChoices.includes(c) || (isCorrectChoice && showAnswer)
              }
              onClick={() => onChoiceClicked(c)}
              checkedColor={checkedColor}
              explanation={showAnswer ? explanation : ""}
              disabled={showAnswer}
            />
          );
        })}
        {showExplanation && 
            (<Text style={styles.explanationStyle}>{explanation}</Text>)
        }
      </View>
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
