import React, {useEffect} from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import PracticeScreen from './screens/PracticeScreen';
import TestScreen from './screens/TestScreen';
import ResultScreen from './screens/ResultScreen';
import { Provider, useDispatch } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { AppState } from "react-native";
import {saveCurrentTest, saveCurrentPractice, restoreCurrentPractice, restoreCurrentTest} from './actions'

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    AppState.addEventListener('change', handleChange);  
  
    return () => {
      AppState.removeEventListener('change', handleChange);  
    }
  }, []);
  
  const handleChange = async (newState) => {
    if (newState === "active") {
      console.log('>>>>restoring sessions');
      dispatch(restoreCurrentTest());
      dispatch(restoreCurrentPractice());
      return;
    } else if (newState == 'background') {
      console.log('>>>>saving sessions');
      dispatch(saveCurrentTest());
      dispatch(saveCurrentPractice());
      return;
    }
  }
  const Stack = createStackNavigator();

  return (<NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Practice" component={PracticeScreen} />
      <Stack.Screen name="Test" component={TestScreen} />
      <Stack.Screen name="Result" component={ResultScreen} />
    </Stack.Navigator>
  </NavigationContainer>)
}

export default function AppWrapper() {
  const store = createStore(rootReducer, applyMiddleware(thunk)); 
  store.subscribe(() => {
    console.log('store is: ', store.getState());
  })
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
