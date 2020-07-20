import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeScreen from './src/components/HomeScreen';
import TickerScreen from './src/components/TickerScreen';
import { DataProvider } from './src/context/DataContext';





const Tab = createMaterialTopTabNavigator();

export default function App() {
  const [isConnectedToBluetooth, setBluetoothConnection] = useState(false);

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

const styles = StyleSheet.create({
  
});
