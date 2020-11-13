import React from "react";
import { Text, View } from "react-native";
import ChoiceComponent from "./ChoiceComponent";

export default class QuestionComponent extends React.Component {
  render() {
    let { selectedChoices, onChoiceClicked, showAnswer } = this.props;
    let { question_text, explanation, answers, choices } = this.props.question;
    let shownChoiceKeys = Object.keys(choices);
    const { hideControlButtons } = this.props;
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>{question_text}</Text>
        {shownChoiceKeys.map((c, i) => {
          let isCorrectChoice = answers.includes(c);
          let checkedColor = "blue";
          if (showAnswer) {
            checkedColor = isCorrectChoice ? "green" : "red";
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
      </View>
    );
  }
}
