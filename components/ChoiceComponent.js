import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CheckBox } from 'react-native-elements';

export default function ChoiceComponent({ onClick, text, checked, checkedColor, explanation, disabled }) {
  let style={ };
  if(explanation) {
    style.borderColor = 'green';
    style.borderWidth = 4;
  }
  let showExplanation = explanation != null && explanation != "";
  return (
    <View style={style} style={styles.singleChoice}>
      <CheckBox
        title={text}
        onPress={() => onClick(text)}
        checked={checked}
        disabled={disabled}
        size={18}
        uncheckedColor='#4DC1E9'
        uncheckedIcon='circle-o'
        checkedIcon='dot-circle-o'
        checkedColor={checkedColor}
      />
      {/* {showExplanation && 
      (<Text style={styles.explanationStyle}>{explanation}</Text>)
        } */}
    </View>
  );
}

const styles = StyleSheet.create({
  explanationStyle: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    lineHeight: 20,
  },
  
});
