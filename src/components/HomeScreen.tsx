import React, { useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import logo from '../../assets/logo.png';
import Graph from './Graph'
import { DataContext } from '../context/DataContext'
import { Ticker } from './TickerScreen';

const HomeScreen = ({navigation}) => {
  const [isRecording, setRecording] = useState(false);

  return (
    <DataContext.Consumer>
      {({data, setData, setIncreasing}) => (
        <View style={styles.container}>
          <Image source={logo} style={styles.logo}/> 
          <Text style={styles.text}> Welcome to RAPTR Performance!</Text>
          <Graph isRecording={isRecording} data={data} setData={setData} setIncreasing={setIncreasing} />
          <View style={styles.buttonRow}>
            <TouchableOpacity onPress={() => setRecording(!isRecording)} style={styles.button}>
                <Text style={styles.buttonText}> {isRecording ? "Stop Recording" : "Start Recording"}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => setData([{x: 0, y: 0}])}>
                <Text style={styles.buttonText}> Reset </Text>
            </TouchableOpacity>
          </View>
          <Ticker/>
        </View>
      )} 
    </DataContext.Consumer>
  )
}

const styles = StyleSheet.create({
  logo: {
    width: 305,
    height: 130,
    marginTop: 20,
  },
  text: {
    color: '#888',
    fontSize: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
  button: {
    backgroundColor: "green",
    height: 70,
    padding: 20,
    margin: 5,
    borderRadius:5,
  },
  buttonRow:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default HomeScreen;