import React, { Component } from 'react';
import { StyleSheet, PermissionsAndroid } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeScreen from './src/components/HomeScreen';
import TickerScreen from './src/components/TickerScreen';
import { DataProvider } from './src/context/DataContext';
import { BleManager } from 'react-native-ble-plx';

const Tab = createMaterialTopTabNavigator();

export default class App extends Component {
  manager: BleManager;
  constructor(props: any) {
    super(props);
    this.manager = new BleManager();
    this.checkBlePermission();
  }
  componentWillMount() {
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
  scanAndConnect() {
    this.manager.startDeviceScan(null, null, async (error, device) => {
      // Handle error (scanning will be stopped automatically)
      if (error)
      return;
      if (device.name != null) {
        // Connect to first device found
        if (device.name.match("Nordic_Template")) {
          this.manager.stopDeviceScan();
          device.connect()
          .then((device) => {
            console.log(device)
            return device.discoverAllServicesAndCharacteristics()
          })
          .then((device) => {
            console.log(device)
          })
          .catch((error) => {
            // Handle errors
          });
          
        }
      }
    });
  }
  render() {
    return (
      <NavigationContainer>
      <DataProvider>
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
  