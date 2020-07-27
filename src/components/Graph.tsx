import React from 'react';
import { View } from "react-native";
import { VictoryChart, VictoryLine, VictoryAxis, VictoryScatter } from "victory-native";

const y = (x: number) => Math.sin(x/10);

type AppProps = {
  data: Array<{ x: number, y: number}>,
};

export default function Graph({ data}: AppProps) {
  return (
    <View>
      <VictoryChart
        domain={{y: [-1,1]}}
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
