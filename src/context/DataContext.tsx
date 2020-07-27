import React, { useState } from 'react'
import _ from 'lodash';

const y = (x: number) => Math.sin(x/10);
export const DataContext = React.createContext({
  data: [],
  resetData: undefined,
  increasing: false,
  setIncreasing: undefined,
  isRecording: false,
  toggleRecording: undefined,
});   

export const DataProvider = ({children, data, increasing, isRecording, resetData, toggleRecording})  => {
  return (
    <DataContext.Provider value={{data, increasing, isRecording, resetData, toggleRecording}}>
      {children}
    </DataContext.Provider>
  )
}
