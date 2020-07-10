import React, { useState } from 'react'
import _ from 'lodash';

const y = (x: number) => Math.sin(x/10);
export const DataContext = React.createContext({
  data: [],
  setData: undefined,
});   

export const DataProvider = ({children}: Props)  => {
  const [data, setData] = useState(_.range(50).map(x => ({x, y: y(x)})));
  return (
    <DataContext.Provider value={{data, setData}}>
      {children}
    </DataContext.Provider>
  )
}
