import React, { Component } from 'react';
import { StyleSheet, PermissionsAndroid } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeScreen from './src/components/HomeScreen';
import TickerScreen from './src/components/TickerScreen';
import { DataProvider } from './src/context/DataContext';
import { BleManager } from 'react-native-ble-plx';
import {decode, encode} from 'base-64'

const Tab = createMaterialTopTabNavigator();
type AppState = {data: [], increasing: boolean, isRecording: boolean}

export default class App extends Component <{}, AppState>{
  manager: BleManager;
  constructor(props) {
    super(props);
    this.manager = new BleManager();
    this.state = { data: [{x: 0, y: 0}], increasing: false, isRecording: false }
    this.checkBlePermission();
  }
  componentDidMount() {
    const subscription = this.manager.onStateChange((state) => {
      if (state === 'PoweredOn') {
        this.scanAndConnect();
        subscription.remove();
      }
    }, true);
  }
  async checkBlePermission() {
    const granted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION);
    if (!granted)
    await this.requestBlePermission();
  }
  
  async requestBlePermission() {
    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION)
    } catch (err) {
      console.warn(err)
    }
  }
  getServicesAndCharacteristics(device) {
    return new Promise((resolve, reject) => {
        device.services().then(services => {
            const characteristics = [];
            services.forEach((service, i) => {
                service.characteristics().then(c => {
                    characteristics.push(c)

                    if (i === services.length - 1) {
                        const temp = characteristics.reduce(
                            (acc, current) => {
                                return [...acc, ...current]
                            },
                            []
                        )
                        const dialog = temp.find(
                            characteristic =>
                                characteristic.isNotifiable && characteristic.uuid[0] === '6'
                        )
                        if (!dialog) {
                            reject('No writable characteristic')
                        }
                        resolve(dialog)
                    }
                })
            })
        })
    })
  }

  scanAndConnect() {
    this.manager.startDeviceScan(null, null, async (error, device) => {
      // Handle error (scanning will be stopped automatically)
      if (error) return;
      if (device.name != null) {
        // Connect to first device found
        if (device.name.match("Adafruit")) {
          this.manager.stopDeviceScan();
          this.selectedDevice = device;
          this.selectedDevice.connect()
          .then((device) => device.discoverAllServicesAndCharacteristics())
          .then(async (device) => {
            console.log(device.name, device.id)
            this.getServicesAndCharacteristics(device)
              .then(a => {
                this.manager.monitorCharacteristicForDevice(device.id, a.serviceUUID, a.uuid, this.updateBLEData)
              })                     
          })
          .catch((error) => {
            // Handle errors
          });
        }
      }
    });
  }

  updateBLEData = (error, newValue) => {
    const nextValue = parseFloat(decode(newValue.value))
    if (!error && this.state.isRecording && !Number.isNaN(nextValue)) {
      this.setState({data: [...this.state.data, {x: this.state.data.length + 1, y: nextValue}]})
    }
  }

  toggleRecording = () => {
    this.setState({isRecording: !this.state.isRecording})
  }

  resetData = () => {
    this.setState({data: [{x:0, y:0}]})
  }

  render() {
    const { data, increasing, isRecording } = this.state;
    return (
      <NavigationContainer>
        <DataProvider
          data={data}
          increasing={increasing}
          isRecording={isRecording}
          resetData={this.resetData}
          toggleRecording={this.toggleRecording}
        >
          <Tab.Navigator 
          initialRouteName="HomeScreen"
          swipeEnabled={true}
          tabBarPosition="bottom"
          >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Ticker" component={TickerScreen} />
          </Tab.Navigator>
        </DataProvider>
      </NavigationContainer>
      );
    }
  }
  
  const styles = StyleSheet.create({
    
  });
  