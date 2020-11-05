import React from 'react';
import { View } from 'react-native';

export default function ProgressBar({ data }) {
  return (
    <View style={{ flexDirection: 'row', width: '100%', height: '100%'}}>
      {data.map((d, i) => {
          return (<View style={{flex: d.value, backgroundColor: d.color}}/>)
      })}
    </View>
  );
}