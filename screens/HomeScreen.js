import React from 'react';
import { View, Button } from 'react-native';
import 'react-native-gesture-handler';

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title="Go to Practice"
        onPress={() => navigation.navigate('Practice')}
      />
      <Button
        title="Go to Test"
        onPress={() => navigation.navigate('Test')}
      />
      <Button
        title="Go to Review"
        onPress={() => navigation.navigate('Review')}
      />
    </View>
  );
}