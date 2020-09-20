import React, { useState, useEffect } from 'react';
import 'react-native-gesture-handler';
import { Text, View } from 'react-native';

export default function TimerComponent({ startTimeMs, baseDuration }) {
  const convertMS = (passedTime) => {
    let d, h, m, s;
    s = Math.floor(passedTime / 1000);
    m = Math.floor(s / 60);
    s = s % 60;
    h = Math.floor(m / 60);
    m = m % 60;
    d = Math.floor(h / 24);
    h = h % 24;
    return `${h}:${m}:${s}`;
  };

  const [timerValue, setTimerValue] = useState(convertMS(baseDuration));
  
  useEffect(() => {
    let timer = setInterval(() => { 
      const passedTime = Date.now() - startTimeMs + baseDuration;
      setTimerValue(convertMS(passedTime)); 
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  });
  
  return (
    <View>
      <Text>{timerValue}</Text>
    </View>
  );
}
