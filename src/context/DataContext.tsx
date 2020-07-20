import React, { useState } from 'react'
import _ from 'lodash';

const y = (x: number) => Math.sin(x/10);
export const DataContext = React.createContext({
  data: [],
  setData: undefined,
  increasing: false,
  setIncreasing: undefined
});   

export const DataProvider = ({children})  => {
  const [data, setData] = useState(_.range(50).map(x => ({x, y: y(x)})));
  const [increasing, setIncreasing] = useState(data[data.length-1].y > data[data.length-2].y)
  return (
    <DataContext.Provider value={{data, setData, increasing, setIncreasing}}>
      {children}
    </DataContext.Provider>
  )
}
