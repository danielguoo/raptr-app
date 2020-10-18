import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { DataContext } from '../context/DataContext'
import { VictoryContainer, VictoryPie } from "victory-native"
import { TouchableOpacity } from 'react-native-gesture-handler';

export const Ticker = ({ tickerScreen }) => {
  return (
    <DataContext.Consumer>
      {({ data }) =>
        <View
          style={tickerScreen ? styles.tickerScreenContainer : styles.tickerContainer}>
          <View style={styles.tickerBox}>
            <Text style={tickerScreen ? styles.tickerScreenLabel : styles.tickerLabel}>
              Power Output (W)
            </Text>
            <Text style={[tickerScreen ? styles.tickerScreenText : styles.ticker, { color: determinePowerColor(data) }]}>
              {data[data.length - 1].y}
            </Text>
          </View>
          <View style={styles.tickerBox}>
            <Text style={tickerScreen ? styles.tickerScreenLabel : styles.tickerLabel}>
              Distance (Meters)
              </Text>
            <Text style={tickerScreen ? styles.tickerScreenText : styles.ticker}>
              {(data[data.length - 1].dist).toFixed(3)}
            </Text>
          </View>

        </View>
      }
    </DataContext.Consumer>
  )
}

export const PowerCircle = ({ pwrGoal, pwr, pwrColor }) => {

  return (

    <View style={styles.goalMeter} >
      <Text style={{ position: 'absolute', marginTop: 100, fontSize: 20, color: 'white' }}>Power (Watts) </Text>
      <Text style={{ color: pwrColor, position: 'absolute', marginTop: 120, fontSize: 150 }} >
        {pwr}
      </Text>

      <VictoryPie
        labels={() => null}
        colorScale={[pwrColor, "#1f241e"]}
        width={420}
        origin={{ y: 215 }}
        radius={210}
        innerRadius={180}
        data={[
          { x: "Output", y: pwr },
          { x: "Rest", y: pwrGoal - pwr }
        ]}
      />
    </View>
  )
}

const MiniCircle = ({ label, value, x, y }) => {
  return (
    <View style={{ position: 'absolute', width: 320, height: 320, borderRadius: 160, alignItems: 'center', marginTop: y, marginLeft: x, borderWidth: 10, borderColor: "#1f241e" }}>
      <Text style={{ color: 'white', fontSize: 20, paddingTop: 70 }}> {label} </Text>
      <Text style={{ color: 'white', fontSize: 100 }} >
        {value}
      </Text>
    </View>
  )
}

const TickerScreen = () => {
  return (
    <DataContext.Consumer>
      {({ data, pwrGoal, setGoal }) => {
        let pwr = data[data.length - 1].y
        let dist = (data[data.length - 1].dist).toFixed(2)
        let speed = (dist / data.length * 100).toFixed(2)
        return (
          <View style={styles.topContainer}>
            <View>
              <MiniCircle label={"Distance (Meters)"} value={dist} x={660} y={360} />
              <MiniCircle label={"Speed (MPH)"} value={speed} x={40} y={360} />
            </View>
            <PowerCircle pwr={pwr} pwrGoal={pwrGoal} pwrColor={determinePowerColor(data)} />
            <GoalSetter goal={pwrGoal} setGoal={setGoal} />

          </View>
        )
      }
      }
    </DataContext.Consumer >
  )
}

export const GoalSetter = ({ goal, setGoal }) => {
  return (
    <View style={{ alignSelf: 'center', justifyContent: 'center', alignItems: 'center', flexDirection: "row", display: 'flex', backgroundColor: "#1f241e", padding: 5, borderRadius: 30 }}>
      <TouchableOpacity onPress={() => setGoal(goal - 10)}>
        <Text style={{ fontSize: 50, color: 'white' }}>-</Text>
      </TouchableOpacity>
      <Text style={{ borderStyle: 'solid', borderColor: 'white', color: 'white', fontSize: 40, margin: 7 }}>
        {goal}
      </Text>
      <TouchableOpacity onPress={() => setGoal(goal + 10)}>
        <Text style={{ fontSize: 50, color: 'white' }}>+</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  topContainer: {
    backgroundColor: 'black',
    flex: 1,
  },
  goalMeter: {
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 80,
    height: 275,
  },
  tickerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
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
    color: 'white',
  },
  tickerLabel: {
    fontSize: 15,
    color: 'white',
  },
  tickerScreenText: {
    fontSize: 100,
    color: 'white',
    fontWeight: '400',
  },
  tickerScreenLabel: {
    fontSize: 30,
  },

});

export default TickerScreen;

const determinePowerColor = (data: any) => {
  const last = data.length - 1;
  if (data.length < 2 || data[last].y === data[last - 1].y) {
    return 'white';
  } else if (data[last].y > data[last - 1].y) {
    return 'green';
  } else {
    return 'red';
  }
}