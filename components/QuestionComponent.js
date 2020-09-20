import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import ChoiceComponent from './ChoiceComponent';

export default class QuestionComponent extends React.Component {
    constructor(props) {
      super(props);
      const  { correctAnswers, wrongAnswers } = this.props.question;   
      this.state = {
        answers: correctAnswers.concat(wrongAnswers),
        selected: "",
        choiceText: "",
        showAnswer: this.props.alwaysShowAnswer
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
      if(this.state.showAnswer || !this.props.showAnswerOnNext ) {
        this.props.toNextPage();
        return;
      }
      this.setState({
        showAnswer: true
      });
    }
  

    render() {
        let { questionText, explanationText, correctAnswers } = this.props.question;        
        let { answers, choiceText, showAnswer } = this.state;
        if(!choiceText) {
          choiceText = this.props.question.choiceText;
        }
        const { hideControlButtons } = this.props;
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Text>IN QUESTION Component</Text>
              <Text>{questionText}</Text>
              {answers.map((choice, i) => {
                let isCorrectChoice = correctAnswers.includes(choice);
                let checkedColor = 'blue';
                let explanation;
                if(showAnswer) {
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

