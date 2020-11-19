import React, {useEffect} from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import { Provider, useDispatch } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { AppState } from "react-native";
import {saveCurrentTest, saveCurrentPractice, restoreCurrentPractice, restoreCurrentTest} from './actions'
import StudyScreen from './screens/StudyScreen';
import TestScreen from './screens/TestScreen';
import TestMenuScreen from './screens/TestMenuScreen';
import TestHistoryScreen from './screens/TestHistoryScreen';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    AppState.addEventListener('change', handleChange);  
    return () => {
      AppState.removeEventListener('change', handleChange);  
    }
  }, []);
  
  const handleChange = (newState) => {
    if (newState === "active") {
      dispatch(restoreCurrentTest());
      dispatch(restoreCurrentPractice());
      return;
    } else if (newState == 'background') {
      dispatch(saveCurrentTest());
      dispatch(saveCurrentPractice());
      return;
    }
  }
  const Stack = createStackNavigator();

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
