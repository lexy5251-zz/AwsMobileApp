import React, { useState } from 'react';
import 'react-native-gesture-handler';
import { Text, View } from 'react-native';

export default function TimerComponent({ startTimeMs }) {

  const [timerValue, setTimerValue] = useState('00:00:00');
  setInterval(() => { 
      const passedTime = Date.now() - startTimeMs;
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
      setTimerValue(convertMS(passedTime)); 
    }, 1000);
  
  return (
    <View>
      <Text>{timerValue}</Text>
    </View>
  );
}
