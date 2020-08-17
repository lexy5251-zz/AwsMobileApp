import React from 'react';
import { View } from 'react-native';
import 'react-native-gesture-handler';
import { CheckBox } from 'react-native-elements';

export default function ChoiceComponent({onClick, text, checked}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <CheckBox
        title={text}
        onPress={() => onClick(text)}
        checked={checked}
      />
    </View>
  );
}