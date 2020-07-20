import React, { useEffect } from 'react';
import { View } from "react-native";
import { VictoryChart, VictoryLine } from "victory-native";

const y = (x: number) => Math.sin(x/10);

type AppProps = {
  isRecording: boolean,
  data: Array<{ x: number, y: number}>,
  setData: Function,
  setIncreasing: Function,
};

export default function Graph({ isRecording, data, setData, setIncreasing }: AppProps) {
  useEffect(() => {
    const interval = setInterval(() => {
      if (isRecording) {
        const nextX = data[data.length-1].x + 1;    
        const newData = [{x: nextX, y: y(nextX) }];
        setIncreasing(newData[0].y > data[data.length-1].y)
        setData(prevData => ([... prevData, ...newData]));
      }
    }, 100);
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
