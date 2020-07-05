import React, { useState, useEffect } from 'react';
import { View } from "react-native";
import _ from 'lodash';
import { VictoryChart, VictoryLine, VictoryZoomContainer } from "victory-native";

const y = (x: number) => Math.sin(x/10);

type AppProps = {
  isRecording: boolean,
  data: Array<{ x: number, y: number}>,
  setData: Function,
};

export default function Graph({ isRecording, data, setData }: AppProps) {
  useEffect(() => {
    const interval = setInterval(() => {
      if (isRecording) {
        const nextX = data[data.length-1].x + 1;
        const newData = [{x: nextX, y: y(nextX) }];
        setData(prevData => ([... prevData, ...newData]));
      }
    }, 500);
    return () => clearInterval(interval);
  });

  return (
    <View>
      <VictoryChart>
        <VictoryLine
          data={data}
        />
      </VictoryChart>
    </View>
  );
}    
