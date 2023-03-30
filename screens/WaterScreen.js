import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'

const WaterScreen = () => {
  const [cups, setCups] = useState([false, false, false, false, false, false]) // initial state of all cups is "empty"

  const handleCupPress = (index) => {
    if (cups[index] === true) {
      return // do nothing if cup is already filled
    }

    if (index !== 0 && cups[index - 1] === false) {
      return // do nothing if the previous cup is not filled
    }

    // create a new array with the cup at `index` set to true and all other cups left unchanged
    const newCups = [...cups]
    newCups[index] = true
    setCups(newCups)
  }

  return (
    <View style={styles.container}>
      <View style={styles.cupContainer}>
        {cups.map((cup, index) => (
          <TouchableOpacity key={index} onPress={() => handleCupPress(index)}>
            <Image source={cup ? require('../Water2.png') : require('../Water1.png')} style={styles.cupImage} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}

export default WaterScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 50,
  },
  cupContainer: {
    position: 'absolute',
    bottom: 50,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-end',
    width: '100%',
  },
  cupImage: {
    width: 50,
    height: 50,
  },
})
