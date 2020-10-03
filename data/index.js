import AsyncStorage from '@react-native-community/async-storage';

export const storeData = async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value)
      console.log('>>>>>>>storedata', jsonValue);
      await AsyncStorage.setItem(key, jsonValue)
    } catch (e) {
      // saving error
      console.log('>>>>>>error storeData', e);
    }
  }


export const getData = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key)
      console.log('>>>>>>>getdata', jsonValue);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      // error reading value
      console.log('>>>>>>error getData', e);
    }
  }
