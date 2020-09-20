import React from 'react';
import { View, Text } from 'react-native';
import { CheckBox } from 'react-native-elements';

export default function ChoiceComponent({ onClick, text, checked, checkedColor, explanation, disabled }) {
  let style={ flex: 1, alignItems: 'center', justifyContent: 'center' };
  if(explanation) {
    style.borderColor = 'green';
    style.borderWidth = 4;
  }
  let showExplanation = explanation != null && explanation != "";
  return (
    <View style={style}>
      <CheckBox
        title={text}
        checkedColor={checkedColor}
        onPress={() => onClick(text)}
        checked={checked}
        disabled={disabled}
      />
      {showExplanation && 
      (<Text>{explanation}</Text>)
        }
    </View>
  );
}