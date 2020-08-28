import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import 'react-native-gesture-handler';
import ChoiceComponent from './ChoiceComponent';
import { shuffle } from '../utils/utils';
import Dialog, { DialogContent } from 'react-native-popup-dialog';

export default class QuestionComponent extends React.Component {
    constructor(props) {
      super(props);
      const  { correctAnswers, wrongAnswers } = this.props.question;   
      this.state = {
        showAnswers: false,
        answers: shuffle(correctAnswers.concat(wrongAnswers)),
        selected: "",
        choiceText: "",
        dialogVisible: false,
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
        const  { questionText, explanationText, correctAnswers } = this.props.question;        
        const  { answers, choiceText } = this.state;
        const { showAnswerOnChoiceSelected } = this.props;
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
                        />)
              })}
              <View style={styles.fixToText}>
                 <Button
                   title="Prev"
                   onPress={() => this.onPrevButton()}
                 />
                {this.props.shouldShowAnswerButton && <Button
                   title="Show Answer"
                   onPress={() => {
                   this.setState({ dialogVisible: true });
                   }}
                />}
                 <Button
                   title="Next"
                   disabled={!choiceText}
                   onPress={() => this.onNextButton()}
                 />
                 <Dialog
                    visible={this.state.dialogVisible}
                    onTouchOutside={() => {
                      this.setState({ dialogVisible: false });
                    }}
                  >
                  <DialogContent>
                    <Text>{explanationText}</Text> 
                  </DialogContent>
                  </Dialog>
               </View>
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

