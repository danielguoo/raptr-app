import React from 'react';
import { View } from "react-native";
import { VictoryChart, VictoryLine, VictoryAxis, VictoryScatter } from "victory-native";

const y = (x: number) => Math.sin(x/10);

type AppProps = {
  data: Array<{ x: number, y: number}>,
  xMax: Number,
  yMax: Number,
};

export default function Graph({data, xMax, yMax}: AppProps) {
  return (
    <View>
      <VictoryChart
        padding={50}
        height={500}
        domain={{x: [0, xMax], y: [0, yMax]}}
      >
        <VictoryAxis
            dependentAxis={true}
            style={{
              grid: { stroke: "grey" }
            }}
        />
        <VictoryAxis/>
        { data.length < 2 ?
        <VictoryScatter 
          data={data}
        />
        :
        <VictoryAxis
          dependentAxis={true}
          style={{
            grid: { stroke: "grey" }
          }}
        />
        }
        <VictoryLine
          style={{
            data: { stroke: '#c43a31'}
          }}
          data={data}
        />
      </VictoryChart>
    </View>
  );
}    
