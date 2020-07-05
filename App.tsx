import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import logo from './assets/logo.png';
import Graph from './src/components/Graph'
import _ from 'lodash';


const y = (x: number) => Math.sin(x/10);

export default function App() {
  const [isRecording, setRecording] = useState(false);
  const [data, setData] = useState(_.range(50).map(x => ({x, y: y(x)})));
  const [isConnectedToBluetooth, setBluetoothConnection] = useState(false);

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} /> 
      <Text style={styles.text}> Welcome to RAPTR Performance!</Text>
      <Graph isRecording={isRecording} data={data} setData={setData}>
      </Graph>
      <View style={styles.buttonRow}>
        <TouchableOpacity onPress={() => setRecording(!isRecording)} style={styles.button}>
            <Text style={styles.buttonText}> {isRecording ? "Stop Recording" : "Start Recording"}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setData([{x: 0, y: y(0)}])}>
            <Text style={styles.buttonText}> Reset </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 305,
    height: 130,
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
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: "contain"
  },
  buttonRow:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});
