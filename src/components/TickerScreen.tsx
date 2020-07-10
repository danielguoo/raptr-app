import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { DataContext } from '../context/DataContext'

const TickerScreen = () => {
  return (
    <DataContext.Consumer>
      {({data}) => 
        <View style={styles.tickerRow}>
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
              {(data[data.length-1].y * 500 - 21).toFixed(3)}
            </Text>
          </View>
        </View>
      } 
    </DataContext.Consumer>
  )
}

const styles = StyleSheet.create({
  tickerBox: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  tickerRow:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ticker: {
    margin: 15,
    fontSize: 25
  },
  tickerLabel: {
    margin: 15,
    fontSize: 12
  },
});

export default TickerScreen;