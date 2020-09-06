import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import 'react-native-gesture-handler';
import ChoiceComponent from './ChoiceComponent';

export default class QuestionComponent extends React.Component {
    constructor(props) {
      super(props);
      const  { correctAnswers, wrongAnswers } = this.props.question;   
      this.state = {
        answers: correctAnswers.concat(wrongAnswers),
        selected: "",
        choiceText: "",
      }
    };

    handleChoiceClick = (text) => {
      this.props.setChoice(text);
      this.setState({choiceText : text});
    };

    onPrevButton = () => {
      this.props.toPrevPage();
    }
  
    onNextButton = () => {
      this.props.toNextPage();
    }
  

    render() {
        let { questionText, explanationText, correctAnswers } = this.props.question;        
        let { answers, choiceText } = this.state;
        if(!choiceText) {
          choiceText = this.props.question.choiceText;
        }
        const { showAnswerOnChoiceSelected, hideControlButtons } = this.props;
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Text>IN QUESTION Component</Text>
              <Text>{questionText}</Text>
              {answers.map((choice, i) => {
                let isCorrectChoice = correctAnswers.includes(choice);
                let checkedColor = 'blue';
                let explanation;
                if(showAnswerOnChoiceSelected) {
                  checkedColor = isCorrectChoice ? 'green' : 'red';
                  explanation = isCorrectChoice && choiceText ? explanationText : "";
                } 

                  return (<ChoiceComponent 
                        key={i}
                        text={choice}
                        checked={choiceText===choice}
                        onClick={this.handleChoiceClick}
                        checkedColor={checkedColor}
                        explanation={explanation}
                        disabled={choiceText && showAnswerOnChoiceSelected}
                        />)
              })}
              {!hideControlButtons && <View style={styles.fixToText}>
                 <Button
                   title="Prev"
                   onPress={() => this.onPrevButton()}
                 />
                 <Button
                   title="Next"
                   disabled={!choiceText}
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

