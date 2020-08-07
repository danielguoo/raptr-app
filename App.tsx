import React, { Component } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeScreen from './src/components/HomeScreen';
import TickerScreen from './src/components/TickerScreen';
import { DataProvider } from './src/context/DataContext';
import { BleManager, BleError, Characteristic, Device } from 'react-native-ble-plx';
import { decode } from 'base-64'
import database from '@react-native-firebase/database';
import _ from 'lodash';

const Tab = createMaterialTopTabNavigator();
type AppState = {data: Array<Object>, isRecording: boolean, resetDistance: number, lastDistance: number, loading: boolean, name: String, deviceInfo: Object }

export default class App extends Component <{}, AppState>{
  manager: BleManager;
  constructor(props) {
    super(props);
    this.manager = new BleManager();
    this.state = { data: [{x: 0, y: 0, dist: 0}], isRecording: false, resetDistance: 0, lastDistance: 0, loading: false, name: '', deviceInfo: {id: null,  name: null} }
    Platform.OS === 'android' && this.checkBlePermission();
  }
  componentDidMount() {
    const subscription = this.manager.onStateChange((state) => {
      if (state === 'PoweredOn') {
        this.scanAndConnect();
        subscription.remove();
      }
    }, true);
    // const disconnectedSubscription = this.manager.onDeviceDisconnected(this.state.deviceInfo.id, this.reconnect)
  }
  async checkBlePermission() {
    const granted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION);
    if (!granted)
    await this.requestBlePermission();
  }
  
  async requestBlePermission() {
    try {
      await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION)
    } catch (err) {
      console.warn(err)
    }
  }
  getServicesAndCharacteristics(device: Device) {
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

  reconnect(error: BleError | null, device: Device | null) {
    this.state.deviceInfo.subscription.remove();
    this.setState({loading: true});
    this.scanAndConnect();
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
          .then((device: Device) => device.discoverAllServicesAndCharacteristics())
          .then(async (device: Device) => {
            this.setState({deviceInfo : {name: device.name, id: device.id}})
            console.log(device.name, device.id)
            this.getServicesAndCharacteristics(device)
              .then(a => {
                const subscription = this.manager.monitorCharacteristicForDevice(device.id, a.serviceUUID, a.uuid, this.updateBLEData);
                this.setState({deviceInfo: {...this.state.deviceInfo, subscription} })
              })                     
          })
          .then(()=> this.setState({loading: false}))
          .catch((error) => {
            // Handle errors
          });
        }
      }
    });
  }

  updateBLEData = (error: BleError, newValue: Characteristic) => {
    const currentLength = this.state.data.length;
    const nextValues = decode(newValue.value).split(",");
    const pwr = parseFloat(nextValues[0]);
    let dist = parseFloat(nextValues[1]);

    if (currentLength === 1 && this.state.lastDistance > 0) {
      this.setState({resetDistance: dist - this.state.lastDistance});
    }

    dist -= this.state.resetDistance;

    if (!error && this.state.isRecording && !Number.isNaN(pwr) && !Number.isNaN(dist)) {
      this.setState({data: [...this.state.data, {x: currentLength, y: pwr, dist}], lastDistance: dist})
    }
  }

  toggleRecording = () => {
    this.setState({isRecording: !this.state.isRecording})
  }

  setName = (name: String) => {
    this.setState({name})
  }

  resetData = () => {
    const { name, data } = this.state;
    const capitalizedName = _.startCase(name);
    const maxPower = data.map(a => a.y).reduce((acc, curr) => Math.max(acc, curr));
    const distance = data[data.length-1].dist;
    const date = new Date(Date.now()).toJSON();

    database()
      .ref(`/users/${capitalizedName}`)
      .push({
        data,
        maxPower,
        distance,
        date,
      })
        .then(() => console.log('Data updated.'));

    this.setState({data: [{ x: 0, y: 0, dist: 0 }]})
  }

  render() {
    const { data, isRecording, name, loading } = this.state;
    return (
      <NavigationContainer>
        <DataProvider
          data={data}
          isRecording={isRecording}
          resetData={this.resetData}
          toggleRecording={this.toggleRecording}
          name={name}
          setName={this.setName}
          loading={loading}
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