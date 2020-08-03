import React from 'react'
import _ from 'lodash';

const y = (x: number) => Math.sin(x/10);
export const DataContext = React.createContext({
  data: [],
  resetData: undefined,
  isRecording: false,
  toggleRecording: undefined,
  loading: false,
  name: '',
  setName: undefined,
});   

export const DataProvider = ({children, data, isRecording, resetData, toggleRecording, loading, name, setName})  => {
  return (
    <DataContext.Provider value={{data, isRecording, resetData, toggleRecording, loading, name, setName}}>
      {children}
    </DataContext.Provider>
  )
}
