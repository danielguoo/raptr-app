import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { DataContext } from '../context/DataContext'

export const Ticker = () => {
  return (
    <DataContext.Consumer>
      {({data}) => 
        <View style={styles.tickerContainer}>
          <View style={styles.tickerBox}>
            <Text style={styles.tickerLabel}>
              Power Output (W)
            </Text>
            <Text style={styles.ticker}>
              {data[data.length-1].x}
            </Text>
          </View>
          <View style={styles.tickerBox}>
            <Text style={styles.tickerLabel}>
                Distance (Yards)
              </Text>
            <Text style={styles.ticker}>
              {(data[data.length-1].y).toFixed(3)}
            </Text>
          </View>
        </View>
      } 
    </DataContext.Consumer>
  )
}

const TickerScreen = () => {
  return (
    <Ticker/>
  )
}

const styles = StyleSheet.create({
  tickerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
  },
  tickerBox: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  ticker: {
    fontSize: 40,
  },
  tickerLabel: {
    fontSize: 15,
    alignContent: 'center',
  },
});

export default TickerScreen;