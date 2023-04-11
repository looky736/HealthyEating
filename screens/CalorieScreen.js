import { useNavigation } from '@react-navigation/core'
import React, { Component } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { AnimatedCircularProgress } from 'react-native-circular-progress'

class InfoScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fill: 0,
      calories: 0
    }
  }

  handleAddCalories = () => {
    const { calories } = this.state
    const newCalories = calories + 100
    const fillPercentage = (newCalories / 23).toFixed(2)
    const fill = fillPercentage > 100 ? 100 : fillPercentage
    this.setState({ calories: newCalories, fill })
  }

  render() {
    const { fill, calories } = this.state

    return (
      <View style={styles.container}>
        <Text>THIS IS THE INFORMATION SCREEN</Text>
        <AnimatedCircularProgress
          size={200}
          width={3}
          fill={fill}
          tintColor="#00e0ff"
          backgroundColor="#3d5875">
          {
            (fill) => (
              <Text>
                { calories } / 2300
              </Text>
            )
          }
        </AnimatedCircularProgress>
        <TouchableOpacity
          style={styles.button}
          onPress={this.handleAddCalories}>
          <Text style={styles.buttonText}>Add 100 Calories</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default InfoScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
   button: {
    backgroundColor: '#0782F9',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
})
