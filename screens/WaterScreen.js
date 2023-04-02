import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'

const WaterScreen = () => {
  const [cups, setCups] = useState([false, false, false, false, false, false]) // initial state of all cups is "empty"
  const [plantImage, setPlantImage] = useState(require('../Plant1.png')) // initial state of plant image is Plant1.png

  useEffect(() => {
    const countSelectedCups = cups.filter((cup) => cup).length // count how many cups are currently selected
    if (countSelectedCups >= 1 && countSelectedCups <= 2) {
      setPlantImage(require('../Plant1.png'))
    } else if (countSelectedCups >= 3 && countSelectedCups <= 4) {
      setPlantImage(require('../Plant2.png'))
    } else if (countSelectedCups >= 5 && countSelectedCups <= 6) {
      setPlantImage(require('../Plant3.png'))
    }
  }, [cups])

  const handleCupPress = (index) => {
    if (cups[index] === false) {
      // if the cup is not filled, fill it
      if (index === 0 || cups[index - 1] === true) {
        const newCups = [...cups]
        newCups[index] = true
        setCups(newCups)
      }
    } else {
      // if the cup is filled, empty it (only want it from right to left)
      let canEmpty = true
      for (let i = index + 1; i < cups.length; i++) {
        if (cups[i] === true) {
          canEmpty = false
          break
        }
      }
      if (canEmpty) {
        const newCups = [...cups]
        newCups[index] = false
        setCups(newCups)
      }
    }
  }

  return (
    <View style={styles.container}>
      <Image source={plantImage} style={styles.image} />
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
    backgroundColor: '#246EE9',
  },
  image: {
    width: 200,
    height: 200,
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
