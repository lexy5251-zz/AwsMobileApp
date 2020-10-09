import AsyncStorage from '@react-native-community/async-storage';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import * as SQLite from 'expo-sqlite';



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
  } catch (e) {
    // error reading value
    console.log('>>>>>>error getData', e);
  }
}

const questionBundle = {
  "saa_c01": {
    dbFileName: "saa_c01_questions0",
    // react native doesn't recognize .db as assets, use .mp4 here.
    srcURI: Asset.fromModule(require("../assets/data/saa_c01_questions.mp4")).uri,
  }
}

export const pickQuestionsRandomly = async (dbName, count) => {
  let dbFileName = questionBundle[dbName].dbFileName;
  let {exists} = await FileSystem.getInfoAsync(`${FileSystem.documentDirectory}SQLite/${dbFileName}.db`);
  if (!exists) {
    console.log("start downdling question db....");
    await FileSystem.deleteAsync(`${FileSystem.documentDirectory}SQLite`, { idempotent: true });
    await FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}SQLite`, { intermediates: true });
    let {status} = await FileSystem.downloadAsync(
      questionBundle[dbName].srcURI,
      `${FileSystem.documentDirectory}SQLite/${dbFileName}.db`);
    if (status !== 200) {
      throw new Error('failed to download db file');
    }
  }

  console.log("querying question db....");
  const db = SQLite.openDatabase(dbFileName + ".db");
  let questions = [];
  db.transaction(tx => {
    tx.executeSql(
      `SELECT data FROM questions ORDER BY RANDOM() LIMIT ?;`,
      [count],
      (_, { rows: { _array } }) => {
        _array.forEach((row) => {
          let q = rowToQuestion(row.data.replace(/\\/g, ''));
          questions.push(q);
        });
      },
      (_, err) => {
        throw err;
      },
    );
  });
  return questions;
}

export const rowToQuestion = (json) => {
  let raw = JSON.parse(json);
  let correctAnswers = [];
  let wrongAnswers = [];
  Object.entries(raw.choices).forEach(([c, t]) => {
    if (raw.answers.includes(c)) {
      correctAnswers.push(t);
    } else {
      wrongAnswers.push(t);
    }
  })

  return {
    "questionId": raw.id,
    "questionText": raw.question_text,
    "explanationText": raw.explanation,
    "correctAnswers": correctAnswers,
    "wrongAnswers": wrongAnswers,
  }
}