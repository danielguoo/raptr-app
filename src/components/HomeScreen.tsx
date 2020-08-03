import React, { useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, TouchableHighlight, View, Modal, ActivityIndicator } from 'react-native';
import logo from '../../assets/logo.png';
import Graph from './Graph'
import { DataContext } from '../context/DataContext'
import { Ticker } from './TickerScreen';
import { TextInput } from 'react-native-gesture-handler';

const HomeScreen = () => {
  const [xMax, setXMax] = useState(30);
  const [yMax, setYMax] = useState(300);
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <DataContext.Consumer>
      {({data, isRecording, resetData, toggleRecording, loading, name, setName}) => (
         loading ? 
          <View style={styles.container}>
            <Image source={logo} style={styles.logo}/> 
            <ActivityIndicator size='large' />
            <Text style={styles.connectMessage}>
              Connecting to Bluetooth Device
            </Text>
          </View>
          :
          <View style={styles.container}>
            <View style={styles.topRow}>
              <Image source={logo} style={styles.logo}/>
              <View style={[styles.inputRow]}>
                <Text style={styles.label}>
                  X: 
                </Text>
                <TextInput
                  style={styles.input}
                  value={xMax.toString()}
                  onChangeText={text=>setXMax(parseInt(text) || 0)}
                />
                <Text style={styles.label}>
                  Y:
                </Text>
                <TextInput
                  style={styles.input}
                  value={yMax.toString() }
                  onChangeText={text=>setYMax(parseInt(text) || 0)}
                />
              </View> 
            </View>
            <View style={styles.GraphView}>
              <Graph data={data.map(point => ({x: point.dist, y: point.y}))} xMax={Math.max(xMax, data[data.length-1].dist + 5)} yMax={yMax}/>
            </View>
            <View style={styles.Row}>
              <TouchableOpacity onPress={ isRecording || data.length > 1 ? toggleRecording : () => setModalVisible(true)} style={[styles.button, isRecording && styles.recordingButton]}>
                  <Text style={styles.buttonText}> {isRecording ? "Pause" : data.length > 1 ? "Continue" : "Start Recording"}</Text>
              </TouchableOpacity>
              {
                !isRecording && data.length > 1 &&
                <TouchableOpacity style={[styles.button, styles.resetButton]} onPress={resetData}>
                    <Text style={styles.buttonText}> Save and Reset </Text>
                </TouchableOpacity>
              } 
            </View>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>Please enter your name: </Text>
                  <TextInput
                    style={styles.nameInput}
                    value={name}
                    onChangeText={text => setName(text)}
                  />
                  <TouchableHighlight
                    style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                    onPress={() => {
                      {
                        setModalVisible(!modalVisible);
                        toggleRecording();
                      }
                    }}
                  >
                    <Text style={styles.textStyle}>Start</Text>
                  </TouchableHighlight>
                </View>
              </View>
              <View style={styles.bottomHalf} />
            </Modal>
            <Ticker tickerScreen={false} />
          </View>
      )} 
    </DataContext.Consumer>
  )
}

const styles = StyleSheet.create({
  logo: {
    width: 200,
    height: 100,
    marginTop: 10,
  },
  connectMessage: {
    paddingVertical: 15,
  },
  label: {
    textAlignVertical: 'center',
    padding: 10
  },
  topRow: {
    flex: 1,
    width: 1000,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputRow: {
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    textAlign: 'center',
    borderWidth: .6,
    width: 70,
    height: 50,
    borderColor: 'gray',
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
  recordingButton: {
    backgroundColor: "red",
  },
  button: {
    backgroundColor: "green",
    height: 70,
    padding: 20,
    margin: 0,
    borderRadius: 5,
  },
  resetButton: {
    backgroundColor: "grey",
  },
  GraphView: {
  },
  Row:{
    margin: 5,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  centeredView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomHalf: {
    flex: 1,
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    width: 100,
    padding: 10,
    marginTop: 10,
    elevation: 2
  },
  nameInput: {
    textAlign: 'center',
    borderWidth: .6,
    width: 250,
    height: 30,
    borderColor: 'gray',
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default HomeScreen;