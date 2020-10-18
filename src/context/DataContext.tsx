import React from 'react'
import _ from 'lodash';

export const DataContext = React.createContext({
  data: [],
  resetData: undefined,
  isRecording: false,
  toggleRecording: undefined,
  loading: false,
  name: '',
  setName: undefined,
  pwrGoal: 0,
  setGoal: undefined,
});

export const DataProvider = ({ children, data, isRecording, resetData, toggleRecording, loading, name, setName, pwrGoal, setGoal }) => {
  return (
    <DataContext.Provider value={{ data, isRecording, resetData, toggleRecording, loading, name, setName, pwrGoal, setGoal }}>
      {children}
    </DataContext.Provider>
  )
}
