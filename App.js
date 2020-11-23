import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import StudyScreen from './screens/StudyScreen';
import TestScreen from './screens/TestScreen';
import TestMenuScreen from './screens/TestMenuScreen';
import TestHistoryScreen from './screens/TestHistoryScreen';
import { AppLoading } from 'expo';
import {useFonts} from 'expo-font';
import iap from './iap/iap';

export default function App() {
  let [fontsLoaded] = useFonts({
    'Avenir-Book': require('./assets/fonts/avenir/Avenir-Roman.ttf'),
    'Avenir-Medium': require('./assets/fonts/avenir/Avenir-Medium.ttf'),
    'Avenir-Black': require('./assets/fonts/avenir/Avenir-Black.ttf'),
  });

  const Stack = createStackNavigator();

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
  return (<NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Study" component={StudyScreen} />
      <Stack.Screen name="TestMenu" component={TestMenuScreen} />
      <Stack.Screen name="Test" component={TestScreen} />
      <Stack.Screen name="TestHistory" component={TestHistoryScreen} />
    </Stack.Navigator>
  </NavigationContainer>)
  }
}
