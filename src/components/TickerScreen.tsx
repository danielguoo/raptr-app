import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { DataContext } from '../context/DataContext'

export const Ticker = ({tickerScreen}) => {
  return (
    <DataContext.Consumer>
      {({data}) => 
        <View 
          style={tickerScreen ? styles.tickerScreenContainer : styles.tickerContainer}>
          <View style={styles.tickerBox}>
            <Text style={tickerScreen? styles.tickerScreenLabel : styles.tickerLabel}>
              Power Output (W)
            </Text>
            <Text style={[tickerScreen? styles.tickerScreenText : styles.ticker, determinePowerColor(data)]}>
              {data[data.length-1].y}
            </Text>
          </View>
          <View style={styles.tickerBox}>
            <Text style={tickerScreen? styles.tickerScreenLabel : styles.tickerLabel}>
                Distance (Yards)
              </Text>
            <Text style={tickerScreen? styles.tickerScreenText : styles.ticker}>
              {(data[data.length-1].dist).toFixed(3)}
            </Text>
          </View>
        </View>
      } 
    </DataContext.Consumer>
  )
}

const TickerScreen = () => {
  return (
    <Ticker tickerScreen={true}/>
  )
}

const styles = StyleSheet.create({
  constant: {
    color: 'black',
  },
  increasing: {
    color: 'green',
  },
  decreasing: {
    color: 'red',
  },
  tickerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tickerScreenContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  tickerBox: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ticker: {
    fontSize: 35,
    color: 'black',
  },
  tickerLabel: {
    fontSize: 15,
  },
  tickerScreenText: {
    fontSize: 100,
    color: 'black',
    fontWeight: '400',
  },
  tickerScreenLabel: {
    fontSize: 30,
  },
  
});

export default TickerScreen;

const determinePowerColor = (data: any) => {
  const last = data.length - 1;
  if (data.length < 2 || data[last].y === data[last-1].y) {
    return styles.constant;
  } else if (data[last].y > data[last-1].y) {
    return styles.increasing;
  } else {
    return styles.decreasing;
  }
}